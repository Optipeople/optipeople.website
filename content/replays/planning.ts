import type { ReplayContent } from "./types"

/**
 * Copy for the Planning module replay (components/replays/planning-replay.tsx)
 * and the screenshots after it. The route runs through the four machines on
 * the demo account (CNC Drilling, CNC Robot, Drying oven, Packing Line), and
 * the running order is B01-S65 with the 54 parts CNC Robot had counted on it
 * in the Day shift in October 2026. The other order numbers are made up in
 * the same style.
 */

/** Text inside the drawn production timeline. */
export type PlanningDemo = {
  tabs: string[]
  title: string
  routeCol: string
  /** Five working days across the board: weekday and date. */
  days: { day: string; date: string }[]
  backlog: string
  route: string
  machines: string[]
  /** Item names per order number, shown under the number on each bar. */
  products: Record<string, string>
  planEnd: string
  endBefore: string
  endAfter: string
  legend: { planned: string; inProgress: string; completed: string }
  hint: string
}

const machines = ["CNC Drilling", "CNC Robot", "Drying oven", "Packing Line"]

export const planningReplay: Record<"en" | "da", ReplayContent<PlanningDemo>> = {
  en: {
    label:
      "Animation of the Planning module: a new order lands in the backlog, the planner drags it onto CNC Robot right after the running order, the orders after it move along the route and the planned end moves from Friday 07:10 to 21:40, and the running order's progress fills as parts are counted.",
    demo: {
      tabs: ["Work orders", "Production timeline"],
      title: "Production timeline",
      routeCol: "Route / entity",
      days: [
        { day: "Mon", date: "2 Nov" },
        { day: "Tue", date: "3 Nov" },
        { day: "Wed", date: "4 Nov" },
        { day: "Thu", date: "5 Nov" },
        { day: "Fri", date: "6 Nov" },
      ],
      backlog: "Backlog",
      route: "Bracket line",
      machines,
      products: {
        "B01-S58": "Flange plate",
        "B01-S65": "Bracket, steel",
        "B01-S62": "Rush: bracket, steel",
        "B01-S63": "Housing, aluminium",
        "B01-S64": "Shaft 40 mm",
      },
      planEnd: "Plan ends",
      endBefore: "Fri 07:10",
      endAfter: "Fri 21:40",
      legend: { planned: "Planned", inProgress: "In progress", completed: "Completed" },
      hint: "Drag a bar to reschedule",
    },
    showcaseTitle: "The plan, as it looks in the app",
    showcases: [
      {
        title: "Every route on one board",
        body: "Each production route gets its own band, with one row per machine or workstation underneath. Drag a bar to move it in time, or up and down to another entity. The legend shows what is planned, ready, running, blocked or done, and how much time each order has actually used.",
        image: "/images/replays/planning/routes-board.webp",
        alt: "The production timeline with the aluminium facade route: CNC Cutter, Aluminium Saw, Hydraulic Press, Coating Line and Paint Line, and the status legend underneath",
      },
      {
        title: "Look weeks ahead, or zoom to the day",
        body: "Switch between day, week and month and scroll right to plan further out. Orders further down the line sit on the same board as today's work, so a rush order shows its knock-on effect before you commit to it.",
        image: "/images/replays/planning/weeks-ahead.webp",
        alt: "The production timeline scrolled two weeks ahead, with the Timeline, Day, Week and Month buttons and the orders planned for those weeks",
      },
    ],
  },
  da: {
    label:
      "Animation af planlægningsmodulet: en ny ordre lander i backloggen, planlæggeren trækker den ind på CNC Robot lige efter den ordre, der kører, ordrerne efter den rykker hen ad ruten, planen slutter fredag 21:40 i stedet for 07:10, og den kørende ordre fylder op, efterhånden som emnerne bliver talt.",
    demo: {
      tabs: ["Arbejdsordrer", "Produktionstidslinje"],
      title: "Produktionstidslinje",
      routeCol: "Rute / enhed",
      days: [
        { day: "Man", date: "2. nov" },
        { day: "Tir", date: "3. nov" },
        { day: "Ons", date: "4. nov" },
        { day: "Tor", date: "5. nov" },
        { day: "Fre", date: "6. nov" },
      ],
      backlog: "Backlog",
      route: "Beslaglinje",
      machines,
      products: {
        "B01-S58": "Flangeplade",
        "B01-S65": "Beslag, stål",
        "B01-S62": "Haster: beslag, stål",
        "B01-S63": "Hus, aluminium",
        "B01-S64": "Aksel 40 mm",
      },
      planEnd: "Planen slutter",
      endBefore: "Fre 07:10",
      endAfter: "Fre 21:40",
      legend: { planned: "Planlagt", inProgress: "I gang", completed: "Færdig" },
      hint: "Træk i en ordre for at flytte den",
    },
    showcaseTitle: "Planen, som den ser ud i programmet",
    showcases: [
      {
        title: "Alle ruter på én tavle",
        body: "Hver produktionsrute har sit eget bånd med en række pr. maskine eller arbejdsstation nedenunder. Træk en ordre frem eller tilbage i tid, eller op og ned til en anden enhed. Under tavlen kan I se, hvad der er planlagt, klar, i gang, gået i stå eller færdigt, og hvor lang tid hver ordre faktisk har brugt.",
        image: "/images/replays/planning/routes-board.webp",
        alt: "Produktionstidslinjen med ruten for aluminiumsfacader: CNC Cutter, Aluminium Saw, Hydraulic Press, Coating Line og Paint Line, og forklaringen på farverne nedenunder",
      },
      {
        title: "Se uger frem, eller zoom ind på dagen",
        body: "Skift mellem dag, uge og måned, og rul til højre for at planlægge længere frem. Ordrerne længere ude står på samme tavle som dagens arbejde. Så kan I se, hvad en hasteordre betyder for resten, før I lægger den ind.",
        image: "/images/replays/planning/weeks-ahead.webp",
        alt: "Produktionstidslinjen rullet to uger frem, med knapperne Timeline, Day, Week og Month og de ordrer, der er planlagt de uger",
      },
    ],
  },
}
