import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScroll";
import CartSync from "@/components/CartSync";
import CartDrawer from "@/components/CartDrawer";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: {
    default: "BODYBARREL — Body Wash Science",
    template: "%s | BODYBARREL",
  },
  description:
    "Advanced body wash formulations engineered for whole-body skin fitness. Wild marine PDRN, micro-ceramides, and biomimetic lipids.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BODYBARREL",
    title: "BODYBARREL — Body Wash Science",
    description:
      "Advanced body wash formulations engineered for whole-body skin fitness. Wild marine PDRN, micro-ceramides, and biomimetic lipids.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "BODYBARREL Body Wash" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BODYBARREL — Body Wash Science",
    description:
      "Advanced body wash formulations engineered for whole-body skin fitness.",
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
