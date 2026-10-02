import type { CSSProperties } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Antenna,
  ArrowRight,
  ChartColumn,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Cpu,
  Database,
  FileText,
  Network,
  Server,
  Sparkles,
  Thermometer,
} from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { moduleCatalog } from "@/content/modules-catalog"

/**
 * The three products the homepage is built around: Modular MES, IoT and
 * Opti Assist. One section each, and deliberately not the same section three
 * times. Each one takes the form of the thing it sells:
 *
 * - Modular MES is the core, on the deep green: a giant name, a customer
 *   result, and the modules as an index that fills up as you scroll, which
 *   is what "modular" means.
 * - IoT is a system, so it is drawn as one, on a light band: everything a site
 *   already runs, wired into one data foundation, with data moving on the wires.
 * - Opti Assist is a conversation with the factory, back on the deep green:
 *   one huge line, with the pieces of an answer floating around it.
 *
 * Copy lives here per locale, like components/platform-architecture.tsx.
 * Motion is in app/globals.css (`chapter-*`): reduced motion, or a browser
 * without scroll timelines, gets the finished state.
 */

const DEEP = "var(--gray-8)"
const DEMO_HREF = "/contact"

type Links = { learn: string; demo: string }

const LINKS: Record<Locale, Links> = {
  en: { learn: "Learn more", demo: "Book a demo" },
  da: { learn: "Læs mere", demo: "Book en demo" },
}

function ChapterLinks({
  href,
  locale,
  tone,
  className = "",
}: {
  href: string
  locale: Locale
  tone: "light" | "dark"
  className?: string
}) {
  const color = tone === "light" ? "var(--green-light2)" : "var(--green-dark1)"
  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-3 text-lg ${className}`}>
      {[
        { label: LINKS[locale].learn, href },
        { label: LINKS[locale].demo, href: DEMO_HREF },
      ].map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="group inline-flex items-center gap-0.5 transition-opacity hover:opacity-80"
          style={{ color }}
        >
          {link.label}
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
  )
}

/* ── 1. Modular MES ─────────────────────────────────────────────────────── */

type MesCopy = {
  name: string
  tagline: string
  body: string
  gridLabel: string
  proof: { value: string; label: string; company: string; href: string }
  /** Live reading on each tile, keyed by module id. */
  readings: Record<string, string>
}

const MES_COPY: Record<Locale, MesCopy> = {
  en: {
    name: "Modular MES",
    tagline: "Run the floor on facts. Start with one line.",
    body: "Orders, OEE, planning and machine data on one foundation. Add the next module when you need it, with or without your ERP.",
    gridLabel: "Nine modules. One data foundation.",
    proof: {
      value: "−41%",
      label: "unnecessary stops",
      company: "Fiberline Composites",
      href: "/blog/konkurrencekraft-og-tempo-pa-digital-transformation",
    },
    readings: {
      orders: "12 running",
      oee: "78.4%",
      planning: "Week 41 planned",
      iot: "1,284 tags",
      qms: "2 deviations",
      ems: "0.42 kWh/unit",
      maintenance: "3 tasks due",
      documents: "Rev 4 in use",
      "ai-agents": "Watching line 2",
    },
  },
  da: {
    name: "Modulært MES",
    tagline: "Styr gulvet efter fakta. Start med én linje.",
    body: "Ordrer, OEE, planlægning og maskindata på samme fundament. Tag næste modul, når I har brug for det, med eller uden jeres ERP.",
    gridLabel: "Ni moduler. Ét datagrundlag.",
    proof: {
      value: "−41%",
      label: "unødvendige stop",
      company: "Fiberline Composites",
      href: "/blog/konkurrencekraft-og-tempo-pa-digital-transformation",
    },
    readings: {
      orders: "12 i gang",
      oee: "78,4%",
      planning: "Uge 41 er lagt",
      iot: "1.284 tags",
      qms: "2 afvigelser",
      ems: "0,42 kWh/stk.",
      maintenance: "3 opgaver",
      documents: "Rev. 4 gælder",
      "ai-agents": "Overvåger linje 2",
    },
  },
}

/** Row order is the order they light up in: the usual first two, then the rest. */
const MES_MODULES = [
  "orders",
  "oee",
  "planning",
  "iot",
  "qms",
  "ems",
  "maintenance",
  "documents",
  "ai-agents",
]

function moduleLabel(id: string, locale: Locale) {
  return moduleCatalog.find((entry) => entry.id === id)?.label[locale] ?? id
}

function moduleHref(id: string) {
  return moduleCatalog.find((entry) => entry.id === id)?.href ?? "/modules"
}

function MesChapter({ locale }: { locale: Locale }) {
  const t = MES_COPY[locale]

  return (
    <section
      id="product-mes"
      // No overflow-hidden here: it would make the section a scroll
      // container, and the tiles' view() timeline would never move.
      className="py-24 text-white sm:py-28 lg:py-36"
      style={{ backgroundColor: DEEP }}
    >
      <div className="grid items-center gap-16 px-[var(--edge)] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h2 className="text-6xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[6.25rem]">
            {t.name}
          </h2>
          <p className="mt-7 max-w-lg text-balance text-2xl leading-tight tracking-tight text-white/88 lg:text-3xl">
            {t.tagline}
          </p>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">{t.body}</p>
          <ChapterLinks href="/modules/mes" locale={locale} tone="light" className="mt-8" />

          {/* One customer result, the way the best product pages lead with proof */}
          <Link
            href={t.proof.href}
            className="group mt-14 flex max-w-md items-end gap-4 border-t border-white/12 pt-8 sm:gap-6"
          >
            <span
              className="shrink-0 text-5xl font-light leading-none tracking-tight tabular-nums sm:text-6xl"
              style={{ color: "var(--green-light2)" }}
            >
              {t.proof.value}
            </span>
            <span className="pb-1">
              <span className="block whitespace-nowrap text-base text-white">{t.proof.label}</span>
              <span className="block text-sm text-white/65 transition-colors group-hover:text-white/88">
                {t.proof.company}
              </span>
            </span>
          </Link>
        </div>

        <div className="lg:col-span-6">
          <p className="text-sm text-white/65">{t.gridLabel}</p>
          {/* An index, the way Linear and Stripe list things: names set large
              on hairlines, no markers, the row itself the link. The reading
              is set in Plex Mono so it reads as data, not copy. A row comes on
              as it scrolls into view, so the list fills up from the top. */}
          <ol className="mt-5 border-t border-white/12">
            {MES_MODULES.map((id, i) => (
              <li
                key={id}
                className="chapter-tile border-b border-white/12"
                style={
                  {
                    animationRange: `cover ${4 + i}% cover ${12 + i}%`,
                  } as CSSProperties
                }
              >
                <Link
                  href={moduleHref(id)}
                  className="group flex items-center gap-3 py-3 sm:gap-5 sm:py-3.5"
                >
                  <span
                    className="min-w-0 flex-1 truncate text-xl font-normal tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1.5 min-[400px]:text-2xl sm:text-3xl"
                    style={{ opacity: "calc(0.28 + var(--lit) * 0.72)" }}
                  >
                    {moduleLabel(id, locale)}
                  </span>
                  <span
                    className="shrink-0 text-right font-mono text-[13px] tabular-nums sm:text-sm"
                    style={{ color: "var(--green-light2)", opacity: "calc(var(--lit) * 0.9)" }}
                  >
                    {t.readings[id]}
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-white/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ── 2. IoT ─────────────────────────────────────────────────────────────── */

type IotNode = {
  title: string
  sub: string
  tag?: string
  /** New hardware went on; every other tagged source was already there. */
  added?: boolean
}

type IotCopy = {
  eyebrow: string
  tagline: string
  body: string
  sources: IotNode[]
  foundation: IotNode
  readers: IotNode[]
  stats: { value: string; label: string }[]
}

const IOT_COPY: Record<Locale, IotCopy> = {
  en: {
    eyebrow: "IoT",
    tagline: "Every machine talking. Even the one from 1998.",
    body: "We read from the controls, sensors and systems you already have. New hardware only goes where there is nothing to read.",
    sources: [
      { title: "CNC robot", sub: "Siemens S7 over OPC UA", tag: "Connected" },
      { title: "Press 4, from 1998", sub: "Retrofit current sensor", tag: "Sensor added", added: true },
      { title: "Oven sensor kit", sub: "Modbus, from an old project", tag: "Reused" },
      { title: "SCADA historian", sub: "SQL", tag: "Reused" },
      { title: "ERP", sub: "REST API", tag: "Reused" },
    ],
    foundation: { title: "One data foundation", sub: "1,284 live tags" },
    readers: [
      { title: "Modular MES", sub: "Orders, OEE, planning" },
      { title: "Opti Assist", sub: "Answers from live data" },
      { title: "Your BI and ERP", sub: "Reports, APIs, exports" },
    ],
    stats: [
      { value: "200+", label: "machine types connected" },
      { value: "< 1 day", label: "typical time to first data" },
      { value: "1", label: "foundation for every source, tied to machine, order, batch and shift" },
    ],
  },
  da: {
    eyebrow: "IoT",
    tagline: "Alle maskiner taler med. Også den fra 1998.",
    body: "Vi læser fra de styringer, sensorer og systemer, I allerede har. Ny hardware kommer kun op, hvor der ikke er noget at læse fra.",
    sources: [
      { title: "CNC-robot", sub: "Siemens S7 over OPC UA", tag: "Tilkoblet" },
      { title: "Presse 4, fra 1998", sub: "Ny strømsensor", tag: "Sensor sat på", added: true },
      { title: "Sensorsæt på ovnen", sub: "Modbus, gammelt projekt", tag: "Genbrugt" },
      { title: "SCADA-historian", sub: "SQL", tag: "Genbrugt" },
      { title: "ERP", sub: "REST API", tag: "Genbrugt" },
    ],
    foundation: { title: "Ét datagrundlag", sub: "1.284 live tags" },
    readers: [
      { title: "Modulært MES", sub: "Ordrer, OEE, planlægning" },
      { title: "Opti Assist", sub: "Svar ud fra live data" },
      { title: "Jeres BI og ERP", sub: "Rapporter, API'er, eksport" },
    ],
    stats: [
      { value: "200+", label: "maskintyper koblet på" },
      { value: "< 1 dag", label: "typisk tid til de første data" },
      { value: "1", label: "fundament for alle kilder, koblet til maskine, ordre, batch og skift" },
    ],
  },
}

const SOURCE_ICONS: LucideIcon[] = [Cpu, Antenna, Thermometer, Server, Network]
const READER_ICONS: LucideIcon[] = [ClipboardList, Sparkles, ChartColumn]

/*
 * The wiring is one SVG in a 1000 x 440 box, stretched over the diagram with
 * `preserveAspectRatio="none"`; the nodes are HTML placed at the same
 * percentages, so the ends of every wire meet a node at any width. Sources sit
 * at x 0 to 26%, the foundation at 38 to 62%, the readers at 76 to 100%.
 */
const SOURCE_Y = [44, 132, 220, 308, 396]
const READER_Y = [110, 220, 330]
const WIRES = [
  ...SOURCE_Y.map((y) => `M260 ${y} C 320 ${y}, 320 220, 380 220`),
  ...READER_Y.map((y) => `M620 220 C 690 220, 690 ${y}, 760 ${y}`),
]

function SourceNode({ node, icon: Icon }: { node: IotNode; icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06]">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-600">
        <Icon className="size-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-slate-900">{node.title}</span>
        <span className="block truncate text-xs text-slate-500">{node.sub}</span>
      </span>
      {node.tag ? (
        <span
          className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium xl:inline ${
            node.added ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {node.tag}
        </span>
      ) : null}
    </div>
  )
}

function FoundationNode({ node }: { node: IotNode }) {
  return (
    <div
      className="rounded-2xl px-5 py-6 text-center text-white shadow-[0_24px_50px_-24px_rgba(0,40,40,0.7)]"
      style={{ backgroundColor: "var(--green-dark3)" }}
    >
      <Database className="mx-auto size-6 text-white/82" />
      <p className="mt-3 text-lg font-medium">{node.title}</p>
      <p className="mt-1 text-sm tabular-nums" style={{ color: "var(--green-light2)" }}>
        {node.sub}
      </p>
    </div>
  )
}

function ReaderNode({ node, icon: Icon }: { node: IotNode; icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-900/10 bg-white/60 px-3 py-2.5">
      <span
        className="grid size-9 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: "#e9f0ec", color: "var(--green-dark3)" }}
      >
        <Icon className="size-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-slate-900">{node.title}</span>
        <span className="block truncate text-xs text-slate-500">{node.sub}</span>
      </span>
    </div>
  )
}

function IotChapter({ locale }: { locale: Locale }) {
  const t = IOT_COPY[locale]

  return (
    <section id="product-iot" className="bg-[var(--gray-1)] py-24 sm:py-28 lg:py-36">
      <div className="px-[var(--edge)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            {/* The product's name as plain type, no pill or icon */}
            <p className="text-xl font-medium tracking-tight" style={{ color: "var(--green-dark1)" }}>
              {t.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-5xl font-normal leading-[1.02] tracking-[-0.035em] text-slate-950 sm:text-6xl lg:text-7xl">
              {t.tagline}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-slate-900/72">{t.body}</p>
            <ChapterLinks href="/modules/iot" locale={locale} tone="dark" className="mt-6" />
          </div>
        </div>

        {/* Wide screens: the wired diagram */}
        <div className="relative mt-20 hidden aspect-[1000/440] lg:block">
          <svg
            viewBox="0 0 1000 440"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {WIRES.map((d) => (
              <g key={d}>
                <path
                  d={d}
                  fill="none"
                  stroke="rgb(15 23 42 / 0.14)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={d}
                  fill="none"
                  stroke="var(--green-dark1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="3 13"
                  vectorEffect="non-scaling-stroke"
                  className="chapter-flow"
                />
              </g>
            ))}
          </svg>

          {t.sources.map((node, i) => (
            <div
              key={node.title}
              className="absolute left-0 w-[26%] -translate-y-1/2"
              style={{ top: `${(SOURCE_Y[i] / 440) * 100}%` }}
            >
              <SourceNode node={node} icon={SOURCE_ICONS[i]} />
            </div>
          ))}

          <div className="absolute left-[38%] top-1/2 w-[24%] -translate-y-1/2">
            <FoundationNode node={t.foundation} />
          </div>

          {t.readers.map((node, i) => (
            <div
              key={node.title}
              className="absolute right-0 w-[24%] -translate-y-1/2"
              style={{ top: `${(READER_Y[i] / 440) * 100}%` }}
            >
              <ReaderNode node={node} icon={READER_ICONS[i]} />
            </div>
          ))}
        </div>

        {/* Below lg: the same story, read top to bottom */}
        <div className="mt-14 lg:hidden">
          <div className="grid gap-2.5">
            {t.sources.map((node, i) => (
              <SourceNode key={node.title} node={node} icon={SOURCE_ICONS[i]} />
            ))}
          </div>
          <ChevronDown className="mx-auto my-4 size-6 text-slate-400" />
          <FoundationNode node={t.foundation} />
          <ChevronDown className="mx-auto my-4 size-6 text-slate-400" />
          <div className="grid gap-2.5">
            {t.readers.map((node, i) => (
              <ReaderNode key={node.title} node={node} icon={READER_ICONS[i]} />
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-slate-900/10 pt-10 sm:grid-cols-3 lg:mt-24">
          {t.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl font-light leading-none tracking-tight text-slate-950 tabular-nums">
                {stat.value}
              </p>
              <p className="mt-3 max-w-xs text-base leading-snug text-slate-900/72">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 3. Opti Assist ─────────────────────────────────────────────────────── */

type AssistCopy = {
  name: string
  tagline: string
  body: string
  question: string
  chart: { title: string; rows: { label: string; count: number }[] }
  manual: { title: string; page: string; highlight: string }
  answer: string
  sources: string[]
}

const ASSIST_COPY: Record<Locale, AssistCopy> = {
  en: {
    name: "Opti Assist",
    tagline: "The colleague who has read every manual.",
    body: "AI that knows your machines, your procedures and your live production data. Ask in plain words, get the answer and the source.",
    question: "Why did CNC Drilling stop so often last night?",
    chart: {
      title: "Stops last night, shift 3",
      rows: [
        { label: "Tool error", count: 4 },
        { label: "Waiting for material", count: 1 },
        { label: "Setup", count: 1 },
      ],
    },
    manual: { title: "Machine manual", page: "p. 42", highlight: "Torque the collet to 18 Nm." },
    answer:
      "Four of six stops were tool errors, all after the bit change at 23:10. The manual says to torque the collet to 18 Nm. Check that first.",
    sources: ["Stop log, shift 3", "Machine manual, p. 42"],
  },
  da: {
    name: "Opti Assist",
    tagline: "Kollegaen, der har læst alle manualerne.",
    body: "AI, der kender jeres maskiner, jeres procedurer og tallene fra gulvet lige nu. Spørg med almindelige ord, og få svaret og kilden.",
    question: "Hvorfor stoppede CNC-boringen så tit i nat?",
    chart: {
      title: "Stop i nat, skift 3",
      rows: [
        { label: "Værktøjsfejl", count: 4 },
        { label: "Venter på materiale", count: 1 },
        { label: "Omstilling", count: 1 },
      ],
    },
    manual: { title: "Maskinmanual", page: "s. 42", highlight: "Spænd spændetangen til 18 Nm." },
    answer:
      "Fire af de seks stop var værktøjsfejl, alle efter borskiftet kl. 23.10. Ifølge manualen skal spændetangen spændes til 18 Nm. Tjek den først.",
    sources: ["Stoplog, skift 3", "Maskinmanual, s. 42"],
  },
}

function QuestionFragment({ text }: { text: string }) {
  return (
    <div
      className="rounded-2xl rounded-br-md px-4 py-3 text-[15px] leading-snug text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]"
      style={{ backgroundColor: "var(--green-dark1)" }}
    >
      {text}
    </div>
  )
}

function ChartFragment({ chart }: { chart: AssistCopy["chart"] }) {
  const max = Math.max(...chart.rows.map((r) => r.count))
  return (
    <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 backdrop-blur-sm">
      <p className="text-xs font-medium text-white/72">{chart.title}</p>
      <div className="mt-3 space-y-2.5">
        {chart.rows.map((row) => (
          <div key={row.label}>
            <div className="flex justify-between text-xs text-white/82">
              <span>{row.label}</span>
              <span className="tabular-nums">{row.count}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${(row.count / max) * 100}%`, backgroundColor: "var(--green-light2)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ManualFragment({ manual }: { manual: AssistCopy["manual"] }) {
  return (
    <div className="rounded-2xl bg-white p-4 text-slate-700 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-900">
          <FileText className="size-3.5" />
          {manual.title}
        </span>
        <span className="text-slate-400">{manual.page}</span>
      </div>
      <div className="mt-3 space-y-1.5" aria-hidden="true">
        <div className="h-1.5 w-full rounded-full bg-slate-100" />
        <div className="h-1.5 w-[88%] rounded-full bg-slate-100" />
      </div>
      <p
        className="mt-2 rounded-md px-1.5 py-1 text-sm font-medium text-slate-900"
        style={{ backgroundColor: "color-mix(in oklab, var(--green-light2) 55%, white)" }}
      >
        {manual.highlight}
      </p>
      <div className="mt-2 space-y-1.5" aria-hidden="true">
        <div className="h-1.5 w-[94%] rounded-full bg-slate-100" />
        <div className="h-1.5 w-[70%] rounded-full bg-slate-100" />
      </div>
    </div>
  )
}

function AnswerFragment({ answer, sources }: { answer: string; sources: string[] }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]">
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span
          className="grid size-6 place-items-center rounded-full text-white"
          style={{ backgroundColor: "var(--green-dark1)" }}
        >
          <Sparkles className="size-3.5" />
        </span>
        Opti Assist
      </span>
      <p className="mt-2.5 text-[15px] leading-snug text-slate-700">{answer}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {sources.map((source) => (
          <span
            key={source}
            className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-500 ring-1 ring-slate-200"
          >
            <FileText className="size-3" />
            {source}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Float with a phase per fragment, so the four never move in step. */
const float = (delay: string): CSSProperties => ({ animationDelay: delay })

function AssistChapter({ locale }: { locale: Locale }) {
  const t = ASSIST_COPY[locale]

  const heading = (
    <div className="text-center">
      <p className="text-xl font-medium tracking-tight" style={{ color: "var(--green-light2)" }}>
        {t.name}
      </p>
      <h2 className="mx-auto mt-4 max-w-3xl text-balance text-5xl font-normal leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
        {t.tagline}
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-balance text-lg leading-relaxed text-white/70">
        {t.body}
      </p>
      <ChapterLinks href="/ai/chat" locale={locale} tone="light" className="mt-8 justify-center" />
    </div>
  )

  return (
    <section
      id="product-assist"
      className="overflow-hidden py-24 sm:py-28 lg:py-36"
      style={{ backgroundColor: DEEP }}
    >
      <div className="px-[var(--edge)]">
        {/* Wide screens: the answer's pieces float either side of the line */}
        <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,36rem)_minmax(0,1fr)] items-center gap-10 xl:grid">
          <div className="space-y-10">
            <div className="chapter-float ml-6 max-w-[17rem]" style={float("0s")}>
              <QuestionFragment text={t.question} />
            </div>
            <div className="chapter-float max-w-[16rem]" style={float("-3s")}>
              <ChartFragment chart={t.chart} />
            </div>
          </div>
          {heading}
          <div className="space-y-10">
            <div className="chapter-float ml-auto mt-16 max-w-[16rem]" style={float("-1.5s")}>
              <ManualFragment manual={t.manual} />
            </div>
            <div className="chapter-float ml-auto max-w-[18rem]" style={float("-5s")}>
              <AnswerFragment answer={t.answer} sources={t.sources} />
            </div>
          </div>
        </div>

        {/* Below xl: the line, then the exchange read in order */}
        <div className="xl:hidden">
          {heading}
          <div className="mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 sm:ml-auto sm:max-w-sm">
              <QuestionFragment text={t.question} />
            </div>
            <ChartFragment chart={t.chart} />
            <div className="hidden sm:block">
              <ManualFragment manual={t.manual} />
            </div>
            <div className="sm:col-span-2">
              <AnswerFragment answer={t.answer} sources={t.sources} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProductChapters({ locale }: { locale: Locale }) {
  return (
    <>
      <MesChapter locale={locale} />
      <IotChapter locale={locale} />
      <AssistChapter locale={locale} />
    </>
  )
}
