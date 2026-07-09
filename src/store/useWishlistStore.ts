"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  name: string;
  subtitle: string;
  priceUSD: number;
  image: string;
  hoverImage?: string;
}

interface WishlistState {
  items: WishlistItem[];
  isWishlistOpen: boolean;
  setWishlistOpen: (isOpen: boolean) => void;
  toggleItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clearAll: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isWishlistOpen: false,

      setWishlistOpen: (isOpen) => set({ isWishlistOpen: isOpen }),

      toggleItem: (item) => {
        const exists = get().items.find((w) => w.id === item.id);
        if (exists) {
          set({ items: get().items.filter((w) => w.id !== item.id) });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((w) => w.id !== id) });
      },

      isWishlisted: (id) => {
        return get().items.some((w) => w.id === id);
      },

      clearAll: () => set({ items: [], isWishlistOpen: false }),
    }),
    {
      name: "bodybarrel-wishlist-storage",
      // Exclude UI open state from persistence
      partialize: (state) => ({ items: state.items }),
    }
  )
);
