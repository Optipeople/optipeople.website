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
    title: "Den AI, jeres drift har brug for.",
    subtitle:
      "Nem at bruge for alle. Stærk nok til det svære i produktionen.",
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
          "Opti Assist is a model-agnostic AI chat for your whole team, grounded in your production data, documents and company knowledge.",
        eyebrow: "Chat · Opti Assist",
        heroTitle: "AI chat for everyone in your operation",
        heroBody:
          "Opti Assist gives every team a single, model-agnostic chat, grounded in your production data, documents and company knowledge. Ask about last night's OEE, a recurring stop cause on line 3 or the right changeover procedure, and get an answer with sources, in plain language.",
        valueTitle: "One assistant for the whole company",
        valueBody:
          "Operators, planners and managers shouldn't need a data analyst to get an answer. Most of the knowledge in a factory is spread across dashboards, SOPs, maintenance logs and the heads of a few experienced people. Opti Assist puts it in one place. It connects your documented knowledge with your live operations in the OptiPeople Data Platform, so anyone can ask a question, see where the answer came from and act on it, whether they sit in the office or stand at the machine.",
        capabilitiesTitle: "What Opti Assist can do",
        capabilities: [
          {
            title: "Model-agnostic by design",
            description:
              "Switch between the best available models for the task at hand. You're never locked to a single vendor, and new models are available as they ship, without changing how your team works.",
          },
          {
            title: "Grounded in your knowledge",
            description:
              "Attach documents, SOPs and reports, or query company knowledge directly. Answers cite the sources they came from, so you can open the original and check it yourself.",
          },
          {
            title: "Connected to live operations",
            description:
              "Ask about OEE, downtime causes or shift performance and get answers from your real production data in the platform, not last week's spreadsheet. The numbers you get are the numbers on the floor.",
          },
          {
            title: "Built for the shopfloor",
            description:
              "An operator can ask why a machine stopped last shift, what the setup sheet says for the next order, or how a fault was fixed last time. Short questions, concrete answers, no query language.",
          },
          {
            title: "Works on your data only",
            description:
              "Opti Assist answers from your own production data, OEE, stop causes, maintenance logs, energy data, and your own documents. Access follows the permissions you set.",
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
              "A team lead asks for yesterday's OEE per line and the top three stop causes. The summary is ready before the board meeting starts. No one spent the morning pulling numbers.",
          },
          {
            title: "At the machine",
            description:
              "An operator hits an unfamiliar fault and asks how it was handled before. Opti Assist finds the relevant entries in the maintenance log and the matching SOP section.",
          },
          {
            title: "For the weekly report",
            description:
              "A plant manager asks for the week's performance against last week, downtime, output, energy per unit. The answer is grounded in live data, with sources to check.",
          },
        ],
        ctaTitle: "Put an AI assistant in every team's hands",
        ctaBody:
          "See how Opti Assist answers questions from your own production data in a short demo, with your machines, your stop causes and your documents.",
        primaryCtaLabel: "Book a demo",
      },
      da: {
        cardTitle: "Chat",
        cardSubtitle: "En AI-assistent til alle i virksomheden.",
        metaTitle: "Opti Assist | AI-chat til din drift",
        metaDescription:
          "Opti Assist er en AI-chat til hele teamet. Den svarer ud fra jeres egne produktionsdata, jeres dokumenter og det, virksomheden ved i forvejen.",
        eyebrow: "Chat · Opti Assist",
        heroTitle: "En AI-chat, alle i driften kan bruge",
        heroBody:
          "Opti Assist er én chat til hele huset. Den svarer ud fra jeres egne produktionsdata, jeres dokumenter og det, I selv har skrevet ned. Spørg om nattens OEE, om den stopårsag, der bliver ved med at komme igen på linje 3, eller om hvordan omstillingen skal laves. Du får svaret i almindeligt sprog, og du kan se, hvor det kommer fra.",
        valueTitle: "Én assistent til hele virksomheden",
        valueBody:
          "Ingen skal have en dataanalytiker ved siden af sig for at få et svar. Det meste af det, en fabrik ved, ligger spredt: i dashboards, i arbejdsbeskrivelser, i vedligeholdsloggen og i hovedet på et par erfarne kolleger. Når spørgsmålet kommer midt i et skift, er der ikke tid til at lede fire steder. Opti Assist samler det ét sted. Den kobler det, I har skrevet ned, sammen med det, der sker i OptiPeople Data Platform lige nu. Så kan alle spørge, se hvor svaret kommer fra og handle på det. Også dem, der står ude ved maskinen.",
        capabilitiesTitle: "Det kan Opti Assist",
        capabilities: [
          {
            title: "I vælger selv AI-modellen",
            description:
              "Skift til den model, der er bedst til opgaven. I er ikke bundet til én leverandør, og nye modeller kan tages i brug, så snart de er der, uden at teamet skal lave noget om.",
          },
          {
            title: "Svar ud fra det, I ved",
            description:
              "Vedhæft dokumenter, arbejdsbeskrivelser og rapporter, eller spørg direkte ind i det, virksomheden har liggende. Svaret siger, hvor det kommer fra, så I selv kan åbne originalen og tjekke efter.",
          },
          {
            title: "Tallene er dem fra i dag",
            description:
              "Spørg om OEE, stopårsager eller hvordan skiftet gik, og få svar fra de data, der ligger i platformen lige nu. Ikke fra sidste uges regneark. Tallene i svaret er tallene på gulvet.",
          },
          {
            title: "Lavet til gulvet",
            description:
              "En operatør kan spørge, hvorfor maskinen stoppede i går, hvad opstillingsarket siger til næste ordre, eller hvordan fejlen blev løst sidst. Korte spørgsmål, konkrete svar. Man skal ikke kunne kode for at spørge.",
          },
          {
            title: "Kun jeres egne data",
            description:
              "Opti Assist svarer ud fra det, I selv har: OEE, stopårsager, vedligeholdslogs, energital og jeres egne dokumenter. Hvem der kan se hvad, følger de rettigheder, I selv sætter.",
          },
          {
            title: "Fra svar til noget, der sker",
            description:
              "Et godt svar er tit starten på en opgave. Lad den skrive udkastet til skiftrapporten, samle de største stopårsager til morgenmødet eller sende resultatet videre til et workflow eller en agent.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Før morgenmødet",
            description:
              "En teamleder spørger om OEE pr. linje i går og de tre største stopårsager. Overblikket er klar, før tavlemødet går i gang, og ingen har brugt morgenen på at trække tal.",
          },
          {
            title: "Ude ved maskinen",
            description:
              "En operatør står med en fejl, hun ikke har set før, og spørger, hvordan den blev klaret sidst. Opti Assist finder de rigtige poster i vedligeholdsloggen og det afsnit i arbejdsbeskrivelsen, der handler om det.",
          },
          {
            title: "Til ugerapporten",
            description:
              "En fabrikschef spørger, hvordan ugen gik i forhold til sidste uge: nedetid, produceret antal og energi pr. enhed. Svaret bygger på data fra i dag, og kilderne kan tjekkes.",
          },
        ],
        ctaTitle: "Giv hele teamet en AI-assistent",
        ctaBody:
          "Se på en kort demo, hvordan Opti Assist svarer på spørgsmål om jeres egen produktion, med jeres maskiner, jeres stopårsager og jeres dokumenter.",
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
          "Build AI-powered automations that turn production events into actions, no code required. Part of Opti Assist.",
        eyebrow: "Workflows",
        heroTitle: "Build powerful AI automations",
        heroBody:
          "Turn production events into action with visual AI workflows. A stop on a line, a finished shift, an incoming document: each can trigger a chain of steps that gathers data, applies AI where it helps and delivers a result. Chain steps, branch on conditions, loop over items, no code required.",
        valueTitle: "From event to action, automatically",
        valueBody:
          "Most operational work is repetitive: a stop happens, a report is needed, a task gets created, someone gets notified. Today those patterns run on habit and memory, which means they run late, or not at all, on a busy shift. Workflows let you wire the pattern once and let it run every time: pull the data from the OptiPeople Data Platform, let AI summarize or classify it, and push the result to the people and systems that need it. Your team keeps the judgment calls; the workflow keeps the routine.",
        capabilitiesTitle: "Building blocks for any process",
        capabilities: [
          {
            title: "Visual, no-code canvas",
            description:
              "Drag in nodes for agents, conditions, loops, web search, guardrails and custom code. Connect them on a canvas and you have an automation, readable by the people who own the process, not just developers.",
          },
          {
            title: "Trigger on real events",
            description:
              "Start a workflow from a downtime event, a schedule, a new document or an inbound request. The trigger carries its context, machine, order, shift, so every step downstream knows what it's working on.",
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
              "Not everything should run unattended. Add approval steps so a person confirms before a task is created or a report is sent. The workflow does the legwork, you keep the sign-off.",
          },
          {
            title: "Connected to your systems",
            description:
              "Workflows read from your live platform data and reach the systems around it through integrations, so the result lands in ERP, email or the tools your team already checks.",
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
          "Bring one repetitive task from your operation to a demo. We'll map it as a workflow together.",
        primaryCtaLabel: "Book a demo",
      },
      da: {
        cardTitle: "Workflows",
        cardSubtitle: "Lad de faste opgaver køre af sig selv.",
        metaTitle: "AI-workflows | Sæt rutinerne på autopilot",
        metaDescription:
          "Byg automatiseringer, der går i gang af sig selv, når der sker noget i produktionen. Et stop på en linje. Et skift, der slutter. Et dokument, der lander. Uden kode. En del af Opti Assist.",
        eyebrow: "Workflows",
        heroTitle: "Lad rutinerne køre af sig selv",
        heroBody:
          "Når der sker noget i produktionen, kan et workflow gå i gang af sig selv. En linje står stille, et skift slutter, et dokument lander i indbakken. Så henter workflowet de tal, der skal bruges, lader AI klare det, den er god til, og sender resultatet videre til dem, der skal handle på det. I sætter trinnene sammen på en skærm og trækker linjer imellem dem. Der skal ikke skrives kode.",
        valueTitle: "Det, I gør hver dag, kan køre af sig selv",
        valueBody:
          "Meget af arbejdet i en drift gentager sig. En maskine stopper, en rapport skal skrives, en opgave skal oprettes, og nogen skal have besked. I dag kører det på vaner og hukommelse, og på et travlt skift betyder det for sent eller slet ikke. Med et workflow sætter I fremgangsmåden op én gang, og så sker den hver gang: tallene hentes i OptiPeople Data Platform, AI skriver sammendraget eller sætter stoppet i den rigtige kasse, og resultatet ryger videre til de folk og systemer, der skal bruge det. Beslutningerne bliver hos jer. Rutinen tager workflowet.",
        capabilitiesTitle: "Byggeklodserne, I sætter sammen",
        capabilities: [
          {
            title: "Byg det på en skærm, ikke i kode",
            description:
              "Træk de trin ind, I har brug for: AI, betingelser, gentagelser, opslag på nettet, kontroller og jeres egen kode, hvis I vil. Sæt dem sammen med linjer imellem. Resultatet kan læses af dem, der kender processen, ikke kun af udviklere.",
          },
          {
            title: "Starter, når der faktisk sker noget",
            description:
              "Et workflow kan gå i gang på et stop, på et fast tidspunkt, på et nyt dokument eller på en forespørgsel fra en kollega. Starten tager det med, det handler om: hvilken maskine, hvilken ordre, hvilket skift. Så ved alle de næste trin, hvad de arbejder på.",
          },
          {
            title: "AI, hvor det gør en forskel",
            description:
              "Saml nattens stop i et kort sammendrag. Sæt en fejlbeskrivelse i den rigtige kategori. Find ordrenumrene i et dokument. Skriv første udkast til rapporten. I sætter selv rammerne for, hvad AI må svare.",
          },
          {
            title: "Del op, gentag, sæt sammen",
            description:
              "Send de lange stop den ene vej og de korte den anden. Kør det samme trin igennem alle maskiner på en linje eller alle ordrer i en serie. Bland dataopslag, AI og beskeder i det samme flow.",
          },
          {
            title: "Et menneske siger god for det",
            description:
              "Alt skal ikke køre uden opsyn. Sæt et godkendelsestrin ind, så en person siger ja, før opgaven bliver oprettet eller rapporten sendt. Workflowet laver det tunge arbejde. Underskriften er jeres.",
          },
          {
            title: "Hænger sammen med jeres systemer",
            description:
              "Et workflow læser jeres tal i platformen og kan nå de andre systemer gennem integrationer. Så lander resultatet i ERP'et, i mailen eller i det værktøj, teamet alligevel sidder i.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Skiftrapporten skriver sig selv",
            description:
              "Når skiftet slutter, henter workflowet OEE, produceret antal og stopårsager. AI skriver et kort sammendrag, og det ryger videre til næste skift og til teamlederen. Samme opsætning hvert skift, uden at nogen taster den ind.",
          },
          {
            title: "Der bliver fulgt op på nedetiden",
            description:
              "Et stop trækker ud og bryder grænsen. Workflowet sætter årsagen i den rigtige kategori, opretter en opgave til vedligehold med maskinens seneste historik og giver teknikeren på vagt besked.",
          },
          {
            title: "Strømmen, der løber, mens intet kører",
            description:
              "Hver nat holder et workflow energitallene op mod produktionen. De maskiner, der trækker strøm uden at lave noget, kommer på en liste, og listen ligger i den rigtige indbakke før næste planlægningsmøde.",
          },
        ],
        ctaTitle: "Automatiser det, ingen har lyst til at lave to gange",
        ctaBody:
          "Tag en opgave med, som I laver om og om igen. Så bygger vi den som workflow sammen på en demo.",
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
          "Build custom AI agents that handle recurring operational tasks, searching, reading, reasoning and acting on your data. Part of Opti Assist.",
        eyebrow: "Agents",
        heroTitle: "Custom AI for recurring tasks",
        heroBody:
          "Agents are purpose-built assistants that handle a recurring job end to end, searching your sources, reading documents, reasoning over the result and generating the response. You describe the task once; the agent runs it the same way every time it's needed.",
        valueTitle: "Hand off the routine, keep the oversight",
        valueBody:
          "Some tasks come back every day: reviewing offers, comparing specs, drafting the morning summary, checking new fault reports against the maintenance history. They aren't hard. They're just time-consuming, and they compete with the work that actually needs a person. An agent does the legwork the same way every time, shows every step it took, and hands you a result you can check before anything happens with it. The difference from a chat is persistence: you set the task up once, and the agent is ready whenever the job comes back.",
        capabilitiesTitle: "How agents work",
        capabilities: [
          {
            title: "Built for one job, done well",
            description:
              "Give an agent a clear task, the sources it may use and the tools it needs. It runs the same reliable process every time it's triggered, no re-explaining, no drift.",
          },
          {
            title: "Reads and reasons over your data",
            description:
              "Agents search folders, open documents and pull from connected systems before they answer, production data, maintenance logs, specs. The output is grounded in what they actually found.",
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
              "An agent isn't limited to writing. It can query your platform data, search documents and reach connected systems, so the result reflects the state of your operation, not a guess.",
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
              "Every morning it reads the last 24 hours of production data, OEE per line, the biggest stops, orders behind plan, and drafts the summary the team lead used to write by hand.",
          },
          {
            title: "The fault triage agent",
            description:
              "A new fault description comes in. The agent compares it with the machine's maintenance history, finds the most similar earlier cases and suggests the likely cause and what fixed it last time.",
          },
          {
            title: "The document review agent",
            description:
              "Supplier offers and specs arrive in different formats. The agent reads each one against your requirements and returns the same structured comparison every time, ready for a person to decide.",
          },
        ],
        ctaTitle: "Give your recurring work to an agent",
        ctaBody:
          "Tell us about one task that comes back every week. We'll show you what the agent for it looks like in a demo.",
        primaryCtaLabel: "Book a demo",
      },
      da: {
        cardTitle: "Agents",
        cardSubtitle: "AI, der tager de opgaver, som kommer igen.",
        metaTitle: "AI-agenter | AI, der tager de opgaver, som kommer igen",
        metaDescription:
          "Byg AI-agenter, der klarer de opgaver, som kommer igen i driften. De finder frem til det, de skal vide, læser dokumenterne, tænker sig om og leverer et resultat. En del af Opti Assist.",
        eyebrow: "Agents",
        heroTitle: "AI, der tager de opgaver, som kommer igen",
        heroBody:
          "En agent er sat op til én opgave og løser den hele vejen igennem. Den søger i jeres kilder, læser dokumenterne, holder det op mod hinanden og skriver svaret. I forklarer opgaven én gang. Så gør agenten det på samme måde, hver gang der er brug for det.",
        valueTitle: "Giv rutinen videre, behold overblikket",
        valueBody:
          "Nogle opgaver kommer igen hver dag. Tilbud skal læses igennem, specifikationer skal holdes op mod hinanden, morgenens overblik skal skrives, og en ny fejlmelding skal ses i lyset af, hvad der før er sket på maskinen. Det er ikke svært. Det tager bare tid, og den tid går fra det arbejde, der virkelig kræver et menneske. En agent laver det tunge arbejde på samme måde hver gang, viser hvert skridt, den har taget, og lægger resultatet frem, så I kan se det efter, før der sker mere. Forskellen fra en chat er, at agenten bliver stående: I sætter opgaven op én gang, og så er den klar, hver gang opgaven kommer igen.",
        capabilitiesTitle: "Sådan arbejder en agent",
        capabilities: [
          {
            title: "Én opgave, gjort ordentligt",
            description:
              "Giv agenten en klar opgave, de kilder den må bruge, og de værktøjer, den skal have. Så kører den den samme fremgangsmåde hver gang. Ingen skal forklare den opgaven forfra, og den finder ikke selv på noget undervejs.",
          },
          {
            title: "Læser jeres data, før den svarer",
            description:
              "Agenten leder i mapperne, åbner dokumenterne og henter det, den mangler, i de systemer, den er koblet på: produktionsdata, vedligeholdslogs, specifikationer. Svaret bygger på det, den faktisk fandt.",
          },
          {
            title: "I kan se hvert skridt",
            description:
              "Alt, agenten gør, er synligt: hvad den søgte efter, hvad den læste, og hvad den kom frem til. Ser resultatet skævt ud, kan I følge det tilbage til, hvor det kom fra. Ingen sort boks.",
          },
          {
            title: "Starter, når det passer jer",
            description:
              "Kør agenten på et fast tidspunkt, når noget sker i produktionen, eller når en kollega beder om det i chatten. Det er den samme agent alle tre steder, så opgaven bliver løst ens, uanset hvordan den starter.",
          },
          {
            title: "Den kan mere end at skrive",
            description:
              "En agent kan slå op i jeres tal i platformen, søge i dokumenterne og nå de systemer, den er koblet på. Så svarer den ud fra, hvordan det faktisk står til i driften, ikke ud fra et gæt.",
          },
          {
            title: "Dem, der kender opgaven, retter den til",
            description:
              "Rammer svaret ved siden af, retter I i agentens instruktioner, og næste gang kører den den nye version. Det er teamet med opgaven, der former agenten, ikke IT.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Agenten, der skriver morgenens overblik",
            description:
              "Hver morgen læser den det seneste døgn igennem: OEE pr. linje, de største stop og de ordrer, der er bagud. Så skriver den udkastet til det overblik, teamlederen før satte sammen i hånden.",
          },
          {
            title: "Agenten, der sorterer fejlmeldinger",
            description:
              "Der kommer en ny fejlbeskrivelse ind. Agenten holder den op mod maskinens historik, finder de sager, der ligner mest, og peger på, hvad der sandsynligvis er galt, og hvad der løste det sidst.",
          },
          {
            title: "Agenten, der læser tilbud igennem",
            description:
              "Tilbud og specifikationer kommer i alle mulige formater. Agenten læser hvert dokument op mod jeres krav og stiller det op på samme måde hver gang, klar til, at et menneske vælger.",
          },
        ],
        ctaTitle: "Giv det arbejde, der kommer igen, til en agent",
        ctaBody:
          "Fortæl os om en opgave, der kommer igen hver uge. Så viser vi jer på en demo, hvordan agenten til den ser ud.",
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
          "OptiPeople integrates with the major ERP systems, SAP, Microsoft Dynamics, Business Central and more, plus MQTT, OPC-UA and a REST API for everything else.",
        eyebrow: "Integrations",
        heroTitle: "Connects with the systems you already run",
        heroBody:
          "OptiPeople plugs into the big ERP systems, speaks the machine protocols on your floor, MQTT and OPC-UA, and offers a REST API for everything else. Production data, orders and documents flow between systems without manual re-keying.",
        valueTitle: "Your AI is only as good as its connections",
        valueBody:
          "An assistant that can't see your ERP is just a chatbot, and a dashboard that can't hear your machines is just a picture. Real operational AI needs both ends connected: the business systems that hold orders, items and plans, and the machines that produce them. We connect to the systems of record in your back office and to the PLCs and sensors on your floor, so the OptiPeople Data Platform, and every AI capability built on it, works from the same data your business already trusts. One integration, maintained once, feeding everything.",
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
              "Send machine states, part counters and telemetry to the platform over MQTT with a documented JSON schema. Signals from PLCs and sensors land as structured events, timestamped and tied to the right machine.",
          },
          {
            title: "OPC-UA on the floor",
            description:
              "Read directly from OPC-UA servers on modern machines and lines, no custom adapters, no ripping out what already works.",
          },
          {
            title: "A REST API for the rest",
            description:
              "Anything without a standard connector can integrate through the REST API, pull production data out or push data in, in plain JSON.",
          },
          {
            title: "The tools around them",
            description:
              "Sync documents, spreadsheets, email and collaboration tools so context follows the work, and so AI answers can draw on the same material your team reads.",
          },
          {
            title: "Two-way by design",
            description:
              "Read live data in and write actions back, create orders, update tasks and post results where your teams already look. Integration isn't just import.",
          },
        ],
        useCasesTitle: "How teams use it",
        useCases: [
          {
            title: "Orders from ERP, results back",
            description:
              "Production orders flow from the ERP into the platform, operators run them on the floor, and progress and quantities are reported back, nobody re-keys an order number twice.",
          },
          {
            title: "Machines onto the platform",
            description:
              "PLCs and sensors publish states, counters and telemetry over MQTT or OPC-UA. Within the same data model, a stop on a press and a stop on a packing line mean the same thing.",
          },
          {
            title: "Data into your BI",
            description:
              "OEE, shift and stop-cause data flows on to Power BI and other reporting tools through the API, so the numbers in the boardroom match the numbers on the floor.",
          },
        ],
        ctaTitle: "Connect OptiPeople to your ERP",
        ctaBody:
          "Tell us which systems you run: ERP, machines, tools. We'll map the integration in a demo.",
        primaryCtaLabel: "Book a demo",
      },
      da: {
        cardTitle: "Integrationer",
        cardSubtitle: "Hænger sammen med de ERP-systemer, I allerede kører.",
        metaTitle: "Integrationer | Kobl jeres ERP og værktøjer på",
        metaDescription:
          "OptiPeople hænger sammen med de store ERP-systemer: SAP, Microsoft Dynamics, Business Central og flere. Maskinerne kobler vi på over MQTT og OPC-UA, og resten klarer et REST API.",
        eyebrow: "Integrationer",
        heroTitle: "Hænger sammen med de systemer, I allerede kører",
        heroBody:
          "OptiPeople kobler sig på de store ERP-systemer og taler med maskinerne på gulvet over MQTT og OPC-UA. Resten klarer et REST API. Produktionsdata, ordrer og dokumenter flytter sig mellem systemerne, uden at nogen skal taste dem ind igen.",
        valueTitle: "AI er ikke bedre end det, den er koblet på",
        valueBody:
          "En assistent, der ikke kan se jeres ERP, er bare en chatbot. Et dashboard, der ikke kan høre maskinerne, er bare et billede. Skal AI kunne bruges i driften, skal begge ender være koblet på: systemerne med ordrer, varer og planer, og maskinerne der laver dem. Vi kobler os på begge steder, både i backoffice og ude ved PLC'er og sensorer. Så arbejder OptiPeople Data Platform, og al den AI der ligger ovenpå, ud fra de samme tal, som resten af forretningen bruger. Ingen taster det samme to gange, og der ligger ikke fire kopier, som ikke passer sammen. Én kobling, passet ét sted, som alt det andet henter fra.",
        capabilitiesTitle: "Passer ind, hvor I er i forvejen",
        capabilities: [
          {
            title: "De store ERP-systemer",
            description:
              "Vi kobler på SAP, Microsoft Dynamics 365, Business Central, Navision og de andre ERP-systemer, driften hænger på. Ordrer og stamdata kommer ind. Fremdrift og resultater går tilbage.",
          },
          {
            title: "Maskindata over MQTT",
            description:
              "Send maskinstatus, emnetællere og målinger til platformen over MQTT. JSON-formatet er dokumenteret. Signaler fra PLC'er og sensorer lander med tidsstempel på den rigtige maskine.",
          },
          {
            title: "OPC-UA på gulvet",
            description:
              "Vi læser direkte fra OPC-UA-serverne på nyere maskiner og linjer. Der skal ikke bygges særlige kasser til det, og der skal ikke rives noget ud, som virker.",
          },
          {
            title: "Et REST API til resten",
            description:
              "Er der ikke en færdig kobling til systemet, klarer REST API'et det. Hent produktionsdata ud, eller send data ind, i almindelig JSON.",
          },
          {
            title: "Værktøjerne omkring driften",
            description:
              "Kobl jer på dokumenter, regneark, mail og de værktøjer, I samarbejder i. Så følger baggrunden med arbejdet, og AI kan svare ud fra det samme materiale, som teamet selv læser.",
          },
          {
            title: "Det går begge veje",
            description:
              "Vi læser data ind og skriver også tilbage: opret ordrer, opdater opgaver og læg resultater dér, hvor teamet alligevel kigger. En kobling er mere end import.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Ordrer fra ERP, resultater tilbage",
            description:
              "Produktionsordrerne kommer fra ERP ind i platformen. Operatørerne kører dem på gulvet, og fremdrift og antal går tilbage. Ingen taster et ordrenummer to gange.",
          },
          {
            title: "Maskinerne på platformen",
            description:
              "PLC'er og sensorer sender status, tællere og målinger over MQTT eller OPC-UA. Bagefter betyder et stop på pressen og et stop på pakkelinjen det samme, fordi de ligger i den samme model.",
          },
          {
            title: "Data ind i jeres BI",
            description:
              "Tal for OEE, skift og stopårsager går videre til Power BI og andre rapportværktøjer gennem API'et. Så passer tallene i mødelokalet med tallene på gulvet.",
          },
        ],
        ctaTitle: "Kobl OptiPeople på jeres ERP",
        ctaBody:
          "Fortæl os, hvad I kører: ERP, maskiner og værktøjer. Så tegner vi koblingen op på en demo.",
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
          "OptiPeople offers a public REST API so you can build on top of your production data, OEE, machines, stops, shifts and telemetry, in plain JSON.",
        eyebrow: "API",
        heroTitle: "A public REST API to build on your data",
        heroBody:
          "Everything you see in the OptiPeople Data Platform is available programmatically. Pull OEE, machines, stops, shifts and telemetry into your own apps, dashboards and automations with a documented REST API, plain JSON over HTTPS, authenticated with an access key you create in the portal.",
        valueTitle: "Your data, on your terms",
        valueBody:
          "Sometimes the value is in your own system: a BI model your controllers maintain, a shopfloor screen your operators watch, an internal app your IT team owns. The platform REST API gives developers direct, authenticated access to production data, so you can extend the platform however your business needs. The data flows both ways, export what OptiPeople Data Platform has collected, or send machine states, part counters and telemetry in from your own systems over MQTT with a documented JSON schema. No black-box lock-in: the data is yours, and the API proves it.",
        capabilitiesTitle: "Developer-ready",
        capabilities: [
          {
            title: "Clean REST endpoints",
            description:
              "Predictable, resource-based endpoints with JSON responses for machines, OEE, stops, telemetry and more. Test a connection directly in the browser, if the endpoint returns JSON, you're connected.",
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
              "The main data export covers availability, performance, quality, units, shifts and stop causes, the numbers behind your OEE, structured for reporting and BI tools like Power BI.",
          },
          {
            title: "Filter to what you need",
            description:
              "Query parameters like machineId, from and to limit a response to one machine or one time window, pull a single line's night shift instead of the whole plant's history.",
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
              "IT builds a shopfloor display or an internal app on live production data, the API serves the same numbers the platform shows, so the two never disagree.",
          },
          {
            title: "Feeding data in",
            description:
              "A line with its own control system publishes states and counters over MQTT. The data lands in the platform alongside everything else, in the same structure.",
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
        cardSubtitle: "Et åbent REST API til at bygge på jeres data.",
        metaTitle: "API | Byg på jeres OptiPeople-data",
        metaDescription:
          "OptiPeople har et åbent REST API, så I kan bygge oven på jeres egne produktionsdata: OEE, maskiner, stop, skift og målinger, i almindelig JSON.",
        eyebrow: "API",
        heroTitle: "Et åbent REST API til at bygge på jeres data",
        heroBody:
          "Alt det, I kan se i OptiPeople Data Platform, kan I også hente med kode. Træk OEE, maskiner, stop, skift og målinger ind i jeres egne apps, dashboards og automatiseringer gennem et dokumenteret REST API. Almindelig JSON over HTTPS, med en nøgle, I selv opretter i portalen.",
        valueTitle: "Jeres data, på jeres måde",
        valueBody:
          "Nogle gange skal værdien opstå i jeres eget system: i BI-modellen, controllerne passer, på skærmen ude på gulvet, i den interne app IT ejer. REST API'et giver udviklere direkte adgang til produktionsdata, så I kan bygge det, forretningen har brug for. Det går begge veje. Hent det, platformen har samlet, eller send maskinstatus, emnetællere og målinger ind fra jeres egne systemer over MQTT i et dokumenteret JSON-format. I skal bruge en konto i portalen, en maskine, en enhed og en nøgle, så er I i gang. Data er jeres, og API'et er beviset på, at de ikke er låst inde.",
        capabilitiesTitle: "Klar til udviklere",
        capabilities: [
          {
            title: "Rene REST-endpoints",
            description:
              "Endpoints, der ligger, hvor man forventer, og svarer i JSON: maskiner, OEE, stop, målinger og mere. Test forbindelsen direkte i browseren. Kommer der JSON tilbage, er den på plads.",
          },
          {
            title: "Dokumenteret med Swagger",
            description:
              "En interaktiv OpenAPI-reference lader dig prøve hvert endpoint, før du skriver en linje kode. Det, referencen viser, er det, API'et svarer.",
          },
          {
            title: "Sikker adgang, kun til det aftalte",
            description:
              "Nøglerne opretter og styrer I i portalen, og hvert kald går over HTTPS. I bestemmer præcis, hvad den enkelte kobling må læse og gøre.",
          },
          {
            title: "OEE-tallene, klar til eksport",
            description:
              "Hovedeksporten dækker tilgængelighed, ydelse, kvalitet, antal, skift og stopårsager. Det er tallene bag jeres OEE, stillet op til rapportering og BI-værktøjer som Power BI.",
          },
          {
            title: "Hent kun det, I skal bruge",
            description:
              "Parametre som machineId, from og to skærer svaret ned til én maskine eller ét tidsrum. Hent en enkelt linjes nattevagt i stedet for hele fabrikkens historik.",
          },
          {
            title: "Send data ind over MQTT",
            description:
              "Platformen tager også imod data. Maskinstatus, emnetællere og målinger kan sendes ind over MQTT i et dokumenteret JSON-format, med UTC-tidsstempler og id på hver enhed.",
          },
        ],
        useCasesTitle: "Sådan bruger teams det",
        useCases: [
          {
            title: "Rapportering i Power BI",
            description:
              "Controllerne henter tal for skift, OEE og stopårsager ind i deres egne BI-modeller efter en fast plan. Fabrikkens tal lander i de samme rapporter som resten af forretningen.",
          },
          {
            title: "Jeres egne skærme og apps",
            description:
              "IT bygger en skærm til gulvet eller en intern app på data fra i dag. API'et svarer med de samme tal, som platformen viser, så de to aldrig siger noget forskelligt.",
          },
          {
            title: "Data den anden vej",
            description:
              "En linje med sit eget styresystem sender status og tællere ind over MQTT. Data lander i platformen sammen med alt det andet, i den samme struktur.",
          },
        ],
        ctaTitle: "Begynd at bygge på OptiPeople",
        ctaBody:
          "Kig i den live API-reference, eller tal med os om nøgler, og om hvordan jeres første kobling kunne se ud.",
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
 * "ai" layout, colored card + code-built product mockup.
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
