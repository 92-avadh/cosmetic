"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cart, setCartOpen, setCurrencyModalOpen, currency } = useCartStore();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Science", href: "/science" },
    { label: "Us", href: "/us" },
    { label: "Shop", href: "/shop" },
    { label: "Account", href: "/account" },
    { label: "Cart", href: "/cart" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 ${
          isScrolled
            ? "bg-bg/90 backdrop-blur-md border-b border-line py-4"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left Side Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-12 flex-1 justify-start">
            <Link
              href="/science"
              className="group relative overflow-hidden block py-1 cursor-pointer"
            >
              <span className="relative block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                SCIENCE
              </span>
              <span className="absolute top-full left-0 block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                SCIENCE
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </Link>
            <Link
              href="/us"
              className="group relative overflow-hidden block py-1 cursor-pointer"
            >
              <span className="relative block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                US
              </span>
              <span className="absolute top-full left-0 block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                US
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </Link>
            <Link
              href="/shop"
              className="group relative overflow-hidden block py-1 cursor-pointer"
            >
              <span className="relative block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                SHOP
              </span>
              <span className="absolute top-full left-0 block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                SHOP
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </Link>
          </nav>

          {/* Center Brand Logo */}
          <div className="flex-1 flex justify-center">
            <Link
              href="/"
              className="hover:opacity-85 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="BODYBARREL Logo"
                className="h-7 md:h-9 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right Side Action Links */}
          <div className="hidden md:flex items-center space-x-12 flex-1 justify-end">
            <Link
              href="/account"
              className="group relative overflow-hidden block py-1 cursor-pointer"
            >
              <span className="relative block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                ACCOUNT
              </span>
              <span className="absolute top-full left-0 block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                ACCOUNT
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </Link>
            <Link
              href="/cart"
              className="group relative overflow-hidden block py-1 cursor-pointer"
            >
              <div className="relative block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
                  SHOPPING CART {cartItemsCount > 0 && `(${cartItemsCount})`}
                </span>
              </div>
              <div className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  SHOPPING CART {cartItemsCount > 0 && `(${cartItemsCount})`}
                </span>
              </div>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </Link>
          </div>

          {/* Mobile Actions: Hamburger + Cart */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-ink hover:text-accent transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-bg text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-ink hover:text-accent transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-bg flex flex-col justify-between p-8 md:p-16 border-b border-line"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  alt="BODYBARREL Logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-ink hover:text-accent transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex flex-col space-y-8 my-auto">
              {navLinks.map((link) => (
                <motion.div key={link.label} variants={linkVariants}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display font-semibold text-4xl uppercase tracking-wider text-ink hover:text-accent transition-colors block"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Menu Footer */}
            <motion.div
              variants={linkVariants}
              className="border-t border-line/50 pt-8 flex items-center justify-between text-xs text-muted"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrencyModalOpen(true);
                }}
                className="flex items-center space-x-2 p-1"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase tracking-widest">Region / {currency}</span>
              </button>
              <p className="tracking-widest">© 2026 BODYBARREL</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
