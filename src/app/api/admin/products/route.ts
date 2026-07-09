import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

export const dynamic = "force-dynamic";
// Authentication helper
async function checkAdminAuth() {
  const cookieStore = await cookies().catch(() => null);
  const sessionCookie = cookieStore?.get("session")?.value;
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

    const { data: products, error: productsError } = await supabase
      .from("Product")
      .select(`*, Category ( id, name, slug )`)
      .order("createdAt", { ascending: false });

    if (productsError) throw new Error(productsError.message);

    const { data: categories, error: categoriesError } = await supabase
      .from("Category")
      .select("*");

    if (categoriesError) throw new Error(categoriesError.message);

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
    const { data: existing } = await supabase
      .from("Product")
      .select("id")
      .eq("id", cleanId)
      .single();

    if (existing) {
      cleanId = `${cleanId}-${Math.round(Math.random() * 1000)}`;
    }

    // Find or create category
    let categoryId = null;
    if (categorySlug) {
      const slug = categorySlug.toLowerCase().trim();

      const { data: existingCategory } = await supabase
        .from("Category")
        .select("id")
        .eq("slug", slug)
        .single();

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const readableName = slug.charAt(0).toUpperCase() + slug.slice(1) + " System";
        const { data: newCategory, error: catError } = await supabase
          .from("Category")
          .insert({
            id: crypto.randomUUID(),
            name: readableName,
            slug,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          .select("id")
          .single();
        if (catError) throw new Error(catError.message);
        categoryId = newCategory.id;
      }
    }

    const { data: product, error: productError } = await supabase
      .from("Product")
      .insert({
        id: cleanId,
        name,
        subtitle,
        priceUSD: parseFloat(priceUSD),
        image,
        hoverImage: hoverImage || "/products/texture-gel.png",
        description: description || "Premium cellular skincare formula.",
        inventory: parseInt(inventory) || 100,
        categoryId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (productError) throw new Error(productError.message);

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("POST Admin Products Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
