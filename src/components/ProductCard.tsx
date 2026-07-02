"use client";

import { useState } from "react";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  subtitle: string;
  priceUSD: number;
  image: string;
  hoverImage: string;
}

export default function ProductCard({
  id,
  name,
  subtitle,
  priceUSD,
  image,
  hoverImage,
}: ProductCardProps) {
  const { addItem, currency } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);

  const convertedPrice = priceUSD * CURRENCY_RATES[currency];
  const priceString = `${CURRENCY_SYMBOLS[currency]}${convertedPrice.toLocaleString(
    undefined,
    {
      minimumFractionDigits: currency === "KRW" ? 0 : 2,
      maximumFractionDigits: currency === "KRW" ? 0 : 2,
    }
  )}`;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price: priceUSD,
      image,
      subtitle,
    });
  };

  return (
    <div
      className="interactive-card flex flex-col group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-card-bg border border-line/50 transition-all duration-500">
        {/* Base Image */}
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Hover Alt Image */}
        <img
          src={hoverImage}
          alt={`${name} Texture`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />

        {/* Quick Add Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 transform ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full bg-ink text-bg text-[10px] md:text-xs font-semibold py-3 px-4 tracking-[0.15em] uppercase hover:bg-accent hover:text-bg transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-4 flex flex-col space-y-1">
        <span className="text-[10px] uppercase tracking-[0.15em] text-muted font-medium">
          {subtitle}
        </span>
        <div className="flex items-baseline justify-between">
          <h3 className="font-display font-semibold text-sm md:text-base tracking-wide uppercase text-ink">
            {name}
          </h3>
          <span className="text-sm font-semibold text-ink/80">{priceString}</span>
        </div>
      </div>
    </div>
  );
}
