import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@rapid-prototyping-bo/api-client"]
};

export default nextConfig;
