import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = { reactStrictMode: true };

// Makes Cloudflare bindings available while using `next dev`, without starting
// the local Cloudflare runtime during a production build.
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

export default nextConfig;
