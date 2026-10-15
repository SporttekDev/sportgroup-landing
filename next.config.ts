import type { NextConfig } from "next";

const cmsUrl = process.env.LARAVEL_API_URL
  ? new URL(process.env.LARAVEL_API_URL)
  : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: cmsUrl
      ? [
        {
          protocol: cmsUrl.protocol.replace(":", "") as "http" | "https",
          hostname: cmsUrl.hostname,
          port: cmsUrl.port,
          pathname: "/storage/**",
        },
      ]
      : [],
  },
};

export default nextConfig;