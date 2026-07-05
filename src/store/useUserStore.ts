import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (email) => set({ user: { email }, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "bodybarrel-user-storage",
    }
  )
);
