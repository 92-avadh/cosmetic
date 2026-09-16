import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number; // duration in ms, default 4000ms
  createdAt: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id" | "createdAt">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: ({ type, title, message, duration = 4000 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: Toast = {
      id,
      type,
      title,
      message,
      duration,
      createdAt: Date.now(),
    };

    set((state) => ({
      // Keep up to 5 most recent toasts
      toasts: [...state.toasts.slice(-4), newToast],
    }));

    return id;
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));

// Ergonomic helper object callable anywhere (inside or outside React components)
export const toast = {
  success: (message: string, title?: string, duration?: number) =>
    useToastStore.getState().addToast({ type: "success", message, title: title || "Success", duration }),

  error: (message: string, title?: string, duration?: number) =>
    useToastStore.getState().addToast({ type: "error", message, title: title || "Error", duration }),

  warning: (message: string, title?: string, duration?: number) =>
    useToastStore.getState().addToast({ type: "warning", message, title: title || "Attention", duration }),

  info: (message: string, title?: string, duration?: number) =>
    useToastStore.getState().addToast({ type: "info", message, title: title || "Information", duration }),

  remove: (id: string) => useToastStore.getState().removeToast(id),
  clear: () => useToastStore.getState().clearToasts(),
};
