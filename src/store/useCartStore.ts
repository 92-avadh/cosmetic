import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number; // base price in USD
  quantity: number;
  image: string;
  subtitle?: string;
}

// Fixed INR currency for Indian brand
const CURRENCY_SYMBOL = "₹";
const CURRENCY_RATE = 83.5; // USD to INR

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  products: any[];
  hasFetchedCart: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  fetchProducts: () => Promise<void>;
  setCart: (cart: CartItem[]) => void;
  setHasFetchedCart: (hasFetchedCart: boolean) => void;
  updateProductInventory: (productId: string, newInventory: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      products: [],
      hasFetchedCart: false,
      
      setCartOpen: (open) => set({ isCartOpen: open }),
      
      addItem: (item) => set((state) => {
        const existingIndex = state.cart.findIndex((i) => i.id === item.id);
        if (existingIndex > -1) {
          const newCart = [...state.cart];
          newCart[existingIndex].quantity += 1;
          return { cart: newCart, isCartOpen: true };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }], isCartOpen: true };
      }),
      
      removeItem: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart
          .map(item => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
      })),
      
      clearCart: () => set({ cart: [], hasFetchedCart: false }),

      setCart: (cart) => set({ cart }),
      
      setHasFetchedCart: (hasFetchedCart) => set({ hasFetchedCart }),

      updateProductInventory: (productId, newInventory) => set((state) => ({
        products: state.products.map((p) => p.id === productId ? { ...p, inventory: newInventory } : p)
      })),
      
      getCartTotal: () => {
        const { cart } = get();
        const sumUSD = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return sumUSD * CURRENCY_RATE;
      },

      fetchProducts: async () => {
        try {
          const res = await fetch("/api/all-products");
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              set({ products: data });
            }
          }
        } catch (error) {
          console.error("Error fetching products in store:", error);
        }
      },
    }),
    {
      name: "bodybarrel-cart-storage",
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);

export { CURRENCY_SYMBOL, CURRENCY_RATE };
