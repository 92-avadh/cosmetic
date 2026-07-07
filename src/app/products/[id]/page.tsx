import { supabase } from "@/lib/supabase";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: any = null;
  let recommendations: any[] = [];

  // Try Supabase first
  try {
    const { data, error } = await supabase
      .from("Product")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      product = data;

      // Fetch recommendations from DB
      const { data: recs } = await supabase
        .from("Product")
        .select("*")
        .neq("id", id)
        .limit(4);

      recommendations = (recs || []).map((r: any) => ({
        ...r,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }));
    }
  } catch (_) {
    // Supabase unavailable — fall through to static catalog
  }

  // Fallback: use static catalog if DB returned nothing
  if (!product) {
    const staticProduct = PRODUCTS_CATALOG.find((p) => p.id === id);
    if (!staticProduct) {
      notFound();
    }
    product = {
      id: staticProduct.id,
      name: staticProduct.name,
      subtitle: staticProduct.subtitle,
      priceUSD: staticProduct.priceUSD,
      image: staticProduct.image,
      hoverImage: staticProduct.hoverImage,
      description: null,
      inventory: 99,
    };

    // Static recommendations = all other products
    recommendations = PRODUCTS_CATALOG.filter((p) => p.id !== id)
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        name: p.name,
        subtitle: p.subtitle,
        priceUSD: p.priceUSD,
        image: p.image,
        hoverImage: p.hoverImage,
        description: null,
        inventory: 99,
      }));
  }

  const serializedProduct = {
    ...product,
    createdAt: product.createdAt ?? null,
    updatedAt: product.updatedAt ?? null,
  };

  return (
    <ProductDetailClient product={serializedProduct} recommendations={recommendations} />
  );
}
