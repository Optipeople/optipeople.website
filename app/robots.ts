import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { isIndexableDeploy, isIndexableHost } from "@/lib/indexing";
import { siteUrl } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");

  // Previews and *.vercel.app aliases: keep every crawler out.
  if (!isIndexableDeploy || !isIndexableHost(host)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
