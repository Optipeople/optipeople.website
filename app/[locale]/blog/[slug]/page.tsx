import Image from "next/image"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { ArrowLeft } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { type Locale } from "@/i18n/routing"
import { getAllSlugs, getPostBySlug } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
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
}

const copy: Record<Locale, PostCopy> = {
  en: {
    backToBlog: "Back to blog",
    backToCases: "Back to cases",
    tableOfContents: "Table of Contents",
  },
  da: {
    backToBlog: "Tilbage til blog",
    backToCases: "Tilbage til cases",
    tableOfContents: "Indholdsfortegnelse",
  },
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const post = getPostBySlug(slug)

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

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const t = copy[locale as Locale] ?? copy.en
  const headings = extractHeadings(post.content)
  const isCaseStudy = post.category === "Cases"
  const backHref = isCaseStudy ? "/cases" : "/blog"
  const backLabel = isCaseStudy ? t.backToCases : t.backToBlog

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

  if (!isCaseStudy) {
    return (
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
        <article className="py-12 lg:py-16">
          <div className="px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <Button asChild variant="ghost" size="sm" className="mb-8">
                <Link href={backHref}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {backLabel}
                </Link>
              </Button>

              <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] border border-border/60 bg-[linear-gradient(135deg,#f4efe6,#f8f6f1)]">
                <div className="px-8 py-10 lg:px-12 lg:py-14">
                  <div className="max-w-3xl">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-foreground/55">
                      {post.category}
                    </p>
                    <h1 className="mt-4 text-4xl font-light tracking-tight text-foreground lg:text-6xl">
                      {post.title}
                    </h1>
                    <p className="mt-6 text-sm text-foreground/55">
                      {post.date} &middot; {post.author}
                    </p>
                  </div>
                </div>

                {post.image && (
                  <div className="px-8 pb-8 lg:px-12 lg:pb-12">
                    <div className="overflow-hidden rounded-[1.25rem] border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={675}
                        className="w-full h-auto object-cover"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
                <aside className="hidden lg:block">
                  <TableOfContents headings={headings} label={t.tableOfContents} />
                </aside>

                <div className="min-w-0">
                  <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-primary prose-blockquote:text-foreground/70 prose-li:text-foreground/80 prose-th:text-foreground prose-td:text-foreground/80">
                    <MarkdownContent content={post.content} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    )
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <article className="py-12 lg:py-16">
        <div className="px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href={backHref}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backLabel}
              </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
              {/* Table of Contents - Left sidebar */}
              <aside className="hidden lg:block">
                <TableOfContents headings={headings} label={t.tableOfContents} />
              </aside>

              {/* Main content - Right side */}
              <div>
                <header className="mb-8">
                  <p className="text-sm text-muted-foreground">
                    {post.category} &middot; {post.date} &middot; {post.author}
                  </p>
                  <h1 className="mt-2 text-4xl font-light text-foreground">
                    {post.title}
                  </h1>
                </header>

                {post.image && (
                  <div className="mb-8 overflow-hidden rounded-lg border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="w-full h-auto max-h-[600px] object-cover"
                      priority
                    />
                  </div>
                )}

                <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-primary prose-blockquote:text-foreground/70 prose-li:text-foreground/80 prose-th:text-foreground prose-td:text-foreground/80">
                  <MarkdownContent content={post.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
