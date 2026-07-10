"use client";

import { useEffect, useState } from "react";
import { useCartStore, Currency } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";

export default function CurrencyModal() {
  const { isCurrencyModalOpen, setCurrencyModalOpen, currency, setCurrency } = useCartStore();
  const [detectedCurrency, setDetectedCurrency] = useState<Currency>("USD");
  const [detectedCountry, setDetectedCountry] = useState("United States");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Geolocation detection simulation based on navigator configurations
    const userLang = navigator.language.toLowerCase();
    let detectedCur: Currency = "INR";
    let detectedCountryName = "India";

    if (userLang.includes("kr") || userLang.includes("ko")) {
      detectedCur = "KRW";
      detectedCountryName = "South Korea";
    } else if (
      userLang.includes("us") ||
      userLang.includes("en-us")
    ) {
      detectedCur = "USD";
      detectedCountryName = "United States";
    } else if (
      userLang.includes("de") ||
      userLang.includes("fr") ||
      userLang.includes("it") ||
      userLang.includes("es") ||
      userLang.includes("nl") ||
      userLang.includes("be")
    ) {
      detectedCur = "EUR";
      detectedCountryName = "Europe";
    }

    setDetectedCurrency(detectedCur);
    setDetectedCountry(detectedCountryName);

    // Read localStorage cache
    const cachedCurrency = localStorage.getItem("bodybarrel-currency-cached");
    if (!cachedCurrency) {
      // First visit: trigger modal open
      setCurrencyModalOpen(true);
    } else {
      setCurrency(cachedCurrency as Currency);
    }
  }, [setCurrency, setCurrencyModalOpen]);

  const handleConfirm = () => {
    setCurrency(detectedCurrency);
    localStorage.setItem("bodybarrel-currency-cached", detectedCurrency);
    setCurrencyModalOpen(false);
  };

  const handleSelect = (selectedCur: Currency) => {
    setCurrency(selectedCur);
    localStorage.setItem("bodybarrel-currency-cached", selectedCur);
    setCurrencyModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isCurrencyModalOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={() => setCurrencyModalOpen(false)}
          />

          {/* Centered Modal Card */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-bg border border-line w-full max-w-sm p-8 shadow-2xl flex flex-col pointer-events-auto rounded-md"
            >
              <div className="flex items-center space-x-2 text-accent mb-6">
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Localization Settings
                </span>
              </div>

              <h3 className="font-display font-semibold text-lg uppercase tracking-wide text-ink mb-2">
                Shopping from {detectedCountry}?
              </h3>
              <p className="text-muted text-xs leading-relaxed mb-6 uppercase tracking-wider">
                We detected your location. Confirm your currency selection or choose a preferred region below.
              </p>

              {/* Confirm Detected Location */}
              <button
                onClick={handleConfirm}
                className="w-full bg-ink text-bg text-xs font-semibold py-3 px-4 tracking-widest uppercase hover:bg-accent hover:text-bg transition-colors duration-300 mb-6 flex items-center justify-center space-x-2 border border-line"
              >
                <span>Confirm ({detectedCurrency})</span>
              </button>

              <div className="relative flex py-3 items-center mb-6">
                <div className="flex-grow border-t border-line/30"></div>
                <span className="flex-shrink mx-4 text-[9px] text-muted tracking-widest uppercase font-bold">
                  Or Select Region
                </span>
                <div className="flex-grow border-t border-line/30"></div>
              </div>

              {/* Select Options */}
              <div className="flex flex-col space-y-2">
                {(["USD", "EUR", "KRW", "INR"] as Currency[]).map((cur) => {
                  const label =
                    cur === "USD"
                      ? "United States (USD)"
                      : cur === "EUR"
                      ? "Europe (EUR)"
                      : cur === "KRW"
                      ? "South Korea (KRW)"
                      : "India (INR)";
                  const isCurrent = currency === cur;

                  return (
                    <button
                      key={cur}
                      onClick={() => handleSelect(cur)}
                      className={`w-full text-left py-2 px-3 text-xs tracking-wider uppercase flex justify-between items-center transition-all ${
                        isCurrent
                          ? "font-bold text-accent bg-card-bg/60 border border-accent/20 rounded"
                          : "text-ink/70 hover:text-ink hover:bg-card-bg/30 rounded"
                      }`}
                    >
                      <span>{label}</span>
                      {isCurrent && <Check className="w-4 h-4 text-accent" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
