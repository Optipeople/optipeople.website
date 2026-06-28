import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  Activity,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  Bell,
  BellRing,
  Bot,
  Cable,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Cpu,
  Database,
  Factory,
  FileText,
  Gauge,
  GitBranch,
  HeartPulse,
  History,
  Leaf,
  MapPin,
  Monitor,
  Network,
  PieChart,
  Plug,
  Radio,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  Wrench,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { AiStackPage } from "@/components/ai-stack-page"
import {
  aiStackSlides,
  aiStackSliderCopy,
  getAiCapability,
} from "@/lib/ai-stack"
import { LogoWall, type LogoItem } from "@/components/logo-wall"
import { PlatformFlower } from "@/components/platform-flower"
import { PostArchive } from "@/components/post-archive"
import { SlideCarousel, type SlideData } from "@/components/slide-carousel"
import { TestimonialCarousel, type Testimonial } from "@/components/testimonial-carousel"
import { VideoCarousel, type VideoData } from "@/components/video-carousel"
import {
  getLatestPostsByCategory,
  getPostBySlug,
  getPostsByCategory,
  resolveImagePath,
} from "@/lib/blog-data"
import { employees } from "@/lib/employees"
import { localizeHref } from "@/lib/i18n"
import { absoluteUrl, buildMetadata } from "@/lib/seo"
import { NewsletterForm } from "@/app/newsletter/newsletter-form"
import { DanishContactForm } from "../contact-form"

type Props = {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<{ page?: string }>
}

type Metric = {
  metric: string
  label: string
}

type IconCard = {
  icon: LucideIcon
  title: string
  description: string
}

type Step = {
  title: string
  description: string
}

type StandardPage = {
  title: string
  description: string
  path: string
  eyebrow: string
  heroTitle: string
  heroBody: string
  primaryLabel?: string
  introTitle: string
  introBody: string
  capabilitiesTitle: string
  features: IconCard[]
  visualTitle: string
  visualBody: string
  visualImage?: string
  visualAlt?: string
  metricsTitle: string
  metrics: Metric[]
  stepsTitle: string
  steps: Step[]
  darkHero?: boolean
}

type FeaturePage = {
  title: string
  description: string
  path: string
  parentLabel: string
  parentHref: string
  eyebrow: string
  heroTitle: string
  heroBody: string
  heroImage: string
  heroImageAlt: string
  valueTitle: string
  valueBody: string
  capabilitiesTitle: string
  capabilitiesBody: string
  capabilities: Array<{
    title: string
    description: string
    image: string
    imageAlt: string
  }>
  showcaseTitle?: string
  showcaseBody?: string
  showcaseImage?: string
  showcaseAlt?: string
  metrics: Metric[]
  related: Array<{
    title: string
    description: string
    href: string
  }>
}

const da = (href: string) => localizeHref(href, "da")

const staticPaths = [
  "/",
  "/about",
  "/contact",
  "/insights",
  "/newsletter",
  "/blog",
  "/cases",
  "/modules",
  "/solutions",
  "/features",
  "/services",
  "/services/smart-operations",
  "/services/automation",
  "/services/business-intelligence",
  "/services/ai-solutions",
  "/solutions/manufacturing",
  "/solutions/oems",
  "/solutions/service",
  "/modules/production",
  "/modules/maintenance",
  "/modules/quality",
  "/modules/analysis",
  "/modules/energy",
  "/modules/iot",
  "/modules/mes",
  "/modules/erp-shopfloor",
  "/features/production-efficiency",
  "/features/stop-cause-registration",
  "/features/maintenance-and-tasks",
  "/features/quality-management",
  "/features/analysis-and-reporting",
  "/features/energy-and-telemetry",
  "/features/ai-and-copilots",
  "/features/machine-control",
  "/resources/people",
  "/people",
  "/videos",
  "/get-help",
  "/privacy",
  "/terms",
]

const customerVideos: VideoData[] = [
  { videoId: "3LOknXK4buo" },
  { videoId: "AgHZcfeu8mQ" },
  { videoId: "H4HvdRpmHjo" },
]

const customerLogos: LogoItem[] = [
  { name: "Alfix", logoSrc: "/images/logos/Alfix-logo.png" },
  { name: "Broen", logoSrc: "/images/logos/Broen.png" },
  { name: "Carl Hansen og Søn", logoSrc: "/images/logos/Carl Hansen og Søn.png" },
  { name: "CS Wind Offshore", logoSrc: "/images/logos/CS Wind Offshore.png" },
  { name: "Ege Carpets", logoSrc: "/images/logos/Ege.png" },
  { name: "Elektro-Isola", logoSrc: "/images/logos/Elektro-Isola.png" },
  { name: "Gurit", logoSrc: "/images/logos/Gurit.png" },
  { name: "Hydro Extrusion", logoSrc: "/images/logos/Hydro.png" },
  { name: "Kvik", logoSrc: "/images/logos/Kvik.png" },
  { name: "Montana", logoSrc: "/images/logos/Montana.png" },
  { name: "Steel Products", logoSrc: "/images/logos/Steel-Products.png" },
  { name: "TCM-Group", logoSrc: "/images/logos/TCM-Group.png" },
  { name: "The Whole Company", logoSrc: "/images/logos/The-Whole-Company.png" },
  { name: "Xellia", logoSrc: "/images/logos/Xellia.png" },
]

const homeTabSlides: SlideData[] = [
  {
    tab: "Produktionsvirksomheder",
    title: "Kend din fabrik. I realtid.",
    description:
      "OptiPeople forbinder maskiner, processer og mennesker i ét levende driftsoverblik. Se flaskehalse mens de opstår, reagér hurtigere, og styr produktionen på fakta.",
    imageSrc: "/images/dashboard2.png",
    imageAlt: "Opticloud produktionsdashboard",
    primaryLabel: "Udforsk produktionsløsninger",
    primaryHref: da("/solutions/manufacturing"),
    bgColor: "bg-blue-50/0",
    layout: "overlay",
    overlay: "dark",
  },
  {
    tab: "OEM'er og maskinbyggere",
    title: "Gør maskiner til platforme",
    description:
      "Opticloud gør det muligt at levere forbundne maskiner med indbygget indsigt. Overvåg performance i felten, hjælp kunder proaktivt, og byg digitale services oven på udstyret.",
    imageSrc: "/images/report1.png",
    imageAlt: "Illustration af forbundne maskiner",
    primaryLabel: "Se OEM-fordele",
    primaryHref: da("/solutions/oems"),
    bgColor: "bg-blue-50/0",
    layout: "overlay",
    overlay: "light",
  },
  {
    tab: "Service og aftermarket",
    title: "Løs problemer før kunden mærker dem",
    description:
      "Giv serviceholdet indblik i maskinernes sundhed og brug. Planlæg vedligehold, reducer brandslukning, og gør service til en konkurrencefordel.",
    imageSrc: "/images/backoffice1.png",
    imageAlt: "Serviceoverblik i Opticloud",
    primaryLabel: "Optimer service",
    primaryHref: da("/solutions/service"),
    bgColor: "bg-blue-50/0",
    layout: "overlay",
    overlay: "light",
  },
]

const homeFeatureSlides: SlideData[] = [
  {
    title: "Produktionseffektivitet",
    description:
      "Se hvor produktionstiden går tabt og hvorfor. Følg OEE live på tværs af skift, linjer og maskiner.",
    imageSrc: "/images/report-mockup4.png",
    imageAlt: "Dashboard til produktionseffektivitet og OEE",
    primaryLabel: "Se produktionseffektivitet",
    primaryHref: da("/features/production-efficiency"),
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#243b2f",
  },
  {
    title: "Stopårsagsregistrering",
    description:
      "Gør nedetid synlig ved kilden. Operatører registrerer stop direkte ved maskinen, så data bliver rent og brugbart.",
    imageSrc: "/images/Stop-Screen-Select.png",
    imageAlt: "Skærm til stopårsagsregistrering",
    primaryLabel: "Se stopregistrering",
    primaryHref: da("/features/stop-cause-registration"),
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#163b40",
  },
  {
    title: "Vedligehold og opgaver",
    description:
      "Planlæg forebyggende vedligehold baseret på brug og tilstand. Tildel opgaver, følg status, og reducer uplanlagt nedetid.",
    imageSrc: "/images/taskapp2.png",
    imageAlt: "Opgaveoverblik til vedligehold",
    primaryLabel: "Udforsk vedligehold",
    primaryHref: da("/features/maintenance-and-tasks"),
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#1c1f26",
  },
  {
    title: "Kvalitetsstyring",
    description:
      "Registrer kvalitetsdata dér hvor arbejdet sker. Spor afvigelser tilbage til maskiner, batches og skift.",
    imageSrc: "/images/backoffice1.png",
    imageAlt: "Kvalitetssporing og sporbarhed",
    primaryLabel: "Forbedr kvalitet",
    primaryHref: da("/features/quality-management"),
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#243b2f",
  },
  {
    title: "Analyse og rapportering",
    description:
      "Gør produktionsdata til tydelige rapporter om performance, tab og omkostningsdrivere uden manuelt regnearksarbejde.",
    imageSrc: "/images/report-mockup1.png",
    imageAlt: "Rapportering og analyse",
    primaryLabel: "Se rapportering",
    primaryHref: da("/features/analysis-and-reporting"),
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#163b40",
  },
  {
    title: "Energi og telemetri",
    description:
      "Kobl energi, vibration, flow og temperatur direkte til produktionen, og find spild, afvigelser og optimeringsmuligheder.",
    imageSrc: "/images/report-mockrup-3.png",
    imageAlt: "Energi- og telemetriovervågning",
    primaryLabel: "Udforsk energidata",
    primaryHref: da("/features/energy-and-telemetry"),
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#1c1f26",
  },
  {
    title: "AI og copilots",
    description:
      "Stil spørgsmål, find mønstre og understøt beslutninger med AI trænet på jeres egne produktionsdata.",
    imageSrc: "/images/report-mockup4.png",
    imageAlt: "AI-assistent til produktionsdata",
    primaryLabel: "Udforsk AI",
    primaryHref: da("/features/ai-and-copilots"),
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#243b2f",
  },
  {
    title: "Maskinstyring",
    description:
      "Integrer med maskinstyringer for feedback, automatisering og tættere loops mellem system og fabriksgulv.",
    imageSrc: "/images/Start-Machine.png",
    imageAlt: "Integration til maskinstyring",
    primaryLabel: "Se maskinstyring",
    primaryHref: da("/features/machine-control"),
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#163b40",
  },
]

const testimonials: Testimonial[] = [
  {
    quote:
      "Sammenlignet med vores OEE før Opticloud har vi set en gennemsnitlig stigning på 5% på bare tre måneder.",
    author: "Kasper Kielgast Poulsen",
    title: "Fabrikschef",
    company: "Dansk Træemballage",
  },
  {
    quote:
      "Opticloud har hjulpet os med at øge produktiviteten med cirka 5%. Dataindsamling kombineret med løbende forbedringer er nøglen.",
    author: "Tommy Andersen",
    title: "Production Manager",
    company: "DFI Geisler",
  },
  {
    quote:
      "Vi vedligeholder nu efter driftstimer i stedet for faste intervaller. Det giver omkring 40 ekstra produktionstimer årligt.",
    author: "Stefan Lindell",
    title: "Lean Project Manager",
    company: "Kvik",
  },
]

const standardPages: Record<string, StandardPage> = {
  "/modules/production": {
    title: "Produktionsmodul | OptiPeople",
    description:
      "Følg OEE, nedetid, produktionsordrer og skiftperformance med live produktionsdata.",
    path: "/modules/production",
    eyebrow: "Produktionsmodul",
    heroTitle: "Se hvor produktionstiden går tabt",
    heroBody:
      "Følg OEE i realtid, og forstå præcis hvor produktionstiden forsvinder. Stop med at gætte, og begynd at forbedre.",
    primaryLabel: "Book en demo",
    introTitle: "Produktionsdata skal ikke bo i regneark",
    introBody:
      "Når data først samles efter skiftet, er muligheden for at handle ofte væk. Produktionsmodulet erstatter manuelle logs med live signaler fra maskiner, linjer og skift.",
    capabilitiesTitle: "Alt til synlig produktion",
    features: [
      {
        icon: Gauge,
        title: "Live OEE-dashboards",
        description:
          "Se availability, performance og quality på tværs af maskiner og skift uden at vente på dagsrapporter.",
      },
      {
        icon: Bell,
        title: "Stopårsager",
        description:
          "Operatører registrerer nedetidsårsager ved maskinen, så forbedringsarbejdet bygger på strukturerede data.",
      },
      {
        icon: Activity,
        title: "Skiftperformance",
        description:
          "Sammenlign skift, teams og perioder, og find de arbejdsgange der skal kopieres bredere ud.",
      },
    ],
    visualTitle: "Ét dashboard til hele produktionen",
    visualBody:
      "Fra enkeltmaskiner til fabrikkens KPI'er. Dyk ned i de data, der betyder mest, på det niveau der passer til rollen.",
    visualImage: "/images/dashboard2.png",
    visualAlt: "Opticloud produktionsdashboard",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "15-25%", label: "OEE-forbedring det første år" },
      { metric: "40%", label: "Mindre uplanlagt nedetid" },
      { metric: "2 timer", label: "Sparet dagligt på manuel rapportering" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Forbind",
        description:
          "Vi kobler os på eksisterende maskiner og PLC'er uden produktionsstop eller hardwareudskiftning.",
      },
      {
        title: "Visualiser",
        description:
          "Teamet får et live dashboard med OEE, stopårsager og skiftperformance fra dag ét.",
      },
      {
        title: "Forbedr",
        description:
          "Brug data til målrettede forbedringscyklusser og mål effekten af hvert tiltag.",
      },
    ],
  },
  "/modules/quality": {
    title: "Kvalitetsmodul | OptiPeople",
    description:
      "Digitaliser kontroller, spor afvigelser og byg kvalitetssporbarhed direkte ind i produktionen.",
    path: "/modules/quality",
    eyebrow: "Kvalitetsmodul",
    heroTitle: "Byg ansvarlighed ind i produktionen",
    heroBody:
      "Registrer kvalitetsdata ved kilden, og spor hver afvigelse tilbage til maskiner, batches og skift.",
    primaryLabel: "Book en demo",
    introTitle: "Kvalitetsproblemer skal ikke opdages for sent",
    introBody:
      "Papirskemaer og regneark skjuler problemer, indtil de bliver dyre. Kvalitetsmodulet forbinder kontroller, afvigelser og korrigerende handlinger med produktionskonteksten.",
    capabilitiesTitle: "Digital kvalitetsstyring i praksis",
    features: [
      {
        icon: ClipboardCheck,
        title: "Digitale kontroller",
        description:
          "Erstat papir med guidede formularer og obligatoriske checkpoints ved kilden.",
      },
      {
        icon: GitBranch,
        title: "Fuld sporbarhed",
        description:
          "Spor produkter tilbage til maskine, batch, operatør og skift uden ekstra manuelt arbejde.",
      },
      {
        icon: ShieldCheck,
        title: "Auditklar dokumentation",
        description:
          "Auditspor og rapporter understøtter compliance og hurtigere kundedialog.",
      },
    ],
    visualTitle: "Kvalitetsdata forbundet med produktionen",
    visualBody:
      "Hver kontrol, afvigelse og handling bindes til den maskine, batch og operatør der skabte konteksten.",
    visualImage: "/images/backoffice1.png",
    visualAlt: "Kvalitetsoverblik i Opticloud",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "60%", label: "Mindre kvalitetsrelateret omarbejde" },
      { metric: "90%", label: "Hurtigere respons på afvigelser" },
      { metric: "100%", label: "Digital sporbarhed" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Digitaliser",
        description:
          "Erstat papirbaserede processer med digitale formularer koblet til produktionsdata.",
      },
      {
        title: "Spor",
        description:
          "Knyt kvalitetshændelser til maskiner, batches og operatører automatisk.",
      },
      {
        title: "Forbedr",
        description:
          "Find mønstre, reducer scrap, og styr løbende forbedringer på fakta.",
      },
    ],
  },
  "/modules/maintenance": {
    title: "Vedligeholdsmodul | OptiPeople",
    description:
      "Planlæg forebyggende vedligehold, håndter opgaver og reducer uplanlagt nedetid.",
    path: "/modules/maintenance",
    eyebrow: "Vedligeholdsmodul",
    heroTitle: "Løs det før det bryder ned",
    heroBody:
      "Gå fra reaktiv brandslukning til planlagt vedligehold baseret på brug, tilstand og historik.",
    primaryLabel: "Book en demo",
    introTitle: "Vedligehold skal følge virkeligheden",
    introBody:
      "Kalenderintervaller fortæller sjældent hele historien. Med live driftstimer, sensordata og opgavestyring kan teamet lave det rigtige arbejde på det rigtige tidspunkt.",
    capabilitiesTitle: "Alt til proaktivt vedligehold",
    features: [
      {
        icon: Calendar,
        title: "Forebyggende planlægning",
        description:
          "Planlæg efter driftstimer, cyklusser, kalender eller tilstand og undgå oversete servicepunkter.",
      },
      {
        icon: Smartphone,
        title: "Mobil opgavestyring",
        description:
          "Teknikere modtager og afslutter opgaver på mobile enheder med noter og billeder.",
      },
      {
        icon: History,
        title: "Vedligeholdshistorik",
        description:
          "Fuld historik pr. maskine gør mønstre synlige og hjælper med at optimere intervaller.",
      },
    ],
    visualTitle: "Ét sted for opgaver, udstyr og historik",
    visualBody:
      "Samlet overblik over kommende service, aktuelle opgaver og maskinernes historik.",
    visualImage: "/images/taskapp2.png",
    visualAlt: "Vedligeholdsopgaver i Opticloud",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "50%", label: "Mindre uplanlagt nedetid" },
      { metric: "40 timer", label: "Ekstra produktionstid årligt" },
      { metric: "30%", label: "Færre akutte servicekald" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Registrer",
        description:
          "Opret udstyr og planer ud fra brug, tilstand eller faste intervaller.",
      },
      {
        title: "Overvåg",
        description:
          "Følg maskinsundhed og driftstimer, og få alarmer når handling er nødvendig.",
      },
      {
        title: "Forebyg",
        description:
          "Reducer nedbrud, forlæng levetiden og sænk de samlede vedligeholdsomkostninger.",
      },
    ],
  },
  "/modules/energy": {
    title: "Energimodul | OptiPeople",
    description:
      "Kobl energiforbrug til produktion og find spild, afvigelser og optimeringsmuligheder.",
    path: "/modules/energy",
    eyebrow: "Energimodul",
    heroTitle: "Skær spild væk uden at skære hjørner",
    heroBody:
      "Mål energi i realtid, og forstå forbrug pr. produkt, maskine og skift med data koblet til produktionen.",
    primaryLabel: "Book en demo",
    introTitle: "Energidata giver først værdi i kontekst",
    introBody:
      "Et samlet kWh-tal fortæller ikke, hvor spildet opstår. Når energidata forbindes med ordrer, maskintilstande og output, bliver optimering konkret.",
    capabilitiesTitle: "Energiindsigt for produktionen",
    features: [
      {
        icon: Zap,
        title: "kWh pr. enhed",
        description:
          "Se forbrug pr. produkt, ordre eller linje og følg udviklingen over tid.",
      },
      {
        icon: Leaf,
        title: "CO2 og bæredygtighed",
        description:
          "Dokumenter forbedringer og find de processer, hvor energitiltag har størst effekt.",
      },
      {
        icon: Bell,
        title: "Afvigelsesalarmer",
        description:
          "Få besked når forbruget afviger fra normalen, før det bliver en dyr vane.",
      },
    ],
    visualTitle: "Energi koblet direkte til output",
    visualBody:
      "Sammenlign forbrug med maskinstatus, produktionstal og skift for at finde de reelle drivere.",
    visualImage: "/images/report-mockrup-3.png",
    visualAlt: "Energi- og telemetridashboard",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "10-20%", label: "Lavere energispild" },
      { metric: "Live", label: "Synlighed på forbrug" },
      { metric: "1 kilde", label: "Energi og produktion samlet" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Mål",
        description:
          "Forbind målere, sensorer og eksisterende data til Opticloud.",
      },
      {
        title: "Kobl",
        description:
          "Sæt energiforbrug i relation til produkter, ordrer og maskinstatus.",
      },
      {
        title: "Reducer",
        description:
          "Find spild, dokumentér forbedringer og følg effekten løbende.",
      },
    ],
  },
  "/modules/analysis": {
    title: "Analysemodul | OptiPeople",
    description:
      "Gør produktionsdata til rapporter om performance, tab, omkostninger og forbedringsmuligheder.",
    path: "/modules/analysis",
    eyebrow: "Analysemodul",
    heroTitle: "Fra rå data til klare beslutninger",
    heroBody:
      "Automatisér rapportering, og få indsigt i performance, tab og omkostningsdrivere uden manuelt regnearksarbejde.",
    primaryLabel: "Book en demo",
    introTitle: "Rapporter skal drive handling",
    introBody:
      "Når rapportering kræver manuelle udtræk, kommer svarene for sent. Analysemodulet gør trends og forbedringsmuligheder synlige løbende.",
    capabilitiesTitle: "Rapportering der kan bruges",
    features: [
      {
        icon: BarChart3,
        title: "Automatiske rapporter",
        description:
          "Daglige, ugentlige og månedlige rapporter leveres til de rigtige interessenter.",
      },
      {
        icon: Search,
        title: "Tabsanalyse",
        description:
          "Se hvilke stop, produkter eller linjer der driver de største tab.",
      },
      {
        icon: PieChart,
        title: "Investeringsgrundlag",
        description:
          "Brug data til at prioritere projekter og dokumentere effekten af forbedringer.",
      },
    ],
    visualTitle: "Rapporter uden regnearkskaos",
    visualBody:
      "Drill ned fra ledelsesoverblik til maskin- og skiftniveau i samme datagrundlag.",
    visualImage: "/images/report-mockup1.png",
    visualAlt: "Rapportering i Opticloud",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "80%", label: "Mindre tid på manuel rapportering" },
      { metric: "Live", label: "Opdaterede KPI'er" },
      { metric: "1 view", label: "Samlet driftsbillede" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Saml",
        description:
          "Data fra produktion, kvalitet, energi og vedligehold samles ét sted.",
      },
      {
        title: "Forklar",
        description:
          "Rapporter viser både resultater og årsager bag udviklingen.",
      },
      {
        title: "Prioriter",
        description:
          "Brug indsigten til at vælge de forbedringer, der flytter mest.",
      },
    ],
  },
  "/modules/iot": {
    title: "IoT-modul | OptiPeople",
    description:
      "Forbind maskiner, sensorer og ældre udstyr til en samlet platform til produktionsdata.",
    path: "/modules/iot",
    eyebrow: "IoT-modul",
    heroTitle: "Få data fra alt på fabrikken",
    heroBody:
      "Kobl nye og gamle maskiner på platformen med PLC'er, gateways, sensorer og åbne protokoller.",
    primaryLabel: "Book en demo",
    introTitle: "Industridata skal ikke være låst fast",
    introBody:
      "Mange fabrikker har værdifulde signaler gemt i ældre udstyr, isolerede PLC'er og lokale systemer. IoT-modulet får data sikkert ud og ind i driftsoverblikket.",
    capabilitiesTitle: "Maskindata uden rip-and-replace",
    features: [
      {
        icon: Plug,
        title: "Protokolfleksibilitet",
        description:
          "Forbind via OPC-UA, Modbus, MQTT, IO-Link, sensorkits eller API'er.",
      },
      {
        icon: Network,
        title: "Edge dataopsamling",
        description:
          "Opsaml og kvalitetssikr signaler tæt på maskinen, før de sendes videre.",
      },
      {
        icon: ShieldCheck,
        title: "Sikker integration",
        description:
          "Data flyttes kontrolleret og sikkert uden at forstyrre produktionen.",
      },
    ],
    visualTitle: "Én gateway, alle maskiner",
    visualBody:
      "Se forbundne enheder, signaler og datakvalitet i ét samlet overblik.",
    visualImage: "/images/Telemetry-Numbers.png",
    visualAlt: "Telemetrioverblik",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "Alle aldre", label: "Nye og gamle maskiner" },
      { metric: "< 1 min", label: "Fra signal til dashboard" },
      { metric: "Åben", label: "Integration via API" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Find",
        description:
          "Vi kortlægger de signaler, der giver værdi for drift og forbedringer.",
      },
      {
        title: "Forbind",
        description:
          "Maskiner og sensorer kobles på med den protokol, der passer bedst.",
      },
      {
        title: "Brug",
        description:
          "Data bliver til dashboards, rapporter, alarmer og automatisering.",
      },
    ],
  },
  "/modules/erp-shopfloor": {
    title: "ERP Shopfloor-modul | OptiPeople",
    description:
      "Forbind ERP-planlægning med produktionens realitet gennem live data og tovejssynk.",
    path: "/modules/erp-shopfloor",
    eyebrow: "ERP Shopfloor-modul",
    heroTitle: "Byg bro mellem ERP og fabriksgulv",
    heroBody:
      "ERP kender planen. Maskinerne kender virkeligheden. Opticloud forbinder de to, så planlæggere og operatører arbejder på samme fakta.",
    primaryLabel: "Book en demo",
    introTitle: "ERP kan ikke se produktionen alene",
    introBody:
      "Når plan og realitet ikke hænger sammen, arbejder planlæggere med gamle tal og operatører uden kontekst. ERP Shopfloor lukker hullet.",
    capabilitiesTitle: "Integration mellem plan og udførelse",
    features: [
      {
        icon: ArrowLeftRight,
        title: "Tovejssynk",
        description:
          "Send ordrer ned på gulvet og faktiske mængder, scrap og tider tilbage til ERP.",
      },
      {
        icon: Clock,
        title: "Ordresporing",
        description:
          "Følg ordrer fra start til slut og se afvigelser fra planen mens de sker.",
      },
      {
        icon: Gauge,
        title: "Live shopfloor",
        description:
          "Kombinér ordrestatus med OEE, stopårsager og maskindata i realtid.",
      },
    ],
    visualTitle: "Fra ERP-ordre til maskindata",
    visualBody:
      "Planen, udførelsen og afvigelserne vises i samme dashboard.",
    visualImage: "/images/dashboard1.png",
    visualAlt: "Shopfloor-dashboard",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "Live", label: "Faktiske tal tilbage til planlægning" },
      { metric: "1 flow", label: "Fra ordre til færdigmelding" },
      { metric: "Mindre", label: "Manuel registrering" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Synk",
        description: "ERP-ordrer og produktionsdata forbindes i et styret flow.",
      },
      {
        title: "Følg",
        description:
          "Operatører og planlæggere ser status og afvigelser i realtid.",
      },
      {
        title: "Luk loopet",
        description:
          "Faktiske mængder og tider sendes tilbage, så ERP altid er opdateret.",
      },
    ],
  },
  "/modules/mes": {
    title: "MES-modul | OptiPeople",
    description:
      "Cloudbaseret MES til OEE, stopanalyse, vedligehold, energi og rapportering.",
    path: "/modules/mes",
    eyebrow: "MES-modul",
    heroTitle: "Din cloudbaserede MES-platform",
    heroBody:
      "Et samlet Manufacturing Execution System i skyen. Opsaml produktions-, telemetri- og energidata og gør det handlingsklart for hele organisationen.",
    primaryLabel: "Book en demo",
    introTitle: "Produktion kræver mere end maskiner",
    introBody:
      "Operatører, ledere og direktører har brug for tilgængelige data i deres eget niveau af detaljer. Opticloud forbinder teknologi og menneskelige beslutninger.",
    capabilitiesTitle: "En komplet MES bygget til cloud",
    features: [
      {
        icon: Monitor,
        title: "Tilpassede dashboards",
        description:
          "Fra tavleskærme til ledelsesrapportering. Samme data, forskellige perspektiver.",
      },
      {
        icon: Wrench,
        title: "Vedligehold og TPM",
        description:
          "Brug telemetri og driftshistorik til vedligehold baseret på tilstand.",
      },
      {
        icon: Leaf,
        title: "Energi og bæredygtighed",
        description:
          "Følg energiforbrug pr. produceret enhed og dokumentér forbedringer.",
      },
    ],
    visualTitle: "Én platform, alle perspektiver",
    visualBody:
      "Operatører ser deres maskine. Ledere ser linjen. Direktører ser fabrikken.",
    visualImage: "/images/OpticloudOPSingle.jpg",
    visualAlt: "Opticloud MES-platform",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "Realtid", label: "Synlighed på tværs" },
      { metric: "100%", label: "Digital datafangst" },
      { metric: "Industry 5.0", label: "Menneskecentreret produktion" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Forbind",
        description:
          "Maskiner, sensorer og systemer samles i ét cloudbaseret MES.",
      },
      {
        title: "Visualiser",
        description:
          "Hver rolle får de data, der er nødvendige for at handle sikkert.",
      },
      {
        title: "Optimér",
        description:
          "Brug realtidsdata til at fjerne gætteri og drive løbende forbedringer.",
      },
    ],
  },
  "/services/smart-operations": {
    title: "Smart Operations services | OptiPeople",
    description:
      "Forbedr shopfloor-synlighed med live overvågning, OEE, stopårsager og automatiseret rapportering.",
    path: "/services/smart-operations",
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
  "/services/automation": {
    title: "Automation services | OptiPeople",
    description:
      "Design og integrér PLC, HMI, SCADA og maskinstyring til stabil industriel automation.",
    path: "/services/automation",
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
  "/services/business-intelligence": {
    title: "Business Intelligence services | OptiPeople",
    description:
      "Power BI dashboards, datamodeller, KPI-design og automatiseret rapportering til produktion.",
    path: "/services/business-intelligence",
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
        description:
          "Vi kortlægger beslutninger, datakilder og KPI'er.",
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
  "/services/ai-solutions": {
    title: "AI-agentløsninger | OptiPeople",
    description:
      "AI-agenter og copilots der hjælper produktionsteams med data, beslutninger og automatiserede arbejdsgange.",
    path: "/services/ai-solutions",
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
  "/solutions/manufacturing": {
    title: "Løsninger til produktion | OptiPeople",
    description:
      "OptiPeople hjælper produktionsvirksomheder med realtidsdata, OEE, kvalitet, energi og vedligehold.",
    path: "/solutions/manufacturing",
    eyebrow: "Til produktionsvirksomheder",
    heroTitle: "Kend din fabrik i realtid",
    heroBody:
      "Forbind maskiner, processer og mennesker i ét driftsoverblik, så teamet kan handle hurtigere og styre på fakta.",
    primaryLabel: "Book en demo",
    introTitle: "Fabrikker forbedres i hverdagen",
    introBody:
      "Når data bliver synlig dér hvor beslutningerne træffes, bliver tavlemøder, prioritering og forbedringer mere konkrete.",
    capabilitiesTitle: "Det produktionshold får",
    features: [
      {
        icon: Factory,
        title: "Shopfloor-synlighed",
        description: "Live status, output og stopårsager på maskiner og linjer.",
      },
      {
        icon: Gauge,
        title: "OEE og tab",
        description: "Forstå hvor tid, kvalitet og performance går tabt.",
      },
      {
        icon: Users,
        title: "Fælles fakta",
        description: "Operatører, ledere og direktører arbejder ud fra samme data.",
      },
    ],
    visualTitle: "Fra maskinsignal til forbedring",
    visualBody:
      "Opticloud samler data og gør den synlig i dashboards, rapporter og daglige arbejdsgange.",
    visualImage: "/images/dashboard2.png",
    visualAlt: "Produktionsdashboard",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "15-25%", label: "OEE-forbedring" },
      { metric: "40%", label: "Mindre uplanlagt nedetid" },
      { metric: "Live", label: "Beslutningsgrundlag" },
    ],
    stepsTitle: "Sådan kommer I i gang",
    steps: [
      {
        title: "Kortlæg",
        description: "Vi finder de tab og datakilder, der betyder mest.",
      },
      {
        title: "Forbind",
        description: "Maskiner og systemer kobles på uden at forstyrre driften.",
      },
      {
        title: "Forbedr",
        description: "Teamet bruger data i hverdagen til målrettede handlinger.",
      },
    ],
    darkHero: true,
  },
  "/solutions/oems": {
    title: "Løsninger til OEM'er | OptiPeople",
    description:
      "Gør maskiner til forbundne platforme med remote diagnostics, performance analytics og digitale servicepakker.",
    path: "/solutions/oems",
    eyebrow: "Til OEM'er og maskinbyggere",
    heroTitle: "Gør maskiner til platforme",
    heroBody:
      "Lever forbundne maskiner med indbygget indsigt, proaktiv support og mulighed for digitale serviceindtægter.",
    primaryLabel: "Book en demo",
    introTitle: "Det er ikke længere nok at sælge maskiner",
    introBody:
      "Kunder forventer remote support, prediktive indsigter og digitale services. OptiPeople giver infrastrukturen til at eje relationen efter salget.",
    capabilitiesTitle: "Alt til forbundne maskiner",
    features: [
      {
        icon: BellRing,
        title: "Fjerndiagnostik",
        description: "Find årsager og hjælp kunder før et servicebesøg.",
      },
      {
        icon: TrendingUp,
        title: "Performanceanalyse",
        description:
          "Giv kunder indsigt i maskinbrug, output og forbedringsmuligheder.",
      },
      {
        icon: RefreshCw,
        title: "Digitale servicepakker",
        description:
          "Pak overvågning, alarmer og rapportering som abonnementsservices.",
      },
    ],
    visualTitle: "Jeres maskiner, jeres brand, én platform",
    visualBody:
      "Et portalsetup hvor kunder ser live maskindata, servicehistorik og performance.",
    visualImage: "/images/OpticloudOPSingle.jpg",
    visualAlt: "Maskinportal med eget brand",
    metricsTitle: "Hvad forbundne maskinbyggere opnår",
    metrics: [
      { metric: "3x", label: "Vækst i aftermarket-potentiale" },
      { metric: "60%", label: "Hurtigere problemløsning" },
      { metric: "35%", label: "Stærkere kundefastholdelse" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Integrér",
        description: "Vi kobler platformen til maskinens styring og data.",
      },
      {
        title: "Deploy",
        description: "Maskiner leveres med Opticloud som digitalt lag.",
      },
      {
        title: "Monetisér",
        description: "Data og support pakkes som serviceydelser kunder betaler for.",
      },
    ],
    darkHero: true,
  },
  "/solutions/service": {
    title: "Serviceløsninger | OptiPeople",
    description:
      "Giv serviceholdet synlighed på maskinsundhed, usage-based maintenance og remote diagnostics.",
    path: "/solutions/service",
    eyebrow: "Til service og aftermarket",
    heroTitle: "Løs problemer før kunden mærker dem",
    heroBody:
      "Planlæg vedligehold på fakta, reducer akutte udkald, og gør service til en konkurrencefordel.",
    primaryLabel: "Book en demo",
    introTitle: "Reaktiv service er dyrt og drænende",
    introBody:
      "Teknikere skal ikke bruge tiden på at gætte. Med maskindata, alarmer og historik kan service planlægges, før fejl bliver synlige for kunden.",
    capabilitiesTitle: "Alt til proaktiv service",
    features: [
      {
        icon: HeartPulse,
        title: "Maskinsundhed",
        description:
          "Følg vibration, temperatur, energi og driftstimer i realtid.",
      },
      {
        icon: MapPin,
        title: "Fjerndiagnostik",
        description:
          "Diagnosticér fejl eksternt og mød op med de rigtige dele.",
      },
      {
        icon: FileText,
        title: "Servicerapporter",
        description:
          "Lever dataunderbyggede rapporter og design serviceaftaler med sikkerhed.",
      },
    ],
    visualTitle: "Ét overblik over alle maskiner I servicerer",
    visualBody:
      "Maskinsundhed, servicehistorik og kommende vedligehold på tværs af installeret base.",
    visualImage: "/images/report-mockrup-3.png",
    visualAlt: "Maskinsundhedsdashboard",
    metricsTitle: "Typiske resultater",
    metrics: [
      { metric: "50%", label: "Færre akutte servicekald" },
      { metric: "40 timer", label: "Sparet årligt pr. maskine" },
      { metric: "30%", label: "Mere servicekontraktværdi" },
    ],
    stepsTitle: "Sådan virker det",
    steps: [
      {
        title: "Forbind",
        description: "Sensorer og maskindata samles i et serviceoverblik.",
      },
      {
        title: "Overvåg",
        description: "Alarmer og trends viser, hvor teamet skal reagere.",
      },
      {
        title: "Forebyg",
        description:
          "Planlæg vedligehold efter faktisk brug og løs problemer remote når muligt.",
      },
    ],
    darkHero: true,
  },
}

const featurePages: Record<string, FeaturePage> = {
  "/features/production-efficiency": {
    title: "Produktionseffektivitet | OptiPeople",
    description:
      "Følg OEE i realtid, se hvor produktionstiden går tabt, og forstå performance på tværs af skift, linjer og maskiner.",
    path: "/features/production-efficiency",
    parentLabel: "Produktion",
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
  "/features/stop-cause-registration": {
    title: "Stopårsagsregistrering | OptiPeople",
    description:
      "Gør nedetid synlig ved kilden med operatørregistrering direkte ved maskinen.",
    path: "/features/stop-cause-registration",
    parentLabel: "Produktion",
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
  "/features/maintenance-and-tasks": {
    title: "Vedligehold og opgaver | OptiPeople",
    description:
      "Planlæg og udfør forebyggende vedligehold baseret på brug, tilstand og opgavestatus.",
    path: "/features/maintenance-and-tasks",
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
  "/features/quality-management": {
    title: "Kvalitetsstyring | OptiPeople",
    description:
      "Registrer kvalitetsdata ved kilden og spor afvigelser til maskiner, batches og skift.",
    path: "/features/quality-management",
    parentLabel: "Kvalitet",
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
  "/features/analysis-and-reporting": {
    title: "Analyse og rapportering | OptiPeople",
    description:
      "Gør produktionsdata til klare rapporter om performance, tab og omkostninger.",
    path: "/features/analysis-and-reporting",
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
  "/features/energy-and-telemetry": {
    title: "Energi og telemetri | OptiPeople",
    description:
      "Kobl energi, vibration, flow og temperatur til produktionens output og status.",
    path: "/features/energy-and-telemetry",
    parentLabel: "Energi",
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
  "/features/ai-and-copilots": {
    title: "AI og copilots | OptiPeople",
    description:
      "Stil spørgsmål, find mønstre og understøt beslutninger med AI trænet på jeres produktionsdata.",
    path: "/features/ai-and-copilots",
    parentLabel: "Produktion",
    parentHref: "/modules/production",
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
  "/features/machine-control": {
    title: "Maskinstyring | OptiPeople",
    description:
      "Integrer med maskinstyring for feedback, automatisering og tættere loops mellem system og gulv.",
    path: "/features/machine-control",
    parentLabel: "Produktion",
    parentHref: "/modules/production",
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
}

const simplePages = {
  "/modules": {
    title: "Moduler | OptiPeople",
    description:
      "Udforsk OptiPeople-modulerne — produktion, kvalitet, vedligehold, energi, analyse, IoT, ERP shopfloor og MES — på én forbundet platform.",
    eyebrow: "Moduler",
    headline: "Én platform til hele produktionen",
    body:
      "Hvert modul løser et konkret driftsbehov, og sammen giver de ét forbundet overblik over fabriksgulvet.",
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
  "/solutions": {
    title: "Løsninger | OptiPeople",
    description:
      "OptiPeople-løsninger til produktionsvirksomheder, OEM'er og maskinbyggere samt service og aftermarket.",
    eyebrow: "Løsninger",
    headline: "Bygget til hvordan I producerer og servicerer",
    body:
      "Uanset om I driver en fabrik, bygger maskiner eller servicerer en installeret base, giver OptiPeople jer driftsdata til at handle hurtigere.",
    links: [
      { title: "Til produktionsvirksomheder", href: "/solutions/manufacturing", description: "Kend din fabrik i realtid med forbundne maskiner, OEE, kvalitet, energi og vedligehold." },
      { title: "Til OEM'er og maskinbyggere", href: "/solutions/oems", description: "Gør maskiner til forbundne platforme med fjerndiagnostik og digitale serviceindtægter." },
      { title: "Til service og aftermarket", href: "/solutions/service", description: "Giv serviceholdet indblik i maskinsundhed og løs problemer før kunden mærker dem." },
    ],
  },
  "/features": {
    title: "Funktioner | OptiPeople",
    description:
      "Udforsk OptiPeople-funktioner — fra produktionseffektivitet og stopårsagsregistrering til AI-copilots og maskinstyring.",
    eyebrow: "Funktioner",
    headline: "Fra rå maskinsignaler til reel forståelse",
    body:
      "Udforsk de funktioner, der gør produktionen synlig, målbar og mulig at forbedre — hver dag.",
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
  "/services": {
    title: "Services",
    description:
      "Fra strategi til implementering leverer OptiPeople løsninger til smart operations, automation, BI og AI.",
    eyebrow: "Services",
    headline: "Services der flytter drift fra idé til resultat",
    body:
      "Vi hjælper produktionsvirksomheder med at forbinde maskiner, bygge datagrundlag, automatisere processer og gøre indsigter brugbare i hverdagen.",
    links: [
      {
        title: "Smart Operations",
        href: "/services/smart-operations",
        description: "Realtidsdata, OEE, dashboards og driftsforbedringer.",
      },
      {
        title: "Automation",
        href: "/services/automation",
        description: "PLC, HMI, SCADA og maskinstyring bygget til produktion.",
      },
      {
        title: "Business Intelligence",
        href: "/services/business-intelligence",
        description: "Power BI, datamodeller og automatiseret rapportering.",
      },
      {
        title: "AI-agentløsninger",
        href: "/services/ai-solutions",
        description: "AI-agenter og copilots tæt på jeres drift og data.",
      },
    ],
  },
  "/videos": {
    title: "Videoer | OptiPeople",
    description:
      "Se Opticloud-demoer, kundehistorier og forklaringer om digital produktion.",
    eyebrow: "Videoer",
    headline: "Se Opticloud i aktion",
    body:
      "Se produktdemoer, kundehistorier og guides, der viser hvordan Opticloud fungerer på fabriksgulvet.",
    links: [],
    note: "Videoer kommer snart.",
  },
  "/get-help": {
    title: "Få hjælp | OptiPeople",
    description: "Find hjælp til Opticloud eller kontakt OptiPeople support.",
    eyebrow: "Få hjælp",
    headline: "Vi hjælper jer videre",
    body:
      "Har du brug for support, sparring eller hjælp til at finde den rigtige løsning? Kontakt os, så finder vi næste skridt sammen.",
    links: [
      {
        title: "Skriv til support",
        href: "mailto:hej@optipeople.dk",
        description: "Send en mail til hej@optipeople.dk.",
      },
      {
        title: "Kontakt teamet",
        href: "/contact",
        description: "Fortæl os hvad du har brug for, så vender vi tilbage.",
      },
      {
        title: "Mød teamet",
        href: "/resources/people",
        description: "Se hvem der arbejder med salg, projekter og teknologi.",
      },
    ],
  },
  "/privacy": {
    title: "Privatlivspolitik | OptiPeople",
    description: "Privatliv og databeskyttelse hos OptiPeople.",
    eyebrow: "Juridisk",
    headline: "Privatlivspolitik",
    body:
      "Vi behandler personoplysninger ansvarligt og kun til relevante formål som kontakt, kundedialog og drift af vores services. Kontakt hej@optipeople.dk for spørgsmål om data og privatliv.",
    links: [],
  },
  "/terms": {
    title: "Vilkår | OptiPeople",
    description: "Vilkår for brug af OptiPeople website og services.",
    eyebrow: "Juridisk",
    headline: "Vilkår",
    body:
      "Denne side samler de overordnede vilkår for brug af OptiPeople website. Konkrete kundeforhold reguleres af den aftale, der er indgået med OptiPeople.",
    links: [],
  },
} as const

export function generateStaticParams() {
  return staticPaths.map((path) => ({
    slug: path === "/" ? [] : path.slice(1).split("/"),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = normalizeRoute((await params).slug)

  if (route === "/") {
    return buildMetadata({
      title: "OptiPeople | Digital driftsplatform til produktionsvirksomheder",
      description:
        "Forbind maskiner, følg produktion i realtid, forbedr OEE og gør driftsdata til handling.",
      path: "/",
      locale: "da",
    })
  }

  if (route.startsWith("/blog/")) {
    const slug = route.replace("/blog/", "")
    const post = getPostBySlug(slug)

    if (post) {
      return buildMetadata({
        title: `${post.title} | OptiPeople`,
        description: post.summary,
        path: `/blog/${slug}`,
        image: post.image,
        type: "article",
        locale: "da",
      })
    }
  }

  if (route === "/blog") {
    return buildMetadata({
      title: "Blog | OptiPeople",
      description:
        "Læs artikler om produktionseffektivitet, OEE, vedligehold og digital drift.",
      path: "/blog",
      locale: "da",
    })
  }

  if (route === "/cases") {
    return buildMetadata({
      title: "Cases | OptiPeople",
      description:
        "Se hvordan produktionsvirksomheder bruger OptiPeople og Opticloud til at forbedre OEE, oppetid og beslutninger.",
      path: "/cases",
      locale: "da",
    })
  }

  if (route === "/insights") {
    return buildMetadata({
      title: "Indsigter | OptiPeople",
      description:
        "Find artikler og cases om produktion, OEE, prediktivt vedligehold og digital drift.",
      path: "/insights",
      locale: "da",
    })
  }

  if (route === "/about") {
    return buildMetadata({
      title: "Om OptiPeople",
      description:
        "Mød teamet bag OptiPeople og se hvordan vi hjælper produktionsvirksomheder med at forbinde systemer og bruge driftsdata.",
      path: "/about",
      locale: "da",
    })
  }

  if (route === "/contact") {
    return buildMetadata({
      title: "Kontakt OptiPeople",
      description:
        "Kontakt OptiPeople for en snak om produktion, OEE, automation, data og digital drift.",
      path: "/contact",
      locale: "da",
    })
  }

  if (route === "/newsletter") {
    return buildMetadata({
      title: "OptiPeople nyhedsbrev",
      description:
        "Tilmeld dig praktiske opdateringer om produktionsdata, OEE, vedligehold og digital drift.",
      path: "/newsletter",
      locale: "da",
    })
  }

  if (route === "/resources/people" || route === "/people") {
    return buildMetadata({
      title: "Mennesker | OptiPeople",
      description: "Mød OptiPeople-teamet.",
      path: "/resources/people",
      locale: "da",
    })
  }

  if (route.startsWith("/ai/")) {
    const cap = getAiCapability(route.replace("/ai/", ""))
    if (cap) {
      return buildMetadata({
        title: cap.content.da.metaTitle,
        description: cap.content.da.metaDescription,
        path: cap.href,
        locale: "da",
      })
    }
  }

  const standard = standardPages[route]
  if (standard) {
    return buildMetadata({
      title: standard.title,
      description: standard.description,
      path: standard.path,
      locale: "da",
    })
  }

  const feature = featurePages[route]
  if (feature) {
    return buildMetadata({
      title: feature.title,
      description: feature.description,
      path: feature.path,
      locale: "da",
    })
  }

  const simple = simplePages[route as keyof typeof simplePages]
  if (simple) {
    return buildMetadata({
      title: simple.title,
      description: simple.description,
      path: route,
      locale: "da",
    })
  }

  return buildMetadata({
    title: "Siden findes ikke | OptiPeople",
    description: "Den ønskede side kunne ikke findes.",
    path: route,
    locale: "da",
  })
}

export default async function DanishPage({ params, searchParams }: Props) {
  const route = normalizeRoute((await params).slug)
  const query = await searchParams

  if (route === "/") return <DanishHomePage />
  if (route === "/blog") return <DanishArchive type="blog" page={query.page} />
  if (route === "/cases") return <DanishArchive type="cases" page={query.page} />
  if (route === "/insights") return <DanishInsightsPage />
  if (route === "/about") return <DanishAboutPage />
  if (route === "/contact") return <DanishContactPage />
  if (route === "/newsletter") return <DanishNewsletterPage />
  if (route === "/resources/people" || route === "/people") {
    return <DanishPeoplePage />
  }
  if (route === "/privacy") return <DanishPrivacyPage />
  if (route === "/terms") return <DanishTermsPage />
  if (route === "/videos") return <DanishVideosPage />

  if (route.startsWith("/blog/")) {
    return <DanishBlogPostPage slug={route.replace("/blog/", "")} />
  }

  if (route.startsWith("/ai/")) {
    const slug = route.replace("/ai/", "")
    if (getAiCapability(slug)) return <AiStackPage slug={slug} locale="da" />
  }

  const standard = standardPages[route]
  if (standard) return <StandardPageTemplate page={standard} />

  const feature = featurePages[route]
  if (feature) return <FeaturePageTemplate page={feature} />

  const simple = simplePages[route as keyof typeof simplePages]
  if (simple) return <SimpleLandingPage page={simple} />

  notFound()
}

function normalizeRoute(slug?: string[]) {
  if (!slug || slug.length === 0) return "/"
  return `/${slug.join("/")}`
}

function DanishHomePage() {
  return (
    <main>
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-5xl px-8 py-22">
          <h1 className="text-center text-6xl font-light text-foreground">
            Digital driftsplatform
          </h1>
          <p className="mt-6 text-center text-xl text-foreground/70">
            Én platform til produktion, performance og forbundne driftsteams.
          </p>
        </div>

        <SlideCarousel
          slides={homeTabSlides}
          navigationType={["tabs"]}
          ariaLabel="Løsninger til teams"
          className="mt-8"
        />
      </section>

      <section className="py-12 lg:py-28">
        <div className="pl-[var(--edge)] pr-6 lg:pr-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            OptiPeople Platform
          </p>
          <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
            Alt du behøver for at drive produktion.
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Fra live OEE til vedligehold, kvalitet og rapportering — én forbundet platform til hele din drift.
          </p>
        </div>

        <SlideCarousel
          slides={homeFeatureSlides}
          navigationType={["arrows"]}
          ariaLabel="Platformfunktioner"
          className="mt-8"
        />
      </section>

      <section className="py-12 lg:py-28">
        <div className="pl-[var(--edge)] pr-6 lg:pr-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {aiStackSliderCopy.da.eyebrow}
          </p>
          <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
            {aiStackSliderCopy.da.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {aiStackSliderCopy.da.subtitle}
          </p>
        </div>

        <SlideCarousel
          slides={aiStackSlides("da")}
          navigationType={["arrows"]}
          ariaLabel="AI-funktioner"
          className="mt-8"
        />
      </section>

      <LogoWall logos={customerLogos} title="Brugt af industriledere" />

      <section className="py-12 lg:py-28">
        <VideoCarousel videos={customerVideos} title="Videohistorier" />
      </section>

      <TestimonialCarousel
        testimonials={testimonials}
        title="Det siger kunderne"
        className="py-12 lg:py-28"
      />

      <PlatformFlower locale="da" />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-0">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Cases
              </p>
              <h2 className="text-4xl font-light tracking-tight text-foreground lg:text-5xl">
                Historier fra virkeligheden
              </h2>
            </div>
            <Link
              href={da("/cases")}
              className="group hidden items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground sm:flex"
            >
              Se alle
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 lg:gap-12">
            {getLatestPostsByCategory("Cases", 4).slice(0, 1).map((post) => (
              <Link
                key={post.slug}
                href={da(`/blog/${post.slug}`)}
                className="group block"
              >
                <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--gray-2)] bg-muted shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)] lg:aspect-[16/10]">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-foreground/80 lg:text-3xl">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 pt-2 text-sm font-medium text-foreground/70">
                      Læs case
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            <div className="grid gap-8 border-t border-border/50 pt-8 sm:grid-cols-3 lg:gap-12">
              {getLatestPostsByCategory("Cases", 4).slice(1, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={da(`/blog/${post.slug}`)}
                  className="group block"
                >
                  <article className="space-y-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--gray-2)] bg-muted shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <h3 className="line-clamp-2 text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
                      {post.title}
                    </h3>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function StandardPageTemplate({ page }: { page: StandardPage }) {
  return (
    <main className="min-h-screen">
      <section
        className={`relative overflow-hidden px-6 pb-16 pt-16 sm:pt-24 lg:px-8 lg:pb-24 ${
          page.darkHero ? "bg-primary" : ""
        }`}
      >
        {page.darkHero && (
          <>
            <Image
              src="/images/default-hero-bg.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </>
        )}
        <div
          className={`relative mx-auto max-w-4xl text-center ${
            page.darkHero ? "text-white" : ""
          }`}
        >
          <p
            className={`mb-4 text-sm font-medium ${
              page.darkHero ? "text-white/90" : "text-primary"
            }`}
          >
            {page.eyebrow}
          </p>
          <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {page.heroTitle}
          </h1>
          <p
            className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl ${
              page.darkHero ? "text-white/80" : "text-muted-foreground"
            }`}
          >
            {page.heroBody}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={da("/contact")}>{page.primaryLabel ?? "Book en demo"}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={
                page.darkHero
                  ? "border-white/30 bg-white/10 text-white shadow-none hover:bg-white/20 hover:text-white"
                  : ""
              }
            >
              <Link href="#capabilities">Se muligheder</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
            {page.introTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {page.introBody}
          </p>
        </div>
      </section>

      <section
        id="capabilities"
        className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-light lg:text-4xl">
            {page.capabilitiesTitle}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {page.features.map((feature) => (
              <div key={feature.title} className="space-y-3">
                <div className="w-fit rounded-xl bg-primary/10 p-2.5">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
              {page.visualTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {page.visualBody}
            </p>
          </div>
          <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-4xl border border-[var(--gray-2)] bg-muted/30 shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            {page.visualImage ? (
              <Image
                src={page.visualImage}
                alt={page.visualAlt ?? page.visualTitle}
                fill
                className="object-cover"
              />
            ) : (
              <p className="text-sm text-muted-foreground">Produktvisning</p>
            )}
          </div>
        </div>
      </section>

      <MetricsSection title={page.metricsTitle} metrics={page.metrics} />

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-3xl font-light lg:text-4xl">
            {page.stepsTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3 lg:gap-12">
            {page.steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mb-4 text-4xl font-extralight text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-medium">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function FeaturePageTemplate({ page }: { page: FeaturePage }) {
  return (
    <main className="min-h-screen">
      <section className="px-6 pb-16 pt-16 sm:pt-24 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href={da(page.parentHref)}
              className="transition-colors hover:text-foreground"
            >
              {page.parentLabel}
            </Link>
            <span>/</span>
            <span className="text-foreground">{page.eyebrow}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {page.eyebrow}
              </p>
              <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">
                {page.heroBody}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={da("/contact")}>Book en demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#capabilities">Se hvordan</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
              <Image
                src={page.heroImage}
                alt={page.heroImageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
            {page.valueTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {page.valueBody}
          </p>
        </div>
      </section>

      <section
        id="capabilities"
        className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center lg:mb-20">
            <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
              {page.capabilitiesTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {page.capabilitiesBody}
            </p>
          </div>
          <div className="space-y-16 lg:space-y-24">
            {page.capabilities.map((capability, i) => (
              <div
                key={capability.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <h3 className="text-2xl font-light tracking-tight lg:text-3xl">
                    {capability.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    {capability.description}
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                  <Image
                    src={capability.image}
                    alt={capability.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.showcaseTitle && page.showcaseBody && page.showcaseImage && (
        <section className="px-6 py-20 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center lg:mb-16">
              <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
                {page.showcaseTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {page.showcaseBody}
              </p>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-4xl border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
              <Image
                src={page.showcaseImage}
                alt={page.showcaseAlt ?? page.showcaseTitle}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <MetricsSection title="Typiske resultater" metrics={page.metrics} />

      <section className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-light lg:text-3xl">
            Relaterede funktioner
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.related.map((feature) => (
              <Link
                key={feature.title}
                href={da(feature.href)}
                className="group block rounded-xl border border-border/50 bg-background p-6 transition-colors hover:border-border"
              >
                <h3 className="text-lg font-medium transition-colors group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function MetricsSection({
  title,
  metrics,
}: {
  title: string
  metrics: Metric[]
}) {
  return (
    <section className="px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-16 text-center text-3xl font-light lg:text-4xl">
          {title}
        </h2>
        <div className="grid gap-8 text-center sm:grid-cols-3 lg:gap-12">
          {metrics.map((item) => (
            <div key={item.label}>
              <p className="text-5xl font-extralight tracking-tight text-primary lg:text-6xl">
                {item.metric}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SimpleLandingPage({
  page,
}: {
  page: (typeof simplePages)[keyof typeof simplePages]
}) {
  return (
    <main className="min-h-screen px-6 pb-16 pt-16 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {page.eyebrow}
        </p>
        <h1 className="text-4xl font-extralight leading-tight tracking-tight text-[var(--gray-10)]">
          {page.headline}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {page.body}
        </p>

        {page.links.length > 0 && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {page.links.map((link) => (
              <Link
                key={link.href}
                href={da(link.href)}
                className="group rounded-lg border border-border/60 p-6 transition-colors hover:border-primary/50"
              >
                <h2 className="flex items-center gap-2 text-lg font-medium">
                  {link.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        )}

        {"note" in page && page.note && (
          <div className="mt-12 rounded-lg bg-muted/40 p-8 text-center text-muted-foreground">
            {page.note}
          </div>
        )}
      </div>
    </main>
  )
}

function DanishVideosPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Videoer
          </p>
          <h1 className="text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl">
            Se Opticloud i aktion
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Se produktdemoer, kundehistorier og guides, der viser hvordan
            Opticloud fungerer på fabriksgulvet.
          </p>
        </div>
      </section>
      <section className="py-12 lg:py-24">
        <VideoCarousel videos={customerVideos} title="Videohistorier" />
      </section>
    </main>
  )
}

const LegalProse = "mx-auto max-w-3xl prose prose-slate prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-p:leading-relaxed prose-a:text-foreground"

function DanishLegalShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen">
      <section className="pt-16 sm:pt-24 pb-10 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Juridisk
          </p>
          <h1 className="text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base text-muted-foreground">
            Senest opdateret: 28. juni 2026
          </p>
        </div>
      </section>
      <section className="pb-20 lg:pb-28 px-6 lg:px-8">
        <div className={LegalProse}>{children}</div>
      </section>
    </main>
  )
}

function DanishPrivacyPage() {
  return (
    <DanishLegalShell title="Privatlivspolitik">
      <p>
        OptiPeople ApS (&quot;OptiPeople&quot;, &quot;vi&quot;, &quot;os&quot;) respekterer dit
        privatliv og beskytter dine personoplysninger. Denne politik forklarer,
        hvilke data vi indsamler via dette website, hvorfor vi indsamler dem, og
        hvilke rettigheder du har efter databeskyttelsesforordningen (GDPR) og
        dansk databeskyttelseslovgivning.
      </p>
      <h2>Dataansvarlig</h2>
      <p>
        OptiPeople ApS, Sønderskovvej 17, 8362 Hørning (CVR 32883532) er
        dataansvarlig for personoplysninger indsamlet via dette website. Du kan
        kontakte os på <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a>{" "}
        eller +45 23 74 47 05.
      </p>
      <h2>Hvad vi indsamler og hvorfor</h2>
      <p>Vi indsamler kun de personoplysninger, du selv giver os:</p>
      <ul>
        <li>
          <strong>Kontakthenvendelser.</strong> Når du udfylder
          kontaktformularen, behandler vi dit navn, din e-mail, dit telefonnummer
          (valgfrit) og din besked, så vi kan svare dig. Behandlingsgrundlaget er
          vores legitime interesse i at besvare dig og tage skridt forud for en
          eventuel aftale (GDPR art. 6, stk. 1, litra b og f).
        </li>
        <li>
          <strong>Nyhedsbrev.</strong> Hvis du tilmelder dig vores nyhedsbrev,
          behandler vi dit navn, din virksomhed og din e-mail for at sende dig de
          opdateringer, du har samtykket til. Behandlingsgrundlaget er dit
          samtykke (GDPR art. 6, stk. 1, litra a), som du til enhver tid kan
          trække tilbage.
        </li>
      </ul>
      <h2>Hvordan dine data behandles</h2>
      <p>
        Formularer håndteres gennem vores CRM-leverandør (monday.com), og vores
        website hostes af Vercel. Disse leverandører fungerer som databehandlere
        for os under databehandleraftaler og behandler data inden for EU/EØS
        eller under passende garantier ved tredjelandsoverførsler.
      </p>
      <h2>Opbevaring</h2>
      <p>
        Vi opbevarer kun personoplysninger, så længe det er nødvendigt til
        formålet — typisk under vores dialog med dig og et eventuelt efterfølgende
        kundeforhold — hvorefter de slettes eller anonymiseres i
        overensstemmelse med gældende bogføringskrav.
      </p>
      <h2>Cookies</h2>
      <p>
        Dette website bruger kun den strengt nødvendige tekniske lagring, der
        kræves for, at sitet kan fungere. Vi bruger ikke reklame- eller
        sporingscookies. Ændres dette, opdaterer vi politikken og indhenter
        samtykke, hvor det kræves.
      </p>
      <h2>Dine rettigheder</h2>
      <p>
        Du har ret til at anmode om indsigt i, berigtigelse eller sletning af
        dine personoplysninger, til at gøre indsigelse mod eller begrænse
        behandlingen samt til dataportabilitet. Hvor behandlingen er baseret på
        samtykke, kan du til enhver tid trække det tilbage. Kontakt{" "}
        <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a> for at gøre brug
        af dine rettigheder.
      </p>
      <p>
        Du har også ret til at klage til Datatilsynet (
        <a
          href="https://www.datatilsynet.dk"
          target="_blank"
          rel="noopener noreferrer"
        >
          datatilsynet.dk
        </a>
        ), hvis du mener, at dine data behandles ulovligt.
      </p>
      <h2>Ændringer</h2>
      <p>
        Vi kan opdatere denne privatlivspolitik fra tid til anden. Den gældende
        version findes altid på denne side med datoen for seneste revision angivet
        ovenfor.
      </p>
    </DanishLegalShell>
  )
}

function DanishTermsPage() {
  return (
    <DanishLegalShell title="Vilkår">
      <p>
        Disse vilkår gælder for din brug af OptiPeople ApS&apos; website på dette
        domæne. Ved at tilgå eller bruge sitet accepterer du vilkårene. Er du
        ikke enig, bedes du ikke bruge sitet.
      </p>
      <h2>Om os</h2>
      <p>
        Dette website drives af OptiPeople ApS, Sønderskovvej 17, 8362 Hørning
        (CVR 32883532). Du kan kontakte os på{" "}
        <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a>.
      </p>
      <h2>Brug af websitet</h2>
      <p>
        Indholdet på sitet stilles til rådighed som generel information om
        OptiPeople og Opticloud-platformen. Du må se og dele det til lovlige,
        ikke-kommercielle formål. Du må ikke misbruge sitet, forsøge at opnå
        uautoriseret adgang eller forstyrre driften.
      </p>
      <h2>Immaterielle rettigheder</h2>
      <p>
        Alle varemærker, logoer, tekster, grafik og øvrigt materiale på sitet
        tilhører OptiPeople ApS eller selskabets licensgivere og er beskyttet af
        gældende immaterialret. Materialet må ikke gengives eller genbruges uden
        vores forudgående skriftlige tilladelse.
      </p>
      <h2>Ingen garanti</h2>
      <p>
        Websitet og dets indhold stilles til rådighed, som det er og forefindes,
        uden nogen form for garanti. Vi bestræber os på at holde informationen
        korrekt og opdateret, men garanterer ikke, at den er fuldstændig, aktuel
        eller fejlfri.
      </p>
      <h2>Ansvarsbegrænsning</h2>
      <p>
        I det omfang loven tillader det, er OptiPeople ikke ansvarlig for
        indirekte tab eller følgeskader, der opstår som følge af din brug af —
        eller manglende mulighed for at bruge — dette website. Intet i disse
        vilkår begrænser ansvar, der ikke kan fraskrives efter dansk ret.
      </p>
      <h2>Produkter og services</h2>
      <p>
        Ethvert kommercielt forhold vedrørende OptiPeoples produkter eller
        services reguleres af den separate aftale, der indgås mellem dig og
        OptiPeople. Disse vilkår for websitet udgør ikke en del af den aftale.
      </p>
      <h2>Lovvalg</h2>
      <p>
        Disse vilkår er underlagt dansk ret, og eventuelle tvister afgøres af de
        danske domstole.
      </p>
      <h2>Ændringer</h2>
      <p>
        Vi kan opdatere disse vilkår fra tid til anden. Den gældende version
        findes altid på denne side med datoen for seneste revision angivet
        ovenfor.
      </p>
    </DanishLegalShell>
  )
}

function DanishArchive({
  type,
  page,
}: {
  type: "blog" | "cases"
  page?: string
}) {
  const currentPage = Math.max(1, parseInt(page || "1", 10))
  const isCases = type === "cases"
  const posts = getPostsByCategory(isCases ? "Cases" : "Insights")

  return (
    <main>
      <PostArchive
        posts={posts}
        basePath={isCases ? "/da/cases" : "/da/blog"}
        postBasePath="/da/blog"
        backHref="/da/insights"
        backLabel="Tilbage til indsigter"
        eyebrow={isCases ? "Cases" : "Blog"}
        title={
          isCases
            ? "Virkelige resultater fra virkelige fabrikker"
            : "Artikler og indsigter"
        }
        emptyTitle={isCases ? "Ingen cases endnu" : "Ingen blogindlæg endnu"}
        emptyBody={
          isCases
            ? "Cases vises her, når kundehistorier bliver publiceret."
            : "Artikler og indsigter vises her, når de bliver publiceret."
        }
        ctaLabel={isCases ? "Læs case" : "Læs artikel"}
        currentPage={currentPage}
        paginationLabel="Sidenavigation"
        previousLabel="Forrige"
        nextLabel="Næste"
      />
    </main>
  )
}

function DanishInsightsPage() {
  const cards = [
    {
      title: "Blogindlæg",
      href: "/blog",
      description:
        "Artikler, forklaringer og praktiske perspektiver om produktion, data og digital drift.",
      icon: FileText,
      cta: "Se blogindlæg",
      category: "Insights",
      accentClass: "bg-[linear-gradient(135deg,#f4efe6,#f8f6f1)]",
      badgeClass: "bg-[#efe1cf] text-[#8c5a2b]",
      buttonClass:
        "border-[#c96f4a]/20 bg-[#c96f4a] text-[#2f160a] hover:bg-[#b85f3a]",
      previewClass: "bg-white/80 hover:bg-white",
    },
    {
      title: "Cases",
      href: "/cases",
      description:
        "Kundehistorier og konkrete eksempler på hvordan fabrikker bruger Opticloud til output, oppetid og beslutninger.",
      icon: Factory,
      cta: "Se cases",
      category: "Cases",
      accentClass: "bg-[linear-gradient(135deg,#e7efe8,#f5f7f3)]",
      badgeClass: "bg-[#d7e7d8] text-[#234131]",
      buttonClass:
        "border-[#234131]/20 bg-[#234131] text-[#eef5ef] hover:bg-[#1b3327]",
      previewClass: "bg-[#f7faf7] hover:bg-[#eef5ef]",
    },
  ] as const

  return (
    <main>
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Indsigter
            </p>
            <h1 className="text-4xl font-light tracking-tight text-foreground lg:text-5xl">
              Ét sted til ideer og beviser
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Brug bloggen til perspektiver og praktisk viden. Brug cases til konkrete kundeeffekter og implementeringseksempler.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {cards.map((card) => {
              const posts = getPostsByCategory(card.category)
              const latest = getLatestPostsByCategory(card.category, 2)
              const Icon = card.icon

              return (
                <article
                  key={card.href}
                  className={`overflow-hidden rounded-[2rem] border border-border/60 ${card.accentClass}`}
                >
                  <div className="border-b border-black/5 px-8 py-6 lg:px-10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full ${card.badgeClass}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium tracking-wide text-foreground/80">
                            {card.title}
                          </p>
                          <p className="text-sm text-foreground/55">
                            {posts.length} {posts.length === 1 ? "indlæg" : "indlæg"}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={da(card.href)}
                        className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${card.buttonClass}`}
                      >
                        {card.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="px-8 py-8 lg:px-10 lg:py-10">
                    <h2 className="text-3xl font-light tracking-tight text-foreground">
                      {card.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
                      {card.description}
                    </p>

                    {latest.length > 0 && (
                      <div className="mt-8">
                        <p className="text-sm font-medium uppercase tracking-[0.14em] text-foreground/45">
                          Eksempler
                        </p>
                        <div className="mt-5 space-y-4">
                          {latest.map((post) => (
                            <Link
                              key={post.slug}
                              href={da(`/blog/${post.slug}`)}
                              className={`group grid grid-cols-[104px_1fr] gap-4 rounded-[1.5rem] border border-black/5 p-3 transition-colors ${card.previewClass}`}
                            >
                              <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-black/5">
                                {post.image ? (
                                  <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center bg-black/5 text-foreground/45">
                                    <Icon className="h-5 w-5" />
                                  </div>
                                )}
                              </div>

                              <div className="flex min-w-0 flex-col justify-center">
                                <p className="text-xs uppercase tracking-[0.12em] text-foreground/45">
                                  {post.date}
                                </p>
                                <p className="mt-2 line-clamp-2 text-base font-medium leading-snug text-foreground/85 transition-colors group-hover:text-foreground">
                                  {post.title}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function DanishAboutPage() {
  const priorityByRole: Record<string, number> = {
    "Chief Executive Officer": 1,
    "Chief Technology Officer": 2,
    "Head of Projects": 3,
    "Sales Engineer": 4,
    "Technical Consultant": 5,
    "BI Consultant": 6,
    "IoT Engineer": 7,
    "Marketing Project Manager": 8,
  }
  const team = [...employees].sort((a, b) => {
    const aPriority = priorityByRole[a.role] ?? 999
    const bPriority = priorityByRole[b.role] ?? 999
    return aPriority === bPriority
      ? a.name.localeCompare(b.name)
      : aPriority - bPriority
  })
  const stats = [
    { metric: `${employees.length}`, label: "Teammedlemmer" },
    { metric: `${new Set(employees.map((employee) => employee.team)).size}`, label: "Fagområder" },
    { metric: `${new Set(employees.map((employee) => employee.location)).size}`, label: "Lokationer" },
    { metric: "2024", label: "Fælles OptiPeople-rejse" },
  ]
  const values = [
    {
      title: "Start med problemet",
      description:
        "Vi starter ikke med teknologi. Vi starter med at forstå hvordan driften faktisk fungerer.",
    },
    {
      title: "Gør det brugbart",
      description:
        "Software der ikke bruges på gulvet, virker ikke. Derfor designer vi til mennesker i produktionen.",
    },
    {
      title: "Tag ansvar for resultatet",
      description:
        "Vi afleverer ikke bare et system. Vi bliver involveret i rollout, adoption og forbedring.",
    },
    {
      title: "Skab tillid med data",
      description:
        "Beslutninger skal bygge på fakta, også beslutningen om at arbejde med os.",
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="px-6 pb-16 pt-16 sm:pt-24 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Om os
          </p>
          <h1 className="text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl">
            Vi får industriel drift til at fungere
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            OptiPeople bygger software, forbinder systemer og hjælper industrielle teams med at gøre data til bedre beslutninger fra fabriksgulv til ledelse.
          </p>
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-light tracking-tight lg:text-4xl">
            Bygget til rummet mellem shopfloor og ERP
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            De fleste fabrikker har maskiner, der producerer data, og ERP-systemer der har brug for den. OptiPeople udfylder mellemrummet med realtidsdata, synlighed og handlinger, der forbedrer performance.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-3xl font-light tracking-tight lg:text-4xl">
            Sådan arbejder vi
          </h2>
          <div className="space-y-12">
            {values.map((value) => (
              <div
                key={value.title}
                className="grid gap-4 sm:grid-cols-[200px_1fr] sm:gap-8"
              >
                <h3 className="text-lg font-medium">{value.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-3xl font-light tracking-tight lg:text-4xl">
            Teamet
          </h2>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <div key={person.slug}>
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  />
                </div>
                <h3 className="text-base font-medium">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MetricsSection title="OptiPeople i tal" metrics={stats} />
    </main>
  )
}

function DanishPeoplePage() {
  return (
    <main className="min-h-screen px-6 pb-16 pt-16 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Mennesker
        </p>
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
          Mød OptiPeople
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Et lille, praktisk team med erfaring i software, projekter, BI, IoT, salg og industriel drift.
        </p>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map((person) => (
            <article key={person.slug}>
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
              </div>
              <h2 className="text-base font-medium">{person.name}</h2>
              <p className="text-sm text-muted-foreground">{person.role}</p>
              <a
                href={`mailto:${person.email}`}
                className="mt-2 inline-flex text-sm text-primary hover:underline"
              >
                {person.email}
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

function DanishContactPage() {
  return (
    <>
      <section className="px-6 pb-16 pt-16 sm:pt-24 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Kontakt
            </p>
            <h1 className="text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl">
              Lad os tale om jeres drift
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Fortæl os om jeres situation, så vender vi tilbage inden for én arbejdsdag.
            </p>
          </div>
          <DanishContactForm />
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-3 lg:gap-12">
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">Email</h3>
              <a
                href="mailto:hej@optipeople.dk"
                className="text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                hej@optipeople.dk
              </a>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">Telefon</h3>
              <a
                href="tel:+4523744705"
                className="text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                +45 23 74 47 05
              </a>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">Kontor</h3>
              <p className="text-base text-muted-foreground">
                Sønderskovvej 17
                <br />
                8362 Hørning, Danmark
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function DanishNewsletterPage() {
  const topics = [
    {
      title: "Produktionsperformance",
      description:
        "Find tab, forbedr OEE, og hold forbedringsarbejdet forankret i rigtige produktionsdata.",
      icon: BarChart3,
    },
    {
      title: "Forbundne fabrikker",
      description:
        "Maskindata, integrationer og dashboards — systemerne, der gør driften lettere at styre.",
      icon: Factory,
    },
    {
      title: "Vedligehold & oppetid",
      description:
        "Planlagt vedligehold, tilstande og de små vaner, der stille beskytter oppetiden.",
      icon: Wrench,
    },
  ] as const

  return (
    <main className="relative overflow-hidden">
      {/* Ambient background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(80%_60%_at_50%_-10%,var(--green-light1)_0%,transparent_60%)] opacity-60"
      />

      <section className="px-6 pt-20 pb-16 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-border/60 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
            Nyhedsbrev
          </span>
          <h1 className="mt-6 text-balance text-4xl font-light leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Få praktiske ideer til bedre produktion
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Korte opdateringer om produktionsdata, OEE, vedligehold, AI og
            digital drift. Ingen støj — kun brugbare ideer fra gulvet.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-lg">
          <NewsletterForm locale="da" />
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Hvad du kan forvente
          </p>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {topics.map((topic) => {
              const Icon = topic.icon

              return (
                <div key={topic.title} className="text-center sm:text-left">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--green-light1)] text-[var(--green-dark3)] sm:mx-0">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-[linear-gradient(135deg,#f4efe6,#f8f6f1)] p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_24px_60px_-28px_rgba(0,0,0,0.22)] sm:p-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-border/60">
              <Image
                src="/images/dashboard2.png"
                alt="OptiPeople produktionsdashboard"
                width={1600}
                height={1000}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 64rem, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function DanishBlogPostPage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const isCaseStudy = post.category === "Cases"
  const backHref = isCaseStudy ? "/da/cases" : "/da/blog"
  const backLabel = isCaseStudy ? "Tilbage til cases" : "Tilbage til blog"
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": isCaseStudy ? "Article" : "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "OptiPeople",
    },
    mainEntityOfPage: absoluteUrl(`/da/blog/${slug}`),
    articleSection: post.category,
    ...(post.image ? { image: [absoluteUrl(post.image)] } : {}),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <article className="py-12 lg:py-16">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href={backHref}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backLabel}
              </Link>
            </Button>

            <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border/60 bg-[linear-gradient(135deg,#f4efe6,#f8f6f1)]">
              <div className="px-8 py-10 lg:px-12 lg:py-14">
                <div className="max-w-3xl">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-foreground/55">
                    {isCaseStudy ? "Case" : "Indsigt"}
                  </p>
                  <h1 className="mt-4 text-4xl font-light tracking-tight text-foreground lg:text-6xl">
                    {post.title}
                  </h1>
                  <p className="mt-6 text-sm text-foreground/55">
                    {post.date} &middot; {post.author}
                  </p>
                </div>
              </div>

              {post.image && (
                <div className="px-8 pb-8 lg:px-12 lg:pb-12">
                  <div className="overflow-hidden rounded-[1.75rem] border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={1200}
                      height={675}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
              <aside className="hidden lg:block">
                <TableOfContents headings={headings} />
              </aside>
              <div className="min-w-0">
                <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-primary prose-blockquote:text-foreground/70 prose-li:text-foreground/80 prose-th:text-foreground prose-td:text-foreground/80">
                  <MarkdownContent content={post.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

type Heading = {
  text: string
  slug: string
  level: number
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/(^-|-$)/g, "")
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = []
  const lines = content.replace(/\r\n/g, "\n").split("\n")

  for (const line of lines) {
    const match = line.trim().match(/^(##)\s+(.+)$/)
    if (match) {
      const text = match[2].trim()
      headings.push({ text, slug: slugify(text), level: 2 })
    }
  }

  return headings
}

function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Indhold
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => {
          const text = String(children)
          return <h1 id={slugify(text)} className="scroll-mt-24">{children}</h1>
        },
        h2: ({ children }) => {
          const text = String(children)
          return <h2 id={slugify(text)} className="scroll-mt-24">{children}</h2>
        },
        h3: ({ children }) => {
          const text = String(children)
          return <h3 id={slugify(text)} className="scroll-mt-24">{children}</h3>
        },
        a: ({ href, children }) => (
          <a href={href} className="text-primary hover:underline">{children}</a>
        ),
        img: ({ src, alt }) => {
          const resolvedSrc = resolveImagePath(src)
          if (!resolvedSrc) return null

          return (
            <Image
              src={resolvedSrc}
              alt={alt || ""}
              width={800}
              height={450}
              className="my-6 rounded-lg"
            />
          )
        },
        pre: ({ children }) => (
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">{children}</pre>
        ),
        code: ({ className, children }) => {
          const isInline = !className
          if (isInline) {
            return <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{children}</code>
          }
          return <code className={className}>{children}</code>
        },
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">{children}</th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-4 py-2">{children}</td>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-4 border-primary pl-4 italic">{children}</blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
