import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your BODYBARREL order — enter shipping details, apply promo codes, and pay securely via Razorpay or Stripe.",
  openGraph: {
    title: "Checkout | BODYBARREL",
    description:
      "Complete your BODYBARREL order — enter shipping details, apply promo codes, and pay securely via Razorpay or Stripe.",
    url: `${SITE_URL}/checkout`,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
