"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Menu, X, Globe, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ShoppingBagIcon from "./ShoppingBagIcon";
import WishlistDrawer from "./WishlistDrawer";

const announcements = [
  "FREE SHIPPING ON ALL ORDERS ACROSS INDIA — RESTORING RESILIENCE",
  "NEW CLIENT EXCLUSIVE: USE CODE 'RECOVER10' FOR 10% OFF YOUR BAG",
  "CELLULAR BODYCARE SCIENCE — 100% BIODEGRADABLE SURFACTANTS",
];

function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#2d1c14] text-[#F6F4EE] py-1.5 md:py-2 px-4 text-center border-b border-[#2d1c14]/20 select-none overflow-hidden relative min-h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="text-[9px] md:text-[9.5px] font-semibold uppercase tracking-[0.12em] md:tracking-[0.25em] block whitespace-normal md:whitespace-nowrap max-w-xs md:max-w-none mx-auto leading-normal"
        >
          {announcements[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cart, setCartOpen, setCurrencyModalOpen, currency } = useCartStore();
  const { items: wishlistItems, setWishlistOpen } = useWishlistStore();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemsCount = wishlistItems.length;

  const [shouldAnimateCart, setShouldAnimateCart] = useState(false);

  useEffect(() => {
    if (cartItemsCount > 0) {
      setShouldAnimateCart(true);
      const timer = setTimeout(() => setShouldAnimateCart(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartItemsCount]);

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
    { label: "Wishlist", href: "#", onClick: () => setWishlistOpen(true) },
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
        className="fixed top-0 left-0 w-full z-45 transition-all duration-500"
      >
        {/* Top Announcement Bar Carousel */}
        <AnnouncementBar />

        {/* Navbar Container */}
        <div
          className={`w-full transition-all duration-500 ${
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
          <div className="flex-1 flex justify-start md:justify-center">
            <Link
              href="/"
              className="hover:opacity-85 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="BODYBARREL Logo"
                className="h-10 md:h-14 w-auto object-contain"
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
            <div
              onClick={() => setWishlistOpen(true)}
              className="group relative overflow-hidden block py-1 cursor-pointer select-none"
            >
              <div className="relative block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
                  WISHLIST {wishlistItemsCount > 0 && `(${wishlistItemsCount})`}
                </span>
              </div>
              <div className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  WISHLIST {wishlistItemsCount > 0 && `(${wishlistItemsCount})`}
                </span>
              </div>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </div>
            <div
              onClick={() => setCartOpen(true)}
              className="group relative overflow-hidden block py-1 cursor-pointer select-none"
            >
              <motion.div
                animate={shouldAnimateCart ? { scale: [1, 1.12, 1], color: ["#121212", "#C97A5E", "#121212"] } : {}}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
                  SHOPPING BAG {cartItemsCount > 0 && `(${cartItemsCount})`}
                </span>
              </motion.div>
              <div className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  SHOPPING BAG {cartItemsCount > 0 && `(${cartItemsCount})`}
                </span>
              </div>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </div>
          </div>

          {/* Mobile Actions: Hamburger + Cart */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative p-2 text-ink hover:text-accent transition-colors cursor-pointer border-none bg-transparent"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-bg text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              )}
            </button>
            <motion.button
              onClick={() => setCartOpen(true)}
              animate={shouldAnimateCart ? { scale: [1, 1.25, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative p-2 text-ink hover:text-accent transition-colors cursor-pointer border-none bg-transparent"
              aria-label="Shopping Cart"
            >
              <ShoppingBagIcon className="w-5 h-5" animate={shouldAnimateCart} />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartItemsCount}
                  className="absolute top-0 right-0 bg-accent text-bg text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </motion.button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-ink hover:text-accent transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
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
                  className="h-9 w-auto object-contain"
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
                  {link.onClick ? (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        link.onClick();
                      }}
                      className="font-display font-semibold text-4xl uppercase tracking-wider text-ink hover:text-accent transition-colors block text-left bg-transparent border-none cursor-pointer p-0"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display font-semibold text-4xl uppercase tracking-wider text-ink hover:text-accent transition-colors block"
                    >
                      {link.label}
                    </Link>
                  )}
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
      <WishlistDrawer />
    </>
  );
}
