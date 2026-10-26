import { setRequestLocale } from "next-intl/server"

import { CaseArchive } from "@/components/case-archive"
import { getCaseStudies } from "@/lib/blog-data"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, pageName } from "@/lib/structured-data"
import { casesCopy as copy } from "@/content/pages/cases"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
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
