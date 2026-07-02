"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { value: 94, suffix: "%", label: "Elasticity", sub: "Improved firmness after 8 weeks of clinical use." },
  { value: 12, suffix: "K", label: "Cell Cycles", sub: "Regeneration cycles supported per full treatment." },
  { value: 89, suffix: "%", label: "Barrier Repair", sub: "Reported a stronger moisture barrier in trials." },
  { value: 100, suffix: "%", label: "Bio-Derived", sub: "Wild marine PDRN, ethically sourced and pure." },
];

/**
 * Clinical-results band. Numbers count up from zero when the section
 * scrolls into view, and each column staggers in from below — the kind
 * of "proof point" strip a science-led skincare brand leans on.
 */
export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Column stagger reveal.
      gsap.fromTo(
        container.querySelectorAll(".stat-col"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 75%" },
        }
      );

      // Count-up driven once when the band enters the viewport.
      ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        once: true,
        onEnter: () => {
          STATS.forEach((stat, i) => {
            const proxy = { n: 0 };
            gsap.to(proxy, {
              n: stat.value,
              duration: 2,
              ease: "power2.out",
              onUpdate: () =>
                setCounts((prev) => {
                  const next = [...prev];
                  next[i] = proxy.n;
                  return next;
                }),
            });
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-bg border-b border-line/50">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-4">
            Proven in the Lab
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[1.1] text-ink">
            Measured results, not marketing promises.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-14 border-t border-line/45 pt-16">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-col flex flex-col">
              <span className="font-display font-bold text-5xl md:text-7xl text-ink tracking-tight tabular-nums">
                {Math.round(counts[i])}
                <span className="text-accent">{stat.suffix}</span>
              </span>
              <h3 className="font-display font-semibold text-sm md:text-base uppercase tracking-wider text-ink mt-4">
                {stat.label}
              </h3>
              <p className="text-muted text-xs md:text-sm mt-2 leading-relaxed">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
