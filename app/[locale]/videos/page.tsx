import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import type { VideoData } from "@/components/video-carousel"
import { VideoGrid } from "@/components/video-grid"
import { RoleVideoGrid, type RoleVideo } from "@/components/role-video-grid"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/structured-data"

type Props = { params: Promise<{ locale: string }> }

type VideosCopy = {
  eyebrow: string
  headline: string
  body: string
  watchLabel: string
  countLabel: (count: number) => string
  rolesTitle: string
  rolesBody: string
  playLabel: string
  roleVideos: RoleVideo[]
  carouselTitle: string
  carouselBody: string
  videos: VideoData[]
  moreTitle: string
  moreBody: string
  moreLinks: { title: string; description: string; href: string }[]
}

// Persona shorts, one per role, in the order they should appear. All are in
// Danish; the English titles are translations of the YouTube titles.
const roleVideoIds = [
  "siSXdSd0G3o",
  "IXDN_Ai6Ank",
  "kqMOxAQ02e0",
  "tnoy3-B0s8I",
  "aD9I-Rdedjo",
  "I_GInMVfuN8",
  "zwa7gHegd0s",
  "6IUQ7bcRjjo",
  "nx6AtYqqcoE",
  "hJc5P5No_u0",
  "2gLBRps2SX0",
  "u0KXgYzEfVQ",
]

const roleTitles: Record<Locale, string[]> = {
  en: [
    "Are you a CEO?",
    "Are you a COO?",
    "Are you a plant manager?",
    "Are you a production manager?",
    "Do you work with Operational Excellence or Continuous Improvement?",
    "Are you an IT manager?",
    "Do you work with IT or OT?",
    "Are you a maintenance manager?",
    "Are you a CEO, COO or salesperson at a machine builder?",
    "Do you work in aftersales?",
    "Are you a planner?",
    "Do you work in supply chain?",
  ],
  da: [
    "Er du CEO?",
    "Er du COO?",
    "Er du fabrikschef?",
    "Er du produktionschef?",
    "Er du ansvarlig for Operational Excellence eller Continuous Improvement?",
    "Er du IT-chef?",
    "Arbejder du med IT eller OT?",
    "Er du vedligeholdelseschef?",
    "Er du CEO, COO eller sælger hos en maskinbygger?",
    "Arbejder du med aftersales?",
    "Er du planlægger?",
    "Arbejder du med supply chain?",
  ],
}

const roleVideos = (locale: Locale): RoleVideo[] =>
  roleVideoIds.map((videoId, i) => ({ videoId, title: roleTitles[locale][i] }))

// Video titles match the published titles on the OptiPeople YouTube channel.
// The two customer stories are in Danish, the Omron talk is in English; the
// language tag on each card says which, on both locales.
const copy: Record<Locale, VideosCopy> = {
  en: {
    eyebrow: "Videos",
    headline: "See OptiPeople Data Platform in action",
    body: "Customer conversations and partner talks about what changes on the floor once machines, orders, and stop causes are recorded in one place, plus short videos for your role. The customer stories and role videos are in Danish, the Omron talk is in English.",
    watchLabel: "Watch the stories",
    countLabel: (count) => `${count} videos, in Danish and English`,
    rolesTitle: "Find the video for your role",
    rolesBody:
      "One short video per role, on what OptiPeople Data Platform changes in your job, from the CEO to the planner. In Danish.",
    playLabel: "Play",
    roleVideos: roleVideos("en"),
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
    headline: "Se OptiPeople Data Platform i brug",
    body: "Kunder og partnere fortæller, hvad der ændrer sig på gulvet, når maskiner, ordrer og stopårsager bliver registreret samme sted. Og der er en kort video til netop din rolle.",
    watchLabel: "Se historierne",
    countLabel: (count) => `${count} videoer, på dansk og engelsk`,
    rolesTitle: "Find videoen til din rolle",
    rolesBody:
      "En kort video til hver rolle om, hvad OptiPeople Data Platform ændrer i dit job, fra direktøren til planlæggeren.",
    playLabel: "Afspil",
    roleVideos: roleVideos("da"),
    carouselTitle: "Kundehistorier",
    carouselBody:
      "Producenter fortæller med egne ord, hvad de målte før, hvad de har koblet på, og hvad de gør anderledes i dag.",
    videos: [
      {
        videoId: "3LOknXK4buo",
        title: "CASE: Glaseksperten x OptiPeople",
        description:
          "Glaseksperten om at koble produktionen på og få et fælles billede af, hvordan linjerne kører lige nu.",
        languageLabel: "Dansk",
      },
      {
        videoId: "AgHZcfeu8mQ",
        title: "Partnerskabet med OptiPeople (CASE: Nicholaisen)",
        description:
          "Nicholaisen om, hvordan samarbejdet fungerer i hverdagen: fra den første maskine blev koblet på, til tallene bliver brugt i driften.",
        languageLabel: "Dansk",
      },
      {
        videoId: "H4HvdRpmHjo",
        title: "OptiPeople & Omron: turning data into a competitive advantage",
        description:
          "Oplæg sammen med Omron om, hvordan produktionsdata kan give en reel fordel over konkurrenterne: hvad I skal måle, og hvordan I træffer beslutninger ud fra det.",
        languageLabel: "Engelsk",
      },
    ],
    moreTitle: "Hellere læse historierne?",
    moreBody:
      "Vil I hellere have det på skrift, eller vil I se tallene? De skrevne cases går mere i dybden.",
    moreLinks: [
      {
        title: "Alle kundecases",
        description:
          "Resultater fra gulvet: højere OEE, mindre nedetid, og hvad der skulle til.",
        href: "/cases",
      },
      {
        title: "Artikler og viden",
        description:
          "Praktisk viden om OEE, vedligehold og data i produktionen, skrevet af folk, der arbejder med det hver dag.",
        href: "/insights",
      },
      {
        title: "Tal med os",
        description:
          "Vil I se platformen på jeres egne produktionsdata? Book en gennemgang.",
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
        "Korte videoer til din rolle, kundehistorier fra Glaseksperten og Nicholaisen og oplægget med Omron om, hvordan produktionsdata kan give en fordel over konkurrenterne.",
      path: "/videos",
      locale: "da",
    })
  }

  return buildMetadata({
    title: "Videos",
    description:
      "Short videos for your role, OptiPeople customer stories from Glaseksperten and Nicholaisen, plus the Omron talk on turning production data into a competitive advantage.",
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
      <JsonLd
        data={breadcrumbSchema(locale as Locale, [
          { name: locale === "da" ? "Videoer" : "Videos", path: "/videos" },
        ])}
      />
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
              {t.countLabel(t.roleVideos.length + t.videos.length)}
            </p>
          </div>
        </div>
      </section>

      {/* Customer stories, in a grid like the role shorts below. */}
      <section id="stories" className="scroll-mt-24 pb-16 sm:pb-20 lg:pb-28">
        <div className="px-[var(--edge)]">
          <div className="mb-10 max-w-2xl lg:mb-14">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
              {t.carouselTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/72">
              {t.carouselBody}
            </p>
          </div>

          <VideoGrid videos={t.videos} playLabel={t.playLabel} />
        </div>
      </section>

      {/* Role videos. Vertical shorts in a grid, so every role is visible at once. */}
      <section id="roles" className="scroll-mt-24 pb-16 sm:pb-20 lg:pb-28">
        <div className="px-[var(--edge)]">
          <div className="mb-10 max-w-2xl lg:mb-14">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
              {t.rolesTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/72">
              {t.rolesBody}
            </p>
          </div>

          <RoleVideoGrid videos={t.roleVideos} playLabel={t.playLabel} />
        </div>
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
