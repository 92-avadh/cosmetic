import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["pg", "@prisma/adapter-pg", "nodemailer"],
};

export default nextConfig;
