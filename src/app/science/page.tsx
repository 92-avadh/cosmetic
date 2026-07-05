"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Dna, Activity, ShieldAlert, Award } from "lucide-react";

export default function SciencePage() {
  const clinicalStats = [
    { value: "+147%", label: "Dermal Hydration", desc: "Epidermal moisture levels and cellular water retention are restored within 14 days." },
    { value: "8.4x", label: "Barrier Recovery", desc: "Intercellular lipid synthesis and protective moisture barrier cycles are accelerated." },
    { value: "-34%", label: "Epidermal Flaking", desc: "Dryness, redness, and inflammation are suppressed, stabilizing the skin structure." },
    { value: "99%", label: "Lipid Compatibility", desc: "Formulated to match human lipid membranes, preventing cellular stripping." },
  ];

  const molecularPhases = [
    {
      step: "01",
      title: "Biocompatible Purifying",
      desc: "Low-molecular weight amino acid surfactants bind specifically to sweat, pollutants, and sebum, lifting them cleanly without dissolving the crucial epidermal lipid layer."
    },
    {
      step: "02",
      title: "Lipid Membrane Infusion",
      desc: "Our proprietary bioreactors inject micro-fragmented lipids, ceramides, and essential fatty acids deep into the stratum corneum, reconstructing the intercellular lipid matrix."
    },
    {
      step: "03",
      title: "Cellular Receptor Recovery",
      desc: "Natural marine biotics and plant-derived compounds bind to adenosine receptors in the body's skin cells, signaling fibroblasts to accelerate healing and elastin production."
    }
  ];

  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        {/* Editorial Page Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent block">
              CELLULAR BODY RESTORATION
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight uppercase text-ink">
              PHYSIOLOGICAL <br />
              <span className="text-accent">BODY SCIENCE</span>
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
              Your body's skin is structurally different from your face—possessing fewer lipid glands and subject to constant environmental friction. Our biomimetic body washes reprogram cellular hydration and restore the lipid barrier to build ultimate body skin fitness.
            </p>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/5] bg-card-bg border border-line overflow-hidden rounded-2xl">
            <img
              src="/products/science-hero.png"
              alt="Cosmetics Laboratory Science"
              className="w-full h-full object-cover filter brightness-[0.9] saturate-[0.8] hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-bg/90 backdrop-blur border border-line rounded-xl flex items-center gap-4">
              <Dna className="w-8 h-8 text-accent shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 block">Purity Grade</span>
                <span className="text-xs font-semibold text-ink uppercase tracking-widest">99.8% Active Biome Ingredients</span>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Statistics Grid */}
        <section className="bg-card-bg py-24 border-y border-line/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-3">
                Proven Efficacy
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                CLINICAL RECONSTRUCTION
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {clinicalStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-bg p-8 border border-line/60 rounded-xl relative hover:border-accent transition-colors duration-300"
                >
                  <span className="font-display font-bold text-5xl md:text-6xl text-accent block mb-4">
                    {stat.value}
                  </span>
                  <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-ink mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cellular Recovery Absorption Timeline */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-line/50">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-3">
                Bio-Recovery Stages
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                4-WEEK CLINICAL TIMELINE
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted max-w-md">
              Skin parameters monitored during clinical evaluation of 150 subjects over a 28-day daily protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-card-bg/40 border border-line/40 rounded-xl space-y-3">
              <span className="font-mono text-xs text-accent font-semibold">STAGE 01 — WEEK 01</span>
              <h3 className="font-display font-semibold text-base text-ink uppercase">BARRIER LOCK</h3>
              <p className="text-xs text-muted leading-relaxed">
                Ceramides integrate into intercellular gaps. TEWL (trans-epidermal water loss) is reduced by 18%. Initial surface flaking is suppressed.
              </p>
            </div>
            <div className="p-6 bg-card-bg/40 border border-line/40 rounded-xl space-y-3">
              <span className="font-mono text-xs text-accent font-semibold">STAGE 02 — WEEK 02</span>
              <h3 className="font-display font-semibold text-base text-ink uppercase">HYDRATION FLOOD</h3>
              <p className="text-xs text-muted leading-relaxed">
                Cellular water pathways open. Epidermal hydration index spikes by 42%. Redness and irritation factors drop significantly.
              </p>
            </div>
            <div className="p-6 bg-card-bg/40 border border-line/40 rounded-xl space-y-3">
              <span className="font-mono text-xs text-accent font-semibold">STAGE 03 — WEEK 03</span>
              <h3 className="font-display font-semibold text-base text-ink uppercase">DEEP SYNTHESIS</h3>
              <p className="text-xs text-muted leading-relaxed">
                Wild marine PDRN fragments stimulate cell metabolism. Collagen synthesis indicators increase, enhancing skin elasticity.
              </p>
            </div>
            <div className="p-6 bg-card-bg/40 border border-line/40 rounded-xl space-y-3">
              <span className="font-mono text-xs text-accent font-semibold">STAGE 04 — WEEK 04</span>
              <h3 className="font-display font-semibold text-base text-ink uppercase">CELLULAR RESILIENCE</h3>
              <p className="text-xs text-muted leading-relaxed">
                Full restoration of the natural lipid defense shield. Dermal density increases by 28%, establishing active skin health.
              </p>
            </div>
          </div>
        </section>

        {/* Clinical Biome Ingredients Index */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-line/50">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-3">
                Molecular Breakdown
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                ACTIVE BIOME INGREDIENTS INDEX
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted max-w-md">
              Highly concentrated cellular actives isolated via enzymatic micro-filtration to align with human lipid structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-card-bg/30 border border-line/40 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-semibold text-lg text-ink uppercase">WILD MARINE PDRN</h3>
                  <span className="font-mono text-[10px] text-accent font-bold px-2.5 py-0.5 border border-accent/30 rounded-full">1.8% Active</span>
                </div>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Extracted from marine cellular fragments. Signals receptors in body fibroblasts to trigger active self-repair, healing micro-tears and restoring dermal density.
                </p>
              </div>
              <div className="border-t border-line/20 pt-4 flex justify-between text-[10px] uppercase tracking-widest text-muted/80">
                <span>Source: Marine Bio-Cell</span>
                <span>Function: Cellular Repair</span>
              </div>
            </div>

            <div className="p-8 bg-card-bg/30 border border-line/40 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-semibold text-lg text-ink uppercase">MICRO-CERAMIDE COMPLEX</h3>
                  <span className="font-mono text-[10px] text-accent font-bold px-2.5 py-0.5 border border-accent/30 rounded-full">3.0% Active</span>
                </div>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Lipids engineered with a 3:1:1 ratio matching skin structure. Fits between cell structures to form a microscopic moisture shield, blocking dryness.
                </p>
              </div>
              <div className="border-t border-line/20 pt-4 flex justify-between text-[10px] uppercase tracking-widest text-muted/80">
                <span>Source: Bio-Fermented Lipids</span>
                <span>Function: Barrier Strength</span>
              </div>
            </div>

            <div className="p-8 bg-card-bg/30 border border-line/40 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-semibold text-lg text-ink uppercase">PHYTO-STEM CELL EXTRACT</h3>
                  <span className="font-mono text-[10px] text-accent font-bold px-2.5 py-0.5 border border-accent/30 rounded-full">2.5% Active</span>
                </div>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Cultured botanical stem cells. Enhances the skin's cell renewal cycle, smoothing surface texture and boosting cell oxygenation.
                </p>
              </div>
              <div className="border-t border-line/20 pt-4 flex justify-between text-[10px] uppercase tracking-widest text-muted/80">
                <span>Source: Alpine Plant Cultures</span>
                <span>Function: Cellular Renewal</span>
              </div>
            </div>

            <div className="p-8 bg-card-bg/30 border border-line/40 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-semibold text-lg text-ink uppercase">AMINO ACID CONCENTRATE</h3>
                  <span className="font-mono text-[10px] text-accent font-bold px-2.5 py-0.5 border border-accent/30 rounded-full">4.0% Active</span>
                </div>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  A mixture of 17 essential amino acids. Lifts pollutants and sweat while acting as a humectant to hold active moisture in the outer layers.
                </p>
              </div>
              <div className="border-t border-line/20 pt-4 flex justify-between text-[10px] uppercase tracking-widest text-muted/80">
                <span>Source: Plant-Derived Surfactants</span>
                <span>Function: Gentle Cleansing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width product wash image showcase */}
        <section className="relative w-full h-[80vh] overflow-hidden bg-card-bg border-y border-line/35">
          <img
            src="/wash_product.png"
            alt="BODYBARREL - Active Cleansing Gel Texture"
            className="w-full h-full object-cover select-none filter contrast-[1.01] brightness-[0.95]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/15 pointer-events-none" />
          <div className="absolute bottom-12 left-6 md:left-12 max-w-xl text-bg space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent block">
              Clinical Active Gel Sourcing
            </span>
            <h3 className="font-display font-semibold text-2xl md:text-4xl uppercase tracking-tight leading-tight">
              Micro-gel emulsion that dissolves impurities while protecting skin cells.
            </h3>
          </div>
        </section>

        {/* Molecular Phases Section */}
        <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block">
              Bio-Synthesis Workflow
            </span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
              HOW WE REPROGRAM BODY CELLS
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Traditional soaps dry the body skin, stripping away its natural defense shield. BODYBARREL operates on a biomimetic level, introducing bio-compatible compounds that match the skin's physical structure to nourish, heal, and fortify.
            </p>
            
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-3 text-xs text-ink tracking-wide font-semibold uppercase">
                <Check className="w-4.5 h-4.5 text-accent stroke-[3]" />
                <span>Zero Sulfates, Parabens, or Artificial Colorants</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink tracking-wide font-semibold uppercase">
                <Check className="w-4.5 h-4.5 text-accent stroke-[3]" />
                <span>Cruelty-Free Bio-Synthesized Actives</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink tracking-wide font-semibold uppercase">
                <Check className="w-4.5 h-4.5 text-accent stroke-[3]" />
                <span>pH-Balanced formulations (5.5) for optimal barrier health</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            {molecularPhases.map((phase) => (
              <div key={phase.step} className="flex gap-6 md:gap-8 pb-8 border-b border-line last:border-b-0 last:pb-0">
                <span className="font-display font-bold text-3xl text-accent/40 select-none">
                  {phase.step}
                </span>
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-lg uppercase tracking-wide text-ink">
                    {phase.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
