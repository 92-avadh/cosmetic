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

// GET: Fetch products
export const GET = withApiHandler(async (request) => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { data: products, error: productsError } = await supabase
    .from("Product")
    .select("*")
    .order("createdAt", { ascending: false });

  if (productsError) throw new Error(productsError.message);

  return { products, categories: [] };
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
    specifications,
    inventory,
  } = await productCreateSchema.parseAsync(body);

  // Autogenerate SKU if empty
  let productSku = sku ? sku.trim() : "";
  if (!productSku) {
    productSku = `BB-PROD-${name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
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

  const insertData: Record<string, any> = {
    id: cleanId,
    sku: productSku,
    name,
    subtitle,
    priceUSD,
    image,
    hoverImage: hoverImage || "/products/texture-gel.png",
    description: description || "Premium body wash formula.",
    inventory,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (specifications) {
    insertData.specifications = specifications;
  }

  let { data: product, error: productError } = await supabase
    .from("Product")
    .insert(insertData)
    .select()
    .maybeSingle();

  // If column specifications does not exist on Supabase DB schema yet, retry without specifications column
  if (productError && insertData.specifications) {
    delete insertData.specifications;
    const retry = await supabase
      .from("Product")
      .insert(insertData)
      .select()
      .maybeSingle();
    product = retry.data;
    productError = retry.error;
  }

  if (productError && !product) throw new Error(productError.message);

  return { success: true, product };
});

// PUT: Edit existing product
export const PUT = withApiHandler(async (request) => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await request.json();
  const { productUpdateSchema } = await import("@/lib/schemas");
  const validated = await productUpdateSchema.parseAsync(body);
  const { id, name, subtitle, priceUSD, image, sku, hoverImage, description, specifications, inventory } = validated;

  // Autogenerate SKU if empty
  let productSku = sku ? sku.trim() : "";
  if (!productSku && name) {
    productSku = `BB-PROD-${name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  const updateData: Record<string, any> = {
    updatedAt: new Date().toISOString(),
  };

  if (name !== undefined) updateData.name = name;
  if (productSku) updateData.sku = productSku;
  if (subtitle !== undefined) updateData.subtitle = subtitle;
  if (priceUSD !== undefined) updateData.priceUSD = priceUSD;
  if (image !== undefined) updateData.image = image;
  if (hoverImage !== undefined) updateData.hoverImage = hoverImage;
  if (description !== undefined) updateData.description = description;
  if (inventory !== undefined) updateData.inventory = inventory;
  if (specifications !== undefined) updateData.specifications = specifications;

  let { data: updatedProduct, error: productError } = await supabase
    .from("Product")
    .update(updateData)
    .eq("id", id)
    .select()
    .maybeSingle();

  // If column specifications does not exist on Supabase DB schema yet, retry without specifications column
  if (productError && updateData.specifications) {
    delete updateData.specifications;
    const retry = await supabase
      .from("Product")
      .update(updateData)
      .eq("id", id)
      .select()
      .maybeSingle();
    updatedProduct = retry.data;
    productError = retry.error;
  }

  if (productError && !updatedProduct) throw new Error(productError.message);

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
