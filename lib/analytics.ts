// Google Analytics 4 with Consent Mode v2 in advanced mode.
//
// gtag.js loads on every page for every visitor (see analyticsHeadScript,
// inlined in <head>). Every consent signal defaults to denied, so until a
// visitor says yes GA4 gets cookieless pings: page views and events with no
// _ga cookie and no client id stored on the device. Saying yes on the banner
// grants analytics_storage, and GA4 then sets its cookies. Phones never see
// the banner, so they stay cookieless but are still counted. The site runs no
// ads, so the ad signals are never granted.
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
    /** Set by the head script when GA4 loads on this host. */
    __opGa?: boolean
  }
}

// Preview deployments and localhost would pollute the live property, so GA
// only loads on the real domains. NEXT_PUBLIC_GA_ANY_HOST=1 lifts that for
// testing. Baked into the head script at build time.
const ANY_HOST = process.env.NEXT_PUBLIC_GA_ANY_HOST === "1"

/**
 * Runs in <head> before anything else. Sets the Consent Mode defaults, applies
 * a stored yes before the first hit, then loads gtag.js and sends the config
 * (the first page_view). It also marks <html data-consent> when a choice is
 * already stored: the banner is in the server HTML so it paints with the page,
 * and globals.css hides it for returning visitors before React has run.
 */
export const analyticsHeadScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});gtag('set','url_passthrough',true);(function(){var c;try{c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'{}').analytics}catch(e){}if(c==='granted'||c==='denied')document.documentElement.setAttribute('data-consent','');if(c==='granted')gtag('consent','update',{analytics_storage:'granted'});if(!${ANY_HOST}&&!/(^|\.)optipeople\.(com|dk)$/.test(location.hostname))return;window.__opGa=true;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';document.head.appendChild(s)})();`

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

/**
 * Moves analytics_storage to the visitor's choice. GA keeps sending either
 * way; a no only means cookieless pings again and the old cookies deleted.
 */
export function applyConsent(choice: ConsentChoice) {
  window.gtag?.("consent", "update", { analytics_storage: choice })
  if (choice === "denied") clearGaCookies()
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
 * Sends a GA4 event, consent or not (without consent it goes out as a
 * cookieless ping). Every event carries the
 * page path as source_page so lead sources can be read straight off the event
 * report. (gtag swallows a param called page_path, it is a reserved field.)
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  const payload = { source_page: window.location.pathname, ...params }
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, payload)
  }
  if (!window.__opGa) return
  window.gtag?.("event", name, payload)
}
