import { NextResponse } from "next/server";
import { ZodError, ZodIssue } from "zod";
import { logAudit } from "./audit";
import { verifySession } from "./session";
import { cookies } from "next/headers";

import { checkRateLimit } from "./rate-limit";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
};

// Simple helper to log incoming requests in standard format
export function logRequest(
  method: string,
  path: string,
  status: number,
  durationMs: number,
  clientIp?: string,
  errorMessage?: string
) {
  const logMsg = `[API REQUEST] ${method} ${path} - Status: ${status} | Time: ${durationMs}ms | IP: ${clientIp || "unknown"}${
    errorMessage ? ` | Error: ${errorMessage}` : ""
  }`;
  if (status >= 500) {
    console.error(`❌ ${logMsg}`);
  } else if (status >= 400) {
    console.warn(`⚠️ ${logMsg}`);
  } else {
    console.log(`✨ ${logMsg}`);
  }
}

// Higher-order function wrapping API handlers
export function withApiHandler(
  handler: (request: Request, context: unknown) => Promise<Response | NextResponse | unknown>
) {
  return async (request: Request, context: unknown) => {
    const startTime = Date.now();
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const headers = request.headers;
    const clientIp = headers.get("cf-connecting-ip") || headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const userAgent = headers.get("user-agent") || "unknown";

    // Try to inspect user context for audit trail logging
    let currentUser: Record<string, unknown> | null = null;
    try {
      // ponytail: cookies() may throw on edge runtimes (CF Workers) if request context is missing
      const cookieStore = await cookies().catch(() => null);
      const sessionToken = cookieStore?.get("session")?.value;
      if (sessionToken) {
        currentUser = await verifySession(sessionToken);
      }
    } catch {
      // Ignore failures parsing session token at logging boundary
    }

    const currentUserId = currentUser ? String(currentUser.id) : undefined;
    const currentUserEmail = currentUser ? String(currentUser.email) : undefined;

    let userEmailForLimit = currentUserEmail;
    const isAuthRoute = path.startsWith("/api/auth/") || path.includes("/login") || path.includes("/signup");
    if (!userEmailForLimit && isAuthRoute && method === "POST") {
      try {
        const clonedRequest = request.clone();
        const body = await clonedRequest.json();
        if (body && typeof body === "object" && typeof body.email === "string") {
          userEmailForLimit = body.email;
        }
      } catch {
        // Safe to ignore
      }
    }

    try {
      // 0. Rate Limiting Check
      const rateLimitResult = await checkRateLimit(request, path, clientIp, userEmailForLimit);
      if (!rateLimitResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: rateLimitResult.message || "Too many requests. Please try again later.",
              code: "TOO_MANY_REQUESTS",
            },
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(Math.ceil(rateLimitResult.retryAfterSeconds || 60)),
            },
          }
        );
      }

      // 1. CSRF Protection for mutation requests (POST, PUT, DELETE, PATCH)
      if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
        const isWebhook = path.startsWith("/api/webhooks");
        
        if (!isWebhook) {
          const origin = headers.get("origin");
          const referer = headers.get("referer");
          // Use the URL's own hostname as the canonical host to avoid proxy/port mismatches on CF Workers
          const canonicalHost = url.hostname;

          let isSameOrigin = false;

          if (origin) {
            try {
              const originUrl = new URL(origin);
              isSameOrigin = originUrl.hostname === canonicalHost;
            } catch {
              isSameOrigin = false;
            }
          } else if (referer) {
            try {
              const refererUrl = new URL(referer);
              isSameOrigin = refererUrl.hostname === canonicalHost;
            } catch {
              isSameOrigin = false;
            }
          }

          if (!isSameOrigin) {
            console.warn(`[CSRF BLOCK] Origin/Referer mismatch for mutation request on ${path}. Host: ${canonicalHost}`);
            
            await logAudit({
              action: "SECURITY_CSRF_BLOCKED",
              status: "FAILED",
              userId: currentUserId,
              userEmail: currentUserEmail,
              ip: clientIp,
              userAgent,
              details: { path, canonicalHost, origin, referer }
            });

            return NextResponse.json(
              {
                success: false,
                error: {
                  message: "Cross-site request forgery protection triggered. Mutation requests must originate from the same site.",
                  code: "CSRF_BLOCKED",
                },
              },
              { status: 403 }
            );
          }
        }
      }

      // Execute handler
      const result = await handler(request, context);
      const duration = Date.now() - startTime;

      // Handle direct Response or NextResponse objects
      if (result instanceof Response) {
        logRequest(method, path, result.status, duration, clientIp);
        return result;
      }

      // Wrap custom objects into a successful ApiResponse
      logRequest(method, path, 200, duration, clientIp);
      return NextResponse.json({
        success: true,
        data: result,
      });

    } catch (err: unknown) {
      const duration = Date.now() - startTime;
      let status = 500;
      let message = "An unexpected error occurred on the server.";
      let code = "INTERNAL_SERVER_ERROR";
      let details: unknown = undefined;

      const error = err as Error & { status?: number; code?: string };

      if (error instanceof ZodError) {
        status = 400;
        message = "Input validation failed";
        code = "BAD_REQUEST";
        details = error.issues.map((e: ZodIssue) => ({
          field: e.path.join("."),
          message: e.message,
        }));
      } else if (error.status && typeof error.status === "number") {
        status = error.status;
        // Only expose message for 4xx client errors (business logic errors)
        // 5xx errors should never expose internal details
        if (status >= 500) {
          message = "An unexpected error occurred on the server.";
        } else {
          message = error.message || "Request failed";
        }
        code = error.code || "API_ERROR";
      } else {
        // All uncaught errors get generic messages — never leak internals
        const errorStr = String(error.message || error);
        if (errorStr.toLowerCase().includes("database") || errorStr.toLowerCase().includes("prisma") || errorStr.toLowerCase().includes("supabase")) {
          message = "A secure database communication error occurred.";
          code = "DATABASE_ERROR";
        }
        // Everything else: keep default generic message
      }

      logRequest(method, path, status, duration, clientIp, error.message || String(error));

      // Standardized JSON response format on failure
      return NextResponse.json(
        {
          success: false,
          error: {
            message,
            code,
            details,
          },
        },
        { status }
      );
    }
  };
}
