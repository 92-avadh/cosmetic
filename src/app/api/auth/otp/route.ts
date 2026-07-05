import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

    // Print to terminal console with high-visibility formatting
    console.log("\n");
    console.log("┌────────────────────────────────────────────────────────┐");
    console.log("│             BODYBARREL SECURITY VERIFICATION           │");
    console.log("├────────────────────────────────────────────────────────┤");
    console.log(`│ Email:    ${emailKey.padEnd(45)} │`);
    console.log(`│ OTP Code: \x1b[36m\x1b[1m${otp}\x1b[0m (Use to confirm identity)             │`);
    console.log("│ Expires:  In 5 minutes                                 │");
    console.log("└────────────────────────────────────────────────────────┘");
    console.log("\n");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("OTP API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate OTP" },
      { status: 500 }
    );
  }
}
