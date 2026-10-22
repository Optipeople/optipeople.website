import { setRequestLocale } from "next-intl/server"

import { CaseArchive } from "@/components/case-archive"
import { getCaseStudies } from "@/lib/blog-data"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, pageName } from "@/lib/structured-data"

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
  videoLabel: string
  emptyTitle: string
  emptyBody: string
  ctaLabel: string
}

const copy: Record<Locale, CasesCopy> = {
  en: {
    metaTitle: "Cases",
    metaDescription:
      "See how manufacturers use OptiPeople Data Platform to execute orders, plan production, and optimize operations.",
    backLabel: "Home",
    eyebrow: "Cases",
    title: "Results from the factory floor",
    subtitle:
      "How manufacturers use OptiPeople Data Platform to execute their orders, plan production, and keep optimizing the factory floor.",
    storiesLabel: "published customer stories",
    measuredLabel: "with a measured result on the line",
    customersLabel: "Manufacturers in these stories",
    moreLabel: "More stories",
    videoLabel: "Video",
    emptyTitle: "No case studies yet",
    emptyBody: "Customer stories will appear here as they are published.",
    ctaLabel: "Read story",
  },
  da: {
    metaTitle: "Cases | OptiPeople",
    metaDescription:
      "Se, hvordan producenter bruger OptiPeople Data Platform til at eksekvere ordrer, planlægge produktionen og optimere driften.",
    backLabel: "Forsiden",
    eyebrow: "Cases",
    title: "Resultater fra gulvet",
    subtitle:
      "Sådan bruger producenter OptiPeople Data Platform til at eksekvere deres ordrer, planlægge produktionen og hele tiden optimere driften på gulvet.",
    storiesLabel: "udgivne kundehistorier",
    measuredLabel: "med et målt resultat på linjen",
    customersLabel: "Virksomhederne i historierne",
    moreLabel: "Flere historier",
    videoLabel: "Video",
    emptyTitle: "Ingen cases endnu",
    emptyBody: "Kundehistorierne kommer her, når de bliver udgivet.",
    ctaLabel: "Læs historien",
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
  const cases = getCaseStudies(locale as Locale)
  const prefix = locale === "da" ? "/da" : ""

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale as Locale, [
          { name: pageName(t.metaTitle), path: "/cases" },
        ])}
      />
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
        videoLabel={t.videoLabel}
        emptyTitle={t.emptyTitle}
        emptyBody={t.emptyBody}
        ctaLabel={t.ctaLabel}
      />
    </>
  )
}
