import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "edge";

// Authentication helper
async function checkAdminAuth() {
  const cookieStore = await cookies().catch(() => null);
  const sessionCookie = cookieStore?.get("session")?.value;
  if (!sessionCookie) return false;
  const payload = await verifySession(sessionCookie);
  return payload?.role === "ADMIN";
}

// GET: Fetch all orders
export async function GET(request: Request) {
  try {
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

    return NextResponse.json(formattedOrders);
  } catch (error: any) {
    console.error("GET Admin Orders Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST: Update order status
export async function POST(request: Request) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: "orderId and status are required" }, { status: 400 });
    }

    // Validate status value
    const allowedStatuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

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

    return NextResponse.json({ success: true, order: formattedOrder });
  } catch (error: any) {
    console.error("POST Admin Orders Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update order status" },
      { status: 500 }
    );
  }
}
