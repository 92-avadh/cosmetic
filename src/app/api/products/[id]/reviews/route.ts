import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withApiHandler } from "@/lib/api-helper";
import { reviewCreateSchema } from "@/lib/schemas";

// GET reviews and compute statistics
export const GET = withApiHandler(async (request, context) => {
  const { id: productId } = await (context as { params: Promise<{ id: string }> }).params;

  const { data: reviews, error } = await supabase
    .from("Review")
    .select("*")
    .eq("productId", productId)
    .order("createdAt", { ascending: false });

  if (error) {
    throw new Error(`DB Fetch Reviews failed: ${error.message}`);
  }

  const reviewCount = reviews.length;
  const totalRating = reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
  const averageRating = reviewCount > 0 ? Number((totalRating / reviewCount).toFixed(1)) : 0;

  return NextResponse.json(
    {
      reviews,
      stats: {
        count: reviewCount,
        average: averageRating,
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    }
  );
});

// POST new product review
export const POST = withApiHandler(async (request, context) => {
  const { id: productId } = await (context as { params: Promise<{ id: string }> }).params;
  const body = await request.json();
  
  // 1. Zod input validation
  const { userName, rating, comment, userId } = await reviewCreateSchema.parseAsync(body);

  // 2. Persist in database
  const newReview = {
    id: crypto.randomUUID(),
    productId,
    userId: userId || null,
    userName,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };

  const { error: insertError } = await supabase
    .from("Review")
    .insert(newReview);

  if (insertError) {
    throw new Error(`DB Review insert failed: ${insertError.message}`);
  }

  return {
    success: true,
    review: newReview,
  };
});
