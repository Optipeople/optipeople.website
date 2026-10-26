import type { ReplayContent } from "./types"

/**
 * Copy for the Documents module replay
 * (components/replays/documents-replay.tsx) and the screenshots after it.
 *
 * CNC Drilling and order B01-S60 are the demo account's (October 2026). The
 * document names and revisions follow DocumentsVisual in
 * components/module-mockups.tsx, so the replay and the drawn visual further
 * down the page tell the same story.
 */
export type DocumentsDemo = {
  machine: string
  order: string
  shift: string
  running: string
  produced: string
  buttons: { stops: string; scrap: string; documents: string }
  listTitle: string
  docs: {
    instruction: string
    drawing: string
    setup: string
    certificate: string
  }
  current: string
  newBadge: string
  choose: string
  /** "{n}" and "{total}" are filled in. A string, not a function: the copy crosses into a client component. */
  stepOf: string
  /** Three steps of the work instruction; the third is the setup step. */
  steps: [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }]
  depthLabel: string
  revisedTitle: string
  revisedBody: string
  confirm: string
  confirmed: string
}

export const documentsReplay: Record<"en" | "da", ReplayContent<DocumentsDemo>> = {
  en: {
    label:
      "On the operator panel at CNC Drilling the operator opens the documents for order B01-S60, pages through the work instruction to the setup step, revision 5 is approved and replaces revision 4 on the spot with a new drill depth, and the operator confirms it as read.",
    demo: {
      machine: "CNC Drilling",
      order: "B01-S60",
      shift: "Day",
      running: "Running",
      produced: "Produced",
      buttons: { stops: "Stops", scrap: "Scrap", documents: "Documents" },
      listTitle: "For order B01-S60",
      docs: {
        instruction: "Work instruction",
        drawing: "Drawing 88-204",
        setup: "Setup sheet",
        certificate: "Material certificate",
      },
      current: "Current",
      newBadge: "New",
      choose: "Choose a document",
      stepOf: "Step {n} of {total}",
      steps: [
        { title: "Clamp the plate", body: "Two clamps on the long side. Check that the plate sits flat on the stops." },
        { title: "Load the drill", body: "Drill Ø8.5 in position T4. Check the tip for wear before you start." },
        { title: "Setup", body: "Zero point in the lower left corner. Run the first part and measure the depth." },
      ],
      depthLabel: "Drill depth",
      revisedTitle: "Rev 5 approved",
      revisedBody: "Replaces Rev 4. Drill depth changed.",
      confirm: "Read and understood",
      confirmed: "Confirmed, logged on B01-S60",
    },
    showcaseTitle: "Documents in the real app",
    showcases: [
      {
        title: "The manual answers at the machine",
        body: "The same documents feed Opti Assist. The operator asks at the machine and gets the step from the operator manual, with the source to check.",
        image: "/images/replays/documents/manual-sources.webp",
        alt: "An answer with three steps from the operator manual and the source documents listed below it",
      },
      {
        title: "Versions and links you set up yourselves",
        body: "Version control, items and machine links are lists in the platform. That is how a document knows which machine and which order it belongs to.",
        image: "/images/replays/documents/version-lists.webp",
        alt: "Lists in OptiPeople Data Platform including Entity version control, Items and Machine link",
      },
    ],
  },
  da: {
    label:
      "På operatørpanelet ved CNC Drilling åbner operatøren dokumenterne til ordre B01-S60 og bladrer frem til opstillingen i arbejdsinstruktionen. Version 5 bliver godkendt og afløser version 4 med det samme med en ny boredybde, og operatøren kvitterer for at have læst den.",
    demo: {
      machine: "CNC Drilling",
      order: "B01-S60",
      shift: "Dag",
      running: "Kører",
      produced: "Produceret",
      buttons: { stops: "Stop", scrap: "Kassation", documents: "Dokumenter" },
      listTitle: "Til ordre B01-S60",
      docs: {
        instruction: "Arbejdsinstruktion",
        drawing: "Tegning 88-204",
        setup: "Opstillingsark",
        certificate: "Materialecertifikat",
      },
      current: "Gældende",
      newBadge: "Ny",
      choose: "Vælg et dokument",
      stepOf: "Trin {n} af {total}",
      steps: [
        { title: "Spænd pladen op", body: "To spændejern på den lange side. Tjek, at pladen ligger plant mod anslagene." },
        { title: "Sæt boret i", body: "Bor Ø8,5 på plads T4. Tjek spidsen for slid, før I starter." },
        { title: "Opstilling", body: "Nulpunkt i nederste venstre hjørne. Kør første emne, og mål dybden." },
      ],
      depthLabel: "Boredybde",
      revisedTitle: "Rev 5 godkendt",
      revisedBody: "Afløser Rev 4. Boredybden er ændret.",
      confirm: "Læst og forstået",
      confirmed: "Kvitteret og logget på B01-S60",
    },
    showcaseTitle: "Dokumenterne i den rigtige app",
    showcases: [
      {
        title: "Manualen svarer ved maskinen",
        body: "De samme dokumenter ligger bag Opti Assist. Operatøren spørger ved maskinen og får trinnet fra operatørmanualen med kilden, så det kan tjekkes.",
        image: "/images/replays/documents/manual-sources.webp",
        alt: "Et svar med tre trin fra operatørmanualen og kildedokumenterne listet nedenunder",
      },
      {
        title: "Versioner og koblinger, I selv sætter op",
        body: "Versionsstyring, varer og koblingen til maskinerne er lister i platformen. Det er sådan, et dokument ved, hvilken maskine og hvilken ordre det hører til.",
        image: "/images/replays/documents/version-lists.webp",
        alt: "Lister i OptiPeople Data Platform, blandt andet Entity version control, Items og Machine link",
      },
    ],
  },
}
