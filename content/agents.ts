import type { Locale } from "@/i18n/routing"
import { ORGANIZATION } from "@/lib/structured-data"

/**
 * Facts for the agent pages (/agents, /docs/agents, /docs/mcp) and their
 * Markdown twins. lib/agent-docs.ts turns them into both.
 *
 * Every fact here is already stated somewhere on the site: the MCP post
 * (content/blog/optipeople-mcp-server-connect-ai-assistants.md), the API post
 * (content/blog/opticloud-api-how-to-use-it-step-by-step.md), lib/ai-stack.ts
 * and content/opti-assist.ts. When one of those changes, change it here too.
 * Nothing goes in here that the site does not already say.
 */

type Localized = Record<Locale, string>

export const MCP_URL = "https://mcp.optipeople.dk/"
export const API_BASE_URL = "https://dataexport.optipeople.dk/api"
export const API_PDF_URL =
  "https://storageprodoptipeople.blob.core.windows.net/application-resources/v1/Optipeople_External_API.pdf"
export const OPTI_ASSIST_URL = "https://ai.optipeople.dk/"
export const PORTAL_HOST = "portal.optipeople.dk"

/** The two blog posts the agent docs are written from. */
export const MCP_POST_PATH = "/blog/optipeople-mcp-server-connect-ai-assistants"
export const API_POST_PATH = "/blog/opticloud-api-how-to-use-it-step-by-step"

/** As stated in the API post. */
export const API_ENDPOINT_COUNT = 54

export type McpToolGroup = "orient" | "live" | "oee" | "query" | "write" | "admin"

export const mcpToolGroups: Record<McpToolGroup, Localized> = {
  orient: { en: "Find your way around", da: "Find rundt" },
  live: { en: "What is happening right now", da: "Hvad sker der lige nu" },
  oee: { en: "OEE over a period", da: "OEE over en periode" },
  query: { en: "Ask anything about production data", da: "Spørg om alt i produktionsdata" },
  write: { en: "Write data back", da: "Send data ind" },
  admin: { en: "For partners and administrators", da: "For partnere og administratorer" },
}

export type McpTool = { name: string; group: McpToolGroup; text: Localized }

export const mcpTools: McpTool[] = [
  {
    name: "get_system_context",
    group: "orient",
    text: {
      en: "describes the platform, key concepts (shifts, OEE, part counters, telemetry, dynamic shifts) and the account: name, enabled features, number of factories and machines. Usually called first.",
      da: "beskriver platformen, de vigtigste begreber (skift, OEE, tællere, telemetri, dynamiske skift) og kontoen: navn, hvilke funktioner der er slået til, antal fabrikker og maskiner. Bliver typisk kaldt først.",
    },
  },
  {
    name: "get_factories",
    group: "orient",
    text: {
      en: "the factories with country, time zone and local time, plus the shift names configured there.",
      da: "fabrikkerne med land, tidszone og lokal tid, og de skiftnavne, der er sat op.",
    },
  },
  {
    name: "get_machines",
    group: "orient",
    text: {
      en: "all machines with id, factory, part counters and whether they send telemetry. Filter by factory or part of the name.",
      da: "alle maskiner med id, fabrik, tællere, og om de sender telemetri. Kan filtreres på fabrik eller en del af navnet.",
    },
  },
  {
    name: "get_machine",
    group: "orient",
    text: {
      en: "one machine's set-up: part counters and units, telemetry parameters, targets for OEE, uptime, performance and quality, and expected speed.",
      da: "én maskines opsætning: tællere og enheder, telemetriparametre, mål for OEE, oppetid, ydelse og kvalitet, og forventet hastighed.",
    },
  },
  {
    name: "get_shift_schedule",
    group: "orient",
    text: {
      en: "the weekly shift plan for up to 20 machines, including which shifts start or stop with the machine.",
      da: "ugens skiftplan for op til 20 maskiner, også hvilke skift der starter eller stopper med maskinen.",
    },
  },
  {
    name: "get_machine_status",
    group: "live",
    text: {
      en: "the live state of up to 10 machines, as the real-time dashboard shows it. Running, stopped, setup or outside shift. Stop reason and since when. Whether stops are waiting for a reason. The current shift, its OEE so far, the running order with produced and rejected units, and the last heartbeat.",
      da: "live status for op til 10 maskiner, som realtidsdashboardet viser den. Kører, står, omstilling eller uden for skift. Stopårsag og siden hvornår. Om der er stop, der venter på en årsag. Det aktuelle skift og dets OEE indtil nu, ordren der kører med producerede og kasserede emner, og seneste heartbeat.",
    },
  },
  {
    name: "get_oee_report",
    group: "oee",
    text: {
      en: "the portal's OEE report for up to 5 machines, for an ISO week or a range of days. Per machine: OEE, availability, performance and quality; shift, run, planned and unplanned stop hours; number of stops; produced and rejected units per counter; and the top 5 stop reasons. Can be limited to certain shifts.",
      da: "portalens OEE-rapport for op til 5 maskiner, for en uge eller en række dage. Pr. maskine: OEE, tilgængelighed, ydelse og kvalitet; timer i skift, i drift, i planlagte og uplanlagte stop; antal stop; producerede og kasserede emner pr. tæller; og de 5 største stopårsager. Kan begrænses til bestemte skift.",
    },
  },
  {
    name: "describe_sources",
    group: "query",
    text: {
      en: "which data sources exist, their fields, and the limits.",
      da: "hvilke datakilder der er, hvilke felter de har, og hvor grænserne går.",
    },
  },
  {
    name: "query_data",
    group: "query",
    text: {
      en: "one flexible query tool. Filter, group by machine, factory, counter, reason or order, bucket by hour, shift, day, week or month, and calculate sums, averages, minimums, maximums and percentiles.",
      da: "ét fleksibelt værktøj til forespørgsler. Filtrér, gruppér på maskine, fabrik, tæller, årsag eller ordre, del op i time, skift, dag, uge eller måned, og regn summer, gennemsnit, mindste, største og percentiler ud.",
    },
  },
  {
    name: "send_machine_state",
    group: "write",
    text: {
      en: "registers that a machine started, stopped, or stopped with a given reason.",
      da: "registrerer, at en maskine startede, stoppede, eller stoppede med en bestemt årsag.",
    },
  },
  {
    name: "send_order",
    group: "write",
    text: {
      en: "starts an order on a machine, with optional quantity, expected speed and custom fields. The order is created if it doesn't exist.",
      da: "starter en ordre på en maskine, eventuelt med antal, forventet hastighed og egne felter. Ordren bliver oprettet, hvis den ikke findes.",
    },
  },
  {
    name: "send_part_counter",
    group: "write",
    text: {
      en: "registers produced units (positive number) or rejected units (negative number) on a part counter.",
      da: "registrerer producerede emner (positivt tal) eller kasserede emner (negativt tal) på en tæller.",
    },
  },
  {
    name: "list_accounts",
    group: "admin",
    text: {
      en: "partners see their linked customer accounts and super administrators see all of them. Every tool takes an account id, so a partner can work across customers in one chat. Ordinary users only ever see their own account.",
      da: "partnere ser de kundekonti, de er koblet til, og superadministratorer ser dem alle. Alle værktøjer tager et konto-id, så en partner kan arbejde på tværs af kunder i samme chat. Almindelige brugere ser kun deres egen konto.",
    },
  },
]

export const querySources: { name: string; text: Localized }[] = [
  {
    name: "partCounters",
    text: {
      en: "Produced, rejected and net units and reject rate. Average, best and worst per hour, shift, day, week or month.",
      da: "Producerede, kasserede og gode emner og kassationsprocent. Gennemsnit, bedste og dårligste pr. time, skift, dag, uge eller måned.",
    },
  },
  {
    name: "stops",
    text: {
      en: "Every stop with reason, category, planned or unplanned, setup or stop, duration and whether it is still open.",
      da: "Hvert stop med årsag, kategori, planlagt eller ej, omstilling eller stop, varighed, og om det stadig står på.",
    },
  },
  {
    name: "orders",
    text: {
      en: "Each order run: when, how long, running time, planned and unplanned stops, produced and rejected units.",
      da: "Hver gang en ordre har kørt: hvornår, hvor længe, tid i drift, planlagte og uplanlagte stop, producerede og kasserede emner.",
    },
  },
  {
    name: "telemetry",
    text: {
      en: "Sensor readings such as temperature, speed or power. Average, min, max, p50 and p95, optionally only while the machine was running.",
      da: "Målinger som temperatur, hastighed eller strøm. Gennemsnit, min, maks, p50 og p95, også kun mens maskinen kørte.",
    },
  },
  {
    name: "heartbeats",
    text: {
      en: "When each machine's device was reporting in, and the gaps when it wasn't.",
      da: "Hvornår maskinens enhed meldte sig, og hullerne, hvor den ikke gjorde.",
    },
  },
  {
    name: "lists",
    text: {
      en: "The account's master data lists, such as quality control results or operator scans.",
      da: "Kontoens stamdatalister, for eksempel kvalitetskontrol eller operatørscanninger.",
    },
  },
]

export const mcpExampleQuestions: Record<Locale, string[]> = {
  en: [
    "Which machines are stopped right now, and why?",
    "Give me the OEE report for week 42 for all machines.",
    "What were the top 10 stop reasons on CNC Robot in September, in minutes?",
    "How many units did the packing line produce per shift last week, and what was the reject rate?",
    "Which orders took longest compared to how many units they made?",
    "What was the average oven temperature while it was running, hour by hour yesterday?",
    "Did any machine lose connection this month?",
    "Start order 4711 on the packing line with 2,000 units.",
  ],
  da: [
    "Hvilke maskiner står lige nu, og hvorfor?",
    "Giv mig OEE-rapporten for uge 42 for alle maskiner.",
    "Hvad var de 10 største stopårsager på CNC Robot i september, i minutter?",
    "Hvor mange emner lavede pakkelinjen pr. skift i sidste uge, og hvor meget blev kasseret?",
    "Hvilke ordrer tog længst tid i forhold til, hvor mange emner de gav?",
    "Hvad var ovnens gennemsnitstemperatur, mens den kørte, time for time i går?",
    "Har nogen maskine mistet forbindelsen i denne måned?",
    "Start ordre 4711 på pakkelinjen med 2.000 stk.",
  ],
}

/** The REST API's endpoint groups, as listed in the API post. */
export const apiEndpointGroups: { name: Localized; text: Localized }[] = [
  { name: { en: "Account", da: "Account" }, text: { en: "Account settings", da: "Kontoens indstillinger" } },
  {
    name: { en: "API Usage", da: "API Usage" },
    text: {
      en: "How many calls and how much data you have used, per account or per external application",
      da: "Hvor mange kald og hvor meget data I har brugt, pr. konto eller pr. integration",
    },
  },
  { name: { en: "Factory", da: "Factory" }, text: { en: "Your factories", da: "Jeres fabrikker" } },
  { name: { en: "Device", da: "Device" }, text: { en: "Devices and their status", da: "Enheder og deres status" } },
  {
    name: { en: "Machine", da: "Machine" },
    text: {
      en: "Machines, manual operator logs, waste configurations, starting orders",
      da: "Maskiner, manuelle operatørlog, stopkonfiguration, start af ordrer",
    },
  },
  {
    name: { en: "Machine Shift and Shift Identifier", da: "Machine Shift og Shift Identifier" },
    text: { en: "Shift schedules and shift names", da: "Skiftplaner og skiftnavne" },
  },
  {
    name: { en: "Data Export", da: "Data Export" },
    text: {
      en: "Production, OEE, events, orders, stops, heartbeats, TPM alerts and telemetry",
      da: "Produktion, OEE, hændelser, ordrer, stop, heartbeats, TPM-alarmer og telemetri",
    },
  },
  {
    name: { en: "Report", da: "Report" },
    text: {
      en: "Current order on a machine, part counter reports per day and per hour, order information with custom fields",
      da: "Ordren, der kører nu, tællerrapporter pr. dag og pr. time, ordreoplysninger med egne felter",
    },
  },
  {
    name: { en: "Part Order Number", da: "Part Order Number" },
    text: {
      en: "Orders per factory and exact units produced between two timestamps",
      da: "Ordrer pr. fabrik og præcist antal emner mellem to tidspunkter",
    },
  },
  { name: { en: "Master Data", da: "Master Data" }, text: { en: "Your own data tables", da: "Jeres egne datatabeller" } },
  {
    name: { en: "Task Configuration and Task Instance", da: "Task Configuration og Task Instance" },
    text: {
      en: "Tasks, active and completed task instances with their history",
      da: "Opgaver, aktive og afsluttede opgaver med historik",
    },
  },
  { name: { en: "User", da: "User" }, text: { en: "Operators", da: "Operatører" } },
  { name: { en: "Waste", da: "Waste" }, text: { en: "Registering pending stops", da: "Registrering af ventende stop" } },
  {
    name: { en: "Incomac App", da: "Incomac App" },
    text: {
      en: "Energy optimisation settings, spot prices and machine notifications",
      da: "Indstillinger for energioptimering, spotpriser og maskinbeskeder",
    },
  },
]

/** Company details, read from the same record as the structured data. */
export const COMPANY = {
  legalName: ORGANIZATION.legalName,
  vatId: ORGANIZATION.vatID,
  phone: ORGANIZATION.telephone,
  address: {
    en: `${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.postalCode} ${ORGANIZATION.address.addressLocality}, Denmark`,
    da: `${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.postalCode} ${ORGANIZATION.address.addressLocality}, Danmark`,
  },
}

/**
 * Pages that have a Markdown twin (the page path plus `.md`) and are worth
 * pointing an agent at. The /agents page lists them. Keep it in step with the
 * paths the .md route actually serves.
 */
export const markdownTwinPages: { path: string; title: Localized }[] = [
  { path: "/", title: { en: "Home", da: "Forside" } },
  { path: "/platform", title: { en: "OptiPeople Data Platform", da: "OptiPeople Data Platform" } },
  { path: "/modules", title: { en: "Modules", da: "Moduler" } },
  { path: "/cases", title: { en: "Customer cases", da: "Kundecases" } },
  { path: "/about", title: { en: "About OptiPeople", da: "Om OptiPeople" } },
  { path: "/contact", title: { en: "Contact", da: "Kontakt" } },
]
