import { SlideCarousel, type SlideData } from "@/components/slide-carousel"
import { aiStackSlides, aiStackSliderCopy } from "@/lib/ai-stack"
import { LogoWall, type LogoItem } from "@/components/logo-wall"
import { VideoCarousel, type VideoData } from "@/components/video-carousel"
import { TestimonialCarousel, type Testimonial } from "@/components/testimonial-carousel"
import { PlatformFlower } from "@/components/platform-flower"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getPostBySlug } from "@/lib/blog-data"
import { ArrowRight } from "lucide-react"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "OptiPeople | Digital operations platform for manufacturers",
  description:
    "Connect machines, track OEE in real time, automate reporting, and give production teams the data they need to improve output and uptime.",
  path: "/",
  keywords: [
    "manufacturing software",
    "OEE tracking",
    "production monitoring",
    "MES platform",
    "industrial analytics",
  ],
})

type CaseCard = {
  company: string
  /** Headline outcome, rendered large. Use → for before/after. */
  value: string
  /** Short unit/measure beneath the value. */
  unit: string
  /** One-line context. */
  note: string
  slug: string
  span: "wide" | "narrow"
  kind: "chart" | "image"
  /** Surface tone for chart cards. */
  tone?: "sage" | "dark"
  /** Before/after data for the mini comparison chart. */
  chart?: { before: number; after: number; beforeLabel: string; afterLabel: string }
}

const caseCards: CaseCard[] = [
  {
    company: "Fiberline Composites",
    value: "−41%",
    unit: "unnecessary stops",
    note: "Fewer machine stops — and 6% less time lost per stop.",
    slug: "konkurrencekraft-og-tempo-pa-digital-transformation",
    span: "wide",
    kind: "chart",
    tone: "sage",
    chart: { before: 100, after: 59, beforeLabel: "Before", afterLabel: "After" },
  },
  {
    company: "Confidential plant",
    value: "21→41%",
    unit: "OEE",
    note: "Output nearly doubled with data-driven operation.",
    slug: "fra-data-til-effektivitet",
    span: "narrow",
    kind: "chart",
    tone: "dark",
    chart: { before: 21, after: 41, beforeLabel: "21%", afterLabel: "41%" },
  },
  {
    company: "Danpres",
    value: "−50%",
    unit: "tool repair time",
    note: "Capacity released inside the existing schedule.",
    slug: "danpres-boosting-production-by-reducing-tool-repair-time-by-50",
    span: "narrow",
    kind: "image",
  },
  {
    company: "Kvik",
    value: "−50%",
    unit: "service hours",
    note: "Usage-based maintenance — plus 40 extra production hours a year.",
    slug: "kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud",
    span: "wide",
    kind: "image",
  },
  {
    company: "Dansk Træemballage",
    value: "+5%",
    unit: "OEE in three months",
    note: "Reached on the very first connected production line.",
    slug: "dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud",
    span: "wide",
    kind: "image",
  },
  {
    company: "DFI Geisler",
    value: "+5%",
    unit: "productivity",
    note: "Sustained across two years and seven machines.",
    slug: "dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights",
    span: "narrow",
    kind: "image",
  },
]

/** Minimal before/after bar chart, hand-built for the results cards. */
function ComparisonBars({
  before,
  after,
  beforeLabel,
  afterLabel,
  tone,
}: {
  before: number
  after: number
  beforeLabel: string
  afterLabel: string
  tone: "sage" | "dark"
}) {
  const max = Math.max(before, after)
  const height = (v: number) => `${Math.max(10, Math.round((v / max) * 100))}%`
  const baseBar = tone === "dark" ? "bg-white/15" : "bg-black/[0.08]"
  const labelColor = tone === "dark" ? "text-white/50" : "text-black/45"
  const accent = tone === "dark" ? "var(--green-light2)" : "var(--green-system)"

  return (
    <div className="flex h-24 items-end gap-3">
      {[
        { v: before, label: beforeLabel, accent: false },
        { v: after, label: afterLabel, accent: true },
      ].map((bar) => (
        <div key={bar.label} className="flex h-full w-14 flex-col items-center">
          <div className="flex w-full flex-1 items-end">
            <div
              className={`w-full rounded-t-md ${bar.accent ? "" : baseBar}`}
              style={{ height: height(bar.v), background: bar.accent ? accent : undefined }}
            />
          </div>
          <span className={`mt-2 text-xs font-medium tabular-nums ${labelColor}`}>{bar.label}</span>
        </div>
      ))}
    </div>
  )
}

const tabSlides: SlideData[] = [
  {
    tab: "Manufacturing companies",
    title: "Know Your Factory. In Real Time.",
    description:
      "OptiPeople connects machines, processes, and people into one live operational view. See bottlenecks as they happen, act faster, and run production with facts instead of gut feeling.",
    imageSrc: "/images/dashboard2.png",
    imageAlt: "Opticloud manufacturing dashboard",
    primaryLabel: "Explore manufacturing solutions",
    primaryHref: "/solutions/manufacturing",
    bgColor: "bg-blue-50/0",
    layout: "overlay",
    overlay: "dark",
  },
  {
    tab: "OEMs and machine builders",
    title: "Turn Machines Into Platforms",
    description:
      "Opticloud lets you ship connected machines with built-in insight. Monitor performance in the field, support customers proactively, and build recurring digital services on top of your equipment.",
    imageSrc: "/images/report1.png",
    imageAlt: "Connected machines illustration",
    primaryLabel: "Learn About OEM Benefits",
    primaryHref: "/solutions/oems",
    bgColor: "bg-blue-50/0",
    layout: "overlay",
    overlay: "light",
  },
  {
    tab: "Service and aftermarket teams",
    title: "Fix Problems Before Customers Feel Them",
    description:
      "Give service teams real visibility into machine health and usage. Plan maintenance, reduce firefighting, and turn service into a competitive advantage.",
    imageSrc: "/images/backoffice1.png",
    imageAlt: "Service documentation illustration",
    primaryLabel: "Optimize Your Service Ops",
    primaryHref: "/solutions/service",
    bgColor: "bg-blue-50/0",
    layout: "overlay",
    overlay: "light",
  },
]

const verticalSlides: SlideData[] = [
  {
    title: "Production Efficiency",
    description:
      "See where production time is lost and why. Track OEE live and understand performance across shifts, lines, and machines based on real production data.",
    imageSrc: "/images/report-mockup4.png",
    imageAlt: "Production efficiency and OEE dashboard",
    primaryLabel: "See production efficiency",
    primaryHref: "/features/production-efficiency",
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#243b2f",
  },
  {
    title: "Stop Cause Registration",
    description:
      "Make downtime visible at the source. Operators register stops directly at the machine, giving you clean data you can actually act on.",
    imageSrc: "/images/Stop-Screen-Select.png",
    imageAlt: "Stop cause registration screen",
    primaryLabel: "View stop registration",
    primaryHref: "/features/stop-cause-registration",
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#163b40",
  },
  {
    title: "Maintenance and Tasks",
    description:
      "Plan and execute preventive maintenance based on usage and condition. Assign tasks, track completion, and reduce unplanned downtime.",
    imageSrc: "/images/taskapp2.png",
    imageAlt: "Maintenance task overview",
    primaryLabel: "Explore maintenance",
    primaryHref: "/features/maintenance-and-tasks",
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#1c1f26",
  },
  {
    title: "Quality Management",
    description:
      "Register quality data where it happens. Trace deviations back to machines, batches, and shifts and build accountability into production.",
    imageSrc: "/images/backoffice1.png",
    imageAlt: "Quality tracking and traceability",
    primaryLabel: "Improve quality",
    primaryHref: "/features/quality-management",
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#243b2f",
  },
  {
    title: "Analysis and Reporting",
    description:
      "Turn production data into clear reports on performance, losses, and cost drivers without spreadsheets or manual work.",
    imageSrc: "/images/report-mockup1.png",
    imageAlt: "Production reporting and analysis",
    primaryLabel: "See reporting",
    primaryHref: "/features/analysis-and-reporting",
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#163b40",
  },
  {
    title: "Energy and Telemetry",
    description:
      "Connect energy, vibration, flow, and temperature directly to production. Identify waste, anomalies, and optimization opportunities.",
    imageSrc: "/images/report-mockrup-3.png",
    imageAlt: "Energy and telemetry monitoring",
    primaryLabel: "Explore energy data",
    primaryHref: "/features/energy-and-telemetry",
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#1c1f26",
  },
  {
    title: "AI and Copilots",
    description:
      "Ask questions, detect patterns, and support decisions using AI trained on your own production data.",
    imageSrc: "/images/report-mockup4.png",
    imageAlt: "AI assistant for production data",
    primaryLabel: "Explore AI features",
    primaryHref: "/features/ai-and-copilots",
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#243b2f",
  },
  {
    title: "Machine Control",
    description:
      "Integrate with machine control systems to enable feedback, automation, and tighter production loops across the factory.",
    imageSrc: "/images/Start-Machine.png",
    imageAlt: "Machine control integration",
    primaryLabel: "See machine control",
    primaryHref: "/features/machine-control",
    bgColor: "bg-black",
    layout: "vertical",
    accentColor: "#163b40",
  },
];


// Customer logos for the logo wall
// YouTube videos for the video carousel
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

const testimonials: Testimonial[] = [
  {
    quote: "Comparing our OEE to previous data before Opticloud, we've seen an average increase of 5% within just three months.",
    author: "Kasper Kielgast Poulsen",
    title: "Fabrikschef",
    company: "Dansk Træemballage",
  },
  {
    quote: "Over the past two years, Opticloud has helped us increase productivity by approximately 5%. Data collection combined with continuous improvements is key.",
    author: "Tommy Andersen",
    title: "Production Manager",
    company: "DFI Geisler",
  },
  {
    quote: "We now perform maintenance based on operating hours instead of fixed time intervals. This gives us ~40 extra production hours annually and 50% fewer service hours.",
    author: "Stefan Lindell",
    title: "Lean Project Manager",
    company: "Kvik",
  },
  {
    quote: "Opticloud provides us with valuable management information that was previously unavailable. Our operators monitor uptime on tablets, which has encouraged quicker recovery times.",
    author: "Kasper Kielgast Poulsen",
    title: "Fabrikschef",
    company: "Dansk Træemballage",
  },
  {
    quote: "For some of our operators, recording accurate data has become a kind of competition to maximize productivity. We've achieved 5% higher productivity.",
    author: "Tommy Andersen",
    title: "Production Manager",
    company: "DFI Geisler",
  },
  {
    quote: "We achieved a 5% increase in uptime with automatic downtime cause logging. The data is now valid and reliable with full microstop tracking.",
    author: "Stefan Lindell",
    title: "Lean Project Manager",
    company: "Kvik",
  },
]

const caseDateMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function formatCaseDate(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return `${caseDateMonths[parsed.getMonth()]} ${parsed.getFullYear()}`
}

export default function Home() {
  return (
    <main>
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-5xl px-8 py-22">
          <h1 className="text-6xl font-light text-foreground text-center">
            Digital Operations Platform
          </h1>
          <p className="mt-6 text-xl text-foreground/70 text-center">
            One platform for production, performance, and connected operations.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/contact" className="cursor-pointer">
                Talk to sales
              </Link>
            </Button>
          </div>
        </div>

        <SlideCarousel
          slides={tabSlides}
          navigationType={["tabs"]}
          ariaLabel="Team solutions"
          className="mt-8"
        />
      </section>

      {/* Customer Logo Wall */}
      <LogoWall logos={customerLogos} className="pb-0 lg:pb-0" />

      {/* Trust band — pairs the logo wall with social proof */}
      <section className="pt-20 pb-12 lg:pt-32 lg:pb-28">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-8 lg:grid-cols-2 lg:gap-16">
          {/* Left — headline + customer stories link */}
          <div>
            <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
              Trusted by leading manufacturers.
              <span className="block text-foreground/50">
                See how they run production on data with OptiPeople.
              </span>
            </h2>
            <Link
              href="/cases"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-colors group-hover:border-black/20">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              Customer stories
            </Link>
          </div>

          {/* Right — featured testimonial */}
          <figure className="flex flex-col">
            <blockquote className="text-xl font-light leading-relaxed text-foreground/90 lg:text-2xl">
              &ldquo;Comparing our OEE to previous data before Opticloud, we&rsquo;ve seen an
              average increase of 5% within just three months.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              Kasper Kielgast Poulsen, Fabrikschef — Dansk Træemballage
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-12 lg:py-28">
        <div className="pl-[var(--edge)] pr-6 lg:pr-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            OptiPeople Platform
          </p>
          <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
            Everything you need to run production.
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            From live OEE to maintenance, quality, and reporting — one connected platform for your whole operation.
          </p>
        </div>

        <SlideCarousel
          slides={verticalSlides}
          navigationType={["arrows"]}
          ariaLabel="Platform features"
          className="mt-8"
        />
      </section>

      {/* AI capabilities slider */}
      <section className="py-12 lg:py-28">
        <div className="pl-[var(--edge)] pr-6 lg:pr-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {aiStackSliderCopy.en.eyebrow}
          </p>
          <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
            {aiStackSliderCopy.en.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {aiStackSliderCopy.en.subtitle}
          </p>
        </div>

        <SlideCarousel
          slides={aiStackSlides("en")}
          navigationType={["arrows"]}
          ariaLabel="AI capabilities"
          className="mt-8"
        />
      </section>

      {/* Customer Video Testimonials */}
      <section className="py-12 lg:py-28">
        <VideoCarousel
          videos={customerVideos}
          title="Video stories"
        />
      </section>

      {/* Testimonial Carousel */}
      <TestimonialCarousel
        testimonials={testimonials}
        title="What our customers say"
        className="py-12 lg:py-28"
      />

      {/* Platform Overview - Interactive Flower */}
      <PlatformFlower />

      {/* Customer Results — Scandinavian bento of measured outcomes */}
      {/* Negative bottom margin cancels the CTA's top margin so the two
          backgrounds meet flush instead of leaving an empty white band. */}
      <section className="-mb-16 bg-[var(--gray-1)] py-24 lg:-mb-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Customer results
              </p>
              <h2 className="mt-4 text-4xl font-light tracking-tight text-foreground lg:text-5xl">
                Measured on the floor.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Outcomes manufacturers reached with OptiPeople. Open any one to see how.
              </p>
            </div>
            <Link
              href="/cases"
              className="group hidden shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-black/20 hover:text-foreground sm:inline-flex"
            >
              All cases
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Bento grid */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {caseCards.map((card) => {
              const wide = card.span === "wide"
              const spanClass = wide ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-2"

              const metric = (cls: string) => {
                if (!card.value.includes("→")) return card.value
                const [from, to] = card.value.split("→")
                return (
                  <>
                    {from}
                    <span className={`mx-1 font-extralight ${cls}`}>→</span>
                    {to}
                  </>
                )
              }

              // ── Chart card (light sage or dark) ──
              if (card.kind === "chart") {
                const dark = card.tone === "dark"
                return (
                  <Link
                    key={card.slug}
                    href={`/blog/${card.slug}`}
                    className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl p-7 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:p-8 ${spanClass} ${
                      dark ? "text-white" : "text-foreground"
                    }`}
                    style={{
                      backgroundColor: dark ? "var(--gray-9)" : "oklch(0.955 0.013 168)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={`text-xs font-medium uppercase tracking-[0.2em] ${
                            dark ? "text-white/55" : "text-foreground/45"
                          }`}
                        >
                          {card.company}
                        </p>
                        <h3 className="mt-4 text-5xl font-light leading-none tracking-tight tabular-nums lg:text-6xl">
                          {metric(dark ? "text-white/40" : "text-foreground/30")}
                        </h3>
                        <p className={`mt-3 text-sm ${dark ? "text-white/70" : "text-foreground/60"}`}>
                          {card.unit}
                        </p>
                      </div>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                          dark
                            ? "bg-white/10 text-white group-hover:bg-white/20"
                            : "border border-black/10 bg-white/70 text-foreground group-hover:bg-white"
                        }`}
                      >
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>

                    <div className="mt-8 flex items-end justify-between gap-6">
                      {card.chart && (
                        <ComparisonBars {...card.chart} tone={card.tone ?? "sage"} />
                      )}
                      <p
                        className={`max-w-[16rem] text-sm leading-snug ${
                          dark ? "text-white/50" : "text-foreground/50"
                        }`}
                      >
                        {card.note}
                      </p>
                    </div>
                  </Link>
                )
              }

              // ── Image card (full-bleed photo + overlay) ──
              const image = getPostBySlug(card.slug)?.image
              return (
                <Link
                  key={card.slug}
                  href={`/blog/${card.slug}`}
                  className={`group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl text-white ${spanClass}`}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={`${card.company} production`}
                      fill
                      sizes={wide ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 40vw"}
                      className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-105"
                    />
                  )}
                  {/* brand color wash — tones the photo toward OptiPeople teal */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-60 mix-blend-multiply"
                    style={{ backgroundColor: "var(--green-dark3)" }}
                  />
                  {/* legibility gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-white/30">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>

                  <div className="relative p-7 lg:p-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                      {card.company}
                    </p>
                    <h3 className="mt-3 text-5xl font-light leading-none tracking-tight tabular-nums lg:text-6xl">
                      {card.value}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">{card.unit}</p>
                    <p className="mt-3 max-w-sm text-sm leading-snug text-white/65">{card.note}</p>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Mobile all-cases */}
          <div className="mt-10 sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/cases">
                All cases
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
