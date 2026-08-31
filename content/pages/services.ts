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
          "Få styr på, hvad der sker på gulvet: overvågning i realtid, OEE, stopårsager og rapporter, der laver sig selv.",
        eyebrow: "Smart Operations",
        heroTitle: "Se fabrikken i realtid",
        heroBody:
          "Vi kobler maskinerne på, samler produktionsdata automatisk og giver teamet det overblik, der skal til for at træffe bedre beslutninger hurtigere.",
        primaryLabel: "Book en demo",
        introTitle: "Driften bliver bedre, når man kan se, hvad der sker",
        introBody:
          "Vi følger produktionsteams hele vejen: hvor data kommer fra, hvad der skal stå på skærmene, hvilke rapporter der skal ud, og hvordan hverdagen ser ud bagefter.",
        capabilitiesTitle: "Det laver vi",
        features: [
          {
            icon: Activity,
            title: "Overvågning i realtid",
            description:
              "Se status på maskinerne, tællerne og hvordan det går, på tværs af hele produktionen.",
          },
          {
            icon: Gauge,
            title: "OEE-opfølgning",
            description:
              "Tilgængelighed, ydelse og kvalitet bliver regnet ud automatisk, og I kan klikke jer ned i tallene.",
          },
          {
            icon: Radio,
            title: "Maskinerne koblet på",
            description:
              "Vi kobler nyt og gammelt udstyr på, uden at I skal skifte maskinparken ud.",
          },
        ],
        visualTitle: "Fra signal til beslutning",
        visualBody:
          "Dashboards, alarmer og rapporter bliver sat op, så de passer til den måde, jeres fabrik arbejder på.",
        visualImage: "/images/dashboard2.png",
        visualAlt: "Smart operations dashboard",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "15-25%", label: "Bedre OEE det første år" },
          { metric: "40%", label: "Mindre uplanlagt nedetid" },
          { metric: "2 timer", label: "Sparet på rapportering hver dag" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Kortlæg",
            description:
              "Vi finder de største tab, de data, der allerede findes, og de beslutninger, der bliver truffet i hverdagen.",
          },
          {
            title: "Sæt op",
            description:
              "Maskiner, dashboards og rapporter bliver sat op tæt på driften.",
          },
          {
            title: "Få det ind i hverdagen",
            description:
              "Vi hjælper teamet med at bruge tallene på tavlemødet, i opfølgningen og i forbedringerne.",
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
          "Vi designer og kobler PLC, HMI, SCADA og maskinstyring sammen, så automationen holder i drift.",
        eyebrow: "Automation",
        heroTitle: "Automation og styring bygget til produktion",
        heroBody:
          "Vi tegner, programmerer og sætter i drift, fra logikken i en PLC til en hel produktionslinje.",
        primaryLabel: "Tal om projektet",
        introTitle: "Maskinerne skal arbejde for jer",
        introBody:
          "Dårlig styring, ustabile signaler og systemer, der ikke taler sammen, koster oppetid og kvalitet. Vi bygger automation, der holder, når den først er sat i drift.",
        capabilitiesTitle: "Automation hele vejen igennem",
        features: [
          {
            icon: Cpu,
            title: "PLC-programmering",
            description:
              "Nyt og ombygning på Siemens, Allen-Bradley, Beckhoff og flere.",
          },
          {
            icon: Monitor,
            title: "HMI og SCADA",
            description:
              "Skærme til operatøren og overvågning, der giver styr på det hele, mens det kører.",
          },
          {
            icon: Cable,
            title: "El-design og tavler",
            description:
              "Diagrammer, tavler, dokumentation og byg efter de standarder, der gælder.",
          },
        ],
        visualTitle: "Fra idé til system i drift",
        visualBody:
          "Vi tager el-design, PLC, HMI, test, installation og opstart.",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "30%", label: "Hurtigere cyklustider efter opgradering" },
          { metric: "99,5%", label: "Oppetid på de systemer, vi sætter i drift" },
          { metric: "0", label: "Unødvendige stop under ombygningen" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Afklar",
            description:
              "Vi bliver enige om krav, proces og sikkerhed, før der bliver tegnet noget.",
          },
          {
            title: "Byg",
            description:
              "PLC, HMI, el-design og test samles i ét forløb, der er skrevet ned undervejs.",
          },
          {
            title: "Sæt i drift",
            description:
              "Vi installerer, tester og lærer folk op, indtil det kører stabilt.",
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
          "Power BI-dashboards, datamodeller, nøgletal og rapporter, der sender sig selv.",
        eyebrow: "Business Intelligence",
        heroTitle: "Rapporter, der faktisk bliver brugt",
        heroBody:
          "Power BI-dashboards, datamodeller og automatik, der samler data fra alle hjørner til noget, man kan træffe beslutninger på.",
        primaryLabel: "Kontakt os",
        introTitle: "Data er der masser af. Svar er der ikke.",
        introBody:
          "ERP, MES, CRM og regneark har hver deres brik. Vi samler dem, så teamet kan handle på svaret i stedet for at lede efter det.",
        capabilitiesTitle: "Det laver vi",
        features: [
          {
            icon: BarChart3,
            title: "Power BI-dashboards",
            description:
              "Rapporter fra ledelsens overblik til de tal, man kan klikke sig helt ned i.",
          },
          {
            icon: Database,
            title: "Data samlet ét sted",
            description:
              "Ét sted at rapportere fra, på tværs af ERP, MES, CRM og de andre kilder.",
          },
          {
            icon: Workflow,
            title: "Automatik i stedet for håndarbejde",
            description:
              "Data bliver hentet, rapporter sendt, og de trin, der kommer igen, kører af sig selv.",
          },
        ],
        visualTitle: "Fra rå data til rapporter, ledelsen kan bruge",
        visualBody:
          "Dashboards, der opdaterer sig selv og bruger de samme ord som driften.",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "80%", label: "Mindre tid på rapportering i hånden" },
          { metric: "1 skærm", label: "Alle kilder samlet" },
          { metric: "Live", label: "Tal, der opdaterer sig selv" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Forstå",
            description: "Vi finder ud af, hvilke beslutninger der skal træffes, hvor data ligger, og hvilke tal der betyder noget.",
          },
          {
            title: "Byg",
            description:
              "Datamodeller, rapporter og automatik bygges til den måde, I arbejder på.",
          },
          {
            title: "Overdrag",
            description:
              "I får dokumentationen, oplæringen og hjælp bagefter, hvis I vil have det.",
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
          "AI-agenter og copiloter, der hjælper produktionsteams med data, beslutninger og de opgaver, der kommer igen.",
        eyebrow: "AI-agentløsninger",
        heroTitle: "AI, der arbejder med i driften",
        heroBody:
          "Vi bygger agenter, der kan læse jeres produktionsdata, finde mønstrene og hjælpe teamet fra spørgsmål til handling.",
        primaryLabel: "Tal om AI",
        introTitle: "AI skal sidde tæt på arbejdet",
        introBody:
          "Værdien ligger ikke i generelle svar. Den ligger i en AI, der må bruge jeres data, jeres regler og jeres systemer, sikkert og med spor tilbage til kilden.",
        capabilitiesTitle: "Agenter bygget til produktion",
        features: [
          {
            icon: Bot,
            title: "Spørg dine data",
            description:
              "Stil spørgsmål om OEE, stopårsager, energi og kvalitet i almindeligt sprog.",
          },
          {
            icon: Search,
            title: "Find mønstrene",
            description:
              "Find det, der stikker ud, og de sammenhænge, der går på tværs af maskiner, skift og perioder.",
          },
          {
            icon: Workflow,
            title: "Agenter i arbejde",
            description:
              "Lad agenten samle tallene, foreslå næste skridt og gøre opfølgningen klar.",
          },
        ],
        visualTitle: "Agenter på tværs af jeres systemer",
        visualBody:
          "Fra ERP og MES til mail og regneark. AI bliver koblet på jeres data og processer, med klare rammer for, hvad den må.",
        visualImage: "/images/report1.png",
        visualAlt: "AI-analyse på produktionsrapport",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "10x", label: "Hurtigere fra spørgsmål til svar" },
          { metric: "24/7", label: "AI holder øje med mønstrene" },
          { metric: "100%", label: "Svar, I kan spore tilbage" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Vælg opgaven",
            description:
              "Vi starter med konkrete beslutninger og de opgaver, der kommer igen.",
          },
          {
            title: "Kobl data på",
            description:
              "Agenten får adgang til de systemer og data, den skal bruge.",
          },
          {
            title: "Prøv af",
            description:
              "Svar og handlinger bliver testet af dem, der skal bruge dem, før vi ruller ud.",
          },
        ],
      },
    },
  },
]

export const { slugs: serviceSlugs, get: getService } = buildLookup(services)
export { services }
