import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";
import { userActionSchema } from "@/lib/schemas";
import { logAudit } from "@/lib/audit";

export const runtime = "edge";

export const POST = withApiHandler(async (request: Request) => {
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

  const body = await request.json();
  const validatedData = await userActionSchema.parseAsync(body);
  const emailKey = payload.email.toLowerCase().trim();

  // Action 1: Get/Fetch user details
  if (validatedData.action === "get") {
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
      const err = new Error("User not found");
      (err as any).status = 404;
      throw err;
    }

    return {
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
    };
  }

  // Action 2: Update/Save user details
  if (validatedData.action === "update") {
    const { firstName, lastName, addressDetails } = validatedData;
    
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
        .insert({ id: crypto.randomUUID(), email: emailKey, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
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
        country: addressDetails.country || "IN",
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
            id: crypto.randomUUID(),
            userId,
            title: "Primary Residence",
            isDefault: true,
            createdAt: new Date().toISOString(),
            ...addressData,
          });
      }
    }

    await logAudit({
      action: "USER_PROFILE_UPDATED",
      status: "SUCCESS",
      userId,
      userEmail: emailKey,
    });

    return {
      success: true,
      message: "Profile updated successfully",
    };
  }

  // Action 3: Add saved address (Limit to 3)
  if (validatedData.action === "add_address") {
    const { addressDetails } = validatedData;
    let { data: user } = await supabase
      .from("User")
      .select("id")
      .eq("email", emailKey)
      .single();

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from("User")
        .insert({ id: crypto.randomUUID(), email: emailKey, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
        .select("id")
        .single();
      if (createError) throw new Error(`User Creation: ${createError.message}`);
      user = newUser;
    }

    // Count existing addresses
    const { data: addresses, error: countError } = await supabase
      .from("Address")
      .select("id")
      .eq("userId", user.id);

    if (countError) throw new Error(`Count Addresses: ${countError.message}`);

    if (addresses && addresses.length >= 3) {
      const err = new Error("Maximum limit of 3 saved addresses reached. Please delete an address first.");
      (err as any).status = 400;
      (err as any).code = "MAX_ADDRESS_LIMIT";
      throw err;
    }

    const addressData = {
      id: crypto.randomUUID(),
      userId: user.id,
      title: `Address #${(addresses?.length || 0) + 1}`,
      name: addressDetails.name || "Customer",
      street: addressDetails.street,
      city: addressDetails.city || "",
      state: addressDetails.state || "",
      postalCode: addressDetails.postalCode || "",
      country: addressDetails.country || "IN",
      isDefault: (addresses?.length || 0) === 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { error: insertError } = await supabase
      .from("Address")
      .insert(addressData);

    if (insertError) throw new Error(`Insert Address: ${insertError.message}`);

    const { data: finalAddresses } = await supabase
      .from("Address")
      .select("*")
      .eq("userId", user.id);

    await logAudit({
      action: "USER_ADDRESS_ADDED",
      status: "SUCCESS",
      userId: user.id,
      userEmail: emailKey,
    });

    return {
      success: true,
      message: "Address saved successfully",
      addresses: finalAddresses || [],
    };
  }

  // Action 4: Delete saved address
  if (validatedData.action === "delete_address") {
    const { addressId } = validatedData;
    const { data: user } = await supabase
      .from("User")
      .select("id")
      .eq("email", emailKey)
      .single();

    if (!user) {
      const err = new Error("User not found");
      (err as any).status = 404;
      throw err;
    }

    const { error: deleteError } = await supabase
      .from("Address")
      .delete()
      .eq("id", addressId)
      .eq("userId", user.id);

    if (deleteError) throw new Error(`Delete Address: ${deleteError.message}`);

    const { data: finalAddresses } = await supabase
      .from("Address")
      .select("*")
      .eq("userId", user.id);

    await logAudit({
      action: "USER_ADDRESS_DELETED",
      status: "SUCCESS",
      userId: user.id,
      userEmail: emailKey,
      details: { addressId },
    });

    return {
      success: true,
      message: "Address deleted successfully",
      addresses: finalAddresses || [],
    };
  }

  const err = new Error("Invalid action specified");
  (err as any).status = 400;
  throw err;
});
