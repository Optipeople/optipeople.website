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
 * The modules are the nine below, always in this order: Orders, OEE,
 * Planning, Quality, IoT, EMS, Maintenance, Documents, AI Agents. "Modular
 * MES" is the name of the product these nine make up, not a module of its
 * own, so it has no entry here. Wherever the site lists the modules, it lists
 * all nine in this order. Reordering here moves the carousel, the header
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
    id: "orders",
    href: "/modules/erp-shopfloor",
    label: { en: "Orders", da: "Ordrer" },
    blurb: {
      en: "Start, stop, and report at the machine. ERP optional.",
      da: "Start, stop og meld tilbage ved maskinen. Med eller uden ERP.",
    },
  },
  {
    id: "oee",
    href: "/modules/production",
    label: { en: "OEE", da: "OEE" },
    blurb: {
      en: "Live OEE, downtime, losses, and shift performance.",
      da: "OEE, nedetid og tab, live og skift for skift.",
    },
  },
  {
    id: "planning",
    href: "/modules/planning",
    label: { en: "Planning", da: "Planlægning" },
    blurb: {
      en: "Routes, timelines, and the capacity you actually have.",
      da: "Ruter, tidslinjer og den kapacitet, I faktisk har.",
    },
  },
  {
    id: "qms",
    href: "/modules/quality",
    label: { en: "Quality", da: "Kvalitet" },
    blurb: {
      en: "Digital checks, deviations, and full traceability.",
      da: "Digitale kontroller, afvigelser og fuld sporbarhed.",
    },
  },
  {
    id: "iot",
    href: "/modules/iot",
    label: { en: "IoT", da: "IoT" },
    blurb: {
      en: "Consolidate the machines, hardware, and systems you already run.",
      da: "Få data fra de maskiner, den hardware og de systemer, I allerede har.",
    },
  },
  {
    id: "ems",
    href: "/modules/energy",
    label: { en: "EMS", da: "EMS" },
    blurb: {
      en: "Energy consumption connected to production output.",
      da: "Energiforbruget holdt op mod det, I producerer.",
    },
  },
  {
    id: "maintenance",
    href: "/modules/maintenance",
    label: { en: "Maintenance", da: "Vedligehold" },
    blurb: {
      en: "Preventive and predictive planning, driven by IoT data.",
      da: "Forebyggende og forudsigende vedligehold ud fra maskinernes data.",
    },
  },
  {
    id: "documents",
    href: "/modules/documents",
    label: { en: "Documents", da: "Dokumenter" },
    blurb: {
      en: "Work instructions, drawings, and certificates, wherever the work happens.",
      da: "Arbejdsinstruktioner, tegninger og certifikater dér, hvor arbejdet sker.",
    },
  },
  {
    id: "ai-agents",
    href: "/ai/agents",
    label: { en: "AI Agents", da: "AI-agenter" },
    blurb: {
      en: "Agents and copilots that work on your own production data.",
      da: "Agenter og copiloter, der arbejder med jeres egne produktionsdata.",
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
  // Modular MES is the product the nine modules make up, not a module, but a
  // visitor asking about the whole MES should be able to say so in the hero.
  // This chip is the one place it stands next to the modules.
  mes: { en: "Modular MES", da: "Modulært MES" },
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

/**
 * How the header's Platform and Modules panel groups the catalog. Every
 * module id must appear exactly once, so a new catalog entry fails loudly here
 * until someone decides which group it belongs to. Read top to bottom, the
 * groups keep the catalog order.
 */
const navGroups: { title: Record<Locale, string>; ids: string[] }[] = [
  {
    title: { en: "Production", da: "Produktion" },
    ids: ["orders", "oee", "planning"],
  },
  {
    title: { en: "Quality, machines and energy", da: "Kvalitet, maskiner og energi" },
    ids: ["qms", "iot", "ems"],
  },
  {
    title: { en: "Maintenance and knowledge", da: "Vedligehold og viden" },
    ids: ["maintenance", "documents", "ai-agents"],
  },
]

export function moduleNavGroups(locale: Locale) {
  const grouped = navGroups.flatMap((group) => group.ids)
  const missing = moduleCatalog.filter((entry) => !grouped.includes(entry.id))
  if (missing.length > 0 || grouped.length !== moduleCatalog.length) {
    throw new Error(
      `Module nav groups out of sync with the catalog: ${missing
        .map((entry) => entry.id)
        .join(", ")}`
    )
  }

  return navGroups.map((group) => ({
    title: group.title[locale],
    items: group.ids.map((id) => {
      const entry = getModuleEntry(id)
      if (!entry) throw new Error(`Unknown module id in nav groups: ${id}`)
      return { title: entry.label[locale], href: entry.href }
    }),
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
