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
  Shield,
  ShieldCheck,
  Smartphone,
  Target,
  Thermometer,
  TrendingUp,
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
        metaTitle: "OEE Module",
        metaDescription:
          "Track OEE, downtime, losses, and shift performance with an OEE module built for real-time manufacturing visibility.",
        eyebrow: "OEE Module",
        heroTitle: "See Where Production Time Is Lost",
        heroBody:
          "Track OEE in real time and understand exactly where production time disappears. Stop guessing, start improving.",
        primaryLabel: "Request a Demo",
        introTitle: "Your production data shouldn't live in spreadsheets",
        introBody:
          "Most factories still rely on manual logs, whiteboards, and end-of-shift reports to understand what happened on the floor. By the time the data reaches a decision-maker, the moment to act has passed. The OEE module replaces guesswork with live signals from every machine, every shift.",
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
            icon: Target,
            title: "Performance and Quality Losses",
            description:
              "Availability is the easy third. See the speed losses and the scrap that quietly take the rest, per machine, item, and setup.",
          },
          {
            icon: BarChart3,
            title: "Production Reports",
            description:
              "Automated daily, weekly, and monthly reports delivered to stakeholders with the KPIs that matter most.",
          },
        ],
        visualTitle: "The number, the shift, and what took the time",
        visualBody:
          "Availability, performance, and OEE against target, the shift on a timeline, and every stop that cost it, in one view.",
        visualDrawn: "oee",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "15-25%", label: "OEE improvement in first year" },
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
        metaTitle: "OEE-modul | OptiPeople",
        metaDescription:
          "Følg OEE, nedetid, tab og hvordan skiftene kører, på tal der opdaterer sig selv.",
        eyebrow: "OEE-modul",
        heroTitle: "Se hvor produktionstiden går tabt",
        heroBody:
          "Følg OEE i realtid, og se præcis hvor produktionstiden forsvinder. Så er gætteriet slut.",
        primaryLabel: "Book en demo",
        introTitle: "Produktionstal hører ikke hjemme i et regneark",
        introBody:
          "Bliver tallene først samlet, når skiftet er slut, er chancen for at gøre noget som regel væk. OEE-modulet erstatter håndskrevne lister med signaler direkte fra maskiner, linjer og skift.",
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
        visualTitle: "Tallet, skiftet og det, der tog tiden",
        visualBody:
          "Tilgængelighed, ydelse og OEE mod målet, skiftet på en tidslinje, og hvert stop, der kostede tid, i det samme billede.",
        visualDrawn: "oee",
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
        visualAlt: "Quality checks and deviations registered in OptiPeople Data Platform",
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
        visualAlt: "Kvalitetskontroller og afvigelser registreret i OptiPeople Data Platform",
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
            icon: Cable,
            title: "Connect IoT Data to Maintenance",
            description:
              "Running hours, cycle counts, temperature, vibration, and current draw come straight off the machines through the IoT module, so plans trigger on measured condition instead of a date in a calendar.",
          },
          {
            icon: Bell,
            title: "Predictive Alerts",
            description:
              "Get notified before breakdowns happen. Those same machine signals, read against usage patterns, flag the failure while there is still time to plan around it.",
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
        ],
        visualTitle: "Maintenance planning made visible",
        visualBody:
          "See upcoming tasks, overdue items, and machine health status at a glance across your entire facility.",
        visualImage: "/images/Mockups/Tasks-Maintenance-Lists.png",
        visualAlt: "Maintenance tasks in OptiPeople Data Platform",
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
            title: "Prevent and predict",
            description:
              "Shift from reactive to preventive maintenance, and where the machine signals support it, to predictive: acting on a measured trend before anything breaks. Fewer breakdowns, longer equipment life, lower total cost of ownership.",
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
            icon: Cable,
            title: "Kobl IoT-data på vedligeholdet",
            description:
              "Driftstimer, cyklusser, temperatur, vibration og strømforbrug kommer direkte fra maskinerne gennem IoT-modulet, så planen bliver udløst af maskinens tilstand og ikke af en dato.",
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
        visualAlt: "Vedligeholdsopgaver i OptiPeople Data Platform",
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
            title: "Forebyg og forudsig",
            description:
              "Gå fra brandslukning til planlagt vedligehold, og dér hvor maskinsignalerne rækker til det, til at handle på en målt udvikling, før noget bryder ned. Færre nedbrud, længere levetid og en lavere regning.",
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
          { metric: "10-20%", label: "Reduction in energy consumption" },
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
              "Vi kobler målere, sensorer og de data, I allerede har, på OptiPeople Data Platform.",
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
        visualAlt: "Reporting in OptiPeople Data Platform",
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
        visualAlt: "Rapportering i OptiPeople Data Platform",
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
          "Consolidate the machines, hardware, and data systems a site already runs into one structured data foundation, and add sensors only where there is nothing to read from.",
        eyebrow: "IoT Module",
        heroTitle: "Get Data from Anything You Already Run",
        heroBody:
          "Most sites are not starting from nothing. They have controls, sensor kits, historians, and a system or two that already collects something. The IoT module consolidates what is there, and adds hardware only where a machine has nothing to read from.",
        primaryLabel: "Request a Demo",
        introTitle: "You probably have more data than you think, in more places than you want",
        introBody:
          "The usual picture is not a blank site. It is three generations of controls, a sensor setup someone installed for one project, a historian nobody queries, and a machine supplier's own portal that only covers their machines. Each one is a partial answer in its own silo. The work is rarely putting hardware on machines: it is consolidating what already reports something into one structured foundation, then filling the genuine gaps.",
        capabilitiesTitle: "Consolidate first, add hardware only where you must",
        features: [
          {
            icon: Layers,
            title: "Consolidate the Hardware You Have",
            description:
              "Existing PLC setups, sensor kits, data loggers, and I/O modules from earlier projects keep doing their job. We read from them instead of installing a second set alongside.",
          },
          {
            icon: Network,
            title: "Consolidate the Systems You Have",
            description:
              "Historians, SCADA, a machine supplier's own portal, an ERP, a homegrown database. If a system already holds part of the answer, it becomes a source rather than something to replace.",
          },
          {
            icon: Cable,
            title: "Plug-and-Play Connectors",
            description:
              "Pre-built connectors for Siemens, Fanuc, Mitsubishi, OPC-UA, MQTT, REST, and more. Most machines and systems are online in hours, not weeks.",
          },
          {
            icon: Cpu,
            title: "Protocol-Agnostic Ingestion",
            description:
              "Modbus, Profinet, EtherNet/IP, a file drop, or a proprietary protocol. We handle the translation, so the difference stops being your problem.",
          },
          {
            icon: Wifi,
            title: "A Gateway Only Where It Earns One",
            description:
              "Where a machine has nothing readable, a small edge gateway or a retrofitted sensor measures the signal directly. Where the data already flows, no new box goes on the wall.",
          },
          {
            icon: Shield,
            title: "One Structured Foundation",
            description:
              "However many sources it took, the data lands tied to machines, orders, batches, and shifts, encrypted in transit and at rest, in one record every module reads.",
          },
        ],
        visualTitle: "Where the data comes from, and where it ends up",
        visualBody:
          "Machines, existing hardware, operator devices, and the systems you already run, consolidated into one data container per company, read by your team, your systems, and your AI assistants.",
        visualSection: "architecture",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "200+", label: "Machine types connected" },
          { metric: "Reused", label: "Existing hardware and systems, wherever they already report" },
          { metric: "<1 day", label: "Typical time to first data" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Map what exists",
            description:
              "We walk the site and the systems: which machines already report, which hardware is already installed, which databases hold part of the picture, and where the real blind spots are.",
          },
          {
            title: "Consolidate and fill the gaps",
            description:
              "Existing sources are connected as sources. Only the genuine blind spots get new hardware, and everything lands in one structured foundation.",
          },
          {
            title: "Activate",
            description:
              "With data flowing, activate any platform module against it: OEE, orders, planning, quality, maintenance, energy, or analysis.",
          },
        ],
        darkHero: true,
      },
      da: {
        metaTitle: "IoT-modul | OptiPeople",
        metaDescription:
          "Samle de maskiner, det hardware og de datasystemer, I allerede har, i ét datagrundlag. Ny hardware kun der, hvor der ikke er noget at læse fra.",
        eyebrow: "IoT-modul",
        heroTitle: "Få data fra det, I allerede har",
        heroBody:
          "De færreste starter fra nul. Der er styringer, sensorer, en historian og et system eller to, der allerede samler noget op. IoT-modulet samler det, der er, og sætter kun nyt op, hvor der ikke er noget at læse fra.",
        primaryLabel: "Book en demo",
        introTitle: "I har flere data, end I tror, og de ligger flere steder, end I har lyst til",
        introBody:
          "Billedet er sjældent en tom fabrik. Det er tre generationer af styringer, et sensoropsæt fra et projekt for fem år siden, en database ingen slår op i, og maskinleverandørens egen portal, der kun dækker deres egne maskiner. Hver af dem har en del af svaret, hver for sig. Arbejdet er ikke at sætte hardware på maskiner. Det er at samle det, der allerede melder noget, og først derefter fylde de rigtige huller.",
        capabilitiesTitle: "Saml først, sæt kun nyt op hvor det skal til",
        features: [
          {
            icon: Layers,
            title: "Brug det hardware, I har",
            description:
              "PLC-opsæt, sensorer, dataloggere og I/O-moduler fra tidligere projekter bliver ved med at gøre deres arbejde. Vi læser fra dem i stedet for at sætte et sæt mere op ved siden af.",
          },
          {
            icon: Network,
            title: "Brug de systemer, I har",
            description:
              "Historian, SCADA, maskinleverandørens portal, ERP eller en database, I selv har bygget. Har systemet en del af svaret, bliver det en kilde og ikke noget, der skal skiftes ud.",
          },
          {
            icon: Plug,
            title: "De protokoller, maskiner taler",
            description:
              "Vi kobler på over OPC-UA, Modbus, MQTT, IO-Link, REST, filer eller sensorsæt.",
          },
          {
            icon: ShieldCheck,
            title: "Sikker forbindelse",
            description:
              "Data bliver flyttet kontrolleret og krypteret, uden at produktionen bliver forstyrret.",
          },
        ],
        visualTitle: "Hvor data kommer fra, og hvor de ender",
        visualBody:
          "Maskiner, det hardware I har, operatørernes enheder og de systemer, der allerede kører, samlet i én datacontainer pr. virksomhed, som jeres team, jeres systemer og jeres AI-assistenter læser fra.",
        visualSection: "architecture",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "Alle aldre", label: "Nye og gamle maskiner" },
          { metric: "Genbrugt", label: "Det hardware og de systemer, der allerede melder noget" },
          { metric: "< 1 min", label: "Fra signal til skærm" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Kortlæg det, der er",
            description:
              "Vi går fabrikken og systemerne igennem: hvad melder noget i forvejen, hvad er der sat op, hvilke databaser har en del af billedet, og hvor er de rigtige blinde vinkler.",
          },
          {
            title: "Saml, og fyld hullerne",
            description:
              "Det, der findes, bliver koblet på som kilde. Kun de rigtige blinde vinkler får nyt udstyr, og det hele lander i ét datagrundlag.",
          },
          {
            title: "Brug det",
            description:
              "Data bliver til dashboards, rapporter, alarmer og automatik, i de moduler I har brug for.",
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
        metaTitle: "Orders Module",
        metaDescription:
          "Run production orders on the floor: start, stop, and report at the machine. Works standalone, and syncs two ways with your ERP if you want it to.",
        eyebrow: "Orders Module",
        heroTitle: "The Orders to Run, on the Screen at the Machine",
        heroBody:
          "Operators see what to produce next, start and stop the job, and report quantities and scrap where the work happens. It runs on its own, and it connects to your ERP if you want it to.",
        primaryLabel: "Request a Demo",
        introTitle: "A finance ERP is a poor fit for a machine",
        introBody:
          "Plenty of factories have never wanted their finance ERP on the shopfloor, and they are right not to: it is built for month-end, not for an operator with gloves on at 05:40. So the orders live on paper, on a whiteboard, or in a spreadsheet the planner keeps. The Orders module gives the floor its own screen for that job. Where an ERP already holds the orders, we sync with it in both directions. Where it does not, or where you would rather keep it out of production, the module holds the orders itself.",
        capabilitiesTitle: "Orders on the floor, ERP optional",
        features: [
          {
            icon: Monitor,
            title: "Start and Stop at the Machine",
            description:
              "One screen at the machine: what to run next, start the job, stop it, and register why it stopped. Nothing to learn beyond the buttons an operator actually needs.",
          },
          {
            icon: Clock,
            title: "The Order List for This Station",
            description:
              "Filtered to the machine in front of you, in priority order, with quantity, product, and due date. What is ready to start, what is waiting, what is blocked.",
          },
          {
            icon: ClipboardCheck,
            title: "Report Quantities and Scrap",
            description:
              "Good parts, scrap, and reason codes registered as the job runs, so the completion figure is the one the machine produced rather than an estimate typed in later.",
          },
          {
            icon: Cable,
            title: "Runs With or Without an ERP",
            description:
              "No ERP connection required. Create and manage orders in the module itself, and keep your finance system out of production entirely if that suits you better.",
          },
          {
            icon: ArrowLeftRight,
            title: "Two-Way ERP Sync, When You Want It",
            description:
              "If the orders already live in an ERP, they flow down to the floor and actual quantities, scrap, and completion times flow back automatically. Optional, and added when it earns its keep.",
          },
          {
            icon: Gauge,
            title: "Every Order Carries Its Own Numbers",
            description:
              "Because the same registration feeds OEE, each order ends up with real run time, real stops, and real output behind it, without anyone filling in a form for it.",
          },
        ],
        visualTitle: "The order list the floor actually works from",
        visualBody:
          "Priority, product, quantity, due date, station, and readiness in one list, whether the orders came from an ERP or were created here.",
        visualImage: "/images/Mockups/Work-Order-Management-Orders.png",
        visualImagePosition: "top",
        visualAlt: "The work order list on the panel at the machine",
        metricsTitle: "What Changes",
        metrics: [
          { metric: "0", label: "ERP integrations required to start" },
          { metric: "1 screen", label: "For the operator: what to run, start, stop, report" },
          { metric: "2 ways", label: "Order sync with your ERP, if and when you want it" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Start on the floor",
            description:
              "The panel goes up at the machine with the order list on it. Operators start, stop, and report from day one, with no integration project in front of it.",
          },
          {
            title: "Decide about the ERP",
            description:
              "Keep creating orders in the module, or connect the ERP so orders flow down and actuals flow back. Either way the floor screen stays the same.",
          },
          {
            title: "Let the numbers accumulate",
            description:
              "Every started and stopped job leaves real run times and real output behind, which is what planning, OEE, and the monthly report then read from.",
          },
        ],
      },
      da: {
        metaTitle: "Ordremodul | OptiPeople",
        metaDescription:
          "Kør ordrerne på gulvet: start, stop og meld tilbage ved maskinen. Virker alene, og kan kobles på ERP begge veje, hvis I vil.",
        eyebrow: "Ordremodul",
        heroTitle: "Ordrerne står på skærmen ved maskinen",
        heroBody:
          "Operatøren ser, hvad der skal produceres, starter og stopper jobbet og melder antal og kassation, dér hvor arbejdet sker. Det kører alene, og det kan kobles på jeres ERP, hvis I vil.",
        primaryLabel: "Book en demo",
        introTitle: "Et økonomi-ERP hører ikke hjemme ude ved maskinen",
        introBody:
          "Mange fabrikker har aldrig ønsket økonomisystemet ud på gulvet, og det er der god grund til: det er bygget til månedsafslutning, ikke til en operatør med handsker på klokken 05.40. Så ordrerne ender på papir, på en tavle eller i planlæggerens regneark. Ordremodulet giver gulvet sin egen skærm til det. Ligger ordrerne allerede i et ERP, kobler vi os på begge veje. Gør de ikke, eller vil I helst holde ERP ude af produktionen, holder modulet selv ordrerne.",
        capabilitiesTitle: "Ordrer på gulvet, ERP er en mulighed",
        features: [
          {
            icon: Monitor,
            title: "Start og stop ved maskinen",
            description:
              "Én skærm ved maskinen: hvad der skal køres, start, stop og hvorfor den stoppede. Ikke mere end de knapper, en operatør har brug for.",
          },
          {
            icon: Clock,
            title: "Ordrelisten for netop den maskine",
            description:
              "Sorteret efter, hvad der er vigtigst, med antal, vare og leveringsdato. Hvad kan startes, hvad venter, og hvad er gået i stå.",
          },
          {
            icon: ClipboardCheck,
            title: "Meld antal og kassation",
            description:
              "Gode emner, kassation og årsag bliver registreret, mens jobbet kører, så færdigmeldingen er det, maskinen lavede.",
          },
          {
            icon: Cable,
            title: "Kører med eller uden ERP",
            description:
              "Der skal ikke en ERP-kobling til. Opret og styr ordrerne i modulet, og hold økonomisystemet helt ude af produktionen, hvis det passer jer bedre.",
          },
          {
            icon: ArrowLeftRight,
            title: "Begge veje til ERP, når I vil",
            description:
              "Ligger ordrerne i et ERP, kommer de ned på gulvet, og antal, kassation og tider går tilbage af sig selv. Det er en mulighed, ikke et krav.",
          },
          {
            icon: Gauge,
            title: "Hver ordre har sine egne tal med",
            description:
              "Den samme registrering fylder OEE, så hver ordre ender med reel køretid, reelle stop og reelt output bag sig, uden at nogen udfylder et skema.",
          },
        ],
        visualTitle: "Den ordreliste, gulvet arbejder efter",
        visualBody:
          "Prioritet, vare, antal, dato, station og om den kan startes, i én liste. Uanset om ordrerne kom fra et ERP eller blev oprettet her.",
        visualImage: "/images/Mockups/Work-Order-Management-Orders.png",
        visualImagePosition: "top",
        visualAlt: "Arbejdsordrer i OptiPeople Data Platform",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "0", label: "ERP-koblinger skal der til for at komme i gang" },
          { metric: "1 skærm", label: "Til operatøren: hvad, start, stop, meld tilbage" },
          { metric: "2 veje", label: "Ordrer til og fra ERP, hvis og når I vil" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Start på gulvet",
            description:
              "Panelet kommer op ved maskinen med ordrelisten på. Operatørerne starter, stopper og melder tilbage fra dag ét, uden et integrationsprojekt foran sig.",
          },
          {
            title: "Tag stilling til ERP",
            description:
              "Bliv ved med at oprette ordrerne i modulet, eller kobl ERP på, så ordrerne kommer ned og tallene går tilbage. Skærmen på gulvet er den samme.",
          },
          {
            title: "Lad tallene samle sig",
            description:
              "Hvert startet og stoppet job efterlader reelle tider og reelt output, og det er dem, planlægningen, OEE og månedsrapporten læser bagefter.",
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
        metaTitle: "Modular MES",
        metaDescription:
          "A modular MES: orders, OEE and efficiency, IoT and machine control, and planning with routes and timelines, switched on one module at a time.",
        eyebrow: "Modular MES",
        heroTitle: "Your Modular MES Platform",
        heroBody:
          "Manufacturing execution you switch on one module at a time. Orders, efficiency, IoT, and planning on one data foundation, turned into something every level of the organization can act on.",
        primaryLabel: "Request a Demo",
        introTitle: "Nobody needs a whole MES on day one",
        introBody:
          "The classic MES is an all-or-nothing project: eighteen months, every process at once, and a scope nobody on the floor recognises by the end of it. A modular MES is the opposite. Start with the module that answers the question you have this quarter, whether that is orders, OEE, machine data, or the plan, and add the next one when the next question turns up. Every module you add reads the data the earlier ones already collect.",
        capabilitiesTitle: "The modules a modular MES is made of",
        features: [
          {
            icon: ClipboardCheck,
            title: "Orders",
            description:
              "The orders to run, on the panel at the machine. Start, stop, and report quantities and scrap where the work happens, with or without an ERP behind it.",
          },
          {
            icon: Gauge,
            title: "OEE & Efficiency",
            description:
              "Track availability, performance, and quality across every machine, line, and shift. Understand exactly where production time is gained and lost.",
          },
          {
            icon: Cpu,
            title: "IoT & Machine Control",
            description:
              "Connect new controls, retrofitted sensors, and the systems you already run. Read machine state, and control start, stop, and setup from the panel.",
          },
          {
            icon: Calendar,
            title: "Planning, Routes & Timelines",
            description:
              "Sequence work orders across the entities of each production route, on a timeline the floor can see, against the capacity the machines actually have.",
          },
          {
            icon: Monitor,
            title: "Customizable Dashboards",
            description:
              "Give operators, managers, and directors the view they need. From shopfloor screens to boardroom reports, one platform, every perspective.",
          },
          {
            icon: BarChart3,
            title: "Automated Reporting",
            description:
              "Eliminate manual spreadsheets. Identify patterns, trends, and outliers automatically and deliver reports to stakeholders on schedule.",
          },
        ],
        visualTitle: "One module registers it, every module has it",
        visualBody:
          "This is what makes it modular rather than eleven separate products: a stop registered at the machine lands once, and orders, OEE, maintenance, and the monthly report all read the same record.",
        visualDrawn: "mes",
        metricsTitle: "What Modular Means",
        metrics: [
          { metric: "1", label: "Module is a valid place to start" },
          { metric: "11", label: "Modules on the same data foundation" },
          { metric: "0", label: "Re-entry between them" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Start with one",
            description:
              "Pick the module that answers the question you have now. Machines, sensors, and existing systems get connected as that module needs them, with no rip-and-replace.",
          },
          {
            title: "Add the next",
            description:
              "The next module switches on against data you are already collecting, so it arrives with history behind it instead of an empty database.",
          },
          {
            title: "Keep one version of the truth",
            description:
              "However many modules end up running, there is one record per machine, order, batch, and shift, and every view reads from it.",
          },
        ],
      },
      da: {
        metaTitle: "Modulært MES | OptiPeople",
        metaDescription:
          "Et modulært MES: ordrer, OEE og effektivitet, IoT og maskinstyring, og planlægning med ruter og tidslinjer. Ét modul ad gangen.",
        eyebrow: "Modulært MES",
        heroTitle: "Jeres modulære MES",
        heroBody:
          "Et MES, I slår til ét modul ad gangen. Ordrer, effektivitet, IoT og planlægning på ét fælles datagrundlag.",
        primaryLabel: "Book en demo",
        introTitle: "Ingen har brug for et helt MES fra dag ét",
        introBody:
          "Et klassisk MES-projekt er alt eller intet: halvandet år, alle processer på én gang, og et omfang, ingen på gulvet kan genkende til sidst. Et modulært MES er det modsatte. Start med det modul, der svarer på det spørgsmål, I har lige nu, og tag det næste, når det næste spørgsmål dukker op.",
        capabilitiesTitle: "Modulerne i et modulært MES",
        features: [
          {
            icon: ClipboardCheck,
            title: "Ordrer",
            description:
              "Ordrerne står på panelet ved maskinen. Start, stop, meld antal og kassation, med eller uden ERP bagved.",
          },
          {
            icon: Gauge,
            title: "OEE og effektivitet",
            description:
              "Se tilgængelighed, ydelse og kvalitet på tværs af maskiner, linjer og skift, og hvor tiden bliver vundet og tabt.",
          },
          {
            icon: Cpu,
            title: "IoT og maskinstyring",
            description:
              "Kobl nye styringer, eftermonterede sensorer og de systemer, I allerede har, på. Læs maskinens tilstand, og styr start, stop og omstilling fra panelet.",
          },
          {
            icon: Calendar,
            title: "Planlægning, ruter og tidslinjer",
            description:
              "Læg ordrerne i rækkefølge hen over de enheder, hver produktionsrute går igennem, på en tidslinje gulvet kan se.",
          },
          {
            icon: Monitor,
            title: "Dashboards, I selv sætter op",
            description:
              "Fra tavleskærmen på gulvet til rapporten til ledelsen. Samme data, hver sin vinkel.",
          },
          {
            icon: BarChart3,
            title: "Rapporter, der laver sig selv",
            description:
              "Mønstre, udvikling og det, der stikker ud, bliver fundet automatisk og sendt ud efter en plan.",
          },
        ],
        visualTitle: "Ét modul registrerer det, alle moduler har det",
        visualBody:
          "Det er det, der gør det modulært i stedet for elleve løsrevne produkter: et stop registreret ved maskinen lander én gang, og ordrer, OEE, vedligehold og månedsrapporten læser den samme registrering.",
        visualDrawn: "mes",
        metricsTitle: "Hvad modulært betyder",
        metrics: [
          { metric: "1", label: "Modul er et fint sted at starte" },
          { metric: "11", label: "Moduler på det samme datagrundlag" },
          { metric: "0", label: "Gange I taster det samme igen" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Start med ét",
            description:
              "Vælg det modul, der svarer på spørgsmålet nu. Maskiner, sensorer og systemer bliver koblet på, som netop det modul har brug for.",
          },
          {
            title: "Tag det næste",
            description:
              "Næste modul starter på data, I allerede samler op, så det kommer med historik bag sig i stedet for en tom database.",
          },
          {
            title: "Én version af sandheden",
            description:
              "Uanset hvor mange moduler der ender med at køre, er der én registrering pr. maskine, ordre, batch og skift.",
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
          "Sequence work orders across the entities of each production route, not just one flat timeline, against measured run rates and real machine availability.",
        eyebrow: "Planning Module",
        heroTitle: "Plan the Whole Route, Not Just One Timeline",
        heroBody:
          "Most schedulers give you a single production timeline. This one plans across the entities of each production route, on measured run rates and real machine availability, visible to everyone who has to deliver it.",
        primaryLabel: "Request a Demo",
        introTitle: "A product does not pass through one machine, so why plan as if it does",
        introBody:
          "Most production plans are built from standard times that were set years ago and a capacity figure nobody has re-measured since. The plan looks fine on Monday and has drifted by Wednesday. When planning reads from the same data as the shopfloor, the numbers underneath it are the ones the machines actually produced, so the plan starts realistic and stays that way.",
        capabilitiesTitle: "Planning that stays connected to the floor",
        features: [
          {
            icon: GitBranch,
            title: "Routes, Not One Flat Timeline",
            description:
              "Each product has a route: cut, mill, glue, assemble, glaze, pack. Orders are sequenced across every entity on that route, so a slip at station two is visibly a problem at station five.",
          },
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
        visualTitle: "One row per entity, grouped by route",
        visualBody:
          "The board is grouped by production route and broken out per entity underneath it, so a drag from one station to another is a real decision rather than a line moving on a chart. Progress reports itself from the floor as the order moves along the route.",
        visualImage: "/images/Mockups/Work-Order-Management-Planning-Desktop.png",
        visualAlt: "Production planning overview in OptiPeople Data Platform",
        metricsTitle: "What Changes",
        metrics: [
          { metric: "Per route", label: "Sequenced across every entity, not one flat line" },
          { metric: "Measured", label: "Capacity from real output, not estimates" },
          { metric: "One plan", label: "Shared by planning and the shopfloor" },
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
              "Sequence orders across the entities of each route, against that capacity, with setup time and planned maintenance in the same picture.",
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
          "Læg ordrerne i rækkefølge hen over de enheder, hver produktionsrute går igennem, og ikke bare på én flad tidslinje. Efter målte kørehastigheder og reel ledig tid.",
        eyebrow: "Planlægningsmodul",
        heroTitle: "Planlæg hele ruten, ikke bare én tidslinje",
        heroBody:
          "De fleste planlægningssystemer giver jer én produktionstidslinje. Her planlægger I hen over de enheder, hver produktionsrute går igennem, efter målte kørehastigheder og den tid, maskinerne reelt er ledige.",
        primaryLabel: "Book en demo",
        introTitle: "En vare går ikke gennem én maskine, så hvorfor planlægge, som om den gjorde",
        introBody:
          "De fleste planer bygger på standardtider, der blev sat for år tilbage, og en kapacitet, ingen har målt siden. Når planlægningen læser de samme data som gulvet, er tallene under planen dem, maskinerne faktisk har lavet.",
        capabilitiesTitle: "Planlægning, der hænger sammen med gulvet",
        features: [
          {
            icon: GitBranch,
            title: "Ruter, ikke én flad tidslinje",
            description:
              "Hver vare har en rute: skær, fræs, lim, montér, glas, pak. Ordrerne bliver lagt i rækkefølge hen over hver enhed på ruten, så noget, der skrider ved station to, også er synligt som et problem ved station fem.",
          },
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
        visualTitle: "Én række pr. enhed, samlet under sin rute",
        visualBody:
          "Tavlen er grupperet efter produktionsrute og delt op pr. enhed nedenunder, så det at trække en ordre fra én station til en anden er en rigtig beslutning og ikke bare en streg, der flytter sig. Fremdriften melder sig selv fra gulvet, mens ordren bevæger sig ned ad ruten.",
        visualImage: "/images/Mockups/Work-Order-Management-Planning-Desktop.png",
        visualAlt: "Overblik over produktionsplanlægning i OptiPeople Data Platform",
        metricsTitle: "Hvad ændrer sig",
        metrics: [
          { metric: "Pr. rute", label: "Lagt hen over hver enhed, ikke én flad streg" },
          { metric: "Målt", label: "Kapacitet ud fra det, I faktisk producerer" },
          { metric: "Én plan", label: "Delt mellem planlægning og gulv" },
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
        heroTitle: "The Right Instruction, at the Right Place",
        heroBody:
          "Work instructions, drawings, and certificates where the work happens: at a machine, a station, a line, a warehouse, or a lab, in the version that applies to the job in front of the person doing it.",
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
        heroTitle: "Den rigtige instruktion på det rigtige sted",
        heroBody:
          "Arbejdsinstruktioner, tegninger og certifikater dér, hvor arbejdet sker: ved maskinen, på stationen, på linjen, på lageret eller i laboratoriet, i den version, der gælder for opgaven foran den, der udfører den.",
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
