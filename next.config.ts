import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // AVIF first. On the product screenshots, WebP at quality 75 smears the
    // 1px rules and small type; AVIF holds them at the same quality setting
    // and lands smaller (66 KB vs 77 KB on the OEE report mockup).
    formats: ["image/avif", "image/webp"],
    // 1140 is the content column (see --edge in globals.css). Without it the
    // default ladder jumps 1080 -> 1200, so a 1:1 display width instead gets
    // a 1200px file squeezed to 1140. That near-unity rescale is what made
    // full-width images look soft: every source pixel lands between two
    // destination pixels and gets averaged with its neighbour.
    deviceSizes: [640, 750, 828, 1080, 1140, 1200, 1920, 2048, 3840],
  },
  async redirects() {
    return [
      {
        source: "/people",
        destination: "/resources/people",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/resources/people",
        permanent: true,
      },
      {
        source: "/da/resources",
        destination: "/da/resources/people",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
