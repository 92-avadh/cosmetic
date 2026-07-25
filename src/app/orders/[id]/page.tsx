"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainButton from "@/components/CurtainButton";
import { ArrowLeft, Clock, MapPin, Package, ShieldCheck, Mail, HelpCircle, CheckCircle, Truck, Printer, Download, FileText } from "lucide-react";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import {
  AlertDialog,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/animate-ui/components/base/alert-dialog";

export const dynamic = "force-dynamic";

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const { currency } = useCartStore();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Support message modal state
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [showInquiryAlert, setShowInquiryAlert] = useState(false);
  // Invoice Modal state
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Return / Exchange modal state
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnType, setReturnType] = useState<"RETURN" | "EXCHANGE">("RETURN");
  const [returnReason, setReturnReason] = useState("");
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);
  const [returnAlertMessage, setReturnAlertMessage] = useState<string | null>(null);

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnReason.trim()) return;
    try {
      setIsSubmittingReturn(true);
      const res = await fetch(`/api/orders/${orderId}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnType, returnReason }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit return request.");
      }
      setOrder(data.order);
      setShowReturnModal(false);
      setReturnReason("");
      setReturnAlertMessage(data.message || "Return request submitted! Awaiting admin review & acceptance.");
    } catch (err: any) {
      alert(err.message || "Failed to process return request.");
    } finally {
      setIsSubmittingReturn(false);
    }
  };

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) {
          throw new Error("Order not found or unauthorized access.");
        }
        const data = await res.json();
        setOrder(data);
      } catch (err: any) {
        setError(err.message || "Failed to load order tracking details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (isLoading) {
    return (
      <>
        <Nav />
        <main className="bg-bg min-h-screen pt-32 pb-24 font-sans flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-widest font-semibold text-muted">Retrieving Tracking Feed...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Nav />
        <main className="bg-bg min-h-screen pt-32 pb-24 font-sans flex items-center justify-center">
          <div className="text-center max-w-md p-6 border border-line rounded-2xl bg-card-bg/50 space-y-6">
            <h2 className="font-display font-semibold text-lg uppercase text-ink">Tracking Feed Offline</h2>
            <p className="text-xs text-muted leading-relaxed">
              We couldn't retrieve the specified order ID. Ensure you've completed checkout successfully or check your link parameters.
            </p>
            <CurtainButton
              onClick={() => router.push("/account")}
              className="px-8 py-3 text-bg border-accent bg-accent text-[10px] font-bold tracking-widest uppercase rounded-[3px]"
            >
              Go to Account Profile
            </CurtainButton>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Currency calculations
  const rate = CURRENCY_RATES[currency] || 1;
  const symbol = CURRENCY_SYMBOLS[currency] || "$";
  const displayTotal = order.totalUSD * rate;
  const displaySubtotal = (order.totalUSD - (order.discountUSD || 0)) * rate;

  // Status mapping
  const statusSteps = [
    { name: "Ordered", status: "PENDING", description: "Order received & pending verification." },
    { name: "Paid", status: "PAID", description: "Payment securely captured and verified." },
    { name: "Shipped", status: "SHIPPED", description: "Handed over to local express courier." },
    { name: "Delivered", status: "DELIVERED", description: "Package signed & delivered successfully." },
  ];

  const currentStepIndex = statusSteps.findIndex((step) => step.status === order.status);
  const isCancelled = order.status === "CANCELLED";

  // Mock transit logs based on status
  const getLogs = () => {
    const logs = [];
    const baseDate = new Date(order.createdAt);

    logs.push({
      time: baseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: baseDate.toLocaleDateString(),
      title: "Order Placed Successfully",
      desc: "Checkout completed. Transaction logged on server.",
    });

    if (["PAID", "SHIPPED", "DELIVERED"].includes(order.status)) {
      const paidDate = new Date(baseDate.getTime() + 5 * 60 * 1000); // 5 mins later
      logs.push({
        time: paidDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: paidDate.toLocaleDateString(),
        title: "Payment Capture Authorized",
        desc: `Verified secure payment signature. Invoice generated.`,
      });
    }

    if (["SHIPPED", "DELIVERED"].includes(order.status)) {
      const shipDate = new Date(baseDate.getTime() + 18 * 60 * 60 * 1000); // 18 hours later
      logs.push({
        time: shipDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: shipDate.toLocaleDateString(),
        title: "Dispatched from Logistics Hub",
        desc: "Shipped via Delhivery Express. Waybill tracking code: IN-82937-DEL.",
      });
    }

    if (order.status === "DELIVERED" || ["RETURN_REQUESTED", "RETURN_APPROVED", "RETURN_REJECTED", "RETURNED"].includes(order.status) || order.returnStatus) {
      const delDate = new Date(baseDate.getTime() + 36 * 60 * 60 * 1000); // 36 hours later
      logs.push({
        time: delDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: delDate.toLocaleDateString(),
        title: "Delivered & Signed",
        desc: "Package signed by recipient. Eligible for 7-day Return / Exchange under Admin Policy.",
      });
    }

    if (order.returnRequestedAt || order.returnStatus === "REQUESTED" || order.status === "RETURN_REQUESTED") {
      const reqDate = order.returnRequestedAt ? new Date(order.returnRequestedAt) : new Date(baseDate.getTime() + 40 * 60 * 60 * 1000);
      logs.push({
        time: reqDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: reqDate.toLocaleDateString(),
        title: `${order.returnType || "Return"}/Exchange Requested by Customer`,
        desc: `Reason: "${order.returnReason || "Item return requested"}". Awaiting mandatory Admin review & acceptance.`,
      });
    }

    if (order.returnStatus === "APPROVED" || order.status === "RETURN_APPROVED") {
      const procDate = order.returnProcessedAt ? new Date(order.returnProcessedAt) : new Date(baseDate.getTime() + 48 * 60 * 60 * 1000);
      logs.push({
        time: procDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: procDate.toLocaleDateString(),
        title: "Return / Exchange Request Accepted by Admin ✓",
        desc: order.returnAdminNote || "Admin reviewed and accepted your request. Free reverse courier pickup has been scheduled.",
      });
    } else if (order.returnStatus === "REJECTED" || order.status === "RETURN_REJECTED") {
      const procDate = order.returnProcessedAt ? new Date(order.returnProcessedAt) : new Date(baseDate.getTime() + 48 * 60 * 60 * 1000);
      logs.push({
        time: procDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: procDate.toLocaleDateString(),
        title: "Return Request Reviewed & Rejected by Admin",
        desc: order.returnAdminNote || "Request rejected by admin based on return policy guidelines.",
      });
    }

    return logs.reverse();
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSubmitted(true);
    setTimeout(() => {
      setShowSupportModal(false);
      setSupportMessage("");
      setSupportSubmitted(false);
      setShowInquiryAlert(true);
    }, 1500);
  };

  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-line pb-8 mb-12 space-y-4 md:space-y-0">
            <div className="space-y-2">
              <button
                onClick={() => router.push("/account")}
                className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-muted hover:text-accent transition-colors cursor-pointer border-none bg-transparent mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Profile</span>
              </button>
              <h1 className="font-display font-semibold text-2xl md:text-4xl uppercase tracking-tight text-ink">
                Track Order
              </h1>
              <p className="text-xs text-muted">
                Order Reference ID: <span className="font-mono text-ink font-semibold select-all">{order.id}</span>
              </p>
            </div>
            
            {/* Status Pill & Return Action */}
            <div className="flex flex-wrap items-center gap-3">
              {isCancelled ? (
                <span className="inline-block text-xs font-bold text-rose-600 bg-rose-50 px-4 py-2 border border-rose-100 rounded-[3px] uppercase tracking-widest">
                  Order Cancelled
                </span>
              ) : order.returnStatus === "REQUESTED" || order.status === "RETURN_REQUESTED" ? (
                <span className="inline-block text-xs font-bold text-amber-700 bg-amber-50 px-4 py-2 border border-amber-200 rounded-[3px] uppercase tracking-widest animate-pulse">
                  Return Requested (Awaiting Admin Acceptance)
                </span>
              ) : order.returnStatus === "APPROVED" || order.status === "RETURN_APPROVED" ? (
                <span className="inline-block text-xs font-bold text-purple-700 bg-purple-50 px-4 py-2 border border-purple-200 rounded-[3px] uppercase tracking-widest">
                  Return Accepted by Admin ✓
                </span>
              ) : order.returnStatus === "REJECTED" || order.status === "RETURN_REJECTED" ? (
                <span className="inline-block text-xs font-bold text-red-600 bg-red-50 px-4 py-2 border border-red-200 rounded-[3px] uppercase tracking-widest">
                  Return Request Rejected
                </span>
              ) : (
                <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 border border-emerald-100 rounded-[3px] uppercase tracking-widest">
                  Status: {order.status}
                </span>
              )}

              {/* Show Request Return / Exchange button if delivered and no return currently pending/approved */}
              {order.status === "DELIVERED" && (!order.returnStatus || order.returnStatus === "NONE") && (
                <CurtainButton
                  onClick={() => setShowReturnModal(true)}
                  className="px-5 py-2 text-bg border-accent bg-accent text-[10px] font-bold tracking-widest uppercase rounded-[3px]"
                >
                  Request Return / Exchange
                </CurtainButton>
              )}
            </div>
          </div>

          {/* Stepper Tracking Visualizer (Horizontal) */}
          {!isCancelled && (
            <div className="border border-line/75 rounded-2xl p-6 md:p-8 bg-card-bg/40 mb-12">
              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
                {/* Visual Connector Bar (Hidden on Mobile) */}
                <div className="absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-line/45 z-0 hidden md:block" />
                <div
                  className="absolute top-[28px] left-[10%] h-[2px] bg-accent z-0 transition-all duration-700 hidden md:block"
                  style={{
                    width: `${
                      currentStepIndex === 0
                        ? 0
                        : currentStepIndex === 1
                        ? 26.6
                        : currentStepIndex === 2
                        ? 53.3
                        : currentStepIndex === 3
                        ? 80
                        : 0
                    }%`,
                  }}
                />

                {statusSteps.map((step, idx) => {
                  const isActive = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={step.status}
                      className="flex md:flex-col items-center md:items-center gap-4 md:gap-3 flex-1 relative z-10 text-left md:text-center"
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? "bg-accent border-accent text-bg scale-105 shadow-md shadow-accent/15"
                            : "bg-bg border-line/75 text-muted"
                        }`}
                      >
                        {idx === 3 && isActive ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : idx === 2 && isActive ? (
                          <Truck className="w-5 h-5" />
                        ) : (
                          <span className="font-mono text-xs font-bold">{idx + 1}</span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p
                          className={`text-xs uppercase tracking-wider font-bold ${
                            isActive ? "text-ink" : "text-muted"
                          } ${isCurrent ? "text-accent underline underline-offset-4" : ""}`}
                        >
                          {step.name}
                        </p>
                        <p className="text-[10px] text-muted max-w-[150px] hidden md:block leading-tight">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Details Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Details & Logs */}
            <div className="lg:col-span-8 space-y-8">
              {/* Product list */}
              <div className="border border-line/60 rounded-2xl p-6 bg-card-bg/30 space-y-6">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-ink border-b border-line/50 pb-3">
                  Items Purchased
                </h3>
                <div className="divide-y divide-line/45">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item: any) => {
                      const itemPrice = item.price * rate;
                      return (
                        <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                          <div className="w-16 h-20 bg-card-bg border border-line/40 rounded overflow-hidden flex-shrink-0 select-none">
                            <img
                              src={item.product?.image || "/fallback_wash.png"}
                              alt={item.product?.name || "Product"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="font-display font-semibold text-sm uppercase text-ink truncate">
                                {item.product?.name || "Product"}
                              </h4>
                              <p className="text-[10px] text-muted tracking-wider uppercase mt-1 truncate">
                                {item.product?.subtitle || "Shower Care Formulations"}
                              </p>
                            </div>
                            <span className="text-[11px] text-muted">QTY: {item.quantity}</span>
                          </div>
                          <span className="text-xs font-semibold text-ink shrink-0">
                            {symbol}{(itemPrice * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-muted py-2">No itemized details are recorded for this order.</p>
                  )}
                </div>
              </div>

              {/* Transit Event Log */}
              {!isCancelled && (
                <div className="border border-line/60 rounded-2xl p-6 bg-card-bg/30 space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-ink border-b border-line/50 pb-3">
                    Transit History Log
                  </h3>
                  <div className="relative border-l border-line/65 pl-6 ml-3 space-y-6">
                    {getLogs().map((log, index) => (
                      <div key={index} className="relative">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                            index === 0 ? "bg-accent border-accent scale-110" : "bg-bg border-line"
                          }`}
                        />
                        <div className="space-y-1">
                          <span className="text-[9px] text-muted block">
                            {log.date} @ {log.time}
                          </span>
                          <h4 className="text-xs font-bold text-ink uppercase tracking-wider">{log.title}</h4>
                          <p className="text-[11px] text-muted leading-relaxed">{log.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Address and Receipt Summary */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
              {/* Shipping Address */}
              <div className="border border-line/60 rounded-2xl p-6 bg-card-bg/30 space-y-4 text-xs">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-ink border-b border-line/50 pb-3 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>Delivery Address</span>
                </h3>
                <div className="space-y-1 text-muted">
                  <p className="font-semibold text-ink uppercase tracking-wide">
                    {order.shippingName || "Valued Customer"}
                  </p>
                  <p>{order.shippingStreet}</p>
                  <p>
                    {order.shippingCity}, {order.shippingZip}
                  </p>
                  <p className="uppercase tracking-widest font-semibold text-[10px] text-ink/75 pt-1">
                    {order.shippingCountry}
                  </p>
                </div>
              </div>

              {/* Order Receipt breakdown */}
              <div className="border border-line/60 rounded-2xl p-6 bg-card-bg/30 space-y-4 text-xs">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-ink border-b border-line/50 pb-3 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>Order Summary</span>
                </h3>
                <div className="space-y-3 font-semibold text-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-ink">
                      {symbol}{displaySubtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="text-ink">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-line/35 pt-3 text-ink text-sm font-bold">
                    <span>Grand Total</span>
                    <span className="text-accent">
                      {symbol}{displayTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="w-full mt-4 py-2.5 px-4 bg-bg border border-line hover:border-accent text-ink hover:text-accent rounded-lg text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-accent" />
                  <span>Download Tax Invoice (PDF)</span>
                </button>
              </div>

              {/* Customer Support Panel */}
              <div className="border border-line/50 rounded-2xl p-6 bg-accent/5 space-y-4 text-center">
                <HelpCircle className="w-6 h-6 text-accent mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-ink">Need Assistance?</h4>
                  <p className="text-[10px] text-muted leading-relaxed">
                    Have questions about shipping windows, returns, or product protocol compatibility? Contact support.
                  </p>
                </div>
                <CurtainButton
                  onClick={() => setShowSupportModal(true)}
                  className="w-full py-2.5 text-bg border-accent bg-accent text-[9px] font-bold tracking-widest uppercase rounded-[3px]"
                >
                  Message Support Center
                </CurtainButton>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Message Support Center Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg border border-line rounded-2xl p-6 max-w-md w-full space-y-6 animate-scaleUp shadow-xl">
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-lg uppercase text-ink">Message Support</h3>
              <p className="text-xs text-muted">
                Your inquiry will reference Order Code: <span className="font-mono text-ink font-semibold">{order.id.slice(0, 8)}</span>.
              </p>
            </div>
            
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-muted">Inquiry Details</label>
                <textarea
                  required
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="e.g. Can I change my delivery address? My PIN code matches but street was typoed..."
                  rows={4}
                  className="w-full bg-card-bg border border-line rounded p-3 text-xs text-ink focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowSupportModal(false)}
                  className="flex-1 py-3 border border-line text-ink hover:bg-card-bg text-xs font-semibold tracking-wider uppercase rounded cursor-pointer transition-colors bg-transparent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={supportSubmitted}
                  className="flex-1 py-3 bg-accent text-bg hover:bg-accent/90 text-xs font-semibold tracking-wider uppercase rounded cursor-pointer transition-colors border-none"
                >
                  {supportSubmitted ? "Submitting..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Return / Exchange Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg border border-line rounded-2xl p-6 max-w-md w-full space-y-6 animate-scaleUp shadow-xl">
            <div className="space-y-2 text-left">
              <h3 className="font-display font-semibold text-lg uppercase text-ink">Request Return or Exchange</h3>
              <p className="text-xs text-muted leading-relaxed">
                Order ID: <span className="font-mono text-ink font-semibold">{order.id.slice(0, 8)}</span>
              </p>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded text-[11px] text-amber-800 leading-snug">
                <strong>Policy Notice:</strong> All Return & Exchange requests are strictly reviewed by our Admin team before pickup or refund authorization.
              </div>
            </div>
            
            <form onSubmit={handleReturnSubmit} className="space-y-4 text-left">
              {/* Type Selection */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted block">Request Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReturnType("RETURN")}
                    className={`py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                      returnType === "RETURN"
                        ? "bg-accent text-bg border-accent"
                        : "bg-card-bg text-ink border-line hover:border-accent"
                    }`}
                  >
                    Return (Refund)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReturnType("EXCHANGE")}
                    className={`py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                      returnType === "EXCHANGE"
                        ? "bg-accent text-bg border-accent"
                        : "bg-card-bg text-ink border-line hover:border-accent"
                    }`}
                  >
                    Exchange Item
                  </button>
                </div>
              </div>

              {/* Reason input */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted block">Reason for Return / Exchange</label>
                <textarea
                  required
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  placeholder="e.g. Received incorrect variant, bottle damaged during transit, or wrong formula..."
                  rows={4}
                  className="w-full bg-card-bg border border-line rounded p-3 text-xs text-ink focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReturnModal(false)}
                  className="flex-1 py-3 border border-line text-ink hover:bg-card-bg text-xs font-semibold tracking-wider uppercase rounded cursor-pointer transition-colors bg-transparent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReturn}
                  className="flex-1 py-3 bg-accent text-bg hover:bg-accent/90 text-xs font-semibold tracking-wider uppercase rounded cursor-pointer transition-colors border-none"
                >
                  {isSubmittingReturn ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Return Success Alert Dialog */}
      <AlertDialog open={!!returnAlertMessage} onOpenChange={() => setReturnAlertMessage(null)}>
        <AlertDialogPopup from="center" className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Return Request Submitted</AlertDialogTitle>
            <AlertDialogDescription>
              {returnAlertMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-ink hover:opacity-90 text-bg" onClick={() => setReturnAlertMessage(null)}>
              Understood
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>

      {/* Official PDF Tax Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-ink/75 backdrop-blur-md z-50 overflow-y-auto p-4 md:p-8 flex justify-center">
          <div className="bg-white text-black max-w-3xl w-full rounded-xl shadow-2xl p-6 md:p-10 space-y-8 my-auto relative print:m-0 print:p-0 print:shadow-none print:w-full print:max-w-none">
            {/* Header controls (Hidden during print) */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2d1c14]" />
                <span className="font-bold text-sm uppercase tracking-wider text-[#2d1c14]">Tax Invoice Preview</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#2d1c14] text-white hover:bg-black rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer border-none"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer bg-transparent"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Print Document Root */}
            <div id="tax-invoice-document" className="space-y-8 font-sans">
              {/* Document Brand Header */}
              <div className="flex justify-between items-start border-b border-gray-300 pb-6">
                <div className="space-y-2">
                  <img src="/logo.png" alt="BODYBARREL Logo" width={180} height={50} className="h-10 w-auto object-contain" />
                  <p className="text-[10px] text-gray-500 font-mono">
                    BODYBARREL CELLULAR BOTANICALS INC.<br />
                    TAX REG / GSTIN: 27AAACB0981C1Z4<br />
                    Compliance Office: Bandra Kurla Complex, Mumbai / Seoul Gangnam-gu
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded">
                    Official Tax Invoice
                  </span>
                  <p className="text-xs font-mono font-bold text-gray-900 pt-1">
                    INVOICE #: INV-{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Billed To / Shipped To Grid */}
              <div className="grid grid-cols-2 gap-8 text-xs border-b border-gray-200 pb-6">
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-1">Billed & Shipped To:</h4>
                  <p className="font-bold text-gray-900 uppercase">{order.shippingName || "Valued Customer"}</p>
                  <p className="text-gray-600">{order.shippingStreet}</p>
                  <p className="text-gray-600">{order.shippingCity}, {order.shippingZip}</p>
                  <p className="text-gray-600 font-semibold uppercase">{order.shippingCountry}</p>
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-1">Payment Reference:</h4>
                  <p className="font-bold text-emerald-700 uppercase">Payment Captured (Paid)</p>
                  <p className="text-gray-600 font-mono">Order ID: {order.id}</p>
                  <p className="text-gray-600">Currency: {order.currency || "USD"}</p>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="space-y-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-900 text-[10px] uppercase tracking-wider font-bold text-gray-700">
                      <th className="py-2">Item Description</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Unit Price</th>
                      <th className="py-2 text-right">Tax (18%)</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item: any) => {
                        const unitPrice = item.pricePaid || 0;
                        const lineSub = unitPrice * item.quantity;
                        const tax = lineSub * 0.18;
                        return (
                          <tr key={item.id} className="py-3">
                            <td className="py-3">
                              <p className="font-bold uppercase text-gray-900">{item.product?.name || "BODYBARREL Formula"}</p>
                              <p className="text-[10px] text-gray-500">{item.product?.subtitle || "Cellular Care"}</p>
                            </td>
                            <td className="py-3 text-center font-mono">{item.quantity}</td>
                            <td className="py-3 text-right font-mono">{symbol}{unitPrice.toFixed(2)}</td>
                            <td className="py-3 text-right font-mono text-gray-500">{symbol}{tax.toFixed(2)}</td>
                            <td className="py-3 text-right font-mono font-bold text-gray-900">{symbol}{lineSub.toFixed(2)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-500 italic">No line items recorded.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total Calculation Summary */}
              <div className="flex justify-between items-end border-t-2 border-gray-900 pt-6">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-widest">Authentication Seal</span>
                  <div className="inline-flex items-center gap-2 border border-emerald-300 bg-emerald-50 px-3 py-1.5 rounded text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified E-Commerce Invoice</span>
                  </div>
                </div>
                <div className="w-64 space-y-2 text-xs font-semibold text-gray-700 text-right">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono">{symbol}{displaySubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping:</span>
                    <span className="font-mono">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-2 text-sm font-bold text-gray-900">
                    <span>Total Amount Paid:</span>
                    <span className="font-mono text-black">{symbol}{displayTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Footer Terms */}
              <div className="border-t border-gray-200 pt-4 text-[9px] text-gray-400 text-center uppercase tracking-widest leading-relaxed">
                Thank you for ordering from BODYBARREL Cellular Skincare. For return/exchange policies, visit your account portal.
              </div>
            </div>
          </div>
        </div>
      )}

      <AlertDialog open={showInquiryAlert} onOpenChange={setShowInquiryAlert}>
        <AlertDialogPopup from="center" className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Inquiry Submitted</AlertDialogTitle>
            <AlertDialogDescription>
              Your inquiry has been submitted. A service representative will email you shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-ink hover:opacity-90 text-bg">
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </>
  );
}
