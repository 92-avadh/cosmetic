"use client";

import { useState } from "react";
import { useCartStore, CURRENCY_SYMBOL, CURRENCY_RATE } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useUserStore } from "@/store/useUserStore";
import { Plus, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CurtainButton from "./CurtainButton";

interface ProductCardProps {
  id: string;
  name: string;
  subtitle: string;
  priceUSD: number;
  salePriceUSD?: number;
  image: string;
  hoverImage: string;
  badge?: string;
  freeSamples?: string;
}

const BADGE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  DIWALI: { label: "🪔 DIWALI OFFER", color: "#fff", bg: "#b91c1c" },
  DISCOUNT: { label: "🏷️ DISCOUNT", color: "#fff", bg: "#ea580c" },
  FREE: { label: "🎁 FREE", color: "#fff", bg: "#16a34a" },
  BUNDLE: { label: "📦 BUNDLE", color: "#fff", bg: "#7c3aed" },
  SAMPLE: { label: "🧪 SAMPLE", color: "#fff", bg: "#0891b2" },
};

export default function ProductCard({
  id,
  name,
  subtitle,
  priceUSD,
  salePriceUSD,
  image,
  hoverImage,
  badge,
  freeSamples,
}: ProductCardProps) {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isWishlisted(id);

  const primaryImage = image.includes(",") ? image.split(",")[0] : image;
  const hoverImageToShow = hoverImage || (image.includes(",") ? image.split(",")[1] : primaryImage);

  const displayPrice = salePriceUSD && salePriceUSD > 0 ? salePriceUSD : priceUSD;
  const hasSale = salePriceUSD && salePriceUSD > 0 && salePriceUSD < priceUSD;
  const convertedPrice = displayPrice * CURRENCY_RATE;
  const convertedOriginalPrice = priceUSD * CURRENCY_RATE;
  const priceString = `${CURRENCY_SYMBOL}${convertedPrice.toLocaleString(
    undefined,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}`;
  const originalPriceString = `${CURRENCY_SYMBOL}${convertedOriginalPrice.toLocaleString(
    undefined,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
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
    if (!isLoggedIn) {
      const redirectUrl = typeof window !== "undefined" ? window.location.pathname : "/shop";
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price: priceUSD,
      image,
      subtitle,
    });
    useCartStore.setState({ isCartOpen: false });
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent("/checkout")}`);
    } else {
      router.push("/checkout");
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasWishlisted = wishlisted;
    toggleItem({ id, name, subtitle, priceUSD, image, hoverImage });
    if (!isLoggedIn && !wasWishlisted) {
      const redirectUrl = typeof window !== "undefined" ? window.location.pathname : "/shop";
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
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
        <div className="absolute top-3 left-3 bg-bg/90 backdrop-blur-sm px-2 py-0.5 border border-line/40 text-[9px] tracking-[0.22em] font-bold text-ink uppercase z-10 select-none rounded-[2px]">
          BODYBARREL
        </div>

        {/* Promotional Badge */}
        {badge && BADGE_CONFIG[badge] && (
          <div
            className="absolute top-3 right-12 px-2 py-0.5 text-[8px] tracking-[0.15em] font-bold uppercase z-10 select-none rounded-[2px] animate-pulse cursor-help group"
            style={{ backgroundColor: BADGE_CONFIG[badge].bg, color: BADGE_CONFIG[badge].color }}
            title={badge === "DIWALI" ? "Special Diwali offer - Limited time!" : badge === "DISCOUNT" ? "Discounted price" : badge === "FREE" ? "Free gift included" : badge === "BUNDLE" ? "Bundle deal - Save more!" : "Free sample included"}
          >
            {BADGE_CONFIG[badge].label}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-ink text-bg text-[8px] font-medium uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {badge === "DIWALI" ? "🪔 Special Diwali offer - Limited time!" : badge === "DISCOUNT" ? "🏷️ Discounted price" : badge === "FREE" ? "🎁 Free gift included" : badge === "BUNDLE" ? "📦 Bundle deal - Save more!" : "🧪 Free sample included"}
            </span>
          </div>
        )}

        {/* Wishlist Heart Toggle */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-bg/80 backdrop-blur-sm border border-line/30 rounded-full cursor-pointer hover:bg-bg transition-colors"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <AnimatePresence mode="wait">
              <motion.div
                key={wishlisted ? "filled" : "empty"}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    wishlisted ? "fill-red-500 text-red-500" : "fill-none text-ink/60"
                  }`}
                />
              </motion.div>
            </AnimatePresence>
        </button>

        {/* Base Image */}
        <img
          src={primaryImage}
          alt={`BODYBARREL - ${name}`}
          width={600}
          height={600}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Hover Alt Image */}
        <img
          src={hoverImageToShow}
          alt={`BODYBARREL - ${name} Texture`}
          width={600}
          height={600}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />

        {/* Quick Add Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-500 transform grid grid-cols-2 gap-2 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <CurtainButton
            onClick={handleQuickAdd}
            className="w-full text-ink border-ink/40 bg-transparent text-[9px] sm:text-[9.5px] font-bold py-2.5 px-2 tracking-wider uppercase flex items-center justify-center space-x-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </CurtainButton>
          <CurtainButton
            onClick={handleBuyNow}
            className="w-full text-[#2d1c14] border-[#2d1c14]/40 bg-transparent text-[9px] sm:text-[9.5px] font-bold py-2.5 px-2 tracking-wider uppercase flex items-center justify-center space-x-1"
          >
            <span>Buy Now</span>
          </CurtainButton>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-4 flex flex-col space-y-1">
        <span className="text-[11px] uppercase tracking-[0.15em] text-muted font-medium">
          {subtitle}
        </span>
        <div className="flex items-baseline gap-2">
          <h3 className="font-display font-semibold text-sm md:text-base tracking-wide uppercase text-ink">
            {name}
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-ink/80">{priceString}</span>
            {hasSale && (
              <span className="text-xs font-medium text-muted line-through">{originalPriceString}</span>
            )}
          </div>
        </div>
        {freeSamples && freeSamples.length > 0 && (
          <span className="text-[9px] text-emerald-600 font-semibold uppercase tracking-wider">
            + Includes 2 Free 15ml Samples
          </span>
        )}
      </div>
    </Link>
  );
}

