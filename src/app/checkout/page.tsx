"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import CurtainButton from "@/components/CurtainButton";
import { ArrowLeft, LogOut, CheckCircle, Loader2 } from "lucide-react";
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

  // Saved address states
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  const isAddressAlreadySaved = savedAddresses.some(
    (addr: any) =>
      addr.street?.toLowerCase().trim() === address.toLowerCase().trim() &&
      addr.postalCode?.toLowerCase().trim() === zipCode.toLowerCase().trim()
  );

  // Promo Code States
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);

  // Guard against hydration mismatches and check login status
  useEffect(() => {
    setMounted(true);

    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setOrderCompleted(true);
      clearCart();
      window.history.replaceState({}, "", "/checkout");
    } else if (params.get("cancel") === "true") {
      setFormError("Payment session was cancelled. You can try checkout again.");
      window.history.replaceState({}, "", "/checkout");
    }
  }, []);

  // Fetch saved addresses on mount
  useEffect(() => {
    if (mounted && isLoggedIn) {
      fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get" }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user && data.user.addresses) {
            setSavedAddresses(data.user.addresses);
          }
        })
        .catch((err) => console.error("Error loading saved addresses:", err));
    }
  }, [mounted, isLoggedIn]);

  // Zip/Postal Code Auto-complete City Fetcher
  useEffect(() => {
    const cleanZip = zipCode.trim();
    if (/^\d{6}$/.test(cleanZip)) {
      // Indian Pincode (6 digits)
      fetch(`https://api.postalpincode.in/pincode/${cleanZip}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice[0]) {
            const po = data[0].PostOffice[0];
            const detectedCity = po.District || po.Name || "";
            if (detectedCity) setCity(detectedCity);
          }
        })
        .catch((err) => console.error("Indian PIN code lookup failed:", err));
    } else if (/^\d{5}$/.test(cleanZip)) {
      // US Zipcode (5 digits)
      fetch(`https://api.zippopotam.us/us/${cleanZip}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.places && data.places[0]) {
            const place = data.places[0];
            const detectedCity = place["place name"] || "";
            if (detectedCity) setCity(detectedCity);
          }
        })
        .catch((err) => console.error("US ZIP code lookup failed:", err));
    }
  }, [zipCode]);

  // Load Razorpay SDK script dynamically on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
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
  const discountAmount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = discountedSubtotal > 150 * rate ? 0 : 15 * rate;
  const tax = discountedSubtotal * 0.088; // mock 8.8% tax
  const total = discountedSubtotal + shipping + tax;

  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * rate;
    return `${symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: currency === "KRW" ? 0 : 2,
      maximumFractionDigits: currency === "KRW" ? 0 : 2,
    })}`;
  };

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode) return;
    
    setPromoError("");
    setIsValidatingPromo(true);
    
    try {
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to validate code");
      }
      
      setAppliedPromo({
        code: data.code,
        discount: data.discount,
      });
      setPromoCode("");
    } catch (err: any) {
      setPromoError(err.message || "Invalid promo code.");
      setAppliedPromo(null);
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const handleSaveAddress = async () => {
    if (!firstName || !address || !city || !zipCode) {
      setFormError("Please fill out Name, Address, City, and Postal code before saving.");
      return;
    }

    if (isAddressAlreadySaved) {
      setFormError("This address is already saved in your profile.");
      return;
    }
    
    setFormError("");
    setIsSavingAddress(true);
    
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_address",
          addressDetails: {
            name: `${firstName} ${lastName}`.trim(),
            street: address,
            city,
            postalCode: zipCode,
            country: "IN",
          },
        }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to save address.");
      }
      
      setSavedAddresses(data.addresses || []);
    } catch (err: any) {
      setFormError(err.message || "Failed to save address. Please try again.");
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    setFormError("");
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_address",
          addressId,
        }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to delete address.");
      }
      
      setSavedAddresses(data.addresses || []);
    } catch (err: any) {
      setFormError(err.message || "Failed to delete address.");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !address || !city || !zipCode) {
      setFormError("All shipping fields are required.");
      return;
    }
    
    if (typeof (window as any).Razorpay === "undefined") {
      setFormError("Razorpay payment gateway script is still loading. Please wait a second and try again.");
      return;
    }

    setFormError("");
    setIsOrdering(true);
    
    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          promoCode: appliedPromo?.code || null,
          currency,
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
            country: "IN",
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to process order.");
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "BODYBARREL",
        description: "Premium Body Wash Order",
        order_id: data.razorpayOrderId,
        handler: async function (response: any) {
          try {
            setIsOrdering(true);
            setFormError("");
            
            const verifyRes = await fetch("/api/checkout/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.orderId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || "Payment verification failed.");
            }

            clearCart();
            setOrderCompleted(true);
          } catch (verifyErr: any) {
            setFormError(verifyErr.message || "Failed to verify transaction. Please contact support.");
          } finally {
            setIsOrdering(false);
          }
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email: user?.email || "",
        },
        theme: {
          color: "#121212",
        },
        modal: {
          ondismiss: function () {
            setIsOrdering(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
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
                  {savedAddresses.length > 0 && (
                    <div className="space-y-3 p-4 bg-bg/50 border border-line/40 rounded-2xl">
                      <label className="text-[9px] uppercase tracking-widest font-semibold text-ink/75 block">
                        Select a Saved Address ({savedAddresses.length}/3)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {savedAddresses.map((addr: any) => (
                          <div
                            key={addr.id}
                            className="p-3 border border-line/50 hover:border-accent rounded-xl cursor-pointer bg-bg/70 hover:bg-bg transition-colors flex flex-col justify-between"
                            onClick={() => {
                              const nameParts = addr.name.split(" ");
                              setFirstName(nameParts[0] || "");
                              setLastName(nameParts.slice(1).join(" ") || "");
                              setAddress(addr.street || "");
                              setCity(addr.city || "");
                              setZipCode(addr.postalCode || "");
                            }}
                          >
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold block uppercase tracking-wider text-ink truncate">
                                {addr.title}
                              </span>
                              <span className="text-[9px] text-muted block truncate font-medium">
                                {addr.name}
                              </span>
                              <span className="text-[9px] text-muted block truncate">
                                {addr.street}
                              </span>
                              <span className="text-[9px] text-muted block truncate">
                                {addr.city}, {addr.postalCode}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(addr.id);
                              }}
                              className="text-[9px] text-accent mt-3 uppercase font-bold tracking-wider hover:underline w-fit select-none"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-semibold text-ink/75 block">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z\s\-']/g, ""))}
                        required
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-semibold text-ink/75 block">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z\s\-']/g, ""))}
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
                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                        required
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  {savedAddresses.length < 3 && (
                    <button
                      type="button"
                      onClick={handleSaveAddress}
                      disabled={isSavingAddress || isAddressAlreadySaved}
                      className="px-4 py-2.5 border border-line rounded-xl text-[9px] font-bold tracking-widest uppercase text-ink hover:text-accent hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 w-max select-none"
                    >
                      {isSavingAddress ? "Saving Address..." : isAddressAlreadySaved ? "Address Already Saved" : "Save Address to Profile"}
                    </button>
                  )}

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
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
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

                {/* Promo Code Input Form */}
                <form onSubmit={handleApplyPromo} className="space-y-2.5 pt-4 border-t border-line/30">
                  <label className="text-[9px] uppercase tracking-widest font-semibold text-ink/75 block">Promo / Discount Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={isValidatingPromo}
                      className="flex-1 bg-bg border border-line rounded-xl px-4 py-2.5 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                    />
                    <button
                      type="submit"
                      disabled={isValidatingPromo || !promoCode}
                      className="px-5 py-2.5 border border-ink text-[10px] font-semibold uppercase tracking-wider hover:bg-accent hover:text-bg hover:border-accent transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isValidatingPromo ? "..." : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] text-accent font-medium mt-1">{promoError}</p>
                  )}
                  {appliedPromo && (
                    <div className="flex items-center justify-between text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg p-2.5 font-medium mt-1">
                      <span>Code "{appliedPromo.code}" applied ({appliedPromo.discount * 100}% off)</span>
                      <button
                        type="button"
                        onClick={() => setAppliedPromo(null)}
                        className="text-[10px] font-bold hover:text-emerald-800 ml-2 uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Calculations summary */}
                <div className="space-y-4 text-xs font-medium uppercase tracking-wider text-ink/80 border-t border-line/60 pt-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ink">{symbol}{subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-{symbol}{discountAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
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

              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
