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
  emptyTitle: string
  emptyBody: string
  ctaLabel: string
}

const copy: Record<Locale, CasesCopy> = {
  en: {
    metaTitle: "Cases",
    metaDescription:
      "See how manufacturers use OptiPeople and OptiPeople Data Platform to improve OEE, reduce downtime, and make better production decisions.",
    backLabel: "Home",
    eyebrow: "Customer stories",
    title: "Results from the factory floor",
    subtitle:
      "How manufacturers use OptiPeople Data Platform to lift OEE, cut downtime, and turn production data into better decisions.",
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
      "Se, hvordan producenter bruger OptiPeople Data Platform til at få OEE op, mindske nedetiden og træffe bedre beslutninger i produktionen.",
    backLabel: "Forsiden",
    eyebrow: "Kundehistorier",
    title: "Resultater fra gulvet",
    subtitle:
      "Sådan bruger producenter OptiPeople Data Platform til at få OEE op, mindske nedetiden og træffe bedre beslutninger ud fra produktionstallene.",
    storiesLabel: "udgivne kundehistorier",
    measuredLabel: "med et målt resultat på linjen",
    customersLabel: "Virksomhederne i historierne",
    moreLabel: "Flere historier",
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
        emptyTitle={t.emptyTitle}
        emptyBody={t.emptyBody}
        ctaLabel={t.ctaLabel}
      />
    </>
  )
}
