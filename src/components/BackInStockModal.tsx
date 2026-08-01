"use client";

import { useState } from "react";
import { Bell, CheckCircle2, X } from "lucide-react";
import CurtainButton from "./CurtainButton";

interface BackInStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function BackInStockModal({ isOpen, onClose, productName }: BackInStockModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg border border-line rounded-2xl p-6 md:p-8 max-w-md w-full space-y-6 animate-scaleUp shadow-2xl relative text-left select-none">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors border-none bg-transparent cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-lg uppercase text-ink">Back In Stock Alert</h3>
              <p className="text-xs text-muted leading-relaxed">
                Join the priority replenishment waitlist for <strong className="text-ink uppercase font-semibold">{productName}</strong>. We'll notify you as soon as our bioreactors complete the next batch release.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted block">Your Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-card-bg border border-line rounded-lg p-3 text-xs text-ink focus:outline-none focus:border-accent"
                />
              </div>

              <CurtainButton
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-bg border-accent bg-accent text-[10px] font-bold tracking-widest uppercase rounded-[3px]"
              >
                {loading ? "Registering Waitlist..." : "Notify Me On Release"}
              </CurtainButton>
            </form>
          </>
        ) : (
          <div className="text-center py-4 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <div className="space-y-1">
              <h4 className="font-display font-semibold text-base uppercase text-ink">Waitlist Registration Confirmed</h4>
              <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto">
                You're registered! We will send a priority batch dispatch email to <span className="font-mono text-ink font-semibold">{email}</span> as soon as <strong className="uppercase">{productName}</strong> is restocked.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-ink text-bg text-[10px] font-bold uppercase tracking-widest rounded cursor-pointer border-none hover:bg-accent transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
