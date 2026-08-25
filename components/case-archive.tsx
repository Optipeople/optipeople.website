import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import type { BlogPost } from "@/lib/blog-data"
import { getSurface, rotateSurface } from "@/lib/page-theme"
import { formatPostYear } from "@/lib/format-date"

type CaseArchiveProps = {
  cases: BlogPost[]
  postBasePath?: string
  backHref?: string
  backLabel?: string
  eyebrow: string
  title: string
  subtitle?: string
  emptyTitle: string
  emptyBody: string
  ctaLabel: string
  /** Label for the derived "N stories" figure in the hero strip. */
  storiesLabel?: string
  /** Label for the derived "N with a measured result" figure. */
  measuredLabel?: string
  /** Heading above the customer wordmark strip. */
  customersLabel?: string
  /** Heading above the grid of remaining stories. */
  moreLabel?: string
}

/**
 * Cases archive.
 *
 * Same design language as the deep-dive templates (the `--edge` column,
 * `font-light` display type, oversized tabular metrics, tinted surfaces), with
 * one deliberate difference: this page opens on the deep brand surface rather
 * than a tint. Customer results are the heaviest claim on the site, so the
 * page is allowed to carry the most visual weight.
 *
 * Each story below the lead draws its own surface from the brand rotation, so
 * a grid of fifteen cases reads as fifteen distinct stories rather than one
 * card template repeated. The conversion CTA is appended globally by
 * app/[locale]/layout.tsx, so this component must not repeat it.
 */
export function CaseArchive({
  cases,
  postBasePath = "/blog",
  backHref,
  backLabel,
  eyebrow,
  title,
  subtitle,
  emptyTitle,
  emptyBody,
  ctaLabel,
  storiesLabel,
  measuredLabel,
  customersLabel,
  moreLabel,
}: CaseArchiveProps) {
  const theme = getSurface("green")
  const [featured, ...rest] = cases
  const measured = cases.filter((item) => item.metric).length
  const named = cases.filter((item) => item.customer)

  return (
    <div className="min-h-screen">
      {/* Deep hero band. The numbers in the strip are counted from the
          published stories, so they cannot drift out of date. */}
      <section
        className="relative isolate overflow-hidden pb-16 pt-8 text-white lg:pb-20 lg:pt-12"
        style={{ backgroundColor: theme.deep }}
      >
        <div className="px-[var(--edge)]">
          {backHref && backLabel && (
            <nav className="flex items-center gap-2 text-sm text-white/50">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {backLabel}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-white/80">{eyebrow}</span>
            </nav>
          )}

          <div className="mt-10 max-w-4xl lg:mt-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              {eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70 lg:text-xl">
                {subtitle}
              </p>
            )}
          </div>

          {cases.length > 0 && (storiesLabel || measuredLabel) && (
            <dl className="mt-12 grid max-w-2xl grid-cols-1 border-t border-white/[0.14] sm:grid-cols-2 lg:mt-16">
              {storiesLabel && (
                <div className="border-b border-white/[0.14] py-7 sm:pr-8 lg:pr-12">
                  <dt className="text-4xl font-extralight leading-none tracking-tight tabular-nums lg:text-5xl">
                    {cases.length}
                  </dt>
                  <dd className="mt-3 max-w-[22ch] text-sm leading-relaxed text-white/60">
                    {storiesLabel}
                  </dd>
                </div>
              )}
              {measuredLabel && (
                <div className="border-b border-white/[0.14] py-7 sm:border-l sm:border-white/[0.14] sm:pl-8 lg:pl-12">
                  <dt className="text-4xl font-extralight leading-none tracking-tight tabular-nums lg:text-5xl">
                    {measured}
                  </dt>
                  <dd className="mt-3 max-w-[22ch] text-sm leading-relaxed text-white/60">
                    {measuredLabel}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </section>

      {/* Customer wordmarks. Real names carry more weight here than any
          decorative band would. */}
      {named.length > 0 && (
        <section className="border-b border-black/[0.08] px-[var(--edge)] py-10 lg:py-12">
          {customersLabel && (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
              {customersLabel}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
            {named.map((item) => (
              <CustomerMark
                key={item.slug}
                customer={item.customer}
                logo={item.logo}
              />
            ))}
          </div>
        </section>
      )}

      {!featured ? (
        <section className="px-[var(--edge)] py-20 lg:py-28">
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
        </section>
      ) : (
        <>
          {/* Lead story: one tinted surface holding the metric, the quote and
              the photograph, rather than a card floating on white. */}
          <section className="px-[var(--edge)] py-16 lg:py-24">
            <Link
              href={`${postBasePath}/${featured.slug}`}
              className="reveal group block overflow-hidden rounded-[1.75rem] lg:rounded-[2rem]"
              style={{ backgroundColor: theme.tint }}
            >
              <article className="grid lg:grid-cols-2">
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                  <div className="flex items-center gap-4">
                    <CustomerMark
                      customer={featured.customer}
                      logo={featured.logo}
                    />
                    <span className="text-sm tabular-nums text-foreground/40">
                      {formatPostYear(featured.date)}
                    </span>
                  </div>

                  {featured.metric ? (
                    <>
                      <p className="mt-8 text-6xl font-extralight leading-none tracking-tight tabular-nums text-foreground lg:text-7xl">
                        {featured.metric}
                      </p>
                      {featured.metricLabel && (
                        <p className="mt-4 text-base text-foreground/55">
                          {featured.metricLabel}
                        </p>
                      )}
                    </>
                  ) : (
                    featured.metricLabel && (
                      <p className="mt-8 text-3xl font-light leading-tight tracking-tight text-foreground lg:text-4xl">
                        {featured.metricLabel}
                      </p>
                    )
                  )}

                  <h2 className="mt-8 max-w-md text-xl font-light leading-snug tracking-tight text-foreground/80 lg:text-2xl">
                    {featured.outcome ?? featured.title}
                  </h2>

                  {featured.quote && (
                    <p className="mt-8 border-l border-black/15 pl-5 font-serif text-lg italic leading-relaxed text-foreground/60">
                      {featured.quote}
                    </p>
                  )}

                  <span className="mt-10 inline-flex items-center gap-3 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    {ctaLabel}
                  </span>
                </div>

                <div className="p-6 pt-0 sm:p-10 sm:pt-0 lg:p-10">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.08] lg:h-full">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.customer ?? featured.title}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-black/[0.04]" />
                    )}
                  </div>
                </div>
              </article>
            </Link>
          </section>

          {/* The remaining stories, each on its own brand surface. */}
          {rest.length > 0 && (
            <section className="px-[var(--edge)] pb-20 lg:pb-28">
              {moreLabel && (
                <h2 className="text-2xl font-light tracking-tight text-foreground lg:text-3xl">
                  {moreLabel}
                </h2>
              )}
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
                {rest.map((post, i) => (
                  <CaseCard
                    key={post.slug}
                    post={post}
                    postBasePath={postBasePath}
                    ctaLabel={ctaLabel}
                    // Offset by one so the first card does not repeat the lead
                    // story's green.
                    tint={rotateSurface(i + 1).tint}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

/** Customer wordmark: logo image where one exists, otherwise a tracked name. */
function CustomerMark({
  customer,
  logo,
  className = "",
}: {
  customer?: string
  logo?: string
  className?: string
}) {
  if (logo) {
    return (
      <span className={`relative block h-7 w-28 ${className}`}>
        <Image
          src={logo}
          alt={customer ?? "Customer logo"}
          fill
          className="object-contain object-left opacity-70"
          sizes="112px"
        />
      </span>
    )
  }

  if (!customer) return null

  return (
    <span
      className={`text-sm font-medium uppercase tracking-[0.12em] text-foreground/55 ${className}`}
    >
      {customer}
    </span>
  )
}

function CaseCard({
  post,
  postBasePath,
  ctaLabel,
  tint,
}: {
  post: BlogPost
  postBasePath: string
  ctaLabel: string
  tint: string
}) {
  return (
    <Link
      href={`${postBasePath}/${post.slug}`}
      className="reveal group flex h-full flex-col justify-between rounded-[1.25rem] p-7 transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.28)] lg:rounded-[1.5rem] lg:p-8"
      style={{ backgroundColor: tint }}
    >
      <div>
        <div className="flex h-7 items-center justify-between gap-4">
          <CustomerMark customer={post.customer} logo={post.logo} />
          <span className="shrink-0 text-sm tabular-nums text-foreground/35">
            {formatPostYear(post.date)}
          </span>
        </div>

        <div className="mt-8">
          {post.metric ? (
            <>
              <p className="text-5xl font-extralight leading-none tracking-tight tabular-nums text-foreground">
                {post.metric}
              </p>
              {post.metricLabel && (
                <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                  {post.metricLabel}
                </p>
              )}
            </>
          ) : (
            post.metricLabel && (
              <p className="text-xl font-light leading-snug tracking-tight text-foreground lg:text-2xl">
                {post.metricLabel}
              </p>
            )
          )}
        </div>

        <p className="mt-6 line-clamp-3 text-sm leading-relaxed text-foreground/60">
          {post.outcome ?? post.title}
        </p>
      </div>

      <span className="mt-10 inline-flex items-center gap-3 text-sm font-medium text-foreground/65 transition-colors group-hover:text-foreground">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
        {ctaLabel}
      </span>
    </Link>
  )
}
