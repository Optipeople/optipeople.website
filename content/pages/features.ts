import { buildLookup, type FeaturePage, type LocalizedPage } from "@/content/shared/types"
import type { Locale } from "@/i18n/routing"

const features: LocalizedPage<FeaturePage>[] = [
  {
    slug: "production-planning",
    href: "/features/production-planning",
    content: {
      en: {
        metaTitle: "Production planning | OptiPeople",
        metaDescription:
          "Sequence work orders across every entity of each production route, against measured run rates and real availability, and share one plan with the floor.",
        parentLabel: "Planning",
        parentHref: "/modules/planning",
        eyebrow: "Production planning",
        heroTitle: "Plan on the capacity you actually have",
        heroBody:
          "Sequence orders across every entity on each production route, built on measured run rates and real availability of machines and workstations, and share the same plan with everyone who has to deliver it.",
        heroImage: "/images/Mockups/Work-Order-Management-Planning-Desktop.webp",
        heroImageAlt: "Production planning board in OptiPeople Data Platform",
        valueTitle: "A plan is only as good as the numbers under it",
        valueBody:
          "Most plans are built from standard times set years ago and a capacity figure nobody has re-measured. The plan looks fine on Monday and has drifted by Wednesday. When planning reads from the same data as the floor, the run rates and the available hours are the ones the machines and workstations actually delivered, so the plan starts realistic and stays that way.",
        capabilitiesTitle: "Planning that stays connected to the floor",
        capabilitiesBody:
          "The plan, the orders, and the registrations from the floor share one data foundation, so a change in one shows up in the others.",
        capabilities: [
          {
            title: "Routes, not one flat timeline",
            description:
              "Each product has a route: cut, mill, glue, assemble, pack. Orders are sequenced across every entity on that route, so a slip at station two is visibly a problem at station five.",
            image: "/images/Mockups/Planning-Timeline-Close.png",
            imageAlt: "Planning timeline grouped by production route",
          },
          {
            title: "Capacity and run rates from real data",
            description:
              "Schedule against real available hours per machine or workstation, with shift patterns and planned maintenance accounted for. Standard times come from what was actually produced, per item and per setup.",
            image: "/images/Mockups/Work-Order-Management-Planning-Desktop.webp",
            imageAlt: "Work orders scheduled against available capacity",
          },
          {
            title: "One plan, visible on the floor",
            description:
              "Operators see the same sequence the planner sees, on the panel at the machine or workstation. When a breakdown or a rush order hits, replan the affected window and see the knock-on effects right away.",
            image: "/images/Mockups/Dashboard-Operator-Panel-Desktop.webp",
            imageAlt: "Operator panel showing the planned sequence",
          },
        ],
        showcaseTitle: "One row per entity, grouped by route",
        showcaseBody:
          "Progress reports itself from the floor as the order moves along the route, so the plan always shows where each order actually is.",
        showcaseDrawn: "routes",
        metrics: [
          { metric: "Per route", label: "Sequenced across every entity, not one flat line" },
          { metric: "Measured", label: "Capacity from real output, not estimates" },
          { metric: "One plan", label: "Shared by planning and the shopfloor" },
        ],
        related: [
          {
            title: "Order management",
            description: "Run orders at the machine or workstation with instructions, SOPs, and traceability.",
            href: "/features/order-management",
          },
          {
            title: "Production efficiency",
            description: "Track OEE in real time and see where production time is lost.",
            href: "/features/production-efficiency",
          },
          {
            title: "Maintenance and tasks",
            description: "Plan preventive maintenance by usage and condition.",
            href: "/features/maintenance-and-tasks",
          },
        ],
      },
      da: {
        metaTitle: "Produktionsplanlægning | OptiPeople",
        metaDescription:
          "Læg ordrerne gennem hele produktionsruten efter målte kørehastigheder og den kapacitet, I faktisk har, og del den samme plan med gulvet.",
        parentLabel: "Planlægning",
        parentHref: "/modules/planning",
        eyebrow: "Produktionsplanlægning",
        heroTitle: "Planlæg efter den kapacitet, I faktisk har",
        heroBody:
          "Læg ordrerne gennem hver station på produktionsruten, ud fra de kørehastigheder og den tid, maskiner og arbejdsstationer reelt har. Alle, der skal levere planen, ser den samme.",
        heroImage: "/images/Mockups/Work-Order-Management-Planning-Desktop.webp",
        heroImageAlt: "Planlægningstavlen i OptiPeople Data Platform",
        valueTitle: "Planen er ikke bedre end tallene under den",
        valueBody:
          "De fleste planer bygger på standardtider, der blev sat for mange år siden, og en kapacitet, ingen har målt siden. Planen ser fin ud mandag og er skredet onsdag. Når planlægningen læser de samme data som gulvet, er kørehastigheder og ledige timer dem, maskinerne og arbejdsstationerne faktisk leverede. Så starter planen realistisk og bliver ved med at være det.",
        capabilitiesTitle: "Planlægning, der hænger sammen med gulvet",
        capabilitiesBody:
          "Planen, ordrerne og det, der bliver registreret på gulvet, ligger på de samme data. Ændrer det ene sig, kan I se det i det andet.",
        capabilities: [
          {
            title: "Ruter, ikke én flad tidslinje",
            description:
              "Hvert produkt har sin rute: skære, fræse, lime, samle, pakke. Ordrerne bliver lagt gennem hver station på ruten, så en forsinkelse på station to tydeligt er et problem på station fem.",
            image: "/images/Mockups/Planning-Timeline-Close.png",
            imageAlt: "Tidslinje grupperet efter produktionsrute",
          },
          {
            title: "Kapacitet og kørehastigheder fra rigtige data",
            description:
              "Planlæg efter de timer, hver maskine eller arbejdsstation reelt har, med skiftmønstre og planlagt vedligehold regnet med. Standardtiderne kommer fra det, der faktisk blev produceret, pr. vare og pr. omstilling.",
            image: "/images/Mockups/Work-Order-Management-Planning-Desktop.webp",
            imageAlt: "Ordrer lagt ind efter ledig kapacitet",
          },
          {
            title: "Én plan, som gulvet også ser",
            description:
              "Operatøren ser den samme rækkefølge som planlæggeren, på skærmen ved maskinen eller arbejdsstationen. Kommer der et nedbrud eller en hasteordre, lægger I det berørte stykke om og ser med det samme, hvad det betyder for resten.",
            image: "/images/Mockups/Dashboard-Operator-Panel-Desktop.webp",
            imageAlt: "Operatørpanel med den planlagte rækkefølge",
          },
        ],
        showcaseTitle: "Én række pr. station, grupperet efter rute",
        showcaseBody:
          "Fremdriften melder sig selv fra gulvet, mens ordren bevæger sig gennem ruten. Så viser planen altid, hvor hver ordre faktisk er.",
        showcaseDrawn: "routes",
        metrics: [
          { metric: "Pr. rute", label: "Lagt gennem hver station, ikke én flad linje" },
          { metric: "Målt", label: "Kapacitet ud fra det, der reelt blev lavet" },
          { metric: "Én plan", label: "Fælles for planlægning og gulvet" },
        ],
        related: [
          {
            title: "Ordrestyring",
            description: "Kør ordrerne ved maskinen eller arbejdsstationen med instruktioner og sporbarhed.",
            href: "/features/order-management",
          },
          {
            title: "Produktionseffektivitet",
            description: "Følg OEE live, og se, hvor tiden går tabt.",
            href: "/features/production-efficiency",
          },
          {
            title: "Vedligehold og opgaver",
            description: "Planlæg vedligeholdet efter brug og tilstand.",
            href: "/features/maintenance-and-tasks",
          },
        ],
      },
    },
  },
  {
    slug: "order-management",
    href: "/features/order-management",
    content: {
      en: {
        metaTitle: "Order management | OptiPeople",
        metaDescription:
          "Run production orders at the machine or workstation, with work order instructions, standard operating procedures, and traceability on every order. ERP optional.",
        parentLabel: "Orders",
        parentHref: "/modules/erp-shopfloor",
        eyebrow: "Order management",
        heroTitle: "Every order, from plan to finished product",
        heroBody:
          "Orders are the basis for both planning production and executing the plan. Operators see what to run next, with the work order instructions and standard operating procedures that belong to it, and report quantities and scrap where the work happens.",
        heroImage: "/images/Mockups/Work-Order-Management-Orders.webp",
        heroImageAlt: "The work order list on the panel at the machine or workstation",
        valueTitle: "The order is where planning and the floor meet",
        valueBody:
          "In many factories the order lives in three places: the ERP, the planner's spreadsheet, and a printout at the machine. None of them agree by the afternoon. When the order itself carries the plan, the instructions, and the registrations from the floor, everyone works from the same order, and every finished job leaves real run times, real output, and full traceability behind.",
        capabilitiesTitle: "From order list to finished job",
        capabilitiesBody:
          "One screen at the machine or workstation for everything the operator needs to run the order, and one record behind it that planning, quality, and management read from.",
        capabilities: [
          {
            title: "The order list for this station",
            description:
              "Filtered to the machine or workstation in front of you, in priority order, with quantity, product, and due date. Start the job, stop it, and register why it stopped, without anything to learn beyond the buttons an operator needs.",
            image: "/images/Mockups/Work-Order-Management-Orders.webp",
            imageAlt: "Work order list with priority, product, quantity, and due date",
          },
          {
            title: "Work order instructions and SOPs",
            description:
              "Each order brings its work order instructions and standard operating procedures to the machine or workstation, in the version that applies. The plan is executed the same way every time, whoever is on shift.",
            image: "/images/Mockups/Dashboard-Operator-Panel-Desktop.webp",
            imageAlt: "Operator panel at the machine or workstation",
          },
          {
            title: "Quantities, scrap, and traceability",
            description:
              "Good parts, scrap, and reason codes are registered as the job runs. Every order records which machine or workstation ran it, which operator, which shift, and which batch, so a finished product can be traced back through production.",
            image: "/images/Mockups/Report-Production-Counters-Desktop.webp",
            imageAlt: "Produced and rejected totals per order with an hourly output trend",
          },
        ],
        showcaseTitle: "With or without an ERP",
        showcaseBody:
          "Create and manage orders in the platform itself, or sync them two ways with your ERP so orders flow down and actual quantities, scrap, and times flow back.",
        showcaseImage: "/images/Mockups/Work-Order-Management-Planning-Desktop.webp",
        showcaseAlt: "Work orders in OptiPeople Data Platform",
        metrics: [
          { metric: "0", label: "ERP integrations required to start" },
          { metric: "1 screen", label: "For the operator: what to run, how, and what was made" },
          { metric: "Every order", label: "Traceable to machine or workstation, operator, shift, and batch" },
        ],
        related: [
          {
            title: "Production planning",
            description: "Sequence orders across each production route, against the capacity you actually have.",
            href: "/features/production-planning",
          },
          {
            title: "Quality management",
            description:
              "Register quality data where it happens. Trace deviations back to machines or workstations, batches, and shifts.",
            href: "/features/quality-management",
          },
          {
            title: "Stop cause registration",
            description: "Capture downtime reasons at the source. Clean data you can actually act on.",
            href: "/features/stop-cause-registration",
          },
        ],
      },
      da: {
        metaTitle: "Ordrestyring | OptiPeople",
        metaDescription:
          "Kør produktionsordrerne ved maskinen eller arbejdsstationen, med arbejdsinstruktioner, standardprocedurer og sporbarhed på hver ordre. Med eller uden ERP.",
        parentLabel: "Ordrer",
        parentHref: "/modules/erp-shopfloor",
        eyebrow: "Ordrestyring",
        heroTitle: "Hver ordre, fra plan til færdigt produkt",
        heroBody:
          "Ordrerne er grundlaget for både at planlægge produktionen og at føre planen ud i livet. Operatøren ser, hvad der skal køres, sammen med de arbejdsinstruktioner og standardprocedurer, der hører til, og melder antal og kassation dér, hvor arbejdet sker.",
        heroImage: "/images/Mockups/Work-Order-Management-Orders.webp",
        heroImageAlt: "Ordrelisten på skærmen ved maskinen eller arbejdsstationen",
        valueTitle: "Det er i ordren, planen og gulvet mødes",
        valueBody:
          "På mange fabrikker ligger ordren tre steder: i ERP'et, i planlæggerens regneark og på et print ved maskinen. Ved frokosttid passer de ikke længere sammen. Når selve ordren har planen, instruktionerne og registreringerne fra gulvet med sig, arbejder alle ud fra den samme ordre. Og hvert færdigt job efterlader reelle tider, reelle antal og fuld sporbarhed.",
        capabilitiesTitle: "Fra ordreliste til færdigt job",
        capabilitiesBody:
          "Én skærm ved maskinen eller arbejdsstationen med det, operatøren skal bruge for at køre ordren. Bagved ligger én registrering, som planlægning, kvalitet og ledelse læser fra.",
        capabilities: [
          {
            title: "Ordrelisten for netop den station",
            description:
              "Sorteret efter, hvad der er vigtigst, med antal, vare og leveringsdato. Start jobbet, stop det, og meld, hvorfor det stoppede. Ikke flere knapper, end en operatør har brug for.",
            image: "/images/Mockups/Work-Order-Management-Orders.webp",
            imageAlt: "Ordreliste med prioritet, vare, antal og leveringsdato",
          },
          {
            title: "Arbejdsinstruktioner og standardprocedurer",
            description:
              "Hver ordre har sine arbejdsinstruktioner og standardprocedurer med ud til maskinen eller arbejdsstationen, i den version, der gælder. Så bliver planen udført på samme måde hver gang, uanset hvem der er på skift.",
            image: "/images/Mockups/Dashboard-Operator-Panel-Desktop.webp",
            imageAlt: "Operatørpanelet ved maskinen eller arbejdsstationen",
          },
          {
            title: "Antal, kassation og sporbarhed",
            description:
              "Gode emner, kassation og årsag bliver registreret, mens jobbet kører. Hver ordre gemmer, hvilken maskine eller arbejdsstation der kørte den, hvilken operatør, hvilket skift og hvilken batch. Så kan et færdigt produkt spores tilbage gennem produktionen.",
            image: "/images/Mockups/Report-Production-Counters-Desktop.webp",
            imageAlt: "Producerede og kasserede emner pr. ordre og output pr. time",
          },
        ],
        showcaseTitle: "Med eller uden ERP",
        showcaseBody:
          "Opret og styr ordrerne i platformen, eller kobl jeres ERP på begge veje, så ordrerne kommer ned på gulvet, og antal, kassation og tider går tilbage.",
        showcaseImage: "/images/Mockups/Work-Order-Management-Planning-Desktop.webp",
        showcaseAlt: "Arbejdsordrer i OptiPeople Data Platform",
        metrics: [
          { metric: "0", label: "ERP-koblinger, før I kan komme i gang" },
          { metric: "1 skærm", label: "Til operatøren: hvad skal køre, hvordan, og hvad blev lavet" },
          { metric: "Hver ordre", label: "Kan spores til maskine eller arbejdsstation, operatør, skift og batch" },
        ],
        related: [
          {
            title: "Produktionsplanlægning",
            description: "Læg ordrerne gennem hele ruten efter den kapacitet, I faktisk har.",
            href: "/features/production-planning",
          },
          {
            title: "Kvalitetsstyring",
            description: "Registrer kvalitetsdata dér, hvor arbejdet sker.",
            href: "/features/quality-management",
          },
          {
            title: "Stopårsager",
            description: "Registrer årsagen til stoppet ude ved maskinen eller arbejdsstationen.",
            href: "/features/stop-cause-registration",
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
        metaTitle: "Quality management | OptiPeople",
        metaDescription:
          "Register quality data where it happens. Trace deviations back to machines or workstations, batches, and shifts, and build accountability into production.",
        parentLabel: "Quality (QMS)",
        parentHref: "/modules/quality",
        eyebrow: "Quality management",
        heroTitle: "Catch quality issues where they start",
        heroBody:
          "Register quality data at the machine or workstation, trace deviations back to their source, and build accountability into every shift.",
        heroImage: "/images/backoffice1.webp",
        heroImageAlt:
          "OptiPeople quality tracking interface showing audit trail and device management",
        valueTitle: "Quality problems found late cost ten times more",
        valueBody:
          "When quality data lives in paper forms and disconnected systems, deviations surface too late to prevent waste. By the time the report reaches quality management, the batch is finished and the damage is done. OptiPeople captures quality events in real time, linked to the machine or workstation, the shift, and the conditions that caused them.",
        capabilitiesTitle: "From floor event to traceable record",
        capabilitiesBody:
          "Quality data captured at the source, structured for analysis, and always audit-ready.",
        capabilities: [
          {
            title: "Register quality events at the machine or workstation",
            description:
              "Operators log deviations, scrap, and rework directly at the point of production. Every entry is timestamped and linked to the machine or workstation, order, and shift, so nothing gets lost between the floor and the office.",
            image: "/images/operatorpanel2.webp",
            imageAlt:
              "Operator panel showing detailed event log with quality notes, telemetry data, and shift information",
          },
          {
            title: "Trace every deviation to its source",
            description:
              "When quality drops, you need to know why, fast. Filter by machine or workstation, time range, and event type to see exactly where deviations cluster. Connect quality issues to specific batches, operators, and conditions.",
            image: "/images/report1.webp",
            imageAlt:
              "OptiPeople report showing OEE breakdown with availability, performance, and quality metrics alongside a timeline chart",
          },
          {
            title: "Full audit trail, always available",
            description:
              "Every quality event, every change, every action is logged with who did what and when. Search and filter the complete activity history across machines and sites. Ready for audits, ready for continuous improvement.",
            image: "/images/backoffice1.webp",
            imageAlt:
              "Admin panel showing activity log with date range filters and a device list with machine IDs and locations",
          },
        ],
        metrics: [
          { metric: "30%", label: "Reduction in quality-related scrap" },
          { metric: "100%", label: "Traceability across machines, workstations, and shifts" },
          { metric: "< 5 min", label: "From deviation to documented root cause" },
        ],
        related: [
          {
            title: "Production efficiency",
            description:
              "Track OEE live. Quality is one of the three pillars of overall equipment effectiveness.",
            href: "/features/production-efficiency",
          },
          {
            title: "Stop cause registration",
            description:
              "Capture downtime reasons alongside quality events for a complete production picture.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Analysis and reporting",
            description:
              "Turn quality data into trend reports that drive continuous improvement.",
            href: "/features/analysis-and-reporting",
          },
        ],
      },
      da: {
        metaTitle: "Kvalitetsstyring | OptiPeople",
        metaDescription:
          "Registrer kvalitetsdata dér, hvor arbejdet sker, og følg en afvigelse tilbage til maskine eller arbejdsstation, batch og skift.",
        parentLabel: "Kvalitet (QMS)",
        parentHref: "/modules/quality",
        eyebrow: "Kvalitetsstyring",
        heroTitle: "Fang fejlen, hvor den opstår",
        heroBody:
          "Registrer kvaliteten ude ved maskinen eller arbejdsstationen, og følg hver afvigelse tilbage til det skift, den batch og den maskine, den kom fra.",
        heroImage: "/images/backoffice1.webp",
        heroImageAlt: "Kvalitetsstyring",
        valueTitle: "Jo senere I opdager fejlen, jo dyrere bliver den",
        valueBody:
          "Ligger kvalitetsdata i papirskemaer og spredte systemer, opdager I afvigelsen for sent: batchen er kørt, og skaden er sket. Her bliver hver afvigelse registreret med det samme og koblet til maskinen eller arbejdsstationen, skiftet og det, der gik forud.",
        capabilitiesTitle: "Fra hændelse på gulvet til et spor, I kan følge",
        capabilitiesBody:
          "Hver registrering hænger sammen med maskine eller arbejdsstation, produkt, operatør og skift.",
        capabilities: [
          {
            title: "Digitale skemaer",
            description: "Guidede kontroller sikrer, at det bliver registreret ens hver gang.",
            image: "/images/backoffice1.webp",
            imageAlt: "Digital formular",
          },
          {
            title: "Afvigelser og handlinger",
            description: "Skriv afvigelsen ned, og følg handlingen hele vejen, til den er lukket.",
            image: "/images/report-mockup2.webp",
            imageAlt: "Afvigelsesrapport",
          },
          {
            title: "Sporbarhed",
            description: "Knyt kvalitetstjek og afvigelser til batch, maskine eller arbejdsstation og skift.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.webp",
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
    slug: "machine-control",
    href: "/features/machine-control",
    content: {
      en: {
        metaTitle: "Machine control | OptiPeople",
        metaDescription:
          "Integrate with machine control systems to enable feedback, automation, and tighter production loops across the factory.",
        parentLabel: "IoT",
        parentHref: "/modules/iot",
        eyebrow: "Machine control",
        heroTitle: "Close the loop between system and floor",
        heroBody:
          "Integrate with machine control systems to enable operator authentication, real-time feedback, and tighter production loops across the factory.",
        heroImage: "/images/Start-Machine.png",
        heroImageAlt:
          "OptiPeople machine control panel showing the start machine interface for a Homag machine",
        valueTitle: "Data collection starts at the machine. Control should too",
        valueBody:
          "When your production system and your machine control live in separate worlds, gaps appear. Operators work without feedback. Events go unrecorded. Start and stop times drift from reality. OptiPeople connects directly to the machine control layer, so the digital system and the physical factory move together.",
        capabilitiesTitle: "From machine and workstation data to operator action and back",
        capabilitiesBody:
          "A two-way connection between your production system and every machine on the floor.",
        capabilities: [
          {
            title: "Secure machine authentication",
            description:
              "Every operator authenticates at the machine with a unique key before starting production. You know who is running what, when, and on which machine, creating accountability and traceability from the first moment of a shift.",
            image: "/images/Login-Machine-Key.png",
            imageAlt:
              "Machine key authentication screen where operators enter their unique key to access the machine",
          },
          {
            title: "Start, stop, and status in one place",
            description:
              "Operators control machine start and stop directly from the panel. The system confirms the machine is ready, the operator is authenticated, and all prerequisites are met. One tap to start production, with a full digital trail.",
            image: "/images/Start-Machine.png",
            imageAlt:
              "Operator panel showing the start machine button with green indicator for a Homag machine",
          },
          {
            title: "Real-time feedback to the floor",
            description:
              "Machine status flows back to the operator in real time. Green means everything checks out. When conditions change (a sensor threshold, a quality alert, or a maintenance trigger), the operator sees it immediately. No surprises, no lag between event and awareness.",
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
            title: "Stop cause registration",
            description:
              "When a machine stops, the control integration triggers stop registration automatically.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Maintenance and tasks",
            description:
              "Machine signals trigger maintenance tasks when thresholds are reached.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "Energy and process data",
            description:
              "Sensor data from the machine control layer feeds directly into telemetry dashboards.",
            href: "/features/energy-and-telemetry",
          },
        ],
      },
      da: {
        metaTitle: "Maskinstyring | OptiPeople",
        metaDescription:
          "Kobl OptiPeople på maskinstyringen. Operatøren logger ind ved maskinen, får besked med det samme, og systemet passer med det, der sker på gulvet.",
        parentLabel: "IoT",
        parentHref: "/modules/iot",
        eyebrow: "Maskinstyring",
        heroTitle: "Få system og gulv til at følges ad",
        heroBody:
          "Kobl OptiPeople på maskinstyringen. Så logger operatøren ind ved maskinen, får besked med det samme, og det, der står i systemet, passer med det, der sker på gulvet.",
        heroImage: "/images/Start-Machine.png",
        heroImageAlt: "Maskinstyringspanel",
        valueTitle: "Når data kommer fra maskinen, skal styringen også sidde der",
        valueBody:
          "Når systemet og maskinstyringen lever hver for sig, opstår der huller. Operatøren får ingen besked, hændelser bliver ikke registreret, og start- og stoptider passer ikke med virkeligheden. OptiPeople kobler sig direkte på maskinstyringen, så systemet og fabrikken følges ad.",
        capabilitiesTitle: "Fra maskiner og arbejdsstationer til operatør og tilbage igen",
        capabilitiesBody:
          "En forbindelse, der går begge veje, mellem produktionssystemet og maskinerne på gulvet.",
        capabilities: [
          {
            title: "Sikkert login ved maskinen",
            description:
              "Operatøren logger ind ved maskinen med sin egen nøgle, før produktionen starter. Så ved I fra skiftets første minut, hvem der kører hvad, hvornår og på hvilken maskine.",
            image: "/images/Login-Machine-Key.png",
            imageAlt: "Maskinlogin",
          },
          {
            title: "Start, stop og status",
            description:
              "Operatøren starter og stopper maskinen direkte fra panelet. Systemet tjekker først, at maskinen er klar, og at operatøren er logget ind. Ét tryk, og det hele bliver registreret.",
            image: "/images/Start-Machine.png",
            imageAlt: "Start maskine",
          },
          {
            title: "Besked med det samme",
            description:
              "Grønt betyder, at alt er i orden. Når noget ændrer sig, f.eks. en sensor over grænsen, en kvalitetsalarm eller et serviceinterval, der er nået, ser operatøren det med det samme.",
            image: "/images/Everything-is-okay.png",
            imageAlt: "Operatørpanel, der viser, at alt er i orden",
          },
        ],
        showcaseTitle: "Det rutetrin, der kører, og filerne, der hører til",
        showcaseBody:
          "En ordre lander ikke ved maskinen af sig selv. Den lander som ét trin på en produktionsrute, med det NC-program, det opstillingsark og den tegningsversion, der hører til netop det trin, på den maskine, operatøren er logget ind ved.",
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
            title: "Energi og procesdata",
            description: "Sensordata går direkte ind i jeres dashboards.",
            href: "/features/energy-and-telemetry",
          },
        ],
      },
    },
  },
  {
    slug: "production-efficiency",
    href: "/features/production-efficiency",
    content: {
      en: {
        metaTitle: "Production efficiency | OptiPeople",
        metaDescription:
          "Track OEE in real time, see where production time is lost, and understand performance across shifts, lines, and machines or workstations, based on real production data.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Production efficiency",
        heroTitle: "See where production time is lost",
        heroBody:
          "Track OEE live and understand performance across shifts, lines, and machines or workstations, based on real production data, not guesswork.",
        heroImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.webp",
        heroImageAlt:
          "OptiPeople efficiency report with live availability, performance, and OEE gauges against target",
        valueTitle: "Your production data should work as hard as your team",
        valueBody:
          "Most factories still piece together performance from shift handover notes, spreadsheets, and end-of-day reports. By the time someone sees the numbers, the moment to act has passed. Production Efficiency gives you a live, accurate picture, so decisions happen while they still matter.",
        capabilitiesTitle: "From raw signals to real understanding",
        capabilitiesBody:
          "Every machine tells a story. Production Efficiency translates it into numbers, timelines, and comparisons your team can act on.",
        capabilities: [
          {
            title: "Live OEE in one view",
            description:
              "Availability, performance, and quality calculated automatically from machine and workstation data. Your OEE score updates as production runs, with drill-down by machine or workstation, line, or area. No spreadsheets. No waiting for the shift report.",
            image: "/images/report-mockup1.png",
            imageAlt:
              "OptiPeople OEE dashboard showing availability gauge, unit counter, and parts per hour chart",
          },
          {
            title: "See what happened, hour by hour",
            description:
              "Color-coded timelines show running, stopped, setup, and idle states for every machine. Spot patterns that shift reports miss, like the 20 minutes lost to changeover every morning that nobody talks about.",
            image: "/images/Mockups/Report-OEE-Efficiency-With-Filter.webp",
            imageAlt:
              "Timeline chart showing running, stopped, setup, and idle states across a full shift",
          },
          {
            title: "Compare shifts, lines, and machines",
            description:
              "Side-by-side performance data across any dimension you care about. See which shifts consistently outperform, which lines underdeliver, and where the gap between best and worst is widest.",
            image: "/images/report-mockup2.webp",
            imageAlt:
              "Bar chart report comparing production performance across shifts and lines",
          },
        ],
        showcaseTitle: "The full picture, from floor to management",
        showcaseBody:
          "Operators see their machine or workstation. Team leads see their line. Managers see the plant. Same data, right level of detail.",
        showcaseImage: "/images/Mockups/Report-Production-Counters-Desktop.webp",
        showcaseAlt:
          "OptiPeople production counter report with produced and rejected totals and an hourly output trend",
        metrics: [
          { metric: "15-25%", label: "OEE improvement in the first year" },
          { metric: "2 hrs", label: "Saved daily on manual reporting" },
          { metric: "< 1 min", label: "From machine event to dashboard" },
        ],
        related: [
          {
            title: "Stop cause registration",
            description:
              "Capture downtime reasons at the source. Clean data you can actually act on.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Analysis and reporting",
            description:
              "Turn production data into clear reports on performance, losses, and cost drivers.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Quality management",
            description:
              "Register quality data where it happens. Trace deviations back to machines or workstations, batches, and shifts.",
            href: "/features/quality-management",
          },
        ],
      },
      da: {
        metaTitle: "Produktionseffektivitet | OptiPeople",
        metaDescription:
          "Følg OEE, mens produktionen kører. Se, hvor tiden går tabt, og hvordan skift, linjer og maskiner eller arbejdsstationer klarer sig.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Produktionseffektivitet",
        heroTitle: "Se, hvor produktionstiden går tabt",
        heroBody:
          "Følg OEE live, og se, hvordan hvert skift, hver linje og hver maskine eller arbejdsstation klarer sig. Tallene kommer fra produktionen selv, ikke fra mavefornemmelser.",
        heroImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.webp",
        heroImageAlt: "OptiPeople-effektivitetsrapport med tilgængelighed, ydelse og OEE mod målet",
        valueTitle: "Tallene nytter mest, mens skiftet stadig kører",
        valueBody:
          "De fleste fabrikker stykker stadig tallene sammen fra overleveringssedler, regneark og dagsrapporter. Når nogen endelig ser dem, er det for sent at gøre noget. Her ser I, hvordan det går lige nu, mens I stadig kan nå at rette op.",
        capabilitiesTitle: "Fra data fra maskiner og arbejdsstationer til noget, I kan bruge",
        capabilitiesBody:
          "Hver maskine har noget at fortælle. Vi laver det om til tal, tidslinjer og sammenligninger, I kan bruge til noget.",
        capabilities: [
          {
            title: "OEE live på én skærm",
            description:
              "Tilgængelighed, ydelse og kvalitet bliver regnet ud fra data fra maskiner og arbejdsstationer og opdateret, mens produktionen kører. Ingen regneark, og ingen venten på skiftrapporten.",
            image: "/images/report-mockup1.png",
            imageAlt: "OEE-dashboard",
          },
          {
            title: "Se, hvad der skete, time for time",
            description:
              "Farvekodede tidslinjer viser, hvornår hver maskine kørte, stod stille, blev stillet om eller ventede. Så ser I også de 20 minutter til omstilling hver morgen, som ingen taler om.",
            image: "/images/Mockups/Report-OEE-Efficiency-With-Filter.webp",
            imageAlt: "Tidslinje med kørsel, stop, omstilling og tomgang hen over et helt skift",
          },
          {
            title: "Sammenlign skift, linjer og maskiner",
            description:
              "Se tallene side om side: hvilke skift der klarer sig bedst, hvilke linjer der halter, og hvor afstanden mellem bedst og dårligst er størst.",
            image: "/images/report-mockup2.webp",
            imageAlt: "Rapport med sammenligning af skift",
          },
        ],
        showcaseTitle: "Hele billedet, fra gulvet til ledelsen",
        showcaseBody:
          "Operatøren ser sin maskine eller arbejdsstation. Teamlederen ser sin linje. Ledelsen ser fabrikken. Det er de samme tal, bare i den detaljegrad, hver især har brug for.",
        showcaseImage: "/images/Mockups/Report-Production-Counters-Desktop.webp",
        showcaseAlt: "Rapport med producerede og kasserede emner samt output pr. time",
        metrics: [
          { metric: "15-25%", label: "Bedre OEE det første år" },
          { metric: "2 timer", label: "Sparet på rapportering om dagen" },
          { metric: "< 1 min", label: "Fra det sker på maskinen, til det står på skærmen" },
        ],
        related: [
          {
            title: "Stopårsager",
            description: "Registrer årsagen til stoppet ude ved maskinen eller arbejdsstationen.",
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
        metaTitle: "Stop cause registration | OptiPeople",
        metaDescription:
          "Make downtime visible at the source. Operators register stops directly at the machine or workstation, giving you clean data you can actually act on.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Stop cause registration",
        heroTitle: "Make downtime visible at the source",
        heroBody:
          "Operators register stops directly at the machine or workstation, while the context is fresh. You get clean, structured data you can actually act on.",
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
            title: "The machine tells you first",
            description:
              "When a machine stops, the operator panel turns red immediately. No ambiguity, no delay. The operator taps the screen to acknowledge the stop and begin registration, right there, right then, while the context is fresh.",
            image: "/images/Stop-Screen-Red.png",
            imageAlt:
              "Operator panel showing red alert screen with the message the machine is stopped",
          },
          {
            title: "Every stop gets a reason",
            description:
              "Operators pick from a predefined list of stop causes, tailored to each machine or workstation. Setup, tool change, material wait, malfunction. Each entry captures the reason, duration, and optional notes. The result is structured data, not free-text guesswork.",
            image: "/images/operatorpanel2.webp",
            imageAlt:
              "Detailed stop log showing stop reasons, telemetry data, and operator notes across shifts",
          },
          {
            title: "A complete picture of every shift",
            description:
              "All stops appear on a color-coded timeline, filterable by shift, machine or workstation, and severity. Hover over any block to see exactly what happened, when, and for how long. Patterns that were invisible in shift handover notes become obvious at a glance.",
            image: "/images/Stop-Screen-Timeline.png",
            imageAlt:
              "Color-coded stop timeline showing all stops across a shift with details on hover",
          },
        ],
        showcaseTitle: "Stop data feeds the bigger picture",
        showcaseBody:
          "Every registered stop flows into your production dashboard. Machine status, timelines, and performance metrics update in real time, giving the full story behind the numbers.",
        showcaseImage: "/images/Mockups/Report-Individual-Events-Desktop.webp",
        showcaseAlt:
          "Live production status dashboard showing machine states, timeline, and units per hour chart",
        metrics: [
          { metric: "40%", label: "Reduction in unplanned downtime" },
          { metric: "95%+", label: "Stop cause capture rate" },
          { metric: "< 10s", label: "Average time to register a stop" },
        ],
        related: [
          {
            title: "Production efficiency",
            description:
              "Track OEE live and understand performance across shifts, lines, and machines or workstations.",
            href: "/features/production-efficiency",
          },
          {
            title: "Maintenance and tasks",
            description:
              "Plan and execute preventive maintenance based on usage and condition.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "Analysis and reporting",
            description:
              "Turn production data into clear reports on performance, losses, and cost drivers.",
            href: "/features/analysis-and-reporting",
          },
        ],
      },
      da: {
        metaTitle: "Stopregistrering ved maskinen | OptiPeople",
        metaDescription:
          "Stopregistrering, der passer til gulvet: maskinen melder stoppet, og operatøren vælger stopårsagen ved maskinen. Så ved I, hvor nedetiden går hen.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Stopregistrering",
        heroTitle: "Stopregistrering, der viser, hvor nedetiden går hen",
        heroBody:
          "Maskinen melder selv stoppet. Operatøren vælger årsagen på panelet ved maskinen, mens det stadig står klart, hvad der skete. Så får I tal, der er til at stole på og til at gøre noget ved.",
        heroImage: "/images/Stop-Screen-Select.png",
        heroImageAlt: "Skærm til valg af stopårsag",
        valueTitle: "Det, I ikke kan se, kan I ikke rette",
        valueBody:
          "Meget nedetid bliver aldrig skrevet ned, eller den havner bagefter i en uklar kategori. Så bygger forbedringerne på mavefornemmelser. Her bliver hvert stop registreret: hvad der skete, hvorfor, og hvor længe det varede. Så ved I, hvor I skal sætte ind.",
        capabilitiesTitle: "Fra maskinstop til brugbare tal på få sekunder",
        capabilitiesBody:
          "Tre trin, og hvert stop bliver til noget, I kan lære af.",
        capabilities: [
          {
            title: "Maskinen melder stop med det samme",
            description:
              "Når maskinen stopper, bliver operatørpanelet rødt med det samme. Operatøren trykker på skærmen og registrerer stoppet, mens det stadig står klart, hvad der skete.",
            image: "/images/Stop-Screen-Red.png",
            imageAlt: "Rød stopskærm",
          },
          {
            title: "Hvert stop får en årsag",
            description:
              "Operatøren vælger årsagen fra en fast liste, der passer til lige den maskine eller arbejdsstation: omstilling, værktøjsskift, venter på materiale, fejl. Så kan I regne på tallene bagefter i stedet for at tyde fritekst.",
            image: "/images/operatorpanel2.webp",
            imageAlt: "Stoplog på operatørpanel",
          },
          {
            title: "Hele skiftet på én tidslinje",
            description:
              "Tidslinjen viser hvert stop, hvor længe det varede, og hvad der går igen fra skift til skift og fra maskine til maskine.",
            image: "/images/Stop-Screen-Timeline.png",
            imageAlt: "Tidslinje over stop",
          },
        ],
        showcaseTitle: "Stoppene hænger sammen med resten af tallene",
        showcaseBody:
          "Hvert registreret stop lander i produktionsdashboardet, så I ser tallene og forklaringen bag dem side om side.",
        showcaseImage: "/images/Mockups/Report-Individual-Events-Desktop.webp",
        showcaseAlt: "Dashboard med stopdata",
        metrics: [
          { metric: "40%", label: "Mindre uplanlagt nedetid" },
          { metric: "95%+", label: "Af stoppene får en årsag" },
          { metric: "< 10s", label: "Om at registrere et stop" },
        ],
        related: [
          {
            title: "Produktionseffektivitet",
            description: "Følg OEE live på alle skift, linjer og maskiner eller arbejdsstationer.",
            href: "/features/production-efficiency",
          },
          {
            title: "Vedligehold og opgaver",
            description: "Planlæg vedligehold efter brug og tilstand.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "Analyse og rapportering",
            description: "Se, hvad stoppene koster, og om det bliver bedre.",
            href: "/features/analysis-and-reporting",
          },
        ],
        answer: {
          question: "Hvad er stopregistrering?",
          body: "Stopregistrering betyder, at hvert stop på en maskine eller linje bliver registreret med tidspunkt, varighed og årsag. Så kan I se, hvad nedetiden går til, og rette de største årsager først. I OptiPeople Data Platform melder maskinen selv stoppet, og operatøren vælger stopårsagen fra en fast liste på panelet ved maskinen.",
        },
        caseLink: {
          customer: "Fiberline Composites",
          title: "41% færre unødvendige stop",
          body: "Fiberline Composites ville vide, hvornår og hvorfor maskinerne stoppede. Nu kommer data direkte fra maskinernes software, og stopårsagerne bliver registreret. Det gav 41% færre unødvendige stop, og hvert stop varer i snit 6% kortere.",
          href: "/blog/konkurrencekraft-og-tempo-pa-digital-transformation",
        },
        faq: {
          title: "Spørgsmål om stopregistrering",
          items: [
            {
              question: "Hvad er forskellen på manuel og automatisk stopregistrering?",
              answer:
                "Ved manuel registrering skriver nogen stoppet på en skiftseddel bagefter, og de korte stop kommer sjældent med. Ved automatisk registrering kommer stoppet direkte fra maskinen, med tidspunkt og varighed. I OptiPeople Data Platform melder maskinen selv stoppet, og operatøren sætter årsagen på. Kan PLC'en selv sende årsagen med, kommer stoppet ind med årsagen sat på i forvejen.",
            },
            {
              question: "Hvem registrerer stopårsagen?",
              answer:
                "Det gør operatøren ved maskinen, for det er den, der ved, hvad der skete. Panelet bliver rødt, når maskinen stopper, og operatøren vælger årsagen med det samme. Panelet er en side i platformen, så det kan køre på en skærm eller en tablet ved maskinen.",
            },
            {
              question: "Hvordan bliver stopårsagerne sat op?",
              answer:
                "Hver maskine eller arbejdsstation får sin egen faste liste, fordi maskiner stopper af forskellige grunde. Typiske årsager er omstilling, værktøjsskift, venter på materiale og fejl. En fast liste giver tal, I kan regne på, i stedet for fritekst, ingen kan tyde bagefter.",
            },
            {
              question: "Hvad kan vi bruge tallene til?",
              answer:
                "Hvert stop lander på skiftets tidslinje og i OEE-rapporten, hvor I ser planlagte og uplanlagte stop, antal stop og de største stopårsager. Et Pareto-diagram viser, hvilke få årsager der tager det meste af tiden. Ret den største, og tjek i næste uges tal, at den er væk.",
            },
            {
              question: "Hvad med de korte stop?",
              answer:
                "Et stop på et minut eller to bliver sjældent skrevet ned. Så gemmer det sig i ydelsen, og ingen ved, hvad der skete. Når stoppene kommer direkte fra maskinen, bliver de korte stop også talt med, og I kan se, hvor tit de sker.",
            },
          ],
        },
      },
    },
  },
  {
    slug: "analysis-and-reporting",
    href: "/features/analysis-and-reporting",
    content: {
      en: {
        metaTitle: "Analysis and reporting | OptiPeople",
        metaDescription:
          "Turn production data into clear reports on performance, losses, and cost drivers, without spreadsheets or manual work.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Analysis and reporting",
        heroTitle: "Reports that write themselves",
        heroBody:
          "Turn production data into clear reports on performance, losses, and cost drivers, without spreadsheets or manual work.",
        heroImage: "/images/report-mockup1.png",
        heroImageAlt:
          "OptiPeople reporting dashboard showing OEE gauge, unit counter, and parts per hour trend",
        valueTitle: "The data exists. It just needs a better format",
        valueBody:
          "Your machines generate thousands of data points every day. But if turning that into a useful report takes a person, a spreadsheet, and half a morning, the data stays locked up. OptiPeople generates production reports automatically: accurate, consistent, and ready when you are.",
        capabilitiesTitle: "From machine and workstation data to management report",
        capabilitiesBody:
          "Every report is built from live production data. No manual entry, no copy-paste, no version confusion.",
        capabilities: [
          {
            title: "OEE reports that build themselves",
            description:
              "Availability, performance, and quality broken down by machine or workstation, line, shift, or time period. Reports generate automatically from live production data. Pick a week, pick a machine, and the numbers are there.",
            image: "/images/report1.webp",
            imageAlt:
              "OptiPeople report showing OEE gauges for availability, performance, and quality with a color-coded timeline chart",
          },
          {
            title: "Compare anything against anything",
            description:
              "Side-by-side bar charts across shifts, lines, weeks, machines, or workstations. See where performance diverges and where it converges. The comparisons that used to take a full afternoon in Excel now take one click.",
            image: "/images/Mockups/Report-OEE-Efficiency-With-Filter.webp",
            imageAlt:
              "Report for one machine showing availability, performance and OEE, a timeline of the day and the stops broken down by cause",
          },
          {
            title: "From raw data to shared insight",
            description:
              "Save report templates, schedule automatic delivery, and share with stakeholders who need the numbers but not the system. Management gets a weekly summary. Team leads get daily shift reports. Same data, right format.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.webp",
            imageAlt:
              "OptiPeople event report listing individual registered stops with cause, duration, and shift",
          },
        ],
        showcaseTitle: "Every angle of your production, one system",
        showcaseBody:
          "OEE dashboards, stop analysis, shift comparisons, and energy reports all generated from the same live data source.",
        showcaseImage: "/images/Mockups/Report-OEE-Efficiency-No-Filter.webp",
        showcaseAlt:
          "OptiPeople OEE report with availability, performance, and quality broken down over a week",
        metrics: [
          { metric: "2 hrs", label: "Saved daily on manual reporting" },
          { metric: "0", label: "Spreadsheets needed for production reports" },
          { metric: "< 1 min", label: "From question to answer" },
        ],
        related: [
          {
            title: "Production efficiency",
            description:
              "The live OEE data that feeds into your reports. Track it in real time.",
            href: "/features/production-efficiency",
          },
          {
            title: "Stop cause registration",
            description:
              "Clean stop data makes loss analysis reports accurate and actionable.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Energy and process data",
            description:
              "Add energy consumption and sensor data to your production reports.",
            href: "/features/energy-and-telemetry",
          },
        ],
      },
      da: {
        metaTitle: "Analyse og rapportering | OptiPeople",
        metaDescription:
          "Få rapporter, folk kan læse: hvordan det går, hvor tiden går tabt, og hvad det koster. Uden regneark og uden håndarbejde.",
        parentLabel: "OEE",
        parentHref: "/modules/production",
        eyebrow: "Analyse og rapportering",
        heroTitle: "Rapporterne skriver sig selv",
        heroBody:
          "Få klare svar på, hvordan det går, hvor tiden går tabt, og hvad der koster mest. Uden regneark, og uden at nogen skal trække tallene i hånden.",
        heroImage: "/images/report-mockup1.png",
        heroImageAlt: "Rapportering",
        valueTitle: "Tallene findes allerede. De skal bare stilles op",
        valueBody:
          "Maskinerne laver tusindvis af målinger hver dag. Men kræver det en person, et regneark og en halv formiddag at få en rapport ud af dem, bliver tallene liggende. OptiPeople laver rapporterne af sig selv, ens hver gang og klar, når I er.",
        capabilitiesTitle: "Fra rå tal til den rapport, I skal bruge",
        capabilitiesBody:
          "Alle rapporter bygger på de samme live-tal. Ingen indtastning, ingen kopiering og ingen tvivl om, hvilken version der gælder.",
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
            image: "/images/Mockups/Report-OEE-Efficiency-With-Filter.webp",
            imageAlt: "Rapport for en maskine med tilgængelighed, ydelse og OEE, dagens tidslinje og stoppene fordelt på årsag",
          },
          {
            title: "Klik jer ned i tallene",
            description: "Gå fra hele fabrikken ned til den enkelte maskine eller arbejdsstation, det enkelte skift og det enkelte stop.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.webp",
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
            title: "Energi og procesdata",
            description: "Følg energiforbruget og det, der stikker ud.",
            href: "/features/energy-and-telemetry",
          },
          {
            title: "Produktionseffektivitet",
            description: "Se, hvordan OEE udvikler sig over tid.",
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
        metaTitle: "Energy and process data | OptiPeople",
        metaDescription:
          "Connect energy, vibration, flow, and temperature directly to production. Identify waste, anomalies, and optimization opportunities.",
        parentLabel: "EMS",
        parentHref: "/modules/energy",
        eyebrow: "Energy and process data",
        heroTitle: "Know what your machines are feeling",
        heroBody:
          "Connect energy, vibration, flow, and temperature directly to production. Spot waste, catch anomalies early, and find optimization opportunities hiding in the data.",
        heroImage: "/images/Telemetry-Chart.png",
        heroImageAlt:
          "Energy chart showing kWh consumption over 48 hours for a Felder sliding table saw",
        valueTitle: "Energy and condition data without a separate system",
        valueBody:
          "Most factories monitor energy in one system, production in another, and machine health in a third, if at all. That separation makes it impossible to connect cause and effect. OptiPeople brings sensor data into the same platform as your production data, so every reading has context.",
        capabilitiesTitle: "Every sensor signal, connected to production",
        capabilitiesBody:
          "Temperature, energy, vibration, and flow captured at the machine and linked to the production events that explain them.",
        capabilities: [
          {
            title: "Live sensor readings, right at the machine",
            description:
              "Temperature, humidity, pressure, and vibration displayed in real time on the operator panel. No separate monitoring system, no switching between screens. The operator sees what the machine feels.",
            image: "/images/Telemetry-Numbers.png",
            imageAlt:
              "Operator panel showing live temperature at 182 degrees and humidity at 41 percent for a Homag machine",
          },
          {
            title: "Energy consumption by machine, by hour",
            description:
              "Track kWh for every connected machine over time. See exactly when energy spikes happen and correlate them with production events. Identify machines that consume more than they should: idle, in setup, or under load.",
            image: "/images/Telemetry-Chart.png",
            imageAlt:
              "Energy chart showing kWh consumption over 48 hours for a Felder sliding table saw",
          },
          {
            title: "Sensor data meets production data",
            description:
              "Energy and process data don't live in isolation. OptiPeople connects sensor readings directly to OEE, stop events, and shift data, so you can answer questions like: how much energy did that unplanned stop cost? Which shift runs most efficiently?",
            image: "/images/Product/platform-report.png",
            imageAlt:
              "Production and efficiency reports side by side in OptiPeople Data Platform",
          },
        ],
        metrics: [
          { metric: "15%", label: "Average energy savings identified" },
          { metric: "24/7", label: "Continuous condition monitoring" },
          { metric: "< 1s", label: "Sensor-to-dashboard latency" },
        ],
        related: [
          {
            title: "Production efficiency",
            description:
              "Combine energy data with OEE to understand the true cost of production losses.",
            href: "/features/production-efficiency",
          },
          {
            title: "Maintenance and tasks",
            description:
              "Trigger condition-based maintenance from vibration, temperature, or energy anomalies.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "AI and copilots",
            description:
              "Let AI detect patterns in telemetry data that humans would miss.",
            href: "/features/ai-and-copilots",
          },
        ],
      },
      da: {
        metaTitle: "Energi og procesdata | OptiPeople",
        metaDescription:
          "Kobl energi, vibration, flow og temperatur sammen med produktionen, og find spildet og det, der stikker ud.",
        parentLabel: "EMS",
        parentHref: "/modules/energy",
        eyebrow: "Energi og procesdata",
        heroTitle: "Se, hvad maskinerne bruger, og hvad de fortæller",
        heroBody:
          "Kobl energimålere og sensorer sammen med produktionen, så spild, slid og det, der stikker ud, bliver til at få øje på.",
        heroImage: "/images/Telemetry-Chart.png",
        heroImageAlt: "Energiforbrug for én maskine over 48 timer",
        valueTitle: "Energi og maskinernes tilstand uden et ekstra system",
        valueBody:
          "Mange fabrikker følger energien i ét system, produktionen i et andet og maskinernes tilstand i et tredje, hvis overhovedet. Så kan ingen se, hvad der hænger sammen med hvad. I OptiPeople ligger energi- og procesdata sammen med produktionstallene, så I kan se forskel på almindelige udsving og et rigtigt problem.",
        capabilitiesTitle: "Energi og procesdata med produktionen ved siden af",
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
            title: "Data over tid",
            description: "Hold øje med temperatur, vibration, flow og de andre signaler.",
            image: "/images/Telemetry-Numbers.png",
            imageAlt: "Måletal",
          },
          {
            title: "Det, der stikker ud",
            description: "Find de mønstre, der peger på spild, slid eller en fejl på vej.",
            image: "/images/Product/platform-report.png",
            imageAlt: "Rapporter over produktion og effektivitet side om side",
          },
        ],
        metrics: [
          { metric: "10-20%", label: "Mindre energispild" },
          { metric: "Live", label: "Overblik over sensorerne" },
          { metric: "1 skærm", label: "Energi og produktion samlet" },
        ],
        related: [
          {
            title: "Vedligehold og opgaver",
            description: "Lad data udløse vedligeholdet.",
            href: "/features/maintenance-and-tasks",
          },
          {
            title: "AI og copiloter",
            description: "Lad AI finde mønstrene i sensordata.",
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
    slug: "maintenance-and-tasks",
    href: "/features/maintenance-and-tasks",
    content: {
      en: {
        metaTitle: "Maintenance and tasks | OptiPeople",
        metaDescription:
          "Plan and execute preventive maintenance based on usage and condition. Assign tasks, track completion, and reduce unplanned downtime.",
        parentLabel: "Maintenance (CMMS)",
        parentHref: "/modules/maintenance",
        eyebrow: "Maintenance and tasks",
        heroTitle: "Fix things before they break",
        heroBody:
          "Plan and execute preventive maintenance based on real usage and condition. Assign tasks, track completion, and turn reactive firefighting into structured prevention.",
        heroImage: "/images/Mockups/Tasks-Maintenance-Lists.webp",
        heroImageAlt:
          "Task Management showing maintenance tasks triggered by counters and run hours, beside the lists they draw on",
        valueTitle: "Unplanned stops are the most expensive kind",
        valueBody:
          "Every unplanned stop costs more than a planned one, in lost production, emergency parts, and scrambled schedules. Most factories know this but still run maintenance off spreadsheets and memory. OptiPeople puts every task in one place, triggered by real machine data, tracked to completion.",
        capabilitiesTitle: "From condition signal to completed task",
        capabilitiesBody:
          "A maintenance workflow that starts with the machine and ends with a verified fix, no paper, no guesswork.",
        capabilities: [
          {
            title: "One list for every task on the floor",
            description:
              "Search, filter, and prioritize across all open tasks, by machine, urgency, or type. Operators see exactly what needs doing and how much time is left. No more whiteboards, no more forgotten follow-ups.",
            image: "/images/taskapp1.png",
            imageAlt:
              "Task list on a phone with search and machine filter, showing each open task and the time left on it",
          },
          {
            title: "Maintenance driven by data, not calendars",
            description:
              "Schedule maintenance based on actual machine usage, run hours, and condition signals, not fixed intervals. When a threshold is reached, the task appears automatically. You maintain what needs it, when it needs it.",
            image: "/images/Mockups/Tasls-Maintenance.webp",
            imageAlt:
              "Task list where the When column reads after counter reached and production hour reached rather than a fixed date",
          },
          {
            title: "Close the loop at the machine",
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
            title: "Production efficiency",
            description:
              "Track OEE live and see how maintenance impacts availability and performance.",
            href: "/features/production-efficiency",
          },
          {
            title: "Stop cause registration",
            description:
              "Capture downtime reasons at the source. Turn stop data into maintenance priorities.",
            href: "/features/stop-cause-registration",
          },
          {
            title: "Energy and process data",
            description:
              "Monitor vibration, temperature, and energy to trigger condition-based maintenance.",
            href: "/features/energy-and-telemetry",
          },
        ],
      },
      da: {
        metaTitle: "Vedligehold og opgaver | OptiPeople",
        metaDescription:
          "Planlæg vedligehold efter, hvor meget maskinen har kørt, og hvordan den har det. Fordel opgaverne, følg dem til dørs, og få færre uplanlagte stop.",
        parentLabel: "Vedligehold (CMMS)",
        parentHref: "/modules/maintenance",
        eyebrow: "Vedligehold og opgaver",
        heroTitle: "Løs det, før det bryder ned",
        heroBody:
          "Planlæg vedligehold efter, hvor meget maskinen faktisk har kørt, og hvordan den har det. Fordel opgaverne, se dem blive lavet, og slip for at slukke ildebrande.",
        heroImage: "/images/Mockups/Tasks-Maintenance-Lists.webp",
        heroImageAlt:
          "Opgavestyring med vedligeholdsopgaver, der udløses af tællere og driftstimer, ved siden af de lister, de trækker på",
        valueTitle: "Et uplanlagt stop koster mest",
        valueBody:
          "Et uplanlagt stop koster mere: tabt produktion, hasteordrer på reservedele og en plan, der vælter. Når driftstimer, alarmer og opgaver ligger samme sted, kan teknikerne tage det vigtigste først, i stedet for at stole på et regneark og hukommelsen.",
        capabilitiesTitle: "Fra signal til færdig opgave",
        capabilitiesBody:
          "Det starter ved maskinen og slutter med en reparation, der er tjekket. Uden papir og uden gætteri.",
        capabilities: [
          {
            title: "Efter brug, ikke efter kalenderen",
            description:
              "Planlæg service efter driftstimer og antal cyklusser. Når grænsen er nået, dukker opgaven op af sig selv. Så laver I vedligehold på det, der trænger, når det trænger.",
            image: "/images/Mockups/Tasls-Maintenance.webp",
            imageAlt:
              "Opgavelisten med vedligehold planlagt efter tællere og driftstimer",
          },
          {
            title: "Opgaverne på mobilen",
            description:
              "Teknikeren ser opgaven, noterne og den tid, der er tilbage, dér, hvor arbejdet bliver lavet. Ingen whiteboards og ingen glemte opfølgninger.",
            image: "/images/taskapp1.png",
            imageAlt: "Opgaverne på telefonen med resttid pr. opgave",
          },
          {
            title: "Historik pr. maskine",
            description:
              "Se, hvad der før er lavet på maskinen, og hvilke fejl der bliver ved med at komme igen.",
            image: "/images/backoffice1.webp",
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
            title: "Energi og procesdata",
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
            description: "Følg nedetiden, og se, om vedligeholdet virker.",
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
        metaTitle: "AI and copilots | OptiPeople",
        metaDescription:
          "Ask questions, detect patterns, and support decisions using AI trained on your own production data.",
        parentLabel: "AI Agents",
        parentHref: "/ai/agents",
        eyebrow: "AI and copilots",
        heroTitle: "AI trained on your factory",
        heroBody:
          "Ask questions, detect patterns, and support decisions using AI that knows your machines, your shifts, and your production history.",
        heroImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.webp",
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
            title: "Ask your data a question",
            description:
              "Type a question in plain language and get an answer drawn from your production data. \"What caused the most downtime last week?\" \"Which line had the best OEE this month?\" No query language, no analyst needed, just the answer.",
            image: "/images/report1.webp",
            imageAlt:
              "OptiPeople report showing OEE breakdown and timeline that AI can analyze and summarize",
          },
          {
            title: "Patterns humans miss",
            description:
              "AI scans across machines, shifts, and time periods to surface correlations that are invisible in manual review. A slow drift in cycle time that predicts a breakdown. An energy pattern that signals a worn tool. The system flags it before it becomes a problem.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.webp",
            imageAlt:
              "Event report showing the recurring stop causes a pattern analysis is built from",
          },
          {
            title: "Decisions backed by evidence",
            description:
              "Every AI insight links back to the underlying data. No black boxes. When the copilot suggests focusing on a specific machine or shift, you can drill into the exact numbers and timeline that support the recommendation.",
            image: "/images/Mockups/Report-Production-Counters-Desktop.webp",
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
            title: "Analysis and reporting",
            description:
              "AI enhances the reports you already generate, adding summaries, anomalies, and recommendations.",
            href: "/features/analysis-and-reporting",
          },
          {
            title: "Energy and process data",
            description:
              "AI detects patterns in sensor data that signal wear, waste, or emerging failures.",
            href: "/features/energy-and-telemetry",
          },
          {
            title: "Production efficiency",
            description:
              "Ask the copilot to explain OEE drops and suggest where to focus improvement efforts.",
            href: "/features/production-efficiency",
          },
        ],
      },
      da: {
        metaTitle: "AI og copiloter | OptiPeople",
        metaDescription:
          "Stil spørgsmål til jeres egne produktionsdata, find mønstrene, og få noget at beslutte ud fra.",
        parentLabel: "AI-agenter",
        parentHref: "/ai/agents",
        eyebrow: "AI og copiloter",
        heroTitle: "AI, der kender jeres fabrik",
        heroBody:
          "Spørg løs, og få svar fra en AI, der kender jeres maskiner, jeres skift og jeres historik. Den finder mønstrene og hjælper jer med at beslutte.",
        heroImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.webp",
        heroImageAlt: "Live-effektivitetsrapport, som AI-assistenten svarer ud fra",
        valueTitle: "Selv den bedste analytiker kan ikke se det hele på én gang",
        valueBody:
          "Produktionen laver flere data, end noget menneske kan nå at kigge igennem. Det vigtige drukner: en cyklustid, der langsomt kryber op, en sammenhæng mellem luftfugtighed og kassation, et skift, der stille og roligt klarer sig bedre. AI'en bliver ikke træt. Den holder øje med det hele, hele tiden, og siger til, når der er noget.",
        capabilitiesTitle: "AI, I kan tjekke efter",
        capabilitiesBody:
          "Hvert forslag kan følges tilbage til de tal, det bygger på. Ingen sort boks.",
        capabilities: [
          {
            title: "Spørg jeres data",
            description: "Skriv spørgsmålet med almindelige ord, f.eks. »Hvad gav mest nedetid i sidste uge?«, og få svaret med tallene bag.",
            image: "/images/report1.webp",
            imageAlt: "Rapport til AI-analyse",
          },
          {
            title: "Mønstre, mennesker overser",
            description:
              "Den finder sammenhænge mellem cyklustid, energi, kassation og nedetid, som ingen ville opdage ved at gå tallene igennem i hånden. Og den siger til, før det bliver et problem.",
            image: "/images/Mockups/Report-Individual-Events-Desktop.webp",
            imageAlt: "Rapport med de gentagne stopårsager, mønstrene bygger på",
          },
          {
            title: "Beslutninger med belæg",
            description:
              "Når AI'en peger på en maskine eller et skift, kan I klikke jer ned i de tal og den tidslinje, forslaget bygger på.",
            image: "/images/Mockups/Report-Production-Counters-Desktop.webp",
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
            title: "Energi og procesdata",
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
  }
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

/**
 * The feature deep-dives that hang off one module, for the module page's own
 * links down to them. A feature names its module through `parentHref`.
 */
export function featuresForModule(moduleHref: string, locale: Locale) {
  return features
    .filter((entry) => entry.content[locale].parentHref === moduleHref)
    .map((entry) => ({
      title: entry.content[locale].eyebrow,
      description: entry.content[locale].heroBody,
      href: entry.href,
      image: entry.content[locale].heroImage,
      imageAlt: entry.content[locale].heroImageAlt,
    }))
}

export const { slugs: featureSlugs, get: getFeature } = buildLookup(features)
export { features }
