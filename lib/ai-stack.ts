import { addLocalePrefix, type Locale } from "@/lib/i18n"
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
  useCasesTitle: string
  useCases: { title: string; description: string }[]
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
          "Opti Assist gives every team a single, model-agnostic chat — grounded in your production data, documents and company knowledge. Ask about last night's OEE, a recurring stop cause on line 3 or the right changeover procedure, and get an answer with sources — in plain language.",
        valueTitle: "One assistant for the whole company",
        valueBody:
          "Operators, planners and managers shouldn't need a data analyst to get an answer. Most of the knowledge in a factory is spread across dashboards, SOPs, maintenance logs and the heads of a few experienced people. Opti Assist puts it in one place. It connects your documented knowledge with your live operations in Opticloud, so anyone can ask a question, see where the answer came from and act on it — whether they sit in the office or stand at the machine.",
        capabilitiesTitle: "What Opti Assist can do",
        capabilities: [
          {
            title: "Model-agnostic by design",
            description:
              "Switch between the best available models for the task at hand. You're never locked to a single vendor, and new models are available as they ship — without changing how your team works.",
          },
          {
            title: "Grounded in your knowledge",
            description:
              "Attach documents, SOPs and reports, or query company knowledge directly. Answers cite the sources they came from, so you can open the original and check it yourself.",
          },
          {
            title: "Connected to live operations",
            description:
              "Ask about OEE, downtime causes or shift performance and get answers from your real production data in Opticloud — not last week's spreadsheet. The numbers you get are the numbers on the floor.",
          },
          {
            title: "Built for the shopfloor",
            description:
              "An operator can ask why a machine stopped last shift, what the setup sheet says for the next order, or how a fault was fixed last time. Short questions, concrete answers, no query language.",
          },
          {
            title: "Works on your data only",
            description:
              "Opti Assist answers from your own production data — OEE, stop causes, maintenance logs, energy data — and your own documents. Access follows the permissions you set.",
          },
          {
            title: "From answer to action",
            description:
              "A good answer is often the start of a task: draft the shift summary, list the top stop causes for the morning meeting, or hand the result to a workflow or agent that carries it further.",
          },
        ],
        useCasesTitle: "How teams use it",
        useCases: [
          {
            title: "Before the morning meeting",
            description:
              "A team lead asks for yesterday's OEE per line and the top three stop causes. The summary is ready before the board meeting starts — no one spent the morning pulling numbers.",
          },
          {
            title: "At the machine",
            description:
              "An operator hits an unfamiliar fault and asks how it was handled before. Opti Assist finds the relevant entries in the maintenance log and the matching SOP section.",
          },
          {
            title: "For the weekly report",
            description:
              "A plant manager asks for the week's performance against last week — downtime, output, energy per unit. The answer is grounded in live data, with sources to check.",
          },
        ],
        ctaTitle: "Put an AI assistant in every team's hands",
        ctaBody:
          "See how Opti Assist answers questions from your own production data in a short demo — with your machines, your stop causes and your documents.",
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
          "Opti Assist giver alle teams én model-agnostisk chat — forankret i jeres produktionsdata, dokumenter og virksomhedsviden. Spørg til nattens OEE, en tilbagevendende stopårsag på linje 3 eller den rigtige omstillingsprocedure, og få et svar med kilder — i almindeligt sprog.",
        valueTitle: "Én assistent til hele virksomheden",
        valueBody:
          "Operatører, planlæggere og ledere skal ikke bruge en dataanalytiker for at få et svar. Det meste af en fabriks viden ligger spredt i dashboards, SOP'er, vedligeholdslogs og hovedet på nogle få erfarne folk. Når spørgsmålet opstår midt i et skift, er der ikke tid til at lede fire steder. Opti Assist samler det ét sted. Assistenten forbinder jeres dokumenterede viden med jeres live drift i Opticloud, så alle kan stille et spørgsmål, se hvor svaret kommer fra og handle på det — uanset om man sidder på kontoret eller står ved maskinen.",
        capabilitiesTitle: "Det kan Opti Assist",
        capabilities: [
          {
            title: "Model-agnostisk fra bunden",
            description:
              "Skift mellem de bedste tilgængelige modeller til den konkrete opgave. I er aldrig låst til én leverandør, og nye modeller er klar, så snart de udkommer — uden at teamet skal ændre arbejdsgang.",
          },
          {
            title: "Forankret i jeres viden",
            description:
              "Vedhæft dokumenter, SOP'er og rapporter, eller spørg direkte i virksomhedsviden. Svar henviser til kilderne, så I selv kan åbne originalen og tjekke efter.",
          },
          {
            title: "Forbundet til live drift",
            description:
              "Spørg om OEE, stopårsager eller skiftperformance og få svar fra jeres reelle produktionsdata i Opticloud — ikke sidste uges regneark. Tallene i svaret er tallene på gulvet.",
          },
          {
            title: "Bygget til produktionsgulvet",
            description:
              "En operatør kan spørge, hvorfor en maskine stoppede på sidste skift, hvad opstillingsarket siger til næste ordre, eller hvordan en fejl blev løst sidst. Korte spørgsmål, konkrete svar — uden forespørgselssprog.",
          },
          {
            title: "Arbejder kun på jeres data",
            description:
              "Opti Assist svarer ud fra jeres egne produktionsdata — OEE, stopårsager, vedligeholdslogs, energidata — og jeres egne dokumenter. Adgangen følger de rettigheder, I selv har sat.",
          },
          {
            title: "Fra svar til handling",
            description:
              "Et godt svar er ofte starten på en opgave: skriv udkastet til skiftrapporten, list de største stopårsager til morgenmødet, eller giv resultatet videre til et workflow eller en agent.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Før morgenmødet",
            description:
              "En teamleder spørger til gårsdagens OEE pr. linje og de tre største stopårsager. Opsummeringen er klar, før tavlemødet starter — ingen har brugt morgenen på at trække tal.",
          },
          {
            title: "Ved maskinen",
            description:
              "En operatør rammer en ukendt fejl og spørger, hvordan den blev håndteret før. Opti Assist finder de relevante poster i vedligeholdsloggen og det matchende afsnit i SOP'en.",
          },
          {
            title: "Til ugerapporten",
            description:
              "En fabrikschef spørger til ugens performance mod sidste uge — nedetid, output, energi pr. enhed. Svaret bygger på live data, med kilder man kan tjekke.",
          },
        ],
        ctaTitle: "Giv alle teams en AI-assistent i hånden",
        ctaBody:
          "Se hvordan Opti Assist svarer på spørgsmål ud fra jeres egne produktionsdata i en kort demo — med jeres maskiner, jeres stopårsager og jeres dokumenter.",
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
          "Turn production events into action with visual AI workflows. A stop on a line, a finished shift, an incoming document — each can trigger a chain of steps that gathers data, applies AI where it helps and delivers a result. Chain steps, branch on conditions, loop over items — no code required.",
        valueTitle: "From event to action, automatically",
        valueBody:
          "Most operational work is repetitive: a stop happens, a report is needed, a task gets created, someone gets notified. Today those patterns run on habit and memory — which means they run late, or not at all, on a busy shift. Workflows let you wire the pattern once and let it run every time: pull the data from Opticloud, let AI summarize or classify it, and push the result to the people and systems that need it. Your team keeps the judgment calls; the workflow keeps the routine.",
        capabilitiesTitle: "Building blocks for any process",
        capabilities: [
          {
            title: "Visual, no-code canvas",
            description:
              "Drag in nodes for agents, conditions, loops, web search, guardrails and custom code. Connect them on a canvas and you have an automation — readable by the people who own the process, not just developers.",
          },
          {
            title: "Trigger on real events",
            description:
              "Start a workflow from a downtime event, a schedule, a new document or an inbound request. The trigger carries its context — machine, order, shift — so every step downstream knows what it's working on.",
          },
          {
            title: "AI where it adds value",
            description:
              "Summarize a night's stop events, classify a fault description, extract order numbers from a document, or draft a report. Guardrails keep AI output within the bounds you set.",
          },
          {
            title: "Branch, loop and combine",
            description:
              "Route long stops one way and short stops another. Loop over every machine on a line or every order in a batch. Combine data steps, AI steps and notifications in one flow.",
          },
          {
            title: "People in the loop",
            description:
              "Not everything should run unattended. Add approval steps so a person confirms before a task is created or a report is sent — the workflow does the legwork, you keep the sign-off.",
          },
          {
            title: "Connected to your systems",
            description:
              "Workflows read from your live Opticloud data and reach the systems around it through integrations — so the result lands in ERP, email or the tools your team already checks.",
          },
        ],
        useCasesTitle: "How teams use it",
        useCases: [
          {
            title: "The automatic shift report",
            description:
              "At shift end, a workflow pulls OEE, output and stop causes, has AI write a short summary and sends it to the next shift and the team lead. Same structure, every shift, no one typing it up.",
          },
          {
            title: "Downtime follow-up",
            description:
              "A stop runs past its threshold. The workflow classifies the registered cause, creates a maintenance task with the machine's recent history attached and notifies the technician on duty.",
          },
          {
            title: "Catching quiet waste",
            description:
              "A scheduled workflow checks energy data against production: machines drawing power while idle get flagged, and the list lands in the right inbox before the next planning meeting.",
          },
        ],
        ctaTitle: "Automate the work nobody wants to do twice",
        ctaBody:
          "Bring one repetitive task from your operation to a demo — we'll map it as a workflow together.",
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
          "Gør produktionshændelser til handling med visuelle AI-workflows. Et stop på en linje, et afsluttet skift, et indkommende dokument — alt kan udløse en kæde af trin, der henter data, bruger AI hvor det hjælper og leverer et resultat. Kæd trin sammen, forgren på betingelser, loop over emner — uden kode.",
        valueTitle: "Fra hændelse til handling, automatisk",
        valueBody:
          "Meget driftsarbejde er gentaget: et stop sker, en rapport skal laves, en opgave oprettes, nogen skal have besked. I dag kører de mønstre på vane og hukommelse — og på et travlt skift betyder det for sent eller slet ikke. Med workflows sætter I mønstret op én gang og lader det køre hver gang: hent data fra Opticloud, lad AI opsummere eller klassificere, og send resultatet til de mennesker og systemer, der skal bruge det. Teamet beholder beslutningerne; workflowet tager rutinen.",
        capabilitiesTitle: "Byggeklodser til enhver proces",
        capabilities: [
          {
            title: "Visuelt no-code-lærred",
            description:
              "Træk noder ind til agenter, betingelser, loops, websøgning, guardrails og egen kode. Forbind dem på et lærred, og du har en automatisering — til at læse for dem, der ejer processen, ikke kun udviklere.",
          },
          {
            title: "Udløs på reelle hændelser",
            description:
              "Start et workflow ud fra et stop, en tidsplan, et nyt dokument eller en indkommende anmodning. Triggeren bærer sin kontekst — maskine, ordre, skift — så alle efterfølgende trin ved, hvad de arbejder på.",
          },
          {
            title: "AI hvor det skaber værdi",
            description:
              "Opsummér nattens stop, klassificér en fejlbeskrivelse, udtræk ordrenumre fra et dokument, eller skriv udkastet til en rapport. Guardrails holder AI-output inden for de rammer, I sætter.",
          },
          {
            title: "Forgren, loop og kombinér",
            description:
              "Send lange stop én vej og korte stop en anden. Loop over alle maskiner på en linje eller alle ordrer i et batch. Kombinér datatrin, AI-trin og notifikationer i ét flow.",
          },
          {
            title: "Mennesker i loopet",
            description:
              "Ikke alt skal køre uden opsyn. Tilføj godkendelsestrin, så en person bekræfter, før en opgave oprettes eller en rapport sendes — workflowet laver benarbejdet, I beholder underskriften.",
          },
          {
            title: "Forbundet til jeres systemer",
            description:
              "Workflows læser fra jeres live Opticloud-data og når systemerne omkring dem via integrationer — så resultatet lander i ERP, mail eller de værktøjer, teamet allerede kigger i.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Den automatiske skiftrapport",
            description:
              "Ved skiftets afslutning henter et workflow OEE, output og stopårsager, lader AI skrive en kort opsummering og sender den til næste skift og teamlederen. Samme struktur, hvert skift — uden at nogen taster den ind.",
          },
          {
            title: "Opfølgning på nedetid",
            description:
              "Et stop overskrider sin grænse. Workflowet klassificerer den registrerede årsag, opretter en vedligeholdsopgave med maskinens seneste historik vedhæftet og giver teknikeren på vagt besked.",
          },
          {
            title: "Fang det stille spild",
            description:
              "Et planlagt workflow tjekker energidata mod produktionen: maskiner, der trækker strøm i tomgang, bliver markeret, og listen lander i den rigtige indbakke før næste planlægningsmøde.",
          },
        ],
        ctaTitle: "Automatisér det arbejde, ingen vil lave to gange",
        ctaBody:
          "Tag én gentaget opgave fra jeres drift med til en demo — så kortlægger vi den som workflow sammen.",
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
          "Agents are purpose-built assistants that handle a recurring job end to end — searching your sources, reading documents, reasoning over the result and generating the response. You describe the task once; the agent runs it the same way every time it's needed.",
        valueTitle: "Hand off the routine, keep the oversight",
        valueBody:
          "Some tasks come back every day: reviewing offers, comparing specs, drafting the morning summary, checking new fault reports against the maintenance history. They aren't hard — they're just time-consuming, and they compete with the work that actually needs a person. An agent does the legwork the same way every time, shows every step it took, and hands you a result you can check before anything happens with it. The difference from a chat is persistence: you set the task up once, and the agent is ready whenever the job comes back.",
        capabilitiesTitle: "How agents work",
        capabilities: [
          {
            title: "Built for one job, done well",
            description:
              "Give an agent a clear task, the sources it may use and the tools it needs. It runs the same reliable process every time it's triggered — no re-explaining, no drift.",
          },
          {
            title: "Reads and reasons over your data",
            description:
              "Agents search folders, open documents and pull from connected systems before they answer — production data, maintenance logs, specs. The output is grounded in what they actually found.",
          },
          {
            title: "Transparent, step by step",
            description:
              "Every action is visible: what it searched, what it read, what it concluded. When a result looks off, you can trace exactly where it came from. No black box.",
          },
          {
            title: "Triggered the way you need",
            description:
              "Run an agent on a schedule, from a production event, or on demand from a chat. The same agent can serve all three, so the process stays identical however it starts.",
          },
          {
            title: "Tools, not just text",
            description:
              "An agent isn't limited to writing. It can query your Opticloud data, search documents and reach connected systems — so the result reflects the state of your operation, not a guess.",
          },
          {
            title: "Tuned by the people who own the task",
            description:
              "When the output isn't quite right, adjust the agent's instructions and it runs the updated process next time. The team that owns the job shapes the agent that does it.",
          },
        ],
        useCasesTitle: "How teams use it",
        useCases: [
          {
            title: "The morning summary agent",
            description:
              "Every morning it reads the last 24 hours of production data — OEE per line, the biggest stops, orders behind plan — and drafts the summary the team lead used to write by hand.",
          },
          {
            title: "The fault triage agent",
            description:
              "A new fault description comes in. The agent compares it with the machine's maintenance history, finds the most similar earlier cases and suggests the likely cause and what fixed it last time.",
          },
          {
            title: "The document review agent",
            description:
              "Supplier offers and specs arrive in different formats. The agent reads each one against your requirements and returns the same structured comparison every time — ready for a person to decide.",
          },
        ],
        ctaTitle: "Give your recurring work to an agent",
        ctaBody:
          "Tell us about one task that comes back every week — we'll show you what the agent for it looks like in a demo.",
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
          "Agenter er formålsbyggede assistenter, der løser en tilbagevendende opgave fra ende til anden — søger i jeres kilder, læser dokumenter, ræsonnerer over resultatet og genererer svaret. I beskriver opgaven én gang; agenten løser den på samme måde, hver gang der er brug for det.",
        valueTitle: "Giv rutinen videre, behold overblikket",
        valueBody:
          "Nogle opgaver kommer igen hver dag: gennemgå tilbud, sammenlign specs, skriv morgenens opsummering, hold nye fejlmeldinger op mod vedligeholdshistorikken. De er ikke svære — de tager bare tid, og de konkurrerer med det arbejde, der faktisk kræver et menneske. En agent laver benarbejdet på samme måde hver gang, viser hvert trin den tog, og giver jer et resultat, I kan tjekke, før der sker noget med det. Forskellen fra en chat er vedholdenhed: I sætter opgaven op én gang, og agenten står klar, hver gang den kommer igen.",
        capabilitiesTitle: "Sådan arbejder agenter",
        capabilities: [
          {
            title: "Bygget til én opgave, løst godt",
            description:
              "Giv agenten en klar opgave, de kilder den må bruge og de værktøjer den skal have. Den kører den samme pålidelige proces, hver gang den udløses — uden genforklaring, uden skred.",
          },
          {
            title: "Læser og ræsonnerer over jeres data",
            description:
              "Agenter søger i mapper, åbner dokumenter og henter fra forbundne systemer, før de svarer — produktionsdata, vedligeholdslogs, specs. Output er forankret i det, de faktisk fandt.",
          },
          {
            title: "Gennemsigtig, trin for trin",
            description:
              "Hver handling er synlig: hvad den søgte, hvad den læste, hvad den konkluderede. Ser et resultat forkert ud, kan I spore præcis, hvor det kom fra. Ingen black box.",
          },
          {
            title: "Udløses som I har brug for",
            description:
              "Kør en agent på en tidsplan, fra en produktionshændelse eller på forespørgsel fra en chat. Samme agent kan bruges alle tre steder, så processen er identisk, uanset hvordan den starter.",
          },
          {
            title: "Værktøjer, ikke kun tekst",
            description:
              "En agent er ikke begrænset til at skrive. Den kan slå op i jeres Opticloud-data, søge i dokumenter og nå forbundne systemer — så resultatet afspejler driftens faktiske tilstand, ikke et gæt.",
          },
          {
            title: "Justeres af dem, der ejer opgaven",
            description:
              "Rammer output ikke helt rigtigt, justerer I agentens instruktioner, og den kører den opdaterede proces næste gang. Teamet, der ejer opgaven, former agenten, der løser den.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Morgenopsummerings-agenten",
            description:
              "Hver morgen læser den det seneste døgns produktionsdata — OEE pr. linje, de største stop, ordrer bag plan — og skriver udkastet til den opsummering, teamlederen før lavede i hånden.",
          },
          {
            title: "Fejl-triage-agenten",
            description:
              "En ny fejlbeskrivelse kommer ind. Agenten holder den op mod maskinens vedligeholdshistorik, finder de mest lignende tidligere sager og foreslår den sandsynlige årsag — og hvad der løste den sidst.",
          },
          {
            title: "Dokumentgennemgangs-agenten",
            description:
              "Leverandørtilbud og specs kommer i forskellige formater. Agenten læser hvert dokument op mod jeres krav og leverer den samme strukturerede sammenligning hver gang — klar til, at et menneske beslutter.",
          },
        ],
        ctaTitle: "Giv dit tilbagevendende arbejde til en agent",
        ctaBody:
          "Fortæl os om én opgave, der kommer igen hver uge — så viser vi jer, hvordan agenten til den ser ud, i en demo.",
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
          "OptiPeople integrates with the major ERP systems — SAP, Microsoft Dynamics, Business Central and more — plus MQTT, OPC-UA and a REST API for everything else.",
        eyebrow: "Integrations",
        heroTitle: "Connects with the systems you already run",
        heroBody:
          "OptiPeople plugs into the big ERP systems, speaks the machine protocols on your floor — MQTT and OPC-UA — and offers a REST API for everything else. Production data, orders and documents flow between systems without manual re-keying.",
        valueTitle: "Your AI is only as good as its connections",
        valueBody:
          "An assistant that can't see your ERP is just a chatbot, and a dashboard that can't hear your machines is just a picture. Real operational AI needs both ends connected: the business systems that hold orders, items and plans, and the machines that produce them. We connect to the systems of record in your back office and to the PLCs and sensors on your floor, so Opticloud — and every AI capability built on it — works from the same data your business already trusts. One integration, maintained once, feeding everything.",
        capabilitiesTitle: "Built to fit your stack",
        capabilities: [
          {
            title: "Major ERP systems",
            description:
              "Connect to SAP, Microsoft Dynamics 365, Business Central, Navision and other ERP systems your operation depends on. Orders and master data flow in; progress and results flow back.",
          },
          {
            title: "Machine data over MQTT",
            description:
              "Send machine states, part counters and telemetry to Opticloud over MQTT with a documented JSON schema. Signals from PLCs and sensors land as structured events, timestamped and tied to the right machine.",
          },
          {
            title: "OPC-UA on the floor",
            description:
              "Read directly from OPC-UA servers on modern machines and lines — no custom adapters, no ripping out what already works.",
          },
          {
            title: "A REST API for the rest",
            description:
              "Anything without a standard connector can integrate through the REST API — pull production data out or push data in, in plain JSON.",
          },
          {
            title: "The tools around them",
            description:
              "Sync documents, spreadsheets, email and collaboration tools so context follows the work — and so AI answers can draw on the same material your team reads.",
          },
          {
            title: "Two-way by design",
            description:
              "Read live data in and write actions back — create orders, update tasks and post results where your teams already look. Integration isn't just import.",
          },
        ],
        useCasesTitle: "How teams use it",
        useCases: [
          {
            title: "Orders from ERP, results back",
            description:
              "Production orders flow from the ERP into Opticloud, operators run them on the floor, and progress and quantities are reported back — nobody re-keys an order number twice.",
          },
          {
            title: "Machines onto the platform",
            description:
              "PLCs and sensors publish states, counters and telemetry over MQTT or OPC-UA. Within the same data model, a stop on a press and a stop on a packing line mean the same thing.",
          },
          {
            title: "Data into your BI",
            description:
              "OEE, shift and stop-cause data flows on to Power BI and other reporting tools through the API — so the numbers in the boardroom match the numbers on the floor.",
          },
        ],
        ctaTitle: "Connect OptiPeople to your ERP",
        ctaBody:
          "Tell us which systems you run — ERP, machines, tools — and we'll map the integration in a demo.",
        primaryCtaLabel: "Book a demo",
      },
      da: {
        cardTitle: "Integrationer",
        cardSubtitle: "Forbinder med de ERP-systemer, I allerede kører.",
        metaTitle: "Integrationer | Forbind jeres ERP og værktøjer",
        metaDescription:
          "OptiPeople integrerer med de store ERP-systemer — SAP, Microsoft Dynamics, Business Central med flere — samt MQTT, OPC-UA og et REST API til resten.",
        eyebrow: "Integrationer",
        heroTitle: "Forbinder med de systemer, I allerede kører",
        heroBody:
          "OptiPeople kobler sig på de store ERP-systemer, taler maskinprotokollerne på jeres gulv — MQTT og OPC-UA — og tilbyder et REST API til alt det øvrige. Produktionsdata, ordrer og dokumenter flyder mellem systemerne uden manuel indtastning.",
        valueTitle: "Din AI er kun så god som dens forbindelser",
        valueBody:
          "En assistent, der ikke kan se jeres ERP, er bare en chatbot — og et dashboard, der ikke kan høre jeres maskiner, er bare et billede. Reel drifts-AI kræver, at begge ender er forbundet: forretningssystemerne med ordrer, varer og planer, og maskinerne der producerer dem. Vi forbinder til systemerne i backoffice og til PLC'er og sensorer på gulvet, så Opticloud — og hver AI-funktion bygget ovenpå — arbejder ud fra de samme data, som forretningen allerede stoler på. Ingen dobbeltindtastning, ingen kopier der driver fra hinanden. Én integration, vedligeholdt ét sted, der føder det hele.",
        capabilitiesTitle: "Bygget til at passe ind i jeres stak",
        capabilities: [
          {
            title: "Store ERP-systemer",
            description:
              "Forbind til SAP, Microsoft Dynamics 365, Business Central, Navision og andre ERP-systemer, jeres drift afhænger af. Ordrer og stamdata flyder ind; fremdrift og resultater flyder tilbage.",
          },
          {
            title: "Maskindata over MQTT",
            description:
              "Send maskinstatus, emnetællere og telemetri til Opticloud over MQTT med et dokumenteret JSON-skema. Signaler fra PLC'er og sensorer lander som strukturerede hændelser med tidsstempel, knyttet til den rigtige maskine.",
          },
          {
            title: "OPC-UA på gulvet",
            description:
              "Læs direkte fra OPC-UA-servere på moderne maskiner og linjer — uden specialadaptere og uden at rive ud, hvad der allerede virker.",
          },
          {
            title: "Et REST API til resten",
            description:
              "Alt uden en standardkonnektor kan integreres via REST API'et — træk produktionsdata ud eller send data ind, i almindelig JSON.",
          },
          {
            title: "Værktøjerne omkring dem",
            description:
              "Synkronisér dokumenter, regneark, mail og samarbejdsværktøjer, så konteksten følger arbejdet — og så AI-svar kan trække på det samme materiale, som teamet læser.",
          },
          {
            title: "Tovejs fra bunden",
            description:
              "Læs live data ind og skriv handlinger tilbage — opret ordrer, opdatér opgaver og post resultater dér, hvor jeres teams allerede kigger. Integration er ikke kun import.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Ordrer fra ERP, resultater tilbage",
            description:
              "Produktionsordrer flyder fra ERP ind i Opticloud, operatørerne kører dem på gulvet, og fremdrift og mængder rapporteres tilbage — ingen taster et ordrenummer to gange.",
          },
          {
            title: "Maskinerne på platformen",
            description:
              "PLC'er og sensorer sender status, tællere og telemetri over MQTT eller OPC-UA. I samme datamodel betyder et stop på en presse og et stop på en pakkelinje det samme.",
          },
          {
            title: "Data ind i jeres BI",
            description:
              "OEE-, skift- og stopårsagsdata flyder videre til Power BI og andre rapporteringsværktøjer via API'et — så tallene i mødelokalet matcher tallene på gulvet.",
          },
        ],
        ctaTitle: "Forbind OptiPeople til jeres ERP",
        ctaBody:
          "Fortæl os hvilke systemer I kører — ERP, maskiner, værktøjer — så kortlægger vi integrationen i en demo.",
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
          "OptiPeople offers a public REST API so you can build on top of your production data — OEE, machines, stops, shifts and telemetry, in plain JSON.",
        eyebrow: "API",
        heroTitle: "A public REST API to build on your data",
        heroBody:
          "Everything you see in Opticloud is available programmatically. Pull OEE, machines, stops, shifts and telemetry into your own apps, dashboards and automations with a documented REST API — plain JSON over HTTPS, authenticated with an access key you create in the portal.",
        valueTitle: "Your data, on your terms",
        valueBody:
          "Sometimes the value is in your own system: a BI model your controllers maintain, a shopfloor screen your operators watch, an internal app your IT team owns. The Opticloud REST API gives developers direct, authenticated access to production data, so you can extend the platform however your business needs. The data flows both ways — export what Opticloud has collected, or send machine states, part counters and telemetry in from your own systems over MQTT with a documented JSON schema. No black-box lock-in: the data is yours, and the API proves it.",
        capabilitiesTitle: "Developer-ready",
        capabilities: [
          {
            title: "Clean REST endpoints",
            description:
              "Predictable, resource-based endpoints with JSON responses for machines, OEE, stops, telemetry and more. Test a connection directly in the browser — if the endpoint returns JSON, you're connected.",
          },
          {
            title: "Documented with Swagger",
            description:
              "An interactive OpenAPI reference lets you explore and try every endpoint before you write a line of code. What you see in the reference is what the API returns.",
          },
          {
            title: "Secure, scoped access",
            description:
              "Access keys are created and managed in the portal, and every request is authenticated over HTTPS. You decide exactly what each integration can read and do.",
          },
          {
            title: "Efficiency data, ready to export",
            description:
              "The main data export covers availability, performance, quality, units, shifts and stop causes — the numbers behind your OEE — structured for reporting and BI tools like Power BI.",
          },
          {
            title: "Filter to what you need",
            description:
              "Query parameters like machineId, from and to limit a response to one machine or one time window — pull a single line's night shift instead of the whole plant's history.",
          },
          {
            title: "Send data in over MQTT",
            description:
              "The platform also accepts data: machine states, part counters and telemetry are ingested over MQTT using a documented JSON schema, with UTC timestamps and per-device IDs.",
          },
        ],
        useCasesTitle: "How teams use it",
        useCases: [
          {
            title: "Reporting in Power BI",
            description:
              "Controllers pull shift, OEE and stop-cause data into their own BI models on a schedule. The factory's numbers land in the same reports as the rest of the business.",
          },
          {
            title: "Your own screens and apps",
            description:
              "IT builds a shopfloor display or an internal app on live production data — the API serves the same numbers Opticloud shows, so the two never disagree.",
          },
          {
            title: "Feeding data in",
            description:
              "A line with its own control system publishes states and counters over MQTT. The data lands in Opticloud alongside everything else, in the same structure.",
          },
        ],
        ctaTitle: "Start building on OptiPeople",
        ctaBody:
          "Explore the live API reference, or talk to us about access keys and what your first integration could look like.",
        primaryCtaLabel: "Talk to us",
        secondaryCtaLabel: "View API reference",
        secondaryCtaHref: API_DOCS_HREF,
      },
      da: {
        cardTitle: "API",
        cardSubtitle: "Et offentligt REST API til at bygge på jeres data.",
        metaTitle: "API | Byg på jeres OptiPeople-data",
        metaDescription:
          "OptiPeople tilbyder et offentligt REST API, så I kan bygge oven på jeres produktionsdata — OEE, maskiner, stop, skift og telemetri, i ren JSON.",
        eyebrow: "API",
        heroTitle: "Et offentligt REST API til at bygge på jeres data",
        heroBody:
          "Alt det, I ser i Opticloud, er tilgængeligt programmatisk. Træk OEE, maskiner, stop, skift og telemetri ind i jeres egne apps, dashboards og automatiseringer via et dokumenteret REST API — ren JSON over HTTPS, autentificeret med en adgangsnøgle, I selv opretter i portalen.",
        valueTitle: "Jeres data, på jeres præmisser",
        valueBody:
          "Nogle gange ligger værdien i jeres eget system: en BI-model, controllerne vedligeholder, en skærm på gulvet, operatørerne kigger på, en intern app, IT ejer. Opticlouds REST API giver udviklere direkte, autentificeret adgang til produktionsdata, så I kan udvide platformen, præcis som forretningen har brug for. Data flyder begge veje — eksportér det, Opticloud har opsamlet, eller send maskinstatus, emnetællere og telemetri ind fra jeres egne systemer over MQTT med et dokumenteret JSON-skema. Kom i gang med en konto i portalen, en maskine, en enhed og en adgangsnøgle. Ingen black-box-lock-in: data er jeres, og API'et beviser det.",
        capabilitiesTitle: "Klar til udviklere",
        capabilities: [
          {
            title: "Rene REST-endpoints",
            description:
              "Forudsigelige, ressourcebaserede endpoints med JSON-svar for maskiner, OEE, stop, telemetri og mere. Test en forbindelse direkte i browseren — returnerer endpointet JSON, er forbindelsen på plads.",
          },
          {
            title: "Dokumenteret med Swagger",
            description:
              "En interaktiv OpenAPI-reference lader dig udforske og afprøve hvert endpoint, før du skriver en linje kode. Det, du ser i referencen, er det, API'et returnerer.",
          },
          {
            title: "Sikker, afgrænset adgang",
            description:
              "Adgangsnøgler oprettes og styres i portalen, og hver forespørgsel autentificeres over HTTPS. I bestemmer præcis, hvad hver integration kan læse og gøre.",
          },
          {
            title: "Effektivitetsdata, klar til eksport",
            description:
              "Hovedeksporten dækker availability, performance, quality, enheder, skift og stopårsager — tallene bag jeres OEE — struktureret til rapportering og BI-værktøjer som Power BI.",
          },
          {
            title: "Filtrér til det, I skal bruge",
            description:
              "Parametre som machineId, from og to afgrænser et svar til én maskine eller ét tidsrum — hent én linjes nattevagt i stedet for hele fabrikkens historik.",
          },
          {
            title: "Send data ind over MQTT",
            description:
              "Platformen tager også imod data: maskinstatus, emnetællere og telemetri sendes ind over MQTT med et dokumenteret JSON-skema, med UTC-tidsstempler og id pr. enhed.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Rapportering i Power BI",
            description:
              "Controllerne trækker skift-, OEE- og stopårsagsdata ind i deres egne BI-modeller efter en fast plan. Fabrikkens tal lander i de samme rapporter som resten af forretningen.",
          },
          {
            title: "Jeres egne skærme og apps",
            description:
              "IT bygger en skærm til gulvet eller en intern app på live produktionsdata — API'et serverer de samme tal, som Opticloud viser, så de to aldrig er uenige.",
          },
          {
            title: "Data den anden vej",
            description:
              "En linje med eget styresystem sender status og tællere over MQTT. Data lander i Opticloud sammen med alt det andet, i samme struktur.",
          },
        ],
        ctaTitle: "Begynd at bygge på OptiPeople",
        ctaBody:
          "Udforsk den live API-reference, eller tal med os om adgangsnøgler, og hvordan jeres første integration kunne se ud.",
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
      primaryHref: addLocalePrefix(cap.href, locale),
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
