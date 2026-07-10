import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withApiHandler } from "@/lib/api-helper";

export const dynamic = "force-dynamic";

export const GET = withApiHandler(async () => {
  const { data: products, error } = await supabase
    .from("Product")
    .select("*")
    .order("createdAt", { ascending: true });

  if (error) throw new Error(`DB Fetch: ${error.message}`);

  return NextResponse.json(products, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
    },
  });
});
