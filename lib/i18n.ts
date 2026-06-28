// Locale primitives are defined once in i18n/routing.ts (next-intl).
// This module re-exports them plus the path-prefix helpers still used by
// SEO/metadata (lib/seo.ts) and the sitemap (app/sitemap.ts).
import { defaultLocale, type Locale } from "@/i18n/routing"

export { locales, defaultLocale, type Locale } from "@/i18n/routing"

export const danishPrefix = "/da"

export function removeLocalePrefix(pathname: string) {
  if (pathname === danishPrefix) return "/"
  if (pathname.startsWith(`${danishPrefix}/`)) {
    return pathname.slice(danishPrefix.length) || "/"
  }

  return pathname || "/"
}

export function addLocalePrefix(pathname: string, locale: Locale) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  const unprefixed = removeLocalePrefix(normalized)

  if (locale === "da") {
    return unprefixed === "/" ? danishPrefix : `${danishPrefix}${unprefixed}`
  }

  return unprefixed
}

// Default locale kept for callers that need an explicit fallback.
export const fallbackLocale: Locale = defaultLocale
