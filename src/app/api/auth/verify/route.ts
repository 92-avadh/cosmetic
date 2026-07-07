import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { signSession } from "@/lib/session";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP code are required" },
        { status: 400 }
      );
    }

    const emailKey = email.toLowerCase().trim();
    const cleanOtp = otp.trim();

    // Query the database for the active token
    const { data: tokenRecord, error: tokenError } = await supabase
      .from("VerificationToken")
      .select("*")
      .eq("email", emailKey)
      .order("createdAt", { ascending: false })
      .limit(1)
      .single();

    if (tokenError || !tokenRecord) {
      return NextResponse.json(
        { error: "Verification code not found. Please request a new OTP." },
        { status: 400 }
      );
    }

    // Verify expiration time
    if (new Date() > new Date(tokenRecord.expiresAt)) {
      await supabase
        .from("VerificationToken")
        .delete()
        .eq("email", emailKey);
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new OTP." },
        { status: 400 }
      );
    }

    // Verify code correctness
    if (tokenRecord.code !== cleanOtp) {
      return NextResponse.json(
        { error: "Invalid verification code. Please try again." },
        { status: 400 }
      );
    }

    // OTP matches! Clear the verification token
    await supabase
      .from("VerificationToken")
      .delete()
      .eq("email", emailKey);

    // Create the User in the DB if they don't already exist (Auto-registration)
    const isAdmin = emailKey === "dhameliyaavadh592@gmail.com";

    // Check if user exists
    const { data: existingUser } = await supabase
      .from("User")
      .select("*")
      .eq("email", emailKey)
      .single();

    let user;
    if (existingUser) {
      // Update role if admin
      const { data: updatedUser, error: updateError } = await supabase
        .from("User")
        .update({ role: isAdmin ? "ADMIN" : existingUser.role, updatedAt: new Date().toISOString() })
        .eq("email", emailKey)
        .select()
        .single();
      if (updateError) throw new Error(updateError.message);
      user = updatedUser;
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from("User")
        .insert({
          email: emailKey,
          role: isAdmin ? "ADMIN" : "USER",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .select()
        .single();
      if (createError) throw new Error(createError.message);
      user = newUser;
    }

    // Set HTTP-only secure cookie
    const token = await signSession({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Verification API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify security code" },
      { status: 500 }
    );
  }
}
