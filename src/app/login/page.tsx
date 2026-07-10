"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { ArrowLeft, ArrowRight, ShieldCheck, Mail, KeyRound, Loader2 } from "lucide-react";
import CurtainButton from "@/components/CurtainButton";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const { isLoggedIn, login } = useUserStore();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [resendCount, setResendCount] = useState(0);

  // Timer countdown logic
  useEffect(() => {
    if (step !== "otp" || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  // If already logged in, redirect away
  useEffect(() => {
    if (isLoggedIn) {
      router.push(redirect);
    }
  }, [isLoggedIn, redirect, router]);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to send verification code.");
      }

      setStep("otp");
      setTimer(30);
      setResendCount(0);
      setMessage("Security code dispatched. Please check your email inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to initiate login request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCount >= 2 || timer > 0 || isLoading) return;

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to resend verification code.");
      }

      setResendCount((prev) => prev + 1);
      setTimer(30);
      setMessage(`New security code dispatched. Please check your email inbox. (Resend ${resendCount + 1}/2)`);
    } catch (err: any) {
      setError(err.message || "Failed to resend code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setError("Verification code must be exactly 6 digits.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: cleanOtp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Invalid verification code.");
      }

      // Successful login
      if (data.sessionToken) {
        // ponytail: Edge runtime fallback — set session cookie via JS when cookies() is unavailable server-side
        document.cookie = `session=${data.sessionToken}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=lax` + (location.protocol === "https:" ? "; secure" : "");
      }
      login(email, data.user?.role);
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || "Failed to verify security code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="no-reveal w-full max-w-md bg-card-bg/40 backdrop-blur-md border border-line/60 rounded-3xl p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.03)] relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent/30 via-accent to-accent/30" />

      <div className="text-center mb-8">
        <h2 className="font-display font-semibold text-2xl uppercase tracking-tight text-ink">
          Sign In
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {step === "email" ? (
          <motion.div
            key="email-step"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-semibold text-ink/75 block">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 text-muted">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to receive OTP"
                    required
                    disabled={isLoading}
                    className="w-full bg-transparent border-b border-line py-3.5 pl-8 pr-2 text-xs tracking-wide text-ink placeholder:text-muted/65 focus:outline-none focus:border-accent transition-colors duration-300 disabled:opacity-50"
                  />
                </div>
              </div>

              {error && (
                <p className="text-[11px] text-accent font-medium leading-relaxed tracking-wide">
                  {error}
                </p>
              )}

              <CurtainButton
                type="submit"
                disabled={isLoading}
                className="w-full text-ink border border-ink bg-transparent text-[10px] font-semibold py-4.5 tracking-[0.2em] uppercase flex items-center justify-center space-x-2 disabled:opacity-55 disabled:cursor-not-allowed group cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Request Verification Code</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </CurtainButton>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="otp-step"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-ink/75 block">
                    Security Code
                  </label>
                  <span className="text-[10px] text-muted tracking-wide truncate max-w-[200px]">
                    {email}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 text-muted">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit verification code"
                    required
                    disabled={isLoading}
                    autoFocus
                    className="w-full bg-transparent border-b border-line py-3.5 pl-8 pr-2 text-xs tracking-[0.3em] font-semibold text-ink placeholder:text-muted/65 placeholder:tracking-normal focus:outline-none focus:border-accent transition-colors duration-300 disabled:opacity-50"
                  />
                </div>
              </div>

              {message && !error && (
                <p className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 font-medium leading-normal tracking-wide">
                  {message}
                </p>
              )}

              {error && (
                <p className="text-[11px] text-accent font-medium leading-relaxed tracking-wide">
                  {error}
                </p>
              )}

              <div className="space-y-3">
                <CurtainButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-ink border border-ink bg-transparent text-[10px] font-semibold py-4.5 tracking-[0.2em] uppercase flex items-center justify-center space-x-2 disabled:opacity-55 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Confirm & Login</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </CurtainButton>

                {resendCount < 2 ? (
                  <CurtainButton
                    type="button"
                    disabled={timer > 0 || isLoading}
                    onClick={handleResendOtp}
                    className="w-full border border-line text-ink bg-transparent text-[10px] font-semibold py-3.5 tracking-[0.2em] uppercase flex items-center justify-center space-x-2 disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {timer > 0 ? (
                      <span>Resend Code in {timer}s</span>
                    ) : (
                      <>
                        <span>Resend Code ({2 - resendCount} left)</span>
                      </>
                    )}
                  </CurtainButton>
                ) : (
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-muted text-center py-2.5">
                    Resend limit reached
                  </div>
                )}

                <CurtainButton
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError(null);
                    setMessage(null);
                    setOtp("");
                    setTimer(0);
                    setResendCount(0);
                  }}
                  className="w-full border border-line text-ink bg-transparent text-[10px] font-semibold py-3.5 tracking-[0.2em] uppercase flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Use Different Email</span>
                </CurtainButton>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 pt-6 border-t border-line/50 flex items-center justify-center gap-2.5 text-[9px] text-muted uppercase tracking-widest">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Secure Secure SSL Session</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-36 pb-24 font-sans flex flex-col justify-center items-center px-6 md:px-12">
        <Suspense
          fallback={
            <div className="w-full max-w-md bg-card-bg/40 backdrop-blur-md border border-line/60 rounded-3xl p-10 flex flex-col items-center justify-center min-h-[300px]">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
