import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { signSession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";
import { otpVerifySchema } from "@/lib/schemas";
import { logAudit } from "@/lib/audit";
import { timingSafeEqual } from "crypto";

export const POST = withApiHandler(async (request: Request) => {
  let emailKey = "";
  try {
    const body = await request.json();
    const { email, code } = await otpVerifySchema.parseAsync(body);
    emailKey = email;

    // Query the database for the active token
    const { data: tokenRecord, error: tokenError } = await supabase
      .from("VerificationToken")
      .select("*")
      .eq("email", emailKey)
      .order("createdAt", { ascending: false })
      .limit(1)
      .single();

    if (tokenError || !tokenRecord) {
      const err = new Error("Verification code not found. Please request a new OTP.");
      (err as any).status = 400;
      (err as any).code = "OTP_NOT_FOUND";
      throw err;
    }

    // Verify expiration time
    const expiresAtRaw = tokenRecord.expiresAt;
    const expiresDate = new Date(
      typeof expiresAtRaw === "string"
        ? (expiresAtRaw.endsWith("Z") ? expiresAtRaw : expiresAtRaw + "Z")
        : expiresAtRaw
    );

    if (new Date() > expiresDate) {
      await supabase
        .from("VerificationToken")
        .delete()
        .eq("email", emailKey);
      
      const err = new Error("Verification code has expired. Please request a new OTP.");
      (err as any).status = 400;
      (err as any).code = "OTP_EXPIRED";
      throw err;
    }

    // Verify code correctness using constant-time comparison
    const storedCode = Buffer.from(tokenRecord.code, "utf8");
    const submittedCode = Buffer.from(code, "utf8");
    if (storedCode.length !== submittedCode.length) {
      const err = new Error("Invalid verification code. Please try again.");
      (err as any).status = 400;
      (err as any).code = "OTP_INVALID";
      throw err;
    }
    const codeMatch = timingSafeEqual(storedCode, submittedCode);
    if (!codeMatch) {
      const err = new Error("Invalid verification code. Please try again.");
      (err as any).status = 400;
      (err as any).code = "OTP_INVALID";
      throw err;
    }

    // OTP matches! Clear the verification token
    await supabase
      .from("VerificationToken")
      .delete()
      .eq("email", emailKey);

    // Create the User in the DB if they don't already exist (Auto-registration)
    const { getEnv } = await import("@/lib/env");
    const env = getEnv();
    const isAdmin = env.ADMIN_EMAIL && emailKey === env.ADMIN_EMAIL.toLowerCase().trim();

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
          id: crypto.randomUUID(),
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

    const cookieStore = await cookies().catch(() => null);
    if (!cookieStore) {
      // ponytail: Edge runtime (CF Workers) may not support cookies() — throw instead of leaking token
      const err = new Error("Server configuration error: cookies not supported in this runtime.");
      (err as any).status = 500;
      throw err;
    }
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    await logAudit({
      action: "USER_LOGIN",
      status: "SUCCESS",
      userId: user.id,
      userEmail: user.email,
    });

    // Return the response directly
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
    if (emailKey) {
      await logAudit({
        action: "USER_LOGIN",
        status: "FAILED",
        userEmail: emailKey,
        details: error.message || String(error),
      });
    }
    throw error;
  }
});
