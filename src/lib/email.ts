import { getSafeRequestContext } from "./cloudflare";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const context = getSafeRequestContext();
  const env = context?.env || {};
  const gmailUser = env.GMAIL_USER || process.env.GMAIL_USER;
  const gmailPass = env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.log("\n");
    console.log("┌────────────────────────────────────────────────────────┐");
    console.log("│ ⚠️ [MOCK EMAIL] GMAIL CREDENTIALS NOT CONFIGURED        │");
    console.log("├────────────────────────────────────────────────────────┤");
    console.log(`│ To:      ${to.padEnd(46)} │`);
    console.log(`│ Subject: ${subject.padEnd(46)} │`);
    console.log(`│ Body Preview:                                          │`);
    const plainText = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    console.log(`│ ${plainText.slice(0, 50).padEnd(52)} │`);
    console.log("└────────────────────────────────────────────────────────┘");
    console.log("\n");
    return { success: true, mocked: true };
  }

  try {
    if (process.env.NEXT_RUNTIME === "edge") {
      console.warn("SMTP email sending is not supported in Edge runtime. Email was mocked.");
      console.log("\n");
      console.log("┌────────────────────────────────────────────────────────┐");
      console.log("│ ⚠️ [MOCK EMAIL] EDGE RUNTIME - EMAIL WAS MOCKED         │");
      console.log("├────────────────────────────────────────────────────────┤");
      console.log(`│ To:      ${to.padEnd(46)} │`);
      console.log(`│ Subject: ${subject.padEnd(46)} │`);
      console.log(`│ Body Preview:                                          │`);
      const plainText = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      console.log(`│ ${plainText.slice(0, 50).padEnd(52)} │`);
      console.log("└────────────────────────────────────────────────────────┘");
      console.log("\n");
      return { success: true, mocked: true };
    }

    // Indirect require to bypass Next.js compilation warnings in Edge runtime
    const dynamicRequire = typeof require !== "undefined" ? require : undefined;
    const nodemailer = dynamicRequire ? dynamicRequire("nodemailer") : null;

    if (!nodemailer) {
      console.warn("Nodemailer is not available in this environment. Email was mocked.");
      return { success: true, mocked: true };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const info = await transporter.sendMail({
      from: `"BODYBARREL" <${gmailUser}>`,
      to,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Gmail SMTP Send Error:", error);
    throw error;
  }
}
