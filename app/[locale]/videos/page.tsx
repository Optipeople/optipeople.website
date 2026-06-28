import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { VideoCarousel, type VideoData } from "@/components/video-carousel"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

const customerVideos: VideoData[] = [
  { videoId: "3LOknXK4buo" },
  { videoId: "AgHZcfeu8mQ" },
  { videoId: "H4HvdRpmHjo" },
]

const copy: Record<
  Locale,
  { eyebrow: string; headline: string; body: string; carouselTitle: string }
> = {
  en: {
    eyebrow: "Videos",
    headline: "See Opticloud in action",
    body: "Watch product demos, customer stories, and tutorials to understand how Opticloud works on the shopfloor.",
    carouselTitle: "Customer stories",
  },
  da: {
    eyebrow: "Videoer",
    headline: "Se Opticloud i aktion",
    body: "Se produktdemoer, kundehistorier og guides, der viser hvordan Opticloud fungerer på fabriksgulvet.",
    carouselTitle: "Videohistorier",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  if (locale === "da") {
    return buildMetadata({
      title: "Videoer | OptiPeople",
      description:
        "Se Opticloud-demoer, kundehistorier og forklaringer om digital produktion.",
      path: "/videos",
      locale: "da",
    })
  }

  return buildMetadata({
    title: "Videos",
    description:
      "Watch OptiPeople demos, tutorials, and customer stories to see how Opticloud works on the shopfloor.",
    path: "/videos",
    locale: "en",
  })
}

export default async function VideosPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale]

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
        <VideoCarousel videos={customerVideos} title={t.carouselTitle} />
      </section>
    </main>
  )
}
