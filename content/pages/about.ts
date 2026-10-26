import type { Locale } from "@/i18n/routing"
import { employees } from "@/lib/employees"

// Copy for /about (app/[locale]/about/page.tsx). Kept here, not in the
// page, so the Markdown twin (lib/page-markdown.ts) can read the same text.

export const aboutCopy: Record<
  Locale,
  {
    meta: { title: string; description: string }
    eyebrow: string
    title: string
    intro: string
    missionHeading: string
    missionBody: string
    valuesHeading: string
    teamHeading: string
    values: { title: string; description: string }[]
    cta: string
    visual: { eyebrow: string; title: string; body: string }
  }
> = {
  en: {
    meta: {
      title: "About OptiPeople",
      description:
        "Meet the team behind OptiPeople and learn how we help manufacturers connect systems, improve shop floor visibility, and turn operational data into action.",
    },
    eyebrow: "About us",
    title: "We make industrial operations work",
    intro:
      "OptiPeople is a digital operations company. We build software, connect systems, and help industrial teams turn data into better decisions, from the shop floor to the boardroom.",
    missionHeading: "Built for the space between shop floor and ERP",
    missionBody:
      "Most factories have machines that produce data and ERP systems that need it, but nothing useful in between. OptiPeople fills that gap. The OptiPeople Data Platform captures real-time production data, makes it visible to operators and managers, and turns it into actions that improve performance, reduce waste, and keep operations running.",
    valuesHeading: "How we work",
    teamHeading: "The team",
    values: [
      {
        title: "Start with the problem",
        description:
          "We don't lead with technology. We start by understanding how your operations actually work: the workarounds, the blind spots, the things that fall between systems. The solution follows from there.",
      },
      {
        title: "Make it usable",
        description:
          "Software that operators won't use is software that doesn't work. Everything we build is designed for the people on the floor: fast, clear, no training manual required.",
      },
      {
        title: "Own the outcome",
        description:
          "We don't hand over a system and walk away. We stay involved through rollout, adoption, and iteration. If it's not delivering results, that's our problem too.",
      },
      {
        title: "Earn trust with data",
        description:
          "We avoid buzzwords and vague promises. When we say a system will improve OEE, we show how, by how much, and what it takes. Decisions should be based on facts, including the decision to work with us.",
      },
    ],
    cta: "Talk to us",
    visual: {
      eyebrow: "What we build",
      title: "Software that earns its place on the floor",
      body: "Every screen we ship gets used by someone mid-shift, with gloves on, under time pressure. That constraint shapes everything. If it needs a manual, we got it wrong.",
    },
  },
  da: {
    meta: {
      title: "Om OptiPeople",
      description:
        "Mød folkene bag OptiPeople. Vi hjælper producenter med at koble systemerne sammen, se, hvad der sker på gulvet, og bruge tallene i den daglige drift.",
    },
    eyebrow: "Om os",
    title: "Vi får produktionen til at køre",
    intro:
      "Vi bygger software, kobler systemerne sammen og hjælper jer med at træffe bedre beslutninger ud fra tallene. Både på gulvet og i ledelsen.",
    missionHeading: "Vi fylder hullet mellem gulvet og ERP",
    missionBody:
      "På de fleste fabrikker laver maskinerne data, og ERP-systemet har brug for dem. Men imellem de to er der ikke noget, der hjælper. Det hul fylder vi. OptiPeople Data Platform samler data op fra produktionen, mens den kører, og viser dem til operatører og ledere, så de kan gøre noget ved det, mens det stadig betyder noget. Det giver bedre ydelse, mindre spild og færre stop.",
    valuesHeading: "Sådan arbejder vi",
    teamHeading: "Holdet",
    values: [
      {
        title: "Vi starter med problemet",
        description:
          "Vi lægger ikke ud med teknik. Først finder vi ud af, hvordan jeres drift faktisk kører: nødløsningerne, de blinde vinkler og det, der falder mellem to systemer. Løsningen kommer derfra.",
      },
      {
        title: "Det skal kunne bruges",
        description:
          "Software, som operatørerne ikke gider bruge, virker ikke. Alt, hvad vi laver, er bygget til folkene på gulvet. Det skal være hurtigt og tydeligt og kunne bruges uden manual.",
      },
      {
        title: "Vi hænger på resultatet",
        description:
          "Vi afleverer ikke et system og går. Vi er med under udrulningen, mens det bliver taget i brug, og når det skal justeres. Virker det ikke, er det også vores problem.",
      },
      {
        title: "Tal frem for løfter",
        description:
          "Vi holder os fra buzzwords og løse løfter. Når vi siger, at et system kan forbedre OEE, viser vi, hvordan det sker, hvor meget det giver, og hvad det kræver. Beslutninger skal bygge på fakta. Også beslutningen om at arbejde med os.",
      },
    ],
    cta: "Tal med os",
    visual: {
      eyebrow: "Det, vi bygger",
      title: "Software, som folk på gulvet faktisk bruger",
      body: "Hver skærm, vi laver, bliver brugt midt i et skift, med handsker på og tiden i nakken. Det bestemmer alt, hvad vi gør. Skal der en manual til, har vi lavet det forkert.",
    },
  },
}

const priorityByRole: Record<string, number> = {
  "Chief Executive Officer": 1,
  "Chief Technology Officer": 2,
  "Head of Projects": 3,
  "Sales Engineer": 4,
  "Technical Consultant": 5,
  "BI Consultant": 6,
  "IoT Engineer": 7,
  "Marketing Project Manager": 8,
}

/** The team in the order the page shows it: leadership first, then by role. */
export const aboutTeam = [...employees].sort((a, b) => {
  const aPriority = priorityByRole[a.role] ?? 999
  const bPriority = priorityByRole[b.role] ?? 999
  return aPriority === bPriority
    ? a.name.localeCompare(b.name)
    : aPriority - bPriority
})
