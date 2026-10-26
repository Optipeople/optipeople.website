import type { ReplayContent } from "./types"

/**
 * Copy for the energy replay (components/replays/energy-replay.tsx) on the EMS
 * module page.
 *
 * The shift is real: CNC Robot's Day shift on the demo account, 06:00 to
 * 17:00 on 26 October 2026, with its real stops (the 13:36 Missing Material
 * stop that ran straight into a Critical Malfunction until 14:15) and its real
 * output, 189 good parts. The demo meter reads 20 to 30 on its Watt parameter,
 * so the replay draws about 22 kW running and 11 kW standing still; the kWh
 * figures follow from those and the stop minutes. Price per kWh is 1.40 kr.
 *
 * The showcase pictures are real captures from the demo account.
 */

export type EnergyDemo = {
  tabs: string[]
  /** The report template picked, shown like "Production Counters" in the app. */
  template: string
  machineLabel: string
  machine: string
  shift: string
  kwhLabel: string
  kwh: string
  partsLabel: string
  parts: string
  perPartLabel: string
  perPart: string
  perPartSum: string
  chartTitle: string
  timelineTitle: string
  running: string
  stopped: string
  idleButton: string
  idleTitle: string
  idleWhen: string
  idleFacts: string[]
  shiftIdle: string
}

export const energyReplay: Record<"en" | "da", ReplayContent<EnergyDemo>> = {
  en: {
    label:
      "Animation of the energy report for CNC Robot's day shift: kWh per hour builds up next to the running and stopped timeline, the view divides 222 kWh by 189 good parts to get 1.18 kWh per good part, then highlights 39 minutes where the robot stood still but kept drawing 11 kW.",
    demo: {
      tabs: ["Report", "KPIs", "Stop Event Information", "Order Information"],
      template: "Energy",
      machineLabel: "Machine:",
      machine: "CNC Robot",
      shift: "Day shift, 26 Oct, 06:00 to 17:00",
      kwhLabel: "Energy this shift",
      kwh: "222",
      partsLabel: "Good parts",
      parts: "189",
      perPartLabel: "kWh per good part",
      perPart: "1.18",
      perPartSum: "222 kWh / 189 good parts",
      chartTitle: "kWh per hour",
      timelineTitle: "Production timeline",
      running: "Running",
      stopped: "Stopped",
      idleButton: "Show idle consumption",
      idleTitle: "Stopped, still drawing power",
      idleWhen: "13:36 to 14:15 · Missing Material, Critical Malfunction",
      idleFacts: ["11 kW while stopped", "7.1 kWh", "DKK 9.94 at 1.40/kWh"],
      shiftIdle: "Idle this shift: 107 min, 19.6 kWh, DKK 27.44",
    },
    showcaseTitle: "Where the energy numbers come from",
    showcases: [
      {
        title: "The timeline every kWh is laid against",
        body: "The operator panel already records when the machine runs, stops and why. That same timeline is what the energy view lines the meter up with, so a spike or a flat line always has a state next to it.",
        image: "/images/replays/energy/operator-panel-timeline.webp",
        alt: "The CNC Drilling operator panel with stop buttons, units per hour and the production timeline for the day shift",
      },
      {
        title: "Every stop, with a start and an end",
        body: "Each stop is registered with its reason and the exact minutes. Hold those minutes up against the meter, and you can see which stops cost power and which ones the machine actually powered down for.",
        image: "/images/replays/energy/stop-events.webp",
        alt: "The registered stops report for CNC Drilling, listing start, end, duration, reason and category for each stop",
      },
      {
        title: "Good parts, not just kWh",
        body: "The counters say how many parts were made and how many were rejected. Divide the shift's energy by the good ones, and you get a figure you can compare across shifts, orders and machines.",
        image: "/images/replays/energy/production-counters.webp",
        alt: "The production counters report for CNC Drilling showing 541 produced and 109 rejected in a day, with parts per hour",
      },
    ],
  },
  da: {
    label:
      "Animation af energirapporten for CNC Robots dagskift: kWh pr. time bygges op ved siden af tidslinjen for kørsel og stop. Så deler den 222 kWh med 189 gode emner og får 1,18 kWh pr. godt emne. Til sidst fremhæver den 39 minutter, hvor robotten stod stille, men stadig trak 11 kW.",
    demo: {
      tabs: ["Rapport", "KPI'er", "Stophændelser", "Ordrer"],
      template: "Energi",
      machineLabel: "Maskine:",
      machine: "CNC Robot",
      shift: "Dagskift, 26. okt., 06:00 til 17:00",
      kwhLabel: "Energi i skiftet",
      kwh: "222",
      partsLabel: "Gode emner",
      parts: "189",
      perPartLabel: "kWh pr. godt emne",
      perPart: "1,18",
      perPartSum: "222 kWh / 189 gode emner",
      chartTitle: "kWh pr. time",
      timelineTitle: "Produktionens tidslinje",
      running: "Kører",
      stopped: "Stop",
      idleButton: "Vis tomgangsforbrug",
      idleTitle: "Står stille, men trækker strøm",
      idleWhen: "13:36 til 14:15 · Manglende materiale, kritisk fejl",
      idleFacts: ["11 kW under stoppet", "7,1 kWh", "9,94 kr. ved 1,40 kr./kWh"],
      shiftIdle: "Tomgang i skiftet: 107 min, 19,6 kWh, 27,44 kr.",
    },
    showcaseTitle: "Her kommer energitallene fra",
    showcases: [
      {
        title: "Tidslinjen, hver kWh bliver holdt op mod",
        body: "Operatørpanelet registrerer allerede, hvornår maskinen kører, står stille og hvorfor. Det er den samme tidslinje, energivisningen lægger måleren op ad. Så har en top eller en flad streg altid en tilstand ved siden af sig.",
        image: "/images/replays/energy/operator-panel-timeline.webp",
        alt: "Operatørpanelet for CNC Drilling med stopknapper, emner pr. time og dagskiftets tidslinje",
      },
      {
        title: "Hvert stop, med start og slut",
        body: "Hvert stop bliver registreret med årsag og de præcise minutter. Hold minutterne op mod måleren, så kan I se, hvilke stop der koster strøm, og under hvilke maskinen faktisk var slukket.",
        image: "/images/replays/energy/stop-events.webp",
        alt: "Rapporten over registrerede stop for CNC Drilling med start, slut, varighed, årsag og kategori for hvert stop",
      },
      {
        title: "Gode emner, ikke kun kWh",
        body: "Tællerne viser, hvor mange emner der blev lavet, og hvor mange der blev kasseret. Del skiftets energi med de gode, så har I et tal, I kan sammenligne på tværs af skift, ordrer og maskiner.",
        image: "/images/replays/energy/production-counters.webp",
        alt: "Rapporten over produktionstællere for CNC Drilling med 541 producerede og 109 kasserede på en dag og emner i timen",
      },
    ],
  },
}
