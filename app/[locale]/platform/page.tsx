import { setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { type Locale } from "@/i18n/routing"
import { PlatformFlower } from "@/components/platform-flower"
import { buildMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Platform | OptiPeople",
    description:
      "Explore the OptiCloud platform — connected modules for production, quality, maintenance, energy, and analysis, sharing data in one unified view of your operations.",
  },
  da: {
    title: "Platform | OptiPeople",
    description:
      "Udforsk OptiCloud-platformen — forbundne moduler til produktion, kvalitet, vedligehold, energi og analyse, der deler data i ét samlet billede af driften.",
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const m = metadataCopy[locale as Locale] ?? metadataCopy.en
  return buildMetadata({
    title: m.title,
    description: m.description,
    path: "/platform",
    locale: locale as Locale,
  })
}

export default async function PlatformPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const loc = (locale as Locale) === "da" ? "da" : "en"

  return (
    <main>
      <PlatformFlower locale={loc} />
    </main>
  )
}
