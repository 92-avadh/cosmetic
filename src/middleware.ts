import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Read session cookie
  const sessionCookie = request.cookies.get("session")?.value;
  
  // 1. Protect Admin Pages & APIs
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

  // 2. Protect Account & Checkout Pages
  if (pathname.startsWith("/account") || pathname.startsWith("/checkout")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url));
    }
    
    const payload = await verifySession(sessionCookie);
    if (!payload) {
      const response = NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url));
      response.cookies.delete("session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/account/:path*",
    "/checkout/:path*",
  ],
};
