import { agentDocsMarkdown, agentsMarkdown, mcpDocsMarkdown } from "@/lib/agent-docs"
import { features, featuresForModule, getFeature } from "@/content/pages/features"
import { getModule, modules } from "@/content/pages/modules"
import { getService, services } from "@/content/pages/services"
import { getSolution, solutions } from "@/content/pages/solutions"
import { getSimplePage } from "@/content/pages/simple"
import { moduleCatalog } from "@/content/modules-catalog"
import { aboutCopy, aboutTeam } from "@/content/pages/about"
import { casesCopy } from "@/content/pages/cases"
import { contactCopy, contactDetails, contactMetadata } from "@/content/pages/contact"
import { heroVariant, homeCopy, homeMetadata } from "@/content/pages/home"
import { platformCopy, platformMetadata } from "@/content/pages/platform"
import { optiAssistCopy } from "@/content/opti-assist"
import type { FeaturePage, LocalizedPage, SimplePage, StandardPage } from "@/content/shared/types"
import { aiCapabilities, aiStackSliderCopy, getAiCapability } from "@/lib/ai-stack"
import { getAllSlugs, getCaseStudies, getPostBySlug, type BlogPost } from "@/lib/blog-data"
import { generalEmail } from "@/lib/contact"
import { addLocalePrefix, type Locale } from "@/lib/i18n"
import { absoluteUrl } from "@/lib/seo"
import { pageName } from "@/lib/structured-data"
import en from "@/messages/en.json"
import da from "@/messages/da.json"

// Plain Markdown twins of the site's pages, for AI agents: /platform.md,
// /da/platform.md and so on (see app/md and the rewrites in next.config.ts).
// Every line is read from the same content objects the HTML templates
// render, through one converter per template rather than one per page, so a
// copy change shows up here the day it ships. Nothing is written here that
// the page itself does not say, apart from section labels.
// A new family of twins also needs adding to `markdownTwin` in lib/seo.ts,
// which decides which HTML pages advertise a twin.

const messages = { en, da }

type Item = { title: string; description?: string; href?: string }

// Each block below is a Markdown chunk; empty ones drop out when joined.
type Block = string | false | undefined

function join(blocks: Block[]) {
  return blocks.filter(Boolean).join("\n\n")
}

function heading(level: 2 | 3, text: string) {
  return `${"#".repeat(level)} ${text}`
}

function section(title: string | undefined, ...body: Block[]) {
  const content = join(body)
  if (!content) return ""
  return title ? join([heading(2, title), content]) : content
}

/** A site path made absolute in the reader's locale. */
function url(href: string, locale: Locale) {
  return /^https?:/.test(href) ? href : absoluteUrl(addLocalePrefix(href, locale))
}

function bullets(items: Item[], locale: Locale) {
  if (items.length === 0) return ""
  return items
    .map(({ title, description, href }) => {
      const name = href ? `[${title}](${url(href, locale)})` : `**${title}**`
      return description ? `- ${name}: ${description}` : `- ${name}`
    })
    .join("\n")
}

function numbered(items: { title: string; description: string }[]) {
  return items.map((step, i) => `${i + 1}. **${step.title}**: ${step.description}`).join("\n")
}

function metricList(items: { metric: string; label: string }[]) {
  return items.map(({ metric, label }) => `- **${metric}** ${label}`).join("\n")
}

function faqBlock(faq: StandardPage["faq"]) {
  if (!faq) return ""
  return section(
    faq.title,
    ...faq.items.map((item) => join([heading(3, item.question), item.answer])),
  )
}

function caseBlock(caseLink: StandardPage["caseLink"], locale: Locale) {
  if (!caseLink) return ""
  const label = messages[locale].pageTemplate.customerCase
  return section(
    `${label}: ${caseLink.customer}`,
    `**${caseLink.title}**`,
    caseLink.body,
    `[${messages[locale].pageTemplate.readCase}](${url(caseLink.href, locale)})`,
  )
}

/** The file around a page body: title, one-line summary, canonical URL. */
function document(title: string, summary: string, canonical: string, body: Block[]) {
  return `${join([`# ${title}`, `> ${summary.replace(/\s+/g, " ").trim()}`, `URL: ${canonical}`, ...body])}\n`
}

// One converter per template. The section order follows the template, so
// the Markdown reads the way the page does.

function standardMarkdown(page: StandardPage, href: string, locale: Locale, deepDives: Item[] = []) {
  const t = messages[locale].pageTemplate
  return document(pageName(page.metaTitle), page.metaDescription, url(href, locale), [
    section(page.heroTitle, page.heroBody),
    page.answer && section(page.answer.question, page.answer.body),
    section(page.metricsTitle, metricList(page.metrics)),
    section(page.introTitle, page.introBody),
    ...(page.answers ?? []).map((item) => section(item.title, item.body)),
    section(page.capabilitiesTitle, bullets(page.features, locale)),
    section(t.goDeeper, bullets(deepDives, locale)),
    section(page.stepsTitle, numbered(page.steps)),
    caseBlock(page.caseLink, locale),
    page.rollout &&
      section(
        page.rolloutTitle,
        page.rolloutIntro,
        page.explainer &&
          `${page.explainer.lead} [${page.explainer.anchor}](${url(page.explainer.href, locale)})${page.explainer.tail ?? ""}`,
        numbered(page.rollout),
      ),
    faqBlock(page.faq),
    section(page.visualTitle, page.visualBody),
  ])
}

function featureMarkdown(page: FeaturePage, href: string, locale: Locale) {
  const t = messages[locale].pageTemplate
  return document(pageName(page.metaTitle), page.metaDescription, url(href, locale), [
    `${page.parentLabel}: ${url(page.parentHref, locale)}`,
    section(page.heroTitle, page.heroBody),
    page.answer && section(page.answer.question, page.answer.body),
    section(t.typicalResults, metricList(page.metrics)),
    section(page.valueTitle, page.valueBody),
    section(page.capabilitiesTitle, page.capabilitiesBody, bullets(page.capabilities, locale)),
    caseBlock(page.caseLink, locale),
    page.showcaseTitle && section(page.showcaseTitle, page.showcaseBody),
    faqBlock(page.faq),
    section(t.relatedFeatures, bullets(page.related, locale)),
  ])
}

function simpleMarkdown(page: SimplePage, href: string, locale: Locale) {
  return document(pageName(page.metaTitle), page.metaDescription, url(href, locale), [
    section(page.headline, page.body),
    section(page.linksTitle, bullets(page.links, locale)),
    ...(page.sections ?? []).map((item) => section(item.title, item.body)),
    page.note,
  ])
}

function aiMarkdown(slug: string, locale: Locale) {
  const cap = getAiCapability(slug)
  if (!cap) return null
  const c = cap.content[locale]
  const canonical = url(cap.href, locale)
  const related = section(
    locale === "da" ? "Mere fra OptiPeople AI" : "More from OptiPeople AI",
    bullets(
      aiCapabilities
        .filter((other) => other.slug !== cap.slug)
        .map((other) => ({
          title: other.content[locale].cardTitle,
          description: other.content[locale].cardSubtitle,
          href: other.href,
        })),
      locale,
    ),
  )

  // Opti Assist has a page of its own that shows the app (see
  // components/ai-stack-page.tsx), with its copy in content/opti-assist.ts.
  if (slug === "chat") {
    const a = optiAssistCopy[locale]
    return document(pageName(c.metaTitle), c.metaDescription, canonical, [
      section(a.heroTitle, a.heroBody),
      section(a.howLabel, a.facts.map((fact) => `- ${fact}`).join("\n")),
      section(a.howTitle, numbered(a.steps.map((s) => ({ title: s.title, description: s.body })))),
      section(a.showcaseTitle, bullets(a.showcases.map((s) => ({ title: s.title, description: s.body })), locale)),
      section(a.setupTitle, a.setupBody, numbered(a.setup.map((s) => ({ title: s.title, description: s.body })))),
      section(c.ctaTitle, c.ctaBody),
      related,
    ])
  }

  return document(pageName(c.metaTitle), c.metaDescription, canonical, [
    section(c.heroTitle, c.heroBody),
    section(c.valueTitle, c.valueBody),
    section(c.capabilitiesTitle, bullets(c.capabilities, locale)),
    section(c.useCasesTitle, bullets(c.useCases, locale)),
    section(c.ctaTitle, c.ctaBody),
    related,
  ])
}

// Blog posts are Markdown already. Images go, and site-relative links become
// absolute so they still work outside the site.
function blogMarkdown(slug: string, locale: Locale) {
  const post = getPostBySlug(slug, locale)
  if (!post) return null
  // An untranslated post shows English prose under /da and is canonical to
  // the English page, as in the HTML page's metadata.
  const canonicalLocale = post.translatedLocales.includes(locale) ? locale : "en"
  const body = post.content
    .replace(/^\s*!\[[^\]]*\]\([^)]*\)\s*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\]\((\/[^)]*)\)/g, (_, href: string) => `](${absoluteUrl(href)})`)
    .replace(/\n{3,}/g, "\n\n")
    .trim()
  const byline = [post.author, post.date].filter(Boolean).join(", ")
  return document(post.title, post.summary, url(`/blog/${slug}`, canonicalLocale), [byline, body])
}

function caseItem(post: BlogPost): Item {
  const result = post.metric ? `${post.metric} ${post.metricLabel ?? ""}`.trim() : post.metricLabel
  const description = [post.customer, result, post.outcome].filter(Boolean).join(". ")
  return { title: post.title, description, href: `/blog/${post.slug}` }
}

// The hand-built pages. Their copy lives in content/pages/{home,platform,
// cases,about,contact}.ts; the parts drawn by components with copy of their
// own (the platform diagram, the product chapters, the stats) are left out.

function quote(text: string, cite: string) {
  return `> "${text}"
>
> ${cite}`
}

function homeMarkdown(locale: Locale) {
  const t = homeCopy[locale]
  const m = homeMetadata[locale]
  const hero = t.hero.variants[heroVariant]
  const ai = aiStackSliderCopy[locale]
  const modules = moduleCatalog.map((entry) => ({
    title: entry.label[locale],
    description: t.moduleSlides[entry.id]?.description ?? entry.blurb[locale],
    href: entry.href,
  }))
  const capabilities = aiCapabilities.map((cap) => ({
    title: cap.content[locale].cardTitle,
    description: cap.content[locale].cardSubtitle,
    href: cap.href,
  }))
  const cards = t.bento.caseCards.map((card) => ({
    title: `${card.company}, ${card.value} ${card.unit}`,
    description: card.note,
    href: `/blog/${card.slug}`,
  }))
  return document(pageName(m.title), m.description, url("/", locale), [
    section(hero.heading, hero.subheading),
    `${t.advisory.text} [${t.advisory.linkLabel}](${url(t.advisory.href, locale)})`,
    section(
      `${t.trust.heading} ${t.trust.headingSub}`,
      quote(t.trust.quote, t.trust.cite),
      `[${t.trust.storiesLabel}](${url("/cases", locale)})`,
    ),
    section(t.platform.title, t.platform.subtitle, bullets(modules, locale)),
    section(ai.title, ai.subtitle, bullets(capabilities, locale)),
    section(
      t.testimonialTitle,
      ...t.testimonials.map((v) =>
        quote(v.quote, [v.author, v.role, v.company].filter(Boolean).join(", ")),
      ),
    ),
    section(t.bento.title, t.bento.subtitle, bullets(cards, locale)),
  ])
}

function platformMarkdown(locale: Locale) {
  const t = platformCopy[locale]
  const m = platformMetadata[locale]
  return document(pageName(m.title), m.description, url("/platform", locale), [
    section(t.hero.title, t.hero.lede),
    section(t.proof.title, metricList(t.proof.items)),
    section(t.intro.title, t.intro.body),
    section(t.steps.title, numbered(t.steps.items)),
    section(t.modules.title, t.modules.subtitle, bullets(t.modules.cards, locale)),
    section(t.visual.title, t.visual.body),
  ])
}

function casesMarkdown(locale: Locale) {
  const t = casesCopy[locale]
  return document(pageName(t.metaTitle), t.metaDescription, url("/cases", locale), [
    section(t.title, t.subtitle, bullets(getCaseStudies(locale).map(caseItem), locale)),
  ])
}

function aboutMarkdown(locale: Locale) {
  const t = aboutCopy[locale]
  const team = aboutTeam.map((person) => ({ title: person.name, description: person.role }))
  return document(pageName(t.meta.title), t.meta.description, url("/about", locale), [
    section(t.title, t.intro),
    section(t.missionHeading, t.missionBody),
    section(t.valuesHeading, bullets(t.values, locale)),
    section(t.teamHeading, bullets(team, locale)),
    section(t.visual.title, t.visual.body),
  ])
}

function contactMarkdown(locale: Locale) {
  const t = contactCopy[locale]
  const m = contactMetadata[locale]
  const details = [
    { title: t.emailLabel, description: generalEmail(locale) },
    { title: t.phoneLabel, description: contactDetails.phone },
    { title: t.officeLabel, description: `${contactDetails.street}, ${t.officeLine2}` },
  ]
  return document(m.title, m.description, url("/contact", locale), [
    section(t.headline, t.body, bullets(details, locale)),
    section(t.stepsTitle, numbered(t.steps)),
  ])
}

// Routing: one table for the fixed paths, one for the slugged families.

const fixed: Record<string, (locale: Locale) => string> = {
  "/": homeMarkdown,
  "/platform": platformMarkdown,
  "/cases": casesMarkdown,
  "/about": aboutMarkdown,
  "/contact": contactMarkdown,
  "/agents": agentsMarkdown,
  "/docs/agents": agentDocsMarkdown,
  "/docs/mcp": mcpDocsMarkdown,
  ...Object.fromEntries(
    ["/modules", "/features", "/solutions", "/services"].map((path) => [
      path,
      (locale: Locale) => simpleMarkdown(getSimplePage(path, locale)!, path, locale),
    ]),
  ),
}

function standardFamily(get: (slug: string) => LocalizedPage<StandardPage> | undefined) {
  return (slug: string, locale: Locale) => {
    const entry = get(slug)
    return entry ? standardMarkdown(entry.content[locale], entry.href, locale) : null
  }
}

const families: Record<string, (slug: string, locale: Locale) => string | null> = {
  modules: (slug, locale) => {
    const entry = getModule(slug)
    if (!entry) return null
    // The module page links down to the feature deep-dives that name it.
    return standardMarkdown(entry.content[locale], entry.href, locale, featuresForModule(entry.href, locale))
  },
  features: (slug, locale) => {
    const entry = getFeature(slug)
    return entry ? featureMarkdown(entry.content[locale], entry.href, locale) : null
  },
  solutions: standardFamily(getSolution),
  services: standardFamily(getService),
  ai: aiMarkdown,
  blog: blogMarkdown,
}

/**
 * Markdown for a site path without locale prefix or ".md" ("/", "/platform",
 * "/modules/production"), or null when the path has no twin.
 */
export function pageMarkdown(path: string, locale: Locale): string | null {
  const normalized = `/${path.replace(/^\/+|\/+$/g, "")}`
  if (fixed[normalized]) return fixed[normalized](locale)
  const [, family, slug, ...rest] = normalized.split("/")
  if (!slug || rest.length > 0 || !families[family]) return null
  return families[family](slug, locale)
}

/** Every path with a Markdown twin, for static generation. */
export function markdownPaths(): string[] {
  const slugged = (prefix: string, slugs: string[]) => slugs.map((slug) => `/${prefix}/${slug}`)
  return [
    ...Object.keys(fixed),
    ...slugged("modules", modules.map((e) => e.slug)),
    ...slugged("features", features.map((e) => e.slug)),
    ...slugged("solutions", solutions.map((e) => e.slug)),
    ...slugged("services", services.map((e) => e.slug)),
    ...slugged("ai", aiCapabilities.map((e) => e.slug)),
    ...slugged("blog", getAllSlugs()),
  ]
}
