"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductRow from "@/components/ProductRow";
import MarqueeBand from "@/components/MarqueeBand";
import CartDrawer from "@/components/CartDrawer";
import CurrencyModal from "@/components/CurrencyModal";
import { useCartStore } from "@/store/useCartStore";
import dynamic from "next/dynamic";

const GlassBubble = dynamic(() => import("@/components/GlassBubble"), { ssr: false });
const PhilosophySection = dynamic(() => import("@/components/PhilosophySection"), { ssr: false });
const PinnedStepsSection = dynamic(() => import("@/components/PinnedStepsSection"), { ssr: false });
const IngredientsSection = dynamic(() => import("@/components/IngredientsSection"), { ssr: false });
const StatsSection = dynamic(() => import("@/components/StatsSection"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { fetchProducts } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Trigger loading fadeout once progress hits 100%
  useEffect(() => {
    if (loadingProgress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress]);

  useEffect(() => {
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
          return 100;
        }

        let next = prev;
        // If page has loaded, speed up to 100%
        if (isLoaded) {
          next = Math.min(100, prev + 6);
        } else if (prev < 90) {
          // Otherwise, crawl slowly up to 90%, then even slower to 98%
          const diff = 90 - prev;
          next = prev + Math.max(0.2, diff * 0.05); // slowing increment
        } else if (prev < 98) {
          next = prev + 0.05; // tiny crawl near the end
        }

        if (next >= 100) {
          clearInterval(interval);
        }
        return next;
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#121212] flex flex-col items-center justify-center text-bg select-none font-sans overflow-hidden"
          >
            {/* Absolute campaign background on loading screen */}
            <div className="absolute inset-0 z-0">
              <img
                src="/model_with_product.png"
                alt="Campaign Loading Screen Background"
                className="w-full h-full object-cover opacity-35 filter scale-105 blur-[3px]"
              />
              <div className="absolute inset-0 bg-[#121212]/50 backdrop-blur-md" />
            </div>

            {/* WebGL Refractive Soap Bubble in loading screen */}
            <GlassBubble scale={2.5} position={[0, 0, 0]} className="w-full h-full absolute inset-0 z-5" />

            {/* Centered organic brand logo preloader container */}
            <div className="relative z-10 w-[85vw] h-[85vw] max-w-[380px] max-h-[380px] flex items-center justify-center border border-bg/15 rounded-full bg-bg/5 backdrop-blur-xl animate-[pulse_3.5s_ease-in-out_infinite]">
              {/* Brand Logo */}
              <div className="relative z-10 pointer-events-none flex items-center gap-3 select-none">
                <span className="text-[9px] tracking-[0.3em] font-sans font-semibold text-bg/40 uppercase whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
                  CELLULAR
                </span>
                <span className="font-serif font-light text-4xl sm:text-5xl tracking-[0.05em] uppercase text-bg">
                  BODYBARREL
                </span>
              </div>
            </div>

            {/* Progress Percentage at bottom center */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center select-none z-10">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-bg/60">
                {String(Math.min(100, Math.floor(loadingProgress))).padStart(3, "0")}%
              </span>
            </div>
          </motion.div>
        )}
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

            {/* Full-width campaign image showcase */}
            <section className="relative w-full h-[85vh] overflow-hidden bg-card-bg border-y border-line/35">
              <img
                src="/model_with_product.png"
                alt="BODYBARREL - Biological Skin Sourcing"
                className="w-full h-full object-cover select-none filter contrast-[1.01] brightness-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20 pointer-events-none" />
              <div className="absolute bottom-12 left-6 md:left-12 max-w-xl text-bg space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent block">
                  Dermal Sourcing & Efficacy
                </span>
                <h3 className="font-display font-semibold text-2xl md:text-4xl uppercase tracking-tight leading-tight">
                  Formulated for high performance. Sourced for skin biological integrity.
                </h3>
              </div>
            </section>

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
