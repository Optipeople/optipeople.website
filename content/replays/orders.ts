import type { ReplayContent } from "./types"

/**
 * Copy for the Orders module replay (components/replays/orders-replay.tsx) and
 * the screenshots after it. Order B01-S65, the machines and the counts are
 * from the demo account in October 2026: B01-S65 ran on CNC Robot in the Day
 * shift with roughly one part in six rejected. The other order numbers and
 * the item names are made up in the same style.
 */

type Priority = "urgent" | "high" | "normal"
type Status = "planned" | "ready" | "inProgress"

export type OrderRow = {
  order: string
  product: string
  qty: number
  station: string
  priority: Priority
  status: Status
}

/** Text inside the order list and the operator panel. */
export type OrdersDemo = {
  title: string
  filters: { all: string; ready: string; inProgress: string }
  cols: { priority: string; order: string; product: string; qty: string; station: string; status: string }
  priorities: Record<Priority, string>
  statuses: Record<Status | "completed", string>
  /** The orders already in the list. */
  rows: OrderRow[]
  /** The order that arrives from the ERP and gets run. */
  incoming: Omit<OrderRow, "status">
  /** Final counts on the incoming order. */
  good: number
  rejected: number
  erpSynced: string
  erpIncoming: string
  erpReported: string
  reportedLine: string
  goodLabel: string
  rejectedLabel: string
  machine: string
  shift: string
  panelOrders: string
  start: string
  running: string
  completed: string
  ofLabel: string
}

const rowsEn: OrderRow[] = [
  { order: "B01-S57", product: "Bracket, steel", qty: 120, station: "CNC Drilling", priority: "high", status: "inProgress" },
  { order: "B01-S58", product: "Flange plate", qty: 40, station: "CNC Robot", priority: "high", status: "ready" },
  { order: "B01-S59", product: "Housing, aluminium", qty: 80, station: "Packing Line", priority: "normal", status: "planned" },
  { order: "B01-S61", product: "Shaft 40 mm", qty: 200, station: "Drying oven", priority: "normal", status: "planned" },
]

const rowsDa: OrderRow[] = [
  { order: "B01-S57", product: "Beslag, stål", qty: 120, station: "CNC Drilling", priority: "high", status: "inProgress" },
  { order: "B01-S58", product: "Flangeplade", qty: 40, station: "CNC Robot", priority: "high", status: "ready" },
  { order: "B01-S59", product: "Hus, aluminium", qty: 80, station: "Packing Line", priority: "normal", status: "planned" },
  { order: "B01-S61", product: "Aksel 40 mm", qty: 200, station: "Drying oven", priority: "normal", status: "planned" },
]

export const ordersReplay: Record<"en" | "da", ReplayContent<OrdersDemo>> = {
  en: {
    label:
      "Animation of the Orders module: order B01-S65 arrives from the ERP at the top of the work order list, the operator picks it on the panel at CNC Robot and starts it, good and rejected parts count up to 60 and 12, the order flips to Completed, and the result is reported back to the ERP.",
    demo: {
      title: "Work orders",
      filters: { all: "All", ready: "Ready to start", inProgress: "In progress" },
      cols: { priority: "Priority", order: "Order", product: "Product", qty: "Qty", station: "Station", status: "Status" },
      priorities: { urgent: "Urgent", high: "High", normal: "Normal" },
      statuses: { planned: "Planned", ready: "Ready", inProgress: "In progress", completed: "Completed" },
      rows: rowsEn,
      incoming: { order: "B01-S65", product: "Bracket, steel", qty: 60, station: "CNC Robot", priority: "urgent" },
      good: 60,
      rejected: 12,
      erpSynced: "ERP synced 06:00",
      erpIncoming: "1 new order from ERP",
      erpReported: "Reported back to ERP",
      reportedLine: "Sent to ERP",
      goodLabel: "Good",
      rejectedLabel: "Rejected",
      machine: "CNC Robot",
      shift: "Day shift",
      panelOrders: "Orders for this machine",
      start: "Start order",
      running: "Running",
      completed: "Completed",
      ofLabel: "of",
    },
    showcaseTitle: "What the floor reports, the office gets",
    showcases: [
      {
        title: "Start and stop where the work happens",
        body: "The panel at the machine shows the state, the stop buttons the operator actually uses, and parts per hour through the shift. Every start and stop is tied to the running order, so the order carries its own run time and stops.",
        image: "/images/replays/orders/operator-panel.webp",
        alt: "The operator panel for CNC Drilling: machine running, stop buttons for maintenance, QA check, setup and break, parts per hour and the shift timeline",
      },
      {
        title: "Good parts and scrap, counted by the machine",
        body: "Quantities come from the part counter, not from a figure typed in at the end of the shift. The same numbers fill the production report, per day, per shift and per hour, and they are what goes back to the ERP.",
        image: "/images/replays/orders/production-counters.webp",
        alt: "Production counter report for CNC Drilling: 3,685 produced and 770 rejected in a week, with counts per day and per hour",
      },
    ],
  },
  da: {
    label:
      "Animation af ordremodulet: ordre B01-S65 kommer fra ERP og lander øverst i ordrelisten, operatøren vælger den på panelet ved CNC Robot og starter den, gode og kasserede emner tæller op til 60 og 12, ordren skifter til Færdig, og resultatet bliver meldt tilbage til ERP.",
    demo: {
      title: "Arbejdsordrer",
      filters: { all: "Alle", ready: "Klar til start", inProgress: "I gang" },
      cols: { priority: "Prioritet", order: "Ordre", product: "Vare", qty: "Antal", station: "Station", status: "Status" },
      priorities: { urgent: "Haster", high: "Høj", normal: "Normal" },
      statuses: { planned: "Planlagt", ready: "Klar", inProgress: "I gang", completed: "Færdig" },
      rows: rowsDa,
      incoming: { order: "B01-S65", product: "Beslag, stål", qty: 60, station: "CNC Robot", priority: "urgent" },
      good: 60,
      rejected: 12,
      erpSynced: "ERP opdateret 06:00",
      erpIncoming: "1 ny ordre fra ERP",
      erpReported: "Meldt tilbage til ERP",
      reportedLine: "Sendt til ERP",
      goodLabel: "Gode",
      rejectedLabel: "Kassation",
      machine: "CNC Robot",
      shift: "Dagskift",
      panelOrders: "Ordrer til maskinen",
      start: "Start ordre",
      running: "Kører",
      completed: "Færdig",
      ofLabel: "af",
    },
    showcaseTitle: "Det, gulvet melder, får kontoret",
    showcases: [
      {
        title: "Start og stop dér, hvor arbejdet sker",
        body: "Panelet ved maskinen viser, om den kører, de stopknapper, operatøren faktisk bruger, og emner i timen hen over skiftet. Hver start og hvert stop hænger på den ordre, der kører. Så har ordren sin egen køretid og sine egne stop med.",
        image: "/images/replays/orders/operator-panel.webp",
        alt: "Operatørpanelet til CNC Drilling: maskinen kører, stopknapper til vedligehold, kvalitetstjek, omstilling og pause, emner i timen og skiftets tidslinje",
      },
      {
        title: "Gode emner og kassation, talt af maskinen",
        body: "Antallet kommer fra tælleren på maskinen, ikke fra et tal, nogen skriver ind, når skiftet er slut. De samme tal står i produktionsrapporten pr. dag, pr. skift og pr. time. Og det er dem, der går tilbage til ERP.",
        image: "/images/replays/orders/production-counters.webp",
        alt: "Produktionsrapport for CNC Drilling: 3.685 produceret og 770 kasseret på en uge, med antal pr. dag og pr. time",
      },
    ],
  },
}
