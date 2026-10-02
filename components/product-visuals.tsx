import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  Antenna,
  ChevronDown,
  Cpu,
  Database,
  FileText,
  Gauge,
  Layers,
  Mic,
  Network,
  PanelLeftOpen,
  Plus,
  Server,
  Sparkles,
  Thermometer,
} from "lucide-react"

import logo from "@/app/Optipeople-Logo-Vector.svg"

/**
 * Drawn visuals for the homepage product chapters (components/product-chapters.tsx).
 *
 * Same method as the `*Visual` family in components/module-mockups.tsx: one
 * font size on an `@container` wrapper, every size inside in `em`, so the panel
 * scales with the column it sits in. The chapters put these in a column about
 * half the page wide, so the type reads the container harder (2.1cqw) than the
 * full-width page visuals do, and floors at 9px so nothing lands below 6px.
 *
 * MesVisual is reused (with `fill={false}`); these two are the ones the chapters needed and
 * the module pages never had.
 */
const scale = "@container w-full text-[clamp(9px,2.1cqw,15px)]"

/* ── IoT ──────────────────────────────────────────────────────────────────
   Story: consolidate first. Most of the sources are things the site already
   had, a sensor kit, energy meters, a historian, the ERP, and only one machine
   needed hardware. The list says so with its badges, and the dark card on the
   right is where all of it lands. */

type IotSource = {
  name: string
  via: string
  icon: LucideIcon
  status: "reused" | "added" | "native"
}

const IOT_GROUPS: { label: string; sources: IotSource[] }[] = [
  {
    label: "Machines",
    sources: [
      { name: "CNC Robot", via: "Siemens S7 · OPC UA", icon: Cpu, status: "native" },
      { name: "Press 4 (1998)", via: "Retrofit current sensor", icon: Antenna, status: "added" },
    ],
  },
  {
    label: "Hardware you had",
    sources: [
      { name: "Sensor kit, line 2", via: "Modbus TCP", icon: Thermometer, status: "reused" },
      { name: "Energy meters", via: "M-Bus", icon: Gauge, status: "reused" },
    ],
  },
  {
    label: "Systems you run",
    sources: [
      { name: "SCADA historian", via: "SQL", icon: Server, status: "reused" },
      { name: "ERP", via: "REST API", icon: Network, status: "reused" },
    ],
  },
]

const IOT_BADGE: Record<IotSource["status"], { label: string; className: string }> = {
  reused: { label: "Reused", className: "bg-emerald-50 text-emerald-700" },
  added: { label: "Sensor added", className: "bg-amber-50 text-amber-700" },
  native: { label: "Connected", className: "bg-slate-100 text-slate-600" },
}

export function IotVisual() {
  return (
    <div className={scale}>
      <div className="overflow-hidden rounded-[0.85em] bg-white text-left text-slate-700 shadow-[0_1.5em_3em_-1.4em_rgba(0,0,0,0.45)] ring-1 ring-black/10">
        <div className="flex items-baseline gap-[0.6em] border-b border-slate-200 bg-slate-50 px-[1.3em] py-[0.85em]">
          <span className="text-[0.95em] font-semibold" style={{ color: "var(--green-dark3)" }}>
            Connected sources
          </span>
          <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-[0.7em] py-[0.2em] text-[0.75em] font-medium text-slate-600">
            6 online
          </span>
        </div>

        <div className="grid gap-[1.1em] p-[1.3em] sm:grid-cols-[1.35fr_1fr]">
          <div className="space-y-[0.9em]">
            {IOT_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-[0.7em] font-semibold uppercase tracking-[0.1em] text-slate-400">
                  {group.label}
                </p>
                <div className="mt-[0.35em] space-y-[0.15em]">
                  {group.sources.map(({ name, via, icon: Icon, status }) => (
                    <div key={name} className="flex items-center gap-[0.6em] py-[0.25em]">
                      <span className="grid size-[1.9em] shrink-0 place-items-center rounded-[0.45em] bg-slate-100 text-slate-600">
                        <Icon className="size-[1em]" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-[0.85em] font-medium leading-tight text-slate-800">
                          {name}
                        </span>
                        <span className="truncate text-[0.75em] leading-tight text-slate-400">
                          {via}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-[0.6em] py-[0.15em] text-[0.7em] font-medium ${IOT_BADGE[status].className}`}
                      >
                        {IOT_BADGE[status].label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Where it all lands */}
          <div
            className="flex flex-col rounded-[0.7em] p-[1.1em] text-white"
            style={{ backgroundColor: "var(--green-dark3)" }}
          >
            <span className="flex items-center gap-[0.5em]">
              <Database className="size-[1em] shrink-0 text-white/82" />
              <span className="text-[0.85em] font-semibold">One data foundation</span>
            </span>
            <p className="mt-[0.9em] text-[2.2em] font-light leading-none tabular-nums">1,284</p>
            <p className="mt-[0.3em] text-[0.75em] text-white/72">live tags from 6 sources</p>

            <div className="mt-[1.1em] rounded-[0.5em] bg-white/[0.08] p-[0.7em]">
              <div className="flex items-center justify-between text-[0.7em] text-white/78">
                <span>Line 2 · oven temp.</span>
                <span className="tabular-nums">184 °C</span>
              </div>
              <svg
                viewBox="0 0 120 30"
                preserveAspectRatio="none"
                className="mt-[0.4em] h-[2.6em] w-full"
                style={{ color: "var(--green-light2, #9fe0b4)" }}
                aria-hidden="true"
              >
                <path
                  d="M0,20 10,18 20,19 30,14 40,15 50,11 60,12 70,9 80,11 90,8 100,10 110,7 120,8 120,30 0,30 Z"
                  fill="currentColor"
                  opacity="0.15"
                />
                <polyline
                  points="0,20 10,18 20,19 30,14 40,15 50,11 60,12 70,9 80,11 90,8 100,10 110,7 120,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-auto flex flex-wrap gap-[0.35em] pt-[1em]">
              {["Machine", "Order", "Batch", "Shift"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/[0.12] px-[0.65em] py-[0.15em] text-[0.7em] text-white/88"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[0.5em] border-t border-slate-100 px-[1.3em] py-[0.7em] text-[0.75em] text-slate-500">
          <Layers className="size-[1.1em] shrink-0 text-slate-400" />
          <span className="truncate">5 of 6 sources were already on site. One sensor added.</span>
        </div>
      </div>
    </div>
  )
}

/* ── Opti Assist ───────────────────────────────────────────────────────────
   The app's dark shell and documents rail, carrying the two kinds of answer
   that make the case: one from live production data (last night's stops) and
   one from the documents (the procedure). Each answer shows what it came from.
   A larger cousin of AiAgentsMockup in module-mockups.tsx. */

function AssistName({ context }: { context?: string }) {
  return (
    <div className="mt-[1.1em] flex items-center gap-[0.4em]">
      <span
        className="grid size-[1.4em] place-items-center rounded-full text-white"
        style={{ backgroundColor: "var(--green-dark1)" }}
      >
        <Sparkles className="size-[0.75em]" />
      </span>
      <span className="text-[0.85em] font-semibold text-slate-700">Opti Assist</span>
      {context ? <span className="text-[0.8em] text-slate-400">· {context}</span> : null}
    </div>
  )
}

function AssistQuestion({ children }: { children: string }) {
  return (
    <div className="mt-[1.1em] flex justify-end">
      <span
        className="max-w-[85%] rounded-[1.1em] rounded-br-[0.35em] px-[0.9em] py-[0.5em] text-[0.9em] leading-[1.4] text-white"
        style={{ backgroundColor: "var(--green-dark3)" }}
      >
        {children}
      </span>
    </div>
  )
}

function AssistSources({ sources }: { sources: string[] }) {
  return (
    <div className="mt-[0.6em] flex flex-wrap gap-[0.4em]">
      {sources.map((source) => (
        <span
          key={source}
          className="inline-flex items-center gap-[0.35em] rounded-full bg-white px-[0.7em] py-[0.2em] text-[0.75em] text-slate-500 ring-1 ring-slate-200"
        >
          <FileText className="size-[0.9em]" />
          {source}
        </span>
      ))}
    </div>
  )
}

const ASSIST_STOPS = [
  { cause: "Tool error", count: 4 },
  { cause: "Waiting for material", count: 1 },
  { cause: "Setup", count: 1 },
]

const ASSIST_STEPS = [
  "Stop the spindle and open the guard",
  "Release the collet with the 24 mm wrench",
  "Seat the new bit, torque to 18 Nm",
]

export function AssistVisual() {
  const max = Math.max(...ASSIST_STOPS.map((s) => s.count))

  return (
    <div className={scale}>
      <div className="overflow-hidden rounded-[0.85em] bg-[var(--gray-8)] text-left shadow-[0_1.5em_3em_-1.4em_rgba(0,0,0,0.6)] ring-1 ring-white/10">
        <div className="flex items-center gap-[0.6em] px-[1em] py-[0.6em]">
          <Image src={logo} alt="" width={140} height={28} className="h-[0.95em] w-auto invert" />
          <span className="ml-auto truncate text-[0.8em] font-medium text-white/90">
            Welcome, Anna
          </span>
          <span className="grid size-[1.3em] shrink-0 place-items-center rounded-[0.3em] bg-white/15 text-white/88">
            <ChevronDown className="size-[0.9em]" />
          </span>
        </div>

        <div className="flex">
          <div className="flex w-[2em] shrink-0 flex-col items-center gap-[0.8em] pt-[1em]">
            <PanelLeftOpen className="size-[1em] text-white/85" />
            <span className="rotate-180 text-[0.7em] font-medium tracking-[0.14em] text-white/72 [writing-mode:vertical-rl]">
              DOCUMENTS
            </span>
          </div>

          <div className="flex-1 rounded-tl-[1em] bg-[#f4f5f6] px-[1.2em] pb-[1.2em] pt-[0.2em]">
            {/* From live production data */}
            <AssistQuestion>Why did CNC Drilling stop so often last night?</AssistQuestion>
            <AssistName context="Shift 3" />
            <p className="mt-[0.5em] text-[0.85em] leading-[1.45] text-slate-600">
              Six stops, four of them tool errors. They started after the bit was
              changed at 23:10.
            </p>
            <div className="mt-[0.6em] space-y-[0.45em] rounded-[0.7em] bg-white p-[0.8em] ring-1 ring-slate-200">
              {ASSIST_STOPS.map(({ cause, count }) => (
                <div key={cause} className="flex items-center gap-[0.6em]">
                  <span className="w-[42%] shrink-0 truncate text-[0.75em] text-slate-600">{cause}</span>
                  <span className="h-[0.55em] flex-1 rounded-full bg-slate-100">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${(count / max) * 100}%`,
                        backgroundColor: "var(--green-dark1)",
                      }}
                    />
                  </span>
                  <span className="w-[1.2em] shrink-0 text-right text-[0.75em] tabular-nums text-slate-500">
                    {count}
                  </span>
                </div>
              ))}
            </div>
            <AssistSources sources={["Stop log · Shift 3", "Tool changes"]} />

            {/* From the documents */}
            <AssistQuestion>How do I change the drill bit?</AssistQuestion>
            <AssistName context="CNC Drilling" />
            <div className="mt-[0.6em] space-y-[0.5em] rounded-[0.7em] bg-white p-[0.8em] ring-1 ring-slate-200">
              {ASSIST_STEPS.map((step, i) => (
                <div key={step} className="flex items-center gap-[0.6em]">
                  <span
                    className="grid size-[1.35em] shrink-0 place-items-center rounded-full text-[0.7em] font-semibold"
                    style={{
                      backgroundColor: "color-mix(in oklab, var(--green-dark3) 12%, transparent)",
                      color: "var(--green-dark3)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="truncate text-[0.8em] text-slate-600">{step}</span>
                </div>
              ))}
            </div>
            <AssistSources sources={["Machine manual · p. 42", "Setup sheet Rev 4"]} />

            <div className="mt-[1.2em] flex items-center gap-[0.5em]">
              <span className="flex flex-1 items-center gap-[0.5em] rounded-[0.5em] border border-slate-300 bg-white px-[0.7em] py-[0.55em]">
                <Plus className="size-[1em] shrink-0 text-slate-600" />
                <span className="min-w-0 flex-1 truncate text-[0.85em] text-slate-400">
                  Write your question here…
                </span>
                <Mic className="size-[1em] shrink-0 text-slate-500" />
              </span>
              <span
                className="rounded-[0.5em] px-[0.8em] py-[0.55em] text-[0.85em] text-white"
                style={{ backgroundColor: "var(--green-dark3)" }}
              >
                Send
              </span>
            </div>
          </div>
        </div>

        <div className="h-[0.2em] w-full bg-[#e8b23a]" />
        <div className="h-[0.35em] w-full bg-[var(--green-system)]" />
      </div>
    </div>
  )
}
