import { supabase } from "@/lib/supabase";
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

  const { data: product, error } = await supabase
    .from("Product")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Fetch recommendations (other products)
  const { data: recommendations } = await supabase
    .from("Product")
    .select("*")
    .neq("id", id)
    .limit(4);

  // Serialize date types to string format for next.js client boundary safety
  const serializedProduct = {
    ...product,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

  const serializedRecs = (recommendations || []).map((r: any) => ({
    ...r,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  }));

  return (
    <ProductDetailClient product={serializedProduct} recommendations={serializedRecs} />
  );
}
