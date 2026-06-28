"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/i18n"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ModuleNode {
  id: string
  name: string
  description: string
  pitch: string
  features: string[]
  bgVar: string // CSS variable name for background
  borderVar: string // CSS variable name for border
  textColor: "light" | "dark" // whether to use light or dark text
  x: number // percentage
  y: number // percentage
  connections: string[] // ids of connected modules
}

const englishModules: ModuleNode[] = [
  {
    id: "opticloud",
    name: "OptiCloud",
    description: "Your single source of truth",
    pitch: "All your production data in one place. Connect machines, systems, and people to make decisions based on facts, not gut feeling.",
    features: ["Real-time data collection", "Secure cloud infrastructure", "Open API integrations"],
    bgVar: "--green-dark3",
    borderVar: "--green-dark3",
    textColor: "light",
    x: 50,
    y: 50,
    connections: ["production", "mes", "quality", "erp-shopfloor", "maintenance", "energy", "analysis", "iot"],
  },
  {
    id: "production",
    name: "Production",
    description: "See where time is lost",
    pitch: "Track OEE in real-time and understand exactly where production time disappears. Stop guessing, start improving.",
    features: ["Live OEE dashboards", "Stop cause registration", "Work order tracking"],
    bgVar: "--purple-dark2",
    borderVar: "--purple-dark1",
    textColor: "light",
    x: 50,
    y: 12,
    connections: ["opticloud", "quality", "iot", "mes"],
  },
  {
    id: "mes",
    name: "MES",
    description: "Run execution in the cloud",
    pitch: "OptiCloud brings manufacturing execution, live shopfloor visibility, traceability, and reporting into one cloud-based MES layer.",
    features: ["Manufacturing execution", "Shopfloor dashboards", "Production traceability"],
    bgVar: "--green-dark2",
    borderVar: "--green-dark3",
    textColor: "light",
    x: 22,
    y: 22,
    connections: ["opticloud", "production", "quality", "maintenance", "analysis", "erp-shopfloor", "iot"],
  },
  {
    id: "quality",
    name: "Quality",
    description: "Build in accountability",
    pitch: "Register quality data at the source and trace every deviation back to machines, batches, and shifts.",
    features: ["Digital inspections", "Full traceability", "Deviation tracking"],
    bgVar: "--yellow-dark2",
    borderVar: "--yellow-dark3",
    textColor: "dark",
    x: 78,
    y: 22,
    connections: ["opticloud", "production", "erp-shopfloor", "mes"],
  },
  {
    id: "erp-shopfloor",
    name: "ERP Shopfloor",
    description: "Bridge ERP and floor",
    pitch: "Your ERP knows the plan. Your machines know reality. OptiCloud connects the two — giving planners real-time actuals and operators the context they need.",
    features: ["Two-way ERP sync", "Work order tracking", "Live shopfloor dashboards"],
    bgVar: "--purple-dark1",
    borderVar: "--purple-dark2",
    textColor: "light",
    x: 88,
    y: 50,
    connections: ["opticloud", "quality", "maintenance", "mes"],
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "Fix it before it breaks",
    pitch: "Move from reactive firefighting to planned maintenance. Reduce unplanned downtime and extend equipment life.",
    features: ["Preventive scheduling", "Predictive alerts", "Mobile task management"],
    bgVar: "--orange-dark2",
    borderVar: "--orange-dark3",
    textColor: "light",
    x: 78,
    y: 78,
    connections: ["opticloud", "erp-shopfloor", "energy", "mes"],
  },
  {
    id: "energy",
    name: "Energy",
    description: "Cut waste, not corners",
    pitch: "Connect energy consumption directly to production output. Find anomalies and optimization opportunities automatically.",
    features: ["Real-time kWh tracking", "Sensor telemetry", "Anomaly detection"],
    bgVar: "--orange-dark3",
    borderVar: "--orange-dark3",
    textColor: "light",
    x: 50,
    y: 88,
    connections: ["opticloud", "maintenance", "analysis"],
  },
  {
    id: "analysis",
    name: "Analysis",
    description: "From data to decisions",
    pitch: "Turn raw production data into clear reports on performance, losses, and cost drivers—without spreadsheets.",
    features: ["Automated reporting", "Cost analysis", "Investment planning"],
    bgVar: "--green-light2",
    borderVar: "--green-light1",
    textColor: "dark",
    x: 22,
    y: 78,
    connections: ["opticloud", "energy", "iot", "mes"],
  },
  {
    id: "iot",
    name: "IoT",
    description: "Get data from anything",
    pitch: "Connect any machine, sensor, or system to your platform. Ingest data from PLCs, IoT gateways, and legacy equipment — no matter the protocol or age.",
    features: ["Plug-and-play connectors", "Protocol-agnostic ingestion", "Edge data collection"],
    bgVar: "--green-dark1",
    borderVar: "--green-dark2",
    textColor: "light",
    x: 12,
    y: 50,
    connections: ["opticloud", "production", "analysis", "mes"],
  },
]

const danishModules: ModuleNode[] = [
  {
    id: "opticloud",
    name: "OptiCloud",
    description: "Dit fælles datagrundlag",
    pitch:
      "Al produktionsdata samlet ét sted. Forbind maskiner, systemer og mennesker, så beslutninger bygger på fakta i stedet for mavefornemmelser.",
    features: ["Dataopsamling i realtid", "Sikker cloud-infrastruktur", "Åbne API-integrationer"],
    bgVar: "--green-dark3",
    borderVar: "--green-dark3",
    textColor: "light",
    x: 50,
    y: 50,
    connections: ["production", "mes", "quality", "erp-shopfloor", "maintenance", "energy", "analysis", "iot"],
  },
  {
    id: "production",
    name: "Produktion",
    description: "Se hvor tiden går tabt",
    pitch:
      "Følg OEE i realtid, og forstå præcis hvor produktionstiden forsvinder. Stop med at gætte, og begynd at forbedre.",
    features: ["Live OEE-dashboards", "Stopårsagsregistrering", "Ordresporing"],
    bgVar: "--purple-dark2",
    borderVar: "--purple-dark1",
    textColor: "light",
    x: 50,
    y: 12,
    connections: ["opticloud", "quality", "iot", "mes"],
  },
  {
    id: "mes",
    name: "MES",
    description: "Styr eksekvering i cloud",
    pitch:
      "OptiCloud samler manufacturing execution, live shopfloor-overblik, sporbarhed og rapportering i ét cloudbaseret MES-lag.",
    features: ["Manufacturing execution", "Shopfloor-dashboards", "Produktionssporbarhed"],
    bgVar: "--green-dark2",
    borderVar: "--green-dark3",
    textColor: "light",
    x: 22,
    y: 22,
    connections: ["opticloud", "production", "quality", "maintenance", "analysis", "erp-shopfloor", "iot"],
  },
  {
    id: "quality",
    name: "Kvalitet",
    description: "Byg ansvarlighed ind",
    pitch:
      "Registrer kvalitetsdata ved kilden, og spor hver afvigelse tilbage til maskiner, batches og skift.",
    features: ["Digitale kontroller", "Fuld sporbarhed", "Afvigelsesregistrering"],
    bgVar: "--yellow-dark2",
    borderVar: "--yellow-dark3",
    textColor: "dark",
    x: 78,
    y: 22,
    connections: ["opticloud", "production", "erp-shopfloor", "mes"],
  },
  {
    id: "erp-shopfloor",
    name: "ERP Shopfloor",
    description: "Forbind ERP og gulv",
    pitch:
      "ERP kender planen. Maskinerne kender virkeligheden. OptiCloud forbinder de to, så planlæggere får realtidsdata og operatører får den rigtige kontekst.",
    features: ["Tovejssynk med ERP", "Ordresporing", "Live shopfloor-dashboards"],
    bgVar: "--purple-dark1",
    borderVar: "--purple-dark2",
    textColor: "light",
    x: 88,
    y: 50,
    connections: ["opticloud", "quality", "maintenance", "mes"],
  },
  {
    id: "maintenance",
    name: "Vedligehold",
    description: "Løs det før det stopper",
    pitch:
      "Gå fra reaktiv brandslukning til planlagt vedligehold. Reducer uplanlagt nedetid, og forlæng udstyrets levetid.",
    features: ["Forebyggende planlægning", "Prediktive alarmer", "Mobil opgavestyring"],
    bgVar: "--orange-dark2",
    borderVar: "--orange-dark3",
    textColor: "light",
    x: 78,
    y: 78,
    connections: ["opticloud", "erp-shopfloor", "energy", "mes"],
  },
  {
    id: "energy",
    name: "Energi",
    description: "Skær spild væk",
    pitch:
      "Kobl energiforbrug direkte til produktionen. Find afvigelser og optimeringsmuligheder automatisk.",
    features: ["Live kWh-sporing", "Sensortelemetri", "Afvigelsesdetektion"],
    bgVar: "--orange-dark3",
    borderVar: "--orange-dark3",
    textColor: "light",
    x: 50,
    y: 88,
    connections: ["opticloud", "maintenance", "analysis"],
  },
  {
    id: "analysis",
    name: "Analyse",
    description: "Fra data til beslutning",
    pitch:
      "Gør rå produktionsdata til klare rapporter om performance, tab og omkostningsdrivere uden manuelle regneark.",
    features: ["Automatiske rapporter", "Omkostningsanalyse", "Investeringsgrundlag"],
    bgVar: "--green-light2",
    borderVar: "--green-light1",
    textColor: "dark",
    x: 22,
    y: 78,
    connections: ["opticloud", "energy", "iot", "mes"],
  },
  {
    id: "iot",
    name: "IoT",
    description: "Få data fra alt",
    pitch:
      "Forbind maskiner, sensorer og systemer til platformen. Hent data fra PLC'er, IoT-gateways og ældre udstyr uanset protokol.",
    features: ["Plug-and-play forbindelser", "Protokoluafhængig opsamling", "Edge dataopsamling"],
    bgVar: "--green-dark1",
    borderVar: "--green-dark2",
    textColor: "light",
    x: 12,
    y: 50,
    connections: ["opticloud", "production", "analysis", "mes"],
  },
]

const platformIntro = {
  en: {
    eyebrow: "Platform",
    title: "Connected by design",
    description:
      "Every module shares data seamlessly, creating a unified view of your operations",
    centerLabel: "OptiCloud Platform",
  },
  da: {
    eyebrow: "Platform",
    title: "Forbundet fra starten",
    description:
      "Alle moduler deler data på tværs og skaber ét samlet billede af driften",
    centerLabel: "OptiCloud platform",
  },
} as const

// ---------------------------------------------------------------------------
// Brand palette + geometry for the OptiCloud "flower" — rounded pentagons
// radiating from an octagonal OptiCloud hub, recreated from the 2024 brand mark
// (Opticloud-Flower.svg). Colours are sampled from that original SVG.
// ---------------------------------------------------------------------------

// The data-infrastructure modules (OptiCloud / MES / IoT) share the teal family;
// functional modules each get a distinct hue, exactly like the original mark.
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

// Build an SVG path for a regular polygon with rounded corners
// (rotationDeg 0 = a vertex pointing straight up).
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

export function PlatformFlower({ locale = "en" }: { locale?: Locale }) {
  const modules = locale === "da" ? danishModules : englishModules
  const intro = platformIntro[locale]
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const byId = (id: string) => modules.find((m) => m.id === id)!
  const dialogModule = activeModule ? byId(activeModule) : null
  const petals = petalLayout()

  // Convert a viewBox point to a container percentage for the HTML label overlay.
  const leftPct = (x: number) => `${(x / VB_W) * 100}%`
  const topPct = (y: number) => `${(y / VB_H) * 100}%`

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
        onClick={() => setActiveModule(id)}
        className={cn(
          "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center leading-tight",
          isLight ? "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.22)]" : "text-foreground",
        )}
        style={{ left: leftPct(x), top: topPct(y), width: `${((2 * r) / VB_W) * 100}%` }}
      >
        {isCenter && <OptiMark className="mb-1.5 h-11 w-11" />}
        <span className={cn("font-bold tracking-tight", isCenter ? "text-2xl" : "text-lg")}>{m.name}</span>
        {!isCenter && <span className="mt-1 text-sm font-medium leading-snug opacity-95">{m.description}</span>}
      </button>
    )
  }

  return (
    <section className="relative overflow-hidden bg-muted/40 py-20 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-4">
            {intro.eyebrow}
          </p>
          <h2 className="text-4xl lg:text-6xl font-light text-foreground tracking-tight">
            {intro.title}
          </h2>
          <p className="mt-5 text-xl text-muted-foreground max-w-2xl mx-auto">
            {intro.description}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          {/* Mobile: Grid layout */}
          <div className="lg:hidden w-full">
            <div className="grid grid-cols-2 gap-3">
              {modules.filter(m => m.id !== "opticloud").map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={cn(
                    "p-4 rounded-[1.5rem] transition-all duration-300 text-left",
                    BRAND[module.id].text === "light" ? "text-white" : "text-foreground",
                    activeModule === module.id && "ring-2 ring-offset-2 ring-primary"
                  )}
                  style={{ backgroundColor: BRAND[module.id].fill }}
                >
                  <h3 className="font-semibold text-sm">{module.name}</h3>
                  <p className="text-xs opacity-80 mt-1">{module.description}</p>
                </button>
              ))}
            </div>
            {/* Mobile center hub */}
            <div className="flex justify-center mt-6">
              <div
                className="px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg"
                style={{ backgroundColor: "var(--green-dark3)" }}
              >
                {intro.centerLabel}
              </div>
            </div>
          </div>

          {/* Desktop: OptiCloud flower — rounded pentagons around an octagonal hub */}
          <div
            className="relative mx-auto hidden w-full max-w-[1100px] lg:block"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          >
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              style={{ overflow: "visible" }}
            >
              {/* subtle top-to-bottom gradient per module — depth without looking gradiented */}
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
                    {/* dot starts hidden so it never flashes at the SVG origin before its
                        staggered begin; the fade also masks the loop's snap-back */}
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
                  onClick={() => setActiveModule(p.id)}
                />
              ))}

              {/* hub — octagon so a flat edge faces each of the 8 petals */}
              <path
                d={roundedPolygonPath(CENTER[0], CENTER[1], CENTER_R, 8, 22.5, 3.5)}
                fill="url(#pf-grad-opticloud)"
                className="cursor-pointer transition-[filter] duration-200 hover:brightness-110"
                onClick={() => setActiveModule("opticloud")}
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

        </div>
      </div>

      {/* Module detail dialog */}
      <Dialog
        open={!!activeModule}
        onOpenChange={(open) => {
          if (!open) setActiveModule(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          {dialogModule && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span
                    className="h-11 w-11 flex-shrink-0 rounded-xl"
                    style={{ backgroundColor: BRAND[dialogModule.id].fill }}
                  />
                  <div className="min-w-0">
                    <DialogTitle>{dialogModule.name}</DialogTitle>
                    <DialogDescription className="mt-0.5 font-medium text-foreground/70">
                      {dialogModule.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {dialogModule.pitch}
              </p>
              <ul className="space-y-2.5">
                {dialogModule.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: BRAND[dialogModule.id].fill }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
