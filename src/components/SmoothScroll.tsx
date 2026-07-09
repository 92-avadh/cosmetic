"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

// Intercept and suppress THREE.Clock deprecation warnings triggered internally by libraries
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated.")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Register GSAP ScrollTrigger inside useEffect to prevent SSR reference errors
    gsap.registerPlugin(ScrollTrigger);

    // Skip Lenis on admin dashboard (uses its own nested scroll container)
    if (pathname.startsWith("/admin")) {
      return;
    }

    // Check for user reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      console.log("Reduced motion detected. Skipping Lenis initialization.");
      return;
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll event with ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis animations off GSAP's global ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable lag smoothing for instant ScrollTrigger calculations
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      ScrollTrigger.killAll();
    };
  }, [pathname]);

  // Set up global text scroll-reveal trigger on page changes
  useEffect(() => {
    // Skip scroll reveal logic on admin dashboard
    if (pathname.startsWith("/admin")) return;

    // Prevent reveal animations if prefers-reduced-motion matches
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const textElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, .reveal-text");
      textElements.forEach((el) => {
        // Skip elements inside header, footer, form, modals/dialogs, preloader, hero sections,
        // or containers with explicit no-reveal overrides.
        if (
          el.closest("header") ||
          el.closest("footer") ||
          el.closest("form") ||
          el.closest("#preloader") ||
          el.closest("[role='dialog']") ||
          el.closest(".no-reveal") ||
          el.closest(".word-reveal") ||
          el.classList.contains("word-reveal") ||
          el.classList.contains("no-reveal")
        ) {
          return;
        }

        // Set initial hidden state
        gsap.set(el, { opacity: 0, y: 20 });

        // Trigger reveal when scrolling past 88% viewport height
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onLeaveBack: () => {
            gsap.to(el, {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },
        });
      });
    });

    // Refresh triggers to recalculate layout offsets
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
