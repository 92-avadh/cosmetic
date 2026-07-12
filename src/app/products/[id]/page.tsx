import { PRODUCTS_CATALOG } from "@/lib/products-catalog";
import { supabase } from "@/lib/supabase";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

// Required for @cloudflare/next-on-pages — routes without this are excluded from the Worker bundle
export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS_CATALOG.find((p) => p.id === id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const productUrl = `${SITE_URL}/products/${product.id}`;
  const imageUrl = product.image.startsWith("/") ? `${SITE_URL}${product.image}` : product.image;

  return {
    title: product.name,
    description: product.subtitle,
    openGraph: {
      type: "website",
      title: product.name,
      description: product.subtitle,
      url: productUrl,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.subtitle,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
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
        createdAt: r.createdAt ?? null,
        updatedAt: r.updatedAt ?? null,
      }));
    } else if (error) {
      console.warn("Supabase query returned error, falling back to static catalog:", error);
    }
  } catch (err) {
    console.error("Supabase failed to fetch product details, falling back to static catalog:", err);
  }

  // Fallback: use static catalog if DB returned nothing or failed
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
      hoverImage: staticProduct.hoverImage ?? null,
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
        hoverImage: p.hoverImage ?? null,
        description: null,
        inventory: 99,
      }));
  }

  const serializedProduct = {
    ...product,
    createdAt: product.createdAt ?? null,
    updatedAt: product.updatedAt ?? null,
  };

  const productUrl = `${SITE_URL}/products/${product.id}`;
  const imageUrl = product.image.startsWith("/") ? `${SITE_URL}${product.image}` : product.image;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.subtitle || product.description || "Premium Korean skincare formula.",
    image: imageUrl,
    url: productUrl,
    brand: { "@type": "Brand", name: "BODYBARREL" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceUSD.toFixed(2),
      availability: product.inventory > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: productUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={serializedProduct} recommendations={recommendations} />
    </>
  );
}
