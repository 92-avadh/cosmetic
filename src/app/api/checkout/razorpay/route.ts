import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";
import { orderCreateSchema } from "@/lib/schemas";
import { logAudit } from "@/lib/audit";
import { z } from "zod";

const checkoutCreateSchema = orderCreateSchema.omit({ totalUSD: true });
const razorpayCheckoutSchema = checkoutCreateSchema.extend({
  currency: z.string().max(10).optional().nullable(),
});

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
    // 2. Load and validate inputs
    const body = await request.json();
    const validatedData = await razorpayCheckoutSchema.parseAsync(body);
    const { items, shippingDetails, promoCode, currency } = validatedData;

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
      if (createError) throw new Error(`User creation failed: ${createError.message}`);
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
        const err = new Error(`Product ${item.name || "Unknown"} not found in catalog`);
        (err as any).status = 400;
        throw err;
      }

      if (dbProduct.inventory < item.quantity) {
        const err = new Error(`Insufficient stock for ${dbProduct.name}. Available: ${dbProduct.inventory}`);
        (err as any).status = 400;
        throw err;
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

    // Currency configuration and mapping
    let chargeCurrency = (currency || "USD").toUpperCase();
    let chargeAmount = totalUSD; // default in USD

    if (chargeCurrency === "INR") {
      chargeAmount = totalUSD * 83.5;
    } else if (chargeCurrency === "EUR") {
      chargeAmount = totalUSD * 0.92;
    } else if (chargeCurrency === "KRW") {
      chargeCurrency = "USD";
    }

    const amountInSubunits = Math.round(chargeAmount * 100);

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

    if (orderError) throw new Error(`DB Order Insert Error: ${orderError.message}`);

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
    if (itemsError) throw new Error(`DB Order Items Insert Error: ${itemsError.message}`);

    // 7. Initialize Razorpay credentials
    const keyId = process.env.RAZORPAY_API_KEY;
    const keySecret = process.env.RAZORPAY_SECRET;

    if (!keyId || !keySecret) {
      console.warn("⚠️ Razorpay API keys are not defined in .env.");
      const err = new Error("Razorpay credentials are not configured on the server.");
      (err as any).status = 500;
      throw err;
    }

    // Call Razorpay API directly using standard fetch for Edge compatibility
    const auth = btoa(`${keyId}:${keySecret}`);
    const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: amountInSubunits,
        currency: chargeCurrency,
        receipt: orderId,
        notes: {
          orderId,
          email: emailKey
        }
      })
    });

    if (!rzpResponse.ok) {
      const rzpErrText = await rzpResponse.text();
      console.error("Razorpay API order error response:", rzpErrText);
      throw new Error("Razorpay gateway order registration failed");
    }

    const rzpOrderData = await rzpResponse.json();

    await logAudit({
      action: "RAZORPAY_CHECKOUT_SESSION_CREATED",
      status: "SUCCESS",
      userId: user.id,
      userEmail: emailKey,
      details: { orderId, totalUSD },
    });

    return {
      razorpayOrderId: rzpOrderData.id,
      amount: rzpOrderData.amount,
      currency: rzpOrderData.currency,
      key: keyId,
      orderId
    };
  } catch (error: any) {
    await logAudit({
      action: "RAZORPAY_CHECKOUT_SESSION_CREATED",
      status: "FAILED",
      userEmail: emailKey,
      details: error.message || String(error),
    });
    throw error;
  }
});
