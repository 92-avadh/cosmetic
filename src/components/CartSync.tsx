"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";

export default function CartSync() {
  const { cart, setCart, hasFetchedCart, setHasFetchedCart, clearCart } = useCartStore();
  const { user, isLoggedIn } = useUserStore();
  const isFetchingRef = useRef(false);

  // 1. Fetch & Merge Cart on Login
  useEffect(() => {
    if (!isLoggedIn || !user?.email) {
      setHasFetchedCart(false);
      clearCart();
      return;
    }

    const loadAndSyncCart = async () => {
      if (hasFetchedCart || isFetchingRef.current) return;
      isFetchingRef.current = true;

      try {
        const res = await fetch("/api/cart/sync");
        if (res.ok) {
          const dbItems = await res.json();
          if (Array.isArray(dbItems) && dbItems.length > 0) {
            // Merge logic: Merge local cart with database cart
            const mergedCart = [...cart];
            for (const dbItem of dbItems) {
              const existingIndex = mergedCart.findIndex((item) => item.id === dbItem.id);
              if (existingIndex > -1) {
                // If item exists in both, sum their quantities
                mergedCart[existingIndex].quantity = mergedCart[existingIndex].quantity + dbItem.quantity;
              } else {
                // Otherwise, add database item to local cart
                mergedCart.push(dbItem);
              }
            }
            setCart(mergedCart);
          }
        }
        setHasFetchedCart(true);
      } catch (err) {
        console.error("Failed to fetch cart from database:", err);
      } finally {
        isFetchingRef.current = false;
      }
    };

    loadAndSyncCart();
  }, [isLoggedIn, user?.email, hasFetchedCart, cart, setCart, setHasFetchedCart, clearCart]);

  // 2. Debounced save to Database on Local changes
  useEffect(() => {
    if (!isLoggedIn || !user?.email || !hasFetchedCart) return;

    const syncCart = async () => {
      try {
        await fetch("/api/cart/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart,
          }),
        });
      } catch (err) {
        console.error("Failed to sync cart to database:", err);
      }
    };

    // Debounce syncing by 600ms
    const timer = setTimeout(() => {
      syncCart();
    }, 600);

    return () => clearTimeout(timer);
  }, [cart, isLoggedIn, user?.email, hasFetchedCart]);

  return null;
}
