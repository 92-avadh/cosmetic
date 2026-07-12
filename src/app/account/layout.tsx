import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: "My Account",
  description:
    "Manage your BODYBARREL account — view order history, update your skin regimen, edit profile information, and manage shipping addresses.",
  openGraph: {
    title: "My Account | BODYBARREL",
    description:
      "Manage your BODYBARREL account — view order history, update your skin regimen, edit profile information, and manage shipping addresses.",
    url: `${SITE_URL}/account`,
  },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
