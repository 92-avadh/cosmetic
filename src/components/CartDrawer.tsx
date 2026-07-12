"use client";

import { useEffect, useRef } from "react";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS_CATALOG } from "./ProductRow";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import CurtainButton from "./CurtainButton";
import ShoppingBagIcon from "./ShoppingBagIcon";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeItem,
    updateQuantity,
    currency,
    addItem,
    products,
  } = useCartStore();

  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  const handleCheckoutRedirect = () => {
    setCartOpen(false);
    if (isLoggedIn) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=/checkout");
    }
  };

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Trap scrolling
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, setCartOpen]);

  // Calculate totals
  const subtotalUSD = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const convertedSubtotal = subtotalUSD * CURRENCY_RATES[currency];
  
  const formattedSubtotal = `${CURRENCY_SYMBOLS[currency]}${convertedSubtotal.toLocaleString(
    undefined,
    {
      minimumFractionDigits: currency === "KRW" ? 0 : 2,
      maximumFractionDigits: currency === "KRW" ? 0 : 2,
    }
  )}`;

  // Find upsell candidates (products in catalog but NOT currently in cart)
  const cartIds = cart.map((i) => i.id);
  const displayProducts = products.length > 0 ? products : PRODUCTS_CATALOG;
  const upsellProducts = displayProducts.filter((p) => !cartIds.includes(p.id)).slice(0, 2);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
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
                <ShoppingBagIcon className="w-5 h-5" />
                <span className="font-display font-semibold text-sm tracking-wider uppercase">
                  Your Bag ({cart.reduce((total, i) => total + i.quantity, 0)})
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-ink hover:text-accent transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBagIcon className="w-12 h-12 text-muted opacity-40" />
                  <p className="text-xs uppercase tracking-widest text-muted">
                    Your shopping bag is empty.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="border border-line bg-ink text-bg px-6 py-2.5 text-[10px] font-semibold tracking-widest uppercase hover:bg-accent hover:text-bg transition-colors duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => {
                    const price = item.price * CURRENCY_RATES[currency] * item.quantity;
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
                          <div className="absolute top-1 left-1 bg-bg/95 backdrop-blur-sm px-1 py-0.2 text-[5px] tracking-[0.2em] font-bold text-ink uppercase z-10 select-none rounded-[1px]">
                            BODYBARREL
                          </div>
                          <img
                            src={item.image.includes(",") ? item.image.split(",")[0] : item.image}
                            alt={`BODYBARREL - ${item.name}`}
                            width={80}
                            height={96}
                            loading="lazy"
                            decoding="async"
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
                            {/* Quantity controls */}
                            <div className="flex items-center border border-line/50 rounded-sm">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 text-muted hover:text-ink transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-semibold text-ink min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 text-muted hover:text-ink transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-xs font-semibold text-ink/80">{priceStr}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Dynamic Product Upsell Row */}
              {cart.length > 0 && upsellProducts.length > 0 && (
                <div className="border-t border-line/45 pt-6 mt-8 space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.15em] text-muted font-bold">
                    Complete your regimen
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {upsellProducts.map((product) => {
                      const price = product.priceUSD * CURRENCY_RATES[currency];
                      const priceStr = `${CURRENCY_SYMBOLS[currency]}${price.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: currency === "KRW" ? 0 : 2,
                          maximumFractionDigits: currency === "KRW" ? 0 : 2,
                        }
                      )}`;

                      return (
                        <div
                          key={product.id}
                          className="flex items-center space-x-3 p-2 bg-card-bg/60 border border-line/30 rounded relative"
                        >
                          <div className="relative w-12 h-14 shrink-0 overflow-hidden border border-line/20 rounded-[2px]">
                            <div className="absolute top-0.5 left-0.5 bg-bg/95 px-0.5 py-0.1 text-[4px] tracking-[0.18em] font-bold text-ink uppercase z-10 select-none rounded-[1px]">
                              BODYBARREL
                            </div>
                            <img
                              src={product.image.includes(",") ? product.image.split(",")[0] : product.image}
                              alt={`BODYBARREL - ${product.name}`}
                              width={48}
                              height={56}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover bg-card-bg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-display font-semibold text-[9px] uppercase tracking-wide truncate text-ink">
                              {product.name}
                            </h5>
                            <span className="text-[9px] text-muted font-medium">{priceStr}</span>
                            <button
                              onClick={() =>
                                addItem({
                                  id: product.id,
                                  name: product.name,
                                  price: product.priceUSD,
                                  image: product.image,
                                  subtitle: product.subtitle,
                                })
                              }
                              className="text-[9px] text-accent hover:underline block mt-1 uppercase font-bold tracking-widest"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-line space-y-4 bg-card-bg/40">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-widest text-muted font-medium">
                    Estimated Subtotal
                  </span>
                  <span className="font-display font-semibold text-lg text-ink">
                    {formattedSubtotal}
                  </span>
                </div>
                <p className="text-[10px] text-muted leading-relaxed uppercase tracking-wider">
                  Shipping and taxes calculated at checkout. Free shipping on orders over $150.
                </p>
                <CurtainButton
                  onClick={handleCheckoutRedirect}
                  className="w-full text-ink border-ink bg-transparent text-[11px] font-semibold py-4 tracking-[0.2em] uppercase flex items-center justify-center space-x-2 cursor-pointer border"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </CurtainButton>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
