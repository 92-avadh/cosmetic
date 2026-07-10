"use client";

import { useState } from "react";
import { useAdminContext } from "../context";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";

export default function AdminOrdersPage() {
  const {
    orders,
    isActionLoading,
    handleUpdateOrderStatus,
    handleUpdateOrderDetails,
    handleDeleteOrder,
  } = useAdminContext();

  // Search/Filters local state
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");

  // Editing order local state
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editShippingName, setEditShippingName] = useState("");
  const [editShippingStreet, setEditShippingStreet] = useState("");
  const [editShippingCity, setEditShippingCity] = useState("");
  const [editShippingZip, setEditShippingZip] = useState("");
  const [editShippingCountry, setEditShippingCountry] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.shippingName.toLowerCase().includes(orderSearch.toLowerCase());

    const matchesStatus = orderStatusFilter === "ALL" || order.status === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const onSaveDetails = async (orderId: string) => {
    await handleUpdateOrderDetails(orderId, {
      shippingName: editShippingName,
      shippingStreet: editShippingStreet,
      shippingCity: editShippingCity,
      shippingZip: editShippingZip,
      shippingCountry: editShippingCountry,
    });
    setEditingOrderId(null);
  };

  const onDeleteClick = async (orderId: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete Order #${orderId.slice(
          0,
          8
        )}? This action will permanently remove the order and payment records.`
      )
    ) {
      await handleDeleteOrder(orderId);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-line pb-4 text-left">
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
          className="bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent w-48 text-left"
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
                    <div className="flex-1 min-w-0 text-left">
                      <h5 className="text-[10px] font-bold text-ink truncate uppercase">{item.product?.name || "Unknown"}</h5>
                      <span className="text-[9px] text-muted">Qty: {item.quantity} · ${item.pricePaid.toFixed(2)} ea.</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping + Total */}
              {editingOrderId === order.id ? (
                <div className="bg-bg/40 border border-line rounded-lg p-4 space-y-4 text-left">
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
                      onClick={() => onSaveDetails(order.id)}
                      disabled={isActionLoading}
                      className="px-3.5 py-1.5 bg-ink text-bg border border-ink rounded-lg text-[9px] font-bold tracking-widest uppercase hover:bg-accent hover:border-accent hover:text-bg transition-colors cursor-pointer"
                    >
                      Save Details
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-bg/30 border border-line/20 rounded-lg p-3 gap-2 text-left">
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
                        onClick={() => onDeleteClick(order.id)}
                        className="px-2.5 py-1 bg-red-50/20 text-red-500 border border-red-200/55 rounded text-[8px] font-bold tracking-wider hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-colors cursor-pointer"
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
  );
}
