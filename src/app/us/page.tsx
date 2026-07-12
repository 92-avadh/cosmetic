import type { Metadata } from "next";
import UsPageClient from "./UsPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BODYBARREL's genesis, clinical advisory board, and green-tech cold extraction philosophy. Korean skincare science for whole-body skin fitness.",
  openGraph: {
    title: "About Us | BODYBARREL",
    description:
      "BODYBARREL's genesis, clinical advisory board, and green-tech cold extraction philosophy.",
    url: `${SITE_URL}/us`,
    images: [{ url: "/products/us-narrative.png", width: 1200, height: 630, alt: "BODYBARREL About Us" }],
  },
};

export default function UsPage() {
  return <UsPageClient />;
}
