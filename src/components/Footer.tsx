"use client";

import { useState } from "react";
import { useCartStore, Currency } from "@/store/useCartStore";
import CurtainButton from "./CurtainButton";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./animate-ui/components/radix/dropdown-menu";

export default function Footer() {
  const { currency, setCurrency } = useCartStore();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-bg text-ink pt-20 border-t border-line/30 flex flex-col">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start pb-4">
          
          {/* Gigantic Brand Logo on Left */}
          <div className="col-span-1 lg:col-span-7 flex items-center">
            <img
              src="/logo.png"
              alt="BODYBARREL Logo"
              className="max-h-24 md:max-h-36 w-auto object-contain"
            />
          </div>

          {/* Subscribe to Newsletters & Country/Region Selector on Right */}
          <div className="col-span-1 lg:col-span-5 flex flex-col space-y-6 lg:pl-8">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-ink font-bold font-sans">
                SUBSCRIBE TO OUR NEWSLETTERS
              </h4>
              
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row items-end sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                <div className="border-b border-ink/40 py-2 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-transparent border-none outline-none w-full text-xs tracking-wider placeholder:text-ink/45 text-ink uppercase"
                    required
                  />
                </div>
                <CurtainButton
                  type="submit"
                  className="border border-ink/80 py-2.5 px-8 text-xs uppercase tracking-widest font-semibold cursor-pointer shrink-0 w-full sm:w-auto font-sans"
                >
                  SUBMIT
                </CurtainButton>
              </form>
              
              {isSubscribed && (
                <p className="text-[10px] text-accent font-semibold tracking-widest mt-2 uppercase font-sans">
                  Thank you for subscribing!
                </p>
              )}
            </div>

            {/* Region / Shop Selector */}
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.2em] font-semibold text-ink font-sans pt-2">
              <span className="text-ink/65 uppercase">SHOP IN:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="border-0 border-b border-ink/45 rounded-none px-0 py-0.5 h-auto text-[11px] font-bold text-ink uppercase tracking-widest bg-transparent hover:bg-transparent shadow-none hover:text-accent select-none cursor-pointer">
                    {currency === "INR" ? "India (INR)" :
                     currency === "USD" ? "United States (USD)" :
                     currency === "EUR" ? "Europe (EUR)" :
                     "South Korea (KRW)"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem onClick={() => setCurrency("INR")}>India (INR)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrency("USD")}>United States (USD)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrency("EUR")}>Europe (EUR)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrency("KRW")}>South Korea (KRW)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Secondary Links Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-ink/10 pt-8 pb-12 mt-10 text-[11px] font-bold tracking-[0.2em] uppercase text-ink font-sans">
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <a href="#philosophy" className="hover:text-accent transition-colors">
              SCIENCE
            </a>
            <a href="#philosophy" className="hover:text-accent transition-colors">
              ABOUT US
            </a>
            <a href="#shop" className="hover:text-accent transition-colors">
              SHOP
            </a>
            <a href="#philosophy" className="hover:text-accent transition-colors">
              FAQ
            </a>
          </div>
          
          <div className="flex items-center space-x-2 mt-6 md:mt-0">
            <span className="text-ink/60 font-medium">FOLLOW US:</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-accent transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-accent transition-colors ml-4"
            >
              TIKTOK
            </a>
          </div>
        </div>
      </div>

      {/* Dark Copyright Bar at the Bottom */}
      <div className="bg-[#121212] text-bg/95 py-5 px-6 md:px-12 w-full text-[10px] tracking-[0.18em] uppercase border-t border-line/10 font-sans font-medium">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 w-full text-center lg:text-left">
          <div>
            © 2026. All right reserved BODYBARREL
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
            <a href="#" className="hover:text-accent transition-colors">
              Return Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Privacy policy
            </a>
          </div>

          <div>
            Created by: AD.
          </div>
        </div>
      </div>
    </footer>
  );
}
