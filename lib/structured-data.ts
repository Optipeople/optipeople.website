import { addLocalePrefix, type Locale } from "@/lib/i18n"
import { generalEmail } from "@/lib/contact"
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo"

/**
 * Schema.org JSON-LD for search and answer engines.
 *
 * Every page renders its blocks through <JsonLd> (components/json-ld.tsx).
 * The builders here keep the markup consistent: one Organization with a stable
 * @id that everything else points at, localized absolute URLs, and the page's
 * locale as inLanguage. Names and descriptions come from the same copy the page
 * renders, so the markup never claims something the visitor cannot read.
 */

type Schema = Record<string, unknown>

const CONTEXT = "https://schema.org"
const ORGANIZATION_ID = `${siteUrl}/#organization`
const WEBSITE_ID = `${siteUrl}/#website`
const PLATFORM_ID = `${siteUrl}/platform#software`

export const PLATFORM_NAME = "OptiPeople Data Platform"

/** The byline blog posts carry when no single person wrote them. */
const TEAM_AUTHOR = "OptiPeople Team"

// Matches the footer (components/site-footer.tsx) and the contact page.
const ORGANIZATION = {
  legalName: "OptiPeople ApS",
  vatID: "DK32883532",
  telephone: "+45 23 74 47 05",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sønderskovvej 17",
    postalCode: "8362",
    addressLocality: "Hørning",
    addressCountry: "DK",
  },
  sameAs: [
    "https://www.linkedin.com/company/optipeople-aps/",
    // The channel the videos on /videos are published on.
    "https://www.youtube.com/@optipeople-official",
  ],
}

const homeLabel: Record<Locale, string> = { en: "Home", da: "Forside" }

export function localizedUrl(path: string, locale: Locale) {
  return absoluteUrl(addLocalePrefix(path, locale))
}

/** "OEE Module | OptiPeople" → "OEE Module", for breadcrumb and product names. */
export function pageName(metaTitle: string) {
  return metaTitle.split(" | ")[0].trim()
}

export function organizationSchema(locale: Locale): Schema {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteName,
    legalName: ORGANIZATION.legalName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/logos/optipeople-logo.png"),
      width: 1200,
      height: 300,
    },
    email: generalEmail(locale),
    telephone: ORGANIZATION.telephone,
    vatID: ORGANIZATION.vatID,
    address: ORGANIZATION.address,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: generalEmail(locale),
      telephone: ORGANIZATION.telephone,
      areaServed: "DK",
      availableLanguage: ["Danish", "English"],
    },
    sameAs: ORGANIZATION.sameAs,
  }
}

export function websiteSchema(locale: Locale): Schema {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteName,
    url: siteUrl,
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
  }
}

export type Crumb = { name: string; path: string }

/**
 * Home is prepended, so callers list only the trail below it, ending with the
 * current page.
 */
export function breadcrumbSchema(locale: Locale, crumbs: Crumb[]): Schema {
  const trail = [{ name: homeLabel[locale], path: "/" }, ...crumbs]
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: localizedUrl(crumb.path, locale),
    })),
  }
}

type SoftwareOptions = {
  name: string
  description: string
  path: string
  locale: Locale
}

/** The platform itself, on /platform. Modules point back at it. */
export function platformSchema({ description, locale }: Omit<SoftwareOptions, "name" | "path">) {
  return softwareSchema({ name: PLATFORM_NAME, description, path: "/platform", locale }, PLATFORM_ID)
}

/** A module page: a SoftwareApplication that is part of the platform. */
export function moduleSchema(options: SoftwareOptions): Schema {
  return {
    ...softwareSchema(options),
    isPartOf: { "@id": PLATFORM_ID },
  }
}

function softwareSchema(
  { name, description, path, locale }: SoftwareOptions,
  id?: string,
): Schema {
  return {
    "@context": CONTEXT,
    "@type": "SoftwareApplication",
    ...(id ? { "@id": id } : {}),
    name,
    description,
    url: localizedUrl(path, locale),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
  }
}

export type FaqEntry = { question: string; answer: string }

export function faqSchema(locale: Locale, path: string, entries: FaqEntry[]): Schema {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    url: localizedUrl(path, locale),
    inLanguage: locale,
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  }
}

type ArticleOptions = {
  type: "Article" | "BlogPosting"
  headline: string
  description: string
  path: string
  locale: Locale
  /** The language the prose is written in, which differs on a fallback. */
  inLanguage: Locale
  datePublished: string
  dateModified?: string
  author: string
  section: string
  image?: string
}

export function articleSchema(options: ArticleOptions): Schema {
  const url = localizedUrl(options.path, options.locale)
  const author =
    options.author && options.author !== TEAM_AUTHOR
      ? { "@type": "Person", name: options.author, worksFor: { "@id": ORGANIZATION_ID } }
      : { "@id": ORGANIZATION_ID }

  return {
    "@context": CONTEXT,
    "@type": options.type,
    headline: options.headline,
    description: options.description,
    url,
    mainEntityOfPage: url,
    inLanguage: options.inLanguage,
    datePublished: toIsoDate(options.datePublished),
    dateModified: toIsoDate(options.dateModified || options.datePublished),
    author,
    publisher: { "@id": ORGANIZATION_ID },
    articleSection: options.section,
    ...(options.image ? { image: [absoluteUrl(options.image)] } : {}),
  }
}

function toIsoDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toISOString()
}

const FAQ_HEADING = /^(faq|frequently asked questions|ofte stillede spørgsmål|spørgsmål og svar)$/i

/**
 * A post's question-and-answer section: an H2 headed FAQ (or the Danish
 * equivalent) with each question as an H3 and its answer as the text below it.
 * Returns an empty list when the post has no such section.
 */
export function extractFaq(markdown: string): FaqEntry[] {
  const lines = markdown.split(/\r?\n/)
  const entries: FaqEntry[] = []
  let inFaq = false
  let current: { question: string; answer: string[] } | undefined

  const flush = () => {
    const answer = plainText(current?.answer.join(" ") ?? "")
    if (current && answer) entries.push({ question: current.question, answer })
    current = undefined
  }

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*#*$/)
    if (h2) {
      flush()
      inFaq = FAQ_HEADING.test(h2[1].trim())
      continue
    }
    if (!inFaq) continue
    const h3 = line.match(/^###\s+(.+?)\s*#*$/)
    if (h3) {
      flush()
      current = { question: plainText(h3[1]), answer: [] }
    } else if (current) {
      current.answer.push(line)
    }
  }
  flush()
  return entries
}

function plainText(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/^\s*[-+>]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim()
}
