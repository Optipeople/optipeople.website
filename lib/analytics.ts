// Google Analytics 4 behind a consent banner.
//
// Consent Mode v2 defaults every signal to denied (see consentDefaultScript,
// inlined in <head>). gtag.js itself is only fetched after the visitor says
// yes, so nothing reaches Google and no cookie is set before consent. Only
// analytics_storage is ever granted: the site runs no ads.
//
// Page views on client-side navigation come from GA4 enhanced measurement
// ("page changes based on browser history events" is on for the stream), so
// the site only sends the initial config and its own events.

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-7W1E4VW2T5"

const CONSENT_KEY = "op_consent"
const OPEN_EVENT = "op:consent-open"
export const CONSENT_CHANGE_EVENT = "op:consent-change"

export type ConsentChoice = "granted" | "denied"

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

/** Runs in <head> before anything else, so the default is in place first. */
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});`

// Preview deployments and localhost would pollute the live property, so GA
// only loads on the real domains. NEXT_PUBLIC_GA_ANY_HOST=1 lifts that for
// testing.
function trackingHost(): boolean {
  if (process.env.NEXT_PUBLIC_GA_ANY_HOST === "1") return true
  return /(^|\.)optipeople\.(com|dk)$/.test(window.location.hostname)
}

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as { analytics?: string }
    return data.analytics === "granted" || data.analytics === "denied"
      ? data.analytics
      : null
  } catch {
    return null
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ analytics: choice, at: Date.now() })
    )
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
  applyConsent(choice)
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

/** Lets any link or button reopen the banner, e.g. from the privacy page. */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onConsentSettingsOpen(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}

let loaded = false

export function applyConsent(choice: ConsentChoice) {
  const disableKey = `ga-disable-${GA_MEASUREMENT_ID}`
  if (choice === "denied") {
    ;(window as unknown as Record<string, unknown>)[disableKey] = true
    window.gtag?.("consent", "update", { analytics_storage: "denied" })
    clearGaCookies()
    return
  }
  if (!trackingHost()) return
  ;(window as unknown as Record<string, unknown>)[disableKey] = false
  const gtag = ensureGtag()
  gtag("consent", "update", { analytics_storage: "granted" })
  if (loaded) return
  loaded = true
  gtag("js", new Date())
  gtag("config", GA_MEASUREMENT_ID)
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js expects the Arguments object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
  }
  return window.gtag
}

// Withdrawing consent should not leave the old client id behind.
function clearGaCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"))
  if (names.length === 0) return
  const parts = window.location.hostname.split(".")
  const domains = [""]
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push(`; domain=.${parts.slice(i).join(".")}`)
  }
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
    }
  }
}

/**
 * Sends a GA4 event when the visitor has said yes. Every event carries the
 * page path as source_page so lead sources can be read straight off the event
 * report. (gtag swallows a param called page_path, it is a reserved field.)
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  const payload = { source_page: window.location.pathname, ...params }
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, payload)
  }
  if (!loaded || readConsent() !== "granted") return
  window.gtag?.("event", name, payload)
}
