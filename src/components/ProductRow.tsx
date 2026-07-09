"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "./ProductCard";
import CurtainButton from "./CurtainButton";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";

// Re-export so any existing imports of PRODUCTS_CATALOG from this file still work
export { PRODUCTS_CATALOG };

export default function ProductRow() {
  const { products, fetchProducts } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts().finally(() => {
      setIsLoading(false);
    });
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
              Body Wash Formulations
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
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex-none w-[78vw] sm:w-[50vw] md:w-auto">
                  <div className="border border-line/40 rounded-2xl p-4 bg-card-bg/40 animate-pulse space-y-4">
                    <div className="aspect-[4/5] bg-line/25 rounded-xl w-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-line/25 rounded w-2/3" />
                      <div className="h-3 bg-line/20 rounded w-1/2" />
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-line/10">
                      <div className="h-3.5 bg-line/25 rounded w-1/4" />
                      <div className="h-8 bg-line/25 rounded-full w-24" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              displayProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="flex-none w-[78vw] sm:w-[50vw] md:w-auto"
                >
                  <ProductCard {...product} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center mt-12">
          <Link href="/shop">
            <CurtainButton className="px-10 py-4 text-ink border-ink bg-transparent text-xs font-semibold tracking-widest uppercase border rounded-full">
              View All Products
            </CurtainButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
