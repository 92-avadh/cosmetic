import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your BODYBARREL shopping cart — adjust quantities, apply promo codes, and proceed to secure checkout.",
  openGraph: {
    title: "Cart | BODYBARREL",
    description:
      "Review your BODYBARREL shopping cart — adjust quantities, apply promo codes, and proceed to secure checkout.",
    url: `${SITE_URL}/cart`,
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
