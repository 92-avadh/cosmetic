"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { User, ShoppingBag, MapPin, Compass, ShieldCheck, LogOut, Loader2, Save } from "lucide-react";
import CurtainButton from "@/components/CurtainButton";
import { useUserStore } from "@/store/useUserStore";
import { getApiErrorMessage } from "@/lib/utils";
import { SaveToggle, ButtonStatus } from "@/components/SaveToggle";

export default function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useUserStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("regimen");
  const [dbUser, setDbUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveButtonStatus, setSaveButtonStatus] = useState<ButtonStatus>("idle");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("IN");

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchUserProfile = async () => {
    if (!user?.email) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get", email: user.email }),
      });
      const resJson = await res.json();
      if (res.ok && resJson.success) {
        const data = resJson.data;
        if (data && data.user) {
          setDbUser(data.user);
          setFirstName(data.user.firstName || "");
          setLastName(data.user.lastName || "");
          if (data.user.addresses && data.user.addresses.length > 0) {
            const addr = data.user.addresses[0];
            setStreet(addr.street || "");
            setCity(addr.city || "");
            setState(addr.state || "");
            setPostalCode(addr.postalCode || "");
            setCountry(addr.country || "IN");
          }
        }
      }
    } catch (err) {
      console.error("Failed to load user profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && isLoggedIn) {
      fetchUserProfile();
    }
  }, [mounted, isLoggedIn, user?.email]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    setSaveButtonStatus("loading");
    setIsLoading(true);
    setSaveSuccess(null);
    setSaveError(null);
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          email: user.email,
          firstName,
          lastName,
          addressDetails: {
            name: `${firstName} ${lastName}`.trim(),
            street,
            city,
            state,
            postalCode,
            country,
          },
        }),
      });
      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setSaveSuccess("Profile settings updated successfully.");
        await fetchUserProfile();
        setSaveButtonStatus("success");
        setTimeout(() => {
          setSaveButtonStatus("saved");
          setTimeout(() => {
            setSaveButtonStatus("idle");
          }, 2000);
        }, 800);
      } else {
        throw new Error(getApiErrorMessage(resJson, "Failed to update profile details."));
      }
    } catch (err: any) {
      setSaveError(err.message || "Failed to save profile settings.");
      setSaveButtonStatus("idle");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout API failed:", err);
    }
    logout();
    router.push("/");
  };

  // Guard against hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
        <span className="text-[10px] uppercase tracking-widest text-muted mt-4">Loading Portal...</span>
      </div>
    );
  }

  // Not Logged In View
  if (!isLoggedIn) {
    return (
      <>
        <Nav />
        <main className="bg-bg text-ink min-h-screen pt-36 pb-24 font-sans flex flex-col justify-center items-center px-6">
          <div className="w-full max-w-md bg-card-bg/40 backdrop-blur-md border border-line/60 rounded-3xl p-8 md:p-10 text-center space-y-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent/30 via-accent to-accent/30" />
            <div className="text-center space-y-2">
              <h2 className="font-display font-semibold text-2xl uppercase tracking-tight text-ink mt-2">
                Access Your Account
              </h2>
              <p className="text-xs text-muted leading-relaxed max-w-sm mx-auto">
                Sign in to view your personalized body skin fitness regimen, track orders, and manage shipping addresses.
              </p>
            </div>
            <Link
              href="/login?redirect=/account"
              className="w-full bg-ink text-bg text-[10px] font-semibold py-4.5 tracking-[0.2em] uppercase hover:bg-accent hover:text-bg transition-colors duration-300 flex items-center justify-center space-x-2 rounded-xl"
            >
              <span>Sign In to Account</span>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const menuItems = [
    { id: "regimen", label: "My Skin Regimen", icon: Compass },
    { id: "orders", label: "Order History", icon: ShoppingBag },
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "addresses", label: "Shipping Addresses", icon: MapPin },
  ];

  // Regimen details customized for body wash
  const activeRegimen = [
    { step: "01", name: "BODYBARREL Daily Cleanse", frequency: "Daily / AM & PM", note: "Lather generously onto wet skin, massage for 60 seconds to activate biomimetic lipid recovery, then rinse thoroughly." },
    { step: "02", name: "Dermal-Micro Exfoliating Wash", frequency: "2-3x Weekly", note: "Apply in circular motions to body areas prone to dryness or flaking, allowing biological enzymes to resurface cells." }
  ];

  const displayName = firstName || user?.email?.split("@")[0] || "Valued Member";
  const avatarText = ((firstName?.[0] || lastName?.[0] || user?.email?.[0] || "U").toUpperCase());

  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sidebar Tabs Controls */}
          <div className="lg:col-span-4 bg-card-bg/60 backdrop-blur border border-line/60 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-line">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-bg font-display font-semibold text-lg select-none uppercase">
                {avatarText}
              </div>
              <div className="min-w-0">
                <h2 className="font-display font-semibold text-base uppercase text-ink truncate">{displayName}</h2>
                <span className="text-[10px] text-muted tracking-wider uppercase block truncate">{user?.email}</span>
              </div>
            </div>
            
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSaveSuccess(null);
                      setSaveError(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-bg text-accent border border-line shadow-sm"
                        : "bg-transparent text-ink/70 border border-transparent hover:text-ink hover:bg-bg/40"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5 text-accent shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-wider uppercase rounded-xl text-accent bg-accent/5 hover:bg-accent/15 border border-accent/25 transition-all mt-2"
                >
                  <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-wider uppercase rounded-xl text-accent hover:bg-accent/10 border border-transparent transition-all mt-4"
              >
                <LogOut className="w-4.5 h-4.5 shrink-0" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Account Detail Display Panels */}
          <div className="lg:col-span-8 bg-card-bg/35 backdrop-blur border border-line/50 rounded-2xl p-8 min-h-[480px] relative">
            {isLoading && (
              <div className="absolute inset-0 bg-bg/40 backdrop-blur-xs flex items-center justify-center z-20 rounded-2xl">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
              </div>
            )}

            {activeTab === "regimen" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-line pb-4">
                  <h3 className="font-display font-semibold text-lg uppercase text-ink">Active Skin Fitness Regimen</h3>
                  <p className="text-xs text-muted mt-1">Custom cellular repair workflow generated for your whole-body skin profile.</p>
                </div>
                
                <div className="space-y-6">
                  {activeRegimen.map((reg) => (
                    <div key={reg.step} className="flex gap-6 pb-6 border-b border-line/55 last:border-0 last:pb-0">
                      <span className="font-display font-bold text-2xl text-accent/50">{reg.step}</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-display font-semibold text-sm uppercase text-ink">{reg.name}</h4>
                          <span className="text-[9px] bg-accent/15 text-accent px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{reg.frequency}</span>
                        </div>
                        <p className="text-xs text-muted">{reg.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-line pb-4">
                  <h3 className="font-display font-semibold text-lg uppercase text-ink">Purchase History</h3>
                  <p className="text-xs text-muted mt-1">Review your real order records and delivery statuses.</p>
                </div>

                {dbUser?.orders && dbUser.orders.length > 0 ? (
                  <div className="space-y-6">
                    {dbUser.orders.map((order: any) => (
                      <div key={order.id} className="border border-line/70 rounded-xl p-5 bg-bg/50 space-y-4 hover:border-accent/40 transition-colors">
                        <div className="flex items-center justify-between text-xs border-b border-line/45 pb-3">
                          <span className="font-bold text-ink uppercase tracking-wider">Order #{order.id.slice(0, 8)}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-muted">{new Date(order.createdAt).toLocaleDateString()}</span>
                            <Link
                              href={`/orders/${order.id}`}
                              className="text-accent hover:underline font-bold uppercase tracking-widest text-[9px]"
                            >
                              Track Details &rarr;
                            </Link>
                          </div>
                        </div>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 min-w-0 flex-1">
                            <p className="text-xs text-ink/80 font-medium truncate">
                              {order.items && order.items.length > 0
                                ? order.items.map((item: any) => `${item.product?.name || "Product"} (x${item.quantity})`).join(", ")
                                : "Items Details Processing"}
                            </p>
                            <span className="inline-block text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full tracking-widest uppercase mt-2">
                              {order.status}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-ink ml-4 shrink-0">${order.totalUSD.toFixed(2)}</span>
                        </div>

                        {/* Visual Tracking Stepper */}
                        {order.status !== "CANCELLED" ? (
                          <div className="mt-6 pt-5 border-t border-line/35 flex items-center justify-between max-w-lg text-[9px] uppercase tracking-wider font-semibold text-muted/75 relative">
                            {/* Connector Line Background */}
                            <div className="absolute top-[27px] left-[12%] right-[12%] h-[1.5px] bg-line/35 z-0" />
                            
                            {/* Connector Line Progress */}
                            <div 
                              className="absolute top-[27px] left-[12%] h-[1.5px] bg-accent z-0 transition-all duration-500" 
                              style={{
                                width: 
                                  order.status === "PAID" 
                                    ? "25.3%" 
                                    : order.status === "SHIPPED" 
                                    ? "50.6%" 
                                    : order.status === "DELIVERED" 
                                    ? "76%" 
                                    : "0%"
                              }}
                            />

                            {/* Step 1: Ordered */}
                            <div className="flex flex-col items-center gap-2 flex-1 relative z-10">
                              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold font-mono text-[9px] transition-colors duration-300 ${
                                ["PENDING", "PAID", "SHIPPED", "DELIVERED"].includes(order.status)
                                  ? "bg-accent border-accent text-bg"
                                  : "bg-bg border-line"
                              }`}>
                                1
                              </span>
                              <span className={["PENDING", "PAID", "SHIPPED", "DELIVERED"].includes(order.status) ? "text-ink" : ""}>Ordered</span>
                            </div>

                            {/* Step 2: Paid */}
                            <div className="flex flex-col items-center gap-2 flex-1 relative z-10">
                              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold font-mono text-[9px] transition-colors duration-300 ${
                                ["PAID", "SHIPPED", "DELIVERED"].includes(order.status)
                                  ? "bg-accent border-accent text-bg"
                                  : "bg-bg border-line"
                              }`}>
                                2
                              </span>
                              <span className={["PAID", "SHIPPED", "DELIVERED"].includes(order.status) ? "text-ink" : ""}>Paid</span>
                            </div>

                            {/* Step 3: Shipped */}
                            <div className="flex flex-col items-center gap-2 flex-1 relative z-10">
                              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold font-mono text-[9px] transition-colors duration-300 ${
                                ["SHIPPED", "DELIVERED"].includes(order.status)
                                  ? "bg-accent border-accent text-bg"
                                  : "bg-bg border-line"
                              }`}>
                                3
                              </span>
                              <span className={["SHIPPED", "DELIVERED"].includes(order.status) ? "text-ink" : ""}>Shipped</span>
                            </div>

                            {/* Step 4: Delivered */}
                            <div className="flex flex-col items-center gap-2 flex-1 relative z-10">
                              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold font-mono text-[9px] transition-colors duration-300 ${
                                order.status === "DELIVERED"
                                  ? "bg-accent border-accent text-bg"
                                  : "bg-bg border-line"
                              }`}>
                                4
                              </span>
                              <span className={order.status === "DELIVERED" ? "text-ink" : ""}>Delivered</span>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 pt-3 border-t border-line/30 text-[10px] text-accent font-semibold uppercase tracking-wider">
                            Order Cancelled & Voided
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-bg/30 border border-dashed border-line rounded-2xl space-y-4">
                    <p className="text-xs text-muted uppercase tracking-wider">No dynamic orders found</p>
                    <Link
                      href="/shop"
                      className="inline-block px-6 py-2.5 bg-ink text-bg text-[10px] font-semibold tracking-widest uppercase hover:bg-accent hover:text-bg transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-line pb-4">
                  <h3 className="font-display font-semibold text-lg uppercase text-ink">Personal Profile</h3>
                  <p className="text-xs text-muted mt-1">Configure your personal information and default shipping details.</p>
                </div>

                <form className="space-y-8" onSubmit={handleSaveChanges}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-semibold text-ink/75 block">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z\s\-']/g, ""))}
                        placeholder="First Name"
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-semibold text-ink/75 block">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z\s\-']/g, ""))}
                        placeholder="Last Name"
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-semibold text-ink/75 block">Email Address (Read-only)</label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full bg-bg/50 border border-line rounded-xl px-4 py-3 text-xs tracking-wider text-muted select-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="border-t border-line/45 pt-6 space-y-6">
                    <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider">Default Shipping Address</h4>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-semibold text-ink/75 block">Street Address</label>
                        <input
                          type="text"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="123 Main St, Suite 4B"
                          className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-semibold text-ink/75 block">City</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="New York"
                            className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-semibold text-ink/75 block">State / Province</label>
                          <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="NY"
                            className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-semibold text-ink/75 block">Postal / ZIP Code</label>
                          <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ""))}
                            placeholder="10001"
                            className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {saveSuccess && (
                    <p className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg p-3 font-medium leading-normal tracking-wide">
                      {saveSuccess}
                    </p>
                  )}

                  {saveError && (
                    <p className="text-[11px] text-accent font-medium leading-relaxed tracking-wide">
                      {saveError}
                    </p>
                  )}

                  <div className="pt-2 flex items-center gap-4">
                    <SaveToggle
                      type="submit"
                      status={saveButtonStatus}
                      setStatus={setSaveButtonStatus}
                      idleText="Save Settings"
                      savedText="Saved"
                      disabled={isLoading}
                      className="cursor-pointer"
                    />
                  </div>
                </form>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-line pb-4">
                  <h3 className="font-display font-semibold text-lg uppercase text-ink">Delivery Addresses</h3>
                  <p className="text-xs text-muted mt-1">Manage physical locations for receiving orders.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {street ? (
                    <div className="border border-line rounded-xl p-5 bg-bg/50 relative hover:border-accent/40 transition-all">
                      <span className="text-[9px] bg-accent text-bg px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider absolute top-4 right-4">Default</span>
                      <h4 className="font-display font-semibold text-xs text-ink uppercase mb-3">Primary Residence</h4>
                      <p className="text-xs text-muted leading-relaxed">
                        {firstName || lastName ? `${firstName} ${lastName}` : "Valued Customer"} <br />
                        {street} <br />
                        {city}{state ? `, ${state}` : ""} {postalCode} <br />
                        {country}
                      </p>
                    </div>
                  ) : (
                    <div className="border border-dashed border-line rounded-xl p-5 text-center py-10 min-h-[140px] flex flex-col justify-center items-center">
                      <p className="text-xs text-muted mb-4 uppercase tracking-wider">No address registered</p>
                      <button
                        onClick={() => setActiveTab("profile")}
                        className="text-xs font-semibold text-accent uppercase tracking-widest hover:underline"
                      >
                        + Add Shipping Details
                      </button>
                    </div>
                  )}
                  {street && (
                    <div
                      onClick={() => setActiveTab("profile")}
                      className="border border-dashed border-line rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent transition-colors min-h-[140px]"
                    >
                      <span className="text-xs font-semibold text-accent uppercase tracking-widest">Edit Address Settings</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
