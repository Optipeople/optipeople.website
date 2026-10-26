import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import {
  isIndexableDeploy,
  noindexHeader,
  vercelAppHostPattern,
} from "./lib/indexing";

import { legacyRedirects } from "./lib/legacy-redirects";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Next's own slash redirect runs before every other rule, so an old
  // WordPress URL like /jbs/ would take two hops (/jbs/ -> /jbs -> /blog/jbs).
  // With it off, the legacy sources match the slash themselves and proxy.ts
  // strips it everywhere else.
  skipTrailingSlashRedirect: true,
  experimental: {
    // Tailwind ships one stylesheet for the whole site. Inlined, it arrives
    // with the HTML instead of as a render-blocking request, which was most
    // of the mobile PageSpeed FCP and LCP.
    inlineCss: true,
  },
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
  async headers() {
    // Previews never get indexed, and neither does any *.vercel.app alias,
    // including the production deploy's own one.
    return [
      ...(isIndexableDeploy
        ? []
        : [{ source: "/:path*", headers: [noindexHeader] }]),
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: vercelAppHostPattern }],
        headers: [noindexHeader],
      },
    ];
  },
  async redirects() {
    return [
      // Removed from the site: the Danpres case and the Ligna 2025 post.
      {
        source: "/blog/danpres-boosting-production-by-reducing-tool-repair-time-by-50",
        destination: "/cases",
        permanent: true,
      },
      {
        source: "/da/blog/danpres-boosting-production-by-reducing-tool-repair-time-by-50",
        destination: "/da/cases",
        permanent: true,
      },
      {
        source: "/blog/ligna-2025",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/da/blog/ligna-2025",
        destination: "/da/blog",
        permanent: true,
      },
      // Analysis is no longer one of the nine modules; its reporting now
      // belongs with OEE.
      {
        source: "/modules/analysis",
        destination: "/modules/production",
        permanent: true,
      },
      {
        source: "/da/modules/analysis",
        destination: "/da/modules/production",
        permanent: true,
      },
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
      ...legacyRedirects,
      // No slash-stripping rule here. On Vercel such a rule ran before the
      // legacy rules above, so /jbs/ took two hops (/jbs/ -> /jbs -> /blog/jbs).
      // proxy.ts strips the slash instead, in the same hop as any legacy match.
    ];
  },
};

export default withNextIntl(nextConfig);
