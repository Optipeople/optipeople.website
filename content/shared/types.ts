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
   * Which edge of the screenshot to hold on to in the 16/9 visual frame.
   * Defaults to the centre. Set "top" for captures that are close to square,
   * where a centred crop would cut the heading and the toolbar off.
   */
  visualImagePosition?: "top" | "center" | "bottom"
  /**
   * Draw the visual in code instead of shipping a screenshot, for modules
   * whose screen we have no usable capture of. Takes precedence over
   * `visualImage`. See components/module-mockups.tsx.
   */
  visualDrawn?: "documents" | "mes"
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
