import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, totalUSD, items, shippingDetails } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!items || !items.length) {
      return NextResponse.json({ error: "Order must contain at least one item" }, { status: 400 });
    }

    if (!shippingDetails || !shippingDetails.street) {
      return NextResponse.json({ error: "Shipping details are required" }, { status: 400 });
    }

    const emailKey = email.toLowerCase().trim();

    // 1. Get or create user
    let user = await prisma.user.findUnique({
      where: { email: emailKey },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email: emailKey },
      });
    }

    // 2. Double check that products exist in the DB (upsert if they don't, to avoid foreign key failures)
    for (const item of items) {
      await prisma.product.upsert({
        where: { id: item.id },
        update: {
          name: item.name,
          priceUSD: item.price,
        },
        create: {
          id: item.id,
          name: item.name,
          subtitle: item.subtitle || "Premium Body Wash",
          priceUSD: item.price,
          image: item.image || "",
          hoverImage: "/products/texture-gel.png",
          description: item.description || "Premium physiological body wash.",
        },
      });
    }

    // 3. Create the order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: "DELIVERED", // set to DELIVERED immediately to simulate successful delivery
        totalUSD,
        shippingName: `${shippingDetails.firstName || ""} ${shippingDetails.lastName || ""}`.trim() || "Customer",
        shippingStreet: shippingDetails.street,
        shippingCity: shippingDetails.city || "",
        shippingState: shippingDetails.state || "",
        shippingZip: shippingDetails.zip || "",
        shippingCountry: shippingDetails.country || "US",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            pricePaid: item.price,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error("POST Order API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
