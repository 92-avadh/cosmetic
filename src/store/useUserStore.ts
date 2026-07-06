import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
  role?: string;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, role?: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (email, role) => set({ user: { email, role }, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "bodybarrel-user-storage",
    }
  )
);
