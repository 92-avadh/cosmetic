import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Authentication helper
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
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

    const carts = await prisma.cart.findMany({
      where: {
        items: {
          some: {}, // only carts with at least one item
        },
      },
      orderBy: { updatedAt: "desc" },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Format cart data for the dashboard
    const formattedCarts = carts.map((cart) => {
      const items = cart.items.map((item) => ({
        id: item.productId,
        name: item.product.name,
        subtitle: item.product.subtitle,
        priceUSD: item.product.priceUSD,
        image: item.product.image,
        quantity: item.quantity,
      }));

      const totalUSD = items.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);

      return {
        id: cart.id,
        userEmail: cart.user.email,
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
