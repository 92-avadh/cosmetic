import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySession(sessionCookie);
    if (!payload || !payload.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action, firstName, lastName, addressDetails } = body;
    const emailKey = payload.email.toLowerCase().trim();

    // Action 1: Get/Fetch user details
    if (action === "get") {
      const user = await prisma.user.findUnique({
        where: { email: emailKey },
        include: {
          addresses: {
            orderBy: { isDefault: "desc" },
          },
          orders: {
            orderBy: { createdAt: "desc" },
            include: {
              items: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          addresses: user.addresses,
          orders: user.orders,
        },
      });
    }

    // Action 2: Update/Save user details
    if (action === "update") {
      // Check if user exists
      let user = await prisma.user.findUnique({
        where: { email: emailKey },
      });

      if (!user) {
        user = await prisma.user.create({
          data: { email: emailKey },
        });
      }

      // Update profile
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: firstName || undefined,
          lastName: lastName || undefined,
        },
      });

      // Update address details if provided
      if (addressDetails && addressDetails.street) {
        const existingAddress = await prisma.address.findFirst({
          where: { userId: user.id },
        });

        if (existingAddress) {
          await prisma.address.update({
            where: { id: existingAddress.id },
            data: {
              name: addressDetails.name || `${firstName || ""} ${lastName || ""}`.trim() || "Valued Customer",
              street: addressDetails.street,
              city: addressDetails.city || "",
              state: addressDetails.state || "",
              postalCode: addressDetails.postalCode || "",
              country: addressDetails.country || "US",
            },
          });
        } else {
          await prisma.address.create({
            data: {
              userId: user.id,
              title: "Primary Residence",
              name: addressDetails.name || `${firstName || ""} ${lastName || ""}`.trim() || "Valued Customer",
              street: addressDetails.street,
              city: addressDetails.city || "",
              state: addressDetails.state || "",
              postalCode: addressDetails.postalCode || "",
              country: addressDetails.country || "US",
              isDefault: true,
            },
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: "Profile updated successfully",
      });
    }

    return NextResponse.json({ error: "Invalid action specified" }, { status: 400 });
  } catch (error: any) {
    console.error("POST User API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
