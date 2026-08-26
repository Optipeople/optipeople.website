import { moduleIndexLinks } from "@/content/modules-catalog"
import type { SimplePage } from "@/content/shared/types"

type Locale = "en" | "da"

export const simplePages: Record<string, Record<Locale, SimplePage>> = {
  "/modules": {
    en: {
      metaTitle: "Modules",
      metaDescription:
        "Explore the OptiPeople modules on one connected platform: modular MES, OEE, QMS, EMS, maintenance, planning, orders, IoT, documents, analysis, and AI agents.",
      eyebrow: "Modules",
      headline: "One platform, every part of production",
      body: "Each module solves a specific operational need, and together they give you a single, connected view of the shopfloor. You do not have to take all of them at once. Most factories start with production monitoring on one line, then add the modules that answer the next question.",
      linksTitle: "Explore the modules",
      sections: [
        {
          title: "Built on one data foundation",
          body: "The modules are not separate products stitched together. They read from the same machine signals, the same order data, and the same time model, so a stop registered on the floor shows up in the OEE figure, the maintenance history, and the monthly report without anyone re-entering it.",
        },
        {
          title: "Start where the pain is",
          body: "There is no required order. If downtime is the problem, start with production and stop-cause registration. If unplanned breakdowns are the problem, start with maintenance. If energy cost is under scrutiny, start there. Each module is useful on its own and gets more useful next to the others.",
        },
        {
          title: "Old machines included",
          body: "Connecting a factory rarely means connecting only new equipment. Opticloud reads modern controls over standard industrial protocols, and for older machines without a usable interface, sensors measure the signals directly. Age is not what decides whether a machine can be measured.",
        },
        {
          title: "Data you can take with you",
          body: "Everything the platform collects is available through the API and can be published over MQTT, so your production data can feed Power BI, a data warehouse, or your own systems. The platform is a place your data works, not a place it gets locked in.",
        },
      ],
      links: moduleIndexLinks("en"),
    },
    da: {
      metaTitle: "Moduler | OptiPeople",
      metaDescription:
        "Udforsk OptiPeople-modulerne på én forbundet platform: modulært MES, OEE, QMS, EMS, vedligehold, planlægning, ordrer, IoT, dokumenter, analyse og AI-agenter.",
      eyebrow: "Moduler",
      headline: "Én platform til hele produktionen",
      body: "Hvert modul løser et konkret driftsbehov, og sammen giver de ét forbundet overblik over fabriksgulvet. I behøver ikke tage dem alle på én gang, de fleste starter med produktionsovervågning på én linje og tilføjer så de moduler, der svarer på det næste spørgsmål.",
      linksTitle: "Udforsk modulerne",
      sections: [
        {
          title: "Bygget på ét datagrundlag",
          body: "Modulerne er ikke separate produkter, der er syet sammen. De læser fra de samme maskinsignaler, de samme ordredata og den samme tidsmodel. Et stop, der registreres på gulvet, slår derfor igennem i OEE-tallet, i vedligeholdshistorikken og i månedsrapporten, uden at nogen taster det ind igen.",
        },
        {
          title: "Start dér hvor det gør ondt",
          body: "Der er ingen fast rækkefølge. Er nedetid problemet, så start med produktion og stopårsagsregistrering. Er det uplanlagte nedbrud, så start med vedligehold. Er energiforbruget under lup, så start dér. Hvert modul giver værdi alene, og mere værdi sammen med de andre.",
        },
        {
          title: "Også de gamle maskiner",
          body: "At forbinde en fabrik handler sjældent kun om nyt udstyr. Opticloud læser moderne styringer over gængse industrielle protokoller, og på ældre maskiner uden brugbar grænseflade måler sensorer signalerne direkte. Alder afgør ikke, om en maskine kan måles.",
        },
        {
          title: "Data I kan tage med jer",
          body: "Alt, hvad platformen opsamler, er tilgængeligt via API'et og kan publiceres over MQTT. Jeres produktionsdata kan derfor fodre Power BI, et datawarehouse eller jeres egne systemer. Platformen er et sted, hvor jeres data arbejder, ikke et sted, hvor de bliver låst inde.",
        },
      ],
      links: moduleIndexLinks("da"),
    },
  },
  "/features": {
    en: {
      metaTitle: "Features",
      metaDescription:
        "Explore OptiPeople features, from production efficiency and stop-cause registration to AI copilots and machine control.",
      eyebrow: "Features",
      headline: "From raw machine signals to real understanding",
      body: "Explore the capabilities that make production visible, measurable, and improvable, every day. Each one starts from something a machine or an operator actually records, and ends in a number someone can act on.",
      linksTitle: "Explore the features",
      sections: [
        {
          title: "Measured, not estimated",
          body: "A machine either ran or it did not, and the signal says which. Opticloud builds its numbers from what equipment reports and what operators register at the machine, so the OEE figure in a Monday meeting traces back to specific minutes on a specific line rather than to someone's recollection of the week.",
        },
        {
          title: "Registered where the work happens",
          body: "Stop causes, quality checks, and maintenance tasks are captured at the machine, on a panel or a phone, in the seconds after they happen. Data collected at the source is data people trust, and it does not depend on anyone remembering to fill in a spreadsheet at the end of a shift.",
        },
        {
          title: "The same numbers for everyone",
          body: "Operators, supervisors, and management look at the same underlying data, cut differently. That removes the familiar argument about whose figures are right and moves the conversation to what to do about them.",
        },
        {
          title: "Useful on day one, better over time",
          body: "A connected line tells you something immediately: how much it ran, when it stopped, how long the changeovers took. As history builds, the same data supports patterns: recurring stop causes, machines drifting off pace, energy per unit creeping up.",
        },
      ],
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
        "Udforsk OptiPeople-funktioner, fra produktionseffektivitet og stopårsagsregistrering til AI-copilots og maskinstyring.",
      eyebrow: "Funktioner",
      headline: "Fra rå maskinsignaler til reel forståelse",
      body: "Udforsk de funktioner, der gør produktionen synlig, målbar og mulig at forbedre, hver dag. Hver enkelt tager udgangspunkt i noget, en maskine eller en operatør rent faktisk registrerer, og ender i et tal, nogen kan handle på.",
      linksTitle: "Udforsk funktionerne",
      sections: [
        {
          title: "Målt, ikke skønnet",
          body: "En maskine kørte enten eller også gjorde den ikke, og signalet siger hvad. Opticloud bygger sine tal på det, udstyret rapporterer, og det operatørerne registrerer ved maskinen. OEE-tallet på mandagsmødet kan derfor føres tilbage til konkrete minutter på en konkret linje, ikke til nogens erindring om ugen.",
        },
        {
          title: "Registreret dér hvor arbejdet sker",
          body: "Stopårsager, kvalitetskontroller og vedligeholdsopgaver bliver registreret ved maskinen, på en panel eller en telefon, i sekunderne efter de sker. Data opsamlet ved kilden er data, folk stoler på, og det afhænger ikke af, at nogen husker at udfylde et regneark ved vagtens slutning.",
        },
        {
          title: "De samme tal for alle",
          body: "Operatører, ledere og direktion ser de samme underliggende data, blot skåret forskelligt. Det fjerner den velkendte diskussion om, hvis tal der er de rigtige, og flytter samtalen hen på, hvad man så gør ved dem.",
        },
        {
          title: "Nyttigt fra dag ét, bedre med tiden",
          body: "En forbundet linje fortæller jer noget med det samme: hvor meget den kørte, hvornår den stoppede, hvor lang tid omstillingerne tog. Efterhånden som historikken vokser, understøtter de samme data mønstre: gentagne stopårsager, maskiner der sakker bagud, energi pr. enhed der kryber opad.",
        },
      ],
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
      body: "From strategy to implementation, we help manufacturers connect machines, build the data foundation, automate processes, and make insight usable in everyday work. We are engineers as well as a software company, which means we can take responsibility for the parts of a project that touch real equipment.",
      linksTitle: "What we do",
      sections: [
        {
          title: "Software and engineering in the same team",
          body: "Connecting a factory is rarely only a software task. It involves controls, cabinets, sensors, and the realities of equipment that cannot simply be stopped for a week. Because we do both the platform and the automation engineering, the handover between the two does not become your problem.",
        },
        {
          title: "We start with what you already have",
          body: "Most manufacturers already own more data than they use, in the ERP, in the controls, in a decade of spreadsheets. A project usually starts by finding out what is already there and what is genuinely missing, rather than by replacing systems that work.",
        },
        {
          title: "Scoped to a first result",
          body: "We would rather prove something on one line than write a two-year roadmap. A first phase is typically a defined set of machines, a defined set of measurements, and a date by which you should be able to see whether it was worth it.",
        },
        {
          title: "It has to survive the handover",
          body: "A solution only counts if it still runs once we are not there every week. That means the people who use it are involved in building it, the setup is documented, and your own team can maintain and extend what has been put in place.",
        },
      ],
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
      body: "Vi hjælper produktionsvirksomheder med at forbinde maskiner, bygge datagrundlag, automatisere processer og gøre indsigter brugbare i hverdagen. Vi er ingeniører såvel som softwarehus, og derfor kan vi tage ansvar for de dele af et projekt, der rører ved rigtigt udstyr.",
      linksTitle: "Det laver vi",
      sections: [
        {
          title: "Software og ingeniørarbejde i samme team",
          body: "At forbinde en fabrik er sjældent en ren softwareopgave. Det involverer styringer, tavler, sensorer og virkeligheden omkring udstyr, der ikke bare kan stå stille en uge. Fordi vi både laver platformen og automationsarbejdet, bliver overleveringen mellem de to ikke jeres problem.",
        },
        {
          title: "Vi starter med det, I allerede har",
          body: "De fleste produktionsvirksomheder ejer flere data, end de bruger, i ERP'et, i styringerne, i ti års regneark. Et projekt starter typisk med at finde ud af, hvad der allerede findes, og hvad der reelt mangler, frem for at udskifte systemer, der fungerer.",
        },
        {
          title: "Skåret til et første resultat",
          body: "Vi beviser hellere noget på én linje end at skrive en toårig køreplan. En første fase er typisk et afgrænset sæt maskiner, et afgrænset sæt målinger og en dato, hvor I bør kunne se, om det var indsatsen værd.",
        },
        {
          title: "Det skal overleve overleveringen",
          body: "En løsning tæller først, når den stadig kører, uden at vi er der hver uge. Det betyder, at de mennesker, der skal bruge den, er med til at bygge den, at opsætningen er dokumenteret, og at jeres eget team kan vedligeholde og udvide det, der er sat op.",
        },
      ],
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
      body: "Whether you run a factory, build machines, or service an installed base, OptiPeople gives you the operational data to act faster. The platform is the same in all three cases, what changes is whose machines you are watching and what you need to decide.",
      linksTitle: "Find your starting point",
      sections: [
        {
          title: "The same question from three sides",
          body: "A production manager asks why the line lost four hours last week. An OEM asks how its machines are performing at customer sites. A service team asks which machine will fail first. All three are the same question about machine data, asked by people with different jobs.",
        },
        {
          title: "Machines you own, machines you shipped",
          body: "If you both manufacture and sell equipment, you do not need two systems. The same platform can cover your own production and the installed base at your customers, with each customer seeing only their own data.",
        },
        {
          title: "From reporting to service revenue",
          body: "For machine builders, connected equipment changes what you can sell. Uptime commitments, condition-based service agreements, and remote diagnostics all depend on knowing how the machine is actually running, which is a data problem before it is a commercial one.",
        },
        {
          title: "Not sure which one you are?",
          body: "Plenty of companies are more than one of these. If the boundaries are unclear, start from the problem you want solved rather than the category, and we can work out from there which parts of the platform matter first.",
        },
      ],
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
      body: "Uanset om I driver en fabrik, bygger maskiner eller servicerer en installeret base, giver OptiPeople jer driftsdata til at handle hurtigere. Platformen er den samme i alle tre tilfælde, det, der ændrer sig, er, hvis maskiner I kigger på, og hvad I skal beslutte.",
      linksTitle: "Find jeres udgangspunkt",
      sections: [
        {
          title: "Det samme spørgsmål fra tre sider",
          body: "En produktionschef spørger, hvorfor linjen tabte fire timer i sidste uge. En OEM spørger, hvordan deres maskiner præsterer ude hos kunderne. Et serviceteam spørger, hvilken maskine der bryder ned først. Alle tre er det samme spørgsmål om maskindata, stillet af folk med forskellige job.",
        },
        {
          title: "Maskiner I ejer, maskiner I har leveret",
          body: "Producerer I både selv og sælger udstyr, behøver I ikke to systemer. Den samme platform kan dække jeres egen produktion og den installerede base hos jeres kunder, hvor hver kunde kun ser sine egne data.",
        },
        {
          title: "Fra rapportering til serviceindtægter",
          body: "For maskinbyggere ændrer forbundet udstyr, hvad I kan sælge. Oppetidsgarantier, tilstandsbaserede serviceaftaler og fjerndiagnostik hviler alle på at vide, hvordan maskinen faktisk kører, og det er et dataspørgsmål, før det er et kommercielt.",
        },
        {
          title: "I tvivl om, hvad I er?",
          body: "Mange virksomheder er mere end én af delene. Er grænserne uklare, så tag udgangspunkt i det problem, I gerne vil have løst, frem for kategorien, så finder vi ud af, hvilke dele af platformen der betyder mest først.",
        },
      ],
      links: [
        { title: "Til produktionsvirksomheder", href: "/solutions/manufacturing", description: "Kend din fabrik i realtid med forbundne maskiner, OEE, kvalitet, energi og vedligehold." },
        { title: "Til OEM'er og maskinbyggere", href: "/solutions/oems", description: "Gør maskiner til forbundne platforme med fjerndiagnostik og digitale serviceindtægter." },
        { title: "Til service og aftermarket", href: "/solutions/service", description: "Giv serviceholdet indblik i maskinsundhed og løs problemer før kunden mærker dem." },
      ],
    },
  },
}

export function getSimplePage(path: string, locale: Locale): SimplePage | undefined {
  return simplePages[path]?.[locale]
}
