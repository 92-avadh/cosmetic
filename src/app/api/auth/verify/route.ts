import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { signSession } from "@/lib/session";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP code are required" },
        { status: 400 }
      );
    }

    const emailKey = email.toLowerCase().trim();
    const cleanOtp = otp.trim();

    // Query the database for the active token
    const tokenRecord = await prisma.verificationToken.findFirst({
      where: { email: emailKey },
      orderBy: { createdAt: "desc" }, // get the latest one
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { error: "Verification code not found. Please request a new OTP." },
        { status: 400 }
      );
    }

    // Verify expiration time
    if (new Date() > new Date(tokenRecord.expiresAt)) {
      await prisma.verificationToken.deleteMany({
        where: { email: emailKey },
      });
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new OTP." },
        { status: 400 }
      );
    }

    // Verify code correctness
    if (tokenRecord.code !== cleanOtp) {
      return NextResponse.json(
        { error: "Invalid verification code. Please try again." },
        { status: 400 }
      );
    }

    // OTP matches! Clear the verification token
    await prisma.verificationToken.deleteMany({
      where: { email: emailKey },
    });

    // Create the User in the DB if they don't already exist (Auto-registration)
    const isAdmin = emailKey === "dhameliyaavadh592@gmail.com";
    const user = await prisma.user.upsert({
      where: { email: emailKey },
      update: isAdmin ? { role: "ADMIN" } : {},
      create: {
        email: emailKey,
        role: isAdmin ? "ADMIN" : "USER",
      },
    });

    // Set HTTP-only secure cookie
    const token = await signSession({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

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
    console.error("Verification API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify security code" },
      { status: 500 }
    );
  }
}
