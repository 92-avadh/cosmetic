"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WORDS = [
  "PDRN Cellular Science",
  "Skin Fitness",
  "Bio-Regeneration",
  "Marine Actives",
  "Barrier Strength",
];

/**
 * Editorial infinite marquee band — a seamless horizontal loop that also
 * nudges its direction/speed based on scroll velocity, so it feels alive
 * as the page moves. Sits between sections as a kinetic typographic divider.
 */
export default function MarqueeBand() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Seamless loop: the track holds two identical sequences, so shifting
      // by -50% and wrapping is invisible.
      const loop = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 24,
        repeat: -1,
      });

      // Scroll velocity → briefly speed up + reverse direction.
      const st = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const dir = v < 0 ? -1 : 1;
          const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 400);
          gsap.to(loop, {
            timeScale: boost * dir,
            duration: 0.3,
            overwrite: true,
            onComplete: () => gsap.to(loop, { timeScale: 1, duration: 0.6 }),
          });
        },
      });

      return () => st.kill();
    });

    return () => ctx.revert();
  }, []);

  // Two copies for the seamless -50% loop.
  const sequence = [...WORDS, ...WORDS];

  return (
    <section className="relative py-8 md:py-10 bg-ink text-bg overflow-hidden border-y border-line/20 select-none">
      <div ref={trackRef} className="flex whitespace-nowrap w-max will-change-transform">
        {sequence.map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display font-semibold text-2xl md:text-4xl uppercase tracking-tight px-6 md:px-10">
              {word}
            </span>
            {/* Accent divider glyph */}
            <span className="text-accent text-2xl md:text-4xl leading-none">✳</span>
          </div>
        ))}
      </div>
    </section>
  );
}
