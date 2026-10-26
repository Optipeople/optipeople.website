import type { ReplayContent } from "./types"

/**
 * Copy for the /platform hero replay (components/replays/platform-replay.tsx):
 * one stop registered on the operator panel, then the same stop in the OEE
 * report. Machine, shift and report numbers follow the CNC Drilling day shift
 * on the demo account (22 October 2026). The showcase images are crops of the
 * real captures in public/images/Mockups.
 */
export type PlatformDemo = {
  machine: string
  online: string
  running: string
  stopped: string
  reasonMissing: string
  produced: string
  registered: string
  stopsTitle: string
  stopTime: string
  /** The reason buttons on the panel's stop screen, in the order the panel shows them. */
  reasons: string[]
  /** Index into `reasons` of the one the operator taps. */
  picked: number
  select: string
  tabs: string[]
  machineLabel: string
  shift: string
  availability: string
  performance: string
  oee: string
  timeline: string
  runningSegment: string
  distribution: string
  /** Stop distribution labels; `coolant` must read the same as the picked reason. */
  report: { e2000: string; coolant: string; e1001: string; noReg: string }
  callout: string
  calloutFrom: string
}

export const platformReplay: Record<"en" | "da", ReplayContent<PlatformDemo>> = {
  en: {
    label:
      "Animation: CNC Drilling stops on the operator panel, the operator picks Coolant stop, and the same stop shows up in the OEE report as a new segment on the timeline, one more in the stop distribution, and lower availability and OEE.",
    demo: {
      machine: "CNC Drilling",
      online: "Online",
      running: "Running",
      stopped: "Stopped",
      reasonMissing: "Stop reason missing",
      produced: "Produced",
      registered: "Registered",
      stopsTitle: "Stops",
      stopTime: "Thu Oct 22 10:12",
      reasons: [
        "Software issue",
        "Critical malfunction",
        "Maintenance",
        "Coolant stop",
        "Power failure",
        "No registration",
        "QA Check",
        "Setup new order or item",
      ],
      picked: 3,
      select: "Select",
      tabs: ["Report", "KPIs", "Stop Event Information", "Order Information", "Manual Log"],
      machineLabel: "Machine:",
      shift: "Day shift, Thu 22 Oct",
      availability: "Availability",
      performance: "Performance",
      oee: "OEE",
      timeline: "Timeline Chart",
      runningSegment: "Running",
      distribution: "Stop Distribution",
      report: {
        e2000: "E2000: Undefined M-code",
        coolant: "Coolant stop",
        e1001: "E1001: Illegal axis command",
        noReg: "No registration",
      },
      callout: "Coolant stop, 10:12, 9 min",
      calloutFrom: "From the operator panel",
    },
    showcaseTitle: "One record, from the machine to the report",
    showcases: [
      {
        title: "The operator panel shows the shift as it happens",
        body: "State, counter, parts per hour and the production timeline for each machine, on a screen next to it. Setup and breaks are one tap, so the time lands in the right place from the start.",
        image: "/images/replays/platform/operator-panel.webp",
        alt: "The operator panel for CNC Drilling: running state, a counter at 188, parts per hour through the day and the production timeline",
      },
      {
        title: "The report reads the same record",
        body: "Availability, performance and OEE for any machine, week or shift. Every stop the operator registered sits on the timeline and in the stop distribution, and nobody types it in twice.",
        image: "/images/replays/platform/oee-report.webp",
        alt: "The OEE report for CNC Drilling with availability, performance and OEE gauges, the timeline chart and the stop distribution",
      },
      {
        title: "Every stop, with its reason and its minutes",
        body: "The stop list holds start, end, duration, category and tags for each stop. Fix one here, and the report follows.",
        image: "/images/replays/platform/stop-events.webp",
        alt: "The registered stop list for CNC Drilling with nine stops, their reasons, categories, tags and shift",
      },
    ],
  },
  da: {
    label:
      "Animation: CNC Drilling stopper på operatørpanelet, operatøren vælger Kølestop, og det samme stop dukker op i OEE-rapporten som et nyt felt på tidslinjen, ét stop mere i stopfordelingen og lavere tilgængelighed og OEE.",
    demo: {
      machine: "CNC Drilling",
      online: "Online",
      running: "Kører",
      stopped: "Stoppet",
      reasonMissing: "Mangler stopårsag",
      produced: "Produceret",
      registered: "Registreret",
      stopsTitle: "Stop",
      stopTime: "tor 22. okt 10:12",
      reasons: [
        "Softwarefejl",
        "Kritisk fejl",
        "Vedligehold",
        "Kølestop",
        "Strømsvigt",
        "Ingen registrering",
        "QA-tjek",
        "Omstilling til ny ordre",
      ],
      picked: 3,
      select: "Vælg",
      tabs: ["Rapport", "KPI'er", "Stophændelser", "Ordrer", "Manuel log"],
      machineLabel: "Maskine:",
      shift: "Dagskift, tor 22. okt",
      availability: "Tilgængelighed",
      performance: "Ydelse",
      oee: "OEE",
      timeline: "Tidslinje",
      runningSegment: "Kører",
      distribution: "Stopfordeling",
      report: {
        e2000: "E2000: Undefined M-code",
        coolant: "Kølestop",
        e1001: "E1001: Illegal axis command",
        noReg: "Ingen registrering",
      },
      callout: "Kølestop, 10:12, 9 min",
      calloutFrom: "Fra operatørpanelet",
    },
    showcaseTitle: "Én registrering, fra maskinen til rapporten",
    showcases: [
      {
        title: "Operatørpanelet viser skiftet, mens det kører",
        body: "Status, tæller, emner i timen og tidslinjen for hver maskine, på en skærm lige ved siden af. Omstilling og pause er ét tryk, så tiden lander det rigtige sted fra start.",
        image: "/images/replays/platform/operator-panel.webp",
        alt: "Operatørpanelet for CNC Drilling: maskinen kører, tælleren står på 188, emner i timen hen over dagen og tidslinjen",
      },
      {
        title: "Rapporten læser den samme registrering",
        body: "Tilgængelighed, ydelse og OEE for hver maskine, uge eller skift. Hvert stop, operatøren har registreret, ligger på tidslinjen og i stopfordelingen. Ingen skal taste det ind igen.",
        image: "/images/replays/platform/oee-report.webp",
        alt: "OEE-rapporten for CNC Drilling med målere for tilgængelighed, ydelse og OEE, tidslinjen og stopfordelingen",
      },
      {
        title: "Hvert stop med stopårsag og minutter",
        body: "Stoplisten har start, slut, varighed, kategori og tags for hvert stop. Retter I et stop her, følger rapporten med.",
        image: "/images/replays/platform/stop-events.webp",
        alt: "Listen over registrerede stop for CNC Drilling med ni stop, deres stopårsager, kategorier, tags og skift",
      },
    ],
  },
}
