import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("Product")
      .select("*")
      .order("createdAt", { ascending: true });

    if (error) throw new Error(error.message);

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("GET Products API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
