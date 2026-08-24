import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { StandardPageTemplate } from "@/components/templates/standard-page"
import { getModule, moduleSlugs } from "@/content/pages/modules"
import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return moduleSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const entry = getModule(slug)
  if (!entry) return {}
  const c = entry.content[locale as Locale]
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: entry.href,
    locale: locale as Locale,
  })
}

export default async function ModulePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const entry = getModule(slug)
  if (!entry) notFound()
  return (
    <StandardPageTemplate
      page={entry.content[locale as Locale]}
      family="modules"
      slug={entry.slug}
    />
  )
}
