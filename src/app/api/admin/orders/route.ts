import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";
import { z } from "zod";

export const dynamic = "force-dynamic";

// Authentication helper
async function checkAdminAuth() {
  const cookieStore = await cookies().catch(() => null);
  const sessionCookie = cookieStore?.get("session")?.value;
  if (!sessionCookie) return false;
  const payload = await verifySession(sessionCookie);
  return payload?.role === "ADMIN";
}

const updateOrderStatusSchema = z.object({
  orderId: z.string().uuid("Invalid order ID format"),
  status: z.string().min(1, "Status required"),
  returnStatus: z.string().optional(),
  returnAdminNote: z.string().optional(),
});

// GET: Fetch all orders
export const GET = withApiHandler(async () => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { data: orders, error } = await supabase
    .from("Order")
    .select(`
      *,
      User ( id, email, firstName, lastName ),
      OrderItem (
        id, quantity, pricePaid,
        Product ( id, name, subtitle, priceUSD, image )
      )
    `)
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);

  const formattedOrders = (orders as Record<string, unknown>[])?.map((order) => {
    const orderItems = (order.OrderItem as Record<string, unknown>[]) || [];
    return {
      ...order,
      user: order.User,
      items: orderItems.map((item) => {
        const product = item.Product as Record<string, unknown> | null;
        return {
          id: String(item.id),
          productId: product?.id ? String(product.id) : "",
          product: product ? {
            id: String(product.id),
            name: String(product.name),
            subtitle: String(product.subtitle),
            priceUSD: Number(product.priceUSD),
            image: String(product.image),
          } : null,
          quantity: Number(item.quantity),
          pricePaid: Number(item.pricePaid),
        };
      }),
    };
  }) || [];

  return formattedOrders;
});

// POST: Update order status
export const POST = withApiHandler(async (request) => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await request.json();
  const { orderId, status, returnStatus, returnAdminNote } = await updateOrderStatusSchema.parseAsync(body);

  if (returnStatus === "REJECTED" && (!returnAdminNote || !returnAdminNote.trim())) {
    const err = new Error("A rejection reason is required when rejecting a return request.");
    (err as any).status = 400;
    throw err;
  }

  const updateData: Record<string, any> = {
    status,
    updatedAt: new Date().toISOString(),
  };

  if (returnStatus !== undefined) {
    updateData.returnStatus = returnStatus;
  }
  if (returnAdminNote !== undefined) {
    updateData.returnAdminNote = returnAdminNote.trim();
  }
  if (returnStatus === "APPROVED" || returnStatus === "REJECTED" || returnStatus === "COMPLETED") {
    updateData.returnProcessedAt = new Date().toISOString();
  }

  const { data: updatedOrder, error } = await supabase
    .from("Order")
    .update(updateData)
    .eq("id", orderId)
    .select(`
      *,
      User ( id, email, firstName, lastName ),
      OrderItem (
        id, quantity, pricePaid,
        Product ( id, name, subtitle, priceUSD, image )
      )
    `)
    .single();

  if (error) throw new Error(error.message);

  // Send return status notification email to customer
  if (returnStatus === "APPROVED" || returnStatus === "REJECTED") {
    try {
      const { sendEmail } = await import("@/lib/email");
      const userObj = (updatedOrder as any)?.User;
      const recipientEmail = userObj?.email || (updatedOrder as any)?.email;
      const recipientName = userObj?.firstName || (updatedOrder as any)?.shippingName || "Customer";

      if (recipientEmail) {
        const isApproved = returnStatus === "APPROVED";
        const subject = `[BODYBARREL] Return Request ${isApproved ? "Accepted" : "Rejected"} - Order #${orderId.slice(0, 8).toUpperCase()}`;
        const noteText = returnAdminNote?.trim() || (isApproved ? "Return request approved. Reverse courier pickup has been scheduled." : "Return request rejected per store policy.");

        const html = `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #faf9f6; border: 1px solid #e5e5e0; border-radius: 12px; color: #111;">
            <div style="text-align: center; border-b: 1px solid #e5e5e0; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="font-size: 20px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin: 0; color: #111;">BODYBARREL</h1>
              <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #666; margin-top: 4px;">Return & Exchange Portal</p>
            </div>
            
            <h2 style="font-size: 16px; text-transform: uppercase; color: ${isApproved ? "#059669" : "#dc2626"}; margin-top: 0;">
              ${isApproved ? "✓ Return Request Accepted" : "✕ Return Request Update: Rejected"}
            </h2>

            <p style="font-size: 13px; line-height: 1.6; color: #333;">Dear ${recipientName},</p>
            
            <p style="font-size: 13px; line-height: 1.6; color: #333;">
              Your Return/Exchange request for Order <strong>#${orderId.slice(0, 8).toUpperCase()}</strong> has been reviewed by our administration team.
            </p>

            <div style="background: #ffffff; border: 1px solid ${isApproved ? "#a7f3d0" : "#fecaca"}; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: ${isApproved ? "#047857" : "#b91c1c"}; block; margin-bottom: 6px;">
                ${isApproved ? "Approval Note / Pickup Instructions:" : "Rejection Reason:"}
              </span>
              <p style="font-size: 13px; margin: 0; color: #111; font-weight: 500;">
                "${noteText}"
              </p>
            </div>

            ${isApproved ? `
              <p style="font-size: 12px; line-height: 1.5; color: #555;">
                Our courier logistics partner will initiate reverse pickup within 2 business days. Please ensure the formulation is securely packed in its original packaging.
              </p>
            ` : `
              <p style="font-size: 12px; line-height: 1.5; color: #555;">
                If you believe this rejection was made in error or have additional details to provide, please contact our support team from your account portal.
              </p>
            `}

            <div style="border-t: 1px solid #e5e5e0; margin-top: 24px; padding-top: 16px; text-align: center; font-size: 11px; color: #888;">
              BODYBARREL Care Team &bull; Cellular Skin Fitness
            </div>
          </div>
        `;

        sendEmail({ to: recipientEmail, subject, html }).catch((e) => {
          console.error("[RETURN EMAIL ERROR]:", e);
        });
      }
    } catch (emailErr) {
      console.error("[RETURN EMAIL DISPATCH ERROR]:", emailErr);
    }
  }

  const formattedOrder = updatedOrder ? {
    ...updatedOrder,
    user: (updatedOrder as Record<string, unknown>).User,
    items: ((updatedOrder as Record<string, unknown>).OrderItem as Record<string, unknown>[])?.map((item) => {
      const product = item.Product as Record<string, unknown> | null;
      return {
        id: String(item.id),
        productId: product?.id ? String(product.id) : "",
        product: product ? {
          id: String(product.id),
          name: String(product.name),
          subtitle: String(product.subtitle),
          priceUSD: Number(product.priceUSD),
          image: String(product.image),
        } : null,
        quantity: Number(item.quantity),
        pricePaid: Number(item.pricePaid),
      };
    }) || [],
  } : null;

  return { success: true, order: formattedOrder };
});

// PUT: Edit existing order details
export const PUT = withApiHandler(async (request) => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await request.json();
  const { orderUpdateSchema } = await import("@/lib/schemas");
  const validated = await orderUpdateSchema.parseAsync(body);
  const { orderId, ...updateFields } = validated;

  const { data: updatedOrder, error } = await supabase
    .from("Order")
    .update({
      ...updateFields,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select(`
      *,
      User ( id, email, firstName, lastName ),
      OrderItem (
        id, quantity, pricePaid,
        Product ( id, name, subtitle, priceUSD, image )
      )
    `)
    .single();

  if (error) throw new Error(error.message);

  const formattedOrder = updatedOrder ? {
    ...updatedOrder,
    user: (updatedOrder as Record<string, unknown>).User,
    items: ((updatedOrder as Record<string, unknown>).OrderItem as Record<string, unknown>[])?.map((item) => {
      const product = item.Product as Record<string, unknown> | null;
      return {
        id: String(item.id),
        productId: product?.id ? String(product.id) : "",
        product: product ? {
          id: String(product.id),
          name: String(product.name),
          subtitle: String(product.subtitle),
          priceUSD: Number(product.priceUSD),
          image: String(product.image),
        } : null,
        quantity: Number(item.quantity),
        pricePaid: Number(item.pricePaid),
      };
    }) || [],
  } : null;

  return { success: true, order: formattedOrder };
});

// DELETE: Remove order from database
export const DELETE = withApiHandler(async (request) => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const url = new URL(request.url);
  let id = url.searchParams.get("id");

  if (!id) {
    try {
      const body = await request.json();
      id = body.id;
    } catch {
      // ignore
    }
  }

  if (!id) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("Order")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { success: true, message: "Order deleted successfully" };
});
