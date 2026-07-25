"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ShoppingBag, ArrowRight, Tag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_TAGS = ["PDRN", "Ceramide", "Exfoliating", "Sensitive Barrier", "Hyperkeratosis", "Phyto-Stem"];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { products, currency, addItem, setCartOpen } = useCartStore();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const symbol = CURRENCY_SYMBOLS[currency] || "$";
  const rate = CURRENCY_RATES[currency] || 1;

  useEffect(() => {
    const stored = localStorage.getItem("bodybarrel-recent-searches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const clean = term.trim();
    const updated = [clean, ...recentSearches.filter((s) => s !== clean)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("bodybarrel-recent-searches", JSON.stringify(updated));
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    onClose();
    setCartOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-ink/70 backdrop-blur-md z-50 flex items-start justify-center pt-16 md:pt-24 p-4 select-none animate-fadeIn">
      <div className="bg-bg border border-line rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-0 relative">
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-line bg-card-bg/40 gap-3">
          <Search className="w-5 h-5 text-accent shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                saveRecentSearch(query);
              }
            }}
            placeholder="Search cellular formulations, ingredients (e.g. PDRN, Ceramide)..."
            className="w-full bg-transparent text-ink placeholder:text-muted/70 text-xs md:text-sm uppercase tracking-wider focus:outline-none font-sans font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted hover:text-ink text-xs font-bold uppercase tracking-wider border-none bg-transparent cursor-pointer shrink-0"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-line/60 flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors cursor-pointer bg-transparent shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6">
          {query.trim() ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-line/45 pb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted">
                  Results ({filteredProducts.length})
                </span>
                {filteredProducts.length > 0 && (
                  <span className="text-[9px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Live Catalog Search
                  </span>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="divide-y divide-line/35">
                  {filteredProducts.map((p) => {
                    const price = p.priceUSD * rate;
                    return (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 py-3 hover:bg-card-bg/60 rounded-xl px-3 transition-colors group"
                      >
                        <div className="w-14 h-16 bg-card-bg border border-line/50 rounded overflow-hidden shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <h4 className="font-display font-semibold text-xs uppercase text-ink group-hover:text-accent transition-colors truncate">
                            {p.name}
                          </h4>
                          <p className="text-[10px] text-muted tracking-wider uppercase truncate mt-0.5">
                            {p.subtitle}
                          </p>
                          <span className="font-display font-bold text-xs text-ink mt-1 block">
                            {symbol}{price.toFixed(currency === "KRW" ? 0 : 2)}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(e, p)}
                          className="px-3.5 py-2 bg-ink text-bg border border-ink rounded text-[9px] font-bold tracking-widest uppercase hover:bg-accent hover:border-accent transition-colors shrink-0 flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 space-y-2">
                  <p className="text-xs uppercase tracking-widest text-muted">No cellular formulations match "{query}"</p>
                  <p className="text-[10px] text-muted/70">Try searching for ingredients like PDRN, Micro-Ceramides, or Exfoliating.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 text-left">
              {/* Popular Tags */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-muted block flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-accent" /> Popular Formulations & Active Actives
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSelectSearch(tag)}
                      className="px-3 py-1.5 bg-card-bg border border-line hover:border-accent hover:text-accent rounded-full text-[10px] uppercase tracking-wider font-semibold text-ink transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2 border-t border-line/40 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-muted">Recent Searches</span>
                    <button
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem("bodybarrel-recent-searches");
                      }}
                      className="text-[8px] uppercase tracking-wider text-muted hover:text-ink border-none bg-transparent cursor-pointer"
                    >
                      Clear Recent
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSelectSearch(s)}
                        className="px-3 py-1 bg-bg border border-line/60 rounded text-[10px] text-ink hover:border-accent transition-colors cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer command prompt hint */}
        <div className="px-6 py-2.5 bg-card-bg/70 border-t border-line/45 flex items-center justify-between text-[9px] uppercase tracking-widest text-muted">
          <span>Press <kbd className="px-1.5 py-0.5 bg-bg border border-line rounded font-mono text-[9px] text-ink">ESC</kbd> to close</span>
          <span>CELLULAR SEARCH ENGINE</span>
        </div>
      </div>
    </div>
  );
}
