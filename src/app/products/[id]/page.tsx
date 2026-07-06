import { prisma } from "@/lib/db";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  // Fetch recommendations
  const recommendations = await prisma.product.findMany({
    where: {
      NOT: { id },
    },
    take: 4,
  });

  // Serialize date types to string format for next.js client boundary safety
  const serializedProduct = {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  const serializedRecs = recommendations.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return (
    <ProductDetailClient product={serializedProduct} recommendations={serializedRecs} />
  );
}
