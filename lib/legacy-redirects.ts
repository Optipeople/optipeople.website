// Permanent redirects from the old WordPress site at optipeople.com.
//
// Taken from its sitemap (wp-sitemap.xml) on 2026-10-02. The old site kept
// every post and page at the root (/jbs/, /cloud-mes/); here posts live under
// /blog and product pages under /modules, /features and /services. Without
// these, every indexed URL would 404 at launch and lose its ranking.
//
// The old site had no Danish locale, so there are no /da sources. Old posts
// written in Danish that have a .da.md translation here go to /da/blog, so a
// Danish reader lands on Danish text. Everything else goes to English.
//
// On top of the sitemap, the lists carry every old path that Search Console
// or GA4 still saw in the 16 months up to 2026-10 (scripts/seo/
// check-redirects.mjs verifies them), including pages from the Danish site
// before WordPress (/om-os, /nyheder/...).
//
// This list is a frozen record of what was indexed. Do not add new site
// routes here.
//
// Two layers use it:
//
// - next.config.ts turns each pair into a redirect. Every source also matches
//   with a trailing slash (Search Console reports /jbs/), so the old URL takes
//   one 308 straight to its target instead of a slash redirect first.
// - proxy.ts calls resolveLegacyPath() for the variants a plain source cannot
//   express: the Polylang prefixes /en/... and /de/..., stray /da/... copies,
//   dated permalinks (/2020/06/15/tavlemoeder) and emoji-suffixed slugs.
//
// Sources use three forms only: an exact path, a "/:rest*" tail, or a
// ":name(regex)" segment. sourceToRegExp() below understands exactly these.

type Pair = [source: string, destination: string]

// Old posts that exist here under the same slug.
const posts: Pair[] = [
  ["/detaljeret-viden-om-produktion-giver-medicinal-kunde-mulighed-for-at-hoste-lavt-haengende-frugter", "/da/blog/detaljeret-viden-om-produktion-giver-medicinal-kunde-mulighed-for-at-hoste-lavt-haengende-frugter"],
  ["/realtidsbillede-af-produktionen-skaber-samarbejde-mellem-ledere-og-operatorer-pa-et-hojere-niveau", "/da/blog/realtidsbillede-af-produktionen-skaber-samarbejde-mellem-ledere-og-operatorer-pa-et-hojere-niveau"],
  ["/konkurrencekraft-og-tempo-pa-digital-transformation", "/da/blog/konkurrencekraft-og-tempo-pa-digital-transformation"],
  ["/digital-transformation-og-co2-partnerskab-det-er-en-nodvendighed", "/blog/digital-transformation-og-co2-partnerskab-det-er-en-nodvendighed"],
  ["/krisestyring-med-oee", "/blog/krisestyring-med-oee"],
  ["/fra-e-handel-til-industri-4-0", "/blog/fra-e-handel-til-industri-4-0"],
  ["/ved-du-at-du-kan-have-din-fabrik-i-lommen", "/blog/ved-du-at-du-kan-have-din-fabrik-i-lommen"],
  ["/sammenspillet-mellem-opticloud-og-ifix-fra-general-electrics", "/da/blog/sammenspillet-mellem-opticloud-og-ifix-fra-general-electrics"],
  ["/supply-chain-management-og-effektivitet", "/blog/supply-chain-management-og-effektivitet"],
  ["/hvad-er-industri-4-0", "/blog/hvad-er-industri-4-0"],
  ["/emnetaeller", "/blog/emnetaeller"],
  ["/bohica", "/blog/bohica"],
  ["/nulfejlskultur", "/blog/nulfejlskultur"],
  ["/fokus-pa-capex", "/blog/fokus-pa-capex"],
  ["/tavlemoder", "/blog/tavlemoder"],
  ["/skiftehold-uden-bovl", "/blog/skiftehold-uden-bovl"],
  ["/fun-facts-hvad-koster-det", "/blog/fun-facts-hvad-koster-det"],
  ["/de-seks-store-effektiviserings-omrader", "/blog/de-seks-store-effektiviserings-omrader"],
  ["/fra-data-til-effektivitet", "/da/blog/fra-data-til-effektivitet"],
  ["/efficiency-as-a-service", "/blog/efficiency-as-a-service"],
  ["/cloud-mes-cloud-based-manufacturing-execution-system", "/blog/cloud-mes-cloud-based-manufacturing-execution-system"],
  ["/iot-consultancy-and-development", "/blog/iot-consultancy-and-development"],
  ["/microsoft-power-bi-consultancy-and-development", "/blog/microsoft-power-bi-consultancy-and-development"],
  ["/jbs", "/blog/jbs"],
  ["/expedit-opticloud-enables-decision-making-around-automations-and-investments", "/blog/expedit-opticloud-enables-decision-making-around-automations-and-investments"],
  ["/how-do-i-improve-my-oee-with-examples", "/blog/how-do-i-improve-my-oee-with-examples"],
  // Merged into what-is-oee on 2026-10-05, so its old blog URLs move too.
  ["/what-is-oee-for-manufacturing-and-maintenance", "/blog/what-is-oee"],
  ["/blog/what-is-oee-for-manufacturing-and-maintenance", "/blog/what-is-oee"],
  ["/da/blog/what-is-oee-for-manufacturing-and-maintenance", "/da/blog/what-is-oee"],
  ["/how-to-calculate-oee-for-manufacturing-and-maintenance", "/blog/how-to-calculate-oee-for-manufacturing-and-maintenance"],
  ["/what-are-the-effects-of-oee", "/blog/what-are-the-effects-of-oee"],
  ["/opticloud-api-how-to-use-it-step-by-step", "/blog/opticloud-api-how-to-use-it-step-by-step"],
  ["/which-operations-would-be-described-as-preventive-maintenance", "/blog/which-operations-would-be-described-as-preventive-maintenance"],
  ["/opticloud-mqtt-json-schema", "/blog/opticloud-mqtt-json-schema"],
  ["/what-are-the-5-principles-of-lean-manufacturing", "/blog/what-are-the-5-principles-of-lean-manufacturing"],
  ["/the-fifth-industrial-revolution-industry-5-0", "/blog/the-fifth-industrial-revolution-industry-5-0"],
  ["/how-to-increase-manufacturing-efficiency-in-your-facility-today", "/blog/how-to-increase-manufacturing-efficiency-in-your-facility-today"],
  ["/what-is-the-difference-between-preventive-and-predictive-maintenance", "/blog/what-is-the-difference-between-preventive-and-predictive-maintenance"],
  ["/what-are-the-advantages-and-disadvantages-of-predictive-maintenance", "/blog/what-are-the-advantages-and-disadvantages-of-predictive-maintenance"],
  ["/what-are-the-examples-of-predictive-maintenance", "/blog/what-are-the-examples-of-predictive-maintenance"],
  ["/how-does-predictive-maintenance-work", "/blog/how-does-predictive-maintenance-work"],
  ["/predictive-maintenance-vs-reactive-maintenance", "/blog/predictive-maintenance-vs-reactive-maintenance"],
  ["/what-is-the-definition-or-meaning-of-predictive-maintenance", "/blog/what-is-the-definition-or-meaning-of-predictive-maintenance"],
  ["/what-are-predictive-maintenance-tools", "/blog/what-are-predictive-maintenance-tools"],
  ["/oee-for-maintenance", "/blog/oee-for-maintenance"],
  ["/oee-teep-and-ooe-whats-the-difference-with-examples", "/blog/oee-teep-and-ooe-whats-the-difference-with-examples"],
  ["/predictive-maintenance-the-benefits-you-get-from-it", "/blog/predictive-maintenance-the-benefits-you-get-from-it"],
  ["/the-four-types-of-predictive-maintenance-and-why-they-matter", "/blog/the-four-types-of-predictive-maintenance-and-why-they-matter"],
  ["/cmms-the-ultimate-guide-for-facility-management-professionals-and-owners", "/blog/cmms-the-ultimate-guide-for-facility-management-professionals-and-owners"],
  ["/dashboards", "/blog/dashboards"],
  ["/units-produced-per-hour-v51", "/blog/units-produced-per-hour-v51"],
  ["/kwh-per-produced-unit-v50", "/blog/kwh-per-produced-unit-v50"],
  ["/oee1-vs-oee2-whats-the-difference", "/blog/oee1-vs-oee2-whats-the-difference"],
  ["/unlocking-world-class-performance-with-oee-how-to-maximize-efficiency-and-results", "/blog/unlocking-world-class-performance-with-oee-how-to-maximize-efficiency-and-results"],
  ["/what-is-oee", "/blog/what-is-oee"],
  ["/opticlouds-efficiency-and-oee-module", "/blog/opticlouds-efficiency-and-oee-module"],
  ["/maximize-productivity-with-opticlouds-predictive-maintenance", "/blog/maximize-productivity-with-opticlouds-predictive-maintenance"],
  ["/opticloud-real-time-dashboard-powering-decision-making-enhancing-efficiency", "/blog/opticloud-real-time-dashboard-powering-decision-making-enhancing-efficiency"],
  ["/opticlouds-enhanced-reporting-feature-your-businesss-new-best-friend", "/blog/opticlouds-enhanced-reporting-feature-your-businesss-new-best-friend"],
  ["/optimizing-machine-performance-and-power-consumption-with-opticloud-at-steel-products", "/blog/optimizing-machine-performance-and-power-consumption-with-opticloud-at-steel-products"],
  ["/carl-hansen-son-enhances-productivity-and-reduces-setup-times-with-opticloud-and-optiai", "/blog/carl-hansen-son-enhances-productivity-and-reduces-setup-times-with-opticloud-and-optiai"],
  ["/danpres-boosting-production-by-reducing-tool-repair-time-by-50", "/blog/danpres-boosting-production-by-reducing-tool-repair-time-by-50"],
  ["/dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud", "/blog/dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud"],
  ["/kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud", "/blog/kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud"],
  ["/dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights", "/blog/dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights"],
  ["/xl-byg-brejnholt-achieves-energy-savings-and-sustainability-with-optimized-forklift-charging", "/blog/xl-byg-brejnholt-achieves-energy-savings-and-sustainability-with-optimized-forklift-charging"],
  ["/ligna-2025", "/blog/ligna-2025"],
  ["/kvik-case-study-og-video-fra-direktoren", "/da/blog/kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud"],
]

// Old short feature posts, release notes and videos with no post of their
// own here. Each goes to the page that now covers the same feature.
const retiredPosts: Pair[] = [
  ["/energy-and-co2", "/modules/energy"],
  ["/energy-and-co2-measurements", "/modules/energy"],
  ["/indsamling-af-energidata", "/da/modules/energy"],
  ["/predictive-maintenance-module", "/modules/maintenance"],
  ["/optimizing-tpm-with-opticlouds-latest-api-additions-v53", "/modules/maintenance"],
  ["/how-to-accept-tasks-on-the-operator-panel", "/features/maintenance-and-tasks"],
  ["/operators-digital-log-book", "/features/maintenance-and-tasks"],
  ["/split-and-edit-wastes", "/features/stop-cause-registration"],
  ["/waste-reasons-and-stop-causes", "/features/stop-cause-registration"],
  ["/waste-distrubution-general", "/features/stop-cause-registration"],
  ["/shifts-and-shift-templates", "/features/production-efficiency"],
  ["/skip-shifts-in-opticloud-better-planned-production-v53", "/features/production-efficiency"],
  ["/performance-and-capacity", "/features/production-efficiency"],
  ["/oee-real-time-and-historic-data", "/features/production-efficiency"],
  ["/availability-real-time-data", "/features/production-efficiency"],
  ["/availability-historic-and-daily-data", "/features/production-efficiency"],
  ["/settings-oee-targets", "/features/production-efficiency"],
  ["/comparing-machines-v50", "/features/production-efficiency"],
  ["/quality-module", "/modules/quality"],
  ["/custom-fields-for-unit-information-v52", "/modules/quality"],
  ["/data-collection-of-any-value", "/modules/iot"],
  ["/streamlining-oee-reporting-with-pdf-generation-v53", "/features/analysis-and-reporting"],
  ["/how-to-create-a-dashboard-in-opticloud", "/features/analysis-and-reporting"],
  ["/how-to-create-a-report-in-opticloud", "/features/analysis-and-reporting"],
  ["/opti-insights-the-future-of-machine-prediction-v52", "/features/ai-and-copilots"],
  ["/boosting-oee-and-production-efficiency-with-ai-and-gpt", "/features/ai-and-copilots"],
  ["/opticloud-power-bi-kursus-for-begyndere", "/da/services/business-intelligence"],
  // The Dansand case is a draft here, so its /blog page 404s. Point this at
  // /blog/<slug> once the draft is published.
  ["/dansand-3-5-million-bags-of-sand-yearly-opticloud-enables-better-time-management", "/cases"],
  // Two cases that were already gone from the old site (404 there on
  // 2026-10-05) and never made it into this repo.
  ["/ege-carpets-enhances-production-efficiency-and-quality-with-optipeoples-real-time-dashboards-and-proactive-maintenance-solutions", "/cases"],
  ["/fog-veno-a-s-improving-uptime-on-a-packing-line-by-25-and-simultaneously-increasing-the-output-of-items-by-83", "/cases"],
]

// Old pages. /cases, /about, /contact and /get-help keep their paths and
// need no redirect.
const pages: Pair[] = [
  ["/opticloud", "/platform"],
  ["/opticloud-features", "/features"],
  ["/opticloud-manufacturing-solutions", "/solutions/manufacturing"],
  ["/partners", "/about"],
  ["/pricing", "/contact"],
  ["/try-opticloud-free", "/contact"],
  ["/contact-us", "/contact"],
  ["/opticloud-math-expression-eval", "/get-help"],
  ["/terms-and-conditions/:rest*", "/terms"],
  ["/template-terms-and-conditions", "/terms"],
  ["/terms-of-service", "/terms"],
  ["/privacy-policy", "/privacy"],
  ["/cookie-og-privatlivspolitik-hos-optipeople-aps", "/da/privacy"],
  ["/about-us", "/about"],
  ["/imprint", "/about"],
  ["/frequently-asked-questions", "/get-help"],
  ["/opticloud-roadmap", "/platform"],
  ["/manual-processes", "/services/automation"],
  ["/industries", "/solutions/manufacturing"],
  ["/retail", "/solutions/manufacturing"],
  ["/case-studies", "/cases"],
  ["/news", "/blog"],
  ["/sample-page-2", "/"],
  ["/product-and-services/efficiency-uptime-and-oee/:rest*", "/modules/production"],
  ["/product-and-services/:rest*", "/modules"],
  ["/cloud-mes", "/modules/mes"],
  ["/opticloud-cloud-mes-platform", "/modules/mes"],
  ["/fact-based-performance", "/modules/production"],
  ["/efficiency-and-oee", "/modules/production"],
  ["/efficiency-oee-availability-stops-quality-units-etc", "/modules/production"],
  ["/predictive-maintenance", "/modules/maintenance"],
  ["/preventive-maintenance", "/modules/maintenance"],
  ["/predictive-maintenance-cmms-tpm", "/modules/maintenance"],
  ["/energy-efficiency", "/modules/energy"],
  ["/energy-co2-and-sustainability", "/modules/energy"],
  ["/energy-and-co2-ems-cts", "/modules/energy"],
  ["/batch-information-and-traceability", "/modules/quality"],
  ["/dataopsamling", "/da/modules/iot"],
  ["/iot-devices-gateways-data-from-machines", "/modules/iot"],
  ["/integrated-data-solutions", "/modules/erp-shopfloor"],
  ["/stop-cause-registration", "/features/stop-cause-registration"],
  ["/stop-cause-analysis", "/features/stop-cause-registration"],
  ["/with-only-3-steps-you-can-identify-your-stop-reason", "/features/stop-cause-registration"],
  ["/camera-addon-for-stop-analysis", "/features/stop-cause-registration"],
  ["/video-feed-for-stop-analysis", "/features/stop-cause-registration"],
  ["/dashboard", "/features/analysis-and-reporting"],
  ["/customizable-dashboards", "/features/analysis-and-reporting"],
  ["/customizable-reports", "/features/analysis-and-reporting"],
  ["/interfaces-for-data-visualization", "/features/analysis-and-reporting"],
  ["/production-insights-and-recommendations", "/features/ai-and-copilots"],
  ["/forecasting-machine-learning", "/features/ai-and-copilots"],
  ["/forecasting-with-machine-learning", "/features/ai-and-copilots"],
  ["/business-intelligence", "/services/business-intelligence"],
  ["/power-bi-consultancy", "/services/business-intelligence"],
  ["/software-development", "/services"],
]

// The Danish site before WordPress. Its pages still draw the odd visit, so
// each goes to the Danish page that covers the same ground.
const danishSite: Pair[] = [
  ["/om-os", "/da/about"],
  ["/partnere", "/da/about"],
  ["/profil/:rest*", "/da/about"],
  ["/kontakt", "/da/contact"],
  ["/kontakt-os/:rest*", "/da/contact"],
  ["/opticloud-fordele", "/da/platform"],
  ["/opticloud/:rest*", "/da/platform"],
  ["/datalogger", "/da/modules/iot"],
  ["/integrationslosninger", "/da/modules/erp-shopfloor"],
  ["/kurser", "/da/services/business-intelligence"],
  ["/services/avanceret-dataanalyse", "/da/services/business-intelligence"],
  ["/hvorfor-oee-er-lig-effektivitet", "/da/modules/production"],
  ["/prisen-for-nedetid", "/da/modules/production"],
  ["/webinar-effektivisering-med-oee-maaling", "/da/modules/production"],
  ["/produktionsoptimering/:rest*", "/da/modules/production"],
  ["/referencer/:rest*", "/da/cases"],
  ["/nyheder/:rest*", "/da/blog"],
  ["/ledelse/:rest*", "/da/blog"],
  // Old operator panel and dashboard logins. The header's login menu now
  // lists the portals.
  ["/operator", "/"],
  ["/operator-panel/:rest*", "/"],
  ["/portal-operator-panel/:rest*", "/"],
  ["/realtime-dashboard/:rest*", "/"],
]

// Category and author archives. The :rest* tail also catches WordPress
// pagination such as /category/cases/page/2.
const archives: Pair[] = [
  ["/category/cases-oee/:rest*", "/cases"],
  ["/category/cases/:rest*", "/cases"],
  ["/category/insights/:rest*", "/insights"],
  ["/category/news/:rest*", "/blog"],
  ["/category/videos/:rest*", "/videos"],
  ["/category/feature/:rest*", "/features"],
  ["/category/ai/:rest*", "/features/ai-and-copilots"],
  ["/category/oee/:rest*", "/modules/production"],
  ["/category/energy-efficiency/:rest*", "/modules/energy"],
  ["/category/predictive-maintenance/:rest*", "/modules/maintenance"],
  ["/category/product-and-services/efficiency-uptime-and-oee/:rest*", "/modules/production"],
  ["/category/product-and-services/predictive-maintenance-opticloud/:rest*", "/modules/maintenance"],
  ["/category/product-and-services/production-insights-and-recommendations/:rest*", "/features/ai-and-copilots"],
  ["/category/product-and-services/:rest*", "/modules"],
  ["/category/efficiency-uptime-and-oee/:rest*", "/modules/production"],
  ["/category/predictive-maintenance-opticloud/:rest*", "/modules/maintenance"],
  ["/category/production-insights-and-recommendations/:rest*", "/features/ai-and-copilots"],
  ["/category/energy-co2-and-sustainability/:rest*", "/modules/energy"],
  ["/category/:rest*", "/blog"],
  ["/author/:rest*", "/about"],
  // Blog pagination (/page/7) from the old front page.
  ["/page/:n(\\d+)", "/blog"],
]

const rules = [...posts, ...retiredPosts, ...pages, ...danishSite, ...archives]

// "{/}?" lets each source match with or without a trailing slash. That only
// works because next.config.ts sets skipTrailingSlashRedirect; otherwise
// Next strips the slash in a redirect of its own before these rules run.
export const legacyRedirects = rules.map(([source, destination]) => ({
  source: `${source}{/}?`,
  destination,
  permanent: true,
}))

// Old dated permalinks whose slug differs from the undated one by more than
// the oe/aa spelling of ø and å.
const datedSlugAliases: Record<string, string> = {
  "detaljeret-viden-om-produktion-gav-medicinal-kunde-mulighed-for-at-hoeste-lavt-haengende-frugter":
    "detaljeret-viden-om-produktion-giver-medicinal-kunde-mulighed-for-at-hoste-lavt-haengende-frugter",
  "de-seks-store-effektiviseringsomrader": "de-seks-store-effektiviserings-omrader",
}

const compiled = rules.map(([source, destination]) => ({
  pattern: sourceToRegExp(source),
  destination,
}))

function sourceToRegExp(source: string): RegExp {
  let pattern = ""
  for (const part of source.split(/(\/:rest\*|:\w+\([^)]*\))/)) {
    if (part === "/:rest*") pattern += "(?:/.*)?"
    else if (part.startsWith(":")) pattern += part.replace(/^:\w+/, "")
    else pattern += part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }
  return new RegExp(`^${pattern}$`, "i")
}

function matchRule(path: string): string | null {
  // WordPress let editors end a slug with an emoji (".../by-83-👌"); the
  // slug without it is the one in the map.
  const trimmed = path.replace(/[^\x00-\x7f]+$/u, "").replace(/-+$/, "")
  for (const candidate of new Set([path, trimmed])) {
    const hit = compiled.find((rule) => rule.pattern.test(candidate))
    if (hit) return hit.destination
  }
  return null
}

// WordPress permalinks from 2020 and 2021: /2020/06/15/tavlemoeder, sometimes
// without the day. Their slugs spell ø and å as oe and aa, where the undated
// slugs use o and a. Every dated post was Danish, so one with no post here
// lands on the Danish blog.
function matchDated(path: string): string | null {
  const m = path.match(/^\/\d{4}\/\d{2}(?:\/\d{2})?(?:\/([^/]+))?(?:\/.*)?$/)
  if (!m) return null
  const slug = m[1]
  if (!slug) return "/da/blog"
  const base = slug.replace(/[^\x00-\x7f]+$/u, "").replace(/-+$/, "")
  const candidates = [
    slug,
    base,
    datedSlugAliases[base],
    base.replace(/oe/g, "o").replace(/aa/g, "a"),
  ].filter(Boolean)
  for (const candidate of candidates) {
    const hit = matchRule(`/${candidate}`)
    if (hit) return hit
  }
  return "/da/blog"
}

function toDanish(destination: string): string {
  if (destination === "/" || destination === "/da") return "/da"
  return destination.startsWith("/da/") ? destination : `/da${destination}`
}

// Resolves an old URL that the plain redirects cannot express, or returns
// null to let the request through. Only paths that are not app routes can
// match: no legacy source collides with a route of the new site, so /en/blog
// and /da/modules/... pass through untouched. That matters for /en in
// particular: next-intl's language switcher links to /en/... to set the
// locale cookie before it drops the prefix.
export function resolveLegacyPath(pathname: string): string | null {
  let path: string
  try {
    path = decodeURIComponent(pathname)
  } catch {
    path = pathname
  }
  path = path.toLowerCase().replace(/\/+$/, "") || "/"

  // Polylang served the same Danish posts under /en and /de. A /da prefix
  // also turns up on a few old paths; those get the Danish target.
  const prefix = path.match(/^\/(en|de|da)(?=\/|$)/)?.[1]
  const rest = prefix ? path.slice(prefix.length + 1) || "/" : path

  if (rest === "/") return prefix === "de" ? "/" : null

  const target = matchDated(rest) ?? matchRule(rest)
  if (!target) return null
  return prefix === "da" ? toDanish(target) : target
}
