import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
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
    throw new Error("Failed to fetch reviews");
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

// POST new product review (requires authentication)
export const POST = withApiHandler(async (request, context) => {
  const { id: productId } = await (context as { params: Promise<{ id: string }> }).params;

  // Require authentication
  const cookieStore = await cookies().catch(() => null);
  const sessionCookie = cookieStore?.get("session")?.value;
  if (!sessionCookie) {
    const err = new Error("Unauthorized");
    (err as any).status = 401;
    throw err;
  }
  const payload = await verifySession(sessionCookie);
  if (!payload || !payload.email) {
    const err = new Error("Unauthorized");
    (err as any).status = 401;
    throw err;
  }

  // Get user ID from session email
  const { data: user } = await supabase
    .from("User")
    .select("id")
    .eq("email", payload.email.toLowerCase().trim())
    .single();

  const body = await request.json();
  
  // 1. Zod input validation
  const { userName, rating, comment } = await reviewCreateSchema.parseAsync(body);

  // 2. Persist in database
  const newReview = {
    id: crypto.randomUUID(),
    productId,
    userId: user?.id || null,
    userName,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };

  const { error: insertError } = await supabase
    .from("Review")
    .insert(newReview);

  if (insertError) {
    throw new Error("Failed to submit review");
  }

  return {
    success: true,
    review: newReview,
  };
});
