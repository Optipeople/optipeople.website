import { locales, type Locale } from "@/i18n/routing"
import { addLocalePrefix } from "@/lib/i18n"
import { markdownPaths, pageMarkdown } from "@/lib/page-markdown"
import { absoluteUrl } from "@/lib/seo"

// The Markdown twin of a page, served at the page's own path plus ".md"
// (/platform.md, /da/platform.md, /index.md for the home page). The rewrites
// in next.config.ts map those URLs here and keep the public URL; /md/... is
// never linked, and next.config.ts marks direct hits noindex. Every twin is
// prerendered from the same catalogs as the pages, so there is nothing to
// render at request time.

export const dynamic = "force-static"
export const dynamicParams = false

type Params = { locale: string; path: string[] }

// "/" has no segment of its own, so the home page travels as "index".
const toSegments = (path: string) => (path === "/" ? ["index"] : path.slice(1).split("/"))
const toPath = (segments: string[]) => (segments.join("/") === "index" ? "/" : `/${segments.join("/")}`)

export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) =>
    markdownPaths().map((path) => ({ locale, path: toSegments(path) })),
  )
}

export async function GET(_request: Request, { params }: { params: Promise<Params> }) {
  const { locale, path } = await params
  const markdown = locales.includes(locale as Locale) ? pageMarkdown(toPath(path), locale as Locale) : null
  if (!markdown) return new Response("Not found\n", { status: 404 })

  // The canonical URL is the one the file names on its "URL:" line, which
  // already points an untranslated Danish post at its English original.
  const canonical =
    markdown.match(/^URL: (\S+)$/m)?.[1] ?? absoluteUrl(addLocalePrefix(toPath(path), locale as Locale))

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${canonical}>; rel="canonical"`,
    },
  })
}
