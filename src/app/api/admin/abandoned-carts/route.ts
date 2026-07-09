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

// GET: Fetch all active/abandoned carts
export async function GET(request: Request) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Get all carts that have at least one item
    const { data: cartItems } = await supabase
      .from("CartItem")
      .select("cartId");

    const cartIdsWithItems = [...new Set((cartItems || []).map((ci: any) => ci.cartId))];

    if (cartIdsWithItems.length === 0) {
      return NextResponse.json([]);
    }

    const { data: carts, error } = await supabase
      .from("Cart")
      .select(`
        id, updatedAt,
        User ( email ),
        CartItem (
          quantity,
          Product ( id, name, subtitle, priceUSD, image )
        )
      `)
      .in("id", cartIdsWithItems)
      .order("updatedAt", { ascending: false });

    if (error) throw new Error(error.message);

    const formattedCarts = (carts || []).map((cart: any) => {
      const items = (cart.CartItem || []).map((item: any) => ({
        id: item.Product.id,
        name: item.Product.name,
        subtitle: item.Product.subtitle,
        priceUSD: item.Product.priceUSD,
        image: item.Product.image,
        quantity: item.quantity,
      }));

      const totalUSD = items.reduce((acc: number, item: any) => acc + item.priceUSD * item.quantity, 0);

      return {
        id: cart.id,
        userEmail: cart.User?.email || "Unknown",
        updatedAt: cart.updatedAt,
        items,
        totalUSD,
      };
    });

    return NextResponse.json(formattedCarts);
  } catch (error: any) {
    console.error("GET Admin Carts Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch abandoned carts" },
      { status: 500 }
    );
  }
}
