import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";
import { cartSyncSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";
export const runtime = "edge";

// GET: Retrieve user's cart from database
export const GET = withApiHandler(async (request: Request) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
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

  const { data: user } = await supabase
    .from("User")
    .select("id")
    .eq("email", emailKey)
    .single();

  if (!user) {
    return [];
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
    return [];
  }

  const formattedItems = cart.CartItem.map((item: any) => ({
    id: item.Product.id,
    name: item.Product.name,
    price: item.Product.priceUSD,
    image: item.Product.image,
    subtitle: item.Product.subtitle,
    quantity: item.quantity,
  }));

  return formattedItems;
});

// POST: Sync user's cart with database
export const POST = withApiHandler(async (request: Request) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
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

  const body = await request.json();
  const { items } = await cartSyncSchema.parseAsync(body);
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
      .insert({ id: crypto.randomUUID(), email: emailKey, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
      .select("id")
      .single();
    if (createError) throw new Error(`User Creation: ${createError.message}`);
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
      .insert({ id: crypto.randomUUID(), userId: user.id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
      .select("id")
      .single();
    if (cartError) throw new Error(`Cart Creation: ${cartError.message}`);
    cart = newCart;
  }

  // 3. Clear existing cart items
  await supabase
    .from("CartItem")
    .delete()
    .eq("cartId", cart.id);

  // 4. Create new cart items if items are provided
  if (items && items.length > 0) {
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
          subtitle: item.subtitle || "Premium Body Wash",
          priceUSD: item.price || 0,
          image: item.image || "",
          description: "Korean Bio-Active Body Wash Formula.",
          inventory: 100,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      await supabase.from("CartItem").insert({
        id: crypto.randomUUID(),
        cartId: cart.id,
        productId: item.id,
        quantity: item.quantity,
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

  return { success: true };
});

