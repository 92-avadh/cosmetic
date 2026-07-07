import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
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
      const { data: user, error: userError } = await supabase
        .from("User")
        .select(`
          id, email, firstName, lastName, role,
          Address ( id, title, name, street, city, state, postalCode, country, isDefault, createdAt, updatedAt ),
          Order ( id, status, totalUSD, shippingName, shippingStreet, shippingCity, shippingState, shippingZip, shippingCountry, createdAt, updatedAt,
            OrderItem ( id, productId, quantity, pricePaid, createdAt,
              Product ( id, name, subtitle, priceUSD, image )
            )
          )
        `)
        .eq("email", emailKey)
        .single();

      if (userError || !user) {
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
          addresses: user.Address || [],
          orders: (user.Order || []).map((o: any) => ({
            ...o,
            items: o.OrderItem || [],
          })),
        },
      });
    }

    // Action 2: Update/Save user details
    if (action === "update") {
      // Check if user exists
      const { data: existingUser } = await supabase
        .from("User")
        .select("id")
        .eq("email", emailKey)
        .single();

      let userId: string;

      if (!existingUser) {
        const { data: newUser, error: createError } = await supabase
          .from("User")
          .insert({ email: emailKey, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
          .select("id")
          .single();
        if (createError) throw new Error(createError.message);
        userId = newUser.id;
      } else {
        userId = existingUser.id;
      }

      // Update profile
      const { error: updateError } = await supabase
        .from("User")
        .update({
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          updatedAt: new Date().toISOString(),
        })
        .eq("id", userId);

      if (updateError) throw new Error(updateError.message);

      // Update address details if provided
      if (addressDetails && addressDetails.street) {
        const { data: existingAddress } = await supabase
          .from("Address")
          .select("id")
          .eq("userId", userId)
          .limit(1)
          .single();

        const addressData = {
          name: addressDetails.name || `${firstName || ""} ${lastName || ""}`.trim() || "Valued Customer",
          street: addressDetails.street,
          city: addressDetails.city || "",
          state: addressDetails.state || "",
          postalCode: addressDetails.postalCode || "",
          country: addressDetails.country || "US",
          updatedAt: new Date().toISOString(),
        };

        if (existingAddress) {
          await supabase
            .from("Address")
            .update(addressData)
            .eq("id", existingAddress.id);
        } else {
          await supabase
            .from("Address")
            .insert({
              userId,
              title: "Primary Residence",
              isDefault: true,
              createdAt: new Date().toISOString(),
              ...addressData,
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
