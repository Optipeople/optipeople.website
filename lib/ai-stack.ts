import { localizeHref, type Locale } from "@/lib/i18n"
import type { SlideData } from "@/components/slide-carousel"

export type AiCapabilitySlug =
  | "chat"
  | "workflows"
  | "agents"
  | "integrations"
  | "api"

export type AiCapabilityTheme = {
  /** Card background color (applied via inline style for reliable rendering). */
  bg: string
  /** Whether text on the card should be light or dark. */
  text: "light" | "dark"
}

type LocalizedCapability = {
  /** Short title shown on the slider card (mirrors Langdock: "Chat", "Workflows"…). */
  cardTitle: string
  /** One-line description under the card title. */
  cardSubtitle: string

  // Landing page copy
  metaTitle: string
  metaDescription: string
  eyebrow: string
  heroTitle: string
  heroBody: string
  valueTitle: string
  valueBody: string
  capabilitiesTitle: string
  capabilities: { title: string; description: string }[]
  ctaTitle: string
  ctaBody: string
  primaryCtaLabel: string
  /** Optional outbound/secondary action (e.g. API reference). */
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export type AiCapability = {
  slug: AiCapabilitySlug
  theme: AiCapabilityTheme
  /** Locale-independent path; localize with localizeHref(). */
  href: string
  content: Record<Locale, LocalizedCapability>
}

export const aiStackSliderCopy: Record<
  Locale,
  { eyebrow: string; title: string; subtitle: string }
> = {
  en: {
    eyebrow: "OptiPeople AI",
    title: "The essential AI stack for your operation.",
    subtitle: "Simple for every team. Ready for advanced production use-cases.",
  },
  da: {
    eyebrow: "OptiPeople AI",
    title: "Den essentielle AI-stak til din drift.",
    subtitle:
      "Enkel for alle teams. Klar til avancerede produktions-use-cases.",
  },
}

const CONTACT_HREF = "/contact"
const API_DOCS_HREF =
  "https://api.optipeople.dk/swagger/index.html?access=optipeople-1"

export const aiCapabilities: AiCapability[] = [
  {
    slug: "chat",
    href: "/ai/chat",
    theme: { bg: "#243b2f", text: "light" },
    content: {
      en: {
        cardTitle: "Chat",
        cardSubtitle: "Model-agnostic AI assistant for everyone in the company.",
        metaTitle: "Opti Assist | AI chat for your operation",
        metaDescription:
          "Opti Assist is a model-agnostic AI chat for your whole team — grounded in your production data, documents and company knowledge.",
        eyebrow: "Chat · Opti Assist",
        heroTitle: "AI chat for everyone in your operation",
        heroBody:
          "Opti Assist gives every team a single, model-agnostic chat — grounded in your production data, documents and company knowledge. Ask in plain language, get answers you can trust.",
        valueTitle: "One assistant for the whole company",
        valueBody:
          "Operators, planners and managers shouldn't need a data analyst to get an answer. Opti Assist connects to your knowledge and your live operations, so anyone can ask a question and act on the result — in their own language.",
        capabilitiesTitle: "What Opti Assist can do",
        capabilities: [
          {
            title: "Model-agnostic by design",
            description:
              "Switch between the best available models. You're never locked to a single vendor, and new models are available as they ship.",
          },
          {
            title: "Grounded in your knowledge",
            description:
              "Attach documents, SOPs and reports, or query company knowledge directly. Answers cite the sources they came from.",
          },
          {
            title: "Connected to live operations",
            description:
              "Ask about OEE, downtime causes or shift performance and get answers from your real production data, not last week's spreadsheet.",
          },
        ],
        ctaTitle: "Put an AI assistant in every team's hands",
        ctaBody:
          "See how Opti Assist fits into your operation in a short demo.",
        primaryCtaLabel: "Book a demo",
      },
      da: {
        cardTitle: "Chat",
        cardSubtitle: "Model-agnostisk AI-assistent til hele virksomheden.",
        metaTitle: "Opti Assist | AI-chat til din drift",
        metaDescription:
          "Opti Assist er en model-agnostisk AI-chat til hele teamet — forankret i jeres produktionsdata, dokumenter og virksomhedsviden.",
        eyebrow: "Chat · Opti Assist",
        heroTitle: "AI-chat til alle i din drift",
        heroBody:
          "Opti Assist giver alle teams én model-agnostisk chat — forankret i jeres produktionsdata, dokumenter og virksomhedsviden. Spørg i almindeligt sprog og få svar, du kan stole på.",
        valueTitle: "Én assistent til hele virksomheden",
        valueBody:
          "Operatører, planlæggere og ledere skal ikke bruge en dataanalytiker for at få et svar. Opti Assist forbinder jeres viden med jeres live drift, så alle kan stille et spørgsmål og handle på svaret — på deres eget sprog.",
        capabilitiesTitle: "Det kan Opti Assist",
        capabilities: [
          {
            title: "Model-agnostisk fra bunden",
            description:
              "Skift mellem de bedste tilgængelige modeller. I er aldrig låst til én leverandør, og nye modeller er klar, så snart de udkommer.",
          },
          {
            title: "Forankret i jeres viden",
            description:
              "Vedhæft dokumenter, SOP'er og rapporter, eller spørg direkte i virksomhedsviden. Svar henviser til kilderne.",
          },
          {
            title: "Forbundet til live drift",
            description:
              "Spørg om OEE, stopårsager eller skift-performance og få svar fra jeres reelle produktionsdata — ikke sidste uges regneark.",
          },
        ],
        ctaTitle: "Giv alle teams en AI-assistent i hånden",
        ctaBody: "Se hvordan Opti Assist passer ind i din drift i en kort demo.",
        primaryCtaLabel: "Book en demo",
      },
    },
  },
  {
    slug: "workflows",
    href: "/ai/workflows",
    theme: { bg: "#c5d8e8", text: "dark" },
    content: {
      en: {
        cardTitle: "Workflows",
        cardSubtitle: "Build powerful AI automations.",
        metaTitle: "AI Workflows | Automate your operation",
        metaDescription:
          "Build AI-powered automations that turn production events into actions — no code required. Part of Opti Assist.",
        eyebrow: "Workflows",
        heroTitle: "Build powerful AI automations",
        heroBody:
          "Turn production events into action with visual AI workflows. Chain steps, branch on conditions, loop over items and call AI — no code required.",
        valueTitle: "From event to action, automatically",
        valueBody:
          "Most operational work is repetitive: a stop happens, a report is needed, a task gets created. Workflows let you wire those patterns once and let them run — combining your data, your systems and AI in a single visual canvas.",
        capabilitiesTitle: "Build blocks for any process",
        capabilities: [
          {
            title: "Visual, no-code canvas",
            description:
              "Drag in nodes for agents, conditions, loops, web search, guardrails and custom code. Connect them and you have an automation.",
          },
          {
            title: "Trigger on real events",
            description:
              "Start a workflow from a downtime event, a schedule, a new document or an inbound request, then act on it instantly.",
          },
          {
            title: "AI where it adds value",
            description:
              "Summarize, classify, extract and decide with AI steps — with guardrails so output stays reliable.",
          },
        ],
        ctaTitle: "Automate the work nobody wants to do twice",
        ctaBody: "We'll help you map your first workflow in a demo.",
        primaryCtaLabel: "Book a demo",
      },
      da: {
        cardTitle: "Workflows",
        cardSubtitle: "Byg stærke AI-automatiseringer.",
        metaTitle: "AI-workflows | Automatisér din drift",
        metaDescription:
          "Byg AI-drevne automatiseringer, der gør produktionshændelser til handling — uden kode. En del af Opti Assist.",
        eyebrow: "Workflows",
        heroTitle: "Byg stærke AI-automatiseringer",
        heroBody:
          "Gør produktionshændelser til handling med visuelle AI-workflows. Kæd trin sammen, forgren på betingelser, loop over emner og kald AI — uden kode.",
        valueTitle: "Fra hændelse til handling, automatisk",
        valueBody:
          "Meget driftsarbejde er gentaget: et stop sker, en rapport skal laves, en opgave oprettes. Workflows lader dig sætte mønstrene op én gang og lade dem køre — med jeres data, jeres systemer og AI i ét visuelt lærred.",
        capabilitiesTitle: "Byggeklodser til enhver proces",
        capabilities: [
          {
            title: "Visuelt no-code-lærred",
            description:
              "Træk noder ind til agenter, betingelser, loops, websøgning, guardrails og egen kode. Forbind dem, og du har en automatisering.",
          },
          {
            title: "Udløs på reelle hændelser",
            description:
              "Start et workflow ud fra et stop, en tidsplan, et nyt dokument eller en indkommende anmodning — og handl med det samme.",
          },
          {
            title: "AI hvor det skaber værdi",
            description:
              "Opsummér, klassificér, udtræk og beslut med AI-trin — med guardrails, så output forbliver pålideligt.",
          },
        ],
        ctaTitle: "Automatisér det arbejde, ingen vil lave to gange",
        ctaBody: "Vi hjælper dig med at kortlægge dit første workflow i en demo.",
        primaryCtaLabel: "Book en demo",
      },
    },
  },
  {
    slug: "agents",
    href: "/ai/agents",
    theme: { bg: "#d8d4c6", text: "dark" },
    content: {
      en: {
        cardTitle: "Agents",
        cardSubtitle: "Custom AI for recurring tasks.",
        metaTitle: "AI Agents | Custom AI for recurring tasks",
        metaDescription:
          "Build custom AI agents that handle recurring operational tasks — searching, reading, reasoning and acting on your data. Part of Opti Assist.",
        eyebrow: "Agents",
        heroTitle: "Custom AI for recurring tasks",
        heroBody:
          "Agents are purpose-built assistants that handle a recurring job end to end — searching your sources, reading documents, reasoning over the result and generating the response.",
        valueTitle: "Hand off the routine, keep the oversight",
        valueBody:
          "Some tasks come back every day: reviewing offers, comparing specs, drafting the morning summary. An agent does the legwork the same way every time, shows its steps, and hands you a result you can check.",
        capabilitiesTitle: "How agents work",
        capabilities: [
          {
            title: "Built for one job, done well",
            description:
              "Give an agent a clear task and the tools it needs. It runs the same reliable process every time it's triggered.",
          },
          {
            title: "Reads and reasons over your data",
            description:
              "Agents search folders, open documents and pull from connected systems before they answer — so the output is grounded.",
          },
          {
            title: "Transparent, step by step",
            description:
              "Every action is visible: what it searched, what it read, what it concluded. No black box.",
          },
        ],
        ctaTitle: "Give your recurring work to an agent",
        ctaBody: "Tell us the task — we'll show you the agent in a demo.",
        primaryCtaLabel: "Book a demo",
      },
      da: {
        cardTitle: "Agents",
        cardSubtitle: "Skræddersyet AI til tilbagevendende opgaver.",
        metaTitle: "AI-agenter | Skræddersyet AI til tilbagevendende opgaver",
        metaDescription:
          "Byg skræddersyede AI-agenter, der håndterer tilbagevendende driftsopgaver — søger, læser, ræsonnerer og handler på jeres data. En del af Opti Assist.",
        eyebrow: "Agents",
        heroTitle: "Skræddersyet AI til tilbagevendende opgaver",
        heroBody:
          "Agenter er formålsbyggede assistenter, der løser en tilbagevendende opgave fra ende til anden — søger i jeres kilder, læser dokumenter, ræsonnerer over resultatet og genererer svaret.",
        valueTitle: "Giv rutinen videre, behold overblikket",
        valueBody:
          "Nogle opgaver kommer igen hver dag: gennemgå tilbud, sammenlign specs, skriv morgenens opsummering. En agent laver benarbejdet på samme måde hver gang, viser sine trin og giver dig et resultat, du kan tjekke.",
        capabilitiesTitle: "Sådan arbejder agenter",
        capabilities: [
          {
            title: "Bygget til én opgave, løst godt",
            description:
              "Giv agenten en klar opgave og de værktøjer, den skal bruge. Den kører den samme pålidelige proces, hver gang den udløses.",
          },
          {
            title: "Læser og ræsonnerer over jeres data",
            description:
              "Agenter søger i mapper, åbner dokumenter og henter fra forbundne systemer, før de svarer — så output er forankret.",
          },
          {
            title: "Gennemsigtig, trin for trin",
            description:
              "Hver handling er synlig: hvad den søgte, hvad den læste, hvad den konkluderede. Ingen black box.",
          },
        ],
        ctaTitle: "Giv dit tilbagevendende arbejde til en agent",
        ctaBody: "Fortæl os opgaven — vi viser dig agenten i en demo.",
        primaryCtaLabel: "Book en demo",
      },
    },
  },
  {
    slug: "integrations",
    href: "/ai/integrations",
    theme: { bg: "#163b40", text: "light" },
    content: {
      en: {
        cardTitle: "Integrations",
        cardSubtitle: "Connects with the ERP systems you already run.",
        metaTitle: "Integrations | Connect your ERP and tools",
        metaDescription:
          "OptiPeople integrates with the major ERP systems — SAP, Microsoft Dynamics, Business Central and more — plus the everyday tools your teams use.",
        eyebrow: "Integrations",
        heroTitle: "Connects with the systems you already run",
        heroBody:
          "OptiPeople plugs into the big ERP systems and the everyday tools around them, so production data, orders and documents flow without manual re-keying.",
        valueTitle: "Your AI is only as good as its connections",
        valueBody:
          "An assistant that can't see your ERP is just a chatbot. We connect to the systems of record on your shop floor and in your back office, so AI works from the same data your business already trusts.",
        capabilitiesTitle: "Built to fit your stack",
        capabilities: [
          {
            title: "Major ERP systems",
            description:
              "Connect to SAP, Microsoft Dynamics 365, Business Central, Navision and other ERP systems your operation depends on.",
          },
          {
            title: "The tools around them",
            description:
              "Sync documents, spreadsheets, email and collaboration tools so context follows the work.",
          },
          {
            title: "Two-way by design",
            description:
              "Read live data in and write actions back — create orders, update tasks and post results where your teams already look.",
          },
        ],
        ctaTitle: "Connect OptiPeople to your ERP",
        ctaBody: "Tell us your systems and we'll map the integration in a demo.",
        primaryCtaLabel: "Book a demo",
      },
      da: {
        cardTitle: "Integrationer",
        cardSubtitle: "Forbinder med de ERP-systemer, I allerede kører.",
        metaTitle: "Integrationer | Forbind jeres ERP og værktøjer",
        metaDescription:
          "OptiPeople integrerer med de store ERP-systemer — SAP, Microsoft Dynamics, Business Central med flere — samt de daglige værktøjer, jeres teams bruger.",
        eyebrow: "Integrationer",
        heroTitle: "Forbinder med de systemer, I allerede kører",
        heroBody:
          "OptiPeople kobler sig på de store ERP-systemer og de daglige værktøjer omkring dem, så produktionsdata, ordrer og dokumenter flyder uden manuel indtastning.",
        valueTitle: "Din AI er kun så god som dens forbindelser",
        valueBody:
          "En assistent, der ikke kan se jeres ERP, er bare en chatbot. Vi forbinder til systemerne på gulvet og i backoffice, så AI arbejder ud fra samme data, som forretningen allerede stoler på.",
        capabilitiesTitle: "Bygget til at passe ind i jeres stak",
        capabilities: [
          {
            title: "Store ERP-systemer",
            description:
              "Forbind til SAP, Microsoft Dynamics 365, Business Central, Navision og andre ERP-systemer, jeres drift afhænger af.",
          },
          {
            title: "Værktøjerne omkring dem",
            description:
              "Synkronisér dokumenter, regneark, mail og samarbejdsværktøjer, så konteksten følger arbejdet.",
          },
          {
            title: "Tovejs fra bunden",
            description:
              "Læs live data ind og skriv handlinger tilbage — opret ordrer, opdatér opgaver og post resultater dér, hvor jeres teams allerede kigger.",
          },
        ],
        ctaTitle: "Forbind OptiPeople til jeres ERP",
        ctaBody:
          "Fortæl os jeres systemer, så kortlægger vi integrationen i en demo.",
        primaryCtaLabel: "Book en demo",
      },
    },
  },
  {
    slug: "api",
    href: "/ai/api",
    theme: { bg: "#1c1f26", text: "light" },
    content: {
      en: {
        cardTitle: "API",
        cardSubtitle: "A public REST API to build on your data.",
        metaTitle: "API | Build on your OptiPeople data",
        metaDescription:
          "OptiPeople offers a public REST API so you can build on top of your production data — OEE, machines, stops and more.",
        eyebrow: "API",
        heroTitle: "A public REST API to build on your data",
        heroBody:
          "Everything you see in OptiPeople is available programmatically. Pull OEE, machines, stops and telemetry into your own apps, dashboards and automations with a clean, documented REST API.",
        valueTitle: "Your data, on your terms",
        valueBody:
          "Sometimes the value is in your own system. The OptiPeople REST API gives developers direct, authenticated access to production data, so you can extend the platform however your business needs.",
        capabilitiesTitle: "Developer-ready",
        capabilities: [
          {
            title: "Clean REST endpoints",
            description:
              "Predictable, resource-based endpoints with JSON responses for machines, OEE, stops, telemetry and more.",
          },
          {
            title: "Documented with Swagger",
            description:
              "An interactive OpenAPI reference lets you explore and try every endpoint before you write a line of code.",
          },
          {
            title: "Secure access",
            description:
              "Authenticated, scoped access so you decide exactly what each integration can read and do.",
          },
        ],
        ctaTitle: "Start building on OptiPeople",
        ctaBody: "Explore the live API reference or talk to us about access.",
        primaryCtaLabel: "Talk to us",
        secondaryCtaLabel: "View API reference",
        secondaryCtaHref: API_DOCS_HREF,
      },
      da: {
        cardTitle: "API",
        cardSubtitle: "Et offentligt REST API til at bygge på jeres data.",
        metaTitle: "API | Byg på jeres OptiPeople-data",
        metaDescription:
          "OptiPeople tilbyder et offentligt REST API, så I kan bygge oven på jeres produktionsdata — OEE, maskiner, stop og mere.",
        eyebrow: "API",
        heroTitle: "Et offentligt REST API til at bygge på jeres data",
        heroBody:
          "Alt det, I ser i OptiPeople, er tilgængeligt programmatisk. Træk OEE, maskiner, stop og telemetri ind i jeres egne apps, dashboards og automatiseringer via et rent, dokumenteret REST API.",
        valueTitle: "Jeres data, på jeres præmisser",
        valueBody:
          "Nogle gange ligger værdien i jeres eget system. OptiPeoples REST API giver udviklere direkte, autentificeret adgang til produktionsdata, så I kan udvide platformen, præcis som forretningen har brug for.",
        capabilitiesTitle: "Klar til udviklere",
        capabilities: [
          {
            title: "Rene REST-endpoints",
            description:
              "Forudsigelige, ressourcebaserede endpoints med JSON-svar for maskiner, OEE, stop, telemetri og mere.",
          },
          {
            title: "Dokumenteret med Swagger",
            description:
              "En interaktiv OpenAPI-reference lader dig udforske og afprøve hvert endpoint, før du skriver en linje kode.",
          },
          {
            title: "Sikker adgang",
            description:
              "Autentificeret, afgrænset adgang, så I bestemmer præcis, hvad hver integration kan læse og gøre.",
          },
        ],
        ctaTitle: "Begynd at bygge på OptiPeople",
        ctaBody: "Udforsk den live API-reference eller tal med os om adgang.",
        primaryCtaLabel: "Tal med os",
        secondaryCtaLabel: "Se API-reference",
        secondaryCtaHref: API_DOCS_HREF,
      },
    },
  },
]

export const aiCapabilitySlugs: AiCapabilitySlug[] = aiCapabilities.map(
  (c) => c.slug
)

/**
 * Maps the AI capabilities to SlideData for the shared SlideCarousel using the
 * "ai" layout — colored card + code-built product mockup.
 */
export function aiStackSlides(locale: Locale): SlideData[] {
  return aiCapabilities.map((cap) => {
    const c = cap.content[locale]
    return {
      title: c.cardTitle,
      description: c.cardSubtitle,
      primaryLabel: c.cardTitle,
      primaryHref: localizeHref(cap.href, locale),
      bgColor: "",
      layout: "ai",
      cardColor: cap.theme.bg,
      textTone: cap.theme.text,
      mockup: cap.slug,
    }
  })
}

export function getAiCapability(
  slug: string
): AiCapability | undefined {
  return aiCapabilities.find((c) => c.slug === slug)
}

export { CONTACT_HREF, API_DOCS_HREF }
