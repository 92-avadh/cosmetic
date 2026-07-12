import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse BODYBARREL's collection of Korean cellular body washes formulated with PDRN, micro-ceramides, and biomimetic lipids for every skin type.",
  openGraph: {
    title: "Shop | BODYBARREL",
    description:
      "Browse BODYBARREL's collection of Korean cellular body washes formulated with PDRN, micro-ceramides, and biomimetic lipids for every skin type.",
    url: `${SITE_URL}/shop`,
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
