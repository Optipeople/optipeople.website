import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { SimpleLandingPage } from "@/components/templates/simple-page"
import { getSimplePage } from "@/content/pages/simple"
import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"

const PATH = "/services"
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const page = getSimplePage(PATH, locale as Locale)
  if (!page) return {}
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: PATH,
    locale: locale as Locale,
  })
}

export default async function ServicesIndex({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const page = getSimplePage(PATH, locale as Locale)
  if (!page) notFound()
  return <SimpleLandingPage page={page} />
}
