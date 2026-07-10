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
  const { 
    orderId, 
    status, 
    shippingName, 
    shippingStreet, 
    shippingCity, 
    shippingState, 
    shippingZip, 
    shippingCountry 
  } = body;

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  const { data: updatedOrder, error } = await supabase
    .from("Order")
    .update({
      status: status || undefined,
      shippingName: shippingName || undefined,
      shippingStreet: shippingStreet || undefined,
      shippingCity: shippingCity || undefined,
      shippingState: shippingState || undefined,
      shippingZip: shippingZip || undefined,
      shippingCountry: shippingCountry || undefined,
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
