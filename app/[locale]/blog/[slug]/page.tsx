import Image from "next/image"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { type Locale } from "@/i18n/routing"
import { getAllSlugs, getPostBySlug, getPostsByCategory } from "@/lib/blog-data"
import { formatPostDate, formatPostYear } from "@/lib/format-date"
import { getSurface } from "@/lib/page-theme"
import {
  MarkdownContent,
  TableOfContents,
  extractHeadings,
} from "@/components/blog-post-content"
import { absoluteUrl, buildMetadata } from "@/lib/seo"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

type PostCopy = {
  backToBlog: string
  backToCases: string
  tableOfContents: string
  relatedPosts: string
  relatedCases: string
  readMore: string
  by: string
}

const copy: Record<Locale, PostCopy> = {
  en: {
    backToBlog: "Blog",
    backToCases: "Cases",
    tableOfContents: "Contents",
    relatedPosts: "Keep reading",
    relatedCases: "More customer stories",
    readMore: "Read",
    by: "by",
  },
  da: {
    backToBlog: "Blog",
    backToCases: "Cases",
    tableOfContents: "Indhold",
    relatedPosts: "Læs videre",
    relatedCases: "Flere kundehistorier",
    readMore: "Læs",
    by: "af",
  },
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const post = getPostBySlug(slug, locale as Locale)

  if (!post) {
    return buildMetadata({
      title: "Post not found | OptiPeople",
      description: "The requested OptiPeople article could not be found.",
      path: `/blog/${slug}`,
      locale: locale as Locale,
    })
  }

  return buildMetadata({
    title: `${post.title} | OptiPeople`,
    description: post.summary,
    path: `/blog/${slug}`,
    image: post.image,
    type: "article",
    locale: locale as Locale,
  })
}

/**
 * Article and case-study reader.
 *
 * Both variants share the design language of the rest of the site: the
 * `--edge` column, `font-normal` display type, hairlines, and images floating
 * on a tint with a ring rather than sitting in a bordered box.
 *
 * The two differ where they should. An article opens on the sand tint and
 * leads with its headline. A case study opens on the deep brand surface and
 * leads with its number, because the number is the reason to read it. Both
 * close on related reading, so the article is never a dead end. The conversion
 * CTA comes from app/[locale]/layout.tsx.
 */
export default async function BlogPostPage({ params }: Props) {
  const { locale } = await params
  const { slug } = await params
  setRequestLocale(locale as Locale)
  const post = getPostBySlug(slug, locale as Locale)

  if (!post) {
    notFound()
  }

  const t = copy[locale as Locale] ?? copy.en
  const headings = extractHeadings(post.content)
  const isCaseStudy = post.category === "Cases"
  const theme = getSurface(isCaseStudy ? "green" : "sand")
  const backHref = isCaseStudy ? "/cases" : "/blog"
  const backLabel = isCaseStudy ? t.backToCases : t.backToBlog

  const related = getPostsByCategory(post.category, locale as Locale)
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": isCaseStudy ? "Article" : "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "OptiPeople",
    },
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    articleSection: post.category,
    ...(post.image ? { image: [absoluteUrl(post.image)] } : {}),
  }

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {isCaseStudy ? (
        /* Case study: the deep surface, leading with the measured result. */
        <header
          className="pb-14 pt-8 text-white lg:pb-20 lg:pt-12"
          style={{ backgroundColor: theme.deep }}
        >
          <div className="px-[var(--edge)]">
            <nav className="flex items-center gap-2 text-sm text-white/65">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {backLabel}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-white/88">
                {post.customer ?? formatPostYear(post.date)}
              </span>
            </nav>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
              <div>
                {post.customer && (
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                    {post.customer}
                  </p>
                )}
                <h1 className="mt-5 max-w-3xl text-3xl font-normal leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-6 text-sm tabular-nums text-white/65">
                  {formatPostDate(post.date, locale)}
                  {post.author ? ` · ${t.by} ${post.author}` : ""}
                </p>
              </div>

              <div className="lg:pt-2">
                {post.metric && (
                  <p className="text-6xl font-light leading-none tracking-tight tabular-nums lg:text-7xl">
                    {post.metric}
                  </p>
                )}
                {post.metricLabel && (
                  <p
                    className={`max-w-[26ch] text-base leading-relaxed text-white/72 ${
                      post.metric ? "mt-4" : ""
                    }`}
                  >
                    {post.metricLabel}
                  </p>
                )}
                {post.quote && (
                  <p className="mt-8 border-l border-white/20 pl-5 font-serif text-lg italic leading-relaxed text-white/82">
                    {post.quote}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>
      ) : (
        /* Article: the tint wash, leading with the headline. */
        <header className="relative isolate overflow-hidden pb-12 pt-8 lg:pb-16 lg:pt-12">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 -z-10 h-full"
            style={{
              background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 60%, transparent 100%)`,
            }}
          />

          <div className="px-[var(--edge)]">
            <nav className="flex items-center gap-2 text-sm text-foreground/65">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {backLabel}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-foreground/88">
                {formatPostYear(post.date)}
              </span>
            </nav>

            <div className="mt-10 max-w-4xl lg:mt-14">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
                {post.category}
              </p>
              <h1 className="mt-5 text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mt-7 text-sm tabular-nums text-foreground/65">
                {formatPostDate(post.date, locale)}
                {post.author ? ` · ${t.by} ${post.author}` : ""}
              </p>
            </div>
          </div>
        </header>
      )}

      {/* Lead image, floating rather than boxed. On the case variant it laps
          up over the edge of the deep header. */}
      {post.image && (
        <div className={isCaseStudy ? "-mt-8 lg:-mt-12" : "mt-2"}>
          <div className="px-[var(--edge)]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.08]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 1140px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Body: contents rail on the left, one readable measure on the right. */}
      <div className="px-[var(--edge)] py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} label={t.tableOfContents} />
          </aside>

          {/* When a locale has no translation yet the prose falls back to
              English, so mark the real language of the text for browsers,
              screen readers, and translation tools. */}
          <div
            className="min-w-0 max-w-[70ch]"
            lang={post.contentLocale === locale ? undefined : post.contentLocale}
          >
            <div className="prose prose-lg max-w-none prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-[var(--gray-1)] prose-blockquote:border-primary prose-blockquote:font-serif prose-blockquote:not-italic prose-blockquote:text-foreground/82 prose-li:text-foreground/85 prose-th:text-foreground prose-td:text-foreground/85 prose-img:rounded-xl">
              <MarkdownContent content={post.content} />
            </div>
          </div>
        </div>
      </div>

      {/* Related reading, on the hairline grid. */}
      {related.length > 0 && (
        <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <h2 className="text-2xl font-normal tracking-tight text-foreground lg:text-3xl">
            {isCaseStudy ? t.relatedCases : t.relatedPosts}
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] bg-black/[0.08] sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex flex-col justify-between gap-8 bg-background p-7 transition-colors hover:bg-[var(--gray-1)] lg:p-8"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] tabular-nums text-foreground/60">
                    {formatPostDate(item.date, locale)}
                  </p>
                  <h3 className="mt-4 text-lg font-medium leading-snug tracking-tight text-foreground">
                    {item.outcome ?? item.title}
                  </h3>
                  {item.metric && (
                    <p className="mt-3 text-2xl font-normal tabular-nums text-foreground/82">
                      {item.metric}
                    </p>
                  )}
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors group-hover:border-black/25">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
