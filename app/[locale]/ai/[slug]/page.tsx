import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { AiStackPage } from "@/components/ai-stack-page"
import { aiCapabilitySlugs, getAiCapability } from "@/lib/ai-stack"
import { type Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, pageName } from "@/lib/structured-data"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return aiCapabilitySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const cap = getAiCapability(slug)
  if (!cap) {
    return buildMetadata({
      title: "Not found | OptiPeople",
      description: "The requested page could not be found.",
      path: `/ai/${slug}`,
      locale: locale as Locale,
    })
  }
  const c = cap.content[locale as Locale]
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: cap.href,
    locale: locale as Locale,
  })
}

export default async function AiCapabilityPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const cap = getAiCapability(slug)
  if (!cap) notFound()
  // There is no /ai index page, so the trail goes straight from home.
  const name = pageName(cap.content[locale as Locale].metaTitle)
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale as Locale, [{ name, path: cap.href }])}
      />
      <AiStackPage slug={slug} locale={locale as Locale} />
    </>
  )
}
