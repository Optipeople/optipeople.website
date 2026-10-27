import type { ReplayContent } from "./types"

/**
 * Copy for the Modular MES replay (components/replays/mes-replay.tsx): an
 * order run on the operator panel. B01-S60 is a real order on CNC Drilling in
 * the demo account; its runs make a part about every 2 minutes 15 seconds with
 * close to one in five rejected, which is what the counter plays. The queued
 * orders are made up in the same pattern.
 */
export type MesDemo = {
  machine: string
  stamp: string
  ordersTitle: string
  orders: { id: string; qty: number; item: string }[]
  pcs: string
  start: string
  orderLabel: string
  running: string
  produced: string
  rejected: string
  cycle: string
  target: string
  complete: string
  next: string
  queued: string
}

const orders = [
  { id: "B01-S60", qty: 60, item: "Bracket S60" },
  { id: "B02-S40", qty: 40, item: "Bracket S40" },
  { id: "B03-S24", qty: 24, item: "Flange S24" },
]

export const mesReplay: Record<"en" | "da", ReplayContent<MesDemo>> = {
  en: {
    label:
      "Animation: on the operator panel for CNC Drilling the operator picks order B01-S60 and starts it, the part counter climbs to 60 of 60 with the cycle time and rejects beside it, the order completes and B02-S40 is queued next.",
    demo: {
      machine: "CNC Drilling",
      stamp: "Thu Oct 22 10:12",
      ordersTitle: "Orders",
      orders,
      pcs: "pcs",
      start: "Start order",
      orderLabel: "Order",
      running: "Running",
      produced: "Produced",
      rejected: "Rejected",
      cycle: "Cycle time",
      target: "Target",
      complete: "Order complete",
      next: "Next",
      queued: "Queued",
    },
    showcaseTitle: "From order to finished parts",
    showcases: [
      {
        title: "The counter next to the machine",
        body: "The panel shows the machine's state, the part counter and parts per hour through the shift. The operator sees at a glance whether the order keeps pace.",
        image: "/images/replays/mes/panel-counter.webp",
        alt: "The operator panel for CNC Drilling: running, all stops registered, performance at 48 and a parts per hour chart from 06:00 to 14:00",
      },
      {
        title: "Produced and rejected, day by day",
        body: "The counter report adds up good and rejected parts per day, shift or hour for any period, with average and trend lines when you need them.",
        image: "/images/replays/mes/production-counters.webp",
        alt: "The production counter report for CNC Drilling: 541 produced and 109 rejected in a day, and parts per hour",
      },
      {
        title: "The week in eight numbers",
        body: "OEE, availability, performance, quality, parts produced, working hours, interruptions and unplanned stop time for one machine, with the trend underneath.",
        image: "/images/replays/mes/mes-efficiency.webp",
        alt: "An MES efficiency report for CNC Drilling over seven days: OEE 30.8 %, 2,751 parts, 129 interruptions and performance over time",
      },
    ],
  },
  da: {
    label:
      "Animation: på operatørpanelet for CNC Drilling vælger operatøren ordre B01-S60 og starter den. Tælleren går op til 60 af 60 med cyklustid og kassation ved siden af, ordren bliver færdig, og B02-S40 står klar som den næste.",
    demo: {
      machine: "CNC Drilling",
      stamp: "tor 22. okt 10:12",
      ordersTitle: "Ordrer",
      orders,
      pcs: "stk",
      start: "Start ordre",
      orderLabel: "Ordre",
      running: "Kører",
      produced: "Produceret",
      rejected: "Kassation",
      cycle: "Cyklustid",
      target: "Mål",
      complete: "Ordren er færdig",
      next: "Næste",
      queued: "Klar",
    },
    showcaseTitle: "Fra ordre til færdige emner",
    showcases: [
      {
        title: "Tælleren ved maskinen",
        body: "Panelet viser maskinens status, tælleren og emner i timen gennem skiftet. Operatøren kan se med det samme, om ordren holder tempoet.",
        image: "/images/replays/mes/panel-counter.webp",
        alt: "Operatørpanelet for CNC Drilling: maskinen kører, alle stop er registreret, performance står på 48, og en graf viser emner i timen fra 06:00 til 14:00",
      },
      {
        title: "Produceret og kasseret, dag for dag",
        body: "Tællerrapporten lægger gode og kasserede emner sammen pr. dag, skift eller time for den periode, I vælger. Gennemsnit og trend er et klik væk.",
        image: "/images/replays/mes/production-counters.webp",
        alt: "Tællerrapporten for CNC Drilling: 541 produceret og 109 kasseret på en dag, og emner i timen",
      },
      {
        title: "Ugen i otte tal",
        body: "OEE, tilgængelighed, ydelse, kvalitet, producerede emner, arbejdstimer, afbrydelser og uplanlagt stoptid for én maskine, med udviklingen nedenunder.",
        image: "/images/replays/mes/mes-efficiency.webp",
        alt: "En MES-rapport for CNC Drilling over syv dage: OEE 30,8 %, 2.751 emner, 129 afbrydelser og ydelsen over tid",
      },
    ],
  },
}
