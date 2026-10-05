import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { isIndexableDeploy, isIndexableHost } from "@/lib/indexing";
import { siteUrl } from "@/lib/seo";

const disallow = ["/admin/", "/api/"];

// AI assistants already send us visitors, so their crawlers are welcome by
// name rather than only through the wildcard. A crawler that finds a group
// with its own name ignores the "*" group, so each one carries the same
// disallow list.
const namedCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Google-Extended",
  "Bingbot",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");

  // Previews and *.vercel.app aliases: keep every crawler out.
  if (!isIndexableDeploy || !isIndexableHost(host)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      { userAgent: namedCrawlers, allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
