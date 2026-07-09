"use client";

import { motion } from "framer-motion";

interface CurtainButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function CurtainButton({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: CurtainButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`relative overflow-hidden cursor-pointer select-none transition-colors duration-300 border border-line group ${className}`}
      style={{ isolation: "isolate" }}
    >
      {/* Layer 1: Pink curtain (#e8c5c1) */}
      <motion.span
        variants={{
          rest: { y: "-110%" },
          hover: { y: "0%" },
        }}
        transition={{
          duration: 0.2,
          ease: [0.11, 0.82, 0.39, 0.92],
        }}
        className="absolute inset-0 z-0 bg-[#e8c5c1] pointer-events-none"
      />

      {/* Layer 2: Dark Brown curtain (#2d1c14) */}
      <motion.span
        variants={{
          rest: { y: "-110%" },
          hover: { y: "0%" },
        }}
        transition={{
          duration: 0.5,
          delay: 0.15,
          ease: [0.11, 0.82, 0.39, 0.92],
        }}
        className="absolute inset-0 z-0 bg-[#2d1c14] pointer-events-none"
      />

      {/* Text label / child contents centered on top */}
      <span className="relative z-10 w-full h-full flex items-center justify-center gap-2 pointer-events-none transition-colors duration-300 text-inherit group-hover:text-[#F6F4EE]">
        {children}
      </span>
    </motion.button>
  );
}
