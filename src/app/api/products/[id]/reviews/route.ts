import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";

// GET reviews and compute statistics
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;

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
  } catch (error: any) {
    console.error("GET Product Reviews API Error:", error);
    return NextResponse.json(
      { error: "Failed to load product reviews" },
      { status: 500 }
    );
  }
}

// POST new product review
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const { userName, rating, comment, userId } = await request.json();

    // 1. Inputs validation
    const trimmedName = String(userName || "").trim().slice(0, 100);
    const trimmedComment = String(comment || "").trim().slice(0, 1000);
    const numericRating = Math.floor(Number(rating));

    if (!trimmedName) {
      return NextResponse.json({ error: "Reviewer name is required" }, { status: 400 });
    }

    if (!trimmedComment) {
      return NextResponse.json({ error: "Review comment is required" }, { status: 400 });
    }

    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json({ error: "Rating must be a value between 1 and 5" }, { status: 400 });
    }

    // 2. Persist in database
    const newReview = {
      id: crypto.randomUUID(),
      productId,
      userId: userId || null,
      userName: trimmedName,
      rating: numericRating,
      comment: trimmedComment,
      createdAt: new Date().toISOString(),
    };

    const { error: insertError } = await supabase
      .from("Review")
      .insert(newReview);

    if (insertError) {
      throw new Error(`DB Review insert failed: ${insertError.message}`);
    }

    return NextResponse.json({
      success: true,
      review: newReview,
    });
  } catch (error: any) {
    console.error("POST Product Review API Error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
