import { buildLookup, type FeaturePage, type LocalizedPage } from "@/content/shared/types"
import type { Locale } from "@/i18n/routing"

const features: LocalizedPage<FeaturePage>[] = [
  {
    slug: "production-efficiency",
    href: "/features/production-efficiency",
    content: {
      en: {
        metaTitle: "Production Efficiency | OptiPeople",
        metaDescription:
          "Track OEE in real time, see where production time is lost, and understand performance across shifts, lines, and machines, based on real production data.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Production Efficiency",
        heroTitle: "See Where Production Time Is Lost",
        heroBody:
          "Track OEE live and understand performance across shifts, lines, and machines, based on real production data, not guesswork.",
        heroImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
        heroImageAlt:
          "OptiPeople efficiency report with live availability, performance and OEE gauges against target",
        valueTitle: "Your production data should work as hard as your team",
        valueBody:
          "Most factories still piece together performance from shift handover notes, spreadsheets, and end-of-day reports. By the time someone sees the numbers, the moment to act has passed. Production Efficiency gives you a live, accurate picture, so decisions happen while they still matter.",
        capabilitiesTitle: "From raw signals to real understanding",
        capabilitiesBody:
          "Every machine tells a story. Production Efficiency translates it into numbers, timelines, and comparisons your team can act on.",
        capabilities: [
          {
            title: "Live OEE in One View",
            description:
              "Availability, performance, and quality calculated automatically from machine signals. Your OEE score updates as production runs, with drill-down by machine, line, or area. No spreadsheets. No waiting for the shift report.",
            image: "/images/report-mockup1.png",
            imageAlt:
              "OptiPeople OEE dashboard showing availability gauge, unit counter, and parts per hour chart",
          },
          {
            title: "See What Happened, Hour by Hour",
            description:
              "Color-coded timelines show running, stopped, setup, and idle states for every machine. Spot patterns that shift reports miss, like the 20 minutes lost to changeover every morning that nobody talks about.",
            image: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
            imageAlt:
              "Timeline chart showing running, stopped, setup and idle states across a full shift",
          },
          {
            title: "Compare Shifts, Lines, and Machines",
            description:
              "Side-by-side performance data across any dimension you care about. See which shifts consistently outperform, which lines underdeliver, and where the gap between best and worst is widest.",
            image: "/images/report-mockup2.png",
            imageAlt:
              "Bar chart report comparing production performance across shifts and lines",
          },
        ],
        showcaseTitle: "The full picture, from floor to management",
        showcaseBody:
          "Operators see their machine. Team leads see their line. Managers see the plant. Same data, right level of detail.",
        showcaseImage: "/images/Mockups/Report-Production-Counters-Desktop.png",
        showcaseAlt:
          "OptiPeople production counter report with produced and rejected totals and an hourly output trend",
        metrics: [
          { metric: "15-25%", label: "OEE improvement in the first year" },
          { metric: "2 hrs", label: "Saved daily on manual reporting" },
          { metric: "< 1 min", label: "From machine event to dashboard" },
        ],
        related: [
          {
            title: "Stop Cause Registration",
            description:
              "Capture downtime reasons at the source. Clean data you can actually act on.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Analysis and Reporting",
            description:
              "Turn production data into clear reports on performance, losses, and cost drivers.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Quality Management",
            description:
              "Register quality data where it happens. Trace deviations back to machines, batches, and shifts.",
            href: "/features/quality-management",
          },
        ],
      },
      da: {
        metaTitle: "Produktionseffektivitet | OptiPeople",
        metaDescription:
          "Følg OEE i realtid, se hvor produktionstiden går tabt, og se hvordan det går på tværs af skift, linjer og maskiner.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Produktionseffektivitet",
        heroTitle: "Se hvor produktionstiden går tabt",
        heroBody:
          "Følg OEE live, og se hvordan det går på tværs af skift, linjer og maskiner. Det bygger på rigtige tal fra produktionen, ikke på fornemmelser.",
        heroImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
        heroImageAlt: "OptiPeople effektivitetsrapport med tilgængelighed, ydelse og OEE mod målet",
        valueTitle: "Jeres tal skal arbejde lige så hårdt som jeres folk",
        valueBody:
          "Bliver tallene først samlet, når dagen er slut, er det for sent at gøre noget ved dem. Her kan I se, hvordan det går lige nu, mens I stadig kan nå at rette op.",
        capabilitiesTitle: "Fra maskinsignal til noget, I kan bruge",
        capabilitiesBody:
          "Hver maskine fortæller noget. Vi laver det om til tal, tidslinjer og sammenligninger, teamet kan handle på.",
        capabilities: [
          {
            title: "Live OEE i ét overblik",
            description:
              "Tilgængelighed, ydelse og kvalitet bliver regnet ud af maskinernes egne signaler og opdateret, mens produktionen kører.",
            image: "/images/report-mockup1.png",
            imageAlt: "OEE-dashboard",
          },
          {
            title: "Se hvad der skete, time for time",
            description:
              "Farvekodede tidslinjer viser, hvornår hver maskine kørte, stod stille, blev stillet om eller ventede.",
            image: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
            imageAlt: "Tidslinje med kørsel, stop, omstilling og tomgang hen over et helt skift",
          },
          {
            title: "Sammenlign skift, linjer og maskiner",
            description:
              "Se tallene side om side. Så bliver det tydeligt, hvor forskellene er, og hvad der er værd at gøre efter.",
            image: "/images/report-mockup2.png",
            imageAlt: "Rapport med sammenligning af skift",
          },
        ],
        showcaseTitle: "Hele billedet, fra gulvet til ledelsen",
        showcaseBody:
          "Operatøren ser sin maskine. Teamlederen ser sin linje. Ledelsen ser fabrikken. De samme tal, bare i det niveau, man har brug for.",
        showcaseImage: "/images/Mockups/Report-Production-Counters-Desktop.png",
        showcaseAlt: "Rapport med producerede og kasserede emner samt output pr. time",
        metrics: [
          { metric: "15-25%", label: "Bedre OEE det første år" },
          { metric: "2 timer", label: "Sparet på rapportering hver dag" },
          { metric: "< 1 min", label: "Fra det sker på maskinen, til det står på skærmen" },
        ],
        related: [
          {
            title: "Stopårsager",
            description: "Registrer årsagen til stoppet ude ved maskinen.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Analyse og rapportering",
            description: "Gør produktionsdata til rapporter, folk kan læse.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Kvalitetsstyring",
            description: "Registrer kvalitetsdata dér, hvor arbejdet sker.",
            href: "/features/quality-management",
          },
        ],
      },
    },
  },
  {
    slug: "stop-cause-registration",
    href: "/features/stop-cause-registration",
    content: {
      en: {
        metaTitle: "Stop Cause Registration | OptiPeople",
        metaDescription:
          "Make downtime visible at the source. Operators register stops directly at the machine, giving you clean data you can actually act on.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Stop Cause Registration",
        heroTitle: "Make Downtime Visible at the Source",
        heroBody:
          "Operators register stops directly at the machine, while the context is fresh. You get clean, structured data you can actually act on.",
        heroImage: "/images/Stop-Screen-Select.png",
        heroImageAlt:
          "Operator panel showing stop cause selection screen with predefined reason categories",
        valueTitle: "You can't fix what you can't see",
        valueBody:
          "Most downtime goes unrecorded or gets lumped into vague categories after the fact. Without clean stop data, improvement projects are based on gut feeling instead of evidence. Stop Cause Registration captures every stop, every reason, every time, so you know exactly where to focus.",
        capabilitiesTitle: "From machine stop to structured data in seconds",
        capabilitiesBody:
          "A three-step flow that turns every downtime event into data your team can learn from.",
        capabilities: [
          {
            title: "The Machine Tells You First",
            description:
              "When a machine stops, the operator panel turns red immediately. No ambiguity, no delay. The operator taps the screen to acknowledge the stop and begin registration, right there, right then, while the context is fresh.",
            image: "/images/Stop-Screen-Red.png",
            imageAlt:
              "Operator panel showing red alert screen with the message the machine is stopped",
          },
          {
            title: "Every Stop Gets a Reason",
            description:
              "Operators pick from a predefined list of stop causes, tailored to each machine. Setup, tool change, material wait, malfunction. Each entry captures the reason, duration, and optional notes. The result is structured data, not free-text guesswork.",
            image: "/images/operatorpanel2.png",
            imageAlt:
              "Detailed stop log showing stop reasons, telemetry data, and operator notes across shifts",
          },
          {
            title: "A Complete Picture of Every Shift",
            description:
              "All stops appear on a color-coded timeline, filterable by shift, machine, and severity. Hover over any block to see exactly what happened, when, and for how long. Patterns that were invisible in shift handover notes become obvious at a glance.",
            image: "/images/Stop-Screen-Timeline.png",
            imageAlt:
              "Color-coded stop timeline showing all stops across a shift with details on hover",
          },
        ],
        showcaseTitle: "Stop data feeds the bigger picture",
        showcaseBody:
          "Every registered stop flows into your production dashboard. Machine status, timelines, and performance metrics update in real time, giving the full story behind the numbers.",
        showcaseImage: "/images/Mockups/Report-Individual-Events-Desktop.png",
        showcaseAlt:
          "Live production status dashboard showing machine states, timeline, and unit per hour chart",
        metrics: [
          { metric: "40%", label: "Reduction in unplanned downtime" },
          { metric: "95%+", label: "Stop cause capture rate" },
          { metric: "< 10s", label: "Average time to register a stop" },
        ],
        related: [
          {
            title: "Production Efficiency",
            description:
              "Track OEE live and understand performance across shifts, lines, and machines.",
            href: "/features/production-efficiency",
          },
          {
            title: "Maintenance and Tasks",
            description:
              "Plan and execute preventive maintenance based on usage and condition.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "Analysis and Reporting",
            description:
              "Turn production data into clear reports on performance, losses, and cost drivers.",
            href: "/features/analysis-and-reporting",
          },
        ],
      },
      da: {
        metaTitle: "Stopårsager | OptiPeople",
        metaDescription:
          "Gør nedetiden synlig, dér hvor den sker. Operatøren registrerer stoppet direkte på maskinen.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Stopårsager",
        heroTitle: "Gør nedetiden synlig, dér hvor den sker",
        heroBody:
          "Operatøren registrerer stoppet direkte på maskinen, mens det stadig står klart, hvad der skete. Så har I rene tal, der er til at handle på.",
        heroImage: "/images/Stop-Screen-Select.png",
        heroImageAlt: "Skærm til valg af stopårsag",
        valueTitle: "I kan ikke lave om på det, I ikke kan se",
        valueBody:
          "Uden ordentlige stopdata bliver forbedringer styret af fornemmelser. Her bliver hvert stop registreret: hvad der skete, hvorfor, og hvor længe det varede.",
        capabilitiesTitle: "Fra maskinstop til brugbare tal på få sekunder",
        capabilitiesBody:
          "Ét enkelt forløb, der gør hvert stop til noget, produktionen kan lære af.",
        capabilities: [
          {
            title: "Maskinen siger til først",
            description:
              "Når maskinen stopper, bliver operatøren bedt om at sætte en årsag på med det samme.",
            image: "/images/Stop-Screen-Red.png",
            imageAlt: "Rød stopskærm",
          },
          {
            title: "Hvert stop får en årsag",
            description:
              "Operatøren vælger fra en liste, der passer til lige den maskine. Så bliver tallene til at regne på bagefter.",
            image: "/images/operatorpanel2.png",
            imageAlt: "Stoplog på operatørpanel",
          },
          {
            title: "Hele skiftet på én tidslinje",
            description:
              "Tidslinjen viser stoppene, hvor længe de varede, og hvad der går igen på tværs af skift og maskiner.",
            image: "/images/Stop-Screen-Timeline.png",
            imageAlt: "Tidslinje over stop",
          },
        ],
        showcaseTitle: "Stopdata bliver til det store billede",
        showcaseBody:
          "Hver registrering går videre til produktionsdashboardet, så I ser tallene og årsagerne samlet ét sted.",
        showcaseImage: "/images/Mockups/Report-Individual-Events-Desktop.png",
        showcaseAlt: "Dashboard med stopdata",
        metrics: [
          { metric: "40%", label: "Mindre uplanlagt nedetid" },
          { metric: "95%+", label: "Af stoppene bliver forklaret" },
          { metric: "< 10s", label: "Tager én registrering" },
        ],
        related: [
          {
            title: "Produktionseffektivitet",
            description: "Følg OEE live på tværs af produktionen.",
            href: "/features/production-efficiency",
          },
          {
            title: "Vedligehold og opgaver",
            description: "Planlæg vedligehold efter brug og tilstand.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "Analyse og rapportering",
            description: "Se hvad stoppene koster, og om det bliver bedre.",
            href: "/features/analysis-and-reporting",
          },
        ],
      },
    },
  },
  {
    slug: "maintenance-and-tasks",
    href: "/features/maintenance-and-tasks",
    content: {
      en: {
        metaTitle: "Maintenance and Tasks | OptiPeople",
        metaDescription:
          "Plan and execute preventive maintenance based on usage and condition. Assign tasks, track completion, and reduce unplanned downtime.",
        parentLabel: "Maintenance",
        parentHref: "/modules/maintenance",
        eyebrow: "Maintenance and Tasks",
        heroTitle: "Fix Things Before They Break",
        heroBody:
          "Plan and execute preventive maintenance based on real usage and condition. Assign tasks, track completion, and turn reactive firefighting into structured prevention.",
        heroImage: "/images/Mockups/Tasks-Maintenance-Lists.png",
        heroImageAlt:
          "Tasks Management showing maintenance tasks triggered by counters and run hours, beside the lists they draw on",
        valueTitle: "Unplanned stops are the most expensive kind",
        valueBody:
          "Every unplanned stop costs more than a planned one, in lost production, emergency parts, and scrambled schedules. Most factories know this but still run maintenance off spreadsheets and memory. OptiPeople puts every task in one place, triggered by real machine data, tracked to completion.",
        capabilitiesTitle: "From condition signal to completed task",
        capabilitiesBody:
          "A maintenance workflow that starts with the machine and ends with a verified fix, no paper, no guesswork.",
        capabilities: [
          {
            title: "One List for Every Task on the Floor",
            description:
              "Search, filter, and prioritize across all open tasks, by machine, urgency, or type. Operators see exactly what needs doing and how much time is left. No more whiteboards, no more forgotten follow-ups.",
            image: "/images/taskapp1.png",
            imageAlt:
              "Task list on a phone with search and machine filter, showing each open task and the time left on it",
          },
          {
            title: "Maintenance Driven by Data, Not Calendars",
            description:
              "Schedule maintenance based on actual machine usage, run hours, and condition signals, not fixed intervals. When a threshold is reached, the task appears automatically. You maintain what needs it, when it needs it.",
            image: "/images/Mockups/Tasls-Maintenance.png",
            imageAlt:
              "Task list where the When column reads after counter reached and production hour reached rather than a fixed date",
          },
          {
            title: "Close the Loop at the Machine",
            description:
              "When maintenance is complete and the machine checks out, operators see it immediately. Green status means ready to run. The feedback loop from task creation to verified completion happens in one system, with a full audit trail.",
            image: "/images/Everything-is-okay.png",
            imageAlt:
              "Operator panel showing green checkmark with everything is okay status after maintenance completion",
          },
        ],
        metrics: [
          { metric: "40%", label: "Reduction in unplanned downtime" },
          { metric: "3x", label: "More preventive vs. reactive maintenance" },
          { metric: "100%", label: "Task traceability and audit trail" },
        ],
        related: [
          {
            title: "Production Efficiency",
            description:
              "Track OEE live and see how maintenance impacts availability and performance.",
            href: "/features/production-efficiency",
          },
          {
            title: "Stop Cause Registration",
            description:
              "Capture downtime reasons at the source. Turn stop data into maintenance priorities.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Energy and Telemetry",
            description:
              "Monitor vibration, temperature, and energy to trigger condition-based maintenance.",
            href: "/features/energy-and-telemetry",
          },
        ],
      },
      da: {
        metaTitle: "Vedligehold og opgaver | OptiPeople",
        metaDescription:
          "Planlæg og udfør vedligehold efter, hvor meget maskinen har kørt, hvordan den har det, og hvad der allerede er lavet.",
        parentLabel: "Vedligehold",
        parentHref: "/modules/maintenance",
        eyebrow: "Vedligehold og opgaver",
        heroTitle: "Gør vedligehold planlagt og synligt",
        heroBody:
          "Opret opgaver, sæt navn på dem, og planlæg service efter, hvor meget maskinen faktisk har kørt.",
        heroImage: "/images/Mockups/Tasks-Maintenance-Lists.png",
        heroImageAlt:
          "Opgavestyring med vedligeholdsopgaver, der udløses af tællere og driftstimer, ved siden af de lister, de trækker på",
        valueTitle: "Vedligehold virker bedst, før maskinen bryder ned",
        valueBody:
          "Når driftstimer, alarmer og opgaver ligger samme sted, kan teknikerne tage det vigtigste først og skrive arbejdet ned uden ekstra papir.",
        capabilitiesTitle: "Fra signal til færdig opgave",
        capabilitiesBody:
          "Vedligeholdet hænger sammen med maskindata, planlægning og det arbejde, der bliver lavet.",
        capabilities: [
          {
            title: "Planer efter brug",
            description:
              "Planlæg service efter driftstimer, antal cyklusser eller faste intervaller.",
            image: "/images/Mockups/Tasls-Maintenance.png",
            imageAlt:
              "Opgavelisten med vedligehold planlagt efter tællere og driftstimer",
          },
          {
            title: "Opgaverne på mobilen",
            description:
              "Teknikeren ser opgaven, noterne og status dér, hvor arbejdet bliver lavet.",
            image: "/images/taskapp1.png",
            imageAlt: "Opgaverne på telefonen med resttid pr. opgave",
          },
          {
            title: "Historik pr. maskine",
            description:
              "Se hvad der før er lavet på maskinen, og hvilke fejl der bliver ved med at komme igen.",
            image: "/images/backoffice1.png",
            imageAlt: "Backoffice-historik",
          },
        ],
        metrics: [
          { metric: "50%", label: "Mindre uplanlagt nedetid" },
          { metric: "40 timer", label: "Ekstra produktionstid om året" },
          { metric: "30%", label: "Færre hasteopgaver" },
        ],
        related: [
          {
            title: "Energi og målinger",
            description: "Brug sensorerne til at opdage slid, før det bliver til nedbrud.",
            href: "/features/energy-and-telemetry",
          },
          {
            title: "Maskinstyring",
            description: "Lad maskinens signaler oprette opgaven.",
            href: "/features/machine-control",
          },
          {
            title: "Analyse og rapportering",
            description: "Følg nedetiden, og se om vedligeholdet virker.",
            href: "/features/analysis-and-reporting",
          },
        ],
      },
    },
  },
  {
    slug: "quality-management",
    href: "/features/quality-management",
    content: {
      en: {
        metaTitle: "Quality Management | OptiPeople",
        metaDescription:
          "Register quality data where it happens. Trace deviations back to machines, batches, and shifts, and build accountability into production.",
        parentLabel: "QMS",
        parentHref: "/modules/quality",
        eyebrow: "Quality Management",
        heroTitle: "Catch Quality Issues Where They Start",
        heroBody:
          "Register quality data at the machine, trace deviations back to their source, and build accountability into every shift.",
        heroImage: "/images/backoffice1.png",
        heroImageAlt:
          "OptiPeople quality tracking interface showing audit trail and device management",
        valueTitle: "Quality problems found late cost ten times more",
        valueBody:
          "When quality data lives in paper forms and disconnected systems, deviations surface too late to prevent waste. By the time the report reaches quality management, the batch is finished and the damage is done. OptiPeople captures quality events in real time, linked to the machine, the shift, and the conditions that caused them.",
        capabilitiesTitle: "From floor event to traceable record",
        capabilitiesBody:
          "Quality data captured at the source, structured for analysis, and always audit-ready.",
        capabilities: [
          {
            title: "Register Quality Events at the Machine",
            description:
              "Operators log deviations, scrap, and rework directly at the point of production. Every entry is timestamped and linked to the machine, order, and shift, so nothing gets lost between the floor and the office.",
            image: "/images/operatorpanel2.png",
            imageAlt:
              "Operator panel showing detailed event log with quality notes, telemetry data, and shift information",
          },
          {
            title: "Trace Every Deviation to Its Source",
            description:
              "When quality drops, you need to know why, fast. Filter by machine, time range, and event type to see exactly where deviations cluster. Connect quality issues to specific batches, operators, and conditions.",
            image: "/images/report1.png",
            imageAlt:
              "OptiPeople report showing OEE breakdown with availability, performance, and quality metrics alongside a timeline chart",
          },
          {
            title: "Full Audit Trail, Always Available",
            description:
              "Every quality event, every change, every action is logged with who did what and when. Search and filter the complete activity history across machines and sites. Ready for audits, ready for continuous improvement.",
            image: "/images/backoffice1.png",
            imageAlt:
              "Admin panel showing activity log with date range filters and a device list with machine IDs and locations",
          },
        ],
        metrics: [
          { metric: "30%", label: "Reduction in quality-related scrap" },
          { metric: "100%", label: "Traceability across machines and shifts" },
          { metric: "< 5 min", label: "From deviation to documented root cause" },
        ],
        related: [
          {
            title: "Production Efficiency",
            description:
              "Track OEE live. Quality is one of the three pillars of overall equipment effectiveness.",
            href: "/features/production-efficiency",
          },
          {
            title: "Stop Cause Registration",
            description:
              "Capture downtime reasons alongside quality events for a complete production picture.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Analysis and Reporting",
            description:
              "Turn quality data into trend reports that drive continuous improvement.",
            href: "/features/analysis-and-reporting",
          },
        ],
      },
      da: {
        metaTitle: "Kvalitetsstyring | OptiPeople",
        metaDescription:
          "Registrer kvalitetsdata dér, hvor arbejdet sker, og følg en afvigelse tilbage til maskine, batch og skift.",
        parentLabel: "QMS",
        parentHref: "/modules/quality",
        eyebrow: "Kvalitetsstyring",
        heroTitle: "Gør kvalitet til en del af arbejdet",
        heroBody:
          "Flyt kvalitetstjekket ud til maskinen, og bind kontroller, afvigelser og handlinger sammen med produktionen.",
        heroImage: "/images/backoffice1.png",
        heroImageAlt: "Kvalitetsstyring",
        valueTitle: "Kvalitet skal registreres dér, hvor den bliver skabt",
        valueBody:
          "Digitale kontroller og sporbarhed skærer ventetiden, fejlene og tvivlen væk i kvalitetsarbejdet.",
        capabilitiesTitle: "Kvalitet med det hele omkring sig",
        capabilitiesBody:
          "Hver registrering hænger sammen med maskine, produkt, operatør og skift.",
        capabilities: [
          {
            title: "Digitale skemaer",
            description: "Guidede kontroller sikrer, at det bliver registreret ens hver gang.",
            image: "/images/backoffice1.png",
            imageAlt: "Digital formular",
          },
          {
            title: "Afvigelser og handlinger",
            description: "Skriv afvigelsen ned, og følg handlingen hele vejen, til den er lukket.",
            image: "/images/report-mockup2.png",
            imageAlt: "Afvigelsesrapport",
          },
          {
            title: "Sporbarhed",
            description: "Knyt kvalitetstjek og afvigelser til batch, maskine og skift.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.png",
            imageAlt: "Sporbarhedsrapport med de enkelte registreringer pr. ordre og skift",
          },
        ],
        metrics: [
          { metric: "60%", label: "Mindre omarbejde" },
          { metric: "90%", label: "Hurtigere svar på afvigelser" },
          { metric: "100%", label: "Digital sporbarhed" },
        ],
        related: [
          {
            title: "Produktionseffektivitet",
            description: "Se kvaliteten i sammenhæng med OEE.",
            href: "/features/production-efficiency",
          },
          {
            title: "Analyse og rapportering",
            description: "Følg kvaliteten og afvigelserne over tid.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Maskinstyring",
            description: "Giv operatøren besked ude ved maskinen.",
            href: "/features/machine-control",
          },
        ],
      },
    },
  },
  {
    slug: "analysis-and-reporting",
    href: "/features/analysis-and-reporting",
    content: {
      en: {
        metaTitle: "Analysis and Reporting | OptiPeople",
        metaDescription:
          "Turn production data into clear reports on performance, losses, and cost drivers, without spreadsheets or manual work.",
        parentLabel: "Analysis",
        parentHref: "/modules/analysis",
        eyebrow: "Analysis and Reporting",
        heroTitle: "Reports That Write Themselves",
        heroBody:
          "Turn production data into clear reports on performance, losses, and cost drivers, without spreadsheets or manual work.",
        heroImage: "/images/report-mockup1.png",
        heroImageAlt:
          "OptiPeople reporting dashboard showing OEE gauge, unit counter, and parts per hour trend",
        valueTitle: "The data exists. It just needs a better format",
        valueBody:
          "Your machines generate thousands of data points every day. But if turning that into a useful report takes a person, a spreadsheet, and half a morning, the data stays locked up. OptiPeople generates production reports automatically, accurate, consistent, and ready when you are.",
        capabilitiesTitle: "From machine signal to management report",
        capabilitiesBody:
          "Every report is built from live production data. No manual entry, no copy-paste, no version confusion.",
        capabilities: [
          {
            title: "OEE Reports That Build Themselves",
            description:
              "Availability, performance, and quality broken down by machine, line, shift, or time period. Reports generate automatically from live production data. Pick a week, pick a machine, and the numbers are there.",
            image: "/images/report1.png",
            imageAlt:
              "OptiPeople report showing OEE gauges for availability, performance, and quality with a color-coded timeline chart",
          },
          {
            title: "Compare Anything Against Anything",
            description:
              "Side-by-side bar charts across shifts, lines, weeks, or machines. See where performance diverges and where it converges. The comparisons that used to take a full afternoon in Excel now take one click.",
            image: "/images/report-mockup2.png",
            imageAlt:
              "Bar chart report comparing production metrics across different time periods and categories",
          },
          {
            title: "From Raw Data to Shared Insight",
            description:
              "Save report templates, schedule automatic delivery, and share with stakeholders who need the numbers but not the system. Management gets a weekly summary. Team leads get daily shift reports. Same data, right format.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.png",
            imageAlt:
              "OptiPeople event report listing individual registered stops with cause, duration and shift",
          },
        ],
        showcaseTitle: "Every angle of your production, one system",
        showcaseBody:
          "OEE dashboards, stop analysis, shift comparisons, and energy reports all generated from the same live data source.",
        showcaseImage: "/images/Mockups/Report-OEE-Efficiency-No-Filter.png",
        showcaseAlt:
          "OptiPeople OEE report with availability, performance and quality broken down over a week",
        metrics: [
          { metric: "2 hrs", label: "Saved daily on manual reporting" },
          { metric: "0", label: "Spreadsheets needed for production reports" },
          { metric: "< 1 min", label: "From question to answer" },
        ],
        related: [
          {
            title: "Production Efficiency",
            description:
              "The live OEE data that feeds into your reports, track it in real time.",
            href: "/features/production-efficiency",
          },
          {
            title: "Stop Cause Registration",
            description:
              "Clean stop data makes loss analysis reports accurate and actionable.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Energy and Telemetry",
            description:
              "Add energy consumption and sensor data to your production reports.",
            href: "/features/energy-and-telemetry",
          },
        ],
      },
      da: {
        metaTitle: "Analyse og rapportering | OptiPeople",
        metaDescription:
          "Gør produktionsdata til rapporter, folk kan læse: hvordan det går, hvor tiden går tabt, og hvad det koster.",
        parentLabel: "Analyse",
        parentHref: "/modules/analysis",
        eyebrow: "Analyse og rapportering",
        heroTitle: "Rapporter, der forklarer, hvad der sker",
        heroBody:
          "Lad rapporterne lave sig selv, og få svar på, hvordan det går, hvor tiden går tabt, og hvad der koster mest.",
        heroImage: "/images/report-mockup1.png",
        heroImageAlt: "Rapportering",
        valueTitle: "En rapport skal være et arbejdsredskab",
        valueBody:
          "Når rapporten er koblet til driften og opdaterer sig selv, bliver den en del af forbedringsarbejdet i stedet for et tilbageblik en gang om måneden.",
        capabilitiesTitle: "Indsigt fra det samme datagrundlag",
        capabilitiesBody:
          "Fra tal, der opdaterer sig selv, til de dybe analyser. Samme data, forskellige spørgsmål.",
        capabilities: [
          {
            title: "Rapporter, der laver sig selv",
            description: "Rapporterne opdaterer sig selv og bliver sendt ud, uden at nogen trækker tal.",
            image: "/images/report-mockup1.png",
            imageAlt: "Automatisk rapport",
          },
          {
            title: "Hvor I taber mest",
            description: "Find de stop, de produkter og de linjer, der koster mest.",
            image: "/images/report-mockup2.png",
            imageAlt: "Tabsanalyse",
          },
          {
            title: "Klik dig ned i tallene",
            description: "Gå fra hele fabrikken ned til den enkelte maskine, det enkelte skift og det enkelte stop.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.png",
            imageAlt: "Rapport med de enkelte registrerede stop, årsag, varighed og skift",
          },
        ],
        metrics: [
          { metric: "80%", label: "Mindre rapportering i hånden" },
          { metric: "Live", label: "Tal, der opdaterer sig selv" },
          { metric: "1 kilde", label: "Alle henter fra de samme data" },
        ],
        related: [
          {
            title: "AI og copiloter",
            description: "Lad AI skrive sammendraget og finde mønstrene.",
            href: "/features/ai-and-copilots",
          },
          {
            title: "Energi og målinger",
            description: "Følg energiforbruget og det, der stikker ud.",
            href: "/features/energy-and-telemetry",
          },
          {
            title: "Produktionseffektivitet",
            description: "Se hvordan OEE udvikler sig over tid.",
            href: "/features/production-efficiency",
          },
        ],
      },
    },
  },
  {
    slug: "energy-and-telemetry",
    href: "/features/energy-and-telemetry",
    content: {
      en: {
        metaTitle: "Energy and Telemetry | OptiPeople",
        metaDescription:
          "Connect energy, vibration, flow, and temperature directly to production. Identify waste, anomalies, and optimization opportunities.",
        parentLabel: "EMS",
        parentHref: "/modules/energy",
        eyebrow: "Energy and Telemetry",
        heroTitle: "Know What Your Machines Are Feeling",
        heroBody:
          "Connect energy, vibration, flow, and temperature directly to production. Spot waste, catch anomalies early, and find optimization opportunities hiding in the data.",
        heroImage: "/images/report-mockrup-3.png",
        heroImageAlt:
          "OptiPeople energy dashboard showing temperature, kWh readings, and OEE performance gauges",
        valueTitle: "Energy and condition data without a separate system",
        valueBody:
          "Most factories monitor energy in one system, production in another, and machine health in a third, if at all. That separation makes it impossible to connect cause and effect. OptiPeople brings sensor data into the same platform as your production data, so every reading has context.",
        capabilitiesTitle: "Every sensor signal, connected to production",
        capabilitiesBody:
          "Temperature, energy, vibration, and flow captured at the machine and linked to the production events that explain them.",
        capabilities: [
          {
            title: "Live Sensor Readings, Right at the Machine",
            description:
              "Temperature, humidity, pressure, and vibration displayed in real time on the operator panel. No separate monitoring system, no switching between screens. The operator sees what the machine feels.",
            image: "/images/Telemetry-Numbers.png",
            imageAlt:
              "Operator panel showing live temperature at 182 degrees and humidity at 41 percent for a Homag machine",
          },
          {
            title: "Energy Consumption by Machine, by Hour",
            description:
              "Track kWh for every connected machine over time. See exactly when energy spikes happen and correlate them with production events. Identify machines that consume more than they should, idle, in setup, or under load.",
            image: "/images/Telemetry-Chart.png",
            imageAlt:
              "Energy chart showing kWh consumption over 48 hours for a Felder sliding table saw",
          },
          {
            title: "Sensor Data Meets Production Data",
            description:
              "Energy and telemetry don't live in isolation. OptiPeople connects sensor readings directly to OEE, stop events, and shift data, so you can answer questions like: how much energy did that unplanned stop cost? Which shift runs most efficiently?",
            image: "/images/report-mockrup-3.png",
            imageAlt:
              "Dashboard combining telemetry readings with OEE gauges and production performance metrics",
          },
        ],
        metrics: [
          { metric: "15%", label: "Average energy savings identified" },
          { metric: "24/7", label: "Continuous condition monitoring" },
          { metric: "< 1s", label: "Sensor-to-dashboard latency" },
        ],
        related: [
          {
            title: "Production Efficiency",
            description:
              "Combine energy data with OEE to understand the true cost of production losses.",
            href: "/features/production-efficiency",
          },
          {
            title: "Maintenance and Tasks",
            description:
              "Trigger condition-based maintenance from vibration, temperature, or energy anomalies.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "AI and Copilots",
            description:
              "Let AI detect patterns in telemetry data that humans would miss.",
            href: "/features/ai-and-copilots",
          },
        ],
      },
      da: {
        metaTitle: "Energi og målinger | OptiPeople",
        metaDescription:
          "Kobl energi, vibration, flow og temperatur sammen med det, maskinerne producerer.",
        parentLabel: "EMS",
        parentHref: "/modules/energy",
        eyebrow: "Energi og målinger",
        heroTitle: "Se hvad maskinerne bruger, og hvad de fortæller",
        heroBody:
          "Kobl energimålere og sensorer sammen med produktionen, så spild, slid og det, der stikker ud, bliver til at få øje på.",
        heroImage: "/images/report-mockrup-3.png",
        heroImageAlt: "Energi og målinger",
        valueTitle: "En måling siger først noget, når produktionen står ved siden af",
        valueBody:
          "Når målingerne bliver holdt op mod maskinstatus, produkter og skift, kan teamet se forskel på almindelige udsving og et rigtigt problem.",
        capabilitiesTitle: "Målinger med produktionen ved siden af",
        capabilitiesBody:
          "Energi og sensortal ligger i det samme billede som OEE og stop.",
        capabilities: [
          {
            title: "Energi pr. enhed",
            description: "Følg kWh pr. produkt, pr. ordre og pr. linje.",
            image: "/images/Telemetry-Chart.png",
            imageAlt: "Graf over målinger",
          },
          {
            title: "Sensorerne over tid",
            description: "Hold øje med temperatur, vibration, flow og de andre signaler.",
            image: "/images/Telemetry-Numbers.png",
            imageAlt: "Måletal",
          },
          {
            title: "Det, der stikker ud",
            description: "Find de mønstre, der peger på spild, slid eller en fejl på vej.",
            image: "/images/report-mockrup-3.png",
            imageAlt: "Rapport over afvigelser",
          },
        ],
        metrics: [
          { metric: "10-20%", label: "Mindre spild af energi" },
          { metric: "Live", label: "Overblik over sensorerne" },
          { metric: "1 skærm", label: "Energi og produktion samlet" },
        ],
        related: [
          {
            title: "Vedligehold og opgaver",
            description: "Lad målingerne udløse vedligeholdet.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "AI og copiloter",
            description: "Find mønstre i sensordata med AI.",
            href: "/features/ai-and-copilots",
          },
          {
            title: "Analyse og rapportering",
            description: "Følg forbruget og det, I har sparet.",
            href: "/features/analysis-and-reporting",
          },
        ],
      },
    },
  },
  {
    slug: "ai-and-copilots",
    href: "/features/ai-and-copilots",
    content: {
      en: {
        metaTitle: "AI and Copilots | OptiPeople",
        metaDescription:
          "Ask questions, detect patterns, and support decisions using AI trained on your own production data.",
        parentLabel: "AI agents",
        parentHref: "/ai/agents",
        eyebrow: "AI and Copilots",
        heroTitle: "AI Trained on Your Factory",
        heroBody:
          "Ask questions, detect patterns, and support decisions using AI that knows your machines, your shifts, and your production history.",
        heroImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
        heroImageAlt:
          "Live OptiPeople efficiency report of the kind the AI assistant answers questions from",
        valueTitle: "Your best analyst can't look at everything at once",
        valueBody:
          "Production generates more data than any person can review. The patterns that matter get buried in volume: a gradual cycle time drift, a correlation between humidity and scrap rate, a shift that quietly outperforms. AI doesn't get overwhelmed. It watches everything, all the time, and tells you what matters.",
        capabilitiesTitle: "Intelligence that earns trust through transparency",
        capabilitiesBody:
          "Every recommendation is traceable. Every insight links to real data. No black boxes, just evidence.",
        capabilities: [
          {
            title: "Ask Your Data a Question",
            description:
              "Type a question in plain language and get an answer drawn from your production data. \"What caused the most downtime last week?\" \"Which line had the best OEE this month?\" No query language, no analyst needed, just the answer.",
            image: "/images/report1.png",
            imageAlt:
              "OptiPeople report showing OEE breakdown and timeline that AI can analyze and summarize",
          },
          {
            title: "Patterns Humans Miss",
            description:
              "AI scans across machines, shifts, and time periods to surface correlations that are invisible in manual review. A slow drift in cycle time that predicts a breakdown. An energy pattern that signals a worn tool. The system flags it before it becomes a problem.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.png",
            imageAlt:
              "Event report showing the recurring stop causes a pattern analysis is built from",
          },
          {
            title: "Decisions Backed by Evidence",
            description:
              "Every AI insight links back to the underlying data. No black boxes. When the copilot suggests focusing on a specific machine or shift, you can drill into the exact numbers and timeline that support the recommendation.",
            image: "/images/Mockups/Report-Production-Counters-Desktop.png",
            imageAlt:
              "Production status dashboard showing real-time machine states and performance data backing AI recommendations",
          },
        ],
        metrics: [
          { metric: "10x", label: "Faster time from question to insight" },
          { metric: "24/7", label: "Continuous pattern detection" },
          { metric: "100%", label: "Traceable: every insight links to source data" },
        ],
        related: [
          {
            title: "Analysis and Reporting",
            description:
              "AI enhances the reports you already generate, adding summaries, anomalies, and recommendations.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Energy and Telemetry",
            description:
              "AI detects patterns in sensor data that signal wear, waste, or emerging failures.",
            href: "/features/energy-and-telemetry",
          },
          {
            title: "Production Efficiency",
            description:
              "Ask the copilot to explain OEE drops and suggest where to focus improvement efforts.",
            href: "/features/production-efficiency",
          },
        ],
      },
      da: {
        metaTitle: "AI og copiloter | OptiPeople",
        metaDescription:
          "Stil spørgsmål, find mønstre og få hjælp til beslutningerne af en AI, der kender jeres produktionsdata.",
        parentLabel: "AI-agenter",
        parentHref: "/ai/agents",
        eyebrow: "AI og copiloter",
        heroTitle: "AI, der kender jeres fabrik",
        heroBody:
          "Stil spørgsmål, find mønstre og få hjælp til beslutningerne af en AI, der kender jeres maskiner, jeres skift og jeres historik.",
        heroImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
        heroImageAlt: "Live effektivitetsrapport, som AI-assistenten svarer ud fra",
        valueTitle: "Selv den bedste analytiker kan ikke se det hele på én gang",
        valueBody:
          "AI kan holde øje med store mængder data, fange de små signaler og pege på det, der skal gøres noget ved.",
        capabilitiesTitle: "AI, I kan tjekke efter",
        capabilitiesBody:
          "Hvert forslag kan følges tilbage til de tal, det bygger på. Ingen sort boks.",
        capabilities: [
          {
            title: "Spørg dine data",
            description: "Stil spørgsmålet i almindeligt sprog, og få svaret med tallene bag.",
            image: "/images/report1.png",
            imageAlt: "Rapport til AI-analyse",
          },
          {
            title: "Mønstre, mennesker overser",
            description:
              "Find sammenhænge mellem cyklustid, energi, kassation og nedetid på tværs af kilder.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.png",
            imageAlt: "Rapport med de gentagne stopårsager, mønstrene bygger på",
          },
          {
            title: "Beslutninger med belæg",
            description:
              "Hvert forslag linker tilbage til de tal og tidslinjer, det bygger på.",
            image: "/images/Mockups/Report-Production-Counters-Desktop.png",
            imageAlt: "Dashboard med tallene bag",
          },
        ],
        metrics: [
          { metric: "10x", label: "Hurtigere fra spørgsmål til svar" },
          { metric: "24/7", label: "AI holder øje med mønstrene" },
          { metric: "100%", label: "Svar, I kan spore tilbage" },
        ],
        related: [
          {
            title: "Analyse og rapportering",
            description: "Lad AI skrive sammendraget og pege på næste skridt.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Energi og målinger",
            description: "Find de mønstre i sensordata, der peger på fejl eller spild.",
            href: "/features/energy-and-telemetry",
          },
          {
            title: "Produktionseffektivitet",
            description: "Lad AI forklare, hvorfor OEE faldt.",
            href: "/features/production-efficiency",
          },
        ],
      },
    },
  },
  {
    slug: "machine-control",
    href: "/features/machine-control",
    content: {
      en: {
        metaTitle: "Machine Control | OptiPeople",
        metaDescription:
          "Integrate with machine control systems to enable feedback, automation, and tighter production loops across the factory.",
        parentLabel: "IoT",
        parentHref: "/modules/iot",
        eyebrow: "Machine Control",
        heroTitle: "Close the Loop Between System and Floor",
        heroBody:
          "Integrate with machine control systems to enable operator authentication, real-time feedback, and tighter production loops across the factory.",
        heroImage: "/images/Start-Machine.png",
        heroImageAlt:
          "OptiPeople machine control panel showing the start machine interface for a Homag machine",
        valueTitle: "Data collection starts at the machine. Control should too",
        valueBody:
          "When your production system and your machine control live in separate worlds, gaps appear. Operators work without feedback. Events go unrecorded. Start and stop times drift from reality. OptiPeople connects directly to the machine control layer, so the digital system and the physical factory move together.",
        capabilitiesTitle: "From machine signal to operator action and back",
        capabilitiesBody:
          "A two-way connection between your production system and every machine on the floor.",
        capabilities: [
          {
            title: "Secure Machine Authentication",
            description:
              "Every operator authenticates at the machine with a unique key before starting production. You know who is running what, when, and on which machine, creating accountability and traceability from the first moment of a shift.",
            image: "/images/Login-Machine-Key.png",
            imageAlt:
              "Machine key authentication screen where operators enter their unique key to access the machine",
          },
          {
            title: "Start, Stop, and Status in One Place",
            description:
              "Operators control machine start and stop directly from the panel. The system confirms the machine is ready, the operator is authenticated, and all prerequisites are met. One tap to start production, with a full digital trail.",
            image: "/images/Start-Machine.png",
            imageAlt:
              "Operator panel showing the start machine button with green indicator for a Homag machine",
          },
          {
            title: "Real-Time Feedback to the Floor",
            description:
              "Machine status flows back to the operator in real time. Green means everything checks out. When conditions change, a sensor threshold, a quality alert or a maintenance trigger, the operator sees it immediately. No surprises, no lag between event and awareness.",
            image: "/images/Everything-is-okay.png",
            imageAlt:
              "Operator panel showing green checkmark with everything is okay confirmation for a Homag machine",
          },
        ],
        showcaseTitle: "The route step being run, and the files that go with it",
        showcaseBody:
          "An order does not arrive at a machine on its own. It arrives as one step on a production route, with the NC program, the setup sheet, and the drawing revision that belong to that step, on the machine the operator is authenticated at.",
        showcaseDrawn: "routes",
        metrics: [
          { metric: "100%", label: "Digital traceability of operator-machine sessions" },
          { metric: "< 1s", label: "Machine event to operator notification" },
          { metric: "0", label: "Paper-based machine logs needed" },
        ],
        related: [
          {
            title: "Stop Cause Registration",
            description:
              "When a machine stops, the control integration triggers stop registration automatically.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Maintenance and Tasks",
            description:
              "Machine signals trigger maintenance tasks when thresholds are reached.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "Energy and Telemetry",
            description:
              "Sensor data from the machine control layer feeds directly into telemetry dashboards.",
            href: "/features/energy-and-telemetry",
          },
        ],
      },
      da: {
        metaTitle: "Maskinstyring | OptiPeople",
        metaDescription:
          "Kobl jer på maskinstyringen: login ved maskinen, besked med det samme og kortere vej mellem system og gulv.",
        parentLabel: "IoT",
        parentHref: "/modules/iot",
        eyebrow: "Maskinstyring",
        heroTitle: "Luk sløjfen mellem system og gulv",
        heroBody:
          "Kobl jer på maskinstyringen, så operatøren kan logge ind ved maskinen, få besked med det samme og arbejde tættere på systemet.",
        heroImage: "/images/Start-Machine.png",
        heroImageAlt: "Maskinstyringspanel",
        valueTitle: "Data starter ved maskinen. Det bør styringen også.",
        valueBody:
          "Når systemet og maskinstyringen lever hver for sig, opstår der huller. Vi kobler dem sammen, så det digitale og den fysiske fabrik følges ad.",
        capabilitiesTitle: "Fra maskinsignal til operatør og tilbage igen",
        capabilitiesBody:
          "En forbindelse, der går begge veje, mellem produktionssystemet og maskinerne på gulvet.",
        capabilities: [
          {
            title: "Sikkert login ved maskinen",
            description:
              "Operatøren logger ind ude ved maskinen, så det fra skiftets start er tydeligt, hvem der kørte hvad.",
            image: "/images/Login-Machine-Key.png",
            imageAlt: "Maskinlogin",
          },
          {
            title: "Start, stop og status",
            description:
              "Operatøren kan se, om alt er klar, før produktionen bliver sat i gang.",
            image: "/images/Start-Machine.png",
            imageAlt: "Start maskine",
          },
          {
            title: "Besked med det samme",
            description:
              "Maskinstatus og alarmer bliver vist direkte på gulvet, når noget ændrer sig.",
            image: "/images/Everything-is-okay.png",
            imageAlt: "Alt er ok skærm",
          },
        ],
        showcaseTitle: "Det rutetrin, der kører, og filerne der hører til",
        showcaseBody:
          "En ordre lander ikke ved maskinen af sig selv. Den lander som ét trin på en produktionsrute, med det NC-program, det opstillingsark og den tegningsversion, der hører til netop det trin, på den maskine operatøren er logget ind ved.",
        showcaseDrawn: "routes",
        metrics: [
          { metric: "100%", label: "Digital sporbarhed på hver session" },
          { metric: "< 1s", label: "Fra det sker på maskinen, til beskeden er ude" },
          { metric: "0", label: "Papirlister ved maskinen" },
        ],
        related: [
          {
            title: "Stopårsager",
            description: "Et maskinstop kan sætte registreringen i gang af sig selv.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Vedligehold og opgaver",
            description: "Maskinens signaler kan oprette vedligeholdsopgaven.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "Energi og målinger",
            description: "Sensordata går direkte ind i jeres dashboards.",
            href: "/features/energy-and-telemetry",
          },
        ],
      },
    },
  },
]

/**
 * Nav entries for the capability pages, in file order. The eyebrow doubles as
 * the short label, it is what each page already calls itself in its header, so
 * the nav and the page can never disagree.
 */
export function featureNavItems(locale: Locale) {
  return features.map((entry) => ({
    title: entry.content[locale].eyebrow,
    href: entry.href,
  }))
}

export const { slugs: featureSlugs, get: getFeature } = buildLookup(features)
export { features }
