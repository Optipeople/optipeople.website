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

/**
 * The buyer-search block: a short answer to "what is X" that sits right under
 * the hero, so a search snippet or an AI answer can quote it whole. Keep the
 * body to 40 to 60 words.
 */
export type AnswerBlock = {
  question: string
  body: string
}

/** A customer case the page points to, a post under /blog. */
export type CaseLink = {
  customer: string
  title: string
  body: string
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
  /** Answer-first prose blocks (a question as title) rendered under the intro. */
  answers?: { title: string; body: string }[]
  /** A numbered, longer rollout plan rendered after the steps. */
  rolloutTitle?: string
  rolloutIntro?: string
  rollout?: Step[]
  /** Blog explainer the page links to, with the search query as anchor. */
  explainer?: { lead: string; anchor: string; href: string; tail?: string }
  metricsTitle: string
  metrics: Metric[]
  stepsTitle: string
  steps: Step[]
  faq?: PageFaq
  darkHero?: boolean
  /** Answer-first block under the hero. See AnswerBlock. */
  answer?: AnswerBlock
  /** A customer case, shown after the capabilities. */
  caseLink?: CaseLink
}

/**
 * Questions a buyer asks, answered on the page. Rendered as a definition list
 * and emitted as FAQPage structured data, so each answer has to stand on its
 * own and match the visible text.
 */
export type PageFaq = {
  title: string
  items: { question: string; answer: string }[]
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
  faq?: PageFaq
  /** Answer-first block under the hero. See AnswerBlock. */
  answer?: AnswerBlock
  /** A customer case, shown after the capabilities. */
  caseLink?: CaseLink
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

/**
 * OptiPeople set against one competitor, row by row on what a buyer asks.
 * Every competitor statement carries the numbers of the sources it came
 * from, and `checked` says when those public pages were last read, so a
 * claim can be traced and re-checked rather than taken on trust.
 */
export type ComparisonPage = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  heroTitle: string
  /** Answers "which one should I pick" in the first 40 to 60 words. */
  heroBody: string
  competitor: string
  /** e.g. "Competitor facts checked 26 October 2026 on their public pages." */
  checked: string
  tableTitle: string
  topicLabel: string
  rows: {
    topic: string
    us: string
    them: string
    /** 1-based indexes into `sources`. */
    sources?: number[]
  }[]
  strongerTitle: string
  stronger: { title: string; description: string }[]
  oursTitle: string
  ours: { title: string; description: string }[]
  chooseTitle: string
  chooseThem: string
  chooseUs: string
  sourcesTitle: string
  sourcesNote: string
  sources: { label: string; href: string }[]
  faq: PageFaq
}
