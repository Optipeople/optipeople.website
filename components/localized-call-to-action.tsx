"use client"

import { useLocale, useTranslations } from "next-intl"

import { CallToAction } from "@/components/call-to-action"
import { addLocalePrefix, type Locale } from "@/lib/i18n"

export function LocalizedCallToAction() {
  const locale = useLocale() as Locale
  const t = useTranslations("cta")

  return (
    <CallToAction
      title={t("title")}
      description={t("description")}
      primaryLabel={t("primaryLabel")}
      primaryHref={addLocalePrefix("/contact", locale)}
      className="bg-muted"
    />
  )
}
