"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { getApiErrorMessage } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  priceUSD: number;
  image: string;
  hoverImage?: string;
  description?: string;
  inventory: number;
  categoryId?: string;
  category?: { name: string };
  Category?: { id: string; name: string; slug: string } | null;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  pricePaid: number;
}

export interface Order {
  id: string;
  userId: string;
  user: { email: string };
  status: string;
  totalUSD: number;
  shippingName: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState?: string;
  shippingZip: string;
  shippingCountry: string;
  createdAt: string;
  items: OrderItem[];
}

export interface AbandonedCartItem {
  id: string;
  name: string;
  subtitle: string;
  priceUSD: number;
  image: string;
  quantity: number;
}

export interface AbandonedCart {
  id: string;
  userEmail: string;
  updatedAt: string;
  items: AbandonedCartItem[];
  totalUSD: number;
}

interface AdminContextType {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  abandonedCarts: AbandonedCart[];
  setAbandonedCarts: React.Dispatch<React.SetStateAction<AbandonedCart[]>>;
  isLoading: boolean;
  isActionLoading: boolean;
  setIsActionLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  fetchDashboardData: () => Promise<void>;
  
  // order helpers
  handleUpdateOrderStatus: (orderId: string, status: string) => Promise<void>;
  handleUpdateOrderDetails: (orderId: string, details: {
    shippingName: string;
    shippingStreet: string;
    shippingCity: string;
    shippingZip: string;
    shippingCountry: string;
  }) => Promise<void>;
  handleDeleteOrder: (orderId: string) => Promise<void>;
  
  // product helpers
  handleCreateProduct: (productData: {
    name: string;
    subtitle: string;
    priceUSD: number;
    inventory: number;
    description: string;
    image: string;
    hoverImage: string;
    categorySlug: string;
  }) => Promise<void>;
  handleUpdateProduct: (productData: {
    id: string;
    name: string;
    subtitle: string;
    priceUSD: number;
    inventory: number;
    description: string;
    image: string;
    hoverImage: string;
    categorySlug: string;
  }) => Promise<void>;
  handleDeleteProduct: (id: string, name: string) => Promise<void>;
  
  // cart helpers
  handleSimulateRecoveryEmail: (cart: AbandonedCart) => void;
  
  // read/unread notification system
  readOrderIds: string[];
  unreadOrders: Order[];
  markAsRead: (orderId: string) => void;
  markAllAsRead: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user } = useUserStore();
  const [mounted, setMounted] = useState(false);

  // Core Data States
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>([]);

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Notifications states
  const [readOrderIds, setReadOrderIds] = useState<string[]>([]);

  const unreadOrders = orders.filter((order) => !readOrderIds.includes(order.id));

  const markAsRead = (orderId: string) => {
    const updated = [...readOrderIds, orderId];
    setReadOrderIds(updated);
    localStorage.setItem("bodybarrel-read-orders", JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const allIds = orders.map((o) => o.id);
    setReadOrderIds(allIds);
    localStorage.setItem("bodybarrel-read-orders", JSON.stringify(allIds));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    if (!user?.email || user.role !== "ADMIN") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const headers = { "x-admin-email": user.email };

      // 1. Fetch Orders
      const ordersRes = await fetch("/api/admin/orders", { headers });
      if (!ordersRes.ok) throw new Error("Failed to load orders");
      const ordersResJson = await ordersRes.json();
      setOrders(ordersResJson.data || []);

      // 2. Fetch Products
      const productsRes = await fetch("/api/admin/products", { headers });
      if (!productsRes.ok) throw new Error("Failed to load products");
      const productsResJson = await productsRes.json();
      const { products: productsData, categories: categoriesData } = productsResJson.data;
      setProducts(productsData || []);
      setCategories(categoriesData || []);

      // 3. Fetch Abandoned Carts
      const cartsRes = await fetch("/api/admin/abandoned-carts", { headers });
      if (!cartsRes.ok) throw new Error("Failed to load abandoned carts");
      const cartsResJson = await cartsRes.json();
      setAbandonedCarts(cartsResJson.data || []);

    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : "Failed to retrieve administration dashboard metrics.";
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = localStorage.getItem("bodybarrel-read-orders");
    if (stored) {
      try {
        setReadOrderIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse read orders", e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && isLoggedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isLoggedIn, user?.email]);

  // Order status update
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    if (!user?.email) return;
    setIsActionLoading(true);
    setToastMessage(null);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": user.email,
        },
        body: JSON.stringify({ orderId, status }),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "Failed to update order status."));

      showToast(`Order status updated to ${status} successfully.`);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Order shipping details update
  const handleUpdateOrderDetails = async (
    orderId: string,
    details: {
      shippingName: string;
      shippingStreet: string;
      shippingCity: string;
      shippingZip: string;
      shippingCountry: string;
    }
  ) => {
    if (!user?.email) return;
    setIsActionLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": user.email,
        },
        body: JSON.stringify({
          orderId,
          ...details,
        }),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "Failed to update order details."));

      showToast("Order shipping details updated successfully.");
      await fetchDashboardData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Order deletion
  const handleDeleteOrder = async (orderId: string) => {
    if (!user?.email) return;
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?id=${orderId}`, {
        method: "DELETE",
        headers: {
          "x-admin-email": user.email,
        },
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "Failed to delete order."));

      showToast(`Order #${orderId.slice(0, 8)} deleted successfully.`);
      await fetchDashboardData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Product creation
  const handleCreateProduct = async (productData: {
    name: string;
    subtitle: string;
    priceUSD: number;
    inventory: number;
    description: string;
    image: string;
    hoverImage: string;
    categorySlug: string;
  }) => {
    if (!user?.email) return;
    setIsActionLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": user.email,
        },
        body: JSON.stringify(productData),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "Failed to create product."));

      showToast(`Product "${productData.name}" added successfully.`);
      await fetchDashboardData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
      throw err;
    } finally {
      setIsActionLoading(false);
    }
  };

  // Product updating
  const handleUpdateProduct = async (productData: {
    id: string;
    name: string;
    subtitle: string;
    priceUSD: number;
    inventory: number;
    description: string;
    image: string;
    hoverImage: string;
    categorySlug: string;
  }) => {
    if (!user?.email) return;
    setIsActionLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": user.email,
        },
        body: JSON.stringify(productData),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "Failed to update product."));

      showToast(`Product "${productData.name}" updated successfully.`);
      await fetchDashboardData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
      throw err;
    } finally {
      setIsActionLoading(false);
    }
  };

  // Product deletion
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!user?.email) return;
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-email": user.email,
        },
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "Failed to delete product."));

      showToast(`Product "${name}" deleted successfully.`);
      await fetchDashboardData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Cart promotion dispatch email simulation
  const handleSimulateRecoveryEmail = (cart: AbandonedCart) => {
    showToast(`Simulated: Recovery email sent to ${cart.userEmail}!`);
  };

  return (
    <AdminContext.Provider
      value={{
        orders,
        setOrders,
        products,
        setProducts,
        categories,
        abandonedCarts,
        setAbandonedCarts,
        isLoading,
        isActionLoading,
        setIsActionLoading,
        error,
        toastMessage,
        showToast,
        fetchDashboardData,
        
        handleUpdateOrderStatus,
        handleUpdateOrderDetails,
        handleDeleteOrder,
        
        handleCreateProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        
        handleSimulateRecoveryEmail,
        
        readOrderIds,
        unreadOrders,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
}
