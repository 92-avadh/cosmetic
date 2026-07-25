import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";
import { logAudit } from "@/lib/audit";

export const POST = withApiHandler(async (request, context) => {
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

  // Get user ID
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

  const body = await request.json();
  const { returnType = "RETURN", returnReason = "" } = body;

  if (!returnReason || !returnReason.trim()) {
    const err = new Error("Please provide a reason for return/exchange.");
    (err as any).status = 400;
    throw err;
  }

  // Fetch target order
  const { data: order } = await supabase
    .from("Order")
    .select("*")
    .eq("id", id)
    .eq("userId", user.id)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Order not found or unauthorized." }, { status: 404 });
  }

  if (order.returnStatus && order.returnStatus !== "NONE") {
    const err = new Error(`A return or exchange request is already ${order.returnStatus.toLowerCase()} for this order.`);
    (err as any).status = 400;
    throw err;
  }

  const nowIso = new Date().toISOString();
  const { data: updatedOrder, error: updateError } = await supabase
    .from("Order")
    .update({
      status: "RETURN_REQUESTED",
      returnStatus: "REQUESTED",
      returnType: returnType === "EXCHANGE" ? "EXCHANGE" : "RETURN",
      returnReason: returnReason.trim(),
      returnRequestedAt: nowIso,
      updatedAt: nowIso,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (updateError) {
    throw new Error("Failed to submit return request. Please try again.");
  }

  await logAudit({
    userId: user.id,
    userEmail: emailKey,
    action: "ORDER_RETURN_REQUESTED",
    status: "SUCCESS",
    details: `Return requested for order ${id}. Type: ${returnType}`,
  });

  return NextResponse.json({
    success: true,
    message: "Return request submitted successfully. Awaiting admin review & approval.",
    order: updatedOrder,
  });
});
