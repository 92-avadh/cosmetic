import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import Stripe from "stripe";
import { withApiHandler } from "@/lib/api-helper";
import { orderCreateSchema } from "@/lib/schemas";
import { logAudit } from "@/lib/audit";

const checkoutCreateSchema = orderCreateSchema.omit({ totalUSD: true });

export const POST = withApiHandler(async (request: Request) => {
  const cookieStore = await cookies().catch(() => null);
  const sessionCookie = cookieStore?.get("session")?.value;
  if (!sessionCookie) {
    const err = new Error("Unauthorized");
    (err as any).status = 401;
    throw err;
  }

  const payload = await verifySession(sessionCookie);
  if (!payload || !payload.email) {
    const err = new Error("Unauthorized");
    (err as any).status = 401;
    throw err;
  }

  const emailKey = payload.email.toLowerCase().trim();

  try {
    // 2. Load inputs and validate with schema
    const body = await request.json();
    const validatedData = await checkoutCreateSchema.parseAsync(body);
    const { items, shippingDetails, promoCode } = validatedData;

    // 3. Retrieve user
    let { data: user } = await supabase
      .from("User")

      .select("id")
      .eq("email", emailKey)
      .single();

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from("User")
        .insert({
          id: crypto.randomUUID(),
          email: emailKey,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .select("id")
        .single();
      if (createError) throw new Error("Failed to create user");
      user = newUser;
    }

    // 4. Validate products and calculate price securely on server
    let subtotalUSD = 0;
    const validatedItems = [];

    for (const item of items) {
      const { data: dbProduct, error: prodError } = await supabase
        .from("Product")
        .select("*")
        .eq("id", item.id)
        .single();

      if (prodError || !dbProduct) {
        return NextResponse.json({ error: `Product ${item.name} not found in catalog` }, { status: 400 });
      }

      if (dbProduct.inventory < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${dbProduct.name}. Available: ${dbProduct.inventory}` },
          { status: 400 }
        );
      }

      subtotalUSD += dbProduct.priceUSD * item.quantity;
      validatedItems.push({
        id: dbProduct.id,
        name: dbProduct.name,
        subtitle: dbProduct.subtitle,
        priceUSD: dbProduct.priceUSD,
        quantity: item.quantity,
        image: dbProduct.image,
      });
    }

    // 5. Handle promo code validation on server
    let discountRate = 0;
    if (promoCode) {
      const { data: promo } = await supabase
        .from("PromoCode")
        .select("*")
        .eq("code", promoCode.toUpperCase().trim())
        .single();

      if (promo && promo.isActive) {
        discountRate = promo.discount;
      }
    }

    // Final financial math (USD)
    const discountAmount = subtotalUSD * discountRate;
    const discountedSubtotal = subtotalUSD - discountAmount;
    const shippingUSD = discountedSubtotal > 150 ? 0 : 15;
    const taxUSD = discountedSubtotal * 0.088; // 8.8% mock tax
    const totalUSD = discountedSubtotal + shippingUSD + taxUSD;

    // 6. Create the order as PENDING
    const orderId = crypto.randomUUID();
    const { error: orderError } = await supabase
      .from("Order")
      .insert({
        id: orderId,
        userId: user.id,
        status: "PENDING",
        totalUSD,
        shippingName: `${shippingDetails.firstName || ""} ${shippingDetails.lastName || ""}`.trim() || "Customer",
        shippingStreet: shippingDetails.street,
        shippingCity: shippingDetails.city || "",
        shippingState: shippingDetails.state || "",
        shippingZip: shippingDetails.zip || "",
        shippingCountry: shippingDetails.country || "IN",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

    if (orderError) throw new Error("Failed to create order");

    // Create order items
    const orderItems = validatedItems.map((item) => ({
      id: crypto.randomUUID(),
      orderId,
      productId: item.id,
      quantity: item.quantity,
      pricePaid: item.priceUSD * (1 - discountRate), // Freeze custom price
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const { error: itemsError } = await supabase.from("OrderItem").insert(orderItems);
    if (itemsError) throw new Error("Failed to create order items");

    // 7. Initialize Stripe Client for Edge compatibility
    const context = (globalThis as any)[Symbol.for("cloudflare.request_context")] || {};
    const env = context?.env || {};
    const stripeSecret = env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

    if (!stripeSecret) {
      // In development or if keys are missing, return fallback successful mock details (but with PENDING state)
      // to let checkout preview succeed without a crash.
      console.warn("⚠️ STRIPE_SECRET_KEY is not defined. Falling back to development mock checkout session.");
      return NextResponse.json({
        mocked: true,
        orderId,
        totalUSD,
      });
    }

    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2024-12-18.acacia" as any,
      httpClient: Stripe.createFetchHttpClient(),
    });

    const origin = new URL(request.url).origin;

    // Build Stripe Line Items
    const lineItems = validatedItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.subtitle || "",
          images: item.image ? [new URL(item.image, origin).href] : [],
        },
        unit_amount: Math.round(item.priceUSD * (1 - discountRate) * 100), // in cents
      },
      quantity: item.quantity,
    }));

    // Add shipping as a separate line item if present
    if (shippingUSD > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping & Handling",
            description: "Standard Delivery",
            images: [],
          },
          unit_amount: Math.round(shippingUSD * 100),
        },
        quantity: 1,
      });
    }

    // Add tax as a separate line item if present
    if (taxUSD > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Sales Tax",
            description: "Local sales tax calculations (8.8%)",
            images: [],
          },
          unit_amount: Math.round(taxUSD * 100),
        },
        quantity: 1,
      });
    }

    // 8. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: emailKey,
      success_url: `${origin}/checkout?success=true&order_id=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?cancel=true`,
      metadata: {
        orderId,
        email: emailKey,
      },
    });

    await logAudit({
      action: "STRIPE_CHECKOUT_SESSION_CREATED",
      status: "SUCCESS",
      userId: user.id,
      userEmail: emailKey,
      details: { orderId, totalUSD },
    });

    return NextResponse.json({ url: session.url, orderId });
  } catch (error: any) {
    await logAudit({
      action: "STRIPE_CHECKOUT_SESSION_CREATED",
      status: "FAILED",
      userEmail: emailKey,
      details: error.message || String(error),
    });
    throw error;
  }
});

