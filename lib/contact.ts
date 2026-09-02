import type { Locale } from "@/i18n/routing"

/**
 * The company inboxes.
 *
 * General enquiries are answered in the language they arrive in, so each
 * locale has its own inbox: hej@ for Danish, hi@ for English. Anything to do
 * with help and support goes to the shared support inbox regardless of
 * language, because that is the one the support rotation watches.
 */
export const GENERAL_EMAIL: Record<Locale, string> = {
  da: "hej@optipeople.dk",
  en: "hi@optipeople.dk",
} as const

export const SUPPORT_EMAIL = "support@optipeople.dk"

export function generalEmail(locale: Locale) {
  return GENERAL_EMAIL[locale] ?? GENERAL_EMAIL.en
}
