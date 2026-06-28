import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import type { BlogPost } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"

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
}

const CARD_SHADOW =
  "shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]"

/** Customer wordmark — logo image when available, otherwise the name as a tracked label. */
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
      <div className={`relative h-7 w-28 ${className}`}>
        <Image
          src={logo}
          alt={customer ?? "Customer logo"}
          fill
          className="object-contain object-left opacity-60"
          sizes="112px"
        />
      </div>
    )
  }

  if (!customer) return null

  return (
    <p
      className={`text-sm font-medium uppercase tracking-wide text-muted-foreground ${className}`}
    >
      {customer}
    </p>
  )
}

function FeaturedCase({
  post,
  postBasePath,
  ctaLabel,
}: {
  post: BlogPost
  postBasePath: string
  ctaLabel: string
}) {
  return (
    <Link href={`${postBasePath}/${post.slug}`} className="group block">
      <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <CustomerMark customer={post.customer} logo={post.logo} className="mb-8" />

          {post.metric ? (
            <div className="mb-6">
              <p className="text-6xl font-extralight tracking-tight text-primary lg:text-7xl">
                {post.metric}
              </p>
              {post.metricLabel && (
                <p className="mt-3 text-lg text-muted-foreground">
                  {post.metricLabel}
                </p>
              )}
            </div>
          ) : (
            post.metricLabel && (
              <p className="mb-6 text-2xl font-light tracking-tight text-foreground lg:text-3xl">
                {post.metricLabel}
              </p>
            )
          )}

          <h2 className="text-2xl font-light leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground/80 lg:text-3xl">
            {post.outcome ?? post.title}
          </h2>

          {post.quote && (
            <p className="mt-6 border-l-2 border-border pl-5 font-serif text-lg italic text-foreground/70">
              {post.quote}
            </p>
          )}

          <div className="mt-8 flex items-center gap-2 text-sm font-medium text-foreground/70">
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        <div
          className={`relative order-first aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--gray-2)] bg-muted lg:order-last lg:aspect-[16/11] ${CARD_SHADOW}`}
        >
          {post.image && (
            <Image
              src={post.image}
              alt={post.customer ?? post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          )}
        </div>
      </article>
    </Link>
  )
}

function CaseCard({
  post,
  postBasePath,
  ctaLabel,
}: {
  post: BlogPost
  postBasePath: string
  ctaLabel: string
}) {
  return (
    <Link href={`${postBasePath}/${post.slug}`} className="group block h-full">
      <article
        className={`flex h-full flex-col rounded-2xl border border-[var(--gray-2)] bg-background p-8 transition-shadow duration-300 hover:shadow-[0_2px_12px_0_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.05)] ${CARD_SHADOW}`}
      >
        <div className="flex h-7 items-center">
          <CustomerMark customer={post.customer} logo={post.logo} />
        </div>

        <div className="mt-8 flex-1">
          {post.metric ? (
            <>
              <p className="text-5xl font-extralight tracking-tight text-primary">
                {post.metric}
              </p>
              {post.metricLabel && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {post.metricLabel}
                </p>
              )}
            </>
          ) : (
            post.metricLabel && (
              <p className="text-xl font-light leading-snug tracking-tight text-foreground">
                {post.metricLabel}
              </p>
            )
          )}
        </div>

        <div className="mt-8 border-t border-border/60 pt-6">
          <h3 className="line-clamp-2 text-base text-foreground/80 transition-colors group-hover:text-foreground">
            {post.outcome ?? post.title}
          </h3>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground/60">
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  )
}

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
}: CaseArchiveProps) {
  const [featured, ...rest] = cases

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {backHref && backLabel && (
          <Button asChild variant="ghost" size="sm" className="mb-8">
            <Link href={backHref}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Link>
          </Button>
        )}

        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-light tracking-tight text-foreground lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg text-foreground/70">{subtitle}</p>
          )}
        </div>

        {!featured ? (
          <div className="rounded-3xl border border-border/60 bg-muted/30 p-10 lg:p-14">
            <h2 className="text-2xl font-medium text-foreground">{emptyTitle}</h2>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              {emptyBody}
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            <FeaturedCase
              post={featured}
              postBasePath={postBasePath}
              ctaLabel={ctaLabel}
            />

            {rest.length > 0 && (
              <div className="grid gap-6 border-t border-border/50 pt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {rest.map((post) => (
                  <CaseCard
                    key={post.slug}
                    post={post}
                    postBasePath={postBasePath}
                    ctaLabel={ctaLabel}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
