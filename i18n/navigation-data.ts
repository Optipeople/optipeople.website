import { moduleNavGroups, moduleNavItems } from "@/content/modules-catalog"
import { featureNavItems } from "@/content/pages/features"

import type { Locale } from "./routing"

// Structured navigation data (hrefs + titles). Kept as typed per-locale objects
// rather than flat i18n messages because the shape (nested menus, links) matters.
// Hrefs are written unprefixed, the next-intl <Link> localizes them per locale.
//
// The Platform and Modules menu and the footer's module column are generated
// from content/modules-catalog.ts, so the module vocabulary here can never
// drift from the hero chips or the homepage carousel.

export type NavItem = {
  title: string
  href: string
  /** Optional second line, only rendered by the mega-menu layout. */
  description?: string
  /** Off-site URL, rendered as a plain anchor instead of a localized Link. */
  external?: boolean
  /**
   * Tinted in the header dropdown, so index pages stand apart from the
   * individual entries listed under them (All cases and Personas above the
   * case posts).
   */
  highlight?: boolean
}

export type NavMenuId = "ai" | "platform" | "services" | "customers" | "resources"

export type NavMenu = {
  /** Locale-independent key, used by the footer to mirror the menu. */
  id: NavMenuId
  title: string
  items: NavItem[]
  /**
   * Panel layout. "list" (the default) is the narrow single-column dropdown;
   * "mega" is a wider panel that shows `groups` as headed columns, used where
   * the item count outgrows a comfortable list.
   */
  layout?: "list" | "mega"
  /**
   * The mega panel's columns. `items` still holds the same links flat, for
   * the footer, which lists them without the grouping.
   */
  groups?: { title: string; items: NavItem[] }[]
  /** Full-width link pinned to the bottom of a mega panel. */
  overview?: NavItem
  /** Quieter links beside `overview`, for indexes one level down. */
  footerLinks?: NavItem[]
}

export const navigationMenus: Record<Locale, NavMenu[]> = {
  en: [
    {
      id: "ai",
      title: "AI and QR codes",
      items: [
        { title: "Opti Assist – Knowledge bank and QR codes", href: "/ai/chat" },
        { title: "Workflows", href: "/ai/workflows" },
        { title: "Agents", href: "/ai/agents" },
        { title: "Integrations", href: "/ai/integrations" },
        { title: "API", href: "/ai/api" },
      ],
    },
    {
      id: "platform",
      title: "Platform and modules",
      layout: "mega",
      items: moduleNavItems("en"),
      groups: moduleNavGroups("en"),
      // The feature deep-dives are not listed one by one: each repeats part of
      // a module, so the module pages link down to them and this one link
      // covers the index.
      footerLinks: [{ title: "All features", href: "/features" }],
      overview: { title: "See the whole data platform", href: "/platform" },
    },
    {
      id: "services",
      title: "Services & advisory",
      items: [
        { title: "Smart Operations", href: "/services/smart-operations" },
        { title: "AI Agentic Solutions", href: "/services/ai-solutions" },
        { title: "Automation", href: "/services/automation" },
        {
          title: "Business Intelligence",
          href: "/services/business-intelligence",
        },
      ],
    },
    {
      id: "customers",
      title: "Cases",
      items: [
        { title: "All cases", href: "/cases", highlight: true },
        { title: "Personas", href: "/about/personas", highlight: true },
        {
          title: "Carl Hansen & Søn",
          href: "/blog/carl-hansen-son-enhances-productivity-and-reduces-setup-times-with-opticloud-and-optiai",
        },
        {
          title: "DFI Geisler",
          href: "/blog/dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights",
        },
        {
          title: "Kvik",
          href: "/blog/kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud",
        },
        {
          title: "Steel Products",
          href: "/blog/optimizing-machine-performance-and-power-consumption-with-opticloud-at-steel-products",
        },
        {
          title: "Dansk Træemballage",
          href: "/blog/dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud",
        },
        {
          title: "XL-BYG Brejnholt",
          href: "/blog/xl-byg-brejnholt-achieves-energy-savings-and-sustainability-with-optimized-forklift-charging",
        },
        {
          title: "Glaseksperten",
          href: "/blog/glaseksperten-up-to-30-percent-more-uptime-on-one-machine",
        },
        {
          title: "Nicholaisen",
          href: "/blog/nicholaisen-building-business-on-the-partnership-with-optipeople",
        },
        {
          title: "Omron",
          href: "/blog/omron-five-kinds-of-data-that-make-production-more-competitive",
        },
      ],
    },
    {
      id: "resources",
      title: "About",
      items: [
        { title: "Insights", href: "/insights" },
        { title: "People", href: "/resources/people" },
        { title: "Get help", href: "/get-help" },
        { title: "Contact", href: "/contact" },
        { title: "About us", href: "/about" },
      ],
    },
  ],
  da: [
    {
      id: "ai",
      title: "AI og QR-koder",
      items: [
        { title: "Opti Assist: Vidensbank og QR-koder", href: "/ai/chat" },
        { title: "Workflows", href: "/ai/workflows" },
        { title: "Agenter", href: "/ai/agents" },
        { title: "Integrationer", href: "/ai/integrations" },
        { title: "API", href: "/ai/api" },
      ],
    },
    {
      id: "platform",
      title: "Platform og moduler",
      layout: "mega",
      items: moduleNavItems("da"),
      groups: moduleNavGroups("da"),
      footerLinks: [{ title: "Alle funktioner", href: "/features" }],
      overview: { title: "Se hele dataplatformen", href: "/platform" },
    },
    {
      id: "services",
      title: "Services & rådgivning",
      items: [
        { title: "Smart Operations", href: "/services/smart-operations" },
        { title: "AI-agentløsninger", href: "/services/ai-solutions" },
        { title: "Automation", href: "/services/automation" },
        {
          title: "Business Intelligence",
          href: "/services/business-intelligence",
        },
      ],
    },
    {
      id: "customers",
      title: "Cases",
      items: [
        { title: "Alle cases", href: "/cases", highlight: true },
        { title: "Personaer", href: "/about/personas", highlight: true },
        {
          title: "Carl Hansen & Søn",
          href: "/blog/carl-hansen-son-enhances-productivity-and-reduces-setup-times-with-opticloud-and-optiai",
        },
        {
          title: "DFI Geisler",
          href: "/blog/dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights",
        },
        {
          title: "Kvik",
          href: "/blog/kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud",
        },
        {
          title: "Steel Products",
          href: "/blog/optimizing-machine-performance-and-power-consumption-with-opticloud-at-steel-products",
        },
        {
          title: "Dansk Træemballage",
          href: "/blog/dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud",
        },
        {
          title: "XL-BYG Brejnholt",
          href: "/blog/xl-byg-brejnholt-achieves-energy-savings-and-sustainability-with-optimized-forklift-charging",
        },
        {
          title: "Glaseksperten",
          href: "/blog/glaseksperten-up-to-30-percent-more-uptime-on-one-machine",
        },
        {
          title: "Nicholaisen",
          href: "/blog/nicholaisen-building-business-on-the-partnership-with-optipeople",
        },
        {
          title: "Omron",
          href: "/blog/omron-five-kinds-of-data-that-make-production-more-competitive",
        },
      ],
    },
    {
      id: "resources",
      title: "Om",
      items: [
        { title: "Viden", href: "/insights" },
        { title: "Holdet", href: "/resources/people" },
        { title: "Få hjælp", href: "/get-help" },
        { title: "Kontakt", href: "/contact" },
        { title: "Om os", href: "/about" },
      ],
    },
  ],
}

// Flat top-level nav links rendered alongside the dropdown menus.
export const navigationLinks: Record<Locale, NavItem[]> = {
  en: [{ title: "Videos", href: "/videos" }],
  da: [{ title: "Videoer", href: "/videos" }],
}

// The newsletter sits in the header's top-right corner, beside "Talk to us",
// rather than in a dropdown. The footer lists it under the About column.
export const newsletterLink: Record<Locale, NavItem> = {
  en: { title: "Newsletter", href: "/newsletter" },
  da: { title: "Nyhedsbrev", href: "/newsletter" },
}

// Portal targets shown under "Log in" in the header (labelled by the
// chrome.loginMenu.* messages) and listed in the footer's Company column, so
// the two can never drift apart.
export const loginTargets = [
  { key: "portal", href: "https://portal.optipeople.dk/" },
  { key: "platform", href: "https://platform.optipeople.dk/" },
  { key: "aiAssist", href: "https://ai.optipeople.dk/" },
] as const

export type LoginTargetKey = (typeof loginTargets)[number]["key"]

export type FooterColumn = {
  title: string
  items: NavItem[]
}

// Copy only the footer needs: labels for pages the header does not carry
// (the archives, the legal pages) and footer-specific wording for shared
// destinations. Everything else is lifted straight out of navigationMenus.
const footerCopy: Record<
  Locale,
  {
    platformOverview: string
    modularMes: string
    features: string
    allFeatures: string
    cases: string
    blog: string
    company: string
    privacy: string
    terms: string
    login: Record<LoginTargetKey, string>
  }
> = {
  en: {
    platformOverview: "Platform overview",
    modularMes: "Modular MES",
    features: "Features",
    allFeatures: "All features",
    cases: "Customer cases",
    blog: "Blog",
    company: "Company",
    privacy: "Privacy policy",
    terms: "Terms of service",
    login: {
      portal: "Log in to Portal",
      platform: "Log in to Platform",
      aiAssist: "Log in to Opti Assist",
    },
  },
  da: {
    platformOverview: "Om platformen",
    modularMes: "Modulært MES",
    features: "Funktioner",
    allFeatures: "Alle funktioner",
    cases: "Kundecases",
    blog: "Blog",
    company: "Virksomhed",
    privacy: "Privatlivspolitik",
    terms: "Vilkår",
    login: {
      portal: "Log ind på Portal",
      platform: "Log ind på Platform",
      aiAssist: "Log ind på Opti Assist",
    },
  },
}

// Pages the header files under Resources but the footer lists under Company.
const COMPANY_HREFS = ["/about", "/contact"]

function menuById(locale: Locale, id: NavMenuId): NavMenu {
  const menu = navigationMenus[locale].find((entry) => entry.id === id)
  if (!menu) throw new Error(`Missing "${id}" menu for locale ${locale}`)
  return menu
}

function itemByHref(items: NavItem[], href: string): NavItem {
  const item = items.find((entry) => entry.href === href)
  if (!item) throw new Error(`Missing nav item ${href}`)
  return item
}

/**
 * Footer columns, in header order. Each column is built from the header's own
 * menus so the footer mirrors the header by construction: add a module or an
 * AI page up there and it appears down here with the same title. Features are
 * the exception: the header only links their index, the footer lists them all.
 *
 * The footer adds two things the header does not carry: the content archives
 * (cases, blog) under Resources, and the legal pages plus the login targets
 * under Company. The header's Customers menu (nine case posts) is represented
 * by the single cases-archive link rather than repeated, plus its Personas link.
 */
function buildFooterColumns(locale: Locale): FooterColumn[] {
  const copy = footerCopy[locale]
  const ai = menuById(locale, "ai")
  const platform = menuById(locale, "platform")
  const services = menuById(locale, "services")
  const resources = menuById(locale, "resources")
  const personas = itemByHref(menuById(locale, "customers").items, "/about/personas")

  const insights = itemByHref(resources.items, "/insights")
  const otherResources = resources.items.filter(
    (item) => item.href !== insights.href && !COMPANY_HREFS.includes(item.href)
  )

  return [
    { title: ai.title, items: ai.items },
    {
      title: platform.title,
      items: [
        { title: copy.platformOverview, href: "/platform" },
        { title: copy.modularMes, href: "/modules/mes" },
        ...platform.items,
      ],
    },
    {
      title: copy.features,
      items: [
        { title: copy.allFeatures, href: "/features" },
        ...featureNavItems(locale),
      ],
    },
    { title: services.title, items: services.items },
    {
      title: resources.title,
      items: [
        insights,
        { title: copy.cases, href: "/cases" },
        personas,
        { title: copy.blog, href: "/blog" },
        ...navigationLinks[locale],
        newsletterLink[locale],
        ...otherResources,
      ],
    },
    {
      title: copy.company,
      items: [
        ...COMPANY_HREFS.map((href) => itemByHref(resources.items, href)),
        { title: copy.privacy, href: "/privacy" },
        { title: copy.terms, href: "/terms" },
        ...loginTargets.map((target) => ({
          title: copy.login[target.key],
          href: target.href,
          external: true,
        })),
      ],
    },
  ]
}

export const footerColumns: Record<Locale, FooterColumn[]> = {
  en: buildFooterColumns("en"),
  da: buildFooterColumns("da"),
}

export type NavLocale = Locale
