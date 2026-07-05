"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CurtainButton from "./CurtainButton";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade/slide up for eyebrow label
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      }

      // 2. Word-reveal animations for display headline
      const words = headlineRef.current?.querySelectorAll(".word-reveal");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { y: "115%" },
          {
            y: "0%",
            duration: 1.3,
            stagger: 0.12,
            ease: "power4.out",
            delay: 0.15,
          }
        );
      }

      // 3. CTA button entrance
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.75,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-card-bg"
    >
      {/* Background Graphic Asset */}
      <div className="absolute inset-0 z-0 select-none">
        <video
          src="/Create_a_cinematic_ultra_luxur (1).mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.88] contrast-[1.02]"
        />
        {/* Editorial overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/40" />
      </div>


      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-bg flex flex-col items-center">
        <span
          ref={subtitleRef}
          className="text-xs uppercase tracking-[0.25em] font-semibold text-bg/95 mb-6 block opacity-0"
        >
          Engineered for Ultimate Skin Fitness
        </span>

        <h1
          ref={headlineRef}
          className="font-display font-semibold text-[9vw] sm:text-[7vw] md:text-[5vw] leading-[1.05] tracking-tight uppercase max-w-4xl mx-auto mb-10 flex flex-col items-center select-none"
        >
          <span className="inline-block overflow-hidden relative pb-1.5 w-full text-center">
            <span className="inline-block word-reveal translate-y-[115%]">PDRN Cellular</span>
          </span>
          <span className="inline-block overflow-hidden relative pb-1.5 w-full text-center">
            <span className="inline-block word-reveal translate-y-[115%]">Regeneration</span>
          </span>
        </h1>

        <div ref={ctaRef} className="opacity-0">
          <CurtainButton
            onClick={() => {
              const el = document.getElementById("shop");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-transparent text-bg px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase border border-bg/40 rounded-full"
          >
            DISCOVER THE SYSTEM
          </CurtainButton>
        </div>
      </div>
    </section>
  );
}
