"use client"

import { usePathname } from "next/navigation"

import { CallToAction } from "@/components/call-to-action"
import {
  getLocaleFromPathname,
  localizeHref,
  shellCopy,
} from "@/lib/i18n"

export function LocalizedCallToAction() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = shellCopy[locale].cta

  return (
    <CallToAction
      title={copy.title}
      description={copy.description}
      primaryLabel={copy.primaryLabel}
      primaryHref={localizeHref("/contact", locale)}
    />
  )
}
