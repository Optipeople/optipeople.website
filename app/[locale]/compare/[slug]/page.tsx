import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { ComparisonPageTemplate } from "@/components/templates/comparison-page"
import { comparisonSlugs, getComparison } from "@/content/pages/comparisons"
import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, faqSchema, pageName } from "@/lib/structured-data"

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const entry = getComparison(slug)
  if (!entry) return {}
  const c = entry.content[locale as Locale]
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: entry.href,
    locale: locale as Locale,
  })
}

export default async function ComparisonRoute({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const entry = getComparison(slug)
  if (!entry) notFound()
  const c = entry.content[locale as Locale]
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale as Locale, [
          { name: pageName(c.metaTitle), path: entry.href },
        ])}
      />
      <JsonLd data={faqSchema(locale as Locale, entry.href, c.faq.items)} />
      <ComparisonPageTemplate page={c} />
    </>
  )
}
