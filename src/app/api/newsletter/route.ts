import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-helper";
import { sendEmail } from "@/lib/email";

export const POST = withApiHandler(async (request: Request) => {
  const body = await request.json();
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const err = new Error("Please provide a valid email address.");
    (err as any).status = 400;
    throw err;
  }

  console.log(`[NEWSLETTER] New subscription: ${email}`);

  try {
    await sendEmail({
      to: email,
      subject: "Welcome to BODYBARREL — Cellular Skincare Science",
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 12px; background: #fff;">
          <div style="text-align: center; border-bottom: 1px solid #eaeaea; padding-bottom: 18px; margin-bottom: 22px;">
            <h2 style="font-size: 16px; font-weight: 600; color: #111; text-transform: uppercase; letter-spacing: 0.2em; margin: 0;">BODYBARREL</h2>
            <span style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Welcome Aboard</span>
          </div>
          <p style="font-size: 13px; color: #555; line-height: 1.7;">Thank you for subscribing to the BODYBARREL newsletter. You'll receive updates on new formulas, clinical insights, and exclusive offers.</p>
          <p style="font-size: 13px; color: #555; line-height: 1.7; margin-top: 16px;">Explore our full range of Korean cellular body care at <a href="https://bodybarrel.com/shop" style="color: #C97A5E; text-decoration: none; font-weight: 600;">bodybarrel.com/shop</a>.</p>
          <p style="font-size: 11px; color: #999; border-top: 1px solid #eaeaea; padding-top: 14px; margin-top: 30px; line-height: 1.5;">If you didn't request this subscription, please ignore this email.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }

  return { message: "Successfully subscribed to the newsletter." };
});
