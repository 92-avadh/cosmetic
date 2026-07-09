"use client";

import React from "react";
import { motion } from "framer-motion";

interface ShoppingBagIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  animate?: boolean;
}

export default function ShoppingBagIcon({ className, animate = false, ...props }: ShoppingBagIconProps) {
  // SVG proportions matched to the user's shopping bag design
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Top curved handle: rotates/scales when item is added */}
      <motion.path
        d="M9 9a3 3 0 0 1 6 0"
        animate={animate ? { y: [0, -2, 0], scaleY: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      />
      {/* Bag body: bounces and squashes */}
      <motion.path
        d="M7 9h10a2 2 0 0 1 2 1.8l1 7.2a4 4 0 0 1-4 4.5H8a4 4 0 0 1-4-4.5l1-7.2A2 2 0 0 1 7 9z"
        animate={animate ? { scaleY: [1, 0.85, 1.05, 1], scaleX: [1, 1.08, 0.95, 1] } : {}}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ originY: 1 }}
      />
      {/* Inner smile hook */}
      <motion.path
        d="M9 12a3 3 0 0 0 6 0"
        animate={animate ? { y: [0, 1, 0] } : {}}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      />
    </svg>
  );
}
