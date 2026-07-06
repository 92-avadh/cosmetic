import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "edge";

// Authentication helper
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return false;
  const payload = await verifySession(sessionCookie);
  return payload?.role === "ADMIN";
}

// GET: Fetch products and categories
export async function GET(request: Request) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
      },
    });

    const categories = await prisma.category.findMany();

    return NextResponse.json({ products, categories });
  } catch (error: any) {
    console.error("GET Admin Products Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: Add new product
export async function POST(request: Request) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const {
      name,
      subtitle,
      priceUSD,
      image,
      hoverImage,
      description,
      inventory,
      categorySlug,
    } = await request.json();

    if (!name || !subtitle || !priceUSD || !image) {
      return NextResponse.json(
        { error: "Name, subtitle, price, and image are required" },
        { status: 400 }
      );
    }

    // Generate custom slug ID from name
    let cleanId = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Check if ID already exists, make unique if needed
    const existing = await prisma.product.findUnique({
      where: { id: cleanId },
    });

    if (existing) {
      cleanId = `${cleanId}-${Math.round(Math.random() * 1000)}`;
    }

    // Find or create category
    let categoryId = null;
    if (categorySlug) {
      const slug = categorySlug.toLowerCase().trim();
      let category = await prisma.category.findUnique({
        where: { slug },
      });

      if (!category) {
        // Create category
        const readableName = slug.charAt(0).toUpperCase() + slug.slice(1) + " System";
        category = await prisma.category.create({
          data: {
            name: readableName,
            slug,
          },
        });
      }
      categoryId = category.id;
    }

    const product = await prisma.product.create({
      data: {
        id: cleanId,
        name,
        subtitle,
        priceUSD: parseFloat(priceUSD),
        image,
        hoverImage: hoverImage || "/products/texture-gel.png",
        description: description || "Premium cellular skincare formula.",
        inventory: parseInt(inventory) || 100,
        categoryId,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("POST Admin Products Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
