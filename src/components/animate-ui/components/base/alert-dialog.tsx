"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AlertDialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextType | undefined>(undefined);

export const AlertDialog = ({
  children,
  open: openProp,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [open, setOpen] = React.useState(openProp ?? false);

  React.useEffect(() => {
    if (openProp !== undefined) setOpen(openProp);
  }, [openProp]);

  const handleOpenChange = React.useCallback(
    (val: boolean) => {
      setOpen(val);
      onOpenChange?.(val);
    },
    [onOpenChange]
  );

  return (
    <AlertDialogContext.Provider value={{ open, setOpen: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

export const AlertDialogTrigger = ({ render }: { render: React.ReactElement<any> }) => {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error("AlertDialogTrigger must be used inside AlertDialog");

  return React.cloneElement(render, {
    onClick: (e: React.MouseEvent) => {
      render.props.onClick?.(e);
      context.setOpen(true);
    },
  });
};

export interface AlertDialogPopupProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: "bottom" | "top" | "left" | "right" | "center";
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const popupVariants: Variants = {
  hidden: (from: string) => {
    switch (from) {
      case "bottom": return { y: 50, opacity: 0, scale: 0.98 };
      case "top": return { y: -50, opacity: 0, scale: 0.98 };
      case "left": return { x: -50, opacity: 0 };
      case "right": return { x: 50, opacity: 0 };
      default: return { scale: 0.95, opacity: 0 };
    }
  },
  visible: {
    y: 0,
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.35,
      bounce: 0.15,
    } as const,
  },
  exit: (from: string) => {
    switch (from) {
      case "bottom": return { y: 30, opacity: 0, scale: 0.98, transition: { duration: 0.2 } };
      case "top": return { y: -30, opacity: 0, scale: 0.98, transition: { duration: 0.2 } };
      case "left": return { x: -30, opacity: 0, transition: { duration: 0.2 } };
      case "right": return { x: 30, opacity: 0, transition: { duration: 0.2 } };
      default: return { scale: 0.95, opacity: 0, transition: { duration: 0.15 } };
    }
  },
};

export const AlertDialogPopup = React.forwardRef<HTMLDivElement, AlertDialogPopupProps>(
  ({ className, children, from = "center", ...props }, ref) => {
    const context = React.useContext(AlertDialogContext);
    if (!context) throw new Error("AlertDialogPopup must be used inside AlertDialog");

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
      <AnimatePresence>
        {context.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              transition={{ duration: 0.2 }}
              onClick={() => context.setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Dialog Content */}
            <motion.div
              ref={ref}
              custom={from}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={popupVariants}
              className={cn(
                "relative z-50 w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-bg p-6 shadow-xl md:p-8",
                className
              )}
              {...(props as any)}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );
  }
);
AlertDialogPopup.displayName = "AlertDialogPopup";

export const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

export const AlertDialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold text-ink", className)} {...props} />
);
AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted/80 leading-relaxed", className)} {...props} />
);
AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 gap-2 sm:gap-0 mt-6", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

export const AlertDialogCancel = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error("AlertDialogCancel must be used inside AlertDialog");

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 cursor-pointer items-center justify-center rounded-xl border border-line bg-bg px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900 focus-visible:outline-hidden",
        className
      )}
      onClick={() => context.setOpen(false)}
      {...props}
    >
      {children}
    </button>
  );
};
AlertDialogCancel.displayName = "AlertDialogCancel";

export const AlertDialogAction = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error("AlertDialogAction must be used inside AlertDialog");

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 cursor-pointer items-center justify-center rounded-xl bg-ink px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-bg transition-colors hover:opacity-90 focus-visible:outline-hidden",
        className
      )}
      onClick={(e) => {
        props.onClick?.(e);
        context.setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
};
AlertDialogAction.displayName = "AlertDialogAction";
