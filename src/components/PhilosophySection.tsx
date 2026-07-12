"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLImageElement>(null);
  const bg2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background layer 1: parallax upwards
      gsap.fromTo(
        bg1Ref.current,
        { yPercent: 15 },
        {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Background layer 2: parallax downwards at a different multiplier
      gsap.fromTo(
        bg2Ref.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const valueProps = [
    {
      num: "01",
      title: "Cellular Strength",
      desc: "Targeting skin restoration at a nuclear level rather than masking cosmetic surface imperfections.",
    },
    {
      num: "02",
      title: "PDRN Bio-Science",
      desc: "Formulated with pure wild-derived marine cellular fragments supporting deep dermal elasticity.",
    },
    {
      num: "03",
      title: "Skin Endurance",
      desc: "Building a resilient moisture barrier capable of defending against modern environmental stress.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative py-32 md:py-48 bg-card-bg overflow-hidden border-b border-line/50"
    >
      {/* Parallax Background Assets */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Layer 1 (Top Left) */}
        <img
          ref={bg1Ref}
          src="/philosophy-bg1.png"
          alt=""
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
          className="absolute top-10 left-[5%] w-[35vw] max-w-[320px] aspect-square object-cover rounded-full opacity-35 mix-blend-multiply filter blur-[2px]"
        />

        {/* Layer 2 (Bottom Right) */}
        <img
          ref={bg2Ref}
          src="/philosophy-bg2.png"
          alt=""
          width={360}
          height={450}
          loading="lazy"
          decoding="async"
          className="absolute bottom-10 right-[5%] w-[40vw] max-w-[360px] aspect-[4/5] object-cover rounded-3xl opacity-25 mix-blend-multiply filter blur-[1px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Core Philosophy Statement */}
        <div className="max-w-4xl mb-24 md:mb-32">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-4">
            Our Philosophy
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight leading-[1.1] text-ink">
            Body care is not just washing. It is daily training for your skin's biological resilience.
          </h2>
          <div className="mt-8">
            <a
              href="#system"
              className="relative text-sm font-semibold tracking-widest text-ink hover:text-accent uppercase inline-flex items-center group transition-colors"
            >
              Learn about active PDRN ingredients
              <span className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </div>
        </div>

        {/* Triple Value Props Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 border-t border-line/45 pt-16">
          {valueProps.map((prop) => (
            <div key={prop.num} className="flex flex-col space-y-4">
              <span className="font-display font-bold text-accent text-lg tracking-widest">
                {prop.num}
              </span>
              <h3 className="font-display font-semibold text-xl uppercase tracking-wider text-ink">
                {prop.title}
              </h3>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {prop.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
