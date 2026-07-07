import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "edge";

// GET: Retrieve user's cart from database
export async function GET(request: Request) {
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

    const emailKey = payload.email.toLowerCase().trim();

    const { data: user } = await supabase
      .from("User")
      .select("id")
      .eq("email", emailKey)
      .single();

    if (!user) {
      return NextResponse.json([]);
    }

    const { data: cart } = await supabase
      .from("Cart")
      .select(`
        id,
        CartItem (
          id, quantity,
          Product ( id, name, priceUSD, image, subtitle )
        )
      `)
      .eq("userId", user.id)
      .single();

    if (!cart || !cart.CartItem) {
      return NextResponse.json([]);
    }

    const formattedItems = cart.CartItem.map((item: any) => ({
      id: item.Product.id,
      name: item.Product.name,
      price: item.Product.priceUSD,
      image: item.Product.image,
      subtitle: item.Product.subtitle,
      quantity: item.quantity,
    }));

    return NextResponse.json(formattedItems);
  } catch (error: any) {
    console.error("GET Cart Sync API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

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

    const { items } = await request.json();
    const emailKey = payload.email.toLowerCase().trim();

    // 1. Get or create user
    let { data: user } = await supabase
      .from("User")
      .select("id")
      .eq("email", emailKey)
      .single();

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from("User")
        .insert({ email: emailKey, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
        .select("id")
        .single();
      if (createError) throw new Error(createError.message);
      user = newUser;
    }

    // 2. Find or create the user's cart
    let { data: cart } = await supabase
      .from("Cart")
      .select("id")
      .eq("userId", user.id)
      .single();

    if (!cart) {
      const { data: newCart, error: cartError } = await supabase
        .from("Cart")
        .insert({ userId: user.id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
        .select("id")
        .single();
      if (cartError) throw new Error(cartError.message);
      cart = newCart;
    }

    // 3. Clear existing cart items
    await supabase
      .from("CartItem")
      .delete()
      .eq("cartId", cart.id);

    // 4. Create new cart items if items are provided
    if (items && Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        // Ensure product exists
        const { data: prod } = await supabase
          .from("Product")
          .select("id")
          .eq("id", item.id)
          .single();

        if (!prod) {
          await supabase.from("Product").insert({
            id: item.id,
            name: item.name || "Unknown Product",
            subtitle: item.subtitle || "Premium Skincare",
            priceUSD: item.price || 0,
            image: item.image || "",
            description: "Premium cellular skincare formula.",
            inventory: 100,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }

        await supabase.from("CartItem").insert({
          cartId: cart.id,
          productId: item.id,
          quantity: item.quantity || 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    }

    // Touch the cart updatedAt to mark activity time
    await supabase
      .from("Cart")
      .update({ updatedAt: new Date().toISOString() })
      .eq("id", cart.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Cart Sync API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to sync cart" },
      { status: 500 }
    );
  }
}
