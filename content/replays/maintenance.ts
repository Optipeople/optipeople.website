import type { ReplayContent } from "./types"

/**
 * Copy for the Maintenance module replay
 * (components/replays/maintenance-replay.tsx) and the screenshots after it.
 *
 * CNC Robot, its order B01-S65 and the stop reasons are the demo account's
 * (October 2026). Critical Malfunction on CNC Robot averages about 12 minutes a
 * stop there, so the replay's 14 minutes of downtime is a typical one. The task
 * fields (type One Time, target Machine, priority, the Maintenance tag) are the
 * columns of the real Tasks Management screen. The task goes to a role, never a
 * named person.
 */
export type MaintenanceDemo = {
  machine: string
  order: string
  shift: string
  running: string
  stopped: string
  stopsTitle: string
  /** Six stop reasons on the panel; the third is the one the operator picks. */
  reasons: [string, string, string, string, string, string]
  waiting: string
  taskSent: string
  backRunning: string
  downtime: string
  windowTitle: string
  tabs: [string, string, string]
  /** A task already on the list, for context. */
  existing: { name: string; type: string; priority: string }
  taskName: string
  taskType: string
  target: string
  priority: string
  tag: string
  assignedTo: string
  fromStop: string
  checklist: [string, string, string]
  status: { open: string; inProgress: string; done: string }
  markDone: string
}

export const maintenanceReplay: Record<"en" | "da", ReplayContent<MaintenanceDemo>> = {
  en: {
    label:
      "CNC Robot stops with a critical malfunction, the operator registers it on the panel, a critical maintenance task is created for the maintenance technician role, its checklist is ticked off, the task is marked done and the robot runs again after 14 minutes.",
    demo: {
      machine: "CNC Robot",
      order: "B01-S65",
      shift: "Day",
      running: "Running",
      stopped: "Stopped",
      stopsTitle: "Stops",
      reasons: ["Software issue", "Maintenance", "Critical malfunction", "Coolant stop", "Tool error", "Missing material"],
      waiting: "Waiting for maintenance",
      taskSent: "Task sent to Maintenance technician",
      backRunning: "Back running",
      downtime: "Downtime 14 min",
      windowTitle: "Tasks Management",
      tabs: ["Tasks", "Queue", "Finished"],
      existing: { name: "Initial steps before producing", type: "Unit counter reached", priority: "High" },
      taskName: "Critical malfunction on CNC Robot",
      taskType: "One time",
      target: "Machine · CNC Robot",
      priority: "Critical",
      tag: "Maintenance",
      assignedTo: "Maintenance technician",
      fromStop: "From stop 10:42",
      checklist: ["Lock out the robot cell", "Check gripper and air hose", "Test run 5 parts"],
      status: { open: "Open", inProgress: "In progress", done: "Done" },
      markDone: "Mark done",
    },
    showcaseTitle: "Maintenance in the real app",
    showcases: [
      {
        title: "Every stop with its reason and tags",
        body: "Stops come in with the reason the operator picked and tags such as Service critical or Operator maintenance. Maintenance filters on them instead of asking around the floor.",
        image: "/images/replays/maintenance/stop-events.webp",
        alt: "Registered stops for CNC Drilling with Critical Malfunction tagged Service critical and Coolant Stop tagged Operator Maintenance",
      },
      {
        title: "Planned maintenance is one tap on the panel",
        body: "When the machine goes into maintenance, the operator starts it from the panel. The time is booked as maintenance, not as an unexplained stop.",
        image: "/images/replays/maintenance/panel-stops.webp",
        alt: "Operator panel for CNC Drilling with Maintenance, QA Check, Setup and Breaktime buttons",
      },
      {
        title: "Spare parts next to the tasks",
        body: "Keep spare parts and service parts as lists in the same platform, so the task and the part it needs sit in one place.",
        image: "/images/replays/maintenance/spare-parts.webp",
        alt: "Lists in OptiPeople Data Platform including Spareparts and Spareparts service",
      },
    ],
  },
  da: {
    label:
      "CNC Robot stopper med en kritisk fejl, operatøren registrerer det på panelet, en kritisk vedligeholdsopgave bliver oprettet til rollen vedligeholdstekniker, tjeklisten bliver krydset af, opgaven meldes færdig, og robotten kører igen efter 14 minutter.",
    demo: {
      machine: "CNC Robot",
      order: "B01-S65",
      shift: "Dag",
      running: "Kører",
      stopped: "Stoppet",
      stopsTitle: "Stop",
      reasons: ["Softwarefejl", "Vedligehold", "Kritisk fejl", "Kølestop", "Værktøjsfejl", "Mangler materiale"],
      waiting: "Venter på vedligehold",
      taskSent: "Opgaven er sendt til vedligeholdsteknikeren",
      backRunning: "Kører igen",
      downtime: "Nedetid 14 min",
      windowTitle: "Opgaver",
      tabs: ["Opgaver", "Kø", "Færdige"],
      existing: { name: "Opstart før produktion", type: "Tæller nået", priority: "Høj" },
      taskName: "Kritisk fejl på CNC Robot",
      taskType: "Én gang",
      target: "Maskine · CNC Robot",
      priority: "Kritisk",
      tag: "Vedligehold",
      assignedTo: "Vedligeholdstekniker",
      fromStop: "Fra stop kl. 10:42",
      checklist: ["Lås robotcellen af", "Tjek griber og luftslange", "Prøvekør 5 emner"],
      status: { open: "Åben", inProgress: "I gang", done: "Færdig" },
      markDone: "Meld færdig",
    },
    showcaseTitle: "Vedligehold i den rigtige app",
    showcases: [
      {
        title: "Hvert stop med årsag og tags",
        body: "Stoppene kommer ind med den årsag, operatøren valgte, og tags som Service critical eller Operator maintenance. Vedligehold filtrerer på dem i stedet for at spørge rundt på gulvet.",
        image: "/images/replays/maintenance/stop-events.webp",
        alt: "Registrerede stop på CNC Drilling, hvor Critical Malfunction er tagget Service critical og Coolant Stop er tagget Operator Maintenance",
      },
      {
        title: "Planlagt vedligehold er ét tryk på panelet",
        body: "Når maskinen skal have vedligehold, starter operatøren det fra panelet. Tiden bliver bogført som vedligehold og ikke som et stop, ingen kan forklare.",
        image: "/images/replays/maintenance/panel-stops.webp",
        alt: "Operatørpanel for CNC Drilling med knapper til Maintenance, QA Check, Setup og Breaktime",
      },
      {
        title: "Reservedele ved siden af opgaverne",
        body: "Hold reservedele og servicedele som lister i samme platform, så opgaven og den del, den kræver, ligger samme sted.",
        image: "/images/replays/maintenance/spare-parts.webp",
        alt: "Lister i OptiPeople Data Platform, blandt andet Spareparts og Spareparts service",
      },
    ],
  },
}
