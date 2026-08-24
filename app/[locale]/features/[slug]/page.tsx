import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { FeaturePageTemplate } from "@/components/templates/feature-page"
import { getFeature, featureSlugs } from "@/content/pages/features"
import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return featureSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const entry = getFeature(slug)
  if (!entry) return {}
  const c = entry.content[locale as Locale]
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: entry.href,
    locale: locale as Locale,
  })
}

export default async function FeaturePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const entry = getFeature(slug)
  if (!entry) notFound()
  return (
    <FeaturePageTemplate page={entry.content[locale as Locale]} slug={entry.slug} />
  )
}
