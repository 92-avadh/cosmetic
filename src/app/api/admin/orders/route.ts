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
  status: z.enum(["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"]),
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

  const formattedOrders = orders?.map((order: any) => ({
    ...order,
    items: order.OrderItem?.map((item: any) => ({
      id: item.id,
      productId: item.Product?.id || "",
      product: item.Product ? {
        id: item.Product.id,
        name: item.Product.name,
        subtitle: item.Product.subtitle,
        priceUSD: item.Product.priceUSD,
        image: item.Product.image,
      } : null,
      quantity: item.quantity,
      pricePaid: item.pricePaid,
    })) || [],
  })) || [];

  return formattedOrders;
});

// POST: Update order status
export const POST = withApiHandler(async (request) => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await request.json();
  const { orderId, status } = await updateOrderStatusSchema.parseAsync(body);

  const { data: updatedOrder, error } = await supabase
    .from("Order")
    .update({ status, updatedAt: new Date().toISOString() })
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
    items: updatedOrder.OrderItem?.map((item: any) => ({
      id: item.id,
      productId: item.Product?.id || "",
      product: item.Product ? {
        id: item.Product.id,
        name: item.Product.name,
        subtitle: item.Product.subtitle,
        priceUSD: item.Product.priceUSD,
        image: item.Product.image,
      } : null,
      quantity: item.quantity,
      pricePaid: item.pricePaid,
    })) || [],
  } : null;

  return { success: true, order: formattedOrder };
});
