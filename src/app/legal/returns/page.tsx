import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "BODYBARREL return and refund policy for orders placed through our website.",
};

export default function ReturnsPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent block mb-3">
            Legal
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">
            Return & Refund Policy
          </h1>
          <p className="text-[11px] text-muted mb-8">Last updated: July 2026</p>

          <div className="space-y-8 text-sm text-muted leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">1. Eligibility</h2>
              <p>You may request a return within 30 days of receiving your order. Products must be unused, unopened, and in their original packaging. Opened or used products are not eligible for return due to hygiene and safety standards.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">2. How to Initiate a Return</h2>
              <p>Contact our support team at info@bodybarrel.co with your order ID and reason for return. We will provide a return authorization and shipping instructions within 2 business days.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">3. Refund Processing</h2>
              <p>Once we receive and inspect the returned item, your refund will be processed within 5-7 business days. Refunds are issued to the original payment method. Shipping costs are non-refundable unless the return is due to our error.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">4. Damaged or Defective Products</h2>
              <p>If you receive a damaged or defective product, contact us within 7 days of delivery with photographic evidence. We will arrange a replacement or full refund at no additional cost to you.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">5. Exchanges</h2>
              <p>We do not offer direct exchanges. If you wish to exchange a product, please initiate a return and place a new order for the desired item.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">6. Contact</h2>
              <p>For return or refund inquiries, reach us at info@bodybarrel.co with your order reference number.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
