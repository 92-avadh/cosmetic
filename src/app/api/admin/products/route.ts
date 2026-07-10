import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";
import { productCreateSchema } from "@/lib/schemas";

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
export const GET = withApiHandler(async (request) => {
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

  return { products, categories };
});

// POST: Add new product
export const POST = withApiHandler(async (request) => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await request.json();

  // 1. Zod input validation
  const {
    name,
    subtitle,
    priceUSD,
    image,
    sku,
    hoverImage,
    description,
    inventory,
    categorySlug,
  } = await productCreateSchema.parseAsync(body);

  // Autogenerate SKU if empty
  let productSku = sku ? sku.trim() : "";
  if (!productSku) {
    productSku = `BB-${(categorySlug || "GEN").slice(0, 4).toUpperCase()}-${name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
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
      sku: productSku,
      name,
      subtitle,
      priceUSD,
      image,
      hoverImage: hoverImage || "/products/texture-gel.png",
      description: description || "Premium cellular skincare formula.",
      inventory,
      categoryId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (productError) throw new Error(productError.message);

  return { success: true, product };
});

// PUT: Edit existing product
export const PUT = withApiHandler(async (request) => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await request.json();
  const { id, name, subtitle, priceUSD, image, sku, hoverImage, description, inventory, categorySlug } = body;

  // Autogenerate SKU if empty
  let productSku = sku ? sku.trim() : "";
  if (!productSku) {
    productSku = `BB-${(categorySlug || "GEN").slice(0, 4).toUpperCase()}-${name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  // Find or create category if categorySlug is provided
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

  const { data: updatedProduct, error: productError } = await supabase
    .from("Product")
    .update({
      name,
      sku: productSku,
      subtitle,
      priceUSD,
      image,
      hoverImage: hoverImage || undefined,
      description: description || undefined,
      inventory,
      categoryId,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (productError) throw new Error(productError.message);

  return { success: true, product: updatedProduct };
});

// DELETE: Remove product from catalog
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
      // ignore JSON parse error
    }
  }

  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("Product")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { success: true, message: "Product deleted successfully" };
});
