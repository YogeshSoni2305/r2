import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allows loading images from any HTTPS domain (like ratnaasya.in)
      },
    ],
  },
};

export default nextConfig;
