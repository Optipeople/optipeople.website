import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { AiStackPage } from "@/components/ai-stack-page"
import { aiCapabilitySlugs, getAiCapability } from "@/lib/ai-stack"
import { type Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"

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
  if (!getAiCapability(slug)) notFound()
  return <AiStackPage slug={slug} locale={locale as Locale} />
}
