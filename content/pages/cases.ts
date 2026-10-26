import type { Locale } from "@/i18n/routing"

// Copy for /cases (app/[locale]/cases/page.tsx). Kept here, not in the
// page, so the Markdown twin (lib/page-markdown.ts) can read the same text.

export type CasesCopy = {
  metaTitle: string
  metaDescription: string
  backLabel: string
  eyebrow: string
  title: string
  subtitle: string
  storiesLabel: string
  measuredLabel: string
  customersLabel: string
  moreLabel: string
  videoLabel: string
  emptyTitle: string
  emptyBody: string
  ctaLabel: string
}

export const casesCopy: Record<Locale, CasesCopy> = {
  en: {
    metaTitle: "Cases",
    metaDescription:
      "See how manufacturers use OptiPeople Data Platform to execute orders, plan production, and optimize operations.",
    backLabel: "Home",
    eyebrow: "Cases",
    title: "Results from the factory floor",
    subtitle:
      "How manufacturers use OptiPeople Data Platform to execute their orders, plan production, and keep optimizing the factory floor.",
    storiesLabel: "published customer stories",
    measuredLabel: "with a measured result on the line",
    customersLabel: "Manufacturers in these stories",
    moreLabel: "More stories",
    videoLabel: "Video",
    emptyTitle: "No case studies yet",
    emptyBody: "Customer stories will appear here as they are published.",
    ctaLabel: "Read story",
  },
  da: {
    metaTitle: "Cases | OptiPeople",
    metaDescription:
      "Se, hvordan producenter bruger OptiPeople Data Platform til at eksekvere ordrer, planlægge produktionen og optimere driften.",
    backLabel: "Forsiden",
    eyebrow: "Cases",
    title: "Resultater fra gulvet",
    subtitle:
      "Sådan bruger producenter OptiPeople Data Platform til at eksekvere deres ordrer, planlægge produktionen og hele tiden optimere driften på gulvet.",
    storiesLabel: "udgivne kundehistorier",
    measuredLabel: "med et målt resultat på linjen",
    customersLabel: "Virksomhederne i historierne",
    moreLabel: "Flere historier",
    videoLabel: "Video",
    emptyTitle: "Ingen cases endnu",
    emptyBody: "Kundehistorierne kommer her, når de bliver udgivet.",
    ctaLabel: "Læs historien",
  },
}
