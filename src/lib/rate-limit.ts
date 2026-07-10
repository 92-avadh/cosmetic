import { supabase } from "./supabase";
import { getEnv } from "./env";

// Configurable thresholds loaded from environment bindings (or fallback to defaults)
const getRateLimitConfig = () => {
  let env: Record<string, string | undefined> = {};
  try {
    env = getEnv() as unknown as Record<string, string | undefined>;
  } catch {
    // Fallback during static build/compilation
  }

  return {
    auth: {
      maxAttempts: parseInt(env.LIMIT_AUTH_MAX_ATTEMPTS || "5", 10),
      windowSeconds: parseInt(env.LIMIT_AUTH_WINDOW_SEC || "60", 10),
      baseDelaySeconds: parseInt(env.LIMIT_AUTH_BASE_DELAY_SEC || "15", 10),
      maxDelaySeconds: parseInt(env.LIMIT_AUTH_MAX_DELAY_SEC || "3600", 10),
    },
    public: {
      maxRequests: parseInt(env.LIMIT_PUBLIC_MAX_REQ || "60", 10),
      windowSeconds: parseInt(env.LIMIT_PUBLIC_WINDOW_SEC || "60", 10),
    },
    user: {
      maxRequests: parseInt(env.LIMIT_USER_MAX_REQ || "120", 10),
      windowSeconds: parseInt(env.LIMIT_USER_WINDOW_SEC || "60", 10),
    },
  };
};

export interface RateLimitResult {
  success: boolean;
  message?: string;
  retryAfterSeconds?: number;
}

// Global in-memory cache for public and user routes (sliding window per edge isolate)
class InMemoryRateLimiter {
  private cache = new Map<string, { count: number; resetTime: number }>();

  limit(key: string, maxRequests: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const record = this.cache.get(key);

    if (!record || now > record.resetTime) {
      const resetTime = now + windowMs;
      this.cache.set(key, { count: 1, resetTime });
      return { success: true };
    }

    if (record.count >= maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      return {
        success: false,
        message: `Too many requests. Please try again in ${retryAfterSeconds} seconds.`,
        retryAfterSeconds,
      };
    }

    record.count += 1;
    return { success: true };
  }
}

const memoryLimiter = new InMemoryRateLimiter();

/**
 * DB-backed sliding window rate limit check for authentication endpoints.
 * Implements exponential backoff delay based on the number of failed/consecutive attempts.
 */
async function checkDbRateLimit(
  key: string,
  maxAttempts: number,
  windowSeconds: number,
  baseDelaySeconds: number,
  maxDelaySeconds: number
): Promise<RateLimitResult> {
  const now = new Date();
  const windowMs = windowSeconds * 1000;

  try {
    // 1. Fetch current attempt record
    const { data: record, error: fetchError } = await supabase
      .from("RateLimit")
      .select("*")
      .eq("key", key)
      .maybeSingle();

    if (fetchError) {
      console.error(`[RATE LIMIT ERROR] DB fetch failed for key ${key}:`, fetchError.message);
      return { success: true }; // Fail-open on DB errors
    }

    // 2. If record is found, evaluate blocks
    if (record) {
      const blockedUntilDate = record.blockedUntil ? new Date(record.blockedUntil) : null;
      if (blockedUntilDate && blockedUntilDate.getTime() > now.getTime()) {
        const retryAfterSeconds = Math.ceil((blockedUntilDate.getTime() - now.getTime()) / 1000);
        return {
          success: false,
          message: `Too many login attempts. Access blocked for ${retryAfterSeconds} more seconds.`,
          retryAfterSeconds,
        };
      }

      const lastAttemptDate = new Date(record.lastAttempt);
      const isWithinWindow = now.getTime() - lastAttemptDate.getTime() < windowMs;

      let newAttempts = 1;
      let newBlockedUntil: string | null = null;

      if (isWithinWindow) {
        newAttempts = record.attempts + 1;
        if (newAttempts > maxAttempts) {
          // Compute exponential backoff delay: baseDelay * 2^(attempts - maxAttempts)
          const backoffPower = newAttempts - maxAttempts;
          const delaySec = Math.min(baseDelaySeconds * Math.pow(2, backoffPower), maxDelaySeconds);
          newBlockedUntil = new Date(now.getTime() + delaySec * 1000).toISOString();
        }
      }

      const { error: updateError } = await supabase
        .from("RateLimit")
        .update({
          attempts: newAttempts,
          lastAttempt: now.toISOString(),
          blockedUntil: newBlockedUntil,
        })
        .eq("key", key);

      if (updateError) {
        console.error(`[RATE LIMIT ERROR] DB update failed for key ${key}:`, updateError.message);
        return { success: true }; // Fail-open on DB errors
      }

      if (newBlockedUntil) {
        const retryAfterSeconds = Math.ceil((new Date(newBlockedUntil).getTime() - now.getTime()) / 1000);
        return {
          success: false,
          message: `Too many login attempts. Access blocked for ${retryAfterSeconds} seconds.`,
          retryAfterSeconds,
        };
      }
    } else {
      // 3. Insert fresh attempt record
      const { error: insertError } = await supabase
        .from("RateLimit")
        .insert({
          key,
          attempts: 1,
          lastAttempt: now.toISOString(),
          blockedUntil: null,
        });

      if (insertError) {
        console.error(`[RATE LIMIT ERROR] DB insert failed for key ${key}:`, insertError.message);
        return { success: true }; // Fail-open on DB errors
      }
    }

    return { success: true };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`[RATE LIMIT ERROR] Unexpected error checking DB limit for key ${key}:`, errMsg);
    return { success: true }; // Fail-open on unexpected errors
  }
}

/**
 * Main rate limiter hook called within the API handler wrapper.
 * Divides endpoints into auth, public, or user actions to enforce appropriate limits.
 */
export async function checkRateLimit(
  request: Request,
  path: string,
  clientIp: string,
  userEmail?: string
): Promise<RateLimitResult> {
  const config = getRateLimitConfig();

  // 1. Identify Route Type & Enforce Appropriate Limits
  const isAuthRoute = path.startsWith("/api/auth/") || path.includes("/login") || path.includes("/signup");
  const isPublicRoute =
    request.method === "GET" &&
    (path.startsWith("/api/all-products") ||
      path.startsWith("/api/products/") ||
      path.startsWith("/api/promo/validate"));

  if (isAuthRoute) {
    // Auth Limit Check (Database-backed for absolute brute-force mitigation)
    const { maxAttempts, windowSeconds, baseDelaySeconds, maxDelaySeconds } = config.auth;

    // A. Check IP-based block
    const ipKey = `ip:${clientIp}:auth`;
    const ipResult = await checkDbRateLimit(ipKey, maxAttempts * 2, windowSeconds, baseDelaySeconds, maxDelaySeconds);
    if (!ipResult.success) return ipResult;

    // B. Check Account-based block (if email is supplied)
    if (userEmail) {
      const emailKey = `email:${userEmail.toLowerCase().trim()}:auth`;
      const emailResult = await checkDbRateLimit(emailKey, maxAttempts, windowSeconds, baseDelaySeconds, maxDelaySeconds);
      if (!emailResult.success) return emailResult;
    }

    return { success: true };
  }

  if (isPublicRoute) {
    // Public limits: moderate sliding window in-memory
    const key = `ip:${clientIp}:public`;
    return memoryLimiter.limit(key, config.public.maxRequests, config.public.windowSeconds * 1000);
  }

  // Authenticated user actions or mutation routes
  const userIdentifier = userEmail || clientIp;
  const key = `user:${userIdentifier}:action`;
  return memoryLimiter.limit(key, config.user.maxRequests, config.user.windowSeconds * 1000);
}
