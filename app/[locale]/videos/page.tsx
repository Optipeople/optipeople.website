import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { VideoCarousel, type VideoData } from "@/components/video-carousel"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

type VideosCopy = {
  eyebrow: string
  headline: string
  body: string
  watchLabel: string
  countLabel: (count: number) => string
  carouselTitle: string
  carouselBody: string
  videos: VideoData[]
  moreTitle: string
  moreBody: string
  moreLinks: { title: string; description: string; href: string }[]
}

// Video titles match the published titles on the OptiPeople YouTube channel.
// The two customer stories are in Danish, the Omron talk is in English; the
// language tag on each card says which, on both locales.
const copy: Record<Locale, VideosCopy> = {
  en: {
    eyebrow: "Videos",
    headline: "See OptiPeople Data Platform in action",
    body: "Customer conversations and partner talks about what changes on the floor once machines, orders, and stop causes are recorded in one place. The customer stories are in Danish and the Omron talk is in English, and every story below is also written up in full on the site.",
    watchLabel: "Watch the stories",
    countLabel: (count) => `${count} videos, in Danish and English`,
    carouselTitle: "Customer stories",
    carouselBody:
      "Manufacturers describing the work in their own words: what they measured before, what they connected, and what they do differently now.",
    videos: [
      {
        videoId: "3LOknXK4buo",
        title: "CASE: Glaseksperten x OptiPeople",
        description:
          "Glaseksperten on connecting production and getting a shared, live picture of how the lines are actually running.",
        languageLabel: "Danish",
      },
      {
        videoId: "AgHZcfeu8mQ",
        title: "Partnerskabet med OptiPeople (CASE: Nicholaisen)",
        description:
          "Nicholaisen on what the partnership looks like day to day, from first machine connection to using the data in daily operations.",
        languageLabel: "Danish",
      },
      {
        videoId: "H4HvdRpmHjo",
        title: "OptiPeople & Omron: turning data into a competitive advantage",
        description:
          "A joint talk with Omron on how production data becomes a real advantage: what to measure, and how to turn it into decisions.",
        languageLabel: "English",
      },
    ],
    moreTitle: "Read the stories instead",
    moreBody:
      "Prefer text, or want the numbers? The written cases cover the same ground in more detail.",
    moreLinks: [
      {
        title: "All customer cases",
        description:
          "Results from the factory floor: OEE lifts, downtime reductions, and what it took to get there.",
        href: "/cases",
      },
      {
        title: "Insights and articles",
        description:
          "Practical guidance on OEE, maintenance, and industrial data from the people doing the work.",
        href: "/insights",
      },
      {
        title: "Talk to us",
        description:
          "Want to see the platform on your own production data? Book a walkthrough.",
        href: "/contact",
      },
    ],
  },
  da: {
    eyebrow: "Videoer",
    headline: "Se OptiPeople Data Platform i aktion",
    body: "Kundesamtaler og partneroplæg om, hvad der ændrer sig på gulvet, når maskiner, ordrer og stopårsager bliver registreret ét sted. Kundehistorierne er på dansk, og oplægget med Omron er på engelsk. Alle historier findes også skrevet i fuld længde her på sitet.",
    watchLabel: "Se historierne",
    countLabel: (count) => `${count} videoer, på dansk og engelsk`,
    carouselTitle: "Kundehistorier",
    carouselBody:
      "Produktionsvirksomheder fortæller med egne ord: hvad de målte før, hvad de fik forbundet, og hvad de gør anderledes i dag.",
    videos: [
      {
        videoId: "3LOknXK4buo",
        title: "CASE: Glaseksperten x OptiPeople",
        description:
          "Glaseksperten om at få forbundet produktionen og få et fælles, live billede af, hvordan linjerne faktisk kører.",
        languageLabel: "Dansk",
      },
      {
        videoId: "AgHZcfeu8mQ",
        title: "Partnerskabet med OptiPeople (CASE: Nicholaisen)",
        description:
          "Nicholaisen om, hvordan samarbejdet ser ud i hverdagen, fra den første maskine bliver forbundet, til data bliver brugt i den daglige drift.",
        languageLabel: "Dansk",
      },
      {
        videoId: "H4HvdRpmHjo",
        title: "OptiPeople & Omron: turning data into a competitive advantage",
        description:
          "Fælles oplæg med Omron om, hvordan produktionsdata bliver til en reel konkurrencefordel: hvad man skal måle, og hvordan det bliver til beslutninger.",
        languageLabel: "Engelsk",
      },
    ],
    moreTitle: "Læs historierne i stedet",
    moreBody:
      "Foretrækker du tekst, eller vil du have tallene? De skrevne cases går mere i dybden.",
    moreLinks: [
      {
        title: "Alle kundecases",
        description:
          "Resultater fra fabriksgulvet: løft i OEE, mindre nedetid, og hvad der skulle til.",
        href: "/cases",
      },
      {
        title: "Indsigter og artikler",
        description:
          "Praktisk viden om OEE, vedligehold og industriel data fra dem, der arbejder med det.",
        href: "/insights",
      },
      {
        title: "Tal med os",
        description:
          "Vil du se platformen på jeres egne produktionsdata? Book en gennemgang.",
        href: "/contact",
      },
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  if (locale === "da") {
    return buildMetadata({
      title: "Videoer | OptiPeople",
      description:
        "Se kundehistorier fra Glaseksperten og Nicholaisen samt oplægget med Omron om at gøre produktionsdata til en konkurrencefordel.",
      path: "/videos",
      locale: "da",
    })
  }

  return buildMetadata({
    title: "Videos",
    description:
      "Watch OptiPeople customer stories from Glaseksperten and Nicholaisen, plus the Omron talk on turning production data into a competitive advantage.",
    path: "/videos",
    locale: "en",
  })
}

/**
 * Videos page.
 *
 * Same design language as the deep-dive templates: the `--edge` column,
 * `font-normal` display type, arrow-in-circle affordances, and one full-bleed
 * deep band as the closing rhythm break.
 *
 * The carousel keeps its own full-bleed track (cards bleed off both screen
 * edges), so the section heading and lead-in are rendered here on the edge
 * column instead of inside the carousel. That way the reader knows what the
 * videos are before the first embed loads.
 */
export default async function VideosPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  const theme = getSurface("teal")

  return (
    <div className="min-h-screen">
      {/* Hero, on a tint that fades out before the first embed. */}
      <section className="relative isolate overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 55%, transparent 100%)`,
          }}
        />

        <div className="px-[var(--edge)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="#stories"
              className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/82 transition-colors hover:text-foreground"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              {t.watchLabel}
            </Link>
            <p className="text-sm tabular-nums text-foreground/65">
              {t.countLabel(t.videos.length)}
            </p>
          </div>
        </div>
      </section>

      {/* Carousel. Heading on the edge column, track full-bleed. */}
      <section id="stories" className="scroll-mt-24 pb-16 sm:pb-20 lg:pb-28">
        <div className="mb-10 px-[var(--edge)] lg:mb-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
              {t.carouselTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/72">
              {t.carouselBody}
            </p>
          </div>
        </div>

        <VideoCarousel videos={t.videos} />
      </section>

      {/* Closing deep band: the written versions of the same stories. */}
      <section
        className="py-20 text-white lg:py-28"
        style={{ backgroundColor: theme.deep }}
      >
        <div className="px-[var(--edge)]">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight lg:text-4xl">
              {t.moreTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78 lg:text-lg">
              {t.moreBody}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 border-t border-white/[0.14] sm:grid-cols-3 lg:mt-16">
            {t.moreLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex flex-col justify-between gap-10 border-b border-white/[0.14] py-8 transition-colors hover:bg-white/[0.04] lg:py-10 ${
                  i > 0 ? "sm:border-l sm:border-white/[0.14] sm:pl-8 lg:pl-10" : ""
                } ${i < t.moreLinks.length - 1 ? "sm:pr-8 lg:pr-10" : ""}`}
              >
                <div>
                  <h3 className="text-xl font-normal tracking-tight lg:text-2xl">
                    {link.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/72">
                    {link.description}
                  </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-white/50 group-hover:bg-white/10">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
