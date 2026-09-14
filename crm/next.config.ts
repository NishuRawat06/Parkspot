import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: "https://parkspot-67fo.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
