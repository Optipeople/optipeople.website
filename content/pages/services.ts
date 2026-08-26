import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  Cable,
  CalendarClock,
  Cog,
  Cpu,
  Database,
  FileBarChart,
  Gauge,
  Monitor,
  MonitorCog,
  PieChart,
  Radio,
  RefreshCw,
  ScanLine,
  Search,
  ShieldCheck,
  Users,
  Workflow,
  Wrench,
} from "lucide-react"
import {
  buildLookup,
  type LocalizedPage,
  type StandardPage,
} from "@/content/shared/types"

const services: LocalizedPage<StandardPage>[] = [
  {
    slug: "smart-operations",
    href: "/services/smart-operations",
    content: {
      en: {
        metaTitle: "Smart Operations Services",
        metaDescription:
          "Improve shopfloor visibility with real-time monitoring, OEE tracking, stop-cause analysis, and automated production reporting.",
        eyebrow: "Smart Operations",
        heroTitle: "See Your Factory in Real Time",
        heroBody:
          "Connect machines, capture production data automatically, and give your team the visibility they need to make better decisions, faster.",
        primaryLabel: "Request a Demo",
        introTitle: "Your production data shouldn't live in spreadsheets",
        introBody:
          "Most factories still rely on manual logs, whiteboards, and end-of-shift reports to understand what happened on the floor. By the time the data reaches a decision-maker, the moment to act has passed. Smart Operations replaces guesswork with live signals from every machine, every shift.",
        capabilitiesTitle: "Everything you need to run a data-driven floor",
        features: [
          {
            icon: Activity,
            title: "Real-Time Monitoring",
            description:
              "Live visibility into machine status, production counts, and operational performance across your entire facility.",
          },
          {
            icon: Gauge,
            title: "OEE Tracking",
            description:
              "Automatic calculation of availability, performance, and quality metrics with drill-down by shift, line, or machine.",
          },
          {
            icon: Wrench,
            title: "Stop Cause Analysis",
            description:
              "Capture downtime reasons at the source. Understand where time is lost and prioritize improvements that matter.",
          },
          {
            icon: BarChart3,
            title: "Performance Reports",
            description:
              "Automated daily, weekly, and monthly reports delivered to stakeholders with actionable insights.",
          },
          {
            icon: Radio,
            title: "Machine Connectivity",
            description:
              "Connect any machine, new or legacy, through OPC-UA, Modbus, IO-Link, or simple sensor kits. No rip-and-replace.",
          },
          {
            icon: Bell,
            title: "Smart Alerts",
            description:
              "Get notified the moment a line goes down or performance dips below target. Route alerts to the right people automatically.",
          },
        ],
        visualTitle: "One dashboard for your entire operation",
        visualBody:
          "From individual machines to plant-wide KPIs, drill into the data that matters, at any level.",
        visualImage: "/images/dashboard2.png",
        visualAlt: "Smart operations dashboard",
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
        metaTitle: "Smart Operations services | OptiPeople",
        metaDescription:
          "Forbedr shopfloor-synlighed med live overvågning, OEE, stopårsager og automatiseret rapportering.",
        eyebrow: "Smart Operations",
        heroTitle: "Se fabrikken i realtid",
        heroBody:
          "Forbind maskiner, opsaml produktionsdata automatisk, og giv teamet synlighed til at træffe bedre beslutninger hurtigere.",
        primaryLabel: "Book en demo",
        introTitle: "Drift bliver bedre, når fakta er synlige",
        introBody:
          "Vi hjælper produktionsteams fra strategi til implementering: datakilder, dashboards, rapportering og nye arbejdsgange.",
        capabilitiesTitle: "Det vi leverer",
        features: [
          {
            icon: Activity,
            title: "Realtidsovervågning",
            description:
              "Live status på maskiner, tællere og performance på tværs af produktionen.",
          },
          {
            icon: Gauge,
            title: "OEE-sporing",
            description:
              "Automatisk beregning af availability, performance og quality med drill-down.",
          },
          {
            icon: Radio,
            title: "Maskinforbindelse",
            description:
              "Kobl nyt og gammelt udstyr på uden at skifte hele maskinparken ud.",
          },
        ],
        visualTitle: "Fra signal til beslutning",
        visualBody:
          "Dashboard, alarmer og rapportering samles i den arbejdsgang, der passer til jeres fabrik.",
        visualImage: "/images/dashboard2.png",
        visualAlt: "Smart operations dashboard",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "15-25%", label: "OEE-forbedring første år" },
          { metric: "40%", label: "Mindre uplanlagt nedetid" },
          { metric: "2 timer", label: "Sparet dagligt på rapportering" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Kortlæg",
            description:
              "Vi finder de vigtigste tab, datakilder og beslutninger i hverdagen.",
          },
          {
            title: "Implementér",
            description:
              "Maskiner, dashboards og rapporter sættes op tæt på driften.",
          },
          {
            title: "Forankr",
            description:
              "Vi hjælper teamet med at bruge data i tavlemøder, opfølgning og forbedringer.",
          },
        ],
      },
    },
  },
  {
    slug: "automation",
    href: "/services/automation",
    content: {
      en: {
        metaTitle: "Automation Services",
        metaDescription:
          "Design and integrate PLC, HMI, SCADA, and machine control systems for reliable industrial automation and connected production lines.",
        eyebrow: "Automation",
        heroTitle: "Automation and Control, Built for Production",
        heroBody:
          "We design, program, and commission automation systems, from PLC logic and machine control to full production line integration.",
        primaryLabel: "Discuss Your Project",
        introTitle: "Machines should work for you, not against you",
        introBody:
          "Whether you're building a new machine, upgrading an aging control system, or integrating equipment into a production line, getting automation right is critical. Poor control logic, unreliable wiring, or disconnected systems cost you uptime, quality, and throughput. We bring the engineering discipline to get it right the first time.",
        capabilitiesTitle: "Full-scope automation engineering",
        features: [
          {
            icon: Cpu,
            title: "PLC Programming",
            description:
              "Custom PLC development for Siemens, Allen-Bradley, Beckhoff, and more. From new builds to retrofits. We write the logic that keeps your machines running.",
          },
          {
            icon: Cog,
            title: "Machine Control Systems",
            description:
              "End-to-end machine control design including motion control, servo drives, and coordinated multi-axis systems tailored to your process.",
          },
          {
            icon: MonitorCog,
            title: "HMI & SCADA Development",
            description:
              "Intuitive operator interfaces and supervisory systems that give your team real-time visibility and control over every machine and line.",
          },
          {
            icon: Cable,
            title: "Electrical Design & Panel Build",
            description:
              "Complete electrical schematics, control panel design, and build fully documented and compliant with relevant standards.",
          },
          {
            icon: ScanLine,
            title: "System Integration",
            description:
              "Connect PLCs, robots, vision systems, and instrumentation into a unified control architecture. We bridge the gap between isolated machines and coordinated production.",
          },
          {
            icon: ShieldCheck,
            title: "Safety Systems",
            description:
              "Functional safety design and implementation including safety PLCs, risk assessments, and CE marking support to keep your people and processes protected.",
          },
        ],
        visualTitle: "From concept to commissioned system",
        visualBody:
          "We handle the full lifecycle, electrical design, PLC programming, panel builds, HMI screens, and on-site commissioning.",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "30%", label: "Faster cycle times after automation upgrades" },
          { metric: "99.5%", label: "Uptime on systems we commission" },
          { metric: "0", label: "Production stopped for retrofit projects" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Scope",
            description:
              "We assess your current setup, define requirements, and design an automation solution that fits your process, not the other way around.",
          },
          {
            title: "Build",
            description:
              "PLC programming, electrical design, panel build, and HMI development all handled in-house with full documentation and factory acceptance testing.",
          },
          {
            title: "Commission",
            description:
              "On-site installation, commissioning, and operator training. We stay until the system runs reliably and your team is confident.",
          },
        ],
      },
      da: {
        metaTitle: "Automation services | OptiPeople",
        metaDescription:
          "Design og integrér PLC, HMI, SCADA og maskinstyring til stabil industriel automation.",
        eyebrow: "Automation",
        heroTitle: "Automation og styring bygget til produktion",
        heroBody:
          "Vi designer, programmerer og idriftsætter automationsløsninger fra PLC-logik til komplette produktionslinjer.",
        primaryLabel: "Tal om projektet",
        introTitle: "Maskiner skal arbejde for jer",
        introBody:
          "Dårlig styring, ustabile signaler og isolerede systemer koster oppetid og kvalitet. Vi bygger automation, der holder i drift.",
        capabilitiesTitle: "Automationsengineering fra ende til anden",
        features: [
          {
            icon: Cpu,
            title: "PLC-programmering",
            description:
              "Udvikling og retrofit til Siemens, Allen-Bradley, Beckhoff og flere platforme.",
          },
          {
            icon: Monitor,
            title: "HMI og SCADA",
            description:
              "Operatørflader og overvågning der giver kontrol og overblik i realtid.",
          },
          {
            icon: Cable,
            title: "El-design og tavler",
            description:
              "El-diagrammer, tavledesign, dokumentation og byg efter relevante standarder.",
          },
        ],
        visualTitle: "Fra koncept til idriftsat system",
        visualBody:
          "Vi håndterer el-design, PLC, HMI, test, installation og idriftsættelse.",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "30%", label: "Hurtigere cyklustider efter upgrade" },
          { metric: "99,5%", label: "Oppetid på idriftsatte systemer" },
          { metric: "0", label: "Unødige stop under retrofit" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Scope",
            description:
              "Vi afklarer krav, proces og sikkerhed, før løsningen designes.",
          },
          {
            title: "Byg",
            description:
              "PLC, HMI, el-design og FAT samles i et dokumenteret forløb.",
          },
          {
            title: "Idriftsæt",
            description:
              "Installation, test og træning gennemføres, indtil systemet kører stabilt.",
          },
        ],
      },
    },
  },
  {
    slug: "business-intelligence",
    href: "/services/business-intelligence",
    content: {
      en: {
        metaTitle: "Business Intelligence Services",
        metaDescription:
          "Build better manufacturing reporting with Power BI dashboards, integrated data pipelines, KPI design, and workflow automation.",
        eyebrow: "Business Intelligence",
        heroTitle: "Reports That Actually Drive Decisions",
        heroBody:
          "Hire us to build Power BI dashboards, automate your reporting, and turn scattered data into clear, actionable insights.",
        primaryLabel: "Get in Touch",
        introTitle: "Data is everywhere. Insight is not",
        introBody:
          "Your organization generates more data than ever, but it sits locked in ERP systems, spreadsheets, and disconnected tools. Getting a clear answer still means hours of manual work. Our BI consultancy brings it all together, so your team spends time acting on data, not hunting for it.",
        capabilitiesTitle: "What we deliver",
        features: [
          {
            icon: BarChart3,
            title: "Power BI Dashboards",
            description:
              "Custom-built Power BI reports tailored to your business. From executive overviews to operational deep-dives, designed to answer the questions that matter.",
          },
          {
            icon: Database,
            title: "Data Integration",
            description:
              "Connect ERP, MES, CRM, and other data sources into a single reporting layer. No more switching between systems to get the full picture.",
          },
          {
            icon: Workflow,
            title: "Workflow Automation",
            description:
              "Automate repetitive reporting tasks, data pipelines, and business processes using Power Automate and custom integrations.",
          },
          {
            icon: PieChart,
            title: "KPI Design",
            description:
              "We help you define and visualize the right KPIs for your organization. Clear metrics that drive decisions, not just decorate dashboards.",
          },
          {
            icon: RefreshCw,
            title: "Automated Data Pipelines",
            description:
              "Set up reliable data flows that keep your reports fresh. Scheduled refreshes, incremental loads, and error handling built in.",
          },
          {
            icon: Users,
            title: "Training and Enablement",
            description:
              "We train your team to use, maintain, and extend the reports we build. Self-sufficiency is the goal, not dependency.",
          },
        ],
        visualTitle: "From raw data to boardroom-ready reports",
        visualBody:
          "Interactive Power BI dashboards that connect to your existing systems and update automatically.",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "80%", label: "Less time spent on manual reporting" },
          { metric: "1 view", label: "All your data sources in one place" },
          { metric: "Real-time", label: "Always up-to-date insights" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Understand",
            description:
              "We map your data landscape and reporting needs. What decisions do you need to make, and what data do you need to make them?",
          },
          {
            title: "Build",
            description:
              "We design and develop Power BI reports, data models, and automations tailored to your workflows and KPIs.",
          },
          {
            title: "Enable",
            description:
              "We hand over reports, documentation, and training so your team can run independently. Ongoing support available when you need it.",
          },
        ],
      },
      da: {
        metaTitle: "Business Intelligence services | OptiPeople",
        metaDescription:
          "Power BI dashboards, datamodeller, KPI-design og automatiseret rapportering til produktion.",
        eyebrow: "Business Intelligence",
        heroTitle: "Rapporter der faktisk driver beslutninger",
        heroBody:
          "Få Power BI dashboards, datamodeller og automatiseringer der samler spredte data til klare indsigter.",
        primaryLabel: "Kontakt os",
        introTitle: "Data findes overalt. Indsigt gør ikke.",
        introBody:
          "ERP, MES, CRM og regneark giver hver deres brik. Vi samler datalandskabet, så teamet kan handle på svar i stedet for at lede efter dem.",
        capabilitiesTitle: "Det vi leverer",
        features: [
          {
            icon: BarChart3,
            title: "Power BI dashboards",
            description:
              "Rapporter fra ledelsesoverblik til operationelle drill-downs.",
          },
          {
            icon: Database,
            title: "Dataintegration",
            description:
              "Samlet rapporteringslag på tværs af ERP, MES, CRM og andre kilder.",
          },
          {
            icon: Workflow,
            title: "Workflow automation",
            description:
              "Automatisér dataloads, rapportudsendelse og gentagne processer.",
          },
        ],
        visualTitle: "Fra rå data til ledelsesklare rapporter",
        visualBody:
          "Interaktive dashboards der opdateres automatisk og taler samme sprog som driften.",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "80%", label: "Mindre tid på manuel rapportering" },
          { metric: "1 view", label: "Alle datakilder samlet" },
          { metric: "Live", label: "Opdaterede indsigter" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Forstå",
            description: "Vi kortlægger beslutninger, datakilder og KPI'er.",
          },
          {
            title: "Byg",
            description:
              "Datamodeller, rapporter og automationsflows udvikles til jeres arbejdsgange.",
          },
          {
            title: "Overdrag",
            description:
              "Teamet får dokumentation, træning og mulighed for løbende support.",
          },
        ],
      },
    },
  },
  {
    slug: "ai-solutions",
    href: "/services/ai-solutions",
    content: {
      en: {
        metaTitle: "AI Solutions Services",
        metaDescription:
          "Use AI agents for reporting, planning, workflow automation, and data-driven decision support in manufacturing operations.",
        eyebrow: "AI Agentic Solutions",
        heroTitle: "AI Agents That Run Your Operations",
        heroBody:
          "We build autonomous AI agents that automate processes, generate reports, optimize planning, and deliver business intelligence, so your team can focus on what matters.",
        primaryLabel: "Talk to Us",
        introTitle: "Your team shouldn't be the bottleneck",
        introBody:
          "Production operations generate a constant stream of tasks that demand attention, pulling reports, updating schedules, chasing data across systems, flagging quality issues. These tasks are critical, but they don't need a human in the loop. AI agents handle them autonomously, accurately, and around the clock, freeing your people to focus on decisions that actually require judgment.",
        capabilitiesTitle: "Agents built for production operations",
        features: [
          {
            icon: Bot,
            title: "Process Automation Agents",
            description:
              "AI agents that handle repetitive operational tasks end-to-end, from data entry and order processing to inventory updates, without human intervention.",
          },
          {
            icon: FileBarChart,
            title: "Automated Reporting",
            description:
              "Agents that collect data from multiple sources, generate production reports, shift summaries, and KPI dashboards delivered on schedule, every time.",
          },
          {
            icon: BrainCircuit,
            title: "Intelligent BI Agents",
            description:
              "Go beyond static dashboards. AI agents that proactively surface anomalies, explain trends, and recommend actions based on your production data.",
          },
          {
            icon: CalendarClock,
            title: "Planning & Scheduling Agents",
            description:
              "Agents that optimize production schedules, balance workloads, and adjust plans in real time as conditions change on the shop floor.",
          },
          {
            icon: Workflow,
            title: "Workflow Orchestration",
            description:
              "Connect agents across systems, ERP, MES, SCADA, and more. Build multi-step workflows where agents hand off tasks to each other autonomously.",
          },
          {
            icon: ShieldCheck,
            title: "Quality & Compliance Agents",
            description:
              "Automate quality checks, flag deviations before they escalate, and keep audit trails complete, reducing risk and rework.",
          },
        ],
        visualTitle: "Agents that work across your entire stack",
        visualBody:
          "From ERP and MES to email and spreadsheets, AI agents connect to your systems and act on data in real time.",
        visualImage: "/images/report1.png",
        visualAlt: "AI-analyse på produktionsrapport",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "70%", label: "Reduction in manual reporting effort" },
          { metric: "24/7", label: "Agents working around the clock" },
          { metric: "10x", label: "Faster response to production issues" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Identify",
            description:
              "We map your operational workflows and pinpoint where AI agents can eliminate manual work, reduce errors, and speed up decisions.",
          },
          {
            title: "Deploy",
            description:
              "We build and deploy custom AI agents integrated with your existing systems. Each agent is designed for a specific task and tested against real data.",
          },
          {
            title: "Scale",
            description:
              "Start with one agent, then expand. As agents prove their value, we help you orchestrate multi-agent workflows across your entire operation.",
          },
        ],
      },
      da: {
        metaTitle: "AI-agentløsninger | OptiPeople",
        metaDescription:
          "AI-agenter og copilots der hjælper produktionsteams med data, beslutninger og automatiserede arbejdsgange.",
        eyebrow: "AI-agentløsninger",
        heroTitle: "AI der arbejder med jeres drift",
        heroBody:
          "Byg agenter der forstår produktionsdata, finder mønstre og hjælper teamet fra spørgsmål til handling.",
        primaryLabel: "Tal om AI",
        introTitle: "AI skal være tæt på arbejdsflowet",
        introBody:
          "Værdien kommer ikke fra generiske svar, men fra AI der kan bruge jeres data, regler og systemer sikkert og sporbarhed.",
        capabilitiesTitle: "Agenter bygget til produktionsdrift",
        features: [
          {
            icon: Bot,
            title: "Datacopilots",
            description:
              "Stil spørgsmål til OEE, stopårsager, energi og kvalitet i almindeligt sprog.",
          },
          {
            icon: Search,
            title: "Mønsterdetektion",
            description:
              "Find afvigelser og sammenhænge på tværs af maskiner, skift og perioder.",
          },
          {
            icon: Workflow,
            title: "Agent workflows",
            description:
              "Lad agenter samle data, foreslå handlinger og forberede opfølgning.",
          },
        ],
        visualTitle: "Agenter på tværs af jeres systemer",
        visualBody:
          "Fra ERP og MES til email og regneark. AI kobles på data og processer med tydelige sikkerhedsrammer.",
        visualImage: "/images/report1.png",
        visualAlt: "AI-analyse på produktionsrapport",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "10x", label: "Hurtigere fra spørgsmål til indsigt" },
          { metric: "24/7", label: "Løbende mønsterdetektion" },
          { metric: "100%", label: "Sporbare indsigter" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Vælg use case",
            description:
              "Vi starter med konkrete beslutninger og gentagne opgaver.",
          },
          {
            title: "Forbind data",
            description:
              "Agenten får adgang til de relevante systemer og datakilder.",
          },
          {
            title: "Valider",
            description:
              "Svar og handlinger testes med brugere, før agenten skaleres.",
          },
        ],
      },
    },
  },
]

export const { slugs: serviceSlugs, get: getService } = buildLookup(services)
export { services }
