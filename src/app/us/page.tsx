"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function UsPage() {
  const brandPillars = [
    {
      title: "Biocompatible Research",
      desc: "Our labs develop cellular ingredients that map precisely to human biological structures, maximizing absorption speed and structural efficacy."
    },
    {
      title: "Seoul Clinical Labs",
      desc: "Every formulation is designed, synthesized, and clinically evaluated in collaboration with leading skin research scientists in Seoul, Korea."
    },
    {
      title: "Purity & Integrity",
      desc: "We isolate high-potency raw active ingredients while avoiding synthetic fillers, silicones, micro-plastics, and structural parabens."
    }
  ];

  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        {/* Us Intro Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent block">
              OUR GENESIS & PHILOSOPHY
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-6xl uppercase tracking-tight text-ink leading-tight">
              BODYBARREL: <br />
              <span className="text-accent">CELLULAR STRENGTH</span>
            </h1>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Founded in collaboration with prominent clinical skin biochemists, BODYBARREL is dedicated to building structural skin fitness from within. We believe the skin is an active organ that can be trained, repaired, and structurally optimized through advanced molecular biology.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-16">
            {/* Main Narrative Image */}
            <div className="relative aspect-[16/10] bg-card-bg border border-line rounded-2xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop"
                alt="Research Laboratory Extraction"
                className="w-full h-full object-cover filter brightness-95 saturate-[0.85]"
              />
            </div>

            {/* Narrative text block */}
            <div className="space-y-6 max-w-xl">
              <h2 className="font-display font-semibold text-xl md:text-2xl uppercase tracking-wide text-ink">
                THE KOREAN CLINICAL ENGINE
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                By sourcing wild-derived marine cellular fragments and utilizing advanced enzymatic micro-filtration, we create active formulas that stimulate deep dermal density. We bridge the gap between active molecular genetics and daily skin routines.
              </p>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Each product is formulated inside our partnering clinical laboratory in Seoul. Through hundreds of skin tests, we ensure the stability and safety of our low-molecular weight polynucleotides, establishing a new global benchmark for skin longevity and health.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="bg-card-bg py-24 border-y border-line/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-3">
                Core Foundations
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                PILLARS OF INTEGRITY
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brandPillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-bg p-8 border border-line/60 rounded-xl space-y-4 hover:shadow-sm transition-all duration-300"
                >
                  <span className="font-display font-bold text-xs text-accent tracking-widest uppercase">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="font-display font-semibold text-lg uppercase tracking-wide text-ink">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
