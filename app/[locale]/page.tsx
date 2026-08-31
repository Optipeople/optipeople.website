import { setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { type Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { SlideCarousel, type SlideData } from "@/components/slide-carousel"
import { LogoWall } from "@/components/logo-wall"
import { TestimonialCarousel, type Testimonial } from "@/components/testimonial-carousel"
import { HeroModulePicker } from "@/components/hero-module-picker"
import { hasModuleMockup } from "@/components/module-mockups"
import { Button } from "@/components/ui/button"
import { moduleCatalog, moduleChipRows } from "@/content/modules-catalog"
import { getPostBySlug } from "@/lib/blog-data"
import { aiStackSlides, aiStackSliderCopy } from "@/lib/ai-stack"
import { customerLogos } from "@/lib/customers"
import { buildMetadata } from "@/lib/seo"
import { ArrowRight } from "lucide-react"

type CaseCard = {
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

/** Minimal before/after bar chart, hand-built for the results cards. */
function ComparisonBars({
  before,
  after,
  beforeLabel,
  afterLabel,
  tone,
}: {
  before: number
  after: number
  beforeLabel: string
  afterLabel: string
  tone: "sage" | "dark"
}) {
  const max = Math.max(before, after)
  const height = (v: number) => `${Math.max(10, Math.round((v / max) * 100))}%`
  const baseBar = tone === "dark" ? "bg-white/15" : "bg-black/[0.08]"
  const labelColor = tone === "dark" ? "text-white/50" : "text-black/45"
  const accent = tone === "dark" ? "var(--green-light2)" : "var(--green-system)"

  return (
    <div className="flex h-24 items-end gap-3">
      {[
        { v: before, label: beforeLabel, accent: false },
        { v: after, label: afterLabel, accent: true },
      ].map((bar) => (
        <div key={bar.label} className="flex h-full w-14 flex-col items-center">
          <div className="flex w-full flex-1 items-end">
            <div
              className={`w-full rounded-t-md ${bar.accent ? "" : baseBar}`}
              style={{ height: height(bar.v), background: bar.accent ? accent : undefined }}
            />
          </div>
          <span className={`mt-2 text-xs font-medium tabular-nums ${labelColor}`}>{bar.label}</span>
        </div>
      ))}
    </div>
  )
}

// Per-card color wash for the image case cards, reuses the AI slider's
// palette (see aiCapabilities theme in lib/ai-stack.ts): a mix of deep and
// light brand tones, each paired with the text tone that reads on it. The
// color is applied near-opaque so the photo recedes to a subtle texture.
const CASE_IMAGE_ACCENTS: { bg: string; tone: "light" | "dark" }[] = [
  { bg: "#243b2f", tone: "light" }, // deep green
  { bg: "#c5d8e8", tone: "dark" }, // light blue
  { bg: "#d8d4c6", tone: "dark" }, // warm sand
  { bg: "#163b40", tone: "light" }, // deep teal
]

const caseDateMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function formatCaseDate(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return `${caseDateMonths[parsed.getMonth()]} ${parsed.getFullYear()}`
}

// ── Localized copy ──
type HomeCopy = {
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
  tabSlides: SlideData[]
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
  testimonials: Testimonial[]
  testimonialTitle: string
  bento: {
    eyebrow: string
    title: string
    subtitle: string
    allCases: string
    caseCards: CaseCard[]
  }
  tabsAriaLabel: string
}

/**
 * Carousel copy for one module. The title, the link, and the CTA come from
 * content/modules-catalog.ts, so only the pitch and the image live here.
 *
 * Modules with a code-built graphic (see components/module-mockups.tsx) leave
 * the image fields off, the slide draws its visual instead of loading a photo.
 */
type ModuleSlideCopy = {
  description: string
  imageSrc?: string
  imageAlt?: string
  imageFit?: "fill"
  imagePosition?: SlideData["imagePosition"]
}

/**
 * One card colour per module. The family is the AI section's, deep greens and
 * teals against a charcoal, a pale blue and a warm sand, because that section
 * is the better looking of the two. It is extended rather than cycled: eleven
 * slides over five colours meant the same card turned up three times, and the
 * sequence is deliberately not the AI section's own, since both carousels sit
 * on the same page and should not read as the same run of colour twice.
 *
 * Keyed by module id, not by position, so a module keeps its colour when the
 * catalog is reordered. The alternation of light and dark is tuned for the
 * current order in content/modules-catalog.ts, so a reorder is worth a look
 * here. `tone` decides the title, the supporting line and the arrow button.
 *
 * Two placements are load-bearing rather than decorative: AI agents sits on a
 * light card because its mockup is the only dark one, and OEE sits on the
 * deepest green because its gauges carry the most colour of any slide.
 */
type ModuleAccent = { bg: string; tone: "light" | "dark" }

const MODULE_SLIDE_ACCENTS: Record<string, ModuleAccent> = {
  mes: { bg: "#163b40", tone: "light" },
  iot: { bg: "#c7d9cd", tone: "dark" },
  oee: { bg: "#243b2f", tone: "light" },
  "ai-agents": { bg: "#d8d4c6", tone: "dark" },
  maintenance: { bg: "#2a3446", tone: "light" },
  ems: { bg: "#0f2f33", tone: "light" },
  qms: { bg: "#c5d8e8", tone: "dark" },
  orders: { bg: "#1c1f26", tone: "light" },
  planning: { bg: "#2f5140", tone: "light" },
  documents: { bg: "#e4ded4", tone: "dark" },
  analysis: { bg: "#3d4436", tone: "light" },
}

/** A module added to the catalog before it is given a colour still gets a card. */
const MODULE_SLIDE_FALLBACK: ModuleAccent = { bg: "#243b2f", tone: "light" }

/**
 * Builds the module carousel by walking the catalog, so the slides are always
 * the modules the hero chips and the nav offer, in the same order. A module
 * with no copy yet still gets a slide, falling back to its catalog blurb.
 */
function buildModuleSlides(
  locale: Locale,
  copyById: Record<string, ModuleSlideCopy>,
  ctaTemplate: string
): SlideData[] {
  return moduleCatalog.map((entry) => {
    const label = entry.label[locale]
    const slide = copyById[entry.id]
    // Modules we have no presentable screenshot for draw their visual in code.
    const mockup = hasModuleMockup(entry.id) ? entry.id : undefined
    const accent = MODULE_SLIDE_ACCENTS[entry.id] ?? MODULE_SLIDE_FALLBACK
    return {
      title: label,
      description: slide?.description ?? entry.blurb[locale],
      moduleMockup: mockup,
      imageSrc: mockup ? undefined : slide?.imageSrc ?? "/images/dashboard1.png",
      imageAlt: mockup ? undefined : slide?.imageAlt ?? label,
      imageFit: slide?.imageFit,
      imagePosition: slide?.imagePosition,
      primaryLabel: ctaTemplate.replace("{module}", label),
      primaryHref: entry.href,
      bgColor: "bg-black",
      layout: "vertical",
      accentColor: accent.bg,
      textTone: accent.tone,
    }
  })
}

/** Which of the three hero headline directions renders. */
type HeroVariant = "product" | "category" | "outcome"
const heroVariant: HeroVariant = "product"

/** Chips picked before the visitor touches anything. Locale-independent. */
const heroDefaultModules = ["mes"]

const copy: Record<Locale, HomeCopy> = {
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
        ["mes", "oee", "qms", "ems", "maintenance"],
        ["planning", "iot", "documents", "ai-agents"],
      ],
    },
    tabsAriaLabel: "Team solutions",
    tabSlides: [
      {
        tab: "Manufacturing companies",
        title: "Know Your Factory. In Real Time.",
        description:
          "OptiPeople connects machines, processes, and people into one live operational view. See bottlenecks as they happen, act faster, and run production with facts instead of gut feeling.",
        imageSrc: "/images/Mockups/Dashboard-Operator-Panel-Desktop.png",
        imageAlt: "Live OptiPeople operator panel showing real-time machine status, output and production timeline",
        primaryLabel: "Explore manufacturing solutions",
        primaryHref: "/solutions/manufacturing",
        bgColor: "bg-blue-50/0",
        layout: "overlay",
        overlay: "dark",
      },
      {
        tab: "OEMs and machine builders",
        title: "Turn Machines Into Platforms",
        description:
          "Opticloud lets you ship connected machines with built-in insight. Monitor performance in the field, support customers proactively, and build recurring digital services on top of your equipment.",
        imageSrc: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
        imageAlt: "OptiPeople efficiency report with live Availability, Performance and OEE for a connected machine",
        primaryLabel: "Learn About OEM Benefits",
        primaryHref: "/solutions/oems",
        bgColor: "bg-blue-50/0",
        layout: "overlay",
        overlay: "light",
      },
      {
        tab: "Service and aftermarket teams",
        title: "Fix Problems Before Customers Feel Them",
        description:
          "Give service teams real visibility into machine health and usage. Plan maintenance, reduce firefighting, and turn service into a competitive advantage.",
        imageSrc: "/images/Mockups/Report-Individual-Events-Desktop.png",
        imageAlt: "Registered stop log with service-critical tags for proactive maintenance and service",
        primaryLabel: "Optimize Your Service Ops",
        primaryHref: "/solutions/service",
        bgColor: "bg-blue-50/0",
        layout: "overlay",
        overlay: "light",
      },
    ],
    logoWallTitle: "Trusted by industry leaders",
    trust: {
      heading: "Trusted by leading manufacturers.",
      headingSub: "See how they run production on data with OptiPeople.",
      storiesLabel: "Customer stories",
      quote:
        "Comparing our OEE to previous data before Opticloud, we’ve seen an average increase of 5% within just three months.",
      cite: "Kasper Kielgast Poulsen, Fabrikschef, Dansk Træemballage",
    },
    platform: {
      eyebrow: "Platform modules",
      title: "One module at a time. One data foundation.",
      subtitle:
        "Each module answers a specific operational question, and they all read from the same machine signals, so a stop registered on the floor lands in OEE, in the maintenance history, and in the monthly report without anyone re-entering it.",
      ariaLabel: "Platform modules",
    },
    moduleCta: "Explore {module}",
    // No slide takes a screenshot any more: every module draws its
    // visual in code, see components/module-mockups.tsx
    moduleSlides: {
      mes: {
        description:
          "The cloud MES the other modules run on. Start with one line, add modules as the next question comes up, same data foundation, no re-implementation.",
      },
      oee: {
        description:
          "See where production time is lost and why. Track availability, performance, and quality live across shifts, lines, and machines, built from real machine signals.",
      },
      qms: {
        description:
          "Register quality data where it happens. Trace deviations back to machine, batch, and shift, and turn checks into documentation instead of paperwork.",
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
          "Two-way sync between ERP and the floor. Orders reach the machine, and progress, scrap, and time flow straight back without anyone re-typing them.",
      },
      iot: {
        description:
          "Get data from anything, modern controls over standard industrial protocols, and older machines through sensors that measure the signal directly.",
      },
      documents: {
        description:
          "Work instructions, drawings, and certificates at the machine, always in the current version. The operator sees what applies to the order in front of them.",
      },
      analysis: {
        description:
          "Turn production data into clear reports on performance, losses, and cost drivers, automatically, without spreadsheets or manual work.",
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
          "Comparing our OEE to previous data before Opticloud, we've seen an average increase of 5% within just three months.",
        author: "Kasper Kielgast Poulsen",
        title: "Fabrikschef",
        company: "Dansk Træemballage",
      },
      {
        quote:
          "Over the past two years, Opticloud has helped us increase productivity by approximately 5%. Data collection combined with continuous improvements is key.",
        author: "Tommy Andersen",
        title: "Production Manager",
        company: "DFI Geisler",
      },
      {
        quote:
          "We now perform maintenance based on operating hours instead of fixed time intervals. This gives us ~40 extra production hours annually and 50% fewer service hours.",
        author: "Stefan Lindell",
        title: "Lean Project Manager",
        company: "Kvik",
      },
      {
        quote:
          "Opticloud provides us with valuable management information that was previously unavailable. Our operators monitor uptime on tablets, which has encouraged quicker recovery times.",
        author: "Kasper Kielgast Poulsen",
        title: "Fabrikschef",
        company: "Dansk Træemballage",
      },
      {
        quote:
          "For some of our operators, recording accurate data has become a kind of competition to maximize productivity. We've achieved 5% higher productivity.",
        author: "Tommy Andersen",
        title: "Production Manager",
        company: "DFI Geisler",
      },
      {
        quote:
          "We achieved a 5% increase in uptime with automatic downtime cause logging. The data is now valid and reliable with full microstop tracking.",
        author: "Stefan Lindell",
        title: "Lean Project Manager",
        company: "Kvik",
      },
    ],
    testimonialTitle: "What our customers say",
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
          company: "Confidential plant",
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
          company: "Danpres",
          value: "−50%",
          unit: "tool repair time",
          note: "Capacity released inside the existing schedule.",
          slug: "danpres-boosting-production-by-reducing-tool-repair-time-by-50",
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
          heading: "Styr produktion og drift på live data",
          subheading: "Ét datagrundlag. Alle teams på de samme tal.",
        },
        category: {
          heading: "Én platform til at drive hele produktionen",
          subheading: "Alle maskiner, alle moduler, ét datagrundlag.",
        },
        outcome: {
          heading: "Kend din fabrik. I realtid.",
          subheading: "Live OEE, kvalitet og vedligehold på ét sted.",
        },
      },
      modulePrompt: "Hvad vil du gøre bedre?",
      moduleRows: [
        ["mes", "oee", "qms", "ems", "maintenance"],
        ["planning", "iot", "documents", "ai-agents"],
      ],
    },
    tabsAriaLabel: "Løsninger til teams",
    tabSlides: [
      {
        tab: "Produktionsvirksomheder",
        title: "Kend din fabrik. I realtid.",
        description:
          "OptiPeople forbinder maskiner, processer og mennesker i ét levende driftsoverblik. Se flaskehalse mens de opstår, reagér hurtigere, og styr produktionen på fakta.",
        imageSrc: "/images/Mockups/Dashboard-Operator-Panel-Desktop.png",
        imageAlt: "Live OptiPeople operatørpanel med maskinstatus, output og produktionstidslinje i realtid",
        primaryLabel: "Udforsk produktionsløsninger",
        primaryHref: "/solutions/manufacturing",
        bgColor: "bg-blue-50/0",
        layout: "overlay",
        overlay: "dark",
      },
      {
        tab: "OEM'er og maskinbyggere",
        title: "Gør maskiner til platforme",
        description:
          "Opticloud gør det muligt at levere forbundne maskiner med indbygget indsigt. Overvåg performance i felten, hjælp kunder proaktivt, og byg digitale services oven på udstyret.",
        imageSrc: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
        imageAlt: "OptiPeople effektivitetsrapport med live tilgængelighed, performance og OEE for en forbundet maskine",
        primaryLabel: "Se OEM-fordele",
        primaryHref: "/solutions/oems",
        bgColor: "bg-blue-50/0",
        layout: "overlay",
        overlay: "light",
      },
      {
        tab: "Service og aftermarket",
        title: "Løs problemer før kunden mærker dem",
        description:
          "Giv serviceholdet indblik i maskinernes sundhed og brug. Planlæg vedligehold, reducer brandslukning, og gør service til en konkurrencefordel.",
        imageSrc: "/images/Mockups/Report-Individual-Events-Desktop.png",
        imageAlt: "Log over registrerede stop med service-kritiske tags til proaktiv vedligehold og service",
        primaryLabel: "Optimer service",
        primaryHref: "/solutions/service",
        bgColor: "bg-blue-50/0",
        layout: "overlay",
        overlay: "light",
      },
    ],
    logoWallTitle: "Brugt af industriledere",
    trust: {
      heading: "Foretrukket af førende produktionsvirksomheder.",
      headingSub: "Se hvordan de driver produktion på data med OptiPeople.",
      storiesLabel: "Kundehistorier",
      quote:
        "Sammenlignet med vores OEE før Opticloud har vi set en gennemsnitlig stigning på 5% på bare tre måneder.",
      cite: "Kasper Kielgast Poulsen, Fabrikschef, Dansk Træemballage",
    },
    platform: {
      eyebrow: "Platformmoduler",
      title: "Ét modul ad gangen. Ét datagrundlag.",
      subtitle:
        "Hvert modul svarer på et konkret driftsspørgsmål, og de læser alle fra de samme maskinsignaler, et stop registreret på gulvet slår igennem i OEE, i vedligeholdshistorikken og i månedsrapporten, uden at nogen taster det ind igen.",
      ariaLabel: "Platformmoduler",
    },
    moduleCta: "Udforsk {module}",
    // Ingen slides bruger screenshots: hvert modul tegner sit visuelle
    // udtryk i kode, se components/module-mockups.tsx
    moduleSlides: {
      mes: {
        description:
          "Det cloudbaserede MES, de øvrige moduler kører på. Start med én linje og tilføj moduler, når næste spørgsmål melder sig, samme datagrundlag hele vejen.",
      },
      oee: {
        description:
          "Se hvor produktionstiden går tabt og hvorfor. Følg tilgængelighed, performance og kvalitet live på tværs af skift, linjer og maskiner.",
      },
      qms: {
        description:
          "Registrer kvalitetsdata dér hvor arbejdet sker. Spor afvigelser tilbage til maskine, batch og skift, og gør kontroller til dokumentation i stedet for papirarbejde.",
      },
      ems: {
        description:
          "Kobl energi, vibration, flow og temperatur direkte til produktionen. Se kWh pr. produceret enhed og find det spild, elregningen skjuler.",
      },
      maintenance: {
        description:
          "Planlæg forebyggende vedligehold efter brug og tilstand i stedet for kalenderen. Tildel opgaver, følg status og reducer uplanlagt nedetid.",
      },
      planning: {
        description:
          "Planlæg ordrer efter den kapacitet I faktisk har. Planer bygget på målte kørehastigheder og reel maskintilgængelighed, ikke regnearksantagelser.",
      },
      orders: {
        description:
          "Tovejssynk mellem ERP og gulvet. Ordrer kommer ud på maskinen, og status, spild og tid går direkte tilbage uden manuel indtastning.",
      },
      iot: {
        description:
          "Få data fra alt, moderne styringer over gængse industrielle protokoller, og ældre maskiner via sensorer, der måler signalet direkte.",
      },
      documents: {
        description:
          "Arbejdsinstruktioner, tegninger og certifikater ved maskinen, altid i den gældende version. Operatøren ser det, der gælder for ordren foran sig.",
      },
      analysis: {
        description:
          "Gør produktionsdata til tydelige rapporter om performance, tab og omkostningsdrivere, automatisk og uden regnearksarbejde.",
      },
      "ai-agents": {
        description:
          "Stil spørgsmål i almindeligt sprog, og lad agenter holde øje med mønstre i jeres egne produktionsdata, på de samme tal, som alle andre ser.",
      },
    },

    ai: { ariaLabel: "AI-funktioner" },
    testimonials: [
      {
        quote:
          "Sammenlignet med vores OEE før Opticloud har vi set en gennemsnitlig stigning på 5% på bare tre måneder.",
        author: "Kasper Kielgast Poulsen",
        title: "Fabrikschef",
        company: "Dansk Træemballage",
      },
      {
        quote:
          "Opticloud har hjulpet os med at øge produktiviteten med cirka 5%. Dataindsamling kombineret med løbende forbedringer er nøglen.",
        author: "Tommy Andersen",
        title: "Production Manager",
        company: "DFI Geisler",
      },
      {
        quote:
          "Vi vedligeholder nu efter driftstimer i stedet for faste intervaller. Det giver omkring 40 ekstra produktionstimer årligt.",
        author: "Stefan Lindell",
        title: "Lean Project Manager",
        company: "Kvik",
      },
    ],
    testimonialTitle: "Det siger kunderne",
    bento: {
      eyebrow: "Kunderesultater",
      title: "Målt på fabriksgulvet.",
      subtitle: "Resultater produktionsvirksomheder har opnået med OptiPeople. Åbn en for at se hvordan.",
      allCases: "Alle cases",
      caseCards: [
        {
          company: "Fiberline Composites",
          value: "−41%",
          unit: "unødvendige stop",
          note: "Færre maskinstop, og 6% mindre tid tabt per stop.",
          slug: "konkurrencekraft-og-tempo-pa-digital-transformation",
          span: "wide",
          kind: "chart",
          tone: "sage",
          chart: { before: 100, after: 59, beforeLabel: "Før", afterLabel: "Efter" },
        },
        {
          company: "Fortrolig fabrik",
          value: "21→41%",
          unit: "OEE",
          note: "Output næsten fordoblet med datadrevet drift.",
          slug: "fra-data-til-effektivitet",
          span: "narrow",
          kind: "chart",
          tone: "dark",
          chart: { before: 21, after: 41, beforeLabel: "21%", afterLabel: "41%" },
        },
        {
          company: "Danpres",
          value: "−50%",
          unit: "tid til værktøjsreparation",
          note: "Kapacitet frigjort inden for den eksisterende plan.",
          slug: "danpres-boosting-production-by-reducing-tool-repair-time-by-50",
          span: "narrow",
          kind: "image",
        },
        {
          company: "Kvik",
          value: "−50%",
          unit: "servicetimer",
          note: "Brugsbaseret vedligehold, plus 40 ekstra produktionstimer om året.",
          slug: "kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud",
          span: "wide",
          kind: "image",
        },
        {
          company: "Dansk Træemballage",
          value: "+5%",
          unit: "OEE på tre måneder",
          note: "Opnået på den allerførste forbundne produktionslinje.",
          slug: "dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud",
          span: "wide",
          kind: "image",
        },
        {
          company: "DFI Geisler",
          value: "+5%",
          unit: "produktivitet",
          note: "Fastholdt over to år og syv maskiner.",
          slug: "dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights",
          span: "narrow",
          kind: "image",
        },
      ],
    },
  },
}

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "OptiPeople | Digital operations platform for manufacturers",
    description:
      "Connect machines, track OEE in real time, automate reporting, and give production teams the data they need to improve output and uptime.",
  },
  da: {
    title: "OptiPeople | Digital driftsplatform til produktionsvirksomheder",
    description:
      "Forbind maskiner, følg produktion i realtid, forbedr OEE og gør driftsdata til handling.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const m = metadataCopy[locale as Locale] ?? metadataCopy.en
  return buildMetadata({
    title: m.title,
    description: m.description,
    path: "/",
    locale: locale as Locale,
  })
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const loc = (locale as Locale) in copy ? (locale as Locale) : "en"
  const t = copy[loc]
  const hero = t.hero.variants[heroVariant]
  const moduleSlides = buildModuleSlides(loc, t.moduleSlides, t.moduleCta)
  const ai = aiStackSliderCopy[loc]

  return (
    <main>
      <section className="py-12 lg:py-16">
        <div className="w-full px-[var(--edge)] py-22">
          <h1 className="mx-auto max-w-3xl text-balance text-center text-4xl font-light leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {hero.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-center text-lg font-light leading-snug text-foreground/70 sm:text-xl">
            {hero.subheading}
          </p>
          <HeroModulePicker
            moduleRows={moduleChipRows(loc, t.hero.moduleRows)}
            prompt={t.hero.modulePrompt}
            defaultSelectedIds={heroDefaultModules}
            className="mt-10"
          />
        </div>

        <SlideCarousel
          slides={t.tabSlides}
          navigationType={["tabs"]}
          ariaLabel={t.tabsAriaLabel}
          className="mt-8"
        />
      </section>

      {/* Customer Logo Wall */}
      <LogoWall logos={customerLogos} className="pb-0 lg:pb-0" />

      {/* Trust band, pairs the logo wall with social proof */}
      <section className="pt-20 pb-12 lg:pt-32 lg:pb-28">
        <div className="grid w-full grid-cols-1 gap-12 px-[var(--edge)] lg:grid-cols-2 lg:gap-16">
          {/* Left, headline + customer stories link */}
          <div>
            <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
              {t.trust.heading}
              <span className="block text-foreground/50">{t.trust.headingSub}</span>
            </h2>
            <Link
              href="/cases"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-colors group-hover:border-black/20">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              {t.trust.storiesLabel}
            </Link>
          </div>

          {/* Right, featured testimonial */}
          <figure className="flex flex-col">
            <blockquote className="text-xl font-light leading-relaxed text-foreground/90 lg:text-2xl">
              &ldquo;{t.trust.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              {t.trust.cite}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-12 lg:py-28">
        <div className="pl-[var(--edge)] pr-6 lg:pr-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {t.platform.eyebrow}
          </p>
          <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
            {t.platform.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {t.platform.subtitle}
          </p>
        </div>

        <SlideCarousel
          slides={moduleSlides}
          navigationType={["arrows"]}
          ariaLabel={t.platform.ariaLabel}
          className="mt-8"
        />
      </section>

      {/* AI capabilities slider */}
      <section className="py-12 lg:py-28">
        <div className="pl-[var(--edge)] pr-6 lg:pr-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {ai.eyebrow}
          </p>
          <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
            {ai.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {ai.subtitle}
          </p>
        </div>

        <SlideCarousel
          slides={aiStackSlides(loc)}
          navigationType={["arrows"]}
          ariaLabel={t.ai.ariaLabel}
          className="mt-8"
        />
      </section>

      {/* Testimonial Carousel */}
      <TestimonialCarousel
        testimonials={t.testimonials}
        title={t.testimonialTitle}
        className="py-12 lg:py-28"
      />

      {/* Customer Results, Scandinavian bento of measured outcomes */}
      {/* Negative bottom margin cancels the CTA's top margin so the two
          backgrounds meet flush instead of leaving an empty white band. */}
      <section className="-mb-16 bg-[var(--gray-1)] py-24 lg:-mb-24 lg:py-32">
        <div className="px-[var(--edge)]">
          {/* Header */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t.bento.eyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-light tracking-tight text-foreground lg:text-5xl">
                {t.bento.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t.bento.subtitle}
              </p>
            </div>
            <Link
              href="/cases"
              className="group hidden shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-black/20 hover:text-foreground sm:inline-flex"
            >
              {t.bento.allCases}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Bento grid */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {(() => {
              // Assign each image card a color from the palette, cycling in the
              // order they appear so adjacent cards stay visually distinct.
              const imageAccents: Record<string, (typeof CASE_IMAGE_ACCENTS)[number]> = {}
              let imageIndex = 0
              for (const c of t.bento.caseCards) {
                if (c.kind === "image") {
                  imageAccents[c.slug] =
                    CASE_IMAGE_ACCENTS[imageIndex % CASE_IMAGE_ACCENTS.length]
                  imageIndex++
                }
              }
              return t.bento.caseCards.map((card) => {
              const wide = card.span === "wide"
              const spanClass = wide ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-2"

              const metric = (cls: string) => {
                if (!card.value.includes("→")) return card.value
                const [from, to] = card.value.split("→")
                return (
                  <>
                    {from}
                    <span className={`mx-1 font-extralight ${cls}`}>→</span>
                    {to}
                  </>
                )
              }

              // ── Chart card (light sage or dark) ──
              if (card.kind === "chart") {
                const dark = card.tone === "dark"
                return (
                  <Link
                    key={card.slug}
                    href={`/blog/${card.slug}`}
                    className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl p-7 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:p-8 ${spanClass} ${
                      dark ? "text-white" : "text-foreground"
                    }`}
                    style={{
                      backgroundColor: dark ? "var(--gray-9)" : "oklch(0.955 0.013 168)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={`text-xs font-medium uppercase tracking-[0.2em] ${
                            dark ? "text-white/55" : "text-foreground/45"
                          }`}
                        >
                          {card.company}
                        </p>
                        <h3 className="mt-4 text-5xl font-light leading-none tracking-tight tabular-nums lg:text-6xl">
                          {metric(dark ? "text-white/40" : "text-foreground/30")}
                        </h3>
                        <p className={`mt-3 text-sm ${dark ? "text-white/70" : "text-foreground/60"}`}>
                          {card.unit}
                        </p>
                      </div>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                          dark
                            ? "bg-white/10 text-white group-hover:bg-white/20"
                            : "border border-black/10 bg-white/70 text-foreground group-hover:bg-white"
                        }`}
                      >
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>

                    <div className="mt-8 flex items-end justify-between gap-6">
                      {card.chart && (
                        <ComparisonBars {...card.chart} tone={card.tone ?? "sage"} />
                      )}
                      <p
                        className={`max-w-[16rem] text-sm leading-snug ${
                          dark ? "text-white/50" : "text-foreground/50"
                        }`}
                      >
                        {card.note}
                      </p>
                    </div>
                  </Link>
                )
              }

              // ── Image card (full-bleed photo + overlay) ──
              const image = getPostBySlug(card.slug)?.image
              const accent = imageAccents[card.slug]
              const light = accent.tone === "light"
              return (
                <Link
                  key={card.slug}
                  href={`/blog/${card.slug}`}
                  className={`group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl ${spanClass} ${
                    light ? "text-white" : "text-slate-900"
                  }`}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={`${card.company} production`}
                      fill
                      sizes={wide ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 40vw"}
                      className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-105"
                    />
                  )}
                  {/* color wash, AI-slider palette, near-opaque so the photo
                      recedes to a subtle texture under the brand color. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-90"
                    style={{ backgroundColor: accent.bg }}
                  />
                  {/* legibility gradient toward the content at the bottom */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t to-transparent ${
                      light ? "from-black/60 via-black/15" : "from-white/65 via-white/20"
                    }`}
                  />

                  <span
                    className={`absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
                      light
                        ? "bg-white/15 text-white group-hover:bg-white/30"
                        : "bg-black/10 text-slate-900 group-hover:bg-black/20"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>

                  <div className="relative p-7 lg:p-8">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                        light ? "text-white/90" : "text-slate-900/90"
                      }`}
                    >
                      {card.company}
                    </p>
                    <h3 className="mt-3 text-5xl font-normal leading-none tracking-tight tabular-nums lg:text-6xl">
                      {card.value}
                    </h3>
                    <p className={`mt-2 text-sm font-medium ${light ? "text-white" : "text-slate-900"}`}>
                      {card.unit}
                    </p>
                    <p className={`mt-3 max-w-sm text-sm leading-snug ${light ? "text-white/85" : "text-slate-900/85"}`}>
                      {card.note}
                    </p>
                  </div>
                </Link>
              )
              })
            })()}
          </div>

          {/* Mobile all-cases */}
          <div className="mt-10 sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/cases">
                {t.bento.allCases}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
