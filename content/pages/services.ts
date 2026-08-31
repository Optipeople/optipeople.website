import {
  BarChart3,
  Bot,
  BrainCircuit,
  CalendarClock,
  Cpu,
  FileBarChart,
  PieChart,
  ScanLine,
  Search,
  ShieldCheck,
  Users,
  Workflow,
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
        metaTitle: "Smart Operations Advisory",
        metaDescription:
          "Smart factory and smart operations advisory: process mapping, technical assessments, business cases, and pre-projects that decide what to build before anything is built.",
        eyebrow: "Smart Operations",
        heroTitle: "Decide What to Build Before You Build It",
        heroBody:
          "We advise on smart factory and smart operations: mapping the processes, assessing what the site can technically support, and writing the business case that says whether it is worth doing at all.",
        primaryLabel: "Book an Advisory Session",
        introTitle: "Most digitalisation projects fail in the scoping, not the software",
        introBody:
          "The pattern is familiar. A platform gets bought, three integrations get built, dashboards go up, and eighteen months later nobody uses them, because nobody mapped which decisions were actually being made and what they needed to be made well. Advisory work is the cheap part of the project and it decides the expensive part. We walk the processes, look at what the equipment and the systems can genuinely deliver, quantify the loss that is worth attacking, and put a scope and a business case in front of you. Sometimes the answer is a pre-project. Sometimes it is that the money belongs somewhere else this year.",
        capabilitiesTitle: "What the advisory work covers",
        features: [
          {
            icon: Workflow,
            title: "Process Mapping",
            description:
              "We walk the flow with the people who run it: what actually happens between order and pallet, where the handovers are, which registrations exist, and which decisions are being made on a feeling because the number is not there.",
          },
          {
            icon: Search,
            title: "Technical Assessments",
            description:
              "What can this site actually deliver? Controls, protocols, network, existing sensors and systems, and what each machine can be measured on without a rebuild. The honest version, including the machines that will need hardware.",
          },
          {
            icon: FileBarChart,
            title: "Business Cases",
            description:
              "The loss quantified, the intervention costed, and a payback period you can take to a board. Written so the numbers can be argued with, rather than a vendor slide with a percentage on it.",
          },
          {
            icon: ScanLine,
            title: "Pre-Projects",
            description:
              "A bounded first step on one line or one machine, with a defined question it exists to answer. Cheap enough to be wrong, real enough to prove whether the full scope is worth committing to.",
          },
          {
            icon: PieChart,
            title: "KPI and Target Design",
            description:
              "Which numbers this organisation should be run on, how they are defined, who owns each one, and what happens in the daily meeting when one of them moves. Measurement nobody trusts changes nothing.",
          },
          {
            icon: Users,
            title: "Roadmap and Ways of Working",
            description:
              "The order to do things in, and how the new numbers land in the shift handover, the board meeting, and the improvement work. This is usually the difference between a project and a habit.",
          },
        ],
        visualTitle: "Advisory ends in something you can decide on",
        visualBody:
          "A mapped process, an assessment of what the site supports, a costed business case, and a scoped first step. If it goes ahead, this is the picture the build is aimed at.",
        visualImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
        visualAlt: "OptiPeople efficiency report with availability, performance and OEE against target",
        metricsTitle: "What to Expect",
        metrics: [
          { metric: "2-4 weeks", label: "From first walk-through to a costed scope" },
          { metric: "1 line", label: "Is usually the right size for a pre-project" },
          { metric: "0", label: "Obligation to buy anything at the end of it" },
        ],
        stepsTitle: "How We Work",
        steps: [
          {
            title: "Map",
            description:
              "We walk the processes with the people who run them, and write down the flow, the registrations that exist, and the decisions being made without data.",
          },
          {
            title: "Assess and quantify",
            description:
              "What the equipment and systems can technically support, and what the loss is worth. This is where a business case either holds up or does not.",
          },
          {
            title: "Scope",
            description:
              "A prioritised roadmap and a bounded first step, whether that is a pre-project with us, a project with a partner, or nothing this year.",
          },
        ],
      },
      da: {
        metaTitle: "Smart Operations rådgivning | OptiPeople",
        metaDescription:
          "Rådgivning om smart factory og smart operations: proceskortlægning, tekniske vurderinger, business cases og forprojekter.",
        eyebrow: "Smart Operations",
        heroTitle: "Find ud af hvad der skal bygges, før I bygger det",
        heroBody:
          "Vi rådgiver om smart factory og smart operations: vi kortlægger processerne, vurderer hvad fabrikken teknisk kan bære, og regner business casen igennem, før der bliver bygget noget.",
        primaryLabel: "Book en snak",
        introTitle: "De fleste digitaliseringsprojekter går galt i afklaringen, ikke i softwaren",
        introBody:
          "Mønstret er til at genkende. Der bliver købt en platform, bygget tre integrationer og hængt skærme op, og halvandet år efter er der ingen, der bruger dem. For ingen fik skrevet ned, hvilke beslutninger der egentlig bliver truffet i hverdagen, og hvad de kræver. Rådgivningen er den billige del af projektet, og den afgør den dyre del. Vi går processerne igennem, ser på hvad udstyret og systemerne reelt kan levere, sætter tal på det tab, der er værd at gå efter, og lægger et omfang og en business case på bordet. Nogle gange er svaret et forprojekt. Nogle gange er svaret, at pengene skal bruges et andet sted i år.",
        capabilitiesTitle: "Det rådgiver vi om",
        features: [
          {
            icon: Workflow,
            title: "Procéskortlægning",
            description:
              "Vi går flowet igennem med dem, der kører det: hvad der faktisk sker fra ordre til palle, hvor overleveringerne er, og hvilke beslutninger der bliver truffet på en fornemmelse.",
          },
          {
            icon: Search,
            title: "Teknisk vurdering",
            description:
              "Hvad kan fabrikken reelt levere? Styringer, protokoller, netværk, de sensorer og systemer der er, og hvad hver maskine kan måles på uden en ombygning.",
          },
          {
            icon: FileBarChart,
            title: "Business case",
            description:
              "Tabet sat i tal, indsatsen prissat, og en tilbagebetalingstid, I kan tage med til bestyrelsen. Skrevet så tallene kan diskuteres.",
          },
          {
            icon: ScanLine,
            title: "Forprojekt",
            description:
              "Et afgrænset første skridt på én linje eller én maskine, med et klart spørgsmål det skal svare på. Billigt nok til at måtte gå galt, rigtigt nok til at vise, om resten er værd at binde sig til.",
          },
        ],
        visualTitle: "Rådgivningen ender i noget, I kan beslutte ud fra",
        visualBody:
          "En kortlagt proces, en vurdering af hvad fabrikken kan bære, en business case med tal på, og et afgrænset første skridt. Går det videre, er det her billedet, byggeriet sigter efter.",
        visualImage: "/images/Mockups/Report-OEE-Efficiency-With-Filter.png",
        visualAlt: "OptiPeople efficiency report with availability, performance and OEE against target",
        metricsTitle: "Hvad I kan forvente",
        metrics: [
          { metric: "2-4 uger", label: "Fra første gennemgang til et prissat omfang" },
          { metric: "1 linje", label: "Er som regel den rigtige størrelse til et forprojekt" },
          { metric: "0", label: "Krav om at købe noget bagefter" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Kortlæg",
            description:
              "Vi går processerne igennem med dem, der kører dem, og skriver flowet, registreringerne og de beslutninger ned, der bliver truffet uden tal.",
          },
          {
            title: "Vurdér og sæt tal på",
            description:
              "Hvad udstyret og systemerne teknisk kan bære, og hvad tabet er værd. Det er her, en business case holder eller ikke holder.",
          },
          {
            title: "Læg omfanget",
            description:
              "En prioriteret rækkefølge og et afgrænset første skridt, om det så er et forprojekt med os, et projekt med en partner, eller ingenting i år.",
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
        metaTitle: "Automation Advisory and Architecture",
        metaDescription:
          "Automation advisory and the IT, software and IoT architecture around it. We scope and specify, and deliver the full solution together with automation partners.",
        eyebrow: "Automation",
        heroTitle: "We Are Not an Automation House. We Are the Layer Around One",
        heroBody:
          "We advise on automation and we deliver whole solutions together with partners who build the mechanics and the control cabinets. Our part is the IT, software, and IoT architecture that decides whether the result is a connected line or an island.",
        primaryLabel: "Discuss Your Project",
        introTitle: "The machine is rarely what goes wrong. The layer around it is",
        introBody:
          "Automation houses are good at what they do, and we do not compete with them: we do not design machines, write the motion control, or build panels. What repeatedly goes wrong sits one level up. The line gets commissioned and then nobody specified how it reports, which signals leave the PLC, who owns the data model, how it reaches the ERP, or what happens when a second supplier's machine joins the same line. That is our scope. We specify it up front, sit on your side of the table while the automation partner builds, and make sure the finished cell is readable by the rest of the operation.",
        capabilitiesTitle: "Where we sit in an automation project",
        features: [
          {
            icon: Search,
            title: "Automation Advisory",
            description:
              "Whether to automate this step at all, what it is worth, and what has to be true first. Often the honest answer is that the process needs fixing before a robot is pointed at it.",
          },
          {
            icon: Workflow,
            title: "Requirements and Specification",
            description:
              "We write the spec the automation partner quotes against, including the data and integration requirements that otherwise surface after commissioning as a change order.",
          },
          {
            icon: Cpu,
            title: "IT, Software and IoT Architecture",
            description:
              "Which signals leave the control system, in what structure, over which protocol, into which system, and who owns each layer. This is the part we deliver ourselves.",
          },
          {
            icon: Users,
            title: "Partner Selection and Delivery",
            description:
              "We bring in machine builders, integrators, and electrical partners we have worked with, and we stay on your side of the table through build, commissioning, and handover.",
          },
          {
            icon: ScanLine,
            title: "Connecting the New Cell",
            description:
              "A commissioned line that reports nothing is half a project. States, counters, and alarms come out of the new equipment and into the same structure as the rest of the site.",
          },
          {
            icon: ShieldCheck,
            title: "Documentation and Ownership",
            description:
              "Interfaces, data models, and access documented so your own team, or the next supplier, can work on it without reverse-engineering somebody's cabinet.",
          },
        ],
        visualTitle: "The layer we own, drawn out",
        visualBody:
          "The mechanics and the cabinet belong to the automation partner. Everything from the signal leaving the control system to the number reaching a person is the part we specify and deliver.",
        visualSection: "architecture",
        metricsTitle: "Our Scope",
        metrics: [
          { metric: "0", label: "Machines designed by us. That is the partner's job" },
          { metric: "1 spec", label: "Written before anyone quotes the build" },
          { metric: "Your side", label: "Of the table, through build and handover" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Advise and scope",
            description:
              "What is worth automating, what it requires, and how the result has to fit the systems and the data you already have. Written down as a specification.",
          },
          {
            title: "Deliver with partners",
            description:
              "Machine builders and electrical partners build their part against that specification. We deliver the software, integration, and IoT layer, and hold the whole thing together.",
          },
          {
            title: "Connect and hand over",
            description:
              "The new equipment reports into the same data foundation as the rest of the site, documented so your team owns it afterwards.",
          },
        ],
      },
      da: {
        metaTitle: "Automationsrådgivning og arkitektur | OptiPeople",
        metaDescription:
          "Vi rådgiver om automation og leverer IT-, software- og IoT-arkitekturen omkring den. Hele løsningen leverer vi sammen med automationspartnere.",
        eyebrow: "Automation",
        heroTitle: "Vi er ikke et automationshus. Vi er laget omkring et",
        heroBody:
          "Vi rådgiver om automation og leverer hele løsningen sammen med partnere, der bygger mekanikken og tavlerne. Vores del er den IT-, software- og IoT-arkitektur, der afgør, om resultatet bliver en linje, der hænger sammen med resten, eller en ø.",
        primaryLabel: "Tal om projektet",
        introTitle: "Det er sjældent maskinen, der går galt. Det er laget omkring den",
        introBody:
          "Automationshusene er gode til det, de laver, og vi konkurrerer ikke med dem. Vi tegner ikke maskiner, skriver ikke bevægelsesstyringen og bygger ikke tavler. Det, der gang på gang går galt, ligger et niveau højere op. Linjen bliver sat i drift, og så er der ingen, der har taget stilling til, hvordan den melder tilbage, hvilke signaler der kommer ud af PLC'en, hvem der ejer datamodellen, hvordan det når ERP, eller hvad der sker, når en maskine fra en anden leverandør kommer ind på samme linje. Det er vores felt. Vi skriver det ned på forhånd, sidder på jeres side af bordet, mens automationspartneren bygger, og sørger for, at den færdige celle kan læses af resten af driften.",
        capabilitiesTitle: "Der sidder vi i et automationsprojekt",
        features: [
          {
            icon: Search,
            title: "Rådgivning om automation",
            description:
              "Om det her trin i det hele taget skal automatiseres, hvad det er værd, og hvad der skal være på plads først. Ofte skal processen rettes, før der bliver peget en robot på den.",
          },
          {
            icon: Cpu,
            title: "IT-, software- og IoT-arkitektur",
            description:
              "Hvilke signaler der kommer ud af styringen, i hvilken struktur, over hvilken protokol, ind i hvilket system, og hvem der ejer hvert lag. Det er den del, vi selv leverer.",
          },
          {
            icon: Users,
            title: "Partnere og leverance",
            description:
              "Vi tager maskinbyggere, integratorer og el-partnere med ind, og bliver på jeres side af bordet gennem byg, opstart og overdragelse.",
          },
          {
            icon: ScanLine,
            title: "Den nye celle koblet på",
            description:
              "En linje, der er sat i drift uden at melde noget, er et halvt projekt. Status, tællere og alarmer kommer ud i samme struktur som resten af fabrikken.",
          },
        ],
        visualTitle: "Det lag, vi ejer, tegnet op",
        visualBody:
          "Mekanikken og tavlen hører til automationspartneren. Alt fra signalet forlader styringen, til tallet står foran et menneske, er den del, vi specificerer og leverer.",
        visualSection: "architecture",
        metricsTitle: "Vores del af opgaven",
        metrics: [
          { metric: "0", label: "Maskiner tegnet af os. Det er partnerens arbejde" },
          { metric: "1 kravspec", label: "Skrevet før nogen giver pris på byggeriet" },
          { metric: "Jeres side", label: "Af bordet, gennem byg og overdragelse" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Rådgiv og afklar",
            description:
              "Hvad der er værd at automatisere, hvad det kræver, og hvordan resultatet skal passe ind i de systemer og data, I allerede har. Skrevet ned som en kravspecifikation.",
          },
          {
            title: "Levér med partnere",
            description:
              "Maskinbyggere og el-partnere bygger deres del efter den specifikation. Vi leverer software, integration og IoT-laget og holder sammen på det hele.",
          },
          {
            title: "Kobl på og overdrag",
            description:
              "Det nye udstyr melder ind i det samme datagrundlag som resten af fabrikken, dokumenteret så jeres eget team ejer det bagefter.",
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
        metaTitle: "Business Intelligence Advisory",
        metaDescription:
          "BI advisory and scoping for manufacturing: which decisions need which numbers, what the data can support, and which platform to build it on. Power BI, Tableau, or something else.",
        eyebrow: "Business Intelligence",
        heroTitle: "The Hard Part Is Deciding What to Report",
        heroBody:
          "We work with BI teams as advisors first: which decisions need which numbers, what your data can honestly support, and what to scope. The platform question comes after that, and the answer is not always Power BI.",
        primaryLabel: "Get in Touch",
        introTitle: "A dashboard is an answer. Somebody has to get the question right first",
        introBody:
          "Most BI work we are called into does not fail on the technical side. The measures are correct, the refresh runs, and the report is beautiful, and it still goes unused, because the number on it was not the one the meeting turns on, or three teams define it differently, or nobody agreed who acts when it moves. So we start with advisory and scoping: the decisions, the definitions, the owners, and what the underlying data can actually carry. Then we build, on the platform that fits. We do a lot of Power BI because a lot of our clients are on Microsoft, but Tableau, Fabric, or your existing warehouse stack are all fine answers if that is where the organisation already is.",
        capabilitiesTitle: "Advisory first, build second",
        features: [
          {
            icon: Search,
            title: "Decision and Requirement Mapping",
            description:
              "Which decisions are made in which meetings, on what evidence, and how often they are made without it. Everything else follows from getting this list right.",
          },
          {
            icon: PieChart,
            title: "KPI Definition and Ownership",
            description:
              "One definition per number, written down, with an owner and a stated action when it moves. Three departments quietly computing OEE differently is a scoping problem, not a reporting problem.",
          },
          {
            icon: Search,
            title: "Data Readiness Assessment",
            description:
              "What your sources can honestly support today, where the gaps are, and which questions cannot yet be answered at all. Better to know before the first sprint than during the first review.",
          },
          {
            icon: Workflow,
            title: "Platform and Tooling Choice",
            description:
              "Power BI, Tableau, Fabric, or the warehouse and tooling you already run. We recommend against your existing stack, licences, and in-house skills rather than against our own preference.",
          },
          {
            icon: BarChart3,
            title: "Build and Data Modelling",
            description:
              "Then the delivery: semantic models, reports, and pipelines built on the scope above, with scheduled refreshes and error handling that does not need a person watching it.",
          },
          {
            icon: Users,
            title: "Handover and Enablement",
            description:
              "Your BI team should be able to extend and maintain what we build. Documentation, modelling conventions, and training, so this is not a dependency.",
          },
        ],
        visualTitle: "Scoped first, then built on whatever fits",
        visualBody:
          "The report is the last step. What decides whether it gets used is the definition behind each number, the owner attached to it, and whether the source data can carry the question at all.",
        visualImage: "/images/report-mockup1.png",
        visualAlt: "A report being designed, with KPI widgets and a template being edited",
        metricsTitle: "What Shapes the Work",
        metrics: [
          { metric: "Advisory", label: "First. The platform decision comes after the scope" },
          { metric: "1", label: "Definition per number, with an owner attached" },
          { metric: "Any", label: "Platform: Power BI, Tableau, Fabric, your existing stack" },
        ],
        stepsTitle: "How It Works",
        steps: [
          {
            title: "Scope",
            description:
              "We map the decisions, define the numbers behind them, assign owners, and assess what your data can honestly support today.",
          },
          {
            title: "Choose and build",
            description:
              "We recommend a platform against your existing stack rather than our own preference, then build the models, reports, and pipelines on it.",
          },
          {
            title: "Hand over",
            description:
              "Documentation, conventions, and training, so your own BI team can extend it. Ongoing support if you want it, not because you are stuck with us.",
          },
        ],
      },
      da: {
        metaTitle: "Business Intelligence rådgivning | OptiPeople",
        metaDescription:
          "BI-rådgivning og afklaring: hvilke beslutninger kræver hvilke tal, hvad kan data bære, og hvilken platform skal det bygges på. Power BI, Tableau eller noget helt andet.",
        eyebrow: "Business Intelligence",
        heroTitle: "Det svære er at blive enige om, hvad der skal måles",
        heroBody:
          "Vi arbejder med BI-teams som rådgivere først: hvilke beslutninger kræver hvilke tal, hvad kan jeres data ærligt bære, og hvad skal der egentlig bygges. Platformen kommer bagefter, og svaret er ikke altid Power BI.",
        primaryLabel: "Kontakt os",
        introTitle: "En rapport er et svar. Nogen skal have stillet spørgsmålet rigtigt først",
        introBody:
          "De BI-opgaver, vi bliver hentet ind på, går sjældent galt på teknikken. Formlerne er rigtige, opdateringen kører, rapporten er flot, og den bliver stadig ikke brugt. For tallet på den var ikke det, mødet drejer sig om, eller tre afdelinger regner det ud på hver sin måde, eller ingen har aftalt, hvem der gør noget, når det flytter sig. Så vi starter med rådgivning og afklaring: beslutningerne, definitionerne, ejerskabet, og hvad data faktisk kan bære. Derefter bygger vi, på den platform der passer. Vi laver meget Power BI, fordi mange af vores kunder ligger på Microsoft, men Tableau, Fabric eller det datawarehouse, I allerede har, er lige så gode svar, hvis det er der, huset i forvejen er.",
        capabilitiesTitle: "Rådgivning først, byggeri bagefter",
        features: [
          {
            icon: Search,
            title: "Hvilke beslutninger, hvilke tal",
            description:
              "Hvilke beslutninger bliver truffet på hvilke møder, ud fra hvad, og hvor ofte de bliver truffet uden tal. Resten følger af at få den liste rigtig.",
          },
          {
            icon: PieChart,
            title: "Definitioner og ejerskab",
            description:
              "Én definition pr. tal, skrevet ned, med en ejer og en aftale om, hvad der sker, når det flytter sig. At tre afdelinger regner OEE ud på hver sin måde er et afklaringsproblem.",
          },
          {
            icon: Workflow,
            title: "Platform og værktøj",
            description:
              "Power BI, Tableau, Fabric eller det, I allerede har. Vi anbefaler ud fra jeres nuværende systemer, licenser og folk, ikke ud fra hvad vi selv holder mest af.",
          },
          {
            icon: BarChart3,
            title: "Byg og datamodeller",
            description:
              "Så leverancen: datamodeller, rapporter og automatik oven på det afklarede omfang, med opdateringer der kører uden en person, der holder øje.",
          },
        ],
        visualTitle: "Afklaret først, bygget på det der passer",
        visualBody:
          "Rapporten er det sidste skridt. Det, der afgør, om den bliver brugt, er definitionen bag hvert tal, ejeren der er sat på, og om kilderne overhovedet kan bære spørgsmålet.",
        visualImage: "/images/report-mockup1.png",
        visualAlt: "En rapport under opbygning med nøgletal og en skabelon, der bliver redigeret",
        metricsTitle: "Det, opgaven bygger på",
        metrics: [
          { metric: "Rådgivning", label: "Først. Valget af platform kommer bagefter" },
          { metric: "1", label: "Definition pr. tal, med en ejer sat på" },
          { metric: "Alle", label: "Platforme: Power BI, Tableau, Fabric, det I har" },
        ],
        stepsTitle: "Sådan arbejder vi",
        steps: [
          {
            title: "Afklar",
            description:
              "Vi kortlægger beslutningerne, definerer tallene bag dem, sætter ejere på og vurderer, hvad jeres data ærligt kan bære i dag.",
          },
          {
            title: "Vælg og byg",
            description:
              "Vi anbefaler en platform ud fra det, I allerede har, og bygger så datamodeller, rapporter og automatik på den.",
          },
          {
            title: "Overdrag",
            description:
              "Dokumentation, konventioner og oplæring, så jeres eget BI-team kan bygge videre. Hjælp bagefter, hvis I vil, ikke fordi I er nødt til det.",
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
