import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScroll";
import CartSync from "@/components/CartSync";
import CartDrawer from "@/components/CartDrawer";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: {
    default: "BODYBARREL — Korean Skincare Science",
    template: "%s | BODYBARREL",
  },
  description:
    "Korean skincare formulas engineered for ultimate skin fitness. Advanced PDRN science developed in collaboration with Korean skin scientists.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BODYBARREL",
    title: "BODYBARREL — Korean Skincare Science",
    description:
      "Korean skincare formulas engineered for ultimate skin fitness. Advanced PDRN science developed in collaboration with Korean skin scientists.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "BODYBARREL Korean Skincare" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BODYBARREL — Korean Skincare Science",
    description:
      "Korean skincare formulas engineered for ultimate skin fitness.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="antialiased selection:bg-accent selection:text-bg"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg text-ink font-body min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <CartSync />
          <CartDrawer />

          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
