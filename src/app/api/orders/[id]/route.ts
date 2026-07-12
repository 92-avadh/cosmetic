import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";

export const GET = withApiHandler(async (request, context) => {
  const { id } = await (context as { params: Promise<{ id: string }> }).params;

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

  const emailKey = payload.email.toLowerCase().trim();

  // Get user ID from email
  const { data: user } = await supabase
    .from("User")
    .select("id")
    .eq("email", emailKey)
    .single();

  if (!user) {
    const err = new Error("Unauthorized");
    (err as any).status = 401;
    throw err;
  }

  // Fetch order — enforce ownership (admin can see any order via admin routes)
  const { data: order, error } = await supabase
    .from("Order")
    .select(`
      *,
      items:OrderItem(
        *,
        product:Product(*)
      )
    `)
    .eq("id", id)
    .eq("userId", user.id)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
});
