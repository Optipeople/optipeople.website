import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { defaultLocale, locales, type Locale } from "@/i18n/routing"

export type BlogPost = {
  slug: string
  title: string
  content: string
  date: string
  author: string
  category: string
  image?: string
  summary: string
  /** Locale this post's prose is actually written in, after fallback. */
  contentLocale: Locale
  /** Case-study fields (optional, used by the Cases showcase) */
  customer?: string
  metric?: string
  metricLabel?: string
  logo?: string
  quote?: string
  outcome?: string
}

const postsDirectory = path.join(process.cwd(), "content/blog")
const publicDirectory = path.join(process.cwd(), "public")

/**
 * Translations live beside the English source as `<slug>.<locale>.md`, so
 * `dansk-traeemballage-….md` and `dansk-traeemballage-….da.md` are the same
 * story in two languages under one slug and one URL path.
 *
 * English is the canonical set: it decides which slugs exist, and a locale
 * with no file of its own falls back to it. A missing translation therefore
 * shows the English article rather than a 404.
 */
const translationSuffixes = locales.map((locale) => `.${locale}.md`)

function isTranslationFile(fileName: string) {
  return translationSuffixes.some((suffix) => fileName.endsWith(suffix))
}

function sourceFileName(slug: string) {
  return `${slug}.md`
}

function translationFileName(slug: string, locale: Locale) {
  return `${slug}.${locale}.md`
}

/**
 * `draft: true` in the English frontmatter unpublishes a post without deleting
 * it: the slug drops out of every listing, the sitemap, and static params, and
 * its URL 404s in every locale. Like `date` and `category`, the flag is read
 * from the source only, so a translation can neither publish nor hide a story.
 */
function isDraft(sourceData: Record<string, unknown>) {
  return sourceData.draft === true
}

type ParsedFile = {
  data: Record<string, unknown>
  content: string
}

function readMarkdown(fileName: string): ParsedFile | undefined {
  try {
    const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), "utf8")
    const { data, content } = matter(fileContents)
    return { data: data as Record<string, unknown>, content }
  } catch {
    return undefined
  }
}

export function resolveImagePath(image: unknown): string | undefined {
  if (typeof image !== "string" || image.trim() === "") {
    return undefined
  }

  const normalizedImage = image.trim()
  const candidates = [normalizedImage]

  if (normalizedImage.startsWith("/images/blog/")) {
    const fileName = path.posix.basename(normalizedImage)
    candidates.push(`/images/blog and case/${fileName}`)
    candidates.push(`/images/blog and case/blog/${fileName}`)
  }

  for (const candidate of candidates) {
    const absolutePath = path.join(publicDirectory, candidate.replace(/^\//, ""))
    if (fs.existsSync(absolutePath)) {
      return encodeURI(candidate)
    }
  }

  return undefined
}

/** Resolve any public-relative asset (e.g. a logo) to an encoded URL if it exists. */
export function resolveAssetPath(asset: unknown): string | undefined {
  if (typeof asset !== "string" || asset.trim() === "") {
    return undefined
  }

  const normalized = asset.trim()
  const absolutePath = path.join(publicDirectory, normalized.replace(/^\//, ""))
  return fs.existsSync(absolutePath) ? encodeURI(normalized) : undefined
}

/** Map case-study frontmatter into the optional BlogPost fields. */
function caseFields(data: Record<string, unknown>) {
  return {
    customer: typeof data.customer === "string" ? data.customer : undefined,
    metric: typeof data.metric === "string" ? data.metric : undefined,
    metricLabel: typeof data.metricLabel === "string" ? data.metricLabel : undefined,
    logo: resolveAssetPath(data.logo),
    quote: typeof data.quote === "string" ? data.quote : undefined,
    outcome: typeof data.outcome === "string" ? data.outcome : undefined,
  }
}

function stripMarkdown(content: string) {
  return content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function createSummary(content: string, fallbackTitle: string) {
  const plainText = stripMarkdown(content)
  if (!plainText) {
    return fallbackTitle
  }

  return plainText.slice(0, 157).trimEnd() + (plainText.length > 157 ? "..." : "")
}

function asString(value: unknown) {
  return typeof value === "string" ? value : ""
}

/**
 * Build one post in the requested locale.
 *
 * Frontmatter merges with the translation winning, so a translated file only
 * has to carry the fields it actually changes. `date` and `category` are the
 * exception: they stay canonical, so ordering and category filtering can never
 * drift because a translated file spelled a category differently.
 */
function parsePost(slug: string, locale: Locale): BlogPost | undefined {
  const source = readMarkdown(sourceFileName(slug))
  if (!source || isDraft(source.data)) {
    return undefined
  }

  const translation =
    locale === defaultLocale ? undefined : readMarkdown(translationFileName(slug, locale))
  const data = { ...source.data, ...(translation?.data ?? {}) }
  const content = (translation ?? source).content
  const title = asString(data.title)

  return {
    slug,
    title,
    content,
    date: asString(source.data.date),
    category: asString(source.data.category),
    author: asString(data.author),
    image: resolveImagePath(data.image),
    summary: createSummary(content, title),
    contentLocale: translation ? locale : defaultLocale,
    ...caseFields(data),
  }
}

export function getAllPosts(locale: Locale = defaultLocale): BlogPost[] {
  const posts = getAllSlugs()
    .map((slug) => parsePost(slug, locale))
    .filter((post): post is BlogPost => post !== undefined)

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): BlogPost | undefined {
  return parsePost(slug, locale)
}

export function getLatestPosts(count: number = 3, locale: Locale = defaultLocale): BlogPost[] {
  return getAllPosts(locale).slice(0, count)
}

export function getLatestPostsByCategory(
  category: string,
  count: number = 3,
  locale: Locale = defaultLocale,
): BlogPost[] {
  return getPostsByCategory(category, locale).slice(0, count)
}

export function getCategories(locale: Locale = defaultLocale): string[] {
  const posts = getAllPosts(locale)
  return [...new Set(posts.map((post) => post.category))].sort()
}

export function getPostsByCategory(
  category: string,
  locale: Locale = defaultLocale,
): BlogPost[] {
  return getAllPosts(locale).filter((post) => post.category === category)
}

/**
 * Case studies ordered for the showcase: stories with a hard metric first
 * (newest within each group), so the strongest results lead the page.
 */
export function getCaseStudies(locale: Locale = defaultLocale): BlogPost[] {
  return getPostsByCategory("Cases", locale).sort(
    (a, b) => (b.metric ? 1 : 0) - (a.metric ? 1 : 0),
  )
}

/**
 * Canonical slugs, taken from the English sources rather than translations.
 * Drafts are left out, so a hidden post has no route to prerender.
 */
export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith(".md") && !isTranslationFile(fileName))
    .filter((fileName) => {
      const source = readMarkdown(fileName)
      return source !== undefined && !isDraft(source.data)
    })
    .map((fileName) => fileName.replace(/\.md$/, ""))
}
