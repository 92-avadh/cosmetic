"use client";

import { useEffect, useRef } from "react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import { X, Trash2, Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistDrawer() {
  const {
    items: wishlistItems,
    isWishlistOpen,
    setWishlistOpen,
    removeItem,
  } = useWishlistStore();

  const { addItem, currency, setCartOpen } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWishlistOpen(false);
      }
    };
    if (isWishlistOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Trap scrolling
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isWishlistOpen, setWishlistOpen]);

  const handleMoveToBag = (item: any) => {
    // Add to cart
    addItem({
      id: item.id,
      name: item.name,
      price: item.priceUSD,
      image: item.image,
      subtitle: item.subtitle,
    });
    // Remove from wishlist
    removeItem(item.id);
    // Close wishlist and open cart for animation feedback
    setWishlistOpen(false);
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 z-50 bg-black"
          />

          {/* Drawer container */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-bg border-l border-line shadow-2xl flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-6 border-b border-line flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Heart className="w-5 h-5 stroke-[1.5] text-accent fill-accent/10" />
                <span className="font-display font-semibold text-sm tracking-wider uppercase">
                  Your Wishlist ({wishlistItems.length})
                </span>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="p-2 text-ink hover:text-accent transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Heart className="w-12 h-12 stroke-[1.2] text-muted opacity-40" />
                  <p className="text-xs uppercase tracking-widest text-muted">
                    Your wishlist is empty.
                  </p>
                  <button
                    onClick={() => setWishlistOpen(false)}
                    className="border border-line bg-ink text-bg px-6 py-2.5 text-[10px] font-semibold tracking-widest uppercase hover:bg-accent hover:text-bg transition-colors duration-300"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlistItems.map((item) => {
                    const price = item.priceUSD * CURRENCY_RATES[currency];
                    const priceStr = `${CURRENCY_SYMBOLS[currency]}${price.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: currency === "KRW" ? 0 : 2,
                        maximumFractionDigits: currency === "KRW" ? 0 : 2,
                      }
                    )}`;

                    return (
                      <div
                        key={item.id}
                        className="flex space-x-4 border-b border-line/30 pb-6 last:border-b-0"
                      >
                        <div className="relative w-20 h-24 bg-card-bg border border-line/50 overflow-hidden select-none shrink-0">
                          <div className="absolute top-1 left-1 bg-bg/95 px-1 py-0.2 text-[5px] tracking-[0.2em] font-bold text-ink uppercase z-10 select-none rounded-[1px]">
                            BODYBARREL
                          </div>
                          <img
                            src={item.image}
                            alt={`BODYBARREL - ${item.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-display font-semibold text-xs tracking-wide uppercase text-ink">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-muted hover:text-accent p-1 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[9px] uppercase tracking-wider text-muted mt-1">
                              {item.subtitle}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs font-semibold text-ink/80">{priceStr}</span>
                            <button
                              onClick={() => handleMoveToBag(item)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-ink text-bg text-[9px] font-semibold tracking-wider uppercase hover:bg-accent hover:text-bg transition-colors duration-250 rounded-sm"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add to bag</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlistItems.length > 0 && (
              <div className="p-6 border-t border-line text-center bg-card-bg/40">
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="w-full border border-line bg-transparent text-ink text-[10px] font-semibold py-3.5 tracking-widest uppercase hover:bg-ink hover:text-bg transition-colors duration-300 rounded-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
