"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductRow from "@/components/ProductRow";
import PhilosophySection from "@/components/PhilosophySection";
import PinnedStepsSection from "@/components/PinnedStepsSection";
import IngredientsSection from "@/components/IngredientsSection";
import MarqueeBand from "@/components/MarqueeBand";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CurrencyModal from "@/components/CurrencyModal";
import dynamic from "next/dynamic";

const MetaBalls = dynamic(() => import("@/components/MetaBalls"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let progress = 0;
    let isLoaded = false;
    let interval: NodeJS.Timeout;

    const handleLoad = () => {
      isLoaded = true;
    };

    if (document.readyState === "complete") {
      isLoaded = true;
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Fallback: force loaded after 8 seconds in case of slow assets
    const fallbackTimeout = setTimeout(() => {
      isLoaded = true;
    }, 8000);

    interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 600); // smooth fade out transition
          return 100;
        }

        // If page has loaded, speed up to 100%
        if (isLoaded) {
          return Math.min(100, prev + 6);
        }

        // Otherwise, crawl slowly up to 90%, then even slower to 98%
        if (prev < 90) {
          const diff = 90 - prev;
          return prev + Math.max(0.2, diff * 0.05); // slowing increment
        } else if (prev < 98) {
          return prev + 0.05; // tiny crawl near the end
        }
        return prev;
      });
    }, 30);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(fallbackTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col items-center justify-center text-ink select-none font-sans"
          >
            {/* Centered organic WebGL MetaBalls soap bubble loader */}
            <div className="w-[85vw] h-[85vw] max-w-[480px] max-h-[480px] relative flex items-center justify-center">
              <MetaBalls
                className="absolute inset-0 w-full h-full animate-[pulse_6s_ease-in-out_infinite]"
                color="#FFFFFF"
                cursorBallColor="#E5E0D8"
                cursorBallSize={3.5}
                ballCount={2}
                animationSize={16}
                enableMouseInteraction={true}
                enableTransparency={true}
                hoverSmoothness={0.06}
                clumpFactor={0.88}
                speed={0.42}
              />

              {/* Brand Logo inside the MetaBalls, matching the screenshot composition */}
              <div className="relative z-10 pointer-events-none flex items-center gap-3 select-none">
                <span className="text-[9px] tracking-[0.3em] font-sans font-semibold text-ink/35 uppercase whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
                  CELLULAR
                </span>
                <span className="font-serif font-light text-4xl sm:text-5xl tracking-[0.05em] uppercase text-ink">
                  BODYBARREL
                </span>
              </div>
            </div>

            {/* Progress Percentage at bottom center (no bar, padded with leading zeros like "014%") */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center select-none">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-ink/60">
                {String(Math.min(100, Math.floor(loadingProgress))).padStart(3, "0")}%
              </span>
            </div>
          </motion.div>)}
      </AnimatePresence>

      {/* Main Website Contents (Fades in when loaded) */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen flex flex-col"
        >
          {/* Editorial Sticky Navigation */}
          <Nav />

          {/* Main Page Layout Sections */}
          <main className="flex-1 flex flex-col">
            {/* Intro Staggered Reveal Banner with static layout */}
            <Hero />

            {/* Catalog Showcase with Horizontal Swipe and hover features */}
            <ProductRow />

            {/* Kinetic typographic divider — scroll-reactive marquee */}
            <MarqueeBand />

            {/* Parallax Depth-scrolling Brand Statement Section */}
            <PhilosophySection />

            {/* Count-up clinical results band */}
            <StatsSection />

            {/* Active Bioscience Flowing Menu Section */}
            <IngredientsSection />

            {/* Pinned 4-step System Walkthrough */}
            <PinnedStepsSection />

            {/* Editorial reviews with scroll-reveal cards */}
            <TestimonialsSection />
          </main>

          {/* Footer and newsletter email captures */}
          <Footer />

          {/* Slide-in cart state wrapper drawer */}
          <CartDrawer />

          {/* First-visit location & currency selector */}
          <CurrencyModal />
        </motion.div>
      )}
    </>
  );
}
