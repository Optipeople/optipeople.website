import { moduleIndexLinks } from "@/content/modules-catalog"
import type { Locale } from "@/i18n/routing"

// Copy for /platform (app/[locale]/platform/page.tsx). Kept here, not in the
// page, so the Markdown twin (lib/page-markdown.ts) can read the same text.

export const platformMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Platform | OptiPeople",
    description:
      "Explore the OptiPeople Data Platform: a modular MES made of nine modules (Planning, Orders, Quality, IoT, OEE, EMS, Maintenance, Documents, and AI Agents) sharing data in one unified view of your operations.",
  },
  da: {
    title: "Modulært MES og IoT-platform til produktionen | OptiPeople",
    description:
      "Et MES bygget af ni moduler: Planlægning, Ordrer, Kvalitet, IoT, OEE, EMS, Vedligehold, Dokumenter og AI-agenter. Alle modulerne bruger de samme data om jeres drift.",
  },
}

export type PlatformCopy = {
  hero: { eyebrow: string; title: string; lede: string; cta: string; jump: string }
  proof: { title: string; items: { metric: string; label: string }[] }
  intro: { title: string; body: string }
  steps: { title: string; items: { title: string; description: string }[] }
  modules: {
    eyebrow: string
    title: string
    subtitle: string
    /** The link in the module dialog on the desktop diagram, e.g. "Go to Planning". */
    more: string
    cards: { title: string; href: string; description: string }[]
  }
  visual: { eyebrow: string; title: string; body: string }
  logos: string
}

export const platformCopy: Record<Locale, PlatformCopy> = {
  en: {
    hero: {
      eyebrow: "Platform",
      title: "One modular platform for all your manufacturing operations",
      lede: "The OptiPeople Data Platform connects planning, orders, quality, IoT, OEE, energy, maintenance, documents, and AI agents on a single data foundation. Take one module or all nine: every module works from the same live data, so what one team registers, every team can use.",
      cta: "Book a demo",
      jump: "See the modules",
    },
    proof: {
      title: "What it runs on",
      items: [
        { metric: "9", label: "Modules sharing one data foundation, switched on as you need them" },
        { metric: "1", label: "Structured record per machine or workstation, order, batch, and shift" },
        { metric: "Any", label: "Protocol or machine age, new PLCs and legacy equipment alike" },
      ],
    },
    intro: {
      title: "Most factories don't have a data problem. They have a data-in-pieces problem.",
      body: "Orders sit in the ERP, the plan in a spreadsheet, quality in a binder, and maintenance in a log only one person knows. Nobody is wrong, but nobody can see the whole picture either. OptiPeople Data Platform brings planning, orders, quality, and machine data onto the same foundation, tied to the same machines, people, and shifts. So you can execute the plan, see where it slips, and keep optimizing from the same picture.",
    },
    steps: {
      title: "How it fits together",
      items: [
        {
          title: "Connect",
          description:
            "Connect machines, sensors, and systems through the IoT module: PLCs, gateways, and legacy equipment, regardless of protocol or age.",
        },
        {
          title: "Collect",
          description:
            "Data lands in one structured foundation, tied to machines or workstations, orders, batches, and shifts, instead of scattered across systems and spreadsheets.",
        },
        {
          title: "Analyze",
          description:
            "Follow the numbers that matter to you as they happen, and get automated reports on output, losses, quality, and cost. The same numbers for everyone.",
        },
        {
          title: "Act",
          description:
            "Turn insight into action: create tasks, plan maintenance, adjust the schedule, and let AI copilots answer questions in your own data.",
        },
      ],
    },
    modules: {
      eyebrow: "Modules",
      title: "Nine modules, one shared record",
      subtitle:
        "Each module solves one job on the shop floor, and they all work from the same record. Start where it hurts most and switch on the rest as you need them.",
      more: "Go to",
      cards: moduleIndexLinks("en"),
    },
    visual: {
      eyebrow: "Product view",
      title: "The same live data, wherever the decision gets made",
      body: "On the floor it's an operator panel. In the office it's a report. In a meeting it's the number nobody disputes, because it all comes from the same record.",
    },
    logos: "Trusted by manufacturers across the Nordics and internationally",
  },
  da: {
    hero: {
      eyebrow: "Platform",
      title: "Én modulopbygget platform til hele produktionen",
      lede: "OptiPeople Data Platform kobler planlægning, ordrer, kvalitet, IoT, OEE, energi, vedligehold, dokumenter og AI-agenter sammen på ét fælles datagrundlag. Tag ét modul eller alle ni. Alle modulerne henter fra de samme data, så det, ét team registrerer, kan de andre bruge.",
      cta: "Book en demo",
      jump: "Se modulerne",
    },
    proof: {
      title: "Det, platformen kører på",
      items: [
        { metric: "9", label: "Moduler, der deler de samme data. I slår dem til, når I får brug for dem" },
        { metric: "1", label: "Samlet registrering pr. maskine eller arbejdsstation, ordre, batch og skift" },
        { metric: "Alle", label: "Protokoller og maskiner, uanset alder. Nye PLC'er og gammelt udstyr" },
      ],
    },
    intro: {
      title: "De fleste fabrikker mangler ikke data. Data ligger bare i stumper.",
      body: "Ordrerne ligger i ERP, planen i et regneark, kvaliteten i et ringbind, og vedligeholdet i en log, som kun én kender. Ingen gør noget forkert, men ingen kan se det hele. OptiPeople Data Platform samler planlægning, ordrer, kvalitet og maskindata på det samme fundament, koblet til de samme maskiner, medarbejdere og skift. Så kan I eksekvere planen, se hvor den skrider, og hele tiden optimere ud fra det samme billede.",
    },
    steps: {
      title: "Sådan hænger det sammen",
      items: [
        {
          title: "Kobl på",
          description:
            "Kobl maskiner, sensorer og systemer på gennem IoT-modulet: PLC'er, gateways og gammelt udstyr, uanset protokol og alder.",
        },
        {
          title: "Saml",
          description:
            "Data lander ét sted, koblet til maskiner eller arbejdsstationer, ordrer, batches og skift, i stedet for spredt ud over systemer og regneark.",
        },
        {
          title: "Følg med",
          description:
            "Følg de tal, der betyder noget for jer, mens det sker. Rapporterne om produktion, tab, kvalitet og omkostninger laver sig selv, og alle ser de samme tal.",
        },
        {
          title: "Handl",
          description:
            "Fra indsigt til handling: opret opgaver, planlæg vedligehold, ret planen til, og spørg AI om jeres egne data.",
        },
      ],
    },
    modules: {
      eyebrow: "Modulerne",
      title: "Ni moduler på de samme data",
      subtitle:
        "Hvert modul løser én opgave i driften, og de arbejder alle sammen ud fra de samme registreringer. Start dér, hvor det gør mest ondt, og slå resten til, når I får brug for dem.",
      more: "Se mere om",
      cards: moduleIndexLinks("da"),
    },
    visual: {
      eyebrow: "Produktvisning",
      title: "De samme tal, uanset hvor beslutningen bliver taget",
      body: "På gulvet er det et operatørpanel. På kontoret er det en rapport. På mødet er det tallet, ingen sætter spørgsmålstegn ved, fordi det hele kommer fra den samme registrering.",
    },
    logos: "Produktionsvirksomheder i Norden og ude i verden bruger OptiPeople",
  },
}
