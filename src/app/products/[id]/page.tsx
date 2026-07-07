"use client";

// Required for @cloudflare/next-on-pages — routes without this are excluded from the Worker bundle
export const dynamic = "force-dynamic";
export const runtime = "edge";

import { useParams } from "next/navigation";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";
import ProductDetailClient from "./ProductDetailClient";

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;

  if (!id) return null;

  const staticProduct = PRODUCTS_CATALOG.find((p) => p.id === id);

  if (!staticProduct) {
    // notFound() cannot be called in client components — render a redirect instead
    if (typeof window !== "undefined") {
      window.location.href = "/shop";
    }
    return null;
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
