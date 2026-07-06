import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Promo code is required" }, { status: 400 });
    }

    const cleanCode = code.toUpperCase().trim();

    // Look up the code in the database
    const promo = await prisma.promoCode.findUnique({
      where: { code: cleanCode },
    });

    if (!promo || !promo.isActive) {
      return NextResponse.json({ error: "Invalid or inactive promo code" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      code: promo.code,
      discount: promo.discount,
    });
  } catch (error: any) {
    console.error("Promo Code Validation API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to validate promo code" },
      { status: 500 }
    );
  }
}
