"use client";

import { useAdminContext } from "../context";
import { Clock, Mail } from "lucide-react";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";

export default function AdminCartsPage() {
  const { abandonedCarts, handleSimulateRecoveryEmail } = useAdminContext();
  const { currency } = useCartStore();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-line pb-4 text-left">
        <h3 className="font-display font-semibold text-base uppercase text-ink">Abandoned Carts Tracker</h3>
        <p className="text-[11px] text-muted mt-0.5">
          Monitor clients who have registered items in their bag but failed to complete checkout.
        </p>
      </div>

      {abandonedCarts.length > 0 ? (
        <div className="space-y-4">
          {abandonedCarts.map((cart) => (
            <div key={cart.id} className="border border-line rounded-xl p-5 bg-bg/50 hover:border-accent/30 transition-all space-y-4 text-left">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] border-b border-line/45 pb-3 gap-2 uppercase tracking-wider font-semibold">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-muted">Last Active:</span>
                  <span className="text-ink">{new Date(cart.updatedAt).toLocaleString()}</span>
                </div>
                <span className="text-[8.5px] bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded font-bold uppercase tracking-widest w-fit">
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
                          <img src={item.image} alt={item.name} width={28} height={32} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-ink">{item.name}</span>
                          <span className="text-muted block text-[8px] tracking-normal lowercase">{item.subtitle}</span>
                        </div>
                      </div>
                      <div className="flex gap-8 items-baseline">
                        <span>Qty: {item.quantity}</span>
                        <span className="font-bold text-ink">
                          {CURRENCY_SYMBOLS[currency]}
                          {(item.priceUSD * item.quantity * CURRENCY_RATES[currency]).toLocaleString(undefined, {
                            minimumFractionDigits: currency === "KRW" ? 0 : 2,
                            maximumFractionDigits: currency === "KRW" ? 0 : 2,
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-line/30 pt-3 flex justify-between items-baseline">
                <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">Total Cart Cargo Value</span>
                <span className="text-sm font-bold text-accent">
                  {CURRENCY_SYMBOLS[currency]}
                  {(cart.totalUSD * CURRENCY_RATES[currency]).toLocaleString(undefined, {
                    minimumFractionDigits: currency === "KRW" ? 0 : 2,
                    maximumFractionDigits: currency === "KRW" ? 0 : 2,
                  })}
                </span>
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
  );
}
