import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { StandardPageTemplate } from "@/components/templates/standard-page"
import { featuresForModule } from "@/content/pages/features"
import { getModule, moduleSlugs } from "@/content/pages/modules"
import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, moduleSchema, pageName } from "@/lib/structured-data"
import { getSimplePage } from "@/content/pages/simple"

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
  const c = entry.content[locale as Locale]
  const name = pageName(c.metaTitle)
  const modules = getSimplePage("/modules", locale as Locale)!
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale as Locale, [
          { name: pageName(modules.metaTitle), path: "/modules" },
          { name, path: entry.href },
        ])}
      />
      <JsonLd
        data={moduleSchema({
          name,
          description: c.metaDescription,
          path: entry.href,
          locale: locale as Locale,
        })}
      />
      <StandardPageTemplate
        page={entry.content[locale as Locale]}
        family="modules"
        slug={entry.slug}
        deepDives={featuresForModule(entry.href, locale as Locale)}
      />
    </>
  )
}
