import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-data";
import { absoluteUrl } from "@/lib/seo";
import { addLocalePrefix } from "@/lib/i18n";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/insights",
  "/newsletter",
  "/blog",
  "/cases",
  "/modules",
  "/solutions",
  "/features",
  "/services",
  "/services/smart-operations",
  "/services/automation",
  "/services/business-intelligence",
  "/services/ai-solutions",
  "/solutions/manufacturing",
  "/solutions/oems",
  "/solutions/service",
  "/modules/production",
  "/modules/maintenance",
  "/modules/quality",
  "/modules/analysis",
  "/modules/energy",
  "/modules/iot",
  "/modules/mes",
  "/modules/erp-shopfloor",
  "/features/production-efficiency",
  "/features/stop-cause-registration",
  "/features/maintenance-and-tasks",
  "/features/quality-management",
  "/features/analysis-and-reporting",
  "/features/energy-and-telemetry",
  "/features/ai-and-copilots",
  "/features/machine-control",
  "/resources/people",
  "/videos",
  "/get-help",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = staticRoutes.flatMap((route) => {
    const changeFrequency = route === "/" ? "weekly" : "monthly";
    const priority = route === "/" ? 1 : route.startsWith("/contact") ? 0.9 : 0.7;

    return [
      {
        url: absoluteUrl(addLocalePrefix(route, "en")),
        lastModified: now,
        changeFrequency,
        priority,
      },
      {
        url: absoluteUrl(addLocalePrefix(route, "da")),
        lastModified: now,
        changeFrequency,
        priority: Math.max(priority - 0.05, 0.5),
      },
    ];
  }) satisfies MetadataRoute.Sitemap;

  const blogEntries = getAllPosts()
    .filter((post) => post.category !== "Test")
    .flatMap((post) => {
      const priority = post.category === "Cases" ? 0.8 : 0.7;
      return [
        {
          url: absoluteUrl(`/blog/${post.slug}`),
          lastModified: new Date(post.date),
          changeFrequency: "monthly" as const,
          priority,
        },
        {
          url: absoluteUrl(addLocalePrefix(`/blog/${post.slug}`, "da")),
          lastModified: new Date(post.date),
          changeFrequency: "monthly" as const,
          priority: Math.max(priority - 0.05, 0.5),
        },
      ];
    });

  return [...staticEntries, ...blogEntries];
}
