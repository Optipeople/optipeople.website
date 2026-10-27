import type { ReplayContent } from "./types"

/**
 * Copy for the OEE module replay (components/replays/oee-replay.tsx): the
 * report for one shift building itself. The numbers are the real CNC Drilling
 * day shift on the demo account, Thursday 22 October 2026: OEE 32.2 %,
 * availability 77.9 %, performance 50.6 %, 181 parts made and 33 rejected, and
 * the top stop reasons by minutes. E-codes are the machine's own and stay
 * as configured; the plain reasons are translated on the Danish page.
 */
export type OeeDemo = {
  tabs: string[]
  machineLabel: string
  machine: string
  shift: string
  availability: string
  performance: string
  oee: string
  runTime: string
  /** The shift's run time, written the local way. */
  runHours: string
  stops: string
  produced: string
  rejected: string
  timeline: string
  runningSegment: string
  distribution: string
  minutesAxis: string
  /** Word after the stop count in the hover tooltip ("2 stops"). */
  stopsUnit: string
  reasons: {
    e2000: string
    e1001: string
    noReg: string
    breaktime: string
    maintenance: string
    qa: string
    missing: string
  }
}

const reasons = {
  e2000: "E2000: Undefined M-code",
  e1001: "E1001: Illegal axis command",
  noReg: "No Registration",
  breaktime: "Breaktime",
  maintenance: "Maintenance",
  qa: "QA Check",
  missing: "Missing Material",
}

const reasonsDa = {
  e2000: "E2000: Undefined M-code",
  e1001: "E1001: Illegal axis command",
  noReg: "Ingen registrering",
  breaktime: "Pause",
  maintenance: "Vedligehold",
  qa: "QA-tjek",
  missing: "Mangler materiale",
}

export const oeeReplay: Record<"en" | "da", ReplayContent<OeeDemo>> = {
  en: {
    label:
      "Animation: the OEE report for the CNC Drilling day shift fills in. Availability 77.9 %, performance 50.6 % and OEE 32.2 %, the timeline of running and stops, the stop distribution, and a hover showing that E2000: Undefined M-code cost 47 minutes over 2 stops.",
    demo: {
      tabs: ["Report", "KPIs", "Stop Event Information", "Order Information", "Manual Log"],
      machineLabel: "Machine:",
      machine: "CNC Drilling",
      shift: "Day shift, Thu 22 Oct",
      availability: "Availability",
      performance: "Performance",
      oee: "OEE",
      runTime: "Run time",
      runHours: "5.96 h",
      stops: "Stops",
      produced: "Produced",
      rejected: "Rejected",
      timeline: "Timeline Chart",
      runningSegment: "Running",
      distribution: "Stop Distribution",
      minutesAxis: "Minutes",
      stopsUnit: "stops",
      reasons,
    },
    showcaseTitle: "The OEE report, shift by shift",
    showcases: [
      {
        title: "Three numbers and the shift behind them",
        body: "Availability, performance and OEE on top. Below them the timeline shows when the machine ran and when it stood still, and the stop distribution shows which reasons cost the most.",
        image: "/images/replays/oee/shift-report.webp",
        alt: "An OEE report with gauges for availability, performance and OEE, a timeline chart over 24 hours and the stop distribution by reason",
      },
      {
        title: "Every stop on a line of its own",
        body: "Start, end, duration, stop reason, category and tags. Filter by category or tag, download the list, or add a stop the machine did not catch.",
        image: "/images/replays/oee/stop-table.webp",
        alt: "The registered stop list for CNC Drilling, with Tool Error, Coolant Stop and Missing Material among the stops",
      },
      {
        title: "The same timeline on the floor",
        body: "The operator panel shows the shift's timeline and parts per hour next to the machine. The team sees the stops while there is still time to act on them.",
        image: "/images/replays/oee/panel-timeline.webp",
        alt: "The operator panel with stop buttons for maintenance, QA check, break and missing material, a parts per hour chart and the production timeline",
      },
    ],
  },
  da: {
    label:
      "Animation: OEE-rapporten for dagskiftet på CNC Drilling bygger sig selv op. Tilgængelighed 77,9 %, ydelse 50,6 % og OEE 32,2 %, tidslinjen med drift og stop, stopfordelingen, og musen peger på E2000: Undefined M-code, som kostede 47 minutter over 2 stop.",
    demo: {
      tabs: ["Rapport", "KPI'er", "Stophændelser", "Ordrer", "Manuel log"],
      machineLabel: "Maskine:",
      machine: "CNC Drilling",
      shift: "Dagskift, tor 22. okt",
      availability: "Tilgængelighed",
      performance: "Ydelse",
      oee: "OEE",
      runTime: "Driftstid",
      runHours: "5,96 t",
      stops: "Stop",
      produced: "Produceret",
      rejected: "Kassation",
      timeline: "Tidslinje",
      runningSegment: "Kører",
      distribution: "Stopfordeling",
      minutesAxis: "Minutter",
      stopsUnit: "stop",
      reasons: reasonsDa,
    },
    showcaseTitle: "OEE-rapporten, skift for skift",
    showcases: [
      {
        title: "Tre tal og skiftet bag dem",
        body: "Tilgængelighed, ydelse og OEE øverst. Under dem viser tidslinjen, hvornår maskinen kørte, og hvornår den stod stille. Stopfordelingen viser, hvilke stopårsager der kostede mest.",
        image: "/images/replays/oee/shift-report.webp",
        alt: "En OEE-rapport med målere for tilgængelighed, ydelse og OEE, en tidslinje over døgnet og stopfordelingen pr. stopårsag",
      },
      {
        title: "Hvert stop på sin egen linje",
        body: "Start, slut, varighed, stopårsag, kategori og tags. Filtrér på kategori eller tag, hent listen ned, eller tilføj et stop, maskinen ikke selv fangede.",
        image: "/images/replays/oee/stop-table.webp",
        alt: "Listen over registrerede stop for CNC Drilling, blandt andet Tool Error, Coolant Stop og Missing Material",
      },
      {
        title: "Den samme tidslinje ude på gulvet",
        body: "Operatørpanelet viser skiftets tidslinje og emner i timen lige ved maskinen. Så ser holdet stoppene, mens der stadig er tid til at gøre noget ved dem.",
        image: "/images/replays/oee/panel-timeline.webp",
        alt: "Operatørpanelet med stopknapper til vedligehold, QA-tjek, pause og manglende materiale, en graf over emner i timen og tidslinjen",
      },
    ],
  },
}
