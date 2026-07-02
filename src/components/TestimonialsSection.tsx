"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Review {
  quote: string;
  name: string;
  role: string;
}

const REVIEWS: Review[] = [
  {
    quote:
      "My barrier finally feels resilient instead of reactive. Three weeks in and the redness I'd fought for years is simply gone.",
    name: "Ines M.",
    role: "Verified — 2 months",
  },
  {
    quote:
      "It reads like a lab formula, not a fragrance experiment. The PDRN serum is the first product to visibly firm my under-eye.",
    name: "Dr. Priya S.",
    role: "Dermatology Resident",
  },
  {
    quote:
      "The texture disappears into the skin. No film, no residue — just a calm, dense hydration that lasts through the day.",
    name: "Marcus L.",
    role: "Verified — 4 months",
  },
];

/**
 * Editorial testimonials. A pinned oversized quote-mark scrubs subtly as
 * the block scrolls, while each review card reveals with a masked line
 * lift — the same clip-reveal language used in the hero headline.
 */
export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Staggered card reveal.
      gsap.fromTo(
        container.querySelectorAll(".review-card"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: { trigger: container, start: "top 70%" },
        }
      );

      // Oversized decorative quote mark drifts on scrub.
      gsap.fromTo(
        markRef.current,
        { yPercent: 20, opacity: 0.06 },
        {
          yPercent: -20,
          opacity: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="reviews"
      className="relative py-28 md:py-40 bg-card-bg overflow-hidden border-b border-line/50"
    >
      {/* Oversized decorative quotation mark */}
      <span
        ref={markRef}
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 right-4 md:right-20 font-display font-bold text-ink leading-none text-[40vw] md:text-[22vw]"
      >
        &rdquo;
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-4">
            Field Notes
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[1.1] text-ink">
            Skin that performs, in their words.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12 border-t border-line/45 pt-16">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="review-card flex flex-col justify-between space-y-8"
            >
              <blockquote className="text-ink text-base md:text-lg leading-relaxed font-body">
                {review.quote}
              </blockquote>
              <figcaption className="flex flex-col border-t border-line/40 pt-5">
                <span className="font-display font-semibold text-sm uppercase tracking-wider text-ink">
                  {review.name}
                </span>
                <span className="text-muted text-xs uppercase tracking-[0.15em] mt-1">
                  {review.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
