"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import CurtainButton from "@/components/CurtainButton";
import { ShieldCheck, ArrowLeft, LogOut, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useUserStore();
  const { cart, getCartTotal, currency, clearCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [formError, setFormError] = useState("");

  // Guard against hydration mismatches and check login status
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push("/login?redirect=/checkout");
    }
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
        <span className="text-[10px] uppercase tracking-widest text-muted mt-4">Verifying session...</span>
      </div>
    );
  }

  const symbol = CURRENCY_SYMBOLS[currency];
  const rate = CURRENCY_RATES[currency];
  const subtotal = getCartTotal();
  const shipping = subtotal > 150 * rate ? 0 : 15 * rate;
  const tax = subtotal * 0.088; // mock 8.8% tax
  const total = subtotal + shipping + tax;

  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * rate;
    return `${symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: currency === "KRW" ? 0 : 2,
      maximumFractionDigits: currency === "KRW" ? 0 : 2,
    })}`;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !address || !city || !zipCode) {
      setFormError("All shipping fields are required.");
      return;
    }
    
    setFormError("");
    setIsOrdering(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          totalUSD: total,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtitle: item.subtitle,
            image: item.image,
          })),
          shippingDetails: {
            firstName,
            lastName,
            street: address,
            city,
            zip: zipCode,
            country: "US",
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process order.");
      }

      setIsOrdering(false);
      setOrderCompleted(true);
      clearCart();
    } catch (err: any) {
      setFormError(err.message || "Failed to place order. Please try again.");
      setIsOrdering(false);
    }
  };

  if (orderCompleted) {
    return (
      <>
        <Nav />
        <main className="bg-bg text-ink min-h-screen pt-36 pb-24 font-sans flex flex-col items-center justify-center px-6">
          <div className="max-w-md w-full bg-card-bg/40 border border-line/60 rounded-3xl p-8 md:p-10 text-center space-y-6 shadow-sm">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-emerald-600 stroke-[1.2]" />
            </div>
            <div className="space-y-2">
              <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Order Confirmed
              </span>
              <h2 className="font-display font-semibold text-2xl uppercase tracking-tight text-ink mt-3">
                Thank You For Your Order
              </h2>
              <p className="text-xs text-muted leading-relaxed">
                Your skin fitness regimen is being compiled. A confirmation receipt and shipment details have been dispatched to <span className="font-semibold text-ink">{user?.email}</span>.
              </p>
            </div>
            <div className="pt-4 border-t border-line/50">
              <Link
                href="/shop"
                className="w-full bg-ink text-bg text-[10px] font-semibold py-4 uppercase tracking-[0.2em] hover:bg-accent hover:text-bg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Checkout Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-6 mb-12 gap-4">
            <div>
              <h1 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                Secure Checkout
              </h1>
              <p className="text-xs text-muted mt-1">
                Active Session: <span className="text-ink font-medium">{user?.email}</span>
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/login?redirect=/checkout");
              }}
              className="button flex items-center gap-2 px-4 py-2 border border-line text-xs font-semibold uppercase tracking-wider rounded-xl hover:text-accent hover:border-accent transition-colors w-max"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-card-bg/40 border border-line rounded-2xl max-w-xl mx-auto space-y-6">
              <span className="text-sm text-muted uppercase tracking-[0.2em] block">
                Your bag is empty
              </span>
              <CurtainButton
                onClick={() => router.push("/shop")}
                className="inline-block px-10 py-4 text-ink border border-ink bg-transparent text-xs font-semibold tracking-widest uppercase"
              >
                Go to Shop
              </CurtainButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Shipping Form Column */}
              <div className="lg:col-span-7 bg-card-bg/35 border border-line/50 rounded-2xl p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="font-display font-semibold text-base uppercase text-ink">
                    Shipping Destination
                  </h3>
                  <p className="text-[11px] text-muted mt-1">Please enter your delivery details below.</p>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-semibold text-ink/75 block">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-semibold text-ink/75 block">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-semibold text-ink/75 block">Shipping Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Street address, Suite, Floor, etc."
                      className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-semibold text-ink/75 block">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-semibold text-ink/75 block">Postal / ZIP Code</label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  {formError && (
                    <p className="text-[11px] text-accent font-medium leading-relaxed">
                      {formError}
                    </p>
                  )}

                  <div className="pt-4 border-t border-line/45 flex flex-col sm:flex-row items-center gap-6 justify-between">
                    <Link
                      href="/cart"
                      className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted hover:text-ink transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Return to bag</span>
                    </Link>

                    <CurtainButton
                      type="submit"
                      disabled={isOrdering}
                      className="px-8 py-4 text-ink border border-ink bg-transparent text-[10px] font-semibold uppercase tracking-[0.2em] w-full sm:w-auto disabled:opacity-50"
                    >
                      {isOrdering ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Authorizing Payment...</span>
                        </>
                      ) : (
                        <span>Complete Purchase</span>
                      )}
                    </CurtainButton>
                  </div>
                </form>
              </div>

              {/* Order Summary Column */}
              <div className="lg:col-span-5 bg-card-bg/60 border border-line/60 rounded-2xl p-6 space-y-6">
                <h3 className="font-display font-semibold text-base uppercase text-ink border-b border-line/60 pb-3">
                  Your Order
                </h3>

                {/* Cart Items List */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-line/30 pb-4 last:border-b-0 last:pb-0 items-center justify-between">
                      <div className="flex gap-3 items-center min-w-0">
                        <div className="w-12 h-14 bg-card-bg border border-line/50 rounded-lg overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-display font-semibold text-xs uppercase text-ink truncate">{item.name}</h4>
                          <p className="text-[10px] text-muted mt-0.5">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-ink shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations summary */}
                <div className="space-y-4 text-xs font-medium uppercase tracking-wider text-ink/80 border-t border-line/60 pt-6">
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

                <div className="flex items-center gap-3 justify-center text-[10px] text-muted tracking-widest uppercase pt-2 border-t border-line/30">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure 256-Bit SSL Checkout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
