import { PRODUCTS_CATALOG } from "@/lib/products-catalog";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "edge";


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Look up from static catalog — no Supabase, no network call, no env vars needed
  const staticProduct = PRODUCTS_CATALOG.find((p) => p.id === id);

  if (!staticProduct) {
    notFound();
  }

  const product = {
    id: staticProduct.id,
    name: staticProduct.name,
    subtitle: staticProduct.subtitle,
    priceUSD: staticProduct.priceUSD,
    image: staticProduct.image,
    hoverImage: staticProduct.hoverImage ?? null,
    description: null as string | null,
    inventory: 99,
  };

  const recommendations = PRODUCTS_CATALOG.filter((p) => p.id !== id)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      subtitle: p.subtitle,
      priceUSD: p.priceUSD,
      image: p.image,
      hoverImage: p.hoverImage ?? null,
      description: null as string | null,
      inventory: 99,
    }));

  return (
    <ProductDetailClient product={product} recommendations={recommendations} />
  );
}
