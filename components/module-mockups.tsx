import type { CSSProperties } from "react"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  Antenna,
  BadgeCheck,
  Cable,
  CalendarClock,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  Cpu,
  Database,
  CreditCard,
  Download,
  FileText,
  Filter,
  Flame,
  Gauge,
  Hash,
  History,
  Mic,
  PanelLeftOpen,
  PencilRuler,
  Plus,
  Power,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Timer,
  Users,
  Wrench,
  Zap,
} from "lucide-react"

import logo from "@/app/Optipeople-Logo-Vector.svg"

/**
 * Code-built UI mockups for the module slides that have no usable screenshot.
 *
 * Same idea as components/ai-stack-mockups.tsx: purely decorative panels that
 * show what the module does without shipping a real screen capture. Drawn as
 * white panels so they sit on the module card's accent fill the way the AI
 * cards do.
 *
 * Sizing matters here. Each stack is built to run roughly 420px tall from the
 * slider card's `top-[36%]`, so it overflows the 600px card and is cropped at
 * the bottom edge (see the drawn branch in components/slide-carousel.tsx). The
 * last element in every stack is therefore a repeating list, which reads as
 * "and it continues" rather than as a panel that got cut off. Anything the
 * slide actually needs to say sits in the top ~270px, above the fade.
 *
 * Slugs match module ids in content/modules-catalog.ts, so buildModuleSlides()
 * can attach a mockup by id without any per-locale wiring.
 *
 * The panel shadow is read from `--mockup-shadow`, which the slide sets from
 * its own card colour: the drop that lifts a panel off a dark green card is a
 * bruise on the pale blue one. The fallback in the class is the dark-card
 * value, so a mockup rendered anywhere else still looks right.
 */
export type ModuleMockupSlug =
  | "mes"
  | "oee"
  | "qms"
  | "ems"
  | "maintenance"
  | "planning"
  | "orders"
  | "iot"
  | "documents"
  | "analysis"
  | "ai-agents"

const MODULE_MOCKUP_SLUGS: ModuleMockupSlug[] = [
  "mes",
  "oee",
  "qms",
  "ems",
  "maintenance",
  "planning",
  "orders",
  "iot",
  "documents",
  "analysis",
  "ai-agents",
]

/** True when the module id has a code-built graphic instead of a screenshot. */
export function hasModuleMockup(id: string): id is ModuleMockupSlug {
  return (MODULE_MOCKUP_SLUGS as string[]).includes(id)
}

export function ModuleMockup({ slug }: { slug: ModuleMockupSlug }) {
  switch (slug) {
    case "mes":
      return <MesMockup />
    case "oee":
      return <OeeMockup />
    case "qms":
      return <QmsMockup />
    case "ems":
      return <EmsMockup />
    case "maintenance":
      return <MaintenanceMockup />
    case "planning":
      return <PlanningMockup />
    case "orders":
      return <OrdersMockup />
    case "iot":
      return <IotMockup />
    case "documents":
      return <DocumentsMockup />
    case "analysis":
      return <AnalysisMockup />
    case "ai-agents":
      return <AiAgentsMockup />
    default:
      return null
  }
}

/** Shared floating-panel look, kept in step with the AI capability mockups. */
const panel =
  "rounded-2xl bg-white text-left shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5"

/* ── Modular MES ────────────────────────────────────────
   The one slide that cannot be a screen, because the MES is not a screen: it is
   the thing the other ten run on. Drawing a dashboard for it says nothing that
   the OEE slide does not already say better. So this draws the mechanism
   instead, and takes the platform section's own sentence literally: a stop
   registered on the floor lands in OEE, in the maintenance history and in the
   monthly report without anyone re-entering it. One event at the top, the
   foundation across the middle, three modules reading from it, and the module
   strip at the bottom saying the rest are there when the next question comes. */

const MES_READERS = [
  { module: "OEE", effect: "Availability -1.4%", icon: Gauge },
  { module: "Maintenance", effect: "Task created", icon: Wrench },
  { module: "Analysis", effect: "In this month's report", icon: FileText },
]

/** Every module, with the four this line has switched on. */
const MES_STRIP = [
  { label: "MES", on: true },
  { label: "OEE", on: true },
  { label: "QMS", on: false },
  { label: "EMS", on: false },
  { label: "Maintenance", on: true },
  { label: "Planning", on: false },
  { label: "Orders", on: false },
  { label: "IoT", on: false },
  { label: "Documents", on: false },
  { label: "Analysis", on: true },
  { label: "AI", on: false },
]

/** What else has landed on this line today. */
const MES_FEED = [
  { at: "09:42", event: "Stop registered", into: "OEE" },
  { at: "09:30", event: "Order 45-1182 started", into: "Orders" },
  { at: "09:12", event: "QA check passed", into: "QMS" },
  { at: "08:55", event: "Counter 1 240 units", into: "Analysis" },
  { at: "08:20", event: "Tool change logged", into: "Maintenance" },
  { at: "07:58", event: "Shift 2 signed in", into: "MES" },
]

/**
 * The line down from the event, and the three down to the readers, each with a
 * pulse running its length. The delays are set so the event reaches the
 * foundation before the modules read from it, which is the point of the slide.
 */
function MesWire({ at, delay = 0 }: { at: number[]; delay?: number }) {
  return (
    <div className="relative h-[13px]">
      {at.map((x, i) => (
        <span
          key={x}
          className="absolute top-0 h-full w-[1px] bg-slate-300"
          style={{ left: x + "%" }}
        >
          <span
            className="mockup-wire-pulse absolute -left-[1px] top-0 size-[3px] rounded-full opacity-0"
            style={{
              backgroundColor: "var(--green-system)",
              animationDelay: delay + i * 0.08 + "s",
            }}
          />
        </span>
      ))}
    </div>
  )
}

function MesMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white px-3 pb-3 pt-2.5 shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))] ring-1 ring-black/10">
      <div className="flex items-center gap-2">
        <p
          className="text-[9.5px] font-semibold uppercase tracking-[0.06em] leading-none"
          style={{ color: "var(--green-dark3)" }}
        >
          Modular MES
        </p>
        <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-1.5 py-[2px] text-[6px] font-medium leading-none text-slate-600">
          4 of 11 modules
        </span>
      </div>
      <p className="mt-[3px] text-[6.5px] leading-none text-slate-400">
        Registered once at the machine, read by every module
      </p>

      {/* One thing happens on the floor */}
      <div className="mt-2.5 flex items-start gap-1.5 rounded-lg border border-slate-200 px-2 py-[7px]">
        <span className="mt-[2px] size-[6px] shrink-0 rounded-full bg-rose-500" />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1">
            <span className="text-[7.5px] font-semibold leading-none text-slate-800">
              Stop registered
            </span>
            <span className="ml-auto shrink-0 text-[6px] leading-none text-slate-400">
              09:42
            </span>
          </span>
          <span className="mt-[4px] block truncate text-[6.5px] leading-none text-slate-500">
            CNC Drilling · Tool error · 6 min · Shift 2
          </span>
        </span>
      </div>

      <MesWire at={[50]} />

      {/* It lands in one place */}
      <div
        className="flex items-center gap-1.5 rounded-lg px-2 py-[7px]"
        style={{ backgroundColor: "var(--green-dark3)" }}
      >
        <Database className="size-[9px] shrink-0 text-white/82" />
        <span className="text-[7.5px] font-semibold leading-none text-white">
          One data foundation
        </span>
        <span className="ml-auto shrink-0 text-[6px] leading-none text-white/65">
          no re-entry
        </span>
      </div>

      <MesWire at={[16.6, 50, 83.3]} delay={0.9} />

      {/* And every module that needs it already has it */}
      <div className="grid grid-cols-3 gap-1.5">
        {MES_READERS.map(({ module, effect, icon: Icon }) => (
          <div
            key={module}
            className="rounded-lg border border-slate-200 px-1 py-2 text-center"
          >
            <span
              className="mx-auto grid size-[17px] place-items-center rounded-full"
              style={{ backgroundColor: "#e9f0ec", color: "var(--green-dark3)" }}
            >
              <Icon className="size-[9px]" />
            </span>
            <p className="mt-[5px] text-[7px] font-semibold leading-none text-slate-800">
              {module}
            </p>
            <p className="mt-[3px] text-[6px] leading-[1.3] text-slate-500">
              {effect}
            </p>
          </div>
        ))}
      </div>

      {/* The rest are there when the next question comes up */}
      <p className="mt-3 text-[6px] font-semibold uppercase tracking-[0.08em] leading-none text-slate-400">
        Modules on this line
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {MES_STRIP.map(({ label, on }) => (
          <span
            key={label}
            className={
              "rounded-full px-1.5 py-[2px] text-[6px] leading-none " +
              (on
                ? "font-medium text-white"
                : "text-slate-400 ring-1 ring-slate-200")
            }
            style={on ? { backgroundColor: "var(--green-dark3)" } : undefined}
          >
            {label}
          </span>
        ))}
      </div>

      {/* The same thing happening all day */}
      <p className="mt-3 text-[6px] font-semibold uppercase tracking-[0.08em] leading-none text-slate-400">
        Landing today
      </p>
      <div className="mt-1.5 space-y-[1px]">
        {MES_FEED.map(({ at, event, into }, i) => (
          <div key={i} className="flex items-center gap-1.5 py-[3px]">
            <span className="w-[22px] shrink-0 text-[6px] leading-none text-slate-400">
              {at}
            </span>
            <span className="min-w-0 flex-1 truncate text-[6.5px] leading-none text-slate-700">
              {event}
            </span>
            <span className="shrink-0 rounded-full bg-slate-100 px-1 py-[2px] text-[6px] leading-none text-slate-500">
              {into}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * The same argument as MesMockup, turned on its side for the module page's
 * 16/9 visual frame: the event on the left, the foundation in the middle, the
 * modules that already have it on the right, then what else landed today.
 * Reads left to right because that is what a wide frame is for, where the card
 * version stacks downward into its bottom crop.
 *
 * Sized in `em` off one container-query font size, so the whole window scales
 * with the frame the way a screenshot would.
 */
export function MesVisual() {
  return (
    <div className="@container absolute inset-0 flex items-center justify-center">
      <div
        className="w-[93%] overflow-hidden rounded-[0.85em] bg-white text-left text-slate-700 shadow-[0_1.5em_3em_-1.4em_rgba(0,0,0,0.65)] ring-1 ring-black/10"
        style={{ fontSize: "clamp(6px, 1.5cqw, 18px)" }}
      >
        <div className="flex items-baseline gap-[0.6em] border-b border-slate-200 bg-slate-50 px-[1.3em] py-[0.85em]">
          <span
            className="shrink-0 text-[0.95em] font-semibold"
            style={{ color: "var(--green-dark3)" }}
          >
            Modular MES
          </span>
          <span className="truncate text-[0.85em] text-slate-400">
            Registered once at the machine, read by every module
          </span>
          <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-[0.7em] py-[0.2em] text-[0.75em] font-medium text-slate-600">
            4 of 11 modules
          </span>
        </div>

        <div className="px-[1.3em] py-[1.3em]">
          {/* One thing happens on the floor, lands once, and is already there
              in every module that needs it. */}
          <div className="flex items-stretch gap-[0.7em]">
            <div className="flex w-[24%] shrink-0 flex-col justify-center rounded-[0.55em] border border-slate-200 px-[0.9em] py-[0.8em]">
              <span className="flex items-center gap-[0.5em]">
                <span className="size-[0.5em] shrink-0 rounded-full bg-rose-500" />
                <span className="truncate text-[0.85em] font-semibold text-slate-800">
                  Stop registered
                </span>
                <span className="ml-auto shrink-0 text-[0.75em] text-slate-400">
                  09:42
                </span>
              </span>
              <span className="mt-[0.45em] block text-[0.75em] leading-[1.35] text-slate-500">
                CNC Drilling · Tool error · 6 min · Shift 2
              </span>
            </div>

            <MesFlowArrow />

            <div
              className="flex w-[22%] shrink-0 flex-col justify-center rounded-[0.55em] px-[0.9em] py-[0.8em]"
              style={{ backgroundColor: "var(--green-dark3)" }}
            >
              <span className="flex items-center gap-[0.5em]">
                <Database className="size-[0.9em] shrink-0 text-white/82" />
                <span className="truncate text-[0.85em] font-semibold text-white">
                  One data foundation
                </span>
              </span>
              <span className="mt-[0.45em] block text-[0.75em] leading-[1.35] text-white/70">
                Written once, no re-entry
              </span>
            </div>

            <MesFlowArrow />

            <div className="grid flex-1 grid-cols-3 gap-[0.6em]">
              {MES_READERS.map(({ module, effect, icon: Icon }) => (
                <div
                  key={module}
                  className="rounded-[0.55em] border border-slate-200 px-[0.7em] py-[0.8em] text-center"
                >
                  <span
                    className="mx-auto grid size-[1.7em] place-items-center rounded-full"
                    style={{
                      backgroundColor: "#e9f0ec",
                      color: "var(--green-dark3)",
                    }}
                  >
                    <Icon className="size-[0.9em]" />
                  </span>
                  <p className="mt-[0.5em] truncate text-[0.85em] font-semibold text-slate-800">
                    {module}
                  </p>
                  <p className="mt-[0.25em] text-[0.75em] leading-[1.35] text-slate-500">
                    {effect}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[1.3em] grid grid-cols-[1fr_1.15fr] gap-[1.6em] border-t border-slate-100 pt-[1.1em]">
            {/* The rest are there when the next question comes up. */}
            <div>
              <p className="text-[0.7em] font-semibold uppercase tracking-[0.1em] text-slate-400">
                Modules on this line
              </p>
              <div className="mt-[0.7em] flex flex-wrap gap-[0.35em]">
                {MES_STRIP.map(({ label, on }) => (
                  <span
                    key={label}
                    className={`rounded-full px-[0.7em] py-[0.2em] text-[0.75em] ${
                      on
                        ? "font-medium text-white"
                        : "text-slate-400 ring-1 ring-slate-200"
                    }`}
                    style={
                      on
                        ? { backgroundColor: "var(--green-dark3)" }
                        : undefined
                    }
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* The same thing happening all day. */}
            <div>
              <p className="text-[0.7em] font-semibold uppercase tracking-[0.1em] text-slate-400">
                Landing today
              </p>
              <div className="mt-[0.4em]">
                {MES_FEED.map(({ at, event, into }) => (
                  <div
                    key={at}
                    className="flex items-center gap-[0.6em] border-b border-slate-50 py-[0.3em] last:border-b-0"
                  >
                    <span className="shrink-0 text-[0.75em] tabular-nums text-slate-400">
                      {at}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[0.8em] text-slate-700">
                      {event}
                    </span>
                    <span className="shrink-0 rounded-full bg-slate-100 px-[0.55em] py-[0.15em] text-[0.7em] text-slate-500">
                      {into}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** The hairline and chevron between two stages of the wide MES flow. */
function MesFlowArrow() {
  return (
    <div className="flex min-w-[1.4em] flex-1 items-center text-slate-300">
      <span className="h-px flex-1 bg-current" />
      <ChevronRight className="-ml-[0.35em] size-[0.9em]" />
    </div>
  )
}

/* ── OEE ────────────────────────────────────────────────
   The three gauges, the shift on a timeline and the stops that cost it, which
   is the module's whole argument in one column: what the number is, when the
   time went, and what took it. The stop colours are shared between the timeline
   and the distribution, so a band in the shift and a bar in the chart are
   visibly the same event without either needing a legend. */

/** Stop reasons, coloured once and used by both charts. */
const OEE_RUNNING = "#1a6b63"
const OEE_STOPS = {
  qa: "#e8362a",
  gcode: "#8a6b1a",
  tool: "#3f1f6b",
  malfunction: "#5b8fe0",
  coolant: "#eeb32e",
}

/** The shift, left to right. Widths are percentages of the band. */
const OEE_SHIFT = [
  { w: 17, tone: OEE_RUNNING, label: "Running" },
  { w: 3, tone: OEE_STOPS.qa },
  { w: 13, tone: OEE_RUNNING, label: "Running" },
  { w: 2, tone: OEE_STOPS.malfunction },
  { w: 4, tone: OEE_RUNNING },
  { w: 3, tone: OEE_STOPS.gcode },
  { w: 2, tone: OEE_RUNNING },
  { w: 3, tone: OEE_STOPS.gcode },
  { w: 18, tone: OEE_RUNNING, label: "Running" },
  { w: 3, tone: OEE_STOPS.tool },
  { w: 4, tone: OEE_RUNNING },
  { w: 2, tone: OEE_STOPS.qa },
  { w: 10, tone: OEE_RUNNING, label: "Running" },
  { w: 2, tone: OEE_STOPS.tool },
  { w: 6, tone: OEE_RUNNING },
  { w: 3, tone: OEE_STOPS.coolant },
  { w: 3, tone: OEE_RUNNING },
  { w: 2, tone: OEE_STOPS.qa },
]

const OEE_DISTRIBUTION = [
  { label: "QA check", times: 2, tone: OEE_STOPS.qa },
  { label: "G-code", times: 2, tone: OEE_STOPS.gcode },
  { label: "Tool error", times: 2, tone: OEE_STOPS.tool },
  { label: "Malfunction", times: 1, tone: OEE_STOPS.malfunction },
  { label: "Coolant", times: 1, tone: OEE_STOPS.coolant },
  { label: "Material", times: 1, tone: OEE_STOPS.qa },
]

const OEE_LOG = [
  { at: "14:12", reason: "QA check", took: "4 min", tone: OEE_STOPS.qa },
  { at: "13:05", reason: "Tool error", took: "11 min", tone: OEE_STOPS.tool },
  { at: "11:38", reason: "Coolant stop", took: "6 min", tone: OEE_STOPS.coolant },
  { at: "10:22", reason: "G-code E1002", took: "8 min", tone: OEE_STOPS.gcode },
  { at: "09:14", reason: "QA check", took: "3 min", tone: OEE_STOPS.qa },
  { at: "07:46", reason: "Critical malfunction", took: "12 min", tone: OEE_STOPS.malfunction },
]

const OEE_GAUGES = [
  { label: "Availability", value: 86.3, target: "95%", tone: "#e8b23a" },
  { label: "Performance", value: 62.4, target: "80%", tone: "#d4483f" },
  { label: "OEE", value: 53.9, target: "70%", tone: "#d4483f" },
]

/**
 * Half-circle gauge, drawn rather than pulled in from a chart library. The arc
 * sweeps up to its value on a loop; the inline dash offset is the finished
 * state, so with reduced motion the gauge simply reads correctly and sits still.
 */
function OeeGauge({
  value,
  tone,
  delay,
}: {
  value: number
  tone: string
  delay: number
}) {
  const arc = Math.PI * 16
  const offset = arc - (value / 100) * arc
  const sweep: CSSProperties & Record<string, string | number> = {
    strokeDashoffset: offset,
    "--gauge-arc": arc,
    "--gauge-offset": offset,
    animationDelay: delay + "s",
  }
  return (
    <svg viewBox="0 0 40 23" className="w-full" aria-hidden="true">
      <path
        d="M4 20 A16 16 0 0 1 36 20"
        fill="none"
        stroke="#e9edf0"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        className="mockup-gauge-sweep"
        d="M4 20 A16 16 0 0 1 36 20"
        fill="none"
        stroke={tone}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray={arc}
        style={sweep}
      />
    </svg>
  )
}

function OeeMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white px-3 pb-3 pt-2.5 shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))] ring-1 ring-black/10">
      <div className="flex items-center gap-2">
        <p
          className="text-[9.5px] font-semibold uppercase tracking-[0.06em] leading-none"
          style={{ color: "var(--green-dark3)" }}
        >
          OEE
        </p>
        <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-1.5 py-[2px] text-[6px] font-medium leading-none text-slate-600">
          CNC Drilling
        </span>
      </div>
      <p className="mt-[3px] text-[6.5px] leading-none text-slate-400">
        Availability, performance and quality, off the machine signal
      </p>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {OEE_GAUGES.map(({ label, value, target, tone }, i) => (
          <div key={label} className="rounded-lg border border-slate-200 px-1 pb-1.5 pt-[5px]">
            <p className="text-center text-[6px] leading-none text-slate-500">
              {label}
            </p>
            <div className="relative mt-[3px]">
              <OeeGauge value={value} tone={tone} delay={i * 0.18} />
              <div className="absolute inset-x-0 bottom-[1px] text-center">
                <p
                  className="text-[8.5px] font-semibold leading-none"
                  style={{ color: tone }}
                >
                  {value}%
                </p>
                <p className="mt-[2px] text-[6.5px] leading-none text-slate-700">
                  {target}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* The shift, and where it went */}
      <div className="mt-2.5 flex items-center gap-2">
        <p className="text-[7px] font-medium leading-none text-slate-600">
          Shift timeline
        </p>
        <span className="ml-auto text-[6px] leading-none text-slate-400">
          Day shift
        </span>
      </div>
      <div className="mt-1.5 flex h-[17px] overflow-hidden rounded-[3px]">
        {OEE_SHIFT.map((seg, i) => (
          <span
            key={i}
            className="flex items-center justify-center overflow-hidden"
            style={{ width: seg.w + "%", backgroundColor: seg.tone }}
          >
            {seg.label && (
              <span className="text-[6px] leading-none text-white/90">
                {seg.label}
              </span>
            )}
          </span>
        ))}
      </div>

      <div className="mt-1 flex justify-between text-[6px] leading-none text-slate-400">
        <span>05:30</span>
        <span>08:30</span>
        <span>11:30</span>
        <span>15:58</span>
      </div>

      {/* What took it */}
      <p className="mt-2.5 text-[7px] font-medium leading-none text-slate-600">
        Stop distribution
      </p>
      <div className="mt-1.5 flex h-[46px] items-end gap-1.5 border-b border-slate-200">
        {OEE_DISTRIBUTION.map(({ label, times, tone }) => (
          <span
            key={label}
            className="flex-1 rounded-t-[2px]"
            style={{ height: times * 45 + "%", backgroundColor: tone }}
          />
        ))}
      </div>
      <div className="mt-1 flex gap-1.5">
        {OEE_DISTRIBUTION.map(({ label }) => (
          <span
            key={label}
            className="min-w-0 flex-1 truncate text-center text-[6px] leading-none text-slate-400"
          >
            {label}
          </span>
        ))}
      </div>

      {/* And the stops themselves, one after the other */}
      <p className="mt-3 text-[6px] font-semibold uppercase tracking-[0.08em] leading-none text-slate-400">
        Stop log
      </p>
      <div className="mt-1.5 space-y-[1px]">
        {OEE_LOG.map(({ at, reason, took, tone }, i) => (
          <div key={i} className="flex items-center gap-1.5 py-[3px]">
            <span
              className="size-[5px] shrink-0 rounded-[1px]"
              style={{ backgroundColor: tone }}
            />
            <span className="w-[22px] shrink-0 text-[6px] leading-none text-slate-400">
              {at}
            </span>
            <span className="min-w-0 flex-1 truncate text-[6.5px] leading-none text-slate-700">
              {reason}
            </span>
            <span className="shrink-0 text-[6.5px] font-medium leading-none text-slate-500">
              {took}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── QMS ────────────────────────────────────────────────
   Quality control as it is started at the machine. Three stacked blocks each
   carrying their own button read as three things to do; the panel only ever
   does one, so the type is a choice between three tiles and there is a single
   action under them. The key card sits between the two because it is what turns
   a check into a record: the order comes from the machine, the operator comes
   from the card, and neither is typed. */

const QMS_RECENT = [
  { type: "Startup", operator: "Rasmus Holm", at: "10:42" },
  { type: "Running", operator: "Mads Hauerslev", at: "07:30" },
  { type: "Colleague", operator: "Stefan Jensen", at: "06:15" },
  { type: "Running", operator: "Mads Hauerslev", at: "04:30" },
  { type: "Startup", operator: "Line Petersen", at: "22:10" },
  { type: "Running", operator: "Line Petersen", at: "19:30" },
]

const QMS_CONTROLS = [
  { label: "Startup", icon: Power, surface: "#e8f1fb", ink: "#2b6ea8" },
  { label: "Colleague", icon: Users, surface: "#f3e9fa", ink: "#7c3fa0" },
  { label: "Running", icon: Timer, surface: "#fdf0dd", ink: "#a06a1e" },
]

function QmsMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white px-3 pb-3 pt-2.5 shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))] ring-1 ring-black/10">
      <div className="flex items-center gap-2">
        <p
          className="text-[9.5px] font-semibold uppercase tracking-[0.06em] leading-none"
          style={{ color: "var(--green-dark3)" }}
        >
          Quality control
        </p>
        <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-1.5 py-[2px] text-[6px] font-medium leading-none text-slate-600">
          MS-Celle 1
        </span>
      </div>
      <p className="mt-[3px] text-[6.5px] leading-none text-slate-400">
        Started at the machine, filed against the running order
      </p>

      {/* The order comes off the machine, nobody types it */}
      <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-[7px]">
        <span className="min-w-0 truncate text-[6.5px] leading-none text-slate-500">
          Order <span className="font-semibold text-slate-800">12698295</span>
        </span>
        <span className="ml-auto shrink-0 text-[6.5px] leading-none text-slate-400">
          6h 23m in order
        </span>
      </div>

      {/* Pick the control, once */}
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {QMS_CONTROLS.map(({ label, icon: Icon, surface, ink }, i) => {
          const selected = i === 0
          return (
            <div
              key={label}
              className={
                "flex flex-col items-center rounded-lg px-1 py-2 " +
                (selected ? "bg-white" : "bg-slate-50")
              }
              style={
                selected
                  ? {
                      boxShadow:
                        "0 0 0 2px var(--green-dark3), 0 1px 3px rgba(0,0,0,0.08)",
                    }
                  : undefined
              }
            >
              <span
                className="grid size-[19px] place-items-center rounded-full"
                style={{ backgroundColor: surface, color: ink }}
              >
                <Icon className="size-[10px]" />
              </span>
              <span
                className={
                  "mt-[6px] text-[7px] leading-none " +
                  (selected ? "font-semibold text-slate-800" : "text-slate-500")
                }
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>

      {/* And the operator comes off the card */}
      <div className="mt-2 rounded-lg bg-slate-50 p-2">
        <div className="flex items-center gap-1.5">
          <CreditCard className="size-[8px] shrink-0 text-slate-400" />
          <span className="text-[6px] font-semibold uppercase tracking-[0.08em] leading-none text-slate-400">
            Key card scanner
          </span>
        </div>
        <div className="mt-1.5 flex items-end gap-1.5">
          <span className="min-w-0 flex-1">
            <span className="block text-[6px] leading-none text-slate-400">
              Operator
            </span>
            <span className="mt-[3px] block truncate rounded-md border border-slate-200 bg-white px-1.5 py-[5px] text-[7px] leading-none text-slate-700">
              Rasmus Holm
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[6px] leading-none text-slate-400">
              Card ID
            </span>
            <span className="mt-[3px] block truncate rounded-md border border-slate-200 bg-white px-1.5 py-[5px] text-[7px] leading-none tracking-[0.1em] text-slate-400">
              ···· 4821
            </span>
          </span>
          <span
            className="shrink-0 rounded-md px-1.5 py-[5px] text-[6.5px] font-semibold leading-none text-white"
            style={{ backgroundColor: "var(--green-dark1)" }}
          >
            SCAN
          </span>
        </div>
      </div>

      <p
        className="mt-2 rounded-md py-[7px] text-center text-[7.5px] font-medium leading-none text-white"
        style={{ backgroundColor: "var(--green-dark3)" }}
      >
        Start quality control
      </p>

      <div className="mt-2 flex items-center gap-1.5">
        <Timer className="size-[8px] shrink-0 text-slate-400" />
        <span className="min-w-0 flex-1 truncate text-[6.5px] leading-none text-slate-500">
          Next running check in{" "}
          <span className="font-semibold text-slate-700">2h 02m</span>
        </span>
        <span className="shrink-0 text-[6px] leading-none text-slate-400">
          every 3 hours
        </span>
      </div>

      {/* Every check already filed against this order, running on */}
      <p className="mt-3 text-[6px] font-semibold uppercase tracking-[0.08em] leading-none text-slate-400">
        Recent checks
      </p>
      <div className="mt-1.5 space-y-[1px]">
        {QMS_RECENT.map(({ type, operator, at }, i) => (
          <div key={i} className="flex items-center gap-1.5 py-[3px]">
            <CircleCheck className="size-[9px] shrink-0 text-emerald-500" />
            <span className="w-[34px] shrink-0 text-[6.5px] font-medium leading-none text-slate-700">
              {type}
            </span>
            <span className="min-w-0 flex-1 truncate text-[6.5px] leading-none text-slate-400">
              {operator}
            </span>
            <span className="shrink-0 text-[6px] leading-none text-slate-400">
              {at}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── EMS ────────────────────────────────────────────────
   No screenshot for this one: energy is not a screen of its own, it is process
   data drawn well. So the slide makes the module's actual claim visible, energy
   read against output rather than off a monthly bill: bars for units produced,
   a line for kWh per unit, and the two moving opposite each other. The heatmap
   under it is the month the bill hides, and it is what the card's fade takes. */

/** Units produced per 2-hour bucket, as a share of the busiest one. */
const EMS_OUTPUT = [62, 74, 58, 81, 69, 88, 77, 64, 90, 72, 66, 84, 59, 78]
/** kWh per produced unit for the same buckets: busier hours run leaner. */
const EMS_PER_UNIT = [
  0.44, 0.41, 0.49, 0.38, 0.43, 0.36, 0.4, 0.47, 0.35, 0.42, 0.45, 0.37, 0.48,
  0.41,
]
const EMS_AVG =
  EMS_PER_UNIT.reduce((sum, v) => sum + v, 0) / EMS_PER_UNIT.length

const EMS_METRICS = [
  { label: "kWh per unit", value: "0.42", unit: "kWh", delta: "-12%" },
  { label: "Power now", value: "42.6", unit: "kW" },
  { label: "Drying oven", value: "68", unit: "°C" },
]

/**
 * Energy intensity by hour across a week. Built from a shift pattern plus a
 * fixed hash so the block reads as real data and never moves between renders.
 */
const EMS_HEAT = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 16 }, (_, col) => {
    const shift = col >= 3 && col <= 12 ? 0.72 : 0.2
    const noise =
      Math.abs(Math.sin(row * 12.9898 + col * 4.1414) * 43758.5453) % 1
    return Math.min(1, Math.max(0.06, shift + noise * 0.3 - 0.12))
  })
)

/** The other signals on the same machine, each with its own trace. */
const EMS_SIGNALS = [
  { name: "Vibration", value: "3.2", unit: "mm/s", trace: [4, 7, 5, 9, 6, 8, 5, 7, 6] },
  { name: "Air flow", value: "118", unit: "l/min", trace: [7, 6, 8, 7, 5, 7, 8, 6, 7] },
  { name: "Air pressure", value: "6.1", unit: "bar", trace: [6, 6, 7, 5, 6, 6, 5, 7, 6] },
  { name: "Water temp", value: "41", unit: "°C", trace: [5, 6, 6, 7, 7, 8, 7, 8, 8] },
  { name: "Motor current", value: "12.4", unit: "A", trace: [8, 5, 9, 6, 8, 5, 9, 7, 8] },
]

function EmsMockup() {
  const perUnitY = (v: number) => {
    const top = 0.55
    const bottom = 0.3
    return 4 + ((top - v) / (top - bottom)) * 22
  }
  const perUnitPoints = EMS_PER_UNIT.map((v, i) => {
    const x = ((i + 0.5) / EMS_PER_UNIT.length) * 100
    return x.toFixed(2) + "," + perUnitY(v).toFixed(2)
  }).join(" ")

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))] ring-1 ring-black/10">
      <div className="px-3 pb-3 pt-2.5">
        <div className="flex items-center gap-2">
          <p
            className="text-[9.5px] font-semibold uppercase tracking-[0.06em] leading-none"
            style={{ color: "var(--green-dark3)" }}
          >
            Energy and telemetry
          </p>
          <span className="ml-auto inline-flex shrink-0 items-center gap-[3px] rounded-full bg-slate-100 px-1.5 py-[2px] text-[6px] font-medium leading-none text-slate-500">
            <span
              className="mockup-live-dot size-[4px] rounded-full"
              style={{ backgroundColor: "var(--green-system)" }}
            />
            Live
          </span>
        </div>
        <p className="mt-[3px] text-[6.5px] leading-none text-slate-400">
          Measured against production, not off a monthly bill
        </p>

        <div className="mt-2.5 flex items-center">
          {EMS_METRICS.map(({ label, value, unit, delta }, i) => (
            <div
              key={label}
              className={
                "min-w-0 flex-1 " +
                (i > 0 ? "border-l border-slate-200 pl-2" : "")
              }
            >
              <p className="truncate text-[6px] font-medium uppercase tracking-[0.06em] leading-none text-slate-400">
                {label}
              </p>
              <p className="mt-[3px] flex items-baseline gap-[3px]">
                <span className="text-[15px] font-normal leading-none tracking-tight text-slate-900">
                  {value}
                </span>
                <span className="text-[6px] leading-none text-slate-400">
                  {unit}
                </span>
                {delta && (
                  <span
                    className="text-[6px] font-semibold leading-none"
                    style={{ color: "var(--green-dark1)" }}
                  >
                    {delta}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Output and energy per unit, on one pair of axes */}
        <div className="mt-3 flex items-center gap-2">
          <p className="text-[7px] font-medium leading-none text-slate-600">
            Energy against output
          </p>
          <span className="ml-auto flex shrink-0 items-center gap-2">
            <span className="inline-flex items-center gap-[3px] text-[6px] leading-none text-slate-400">
              <span className="h-[5px] w-[4px] rounded-[1px] bg-slate-300" />
              Units
            </span>
            <span className="inline-flex items-center gap-[3px] text-[6px] leading-none text-slate-400">
              <span
                className="h-[2px] w-[6px] rounded-full"
                style={{ backgroundColor: "var(--green-dark3)" }}
              />
              kWh/unit
            </span>
          </span>
        </div>

        <div className="relative mt-1.5 h-[62px]">
          <span className="absolute inset-x-0 bottom-0 border-t border-slate-200" />
          <span className="absolute inset-0 flex items-end gap-[2px]">
            {EMS_OUTPUT.map((v, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[1px] bg-slate-200"
                style={{ height: v * 0.62 + "%" }}
              />
            ))}
          </span>
          <svg
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            style={{ color: "var(--green-dark3)" }}
            aria-hidden="true"
          >
            <line
              x1="0"
              x2="100"
              y1={perUnitY(EMS_AVG)}
              y2={perUnitY(EMS_AVG)}
              stroke="#e8b23a"
              strokeWidth="1"
              strokeDasharray="3 2"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points={perUnitPoints}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Where the month actually goes */}
        <p className="mt-3 text-[7px] font-medium leading-none text-slate-600">
          Energy intensity · hour by day
        </p>
        <div className="mt-1.5 space-y-[1px]">
          {EMS_HEAT.map((row, r) => (
            <div key={r} className="flex gap-[1px]">
              {row.map((v, c) => (
                <span
                  key={c}
                  className="h-[8px] flex-1 rounded-[1px]"
                  style={{
                    backgroundColor: "var(--green-dark3)",
                    opacity: 0.08 + v * 0.8,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[6px] leading-none text-slate-400">
          <span>00:00</span>
          <span>12:00</span>
          <span>24:00</span>
        </div>

        {/* Energy is one signal off the machine, these are the others */}
        <p className="mt-3 text-[6px] font-semibold uppercase tracking-[0.08em] leading-none text-slate-400">
          Live signals
        </p>
        <div className="mt-1.5 space-y-[1px]">
          {EMS_SIGNALS.map(({ name, value, unit, trace }) => (
            <div key={name} className="flex items-center gap-1.5 py-[3px]">
              <span className="min-w-0 flex-1 truncate text-[6.5px] leading-none text-slate-600">
                {name}
              </span>
              <svg
                viewBox="0 0 36 10"
                preserveAspectRatio="none"
                className="h-[9px] w-[36px] shrink-0"
                style={{ color: "var(--green-dark3)" }}
                aria-hidden="true"
              >
                {/* Drawn twice end to end, plus the joining point, so one
                    width of travel loops without a seam */}
                <g className="mockup-trace-scroll">
                  <polyline
                    points={[...trace, ...trace, trace[0]]
                      .map((v, i) => (i * 36) / trace.length + "," + (10 - v))
                      .join(" ")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </svg>
              <span className="w-[30px] shrink-0 text-right text-[6.5px] font-medium leading-none text-slate-800">
                {value}
              </span>
              <span className="w-[20px] shrink-0 text-[6px] leading-none text-slate-400">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Maintenance ────────────────────────────────────────
   Tasks management. The real table runs ten columns wide and prints the trigger
   in a column you have to read across to find; here the trigger is the whole
   point of the module, so each task becomes a card with the trigger under its
   name and an icon for the kind of thing that fires it. Priority is a dot
   rather than a pill, which keeps this from reading as the orders table again. */

const TASK_PRIORITIES = {
  critical: { label: "Critical", color: "#d4483f" },
  high: { label: "High", color: "#d08a2a" },
  medium: { label: "Medium", color: "#3b82c4" },
  low: { label: "Low", color: "#94a3b8" },
}

const MAINTENANCE_TASKS = [
  {
    name: "Lubrication",
    trigger: "Production hour reached · 100 hours",
    icon: Gauge,
    priority: TASK_PRIORITIES.medium,
    tagged: true,
  },
  {
    name: "Initial steps before producing",
    trigger: "Unit counter reached · 50 units",
    icon: Hash,
    priority: TASK_PRIORITIES.high,
    tagged: true,
  },
  {
    name: "Clean machine",
    trigger: "One time · CNC Drilling",
    icon: ClipboardCheck,
    priority: TASK_PRIORITIES.critical,
    tagged: false,
  },
  {
    name: "Roller 5 is broken down",
    trigger: "Reported at the machine · CNC Drilling",
    icon: Wrench,
    priority: TASK_PRIORITIES.low,
    tagged: true,
  },
  {
    name: "Daily service",
    trigger: "On a schedule · every day",
    icon: CalendarClock,
    priority: TASK_PRIORITIES.high,
    tagged: false,
  },
  {
    name: "Filter change",
    trigger: "Production hour reached · 500 hours",
    icon: Gauge,
    priority: TASK_PRIORITIES.medium,
    tagged: true,
  },
  {
    name: "Calibrate gauge 12",
    trigger: "On a schedule · every quarter",
    icon: CalendarClock,
    priority: TASK_PRIORITIES.low,
    tagged: false,
  },
  {
    name: "Check coolant level",
    trigger: "Unit counter reached · 2 000 units",
    icon: Hash,
    priority: TASK_PRIORITIES.medium,
    tagged: true,
  },
  {
    name: "Belt inspection",
    trigger: "Reported at the machine · Packing Line",
    icon: Wrench,
    priority: TASK_PRIORITIES.low,
    tagged: false,
  },
]

function MaintenanceMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))] ring-1 ring-black/10">
      <div className="px-3 pt-2.5">
        <div className="flex items-center gap-2">
          <p
            className="text-[9.5px] font-semibold uppercase tracking-[0.06em] leading-none"
            style={{ color: "var(--green-dark3)" }}
          >
            Tasks
          </p>
          <span
            className="ml-auto inline-flex shrink-0 items-center gap-[3px] rounded-md px-1.5 py-[4px] text-[7px] font-medium leading-none text-white"
            style={{ backgroundColor: "var(--green-dark3)" }}
          >
            <Plus className="size-[8px]" />
            Add task
          </span>
        </div>
        <p className="mt-[3px] text-[6.5px] leading-none text-slate-400">
          Tasks that fire on hours, counters and condition, not the calendar
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {[
            { label: "Open", count: "12", active: true },
            { label: "Queue", count: "3" },
            { label: "Finished", count: "48" },
          ].map(({ label, count, active }) => (
            <span
              key={label}
              className={
                "inline-flex items-center gap-[3px] rounded-full px-1.5 py-[2px] text-[6.5px] leading-none " +
                (active
                  ? "font-medium text-white"
                  : "text-slate-600 ring-1 ring-slate-200")
              }
              style={
                active ? { backgroundColor: "var(--green-dark3)" } : undefined
              }
            >
              {label}
              <span className={active ? "text-white/82" : "text-slate-400"}>
                {count}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* The queue, one card per task so the trigger gets a line of its own */}
      <div className="mt-2 space-y-[5px] bg-slate-50 px-3 py-2.5">
        {MAINTENANCE_TASKS.map(({ name, trigger, icon: Icon, priority, tagged }) => (
          <div key={name} className="rounded-lg bg-white p-[6px] ring-1 ring-slate-200">
            <div className="flex items-center gap-1.5">
              <span
                className="grid size-[15px] shrink-0 place-items-center rounded-full bg-slate-100"
                style={{ color: "var(--green-dark3)" }}
              >
                <Icon className="size-[8px]" />
              </span>
              <span className="min-w-0 flex-1 truncate text-[7.5px] font-semibold leading-none text-slate-800">
                {name}
              </span>
              <span
                className="inline-flex shrink-0 items-center gap-[3px] text-[6px] font-medium leading-none"
                style={{ color: priority.color }}
              >
                <span
                  className="size-[4px] rounded-full"
                  style={{ backgroundColor: priority.color }}
                />
                {priority.label}
              </span>
            </div>
            <div className="mt-[5px] flex items-center gap-1 pl-[21px]">
              <span className="min-w-0 flex-1 truncate text-[6.5px] leading-none text-slate-500">
                {trigger}
              </span>
              {tagged && (
                <span className="shrink-0 rounded-[3px] bg-emerald-600 px-1 py-[2px] text-[6px] font-medium leading-none text-white">
                  Maintenance
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Planning ───────────────────────────────────────────
   The production timeline. The real board carries a dozen routes, a day/week/
   month switch, two scrollbars and a WO number printed inside every bar; at a
   quarter of the size the bars are only 8px tall, so the labels come out and
   the colours do the talking, with the legend lifted above the grid where it
   stays readable. Rows keep going past the card, which is what a schedule
   scrolled to today actually looks like. */

type PlanBar = { start: number; span: number; tone: string }
type PlanRow = { entity: string; bars: PlanBar[] }
type PlanGroup = { route: string; rows: PlanRow[] }

/** Status colours, shared by the legend and the bars. */
const PLAN_TONES = {
  planned: "#7cb8ec",
  ready: "#7fca9b",
  progress: "#f0b775",
  blocked: "#eb9a95",
  done: "var(--green-dark2)",
}

const PLAN_GROUPS: PlanGroup[] = [
  {
    route: "Standard window / element",
    rows: [
      {
        entity: "CNC Cutter",
        bars: [
          { start: 0, span: 1, tone: PLAN_TONES.ready },
          { start: 3, span: 1.6, tone: PLAN_TONES.planned },
        ],
      },
      { entity: "Glass Cutter", bars: [{ start: 2.4, span: 0.8, tone: PLAN_TONES.planned }] },
      { entity: "CNC Mill", bars: [] },
      { entity: "Glue Line", bars: [{ start: 1.3, span: 1.4, tone: PLAN_TONES.progress }] },
      {
        entity: "Assembly A",
        bars: [
          { start: 1.5, span: 0.7, tone: PLAN_TONES.blocked },
          { start: 3.2, span: 0.8, tone: PLAN_TONES.blocked },
        ],
      },
      {
        entity: "Glazing",
        bars: [
          { start: 2.2, span: 0.8, tone: PLAN_TONES.progress },
          { start: 4.3, span: 1.2, tone: PLAN_TONES.blocked },
        ],
      },
      { entity: "Packing", bars: [{ start: 0, span: 1.4, tone: PLAN_TONES.done }] },
    ],
  },
  {
    route: "Aluminium facade",
    rows: [
      { entity: "CNC Cutter", bars: [{ start: 0.7, span: 1.4, tone: PLAN_TONES.ready }] },
      {
        entity: "Coating Line",
        bars: [
          { start: 3.6, span: 1.3, tone: PLAN_TONES.progress },
          { start: 4.9, span: 0.7, tone: PLAN_TONES.planned },
        ],
      },
      { entity: "Paint Line", bars: [] },
    ],
  },
  {
    route: "Timber door line",
    rows: [
      { entity: "Wood Saw", bars: [{ start: 2.2, span: 0.8, tone: PLAN_TONES.ready }] },
      { entity: "Planer", bars: [{ start: 3.1, span: 1.1, tone: PLAN_TONES.planned }] },
      {
        entity: "Door Press",
        bars: [
          { start: 0.4, span: 1.2, tone: PLAN_TONES.done },
          { start: 4.1, span: 1.1, tone: PLAN_TONES.progress },
        ],
      },
      { entity: "Hinge Router", bars: [] },
      { entity: "Sanding", bars: [{ start: 1.8, span: 1.5, tone: PLAN_TONES.progress }] },
    ],
  },
  {
    route: "Glass unit line",
    rows: [
      { entity: "Cutting Table", bars: [{ start: 0.6, span: 1.3, tone: PLAN_TONES.ready }] },
      { entity: "Washer", bars: [{ start: 2.6, span: 0.9, tone: PLAN_TONES.planned }] },
      {
        entity: "Sealing Line",
        bars: [
          { start: 1.2, span: 0.9, tone: PLAN_TONES.blocked },
          { start: 3.7, span: 1.4, tone: PLAN_TONES.planned },
        ],
      },
      { entity: "Curing", bars: [{ start: 4.2, span: 1.3, tone: PLAN_TONES.ready }] },
    ],
  },
]

const PLAN_DAYS = ["Mon 29", "Tue 30", "Wed 1", "Thu 2", "Fri 3", "Mon 6"]
const PLAN_COL = 100 / PLAN_DAYS.length
/** Thursday, where the schedule meets today. */
const PLAN_TODAY = 3 * PLAN_COL

const PLAN_LEGEND = [
  { label: "Planned", tone: PLAN_TONES.planned },
  { label: "Ready", tone: PLAN_TONES.ready },
  { label: "In progress", tone: PLAN_TONES.progress },
  { label: "Blocked", tone: PLAN_TONES.blocked },
  { label: "Done", tone: PLAN_TONES.done },
]

/** Column rules, drawn behind the bars of every row. */
const planGrid = {
  backgroundImage:
    "repeating-linear-gradient(to right, rgb(241 245 249) 0 1px, transparent 1px " +
    PLAN_COL.toFixed(3) +
    "%)",
}

function PlanningMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))] ring-1 ring-black/10">
      <div className="px-3 pt-2.5">
        <div className="flex items-center gap-2">
          <p
            className="text-[9.5px] font-semibold uppercase tracking-[0.06em] leading-none"
            style={{ color: "var(--green-dark3)" }}
          >
            Production timeline
          </p>
          <span className="ml-auto flex shrink-0 overflow-hidden rounded-full bg-slate-100 p-[1px] text-[6px] leading-none">
            <span
              className="rounded-full px-1.5 py-[2px] font-medium text-white"
              style={{ backgroundColor: "var(--green-dark3)" }}
            >
              Day
            </span>
            <span className="px-1.5 py-[2px] text-slate-500">Week</span>
            <span className="px-1.5 py-[2px] text-slate-500">Month</span>
          </span>
        </div>
        <p className="mt-[3px] text-[6.5px] leading-none text-slate-400">
          Drag a bar to reschedule across the entities of a route
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          {PLAN_LEGEND.map(({ label, tone }) => (
            <span
              key={label}
              className="inline-flex items-center gap-[3px] text-[6px] leading-none text-slate-500"
            >
              <span
                className="size-[5px] rounded-[1px]"
                style={{ backgroundColor: tone }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Day header, then the routes */}
      <div className="mt-2 flex border-y border-slate-200 bg-slate-50/70">
        <span className="w-[58px] shrink-0 px-2 py-[3px] text-[5.5px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          Entity
        </span>
        <span className="flex flex-1 py-[3px]">
          {PLAN_DAYS.map((day) => (
            <span
              key={day}
              className="flex-1 text-center text-[6px] font-medium leading-none text-slate-500"
            >
              {day}
            </span>
          ))}
        </span>
      </div>

      {PLAN_GROUPS.map((group) => (
        <div key={group.route}>
          <p
            className="px-2 py-[3px] text-[6px] font-semibold uppercase tracking-[0.1em] text-white/95"
            style={{ backgroundColor: "var(--green-dark3)" }}
          >
            {group.route}
          </p>
          {group.rows.map((row) => (
            <div
              key={group.route + row.entity}
              className="flex items-stretch border-b border-slate-100"
            >
              <span className="flex w-[58px] shrink-0 items-center px-2 text-[6.5px] leading-none text-slate-600">
                {row.entity}
              </span>
              <span className="relative h-[15px] flex-1" style={planGrid}>
                {/* Today */}
                <span
                  className="absolute inset-y-0 w-[1px] bg-sky-400"
                  style={{ left: PLAN_TODAY + "%" }}
                />
                {row.bars.map((bar, i) => (
                  <span
                    key={i}
                    className="absolute top-[3px] h-[9px] rounded-[2px]"
                    style={{
                      left: bar.start * PLAN_COL + "%",
                      width: bar.span * PLAN_COL + "%",
                      backgroundColor: bar.tone,
                    }}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── Orders ─────────────────────────────────────────────
   The work order list. Nine columns will not survive the width, so the ones an
   order is actually judged on stay (number, product, due, status) and priority
   becomes the coloured edge on the row. The filter counts are kept because they
   are what says this is a live queue rather than a table of records. */

type OrderRow = {
  id: string
  product: string
  due: string
  /** Urgent orders carry a red edge, high a warm one. */
  edge: string
  status: string
  statusClass: string
  /** Overdue and near-due dates are called out the way the app calls them out. */
  dueClass?: string
}

const ORDER_ROWS: OrderRow[] = [
  {
    id: "WO-10524",
    product: "Entrance door ED-7",
    due: "Wed 1 Jul",
    edge: "#e05b52",
    status: "In progress",
    statusClass: "bg-amber-50 text-amber-700 ring-amber-200",
    dueClass: "text-rose-600 font-semibold",
  },
  {
    id: "WO-10493",
    product: "Sliding door SD-2",
    due: "Thu 2 Jul",
    edge: "#e05b52",
    status: "Completed",
    statusClass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  {
    id: "WO-10482",
    product: "Wood/aluminium window A12",
    due: "Fri 3 Jul",
    edge: "#e05b52",
    status: "In progress",
    statusClass: "bg-amber-50 text-amber-700 ring-amber-200",
    dueClass: "text-amber-600 font-medium",
  },
  {
    id: "WO-10487",
    product: "Sliding door SD-2",
    due: "Fri 3 Jul",
    edge: "#e05b52",
    status: "Blocked",
    statusClass: "bg-rose-50 text-rose-700 ring-rose-200",
    dueClass: "text-amber-600 font-medium",
  },
  {
    id: "WO-10483",
    product: "Facade element F2",
    due: "Mon 6 Jul",
    edge: "#e8a94e",
    status: "Ready",
    statusClass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  {
    id: "WO-10489",
    product: "Entrance door ED-1",
    due: "Tue 7 Jul",
    edge: "#e8a94e",
    status: "In progress",
    statusClass: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  {
    id: "WO-10492",
    product: "Aluminium window AW-7",
    due: "Thu 9 Jul",
    edge: "#e8a94e",
    status: "Planned",
    statusClass: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  {
    id: "WO-10485",
    product: "Wood/aluminium window A14",
    due: "Fri 10 Jul",
    edge: "#e8a94e",
    status: "Planned",
    statusClass: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  {
    id: "WO-10494",
    product: "Wood/aluminium window A16",
    due: "Mon 13 Jul",
    edge: "#e8a94e",
    status: "Planned",
    statusClass: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  {
    id: "WO-10497",
    product: "Facade element F5",
    due: "Thu 16 Jul",
    edge: "#9aa7b4",
    status: "In progress",
    statusClass: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  {
    id: "WO-10500",
    product: "Fixed window FW-3",
    due: "Fri 17 Jul",
    edge: "#9aa7b4",
    status: "Ready",
    statusClass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  {
    id: "WO-10502",
    product: "Balcony door D5",
    due: "Mon 20 Jul",
    edge: "#9aa7b4",
    status: "Planned",
    statusClass: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  {
    id: "WO-10508",
    product: "Sliding door SD-4",
    due: "Wed 22 Jul",
    edge: "#9aa7b4",
    status: "Planned",
    statusClass: "bg-sky-50 text-sky-700 ring-sky-200",
  },
]

const ORDER_FILTERS = [
  { label: "All", count: "44", active: true },
  { label: "Ready to start", count: "24" },
  { label: "In progress", count: "10" },
  { label: "Blocked", count: "2" },
]

function OrdersMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))] ring-1 ring-black/10">
      <div className="px-3 pt-2.5">
        <p
          className="text-[9.5px] font-semibold uppercase tracking-[0.06em] leading-none"
          style={{ color: "var(--green-dark3)" }}
        >
          Work orders
        </p>
        <p className="mt-[3px] text-[6.5px] leading-none text-slate-400">
          Plan, filter and track orders across every station
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <span className="flex flex-1 items-center gap-1 rounded-md border border-slate-300 px-1.5 py-[4px]">
            <Search className="size-[8px] shrink-0 text-slate-400" />
            <span className="truncate text-[7px] leading-none text-slate-400">
              Search WO, product, customer
            </span>
          </span>
          <span
            className="inline-flex shrink-0 items-center gap-[3px] rounded-md px-1.5 py-[4px] text-[7px] font-medium leading-none text-white"
            style={{ backgroundColor: "var(--green-dark3)" }}
          >
            <Plus className="size-[8px]" />
            New
          </span>
        </div>

        <div className="mt-1.5 flex flex-wrap gap-1">
          {ORDER_FILTERS.map(({ label, count, active }) => (
            <span
              key={label}
              className={
                "inline-flex items-center gap-[3px] rounded-full px-1.5 py-[2px] text-[6.5px] leading-none " +
                (active
                  ? "font-medium text-white"
                  : "text-slate-600 ring-1 ring-slate-200")
              }
              style={
                active ? { backgroundColor: "var(--green-dark3)" } : undefined
              }
            >
              {label}
              <span className={active ? "text-white/82" : "text-slate-400"}>
                {count}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* The queue itself, running on past the card */}
      <div className="mt-2 flex items-center gap-1.5 border-y border-slate-200 bg-slate-50/70 px-3 py-[3px] text-[5.5px] font-semibold uppercase tracking-[0.08em] text-slate-400">
        <span className="w-[2px] shrink-0" />
        <span className="w-[34px] shrink-0">Order</span>
        <span className="flex-1">Product</span>
        <span className="w-[36px] shrink-0">Due</span>
        <span className="w-[42px] shrink-0">Status</span>
      </div>

      {ORDER_ROWS.map((row) => (
        <div
          key={row.id}
          className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-[5px]"
        >
          <span
            className="h-[13px] w-[2px] shrink-0 rounded-full"
            style={{ backgroundColor: row.edge }}
          />
          <span className="w-[34px] shrink-0 text-[6.5px] font-semibold leading-none text-slate-800">
            {row.id}
          </span>
          <span className="flex-1 truncate text-[6.5px] leading-none text-slate-500">
            {row.product}
          </span>
          <span
            className={
              "w-[36px] shrink-0 whitespace-nowrap text-[6px] leading-none " +
              (row.dueClass || "text-slate-400")
            }
          >
            {row.due}
          </span>
          <span className="w-[42px] shrink-0">
            <span
              className={
                "inline-flex rounded-full px-1 py-[2px] text-[6px] font-medium leading-none ring-1 " +
                row.statusClass
              }
            >
              {row.status}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── IoT ──────────────────────────────────────────────────────────────────
   Story: modern controls arrive over standard protocols, a 1998 press over a
   retrofitted sensor, and the raw signal is there to prove it. */

function IotMockup() {
  const machines = [
    { name: "CNC Robot", source: "Siemens S7 · OPC UA", icon: Cpu, bars: [5, 8, 6, 9, 7, 10, 8] },
    { name: "Press 4 (1998)", source: "Retrofit sensor", icon: Antenna, bars: [4, 6, 4, 7, 5, 6, 5], retrofit: true },
    { name: "Drying oven", source: "Modbus TCP", icon: Thermometer, bars: [6, 5, 7, 6, 8, 6, 7] },
    { name: "Packing line", source: "Profinet", icon: Cable, bars: [9, 6, 8, 5, 9, 7, 9] },
    { name: "Laser cutter", source: "Fanuc FOCAS", icon: Zap, bars: [7, 9, 6, 8, 9, 7, 8] },
    { name: "Tool washing", source: "EtherNet/IP", icon: Gauge, bars: [5, 6, 7, 5, 6, 7, 6] },
    { name: "Extruder 2", source: "MQTT", icon: Flame, bars: [8, 7, 9, 6, 8, 8, 7] },
  ]

  return (
    <div className="w-full">
      {/* Gateway status, offset so the stack reads as layered UI */}
      <div className={`${panel} mb-3 ml-auto flex w-[78%] items-center gap-2 px-3 py-2`}>
        <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-emerald-100 text-emerald-600">
          <Antenna className="size-3" />
        </span>
        <span className="text-[12px] font-medium text-slate-700">Edge gateway</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          1s
        </span>
      </div>

      {/* Raw signal off the retrofitted machine, the "measure it directly" bit */}
      <div className={`${panel} mb-3 w-[88%] px-3 py-2.5`}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-700">
            Press 4 · current draw
          </span>
          <span className="text-[10px] text-slate-400">12.4 A</span>
        </div>
        <svg
          viewBox="0 0 120 28"
          preserveAspectRatio="none"
          className="mt-1.5 h-7 w-full text-emerald-500"
          aria-hidden="true"
        >
          <path
            d="M0,22 8,21 16,10 24,9 32,20 40,21 48,9 56,8 64,21 72,22 80,11 88,9 96,21 104,22 112,12 120,10 120,28 0,28 Z"
            fill="currentColor"
            opacity="0.12"
          />
          <polyline
            points="0,22 8,21 16,10 24,9 32,20 40,21 48,9 56,8 64,21 72,22 80,11 88,9 96,21 104,22 112,12 120,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* The list that runs off the bottom edge */}
      <div className={`${panel} w-full p-3`}>
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[12px] font-semibold text-slate-700">
            Connected equipment
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
            24 online
          </span>
        </div>

        <div className="space-y-0.5">
          {machines.map(({ name, source, icon: Icon, bars, retrofit }) => (
            <div key={name} className="flex items-center gap-2 rounded-lg px-1 py-1.5">
              <span
                className={`inline-flex size-6 shrink-0 items-center justify-center rounded-md ${
                  retrofit
                    ? "bg-amber-50 text-amber-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon className="size-3.5" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[11px] font-medium leading-tight text-slate-700">
                  {name}
                </span>
                <span className="truncate text-[10px] leading-tight text-slate-400">
                  {source}
                </span>
              </span>
              <span className="flex h-5 shrink-0 items-end gap-[2px]">
                {bars.map((v, i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-sm bg-emerald-400"
                    style={{ height: `${v * 10}%` }}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Documents ────────────────────────────────────────────────────────────
   Story: the set is tied to the order at the machine, one approved version is
   current, and the superseded revision is visibly out of play. */

function DocumentsMockup() {
  const docs = [
    { name: "Setup sheet", meta: "Rev 4", icon: FileText, tone: "text-blue-600", badge: "Current" },
    { name: "Drawing 88-204", meta: "Rev 12", icon: PencilRuler, tone: "text-violet-600", badge: "Current" },
    { name: "Material certificate", meta: "Batch 7741", icon: BadgeCheck, tone: "text-emerald-600", badge: "Signed" },
    { name: "Cleaning instruction", meta: "Rev 2", icon: ClipboardCheck, tone: "text-amber-600", badge: "Read", amber: true },
    // The revision the floor is no longer allowed to run on
    { name: "Drawing 88-204", meta: "Rev 11", icon: History, tone: "text-slate-400", badge: "Replaced", replaced: true },
    { name: "Calibration record", meta: "Gauge 12", icon: ScanLine, tone: "text-sky-600", badge: "Signed" },
    { name: "Safety data sheet", meta: "Rev 3", icon: ShieldCheck, tone: "text-rose-500", badge: "Current" },
    { name: "Tool list", meta: "Rev 8", icon: FileText, tone: "text-blue-600", badge: "Current" },
  ]

  return (
    <div className="w-full">
      {/* What the operator has open right now */}
      <div className={`${panel} mb-3 ml-2 flex w-[76%] items-center gap-2 px-3 py-2`}>
        <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-blue-100 text-blue-600">
          <ClipboardCheck className="size-3" />
        </span>
        <span className="truncate text-[12px] font-medium text-slate-700">
          Order 45-1182
        </span>
        <span className="ml-auto shrink-0 text-[10px] text-slate-400">CNC Drilling</span>
      </div>

      <div className={`${panel} w-full p-3`}>
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[12px] font-semibold text-slate-700">
            At this machine
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            Up to date
          </span>
        </div>

        <div className="space-y-0.5">
          {docs.map(({ name, meta, icon: Icon, tone, badge, amber, replaced }) => (
            <div
              key={`${name}-${meta}`}
              className={`flex items-center gap-2 rounded-lg px-1 py-1.5 ${
                replaced ? "opacity-45" : ""
              }`}
            >
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-slate-100">
                <Icon className={`size-3.5 ${tone}`} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span
                  className={`truncate text-[11px] font-medium leading-tight ${
                    replaced ? "text-slate-500 line-through" : "text-slate-700"
                  }`}
                >
                  {name}
                </span>
                <span className="truncate text-[10px] leading-tight text-slate-400">
                  {meta}
                </span>
              </span>
              <span
                className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                  amber
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Documents, wide ────────────────────────────────────
   The same document set as DocumentsMockup above, relaid out for the module
   page's 16/9 visual frame instead of the slider card's tall crop. There is no
   screenshot of the document view to ship, so this draws the claim the page
   makes: one order, the documents that belong to it, and the revision the floor
   is no longer allowed to run on still visible but struck through.

   Sized in `em` off a single container-query font size, so the whole window
   scales with the frame the way a screenshot would, from the phone width up to
   the 1140px column, rather than reflowing into a different layout halfway. */

type DocRow = {
  name: string
  icon: LucideIcon
  tone: string
  revision: string
  scope: string
  status: string
  /** Slate by default; the pill colour carries the state. */
  statusTone?: "current" | "read"
  updated: string
  /** The superseded revision, kept visible and struck through. */
  replaced?: boolean
}

const DOCUMENT_ROWS: DocRow[] = [
  {
    name: "Setup sheet",
    icon: FileText,
    tone: "text-blue-600",
    revision: "Rev 4",
    scope: "CNC Drilling",
    status: "Current",
    statusTone: "current",
    updated: "12 Jun",
  },
  {
    name: "Drawing 88-204",
    icon: PencilRuler,
    tone: "text-violet-600",
    revision: "Rev 12",
    scope: "Order 45-1182",
    status: "Current",
    statusTone: "current",
    updated: "24 Jun",
  },
  {
    name: "Material certificate",
    icon: BadgeCheck,
    tone: "text-emerald-600",
    revision: "Batch 7741",
    scope: "Steel S355",
    status: "Signed",
    updated: "24 Jun",
  },
  {
    name: "Cleaning instruction",
    icon: ClipboardCheck,
    tone: "text-amber-600",
    revision: "Rev 2",
    scope: "CNC Drilling",
    status: "Read",
    statusTone: "read",
    updated: "3 Jun",
  },
  {
    name: "Drawing 88-204",
    icon: History,
    tone: "text-slate-400",
    revision: "Rev 11",
    scope: "Order 45-1182",
    status: "Replaced",
    updated: "2 May",
    replaced: true,
  },
  {
    name: "Calibration record",
    icon: ScanLine,
    tone: "text-sky-600",
    revision: "Gauge 12",
    scope: "CNC Drilling",
    status: "Signed",
    updated: "18 Jun",
  },
  {
    name: "Safety data sheet",
    icon: ShieldCheck,
    tone: "text-rose-500",
    revision: "Rev 3",
    scope: "Coolant C-40",
    status: "Current",
    statusTone: "current",
    updated: "9 Apr",
  },
  {
    name: "Tool list",
    icon: FileText,
    tone: "text-blue-600",
    revision: "Rev 8",
    scope: "CNC Drilling",
    status: "Current",
    statusTone: "current",
    updated: "11 Jun",
  },
]

const DOC_GRID =
  "grid grid-cols-[2.6fr_1fr_1.5fr_1fr_0.9fr] items-center gap-[0.6em]"

/** Documents, drawn for the standard page's 16/9 visual frame. */
export function DocumentsVisual() {
  return (
    <div className="@container absolute inset-0 flex items-center justify-center">
      <div
        className="w-[92%] overflow-hidden rounded-[0.85em] bg-white text-left text-slate-700 shadow-[0_1.5em_3em_-1.4em_rgba(0,0,0,0.65)] ring-1 ring-black/10"
        style={{ fontSize: "clamp(6px, 1.4cqw, 16px)" }}
      >
        {/* Window strip, the same chrome the real captures carry. */}
        <div className="flex items-baseline gap-[0.4em] border-b border-slate-200 bg-slate-50 px-[1.3em] py-[0.85em]">
          <span className="text-[0.95em] font-semibold text-slate-700">
            Documents
          </span>
          <span className="text-[0.9em] text-slate-400">- Opticloud Demo</span>
        </div>

        <div className="px-[1.3em] py-[1.2em]">
          {/* The order the operator has open, and whether the set is current. */}
          <div className="flex items-center gap-[0.7em]">
            <span className="inline-flex size-[2em] shrink-0 items-center justify-center rounded-[0.45em] bg-blue-50 text-blue-600">
              <ClipboardCheck className="size-[1.1em]" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-semibold text-slate-700">
                Order 45-1182
              </span>
              <span className="truncate text-[0.85em] text-slate-400">
                CNC Drilling · Setup
              </span>
            </span>
            <span className="ml-auto shrink-0 rounded-full bg-emerald-50 px-[0.75em] py-[0.25em] text-[0.8em] font-medium text-emerald-700">
              Up to date
            </span>
          </div>

          <div className="mt-[1.1em] overflow-hidden rounded-[0.5em] ring-1 ring-slate-200">
            <div
              className={`${DOC_GRID} bg-slate-50 px-[0.9em] py-[0.55em] text-[0.75em] font-semibold uppercase tracking-[0.09em] text-slate-400`}
            >
              <span>Document</span>
              <span>Revision</span>
              <span>Applies to</span>
              <span>Status</span>
              <span className="text-right">Updated</span>
            </div>

            {DOCUMENT_ROWS.map((row) => {
              const Icon = row.icon
              return (
                <div
                  key={`${row.name}-${row.revision}`}
                  className={`${DOC_GRID} border-t border-slate-100 px-[0.9em] py-[0.5em] text-[0.85em] ${
                    row.replaced ? "opacity-45" : ""
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-[0.6em]">
                    <span className="inline-flex size-[1.8em] shrink-0 items-center justify-center rounded-[0.4em] bg-slate-100">
                      <Icon className={`size-[1em] ${row.tone}`} />
                    </span>
                    <span
                      className={`truncate font-medium ${
                        row.replaced
                          ? "text-slate-500 line-through"
                          : "text-slate-700"
                      }`}
                    >
                      {row.name}
                    </span>
                  </span>
                  <span className="truncate text-slate-500">{row.revision}</span>
                  <span className="truncate text-slate-500">{row.scope}</span>
                  <span>
                    <span
                      className={`inline-block rounded-full px-[0.6em] py-[0.15em] text-[0.9em] font-medium ${
                        row.statusTone === "current"
                          ? "bg-emerald-50 text-emerald-700"
                          : row.statusTone === "read"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </span>
                  <span className="truncate text-right tabular-nums text-slate-400">
                    {row.updated}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Analysis ───────────────────────────────────────────
   The production counters report, redrawn rather than traced. The real screen
   carries five section tabs, an axis full of tick labels and a control bar; at
   a quarter of the size all of that collapses into grey noise, so this keeps
   the parts that still read: the report chrome, the two counters that matter,
   and the hourly curve. The per-day bars are last because a row of bars is the
   one element that looks intentional when the card's bottom fade takes it. */

/** Counter per hour, the spiky series the report is known for. */
const HOURLY_COUNTS = [
  2, 26, 21, 25, 12, 15, 32, 14, 13, 15, 16, 5, 17, 14, 16, 33, 12, 15, 21, 20,
  17, 25, 14, 22, 21, 8, 4, 16, 15, 19, 15, 16, 29, 20, 12, 10, 18, 26, 14, 25,
  20, 13, 8, 3,
]

const DAILY_COUNTS = [396, 379, 412, 358, 431, 402, 374]

/** Where the week's lost time went, as a share of it. */
const ANALYSIS_LOSSES = [
  { reason: "Tool change", share: 32 },
  { reason: "Material wait", share: 24 },
  { reason: "Setup", share: 18 },
  { reason: "QA check", share: 14 },
  { reason: "Cleaning", share: 8 },
  { reason: "Other", share: 4 },
]

function AnalysisMockup() {
  const chartH = 30
  const peak = 36
  const line = HOURLY_COUNTS.map((v, i) => {
    const x = (i / (HOURLY_COUNTS.length - 1)) * 100
    const y = chartH - (v / peak) * chartH
    return x.toFixed(2) + "," + y.toFixed(2)
  })
  const area = "0," + chartH + " " + line.join(" ") + " 100," + chartH

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))] ring-1 ring-black/10">
      {/* Report chrome: who it belongs to, which machine, which section */}
      <div className="flex items-center gap-2 px-3 pb-1 pt-2.5">
        <Image src={logo} alt="" width={140} height={28} className="h-[10px] w-auto" />
        <span className="ml-auto inline-flex items-center gap-[3px] rounded-full bg-slate-100 px-1.5 py-[2px] text-[6.5px] font-medium text-slate-600">
          CNC Drilling
          <ChevronDown className="size-[6px]" />
        </span>
      </div>

      <div className="flex items-end gap-1 border-b border-slate-200 px-3">
        {["Filters", "KPIs", "Stop events"].map((label, i) => (
          <span
            key={label}
            className={
              "inline-flex items-center gap-[3px] whitespace-nowrap rounded-t-[4px] px-1.5 py-[3px] text-[6.5px] " +
              (i === 0 ? "font-semibold text-white" : "text-slate-500")
            }
            style={
              i === 0 ? { backgroundColor: "var(--green-dark3)" } : undefined
            }
          >
            {i === 0 && <Filter className="size-[5px]" />}
            {label}
          </span>
        ))}
      </div>

      <div className="px-3 pb-3 pt-2.5">
        <div className="flex items-start gap-2">
          <div className="min-w-0">
            <p className="text-[10.5px] font-medium leading-none tracking-tight text-slate-900">
              Production counters
            </p>
            <p className="mt-[3px] text-[6.5px] leading-none text-slate-400">
              Last 48 hours · Unit counter
            </p>
          </div>
          <span className="ml-auto inline-flex size-[14px] shrink-0 items-center justify-center rounded-[4px] bg-slate-100 text-slate-500">
            <Download className="size-[7px]" />
          </span>
        </div>

        {/* The two numbers the report is opened for */}
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <div className="rounded-lg bg-slate-50 px-2 py-1.5">
            <p className="text-[6px] font-medium uppercase tracking-[0.08em] text-slate-400">
              Produced
            </p>
            <p className="mt-[2px] flex items-baseline gap-1">
              <span className="text-[19px] font-normal leading-none tracking-tight text-slate-900">
                991
              </span>
              <span
                className="text-[6px] font-semibold leading-none"
                style={{ color: "var(--green-dark1)" }}
              >
                +4%
              </span>
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 px-2 py-1.5">
            <p className="text-[6px] font-medium uppercase tracking-[0.08em] text-slate-400">
              Rejected
            </p>
            <p className="mt-[2px] flex items-baseline gap-1">
              <span className="text-[19px] font-normal leading-none tracking-tight text-slate-400">
                216
              </span>
              <span className="text-[6px] font-medium leading-none text-slate-400">
                17.9%
              </span>
            </p>
          </div>
        </div>

        {/* Hourly curve, the shape of the shift */}
        <p className="mt-3 text-[7px] font-medium leading-none text-slate-600">
          Counter per hour
        </p>
        <div className="relative mt-1.5 h-[48px]">
          <span className="absolute inset-x-0 top-0 border-t border-dashed border-slate-200/70" />
          <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-200/70" />
          <span className="absolute inset-x-0 bottom-0 border-t border-slate-200" />
          <svg
            viewBox={"0 0 100 " + chartH}
            preserveAspectRatio="none"
            className="h-full w-full"
            style={{ color: "var(--green-dark3)" }}
            aria-hidden="true"
          >
            <polygon points={area} fill="currentColor" opacity="0.1" />
            <polyline
              points={line.join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="mt-1 flex justify-between text-[6px] leading-none text-slate-400">
          <span>Jun 22</span>
          <span>Jun 23</span>
          <span>Jun 24</span>
        </div>

        {/* Per day, the run that keeps going past the card */}
        <div className="mt-3 flex items-center gap-2">
          <p className="text-[7px] font-medium leading-none text-slate-600">
            Counter per day
          </p>
          <span className="ml-auto flex overflow-hidden rounded-full bg-slate-100 p-[1px] text-[6px] leading-none">
            <span
              className="rounded-full px-1.5 py-[2px] font-medium text-white"
              style={{ backgroundColor: "var(--green-dark3)" }}
            >
              Unit
            </span>
            <span className="px-1.5 py-[2px] text-slate-500">Group</span>
          </span>
        </div>
        <div className="mt-2 flex h-[42px] items-end gap-1.5">
          {DAILY_COUNTS.map((value, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-[2px]"
              style={{
                height: (value / 460) * 42 + "px",
                backgroundColor: "var(--green-dark3)",
                opacity: 0.9 - i * 0.03,
              }}
            />
          ))}
        </div>

        {/* What the report is actually for */}
        <p className="mt-3 text-[6px] font-semibold uppercase tracking-[0.08em] leading-none text-slate-400">
          Loss by reason
        </p>
        <div className="mt-1.5 space-y-[3px]">
          {ANALYSIS_LOSSES.map(({ reason, share }) => (
            <div key={reason} className="flex items-center gap-1.5">
              <span className="w-[46px] shrink-0 truncate text-[6.5px] leading-none text-slate-600">
                {reason}
              </span>
              <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-slate-100">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: share * 2.6 + "%",
                    backgroundColor: "var(--green-dark3)",
                  }}
                />
              </span>
              <span className="w-[16px] shrink-0 text-right text-[6px] font-medium leading-none text-slate-500">
                {share}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── AI agents ───────────────────────────────────────────
   Opti Assist, redrawn: the dark shell, the documents rail and the greeting are
   the app, the rest is a first exchange rather than the empty screen the real
   product opens on. An empty state has nothing to show and left the card short;
   an answer with its steps and its sources fills the height and is the actual
   argument for the module. The composer is last, so the card's bottom fade
   takes it the way it takes the bars on the analysis slide. */

function AiAgentsMockup() {
  const steps = [
    "Stop the spindle and open the guard",
    "Release the collet with the 24 mm wrench",
    "Seat the new bit, torque to 18 Nm",
  ]

  return (
    <div className="w-full overflow-hidden rounded-xl bg-[var(--gray-8)] shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))] ring-1 ring-white/10">
      {/* App bar, logo hard left and the signed-in user on the right */}
      <div className="flex items-center gap-2 px-2.5 py-[7px]">
        <Image src={logo} alt="" width={140} height={28} className="h-[9px] w-auto invert" />
        <span className="ml-auto truncate text-[7.5px] font-medium text-white/90">
          Welcome, Morten
        </span>
        <span className="grid size-[11px] shrink-0 place-items-center rounded-[3px] bg-white/15 text-white/88">
          <ChevronDown className="size-2" />
        </span>
      </div>

      <div className="flex">
        {/* Collapsed documents rail */}
        <div className="flex w-[18px] shrink-0 flex-col items-center gap-2 pt-2.5">
          <PanelLeftOpen className="size-[9px] text-white/85" />
          <span className="rotate-180 text-[6px] font-medium tracking-[0.14em] text-white/72 [writing-mode:vertical-rl]">
            DOCUMENTS
          </span>
        </div>

        {/* The conversation */}
        <div className="flex-1 rounded-tl-xl bg-[#f4f5f6] px-3 pb-3 pt-3">
          <p className="text-[10.5px] font-normal leading-[1.35] text-slate-900">
            Ask about installation, maintenance, tool changes or anything from
            your machine’s manual.
          </p>
          <p className="mt-1.5 text-[7px] leading-[1.4] text-slate-400">
            <span className="font-semibold text-slate-500">
              I can make mistakes.
            </span>{" "}
            Always check the manual before working on the machine.
          </p>

          {/* What the operator asked */}
          <div className="mt-3 flex justify-end">
            <span
              className="max-w-[85%] rounded-xl rounded-br-[4px] px-2 py-[5px] text-[7.5px] leading-[1.4] text-white"
              style={{ backgroundColor: "var(--green-dark3)" }}
            >
              How do I change the drill bit?
            </span>
          </div>

          {/* What it answered, and what it answered from */}
          <div className="mt-2.5 flex items-center gap-1">
            <span
              className="grid size-[11px] place-items-center rounded-full text-white"
              style={{ backgroundColor: "var(--green-dark1)" }}
            >
              <Sparkles className="size-[6px]" />
            </span>
            <span className="text-[7px] font-semibold text-slate-700">
              Opti Assist
            </span>
            <span className="text-[6.5px] text-slate-400">· CNC Drilling</span>
          </div>

          <p className="mt-1.5 text-[7.5px] leading-[1.45] text-slate-600">
            Three steps for the drilling head. The spindle has to be stopped
            before you start.
          </p>

          <div className="mt-1.5 space-y-[5px] rounded-lg bg-white p-2 ring-1 ring-slate-200">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5">
                <span
                  className="grid size-[10px] shrink-0 place-items-center rounded-full text-[6px] font-semibold"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--green-dark3) 12%, transparent)",
                    color: "var(--green-dark3)",
                  }}
                >
                  {i + 1}
                </span>
                <span className="truncate text-[7px] leading-none text-slate-600">
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-1.5 flex flex-wrap gap-1">
            {["Machine manual · p. 42", "Setup sheet Rev 4"].map((source) => (
              <span
                key={source}
                className="inline-flex items-center gap-[3px] rounded-full bg-white px-1.5 py-[2px] text-[6.5px] text-slate-500 ring-1 ring-slate-200"
              >
                <FileText className="size-[6px]" />
                {source}
              </span>
            ))}
          </div>

          {/* And the next question, because one answer is never the end */}
          <div className="mt-3 flex justify-end">
            <span
              className="max-w-[85%] rounded-xl rounded-br-[4px] px-2 py-[5px] text-[7.5px] leading-[1.4] text-white"
              style={{ backgroundColor: "var(--green-dark3)" }}
            >
              When is the next service due?
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-1">
            <span
              className="grid size-[11px] place-items-center rounded-full text-white"
              style={{ backgroundColor: "var(--green-dark1)" }}
            >
              <Sparkles className="size-[6px]" />
            </span>
            <span className="text-[7px] font-semibold text-slate-700">
              Opti Assist
            </span>
          </div>

          <p className="mt-1.5 text-[7.5px] leading-[1.45] text-slate-600">
            Lubrication is due in 42 machine hours, around Thursday on the
            current run rate.
          </p>

          <div className="mt-1.5 flex flex-wrap gap-1">
            {["Maintenance task 4471", "Run rate · 7 days"].map((source) => (
              <span
                key={source}
                className="inline-flex items-center gap-[3px] rounded-full bg-white px-1.5 py-[2px] text-[6.5px] text-slate-500 ring-1 ring-slate-200"
              >
                <FileText className="size-[6px]" />
                {source}
              </span>
            ))}
          </div>

          {/* The one still being answered, which is what makes it read live */}
          <div className="mt-3 flex justify-end">
            <span
              className="max-w-[85%] rounded-xl rounded-br-[4px] px-2 py-[5px] text-[7.5px] leading-[1.4] text-white"
              style={{ backgroundColor: "var(--green-dark3)" }}
            >
              Book it for Thursday then.
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-1">
            <span
              className="grid size-[11px] place-items-center rounded-full text-white"
              style={{ backgroundColor: "var(--green-dark1)" }}
            >
              <Sparkles className="size-[6px]" />
            </span>
            <span className="inline-flex items-center gap-[3px] rounded-full bg-white px-1.5 py-[4px] ring-1 ring-slate-200">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="mockup-typing-dot size-[3px] rounded-full bg-slate-400"
                  style={{ animationDelay: i * 0.16 + "s" }}
                />
              ))}
            </span>
          </div>

          {/* Machine context on the left, the human fallback on the right */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-1.5 py-[3px] text-[7px] font-semibold tracking-wide text-slate-700">
              <Cpu className="size-[7px]" />
              CNC DRILLING
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-1.5 py-[3px] text-[7.5px] text-slate-700">
              <Wrench className="size-[7px]" />
              Call service
            </span>
          </div>

          <div className="mt-1.5 flex items-center gap-1">
            <span className="flex flex-1 items-center gap-1 rounded-md border border-slate-300 bg-white px-1.5 py-[5px]">
              <Plus className="size-[9px] shrink-0 text-slate-600" />
              <span className="flex min-w-0 flex-1 items-center gap-[1px]">
                <span className="truncate text-[8px] text-slate-400">
                  Write your question here…
                </span>
                <span className="mockup-caret h-[8px] w-[1px] shrink-0 bg-slate-500" />
              </span>
              <Mic className="size-[8px] shrink-0 text-slate-500" />
            </span>
            <span
              className="rounded-md px-1.5 py-[5px] text-[8px] text-white"
              style={{ backgroundColor: "var(--green-dark3)" }}
            >
              Send
            </span>
          </div>
        </div>
      </div>

      {/* Brand bar along the bottom of the app window */}
      <div className="h-[2px] w-full bg-[#e8b23a]" />
      <div className="h-[4px] w-full bg-[var(--green-system)]" />
    </div>
  )
}
