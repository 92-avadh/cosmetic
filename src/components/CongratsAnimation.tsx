"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CongratsAnimationProps {
  isVisible: boolean;
  onClose: () => void;
  freeSampleNames: string[];
}

const confettiColors = ["#b91c1c", "#ea580c", "#16a34a", "#7c3aed", "#0891b2", "#f59e0b"];

function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: confettiColors[i % confettiColors.length],
            left: `${Math.random() * 100}%`,
            top: -10,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 50,
            opacity: 0,
            rotate: Math.random() * 720 - 360,
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function CongratsAnimation({ isVisible, onClose, freeSampleNames }: CongratsAnimationProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Confetti />
          
          {showContent && (
            <motion.div
              className="relative bg-bg border border-line rounded-3xl p-8 md:p-10 max-w-md w-full mx-4 text-center space-y-6 shadow-2xl"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated SVG Trophy/Celebration */}
              <motion.div
                className="flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 10 }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="#fef3c7"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                  <motion.path
                    d="M40 20 L45 32 L58 34 L48 44 L51 57 L40 50 L29 57 L32 44 L22 34 L35 32 Z"
                    fill="#f59e0b"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  />
                  <motion.path
                    d="M40 25 L43 33 L52 34 L45 41 L47 50 L40 45 L33 50 L35 41 L28 34 L37 33 Z"
                    fill="#fbbf24"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  />
                </svg>
              </motion.div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="font-display font-semibold text-2xl uppercase tracking-tight text-ink">
                  🎉 Congratulations!
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  You've been rewarded with <span className="font-bold text-emerald-600">2 FREE 15ml samples</span>!
                </p>
              </motion.div>

              {freeSampleNames.length > 0 && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ink">
                    Your Free Samples:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {freeSampleNames.map((name, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.1, type: "spring" }}
                      >
                        🧪 {name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                className="pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-ink text-bg text-[10px] font-bold tracking-widest uppercase rounded-[3px] hover:bg-accent transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
