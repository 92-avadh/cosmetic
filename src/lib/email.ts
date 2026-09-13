import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { getSafeRequestContext } from "./cloudflare";

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass?: string;
}

/**
 * Resolves current SMTP configuration from environment variables.
 * Safe for both Node.js runtime and Cloudflare context.
 */
export function getSmtpConfig(customHost?: string): SmtpConfig {
  const context = getSafeRequestContext();
  const cfEnv = (context?.env || {}) as Record<string, string | undefined>;

  const host = customHost || cfEnv.SMTP_HOST || process.env.SMTP_HOST || "smtp.titan.email";
  const port = Number(cfEnv.SMTP_PORT || process.env.SMTP_PORT || 465);
  // Titan / GoDaddy Email on port 465 requires secure: true (SSL/TLS)
  const secure = (cfEnv.SMTP_SECURE || process.env.SMTP_SECURE) !== "false";
  const user = cfEnv.SMTP_USER || process.env.SMTP_USER || "connect@bodybarrel.com";
  const pass = cfEnv.SMTP_PASS || process.env.SMTP_PASS;

  return { host, port, secure, user, pass };
}

/**
 * Creates and returns a reusable Nodemailer transporter instance configured for Titan / GoDaddy Email.
 */
export function createMailTransporter(customHost?: string): Transporter {
  const config = getSmtpConfig(customHost);

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    // Prevent unhandled connection hangs with a 15-second timeout
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Default reusable transporter instance.
 */
export const transporter: Transporter = createMailTransporter();

/**
 * Maps raw SMTP / Nodemailer errors to clean, developer-friendly messages
 * without exposing passwords, connection credentials, or sensitive headers.
 */
export function mapSmtpError(error: unknown): Error & { code: string; status: number } {
  const err = error as Record<string, unknown> | null;
  const code = String(err?.code || "").toUpperCase();
  const responseCode = Number(err?.responseCode || 0);
  const rawMessage = String(err?.message || "").toLowerCase();

  let friendlyMessage = "SMTP communication error";
  let errorCode = "SMTP_ERROR";

  if (
    code === "EAUTH" ||
    responseCode === 535 ||
    rawMessage.includes("auth") ||
    rawMessage.includes("invalid login") ||
    rawMessage.includes("password") ||
    rawMessage.includes("credential") ||
    rawMessage.includes("username")
  ) {
    friendlyMessage = "SMTP authentication failed: Invalid SMTP credentials";
    errorCode = "SMTP_AUTH_FAILED";
  } else if (
    code === "ETIMEDOUT" ||
    code === "ESOCKETTIMEDOUT" ||
    rawMessage.includes("timeout") ||
    rawMessage.includes("timed out")
  ) {
    friendlyMessage = "SMTP connection timeout: Server took too long to respond";
    errorCode = "SMTP_CONNECTION_TIMEOUT";
  } else if (
    code === "ECONNREFUSED" ||
    code === "ENOTFOUND" ||
    code === "ESOCKET" ||
    rawMessage.includes("connection failed") ||
    rawMessage.includes("econnrefused") ||
    rawMessage.includes("enotfound")
  ) {
    friendlyMessage = "SMTP connection failed: Unable to connect to host smtp.titan.email";
    errorCode = "SMTP_CONNECTION_FAILED";
  } else if (rawMessage.includes("placeholder") || rawMessage.includes("not configured")) {
    friendlyMessage = "SMTP authentication failed: SMTP_PASS is not configured in .env";
    errorCode = "SMTP_AUTH_FAILED";
  } else {
    friendlyMessage = "SMTP error: Failed to complete email delivery";
    errorCode = "SMTP_SEND_FAILED";
  }

  // Developer console warning without logging any sensitive auth values
  console.error(`[SMTP ERROR] [${errorCode}] ${friendlyMessage}`);

  const outputError = new Error(friendlyMessage) as Error & { code: string; status: number };
  outputError.code = errorCode;
  outputError.status = 500;
  return outputError;
}

/**
 * Verifies the connection and authentication with the Titan / GoDaddy SMTP server.
 * Uses `await transporter.verify()` as required with smart GoDaddy fallback.
 */
export async function verifySmtpConnection(): Promise<{ success: boolean; message: string }> {
  const config = getSmtpConfig();

  if (!config.pass || config.pass === "MY_PASSWORD") {
    const err = new Error("SMTP authentication failed: SMTP_PASS is missing or set to placeholder 'MY_PASSWORD' in .env");
    (err as any).code = "SMTP_AUTH_FAILED";
    (err as any).status = 500;
    throw err;
  }

  // Try configured host first
  const activeTransporter = createMailTransporter(config.host);
  try {
    await activeTransporter.verify();
    return {
      success: true,
      message: `SMTP server connection verified successfully (${config.host}:465)`,
    };
  } catch (error: unknown) {
    // If primary host fails, try GoDaddy alternate hostname
    const alternateHost = config.host.includes("titan") ? "smtpout.secureserver.net" : "smtp.titan.email";
    try {
      const fallbackTransporter = createMailTransporter(alternateHost);
      await fallbackTransporter.verify();
      return {
        success: true,
        message: `SMTP server connection verified successfully (${alternateHost}:465)`,
      };
    } catch {
      throw mapSmtpError(error);
    }
  }
}

/**
 * Sends an email using Titan / GoDaddy Email SMTP.
 * Preserves compatibility across the entire application (orders, auth OTP, etc.).
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; messageId?: string; mocked?: boolean }> {
  const config = getSmtpConfig();

  if (!config.pass || config.pass === "MY_PASSWORD") {
    console.warn("\n┌────────────────────────────────────────────────────────┐");
    console.warn("│ ⚠️ [MOCK EMAIL] TITAN SMTP CREDENTIALS NOT CONFIGURED  │");
    console.warn("├────────────────────────────────────────────────────────┤");
    console.warn(`│ To:      ${to.padEnd(46)} │`);
    console.warn(`│ Subject: ${subject.padEnd(46)} │`);
    console.warn("└────────────────────────────────────────────────────────┘\n");
    return { success: true, mocked: true };
  }

  // 1. Try configured host
  try {
    const activeTransporter = createMailTransporter(config.host);
    const info = await activeTransporter.sendMail({
      from: `"BODYBARREL" <${config.user}>`,
      to,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (primaryErr: unknown) {
    // 2. Try GoDaddy / Titan alternate host fallback
    const alternateHost = config.host.includes("titan") ? "smtpout.secureserver.net" : "smtp.titan.email";
    try {
      const fallbackTransporter = createMailTransporter(alternateHost);
      const info = await fallbackTransporter.sendMail({
        from: `"BODYBARREL" <${config.user}>`,
        to,
        subject,
        html,
      });

      return { success: true, messageId: info.messageId };
    } catch {
      throw mapSmtpError(primaryErr);
    }
  }
}

/**
 * Helper to generate professional HTML for OTP emails (Registration, Login, Verification)
 */
export function generateOtpEmailHtml(
  otp: string,
  title: string = "Secure Email Verification",
  description: string = "Please use the following 6-digit verification code to authenticate your request. This code will expire in <strong>10 minutes</strong>."
): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 36px 30px; border: 1px solid #eaeaea; border-radius: 16px; background-color: #ffffff; color: #111111;">
      <div style="text-align: center; border-bottom: 1px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 28px;">
        <h1 style="font-size: 20px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; margin: 0; color: #111111;">BODYBARREL</h1>
        <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #888888; margin-top: 6px;">${title}</p>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #444444; margin: 0 0 20px 0;">
        Hello,
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #444444; margin: 0 0 28px 0;">
        ${description}
      </p>

      <div style="background: #fafafa; border: 1px dashed #d1d5db; border-radius: 12px; padding: 24px 16px; text-align: center; margin: 28px 0;">
        <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 700; letter-spacing: 0.25em; color: #111111; display: inline-block;">
          ${otp}
        </span>
      </div>

      <p style="font-size: 12px; line-height: 1.5; color: #666666; margin: 24px 0 0 0;">
        If you did not request this verification code, please ignore this email or contact support at connect@bodybarrel.com.
      </p>

      <div style="border-top: 1px solid #f0f0f0; margin-top: 32px; padding-top: 16px; text-align: center;">
        <p style="font-size: 11px; color: #999999; margin: 0; line-height: 1.4;">
          BODYBARREL &bull; connect@bodybarrel.com<br/>
          Cellular Skincare Science
        </p>
      </div>
    </div>
  `;
}
