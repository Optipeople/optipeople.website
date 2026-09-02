import type { LucideIcon } from "lucide-react"
import type { Locale } from "@/i18n/routing"

export type Metric = {
  metric: string
  label: string
}

export type IconCard = {
  icon: LucideIcon
  title: string
  description: string
}

export type Step = {
  title: string
  description: string
}

export type Capability = {
  title: string
  description: string
  image: string
  imageAlt: string
}

export type RelatedLink = {
  title: string
  description: string
  href: string
}

/** "Standard" marketing page, modules, services, solutions. */
export type StandardPage = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  heroTitle: string
  heroBody: string
  primaryLabel?: string
  introTitle: string
  introBody: string
  capabilitiesTitle: string
  features: IconCard[]
  visualTitle: string
  visualBody: string
  visualImage?: string
  visualAlt?: string
  /**
   * Draw the visual in code instead of shipping a screenshot, for modules
   * whose screen we have no usable capture of, or whose capture is a poor
   * ambassador for it. Takes precedence over `visualImage`.
   * See components/module-mockups.tsx.
   */
  visualDrawn?: "documents" | "mes" | "oee" | "routes"
  /**
   * Replace the closing deep-surface visual band with a section of its own.
   * "architecture" renders <PlatformArchitecture>, which is the honest answer
   * to "show me the picture" on the IoT page: there, the diagram *is* the
   * product view. Takes precedence over `visualDrawn` and `visualImage`.
   */
  visualSection?: "architecture"
  metricsTitle: string
  metrics: Metric[]
  stepsTitle: string
  steps: Step[]
  darkHero?: boolean
}

/** Feature deep-dive page, alternating image/text capabilities. */
export type FeaturePage = {
  metaTitle: string
  metaDescription: string
  parentLabel: string
  parentHref: string
  eyebrow: string
  heroTitle: string
  heroBody: string
  heroImage: string
  heroImageAlt: string
  valueTitle: string
  valueBody: string
  capabilitiesTitle: string
  capabilitiesBody: string
  capabilities: Capability[]
  showcaseTitle?: string
  showcaseBody?: string
  showcaseImage?: string
  showcaseAlt?: string
  /**
   * Draw the showcase panel in code instead of shipping a screenshot. Takes
   * precedence over `showcaseImage`. See components/module-mockups.tsx.
   */
  showcaseDrawn?: "routes"
  metrics: Metric[]
  related: RelatedLink[]
}

/** Simple landing / index page, eyebrow, headline, body, link grid. */
export type SimplePage = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  headline: string
  body: string
  links: RelatedLink[]
  /** Heading rendered above the link grid. */
  linksTitle?: string
  /** Prose sections rendered below the link grid. */
  sections?: { title: string; body: string }[]
  note?: string
}

/** A page available in both locales, addressable by slug. */
export type LocalizedPage<T> = {
  slug: string
  /** Unprefixed canonical path (e.g. "/modules/production"). */
  href: string
  content: Record<Locale, T>
}

export function buildLookup<T>(entries: LocalizedPage<T>[]) {
  const bySlug = new Map(entries.map((e) => [e.slug, e]))
  return {
    slugs: entries.map((e) => e.slug),
    get: (slug: string) => bySlug.get(slug),
  }
}
