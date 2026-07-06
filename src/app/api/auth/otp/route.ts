import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    const emailKey = email.toLowerCase().trim();

    // Generate a 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store in PostgreSQL database with 5 minutes expiration
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Clear previous verification tokens for this email to avoid clutter
    await prisma.verificationToken.deleteMany({
      where: { email: emailKey },
    });

    // Create the token in Supabase
    await prisma.verificationToken.create({
      data: {
        email: emailKey,
        code: otp,
        expiresAt,
      },
    });

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

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("OTP API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate OTP" },
      { status: 500 }
    );
  }
}
