import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { signSession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";
import { otpVerifySchema } from "@/lib/schemas";
import { logAudit } from "@/lib/audit";
import { timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = withApiHandler(async (request: Request) => {
  let emailKey = "";
  try {
    const body = await request.json();
    const { email, code } = await otpVerifySchema.parseAsync(body);
    emailKey = email;
    const firstName = typeof body?.firstName === "string" ? body.firstName.trim() : undefined;
    const lastName = typeof body?.lastName === "string" ? body.lastName.trim() : undefined;

    // 1. Query the database for the active token
    const { data: tokens, error: tokenError } = await supabase
      .from("VerificationToken")
      .select("*")
      .eq("email", emailKey)
      .order("createdAt", { ascending: false })
      .limit(1);

    const tokenRecord = tokens?.[0];

    if (tokenError || !tokenRecord) {
      const err = new Error("Verification code not found. Please request a new OTP.");
      (err as any).status = 400;
      (err as any).code = "OTP_NOT_FOUND";
      throw err;
    }

    // 2. Verify expiration time (5–10 min window)
    const expiresAtRaw = tokenRecord.expiresAt;
    let parseStr = typeof expiresAtRaw === "string" ? expiresAtRaw.trim().replace(" ", "T") : String(expiresAtRaw);
    if (!parseStr.endsWith("Z") && !/[+-]\d{2}:?\d{2}$/.test(parseStr)) {
      parseStr += "Z";
    }
    const expiresDate = new Date(parseStr);

    if (isNaN(expiresDate.getTime()) || new Date() > expiresDate) {
      await supabase
        .from("VerificationToken")
        .delete()
        .eq("email", emailKey);

      const err = new Error("Verification code has expired. Please request a new OTP.");
      (err as any).status = 400;
      (err as any).code = "OTP_EXPIRED";
      throw err;
    }

    // 3. Verify code correctness using constant-time comparison
    const storedCodeStr = String(tokenRecord.code).trim();
    const submittedCodeStr = String(code).trim();
    const storedCode = Buffer.from(storedCodeStr, "utf8");
    const submittedCode = Buffer.from(submittedCodeStr, "utf8");
    if (storedCode.length !== submittedCode.length || !timingSafeEqual(storedCode, submittedCode)) {
      const err = new Error("Invalid verification code. Please try again.");
      (err as any).status = 400;
      (err as any).code = "OTP_INVALID";
      throw err;
    }

    // 4. OTP matches! Invalidate the consumed verification token
    await supabase
      .from("VerificationToken")
      .delete()
      .eq("email", emailKey);

    // 5. Determine Admin privilege
    const { getEnv } = await import("@/lib/env");
    const env = getEnv();
    const isAdmin = env.ADMIN_EMAIL && emailKey === env.ADMIN_EMAIL.toLowerCase().trim();

    // 6. Find or Create the User in the DB and mark emailVerified: true
    const { data: existingUser } = await supabase
      .from("User")
      .select("*")
      .eq("email", emailKey)
      .maybeSingle();

    let user;
    let isNewRegistration = false;

    if (existingUser) {
      // Existing user: mark emailVerified true and update profile info if provided
      const updatePayload: Record<string, unknown> = {
        role: isAdmin ? "ADMIN" : existingUser.role,
        emailVerified: true,
        updatedAt: new Date().toISOString(),
      };
      if (firstName && !existingUser.firstName) updatePayload.firstName = firstName;
      if (lastName && !existingUser.lastName) updatePayload.lastName = lastName;

      const { data: updatedUser, error: updateError } = await supabase
        .from("User")
        .update(updatePayload)
        .eq("email", emailKey)
        .select()
        .single();

      if (updateError) throw new Error(updateError.message);
      user = updatedUser;
    } else {
      // New user registration: create user with emailVerified = true
      isNewRegistration = true;
      const { data: newUser, error: createError } = await supabase
        .from("User")
        .insert({
          id: crypto.randomUUID(),
          email: emailKey,
          firstName: firstName || null,
          lastName: lastName || null,
          role: isAdmin ? "ADMIN" : "USER",
          emailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError) throw new Error(createError.message);
      user = newUser;
    }

    // 7. Set HTTP-only secure session cookie
    const token = await signSession({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieStore = await cookies().catch(() => null);
    if (!cookieStore) {
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
      action: isNewRegistration ? "USER_REGISTERED_AND_VERIFIED" : "USER_LOGIN_VERIFIED",
      status: "SUCCESS",
      userId: user.id,
      userEmail: user.email,
    });

    return NextResponse.json({
      success: true,
      message: isNewRegistration ? "Account created and email verified successfully" : "Email verified and logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        emailVerified: true,
      },
    });
  } catch (error: any) {
    if (emailKey) {
      await logAudit({
        action: "OTP_VERIFICATION",
        status: "FAILED",
        userEmail: emailKey,
        details: error.message || String(error),
      });
    }
    throw error;
  }
});
