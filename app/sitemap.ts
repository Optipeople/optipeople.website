import type { MetadataRoute } from "next";
import { featureSlugs } from "@/content/pages/features";
import { moduleSlugs } from "@/content/pages/modules";
import { serviceSlugs } from "@/content/pages/services";
import { solutionSlugs } from "@/content/pages/solutions";
import { aiCapabilitySlugs } from "@/lib/ai-stack";
import { getAllPosts } from "@/lib/blog-data";
import { absoluteUrl } from "@/lib/seo";
import { addLocalePrefix } from "@/lib/i18n";

// Hand-listed pages: the hubs, the indexes, and the singletons. Every [slug]
// route is derived from its content catalog below, so a new module, feature,
// service, solution, or AI page is indexed the day it ships rather than when
// someone remembers to add it here.
const singleRoutes = [
  "/",
  "/about",
  "/contact",
  "/platform",
  "/insights",
  "/newsletter",
  "/blog",
  "/cases",
  "/videos",
  "/resources/people",
  "/get-help",
  "/modules",
  "/features",
  "/services",
  "/solutions",
  "/privacy",
  "/terms",
];

const staticRoutes = [
  ...singleRoutes,
  ...moduleSlugs.map((slug) => `/modules/${slug}`),
  ...featureSlugs.map((slug) => `/features/${slug}`),
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  ...solutionSlugs.map((slug) => `/solutions/${slug}`),
  ...aiCapabilitySlugs.map((slug) => `/ai/${slug}`),
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
