"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

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
  }, []);

  // Set up global text scroll-reveal trigger on page changes
  useEffect(() => {
    // Prevent reveal animations if prefers-reduced-motion matches
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const textElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, .reveal-text");
      textElements.forEach((el) => {
        // Skip elements inside header, preloader, hero sections or those with inline reveals
        if (
          el.closest("header") ||
          el.closest("#preloader") ||
          el.closest(".word-reveal") ||
          el.classList.contains("word-reveal")
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
