import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withApiHandler } from "@/lib/api-helper";

export const dynamic = "force-dynamic";

export const GET = withApiHandler(async (request, context) => {
  const { id } = await (context as { params: Promise<{ id: string }> }).params;

  const { data: product, error } = await supabase
    .from("Product")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
    },
  });
});
