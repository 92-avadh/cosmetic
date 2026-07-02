"use client";

import ScrollStack, { ScrollStackItem } from "./ScrollStack";

interface Step {
  num: string;
  phase: string;
  title: string;
  desc: string;
  image: string;
  clinicalStat: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    phase: "PREP",
    title: "AMINO ACID PURIFICATION",
    desc: "Cleanse away micro-toxins and pollutants while protecting the lipid barrier. Prepares cells for active absorption.",
    image: "/products/cleansing-gel.png",
    clinicalStat: "Purity Index: 99.8%",
  },
  {
    num: "02",
    phase: "ACTIVATE",
    title: "PHYTO-STEM CELL HYDRATION",
    desc: "Infuse active moisture deep into the epidermal layers to open cellular pathways and activate cell resilience.",
    image: "/products/glow-mist.png",
    clinicalStat: "Cell Volumizer: +42%",
  },
  {
    num: "03",
    phase: "REPAIR",
    title: "CELLULAR DROPS OF ENERGY",
    desc: "Concentrated wild marine PDRN fragments repair fine lines, boost skin elasticity, and restore structural density.",
    image: "/products/eye-serum.png",
    clinicalStat: "Dermal Density: +28%",
  },
  {
    num: "04",
    phase: "SHIELD",
    title: "BARRIER STRENGTH RECOVERY",
    desc: "Lock in deep cell regeneration and build an impenetrable moisture shield defending against stress factors.",
    image: "/products/recovery-cream.png",
    clinicalStat: "Barrier Lock: 72H",
  },
];

export default function PinnedStepsSection() {
  return (
    <section id="system" className="relative py-24 md:py-32 bg-bg border-b border-line/50">
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center md:text-left">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-3">
          Skin Fitness Regimen
        </span>
        <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
          The 4-Step System
        </h2>
        <p className="text-sm md:text-base text-muted mt-4 max-w-xl">
          An editorial daily protocol designed to guide cellular recovery from prep to final protective barrier shielding.
        </p>
      </div>

      {/* Scroll Stack Integration */}
      <div className="w-full">
        <ScrollStack
          useWindowScroll={true}
          itemDistance={80}
          itemScale={0.035}
          itemStackDistance={35}
          stackPosition="15%"
          scaleEndPosition="8%"
          baseScale={0.88}
          rotationAmount={-1.5}
          blurAmount={1.5}
        >
          {STEPS.map((step) => (
            <ScrollStackItem key={step.num}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center h-full w-full">
                {/* Left Side: Product Image Display */}
                <div className="md:col-span-5 flex items-center justify-center bg-bg/60 border border-line/35 aspect-square rounded-2xl p-6 relative overflow-hidden select-none">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-[80%] h-[80%] object-contain transform hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Right Side: Step Editorial Copy */}
                <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6 md:space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-accent">
                        {step.phase}
                      </span>
                      <span className="font-display font-bold text-3xl md:text-4xl text-ink/15 tracking-tight">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-xl md:text-2xl uppercase tracking-wider text-ink leading-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-muted text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Quantitative Scientific Stat Footer */}
                  <div className="border-t border-line/40 pt-4 flex items-center justify-between text-[10px] tracking-widest uppercase text-muted/75">
                    <span>Clinical Protocol Certified</span>
                    <span className="font-mono text-accent font-semibold">{step.clinicalStat}</span>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
