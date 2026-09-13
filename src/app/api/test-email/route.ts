import { NextResponse } from "next/server";
import { z } from "zod";
import {
  verifySmtpConnection,
  sendEmail,
  generateOtpEmailHtml,
  getSmtpConfig,
} from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Input validation schema for test email request
const testEmailSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(100, "Email must not exceed 100 characters")
    .transform((val) => val.toLowerCase().trim()),
});

/**
 * GET /api/test-email
 * Quick diagnostic endpoint to verify SMTP connection without sending an email.
 */
export async function GET() {
  const config = getSmtpConfig();

  try {
    const result = await verifySmtpConnection();
    return NextResponse.json(
      {
        success: true,
        message: result.message,
        smtp: {
          host: config.host,
          port: config.port,
          secure: config.secure,
          user: config.user,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message || "SMTP verification failed",
          code: error.code || "SMTP_VERIFY_FAILED",
        },
        smtp: {
          host: config.host,
          port: config.port,
          secure: config.secure,
          user: config.user,
        },
      },
      { status: error.status || 500 }
    );
  }
}

/**
 * POST /api/test-email
 * Generates a random 6-digit OTP and sends it via Titan Email SMTP.
 *
 * Request Body:
 * {
 *   "email": "user@example.com"
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Test OTP email sent successfully"
 * }
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Malformed JSON payload. Expected { \"email\": \"...\" }",
          code: "INVALID_JSON",
        },
      },
      { status: 400 }
    );
  }

  // 1. Validate email input
  const parseResult = testEmailSchema.safeParse(body);
  if (!parseResult.success) {
    const errorMessage =
      parseResult.error.issues[0]?.message || "Invalid email address";
    return NextResponse.json(
      {
        success: false,
        error: {
          message: errorMessage,
          code: "VALIDATION_ERROR",
        },
      },
      { status: 400 }
    );
  }

  const { email: recipientEmail } = parseResult.data;

  try {
    // 2. Verify SMTP connection before attempting delivery
    await verifySmtpConnection();

    // 3. Generate a secure random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. Generate professional branded HTML body
    const emailHtml = generateOtpEmailHtml(otp);

    // 5. Send test email using Titan Email SMTP from connect@bodybarrel.com
    await sendEmail({
      to: recipientEmail,
      subject: "Your Test OTP",
      html: emailHtml,
    });

    // 6. Return standard success response (never exposing credentials or raw token data)
    return NextResponse.json(
      {
        success: true,
        message: "Test OTP email sent successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    const status = typeof error.status === "number" ? error.status : 500;
    const message =
      error.message ||
      "An unexpected error occurred while sending the test OTP email";
    const code = error.code || "SMTP_SEND_FAILED";

    return NextResponse.json(
      {
        success: false,
        error: {
          message,
          code,
        },
      },
      { status }
    );
  }
}
