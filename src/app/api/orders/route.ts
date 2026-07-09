import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { sendEmail } from "@/lib/email";
import { withApiHandler } from "@/lib/api-helper";
import { orderCreateSchema } from "@/lib/schemas";
import { logAudit } from "@/lib/audit";

export const runtime = "edge";


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
    const body = await request.json();
    const validatedData = await orderCreateSchema.parseAsync(body);
    const { totalUSD, items, shippingDetails } = validatedData;

    // 1. Get or create user
    let { data: user } = await supabase
      .from("User")
      .select("id")
      .eq("email", emailKey)
      .single();

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from("User")
        .insert({ id: crypto.randomUUID(), email: emailKey, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
        .select("id")
        .single();
      if (createError) throw new Error(createError.message);
      user = newUser;
    }

    // 2. Double check that products exist in the DB (upsert if they don't)
    for (const item of items) {
      const { data: existingProduct } = await supabase
        .from("Product")
        .select("id")
        .eq("id", item.id)
        .single();

      if (existingProduct) {
        await supabase
          .from("Product")
          .update({ name: item.name || "Skincare Product", updatedAt: new Date().toISOString() })
          .eq("id", item.id);
      } else {
        await supabase.from("Product").insert({
          id: item.id,
          name: item.name || "Skincare Product",
          subtitle: "Premium Cellular Skincare",
          priceUSD: totalUSD / items.length, // approximation if not existing
          image: "",
          hoverImage: "/products/texture-gel.png",
          description: "Premium physiological formula.",
          inventory: 100,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    }

    // 2.5 Verify inventory before placing the order
    for (const item of items) {
      const { data: prod } = await supabase
        .from("Product")
        .select("name, inventory")
        .eq("id", item.id)
        .single();

      if (prod && prod.inventory < item.quantity) {
        const err = new Error(`Insufficient stock for ${prod.name}. Available inventory: ${prod.inventory}`);
        (err as any).status = 400;
        (err as any).code = "INSUFFICIENT_STOCK";
        throw err;
      }
    }

    // 3. Create the order
    const orderId = crypto.randomUUID();
    const { data: order, error: orderError } = await supabase
      .from("Order")
      .insert({
        id: orderId,
        userId: user.id,
        status: "PAID",
        totalUSD,
        shippingName: `${shippingDetails.firstName || ""} ${shippingDetails.lastName || ""}`.trim() || "Customer",
        shippingStreet: shippingDetails.street,
        shippingCity: shippingDetails.city || "",
        shippingState: shippingDetails.state || "",
        shippingZip: shippingDetails.zip || "",
        shippingCountry: shippingDetails.country || "IN",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError || !order) throw new Error(orderError?.message || "Failed to create order");

    // 4. Create order items
    // Since catalog price is dynamic, retrieve actual price from product catalog
    const orderItems = [];
    for (const item of items) {
      const { data: dbProd } = await supabase.from("Product").select("priceUSD").eq("id", item.id).single();
      const finalPrice = dbProd ? dbProd.priceUSD : (totalUSD / items.length);
      orderItems.push({
        id: crypto.randomUUID(),
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        pricePaid: finalPrice,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    const { error: itemsError } = await supabase.from("OrderItem").insert(orderItems);
    if (itemsError) throw new Error(itemsError.message);

    // 5. Decrement inventory for each ordered item
    for (const item of items) {
      const { data: prod } = await supabase
        .from("Product")
        .select("inventory")
        .eq("id", item.id)
        .single();

      if (prod) {
        await supabase
          .from("Product")
          .update({
            inventory: Math.max(0, prod.inventory - item.quantity),
            updatedAt: new Date().toISOString(),
          })
          .eq("id", item.id);
      }
    }

    // 6. Clear user's cart in database
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

    // 7. Send Confirmation Receipt
    const itemsHtml = items.map((item: any) => `
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 12px 0; font-size: 13px; color: #333;">
          <strong style="text-transform: uppercase;">${item.name || "Product"}</strong>
        </td>
        <td style="padding: 12px 0; font-size: 13px; color: #333; text-align: center;">${item.quantity}</td>
      </tr>
    `).join("");

    const orderEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 1px solid #eaeaea; padding-bottom: 20px; margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: 600; color: #111111; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 5px 0;">BODYBARREL</h2>
          <span style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Order Receipt &amp; Confirmation</span>
        </div>

        <p style="font-size: 13px; color: #666; line-height: 1.6;">Hello,</p>
        <p style="font-size: 13px; color: #666; line-height: 1.6;">Thank you for your purchase. We have received your order and are preparing it for shipment. Below is your billing summary.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eaeaea; margin: 25px 0; font-size: 12px; line-height: 1.6; color: #444;">
          <strong style="display: block; font-size: 13px; color: #111; text-transform: uppercase; margin-bottom: 10px; border-bottom: 1px solid #eaeaea; padding-bottom: 5px;">Order Details</strong>
          <strong>Order Reference:</strong> #${order.id.slice(0, 8).toUpperCase()}<br/>
          <strong>Date:</strong> ${new Date().toLocaleDateString()}<br/>
          <strong>Delivery To:</strong> ${order.shippingName}<br/>
          <strong>Address:</strong> ${order.shippingStreet}, ${order.shippingCity}, ${order.shippingState || ""} ${order.shippingZip}, ${order.shippingCountry}
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
          <thead>
            <tr style="border-bottom: 2px solid #111;">
              <th style="text-align: left; padding-bottom: 10px; font-size: 11px; text-transform: uppercase; color: #111;">Item</th>
              <th style="text-align: center; padding-bottom: 10px; font-size: 11px; text-transform: uppercase; color: #111; width: 60px;">Qty</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 15px 0 5px 0; font-size: 12px; color: #666; text-align: right; font-weight: 500;">Final Amount (USD):</td>
              <td style="padding: 15px 0 5px 0; font-size: 13px; color: #111; text-align: right; font-weight: 700;">$${totalUSD.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div style="text-align: center; margin-top: 40px; border-top: 1px solid #eaeaea; padding-top: 20px;">
          <p style="font-size: 11px; color: #999; margin: 0; line-height: 1.5;">You can track your order status in real-time by signing into your Account Portal.</p>
          <p style="font-size: 10px; color: #aaa; margin-top: 10px;">© 2026 BODYBARREL. All rights reserved.</p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: emailKey,
        subject: `Your BODYBARREL Order Confirmation: #${order.id.slice(0, 8).toUpperCase()}`,
        html: orderEmailHtml,
      });
    } catch (err) {
      console.error("Failed to send order email confirmation:", err);
    }

    await logAudit({
      action: "ORDER_CREATED",
      status: "SUCCESS",
      userId: user.id,
      userEmail: emailKey,
      details: { orderId: order.id, totalUSD },
    });

    return {
      success: true,
      orderId: order.id,
    };
  } catch (error: any) {
    await logAudit({
      action: "ORDER_CREATED",
      status: "FAILED",
      userEmail: emailKey,
      details: error.message || String(error),
    });
    throw error;
  }
});

