import {
  API_BASE_URL,
  API_ENDPOINT_COUNT,
  API_PDF_URL,
  API_POST_PATH,
  COMPANY,
  MCP_POST_PATH,
  MCP_URL,
  OPTI_ASSIST_URL,
  PORTAL_HOST,
  apiEndpointGroups,
  markdownTwinPages,
  mcpExampleQuestions,
  mcpToolGroups,
  mcpTools,
  querySources,
  type McpToolGroup,
} from "@/content/agents"
import { moduleCatalog } from "@/content/modules-catalog"
import { API_DOCS_HREF, aiCapabilities } from "@/lib/ai-stack"
import { getCaseStudies } from "@/lib/blog-data"
import { SUPPORT_EMAIL, generalEmail } from "@/lib/contact"
import { addLocalePrefix, type Locale } from "@/lib/i18n"
import { absoluteUrl } from "@/lib/seo"

// The pages written for AI agents: /agents, /docs/agents and /docs/mcp, in
// both locales. Each one is built once as an AgentDoc and then either printed
// as Markdown (the .md twins) or rendered as HTML (app/[locale]/agents and
// app/[locale]/docs), so the two can never say different things.
//
// Lists (modules, AI, cases, MCP tools) come from the same catalogs the rest
// of the site reads, so they never drift. Every fact is one the site already
// states; see content/agents.ts for where each comes from.

export type AgentDocKind = "agents" | "connect" | "mcp"

/** HTML pages link within the site; Markdown files carry absolute URLs. */
export type AgentDocTarget = "html" | "markdown"

export type AgentDocFact = {
  label: string
  value: string
  href?: string
  /** Show the value as code (a URL or a header an agent should copy). */
  code?: boolean
}

export type AgentDocSection = { title: string; body: string }

export type AgentDoc = {
  /** Unprefixed page path; the .md twin is this plus `.md`. */
  path: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  intro: string
  facts: AgentDocFact[]
  sections: AgentDocSection[]
}

export const AGENT_DOC_PATHS: Record<AgentDocKind, string> = {
  agents: "/agents",
  connect: "/docs/agents",
  mcp: "/docs/mcp",
}

// Markdown helpers.

const code = (text: string) => `\`${text}\``
const fence = (lang: string, text: string) => `\`\`\`${lang}\n${text}\n\`\`\``
const bullets = (items: string[]) => items.map((item) => `- ${item}`).join("\n")
const numbered = (items: string[]) => items.map((item, i) => `${i + 1}. ${item}`).join("\n")
const cell = (text: string) => text.replace(/\|/g, "\\|")

function table(headers: string[], rows: string[][]) {
  return [
    `| ${headers.map(cell).join(" | ")} |`,
    `|${headers.map(() => "---").join("|")}|`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
  ].join("\n")
}

const paragraphs = (...blocks: string[]) => blocks.filter(Boolean).join("\n\n")

/**
 * URL builders for one locale and target. `page` is a site page, `md` its
 * Markdown twin, `file` a root file such as /llms.txt that has no locale.
 */
function linksFor(locale: Locale, target: AgentDocTarget) {
  const resolve = (path: string) => (target === "markdown" ? absoluteUrl(path) : path)
  const page = (path: string) => resolve(addLocalePrefix(path, locale))
  const md = (path: string) => {
    const local = path === "/" ? addLocalePrefix("/index", locale) : addLocalePrefix(path, locale)
    return resolve(`${local}.md`)
  }
  const file = (path: string) => resolve(path)
  return { page, md, file }
}

type Links = ReturnType<typeof linksFor>

function toolLines(locale: Locale, groups: McpToolGroup[]) {
  return groups
    .map((group) => {
      const tools = mcpTools.filter((tool) => tool.group === group)
      return `### ${mcpToolGroups[group][locale]}\n\n${bullets(tools.map((tool) => `${code(tool.name)}: ${tool.text[locale]}`))}`
    })
    .join("\n\n")
}

const readGroups: McpToolGroup[] = ["orient", "live", "oee", "query", "admin"]
const writeTools = mcpTools.filter((tool) => tool.group === "write")

// /agents: OptiPeople for agents.

function agentsDoc(locale: Locale, target: AgentDocTarget): AgentDoc {
  const { page, md, file } = linksFor(locale, target)
  const modules = bullets(
    moduleCatalog.map((entry) => `[${entry.label[locale]}](${page(entry.href)}): ${entry.blurb[locale]}`),
  )
  const ai = bullets(
    aiCapabilities.map(
      (capability) =>
        `[${capability.content[locale].cardTitle}](${page(capability.href)}): ${capability.content[locale].cardSubtitle}`,
    ),
  )
  const cases = bullets(
    getCaseStudies(locale).map((post) => {
      const description = post.outcome ?? post.summary.replace(/^At a Glance\s+/i, "")
      return `[${post.title}](${page(`/blog/${post.slug}`)}): ${description}`
    }),
  )
  const twins = bullets(markdownTwinPages.map((entry) => `[${entry.title[locale]}](${md(entry.path)})`))
  const email = generalEmail(locale)
  const siteHome = absoluteUrl(addLocalePrefix("/", locale))

  if (locale === "da") {
    return {
      path: AGENT_DOC_PATHS.agents,
      metaTitle: "For AI-agenter | OptiPeople",
      metaDescription:
        "OptiPeople for AI-agenter: hvad OptiPeople Data Platform kan, modulerne, kundecases, hvordan en agent kobler på via MCP-serveren eller REST-API'et, og hvordan I booker en demo.",
      eyebrow: "For agenter",
      title: "OptiPeople for agenter",
      intro:
        "OptiPeople er en dansk virksomhed, der hjælper producenter med at styre produktionen på live data. Den her side er skrevet til AI-agenter og de folk, der bruger dem: hvad vi laver, hvilke sider der er værd at læse, og hvordan en agent kommer til en fabriks produktionsdata.",
      facts: [
        { label: "Website", value: siteHome, href: page("/") },
        { label: "Kort over sitet til AI", value: "/llms.txt", href: file("/llms.txt"), code: true },
        { label: "MCP-server", value: MCP_URL, code: true },
        { label: "REST-API", value: API_BASE_URL, code: true },
        { label: "E-mail", value: email, href: `mailto:${email}` },
        { label: "Book en demo", value: "Kontakt", href: page("/contact") },
      ],
      sections: [
        {
          title: "Det laver OptiPeople",
          body: paragraphs(
            `Vores produkt hedder OptiPeople Data Platform. Det er et modulært MES. Det kobler de maskiner på, fabrikken allerede har, og viser OEE og nedetid, mens det sker. Oven på de samme data ligger ${moduleCatalog.length} moduler til resten af driften. Platformen dækker hullet mellem produktionsgulvet og ERP-systemet.`,
            "Ud over softwaren rådgiver vi om smart drift, automatisering, business intelligence og AI.",
            `Alle sider findes på engelsk og dansk. Den danske udgave ligger under ${code("/da")} på samme sti. Læs mere om [platformen](${page("/platform")}).`,
          ),
        },
        {
          title: "Modulerne",
          body: paragraphs(
            `OptiPeople Data Platform består af ${moduleCatalog.length} moduler, og de bygger alle på de samme data:`,
            modules,
          ),
        },
        {
          title: "AI",
          body: paragraphs(
            "AI'en arbejder på de samme data som modulerne:",
            ai,
            `Opti Assist er Chat på listen ovenfor. Det er en app på [ai.optipeople.dk](${OPTI_ASSIST_URL}). Operatøren scanner QR-koden på maskinen, spørger med sine egne ord og får svaret fra virksomhedens manualer og maskinens live data, med kilderne under.`,
          ),
        },
        {
          title: "Kundecases",
          body: paragraphs(
            "Producenter, der kører på OptiPeople Data Platform, og hvad de fik ud af det:",
            cases,
            `Alle cases samlet: [kundecases](${page("/cases")}).`,
          ),
        },
        {
          title: "Kontakt og demo",
          body: paragraphs(
            `Vil I se OptiPeople, så book en demo på [kontaktsiden](${page("/contact")}). Vi vender tilbage inden for én arbejdsdag og viser platformen på jeres egen produktion, ikke på demodata. Priserne står ikke på sitet, så spørg os.`,
            bullets([
              `E-mail: ${email}`,
              `Support: ${SUPPORT_EMAIL}`,
              `Telefon: ${COMPANY.phone}`,
              `Kontor: ${COMPANY.address.da}`,
              `Firma: ${COMPANY.legalName}, CVR/moms ${COMPANY.vatId}`,
            ]),
          ),
        },
        {
          title: "Sådan kobler en agent på",
          body: paragraphs(
            `En agent kan komme til en fabriks data, hvis fabrikken allerede kører OptiPeople Data Platform. I skal have en bruger på ${code(PORTAL_HOST)}.`,
            bullets([
              `**MCP-server** på ${code(MCP_URL)}. I logger ind med jeres egen portalbruger over OAuth, og agenten får ${mcpTools.length} værktøjer til maskiner, live status, OEE, stop, ordrer, tællere og telemetri. [Opsætning og værktøjer](${page(AGENT_DOC_PATHS.mcp)}) ([Markdown](${md(AGENT_DOC_PATHS.mcp)}))`,
              `**REST-API** på ${code(API_BASE_URL)}, med kontoens adgangskode. Til kode og BI-værktøjer. [Sådan kobler I på](${page(AGENT_DOC_PATHS.connect)}) ([Markdown](${md(AGENT_DOC_PATHS.connect)}))`,
            ]),
            `Begge bygger på de samme data. ${writeTools.length} af MCP-værktøjerne og en del af API'et sender også data ind, og det tæller med i OEE. Så en agent skal kun skrive, når I beder om det.`,
          ),
        },
        {
          title: "Sider som Markdown",
          body: paragraphs(
            `Sæt ${code(".md")} på stien, så får I siden som ren Markdown. Det virker på de her sider:`,
            twins,
            bullets([
              `[llms.txt](${file("/llms.txt")}): et kort over hele sitet`,
              `[Sitemap](${file("/sitemap.xml")}): alle sider på begge sprog`,
            ]),
          ),
        },
      ],
    }
  }

  return {
    path: AGENT_DOC_PATHS.agents,
    metaTitle: "For agents | OptiPeople",
    metaDescription:
      "OptiPeople for AI agents: what the OptiPeople Data Platform does, the modules, customer cases, how an agent connects through the MCP server or the REST API, and how to book a demo.",
    eyebrow: "For agents",
    title: "OptiPeople for agents",
    intro:
      "OptiPeople is a Danish digital operations company that helps manufacturers run production on live data. This page is written for AI agents and the people who use them: what we do, which pages to read, and how an agent reaches a factory's production data.",
    facts: [
      { label: "Website", value: siteHome, href: page("/") },
      { label: "Site map for AI", value: "/llms.txt", href: file("/llms.txt"), code: true },
      { label: "MCP server", value: MCP_URL, code: true },
      { label: "REST API", value: API_BASE_URL, code: true },
      { label: "Email", value: email, href: `mailto:${email}` },
      { label: "Book a demo", value: "Contact", href: page("/contact") },
    ],
    sections: [
      {
        title: "What OptiPeople does",
        body: paragraphs(
          `Our product is the OptiPeople Data Platform, a modular MES. It connects the machines a factory already has and shows OEE and downtime as they happen. On the same data sit ${moduleCatalog.length} modules for the rest of the operation. The platform fills the gap between the shopfloor and the ERP system.`,
          "Besides the software, we offer advisory on smart operations, automation, business intelligence and AI.",
          `Every page exists in English and Danish. The Danish version sits under ${code("/da")} on the same path. Read more about [the platform](${page("/platform")}).`,
        ),
      },
      {
        title: "The modules",
        body: paragraphs(
          `The OptiPeople Data Platform is made of ${moduleCatalog.length} modules, all working on the same data:`,
          modules,
        ),
      },
      {
        title: "AI",
        body: paragraphs(
          "AI works on the same data as the modules:",
          ai,
          `Opti Assist is the Chat entry above, an app at [ai.optipeople.dk](${OPTI_ASSIST_URL}). An operator scans the QR code on a machine, asks in their own words and gets the answer from the company's manuals and the machine's live data, with the sources listed.`,
        ),
      },
      {
        title: "Customer cases",
        body: paragraphs(
          "Manufacturers that run on the OptiPeople Data Platform, and what they got out of it:",
          cases,
          `All cases in one place: [customer cases](${page("/cases")}).`,
        ),
      },
      {
        title: "Contact and demo",
        body: paragraphs(
          `To see OptiPeople, book a demo on the [contact page](${page("/contact")}). We get back within one business day and show the platform on your own production rather than a demo dataset. Prices are not on the site, so ask us.`,
          bullets([
            `Email: ${email} (in Danish: ${generalEmail("da")})`,
            `Support: ${SUPPORT_EMAIL}`,
            `Phone: ${COMPANY.phone}`,
            `Office: ${COMPANY.address.en}`,
            `Company: ${COMPANY.legalName}, VAT ${COMPANY.vatId}`,
          ]),
        ),
      },
      {
        title: "How an agent connects",
        body: paragraphs(
          `An agent can reach a factory's data if the factory already runs the OptiPeople Data Platform. Your human needs a user on ${code(PORTAL_HOST)}.`,
          bullets([
            `**MCP server** at ${code(MCP_URL)}. Your human logs in with their own portal user over OAuth, and you get ${mcpTools.length} tools for machines, live status, OEE, stops, orders, counters and telemetry. [Set-up and tools](${page(AGENT_DOC_PATHS.mcp)}) ([Markdown](${md(AGENT_DOC_PATHS.mcp)}))`,
            `**REST API** at ${code(API_BASE_URL)}, authenticated with the account's access code. For code and BI tools. [How to connect](${page(AGENT_DOC_PATHS.connect)}) ([Markdown](${md(AGENT_DOC_PATHS.connect)}))`,
          ]),
          `Both work on the same data. ${writeTools.length} of the MCP tools and part of the API also send data in, and that counts towards OEE. Only write when your human asks you to.`,
        ),
      },
      {
        title: "Pages as Markdown",
        body: paragraphs(
          `Add ${code(".md")} to the path for a plain Markdown version. These pages have one:`,
          twins,
          bullets([
            `[llms.txt](${file("/llms.txt")}): a map of the whole site`,
            `[Sitemap](${file("/sitemap.xml")}): every page in both languages`,
          ]),
        ),
      },
    ],
  }
}

// /docs/agents: how an agent or your own code connects.

function apiReferenceLinks(locale: Locale, links: Links) {
  return locale === "da"
    ? bullets([
        `[Interaktiv API-reference (Swagger)](${API_DOCS_HREF}): prøv hvert endpoint, før I skriver kode`,
        `[External API Reference (PDF)](${API_PDF_URL}): parametre og det fulde svarformat for hvert endpoint`,
        `[API-guiden, trin for trin](${links.page(API_POST_PATH)})`,
      ])
    : bullets([
        `[Interactive API reference (Swagger)](${API_DOCS_HREF}): explore and try every endpoint before you write code`,
        `[External API Reference (PDF)](${API_PDF_URL}): the parameters and full response schema for each endpoint`,
        `[The API guide, step by step](${links.page(API_POST_PATH)})`,
      ])
}

function connectDoc(locale: Locale, target: AgentDocTarget): AgentDoc {
  const links = linksFor(locale, target)
  const { page, md } = links
  const groups = table(
    locale === "da" ? ["Gruppe", "Hvad den dækker"] : ["Group", "What it covers"],
    apiEndpointGroups.map((group) => [group.name[locale], group.text[locale]]),
  )
  const claudeCode = fence("bash", `claude mcp add --transport http optipeople ${MCP_URL}`)

  if (locale === "da") {
    const curlMachines = fence(
      "bash",
      `curl -H "Authorization: Opti <ADGANGSKODE>" \\\n  ${API_BASE_URL}/Machine/GetAll`,
    )
    const curlExport = fence(
      "bash",
      `curl -H "Authorization: Opti <ADGANGSKODE>" \\\n  "${API_BASE_URL}/DataExport/GetDataExport?machineId=<MASKINE_ID>&from=2026-10-01&to=2026-10-25"`,
    )

    return {
      path: AGENT_DOC_PATHS.connect,
      metaTitle: "Kobl en agent på | OptiPeople",
      metaDescription:
        "Sådan kobler en AI-agent eller jeres egen kode på OptiPeople Data Platform: MCP-serveren med OAuth, REST-API'et med en adgangskode, og Opti Assist.",
      eyebrow: "Dokumentation",
      title: "Kobl en agent på",
      intro:
        "En agent eller jeres egen kode kan komme til produktionsdata i OptiPeople Data Platform på to måder: MCP-serveren, hvor en AI-assistent kalder værktøjerne for jer, og REST-API'et til udviklere og BI-værktøjer. De bygger på de samme data. Opti Assist er en tredje måde at spørge på, lavet til dem, der står ved maskinen.",
      facts: [
        { label: "MCP-server", value: MCP_URL, code: true },
        { label: "REST-API", value: API_BASE_URL, code: true },
        { label: "API-login", value: "Authorization: Opti <ADGANGSKODE>", code: true },
        { label: "API-reference", value: "Swagger", href: API_DOCS_HREF },
        { label: "API-reference", value: "PDF", href: API_PDF_URL },
      ],
      sections: [
        {
          title: "Det skal være på plads",
          body: paragraphs(
            numbered([
              `En konto på ${code(PORTAL_HOST)}`,
              "Mindst én maskine med en enhed koblet på",
              "Data, der kommer ind fra enheden",
              "Til REST-API'et: kontoens adgangskode. Til MCP-serveren: en portalbruger at logge ind med.",
            ]),
            `Har I ikke en konto endnu, er der ingen data at koble på. Book en demo på [kontaktsiden](${page("/contact")}).`,
          ),
        },
        {
          title: "API eller MCP?",
          body: paragraphs(
            table(
              ["", "REST-API", "MCP-server"],
              [
                ["Hvem bruger det", "Udviklere og BI-værktøjer", "Alle, der kan stille et spørgsmål"],
                ["Hvordan", "REST-kald med en adgangskode", "En AI-assistent kalder værktøjerne for jer"],
                ["Login", "Kontoens adgangskode", "OAuth med jeres egen portalbruger"],
                ["Bedst til", "Power BI, ERP-integrationer, faste rapporter", "Spørgsmål der dukker op, analyser, hurtige svar"],
              ],
            ),
            "Mange bruger begge: API'et fodrer de faste rapporter, og MCP svarer på det, der dukker op ind imellem.",
          ),
        },
        {
          title: "MCP-server",
          body: paragraphs(
            "Serverens adresse er:",
            fence("text", MCP_URL),
            "Alle klienter, der understøtter MCP-servere over HTTP med OAuth, kan koble på med den URL. I Claude Code:",
            claudeCode,
            `Kør derefter ${code("/mcp")} i Claude Code og log ind.`,
            `Opsætning i Claude, login, alle ${mcpTools.length} værktøjer, datakilderne og grænserne: [MCP-serveren](${page(AGENT_DOC_PATHS.mcp)}) ([Markdown](${md(AGENT_DOC_PATHS.mcp)})).`,
          ),
        },
        {
          title: "REST-API",
          body: paragraphs(
            "### Adresse og adgangskode",
            `Alle kald går til ${code(API_BASE_URL)}. Der er ${API_ENDPOINT_COUNT} endpoints, og de kører alle over HTTPS og svarer i JSON.`,
            "Adgangskoden finder I i portalen under **Accounts > External API**. Den hører til jeres konto, så pas på den som på et password. Den foretrukne måde at sende den på er en header:",
            fence("text", "Authorization: Opti <ADGANGSKODE>"),
            `Den anden er parameteren ${code("access_code")} i URL'en. Den er nem, når I bare vil teste i en browser:`,
            fence("text", `${API_BASE_URL}/Machine/GetAll?access_code=<ADGANGSKODE>`),
            "Får I en JSON-liste med jeres maskiner tilbage, virker forbindelsen.",
            "### De første kald",
            `**1. Find jeres maskiner.** Kald ${code("GET /Machine/GetAll")} og skriv ${code("id")} ned for hver maskine. Næsten alle andre endpoints skal have et ${code("machineId")}.`,
            curlMachines,
            `**2. Hent produktionsdata for en periode.** Kald ${code("GET /DataExport/GetDataExport")} med en maskine og en periode:`,
            curlExport,
            `**3. Vil I have OEE regnet ud,** så kald ${code("GET /DataExport/GetOEE")}. Den giver OEE, tilgængelighed, ydelse og kvalitet pr. maskine. Sæt ${code("includePerShiftData=true")} på for tallene pr. skift.`,
            "### Parametre, der går igen",
            bullets([
              `${code("machineId")}: maskinen, I vil se data for. På ${code("GetDataExport")}, ${code("GetEventExport")} og ${code("GetOEE")} kan I gentage den og få flere maskiner i ét kald.`,
              `${code("factoryId")}: kun én fabrik.`,
              `${code("from")} og ${code("to")}: perioden som ${code("yyyy-MM-dd")}. De fleste udtræk tager dagen i dag, hvis I udelader dem, og ét kald kan højst dække et år.`,
            ]),
            `Alle svar er bygget ens op: ${code("data")} er resultatet, ${code("errors")} er det, der gik galt, og ${code("meta")} er ekstra oplysninger.`,
            "### De vigtigste udtræk",
            bullets([
              `${code("GetDataExport")}: en periodes produktionsdata pr. skift, tæller, ordre og stop. Her starter de fleste Power BI-rapporter.`,
              `${code("GetOEE")}: OEE, tilgængelighed, ydelse og kvalitet pr. maskine.`,
              `${code("GetEventExport")}: hver eneste gang maskinen starter eller stopper.`,
              `${code("GetOrderReportExport")}: produktion pr. ordre, med stoptiden fordelt ud på ordrerne.`,
              `${code("GetLatestStop")} og ${code("GetHeartbeats")}: maskinens seneste stop, og om maskinerne melder sig.`,
              `${code("GetTelemetryData")}, ${code("GetTelemetry")} (OData, op til 10.000 rækker pr. side) og ${code("GetHoursSpentBetweenTelemetryThresholds")}: telemetri som temperatur og vibration.`,
              `${code("GetTPMAlertsExport")}: TPM-alarmer til at planlægge vedligehold ud fra.`,
            ]),
            "### Send data ind",
            bullets([
              `**Ordrer:** ${code("POST /Machine/SetMachinePartInformation")} starter en ordre på en maskine, og ${code("POST /PartOrderNumber/ExternalSetPartOrder")} sætter ordren på fabriksniveau.`,
              `**Operatører:** opret, ret og slet operatører med ${code("/User")}-endpoints. ${code("CreateOrUpdateOperators")} finder operatøren ud fra medarbejdernummer.`,
              `**Stop:** ${code("POST /Waste/RegisterAllPendingWaste")} giver alle ventende stop samme årsag i ét hug.`,
              `**Stamdata:** læs, opret, ret, søg i og slet rækker i jeres stamdatatabeller med ${code("/MasterData")}-endpoints.`,
            ]),
            "### Alle grupper af endpoints",
            groups,
            "### Hold øje med forbruget",
            `${code("GET /APIUsage/GetUsageForAccount?startDate=2026-10-01")} viser, hvor mange kald I har lavet, og hvor meget data de har givet, fordelt pr. endpoint. ${code("GetUsageForExternalApplication")} gør det samme for én integration.`,
            "### Reference",
            apiReferenceLinks(locale, links),
          ),
        },
        {
          title: "Send data ind over MQTT",
          body: `Platformen tager også imod data. Maskinstatus, emnetællere og målinger kan sendes ind over MQTT i et dokumenteret JSON-format, med UTC-tidsstempler og id på hver enhed. Forbindelsesoplysningerne står ikke på sitet, så [spørg os](${page("/contact")}).`,
        },
        {
          title: "Opti Assist",
          body: paragraphs(
            `Opti Assist på [ai.optipeople.dk](${OPTI_ASSIST_URL}) er vores chat til produktionen. Det er en app til folk, ikke et API til agenter. Hver maskine får sin egen QR-kode. Operatøren scanner den med telefon eller tablet, uden app og uden login, spørger på dansk eller engelsk og får svaret fra jeres egne manualer og maskinens live data i OptiPeople Data Platform, med kilderne under. Er det en opgave for en tekniker, er det ét tryk, så får servicekontakten en SMS.`,
            `Læs mere om [Opti Assist](${page("/ai/chat")}), eller se den i en kort demo: book en på [kontaktsiden](${page("/contact")}).`,
          ),
        },
        {
          title: "Godt at vide for agenter",
          body: bullets([
            "Spørg aldrig efter portalens password. MCP-login kører over OAuth med PKCE, og passwordet går aldrig gennem AI-assistenten.",
            "API-adgangskoden hører til hele kontoen. Pas på den som på et password.",
            "Det, der bliver skrevet, er rigtigt. Data fra MCP-værktøjerne, der skriver, tæller med i OEE, præcis som data fra maskinen, og API'ets skrivende endpoints ændrer de samme data. En agent skal kun skrive, når den bliver bedt om det.",
            `Ændringer via MCP bliver gemt med kilden ${code("McpTool")}, så de kan skelnes fra det, maskinerne selv har sendt.`,
            "Tider er i hver fabriks lokale tid. En periode, der stadig kører, er ikke endelig.",
            `Hjælp til en installation: ${SUPPORT_EMAIL}.`,
          ]),
        },
      ],
    }
  }

  const curlMachines = fence(
    "bash",
    `curl -H "Authorization: Opti <ACCESS_CODE>" \\\n  ${API_BASE_URL}/Machine/GetAll`,
  )
  const curlExport = fence(
    "bash",
    `curl -H "Authorization: Opti <ACCESS_CODE>" \\\n  "${API_BASE_URL}/DataExport/GetDataExport?machineId=<MACHINE_ID>&from=2026-10-01&to=2026-10-25"`,
  )

  return {
    path: AGENT_DOC_PATHS.connect,
    metaTitle: "Connect an agent | OptiPeople",
    metaDescription:
      "How an AI agent or your own code connects to the OptiPeople Data Platform: the MCP server with OAuth, the REST API with an access code, and Opti Assist.",
    eyebrow: "Docs",
    title: "Connect an agent",
    intro:
      "An agent or your own code reaches production data in the OptiPeople Data Platform in two ways: the MCP server, where an AI assistant calls tools for you, and the REST API, for developers and BI tools. Both work on the same data. Opti Assist is a third way to ask, built for people at the machine.",
    facts: [
      { label: "MCP server", value: MCP_URL, code: true },
      { label: "REST API", value: API_BASE_URL, code: true },
      { label: "API auth", value: "Authorization: Opti <ACCESS_CODE>", code: true },
      { label: "API reference", value: "Swagger", href: API_DOCS_HREF },
      { label: "API reference", value: "PDF", href: API_PDF_URL },
    ],
    sections: [
      {
        title: "What you need",
        body: paragraphs(
          numbered([
            `An account on ${code(PORTAL_HOST)}`,
            "At least one machine with a device attached",
            "Data flowing from the device",
            "For the REST API, the account's access code. For the MCP server, a portal user to log in with.",
          ]),
          `No account yet? Then there is no data to connect to. Book a demo on the [contact page](${page("/contact")}).`,
        ),
      },
      {
        title: "API or MCP?",
        body: paragraphs(
          table(
            ["", "REST API", "MCP server"],
            [
              ["Who uses it", "Developers and BI tools", "Anyone who can write a question"],
              ["How", "REST calls with an access code", "An AI assistant calls tools for you"],
              ["Login", "Account access code", "OAuth with your own portal user"],
              ["Best for", "Power BI, ERP integrations, fixed reports", "Ad hoc questions, analysis, quick answers"],
            ],
          ),
          "Many teams use both: the API feeds the fixed reports, MCP answers the questions that come up in between.",
        ),
      },
      {
        title: "MCP server",
        body: paragraphs(
          "The server address is:",
          fence("text", MCP_URL),
          "Any client that supports remote MCP servers over HTTP with OAuth can connect with that URL. In Claude Code:",
          claudeCode,
          `Then run ${code("/mcp")} inside Claude Code and log in.`,
          `Set-up in Claude, the login, all ${mcpTools.length} tools, the data sources and the limits: [MCP server](${page(AGENT_DOC_PATHS.mcp)}) ([Markdown](${md(AGENT_DOC_PATHS.mcp)})).`,
        ),
      },
      {
        title: "REST API",
        body: paragraphs(
          "### Base URL and access code",
          `Every call goes to ${code(API_BASE_URL)}. There are ${API_ENDPOINT_COUNT} endpoints, all over HTTPS and JSON.`,
          "The access code is in the portal under **Accounts > External API**. It is generated per account, so treat it like a password. The preferred way to send it is a header:",
          fence("text", "Authorization: Opti <ACCESS_CODE>"),
          `The other is the ${code("access_code")} query parameter, handy for a quick test in the browser:`,
          fence("text", `${API_BASE_URL}/Machine/GetAll?access_code=<ACCESS_CODE>`),
          "If that returns a JSON list of your machines, the connection works.",
          "### First calls",
          `**1. Find the machines.** Call ${code("GET /Machine/GetAll")} and note the ${code("id")} of each machine. Almost every other endpoint takes a ${code("machineId")}.`,
          curlMachines,
          `**2. Pull production data for a period.** Call ${code("GET /DataExport/GetDataExport")} with a machine and a date range:`,
          curlExport,
          `**3. For ready-made KPIs,** call ${code("GET /DataExport/GetOEE")}. It returns OEE, availability, performance and quality per machine. Add ${code("includePerShiftData=true")} for the split per shift.`,
          "### Parameters that work across endpoints",
          bullets([
            `${code("machineId")}: the machine to report on. On ${code("GetDataExport")}, ${code("GetEventExport")} and ${code("GetOEE")} you can repeat it to get several machines in one call.`,
            `${code("factoryId")}: limits an export to one factory.`,
            `${code("from")} and ${code("to")}: the period, as ${code("yyyy-MM-dd")}. Most exports default to today when you leave them out, and a single call can span at most one year.`,
          ]),
          `Responses share one envelope: ${code("data")} holds the result, ${code("errors")} lists anything that went wrong, and ${code("meta")} carries extra information.`,
          "### The main data exports",
          bullets([
            `${code("GetDataExport")}: a period's production data per shift, counter, order and stop. Most Power BI reports start here.`,
            `${code("GetOEE")}: OEE, availability, performance and quality per machine.`,
            `${code("GetEventExport")}: every individual runtime and downtime event.`,
            `${code("GetOrderReportExport")}: production per order, with stop time allocated to each order.`,
            `${code("GetLatestStop")} and ${code("GetHeartbeats")}: a machine's most recent stop, and whether the machines are reporting in.`,
            `${code("GetTelemetryData")}, ${code("GetTelemetry")} (OData, up to 10,000 rows per page) and ${code("GetHoursSpentBetweenTelemetryThresholds")}: telemetry such as temperature and vibration.`,
            `${code("GetTPMAlertsExport")}: TPM alerts for maintenance planning.`,
          ]),
          "### Writing data back",
          bullets([
            `**Orders:** ${code("POST /Machine/SetMachinePartInformation")} starts an order on a machine, and ${code("POST /PartOrderNumber/ExternalSetPartOrder")} sets the order on factory level.`,
            `**Operators:** create, update and delete operators with the ${code("/User")} endpoints. ${code("CreateOrUpdateOperators")} matches on worker id.`,
            `**Waste:** ${code("POST /Waste/RegisterAllPendingWaste")} registers pending stops with one reason in one go.`,
            `**Master data:** read, create, update, search and delete rows in your master data tables with the ${code("/MasterData")} endpoints.`,
          ]),
          "### All endpoint groups",
          groups,
          "### Usage",
          `${code("GET /APIUsage/GetUsageForAccount?startDate=2026-10-01")} shows how many requests you have made and how much data they returned, per endpoint. ${code("GetUsageForExternalApplication")} does the same for a single integration.`,
          "### Reference",
          apiReferenceLinks(locale, links),
        ),
      },
      {
        title: "Sending data in over MQTT",
        body: `The platform also accepts data: machine states, part counters and telemetry can be sent in over MQTT using a documented JSON schema, with UTC timestamps and per-device IDs. The connection details are not on the site, so [ask us](${page("/contact")}).`,
      },
      {
        title: "Opti Assist",
        body: paragraphs(
          `Opti Assist at [ai.optipeople.dk](${OPTI_ASSIST_URL}) is our chat for the shopfloor. It is an app for people, not an API for agents. Every machine gets its own QR code. An operator scans it with a phone or tablet, with no app and no login, asks in Danish or English, and gets the answer from the company's own manuals and the machine's live data in the OptiPeople Data Platform, with the sources listed. When it is a job for a technician, one tap sends the service contact a text.`,
          `Read more about [Opti Assist](${page("/ai/chat")}), or see it in a short demo: book one on the [contact page](${page("/contact")}).`,
        ),
      },
      {
        title: "Good to know for agents",
        body: bullets([
          "Never ask your human for their portal password. The MCP login runs over OAuth with PKCE, and the password never passes through the assistant.",
          "The API access code belongs to the whole account. Treat it like a password.",
          "Writes are real. Data from the MCP write tools counts towards OEE just like data from the machine, and the API's write endpoints change the same data. Only write when your human asks.",
          `Changes made through MCP are logged with the source ${code("McpTool")}, so they can be told apart from data sent by the machines.`,
          "Times are in each factory's local time. A period that is still running is not final.",
          `Help with an installation: ${SUPPORT_EMAIL}.`,
        ]),
      },
    ],
  }
}

// /docs/mcp: the MCP server.

function mcpDoc(locale: Locale, target: AgentDocTarget): AgentDoc {
  const { page, md } = linksFor(locale, target)
  const claudeCode = fence("bash", `claude mcp add --transport http optipeople ${MCP_URL}`)
  const writes = bullets(writeTools.map((tool) => `${code(tool.name)}: ${tool.text[locale]}`))
  const sources = table(
    locale === "da" ? ["Kilde", "Hvad den har"] : ["Source", "What it holds"],
    querySources.map((source) => [code(source.name), source.text[locale]]),
  )
  const questions = bullets(mcpExampleQuestions[locale].map((question) => `"${question}"`))

  if (locale === "da") {
    return {
      path: AGENT_DOC_PATHS.mcp,
      metaTitle: "MCP-server | OptiPeople",
      metaDescription: `Kobl Claude eller en anden MCP-klient på OptiPeople MCP-serveren: adressen, login med OAuth, opsætning i Claude og Claude Code, de ${mcpTools.length} værktøjer, datakilderne og grænserne.`,
      eyebrow: "Dokumentation",
      title: "MCP-server",
      intro:
        "OptiPeople MCP-serveren lader en AI-assistent som Claude læse jeres maskindata i OptiPeople Data Platform direkte og svare på spørgsmål som \"hvad var OEE på pakkelinjen i sidste uge?\". Ingen kode, intet udtræk, ingen Power BI-model. I kobler på én gang, logger ind med jeres portalbruger og spørger løs.",
      facts: [
        { label: "URL", value: MCP_URL, code: true },
        { label: "Transport", value: "HTTP (remote MCP-server)" },
        { label: "Login", value: "OAuth med PKCE og dynamisk klientregistrering" },
        { label: "Adgang", value: "mcp:tools", code: true },
        { label: "Værktøjer", value: String(mcpTools.length) },
      ],
      sections: [
        {
          title: "Hvad er MCP?",
          body: "MCP (Model Context Protocol) er en åben standard, der lader AI-assistenter bruge værktøjer i andre systemer. I stedet for at I kopierer tal ind i en chat, spørger assistenten selv platformen, henter data og arbejder videre med dem.",
        },
        {
          title: "Sådan kobler I på",
          body: paragraphs(
            "### Claude (claude.ai og desktop-appen)",
            numbered([
              "Gå til **Settings > Connectors**.",
              "Vælg **Add custom connector**.",
              `Giv den et navn, for eksempel **OptiPeople**, og indsæt ${code(MCP_URL)} som URL.`,
              "Klik **Connect**. I bliver sendt videre til OptiPeoples login.",
              "Log ind med jeres portalbruger og giv adgang.",
            ]),
            "På Team- og Enterprise-abonnementer skal en ejer måske tilføje connectoren for hele organisationen først.",
            "### Claude Code",
            claudeCode,
            `Kør derefter ${code("/mcp")} i Claude Code og log ind.`,
            "### Andre AI-assistenter",
            "Alle klienter, der understøtter MCP-servere over HTTP med OAuth, kan koble på med samme URL. Serveren understøtter dynamisk klientregistrering, så klienten registrerer sig selv. I skal ikke oprette klient-id eller hemmelighed i hånden.",
          ),
        },
        {
          title: "Sådan fungerer login",
          body: bullets([
            "I logger ind med OAuth og PKCE. Jeres password går aldrig gennem AI-assistenten.",
            `Assistenten får en token med adgangen ${code("mcp:tools")} og ser de samme data på kontoen, som jeres portalbruger kan se.`,
            "Hver klient, der er koblet på, står i portalen under **Account > MCP > Client Secrets**. Fjern den der, så er adgangen lukket.",
            `Ændringer, der kommer ind via MCP, bliver gemt med kilden ${code("McpTool")}. Så kan I altid se forskel på dem og det, maskinerne selv har sendt.`,
          ]),
        },
        {
          title: "Værktøjerne",
          body: paragraphs(
            `Serveren har ${mcpTools.length} værktøjer. Assistenten vælger selv det rigtige til spørgsmålet, og kalder typisk ${code("get_system_context")} først.`,
            toolLines(locale, readGroups),
          ),
        },
        {
          title: "Datakilder",
          body: paragraphs(`${code("query_data")} læser ${querySources.length} kilder:`, sources),
        },
        {
          title: "Værktøjer, der skriver",
          body: paragraphs(
            `${writeTools.length} værktøjer ændrer data. Assistenten bruger dem kun, når I beder om det.`,
            writes,
            "De kan alle få et tidspunkt med, så I kan registrere noget, der skete tidligere i dag. De tæller med i OEE, præcis som data fra maskinen.",
          ),
        },
        {
          title: "Grænser og godt at vide",
          body: bullets([
            "**Tid:** assistenten svarer i hver fabriks lokale tid.",
            "**Grænser:** en forespørgsel kan dække op til 92 dage ad gangen (et år for stop og totaler pr. skift), rå rækker et kortere stykke. Bed om uger eller måneder, hvis I skal se en lang periode.",
            "**Friske tal:** en periode, der stadig kører, bliver markeret som ikke endelig. En rettelse i en afsluttet periode kan tage op til 24 timer om at slå igennem.",
            "**OEE kommer ét sted fra:** OEE bliver altid hentet fra OEE-rapporten, så tallene passer med det, I ser i portalen.",
          ]),
        },
        { title: "Spørgsmål, I kan prøve", body: questions },
        {
          title: "Skal I bruge REST-API'et?",
          body: `Til faste rapporter, Power BI eller en ERP-integration er REST-API'et det rigtige: [Kobl en agent på](${page(AGENT_DOC_PATHS.connect)}) ([Markdown](${md(AGENT_DOC_PATHS.connect)})). Hele historien om MCP-serveren står i [blogindlægget](${page(MCP_POST_PATH)}).`,
        },
      ],
    }
  }

  return {
    path: AGENT_DOC_PATHS.mcp,
    metaTitle: "MCP server | OptiPeople",
    metaDescription: `Connect Claude or another MCP client to the OptiPeople MCP server: the URL, the OAuth login, set-up in Claude and Claude Code, the ${mcpTools.length} tools, the data sources and the limits.`,
    eyebrow: "Docs",
    title: "MCP server",
    intro:
      "The OptiPeople MCP server lets an AI assistant such as Claude read machine data in the OptiPeople Data Platform directly and answer questions like \"what was OEE on the packing line last week?\". No code, no export, no Power BI model. Connect once, log in with your portal user, and ask.",
    facts: [
      { label: "URL", value: MCP_URL, code: true },
      { label: "Transport", value: "HTTP (remote MCP server)" },
      { label: "Login", value: "OAuth with PKCE and dynamic client registration" },
      { label: "Scope", value: "mcp:tools", code: true },
      { label: "Tools", value: String(mcpTools.length) },
    ],
    sections: [
      {
        title: "What is MCP?",
        body: "MCP (Model Context Protocol) is an open standard that lets AI assistants use tools in other systems. Instead of you copying numbers into a chat, the assistant calls the platform itself, gets the data and works with it.",
      },
      {
        title: "How to connect",
        body: paragraphs(
          "### Claude (claude.ai and the desktop app)",
          numbered([
            "Go to **Settings > Connectors**.",
            "Choose **Add custom connector**.",
            `Give it a name, for example **OptiPeople**, and paste ${code(MCP_URL)} as the URL.`,
            "Click **Connect**. You are sent to the OptiPeople login.",
            "Log in with your portal user and approve access.",
          ]),
          "On Team and Enterprise plans an owner may need to add the connector for the organisation first.",
          "### Claude Code",
          claudeCode,
          `Then run ${code("/mcp")} inside Claude Code and log in.`,
          "### Other AI assistants",
          "Any client that supports remote MCP servers over HTTP with OAuth can connect with the same URL. The server supports dynamic client registration, so the client registers itself. You don't need to create a client id or secret by hand.",
        ),
      },
      {
        title: "How the login works",
        body: bullets([
          "You log in with OAuth and PKCE. Your password never passes through the AI assistant.",
          `The assistant gets a token with the scope ${code("mcp:tools")} and sees the same account data your portal user can see.`,
          "Each connected client shows up in the portal under **Account > MCP > Client Secrets**. Remove it there to cut access.",
          `Changes made through MCP are logged with the source ${code("McpTool")}, so you can always tell them apart from data sent by the machines.`,
        ]),
      },
      {
        title: "The tools",
        body: paragraphs(
          `The server has ${mcpTools.length} tools. The assistant picks the right one for the question, and usually calls ${code("get_system_context")} first.`,
          toolLines(locale, readGroups),
        ),
      },
      {
        title: "Data sources",
        body: paragraphs(`${code("query_data")} reads ${querySources.length} sources:`, sources),
      },
      {
        title: "Write tools",
        body: paragraphs(
          `${writeTools.length} tools change data. The assistant only uses them when you ask it to.`,
          writes,
          "They all accept a timestamp, so you can register something that happened earlier today. They count towards OEE just like data from the machine.",
        ),
      },
      {
        title: "Limits and good to know",
        body: bullets([
          "**Times:** the assistant answers in each factory's local time.",
          "**Limits:** queries cover up to 92 days in one go (a year for stops and shift-based totals), raw rows a shorter window. Ask for weeks or months if you need a long period.",
          "**Fresh numbers:** a period that is still running is marked as not final. A correction to a closed period can take up to 24 hours to show.",
          "**OEE comes from one place:** OEE is always taken from the OEE report, so the numbers match what you see in the portal.",
        ]),
      },
      { title: "Questions to try", body: questions },
      {
        title: "Need the REST API instead?",
        body: `For fixed reports, Power BI or an ERP integration, use the REST API: [Connect an agent](${page(AGENT_DOC_PATHS.connect)}) ([Markdown](${md(AGENT_DOC_PATHS.connect)})). The full story of the MCP server is in [the blog post](${page(MCP_POST_PATH)}).`,
      },
    ],
  }
}

const builders: Record<AgentDocKind, (locale: Locale, target: AgentDocTarget) => AgentDoc> = {
  agents: agentsDoc,
  connect: connectDoc,
  mcp: mcpDoc,
}

/** One agent doc, ready for the HTML page (`html`) or the .md twin (`markdown`). */
export function getAgentDoc(kind: AgentDocKind, locale: Locale, target: AgentDocTarget = "html"): AgentDoc {
  return builders[kind](locale, target)
}

function factValue(fact: AgentDocFact) {
  const text = fact.code ? code(fact.value) : fact.value
  return fact.href ? `[${text}](${fact.href})` : text
}

/** The body of a doc: its sections as `##` headings. The HTML page renders this. */
export function agentDocBody(doc: AgentDoc): string {
  return doc.sections.map((section) => `## ${section.title}\n\n${section.body}`).join("\n\n")
}

/** A whole doc as one Markdown file: title, intro, the facts, then the body. */
export function agentDocMarkdown(doc: AgentDoc): string {
  const facts = bullets(doc.facts.map((fact) => `${fact.label}: ${factValue(fact)}`))
  return `${paragraphs(`# ${doc.title}`, doc.intro, facts, agentDocBody(doc))}\n`
}

export function agentsMarkdown(locale: Locale): string {
  return agentDocMarkdown(getAgentDoc("agents", locale, "markdown"))
}

export function agentDocsMarkdown(locale: Locale): string {
  return agentDocMarkdown(getAgentDoc("connect", locale, "markdown"))
}

export function mcpDocsMarkdown(locale: Locale): string {
  return agentDocMarkdown(getAgentDoc("mcp", locale, "markdown"))
}
