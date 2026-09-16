"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { useToastStore, Toast, ToastType } from "@/store/useToastStore";

const TOAST_ICONS: Record<ToastType, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const TOAST_STYLES: Record<
  ToastType,
  {
    iconColor: string;
    iconBg: string;
    borderColor: string;
    progressColor: string;
    glow: string;
  }
> = {
  success: {
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    borderColor: "border-emerald-500/30",
    progressColor: "bg-emerald-400",
    glow: "shadow-[0_8px_30px_rgba(16,185,129,0.12)]",
  },
  error: {
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10 border-rose-500/20",
    borderColor: "border-rose-500/30",
    progressColor: "bg-rose-400",
    glow: "shadow-[0_8px_30px_rgba(244,63,94,0.14)]",
  },
  warning: {
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    borderColor: "border-amber-500/30",
    progressColor: "bg-amber-400",
    glow: "shadow-[0_8px_30px_rgba(245,158,11,0.12)]",
  },
  info: {
    iconColor: "text-[#C97A5E]",
    iconBg: "bg-[#C97A5E]/10 border-[#C97A5E]/20",
    borderColor: "border-[#C97A5E]/30",
    progressColor: "bg-[#C97A5E]",
    glow: "shadow-[0_8px_30px_rgba(201,122,94,0.14)]",
  },
};

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToastStore();
  const Icon = TOAST_ICONS[toast.type] || Info;
  const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, duration, removeToast]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      role="alert"
      aria-live="polite"
      className={`pointer-events-auto relative w-full overflow-hidden rounded-2xl bg-[#121212]/92 backdrop-blur-xl border border-white/10 text-white ${style.glow} shadow-2xl p-4 flex gap-3.5 items-start`}
    >
      {/* Type-based icon pill */}
      <div
        className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border ${style.iconBg} ${style.iconColor} mt-0.5`}
      >
        <Icon className="w-4 h-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-2">
        {toast.title && (
          <h4 className="font-display font-semibold text-[11px] uppercase tracking-wider text-white/90 leading-tight">
            {toast.title}
          </h4>
        )}
        <p className="text-[12.5px] text-white/80 font-normal leading-relaxed mt-0.5 break-words">
          {toast.message}
        </p>
      </div>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Progress timeline bar */}
      {duration > 0 && (
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className={`absolute bottom-0 left-0 h-[2px] ${style.progressColor}`}
        />
      )}
    </motion.div>
  );
}

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div
      aria-label="Notifications"
      className="fixed top-4 right-4 z-[9999] pointer-events-none flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2rem)] sm:w-96"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}
