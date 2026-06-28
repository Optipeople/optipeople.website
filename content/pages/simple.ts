import type { SimplePage } from "@/content/shared/types"

type Locale = "en" | "da"

export const simplePages: Record<string, Record<Locale, SimplePage>> = {
  "/modules": {
    en: {
      metaTitle: "Modules",
      metaDescription:
        "Explore the OptiPeople modules — production, quality, maintenance, energy, analysis, IoT, ERP shopfloor, and MES — on one connected platform.",
      eyebrow: "Modules",
      headline: "One platform, every part of production",
      body: "Each module solves a specific operational need, and together they give you a single, connected view of the shopfloor.",
      links: [
        { title: "Production", href: "/modules/production", description: "Live OEE, downtime, orders, and shift performance." },
        { title: "Quality", href: "/modules/quality", description: "Digital checks, deviations, and full traceability." },
        { title: "Maintenance", href: "/modules/maintenance", description: "Preventive planning and mobile task management." },
        { title: "Energy", href: "/modules/energy", description: "Energy consumption connected to production output." },
        { title: "Analysis", href: "/modules/analysis", description: "Automated reports on performance, loss, and cost." },
        { title: "IoT", href: "/modules/iot", description: "Connect new and legacy machines, sensors, and protocols." },
        { title: "ERP Shopfloor", href: "/modules/erp-shopfloor", description: "Two-way sync between ERP planning and the floor." },
        { title: "MES", href: "/modules/mes", description: "A cloud-based Manufacturing Execution System." },
      ],
    },
    da: {
      metaTitle: "Moduler | OptiPeople",
      metaDescription:
        "Udforsk OptiPeople-modulerne — produktion, kvalitet, vedligehold, energi, analyse, IoT, ERP shopfloor og MES — på én forbundet platform.",
      eyebrow: "Moduler",
      headline: "Én platform til hele produktionen",
      body: "Hvert modul løser et konkret driftsbehov, og sammen giver de ét forbundet overblik over fabriksgulvet.",
      links: [
        { title: "Produktion", href: "/modules/production", description: "Live OEE, nedetid, ordrer og skiftperformance." },
        { title: "Kvalitet", href: "/modules/quality", description: "Digitale kontroller, afvigelser og fuld sporbarhed." },
        { title: "Vedligehold", href: "/modules/maintenance", description: "Forebyggende planlægning og mobil opgavestyring." },
        { title: "Energi", href: "/modules/energy", description: "Energiforbrug koblet til produktionens output." },
        { title: "Analyse", href: "/modules/analysis", description: "Automatiske rapporter om performance, tab og omkostninger." },
        { title: "IoT", href: "/modules/iot", description: "Forbind nye og gamle maskiner, sensorer og protokoller." },
        { title: "ERP Shopfloor", href: "/modules/erp-shopfloor", description: "Tovejssynk mellem ERP-planlægning og gulvet." },
        { title: "MES", href: "/modules/mes", description: "Et cloudbaseret Manufacturing Execution System." },
      ],
    },
  },
  "/features": {
    en: {
      metaTitle: "Features",
      metaDescription:
        "Explore OptiPeople features — from production efficiency and stop-cause registration to AI copilots and machine control.",
      eyebrow: "Features",
      headline: "From raw machine signals to real understanding",
      body: "Explore the capabilities that make production visible, measurable, and improvable — every day.",
      links: [
        { title: "Production efficiency", href: "/features/production-efficiency", description: "Track OEE live across shifts, lines, and machines." },
        { title: "Stop-cause registration", href: "/features/stop-cause-registration", description: "Capture downtime causes at the source, on the machine." },
        { title: "Maintenance & tasks", href: "/features/maintenance-and-tasks", description: "Plan preventive maintenance by usage and condition." },
        { title: "Quality management", href: "/features/quality-management", description: "Register quality data where the work happens." },
        { title: "Analysis & reporting", href: "/features/analysis-and-reporting", description: "Turn production data into clear reports." },
        { title: "Energy & telemetry", href: "/features/energy-and-telemetry", description: "Connect energy, vibration, flow, and temperature data." },
        { title: "AI & copilots", href: "/features/ai-and-copilots", description: "Ask questions and find patterns in your own data." },
        { title: "Machine control", href: "/features/machine-control", description: "Integrate with machine controls for tighter loops." },
      ],
    },
    da: {
      metaTitle: "Funktioner | OptiPeople",
      metaDescription:
        "Udforsk OptiPeople-funktioner — fra produktionseffektivitet og stopårsagsregistrering til AI-copilots og maskinstyring.",
      eyebrow: "Funktioner",
      headline: "Fra rå maskinsignaler til reel forståelse",
      body: "Udforsk de funktioner, der gør produktionen synlig, målbar og mulig at forbedre — hver dag.",
      links: [
        { title: "Produktionseffektivitet", href: "/features/production-efficiency", description: "Følg OEE live på tværs af skift, linjer og maskiner." },
        { title: "Stopårsagsregistrering", href: "/features/stop-cause-registration", description: "Opsaml nedetidsårsager ved kilden, på maskinen." },
        { title: "Vedligehold og opgaver", href: "/features/maintenance-and-tasks", description: "Planlæg forebyggende vedligehold efter brug og tilstand." },
        { title: "Kvalitetsstyring", href: "/features/quality-management", description: "Registrer kvalitetsdata dér hvor arbejdet sker." },
        { title: "Analyse og rapportering", href: "/features/analysis-and-reporting", description: "Gør produktionsdata til klare rapporter." },
        { title: "Energi og telemetri", href: "/features/energy-and-telemetry", description: "Kobl energi-, vibrations-, flow- og temperaturdata sammen." },
        { title: "AI og copilots", href: "/features/ai-and-copilots", description: "Stil spørgsmål og find mønstre i jeres egne data." },
        { title: "Maskinstyring", href: "/features/machine-control", description: "Integrer med maskinstyringer for tættere loops." },
      ],
    },
  },
  "/services": {
    en: {
      metaTitle: "Services",
      metaDescription:
        "Explore OptiPeople services for smart operations, industrial automation, business intelligence, and AI solutions in manufacturing.",
      eyebrow: "Services",
      headline: "Services that move operations from idea to result",
      body: "From strategy to implementation, we help manufacturers connect machines, build the data foundation, automate processes, and make insight usable in everyday work.",
      links: [
        { title: "Smart Operations", href: "/services/smart-operations", description: "Real-time data, OEE, dashboards, and shopfloor visibility that turn machine signals into better decisions." },
        { title: "Automation", href: "/services/automation", description: "PLC, HMI, SCADA, and machine control engineering built to run reliably in production." },
        { title: "Business Intelligence", href: "/services/business-intelligence", description: "Power BI dashboards, data models, and automated reporting that bring scattered data into one view." },
        { title: "AI Agentic Solutions", href: "/services/ai-solutions", description: "AI agents and copilots that work close to your operations and your production data." },
      ],
    },
    da: {
      metaTitle: "Services",
      metaDescription:
        "Fra strategi til implementering leverer OptiPeople løsninger til smart operations, automation, BI og AI.",
      eyebrow: "Services",
      headline: "Services der flytter drift fra idé til resultat",
      body: "Vi hjælper produktionsvirksomheder med at forbinde maskiner, bygge datagrundlag, automatisere processer og gøre indsigter brugbare i hverdagen.",
      links: [
        { title: "Smart Operations", href: "/services/smart-operations", description: "Realtidsdata, OEE, dashboards og driftsforbedringer." },
        { title: "Automation", href: "/services/automation", description: "PLC, HMI, SCADA og maskinstyring bygget til produktion." },
        { title: "Business Intelligence", href: "/services/business-intelligence", description: "Power BI, datamodeller og automatiseret rapportering." },
        { title: "AI-agentløsninger", href: "/services/ai-solutions", description: "AI-agenter og copilots tæt på jeres drift og data." },
      ],
    },
  },
  "/solutions": {
    en: {
      metaTitle: "Solutions",
      metaDescription:
        "OptiPeople solutions for manufacturers, OEMs and machine builders, and service and aftermarket teams.",
      eyebrow: "Solutions",
      headline: "Built for how you make and service products",
      body: "Whether you run a factory, build machines, or service an installed base, OptiPeople gives you the operational data to act faster.",
      links: [
        { title: "For manufacturers", href: "/solutions/manufacturing", description: "Know your factory in real time with connected machines, OEE, quality, energy, and maintenance." },
        { title: "For OEMs & machine builders", href: "/solutions/oems", description: "Turn machines into connected platforms with remote diagnostics and digital service revenue." },
        { title: "For service & aftermarket", href: "/solutions/service", description: "Give service teams visibility into machine health and solve issues before customers notice." },
      ],
    },
    da: {
      metaTitle: "Løsninger | OptiPeople",
      metaDescription:
        "OptiPeople-løsninger til produktionsvirksomheder, OEM'er og maskinbyggere samt service og aftermarket.",
      eyebrow: "Løsninger",
      headline: "Bygget til hvordan I producerer og servicerer",
      body: "Uanset om I driver en fabrik, bygger maskiner eller servicerer en installeret base, giver OptiPeople jer driftsdata til at handle hurtigere.",
      links: [
        { title: "Til produktionsvirksomheder", href: "/solutions/manufacturing", description: "Kend din fabrik i realtid med forbundne maskiner, OEE, kvalitet, energi og vedligehold." },
        { title: "Til OEM'er og maskinbyggere", href: "/solutions/oems", description: "Gør maskiner til forbundne platforme med fjerndiagnostik og digitale serviceindtægter." },
        { title: "Til service og aftermarket", href: "/solutions/service", description: "Giv serviceholdet indblik i maskinsundhed og løs problemer før kunden mærker dem." },
      ],
    },
  },
  "/get-help": {
    en: {
      metaTitle: "Get Help",
      metaDescription:
        "Find support options, documentation, and contact details for OptiPeople and Opticloud.",
      eyebrow: "Get Help",
      headline: "How can we help?",
      body: "Find answers, explore documentation, or get in touch with our team.",
      links: [
        { title: "Email support", href: "mailto:hej@optipeople.dk", description: "Write to us directly for technical issues or questions about your setup." },
        { title: "Contact the team", href: "/contact", description: "Tell us what you need and we'll get back to you with the next step." },
        { title: "Meet the people", href: "/resources/people", description: "See who works with sales, projects, and technology at OptiPeople." },
      ],
    },
    da: {
      metaTitle: "Få hjælp | OptiPeople",
      metaDescription: "Find hjælp til Opticloud eller kontakt OptiPeople support.",
      eyebrow: "Få hjælp",
      headline: "Vi hjælper jer videre",
      body: "Har du brug for support, sparring eller hjælp til at finde den rigtige løsning? Kontakt os, så finder vi næste skridt sammen.",
      links: [
        { title: "Skriv til support", href: "mailto:hej@optipeople.dk", description: "Send en mail til hej@optipeople.dk." },
        { title: "Kontakt teamet", href: "/contact", description: "Fortæl os hvad du har brug for, så vender vi tilbage." },
        { title: "Mød teamet", href: "/resources/people", description: "Se hvem der arbejder med salg, projekter og teknologi." },
      ],
    },
  },
}

export function getSimplePage(path: string, locale: Locale): SimplePage | undefined {
  return simplePages[path]?.[locale]
}
