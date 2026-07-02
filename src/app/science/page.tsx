"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Dna, Activity, ShieldAlert, Award } from "lucide-react";

export default function SciencePage() {
  const clinicalStats = [
    { value: "+147%", label: "Dermal Density", desc: "Elastin and structural collagen matrices are visibly restored within 14 days." },
    { value: "8.4x", label: "Cellular Speed", desc: "Epidermal recovery and cellular synthesis cycles are dramatically accelerated." },
    { value: "-34%", label: "Redness & Irritation", desc: "Inflammatory responses are suppressed, stabilizing the skin barrier." },
    { value: "98%", label: "Biocompatibility", desc: "Formulated to match cellular structure, preventing sensitivity or rejection." },
  ];

  const molecularPhases = [
    {
      step: "01",
      title: "Wild Marine Harvesting",
      desc: "Raw, highly bio-compatible DNA strands are isolated from wild, cold-water marine organisms using green chemistry processes, ensuring extreme molecular purity and structural density."
    },
    {
      step: "02",
      title: "Enzymatic Micro-Fragmentation",
      desc: "Our proprietary bioreactors fragment DNA chains into low-molecular weight Polynucleotides (PDRN). These ultra-small bio-actives bypass the epidermal barrier to enter deep skin cells."
    },
    {
      step: "03",
      title: "Cellular Receptor Activation",
      desc: "PDRN fragments attach directly to adenosine receptors. This triggers a bio-cascade, prompting fibroblasts to instantly accelerate collagen and elastin synthesis."
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
              MOLECULAR RECOVERY SYSTEMS
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight uppercase text-ink">
              CELLULAR <br />
              <span className="text-accent">PDRN SCIENCE</span>
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
              Polynucleotide (PDRN) is a bio-synthesis molecule derived from pristine marine DNA. Engineered in collaboration with clinical skin scientists in Seoul, our formulas reprogram cellular recovery to build ultimate skin fitness.
            </p>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/5] bg-card-bg border border-line overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop"
              alt="Cosmetics Laboratory Science"
              className="w-full h-full object-cover filter brightness-[0.9] saturate-[0.8] hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-bg/90 backdrop-blur border border-line rounded-xl flex items-center gap-4">
              <Dna className="w-8 h-8 text-accent shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 block">Purity Grade</span>
                <span className="text-xs font-semibold text-ink uppercase tracking-widest">99.8% Clinical Active PDRN</span>
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

        {/* Molecular Phases Section */}
        <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block">
              Bio-Synthesis Workflow
            </span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
              HOW WE REPROGRAM SKIN CELLS
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Traditional skincare sits on the surface, offering temporary moisture. BODYBARREL operates on a genomic level, introducing micro-molecules that match your cellular language to stimulate real physiological changes.
            </p>
            
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-3 text-xs text-ink tracking-wide font-semibold uppercase">
                <Check className="w-4.5 h-4.5 text-accent stroke-[3]" />
                <span>Zero Micro-Plastics or Parabens</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink tracking-wide font-semibold uppercase">
                <Check className="w-4.5 h-4.5 text-accent stroke-[3]" />
                <span>Cruelty-Free Bio-Synthesized Actives</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink tracking-wide font-semibold uppercase">
                <Check className="w-4.5 h-4.5 text-accent stroke-[3]" />
                <span>Recyclable Pharmaceutical Glass Vial Sizing</span>
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
