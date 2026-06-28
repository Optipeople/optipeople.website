import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "da"],
  defaultLocale: "en",
  // English stays unprefixed (/modules/production); Danish is served under /da.
  localePrefix: "as-needed",
})

export type Locale = (typeof routing.locales)[number]

export const locales = routing.locales
export const defaultLocale = routing.defaultLocale
