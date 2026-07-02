"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS_CATALOG } from "@/components/ProductRow";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "serum", label: "Serums" },
    { id: "cream", label: "Creams" },
    { id: "cleanser", label: "Cleansers" },
  ];

  // Simple category filtering based on product name/subtitle keywords
  const filteredProducts = PRODUCTS_CATALOG.filter((product) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "serum") {
      return product.name.toLowerCase().includes("serum") || product.subtitle.toLowerCase().includes("mist");
    }
    if (activeCategory === "cream") {
      return product.name.toLowerCase().includes("cream");
    }
    if (activeCategory === "cleanser") {
      return product.name.toLowerCase().includes("cleansing") || product.name.toLowerCase().includes("wash");
    }
    return true;
  });

  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Section */}
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent block">
              PROFESSIONAL CELL-FIT REGIMEN
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-6xl uppercase tracking-tight text-ink">
              THE COLLECTION
            </h1>
            <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
              Discover biocompatible formulas engineered in partnership with clinical biologists in Seoul. Reprogram cellular recovery and maximize dermal thickness.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-line pb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 border rounded-full ${
                  activeCategory === cat.id
                    ? "bg-ink text-bg border-ink"
                    : "bg-transparent text-ink/75 border-line hover:border-ink hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card-bg border border-line rounded-2xl">
              <span className="text-sm text-muted uppercase tracking-widest block mb-4">
                No products found in this category
              </span>
              <button
                onClick={() => setActiveCategory("all")}
                className="px-8 py-3 bg-ink text-bg text-xs font-semibold tracking-widest uppercase hover:bg-accent hover:text-bg transition-colors"
              >
                Show All Products
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
