"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "./ProductCard";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

export const PRODUCTS_CATALOG = [
  {
    id: "hydra-foam-cleanser",
    name: "HYDRA-FOAM CLEANSER",
    subtitle: "Age-Defying, Gentle Hydration Support, + 0.5% PDRN & Hyaluronic Acid",
    priceUSD: 40.71856,
    image: "/model.png",
    hoverImage: "/products/texture-gel.png",
  },
  {
    id: "hydra-nutrition-essence",
    name: "HYDRA-NUTRITION ESSENCE",
    subtitle: "Moisture, Nourish + PDRN (Salmon DNA) & Multi-Peptide",
    priceUSD: 75.4491,
    image: "/serum.png",
    hoverImage: "/products/cream-texture.png",
  },
  {
    id: "men-body-wash",
    name: "Derm-Restore Men's Body Wash",
    subtitle: "Deep Cleanse & Lipid Barrier Repair 400ml",
    priceUSD: 38,
    image: "/products/men-wash.png",
    hoverImage: "/products/texture-gel.png",
  },
  {
    id: "women-body-wash",
    name: "Aura-Glow Women's Body Wash",
    subtitle: "Cellular Recovery & Intense Hydration 400ml",
    priceUSD: 42,
    image: "/products/women-wash.png",
    hoverImage: "/products/texture-gel.png",
  },
  {
    id: "unisex-body-wash",
    name: "Bio-Fit Unisex Body Wash",
    subtitle: "Universal Amino Acid Cleanse 400ml",
    priceUSD: 36,
    image: "/products/unisex-wash.png",
    hoverImage: "/products/texture-gel.png",
  },
  {
    id: "exfoliating-body-wash",
    name: "Dermal-Micro Exfoliating Wash",
    subtitle: "Cellular Resurfacing Body Gel 300ml",
    priceUSD: 40,
    image: "/products/exfoliating-wash.png",
    hoverImage: "/products/texture-gel.png",
  },
];

export default function ProductRow() {
  const { products, fetchProducts } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Use DB products if loaded, otherwise fallback
  const displayProducts = products.length > 0 ? products : PRODUCTS_CATALOG;

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
            {displayProducts.map((product) => (
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
