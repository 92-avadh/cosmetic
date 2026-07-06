import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
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

    const user = await prisma.user.findUnique({
      where: { email: emailKey },
      include: {
        carts: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.carts) {
      return NextResponse.json([]);
    }

    const formattedItems = user.carts.items.map((item) => ({
      id: item.productId,
      name: item.product.name,
      price: item.product.priceUSD,
      image: item.product.image,
      subtitle: item.product.subtitle,
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
    let user = await prisma.user.findUnique({
      where: { email: emailKey },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email: emailKey },
      });
    }

    // 2. Find or create the user's cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    // 3. Clear existing cart items
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // 4. Create new cart items if items are provided
    if (items && Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        const prod = await prisma.product.findUnique({
          where: { id: item.id },
        });

        if (!prod) {
          // If the product catalog is client-side fallback, we should ensure the product exists in the DB
          await prisma.product.create({
            data: {
              id: item.id,
              name: item.name || "Unknown Product",
              subtitle: item.subtitle || "Premium Skincare",
              priceUSD: item.price || 0,
              image: item.image || "",
              description: "Premium cellular skincare formula.",
            },
          });
        }

        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.id,
            quantity: item.quantity || 1,
          },
        });
      }
    }

    // Touch the cart updatedAt to mark activity time
    await prisma.cart.update({
      where: { id: cart.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Cart Sync API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to sync cart" },
      { status: 500 }
    );
  }
}
