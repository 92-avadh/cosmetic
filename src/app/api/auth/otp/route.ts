import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { withApiHandler } from "@/lib/api-helper";
import { otpRequestSchema } from "@/lib/schemas";
import { logAudit } from "@/lib/audit";

export const runtime = "edge";

export const POST = withApiHandler(async (request: Request) => {
  let emailKey = "";
  try {
    const body = await request.json();
    const { email } = await otpRequestSchema.parseAsync(body);
    emailKey = email;

    // Generate a 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`\n🔑 [OTP GENERATED] Email: ${emailKey} | Code: ${otp}\n`);

    // Store in Supabase with 5 minutes expiration
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // Clear previous verification tokens for this email
    await supabase
      .from("VerificationToken")
      .delete()
      .eq("email", emailKey);

    // Create the token
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
      throw new Error(`DB Insert Error: ${insertError.message}`);
    }

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff;">
        <h2 style="font-size: 18px; font-weight: 600; color: #111111; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 20px; border-bottom: 1px solid #eaeaea; padding-bottom: 12px;">BODYBARREL Verification</h2>
        <p style="font-size: 13px; color: #666666; line-height: 1.6; margin-bottom: 25px;">Please use the security code below to complete your sign-in. This code is valid for 5 minutes.</p>
        <div style="font-size: 28px; font-weight: 700; letter-spacing: 0.2em; text-align: center; color: #111111; margin: 30px 0; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; font-family: monospace;">
          ${otp}
        </div>
        <p style="font-size: 11px; color: #999999; margin-top: 35px; border-t: 1px solid #eaeaea; padding-top: 12px; line-height: 1.5;">If you did not request this login code, you can safely ignore this message.</p>
      </div>
    `;

    // Dispatch the verification email
    await sendEmail({
      to: emailKey,
      subject: `Your BODYBARREL Verification Code: ${otp}`,
      html: emailHtml,
    });

    await logAudit({
      action: "OTP_GENERATED",
      status: "SUCCESS",
      userEmail: emailKey,
    });

    return { success: true };
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

