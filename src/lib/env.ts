import { z } from "zod";
import { getSafeRequestContext } from "./cloudflare";

const envSchema = z.object({
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),
  SESSION_SECRET: z.string().min(16, "SESSION_SECRET must be at least 16 characters long").default("default-secret-key-32-characters-long-bodybarrel"),
  GMAIL_USER: z.string().email("GMAIL_USER must be a valid email").optional(),
  GMAIL_APP_PASSWORD: z.string().optional(),
  RAZORPAY_API_KEY: z.string().optional(),
  RAZORPAY_SECRET: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  DIRECT_URL: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

export function getEnv(): Env {
  if (_env) return _env;

  const context = getSafeRequestContext();
  const cfEnv = (context?.env || {}) as Record<string, unknown>;

  const rawEnv = {
    SUPABASE_URL: cfEnv.SUPABASE_URL || process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: cfEnv.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
    SESSION_SECRET: cfEnv.SESSION_SECRET || process.env.SESSION_SECRET,
    GMAIL_USER: cfEnv.GMAIL_USER || process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: cfEnv.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD,
    RAZORPAY_API_KEY: cfEnv.RAZORPAY_API_KEY || process.env.RAZORPAY_API_KEY,
    RAZORPAY_SECRET: cfEnv.RAZORPAY_SECRET || process.env.RAZORPAY_SECRET,
    STRIPE_SECRET_KEY: cfEnv.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY,
    DATABASE_URL: cfEnv.DATABASE_URL || process.env.DATABASE_URL,
    DIRECT_URL: cfEnv.DIRECT_URL || process.env.DIRECT_URL,
  };

  const parsed = envSchema.safeParse(rawEnv);

  if (!parsed.success) {
    console.error("❌ Environment validation failed:", JSON.stringify(parsed.error.format(), null, 2));
    
    // In production, we throw and halt execution
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Environment validation failed: ${parsed.error.message}`);
    }
    
    // In dev / test, we fall back to defaults to let building / testing continue
    _env = {
      ...rawEnv,
      SESSION_SECRET: rawEnv.SESSION_SECRET || "default-secret-key-32-characters-long-bodybarrel",
    } as unknown as Env;
    return _env;
  }

  _env = parsed.data;
  return _env;
}
