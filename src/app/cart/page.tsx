"use client";

import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Trash2, Plus, Minus, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PRODUCTS_CATALOG } from "@/components/ProductRow";
import ProductCard from "@/components/ProductCard";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, getCartTotal, currency } = useCartStore();

  const symbol = CURRENCY_SYMBOLS[currency];
  const rate = CURRENCY_RATES[currency];

  const subtotal = getCartTotal();
  const shipping = subtotal > 150 * rate ? 0 : 15 * rate;
  const tax = subtotal * 0.088; // mock 8.8% sales tax
  const total = subtotal + shipping + tax;

  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * rate;
    return `${symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: currency === "KRW" ? 0 : 2,
      maximumFractionDigits: currency === "KRW" ? 0 : 2,
    })}`;
  };

  // Recommended products (excluding ones already in the cart)
  const recommendations = PRODUCTS_CATALOG.filter(
    (product) => !cart.some((item) => item.id === product.id)
  ).slice(0, 3);

  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-12 border-b border-line pb-6">
            Your Shopping Bag
          </h1>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-6 p-6 bg-card-bg/35 border border-line rounded-2xl items-start sm:items-center justify-between"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-24 bg-card-bg border border-line rounded-lg overflow-hidden shrink-0 relative aspect-[3/4]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-muted">{item.subtitle}</span>
                        <h3 className="font-display font-semibold text-sm uppercase text-ink">{item.name}</h3>
                        <p className="text-xs text-ink/70 font-semibold">{formatPrice(item.price)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-start">
                      {/* Quantity Selectors */}
                      <div className="flex items-center border border-line/80 rounded-full px-3 py-1 bg-bg/50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-accent transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-accent transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <div className="flex items-center gap-6">
                        <span className="text-sm font-semibold text-ink">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Checkout Box */}
              <div className="lg:col-span-4 bg-card-bg/60 border border-line/60 rounded-2xl p-6 space-y-6">
                <h3 className="font-display font-semibold text-base uppercase text-ink border-b border-line/60 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-4 text-xs font-medium uppercase tracking-wider text-ink/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ink">{symbol}{subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-ink">
                      {shipping === 0 ? "Complimentary" : `${symbol}${shipping.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8.8%)</span>
                    <span className="font-semibold text-ink">{symbol}{tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between border-t border-line/60 pt-4 text-sm font-bold text-ink">
                    <span>Total</span>
                    <span>{symbol}{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full bg-ink text-bg text-[11px] font-semibold py-4 uppercase tracking-[0.2em] hover:bg-accent hover:text-bg transition-colors flex items-center justify-center space-x-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 justify-center text-[10px] text-muted tracking-widest uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure 256-Bit SSL Checkout</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-16 animate-fadeIn">
              {/* Empty state */}
              <div className="text-center py-20 bg-card-bg border border-line rounded-2xl max-w-xl mx-auto space-y-6">
                <span className="text-sm text-muted uppercase tracking-[0.2em] block">
                  Your shopping bag is empty
                </span>
                <Link
                  href="/shop"
                  className="inline-block px-10 py-4 bg-ink text-bg text-xs font-semibold tracking-widest uppercase hover:bg-accent hover:text-bg transition-colors duration-300 border border-line"
                >
                  Discover The System
                </Link>
              </div>

              {/* Recommended items carousel list */}
              {recommendations.length > 0 && (
                <div className="space-y-8 pt-12 border-t border-line">
                  <h3 className="font-display font-semibold text-lg uppercase tracking-wide text-ink text-center">
                    RECOMMENDED FOR YOUR SYSTEM
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {recommendations.map((prod) => (
                      <ProductCard key={prod.id} {...prod} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
