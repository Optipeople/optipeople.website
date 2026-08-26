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
        heroImage: "/images/report-mockup4.png",
        heroImageAlt:
          "Four OptiPeople dashboard views showing OEE tracking, production reports, and real-time monitoring",
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
            image: "/images/dashboard1.png",
            imageAlt:
              "Production timeline showing machine status and unit per hour chart across a shift",
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
        showcaseImage: "/images/report-mockup5.png",
        showcaseAlt:
          "Two OptiPeople report views showing production blocks and OEE gauges side by side",
        metrics: [
          { metric: "15–25%", label: "OEE improvement in the first year" },
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
          "Følg OEE i realtid, se hvor produktionstiden går tabt, og forstå performance på tværs af skift, linjer og maskiner.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Produktionseffektivitet",
        heroTitle: "Se hvor produktionstiden går tabt",
        heroBody:
          "Følg OEE live og forstå performance på tværs af skift, linjer og maskiner baseret på reelle produktionsdata.",
        heroImage: "/images/report-mockup4.png",
        heroImageAlt: "OptiPeople dashboards til OEE og produktion",
        valueTitle: "Produktionsdata skal arbejde lige så hårdt som teamet",
        valueBody:
          "Når tal samles efter dagen er slut, er det for sent at handle. Produktionseffektivitet giver et live, præcist billede mens beslutninger stadig kan gøre en forskel.",
        capabilitiesTitle: "Fra rå signaler til reel forståelse",
        capabilitiesBody:
          "Hver maskine fortæller en historie. Vi oversætter den til tal, tidslinjer og sammenligninger teamet kan bruge.",
        capabilities: [
          {
            title: "Live OEE i ét overblik",
            description:
              "Availability, performance og quality beregnes automatisk fra maskinsignaler og opdateres mens produktionen kører.",
            image: "/images/report-mockup1.png",
            imageAlt: "OEE-dashboard",
          },
          {
            title: "Se hvad der skete time for time",
            description:
              "Farvekodede tidslinjer viser kørsel, stop, omstilling og idle på hver maskine.",
            image: "/images/dashboard1.png",
            imageAlt: "Produktionstidslinje",
          },
          {
            title: "Sammenlign skift, linjer og maskiner",
            description:
              "Side-by-side performance gør forskelle tydelige og hjælper med at kopiere bedste praksis.",
            image: "/images/report-mockup2.png",
            imageAlt: "Rapport med sammenligning af skift",
          },
        ],
        showcaseTitle: "Det fulde billede fra gulv til ledelse",
        showcaseBody:
          "Operatører ser maskinen. Team leads ser linjen. Ledelsen ser fabrikken. Samme data, rigtigt detaljeniveau.",
        showcaseImage: "/images/report-mockup5.png",
        showcaseAlt: "Rapportoverblik med OEE",
        metrics: [
          { metric: "15-25%", label: "OEE-forbedring det første år" },
          { metric: "2 timer", label: "Sparet dagligt på rapportering" },
          { metric: "< 1 min", label: "Fra maskinhændelse til dashboard" },
        ],
        related: [
          {
            title: "Stopårsagsregistrering",
            description: "Opsaml nedetidsårsager ved kilden.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Analyse og rapportering",
            description: "Gør produktionsdata til klare rapporter.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Kvalitetsstyring",
            description: "Registrer kvalitetsdata dér hvor arbejdet sker.",
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
        showcaseImage: "/images/dashboard1.png",
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
        metaTitle: "Stopårsagsregistrering | OptiPeople",
        metaDescription:
          "Gør nedetid synlig ved kilden med operatørregistrering direkte ved maskinen.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Stopårsagsregistrering",
        heroTitle: "Gør nedetid synlig ved kilden",
        heroBody:
          "Operatører registrerer stop direkte ved maskinen, mens konteksten er frisk. I får rene data, der kan handles på.",
        heroImage: "/images/Stop-Screen-Select.png",
        heroImageAlt: "Skærm til valg af stopårsag",
        valueTitle: "I kan ikke forbedre det, I ikke kan se",
        valueBody:
          "Uden rene stopdata bliver forbedringsprojekter styret af fornemmelser. Stopårsagsregistrering fanger hvert stop, hver årsag og hver varighed.",
        capabilitiesTitle: "Fra maskinstop til struktureret data på sekunder",
        capabilitiesBody:
          "Et enkelt flow der gør hvert stop til viden, produktionen kan lære af.",
        capabilities: [
          {
            title: "Maskinen siger det først",
            description:
              "Når maskinen stopper, bliver operatøren guidet til at registrere årsagen med det samme.",
            image: "/images/Stop-Screen-Red.png",
            imageAlt: "Rød stopskærm",
          },
          {
            title: "Hvert stop får en årsag",
            description:
              "Operatører vælger fra maskinspecifikke årsager, så data bliver struktureret.",
            image: "/images/operatorpanel2.png",
            imageAlt: "Stoplog på operatørpanel",
          },
          {
            title: "Et komplet skiftbillede",
            description:
              "Tidslinjer viser stop, varighed og mønstre på tværs af skift og maskiner.",
            image: "/images/Stop-Screen-Timeline.png",
            imageAlt: "Tidslinje over stop",
          },
        ],
        showcaseTitle: "Stopdata føder det større billede",
        showcaseBody:
          "Hver registrering flyder ind i produktionsdashboardet, så performance og årsager ses samlet.",
        showcaseImage: "/images/dashboard1.png",
        showcaseAlt: "Dashboard med stopdata",
        metrics: [
          { metric: "40%", label: "Mindre uplanlagt nedetid" },
          { metric: "95%+", label: "Stopårsager fanget" },
          { metric: "< 10s", label: "Gennemsnitlig registreringstid" },
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
            description: "Rapportér på tab og forbedringer.",
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
        heroImage: "/images/taskapp2.png",
        heroImageAlt:
          "OptiPeople task management interface showing filterable task list with progress tracking",
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
            image: "/images/taskapp2.png",
            imageAlt:
              "Task list showing open maintenance tasks with search, filters, and remaining time for each task",
          },
          {
            title: "Maintenance Driven by Data, Not Calendars",
            description:
              "Schedule maintenance based on actual machine usage, run hours, and condition signals, not fixed intervals. When a threshold is reached, the task appears automatically. You maintain what needs it, when it needs it.",
            image: "/images/report1.png",
            imageAlt:
              "OEE report showing availability, performance, and timeline chart used to plan maintenance windows",
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
          "Planlæg og udfør forebyggende vedligehold baseret på brug, tilstand og opgavestatus.",
        parentLabel: "Vedligehold",
        parentHref: "/modules/maintenance",
        eyebrow: "Vedligehold og opgaver",
        heroTitle: "Gør vedligehold planlagt og synligt",
        heroBody:
          "Opret opgaver, tildel ansvar, og planlæg service ud fra faktisk brug og maskintilstand.",
        heroImage: "/images/taskapp2.png",
        heroImageAlt: "Vedligeholdsopgaver",
        valueTitle: "Vedligehold fungerer bedst før nedbruddet",
        valueBody:
          "Når driftstimer, alarmer og opgaver bor samme sted, kan teknikere prioritere rigtigt og dokumentere arbejdet uden ekstra papir.",
        capabilitiesTitle: "Fra signal til færdig opgave",
        capabilitiesBody:
          "Vedligeholdsflowet forbinder maskindata, planlægning og udførelse.",
        capabilities: [
          {
            title: "Planer efter brug",
            description:
              "Planlæg service efter driftstimer, cyklusser eller faste intervaller.",
            image: "/images/taskapp1.png",
            imageAlt: "Opgaveapp",
          },
          {
            title: "Opgaver på mobil",
            description:
              "Teknikere ser opgaver, noter og status direkte dér hvor arbejdet udføres.",
            image: "/images/taskapp2.png",
            imageAlt: "Opgavestyring",
          },
          {
            title: "Historik pr. maskine",
            description:
              "Se tidligere service, fejl og handlinger, så gentagelser bliver synlige.",
            image: "/images/backoffice1.png",
            imageAlt: "Backoffice-historik",
          },
        ],
        metrics: [
          { metric: "50%", label: "Mindre uplanlagt nedetid" },
          { metric: "40 timer", label: "Ekstra produktionstid årligt" },
          { metric: "30%", label: "Færre akutte opgaver" },
        ],
        related: [
          {
            title: "Energi og telemetri",
            description: "Brug sensordata til at opdage slid og afvigelser.",
            href: "/features/energy-and-telemetry",
          },
          {
            title: "Maskinstyring",
            description: "Brug maskinsignaler som triggere for opgaver.",
            href: "/features/machine-control",
          },
          {
            title: "Analyse og rapportering",
            description: "Følg vedligeholdseffekt og nedetid.",
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
          "Registrer kvalitetsdata ved kilden og spor afvigelser til maskiner, batches og skift.",
        parentLabel: "QMS",
        parentHref: "/modules/quality",
        eyebrow: "Kvalitetsstyring",
        heroTitle: "Gør kvalitet til en del af flowet",
        heroBody:
          "Flyt kvalitetsregistrering ud til arbejdet, og bind kontroller, afvigelser og handlinger sammen med produktionen.",
        heroImage: "/images/backoffice1.png",
        heroImageAlt: "Kvalitetsstyring",
        valueTitle: "Kvalitet skal registreres dér hvor den skabes",
        valueBody:
          "Digitale kontroller og sporbarhed reducerer forsinkelse, fejl og usikkerhed i kvalitetsarbejdet.",
        capabilitiesTitle: "Kvalitet med fuld kontekst",
        capabilitiesBody:
          "Hændelser forbindes med maskine, produkt, operatør og skift.",
        capabilities: [
          {
            title: "Digitale formularer",
            description: "Guidede kontroller sikrer ensartet datafangst.",
            image: "/images/backoffice1.png",
            imageAlt: "Digital formular",
          },
          {
            title: "Afvigelser og handlinger",
            description: "Log afvigelser og følg korrigerende handlinger til lukning.",
            image: "/images/report-mockup2.png",
            imageAlt: "Afvigelsesrapport",
          },
          {
            title: "Sporbarhed",
            description: "Knyt kvalitetshændelser til batch, maskine og skift.",
            image: "/images/report-mockup5.png",
            imageAlt: "Sporbarhedsrapport",
          },
        ],
        metrics: [
          { metric: "60%", label: "Mindre omarbejde" },
          { metric: "90%", label: "Hurtigere afvigelsesrespons" },
          { metric: "100%", label: "Digital sporbarhed" },
        ],
        related: [
          {
            title: "Produktionseffektivitet",
            description: "Se kvalitet i sammenhæng med OEE.",
            href: "/features/production-efficiency",
          },
          {
            title: "Analyse og rapportering",
            description: "Rapportér kvalitetstrends og afvigelser.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Maskinstyring",
            description: "Giv operatøren feedback ved maskinen.",
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
            image: "/images/report-mockup5.png",
            imageAlt:
              "Two OptiPeople report views showing production blocks overview and OEE dashboard gauges side by side",
          },
        ],
        showcaseTitle: "Every angle of your production, one system",
        showcaseBody:
          "OEE dashboards, stop analysis, shift comparisons, and energy reports all generated from the same live data source.",
        showcaseImage: "/images/report-mockup4.png",
        showcaseAlt:
          "Four OptiPeople dashboard views showing OEE tracking, performance comparisons, and production reports",
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
          "Gør produktionsdata til klare rapporter om performance, tab og omkostninger.",
        parentLabel: "Analyse",
        parentHref: "/modules/analysis",
        eyebrow: "Analyse og rapportering",
        heroTitle: "Rapporter der forklarer hvad der sker",
        heroBody:
          "Automatisér rapporter, og få svar på performance, tab og cost drivers uden manuelt arbejde.",
        heroImage: "/images/report-mockup1.png",
        heroImageAlt: "Rapportering",
        valueTitle: "Rapportering skal være et arbejdsredskab",
        valueBody:
          "Når rapporter er levende og koblet til driften, bliver de en del af forbedringsarbejdet i stedet for en månedlig bagudskuende øvelse.",
        capabilitiesTitle: "Indsigt fra samme datagrundlag",
        capabilitiesBody:
          "Fra live KPI'er til dybe analyser. Samme data, forskellige spørgsmål.",
        capabilities: [
          {
            title: "Automatiske rapporter",
            description: "Rapporter opdateres og sendes uden manuelle udtræk.",
            image: "/images/report-mockup1.png",
            imageAlt: "Automatisk rapport",
          },
          {
            title: "Tabsfordeling",
            description: "Find de stop, produkter og linjer der koster mest.",
            image: "/images/report-mockup2.png",
            imageAlt: "Tabsanalyse",
          },
          {
            title: "Drill-down",
            description: "Gå fra fabriksniveau til maskine, skift og hændelse.",
            image: "/images/report-mockup5.png",
            imageAlt: "Drill-down rapport",
          },
        ],
        metrics: [
          { metric: "80%", label: "Mindre manuel rapportering" },
          { metric: "Live", label: "Opdaterede KPI'er" },
          { metric: "1 kilde", label: "Samlet datagrundlag" },
        ],
        related: [
          {
            title: "AI og copilots",
            description: "Få AI-summaries og mønsterdetektion.",
            href: "/features/ai-and-copilots",
          },
          {
            title: "Energi og telemetri",
            description: "Rapportér energiforbrug og afvigelser.",
            href: "/features/energy-and-telemetry",
          },
          {
            title: "Produktionseffektivitet",
            description: "Forstå OEE og performance over tid.",
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
        metaTitle: "Energi og telemetri | OptiPeople",
        metaDescription:
          "Kobl energi, vibration, flow og temperatur til produktionens output og status.",
        parentLabel: "EMS",
        parentHref: "/modules/energy",
        eyebrow: "Energi og telemetri",
        heroTitle: "Se hvad maskinerne bruger og fortæller",
        heroBody:
          "Forbind energimålere og sensorer med produktionen, så spild, slid og afvigelser bliver synlige.",
        heroImage: "/images/report-mockrup-3.png",
        heroImageAlt: "Energi og telemetri",
        valueTitle: "Sensorer bliver først værdifulde i sammenhæng",
        valueBody:
          "Når telemetry kobles til maskinstatus, produkter og skift, kan teamet skelne normal variation fra reelle problemer.",
        capabilitiesTitle: "Målinger med produktionskontekst",
        capabilitiesBody:
          "Energi og sensorværdier bliver en del af samme driftsbillede som OEE og stop.",
        capabilities: [
          {
            title: "Energiforbrug pr. enhed",
            description: "Følg kWh pr. produkt, ordre og linje.",
            image: "/images/Telemetry-Chart.png",
            imageAlt: "Telemetrigraf",
          },
          {
            title: "Sensortrends",
            description: "Overvåg temperatur, vibration, flow og andre signaler.",
            image: "/images/Telemetry-Numbers.png",
            imageAlt: "Telemetrital",
          },
          {
            title: "Afvigelser",
            description: "Find mønstre der peger på spild, slid eller kommende fejl.",
            image: "/images/report-mockrup-3.png",
            imageAlt: "Afvigelsesrapport",
          },
        ],
        metrics: [
          { metric: "10-20%", label: "Mindre energispild" },
          { metric: "Live", label: "Sensoroverblik" },
          { metric: "1 view", label: "Energi og produktion samlet" },
        ],
        related: [
          {
            title: "Vedligehold og opgaver",
            description: "Brug telemetri til vedligeholdsalarmer.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "AI og copilots",
            description: "Find mønstre i sensordata med AI.",
            href: "/features/ai-and-copilots",
          },
          {
            title: "Analyse og rapportering",
            description: "Rapportér forbrug og optimeringer.",
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
        heroImage: "/images/report-mockup4.png",
        heroImageAlt:
          "Four OptiPeople dashboard views representing the breadth of production data available to AI analysis",
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
            image: "/images/report-mockup5.png",
            imageAlt:
              "Two report views showing production data patterns that AI uses to detect anomalies and trends",
          },
          {
            title: "Decisions Backed by Evidence",
            description:
              "Every AI insight links back to the underlying data. No black boxes. When the copilot suggests focusing on a specific machine or shift, you can drill into the exact numbers and timeline that support the recommendation.",
            image: "/images/dashboard2.png",
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
        metaTitle: "AI og copilots | OptiPeople",
        metaDescription:
          "Stil spørgsmål, find mønstre og understøt beslutninger med AI trænet på jeres produktionsdata.",
        parentLabel: "AI-agenter",
        parentHref: "/ai/agents",
        eyebrow: "AI og copilots",
        heroTitle: "AI trænet på jeres fabrik",
        heroBody:
          "Stil spørgsmål, find mønstre og understøt beslutninger med AI der kender jeres maskiner, skift og historik.",
        heroImage: "/images/report-mockup4.png",
        heroImageAlt: "AI på produktionsdata",
        valueTitle: "Selv den bedste analytiker kan ikke se alt på én gang",
        valueBody:
          "AI kan overvåge store datamængder, finde svage signaler og pege på de mønstre, der kræver handling.",
        capabilitiesTitle: "Intelligens der skaber tillid gennem transparens",
        capabilitiesBody:
          "Hver anbefaling kan spores tilbage til data. Ingen black boxes, kun dokumenterbar indsigt.",
        capabilities: [
          {
            title: "Spørg data",
            description: "Stil spørgsmål i almindeligt sprog og få svar med datagrundlag.",
            image: "/images/report1.png",
            imageAlt: "Rapport til AI-analyse",
          },
          {
            title: "Mønstre mennesker misser",
            description:
              "Find sammenhænge i cyklustid, energi, scrap og nedetid på tværs af datakilder.",
            image: "/images/report-mockup5.png",
            imageAlt: "Datamønstre",
          },
          {
            title: "Beslutninger med evidens",
            description:
              "Hver anbefaling linker tilbage til de tal og tidslinjer, der understøtter den.",
            image: "/images/dashboard2.png",
            imageAlt: "Dashboard med datagrundlag",
          },
        ],
        metrics: [
          { metric: "10x", label: "Hurtigere fra spørgsmål til indsigt" },
          { metric: "24/7", label: "Løbende mønsterdetektion" },
          { metric: "100%", label: "Sporbare indsigter" },
        ],
        related: [
          {
            title: "Analyse og rapportering",
            description: "AI forbedrer rapporter med summaries og anbefalinger.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Energi og telemetri",
            description: "Find sensorpatterns der peger på fejl eller spild.",
            href: "/features/energy-and-telemetry",
          },
          {
            title: "Produktionseffektivitet",
            description: "Lad copiloten forklare OEE-fald.",
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
          "Integrer med maskinstyring for feedback, automatisering og tættere loops mellem system og gulv.",
        parentLabel: "IoT",
        parentHref: "/modules/iot",
        eyebrow: "Maskinstyring",
        heroTitle: "Luk loopet mellem system og gulv",
        heroBody:
          "Integrer med maskinstyringer for operatørlogin, feedback i realtid og tættere produktionsloops.",
        heroImage: "/images/Start-Machine.png",
        heroImageAlt: "Maskinstyringspanel",
        valueTitle: "Dataopsamling starter ved maskinen. Styring bør også.",
        valueBody:
          "Når system og maskinstyring lever hver for sig, opstår huller. OptiPeople forbinder dem, så digitalt flow og fysisk fabrik bevæger sig sammen.",
        capabilitiesTitle: "Fra maskinsignal til operatørhandling og tilbage",
        capabilitiesBody:
          "En tovejsforbindelse mellem produktionssystemet og maskinerne på gulvet.",
        capabilities: [
          {
            title: "Sikker maskinauthentifikation",
            description:
              "Operatører logger ind ved maskinen, så ansvar og sporbarhed starter ved skiftets begyndelse.",
            image: "/images/Login-Machine-Key.png",
            imageAlt: "Maskinlogin",
          },
          {
            title: "Start, stop og status",
            description:
              "Operatører ser forudsætninger og status før produktionen startes.",
            image: "/images/Start-Machine.png",
            imageAlt: "Start maskine",
          },
          {
            title: "Feedback i realtid",
            description:
              "Maskinstatus og alarmer vises direkte på gulvet, når forhold ændrer sig.",
            image: "/images/Everything-is-okay.png",
            imageAlt: "Alt er ok skærm",
          },
        ],
        metrics: [
          { metric: "100%", label: "Digital sporbarhed på sessioner" },
          { metric: "< 1s", label: "Fra maskinhændelse til besked" },
          { metric: "0", label: "Papirbaserede maskinlogs" },
        ],
        related: [
          {
            title: "Stopårsagsregistrering",
            description: "Maskinstop kan trigge registrering automatisk.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Vedligehold og opgaver",
            description: "Maskinsignaler kan skabe vedligeholdsopgaver.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "Energi og telemetri",
            description: "Sensordata føder direkte ind i dashboards.",
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
