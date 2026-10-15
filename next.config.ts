import type { NextConfig } from "next";

// Sementara: hanya mencetak ada atau tidaknya nilai, bukan isinya.
console.log("[env-check]", {
  VERCEL_ENV: process.env.VERCEL_ENV,
  LARAVEL_API_URL: Boolean(process.env.LARAVEL_API_URL),
  LARAVEL_API_KEY: Boolean(process.env.LARAVEL_API_KEY),
  LARAVEL_COMPANY_DOMAIN: Boolean(process.env.LARAVEL_COMPANY_DOMAIN),
});

// Host gambar CMS diambil dari LARAVEL_API_URL, jadi tidak ada domain
// yang ditulis keras. Hanya path /storage/** dari CMS yang diizinkan.
// Next memuat .env.local sebelum file ini dibaca.
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