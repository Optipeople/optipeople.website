import {
  Activity,
  BarChart3,
  Bell,
  BellRing,
  Calendar,
  ClipboardCheck,
  Factory,
  FileText,
  Gauge,
  Globe,
  HeartPulse,
  Lock,
  MapPin,
  Plug,
  Radio,
  RefreshCw,
  Shield,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react"
import {
  buildLookup,
  type LocalizedPage,
  type StandardPage,
} from "@/content/shared/types"

const solutions: LocalizedPage<StandardPage>[] = [
  {
    slug: "manufacturing",
    href: "/solutions/manufacturing",
    content: {
      en: {
        metaTitle: "Manufacturing Solutions | OptiPeople",
        metaDescription:
          "Connect machines, track OEE in real time, and run your production floor with data. See how OptiPeople helps manufacturing companies improve visibility and reduce downtime.",
        eyebrow: "For Manufacturing Companies",
        heroTitle: "Know Your Factory. In Real Time.",
        heroBody:
          "Connect every machine, capture manufacturing data automatically, and give your team the visibility to act on problems while they still matter.",
        primaryLabel: "Request a Demo",
        introTitle: "Most factories still run on yesterday's numbers",
        introBody:
          "Shift reports arrive late. Downtime reasons live in notebooks. OEE is calculated in spreadsheets that nobody trusts. By the time you see the data, the moment to act has already passed. OptiPeople replaces guesswork with live signals from every machine, every shift, every line.",
        capabilitiesTitle: "Everything you need for a data-driven factory floor",
        features: [
          {
            icon: Activity,
            title: "Live Production Monitoring",
            description:
              "See machine status, production counts, and line performance in real time. Know what is running, what is stopped, and why.",
          },
          {
            icon: Gauge,
            title: "Automatic OEE Tracking",
            description:
              "Availability, performance, and quality calculated automatically. Drill down by shift, line, or machine without touching a spreadsheet.",
          },
          {
            icon: Wrench,
            title: "Stop Cause Registration",
            description:
              "Operators register downtime reasons at the machine. You get clean data on where time is lost and can prioritize the improvements that matter.",
          },
          {
            icon: BarChart3,
            title: "Shift and Production Reports",
            description:
              "Automated daily, weekly, and monthly reports delivered to the right people. No manual compilation, no conflicting numbers.",
          },
          {
            icon: Radio,
            title: "Machine Connectivity",
            description:
              "Connect any machine, new or legacy, through OPC-UA, Modbus, IO-Link, or simple sensor kits. No rip-and-replace required.",
          },
          {
            icon: Bell,
            title: "Smart Alerts and Escalation",
            description:
              "Get notified the moment a line goes down or performance drops below target. Route alerts to the right person automatically.",
          },
        ],
        visualTitle: "One dashboard for your entire operation",
        visualBody:
          "From individual machines to plant-wide KPIs, drill into the data that matters, at any level.",
        visualImage: "/images/Mockups/Report-OEE-Efficiency-No-Filter.png",
        visualAlt:
          "OptiPeople manufacturing report showing OEE gauges, a shift timeline and stop distribution",
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
              "We integrate with your existing machines and PLCs. No production disruption, no hardware overhaul.",
          },
          {
            title: "Visualize",
            description:
              "Your team gets a live dashboard from day one. Real-time OEE, stop causes, and shift performance in one place.",
          },
          {
            title: "Improve",
            description:
              "Use the data to run targeted improvement cycles. Track the impact of every change you make.",
          },
        ],
        darkHero: true,
      },
      da: {
        metaTitle: "Live overblik over produktion og maskiner | OptiPeople",
        metaDescription:
          "Kobl maskinerne på, følg OEE, mens det sker, og styr produktionen efter tallene. Se, hvordan OptiPeople giver overblik og mindre nedetid.",
        eyebrow: "Til produktionsvirksomheder",
        heroTitle: "Se, hvordan det går på fabrikken lige nu",
        heroBody:
          "Kobl alle maskiner på, få data samlet op automatisk, og giv jeres folk overblikket til at gribe ind, mens det stadig gør en forskel.",
        primaryLabel: "Book en demo",
        introTitle: "De fleste fabrikker styrer stadig efter gårsdagens tal",
        introBody:
          "Skiftrapporten kommer for sent. Stopårsagerne står i en notesbog. OEE bliver regnet ud i regneark, som ingen stoler på. Når I endelig ser tallene, er det for sent at gøre noget. OptiPeople henter signalerne direkte fra hver maskine, hvert skift og hver linje, så I ikke skal gætte.",
        capabilitiesTitle: "Det får produktionsholdet",
        features: [
          {
            icon: Factory,
            title: "Overblik over gulvet",
            description: "Status, produceret antal og stopårsager på maskiner og linjer, mens det sker.",
          },
          {
            icon: Gauge,
            title: "OEE og tab",
            description: "Se, hvor I taber tid, kvalitet og fart.",
          },
          {
            icon: Users,
            title: "De samme tal for alle",
            description: "Operatører, ledere og direktion arbejder ud fra de samme tal.",
          },
        ],
        visualTitle: "Hele driften på én skærm",
        visualBody:
          "Fra den enkelte maskine til nøgletallene for hele fabrikken. Gå ned i tallene på det niveau, I har brug for.",
        visualImage: "/images/Mockups/Report-OEE-Efficiency-No-Filter.png",
        visualAlt: "Produktionsrapport med OEE, skiftets tidslinje og stopfordeling",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "15-25%", label: "Bedre OEE det første år" },
          { metric: "40%", label: "Mindre uplanlagt nedetid" },
          { metric: "Live", label: "Tal, I kan styre efter" },
        ],
        stepsTitle: "Sådan kommer I i gang",
        steps: [
          {
            title: "Kortlæg",
            description: "Vi finder de tab og de datakilder, der betyder mest.",
          },
          {
            title: "Kobl på",
            description: "Maskiner og systemer bliver koblet på, uden at driften bliver forstyrret.",
          },
          {
            title: "Forbedr",
            description: "Teamet bruger tallene i hverdagen og sætter ind de rigtige steder.",
          },
        ],
        darkHero: true,
      },
    },
  },
  {
    slug: "oems",
    href: "/solutions/oems",
    content: {
      en: {
        metaTitle: "OEM Solutions | OptiPeople",
        metaDescription:
          "Ship connected machines with built-in intelligence. Monitor performance in the field, support customers proactively, and build recurring digital revenue with OptiPeople.",
        eyebrow: "For OEMs and Machine Builders",
        heroTitle: "Turn Machines Into Platforms",
        heroBody:
          "Ship connected machines with built-in intelligence. Monitor performance in the field, support customers before they call, and build recurring digital revenue on top of your equipment.",
        primaryLabel: "Request a Demo",
        introTitle: "Selling machines is not enough anymore",
        introBody:
          "Your competitors are offering connected solutions. Your customers expect remote support, predictive insights, and digital services. Without a platform, you are leaving revenue on the table and letting others own the relationship after the sale. OptiPeople gives you the infrastructure to turn every machine you ship into a connected product.",
        capabilitiesTitle: "Everything you need to deliver connected machines",
        features: [
          {
            icon: Globe,
            title: "Remote Fleet Monitoring",
            description:
              "See the status and performance of every machine you have shipped, across every customer site, from a single dashboard.",
          },
          {
            icon: Shield,
            title: "Proactive Customer Support",
            description:
              "Detect anomalies and performance degradation before your customer notices. Reach out with a solution before they file a ticket.",
          },
          {
            icon: TrendingUp,
            title: "Usage and Performance Analytics",
            description:
              "Give customers deep insight into how their machines perform. Drive engagement and make your machines indispensable.",
          },
          {
            icon: RefreshCw,
            title: "Digital Service Packages",
            description:
              "Bundle monitoring, alerts, and analytics into subscription offerings. Turn aftermarket into a revenue stream, not a cost center.",
          },
          {
            icon: Lock,
            title: "Multi-Tenant Data Isolation",
            description:
              "Each customer's data stays separate and secure. Role-based access ensures the right people see the right information.",
          },
          {
            icon: Plug,
            title: "Open Integration Layer",
            description:
              "Connect through OPC-UA, MQTT, REST APIs, or direct PLC integration. Works with your existing machine architecture.",
          },
        ],
        visualTitle: "Your machines, your brand, one platform",
        visualBody:
          "A white-label portal your customers access to see live machine data, service history, and performance trends.",
        visualImage: "/images/OpticloudOPSingle.jpg",
        visualAlt:
          "OptiPeople white-label portal showing machine data tables and OEE dashboard for connected equipment",
        metricsTitle: "What Connected Machine Builders Achieve",
        metrics: [
          { metric: "3x", label: "Growth in aftermarket revenue" },
          { metric: "60%", label: "Faster issue resolution with remote diagnostics" },
          { metric: "35%", label: "Higher customer retention with digital services" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Integrate",
            description:
              "We connect to your machine's control system. Your existing architecture stays intact.",
          },
          {
            title: "Deploy",
            description:
              "Ship machines with OptiPeople Data Platform built in. Customers access a branded portal from day one.",
          },
          {
            title: "Monetize",
            description:
              "Package data, insights, and proactive support into digital service tiers your customers pay for.",
          },
        ],
        darkHero: true,
      },
      da: {
        metaTitle: "Fjernovervågning af maskiner til OEM'er | OptiPeople",
        metaDescription:
          "Kobl jeres maskiner på ude hos kunderne: fejlfinding på afstand, indblik i, hvordan de kører, og service, I kan tage penge for.",
        eyebrow: "Til OEM'er og maskinbyggere",
        heroTitle: "Gør maskinen til mere end jern",
        heroBody:
          "Lever maskiner, der er koblet på fra start. Følg dem ude hos kunderne, hjælp, før kunden ringer, og byg en fast indtægt på service oven på udstyret.",
        primaryLabel: "Book en demo",
        introTitle: "Det er ikke længere nok at sælge maskinen",
        introBody:
          "Konkurrenterne tilbyder allerede maskiner, der er koblet på. Kunderne forventer hjælp på afstand, besked, før noget går galt, og digitale services. Uden en platform lader I penge ligge og overlader kunden til andre efter salget. Med OptiPeople bliver hver maskine, I leverer, et produkt, der er koblet på.",
        capabilitiesTitle: "Alt til maskiner, der er koblet på",
        features: [
          {
            icon: BellRing,
            title: "Fejlfinding på afstand",
            description: "Find årsagen og hjælp kunden, før nogen sætter sig ud i bilen.",
          },
          {
            icon: TrendingUp,
            title: "Se, hvordan maskinen kører",
            description:
              "Giv kunden indblik i, hvordan maskinen bliver brugt, hvad den laver, og hvor der er noget at hente.",
          },
          {
            icon: RefreshCw,
            title: "Service som abonnement",
            description:
              "Pak overvågning, alarmer og rapporter sammen til en service, kunden betaler for.",
          },
        ],
        visualTitle: "Jeres maskiner under jeres eget navn",
        visualBody:
          "En portal med jeres eget brand, hvor kunden ser maskinens tal, servicehistorikken, og hvordan den kører.",
        visualImage: "/images/OpticloudOPSingle.jpg",
        visualAlt: "Maskinportal med eget brand",
        metricsTitle: "Det opnår maskinbyggere, der kobler maskinerne på",
        metrics: [
          { metric: "3x", label: "Større forretning på eftermarkedet" },
          { metric: "60%", label: "Hurtigere fejlretning med fjernadgang" },
          { metric: "35%", label: "Flere kunder bliver hængende" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Kobl på",
            description: "Vi kobler platformen på maskinens styring og data.",
          },
          {
            title: "Lever",
            description: "Maskinerne bliver leveret med OptiPeople Data Platform indbygget, og kunden har sin egen portal fra første dag.",
          },
          {
            title: "Tjen på det",
            description: "Data og support bliver til ydelser, kunden betaler for.",
          },
        ],
        darkHero: true,
      },
    },
  },
  {
    slug: "service",
    href: "/solutions/service",
    content: {
      en: {
        metaTitle: "Service Solutions | OptiPeople",
        metaDescription:
          "Give your service team real visibility into machine health and usage. Plan maintenance on facts, reduce emergency callouts, and turn service into a competitive advantage with OptiPeople.",
        eyebrow: "For Service and Aftermarket Teams",
        heroTitle: "Fix Problems Before Customers Feel Them",
        heroBody:
          "Give your service team real visibility into machine health and usage. Plan maintenance on facts, reduce emergency callouts, and turn service from a cost center into a competitive advantage.",
        primaryLabel: "Request a Demo",
        introTitle: "Reactive service is expensive and exhausting",
        introBody:
          "Your technicians spend more time firefighting than preventing. Maintenance schedules are based on calendar intervals, not actual usage. When a machine goes down at a customer site, you scramble. OptiPeople gives your service team the data to act before failures happen and the tools to plan maintenance that actually prevents problems.",
        capabilitiesTitle: "Everything you need for predictable, proactive service",
        features: [
          {
            icon: HeartPulse,
            title: "Machine Health Monitoring",
            description:
              "Track vibration, temperature, energy consumption, and operating parameters in real time. See degradation trends before they become breakdowns.",
          },
          {
            icon: Calendar,
            title: "Usage-Based Maintenance",
            description:
              "Schedule maintenance based on actual operating hours and conditions, not arbitrary calendar intervals. Do the right work at the right time.",
          },
          {
            icon: MapPin,
            title: "Remote Diagnostics",
            description:
              "Diagnose issues remotely before dispatching a technician. Arrive prepared with the right parts and the right knowledge.",
          },
          {
            icon: ClipboardCheck,
            title: "Service Task Management",
            description:
              "Assign, track, and document service tasks digitally. Build a complete service history for every machine.",
          },
          {
            icon: BellRing,
            title: "Automated Service Alerts",
            description:
              "Get notified when a machine crosses a threshold or shows early signs of failure. Respond before the customer even notices.",
          },
          {
            icon: FileText,
            title: "Service Contracts and Reporting",
            description:
              "Deliver data-backed service reports to customers. Use machine data to design and price service agreements with confidence.",
          },
        ],
        visualTitle: "One view of every machine you service",
        visualBody:
          "Machine health, service history, and upcoming maintenance across your entire installed base.",
        visualImage: "/images/report-mockrup-3.png",
        visualAlt:
          "OptiPeople machine health dashboard showing temperature, energy consumption, and performance trend data",
        metricsTitle: "Typical Results",
        metrics: [
          { metric: "50%", label: "Fewer emergency service callouts" },
          {
            metric: "40 hrs",
            label: "Saved annually per machine on preventive maintenance",
          },
          { metric: "30%", label: "Increase in service contract revenue" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Connect",
            description:
              "Instrument machines with sensors and connect to your existing monitoring infrastructure. We handle the data pipeline.",
          },
          {
            title: "Monitor",
            description:
              "Your service team gets a live health dashboard for every machine. Alerts fire automatically when thresholds are crossed.",
          },
          {
            title: "Prevent",
            description:
              "Schedule maintenance based on real data. Resolve issues remotely when possible. Arrive prepared when a visit is needed.",
          },
        ],
        darkHero: true,
      },
      da: {
        metaTitle: "Fjernservice og vedligehold efter brug | OptiPeople",
        metaDescription:
          "Se, hvordan maskinerne har det, planlæg vedligehold efter faktisk brug, og find fejlen på afstand. Færre akutte udkald og service, I tjener penge på.",
        eyebrow: "Til service og eftermarked",
        heroTitle: "Løs problemet, før kunden mærker det",
        heroBody:
          "Giv serviceteamet et ærligt billede af, hvordan maskinerne har det og bliver brugt. Så kan I planlægge efter fakta, rykke færre gange ud akut og gøre service til noget, I tjener på.",
        primaryLabel: "Book en demo",
        introTitle: "Brandslukning er dyrt og slider på folk",
        introBody:
          "Teknikerne bruger mere tid på at slukke brande end på at forebygge. Vedligeholdet følger kalenderen, ikke hvor meget maskinen faktisk har kørt. Med maskindata, alarmer og historik kan I gribe ind, før kunden opdager, at der er noget galt.",
        capabilitiesTitle: "Service, der er på forkant",
        features: [
          {
            icon: HeartPulse,
            title: "Hvordan har maskinen det?",
            description:
              "Følg vibration, temperatur, energi og driftstimer, mens det sker, og se sliddet, før det ender i et nedbrud.",
          },
          {
            icon: MapPin,
            title: "Fejlfinding på afstand",
            description:
              "Find fejlen, før teknikeren kører, og mød op med de rigtige dele i bilen.",
          },
          {
            icon: FileText,
            title: "Servicerapporter",
            description:
              "Giv kunden servicerapporter med tal bag, og brug maskindata, når I skal sætte pris på serviceaftalerne.",
          },
        ],
        visualTitle: "Ét overblik over alle de maskiner, I servicerer",
        visualBody:
          "Hvordan maskinerne har det, hvad der er lavet på dem, og hvad der står for tur. For alle de maskiner, I har ude hos kunderne.",
        visualImage: "/images/report-mockrup-3.png",
        visualAlt: "Dashboard over maskinernes tilstand",
        metricsTitle: "Typiske resultater",
        metrics: [
          { metric: "50%", label: "Færre akutte udkald" },
          { metric: "40 timer", label: "Sparet på vedligehold pr. maskine om året" },
          { metric: "30%", label: "Mere omsætning på serviceaftaler" },
        ],
        stepsTitle: "Sådan virker det",
        steps: [
          {
            title: "Kobl på",
            description: "Sensorer og maskindata bliver samlet i ét serviceoverblik.",
          },
          {
            title: "Hold øje",
            description: "Alarmer og kurver viser, hvor teamet skal sætte ind.",
          },
          {
            title: "Forebyg",
            description:
              "Planlæg vedligeholdet efter, hvor meget maskinen har kørt, og løs det på afstand, når det kan lade sig gøre.",
          },
        ],
        darkHero: true,
      },
    },
  },
]

export const { slugs: solutionSlugs, get: getSolution } = buildLookup(solutions)
export { solutions }
