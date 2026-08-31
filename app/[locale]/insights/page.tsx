import Image from "next/image"
import { ArrowRight, Factory, FileText, Mail, PlayCircle } from "lucide-react"
import { setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { type Locale } from "@/i18n/routing"
import {
  getAllPosts,
  getLatestPostsByCategory,
  getPostsByCategory,
} from "@/lib/blog-data"
import { formatPostDate } from "@/lib/format-date"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"

type InsightsCopy = {
  eyebrow: string
  title: string
  intro: string
  latestLabel: string
  latestTitle: string
  browseLabel: string
  typeLabels: Record<string, string>
  cards: {
    blog: {
      title: string
      description: string
      countLabel: string
      cta: string
    }
    cases: {
      title: string
      description: string
      countLabel: string
      cta: string
    }
  }
  moreTitle: string
  more: { title: string; description: string; href: string }[]
}

const copy: Record<Locale, InsightsCopy> = {
  en: {
    eyebrow: "Insights",
    title: "One place for ideas and proof",
    intro:
      "The blog is for broader thinking and practical guidance. Cases are for concrete customer outcomes and implementation examples. Both are written by the people doing the work.",
    latestLabel: "Recent",
    latestTitle: "Latest across both",
    browseLabel: "Newest first",
    typeLabels: { Cases: "Case", Insights: "Article" },
    cards: {
      blog: {
        title: "Blog posts",
        description:
          "Editorial articles, explainers, and thought pieces about manufacturing, data, and digital operations.",
        countLabel: "articles",
        cta: "Browse blog posts",
      },
      cases: {
        title: "Cases",
        description:
          "Customer stories and concrete examples of how factories use Opticloud to improve output, uptime, and decision-making.",
        countLabel: "customer stories",
        cta: "Browse case studies",
      },
    },
    moreTitle: "Other ways to follow along",
    more: [
      {
        title: "Videos",
        description:
          "Customer conversations and partner talks, recorded on the floor.",
        href: "/videos",
      },
      {
        title: "Newsletter",
        description:
          "A short note when something worth reading gets published.",
        href: "/newsletter",
      },
    ],
  },
  da: {
    eyebrow: "Indsigter",
    title: "Ét sted til ideer og beviser",
    intro:
      "Bloggen er til viden, I kan bruge. Cases er til det, kunderne rent faktisk fik ud af det. Begge dele er skrevet af dem, der arbejder med det til daglig.",
    latestLabel: "Nyeste",
    latestTitle: "Nyeste fra begge",
    browseLabel: "Nyeste først",
    typeLabels: { Cases: "Case", Insights: "Artikel" },
    cards: {
      blog: {
        title: "Blogindlæg",
        description:
          "Artikler og forklaringer om produktion, data og digital drift.",
        countLabel: "artikler",
        cta: "Se blogindlæg",
      },
      cases: {
        title: "Cases",
        description:
          "Kundehistorier og konkrete eksempler på, hvordan fabrikker bruger Opticloud til at producere mere, holde maskinerne kørende og træffe beslutninger.",
        countLabel: "kundehistorier",
        cta: "Se cases",
      },
    },
    moreTitle: "Andre måder at følge med",
    more: [
      {
        title: "Videoer",
        description:
          "Kundesamtaler og partneroplæg, optaget ude på gulvet.",
        href: "/videos",
      },
      {
        title: "Nyhedsbrev",
        description:
          "En kort besked, når der bliver publiceret noget værd at læse.",
        href: "/newsletter",
      },
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  if (locale === "da") {
    return buildMetadata({
      title: "Indsigter | OptiPeople",
      description:
        "Find artikler og cases om produktion, OEE, prediktivt vedligehold og digital drift.",
      path: "/insights",
      locale: "da",
    })
  }

  return buildMetadata({
    title: "Insights",
    description:
      "Browse OptiPeople articles, explainers, and customer cases about manufacturing efficiency, OEE, predictive maintenance, and digital operations.",
    path: "/insights",
    locale: "en",
  })
}

/**
 * Insights hub.
 *
 * A hub in the same language as the family hubs (components/templates/
 * link-index.tsx): a neutral hero, because the destination panels below carry
 * the colour, then tinted surfaces rather than bordered cards.
 *
 * Each panel previews what it points at, using the real archive counts and the
 * two newest entries, so the page is a route into the writing rather than two
 * boxes describing it. The mixed hairline list underneath answers the question
 * the two panels cannot: what went up most recently.
 */
export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const t = copy[locale as Locale] ?? copy.en

  const panels = [
    {
      key: "blog" as const,
      href: "/blog",
      icon: FileText,
      category: "Insights",
      theme: getSurface("sand"),
    },
    {
      key: "cases" as const,
      href: "/cases",
      icon: Factory,
      category: "Cases",
      theme: getSurface("green"),
    },
  ]

  const latest = getAllPosts(locale as Locale).slice(0, 5)
  const moreIcons = [PlayCircle, Mail]

  return (
    <div className="min-h-screen">
      {/* Neutral hero: the panels below hold the colour. */}
      <section className="bg-[var(--gray-1)] pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="px-[var(--edge)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Destination panels */}
      <section className="px-[var(--edge)] py-16 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {panels.map((panel) => {
            const posts = getPostsByCategory(panel.category, locale as Locale)
            const preview = getLatestPostsByCategory(panel.category, 2, locale as Locale)
            const Icon = panel.icon
            const card = t.cards[panel.key]

            return (
              <article
                key={panel.href}
                className="reveal flex flex-col rounded-[1.75rem] p-8 lg:rounded-[2rem] lg:p-10"
                style={{ backgroundColor: panel.theme.tint }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70">
                  <Icon className="h-5 w-5 text-foreground/82" />
                </span>

                <h2 className="mt-7 text-2xl font-normal tracking-tight text-foreground lg:text-3xl">
                  {card.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/72">
                  {card.description}
                </p>

                <p className="mt-8 flex items-baseline gap-3">
                  <span className="text-4xl font-light leading-none tracking-tight tabular-nums text-foreground lg:text-5xl">
                    {posts.length}
                  </span>
                  <span className="text-sm text-foreground/65">
                    {card.countLabel}
                  </span>
                </p>

                {preview.length > 0 && (
                  <div className="mt-8 overflow-hidden rounded-[1.25rem] bg-white/60">
                    <p className="px-5 pt-5 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                      {t.latestLabel}
                    </p>
                    <div className="mt-3 divide-y divide-black/[0.06]">
                      {preview.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 p-4 transition-colors hover:bg-white/70"
                        >
                          <span className="relative block aspect-[4/3] overflow-hidden rounded-[0.65rem] bg-black/[0.05]">
                            {post.image ? (
                              <Image
                                src={post.image}
                                alt=""
                                aria-hidden
                                fill
                                sizes="88px"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                              />
                            ) : (
                              <span className="flex h-full items-center justify-center text-foreground/50">
                                <Icon className="h-4 w-4" />
                              </span>
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs tabular-nums text-foreground/65">
                              {formatPostDate(post.date, locale)}
                            </span>
                            <span className="mt-1.5 line-clamp-2 block text-sm font-medium leading-snug text-foreground/88 transition-colors group-hover:text-foreground">
                              {post.title}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={panel.href}
                  className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-foreground/82 transition-colors hover:text-foreground"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  {card.cta}
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* Mixed recency list: what actually went up last, regardless of type. */}
      {latest.length > 0 && (
        <section className="px-[var(--edge)] pb-20 lg:pb-28">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-2xl font-normal tracking-tight text-foreground lg:text-3xl">
              {t.latestTitle}
            </h2>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              {t.browseLabel}
            </p>
          </div>

          <ul className="mt-8 border-t border-black/[0.08]">
            {latest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-x-8 gap-y-2 border-b border-black/[0.08] py-6 transition-colors hover:bg-[var(--gray-1)] sm:grid-cols-[9rem_minmax(0,1fr)_2.25rem] sm:items-center"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-sm tabular-nums text-foreground/65">
                      {formatPostDate(post.date, locale)}
                    </span>
                    <span className="shrink-0 rounded-full border border-black/10 px-2.5 py-0.5 text-xs text-foreground/65">
                      {t.typeLabels[post.category] ?? post.category}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-normal leading-snug tracking-tight text-foreground lg:text-xl">
                      {post.title}
                    </span>
                    <span className="mt-1.5 line-clamp-1 block text-sm leading-relaxed text-foreground/65">
                      {post.outcome ?? post.summary}
                    </span>
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors group-hover:border-black/25">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Adjacent formats, on the hairline grid rather than as loose links. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        <h2 className="text-2xl font-normal tracking-tight text-foreground lg:text-3xl">
          {t.moreTitle}
        </h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] bg-black/[0.08] sm:grid-cols-2">
          {t.more.map((item, i) => {
            const Icon = moreIcons[i] ?? PlayCircle
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-6 bg-background p-8 transition-colors hover:bg-[var(--gray-1)] lg:p-10"
              >
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gray-1)]">
                    <Icon className="h-5 w-5 text-foreground/72" />
                  </span>
                  <h3 className="mt-6 text-lg font-medium tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/72">
                    {item.description}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors group-hover:border-black/25">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
