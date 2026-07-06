import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer border border-transparent",
          {
            // default variant is solid ink with hover curtain/slide effect or smooth transition
            "bg-ink text-bg hover:bg-accent hover:text-bg shadow-sm":
              variant === "default",
            "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100":
              variant === "destructive",
            "border-line bg-transparent hover:border-ink hover:text-ink text-ink":
              variant === "outline",
            "bg-card-bg text-ink hover:bg-card-bg/80":
              variant === "secondary",
            "hover:bg-card-bg/40 hover:text-ink text-ink":
              variant === "ghost",
            "text-ink underline-offset-4 hover:underline":
              variant === "link",
          },
          {
            "h-10 px-6 py-2.5": size === "default",
            "h-8 rounded-lg px-4 text-[10px]": size === "sm",
            "h-12 rounded-2xl px-8": size === "lg",
            "h-9 w-9 rounded-xl p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
