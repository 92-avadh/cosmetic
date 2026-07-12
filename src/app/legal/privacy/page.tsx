import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "BODYBARREL privacy policy detailing how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent block mb-3">
            Legal
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">
            Privacy Policy
          </h1>
          <p className="text-[11px] text-muted mb-8">Last updated: July 2026</p>

          <div className="space-y-8 text-sm text-muted leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">1. Information We Collect</h2>
              <p>We collect information you provide directly: name, email address, shipping address, phone number, and payment information. We also collect automatically generated data such as IP address, browser type, and browsing behavior on our site.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">2. How We Use Your Information</h2>
              <p>Your information is used to process orders, communicate order updates, improve our products and services, send marketing communications (with your consent), and comply with legal obligations.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">3. Data Sharing</h2>
              <p>We do not sell your personal information. We share data only with trusted service providers (payment processors, shipping carriers) strictly necessary to fulfill orders. All providers are contractually obligated to protect your data.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">4. Data Security</h2>
              <p>We implement industry-standard security measures including SSL encryption, secure database storage, and access controls. However, no method of transmission over the Internet is 100% secure.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">5. Cookies</h2>
              <p>We use essential cookies to maintain session state and improve site functionality. You can control cookie preferences through your browser settings.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at info@bodybarrel.co. We will respond to requests within 30 days.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-semibold text-base uppercase text-ink">7. Contact</h2>
              <p>For privacy-related inquiries, contact us at info@bodybarrel.co.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
