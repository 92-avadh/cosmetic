"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function UsPage() {
  const brandPillars = [
    {
      title: "Biocompatible Cleansing",
      desc: "Our labs develop cellular-level body wash formulas that cleanse impurities without damaging or dissolving the body's natural lipid barrier."
    },
    {
      title: "Advanced Body Regimens",
      desc: "Every product is tailored for specific skin needs—engineered with targeted bio-actives for Men's thicker dermis, Women's delicate barriers, and Unisex applications."
    },
    {
      title: "Clean Bio-Actives",
      desc: "We isolate high-potency marine biotics and botanicals while strictly avoiding harsh sulfates, silicones, micro-plastics, and synthetic colorants."
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
              <span className="text-accent">BODY STRENGTH</span>
            </h1>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Founded in collaboration with prominent skin biochemists, BODYBARREL is dedicated to building structural skin fitness for the entire body. We believe that body skin requires specialized care, utilizing advanced molecular science to maintain and protect its critical lipid barrier.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-16">
            {/* Main Narrative Image */}
            <div className="relative aspect-[16/10] bg-card-bg border border-line rounded-2xl overflow-hidden shadow-sm">
              <img
                src="/products/us-narrative.png"
                alt="Research Laboratory Extraction"
                className="w-full h-full object-cover filter brightness-95 saturate-[0.85]"
              />
            </div>

            {/* Narrative text block */}
            <div className="space-y-6 max-w-xl">
              <h2 className="font-display font-semibold text-xl md:text-2xl uppercase tracking-wide text-ink">
                THE CLINICAL ENGINE
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                By sourcing wild-derived marine cellular fragments and utilizing advanced enzymatic micro-filtration, we create active body washes that stimulate deep hydration. We bridge the gap between clinical molecular biology and daily shower routines.
              </p>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Each product is formulated inside our partnering clinical laboratory. Through hundreds of skin trials, we ensure the stability and safety of our formulas, establishing a new global benchmark for whole-body skin longevity and health.
              </p>
            </div>
          </div>
        </section>

        {/* Founders & Clinical Advisory Board */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-line/50">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-3">
                Expertise & Chemistry
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                THE CLINICAL BOARD
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted max-w-md">
              Led by veteran cosmetic biochemists and researchers dedicated to cell volume kinetics and skin barrier longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-card-bg border border-line rounded-xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop" 
                  alt="Dr. Jun-Ho Park" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Chief Formulation Scientist</span>
                <h3 className="font-display font-semibold text-lg text-ink uppercase mt-1">Dr. Jun-Ho Park</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">
                  Over 18 years in dermal reconstruction. Former research director at Seoul National Dermal Sciences Center.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-[4/3] bg-card-bg border border-line rounded-xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop" 
                  alt="Dr. Elena Rostova" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Director of Barrier Longevity</span>
                <h3 className="font-display font-semibold text-lg text-ink uppercase mt-1">Dr. Elena Rostova</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">
                  Specializes in intercellular lipid matrix synthesis. Author of multiple peer-reviewed studies on TEWL suppression.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-[4/3] bg-card-bg border border-line rounded-xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=500&auto=format&fit=crop" 
                  alt="Min-Sik Cho" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Head of Clinical Evaluation</span>
                <h3 className="font-display font-semibold text-lg text-ink uppercase mt-1">Min-Sik Cho</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">
                  Oversees all skin trial protocols and bio-absorption testing. Ensures zero allergen indices across all formulas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Eco & Sustainability Green-Tech Sourcing */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-line/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block">
                Responsible Science
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-4xl uppercase tracking-tight text-ink">
                GREEN-TECH & COLD EXTRACTION
              </h2>
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                We utilize standard low-heat enzymatic digestion and microfiltration to isolate plant and marine actives without high-temperature carbon emissions. This ensures the molecules retain their biological structure and efficacy.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-line/30">
                <div>
                  <span className="text-lg font-bold text-accent block">100%</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted font-bold block mt-1">Recycled Aluminum Bottles</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-accent block">Zero</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted font-bold block mt-1">Microplastics Or Sulfates</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 aspect-[16/9] bg-card-bg border border-line rounded-2xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop" 
                alt="Eco Conscious Laboratory Forestry" 
                className="w-full h-full object-cover filter saturate-[0.7] brightness-95"
              />
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
