import type { Locale } from "./routing"

// Structured navigation data (hrefs + titles). Kept as typed per-locale objects
// rather than flat i18n messages because the shape (nested menus, links) matters.
// Hrefs are written unprefixed — the next-intl <Link> localizes them per locale.

export const navigationMenus = {
  en: [
    {
      title: "AI",
      items: [
        { title: "Chat — Opti Assist", href: "/ai/chat" },
        { title: "Workflows", href: "/ai/workflows" },
        { title: "Agents", href: "/ai/agents" },
        { title: "Integrations", href: "/ai/integrations" },
        { title: "API", href: "/ai/api" },
      ],
    },
    {
      title: "Modules",
      items: [
        { title: "Production", href: "/modules/production" },
        { title: "Quality", href: "/modules/quality" },
        { title: "Maintenance", href: "/modules/maintenance" },
        { title: "Energy", href: "/modules/energy" },
        { title: "Analysis", href: "/modules/analysis" },
        { title: "IoT", href: "/modules/iot" },
        { title: "ERP Shopfloor", href: "/modules/erp-shopfloor" },
        { title: "MES", href: "/modules/mes" },
      ],
    },
    {
      title: "Services",
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
        { title: "Videos", href: "/videos" },
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
        { title: "Chat — Opti Assist", href: "/ai/chat" },
        { title: "Workflows", href: "/ai/workflows" },
        { title: "Agenter", href: "/ai/agents" },
        { title: "Integrationer", href: "/ai/integrations" },
        { title: "API", href: "/ai/api" },
      ],
    },
    {
      title: "Moduler",
      items: [
        { title: "Produktion", href: "/modules/production" },
        { title: "Kvalitet", href: "/modules/quality" },
        { title: "Vedligehold", href: "/modules/maintenance" },
        { title: "Energi", href: "/modules/energy" },
        { title: "Analyse", href: "/modules/analysis" },
        { title: "IoT", href: "/modules/iot" },
        { title: "ERP Shopfloor", href: "/modules/erp-shopfloor" },
        { title: "MES", href: "/modules/mes" },
      ],
    },
    {
      title: "Services",
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
        { title: "Videoer", href: "/videos" },
        { title: "Nyhedsbrev", href: "/newsletter" },
        { title: "Mennesker", href: "/resources/people" },
        { title: "Få hjælp", href: "/get-help" },
        { title: "Kontakt", href: "/contact" },
        { title: "Om os", href: "/about" },
      ],
    },
  ],
} as const

export const footerLinks = {
  en: {
    company: [
      { title: "About", href: "/about" },
      { title: "Newsletter", href: "/newsletter" },
      { title: "Contact", href: "/contact" },
    ],
    modules: [
      { title: "Production", href: "/modules/production" },
      { title: "Quality", href: "/modules/quality" },
      { title: "Maintenance", href: "/modules/maintenance" },
      { title: "Energy", href: "/modules/energy" },
      { title: "Analysis", href: "/modules/analysis" },
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
      { title: "Produktion", href: "/modules/production" },
      { title: "Kvalitet", href: "/modules/quality" },
      { title: "Vedligehold", href: "/modules/maintenance" },
      { title: "Energi", href: "/modules/energy" },
      { title: "Analyse", href: "/modules/analysis" },
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
} as const

export type NavLocale = Locale
