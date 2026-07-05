"use client";

import { useState } from "react";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import { Plus } from "lucide-react";
import Link from "next/link";
import CurtainButton from "./CurtainButton";

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
    <Link
      href={`/products/${id}`}
      className="interactive-card flex flex-col group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-card-bg border border-line/50 transition-all duration-500">
        {/* Brand Overlay Badge */}
        <div className="absolute top-3 left-3 bg-bg/90 backdrop-blur-sm px-2 py-0.5 border border-line/40 text-[7px] tracking-[0.22em] font-bold text-ink uppercase z-10 select-none rounded-[2px]">
          BODYBARREL
        </div>

        {/* Base Image */}
        <img
          src={image}
          alt={`BODYBARREL - ${name}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Hover Alt Image */}
        <img
          src={hoverImage}
          alt={`BODYBARREL - ${name} Texture`}
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
          <CurtainButton
            onClick={handleQuickAdd}
            className="w-full text-ink border-ink bg-transparent text-[10px] md:text-xs font-semibold py-3 px-4 tracking-[0.15em] uppercase flex items-center justify-center space-x-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </CurtainButton>
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
    </Link>
  );
}

