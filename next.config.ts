import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
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
