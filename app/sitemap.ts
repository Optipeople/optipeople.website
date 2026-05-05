import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-data";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/insights",
  "/blog",
  "/cases",
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/contact") ? 0.9 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const blogEntries = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: post.category === "Cases" ? 0.8 : 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
