import type { CustomerVoice } from "@/components/customer-voices"
import type { SlideData } from "@/components/slide-carousel"
import type { Locale } from "@/i18n/routing"

// Copy for the home page (app/[locale]/page.tsx). Kept here, not in the
// page, so the Markdown twin (lib/page-markdown.ts) can read the same text.

export type CaseCard = {
  company: string
  /** Headline outcome, rendered large. Use → for before/after. */
  value: string
  /** Short unit/measure beneath the value. */
  unit: string
  /** One-line context. */
  note: string
  slug: string
  span: "wide" | "narrow"
  kind: "chart" | "image"
  /** Surface tone for chart cards. */
  tone?: "sage" | "dark"
  /** Before/after data for the mini comparison chart. */
  chart?: { before: number; after: number; beforeLabel: string; afterLabel: string }
}

export type HomeCopy = {
  hero: {
    /**
     * Three headline directions still under review. Once one is picked, collapse
     * this to a single `heading` / `subheading` pair and drop `heroVariant`.
     */
    variants: Record<HeroVariant, { heading: string; subheading: string }>
    /** Line above the module chips, explaining what picking one does. */
    modulePrompt: string
    /**
     * Module ids grouped into the chip rows they render on. Ids only, labels
     * come from the catalog. Rows stay per-locale because Danish labels run
     * longer, so the tidy break lands in a different place per language.
     */
    moduleRows: string[][]
  }
  /** One line under the chapters, for visitors not ready to pick a product. */
  advisory: { text: string; linkLabel: string; href: string }
  logoWallTitle: string
  trust: {
    heading: string
    headingSub: string
    storiesLabel: string
    quote: string
    cite: string
  }
  platform: { eyebrow: string; title: string; subtitle: string; ariaLabel: string }
  /** Per-module carousel copy, keyed by module id in content/modules-catalog.ts. */
  moduleSlides: Record<string, ModuleSlideCopy>
  /** CTA on each module slide. "{module}" is replaced with the module name. */
  moduleCta: string
  ai: { ariaLabel: string }
  /** One quote per person (and Fiberline, quoted as a company); the first is set large. */
  testimonials: CustomerVoice[]
  testimonialTitle: string
  /** Link label on each testimonial card that has a matching case study. */
  testimonialCaseLabel: string
  bento: {
    eyebrow: string
    title: string
    subtitle: string
    allCases: string
    caseCards: CaseCard[]
  }
}

/**
 * Carousel copy for one module. The title, the link, and the CTA come from
 * content/modules-catalog.ts, so only the pitch and the image live here.
 *
 * Modules with a code-built graphic (see components/module-mockups.tsx) leave
 * the image fields off, the slide draws its visual instead of loading a photo.
 */
export type ModuleSlideCopy = {
  description: string
  imageSrc?: string
  imageAlt?: string
  imageFit?: "fill"
  imagePosition?: SlideData["imagePosition"]
}

/** Which of the three hero headline directions renders. */
export type HeroVariant = "product" | "category" | "outcome"
export const heroVariant: HeroVariant = "product"

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    hero: {
      variants: {
        product: {
          heading: "Run manufacturing and operations on live data",
          subheading: "One data foundation. Every team on the same numbers.",
        },
        category: {
          heading: "One platform to run your whole production",
          subheading: "Every machine, every module, one data foundation.",
        },
        outcome: {
          heading: "Know your factory. In real time.",
          subheading: "Live OEE, quality and maintenance in one place.",
        },
      },
      modulePrompt: "What do you want to run better?",
      moduleRows: [
        ["mes", "planning", "orders", "qms", "iot"],
        ["oee", "ems", "maintenance", "documents", "ai-agents"],
      ],
    },
    advisory: {
      text: "Not sure where to start? We advise on MES, IoT and AI, from the first assessment to the business case.",
      linkLabel: "Talk to an advisor",
      href: "/services/smart-operations",
    },
    logoWallTitle: "Trusted by industry leaders",
    trust: {
      heading: "Trusted by leading manufacturers.",
      headingSub: "See how they run production on data with OptiPeople.",
      storiesLabel: "Customer stories",
      quote:
        "Comparing our OEE to previous data before OptiPeople Data Platform, we’ve seen an average increase of 5% within just three months.",
      cite: "Kasper Kielgast Poulsen, Fabrikschef, Dansk Træemballage",
    },
    platform: {
      eyebrow: "Explore the platform",
      title: "Every module. The same data.",
      subtitle:
        "Each module answers a specific operational question, and they all work on the same data. An order goes from the plan to the machine or workstation, quality is checked along the way, and performance is measured while it runs, so planning, quality, and the monthly report all see the same order without anyone re-entering it.",
      ariaLabel: "Platform modules",
    },
    moduleCta: "Explore {module}",
    // No slide takes a screenshot any more: every module draws its
    // visual in code, see components/module-mockups.tsx
    moduleSlides: {
      oee: {
        description:
          "See where production time is lost and why. Track availability, performance, and quality live across shifts, lines, and machines, built from real data from machines and workstations.",
      },
      qms: {
        description:
          "Register quality data where it happens. Trace deviations back to machine or workstation, batch, and shift, and turn checks into documentation instead of paperwork.",
      },
      ems: {
        description:
          "Connect energy, vibration, flow, and temperature directly to production. See kWh per produced unit and find the waste a monthly utility bill hides.",
      },
      maintenance: {
        description:
          "Plan preventive maintenance on usage and condition rather than the calendar. Assign tasks, track completion, and cut unplanned downtime.",
      },
      planning: {
        description:
          "Sequence orders against the capacity you actually have. Plans built on measured run rates and real machine availability instead of spreadsheet assumptions.",
      },
      orders: {
        description:
          "Two-way sync between ERP and the floor. Orders reach the workstation, and progress, scrap, and time flow straight back without anyone re-typing them.",
      },
      iot: {
        description:
          "Get data from anything: modern controls over standard industrial protocols, and older machines through sensors that measure the signal directly.",
      },
      documents: {
        description:
          "Work instructions, drawings, and certificates at the machine or workstation, always in the current version. The operator sees what applies to the order in front of them.",
      },
      "ai-agents": {
        description:
          "Ask questions in plain language and let agents watch for patterns in your own production data, grounded in the same numbers everyone else sees.",
      },
    },

    ai: { ariaLabel: "AI capabilities" },
    testimonials: [
      {
        quote:
          "Over the past two years, OptiPeople Data Platform has helped us increase productivity by approximately 5%. Data collection combined with continuous improvements is key.",
        author: "Tommy Andersen",
        role: "Production Manager",
        company: "DFI Geisler",
      },
      {
        quote:
          "OptiPeople Data Platform provides us with valuable management information that was previously unavailable. Our operators monitor uptime on tablets, which has encouraged quicker recovery times.",
        author: "Kasper Kielgast Poulsen",
        role: "Fabrikschef",
        company: "Dansk Træemballage",
      },
      {
        quote:
          "We now perform maintenance based on operating hours instead of fixed time intervals. This gives us ~40 extra production hours annually and 50% fewer service hours.",
        author: "Stefan Lindell",
        role: "Lean Project Manager",
        company: "Kvik",
      },
      {
        quote:
          "Now stop reasons are being registered and we have a much better overview of our machines’ efficiency.",
        company: "Fiberline Composites",
      },
    ],
    testimonialTitle: "In their own words.",
    testimonialCaseLabel: "Read the case",
    bento: {
      eyebrow: "Customer results",
      title: "Measured on the floor.",
      subtitle: "Outcomes manufacturers reached with OptiPeople. Open any one to see how.",
      allCases: "All cases",
      caseCards: [
        {
          company: "Fiberline Composites",
          value: "−41%",
          unit: "unnecessary stops",
          note: "Fewer machine stops, and 6% less time lost per stop.",
          slug: "konkurrencekraft-og-tempo-pa-digital-transformation",
          span: "wide",
          kind: "chart",
          tone: "sage",
          chart: { before: 100, after: 59, beforeLabel: "Before", afterLabel: "After" },
        },
        {
          company: "Industrial company",
          value: "21→41%",
          unit: "OEE",
          note: "Output nearly doubled with data-driven operation.",
          slug: "fra-data-til-effektivitet",
          span: "narrow",
          kind: "chart",
          tone: "dark",
          chart: { before: 21, after: 41, beforeLabel: "21%", afterLabel: "41%" },
        },
        {
          company: "XL-BYG Brejnholt",
          value: "−30%",
          unit: "electricity bills on trucks, estimated",
          note: "Forklifts charge when power is cheapest and the solar panels deliver.",
          slug: "xl-byg-brejnholt-achieves-energy-savings-and-sustainability-with-optimized-forklift-charging",
          span: "narrow",
          kind: "image",
        },
        {
          company: "Kvik",
          value: "−50%",
          unit: "service hours",
          note: "Usage-based maintenance, plus 40 extra production hours a year.",
          slug: "kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud",
          span: "wide",
          kind: "image",
        },
        {
          company: "Dansk Træemballage",
          value: "+5%",
          unit: "OEE in three months",
          note: "Reached on the very first connected production line.",
          slug: "dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud",
          span: "wide",
          kind: "image",
        },
        {
          company: "DFI Geisler",
          value: "+5%",
          unit: "productivity",
          note: "Sustained across two years and seven machines.",
          slug: "dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights",
          span: "narrow",
          kind: "image",
        },
      ],
    },
  },
  da: {
    hero: {
      variants: {
        product: {
          heading: "Produktion og drift styret af live data",
          subheading: "Alle i huset ser de samme tal, fra gulvet til ledelsen.",
        },
        category: {
          heading: "Hele produktionen i ét system",
          subheading: "Alle maskiner og alle moduler bygger på de samme data.",
        },
        outcome: {
          heading: "Se, hvordan det går på fabrikken lige nu",
          subheading: "OEE, kvalitet og vedligehold på samme skærm, mens det sker.",
        },
      },
      modulePrompt: "Hvad vil I have bedre styr på?",
      moduleRows: [
        ["mes", "planning", "orders", "qms", "iot"],
        ["oee", "ems", "maintenance", "documents", "ai-agents"],
      ],
    },
    advisory: {
      text: "Ved I ikke, hvor I skal begynde? Vi rådgiver om MES, IoT og AI hele vejen fra den første gennemgang til business casen.",
      linkLabel: "Tal med en rådgiver",
      href: "/services/smart-operations",
    },
    logoWallTitle: "De bruger allerede OptiPeople",
    trust: {
      heading: "Mange producenter styrer allerede efter tallene med OptiPeople.",
      headingSub: "Læs, hvordan de gør det i hverdagen.",
      storiesLabel: "Kundehistorier",
      quote:
        "Sammenlignet med vores OEE før OptiPeople Data Platform har vi set en gennemsnitlig stigning på 5% på bare tre måneder.",
      cite: "Kasper Kielgast Poulsen, Fabrikschef, Dansk Træemballage",
    },
    platform: {
      eyebrow: "Platformen",
      title: "Alle moduler læser de samme data",
      subtitle:
        "Hvert modul svarer på et konkret spørgsmål i driften, og de arbejder alle på de samme data. Ordren går fra planen ud til maskinen eller arbejdsstationen, kvaliteten bliver tjekket undervejs, og ydelsen bliver målt, mens den kører. Planlægning, kvalitet og månedsrapporten ser den samme ordre, uden at nogen taster den ind igen.",
      ariaLabel: "Platformmoduler",
    },
    moduleCta: "Mere om {module}",
    // Ingen slides bruger screenshots: hvert modul tegner sit visuelle
    // udtryk i kode, se components/module-mockups.tsx
    moduleSlides: {
      oee: {
        description:
          "Se, hvor produktionstiden forsvinder, og hvorfor. Følg tilgængelighed, ydelse og kvalitet live for hvert skift, hver linje og hver maskine, målt direkte på data fra maskiner og arbejdsstationer.",
      },
      qms: {
        description:
          "Registrer kvalitetsdata dér, hvor arbejdet sker. Følg afvigelsen tilbage til maskine eller arbejdsstation, batch og skift. Kontrollen bliver selv dokumentationen, så papirarbejdet forsvinder.",
      },
      ems: {
        description:
          "Kobl energi, vibration, flow og temperatur direkte sammen med produktionen. Se kWh pr. produceret enhed, og find det spild, elregningen ikke viser.",
      },
      maintenance: {
        description:
          "Planlæg vedligeholdet efter brug og tilstand i stedet for efter kalenderen. Fordel opgaverne, se, hvad der er gjort, og få mindre uplanlagt nedetid.",
      },
      planning: {
        description:
          "Læg ordrerne i rækkefølge efter den kapacitet, I faktisk har. Planerne bygger på målte kørehastigheder og den tid, maskinerne reelt er ledige, ikke på tal fra et regneark.",
      },
      orders: {
        description:
          "ERP og gulvet taler sammen begge veje. Ordren kommer ud på arbejdsstationen, og status, kassation og tid går direkte tilbage, uden at nogen taster det ind igen.",
      },
      iot: {
        description:
          "Vi henter data fra det hele: nyere styringer over de gængse industriprotokoller og ældre maskiner via sensorer, der måler signalet direkte.",
      },
      documents: {
        description:
          "Arbejdsinstruktioner, tegninger og certifikater ved maskinen eller arbejdsstationen, altid i den version, der gælder. Operatøren ser lige præcis det, der hører til den ordre, der kører.",
      },
      "ai-agents": {
        description:
          "Spørg helt almindeligt, og lad agenterne holde øje med mønstre i jeres egne produktionsdata. De bruger de samme tal, som alle andre ser.",
      },
    },

    ai: { ariaLabel: "AI-funktioner" },
    testimonials: [
      {
        quote:
          "OptiPeople Data Platform har hjulpet os med at øge produktiviteten med cirka 5%. Dataindsamling kombineret med løbende forbedringer er nøglen.",
        author: "Tommy Andersen",
        role: "Production Manager",
        company: "DFI Geisler",
      },
      {
        quote:
          "OptiPeople Data Platform giver os ledelsesinformation, vi ikke havde før. Operatørerne følger oppetiden på tablets, og det har fået dem til at komme hurtigere i gang igen efter et stop.",
        author: "Kasper Kielgast Poulsen",
        role: "Fabrikschef",
        company: "Dansk Træemballage",
      },
      {
        quote:
          "Vi vedligeholder nu efter driftstimer i stedet for faste intervaller. Det giver omkring 40 ekstra produktionstimer årligt.",
        author: "Stefan Lindell",
        role: "Lean Project Manager",
        company: "Kvik",
      },
      {
        quote:
          "Nu bliver stopårsagerne registreret, og vi har et meget bedre overblik over maskinernes effektivitet.",
        company: "Fiberline Composites",
      },
    ],
    testimonialTitle: "Med deres egne ord.",
    testimonialCaseLabel: "Læs casen",
    bento: {
      eyebrow: "Kunderesultater",
      title: "Målt på fabriksgulvet.",
      subtitle: "Det har produktionsvirksomheder fået ud af OptiPeople. Klik på en, og se, hvordan de gjorde.",
      allCases: "Alle cases",
      caseCards: [
        {
          company: "Fiberline Composites",
          value: "−41%",
          unit: "unødvendige stop",
          note: "Færre maskinstop, og hvert stop koster 6% mindre tid.",
          slug: "konkurrencekraft-og-tempo-pa-digital-transformation",
          span: "wide",
          kind: "chart",
          tone: "sage",
          chart: { before: 100, after: 59, beforeLabel: "Før", afterLabel: "Efter" },
        },
        {
          company: "Industrivirksomhed",
          value: "21→41%",
          unit: "OEE",
          note: "Næsten dobbelt så meget produceret, nu hvor de styrer efter tal.",
          slug: "fra-data-til-effektivitet",
          span: "narrow",
          kind: "chart",
          tone: "dark",
          chart: { before: 21, after: 41, beforeLabel: "21%", afterLabel: "41%" },
        },
        {
          company: "XL-BYG Brejnholt",
          value: "−30%",
          unit: "på elregningen til trucks, anslået",
          note: "Trucks lades op, når strømmen er billigst, og solcellerne leverer.",
          slug: "xl-byg-brejnholt-achieves-energy-savings-and-sustainability-with-optimized-forklift-charging",
          span: "narrow",
          kind: "image",
        },
        {
          company: "Kvik",
          value: "−50%",
          unit: "servicetimer",
          note: "Vedligehold efter brug, og 40 ekstra produktionstimer om året.",
          slug: "kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud",
          span: "wide",
          kind: "image",
        },
        {
          company: "Dansk Træemballage",
          value: "+5%",
          unit: "OEE på tre måneder",
          note: "Opnået på den allerførste linje, vi koblede på.",
          slug: "dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud",
          span: "wide",
          kind: "image",
        },
        {
          company: "DFI Geisler",
          value: "+5%",
          unit: "produktivitet",
          note: "Fastholdt i to år på syv maskiner.",
          slug: "dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights",
          span: "narrow",
          kind: "image",
        },
      ],
    },
  },
}

export const homeMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "OptiPeople | Run manufacturing and operations on live data",
    description:
      "A modular MES on one data foundation for the whole factory. Connect machines and workstations with IoT, and run planning, orders, and quality on the same numbers, from the floor to management.",
  },
  da: {
    title: "Modulært MES og IoT til produktionen | OptiPeople",
    description:
      "Et modulært MES på ét fælles datagrundlag. Kobl maskiner og arbejdsstationer på med IoT, og styr planlægning, ordrer og kvalitet efter de samme tal, fra gulvet til ledelsen.",
  },
}
