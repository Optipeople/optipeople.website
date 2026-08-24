import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { VideoCarousel, type VideoData } from "@/components/video-carousel"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

type VideosCopy = {
  eyebrow: string
  headline: string
  body: string
  carouselTitle: string
  carouselBody: string
  videos: VideoData[]
  moreTitle: string
  moreBody: string
  moreLinks: { title: string; description: string; href: string }[]
}

// Video titles match the published titles on the OptiPeople YouTube channel.
// All three are recorded in Danish; the language tag says so on both locales.
const copy: Record<Locale, VideosCopy> = {
  en: {
    eyebrow: "Videos",
    headline: "See Opticloud in action",
    body: "Customer conversations and partner talks about what changes on the floor once machines, orders, and stop causes are recorded in one place. The videos are recorded in Danish, and every story below is also written up in full on the site.",
    carouselTitle: "Customer stories",
    carouselBody:
      "Manufacturers describing the work in their own words — what they measured before, what they connected, and what they do differently now.",
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
          "A joint talk with Omron on how production data becomes a real advantage — what to measure, and how to turn it into decisions.",
        languageLabel: "Danish",
      },
    ],
    moreTitle: "Read the stories instead",
    moreBody:
      "Prefer text, or want the numbers? The written cases cover the same ground in more detail.",
    moreLinks: [
      {
        title: "All customer cases",
        description:
          "Results from the factory floor — OEE lifts, downtime reductions, and what it took to get there.",
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
    headline: "Se Opticloud i aktion",
    body: "Kundesamtaler og partneroplæg om, hvad der ændrer sig på gulvet, når maskiner, ordrer og stopårsager bliver registreret ét sted. Alle historier findes også skrevet i fuld længde her på sitet.",
    carouselTitle: "Kundehistorier",
    carouselBody:
      "Produktionsvirksomheder fortæller med egne ord — hvad de målte før, hvad de fik forbundet, og hvad de gør anderledes i dag.",
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
          "Nicholaisen om, hvordan samarbejdet ser ud i hverdagen — fra den første maskine bliver forbundet, til data bliver brugt i den daglige drift.",
        languageLabel: "Dansk",
      },
      {
        videoId: "H4HvdRpmHjo",
        title:
          "OptiPeople & Omron: Sådan udnytter du data til at skabe en konkurrencefordel",
        description:
          "Fælles oplæg med Omron om, hvordan produktionsdata bliver til en reel konkurrencefordel — hvad man skal måle, og hvordan det bliver til beslutninger.",
        languageLabel: "Dansk",
      },
    ],
    moreTitle: "Læs historierne i stedet",
    moreBody:
      "Foretrækker du tekst — eller vil du have tallene? De skrevne cases går mere i dybden.",
    moreLinks: [
      {
        title: "Alle kundecases",
        description:
          "Resultater fra fabriksgulvet — løft i OEE, mindre nedetid, og hvad der skulle til.",
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

export default async function VideosPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en

  return (
    <main className="min-h-screen">
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            {t.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
            {t.headline}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {t.body}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <VideoCarousel videos={t.videos} title={t.carouselTitle} />
        <div className="px-[var(--edge)] mt-10 max-w-2xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            {t.carouselBody}
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 px-[var(--edge)]">
        <div className="max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground">
            {t.moreTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t.moreBody}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.moreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-[var(--gray-2)] p-6 transition-colors hover:bg-foreground/[0.02]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-medium text-foreground">
                  {link.title}
                </h3>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
