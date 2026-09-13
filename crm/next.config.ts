import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: "http://localhost:30005/:path*",
      },
    ];
  },
};

export default nextConfig;
