import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import type { BlogPost } from "@/lib/blog-data"
import { getSurface } from "@/lib/page-theme"
import { formatPostDate } from "@/lib/format-date"

type PostArchiveProps = {
  posts: BlogPost[]
  basePath: string
  eyebrow: string
  title: string
  emptyTitle: string
  emptyBody: string
  ctaLabel: string
  currentPage: number
  postsPerPage?: number
  backHref?: string
  backLabel?: string
  postBasePath?: string
  paginationLabel?: string
  previousLabel?: string
  nextLabel?: string
  /** Lead paragraph under the headline. */
  subtitle?: string
  /** Article count line, e.g. "51 articles". */
  countLabel?: string
  /** Locale for date formatting. Raw ISO dates read as unfinished. */
  locale?: string
  /** Label above the compact list, e.g. "All articles". */
  listLabel?: string
}

/**
 * Blog archive.
 *
 * Shares the deep-dive design language (components/templates/feature-page.tsx):
 * the `--edge` column so every block sits on one left line, `font-light`
 * display type, hairlines instead of bordered cards floating on white, and
 * arrow-in-circle affordances.
 *
 * The reading order is deliberately unequal, because an archive of fifty posts
 * is not fifty equally interesting posts: one lead story on the tint, three
 * picture-led highlights, then the remainder as a dense hairline list that can
 * be scanned by date. A uniform grid of thumbnails hides the newest post among
 * the other forty-nine.
 */
export function PostArchive({
  posts,
  basePath,
  eyebrow,
  title,
  emptyTitle,
  emptyBody,
  ctaLabel,
  currentPage,
  postsPerPage = 10,
  backHref,
  backLabel,
  postBasePath = "/blog",
  paginationLabel = "Pagination",
  previousLabel = "Previous",
  nextLabel = "Next",
  subtitle,
  countLabel,
  locale = "en",
  listLabel,
}: PostArchiveProps) {
  const theme = getSurface("sand")

  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage))
  const validPage = Math.min(currentPage, totalPages)
  const startIndex = (validPage - 1) * postsPerPage
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage)

  // The lead treatment belongs to the newest post overall, not to whichever
  // post happens to land first on page four.
  const leadsWithFeature = validPage === 1
  const featured = leadsWithFeature ? paginatedPosts[0] : undefined
  const remaining = leadsWithFeature ? paginatedPosts.slice(1) : paginatedPosts
  const highlights = remaining.slice(0, 3)
  const list = remaining.slice(3)

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`

  return (
    <div className="min-h-screen">
      {/* Hero and lead story share one tint wash, so the page opens on colour
          and the newest post sits beside the headline instead of below it. */}
      <section className="relative isolate overflow-hidden pb-16 pt-8 lg:pb-24 lg:pt-12">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 60%, transparent 100%)`,
          }}
        />

        <div className="px-[var(--edge)]">
          {backHref && backLabel && (
            <nav className="flex items-center gap-2 text-sm text-foreground/50">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {backLabel}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-foreground/80">{eyebrow}</span>
            </nav>
          )}

          <div className="mt-10 max-w-3xl lg:mt-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
              {eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-foreground/65 lg:text-xl">
                {subtitle}
              </p>
            )}
            {countLabel && (
              <p className="mt-8 text-sm tabular-nums text-foreground/50">
                {countLabel}
              </p>
            )}
          </div>

          {featured && (
            <Link
              href={`${postBasePath}/${featured.slug}`}
              className="group mt-12 block lg:mt-16"
            >
              <article className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.08] lg:aspect-[16/11]">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 1024px) 620px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black/[0.04]" />
                  )}
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] tabular-nums text-foreground/45">
                    {formatPostDate(featured.date, locale)}
                  </p>
                  <h2 className="mt-5 text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/60">
                    {featured.summary}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    {ctaLabel}
                  </span>
                </div>
              </article>
            </Link>
          )}
        </div>
      </section>

      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        {paginatedPosts.length === 0 ? (
          <div
            className="rounded-[1.75rem] p-10 lg:p-14"
            style={{ backgroundColor: theme.tint }}
          >
            <h2 className="text-2xl font-light tracking-tight text-foreground lg:text-3xl">
              {emptyTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/60">
              {emptyBody}
            </p>
          </div>
        ) : (
          <>
            {highlights.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {highlights.map((post) => (
                  <Link
                    key={post.slug}
                    href={`${postBasePath}/${post.slug}`}
                    className="reveal group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.08]">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: theme.tint }}
                        />
                      )}
                    </div>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] tabular-nums text-foreground/45">
                      {formatPostDate(post.date, locale)}
                    </p>
                    <h3 className="mt-3 text-xl font-light leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground/70 lg:text-2xl">
                      {post.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}

            {list.length > 0 && (
              <div className="mt-16 lg:mt-24">
                {listLabel && (
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
                    {listLabel}
                  </p>
                )}
                <ul className="mt-6 border-t border-black/[0.08]">
                  {list.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`${postBasePath}/${post.slug}`}
                        className="group grid gap-x-8 gap-y-2 border-b border-black/[0.08] py-6 transition-colors hover:bg-[var(--gray-1)] sm:grid-cols-[9rem_minmax(0,1fr)_2.25rem] sm:items-center lg:py-7"
                      >
                        <span className="text-sm tabular-nums text-foreground/45">
                          {formatPostDate(post.date, locale)}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-lg font-light leading-snug tracking-tight text-foreground lg:text-xl">
                            {post.title}
                          </span>
                          <span className="mt-1.5 line-clamp-1 block text-sm leading-relaxed text-foreground/50">
                            {post.summary}
                          </span>
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors group-hover:border-black/25">
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {totalPages > 1 && (
              <nav
                className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-black/[0.08] pt-8 lg:mt-20"
                aria-label={paginationLabel}
              >
                <PageStep
                  href={validPage > 1 ? pageHref(validPage - 1) : undefined}
                  label={previousLabel}
                  direction="prev"
                />

                <div className="order-last flex w-full items-center justify-center gap-1 sm:order-none sm:w-auto">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Link
                        key={page}
                        href={pageHref(page)}
                        aria-current={page === validPage ? "page" : undefined}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm tabular-nums transition-colors ${
                          page === validPage
                            ? "bg-foreground font-medium text-background"
                            : "text-foreground/55 hover:bg-[var(--gray-1)] hover:text-foreground"
                        }`}
                      >
                        {page}
                      </Link>
                    )
                  )}
                </div>

                <PageStep
                  href={
                    validPage < totalPages ? pageHref(validPage + 1) : undefined
                  }
                  label={nextLabel}
                  direction="next"
                />
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  )
}

/** Previous/next control, using the arrow-in-circle affordance site-wide. */
function PageStep({
  href,
  label,
  direction,
}: {
  href?: string
  label: string
  direction: "prev" | "next"
}) {
  const icon = (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-colors group-hover:border-black/25">
      <ArrowRight
        className={`h-4 w-4 transition-transform ${
          direction === "prev"
            ? "rotate-180 group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5"
        }`}
      />
    </span>
  )

  if (!href) {
    return (
      <span className="inline-flex items-center gap-3 text-sm font-medium text-foreground/25">
        {direction === "prev" && icon}
        {label}
        {direction === "next" && icon}
      </span>
    )
  }

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
    >
      {direction === "prev" && icon}
      {label}
      {direction === "next" && icon}
    </Link>
  )
}
