import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "BODYBARREL terms and conditions governing the use of our website and purchase of products.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent block mb-3">
            Legal
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">
            Terms & Conditions
          </h1>
          <p className="text-[11px] text-muted mb-8">Last updated: July 2026</p>

          <div className="space-y-8 text-sm text-muted leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">1. Acceptance of Terms</h2>
              <p>By accessing or using the BODYBARREL website (bodybarrel.com), you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the site.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">2. Products & Pricing</h2>
              <p>All product descriptions, images, and specifications are provided for informational purposes. Prices are listed in the selected currency and are subject to change without notice. We reserve the right to limit order quantities.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">3. Orders & Payment</h2>
              <p>Placing an order constitutes an offer to purchase. We may accept or decline any order at our discretion. Payment is processed through our secure payment partners (Razorpay, Stripe). All transactions are encrypted and secured.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">4. Shipping & Delivery</h2>
              <p>Estimated delivery times are provided for reference and are not guaranteed. BODYBARREL is not responsible for delays caused by customs, carrier issues, or events beyond our control. Risk of loss transfers to you upon delivery to the carrier.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">5. Intellectual Property</h2>
              <p>All content on this website — including text, graphics, logos, images, and software — is the property of BODYBARREL and is protected by applicable intellectual property laws. Reproduction or distribution without written consent is prohibited.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">6. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, BODYBARREL shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability shall not exceed the purchase price of the product.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">7. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, India.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
