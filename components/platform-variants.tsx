"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// ---------------------------------------------------------------------------
// Shared module data (English only — this is a throwaway exploration page).
// Mirrors the dataset in platform-flower.tsx so the variants are comparable.
// ---------------------------------------------------------------------------

interface Module {
  id: string
  name: string
  description: string
  pitch: string
  features: string[]
  bgVar: string
  borderVar: string
  textColor: "light" | "dark"
  /** Where this module sits in the value chain. */
  layer: "source" | "platform" | "module"
}

const MODULES: Module[] = [
  {
    id: "opticloud",
    name: "OptiCloud",
    description: "Your single source of truth",
    pitch:
      "All your production data in one place. Connect machines, systems, and people to make decisions based on facts, not gut feeling.",
    features: ["Real-time data collection", "Secure cloud infrastructure", "Open API integrations"],
    bgVar: "--green-dark3",
    borderVar: "--green-dark3",
    textColor: "light",
    layer: "platform",
  },
  {
    id: "iot",
    name: "IoT",
    description: "Get data from anything",
    pitch:
      "Connect any machine, sensor, or system to your platform. Ingest data from PLCs, IoT gateways, and legacy equipment — no matter the protocol or age.",
    features: ["Plug-and-play connectors", "Protocol-agnostic ingestion", "Edge data collection"],
    bgVar: "--green-dark1",
    borderVar: "--green-dark2",
    textColor: "light",
    layer: "source",
  },
  {
    id: "production",
    name: "Production",
    description: "See where time is lost",
    pitch:
      "Track OEE in real-time and understand exactly where production time disappears. Stop guessing, start improving.",
    features: ["Live OEE dashboards", "Stop cause registration", "Work order tracking"],
    bgVar: "--purple-dark2",
    borderVar: "--purple-dark1",
    textColor: "light",
    layer: "module",
  },
  {
    id: "mes",
    name: "MES",
    description: "Run execution in the cloud",
    pitch:
      "OptiCloud brings manufacturing execution, live shopfloor visibility, traceability, and reporting into one cloud-based MES layer.",
    features: ["Manufacturing execution", "Shopfloor dashboards", "Production traceability"],
    bgVar: "--green-dark2",
    borderVar: "--green-dark3",
    textColor: "light",
    layer: "module",
  },
  {
    id: "quality",
    name: "Quality",
    description: "Build in accountability",
    pitch:
      "Register quality data at the source and trace every deviation back to machines, batches, and shifts.",
    features: ["Digital inspections", "Full traceability", "Deviation tracking"],
    bgVar: "--yellow-dark2",
    borderVar: "--yellow-dark3",
    textColor: "dark",
    layer: "module",
  },
  {
    id: "erp-shopfloor",
    name: "ERP Shopfloor",
    description: "Bridge ERP and floor",
    pitch:
      "Your ERP knows the plan. Your machines know reality. OptiCloud connects the two — giving planners real-time actuals and operators the context they need.",
    features: ["Two-way ERP sync", "Work order tracking", "Live shopfloor dashboards"],
    bgVar: "--purple-dark1",
    borderVar: "--purple-dark2",
    textColor: "light",
    layer: "module",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "Fix it before it breaks",
    pitch:
      "Move from reactive firefighting to planned maintenance. Reduce unplanned downtime and extend equipment life.",
    features: ["Preventive scheduling", "Predictive alerts", "Mobile task management"],
    bgVar: "--orange-dark2",
    borderVar: "--orange-dark3",
    textColor: "light",
    layer: "module",
  },
  {
    id: "energy",
    name: "Energy",
    description: "Cut waste, not corners",
    pitch:
      "Connect energy consumption directly to production output. Find anomalies and optimization opportunities automatically.",
    features: ["Real-time kWh tracking", "Sensor telemetry", "Anomaly detection"],
    bgVar: "--orange-dark3",
    borderVar: "--orange-dark3",
    textColor: "light",
    layer: "module",
  },
  {
    id: "analysis",
    name: "Analysis",
    description: "From data to decisions",
    pitch:
      "Turn raw production data into clear reports on performance, losses, and cost drivers—without spreadsheets.",
    features: ["Automated reporting", "Cost analysis", "Investment planning"],
    bgVar: "--green-light2",
    borderVar: "--green-light1",
    textColor: "dark",
    layer: "module",
  },
]

const byId = (id: string) => MODULES.find((m) => m.id === id)!
const center = byId("opticloud")
const appModules = MODULES.filter((m) => m.layer === "module")

function moduleStyle(m: Module) {
  return {
    backgroundColor: `var(${m.bgVar})`,
    borderColor: `var(${m.borderVar})`,
  } as const
}
function textClass(m: Module) {
  return m.textColor === "light" ? "text-white" : "text-foreground"
}

// ---------------------------------------------------------------------------
// Variant 1 — Layered stack ("tech stack" diagram)
// ---------------------------------------------------------------------------

function LayeredStack({ onOpen }: { onOpen: (id: string) => void }) {
  const iot = byId("iot")
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {/* Application modules */}
      <div className="rounded-3xl border border-border/60 bg-muted/30 p-4">
        <p className="mb-3 px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Application modules
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {appModules.map((m) => (
            <button
              key={m.id}
              onClick={() => onOpen(m.id)}
              style={moduleStyle(m)}
              className={cn(
                "rounded-2xl border p-4 text-left transition-transform duration-200 hover:scale-[1.03]",
                textClass(m)
              )}
            >
              <span className="block text-sm font-semibold">{m.name}</span>
              <span className="mt-1 block text-xs opacity-80">{m.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Platform layer */}
      <button
        onClick={() => onOpen(center.id)}
        style={moduleStyle(center)}
        className={cn(
          "flex w-full items-center justify-center gap-3 rounded-3xl border py-7 transition-transform duration-200 hover:scale-[1.01]",
          textClass(center)
        )}
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M8 12l3 3 5-6" />
        </svg>
        <span className="text-xl font-semibold">{center.name}</span>
        <span className="text-sm opacity-80">— {center.description}</span>
      </button>

      {/* Connectivity / source layer */}
      <button
        onClick={() => onOpen(iot.id)}
        style={moduleStyle(iot)}
        className={cn(
          "w-full rounded-3xl border px-5 py-5 text-center transition-transform duration-200 hover:scale-[1.01]",
          textClass(iot)
        )}
      >
        <span className="text-sm font-semibold">{iot.name} — {iot.description}</span>
        <span className="mt-2 block text-xs opacity-75">
          PLCs · Sensors · IoT gateways · Legacy equipment
        </span>
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Variant 2 — Data spine (left → right narrative)
// ---------------------------------------------------------------------------

function DataSpine({ onOpen }: { onOpen: (id: string) => void }) {
  const iot = byId("iot")
  const sources = ["Machines", "Sensors", "ERP", "Legacy"]
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-[1fr_auto_1.2fr]">
      {/* Sources */}
      <div className="space-y-2">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Connect anything
        </p>
        {sources.map((s) => (
          <button
            key={s}
            onClick={() => onOpen(iot.id)}
            style={moduleStyle(iot)}
            className={cn(
              "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-transform duration-200 hover:scale-[1.02]",
              textClass(iot)
            )}
          >
            {s}
            <span aria-hidden className="opacity-60">→</span>
          </button>
        ))}
      </div>

      {/* Platform hub */}
      <button
        onClick={() => onOpen(center.id)}
        style={moduleStyle(center)}
        className={cn(
          "mx-auto flex aspect-square w-44 flex-col items-center justify-center rounded-[2rem] border p-4 text-center shadow-lg transition-transform duration-200 hover:scale-[1.04]",
          textClass(center)
        )}
      >
        <svg className="mb-2 h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M8 12l3 3 5-6" />
        </svg>
        <span className="font-semibold">{center.name}</span>
        <span className="mt-1 text-xs opacity-80">Single source of truth</span>
      </button>

      {/* Outcomes / modules */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Turn it into outcomes
        </p>
        <div className="grid grid-cols-2 gap-2">
          {appModules.map((m) => (
            <button
              key={m.id}
              onClick={() => onOpen(m.id)}
              style={moduleStyle(m)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-transform duration-200 hover:scale-[1.02]",
                textClass(m)
              )}
            >
              <span className="block text-sm font-semibold">{m.name}</span>
              <span className="mt-0.5 block text-xs opacity-80">{m.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Variant 3 — Bento grid
// ---------------------------------------------------------------------------

function BentoGrid({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="mx-auto grid max-w-4xl auto-rows-[130px] grid-cols-2 gap-3 sm:grid-cols-4">
      {/* Hero platform tile */}
      <button
        onClick={() => onOpen(center.id)}
        style={moduleStyle(center)}
        className={cn(
          "col-span-2 row-span-2 flex flex-col justify-between rounded-3xl border p-6 text-left transition-transform duration-200 hover:scale-[1.02]",
          textClass(center)
        )}
      >
        <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M8 12l3 3 5-6" />
        </svg>
        <div>
          <span className="block text-2xl font-semibold">{center.name}</span>
          <span className="mt-1 block text-sm opacity-80">{center.description}</span>
        </div>
      </button>

      {appModules.map((m, i) => (
        <button
          key={m.id}
          onClick={() => onOpen(m.id)}
          style={moduleStyle(m)}
          className={cn(
            "flex flex-col justify-between rounded-3xl border p-4 text-left transition-transform duration-200 hover:scale-[1.03]",
            // give a couple of tiles extra width for bento rhythm
            (i === 0 || i === 4) && "sm:col-span-2",
            textClass(m)
          )}
        >
          <span className="text-sm font-semibold">{m.name}</span>
          <span className="mt-1 text-xs opacity-80">{m.description}</span>
        </button>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Variant 4 — OptiCloud flower, recreated (rounded pentagons)
//
// Faithful to the original 2024 brand mark: a dark-teal OptiCloud hub with
// petals radiating outward, each a rounded-corner pentagon pointing away from
// the centre, loosely wrapped by a dashed enclosure over a soft grey blob.
// Uses the real brand palette pulled from the original SVG (not the CSS vars).
// ---------------------------------------------------------------------------

// Brand colours sampled from Opticloud-Flower.svg. The data-infrastructure
// modules (OptiCloud / MES / IoT) share the teal family; functional modules
// get a distinct hue, exactly like the original mark.
const BRAND: Record<string, { fill: string; text: "light" | "dark" }> = {
  opticloud: { fill: "#024343", text: "light" },
  mes: { fill: "#015D5D", text: "light" },
  iot: { fill: "#045050", text: "light" },
  quality: { fill: "#353F96", text: "light" },
  "erp-shopfloor": { fill: "#5460C6", text: "light" },
  production: { fill: "#D4D6EB", text: "dark" },
  maintenance: { fill: "#E0AC30", text: "dark" },
  energy: { fill: "#DC5E3C", text: "light" },
  analysis: { fill: "#A3EEC8", text: "dark" },
}

// Lighten (amt > 0, toward white) or darken (amt < 0, toward black) a hex colour.
function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const t = amt < 0 ? 0 : 255
  const p = Math.abs(amt)
  const mix = (c: number) => Math.round((t - c) * p + c)
  const r = mix((n >> 16) & 255)
  const g = mix((n >> 8) & 255)
  const b = mix(n & 255)
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// Build an SVG path for a regular polygon with rounded corners.
// `rotationDeg` rotates the shape (0 = a vertex pointing straight up).
function roundedPolygonPath(
  cx: number,
  cy: number,
  R: number,
  sides: number,
  rotationDeg: number,
  cornerR: number,
): string {
  const pts: Array<[number, number]> = []
  for (let k = 0; k < sides; k++) {
    const a = ((rotationDeg + (k * 360) / sides - 90) * Math.PI) / 180
    pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)])
  }
  const dist = (p: number[], q: number[]) => Math.hypot(q[0] - p[0], q[1] - p[1])
  const lerp = (p: number[], q: number[], t: number): [number, number] => [
    p[0] + (q[0] - p[0]) * t,
    p[1] + (q[1] - p[1]) * t,
  ]
  const f = (n: number) => n.toFixed(2)
  let d = ""
  for (let i = 0; i < sides; i++) {
    const curr = pts[i]
    const prev = pts[(i - 1 + sides) % sides]
    const next = pts[(i + 1) % sides]
    const entry = lerp(curr, prev, Math.min(cornerR, dist(curr, prev) / 2) / dist(curr, prev))
    const exit = lerp(curr, next, Math.min(cornerR, dist(curr, next) / 2) / dist(curr, next))
    d += i === 0 ? `M ${f(entry[0])},${f(entry[1])}` : ` L ${f(entry[0])},${f(entry[1])}`
    d += ` Q ${f(curr[0])},${f(curr[1])} ${f(exit[0])},${f(exit[1])}`
  }
  return d + " Z"
}

// Flower geometry in viewBox units.
const VB_W = 260
const VB_H = 240
const CENTER: [number, number] = [130, 116]
const CENTER_R = 37
const PETAL_R = 27
const ORBIT = 70
// Petal order around the bloom, starting at the top going clockwise.
const PETAL_ORDER = ["maintenance", "production", "erp-shopfloor", "energy", "analysis", "iot", "mes", "quality"]

function petalLayout() {
  return PETAL_ORDER.map((id, k) => {
    const angleDeg = -90 + (k * 360) / PETAL_ORDER.length
    const a = (angleDeg * Math.PI) / 180
    return {
      id,
      cx: CENTER[0] + ORBIT * Math.cos(a),
      cy: CENTER[1] + ORBIT * Math.sin(a),
      // rotate each pentagon so its apex points outward, away from the hub
      rotation: angleDeg + 90,
    }
  })
}

// The OptiPeople brand mark (ring + pulse), lifted from Optipeople-Logo-Vector.svg
// and recoloured to currentColor so it inherits the hub's white text.
function OptiMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="16 3 90 90" fill="none" aria-hidden="true">
      <defs>
        <clipPath id="opti-mark-clip">
          <circle cx="61.64" cy="47.87" r="30.07" />
        </clipPath>
      </defs>
      <g clipPath="url(#opti-mark-clip)">
        <path
          fill="currentColor"
          d="M32.38,40.21s7.68-9.23,14.82,6.55c6.55,14.48,10.77,1.72,10.77,1.72l2.15-6.03,30.93.09h8.53v7.19l-36.06.13s-6.12,21.89-17.28,9.91c0,0-7.84-9-11.72-6.2-3.49,2.52,1.21,11.98,5.51,15.42l-6.38,6.38s-14.3-21.63-1.29-35.16Z"
        />
      </g>
      <circle cx="61.64" cy="47.87" r="36.36" fill="none" stroke="currentColor" strokeWidth="13.07" />
    </svg>
  )
}

function PentagonFlower({ onOpen }: { onOpen: (id: string) => void }) {
  const petals = petalLayout()
  // Convert a viewBox point to a container percentage for the HTML label overlay.
  const left = (x: number) => `${(x / VB_W) * 100}%`
  const top = (y: number) => `${(y / VB_H) * 100}%`

  const Label = ({
    id,
    x,
    y,
    r,
    isCenter,
  }: {
    id: string
    x: number
    y: number
    r: number
    isCenter?: boolean
  }) => {
    const m = byId(id)
    const isLight = BRAND[id].text === "light"
    return (
      <button
        onClick={() => onOpen(id)}
        className={cn(
          "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center leading-tight",
          isLight ? "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.22)]" : "text-foreground",
        )}
        style={{ left: left(x), top: top(y), width: `${((2 * r) / VB_W) * 100}%` }}
      >
        {isCenter && <OptiMark className="mb-1.5 h-11 w-11" />}
        <span className={cn("font-bold tracking-tight", isCenter ? "text-2xl" : "text-lg")}>{m.name}</span>
        {!isCenter && (
          <span className="mt-1 text-sm font-medium leading-snug opacity-95">{m.description}</span>
        )}
      </button>
    )
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[1200px]"
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        {/* subtle top-to-bottom gradient per module — adds depth without looking gradiented */}
        <defs>
          {Object.keys(BRAND).map((id) => (
            <linearGradient key={id} id={`pf-grad-${id}`} x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%" stopColor={shade(BRAND[id].fill, 0.09)} />
              <stop offset="100%" stopColor={shade(BRAND[id].fill, -0.06)} />
            </linearGradient>
          ))}
        </defs>
        {/* connection spokes + animated data flow from each module into the hub */}
        {petals.map((p, i) => {
          const a = Math.atan2(p.cy - CENTER[1], p.cx - CENTER[0])
          const ux = Math.cos(a)
          const uy = Math.sin(a)
          const hubEdge = CENTER_R * Math.cos(Math.PI / 8) // octagon inradius
          const petalBase = ORBIT - PETAL_R * Math.cos(Math.PI / 5) // pentagon inradius from centre
          const x1 = CENTER[0] + ux * petalBase
          const y1 = CENTER[1] + uy * petalBase
          const x2 = CENTER[0] + ux * hubEdge
          const y2 = CENTER[1] + uy * hubEdge
          return (
            <g key={`flow-${p.id}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--green-dark3)"
                strokeWidth="0.7"
                strokeLinecap="round"
                opacity="0.22"
              />
              {/* dot starts hidden (opacity 0) so it never flashes at the SVG origin
                  before its staggered begin; the fade also masks the loop's snap-back */}
              <circle r="1" fill="var(--green-dark3)" opacity="0">
                <animateMotion
                  dur="1.9s"
                  begin={`${i * 0.22}s`}
                  repeatCount="indefinite"
                  path={`M ${x1},${y1} L ${x2},${y2}`}
                />
                <animate
                  attributeName="opacity"
                  dur="1.9s"
                  begin={`${i * 0.22}s`}
                  repeatCount="indefinite"
                  values="0;1;1;0"
                  keyTimes="0;0.18;0.82;1"
                />
              </circle>
            </g>
          )
        })}
        {/* petals */}
        {petals.map((p) => (
          <path
            key={p.id}
            d={roundedPolygonPath(p.cx, p.cy, PETAL_R, 5, p.rotation, 6)}
            fill={`url(#pf-grad-${p.id})`}
            className="cursor-pointer transition-[filter] duration-200 hover:brightness-105"
            onClick={() => onOpen(p.id)}
          />
        ))}
        {/* hub — octagon so a flat edge faces each of the 8 petals */}
        <path
          d={roundedPolygonPath(CENTER[0], CENTER[1], CENTER_R, 8, 22.5, 3.5)}
          fill="url(#pf-grad-opticloud)"
          className="cursor-pointer transition-[filter] duration-200 hover:brightness-110"
          onClick={() => onOpen("opticloud")}
        />
      </svg>

      {/* HTML label overlay (positioned over each pentagon) */}
      <div className="absolute inset-0">
        {petals.map((p) => (
          <Label key={p.id} id={p.id} x={p.cx} y={p.cy} r={PETAL_R} />
        ))}
        <Label id="opticloud" x={CENTER[0]} y={CENTER[1]} r={CENTER_R} isCenter />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Wrapper: renders one labelled section per variant + a shared detail dialog.
// ---------------------------------------------------------------------------

const VARIANTS: Array<{
  n: number
  title: string
  blurb: string
  render: (onOpen: (id: string) => void) => React.ReactNode
}> = [
  {
    n: 1,
    title: "Layered stack",
    blurb: "Modules sit on top of the platform, which sits on top of connectivity. The literal meaning of “platform.”",
    render: (onOpen) => <LayeredStack onOpen={onOpen} />,
  },
  {
    n: 2,
    title: "Data spine",
    blurb: "Reads left → right like a sentence: connect anything → unify it → turn it into outcomes.",
    render: (onOpen) => <DataSpine onOpen={onOpen} />,
  },
  {
    n: 3,
    title: "Bento grid",
    blurb: "Modern SaaS-landing standard. OptiCloud is the hero tile; modules are scannable cards.",
    render: (onOpen) => <BentoGrid onOpen={onOpen} />,
  },
  {
    n: 4,
    title: "OptiCloud flower, recreated",
    blurb: "The original 2024 brand mark rebuilt in code — rounded-corner pentagons radiating from the OptiCloud hub, real brand palette, dashed enclosure. Now with all eight current modules.",
    render: (onOpen) => <PentagonFlower onOpen={onOpen} />,
  },
]

export function PlatformVariants() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = activeId ? byId(activeId) : null

  return (
    <div className="space-y-24 py-16">
      {VARIANTS.map((v) => (
        <section key={v.n}>
          <div className="mx-auto mb-10 max-w-3xl px-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Variant {v.n}
            </p>
            <h2 className="mt-2 text-3xl font-light tracking-tight text-foreground">{v.title}</h2>
            <p className="mt-3 text-base text-muted-foreground">{v.blurb}</p>
          </div>
          <div className="px-6">{v.render(setActiveId)}</div>
        </section>
      ))}

      <Dialog open={!!activeId} onOpenChange={(open) => !open && setActiveId(null)}>
        <DialogContent className="sm:max-w-md">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span
                    className="h-11 w-11 flex-shrink-0 rounded-xl border"
                    style={moduleStyle(active)}
                  />
                  <div className="min-w-0">
                    <DialogTitle>{active.name}</DialogTitle>
                    <DialogDescription className="mt-0.5 font-medium text-foreground/70">
                      {active.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-muted-foreground">{active.pitch}</p>
              <ul className="space-y-2.5">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: `var(${active.bgVar})` }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
