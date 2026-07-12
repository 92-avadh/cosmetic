import type { Metadata } from "next";
import SciencePageClient from "./SciencePageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: "The Science",
  description:
    "Deep dive into BODYBARREL's cellular body restoration science. Clinical studies, biome ingredients, and biomimetic formulation methodology.",
  openGraph: {
    title: "The Science | BODYBARREL",
    description:
      "Deep dive into BODYBARREL's cellular body restoration science. Clinical studies, biome ingredients, and biomimetic formulation methodology.",
    url: `${SITE_URL}/science`,
    images: [{ url: "/products/science-hero.png", width: 1200, height: 630, alt: "BODYBARREL Science" }],
  },
};

export default function SciencePage() {
  return <SciencePageClient />;
}
