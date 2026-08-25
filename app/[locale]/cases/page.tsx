import { setRequestLocale } from "next-intl/server"

import { CaseArchive } from "@/components/case-archive"
import { getCaseStudies } from "@/lib/blog-data"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

type CasesCopy = {
  metaTitle: string
  metaDescription: string
  backLabel: string
  eyebrow: string
  title: string
  subtitle: string
  storiesLabel: string
  measuredLabel: string
  customersLabel: string
  moreLabel: string
  emptyTitle: string
  emptyBody: string
  ctaLabel: string
}

const copy: Record<Locale, CasesCopy> = {
  en: {
    metaTitle: "Cases",
    metaDescription:
      "See how manufacturers use OptiPeople and Opticloud to improve OEE, reduce downtime, and make better production decisions.",
    backLabel: "Home",
    eyebrow: "Customer stories",
    title: "Results from the factory floor",
    subtitle:
      "How manufacturers use Opticloud to lift OEE, cut downtime, and turn production data into better decisions.",
    storiesLabel: "published customer stories",
    measuredLabel: "with a measured result on the line",
    customersLabel: "Manufacturers in these stories",
    moreLabel: "More stories",
    emptyTitle: "No case studies yet",
    emptyBody: "Customer stories will appear here as they are published.",
    ctaLabel: "Read story",
  },
  da: {
    metaTitle: "Cases | OptiPeople",
    metaDescription:
      "Se hvordan produktionsvirksomheder bruger OptiPeople og Opticloud til at forbedre OEE, oppetid og beslutninger.",
    backLabel: "Forsiden",
    eyebrow: "Cases",
    title: "Virkelige resultater fra virkelige fabrikker",
    subtitle:
      "Sådan bruger produktionsvirksomheder Opticloud til at løfte OEE, reducere nedetid og omsætte produktionsdata til bedre beslutninger.",
    storiesLabel: "publicerede kundehistorier",
    measuredLabel: "med et målt resultat på linjen",
    customersLabel: "Virksomhederne i historierne",
    moreLabel: "Flere historier",
    emptyTitle: "Ingen cases endnu",
    emptyBody: "Cases vises her, når kundehistorier bliver publiceret.",
    ctaLabel: "Læs case",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/cases",
    locale: locale as Locale,
  })
}

export default async function CasesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  const cases = getCaseStudies()
  const prefix = locale === "da" ? "/da" : ""

  return (
    <CaseArchive
      cases={cases}
      postBasePath={`${prefix}/blog`}
      backHref={`${prefix}/`}
      backLabel={t.backLabel}
      eyebrow={t.eyebrow}
      title={t.title}
      subtitle={t.subtitle}
      storiesLabel={t.storiesLabel}
      measuredLabel={t.measuredLabel}
      customersLabel={t.customersLabel}
      moreLabel={t.moreLabel}
      emptyTitle={t.emptyTitle}
      emptyBody={t.emptyBody}
      ctaLabel={t.ctaLabel}
    />
  )
}
