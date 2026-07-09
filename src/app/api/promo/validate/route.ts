import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withApiHandler } from "@/lib/api-helper";
import { promoValidateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const POST = withApiHandler(async (request: Request) => {
  const body = await request.json();
  const { code } = await promoValidateSchema.parseAsync(body);

  // Look up the code in the database
  const { data: promo, error } = await supabase
    .from("PromoCode")
    .select("*")
    .eq("code", code)
    .single();

  if (error || !promo || !promo.isActive) {
    const err = new Error("Invalid or inactive promo code");
    (err as any).status = 400;
    (err as any).code = "PROMO_INVALID";
    throw err;
  }

  return {
    success: true,
    code: promo.code,
    discount: promo.discount,
  };
});

