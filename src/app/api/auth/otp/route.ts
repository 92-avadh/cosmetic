import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail, generateOtpEmailHtml } from "@/lib/email";
import { withApiHandler } from "@/lib/api-helper";
import { otpRequestSchema } from "@/lib/schemas";
import { logAudit } from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = withApiHandler(async (request: Request) => {
  let emailKey = "";
  try {
    const body = await request.json();
    const { email } = await otpRequestSchema.parseAsync(body);
    emailKey = email;
    const mode = body?.mode === "register" ? "register" : "login";

    // Generate a secure 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP expires after 10 minutes (5–10 min requirement)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Clear any previous verification tokens for this email
    await supabase
      .from("VerificationToken")
      .delete()
      .eq("email", emailKey);

    // Store the fresh token
    const { error: insertError } = await supabase
      .from("VerificationToken")
      .insert({
        id: crypto.randomUUID(),
        email: emailKey,
        code: otp,
        expiresAt,
        createdAt: new Date().toISOString(),
      });

    if (insertError) {
      throw new Error(`Database error saving token: ${insertError.message}`);
    }

    // Generate professional branded email template
    const isRegister = mode === "register";
    const emailTitle = isRegister ? "Account Registration" : "Sign In Verification";
    const emailDesc = isRegister
      ? "Thank you for creating an account with BODYBARREL. Please use the verification code below to verify your email address. This code will expire in <strong>10 minutes</strong>."
      : "Please use the security code below to complete your sign-in. This code will expire in <strong>10 minutes</strong>.";

    const emailHtml = generateOtpEmailHtml(otp, emailTitle, emailDesc);

    // Send the verification email from connect@bodybarrel.com using Titan SMTP
    await sendEmail({
      to: emailKey,
      subject: `Your BODYBARREL Verification Code: ${otp}`,
      html: emailHtml,
    });

    await logAudit({
      action: isRegister ? "REGISTRATION_OTP_SENT" : "LOGIN_OTP_SENT",
      status: "SUCCESS",
      userEmail: emailKey,
    });

    return { success: true, message: "Verification code sent successfully" };
  } catch (error: any) {
    if (emailKey) {
      await logAudit({
        action: "OTP_GENERATED",
        status: "FAILED",
        userEmail: emailKey,
        details: error.message || String(error),
      });
    }
    throw error;
  }
});
