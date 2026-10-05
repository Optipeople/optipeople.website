import { hasLocale, IntlErrorCode } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { PHASE_PRODUCTION_BUILD } from "next/constants"
import { routing } from "./routing"

const isBuild = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    // A missing key only logs by default. Fail `next build` instead, so a
    // prerendered page never ships with a raw key path in place of copy.
    onError(error) {
      if (isBuild && error.code === IntlErrorCode.MISSING_MESSAGE) throw error
      console.error(error)
    },
  }
})
