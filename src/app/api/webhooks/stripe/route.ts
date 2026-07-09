import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import Stripe from "stripe";

export async function POST(request: Request) {
  const context = (globalThis as any)[Symbol.for("cloudflare.request_context")] || {};
  const env = context?.env || {};
  const stripeSecret = env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret) {
    console.error("❌ Webhook configuration missing: STRIPE_SECRET_KEY is not defined.");
    return NextResponse.json({ error: "Webhook keys missing" }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: "2024-12-18.acacia" as any,
    httpClient: Stripe.createFetchHttpClient(),
  });

  const sig = request.headers.get("stripe-signature");
  if (!sig || !webhookSecret) {
    console.error("❌ Webhook missing stripe-signature header or STRIPE_WEBHOOK_SECRET.");
    return NextResponse.json({ error: "Missing signature or secret key" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    event = await stripe.webhooks.constructEventAsync(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const email = session.metadata?.email;

    if (!orderId) {
      console.error("❌ Stripe Session completed, but orderId was missing from metadata.");
      return NextResponse.json({ error: "Missing orderId in metadata" }, { status: 400 });
    }

    try {
      // 1. Fetch current order
      const { data: order, error: fetchError } = await supabase
        .from("Order")
        .select("*")
        .eq("id", orderId)
        .single();

      if (fetchError || !order) {
        console.error(`❌ Order ${orderId} not found in database:`, fetchError?.message);
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Avoid double-processing if webhook fires multiple times
      if (order.status !== "PENDING") {
        console.log(`⚠️ Order ${orderId} has already been processed. Current status: ${order.status}`);
        return NextResponse.json({ received: true, alreadyProcessed: true });
      }

      // 2. Retrieve order items to update inventory and compile receipt details
      const { data: items, error: itemsError } = await supabase
        .from("OrderItem")
        .select(`
          id, productId, quantity, pricePaid,
          Product ( id, name, subtitle )
        `)
        .eq("orderId", orderId);

      if (itemsError || !items || items.length === 0) {
        console.error(`❌ Failed to retrieve items for Order ${orderId}:`, itemsError?.message);
        return NextResponse.json({ error: "Failed to retrieve order items" }, { status: 500 });
      }

      // 3. Decrement inventory for each item
      for (const item of items) {
        const { data: prod } = await supabase
          .from("Product")
          .select("inventory, name")
          .eq("id", item.productId)
          .single();

        if (prod) {
          const newInventory = Math.max(0, prod.inventory - item.quantity);
          await supabase
            .from("Product")
            .update({ inventory: newInventory })
            .eq("id", item.productId);
          console.log(`✓ Decremented inventory for ${prod.name}. New stock: ${newInventory}`);
        }
      }

      // 4. Update Order status to PAID
      const { error: updateError } = await supabase
        .from("Order")
        .update({
          status: "PAID",
          updatedAt: new Date().toISOString(),
        })
        .eq("id", orderId);

      if (updateError) throw new Error(updateError.message);
      console.log(`✓ Order ${orderId} status updated to PAID.`);

      // 5. Dispatch confirmation email
      const itemsHtml = items.map((item: any) => `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eaeaea; padding: 12px 0; font-size: 13px;">
          <div>
            <strong style="color: #111111;">${item.Product?.name || "Premium Item"}</strong> x ${item.quantity}
            <div style="font-size: 11px; color: #888888;">${item.Product?.subtitle || ""}</div>
          </div>
          <span style="font-weight: 600; color: #111111;">$${(item.pricePaid * item.quantity).toFixed(2)}</span>
        </div>
      `).join("");

      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 550px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 16px; background-color: #ffffff;">
          <h2 style="font-size: 18px; font-weight: 600; color: #111111; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 20px; border-bottom: 1px solid #eaeaea; padding-bottom: 12px;">Order Confirmed</h2>
          <p style="font-size: 13px; color: #666666; line-height: 1.6;">Thank you for your purchase. We are preparing your SKIN biological sourcing regime. Below is your transaction summary:</p>
          
          <div style="margin: 25px 0; border: 1px solid #eaeaea; border-radius: 8px; padding: 16px; background-color: #fafafa;">
            <div style="font-size: 11px; text-transform: uppercase; tracking-wider; color: #888888; margin-bottom: 12px;">Order ID: ${orderId}</div>
            ${itemsHtml}
            <div style="display: flex; justify-content: space-between; padding-top: 16px; font-weight: 700; font-size: 14px; border-t: 1px solid #eaeaea; margin-top: 12px; color: #111111;">
              <span>Total Paid</span>
              <span>$${order.totalUSD.toFixed(2)}</span>
            </div>
          </div>

          <div style="font-size: 12px; color: #666666; line-height: 1.6; border-top: 1px solid #eaeaea; padding-top: 16px; margin-top: 25px;">
            <strong>Shipping Destination:</strong><br/>
            ${order.shippingName}<br/>
            ${order.shippingStreet}<br/>
            ${order.shippingCity}, ${order.shippingState || ""} ${order.shippingZip}<br/>
            ${order.shippingCountry}
          </div>
          
          <p style="font-size: 11px; color: #999999; margin-top: 35px; border-top: 1px solid #eaeaea; padding-top: 12px; line-height: 1.5;">If you have any inquiries regarding your package details, please reply to this message directly.</p>
        </div>
      `;

      await sendEmail({
        to: email || order.userId, // User email or ID fallback
        subject: `Your BODYBARREL Purchase Confirmation (Order: ${orderId.slice(0, 8)})`,
        html: emailHtml,
      });

      console.log(`✓ Confirmation email successfully dispatched to ${email || order.userId}`);

    } catch (err: any) {
      console.error(`❌ Webhook Order processing error for Order ${orderId}:`, err);
      return NextResponse.json({ error: "Failed to process order update" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
