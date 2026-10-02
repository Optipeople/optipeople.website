import type { MetadataRoute } from "next";
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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: namedCrawlers, allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
