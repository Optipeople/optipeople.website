import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type BlogPost = {
  slug: string
  title: string
  content: string
  date: string
  author: string
  category: string
  image?: string
  summary: string
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

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        content,
        date: data.date,
        author: data.author,
        category: data.category,
        image: resolveImagePath(data.image),
        summary: createSummary(content, data.title),
        ...caseFields(data),
      } as BlogPost
    })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      content,
      date: data.date,
      author: data.author,
      category: data.category,
      image: resolveImagePath(data.image),
      summary: createSummary(content, data.title),
      ...caseFields(data),
    } as BlogPost
  } catch {
    return undefined
  }
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count)
}

export function getLatestPostsByCategory(category: string, count: number = 3): BlogPost[] {
  return getPostsByCategory(category).slice(0, count)
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  return [...new Set(posts.map((post) => post.category))].sort()
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category)
}

/**
 * Case studies ordered for the showcase: stories with a hard metric first
 * (newest within each group), so the strongest results lead the page.
 */
export function getCaseStudies(): BlogPost[] {
  return getPostsByCategory("Cases").sort(
    (a, b) => (b.metric ? 1 : 0) - (a.metric ? 1 : 0),
  )
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""))
}
