import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bodybarrel.com";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your BODYBARREL account with email OTP verification to access order history, saved addresses, and skin regimen tracking.",
  openGraph: {
    title: "Login | BODYBARREL",
    description:
      "Sign in to your BODYBARREL account with email OTP verification to access order history, saved addresses, and skin regimen tracking.",
    url: `${SITE_URL}/login`,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
