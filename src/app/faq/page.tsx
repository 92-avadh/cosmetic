import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

const faqs = [
  {
    q: "What makes BODYBARREL different from regular body wash?",
    a: "Traditional body washes strip the skin's natural lipid barrier with harsh sulfates. BODYBARREL uses biomimetic formulations — ingredients that mirror your skin's own lipid structure — to cleanse without damaging the protective barrier. Our formulas include wild marine PDRN, micro-ceramides, and amino acids at clinical concentrations.",
  },
  {
    q: "How does the lipid barrier repair mechanism work?",
    a: "Our body washes are infused with biocompatible lipids (ceramides, phytosterols, and free fatty acids) in a 3:1:1 ratio. During cleansing, rather than stripping the skin's defense shield, these micro-fragmented lipids fit into the gaps of the cellular matrix, reinforcing your skin's outer envelope.",
  },
  {
    q: "Why is pH 5.5 critical for body skin?",
    a: "Healthy skin maintains a slightly acidic pH (around 5.5) known as the acid mantle. Traditional alkaline soaps (pH 8-10) disrupt this mantle, making skin prone to dryness, flaking, and bacterial ingress. A pH of 5.5 ensures optimal enzyme activity for self-repair and hydration.",
  },
  {
    q: "Can the Exfoliating Wash be used every day?",
    a: "We recommend using the Dermal-Micro Exfoliating Wash 2-3 times per week. It contains natural fruit enzymes and microscopic marine minerals that lift dead cells. For daily cleansing on other days, alternate with the Bio-Fit or Aura-Glow washes to maintain barrier integrity.",
  },
  {
    q: "What makes BODYBARREL different from face cleansers?",
    a: "Body skin is significantly thicker than facial skin, has fewer sebaceous glands, and is subjected to constant friction from clothing. Our formulas are specifically adjusted with larger molecular surfactants that cleanse effectively without deep epidermal penetration, preventing systemic dryness.",
  },
  {
    q: "Which product should I choose for my skin type?",
    a: "Dry & Damaged skin: Aura-Glow or Bio-Fit. Sensitive & Reacting skin: Bio-Fit Unisex (pH 5.4, soothing centella extract). Thick/Oily dermis: Derm-Restore Men's (charcoal-depth cleansing). Uneven Texture: Dermal-Micro Exfoliating Wash (2-3x per week). Visit our Shop page for the full Skin Type Guide.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We ship to India, the United States, and South Korea. Shipping is complimentary on orders above $150 (or equivalent in your local currency). Standard delivery takes 5-10 business days depending on your location.",
  },
  {
    q: "What is your return policy?",
    a: "You may request a return within 30 days of receiving your order. Products must be unused, unopened, and in their original packaging. Contact us at info@bodybarrel.co with your order ID to initiate a return. See our full Return Policy for details.",
  },
  {
    q: "Are your products cruelty-free?",
    a: "Yes. All BODYBARREL products are 100% cruelty-free. We never test on animals, and our bio-synthesized actives are developed in clinical laboratories without animal-derived ingredients.",
  },
  {
    q: "How do I use the products for best results?",
    a: "Apply to wet skin, massage gently for 60 seconds to allow the lipid-infusing actives to penetrate, then rinse with lukewarm water (hot water strips lipids). For the Exfoliating Wash, massage for 90 seconds focusing on rough areas. Follow with your regular moisturizer while skin is still slightly damp.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about BODYBARREL's Korean cellular body wash formulas, ingredients, shipping, and returns.",
  openGraph: {
    title: "FAQ | BODYBARREL",
    description:
      "Answers to common questions about BODYBARREL's Korean cellular body wash formulas, ingredients, shipping, and returns.",
    url: `${SITE_URL}/faq`,
  },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent block mb-3">
            Support
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-muted mb-14 max-w-lg leading-relaxed">
            Everything you need to know about BODYBARREL's cellular body care science, formulations, and ordering.
          </p>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-line/40 py-7 last:border-b-0">
                <h3 className="font-display font-semibold text-sm tracking-wide uppercase text-ink flex gap-3 mb-3">
                  <span className="text-accent/60 font-mono">0{i + 1}</span>
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-line/40 text-center space-y-4">
            <p className="text-xs text-muted">Still have questions?</p>
            <a
              href="mailto:info@bodybarrel.co"
              className="inline-block px-8 py-3 text-ink border border-ink text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-ink hover:text-bg transition-colors duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
