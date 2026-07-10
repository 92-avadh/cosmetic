import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScroll";
import CartSync from "@/components/CartSync";
import CartDrawer from "@/components/CartDrawer";


export const metadata: Metadata = {
  title: "BODYBARREL — Korean Skincare Science",
  description:
    "Korean skincare formulas engineered for ultimate skin fitness. Advanced PDRN science developed in collaboration with Korean skin scientists.",
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
