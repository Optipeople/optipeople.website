import type { ReplayContent } from "./types"

/**
 * Copy for the Quality module replay (components/replays/quality-replay.tsx)
 * and the screenshots that follow it.
 *
 * Machine, order, shift names and the stop reasons are the demo account's
 * (October 2026): CNC Drilling runs order B01-S60 on the Day shift, QA Check is
 * one of its quality stops, and the Evening shift takes over after Day. The
 * reject numbers sit in the range the account reports (quality around 78 to
 * 85% per shift).
 */
export type QualityDemo = {
  machine: string
  order: string
  shift: string
  running: string
  stopped: string
  produced: string
  rejected: string
  quality: string
  stopsTitle: string
  /** Four stop reasons on the panel; the second is the one the operator picks. */
  reasons: [string, string, string, string]
  select: string
  scrapTitle: string
  scrapUnits: string
  causeLabel: string
  /** Three scrap causes; the first is the one the operator picks. */
  causes: [string, string, string]
  notePlaceholder: string
  /** Typed by the operator. */
  note: string
  register: string
  saved: string
  reportTabs: string[]
  qualityGauge: string
  stopEvents: string
  earlierStop: { time: string; reason: string; category: string }
  qaStop: { time: string; reason: string; category: string }
  taskType: string
  taskTitle: string
  assignedTo: string
  nextShift: string
  open: string
}

export const qualityReplay: Record<"en" | "da", ReplayContent<QualityDemo>> = {
  en: {
    label:
      "The operator at CNC Drilling stops for a QA check, registers 4 scrapped parts with a cause and a note, the quality rate on the report drops from 84.5% to 77.6%, and a deviation task goes to the Evening shift.",
    demo: {
      machine: "CNC Drilling",
      order: "B01-S60",
      shift: "Day",
      running: "Running",
      stopped: "Stopped",
      produced: "Produced",
      rejected: "Scrapped",
      quality: "Quality",
      stopsTitle: "Stops",
      reasons: ["Tool error", "QA check", "Missing material", "Maintenance"],
      select: "Select",
      scrapTitle: "Register scrap",
      scrapUnits: "Scrapped units",
      causeLabel: "Cause",
      causes: ["Burr on hole", "Wrong diameter", "Scratches"],
      notePlaceholder: "Add a note",
      note: "Burr on holes 3 and 4. Drill looks worn.",
      register: "Register",
      saved: "4 scrapped parts registered on B01-S60",
      reportTabs: ["Report", "KPIs", "Stop events", "Orders"],
      qualityGauge: "Quality, Day shift",
      stopEvents: "Stop events",
      earlierStop: { time: "07:56", reason: "Tool error", category: "Machine" },
      qaStop: { time: "10:41", reason: "QA check", category: "Quality" },
      taskType: "Deviation",
      taskTitle: "Burr on drilled holes, order B01-S60",
      assignedTo: "Quality technician",
      nextShift: "Evening shift sees it at start",
      open: "Open",
    },
    showcaseTitle: "The same quality data, in the real app",
    showcases: [
      {
        title: "The note stays with the stop",
        body: "When parts get scrapped, the operator says why on the panel. The next shift opens the stop list and reads it, with the machine's own readings from that moment next to it.",
        image: "/images/replays/quality/stop-notes.webp",
        alt: "Stops on the operator panel with the operator's note about scrapped units and the tool temperature and spindle speed at the time",
      },
      {
        title: "Quality checks show up as lost time",
        body: "A QA check is a stop like any other, so it lands in the timeline and the stop distribution. You see how often it happens and what it costs the shift.",
        image: "/images/replays/quality/stop-distribution.webp",
        alt: "OEE report with gauges, the shift timeline and a stop distribution led by QA Check",
      },
      {
        title: "Quality types and results in your own lists",
        body: "Set up the checks and scrap causes that fit your production. Every result is stored with machine, order, item and operator.",
        image: "/images/replays/quality/quality-lists.webp",
        alt: "Lists in OptiPeople Data Platform including Quality Control Results and Quality Control Types",
      },
    ],
  },
  da: {
    label:
      "Operatøren ved CNC Drilling stopper til kvalitetstjek, registrerer 4 kasserede emner med årsag og en note, kvaliteten i rapporten falder fra 84,5 % til 77,6 %, og en afvigelse bliver sendt videre til aftenholdet.",
    demo: {
      machine: "CNC Drilling",
      order: "B01-S60",
      shift: "Dag",
      running: "Kører",
      stopped: "Stoppet",
      produced: "Produceret",
      rejected: "Kasseret",
      quality: "Kvalitet",
      stopsTitle: "Stop",
      reasons: ["Værktøjsfejl", "Kvalitetstjek", "Mangler materiale", "Vedligehold"],
      select: "Vælg",
      scrapTitle: "Registrer kassation",
      scrapUnits: "Kasserede emner",
      causeLabel: "Årsag",
      causes: ["Grat i hul", "Forkert diameter", "Ridser"],
      notePlaceholder: "Skriv en note",
      note: "Grat i hul 3 og 4. Boret ser slidt ud.",
      register: "Registrer",
      saved: "4 kasserede emner registreret på B01-S60",
      reportTabs: ["Rapport", "KPI'er", "Stop", "Ordrer"],
      qualityGauge: "Kvalitet, dagholdet",
      stopEvents: "Stop",
      earlierStop: { time: "07:56", reason: "Værktøjsfejl", category: "Maskine" },
      qaStop: { time: "10:41", reason: "Kvalitetstjek", category: "Kvalitet" },
      taskType: "Afvigelse",
      taskTitle: "Grat i borede huller, ordre B01-S60",
      assignedTo: "Kvalitetstekniker",
      nextShift: "Aftenholdet ser den, når de møder ind",
      open: "Åben",
    },
    showcaseTitle: "De samme kvalitetsdata i den rigtige app",
    showcases: [
      {
        title: "Noten følger stoppet",
        body: "Når der bliver kasseret, skriver operatøren på panelet, hvorfor. Næste hold åbner stoplisten og læser det, med maskinens egne målinger fra det øjeblik ved siden af.",
        image: "/images/replays/quality/stop-notes.webp",
        alt: "Stop på operatørpanelet med operatørens note om kasserede emner og værktøjstemperatur og spindelhastighed fra samme tidspunkt",
      },
      {
        title: "Kvalitetstjek tæller som tabt tid",
        body: "Et kvalitetstjek er et stop som alle andre. Det lander på tidslinjen og i stopfordelingen, så I kan se, hvor tit det sker, og hvad det koster holdet.",
        image: "/images/replays/quality/stop-distribution.webp",
        alt: "OEE-rapport med målere, tidslinjen for skiftet og en stopfordeling, hvor QA Check ligger øverst",
      },
      {
        title: "Jeres egne kontroller og resultater",
        body: "Sæt de kontroller og kassationsårsager op, der passer til jeres produktion. Hvert resultat bliver gemt med maskine, ordre, vare og operatør.",
        image: "/images/replays/quality/quality-lists.webp",
        alt: "Lister i OptiPeople Data Platform, blandt andet Quality Control Results og Quality Control Types",
      },
    ],
  },
}
