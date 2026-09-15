import { z } from "zod";
import { getSafeRequestContext } from "./cloudflare";

const envSchema = z.object({
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters long"),
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email").optional(),
  GMAIL_USER: z.string().email("GMAIL_USER must be a valid email").optional(),
  GMAIL_APP_PASSWORD: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_SECURE: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
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
    SUPABASE_URL: cfEnv.SUPABASE_URL || process.env.SUPABASE_URL || "https://gjlwnohlruwdfbjvrfas.supabase.co",
    SUPABASE_ANON_KEY: cfEnv.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbHdub2hscnV3ZGZianZyZmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMzI0MTUsImV4cCI6MjA5ODkwODQxNX0.obUZe_oorjj6RviQSsGHj5Hv_DFG76a6ZrEWpN4JVBk",
    SESSION_SECRET: cfEnv.SESSION_SECRET || process.env.SESSION_SECRET || "bb-prod-session-secret-change-me-in-production-32chars-min",
    ADMIN_EMAIL: cfEnv.ADMIN_EMAIL || process.env.ADMIN_EMAIL || "dhameliyaavadh592@gmail.com",
    GMAIL_USER: cfEnv.GMAIL_USER || process.env.GMAIL_USER || "dhameliyaavadh592@gmail.com",
    GMAIL_APP_PASSWORD: cfEnv.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD || "pbnsljmrszqgtkkv",
    SMTP_HOST: cfEnv.SMTP_HOST || process.env.SMTP_HOST || "smtpout.secureserver.net",
    SMTP_PORT: cfEnv.SMTP_PORT || process.env.SMTP_PORT || "465",
    SMTP_SECURE: cfEnv.SMTP_SECURE || process.env.SMTP_SECURE || "true",
    SMTP_USER: cfEnv.SMTP_USER || process.env.SMTP_USER || "connect@bodybarrel.com",
    SMTP_PASS: cfEnv.SMTP_PASS || process.env.SMTP_PASS || "Bodybarrel@9624",
    RAZORPAY_API_KEY: cfEnv.RAZORPAY_API_KEY || process.env.RAZORPAY_API_KEY || "rzp_test_TcIR3cSdD5MiIh",
    RAZORPAY_SECRET: cfEnv.RAZORPAY_SECRET || process.env.RAZORPAY_SECRET || "oEpwuso8bWDWuQ6Gz3qck6Y5",
    STRIPE_SECRET_KEY: cfEnv.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY,
    DATABASE_URL: cfEnv.DATABASE_URL || process.env.DATABASE_URL,
    DIRECT_URL: cfEnv.DIRECT_URL || process.env.DIRECT_URL,
  };

  const parsed = envSchema.safeParse(rawEnv);

  if (!parsed.success) {
    console.warn("⚠️ Environment validation warning:", JSON.stringify(parsed.error.format(), null, 2));
    _env = {
      ...rawEnv,
      SUPABASE_URL: (rawEnv.SUPABASE_URL as string) || "https://gjlwnohlruwdfbjvrfas.supabase.co",
      SUPABASE_ANON_KEY: (rawEnv.SUPABASE_ANON_KEY as string) || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbHdub2hscnV3ZGZianZyZmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMzI0MTUsImV4cCI6MjA5ODkwODQxNX0.obUZe_oorjj6RviQSsGHj5Hv_DFG76a6ZrEWpN4JVBk",
      SESSION_SECRET: (rawEnv.SESSION_SECRET as string) || "bb-prod-session-secret-change-me-in-production-32chars-min",
    } as unknown as Env;
    return _env;
  }

  _env = parsed.data;
  return _env;
}
