import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export const runtime = "edge";

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return false;
  const payload = await verifySession(sessionCookie);
  return payload?.role === "ADMIN";
}

export async function POST(request: Request) {
  try {
    // 1. Secure check
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Fetch candidate carts (recoveryEmailSent = false, updated > 30 minutes ago)
    const thresholdTime = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    
    const { data: carts, error } = await supabase
      .from("Cart")
      .select(`
        id, userId, updatedAt, recoveryEmailSent,
        User ( email ),
        items:CartItem (
          quantity,
          product:Product ( id, name, subtitle, priceUSD, image )
        )
      `)
      .eq("recoveryEmailSent", false)
      .lt("updatedAt", thresholdTime);

    if (error) throw new Error(error.message);

    let sentCount = 0;
    let autoResolvedCount = 0;

    for (const cart of carts || []) {
      const email = Array.isArray(cart.User)
        ? (cart.User as any)[0]?.email
        : (cart.User as any)?.email;
      const cartItems = cart.items || [];

      if (!email || cartItems.length === 0) {
        // Skip empty carts or carts without valid user references
        continue;
      }

      // Check if user has a successful order created after the cart was last updated
      const { data: recentOrders } = await supabase
        .from("Order")
        .select("id, createdAt")
        .eq("userId", cart.userId)
        .gt("createdAt", cart.updatedAt)
        .in("status", ["PAID", "SHIPPED", "DELIVERED"]);

      if (recentOrders && recentOrders.length > 0) {
        // User checked out successfully already. Resolve this cart without emailing.
        await supabase
          .from("Cart")
          .update({ recoveryEmailSent: true })
          .eq("id", cart.id);
        autoResolvedCount++;
        continue;
      }

      // Build HTML list of abandoned products
      let itemsHtml = "";
      for (const item of cartItems) {
        const prod = Array.isArray(item.product) ? (item.product as any)[0] : (item.product as any);
        if (!prod) continue;
        itemsHtml += `
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 12px 0; font-size: 13px; color: #111;">
              <strong style="text-transform: uppercase;">${prod.name}</strong><br/>
              <span style="font-size: 10px; color: #666; text-transform: uppercase;">${prod.subtitle}</span>
            </td>
            <td style="padding: 12px 0; font-size: 12px; color: #666; text-align: center;">x${item.quantity}</td>
            <td style="padding: 12px 0; font-size: 13px; color: #111; text-align: right; font-weight: 600;">$${(prod.priceUSD * item.quantity).toFixed(2)}</td>
          </tr>
        `;
      }

      const recoveryEmailHtml = `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F6F4EE; color: #121212; border: 1px solid rgba(18, 18, 18, 0.12); border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <img src="https://gjlwnohlruwdfbjvrfas.supabase.co/storage/v1/object/public/assets/logo.png" alt="BODYBARREL" style="max-height: 40px; margin: 0 auto;" />
            <h1 style="font-family: 'Archivo', sans-serif; font-size: 24px; text-transform: uppercase; letter-spacing: -0.02em; margin-top: 20px; color: #121212;">YOUR ACTIVE CARE PROTOCOL</h1>
            <p style="font-size: 12px; color: #6B6A63; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 5px;">Unfinished Selection Recovery Feed</p>
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #121212; margin-bottom: 25px;">
            You left some items in your bag. BODYBARREL body wash formulations are engineered in clinical Korean skin labs to train biological resilience and seal post-shower hydration.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="border-bottom: 2px solid #121212;">
                <th style="text-align: left; padding-bottom: 10px; font-size: 11px; text-transform: uppercase; color: #6B6A63;">Product</th>
                <th style="text-align: center; padding-bottom: 10px; font-size: 11px; text-transform: uppercase; color: #6B6A63; width: 60px;">QTY</th>
                <th style="text-align: right; padding-bottom: 10px; font-size: 11px; text-transform: uppercase; color: #6B6A63; width: 80px;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="background-color: #EDE9DF; padding: 20px; border-radius: 6px; text-align: center; margin-bottom: 30px;">
            <p style="font-size: 13px; color: #121212; margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">COMPLETE TODAY AND SAVE 10%</p>
            <p style="font-size: 12px; color: #6B6A63; margin: 0 0 15px 0;">Use the exclusive coupon below at checkout to apply your discount:</p>
            <span style="display: inline-block; font-size: 18px; font-family: monospace; font-weight: 700; color: #C97A5E; border: 1.5px dashed #C97A5E; padding: 8px 24px; background-color: #F6F4EE; letter-spacing: 2px;">RECOVER10</span>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://cosmetic-web.pages.dev/cart" style="display: inline-block; background-color: #2d1c14; color: #F6F4EE; text-decoration: none; padding: 16px 36px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; border-radius: 3px; border: 1px solid #2d1c14;">
              Return to Bag
            </a>
          </div>

          <div style="text-align: center; margin-top: 40px; border-top: 1px solid rgba(18, 18, 18, 0.08); padding-top: 20px;">
            <p style="font-size: 10px; color: #6B6A63; margin: 0; line-height: 1.5;">You received this automated notification because items were left in your active session shopping bag.</p>
            <p style="font-size: 10px; color: #999; margin-top: 10px;">© 2026 BODYBARREL. All rights reserved.</p>
          </div>
        </div>
      `;

      // Dispatch Email
      try {
        await sendEmail({
          to: email,
          subject: "Your BODYBARREL Bag is waiting for you (10% off enclosed)",
          html: recoveryEmailHtml,
        });

        // Update database flag
        await supabase
          .from("Cart")
          .update({ recoveryEmailSent: true })
          .eq("id", cart.id);

        sentCount++;
      } catch (emailErr) {
        console.error(`Failed to send recovery email to ${email}:`, emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      autoResolvedCount,
    });
  } catch (error: any) {
    console.error("POST Abandoned Cart Recovery Error:", error);
    return NextResponse.json(
      { error: "Failed to execute recovery process" },
      { status: 500 }
    );
  }
}
