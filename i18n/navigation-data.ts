import { moduleNavItems } from "@/content/modules-catalog"
import { featureNavItems } from "@/content/pages/features"

import type { Locale } from "./routing"

// Structured navigation data (hrefs + titles). Kept as typed per-locale objects
// rather than flat i18n messages because the shape (nested menus, links) matters.
// Hrefs are written unprefixed, the next-intl <Link> localizes them per locale.
//
// The Modules menu and the footer's module column are generated from
// content/modules-catalog.ts, so the module vocabulary here can never drift
// from the hero chips or the homepage carousel.

export type NavItem = {
  title: string
  href: string
  /** Optional second line, only rendered by the mega-menu layout. */
  description?: string
}

export type NavMenu = {
  title: string
  items: NavItem[]
  /**
   * Panel layout. "list" (the default) is the narrow single-column dropdown;
   * "mega" is a wide two-column panel that also renders item descriptions,
   * used where the item count outgrows a comfortable list.
   */
  layout?: "list" | "mega"
  /** Optional full-width link pinned to the bottom of a mega panel. */
  overview?: NavItem
  /**
   * A second, denser group inside a mega panel, for pages that sit one level
   * below the menu's own items, rendered under a heading beneath the main
   * grid, titles only.
   */
  secondary?: {
    title: string
    items: NavItem[]
    /** Link to the group's index, shown beside the heading. */
    overview?: NavItem
  }
}

export const navigationMenus: Record<Locale, NavMenu[]> = {
  en: [
    {
      title: "AI",
      items: [
        { title: "Opti Assist Chat", href: "/ai/chat" },
        { title: "Workflows", href: "/ai/workflows" },
        { title: "Agents", href: "/ai/agents" },
        { title: "Integrations", href: "/ai/integrations" },
        { title: "API", href: "/ai/api" },
      ],
    },
    {
      title: "Modules",
      layout: "mega",
      items: moduleNavItems("en"),
      // The capability pages live here: each one is a deep-dive on part of a
      // module, so they belong under Modules rather than in a menu of their own.
      secondary: {
        title: "Features",
        items: featureNavItems("en"),
        overview: { title: "All features", href: "/features" },
      },
      overview: { title: "See the whole platform", href: "/platform" },
    },
    {
      title: "Services & Advisory",
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
      title: "Customers",
      items: [
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
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Insights", href: "/insights" },
        { title: "Newsletter", href: "/newsletter" },
        { title: "People", href: "/resources/people" },
        { title: "Get Help", href: "/get-help" },
        { title: "Contact", href: "/contact" },
        { title: "About", href: "/about" },
      ],
    },
  ],
  da: [
    {
      title: "AI",
      items: [
        { title: "Opti Assist Chat", href: "/ai/chat" },
        { title: "Workflows", href: "/ai/workflows" },
        { title: "Agenter", href: "/ai/agents" },
        { title: "Integrationer", href: "/ai/integrations" },
        { title: "API", href: "/ai/api" },
      ],
    },
    {
      title: "Moduler",
      layout: "mega",
      items: moduleNavItems("da"),
      secondary: {
        title: "Funktioner",
        items: featureNavItems("da"),
        overview: { title: "Alle funktioner", href: "/features" },
      },
      overview: { title: "Se hele platformen", href: "/platform" },
    },
    {
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
      title: "Kunder",
      items: [
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
      ],
    },
    {
      title: "Ressourcer",
      items: [
        { title: "Indsigter", href: "/insights" },
        { title: "Nyhedsbrev", href: "/newsletter" },
        { title: "Mennesker", href: "/resources/people" },
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

export type FooterColumns = {
  company: NavItem[]
  modules: NavItem[]
  services: NavItem[]
  legal: NavItem[]
}

export const footerLinks: Record<Locale, FooterColumns> = {
  en: {
    company: [
      { title: "About", href: "/about" },
      { title: "Newsletter", href: "/newsletter" },
      { title: "Contact", href: "/contact" },
    ],
    modules: [
      { title: "Platform overview", href: "/platform" },
      ...moduleNavItems("en"),
    ],
    services: [
      { title: "Smart Operations", href: "/services/smart-operations" },
      { title: "AI Agentic Solutions", href: "/services/ai-solutions" },
      { title: "Automation", href: "/services/automation" },
      {
        title: "Business Intelligence",
        href: "/services/business-intelligence",
      },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
  da: {
    company: [
      { title: "Om os", href: "/about" },
      { title: "Nyhedsbrev", href: "/newsletter" },
      { title: "Kontakt", href: "/contact" },
    ],
    modules: [
      { title: "Platformoverblik", href: "/platform" },
      ...moduleNavItems("da"),
    ],
    services: [
      { title: "Smart Operations", href: "/services/smart-operations" },
      { title: "AI-agentløsninger", href: "/services/ai-solutions" },
      { title: "Automation", href: "/services/automation" },
      {
        title: "Business Intelligence",
        href: "/services/business-intelligence",
      },
    ],
    legal: [
      { title: "Privatlivspolitik", href: "/privacy" },
      { title: "Vilkår", href: "/terms" },
    ],
  },
}

export type NavLocale = Locale
