"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { AdminProvider, useAdminContext } from "./context";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  Users,
  TrendingUp,
  ChevronRight,
  ExternalLink,
  Bell,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoggedIn, user } = useUserStore();
  const {
    orders,
    products,
    abandonedCarts,
    isLoading,
    toastMessage,
    unreadOrders,
    markAsRead,
    markAllAsRead,
  } = useAdminContext();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleDocumentClick = () => {
      setIsNotificationsOpen(false);
    };
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  if (!mounted) return null;

  const isAdmin = isLoggedIn && user?.role === "ADMIN";

  if (!isAdmin) {
    return (
      <main className="bg-bg text-ink min-h-screen font-sans flex flex-col justify-center items-center px-6">
        <div className="w-full max-w-md bg-card-bg/40 backdrop-blur-md border border-line/60 rounded-3xl p-8 md:p-10 text-center space-y-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent/30 via-accent to-accent/30" />
          <AlertCircle className="w-12 h-12 text-accent mx-auto" />
          <h2 className="font-display font-semibold text-2xl uppercase tracking-tight text-ink mt-2">
            Access Restricted
          </h2>
          <p className="text-xs text-muted leading-relaxed max-w-sm mx-auto">
            This terminal is reserved for administrative. Please sign in with an authorised account code.
          </p>
          <Link
            href="/login?redirect=/admin"
            className="w-full bg-ink text-bg text-[10px] font-semibold py-4.5 tracking-[0.2em] uppercase hover:bg-accent hover:text-bg transition-colors duration-300 flex items-center justify-center rounded-xl"
          >
            Sign In with Authorised Email
          </Link>
        </div>
      </main>
    );
  }

  // Nav links helper
  const getNavLinkClass = (targetPath: string) => {
    const isActive = pathname === targetPath;
    return `w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-bg text-accent border border-line shadow-sm"
        : "bg-transparent text-ink/75 border border-transparent hover:text-ink hover:bg-bg/40"
    }`;
  };

  return (
    <div className="bg-bg text-ink min-h-screen h-screen flex font-sans overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-bg border border-accent/30 rounded-xl px-5 py-3.5 shadow-2xl flex items-center gap-3 text-xs tracking-wider uppercase animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Nav */}
      <aside className="w-72 bg-card-bg/40 border-r border-line flex flex-col h-full shrink-0 justify-between p-6">
        <div className="space-y-8 flex flex-col h-full">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between py-2 border-b border-line pb-4 relative">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="BODYBARREL Logo" className="h-7 w-auto object-contain" />
              <span className="text-[9px] tracking-[0.25em] font-semibold text-accent uppercase">Admin Panel</span>
            </div>

            {/* Notifications Bell Button Trigger */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotificationsOpen(!isNotificationsOpen);
                }}
                className="relative p-1.5 text-ink hover:text-accent transition-colors cursor-pointer border border-line rounded-lg hover:bg-bg/60 flex items-center justify-center bg-transparent"
                aria-label="Toggle notifications"
              >
                <Bell className="w-3.5 h-3.5" />
                {unreadOrders.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-bg text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                    {unreadOrders.length}
                  </span>
                )}
              </button>

              {/* Absolute Dropdown */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 w-80 bg-bg border border-line rounded-xl shadow-2xl p-4 z-50 space-y-3 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between border-b border-line/60 pb-2">
                      <span className="text-[9px] tracking-[0.2em] font-semibold text-accent uppercase">
                        Notifications
                      </span>
                      {unreadOrders.length > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[8px] uppercase tracking-widest text-accent hover:text-ink font-semibold cursor-pointer border-none bg-transparent"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {unreadOrders.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                        {unreadOrders.map((order) => (
                          <div
                            key={order.id}
                            className="p-2.5 bg-card-bg/40 border border-line/55 rounded-xl space-y-1.5 flex flex-col justify-between text-left"
                          >
                            <div className="flex justify-between items-start gap-1">
                              <span className="text-[9px] font-mono text-ink/80 truncate font-bold">
                                #{order.id.slice(-6).toUpperCase()}
                              </span>
                              <span className="text-[8px] text-muted shrink-0">
                                {new Date(order.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-[8px] text-muted uppercase tracking-wider">
                              <span className="truncate max-w-[150px]">{order.shippingName}</span>
                              <span className="font-semibold text-ink">${order.totalUSD.toFixed(2)}</span>
                            </div>
                            <button
                              onClick={() => markAsRead(order.id)}
                              className="w-full mt-1 py-1 text-center bg-ink text-bg text-[7px] font-semibold tracking-widest uppercase hover:bg-accent hover:text-bg transition-colors duration-250 rounded-lg cursor-pointer border-none"
                            >
                              Mark as Read
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[9px] text-muted/75 italic py-4 text-center select-none">
                        No new order activities.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pb-4 border-b border-line text-left">
            <span className="text-[9px] tracking-[0.25em] font-semibold text-accent/80 uppercase block mb-1">
              Admin User
            </span>
            <h2 className="font-display font-semibold text-sm uppercase text-ink">Bodybarrel</h2>
            <span className="text-[10px] text-muted truncate block max-w-[200px]">{user?.email}</span>
          </div>

          <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto pr-1">
            <span className="text-[8px] tracking-[0.2em] font-bold text-muted/60 uppercase block px-4 py-2 text-left">General</span>
            
            <Link href="/admin/dashboard" className={getNavLinkClass("/admin/dashboard")}>
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted/60" />
            </Link>

            <Link href="/admin/orders" className={getNavLinkClass("/admin/orders")}>
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className="text-[9px] bg-accent/15 text-accent px-2 py-0.5 rounded-full font-bold">
                {orders.length}
              </span>
            </Link>

            <Link href="/admin/products" className={getNavLinkClass("/admin/products")}>
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <span>Products</span>
              </div>
              <span className="text-[9px] bg-accent/15 text-accent px-2 py-0.5 rounded-full font-bold">
                {products.length}
              </span>
            </Link>

            <Link href="/admin/carts" className={getNavLinkClass("/admin/carts")}>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Abandoned Carts</span>
              </div>
              <span className="text-[9px] bg-accent/15 text-accent px-2 py-0.5 rounded-full font-bold">
                {abandonedCarts.length}
              </span>
            </Link>

            <Link href="/admin/reports" className={getNavLinkClass("/admin/reports")}>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4" />
                <span>Reports</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted/60" />
            </Link>
          </nav>

          <div className="pt-4 border-t border-line flex flex-col gap-2">
            <Link
              href="/account"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-[10px] font-semibold tracking-widest uppercase border border-line hover:border-ink hover:text-ink transition-colors rounded-xl"
            >
              <span>My Portal</span>
            </Link>
            <Link
              href="/shop"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-[10px] font-semibold tracking-widest uppercase bg-ink text-bg hover:bg-accent hover:text-bg transition-colors rounded-xl"
            >
              <span>Go to Shop</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-bg/40 backdrop-blur-xs flex items-center justify-center z-40">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
