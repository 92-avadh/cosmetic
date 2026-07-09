"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";
import { useCartStore } from "@/store/useCartStore";
import { Sparkles, HelpCircle, Layers, Droplet } from "lucide-react";
import CurtainButton from "@/components/CurtainButton";

const ProductCardSkeleton = () => (
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
);

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { products, fetchProducts } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts().finally(() => {
      setIsLoading(false);
    });
  }, [fetchProducts]);

  const displayProducts = products.length > 0 ? products : PRODUCTS_CATALOG;

  const categories = [
    { id: "all", label: "All Products" },
    { id: "skincare", label: "Hydra-Active Wash" },
    { id: "bodycare", label: "Targeted Body Wash" },
  ];

  // Category filtering based on product category
  const filteredProducts = displayProducts.filter((product) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "skincare") {
      return product.id.includes("hydra");
    }
    if (activeCategory === "bodycare") {
      return product.id.includes("wash");
    }
    return true;
  });

  const skinTypes = [
    {
      title: "Dry & Damaged",
      recommendation: "Aura-Glow / Bio-Fit",
      details: "Requires rich micro-ceramides and amino acids to seal moisture. Avoid high-temperature water.",
      ph: "5.5 Balanced",
    },
    {
      title: "Sensitive & Reacting",
      recommendation: "Bio-Fit Unisex",
      details: "Formulated with soothing marine PDRN and centella extract to reduce epidermal stress and micro-redness.",
      ph: "5.4 Low-Acid",
    },
    {
      title: "Thick Dermis / Oily",
      recommendation: "Derm-Restore Men's",
      details: "Specifically designed for active lipid control and charcoal-depth cleansing without stripping surface barrier.",
      ph: "5.6 Restorative",
    },
    {
      title: "Uneven Texture",
      recommendation: "Dermal-Micro Exfoliating",
      details: "Biological enzymes dissolve keratin bonds gently. Recommended 2-3 times per week.",
      ph: "5.2 Micro-Peel",
    },
  ];

  const faqs = [
    {
      q: "How does the lipid barrier repair mechanism work?",
      a: "Our body washes are infused with biocompatible lipids (ceramides, phytosterols, and free fatty acids) in a 3:1:1 ratio. During cleansing, rather than stripping the skin's defense shield, these micro-fragmented lipids fit into the gaps of the cellular matrix, reinforcing your skin's outer envelope.",
    },
    {
      q: "Why is pH 5.5 critical for body skin?",
      a: "Healthy skin maintains a slightly acidic pH (around 5.5) known as the acid mantle. Traditional alkaline soaps (pH 8-10) disrupt this mantle, making skin prone to dryness, flaking, and bacterial ingress. A pH of 5.5 ensures optimal enzyme activity for self-repair and hydration.",
    },
    {
      q: "Can the Exfoliating Wash be used every day?",
      a: "We recommend using the Dermal-Micro Exfoliating Wash 2-3 times per week. It contains natural fruit enzymes and microscopic marine minerals that lift dead cells. For daily cleansing on other days, alternate with the Bio-Fit or Aura-Glow washes to maintain barrier integrity.",
    },
    {
      q: "What makes BODYBARREL different from face cleansers?",
      a: "Body skin is significantly thicker than facial skin, has fewer sebaceous glands, and is subjected to constant friction from clothing. Our formulas are specifically adjusted with larger molecular surfactants that cleanse effectively without deep epidermal penetration, preventing systemic dryness.",
    },
  ];

  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-line pb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`button px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 border rounded-full ${
                  activeCategory === cat.id
                    ? "bg-ink text-bg border-ink"
                    : "bg-transparent text-ink/75 border-line hover:border-ink hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Main Products Grid with Split Layout matching screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
            {/* Left Sidebar Content */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
              <h2 className="font-display font-semibold text-3xl md:text-4xl uppercase tracking-tight text-accent flex items-center gap-2">
                <span className="text-accent font-sans">•</span> OUR PRODUCTS
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-muted leading-relaxed max-w-sm">
                <p>
                  Korean formulation science emphasises how skin behaves, not how it appears.
                </p>
                <p>
                  This is why Korean formulas lead in barrier-first design, advanced delivery systems, and recovery-focused body care.
                </p>
              </div>
            </div>

            {/* Right Product Grid */}
            <div className="lg:col-span-8">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-card-bg border border-line rounded-2xl">
                  <span className="text-sm text-muted uppercase tracking-widest block mb-4">
                    No products found in this category
                  </span>
                  <CurtainButton
                    onClick={() => setActiveCategory("all")}
                    className="px-8 py-3 text-ink border-ink bg-transparent text-xs font-semibold tracking-widest uppercase border"
                  >
                    Show All Products
                  </CurtainButton>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width campaign image showcase on shop page */}
        <section className="relative w-full h-[85vh] overflow-hidden bg-card-bg border-y border-line/35 my-24">
          <img
            src="/face_wash.png"
            alt="BODYBARREL - Active Cleansing Campaign"
            className="w-full h-full object-cover select-none filter contrast-[1.01] brightness-[0.95]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/15 pointer-events-none" />
          <div className="absolute bottom-12 left-6 md:left-12 max-w-xl text-bg space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent block">
              Dermal Sourcing & Efficacy
            </span>
            <h3 className="font-display font-semibold text-2xl md:text-4xl uppercase tracking-tight leading-tight">
              Formulated for high performance. Sourced for skin biological integrity.
            </h3>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Skin Type Guide Section */}
          <section className="mt-28 border-t border-line/60 pt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> Skin System Guide
                </span>
                <h2 className="font-display font-semibold text-2xl md:text-4xl uppercase tracking-tight text-ink">
                  FIND YOUR RESILIENCE FORMULA
                </h2>
              </div>
              <p className="text-xs md:text-sm text-muted max-w-sm">
                Matches developed by biological research to align formulation chemistry with specific epidermal types.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skinTypes.map((type) => (
                <div key={type.title} className="p-6 bg-card-bg/40 border border-line/40 rounded-xl space-y-4 flex flex-col justify-between hover:border-accent/40 transition-colors duration-300">
                  <div className="space-y-3">
                    <h3 className="font-display font-semibold text-sm tracking-wide uppercase text-ink">
                      {type.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      {type.details}
                    </p>
                  </div>
                  <div className="border-t border-line/30 pt-3 flex items-center justify-between text-[9px] uppercase tracking-widest font-semibold">
                    <span className="text-accent">{type.recommendation}</span>
                    <span className="text-muted/75 font-mono">{type.ph}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ & Protocol Section */}
          <section className="mt-28 border-t border-line/60 pt-20">
            <div className="max-w-3xl mb-16 space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5" /> Efficacy & Protocol
              </span>
              <h2 className="font-display font-semibold text-2xl md:text-4xl uppercase tracking-tight text-ink">
                CLINICAL STUDY & SCIENCE Q&A
              </h2>
              <p className="text-xs md:text-sm text-muted max-w-xl leading-relaxed">
                An educational guide detailing the lipid barrier, cellular water retention, pH balancing, and clinical active surfactant ingredients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-3 border-b border-line/30 pb-6 last:border-b-0 md:last:border-b border-line/35">
                  <h3 className="font-display font-semibold text-sm tracking-wide uppercase text-ink flex gap-3">
                    <span className="text-accent/60 font-mono">0{index + 1}</span>
                    {faq.q}
                  </h3>
                  <p className="text-xs md:text-sm text-muted leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
