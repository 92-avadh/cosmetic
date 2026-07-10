import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withApiHandler } from "@/lib/api-helper";

export const GET = withApiHandler(async (request, context) => {
  const { id } = await (context as { params: Promise<{ id: string }> }).params;

  // Fetch order details with OrderItem and Product relations
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
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
});
