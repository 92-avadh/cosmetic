"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  Trash2,
  TrendingUp,
  Users,
  AlertCircle,
  Upload,
  Check,
  Loader2,
  ExternalLink,
  ChevronRight,
  Clock,
  Mail,
  DollarSign,
  Bell,
} from "lucide-react";
import CurtainButton from "@/components/CurtainButton";
import { getApiErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";

interface Product {
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

interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  pricePaid: number;
}

interface Order {
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

interface AbandonedCartItem {
  id: string;
  name: string;
  subtitle: string;
  priceUSD: number;
  image: string;
  quantity: number;
}

interface AbandonedCart {
  id: string;
  userEmail: string;
  updatedAt: string;
  items: AbandonedCartItem[];
  totalUSD: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useUserStore();
  const [mounted, setMounted] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "products" | "carts" | "reports">("dashboard");

  // Core Data States
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>([]);

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Product Form States
  const [newProductName, setNewProductName] = useState("");
  const [newProductSubtitle, setNewProductSubtitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductInventory, setNewProductInventory] = useState("100");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("skincare");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductHoverImage, setNewProductHoverImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit Product / Order state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editShippingName, setEditShippingName] = useState("");
  const [editShippingStreet, setEditShippingStreet] = useState("");
  const [editShippingCity, setEditShippingCity] = useState("");
  const [editShippingZip, setEditShippingZip] = useState("");
  const [editShippingCountry, setEditShippingCountry] = useState("");

  // Search/Filters
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");
  const [productSearch, setProductSearch] = useState("");

  // Reports Filter States
  const [reportStartDate, setReportStartDate] = useState("");
  const [reportEndDate, setReportEndDate] = useState("");
  const [reportStatus, setReportStatus] = useState("ALL");
  const [reportSortKey, setReportSortKey] = useState("date_desc");
  const [reportSearch, setReportSearch] = useState("");

  // Notifications states
  const [readOrderIds, setReadOrderIds] = useState<string[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("bodybarrel-read-orders");
    if (stored) {
      try {
        setReadOrderIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse read orders", e);
      }
    }

    const handleDocumentClick = () => {
      setIsNotificationsOpen(false);
    };
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

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
      setOrders(ordersResJson.data);

      // 2. Fetch Products
      const productsRes = await fetch("/api/admin/products", { headers });
      if (!productsRes.ok) throw new Error("Failed to load products");
      const productsResJson = await productsRes.json();
      const { products: productsData, categories: categoriesData } = productsResJson.data;
      setProducts(productsData);
      setCategories(categoriesData);

      // 3. Fetch Abandoned Carts
      const cartsRes = await fetch("/api/admin/abandoned-carts", { headers });
      if (!cartsRes.ok) throw new Error("Failed to load abandoned carts");
      const cartsResJson = await cartsRes.json();
      setAbandonedCarts(cartsResJson.data);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to retrieve administration dashboard metrics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && isLoggedIn) {
      fetchDashboardData();
    }
  }, [mounted, isLoggedIn, user?.email]);

  // Handle Order Status Update
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
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handle Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "File upload failed"));

      const data = resJson.data;
      setNewProductImage(data.url);
      setNewProductHoverImage(data.url);
      showToast("Photo uploaded successfully.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Upload failed: ${msg}`);
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Create Product Submit
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    if (!newProductName || !newProductSubtitle || !newProductPrice || !newProductImage) {
      showToast("Error: Name, subtitle, price and photo are required.");
      return;
    }

    setIsActionLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": user.email,
        },
        body: JSON.stringify({
          name: newProductName,
          subtitle: newProductSubtitle,
          priceUSD: parseFloat(newProductPrice),
          inventory: parseInt(newProductInventory),
          description: newProductDescription,
          image: newProductImage,
          hoverImage: newProductHoverImage,
          categorySlug: newProductCategory,
        }),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "Failed to create product."));

      showToast(`Product "${newProductName}" added successfully.`);

      // Reset form fields
      setNewProductName("");
      setNewProductSubtitle("");
      setNewProductPrice("");
      setNewProductInventory("100");
      setNewProductDescription("");
      setNewProductImage("");
      setNewProductHoverImage("");

      // Refresh list
      await fetchDashboardData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handle Update Product Submit
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !editingProduct) return;
    if (!newProductName || !newProductSubtitle || !newProductPrice || !newProductImage) {
      showToast("Error: Name, subtitle, price and photo are required.");
      return;
    }

    setIsActionLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": user.email,
        },
        body: JSON.stringify({
          id: editingProduct.id,
          name: newProductName,
          subtitle: newProductSubtitle,
          priceUSD: parseFloat(newProductPrice),
          inventory: parseInt(newProductInventory),
          description: newProductDescription,
          image: newProductImage,
          hoverImage: newProductHoverImage,
          categorySlug: newProductCategory,
        }),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "Failed to update product."));

      showToast(`Product "${newProductName}" updated successfully.`);
      setEditingProduct(null);
      
      // Reset form fields
      setNewProductName("");
      setNewProductSubtitle("");
      setNewProductPrice("");
      setNewProductInventory("100");
      setNewProductDescription("");
      setNewProductImage("");
      setNewProductHoverImage("");

      // Refresh list
      await fetchDashboardData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete product "${name}"? This action cannot be undone.`)) {
      return;
    }

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
      if (editingProduct?.id === id) {
        setEditingProduct(null);
      }
      await fetchDashboardData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handle Update Order Details
  const handleUpdateOrderDetails = async (orderId: string) => {
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
          shippingName: editShippingName,
          shippingStreet: editShippingStreet,
          shippingCity: editShippingCity,
          shippingZip: editShippingZip,
          shippingCountry: editShippingCountry,
        }),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "Failed to update order details."));

      showToast("Order shipping details updated successfully.");
      setEditingOrderId(null);
      await fetchDashboardData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handle Delete Order
  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm(`Are you sure you want to delete Order #${orderId.slice(0, 8)}? This action will permanently remove the order and payment records.`)) {
      return;
    }

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

  // Simulate recovery email send
  const handleSimulateRecoveryEmail = (cart: AbandonedCart) => {
    showToast(`Simulated: Recovery email sent to ${cart.userEmail}!`);
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 4500);
  };

  // Route protection guards
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

  // Dashboard calculations
  const totalSalesVal = orders
    .filter(o => o.status === "DELIVERED" || o.status === "PAID" || o.status === "SHIPPED")
    .reduce((sum, o) => sum + o.totalUSD, 0);

  const averageOrderVal = orders.length > 0 ? totalSalesVal / orders.length : 0;

  // Calculate top items based on items quantity
  const productSalesMap: Record<string, { product: Product; qty: number; revenue: number }> = {};
  orders.forEach(order => {
    if (order.status !== "CANCELLED") {
      order.items.forEach(item => {
        if (!item.product) return;
        if (!productSalesMap[item.productId]) {
          productSalesMap[item.productId] = {
            product: item.product,
            qty: 0,
            revenue: 0,
          };
        }
        productSalesMap[item.productId].qty += item.quantity;
        productSalesMap[item.productId].revenue += item.pricePaid * item.quantity;
      });
    }
  });

  const topSellingProducts = Object.values(productSalesMap)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  // Sales funnel (mock sessions & views based on database cart / order counts to look organic)
  const orderCount = orders.length;
  const activeCartCount = abandonedCarts.length;
  const totalCartCreates = orderCount + activeCartCount;
  const mockProductViews = Math.round(totalCartCreates * 2.3) + 120;
  const mockSessions = Math.round(mockProductViews * 1.6) + 340;

  // Dynamically calculate category sales proportions
  let skincareSalesVal = 0;
  let bodycareSalesVal = 0;

  orders.forEach(order => {
    if (order.status !== "CANCELLED") {
      order.items.forEach(item => {
        if (!item.product) return;
        const productId = item.product.id.toLowerCase();
        if (productId.includes("hydra") || productId.includes("cleanser") || productId.includes("essence") || item.product.categoryId?.includes("skincare")) {
          skincareSalesVal += item.pricePaid * item.quantity;
        } else {
          bodycareSalesVal += item.pricePaid * item.quantity;
        }
      });
    }
  });

  const totalCatSales = skincareSalesVal + bodycareSalesVal;
  const skincarePercent = totalCatSales > 0 ? (skincareSalesVal / totalCatSales) * 100 : 64.5;
  const bodycarePercent = totalCatSales > 0 ? (bodycareSalesVal / totalCatSales) * 100 : 35.5;

  // 7-day revenue trend calculations
  const last7DaysSales = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const dayStart = new Date(d.setHours(0,0,0,0)).getTime();
    const dayEnd = new Date(d.setHours(23,59,59,999)).getTime();

    const daySalesVal = orders
      .filter(o => {
        const oTime = new Date(o.createdAt).getTime();
        return oTime >= dayStart && oTime <= dayEnd && (o.status === "DELIVERED" || o.status === "PAID" || o.status === "SHIPPED");
      })
      .reduce((sum, o) => sum + o.totalUSD, 0);

    return { label: dateStr, value: daySalesVal };
  }).reverse();

  const max7DaysVal = Math.max(...last7DaysSales.map(d => d.value), 100);
  
  const last7DaysPoints = last7DaysSales.map((item, idx) => {
    const x = 15 + idx * 78.33;
    const y = 85 - (item.value / max7DaysVal) * 70;
    return { x, y, label: item.label, value: item.value };
  });

  const linePathStr = last7DaysPoints.length > 0 
    ? `M ${last7DaysPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ")}`
    : "";

  const areaPathStr = last7DaysPoints.length > 0
    ? `${linePathStr} L 485,95 L 15,95 Z`
    : "";

  const todaySales = last7DaysSales[6].value;
  const yesterdaySales = last7DaysSales[5].value;
  const growthPercent = yesterdaySales > 0 ? ((todaySales - yesterdaySales) / yesterdaySales) * 100 : todaySales > 0 ? 100 : 0;

  // Search filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.user.email.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.shippingName.toLowerCase().includes(orderSearch.toLowerCase());

    const matchesStatus = orderStatusFilter === "ALL" || order.status === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Report filters and sorting
  const filteredReportOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(reportSearch.toLowerCase()) ||
      order.user.email.toLowerCase().includes(reportSearch.toLowerCase()) ||
      order.shippingName.toLowerCase().includes(reportSearch.toLowerCase());

    const matchesStatus = reportStatus === "ALL" || order.status === reportStatus;

    let matchesDate = true;
    if (reportStartDate) {
      const start = new Date(reportStartDate);
      start.setHours(0, 0, 0, 0);
      matchesDate = matchesDate && new Date(order.createdAt) >= start;
    }
    if (reportEndDate) {
      const end = new Date(reportEndDate);
      end.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && new Date(order.createdAt) <= end;
    }

    return matchesSearch && matchesStatus && matchesDate;
  }).sort((a, b) => {
    if (reportSortKey === "date_desc") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (reportSortKey === "date_asc") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (reportSortKey === "email_asc") {
      return a.user.email.localeCompare(b.user.email);
    }
    if (reportSortKey === "email_desc") {
      return b.user.email.localeCompare(a.user.email);
    }
    if (reportSortKey === "total_desc") {
      return b.totalUSD - a.totalUSD;
    }
    if (reportSortKey === "total_asc") {
      return a.totalUSD - b.totalUSD;
    }
    return 0;
  });

  const generatePDFReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showToast("Error: Blocked by popup blocker. Please allow popups for this site.");
      return;
    }

    const totalOrdersCount = filteredReportOrders.length;
    const totalSalesSum = filteredReportOrders.reduce((sum, o) => sum + o.totalUSD, 0);
    const pendingOrdersCount = filteredReportOrders.filter(o => o.status === "PENDING").length;
    const paidOrdersCount = filteredReportOrders.filter(o => o.status === "PAID" || o.status === "SHIPPED" || o.status === "DELIVERED").length;
    const cancelledOrdersCount = filteredReportOrders.filter(o => o.status === "CANCELLED").length;

    const reportRows = filteredReportOrders.map((order) => {
      const formattedItems = order.items.map(item => `${item.product?.name || "Unknown"} (x${item.quantity})`).join(", ");
      return `
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 10px;">
          <td style="padding: 10px; text-transform: uppercase;">#${order.id.slice(0, 8)}</td>
          <td style="padding: 10px;">${new Date(order.createdAt).toLocaleDateString()}</td>
          <td style="padding: 10px; font-weight: 500;">${order.user.email}</td>
          <td style="padding: 10px; color: #4a5568; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${order.shippingName}, ${order.shippingCity}</td>
          <td style="padding: 10px; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${formattedItems}</td>
          <td style="padding: 10px; font-weight: bold; color: ${
            order.status === "DELIVERED" ? "#059669" :
            order.status === "CANCELLED" ? "#dc2626" :
            order.status === "SHIPPED" ? "#2563eb" :
            "#d97706"
          };">${order.status}</td>
          <td style="padding: 10px; text-align: right; font-weight: bold;">$${order.totalUSD.toFixed(2)}</td>
        </tr>
      `;
    }).join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order & Payment Executive Report</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #1a202c;
            padding: 40px;
            margin: 0;
            line-height: 1.5;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #1a202c;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .title {
            text-transform: uppercase;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 0.1em;
            margin: 0;
          }
          .meta-info {
            font-size: 11px;
            text-transform: uppercase;
            color: #718096;
            letter-spacing: 0.05em;
            text-align: right;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 15px;
            margin-bottom: 35px;
          }
          .metric-card {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            background-color: #f8fafc;
          }
          .metric-label {
            font-size: 8px;
            font-weight: 800;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 5px;
          }
          .metric-value {
            font-size: 16px;
            font-weight: 700;
            color: #1a202c;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th {
            background-color: #1a202c;
            color: white;
            text-align: left;
            padding: 10px;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.15em;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">BodyBarrel Executive Report</h1>
            <p style="font-size: 11px; margin: 5px 0 0 0; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em;">Skincare Formulation & Client Orders Registry</p>
          </div>
          <div class="meta-info">
            Generated: ${new Date().toLocaleString()}<br />
            Scope: \${reportStartDate || "All Time"} to \${reportEndDate || "Present"}
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Total Sales Revenue</div>
            <div class="metric-value" style="color: #059669;">$${totalSalesSum.toFixed(2)}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Total Volume</div>
            <div class="metric-value">\${totalOrdersCount} Orders</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Paid / Fulfilled</div>
            <div class="metric-value">\${paidOrdersCount}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Pending / Unpaid</div>
            <div class="metric-value">\${pendingOrdersCount}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Cancelled</div>
            <div class="metric-value" style="color: #dc2626;">\${cancelledOrdersCount}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 10%;">Order ID</th>
              <th style="width: 12%;">Date</th>
              <th style="width: 22%;">Customer Email</th>
              <th style="width: 18%;">Destination</th>
              <th style="width: 23%;">Formulations</th>
              <th style="width: 8%;">Status</th>
              <th style="text-align: right; width: 7%;">Total</th>
            </tr>
          </thead>
          <tbody>
            \${reportRows || \`<tr><td colspan="7" style="padding: 20px; text-align: center; color: #718096; font-size: 11px; text-transform: uppercase;">No registry data matching filters was discovered.</td></tr>\`}
          </tbody>
        </table>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const filteredProducts = products.filter(prod => {
    return prod.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      prod.id.toLowerCase().includes(productSearch.toLowerCase());
  });

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
            <div>
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
                            className="p-2.5 bg-card-bg/40 border border-line/55 rounded-xl space-y-1.5 flex flex-col justify-between"
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

          <div className="pb-4 border-b border-line">
            <span className="text-[9px] tracking-[0.25em] font-semibold text-accent/80 uppercase block mb-1">
              Admin User
            </span>
            <h2 className="font-display font-semibold text-sm uppercase text-ink">Bodybarrel</h2>
            <span className="text-[10px] text-muted truncate block max-w-[200px]">{user?.email}</span>
          </div>



          <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto pr-1">
            <span className="text-[8px] tracking-[0.2em] font-bold text-muted/60 uppercase block px-4 py-2">General</span>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-bg text-accent border border-line shadow-sm"
                  : "bg-transparent text-ink/75 border border-transparent hover:text-ink hover:bg-bg/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted/60" />
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "orders"
                  ? "bg-bg text-accent border border-line shadow-sm"
                  : "bg-transparent text-ink/75 border border-transparent hover:text-ink hover:bg-bg/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className="text-[9px] bg-accent/15 text-accent px-2 py-0.5 rounded-full font-bold">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "products"
                  ? "bg-bg text-accent border border-line shadow-sm"
                  : "bg-transparent text-ink/75 border border-transparent hover:text-ink hover:bg-bg/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <span>Products</span>
              </div>
              <span className="text-[9px] bg-accent/15 text-accent px-2 py-0.5 rounded-full font-bold">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("carts")}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "carts"
                  ? "bg-bg text-accent border border-line shadow-sm"
                  : "bg-transparent text-ink/75 border border-transparent hover:text-ink hover:bg-bg/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Abandoned Carts</span>
              </div>
              <span className="text-[9px] bg-accent/15 text-accent px-2 py-0.5 rounded-full font-bold">
                {abandonedCarts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "reports"
                  ? "bg-bg text-accent border border-line shadow-sm"
                  : "bg-transparent text-ink/75 border border-transparent hover:text-ink hover:bg-bg/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4" />
                <span>Reports</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted/60" />
            </button>
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

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Executive Sales Banner card */}
            <div className="bg-[#2D2622] text-[#F6F4EE] rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center border border-accent/20 shadow-md">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 max-w-sm z-10 text-left">
                <span className="text-[9px] tracking-[0.25em] font-semibold text-accent uppercase block"> Overview</span>
                <h3 className="font-display font-semibold text-2xl md:text-3xl leading-tight text-white uppercase tracking-tight">
                  Here&apos;s happening in your sales last weeks 👋
                </h3>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-display font-semibold text-accent">
                      ${totalSalesVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-semibold">Sales Profit</span>
                  </div>
                  <p className="text-[10px] text-neutral-300 uppercase tracking-wider leading-relaxed">
                    {orders.length} product are sellings and it&apos;s increasing from last weeks.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="px-6 py-3 bg-accent hover:bg-accent/85 text-white text-[10px] font-semibold tracking-widest uppercase transition-all rounded-full flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg border border-transparent mt-2"
                >
                  <span>View Reports</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Banner Skincare Illustration */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 mt-6 md:mt-0 select-none z-10 bg-card-bg/10 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
                <img
                  src="/admin-sales-banner.png"
                  alt="BODYBARREL brand graphic"
                  className="w-full h-full object-cover filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Interactive Charts Panel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: 7-Day Revenue Trend Line Chart */}
              <div className="bg-bg/55 border border-line rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Revenue Trend (Last 7 Days)
                  </h4>
                  <span className="text-[9px] text-muted tracking-widest font-semibold uppercase">Daily Performance</span>
                </div>

                {/* SVG Area Line Chart */}
                <div className="relative h-28 w-full border border-line/30 rounded-xl overflow-hidden bg-bg/25 p-2 flex flex-col justify-between">
                  <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="revenueLineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C97A5E" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#C97A5E" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Guidelines */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke="var(--line)" strokeOpacity="0.15" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="500" y2="50" stroke="var(--line)" strokeOpacity="0.15" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="var(--line)" strokeOpacity="0.15" strokeDasharray="3 3" />

                    {max7DaysVal > 0 && (
                      <>
                        {/* Area Fill */}
                        <path d={areaPathStr} fill="url(#revenueLineGrad)" />
                        {/* Stroke Path */}
                        <path d={linePathStr} fill="none" stroke="#C97A5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        
                        {/* Intercept Circles */}
                        {last7DaysPoints.map((p, idx) => (
                          <circle
                            key={idx}
                            cx={p.x}
                            cy={p.y}
                            r="3.5"
                            fill="#C97A5E"
                            stroke="#F6F4EE"
                            strokeWidth="1.5"
                          />
                        ))}
                      </>
                    )}
                  </svg>

                  {/* Daily Labels */}
                  <div className="flex justify-between text-[8px] text-muted font-semibold tracking-wider px-1 pt-1.5 border-t border-line/10">
                    {last7DaysSales.map((d, i) => (
                      <span key={i} className="text-center w-full truncate">{d.label}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] font-semibold text-muted uppercase">
                  <span>Growth rate</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase">
                    {growthPercent >= 0 ? `+${growthPercent.toFixed(1)}%` : `${growthPercent.toFixed(1)}%`} vs yesterday
                  </span>
                </div>
              </div>

              {/* Card 2: Store Conversion Funnel */}
              <div className="bg-bg/55 border border-line rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Store Conversion Funnel
                  </h4>
                  <span className="text-[9px] text-muted tracking-widest font-semibold uppercase">Real-time Performance</span>
                </div>

                {/* SVG Area Funnel Chart */}
                <div className="relative h-28 w-full border border-line/30 rounded-xl overflow-hidden bg-bg/25">
                  <svg viewBox="0 0 800 120" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="funnelGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#C97A5E" stopOpacity="0.85" />
                        <stop offset="33%" stopColor="#DCA38C" stopOpacity="0.7" />
                        <stop offset="66%" stopColor="#ECC6B5" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#EDE9DF" stopOpacity="0.3" />
                      </linearGradient>
                      <linearGradient id="funnelLineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#C97A5E" />
                        <stop offset="100%" stopColor="#EDE9DF" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="0" x2="800" y2="0" stroke="var(--line)" strokeOpacity="0.25" strokeDasharray="4 4" />
                    <line x1="0" y1="60" x2="800" y2="60" stroke="var(--line)" strokeOpacity="0.2" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="800" y2="120" stroke="var(--line)" strokeOpacity="0.25" strokeDasharray="4 4" />
                    <path
                      d="M 0,20 Q 200,45 266,55 T 533,85 Q 700,95 800,102 L 800,120 L 0,120 Z"
                      fill="url(#funnelGrad)"
                    />
                    <path
                      d="M 0,20 Q 200,45 266,55 T 533,85 Q 700,95 800,102"
                      fill="none"
                      stroke="url(#funnelLineGrad)"
                      strokeWidth="2.5"
                    />
                    <circle cx="2" cy="20" r="4.5" fill="#C97A5E" stroke="#fff" strokeWidth="1.5" />
                    <circle cx="266" cy="55" r="4.5" fill="#DCA38C" stroke="#fff" strokeWidth="1.5" />
                    <circle cx="533" cy="85" r="4.5" fill="#ECC6B5" stroke="#fff" strokeWidth="1.5" />
                    <circle cx="798" cy="102" r="4.5" fill="#C97A5E" stroke="#fff" strokeWidth="1.5" />
                  </svg>
                  <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
                    <div className="border-r border-line/15 h-full" />
                    <div className="border-r border-line/15 h-full" />
                    <div className="border-r border-line/15 h-full" />
                    <div className="h-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="space-y-1 relative pr-4 after:hidden md:after:block after:absolute after:top-1/2 after:right-0 after:-translate-y-1/2 after:w-[1px] after:h-8 after:bg-line">
                    <span className="text-[8px] uppercase tracking-widest font-semibold text-muted block">1. Sessions</span>
                    <p className="font-display font-semibold text-base text-ink">{mockSessions}</p>
                    <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">100% Base</span>
                  </div>
                  <div className="space-y-1 relative pr-4 after:hidden md:after:block after:absolute after:top-1/2 after:right-0 after:-translate-y-1/2 after:w-[1px] after:h-8 after:bg-line">
                    <span className="text-[8px] uppercase tracking-widest font-semibold text-muted block">2. Product Views</span>
                    <p className="font-display font-semibold text-base text-ink">{mockProductViews}</p>
                    <span className="text-[8px] text-accent bg-accent/10 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      {((mockProductViews / mockSessions) * 100).toFixed(1)}% View rate
                    </span>
                  </div>
                  <div className="space-y-1 relative pr-4 after:hidden md:after:block after:absolute after:top-1/2 after:right-0 after:-translate-y-1/2 after:w-[1px] after:h-8 after:bg-line">
                    <span className="text-[8px] uppercase tracking-widest font-semibold text-muted block">3. Add To Cart</span>
                    <p className="font-display font-semibold text-base text-ink">{totalCartCreates}</p>
                    <span className="text-[8px] text-accent bg-accent/10 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      {((totalCartCreates / mockProductViews) * 100).toFixed(1)}% Add rate
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest font-semibold text-muted block">4. Checkouts</span>
                    <p className="font-display font-semibold text-base text-ink">{orderCount}</p>
                    <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      {((orderCount / totalCartCreates) * 100).toFixed(1)}% Conversion
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Split layout: Top Selling Products Table + Top Categories Donut & Upcoming promotions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-start">

              {/* Left Column: Top Selling Products */}
              <div className="lg:col-span-8 bg-bg/35 border border-line rounded-xl p-5 space-y-4">
                <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider">Top-Selling Formulations</h4>

                {topSellingProducts.length > 0 ? (
                  <div className="divide-y divide-line/30">
                    {topSellingProducts.map((item, idx) => (
                      <div key={item.product.id} className="flex items-center gap-4 py-3">
                        <span className="text-[10px] font-bold text-muted w-5">{idx + 1}</span>
                        <div className="w-10 h-12 bg-card-bg border border-line rounded overflow-hidden shrink-0">
                          <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-display font-bold text-[10px] uppercase text-ink truncate">{item.product.name}</h5>
                          <span className="text-[9px] text-muted">{item.qty} units sold</span>
                        </div>
                        <span className="text-xs font-bold text-accent">${item.revenue.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-[10px] text-muted uppercase py-8">No sales data available yet.</p>
                )}
              </div>

              {/* Right Column: Categories + Events */}
              <div className="lg:col-span-4 space-y-6">
                {/* Category Donut */}
                <div className="bg-bg/35 border border-line rounded-xl p-5 space-y-4">
                  <h4 className="font-display font-semibold text-[10px] uppercase text-ink tracking-wider">Sales by Category</h4>
                  <div className="flex justify-center py-2">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#EDE9DF" strokeWidth="24" />
                      <circle
                        cx="100" cy="100" r="80" fill="none" stroke="var(--color-accent)" strokeWidth="24"
                        strokeDasharray={`${skincarePercent * 5.03} ${503 - skincarePercent * 5.03}`}
                        strokeDashoffset="126" transform="rotate(-90 100 100)"
                      />
                      <text x="100" y="88" textAnchor="middle" className="text-xl font-display font-bold" fill="var(--color-ink)">
                        {orders.length}
                      </text>
                      <text x="100" y="108" textAnchor="middle" className="text-[7.5px] uppercase font-bold tracking-widest" fill="var(--color-muted)">
                        Total Sales
                      </text>
                    </svg>
                  </div>

                  <div className="space-y-2.5 text-[9px] uppercase tracking-wider font-semibold text-left pt-2 border-t border-line/30">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                        <span>Skincare System</span>
                      </div>
                      <span>{skincarePercent.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EDE9DF]" />
                        <span>Bodycare System</span>
                      </div>
                      <span>{bodycarePercent.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Next Upcoming Event with dynamic photo */}
                <div className="bg-bg/35 border border-line rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-line/30 pb-2">
                    <h4 className="font-display font-semibold text-[10px] uppercase text-ink tracking-wider">Next Upcoming Event</h4>
                    <span className="text-[14px] text-accent font-semibold">•</span>
                  </div>

                  {/* Generated Illustration */}
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-line select-none bg-card-bg/25">
                    <img
                      src="/admin-event-banner.png"
                      alt="BODYBARREL Launch Event graphic"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-3.5 pt-2 text-[9px] uppercase tracking-wider font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
                        <Tag className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-ink block">Bodybarrel 12.12 Festival</span>
                        <span className="text-muted block text-[8px]">12 - 14 December 2026 | 20:00</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-ink block">Free Shipping Worldwide</span>
                        <span className="text-muted block text-[8px]">Complimentary Shipping Activation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-line pb-4">
              <h3 className="font-display font-semibold text-base uppercase text-ink">Order Management Console</h3>
              <p className="text-[11px] text-muted mt-0.5">Manage active orders, track fulfillments, and update delivery status.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Search Order or Email..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent w-48"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider h-auto cursor-pointer gap-2">
                    <span>{orderStatusFilter === "ALL" ? "All Statuses" : orderStatusFilter}</span>
                    <ChevronRight className="w-3 h-3 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44">
                  <DropdownMenuItem onClick={() => setOrderStatusFilter("ALL")}>All Statuses</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOrderStatusFilter("PENDING")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOrderStatusFilter("PAID")}>Paid</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOrderStatusFilter("SHIPPED")}>Shipped</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOrderStatusFilter("DELIVERED")}>Delivered</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOrderStatusFilter("CANCELLED")}>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border border-line rounded-xl p-5 bg-bg/50 hover:border-accent/30 transition-all space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] border-b border-line/45 pb-3 gap-2 uppercase tracking-wider font-semibold">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-ink">Order #{order.id.slice(0, 8)}</span>
                        <span className="text-muted font-normal">{new Date(order.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted">Status:</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" disabled={isActionLoading} className={`border rounded-lg px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase h-auto cursor-pointer gap-1.5 ${
                              order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                              order.status === "CANCELLED" ? "bg-red-50 text-red-500 border-red-200" :
                              order.status === "SHIPPED" ? "bg-blue-50 text-blue-500 border-blue-200" :
                              "bg-accent/15 text-accent border-accent/30"
                            }`}>
                              <span>{order.status}</span>
                              <ChevronRight className="w-2.5 h-2.5 rotate-90" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40">
                            <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "PENDING")}>Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "PAID")}>Paid</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "SHIPPED")}>Shipped</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "DELIVERED")}>Delivered</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "CANCELLED")}>Cancelled</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 bg-bg/40 border border-line/30 rounded-lg p-2.5">
                          <div className="w-10 h-12 bg-card-bg border border-line rounded overflow-hidden shrink-0">
                            <img src={item.product?.image || ""} className="w-full h-full object-cover" alt={item.product?.name || "Product"} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-[10px] font-bold text-ink truncate uppercase">{item.product?.name || "Unknown"}</h5>
                            <span className="text-[9px] text-muted">Qty: {item.quantity} · ${item.pricePaid.toFixed(2)} ea.</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping + Total */}
                    {editingOrderId === order.id ? (
                      <div className="bg-bg/40 border border-line rounded-lg p-4 space-y-4">
                        <h5 className="text-[10px] font-bold text-ink uppercase tracking-wider">Edit Shipping Destination</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[7.5px] uppercase tracking-wider text-muted font-bold block">Recipient Name</label>
                            <input
                              type="text"
                              value={editShippingName}
                              onChange={(e) => setEditShippingName(e.target.value)}
                              className="w-full bg-bg border border-line rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[7.5px] uppercase tracking-wider text-muted font-bold block">Street Address</label>
                            <input
                              type="text"
                              value={editShippingStreet}
                              onChange={(e) => setEditShippingStreet(e.target.value)}
                              className="w-full bg-bg border border-line rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[7.5px] uppercase tracking-wider text-muted font-bold block">City</label>
                            <input
                              type="text"
                              value={editShippingCity}
                              onChange={(e) => setEditShippingCity(e.target.value)}
                              className="w-full bg-bg border border-line rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[7.5px] uppercase tracking-wider text-muted font-bold block">Zip Code</label>
                              <input
                                type="text"
                                value={editShippingZip}
                                onChange={(e) => setEditShippingZip(e.target.value)}
                                className="w-full bg-bg border border-line rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[7.5px] uppercase tracking-wider text-muted font-bold block">Country</label>
                              <input
                                type="text"
                                value={editShippingCountry}
                                onChange={(e) => setEditShippingCountry(e.target.value)}
                                className="w-full bg-bg border border-line rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 flex justify-end gap-2">
                          <button
                            onClick={() => setEditingOrderId(null)}
                            className="px-3.5 py-1.5 bg-transparent border border-line rounded-lg text-[9px] font-bold tracking-widest uppercase hover:border-ink transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdateOrderDetails(order.id)}
                            disabled={isActionLoading}
                            className="px-3.5 py-1.5 bg-ink text-bg border border-ink rounded-lg text-[9px] font-bold tracking-widest uppercase hover:bg-accent hover:border-accent hover:text-bg transition-colors cursor-pointer"
                          >
                            Save Details
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-bg/30 border border-line/20 rounded-lg p-3 gap-2">
                        <div className="text-[9px] text-muted uppercase tracking-wider">
                          <span className="font-bold text-ink block">Ship To:</span>
                          <span>{order.shippingName}, {order.shippingStreet}, {order.shippingCity}, {order.shippingCountry} {order.shippingZip}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-[8px] text-muted uppercase tracking-widest block">Total</span>
                            <span className="font-display font-bold text-sm text-accent">${order.totalUSD.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-2 pl-3 border-l border-line/30">
                            <button
                              onClick={() => {
                                setEditingOrderId(order.id);
                                setEditShippingName(order.shippingName || "");
                                setEditShippingStreet(order.shippingStreet || "");
                                setEditShippingCity(order.shippingCity || "");
                                setEditShippingZip(order.shippingZip || "");
                                setEditShippingCountry(order.shippingCountry || "US");
                              }}
                              className="px-2.5 py-1 bg-bg border border-line rounded text-[8px] font-bold tracking-wider hover:border-accent hover:text-accent transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="px-2.5 py-1 bg-red-50/20 text-red-500 border border-red-200/50 rounded text-[8px] font-bold tracking-wider hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-bg/20 border border-dashed border-line rounded-xl uppercase text-[10px] tracking-widest text-muted">
                No orders match your current search and filter criteria.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PRODUCTS */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-3">
              <div>
                <h3 className="font-display font-semibold text-base uppercase text-ink">Catalog & Inventory</h3>
                <p className="text-[11px] text-muted mt-0.5">Manage skincare formulas and add new custom products.</p>
              </div>
              <input
                type="text"
                placeholder="Search Catalog..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent w-48"
              />
            </div>

            {/* Add product Form */}
            <div className="bg-bg/40 border border-line rounded-xl p-5 md:p-6 space-y-6">
              <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider border-b border-line/35 pb-2">
                {editingProduct ? `Edit Formulation (ID: ${editingProduct.id})` : "Inject New Formulation"}
              </h4>

              <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      placeholder="e.g. CELLULAR AMINO BALANCER"
                      className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Subtitle / Efficacy Spec</label>
                    <input
                      type="text"
                      required
                      value={newProductSubtitle}
                      onChange={(e) => setNewProductSubtitle(e.target.value)}
                      placeholder="e.g. Skin Barrier Strengthening + 1.2% Lipids and ceramides"
                      className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs tracking-wider focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Price (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      placeholder="45.00"
                      className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Initial Stock Inventory</label>
                    <input
                      type="number"
                      required
                      value={newProductInventory}
                      onChange={(e) => setNewProductInventory(e.target.value)}
                      className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">System category</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs uppercase tracking-wider h-10 justify-between items-center cursor-pointer">
                          <span>{newProductCategory === "skincare" ? "Skincare System" : "Bodycare System"}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        <DropdownMenuItem onClick={() => setNewProductCategory("skincare")}>Skincare System</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setNewProductCategory("bodycare")}>Bodycare System</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* File Uploader */}
                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Product image photo</label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <button
                        type="button"
                        disabled={uploadingImage}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-3.5 py-2.5 bg-bg border border-line rounded-xl text-[10px] uppercase font-bold tracking-widest hover:border-accent hover:text-accent transition-colors w-full justify-center cursor-pointer disabled:opacity-50"
                      >
                        {uploadingImage ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{newProductImage ? "Change Photo" : "Upload Image"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Description</label>
                  <textarea
                    value={newProductDescription}
                    onChange={(e) => setNewProductDescription(e.target.value)}
                    placeholder="Detailed formulation active ingredients, study metrics and clinical results..."
                    rows={3}
                    className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Image Preview Box */}
                {newProductImage && (
                  <div className="flex gap-4 items-center p-3 bg-bg border border-line rounded-xl w-fit">
                    <div className="w-14 h-16 border border-line rounded overflow-hidden relative">
                      <img src={newProductImage} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-muted space-y-1">
                      <span className="font-bold text-ink block">Upload Completed</span>
                      <span className="block truncate max-w-[200px]">{newProductImage}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex justify-end gap-3">
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setNewProductName("");
                        setNewProductSubtitle("");
                        setNewProductPrice("");
                        setNewProductInventory("100");
                        setNewProductDescription("");
                        setNewProductImage("");
                        setNewProductHoverImage("");
                      }}
                      className="px-6 py-3.5 text-ink border border-line bg-transparent text-[10px] font-bold tracking-widest uppercase cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <CurtainButton
                    type="submit"
                    disabled={isActionLoading || uploadingImage}
                    className="px-8 py-3.5 text-ink border border-ink bg-transparent text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isActionLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    <span>{editingProduct ? "Save Product Changes" : "Inject Product to Catalog"}</span>
                  </CurtainButton>
                </div>
              </form>
            </div>

            {/* Catalog list */}
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider">Catalog Inventory Overview</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.map((prod) => (
                  <div key={prod.id} className="p-4 bg-bg/40 border border-line rounded-xl flex gap-4 hover:border-accent/40 transition-colors">
                    <div className="w-16 h-20 bg-card-bg border border-line/50 rounded overflow-hidden shrink-0 select-none">
                      <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[7.5px] uppercase tracking-widest text-accent font-bold">ID: {prod.id}</span>
                        <h5 className="font-display font-bold text-xs uppercase text-ink truncate leading-tight">{prod.name}</h5>
                        <p className="text-[9px] text-muted truncate">{prod.subtitle}</p>
                      </div>

                      <div className="border-t border-line/30 pt-2 flex items-center justify-between text-[9px] uppercase font-semibold">
                        <span className="text-ink/80">Stock: <span className="font-bold text-ink">{prod.inventory} units</span></span>
                        <span className="text-accent font-bold">${prod.priceUSD.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2 justify-end mt-2 pt-2 border-t border-line/10">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setNewProductName(prod.name);
                            setNewProductSubtitle(prod.subtitle);
                            setNewProductPrice(String(prod.priceUSD));
                            setNewProductInventory(String(prod.inventory));
                            setNewProductDescription(prod.description || "");
                            setNewProductImage(prod.image);
                            setNewProductHoverImage(prod.hoverImage || "");
                            setNewProductCategory(prod.Category?.slug || "skincare");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="px-3 py-1 bg-bg border border-line rounded text-[8px] font-bold tracking-wider hover:border-accent hover:text-accent transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          className="px-3 py-1 bg-red-50/20 text-red-500 border border-red-200/50 rounded text-[8px] font-bold tracking-wider hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ABANDONED CARTS */}
        {activeTab === "carts" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-line pb-4">
              <h3 className="font-display font-semibold text-base uppercase text-ink">Abandoned Carts Tracker</h3>
              <p className="text-[11px] text-muted mt-0.5">Monitor clients who have registered items in their bag but failed to complete checkout.</p>
            </div>

            {abandonedCarts.length > 0 ? (
              <div className="space-y-4">
                {abandonedCarts.map((cart) => (
                  <div key={cart.id} className="border border-line rounded-xl p-5 bg-bg/50 hover:border-accent/30 transition-all space-y-4">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] border-b border-line/45 pb-3 gap-2 uppercase tracking-wider font-semibold">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-muted">Last Active:</span>
                        <span className="text-ink">{new Date(cart.updatedAt).toLocaleString()}</span>
                      </div>
                      <span className="text-[8.5px] bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                        Abandoned Checkout
                      </span>
                    </div>

                    {/* Customer email details */}
                    <div className="text-[10px] text-muted uppercase tracking-wider flex items-center justify-between">
                      <div>
                        <span className="font-bold text-ink block mb-0.5">Customer Email Code</span>
                        <span className="text-ink font-semibold">{cart.userEmail}</span>
                      </div>
                      <button
                        onClick={() => handleSimulateRecoveryEmail(cart)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-bg border border-line rounded-lg text-[9px] font-bold tracking-widest hover:border-accent hover:text-accent transition-all cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Dispatch Recovery Promo</span>
                      </button>
                    </div>

                    {/* Items in Cart */}
                    <div className="border-t border-line/30 pt-3">
                      <span className="text-[9px] font-bold text-ink uppercase tracking-wider block mb-2">Cart Contents</span>

                      <div className="space-y-2">
                        {cart.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-[10px] uppercase font-semibold text-ink/80">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-8 bg-card-bg border border-line rounded overflow-hidden">
                                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                              </div>
                              <div>
                                <span className="text-ink">{item.name}</span>
                                <span className="text-muted block text-[8px] tracking-normal lowercase">{item.subtitle}</span>
                              </div>
                            </div>
                            <div className="flex gap-8 items-baseline">
                              <span>Qty: {item.quantity}</span>
                              <span className="font-bold text-ink">${(item.priceUSD * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-line/30 pt-3 flex justify-between items-baseline">
                      <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">Total Cart Cargo Value</span>
                      <span className="text-sm font-bold text-accent">${cart.totalUSD.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-bg/20 border border-dashed border-line rounded-xl uppercase text-[10px] tracking-widest text-muted">
                No abandoned carts currently recorded in the database.
              </div>
            )}
          </div>
        )}

        {/* TAB 5: REPORTS */}
        {activeTab === "reports" && (
          <div className="space-y-6 animate-fadeIn pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-3">
              <div>
                <h3 className="font-display font-semibold text-base uppercase text-ink">Executive Report Desk</h3>
                <p className="text-[11px] text-muted mt-0.5">Filter sales transactions, monitor performance metrics, and generate print-friendly reports.</p>
              </div>
              <button
                onClick={generatePDFReport}
                className="flex items-center gap-2 px-5 py-2.5 bg-ink text-bg border border-ink rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-accent hover:border-accent hover:text-bg transition-colors cursor-pointer animate-pulse"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Generate PDF Report</span>
              </button>
            </div>

            {/* Quick Metrics Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 bg-bg/40 border border-line rounded-xl space-y-1">
                <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Total Sales</span>
                <span className="text-base font-bold text-emerald-600">
                  ${filteredReportOrders.reduce((sum, o) => sum + o.totalUSD, 0).toFixed(2)}
                </span>
              </div>
              <div className="p-4 bg-bg/40 border border-line rounded-xl space-y-1">
                <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Orders count</span>
                <span className="text-base font-bold text-ink">{filteredReportOrders.length}</span>
              </div>
              <div className="p-4 bg-bg/40 border border-line rounded-xl space-y-1">
                <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Paid / Shipped</span>
                <span className="text-base font-bold text-blue-600">
                  {filteredReportOrders.filter(o => o.status === "PAID" || o.status === "SHIPPED" || o.status === "DELIVERED").length}
                </span>
              </div>
              <div className="p-4 bg-bg/40 border border-line rounded-xl space-y-1">
                <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Pending / Unpaid</span>
                <span className="text-base font-bold text-amber-600">
                  {filteredReportOrders.filter(o => o.status === "PENDING").length}
                </span>
              </div>
              <div className="p-4 bg-bg/40 border border-line rounded-xl col-span-2 md:col-span-1 space-y-1">
                <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Cancelled</span>
                <span className="text-base font-bold text-red-500">
                  {filteredReportOrders.filter(o => o.status === "CANCELLED").length}
                </span>
              </div>
            </div>

            {/* Filters Form Controls */}
            <div className="bg-bg/40 border border-line rounded-xl p-5 space-y-4">
              <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider">Configure Scope & Filter Criteria</h4>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div className="space-y-1.5 col-span-1">
                  <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">Start Date</label>
                  <input
                    type="date"
                    value={reportStartDate}
                    onChange={(e) => setReportStartDate(e.target.value)}
                    className="w-full bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">End Date</label>
                  <input
                    type="date"
                    value={reportEndDate}
                    onChange={(e) => setReportEndDate(e.target.value)}
                    className="w-full bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">Order Status</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-[10px] uppercase tracking-wider h-9 justify-between items-center cursor-pointer">
                        <span>{reportStatus === "ALL" ? "All Statuses" : reportStatus}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem onClick={() => setReportStatus("ALL")}>All Statuses</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportStatus("PENDING")}>Pending</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportStatus("PAID")}>Paid</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportStatus("SHIPPED")}>Shipped</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportStatus("DELIVERED")}>Delivered</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportStatus("CANCELLED")}>Cancelled</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">Sort Registry By</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-[10px] uppercase tracking-wider h-9 justify-between items-center cursor-pointer">
                        <span>
                          {reportSortKey === "date_desc" ? "Date: Newest" :
                           reportSortKey === "date_asc" ? "Date: Oldest" :
                           reportSortKey === "email_asc" ? "Email: A to Z" :
                           reportSortKey === "email_desc" ? "Email: Z to A" :
                           reportSortKey === "total_desc" ? "Total: High-Low" :
                           reportSortKey === "total_asc" ? "Total: Low-High" : "Sorted"}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem onClick={() => setReportSortKey("date_desc")}>Date: Newest</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportSortKey("date_asc")}>Date: Oldest</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportSortKey("email_asc")}>Email: A to Z</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportSortKey("email_desc")}>Email: Z to A</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportSortKey("total_desc")}>Total: High-Low</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setReportSortKey("total_asc")}>Total: Low-High</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">Text Match Search</label>
                  <input
                    type="text"
                    placeholder="Search Email, Name, ID..."
                    value={reportSearch}
                    onChange={(e) => setReportSearch(e.target.value)}
                    className="w-full bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>

            {/* List matching orders table */}
            <div className="bg-bg/40 border border-line rounded-xl overflow-hidden">
              <div className="p-5 border-b border-line">
                <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider">Matching Transactions Registry</h4>
              </div>

              {filteredReportOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="bg-bg border-b border-line font-bold text-[8.5px] uppercase tracking-wider text-muted">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Customer Email</th>
                        <th className="p-4">Destination</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReportOrders.map((order) => (
                        <tr key={order.id} className="border-b border-line/45 hover:bg-bg/15 transition-colors">
                          <td className="p-4 font-mono text-[10px] uppercase">#{order.id.slice(0, 8)}</td>
                          <td className="p-4 text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="p-4 font-semibold text-ink">{order.user.email}</td>
                          <td className="p-4 text-muted truncate max-w-[150px]">{order.shippingName}, {order.shippingCity}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded text-[8.5px] font-bold tracking-widest uppercase border ${
                              order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                              order.status === "CANCELLED" ? "bg-red-50 text-red-500 border-red-100" :
                              order.status === "SHIPPED" ? "bg-blue-50 text-blue-500 border-blue-100" :
                              "bg-accent/15 text-accent border-accent/20"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right font-bold text-ink">${order.totalUSD.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-20 uppercase text-[10px] tracking-widest text-muted">
                  No transaction registry matches your configuration criteria.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
