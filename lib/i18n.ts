export type Locale = "en" | "da"

export const locales: Locale[] = ["en", "da"]
export const defaultLocale: Locale = "en"
export const danishPrefix = "/da"

export function getLocaleFromPathname(pathname?: string | null): Locale {
  return pathname?.startsWith(danishPrefix) ? "da" : "en"
}

export function removeLocalePrefix(pathname: string) {
  if (pathname === danishPrefix) return "/"
  if (pathname.startsWith(`${danishPrefix}/`)) {
    return pathname.slice(danishPrefix.length) || "/"
  }

  return pathname || "/"
}

export function addLocalePrefix(pathname: string, locale: Locale) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  const unprefixed = removeLocalePrefix(normalized)

  if (locale === "da") {
    return unprefixed === "/" ? danishPrefix : `${danishPrefix}${unprefixed}`
  }

  return unprefixed
}

export function switchLocalePath(pathname: string, locale: Locale) {
  return addLocalePrefix(removeLocalePrefix(pathname || "/"), locale)
}

export function localizeHref(href: string, locale: Locale) {
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return href
  }

  const [pathWithQuery, hash] = href.split("#")
  const [path, query] = pathWithQuery.split("?")
  const localizedPath = addLocalePrefix(path || "/", locale)
  const localizedQuery = query ? `?${query}` : ""
  const localizedHash = hash ? `#${hash}` : ""

  return `${localizedPath}${localizedQuery}${localizedHash}`
}

export const shellCopy = {
  en: {
    navigationLabel: "Main navigation",
    menuLabel: (title: string) => `${title} menu`,
    submenuLabel: (title: string) => `${title} submenu`,
    linkLabel: (title: string) => `Navigate to ${title} page`,
    talkToUs: "Talk to sales",
    newsletterSignUp: "Newsletter",
    login: "Log in",
    loginMenu: {
      portal: "Portal",
      platform: "Platform",
      aiAssist: "Opti Assist (AI)",
    },
    languageLabel: "Choose language",
    languages: {
      en: "EN",
      da: "DA",
    },
    cta: {
      title: "Turn insight into action",
      description: "Stop guessing. Start running on facts.",
      primaryLabel: "Book a talk",
    },
    newsletterPrompt: {
      eyebrow: "Newsletter",
      title: "Enjoying the read?",
      body: "Practical factory notes — production data, OEE, and maintenance. No noise.",
      exitTitle: "Before you go",
      exitBody:
        "Get practical factory notes in your inbox. No noise, unsubscribe anytime.",
      emailPlaceholder: "you@company.com",
      consent:
        "By subscribing, you agree to receive emails from OptiPeople. Unsubscribe anytime.",
      submit: "Subscribe",
      loading: "Signing up…",
      successTitle: "You're on the list",
      successBody: "Thanks — the next update will land in your inbox.",
      close: "Close",
      noThanks: "No thanks",
      emailInvalid: "Please enter a valid email address",
      consentRequired: "Please confirm you'd like to receive the newsletter",
      errorSubmit: "Something went wrong. Please try again.",
    },
    footer: {
      brand:
        "One platform for production, performance, and connected operations.",
      company: "Company",
      modules: "Modules",
      services: "Services",
      legal: "Legal",
      connect: "Connect",
      rights: "All rights reserved.",
      tagline: "Connected operations made simple",
      followLabel: (title: string) => `Follow us on ${title}`,
    },
  },
  da: {
    navigationLabel: "Hovednavigation",
    menuLabel: (title: string) => `${title} menu`,
    submenuLabel: (title: string) => `${title} undermenu`,
    linkLabel: (title: string) => `Gå til ${title}`,
    talkToUs: "Tal med salg",
    newsletterSignUp: "Nyhedsbrev",
    login: "Log ind",
    loginMenu: {
      portal: "Portal",
      platform: "Platform",
      aiAssist: "Opti Assist (AI)",
    },
    languageLabel: "Vælg sprog",
    languages: {
      en: "EN",
      da: "DA",
    },
    cta: {
      title: "Gør indsigt til handling",
      description: "Stop med at gætte. Begynd at styre på fakta.",
      primaryLabel: "Book en snak",
    },
    newsletterPrompt: {
      eyebrow: "Nyhedsbrev",
      title: "Kan du lide det, du læser?",
      body: "Praktiske noter fra produktionen — produktionsdata, OEE og vedligehold. Ingen støj.",
      exitTitle: "Inden du går",
      exitBody:
        "Få praktiske noter fra produktionen i din indbakke. Ingen støj, afmeld når som helst.",
      emailPlaceholder: "dig@virksomhed.dk",
      consent:
        "Ved at tilmelde dig accepterer du at modtage emails fra OptiPeople. Afmeld når som helst.",
      submit: "Tilmeld",
      loading: "Tilmelder…",
      successTitle: "Du er på listen",
      successBody: "Tak — næste opdatering lander i din indbakke.",
      close: "Luk",
      noThanks: "Nej tak",
      emailInvalid: "Indtast en gyldig emailadresse",
      consentRequired: "Bekræft, at du vil modtage nyhedsbrevet",
      errorSubmit: "Noget gik galt. Prøv igen.",
    },
    footer: {
      brand: "Én platform til produktion, performance og forbundne driftsteams.",
      company: "Virksomhed",
      modules: "Moduler",
      services: "Services",
      legal: "Juridisk",
      connect: "Følg os",
      rights: "Alle rettigheder forbeholdes.",
      tagline: "Forbundet drift gjort enkelt",
      followLabel: (title: string) => `Følg os på ${title}`,
    },
  },
} as const

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
