import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/session";

// In-memory rate limiting map for edge runtime isolates
interface RateLimitBucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, RateLimitBucket>();

function checkRateLimit(ip: string, path: string): boolean {
  const now = Date.now();
  
  // Decide limit types
  let limitType: "auth" | "api" | "bypass" = "api";
  if (path.startsWith("/api/auth/otp") || path.startsWith("/api/auth/verify")) {
    limitType = "auth";
  } else if (!path.startsWith("/api/")) {
    limitType = "bypass";
  }
  
  if (limitType === "bypass") return true;

  const key = `${ip}:${limitType}`;
  const maxTokens = limitType === "auth" ? 5 : 60; // 5 req/min for auth, 60 req/min for normal API
  const windowMs = 60 * 1000; // 1 minute window
  const refillRate = maxTokens / windowMs; // tokens per ms

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { tokens: maxTokens, lastRefill: now };
    buckets.set(key, bucket);
  }

  // Refill tokens based on elapsed time
  const elapsed = now - bucket.lastRefill;
  const refilledTokens = elapsed * refillRate;
  bucket.tokens = Math.min(maxTokens, bucket.tokens + refilledTokens);
  bucket.lastRefill = now;

  // Cleanup map if it grows too large
  if (buckets.size > 2000) {
    for (const [k, v] of buckets.entries()) {
      if (now - v.lastRefill > 10 * 60 * 1000) {
        buckets.delete(k);
      }
    }
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    return true;
  }

  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip checks for static assets, next internals, favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") || // e.g. .png, .ico, .js
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 1. Rate Limiting Check for APIs
  const clientIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  if (!checkRateLimit(clientIp, pathname)) {
    console.warn(`[RATE LIMIT EXCEEDED] IP: ${clientIp} | Path: ${pathname}`);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Too many requests. Please try again later.",
          code: "TOO_MANY_REQUESTS",
        },
      },
      { status: 429 }
    );
  }

  // Read session cookie
  const sessionCookie = request.cookies.get("session")?.value;
  let response = NextResponse.next();

  // 2. Protect Admin Pages & APIs
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!sessionCookie) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url));
    }
    
    const payload = await verifySession(sessionCookie);
    if (!payload || payload.role !== "ADMIN") {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  // 3. Protect Account & Checkout Pages
  if (pathname.startsWith("/account") || pathname.startsWith("/checkout")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url));
    }
    
    const payload = await verifySession(sessionCookie);
    if (!payload) {
      const redirectResponse = NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url));
      redirectResponse.cookies.delete("session");
      response = redirectResponse;
    }
  }

  // 4. Apply Security Headers
  const cspValue = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.razorpay.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://gjlwnohlruwdfbjvrfas.supabase.co https://*.stripe.com https://checkout.razorpay.com https://images.unsplash.com",
    "connect-src 'self' https://gjlwnohlruwdfbjvrfas.supabase.co https://api.stripe.com https://api.razorpay.com https://raw.githack.com https://dl.polyhaven.org",
    "frame-src 'self' https://js.stripe.com https://checkout.razorpay.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspValue);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  return response;
}

export const config = {
  matcher: [
    "/((?!api/webhooks|_next/static|_next/image|favicon.ico).*)",
  ],
};
