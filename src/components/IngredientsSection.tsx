"use client";

import FlowingMenu from "./FlowingMenu";

const INGREDIENTS = [
  {
    link: "#system",
    text: "Marine PDRN",
    image: "https://images.unsplash.com/photo-1615396879814-490196766457?q=80&w=600&auto=format&fit=crop",
  },
  {
    link: "#system",
    text: "Phyto-Stem Cells",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop",
  },
  {
    link: "#system",
    text: "Amino Acids",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
  },
  {
    link: "#system",
    text: "Centella Asiatica",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop",
  },
];

export default function IngredientsSection() {
  return (
    <section id="ingredients" className="py-24 md:py-32 bg-bg border-b border-line/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side Section Header: Editorial & Minimalist */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-3">
              Molecular Biology
            </span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
              The Bio-Engine
            </h2>
          </div>
          <p className="text-sm md:text-base text-muted leading-relaxed">
            We isolate biocompatible cellular active elements to stimulate epidermal regeneration, restore your natural lipid barrier, and maximize structural skin density.
          </p>
          <div className="pt-4 border-t border-line/45 flex items-center justify-between text-xs tracking-widest text-muted uppercase">
            <span>4 Key Bio-Actives</span>
            <span className="text-accent font-semibold">100% Biocompatible</span>
          </div>
        </div>

        {/* Right Side: Flowing Interactive Menu */}
        <div className="lg:col-span-8 border border-line/50 rounded-2xl overflow-hidden h-[450px] md:h-[550px] relative">
          <FlowingMenu
            items={INGREDIENTS}
            speed={12}
            textColor="#121212"
            bgColor="#F6F4EE"
            marqueeBgColor="#C97A5E"
            marqueeTextColor="#F6F4EE"
            borderColor="rgba(18, 18, 18, 0.12)"
          />
        </div>
      </div>
    </section>
  );
}
