import type { Locale } from "@/i18n/routing"

/**
 * The canonical module list.
 *
 * Every place that names the modules, the hero chips, the header dropdown,
 * the footer column, the /modules index, and the homepage module carousel,
 * reads from here, so the vocabulary can only be changed in one place. Adding
 * a module means adding one entry; the four surfaces pick it up automatically.
 *
 * `href` deliberately keeps the historical page slugs (OEE lives at
 * /modules/production, Orders at /modules/erp-shopfloor). The labels are the
 * product vocabulary; the URLs stay put so existing links and search results
 * keep working.
 *
 * The order is deliberate and reads as an argument: the foundation, how the
 * data arrives, the number people came for, the assistant that reads all of
 * it, then shopfloor to office. It also alternates the mockup silhouettes on
 * the homepage carousel, where three or four cards are visible at once, so no
 * two neighbours look alike. Reordering here moves the carousel, the header
 * dropdown, the footer column and the /modules index together.
 */
export type ModuleEntry = {
  /** Stable, locale-independent key. Used for React keys and hero chip state. */
  id: string
  /** Unprefixed canonical path, the next-intl <Link> localizes it per locale. */
  href: string
  label: Record<Locale, string>
  /** One-liner for link grids (the /modules index, related-link cards). */
  blurb: Record<Locale, string>
}

export const moduleCatalog: ModuleEntry[] = [
  {
    id: "mes",
    href: "/modules/mes",
    label: { en: "Modular MES", da: "Modulært MES" },
    blurb: {
      en: "The cloud MES foundation every other module plugs into.",
      da: "Det cloudbaserede MES-fundament, alle andre moduler bygger på.",
    },
  },
  {
    id: "iot",
    href: "/modules/iot",
    label: { en: "IoT", da: "IoT" },
    blurb: {
      en: "Connect new and legacy machines, sensors, and protocols.",
      da: "Forbind nye og gamle maskiner, sensorer og protokoller.",
    },
  },
  {
    id: "oee",
    href: "/modules/production",
    label: { en: "OEE", da: "OEE" },
    blurb: {
      en: "Live OEE, downtime, orders, and shift performance.",
      da: "Live OEE, nedetid, ordrer og skiftperformance.",
    },
  },
  {
    id: "ai-agents",
    href: "/ai/agents",
    label: { en: "AI agents", da: "AI-agenter" },
    blurb: {
      en: "Agents and copilots that work on your own production data.",
      da: "Agenter og copilots, der arbejder på jeres egne produktionsdata.",
    },
  },
  {
    id: "maintenance",
    href: "/modules/maintenance",
    label: { en: "Maintenance", da: "Vedligehold" },
    blurb: {
      en: "Preventive planning and mobile task management.",
      da: "Forebyggende planlægning og mobil opgavestyring.",
    },
  },
  {
    id: "ems",
    href: "/modules/energy",
    label: { en: "EMS", da: "EMS" },
    blurb: {
      en: "Energy consumption connected to production output.",
      da: "Energiforbrug koblet til produktionens output.",
    },
  },
  {
    id: "qms",
    href: "/modules/quality",
    label: { en: "QMS", da: "QMS" },
    blurb: {
      en: "Digital checks, deviations, and full traceability.",
      da: "Digitale kontroller, afvigelser og fuld sporbarhed.",
    },
  },
  {
    id: "orders",
    href: "/modules/erp-shopfloor",
    label: { en: "Orders", da: "Ordrer" },
    blurb: {
      en: "Two-way sync between ERP planning and the floor.",
      da: "Tovejssynk mellem ERP-planlægning og gulvet.",
    },
  },
  {
    id: "planning",
    href: "/modules/planning",
    label: { en: "Planning", da: "Planlægning" },
    blurb: {
      en: "Sequence production against the capacity you actually have.",
      da: "Planlæg produktionen efter den kapacitet I faktisk har.",
    },
  },
  {
    id: "documents",
    href: "/modules/documents",
    label: { en: "Documents", da: "Dokumenter" },
    blurb: {
      en: "Work instructions, drawings, and certificates at the machine.",
      da: "Arbejdsinstruktioner, tegninger og certifikater ved maskinen.",
    },
  },
  {
    id: "analysis",
    href: "/modules/analysis",
    label: { en: "Analysis", da: "Analyse" },
    blurb: {
      en: "Automated reports on performance, loss, and cost.",
      da: "Automatiske rapporter om performance, tab og omkostninger.",
    },
  },
]

/**
 * Chips the hero may offer that are not modules.
 *
 * Aftersales is an area we sell into (see /solutions/oems and
 * /solutions/service), not something you buy as a module, so it earns a chip
 * without earning a slot in the nav, the footer, the /modules index, or the
 * module carousel. A hero chip never links anywhere, it only rides along with
 * the lead, so a label is all one needs.
 */
const heroOnlyChips: Record<string, Record<Locale, string>> = {
  // Danish keeps the English term, the way the service pages already do.
  aftersales: { en: "Aftersales", da: "Aftersales" },
}

/**
 * Chip data for the hero picker, grouped into the rows it should render on.
 * `rows` holds module ids; labels and order come from the catalog, so a chip
 * naming a module can only ever be one the rest of the site offers. Ids listed
 * in `heroOnlyChips` are the deliberate exceptions.
 */
export function moduleChipRows(locale: Locale, rows: string[][]) {
  return rows.map((row) =>
    row.map((id) => {
      const entry = getModuleEntry(id)
      if (entry) return { id: entry.id, label: entry.label[locale] }

      const heroOnly = heroOnlyChips[id]
      if (!heroOnly) throw new Error(`Unknown module id in hero rows: ${id}`)
      return { id, label: heroOnly[locale] }
    })
  )
}

/**
 * Dropdown / footer entries in catalog order. The blurb rides along as
 * `description`, the header's mega menu renders it as a second line, the
 * footer column ignores it.
 */
export function moduleNavItems(locale: Locale) {
  return moduleCatalog.map(({ href, label, blurb }) => ({
    title: label[locale],
    href,
    description: blurb[locale],
  }))
}

/** Link-grid entries for the /modules index. */
export function moduleIndexLinks(locale: Locale) {
  return moduleCatalog.map(({ href, label, blurb }) => ({
    title: label[locale],
    href,
    description: blurb[locale],
  }))
}

export function getModuleEntry(id: string) {
  return moduleCatalog.find((entry) => entry.id === id)
}
