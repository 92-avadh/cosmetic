import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { sendEmail } from "@/lib/email";
import { withApiHandler } from "@/lib/api-helper";
import { razorpayVerifySchema } from "@/lib/schemas";
import { logAudit } from "@/lib/audit";

export const runtime = "edge";

// Cryptographic signature verification using standard Web Crypto API (Edge-safe)
async function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(orderId + "|" + paymentId);
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const calculatedSignature = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return calculatedSignature === signature;
}

export const POST = withApiHandler(async (request: Request) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
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
    // 2. Parse and validate inputs
    const body = await request.json();
    const validatedData = await razorpayVerifySchema.parseAsync(body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = validatedData;

    // 3. Verify signature
    const secret = process.env.RAZORPAY_SECRET;
    if (!secret) {
      const err = new Error("Server payment configuration error");
      (err as any).status = 500;
      throw err;
    }

    const isValid = await verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      secret
    );

    if (!isValid) {
      const err = new Error("Payment verification failed. Invalid signature.");
      (err as any).status = 400;
      (err as any).code = "INVALID_SIGNATURE";
      throw err;
    }

    // 4. Retrieve order
    const { data: order, error: orderGetError } = await supabase
      .from("Order")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderGetError || !order) {
      const err = new Error("Order record not found");
      (err as any).status = 404;
      throw err;
    }

    // If order has already been marked paid, return success directly to avoid duplicate deductions
    if (order.status === "PAID") {
      return NextResponse.json({ success: true, orderId });
    }

    // 5. Update order state to PAID
    const { error: updateError } = await supabase
      .from("Order")
      .update({
        status: "PAID",
        updatedAt: new Date().toISOString()
      })
      .eq("id", orderId);

    if (updateError) throw new Error(`Failed to update order: ${updateError.message}`);

    // 6. Deduct product stock
    const { data: items, error: itemsGetError } = await supabase
      .from("OrderItem")
      .select("productId, quantity, pricePaid")
      .eq("orderId", orderId);

    if (itemsGetError || !items) throw new Error("Failed to load order items");

    for (const item of items) {
      const { data: prod } = await supabase
        .from("Product")
        .select("inventory")
        .eq("id", item.productId)
        .single();

      if (prod) {
        await supabase
          .from("Product")
          .update({
            inventory: Math.max(0, prod.inventory - item.quantity),
            updatedAt: new Date().toISOString()
          })
          .eq("id", item.productId);
      }
    }

    // 7. Clear user's shopping cart in the database
    const { data: user } = await supabase
      .from("User")
      .select("id")
      .eq("email", emailKey)
      .single();

    if (user) {
      const { data: userCart } = await supabase
        .from("Cart")
        .select("id")
        .eq("userId", user.id)
        .single();

      if (userCart) {
        await supabase
          .from("CartItem")
          .delete()
          .eq("cartId", userCart.id);
      }
    }

    // 8. Compile item names for the invoice email
    const emailItems = [];
    for (const item of items) {
      const { data: prod } = await supabase
        .from("Product")
        .select("name, subtitle")
        .eq("id", item.productId)
        .single();

      emailItems.push({
        name: prod?.name || "Premium Product",
        subtitle: prod?.subtitle || "",
        quantity: item.quantity,
        price: item.pricePaid
      });
    }

    const itemsHtml = emailItems
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 12px 0; font-size: 13px; color: #333;">
          <strong style="text-transform: uppercase;">${item.name}</strong><br/>
          <span style="font-size: 11px; color: #888;">${item.subtitle || ""}</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; color: #333; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 0; font-size: 13px; color: #333; text-align: right;">$${(
          item.price * item.quantity
        ).toFixed(2)}</td>
      </tr>
    `
      )
      .join("");

    const orderEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 1px solid #eaeaea; padding-bottom: 20px; margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: 600; color: #111111; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 5px 0;">BODYBARREL</h2>
          <span style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Order Receipt &amp; Confirmation</span>
        </div>

        <p style="font-size: 13px; color: #666; line-height: 1.6;">Hello,</p>
        <p style="font-size: 13px; color: #666; line-height: 1.6;">Thank you for your purchase. We have received your order payment via Razorpay. Below is your billing summary.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eaeaea; margin: 25px 0; font-size: 12px; line-height: 1.6; color: #444;">
          <strong style="display: block; font-size: 13px; color: #111; text-transform: uppercase; margin-bottom: 10px; border-bottom: 1px solid #eaeaea; padding-bottom: 5px;">Order Details</strong>
          <strong>Order Reference:</strong> #${order.id.slice(0, 8).toUpperCase()}<br/>
          <strong>Payment ID:</strong> ${razorpay_payment_id}<br/>
          <strong>Date:</strong> ${new Date().toLocaleDateString()}<br/>
          <strong>Delivery To:</strong> ${order.shippingName}<br/>
          <strong>Address:</strong> ${order.shippingStreet}, ${order.shippingCity}, ${order.shippingState || ""} ${order.shippingZip}, ${order.shippingCountry}
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
          <thead>
            <tr style="border-bottom: 2px solid #111;">
              <th style="text-align: left; padding-bottom: 10px; font-size: 11px; text-transform: uppercase; color: #111;">Item</th>
              <th style="text-align: center; padding-bottom: 10px; font-size: 11px; text-transform: uppercase; color: #111; width: 60px;">Qty</th>
              <th style="text-align: right; padding-bottom: 10px; font-size: 11px; text-transform: uppercase; color: #111; width: 100px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="border-top: 2px solid #111; padding-top: 15px; text-align: right; margin-top: 20px;">
          <span style="font-size: 12px; text-transform: uppercase; color: #666; tracking: 0.1em;">Order Total Paid:</span>
          <strong style="font-size: 18px; color: #111; margin-left: 10px;">$${order.totalUSD.toFixed(2)} USD</strong>
        </div>

        <p style="font-size: 13px; color: #666; line-height: 1.6; margin-top: 35px;">We will notify you once your package is dispatched with tracking information.</p>
        <p style="font-size: 11px; color: #999; border-top: 1px solid #eaeaea; padding-top: 15px; margin-top: 40px; line-height: 1.5;">If you have any questions, please contact our support team at info@bodybarrel.co.</p>
      </div>
    `;

    try {
      await sendEmail({
        to: emailKey,
        subject: `Your BODYBARREL Order Confirmation: #${orderId.slice(0, 8).toUpperCase()}`,
        html: orderEmailHtml
      });
    } catch (err) {
      console.error("Failed to send order email:", err);
    }

    await logAudit({
      action: "RAZORPAY_PAYMENT_VERIFIED",
      status: "SUCCESS",
      userId: user?.id,
      userEmail: emailKey,
      details: { orderId, razorpay_payment_id }
    });

    return { success: true, orderId };
  } catch (error: any) {
    await logAudit({
      action: "RAZORPAY_PAYMENT_VERIFIED",
      status: "FAILED",
      userEmail: emailKey,
      details: error.message || String(error)
    });
    throw error;
  }
});
