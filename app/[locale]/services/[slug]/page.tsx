import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { StandardPageTemplate } from "@/components/templates/standard-page"
import { getService, serviceSlugs } from "@/content/pages/services"
import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const entry = getService(slug)
  if (!entry) return {}
  const c = entry.content[locale as Locale]
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: entry.href,
    locale: locale as Locale,
  })
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const entry = getService(slug)
  if (!entry) notFound()
  return <StandardPageTemplate page={entry.content[locale as Locale]} />
}
