import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Bell,
  Cable,
  Calculator,
  Calendar,
  ClipboardCheck,
  Clock,
  Cpu,
  FileText,
  Gauge,
  GitBranch,
  History,
  Layers,
  Leaf,
  Monitor,
  Network,
  PieChart,
  Plug,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Smartphone,
  Target,
  Thermometer,
  TrendingUp,
  Video,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react"
import { buildLookup, type LocalizedPage, type StandardPage } from "@/content/shared/types"

const modules: LocalizedPage<StandardPage>[] = [
  {
    slug: "production",
    href: "/modules/production",
    content: {
      en: {
        metaTitle: "Production Module",
        metaDescription:
          "Track OEE, downtime, work orders, and shift performance with a production module built for real-time manufacturing visibility.",
        eyebrow: "Production Module",
        heroTitle: "See Where Production Time Is Lost",
        heroBody:
          "Track OEE in real time and understand exactly where production time disappears. Stop guessing, start improving.",
        primaryLabel: "Request a Demo",
        introTitle: "Your production data shouldn't live in spreadsheets",
        introBody:
          "Most factories still rely on manual logs, whiteboards, and end-of-shift reports to understand what happened on the floor. By the time the data reaches a decision-maker, the moment to act has passed. The Production module replaces guesswork with live signals from every machine, every shift.",
        capabilitiesTitle: "Everything you need for production visibility",
        features: [
          {
            icon: Gauge,
            title: "Live OEE Dashboards",
            description:
              "See availability, performance, and quality in real time across every machine, line, and shift. No more waiting for end-of-day reports.",
          },
          {
            icon: AlertTriangle,
            title: "Stop Cause Registration",
            description:
              "Operators register downtime reasons directly at the machine. Clean, structured data you can actually use to drive improvements.",
          },
          {
            icon: Clock,
            title: "Work Order Tracking",
            description:
              "Track production orders from start to finish. Know exactly where each order stands and how it compares to plan.",
          },
          {
            icon: Activity,
            title: "Shift Performance",
            description:
              "Compare performance across shifts, teams, and time periods. Identify best practices and replicate success across the organization.",
          },
          {
            icon: TrendingUp,
            title: "Continuous Improvement",
            description:
              "Run targeted improvement cycles with data. Track the impact of every change and build a culture of measurable progress.",
          },
          {
            icon: BarChart3,
            title: "Production Reports",
            description:
              "Automated daily, weekly, and monthly reports delivered to stakeholders with the KPIs that matter most.",
          },
        ],
        visualTitle: "One dashboard for your entire production",
        visualBody:
          "From individual machines to plant-wide KPIs, drill into the data that matters, at any level.",
        visualImage: "/images/dashboard2.png",
        visualAlt: "Opticloud production dashboard",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "15–25%", label: "OEE improvement in first year" },
          { metric: "40%", label: "Reduction in unplanned downtime" },
          { metric: "2 hrs", label: "Saved daily on manual reporting" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Connect",
            description:
              "We integrate with your existing machines and PLCs, no production disruption, no hardware overhaul.",
          },
          {
            title: "Visualize",
            description:
              "Your team gets a live dashboard from day one. Real-time OEE, stop causes, and shift performance all in one place.",
          },
          {
            title: "Improve",
            description:
              "Use the data to run targeted improvement cycles. Track the impact of every change you make.",
          },
        ],
      },
      da: {
        metaTitle: "Produktionsmodul | OptiPeople",
        metaDescription:
          "Følg OEE, nedetid, produktionsordrer og hvordan skiftene kører, på tal der opdaterer sig selv.",
        eyebrow: "Produktionsmodul",
        heroTitle: "Se hvor produktionstiden går tabt",
        heroBody:
          "Følg OEE i realtid, og se præcis hvor produktionstiden forsvinder. Så er gætteriet slut.",
        primaryLabel: "Book en demo",
        introTitle: "Produktionstal hører ikke hjemme i et regneark",
        introBody:
          "Bliver tallene først samlet, når skiftet er slut, er chancen for at gøre noget som regel væk. Produktionsmodulet erstatter håndskrevne lister med signaler direkte fra maskiner, linjer og skift.",
        capabilitiesTitle: "Alt til en synlig produktion",
        features: [
          {
            icon: Gauge,
            title: "Live OEE på skærmen",
            description:
              "Se tilgængelighed, ydelse og kvalitet på tværs af maskiner og skift, uden at vente på dagsrapporten.",
          },
          {
            icon: Bell,
            title: "Stopårsager",
            description:
              "Operatøren registrerer årsagen ude ved maskinen, så forbedringerne bygger på noget, I kan regne på.",
          },
          {
            icon: Activity,
            title: "Hvordan kører skiftene",
            description:
              "Sammenlign skift, hold og perioder, og find de arbejdsgange, der er værd at brede ud.",
          },
        ],
        visualTitle: "Ét dashboard til hele produktionen",
        visualBody:
          "Fra den enkelte maskine til fabrikkens nøgletal. Klik dig ned i det, der betyder mest, i det niveau, der passer til jobbet.",
        visualImage: "/images/dashboard2.png",
        visualAlt: "Opticloud produktionsdashboard",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "15-25%", label: "Bedre OEE det første år" },
          { metric: "40%", label: "Mindre uplanlagt nedetid" },
          { metric: "2 timer", label: "Sparet på rapportering hver dag" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Forbind",
            description:
              "Vi kobler os på de maskiner og PLC'er, I har, uden at produktionen skal stå stille, og uden at skifte hardware ud.",
          },
          {
            title: "Vis det",
            description:
              "Teamet får et dashboard med OEE, stopårsager og skift fra dag ét.",
          },
          {
            title: "Forbedr",
            description:
              "Brug tallene til at rette ét sted ad gangen, og mål bagefter om det virkede.",
          },
        ],
      },
    },
  },
  {
    slug: "quality",
    href: "/modules/quality",
    content: {
      en: {
        metaTitle: "Quality Module",
        metaDescription:
          "Digitize inspections, trace deviations, monitor trends, and build quality traceability directly into production workflows.",
        eyebrow: "Quality Module",
        heroTitle: "Build Accountability Into Production",
        heroBody:
          "Register quality data at the source and trace every deviation back to machines, batches, and shifts. Make quality everyone's responsibility.",
        primaryLabel: "Request a Demo",
        introTitle: "Quality issues shouldn't surface after the fact",
        introBody:
          "When quality data lives in spreadsheets and paper forms, problems hide until they become expensive. Deviations get lost, traceability gaps appear during audits, and root causes stay unknown. The Quality module captures data where it happens and connects it to the full production context.",
        capabilitiesTitle: "Everything you need for digital quality management",
        features: [
          {
            icon: ClipboardCheck,
            title: "Digital Inspections",
            description:
              "Replace paper checklists with digital quality forms. Capture data at the source with guided workflows and mandatory checkpoints.",
          },
          {
            icon: GitBranch,
            title: "Full Traceability",
            description:
              "Trace every product back to its machine, batch, operator, and shift. Build a complete quality genealogy without manual effort.",
          },
          {
            icon: AlertCircle,
            title: "Deviation Tracking",
            description:
              "Log deviations as they happen and link them to root causes. Track corrective actions and ensure nothing slips through the cracks.",
          },
          {
            icon: Search,
            title: "SPC and Trend Analysis",
            description:
              "Monitor quality trends in real time with statistical process control. Catch drift before it becomes a defect.",
          },
          {
            icon: ShieldCheck,
            title: "Compliance Ready",
            description:
              "Built-in audit trails and documentation support ISO, FDA, and industry-specific compliance requirements out of the box.",
          },
          {
            icon: FileText,
            title: "Quality Reports",
            description:
              "Generate quality reports automatically, by product, line, or time period. Share insights with customers and auditors instantly.",
          },
        ],
        visualTitle: "Quality data connected to production",
        visualBody:
          "Every inspection, deviation, and corrective action linked to the machine, batch, and operator that produced it.",
        visualImage: "/images/Mockups/Report-Individual-Events-Desktop.png",
        visualAlt: "Quality checks and deviations registered in Opticloud",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "60%", label: "Reduction in quality-related rework" },
          { metric: "90%", label: "Faster deviation response time" },
          { metric: "100%", label: "Digital traceability coverage" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Digitize",
            description:
              "Replace paper-based quality processes with digital forms and inspections connected to your production data.",
          },
          {
            title: "Trace",
            description:
              "Link every quality event to machines, batches, and operators. Build full traceability without additional manual effort.",
          },
          {
            title: "Improve",
            description:
              "Use quality data to identify patterns, reduce scrap, and drive continuous improvement across the organization.",
          },
        ],
      },
      da: {
        metaTitle: "Kvalitetsmodul | OptiPeople",
        metaDescription:
          "Gør kontrollerne digitale, følg afvigelserne, og byg sporbarheden ind i produktionen.",
        eyebrow: "Kvalitetsmodul",
        heroTitle: "Fang fejlen, mens den er billig",
        heroBody:
          "Registrer kvalitetsdata ved kilden, og følg hver afvigelse tilbage til maskine, batch og skift.",
        primaryLabel: "Book en demo",
        introTitle: "Kvalitetsproblemer må ikke først dukke op til sidst",
        introBody:
          "Papirskemaer og regneark gemmer på problemerne, indtil de bliver dyre. Her hænger kontroller, afvigelser og handlinger sammen med det, der faktisk skete i produktionen.",
        capabilitiesTitle: "Digital kvalitetsstyring i praksis",
        features: [
          {
            icon: ClipboardCheck,
            title: "Digitale kontroller",
            description:
              "Skift papiret ud med guidede skemaer og faste tjekpunkter ude ved maskinen.",
          },
          {
            icon: GitBranch,
            title: "Fuld sporbarhed",
            description:
              "Følg produktet tilbage til maskine, batch, operatør og skift, uden ekstra arbejde.",
          },
          {
            icon: ShieldCheck,
            title: "Klar til audit",
            description:
              "Sporet ligger der, og rapporterne er klar, både til revisionen og til kunden, der spørger.",
          },
        ],
        visualTitle: "Kvalitetsdata koblet til produktionen",
        visualBody:
          "Hver kontrol, hver afvigelse og hver handling hænger på den maskine, den batch og den operatør, den kom fra.",
        visualImage: "/images/Mockups/Report-Individual-Events-Desktop.png",
        visualAlt: "Kvalitetskontroller og afvigelser registreret i Opticloud",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "60%", label: "Mindre omarbejde på grund af kvalitet" },
          { metric: "90%", label: "Hurtigere svar på afvigelser" },
          { metric: "100%", label: "Digital sporbarhed" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Digitaliser",
            description:
              "Skift papiret ud med digitale skemaer, der hænger sammen med produktionsdata.",
          },
          {
            title: "Spor",
            description:
              "Kvalitetstjek og afvigelser bliver knyttet til maskine, batch og operatør af sig selv.",
          },
          {
            title: "Forbedr",
            description:
              "Find mønstrene, skær kassationen ned, og styr forbedringerne efter fakta.",
          },
        ],
      },
    },
  },
  {
    slug: "maintenance",
    href: "/modules/maintenance",
    content: {
      en: {
        metaTitle: "Maintenance Module",
        metaDescription:
          "Plan preventive maintenance, receive predictive alerts, manage tasks, and reduce unplanned downtime with connected maintenance workflows.",
        eyebrow: "Maintenance Module",
        heroTitle: "Fix It Before It Breaks",
        heroBody:
          "Move from reactive firefighting to planned maintenance. Reduce unplanned downtime and extend equipment life.",
        primaryLabel: "Request a Demo",
        introTitle: "Maintenance shouldn't be a fire drill",
        introBody:
          "When maintenance is reactive, every breakdown is an emergency. Technicians scramble, production stops, and costs spiral. The Maintenance module gives your team the tools to plan ahead, track tasks, and prevent problems before they impact the line.",
        capabilitiesTitle: "Everything you need for proactive maintenance",
        features: [
          {
            icon: Calendar,
            title: "Preventive Scheduling",
            description:
              "Plan maintenance based on operating hours, production cycles, or calendar intervals. Never miss a scheduled service again.",
          },
          {
            icon: Bell,
            title: "Predictive Alerts",
            description:
              "Get notified before breakdowns happen. Combine sensor data with usage patterns to predict when maintenance is needed.",
          },
          {
            icon: Smartphone,
            title: "Mobile Task Management",
            description:
              "Technicians receive and complete tasks on mobile devices. Capture notes, photos, and completion data directly in the field.",
          },
          {
            icon: Wrench,
            title: "Spare Parts Tracking",
            description:
              "Link maintenance tasks to spare parts inventory. Know what you need before you need it and avoid costly production stops.",
          },
          {
            icon: History,
            title: "Maintenance History",
            description:
              "Full history of every maintenance event per machine. Understand patterns, predict failures, and optimize service intervals.",
          },
          {
            icon: Settings,
            title: "Equipment Management",
            description:
              "Centralized equipment register with documentation, manuals, and service records. Everything your team needs in one place.",
          },
        ],
        visualTitle: "Maintenance planning made visible",
        visualBody:
          "See upcoming tasks, overdue items, and machine health status at a glance across your entire facility.",
        visualImage: "/images/Mockups/Tasks-Maintenance-Lists.png",
        visualAlt: "Maintenance tasks in Opticloud",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "50%", label: "Reduction in unplanned downtime" },
          { metric: "40 hrs", label: "Extra production hours per year" },
          { metric: "30%", label: "Fewer emergency service calls" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Register",
            description:
              "Add your equipment and define maintenance plans based on usage, condition, or fixed intervals.",
          },
          {
            title: "Monitor",
            description:
              "Track machine health through sensor data and operating hours. Get alerts when maintenance is due or anomalies are detected.",
          },
          {
            title: "Prevent",
            description:
              "Shift from reactive to preventive maintenance. Reduce breakdowns, extend equipment life, and lower total cost of ownership.",
          },
        ],
      },
      da: {
        metaTitle: "Vedligeholdsmodul | OptiPeople",
        metaDescription:
          "Planlæg forebyggende vedligehold, styr opgaverne, og få mindre uplanlagt nedetid.",
        eyebrow: "Vedligeholdsmodul",
        heroTitle: "Løs det, før det bryder ned",
        heroBody:
          "Gå fra brandslukning til planlagt vedligehold efter, hvor meget maskinen har kørt, hvordan den har det, og hvad der er sket før.",
        primaryLabel: "Book en demo",
        introTitle: "Vedligehold skal følge virkeligheden",
        introBody:
          "En dato i kalenderen fortæller sjældent hele historien. Med driftstimer, sensordata og opgaver samme sted kan teamet lave det rigtige arbejde på det rigtige tidspunkt.",
        capabilitiesTitle: "Alt til vedligehold, der er på forkant",
        features: [
          {
            icon: Calendar,
            title: "Forebyggende planlægning",
            description:
              "Planlæg efter driftstimer, cyklusser, kalender eller maskinens tilstand, så ingen servicepunkter bliver glemt.",
          },
          {
            icon: Smartphone,
            title: "Opgaverne på mobilen",
            description:
              "Teknikeren får opgaven, melder den færdig og lægger noter og billeder på, direkte fra telefonen.",
          },
          {
            icon: History,
            title: "Historik pr. maskine",
            description:
              "Hele historikken på hver maskine gør mønstrene synlige og hjælper med at ramme det rigtige interval.",
          },
        ],
        visualTitle: "Ét sted til opgaver, udstyr og historik",
        visualBody:
          "Overblik over den service, der venter, de opgaver, der kører, og det, der er lavet før.",
        visualImage: "/images/Mockups/Tasks-Maintenance-Lists.png",
        visualAlt: "Vedligeholdsopgaver i Opticloud",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "50%", label: "Mindre uplanlagt nedetid" },
          { metric: "40 timer", label: "Ekstra produktionstid om året" },
          { metric: "30%", label: "Færre akutte servicekald" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Registrer",
            description:
              "Opret udstyret og planerne efter brug, tilstand eller faste intervaller.",
          },
          {
            title: "Hold øje",
            description:
              "Følg driftstimerne og maskinens tilstand, og få besked, når der skal gøres noget.",
          },
          {
            title: "Forebyg",
            description:
              "Færre nedbrud, længere levetid og en lavere regning på vedligehold.",
          },
        ],
      },
    },
  },
  {
    slug: "energy",
    href: "/modules/energy",
    content: {
      en: {
        metaTitle: "Energy Module",
        metaDescription:
          "Track kWh usage, monitor telemetry, detect anomalies, and connect energy performance to production output in real time.",
        eyebrow: "Energy Module",
        heroTitle: "Cut Waste, Not Corners",
        heroBody:
          "Connect energy consumption directly to production output. Find anomalies and optimization opportunities automatically.",
        primaryLabel: "Request a Demo",
        introTitle: "You can't reduce what you can't see",
        introBody:
          "Energy is often the second-largest cost in manufacturing, yet most factories have no visibility into where it goes. Monthly utility bills tell you nothing about which machines waste energy or when consumption spikes. The Energy module connects real-time consumption data directly to your production.",
        capabilitiesTitle: "Everything you need for energy transparency",
        features: [
          {
            icon: Zap,
            title: "Real-Time kWh Tracking",
            description:
              "Monitor energy consumption per machine, line, or facility in real time. Understand exactly where energy is used, and wasted.",
          },
          {
            icon: Thermometer,
            title: "Sensor Telemetry",
            description:
              "Connect temperature, vibration, flow, and pressure sensors directly to production. See the full picture beyond just energy.",
          },
          {
            icon: AlertTriangle,
            title: "Anomaly Detection",
            description:
              "Automatically detect unusual consumption patterns. Get alerted to leaks, inefficiencies, or equipment degradation early.",
          },
          {
            icon: Activity,
            title: "Energy per Unit Produced",
            description:
              "Link energy consumption to production output. Understand your true cost per unit and identify optimization opportunities.",
          },
          {
            icon: Leaf,
            title: "Sustainability Reporting",
            description:
              "Generate energy and carbon reports for ESG compliance. Track progress against sustainability targets with real data.",
          },
          {
            icon: BarChart3,
            title: "Benchmarking",
            description:
              "Compare energy performance across machines, shifts, and time periods. Identify best performers and replicate their patterns.",
          },
        ],
        visualTitle: "Energy data meets production data",
        visualBody:
          "See energy consumption alongside production output, machine status, and environmental conditions in one unified view.",
        visualImage: "/images/report-mockrup-3.png",
        visualAlt: "Energy and telemetry dashboard",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "10–20%", label: "Reduction in energy consumption" },
          { metric: "Real-time", label: "Visibility into energy waste" },
          { metric: "100%", label: "ESG reporting data coverage" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Measure",
            description:
              "Connect energy meters and sensors to your machines. Start collecting granular consumption data automatically.",
          },
          {
            title: "Analyze",
            description:
              "See energy consumption per machine, per shift, and per unit produced. Identify waste patterns and anomalies.",
          },
          {
            title: "Optimize",
            description:
              "Act on insights to reduce consumption, lower costs, and meet sustainability targets with measurable results.",
          },
        ],
      },
      da: {
        metaTitle: "Energimodul | OptiPeople",
        metaDescription:
          "Kobl energiforbruget sammen med produktionen, og find spildet, udsvingene og det, der kan spares.",
        eyebrow: "Energimodul",
        heroTitle: "Skær spild væk uden at skære hjørner",
        heroBody:
          "Mål energien løbende, og se forbruget pr. produkt, pr. maskine og pr. skift, holdt op mod produktionen.",
        primaryLabel: "Book en demo",
        introTitle: "Et samlet kWh-tal siger ikke, hvor spildet er",
        introBody:
          "Regningen viser summen, ikke hvor den kom fra. Når forbruget bliver holdt op mod ordrer, maskinstatus og det producerede antal, bliver det konkret, hvad der er værd at gøre noget ved.",
        capabilitiesTitle: "Energital, produktionen kan bruge",
        features: [
          {
            icon: Zap,
            title: "kWh pr. enhed",
            description:
              "Se forbruget pr. produkt, pr. ordre og pr. linje, og følg det over tid.",
          },
          {
            icon: Leaf,
            title: "CO2 og bæredygtighed",
            description:
              "Dokumenter det, I har forbedret, og find de steder, hvor en indsats betaler sig mest.",
          },
          {
            icon: Bell,
            title: "Besked når noget stikker ud",
            description:
              "Få besked, når forbruget ikke ligner det normale, før det når at blive en dyr vane.",
          },
        ],
        visualTitle: "Energi holdt op mod det, I producerer",
        visualBody:
          "Sammenlign forbruget med maskinstatus, produktionstal og skift, og find ud af, hvad der reelt trækker.",
        visualImage: "/images/report-mockrup-3.png",
        visualAlt: "Dashboard med energi og målinger",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "10-20%", label: "Mindre spild af energi" },
          { metric: "Live", label: "Overblik over forbruget" },
          { metric: "1 kilde", label: "Energi og produktion samlet" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Mål",
            description:
              "Vi kobler målere, sensorer og de data, I allerede har, på Opticloud.",
          },
          {
            title: "Kobl",
            description:
              "Forbruget bliver holdt op mod produkter, ordrer og maskinstatus.",
          },
          {
            title: "Reducer",
            description:
              "Find spildet, skriv forbedringen ned, og følg med i, om den holder.",
          },
        ],
      },
    },
  },
  {
    slug: "analysis",
    href: "/modules/analysis",
    content: {
      en: {
        metaTitle: "Analysis Module",
        metaDescription:
          "Turn production data into automated reports, cost analysis, loss categorization, and improvement planning for manufacturing teams.",
        eyebrow: "Analysis Module",
        heroTitle: "From Data to Decisions",
        heroBody:
          "Turn raw production data into clear reports on performance, losses, and cost drivers, without spreadsheets or manual work.",
        primaryLabel: "Request a Demo",
        introTitle: "Data is only valuable if it drives action",
        introBody:
          "Collecting production data is one thing. Turning it into decisions is another. When reporting takes hours of manual work and insights arrive too late, the data loses its value. The Analysis module transforms live production data into actionable reports that reach the right people at the right time.",
        capabilitiesTitle: "Everything you need for production intelligence",
        features: [
          {
            icon: FileText,
            title: "Automated Reporting",
            description:
              "Generate daily, weekly, and monthly reports automatically. No more manual data collection or spreadsheet formatting.",
          },
          {
            icon: Calculator,
            title: "Cost Analysis",
            description:
              "Understand the true cost of downtime, scrap, and inefficiency. Translate production data into financial impact.",
          },
          {
            icon: Target,
            title: "Investment Planning",
            description:
              "Use data to build the business case for improvements. Show exactly where investment will have the greatest return.",
          },
          {
            icon: PieChart,
            title: "Loss Categorization",
            description:
              "Break down losses by type, availability, performance, quality. Prioritize improvements based on actual impact.",
          },
          {
            icon: TrendingUp,
            title: "Trend Analysis",
            description:
              "Track performance over time and identify patterns. See whether improvements stick and where new opportunities emerge.",
          },
          {
            icon: BarChart3,
            title: "Custom Dashboards",
            description:
              "Build dashboards for different roles, from operators to management. Everyone sees the data relevant to their decisions.",
          },
        ],
        visualTitle: "Reports that write themselves",
        visualBody:
          "From shift summaries to monthly management reports, automated, accurate, and always up to date.",
        visualImage: "/images/report-mockup1.png",
        visualAlt: "Reporting in Opticloud",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "2 hrs", label: "Saved daily on manual reporting" },
          { metric: "100%", label: "Data-driven decision coverage" },
          { metric: "3x", label: "Faster root cause identification" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Collect",
            description:
              "Production data flows automatically from machines and operators into a single, structured data platform.",
          },
          {
            title: "Analyze",
            description:
              "Turn raw data into clear insights with automated reports, loss analysis, and trend tracking. No spreadsheets needed.",
          },
          {
            title: "Decide",
            description:
              "Make investment and improvement decisions based on facts. Track the impact of every change you implement.",
          },
        ],
      },
      da: {
        metaTitle: "Analysemodul | OptiPeople",
        metaDescription:
          "Gør produktionsdata til rapporter om, hvordan det går, hvor I taber, hvad det koster, og hvad der kan gøres bedre.",
        eyebrow: "Analysemodul",
        heroTitle: "Fra rå tal til klare beslutninger",
        heroBody:
          "Lad rapporterne lave sig selv, og få svar på, hvordan det går, hvor I taber, og hvad der koster mest. Uden regneark.",
        primaryLabel: "Book en demo",
        introTitle: "En rapport skal føre til handling",
        introBody:
          "Når nogen først skal trække tallene i hånden, kommer svaret for sent. Her opdaterer udviklingen sig løbende, så I kan se, hvor der er noget at hente.",
        capabilitiesTitle: "Rapportering, der bliver brugt",
        features: [
          {
            icon: BarChart3,
            title: "Rapporter, der laver sig selv",
            description:
              "Dag, uge og måned bliver sendt af sted til dem, der skal have dem.",
          },
          {
            icon: Search,
            title: "Hvor taber I mest",
            description:
              "Se hvilke stop, produkter og linjer der koster mest.",
          },
          {
            icon: PieChart,
            title: "Noget at beslutte ud fra",
            description:
              "Brug tallene til at vælge de projekter, der betaler sig, og til at vise bagefter, at de gjorde det.",
          },
        ],
        visualTitle: "Rapporter uden regnearkskaos",
        visualBody:
          "Klik dig fra ledelsens overblik ned til den enkelte maskine og det enkelte skift. Det er de samme data hele vejen.",
        visualImage: "/images/report-mockup1.png",
        visualAlt: "Rapportering i Opticloud",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "80%", label: "Mindre tid på rapportering i hånden" },
          { metric: "Live", label: "Tal, der opdaterer sig selv" },
          { metric: "1 skærm", label: "Samlet billede af driften" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Saml",
            description:
              "Data fra produktion, kvalitet, energi og vedligehold bliver samlet ét sted.",
          },
          {
            title: "Forklar",
            description:
              "Rapporterne viser både, hvordan det gik, og hvorfor det gik sådan.",
          },
          {
            title: "Prioriter",
            description:
              "Brug det til at vælge de forbedringer, der flytter mest.",
          },
        ],
      },
    },
  },
  {
    slug: "iot",
    href: "/modules/iot",
    content: {
      en: {
        metaTitle: "IoT Module",
        metaDescription:
          "Connect industrial equipment with edge gateways, protocol-agnostic ingestion, and real-time machine data streaming.",
        eyebrow: "IoT Module",
        heroTitle: "Get Data from Anything",
        heroBody:
          "Connect any machine, sensor, or system to your platform. Ingest data from PLCs, IoT gateways, and legacy equipment, no matter the protocol or age.",
        primaryLabel: "Request a Demo",
        introTitle: "Data collection shouldn't be the hard part",
        introBody:
          "Most factories run dozens of machines from different manufacturers, generations, and protocols. Getting reliable data from all of them into one place is the biggest barrier to digitalization. The IoT module removes that barrier, so you can focus on insights, not infrastructure.",
        capabilitiesTitle: "Everything you need to get machines online",
        features: [
          {
            icon: Cable,
            title: "Plug-and-Play Connectors",
            description:
              "Pre-built connectors for Siemens, Fanuc, Mitsubishi, OPC-UA, MQTT, and more. Get machines online in hours, not weeks.",
          },
          {
            icon: Cpu,
            title: "Protocol-Agnostic Ingestion",
            description:
              "Speak every machine language. Whether it's Modbus, Profinet, EtherNet/IP, or a proprietary protocol. We handle translation.",
          },
          {
            icon: Wifi,
            title: "Edge Data Collection",
            description:
              "Deploy lightweight edge gateways that collect, buffer, and forward data, even when connectivity is intermittent.",
          },
          {
            icon: Layers,
            title: "Legacy Equipment Support",
            description:
              "Don't leave older machines behind. Use sensors and I/O modules to bring any equipment into the digital world.",
          },
          {
            icon: RefreshCw,
            title: "Real-Time Data Streaming",
            description:
              "Stream machine signals at sub-second intervals. Get the resolution you need for accurate OEE, cycle times, and alarms.",
          },
          {
            icon: Shield,
            title: "Secure by Default",
            description:
              "All data is encrypted in transit and at rest. On-premise edge processing means sensitive data stays within your network.",
          },
        ],
        visualTitle: "One gateway, every machine",
        visualBody:
          "See all connected equipment, data streams, and signal health in a single overview, from CNC machines to packaging lines.",
        visualImage: "/images/Telemetry-Numbers.png",
        visualAlt: "Telemetry overview",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "200+", label: "Machine types connected" },
          { metric: "<1 day", label: "Typical time to first data" },
          { metric: "99.9%", label: "Data capture uptime" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Connect",
            description:
              "Install an edge gateway on-site and configure machine connections using our library of pre-built connectors.",
          },
          {
            title: "Ingest",
            description:
              "Machine signals, sensor readings, and system data flow into OptiCloud automatically, structured and ready to use.",
          },
          {
            title: "Activate",
            description:
              "With data flowing, activate any OptiCloud module instantly: Production, Quality, Maintenance, Energy, or Analysis.",
          },
        ],
        darkHero: true,
      },
      da: {
        metaTitle: "IoT-modul | OptiPeople",
        metaDescription:
          "Kobl maskiner, sensorer og gammelt udstyr på én samlet platform for produktionsdata.",
        eyebrow: "IoT-modul",
        heroTitle: "Få data fra alt på fabrikken",
        heroBody:
          "Kobl nye og gamle maskiner på med PLC'er, gateways, sensorer og åbne protokoller.",
        primaryLabel: "Book en demo",
        introTitle: "Jeres data skal ikke være låst inde i maskinen",
        introBody:
          "Mange fabrikker har værdifulde signaler siddende i gammelt udstyr, i PLC'er der ikke taler med nogen, og i systemer der kun kender sig selv. IoT-modulet henter dem sikkert ud og ind i overblikket.",
        capabilitiesTitle: "Maskindata uden at rive noget ud",
        features: [
          {
            icon: Plug,
            title: "De protokoller, maskiner taler",
            description:
              "Vi kobler på over OPC-UA, Modbus, MQTT, IO-Link, sensorsæt eller API.",
          },
          {
            icon: Network,
            title: "Opsamling tæt på maskinen",
            description:
              "Signalerne bliver samlet op og tjekket lige ved maskinen, før de bliver sendt videre.",
          },
          {
            icon: ShieldCheck,
            title: "Sikker forbindelse",
            description:
              "Data bliver flyttet kontrolleret og sikkert, uden at produktionen bliver forstyrret.",
          },
        ],
        visualTitle: "Én gateway, alle maskiner",
        visualBody:
          "Se de enheder, der er koblet på, hvilke signaler de sender, og om data er, som de skal være.",
        visualImage: "/images/Telemetry-Numbers.png",
        visualAlt: "Overblik over målinger",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "Alle aldre", label: "Nye og gamle maskiner" },
          { metric: "< 1 min", label: "Fra signal til skærm" },
          { metric: "Åben", label: "Kobling gennem API" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Find",
            description:
              "Vi finder ud af, hvilke signaler der er værd at hente ind.",
          },
          {
            title: "Forbind",
            description:
              "Maskiner og sensorer bliver koblet på med den protokol, der passer bedst.",
          },
          {
            title: "Brug",
            description:
              "Data bliver til dashboards, rapporter, alarmer og automatik.",
          },
        ],
      },
    },
  },
  {
    slug: "erp-shopfloor",
    href: "/modules/erp-shopfloor",
    content: {
      en: {
        metaTitle: "ERP Shopfloor Module",
        metaDescription:
          "Connect ERP planning with shopfloor execution through live OEE dashboards, work order tracking, and two-way production data sync.",
        eyebrow: "ERP Shopfloor Module",
        heroTitle: "Bridge the Gap Between ERP and Floor",
        heroBody:
          "Your ERP knows the plan. Your machines know reality. OptiCloud connects the two, giving planners real-time actuals and operators the context they need.",
        primaryLabel: "Request a Demo",
        introTitle: "Your ERP can't see the shopfloor",
        introBody:
          "ERP systems are built for planning, not for real-time production monitoring. The result is a gap: planners work with outdated numbers, operators work without context, and nobody has a live picture of what's actually happening. The ERP Shopfloor module closes that gap by becoming the real-time interface between your ERP and your production floor.",
        capabilitiesTitle: "Everything you need for shopfloor–ERP integration",
        features: [
          {
            icon: Gauge,
            title: "Live OEE Dashboards",
            description:
              "See availability, performance, and quality in real time across every machine, line, and shift. No more waiting for end-of-day reports.",
          },
          {
            icon: AlertTriangle,
            title: "Stop Cause Registration",
            description:
              "Operators register downtime reasons directly at the machine. Clean, structured data you can actually use to drive improvements.",
          },
          {
            icon: Clock,
            title: "Work Order Tracking",
            description:
              "Receive work orders from your ERP and track them on the floor from start to finish. Know exactly where each order stands and how it compares to plan.",
          },
          {
            icon: ArrowLeftRight,
            title: "Two-Way ERP Sync",
            description:
              "Push actual quantities, scrap counts, and completion times back to your ERP automatically. Close the loop between planning and execution.",
          },
          {
            icon: Activity,
            title: "Shift Performance",
            description:
              "Compare performance across shifts, teams, and time periods. Identify best practices and replicate success across the organization.",
          },
          {
            icon: BarChart3,
            title: "Production Reports",
            description:
              "Automated daily, weekly, and monthly reports delivered to stakeholders with the KPIs that matter most.",
          },
        ],
        visualTitle: "One dashboard for your entire production",
        visualBody:
          "From ERP work orders to machine-level OEE, drill into the data that matters, at any level.",
        visualImage: "/images/Mockups/Work-Order-Management-Orders.png",
        visualImagePosition: "top",
        visualAlt: "Work orders in Opticloud",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "15–25%", label: "OEE improvement in first year" },
          { metric: "40%", label: "Reduction in unplanned downtime" },
          { metric: "2 hrs", label: "Saved daily on manual reporting" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Connect",
            description:
              "We connect to your ERP and your machines. Work orders flow down to the floor, actuals flow back up, automatically.",
          },
          {
            title: "Visualize",
            description:
              "Your team gets a live shopfloor dashboard from day one. Real-time OEE, order progress, and stop causes all in one place.",
          },
          {
            title: "Improve",
            description:
              "Use the data to close the gap between what the ERP plans and what the shopfloor delivers. Track the impact of every change.",
          },
        ],
      },
      da: {
        metaTitle: "ERP Shopfloor-modul | OptiPeople",
        metaDescription:
          "Kobl planen i ERP sammen med det, der faktisk sker i produktionen. Data går begge veje.",
        eyebrow: "ERP Shopfloor-modul",
        heroTitle: "Byg bro mellem ERP og gulvet",
        heroBody:
          "ERP kender planen. Maskinerne kender virkeligheden. Vi kobler de to sammen, så planlæggere og operatører arbejder ud fra det samme.",
        primaryLabel: "Book en demo",
        introTitle: "ERP kan ikke se produktionen af sig selv",
        introBody:
          "Når planen og virkeligheden ikke passer sammen, sidder planlæggeren med gamle tal, og operatøren ved ikke, hvad der er vigtigst. Det hul lukker ERP Shopfloor.",
        capabilitiesTitle: "Plan og udførelse hænger sammen",
        features: [
          {
            icon: ArrowLeftRight,
            title: "Det går begge veje",
            description:
              "Send ordrerne ned på gulvet, og send antal, kassation og tider tilbage til ERP.",
          },
          {
            icon: Clock,
            title: "Følg ordren",
            description:
              "Se ordren fra start til slut, og opdag det med det samme, hvis den skrider fra planen.",
          },
          {
            icon: Gauge,
            title: "Gulvet i realtid",
            description:
              "Se ordrestatus sammen med OEE, stopårsager og maskindata.",
          },
        ],
        visualTitle: "Fra ordre i ERP til tal fra maskinen",
        visualBody:
          "Planen, arbejdet og afvigelserne står i det samme billede.",
        visualImage: "/images/Mockups/Work-Order-Management-Orders.png",
        visualImagePosition: "top",
        visualAlt: "Arbejdsordrer i Opticloud",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "Live", label: "Faktiske tal tilbage til planlægningen" },
          { metric: "1 flow", label: "Fra ordre til færdigmelding" },
          { metric: "Mindre", label: "Registrering i hånden" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Kobl sammen",
            description: "ERP-ordrer og produktionsdata bliver koblet sammen i et styret flow.",
          },
          {
            title: "Følg",
            description:
              "Operatører og planlæggere ser status og afvigelser med det samme.",
          },
          {
            title: "Luk sløjfen",
            description:
              "Antal og tider går tilbage, så ERP altid er opdateret.",
          },
        ],
      },
    },
  },
  {
    slug: "mes",
    href: "/modules/mes",
    content: {
      en: {
        metaTitle: "MES Module",
        metaDescription:
          "Run manufacturing execution with live OEE dashboards, stop analysis, predictive maintenance, and production reporting in one platform.",
        eyebrow: "MES Module",
        heroTitle: "Your Cloud MES Platform",
        heroBody:
          "A complete Manufacturing Execution System in the cloud. Collect efficiency, telemetry, and energy data, and turn it into actionable insight for every level of your organization.",
        primaryLabel: "Request a Demo",
        introTitle: "Manufacturing needs more than machines",
        introBody:
          "Industry 5.0 puts people back at the center. Your operators, managers, and directors need accessible, actionable data, not more complexity. OptiCloud bridges the gap between technology and human decision-making, giving every level of your organization the visibility to act with confidence.",
        capabilitiesTitle: "A complete MES, built for the cloud",
        features: [
          {
            icon: Gauge,
            title: "OEE & Efficiency Monitoring",
            description:
              "Track availability, performance, and quality across every machine, line, and shift. Understand exactly where production time is gained and lost.",
          },
          {
            icon: Monitor,
            title: "Customizable Dashboards",
            description:
              "Give operators, managers, and directors the view they need. From shopfloor screens to boardroom reports, one platform, every perspective.",
          },
          {
            icon: Video,
            title: "Video-Linked Stop Analysis",
            description:
              "Combine stop-cause data with video feeds to see exactly what happened during a downtime event. Resolve disputes and train faster.",
          },
          {
            icon: Wrench,
            title: "Predictive Maintenance (TPM)",
            description:
              "Move from calendar-based to condition-based maintenance. Use telemetry data to predict failures before they disrupt production.",
          },
          {
            icon: Leaf,
            title: "Energy & Sustainability",
            description:
              "Track kWh per unit produced. Get data-driven insights to reduce energy consumption and CO2 emissions aligned with UN Sustainability Goals.",
          },
          {
            icon: BarChart3,
            title: "Automated Reporting",
            description:
              "Eliminate manual spreadsheets. Identify patterns, trends, and outliers automatically and deliver reports to stakeholders on schedule.",
          },
        ],
        visualTitle: "One platform, every perspective",
        visualBody:
          "From the operator at the machine to the director in the boardroom, everyone sees the data they need, in the format that works for them.",
        visualDrawn: "mes",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "Real-time", label: "Visibility across all operations" },
          { metric: "100%", label: "Paperless shopfloor data capture" },
          { metric: "Industry 5.0", label: "Human-centric manufacturing" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Connect",
            description:
              "Integrate your machines, sensors, and existing systems into a single cloud-based MES. No rip-and-replace. We build on what you have.",
          },
          {
            title: "Visualize",
            description:
              "Operators, managers, and directors each get accessible, actionable data, from live shopfloor dashboards to strategic KPI overviews.",
          },
          {
            title: "Optimize",
            description:
              "Use real-time data to eliminate guesswork, drive continuous improvement, and build a culture of informed decision-making across the organization.",
          },
        ],
      },
      da: {
        metaTitle: "MES-modul | OptiPeople",
        metaDescription:
          "MES i skyen til OEE, stopanalyse, vedligehold, energi og rapportering.",
        eyebrow: "MES-modul",
        heroTitle: "Jeres MES i skyen",
        heroBody:
          "Et samlet Manufacturing Execution System i skyen. Saml produktionsdata, målinger og energital ét sted, og gør dem brugbare for hele huset.",
        primaryLabel: "Book en demo",
        introTitle: "Produktion er mere end maskiner",
        introBody:
          "Operatører, ledere og direktion har brug for de samme data, bare i hvert sit niveau. Opticloud binder teknikken sammen med de beslutninger, mennesker skal træffe.",
        capabilitiesTitle: "En hel MES, bygget til skyen",
        features: [
          {
            icon: Monitor,
            title: "Dashboards, I selv sætter op",
            description:
              "Fra tavleskærmen på gulvet til rapporten til ledelsen. Samme data, hver sin vinkel.",
          },
          {
            icon: Wrench,
            title: "Vedligehold og TPM",
            description:
              "Brug målinger og driftshistorik til at vedligeholde efter maskinens tilstand.",
          },
          {
            icon: Leaf,
            title: "Energi og bæredygtighed",
            description:
              "Følg energien pr. produceret enhed, og dokumenter det, I har forbedret.",
          },
        ],
        visualTitle: "Én platform, alle vinkler",
        visualBody:
          "Operatøren ser sin maskine. Lederen ser linjen. Direktionen ser fabrikken.",
        visualDrawn: "mes",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "Realtid", label: "Overblik på tværs af fabrikken" },
          { metric: "100%", label: "Registreret digitalt" },
          { metric: "Industry 5.0", label: "Mennesker i centrum af produktionen" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Forbind",
            description:
              "Maskiner, sensorer og systemer bliver samlet i ét MES i skyen.",
          },
          {
            title: "Vis det",
            description:
              "Hver rolle får de tal, der skal til for at kunne handle.",
          },
          {
            title: "Forbedr",
            description:
              "Brug tal fra i dag i stedet for gæt, og bliv ved med at rette til.",
          },
        ],
      },
    },
  },
  {
    slug: "planning",
    href: "/modules/planning",
    content: {
      en: {
        metaTitle: "Planning Module",
        metaDescription:
          "Plan and sequence production against measured capacity, real run rates, real machine availability, and one plan the floor can actually see.",
        eyebrow: "Planning Module",
        heroTitle: "Plan Against the Capacity You Actually Have",
        heroBody:
          "Schedules built on measured run rates and real machine availability instead of spreadsheet assumptions, and visible to everyone who has to deliver them.",
        primaryLabel: "Request a Demo",
        introTitle: "A plan is only as good as the numbers under it",
        introBody:
          "Most production plans are built from standard times that were set years ago and a capacity figure nobody has re-measured since. The plan looks fine on Monday and has drifted by Wednesday. When planning reads from the same data as the shopfloor, the numbers underneath it are the ones the machines actually produced, so the plan starts realistic and stays that way.",
        capabilitiesTitle: "Planning that stays connected to the floor",
        features: [
          {
            icon: Calendar,
            title: "Capacity-Based Scheduling",
            description:
              "Schedule against real available hours per machine and line, planned maintenance, shift patterns, and known downtime already accounted for.",
          },
          {
            icon: Gauge,
            title: "Run Rates From Real Data",
            description:
              "Standard times come from what the machine has actually produced, per item and per setup, instead of an estimate someone typed in once.",
          },
          {
            icon: ArrowLeftRight,
            title: "Sequencing and Changeovers",
            description:
              "Order the queue to cut setup time. See what a resequence costs in changeover minutes before you commit to it.",
          },
          {
            icon: AlertTriangle,
            title: "Conflicts Surface Early",
            description:
              "Overloaded machines, colliding orders, and missing capacity show up while there is still time to move something.",
          },
          {
            icon: RefreshCw,
            title: "Replan Without Rebuilding",
            description:
              "A breakdown or a rush order does not mean starting the plan over. Adjust the affected window and see the knock-on effects immediately.",
          },
          {
            icon: Monitor,
            title: "One Plan, Visible on the Floor",
            description:
              "Operators see the same sequence the planner sees, on the panel at the machine, no printed plan from the morning meeting going stale in a folder.",
          },
        ],
        visualTitle: "Planning and production, same data",
        visualBody:
          "The plan reads the machine signals, and progress flows straight back. What is behind, what is ahead, and what it costs to reshuffle are all visible in one place.",
        visualImage: "/images/Mockups/Work-Order-Management-Planning-Desktop.png",
        visualAlt: "Production planning overview in Opticloud",
        metricsTitle: "What Changes",
        metrics: [
          { metric: "Measured", label: "Capacity from real output, not estimates" },
          { metric: "One plan", label: "Shared by planning and the shopfloor" },
          { metric: "Same day", label: "Replan when reality changes" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Measure",
            description:
              "The platform builds run rates and available hours per machine from production data you are already collecting.",
          },
          {
            title: "Plan",
            description:
              "Sequence orders against that capacity, with setup time and planned maintenance in the same picture.",
          },
          {
            title: "Adjust",
            description:
              "Progress reports itself from the floor. When something slips, you see the consequence and replan the affected window.",
          },
        ],
      },
      da: {
        metaTitle: "Planlægningsmodul | OptiPeople",
        metaDescription:
          "Planlæg og læg ordrerne i rækkefølge efter den kapacitet, I faktisk har: målte kørehastigheder, den tid maskinerne reelt er ledige, og én plan, gulvet kan se.",
        eyebrow: "Planlægningsmodul",
        heroTitle: "Planlæg efter den kapacitet, I faktisk har",
        heroBody:
          "Planer, der bygger på målte kørehastigheder og den tid, maskinerne reelt er ledige, i stedet for tal fra et regneark. Og som er synlige for dem, der skal levere dem.",
        primaryLabel: "Book en demo",
        introTitle: "En plan er kun så god som tallene under den",
        introBody:
          "De fleste planer bygger på standardtider, der blev sat for år tilbage, og en kapacitet, ingen har målt siden. Når planlægningen læser de samme data som gulvet, er tallene under planen dem, maskinerne faktisk har lavet.",
        capabilitiesTitle: "Planlægning, der hænger sammen med gulvet",
        features: [
          {
            icon: Calendar,
            title: "Planlæg efter reel kapacitet",
            description:
              "Planlæg efter de timer, maskinen reelt er ledig. Skiftplaner, planlagt vedligehold og kendt nedetid er regnet med.",
          },
          {
            icon: Gauge,
            title: "Kørehastigheder fra virkeligheden",
            description:
              "Standardtiderne kommer fra det, maskinen faktisk har produceret, pr. vare og pr. opstilling.",
          },
          {
            icon: RefreshCw,
            title: "Læg om uden at starte forfra",
            description:
              "Et nedbrud eller en hasteordre kræver ikke en helt ny plan. Ret det stykke, det går ud over, og se med det samme, hvad det betyder.",
          },
        ],
        visualTitle: "Planlægning og produktion på samme data",
        visualBody:
          "Planen læser maskinsignalerne, og fremdriften går direkte tilbage. Hvad der er bagud, og hvad en omrokering koster, står i det samme billede.",
        visualImage: "/images/Mockups/Work-Order-Management-Planning-Desktop.png",
        visualAlt: "Overblik over produktionsplanlægning i Opticloud",
        metricsTitle: "Hvad ændrer sig",
        metrics: [
          { metric: "Målt", label: "Kapacitet ud fra det, I faktisk producerer" },
          { metric: "Én plan", label: "Delt mellem planlægning og gulv" },
          { metric: "Samme dag", label: "Ny plan, når virkeligheden ændrer sig" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Mål",
            description:
              "Platformen regner kørehastigheder og ledige timer ud pr. maskine ud fra de data, I allerede samler op.",
          },
          {
            title: "Planlæg",
            description:
              "Læg ordrerne i rækkefølge efter den kapacitet, med opstillingstid og planlagt vedligehold i samme billede.",
          },
          {
            title: "Justér",
            description:
              "Fremdriften melder sig selv fra gulvet. Går noget skævt, ser I følgen og lægger den del af planen om.",
          },
        ],
      },
    },
  },
  {
    slug: "documents",
    href: "/modules/documents",
    content: {
      en: {
        metaTitle: "Documents Module",
        metaDescription:
          "Work instructions, drawings, and certificates at the machine, always the current version, tied to the order and the operator in front of it.",
        eyebrow: "Documents Module",
        heroTitle: "The Right Instruction, at the Right Machine",
        heroBody:
          "Work instructions, drawings, and certificates where the work happens, in the version that applies to the order in front of the operator.",
        primaryLabel: "Request a Demo",
        introTitle: "Documentation on the floor goes stale quietly",
        introBody:
          "Instructions live in binders by the machine, in a shared drive nobody trusts, and in the head of whoever set the job up last time. When a drawing is revised, the old print stays on the floor until someone notices. Tying documents to the machine and the order means the operator opens what applies right now, and the revision reaches the floor the moment it is approved.",
        capabilitiesTitle: "Documentation that follows the work",
        features: [
          {
            icon: FileText,
            title: "Instructions at the Machine",
            description:
              "Open the setup sheet, drawing, or work instruction from the panel at the machine, filtered to the order being run.",
          },
          {
            icon: History,
            title: "Versions That Cannot Drift",
            description:
              "One current version, one history. Approve a revision and the floor has it immediately, no printed copy outliving it.",
          },
          {
            icon: Search,
            title: "Find It by Machine or Order",
            description:
              "Documents are linked to machines, items, and orders, so finding the right one does not depend on knowing a folder structure.",
          },
          {
            icon: ClipboardCheck,
            title: "Read and Understood",
            description:
              "Ask for confirmation on the documents that need it, and see who acknowledged which version and when.",
          },
          {
            icon: ShieldCheck,
            title: "Audit-Ready by Default",
            description:
              "Certificates, calibration records, and signed-off instructions sit with the production data they belong to, ready when an auditor asks.",
          },
          {
            icon: Smartphone,
            title: "Panel, Tablet, or Phone",
            description:
              "The same document set on the operator panel, on a tablet at the line, and on a phone in maintenance.",
          },
        ],
        visualTitle: "Documents next to the data they describe",
        visualBody:
          "The instruction for a job, the stops registered on it, and the quality checks that followed all sit on the same order, so a question about what happened has one place to go.",
        visualDrawn: "documents",
        metricsTitle: "What Changes",
        metrics: [
          { metric: "Current", label: "One approved version, everywhere" },
          { metric: "Paperless", label: "Binders off the shopfloor" },
          { metric: "Traceable", label: "Who read what, and when" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Upload",
            description:
              "Bring in instructions, drawings, and certificates, and link them to the machines, items, and orders they apply to.",
          },
          {
            title: "Publish",
            description:
              "Approve a version and it becomes the one the floor sees. Earlier versions stay in the history, not on the machine.",
          },
          {
            title: "Confirm",
            description:
              "Operators open what applies to the job and acknowledge the documents that require it, logged with the production record.",
          },
        ],
      },
      da: {
        metaTitle: "Dokumentmodul | OptiPeople",
        metaDescription:
          "Arbejdsinstruktioner, tegninger og certifikater ved maskinen, altid i den version, der gælder, knyttet til ordren foran operatøren.",
        eyebrow: "Dokumentmodul",
        heroTitle: "Den rigtige instruktion ved den rigtige maskine",
        heroBody:
          "Arbejdsinstruktioner, tegninger og certifikater dér, hvor arbejdet sker, i den version, der gælder for ordren foran operatøren.",
        primaryLabel: "Book en demo",
        introTitle: "Papirerne ved maskinen bliver forældede, uden at nogen opdager det",
        introBody:
          "Instruktionerne ligger i en mappe ved maskinen, på et fællesdrev ingen stoler på, og i hovedet på den, der sidst stillede om. Når dokumenterne hænger på maskinen og ordren, åbner operatøren det, der gælder nu, og en ny version er på gulvet, så snart den er godkendt.",
        capabilitiesTitle: "Papirerne følger arbejdet",
        features: [
          {
            icon: FileText,
            title: "Instruktionen ved maskinen",
            description:
              "Åbn opstillingsarket, tegningen eller instruktionen fra panelet ved maskinen, filtreret til den ordre, der kører.",
          },
          {
            icon: History,
            title: "Én version, der gælder",
            description:
              "Én gældende version og én historik. Godkend en ny, og gulvet har den med det samme.",
          },
          {
            icon: ShieldCheck,
            title: "Klar til audit",
            description:
              "Certifikater, kalibreringer og godkendte instruktioner ligger sammen med de produktionsdata, de hører til.",
          },
        ],
        visualTitle: "Dokumenterne ved siden af de tal, de handler om",
        visualBody:
          "Instruktionen til opgaven, de stop, der blev registreret undervejs, og kvalitetstjekkene bagefter ligger på den samme ordre.",
        visualDrawn: "documents",
        metricsTitle: "Hvad ændrer sig",
        metrics: [
          { metric: "Gældende", label: "Én godkendt version overalt" },
          { metric: "Papirløst", label: "Mapperne væk fra gulvet" },
          { metric: "Sporbart", label: "Hvem læste hvad, og hvornår" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Læg ind",
            description:
              "Hent instruktioner, tegninger og certifikater ind, og knyt dem til de maskiner, varer og ordrer, de gælder for.",
          },
          {
            title: "Udgiv",
            description:
              "Godkend en version, og det er den, gulvet ser. De gamle bliver i historikken, ikke ude på maskinen.",
          },
          {
            title: "Bekræft",
            description:
              "Operatøren åbner det, der gælder for opgaven, og kvitterer for de dokumenter, der kræver det.",
          },
        ],
      },
    },
  },
]

export const { slugs: moduleSlugs, get: getModule } = buildLookup(modules)
export { modules }
