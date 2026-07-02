"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "./ProductCard";

export const PRODUCTS_CATALOG = [
  {
    id: "eye-serum",
    name: "Eye Fitness Serum",
    subtitle: "Cellular Recovery 15ml",
    priceUSD: 85,
    image: "/products/eye-serum.png",
    hoverImage: "/products/cream-texture.png",
  },
  {
    id: "recovery-cream",
    name: "Active Recovery Cream",
    subtitle: "Cell-Fit Hydration 50ml",
    priceUSD: 110,
    image: "/products/recovery-cream.png",
    hoverImage: "/products/cream-texture.png",
  },
  {
    id: "glow-mist",
    name: "Phyto-Stem Glow Mist",
    subtitle: "Cellular Hydrating Spray 100ml",
    priceUSD: 65,
    image: "/products/glow-mist.png",
    hoverImage: "/products/cream-texture.png",
  },
  {
    id: "cleansing-gel",
    name: "Barrier Cleansing Gel",
    subtitle: "Gentle Amino Wash 150ml",
    priceUSD: 45,
    image: "/products/cleansing-gel.png",
    hoverImage: "/products/cream-texture.png",
  },
];

export default function ProductRow() {
  // Initialize Embla Carousel for mobile snap scrolling, disabled on tablet/desktop (>= 768px)
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "keepSnaps",
    breakpoints: {
      "(min-width: 768px)": { active: false },
    },
  });

  return (
    <section id="shop" className="py-24 md:py-32 bg-bg border-b border-line/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-3">
              The Collection
            </span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
              Skin Fitness Tools
            </h2>
          </div>
          <p className="text-sm md:text-base text-muted max-w-md">
            Biocompatible formulas engineered in collaboration with Korean clinical skin scientists
            to restore active resilience, cellular speed, and structural integrity.
          </p>
        </div>

        {/* Embla Carousel Wrap for Mobile */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex md:grid md:grid-cols-4 md:gap-8 gap-6">
            {PRODUCTS_CATALOG.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[78vw] sm:w-[50vw] md:w-auto"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
