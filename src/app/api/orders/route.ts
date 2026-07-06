import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { sendEmail } from "@/lib/email";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySession(sessionCookie);
    if (!payload || !payload.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { totalUSD, items, shippingDetails } = await request.json();

    if (!items || !items.length) {
      return NextResponse.json({ error: "Order must contain at least one item" }, { status: 400 });
    }

    if (!shippingDetails || !shippingDetails.street) {
      return NextResponse.json({ error: "Shipping details are required" }, { status: 400 });
    }

    const emailKey = payload.email.toLowerCase().trim();

    // 1. Get or create user
    let user = await prisma.user.findUnique({
      where: { email: emailKey },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email: emailKey },
      });
    }

    // 2. Double check that products exist in the DB (upsert if they don't, to avoid foreign key failures)
    for (const item of items) {
      await prisma.product.upsert({
        where: { id: item.id },
        update: {
          name: item.name,
          priceUSD: item.price,
        },
        create: {
          id: item.id,
          name: item.name,
          subtitle: item.subtitle || "Premium Body Wash",
          priceUSD: item.price,
          image: item.image || "",
          hoverImage: "/products/texture-gel.png",
          description: item.description || "Premium physiological body wash.",
        },
      });
    }

    // 2.5 Verify inventory before placing the order
    for (const item of items) {
      const prod = await prisma.product.findUnique({
        where: { id: item.id },
      });
      if (prod && prod.inventory < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${prod.name}. Available inventory: ${prod.inventory}` },
          { status: 400 }
        );
      }
    }

    // 3. Create the order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: "PAID", // Default status is PAID when checkout is successful
        totalUSD,
        shippingName: `${shippingDetails.firstName || ""} ${shippingDetails.lastName || ""}`.trim() || "Customer",
        shippingStreet: shippingDetails.street,
        shippingCity: shippingDetails.city || "",
        shippingState: shippingDetails.state || "",
        shippingZip: shippingDetails.zip || "",
        shippingCountry: shippingDetails.country || "US",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            pricePaid: item.price,
          })),
        },
      },
    });

    // 4. Decrement inventory for each ordered item
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          inventory: {
            decrement: item.quantity,
          },
        },
      });
    }

    // 5. Clear user's cart in database
    const userCart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });
    if (userCart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });
    }

    // 6. Construct items rows for HTML table & Send Confirmation Receipt
    const itemsHtml = items.map((item: any) => `
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 12px 0; font-size: 13px; color: #333;">
          <strong style="text-transform: uppercase;">${item.name}</strong><br/>
          <span style="font-size: 11px; color: #888;">${item.subtitle || ""}</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; color: #333; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 0; font-size: 13px; color: #333; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join("");

    const orderEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 1px solid #eaeaea; padding-bottom: 20px; margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: 600; color: #111111; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 5px 0;">BODYBARREL</h2>
          <span style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Order Receipt & Confirmation</span>
        </div>

        <p style="font-size: 13px; color: #666; line-height: 1.6;">Hello,</p>
        <p style="font-size: 13px; color: #666; line-height: 1.6;">Thank you for your purchase. We have received your order and are preparing it for shipment. Below is your billing summary.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eaeaea; margin: 25px 0; font-size: 12px; line-height: 1.6; color: #444;">
          <strong style="display: block; font-size: 13px; color: #111; text-transform: uppercase; margin-bottom: 10px; border-bottom: 1px solid #eaeaea; padding-bottom: 5px;">Order Details</strong>
          <strong>Order Reference:</strong> #${order.id.slice(0, 8).toUpperCase()}<br/>
          <strong>Date:</strong> ${new Date().toLocaleDateString()}<br/>
          <strong>Delivery To:</strong> ${order.shippingName}<br/>
          <strong>Address:</strong> ${order.shippingStreet}, ${order.shippingCity}, ${order.shippingState} ${order.shippingZip}, ${order.shippingCountry}
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
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 15px 0 5px 0; font-size: 12px; color: #666; text-align: right; font-weight: 500;">Final Amount (USD):</td>
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

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error("POST Order API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
