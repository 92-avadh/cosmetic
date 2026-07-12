import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: "Order Tracking",
  description:
    "Track your BODYBARREL order status, view transit history, delivery details, and get real-time shipping updates.",
  openGraph: {
    title: "Order Tracking | BODYBARREL",
    description:
      "Track your BODYBARREL order status, view transit history, delivery details, and get real-time shipping updates.",
    url: `${SITE_URL}/orders`,
  },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
