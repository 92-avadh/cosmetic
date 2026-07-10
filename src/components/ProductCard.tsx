"use client";

import { useState } from "react";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
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
  const router = useRouter();
  const { addItem, currency } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isWishlisted(id);

  const primaryImage = image.includes(",") ? image.split(",")[0] : image;
  const hoverImageToShow = hoverImage || (image.includes(",") ? image.split(",")[1] : primaryImage);

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
    router.push("/checkout");
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

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem({ id, name, subtitle, priceUSD, image, hoverImage });
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-bg/80 backdrop-blur-sm border border-line/30 rounded-full cursor-pointer hover:bg-bg transition-colors"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={wishlisted ? "filled" : "empty"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Hover Alt Image */}
        <img
          src={hoverImageToShow}
          alt={`BODYBARREL - ${name} Texture`}
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
            className="w-full text-ink border-ink/40 bg-transparent text-[8px] md:text-[9.5px] font-bold py-2.5 px-2 tracking-wider uppercase flex items-center justify-center space-x-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </CurtainButton>
          <CurtainButton
            onClick={handleBuyNow}
            className="w-full text-[#2d1c14] border-[#2d1c14]/40 bg-transparent text-[8px] md:text-[9.5px] font-bold py-2.5 px-2 tracking-wider uppercase flex items-center justify-center space-x-1"
          >
            <span>Buy Now</span>
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

