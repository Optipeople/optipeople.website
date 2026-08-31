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
  // Colour comes from BRAND (keyed by id) and position from PETAL_ORDER, so a
  // new module needs an entry in both of those plus one block here.
}

const englishModules: ModuleNode[] = [
  {
    id: "opticloud",
    name: "OptiPeople Data Platform",
    description: "Your single source of truth",
    pitch: "All your production data in one place. Connect machines, systems, and people to make decisions based on facts, not gut feeling.",
    features: ["Real-time data collection", "Secure cloud infrastructure", "Open API integrations"],
  },
  {
    id: "production",
    name: "OEE",
    description: "See where time is lost",
    pitch: "Track OEE in real-time and understand exactly where production time disappears. Stop guessing, start improving.",
    features: ["Live OEE dashboards", "Stop cause registration", "Performance and quality losses"],
  },
  {
    id: "mes",
    name: "Modular MES",
    description: "One module at a time",
    pitch: "The modular MES the other ten plug into. Start with the module that answers the question you have now, and add the next one against data you are already collecting.",
    features: ["Start with one module", "Shared data foundation", "No re-entry between modules"],
  },
  {
    id: "quality",
    name: "QMS",
    description: "Build in accountability",
    pitch: "Register quality data at the source and trace every deviation back to machines, batches, and shifts.",
    features: ["Digital inspections", "Full traceability", "Deviation tracking"],
  },
  {
    id: "erp-shopfloor",
    name: "Orders",
    description: "Run them at the machine",
    pitch: "The orders to run, on the screen at the machine. Operators start, stop, and report quantities and scrap where the work happens. It runs on its own, and connects to your ERP if you want it to.",
    features: ["Start, stop and report at the machine", "Runs with or without an ERP", "Two-way ERP sync when you want it"],
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "Fix it before it breaks",
    pitch: "Move from reactive firefighting to preventive maintenance, and to predictive where the machine signals support it. Less unplanned downtime, longer equipment life.",
    features: ["Preventive and predictive", "Triggered by connected IoT data", "Mobile task management"],
  },
  {
    id: "energy",
    name: "EMS",
    description: "Cut waste, not corners",
    pitch: "Connect energy consumption directly to production output. Find anomalies and optimization opportunities automatically.",
    features: ["Real-time kWh tracking", "Sensor telemetry", "Anomaly detection"],
  },
  {
    id: "analysis",
    name: "Analysis",
    description: "From data to decisions",
    pitch: "Turn raw production data into clear reports on performance, losses, and cost drivers, without spreadsheets.",
    features: ["Automated reporting", "Cost analysis", "Investment planning"],
  },
  {
    id: "iot",
    name: "IoT",
    description: "Get data from anything",
    pitch: "Consolidate the machines, hardware, and data systems you already run into one foundation. PLCs, existing sensor setups, historians, and supplier portals, whatever the protocol or age. New hardware only where a machine has nothing to read from.",
    features: ["Consolidate existing hardware", "Consolidate existing systems", "A gateway only where it earns one"],
  },
  {
    id: "planning",
    name: "Planning",
    description: "Routes and timelines",
    pitch: "Sequence orders across the entities of each production route, not on one flat timeline, against measured run rates and the hours a machine actually has available.",
    features: ["Routes, not one flat timeline", "Run rates from real data", "Replan without rebuilding"],
  },
  {
    id: "documents",
    name: "Documents",
    description: "Right version, right place",
    pitch: "Work instructions, drawings, and certificates where the work happens: at a machine, a station, a line, a warehouse, or a lab, in the version that applies to the job in front of the person doing it.",
    features: ["Wherever the work happens", "One current version", "Audit-ready records"],
  },
  {
    id: "ai-agents",
    name: "AI agents",
    description: "Ask your own data",
    pitch: "Agents and copilots that work on your production data, answering questions in plain language and watching for the patterns nobody has time to look for.",
    features: ["Plain-language answers", "Pattern and anomaly alerts", "Grounded in your own data"],
  },
]
const danishModules: ModuleNode[] = [
  {
    id: "opticloud",
    name: "OptiPeople Data Platform",
    description: "Dit fælles datagrundlag",
    pitch:
      "Alle jeres produktionsdata ét sted. Kobl maskiner, systemer og mennesker sammen, så beslutningerne bygger på fakta i stedet for mavefornemmelser.",
    features: ["Data opsamlet løbende", "Sikker drift i skyen", "Åbne API'er"],
  },
  {
    id: "production",
    name: "OEE",
    description: "Se hvor tiden går tabt",
    pitch:
      "Følg OEE i realtid, og se præcis hvor produktionstiden forsvinder. Så er gætteriet slut, og forbedringerne kan begynde.",
    features: ["Live OEE på skærmen", "Stopårsager", "Tab på fart og kvalitet"],
  },
  {
    id: "mes",
    name: "Modulært MES",
    description: "Ét modul ad gangen",
    pitch:
      "Det modulære MES, de andre ti kobler sig på. Start med det modul, der svarer på spørgsmålet nu, og tag det næste på data, I allerede samler op.",
    features: ["Start med ét modul", "Fælles datagrundlag", "Ingen dobbeltregistrering"],
  },
  {
    id: "quality",
    name: "QMS",
    description: "Fang fejlen i tide",
    pitch:
      "Registrer kvalitetsdata ved kilden, og følg hver afvigelse tilbage til maskine, batch og skift.",
    features: ["Digitale kontroller", "Fuld sporbarhed", "Afvigelsesregistrering"],
  },
  {
    id: "erp-shopfloor",
    name: "Ordrer",
    description: "Kør dem ved maskinen",
    pitch:
      "Ordrerne står på skærmen ved maskinen. Operatøren starter, stopper og melder antal og kassation, dér hvor arbejdet sker. Det kører alene, og kan kobles på ERP, hvis I vil.",
    features: ["Start, stop og meld ved maskinen", "Kører med eller uden ERP", "Ordrer begge veje, når I vil"],
  },
  {
    id: "maintenance",
    name: "Vedligehold",
    description: "Løs det, før det stopper",
    pitch:
      "Gå fra brandslukning til forebyggende vedligehold, og til forudsigende dér hvor maskinsignalerne rækker til det. Færre uplanlagte stop, og maskinerne holder længere.",
    features: ["Forebyggende og forudsigende", "Udløst af IoT-data", "Opgaverne på mobilen"],
  },
  {
    id: "energy",
    name: "EMS",
    description: "Skær spild væk",
    pitch:
      "Kobl energiforbruget direkte sammen med produktionen. Så finder I spildet og det, der stikker ud.",
    features: ["kWh fulgt live", "Sensordata", "Besked når noget stikker ud"],
  },
  {
    id: "analysis",
    name: "Analyse",
    description: "Fra data til beslutning",
    pitch:
      "Gør rå produktionsdata til rapporter, folk kan læse: hvordan det går, hvor I taber, og hvad der koster mest. Uden regneark.",
    features: ["Rapporter, der laver sig selv", "Hvad tingene koster", "Grundlag for investeringer"],
  },
  {
    id: "iot",
    name: "IoT",
    description: "Få data fra alt",
    pitch:
      "Saml de maskiner, det hardware og de datasystemer, I allerede har, i ét datagrundlag. PLC'er, sensorer der er sat op, historians og leverandørportaler, uanset protokol og alder.",
    features: ["Brug det hardware, I har", "Brug de systemer, I har", "Nyt udstyr kun hvor der mangler noget"],
  },
  {
    id: "planning",
    name: "Planlægning",
    description: "Ruter og tidslinjer",
    pitch: "Læg ordrerne i rækkefølge hen over de enheder, hver produktionsrute går igennem, og ikke bare på én flad tidslinje. Efter målte kørehastigheder og reel ledig tid.",
    features: ["Ruter, ikke én flad tidslinje", "Kørehastigheder fra virkeligheden", "Læg om uden at starte forfra"],
  },
  {
    id: "documents",
    name: "Dokumenter",
    description: "Rette version, rette sted",
    pitch: "Arbejdsinstruktioner, tegninger og certifikater dér, hvor arbejdet sker: ved maskinen, på stationen, på lageret eller i laboratoriet, i den version, der gælder for opgaven.",
    features: ["Dér hvor arbejdet sker", "Én gældende version", "Klar til audit"],
  },
  {
    id: "ai-agents",
    name: "AI-agenter",
    description: "Spørg jeres egne data",
    pitch: "Agenter og copiloter, der arbejder på jeres produktionsdata, svarer i almindeligt sprog og holder øje med de mønstre, ingen har tid til at lede efter.",
    features: ["Svar i almindeligt sprog", "Mønstre og afvigelser", "Bygget på jeres egne data"],
  },
]
const platformIntro = {
  en: {
    eyebrow: "Platform",
    title: "One modular platform, eleven modules",
    description:
      "Take one module or ten. Every module shares the same live data, so what one team registers, every team can use",
    centerLabel: "OptiPeople Data Platform",
  },
  da: {
    eyebrow: "Platform",
    title: "Én modulopbygget platform, elleve moduler",
    description:
      "Tag ét modul eller ti. Modulerne deler de samme data, så det, ét team registrerer, kan de andre bruge",
    centerLabel: "OptiPeople Data Platform",
  },
} as const

// ---------------------------------------------------------------------------
// Brand palette + geometry for the platform "flower", rounded pentagons
// radiating from an octagonal platform hub, recreated from the 2024 brand mark
// (Opticloud-Flower.svg). Colours are sampled from that original SVG.
// ---------------------------------------------------------------------------

// The data-infrastructure modules (the hub / MES / IoT) share the teal family;
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
  planning: { fill: "#7C86D3", text: "light" },
  documents: { fill: "#EFD9A6", text: "dark" },
  "ai-agents": { fill: "#0A7A6B", text: "light" },
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
const VB_W = 270
const VB_H = 270
const CENTER: [number, number] = [135, 135]
const CENTER_R = 62
const PETAL_R = 27
const ORBIT = 96
// The hub is a polygon with one flat edge facing each petal, so its side count
// tracks the petal count and it is rotated half a step to line the edges up.
const HUB_SIDES = 11
// Petal order around the bloom, starting at the top going clockwise. Ordered so
// the four pale modules land at intervals instead of bunching on one side.
const PETAL_ORDER = [
  "maintenance",
  "mes",
  "quality",
  "production",
  "energy",
  "documents",
  "erp-shopfloor",
  "analysis",
  "iot",
  "planning",
  "ai-agents",
]

/** The five corners of a petal, in viewBox units. */
function petalVertices(cx: number, cy: number, rotationDeg: number) {
  return Array.from({ length: 5 }, (_, k) => {
    const a = ((rotationDeg + (k * 360) / 5 - 90) * Math.PI) / 180
    return [cx + PETAL_R * Math.cos(a), cy + PETAL_R * Math.sin(a)] as const
  })
}

/**
 * Horizontal midpoint of the petal at a given height.
 *
 * A pentagon rotated to point its apex outward is only left-right symmetric at
 * multiples of 36 degrees, so for most petals the shape at label height sits
 * off to one side of the circumcentre. Centring the label on `cx` then reads as
 * text crowding one edge, which is exactly what the Documents petal was doing.
 * Scanning the polygon at the label's own height and centring on that chord
 * fixes every petal rather than nudging one of them by hand.
 */
function chordCenterX(
  verts: readonly (readonly [number, number])[],
  y: number,
  fallback: number,
) {
  const xs: number[] = []
  for (let i = 0; i < verts.length; i++) {
    const [x1, y1] = verts[i]
    const [x2, y2] = verts[(i + 1) % verts.length]
    if (y1 === y2) continue
    const t = (y - y1) / (y2 - y1)
    if (t < 0 || t > 1) continue
    xs.push(x1 + t * (x2 - x1))
  }
  if (xs.length < 2) return fallback
  return (Math.min(...xs) + Math.max(...xs)) / 2
}

function petalLayout() {
  return PETAL_ORDER.map((id, k) => {
    const angleDeg = -90 + (k * 360) / PETAL_ORDER.length
    const a = (angleDeg * Math.PI) / 180
    const cx = CENTER[0] + ORBIT * Math.cos(a)
    const cy = CENTER[1] + ORBIT * Math.sin(a)
    // rotate each pentagon so its apex points outward, away from the hub
    const rotation = angleDeg + 90
    const verts = petalVertices(cx, cy, rotation)
    return {
      id,
      cx,
      cy,
      rotation,
      // Where the two-line label should actually sit: the average of the
      // shape's midpoint at the top and bottom of the text block.
      labelX: (chordCenterX(verts, cy - 4, cx) + chordCenterX(verts, cy + 4, cx)) / 2,
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
    <section className="relative overflow-hidden bg-[var(--gray-1)] py-20 lg:py-32">
      {/* Keeps its own wide canvas: the diagram needs more room than the
          1140px content column, but the heading type matches the rest of the
          redesigned pages. */}
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header. Centred on purpose: it sits above a radial diagram. */}
        <div className="mb-16 text-center lg:mb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {intro.eyebrow}
          </p>
          <h2 className="text-3xl font-normal leading-[1.1] tracking-tight text-foreground lg:text-5xl">
            {intro.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
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

          {/* Desktop: the platform flower, rounded pentagons around an octagonal hub */}
          <div
            className="relative mx-auto hidden w-full max-w-[1100px] lg:block"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          >
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              style={{ overflow: "visible" }}
            >
              {/* subtle top-to-bottom gradient per module, depth without looking gradiented */}
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
                const hubEdge = CENTER_R * Math.cos(Math.PI / HUB_SIDES) // hub inradius
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

              {/* hub, one flat edge facing each petal */}
              <path
                d={roundedPolygonPath(CENTER[0], CENTER[1], CENTER_R, HUB_SIDES, 180 / HUB_SIDES, 3.5)}
                fill="url(#pf-grad-opticloud)"
                className="cursor-pointer transition-[filter] duration-200 hover:brightness-110"
                onClick={() => setActiveModule("opticloud")}
              />
            </svg>

            {/* HTML label overlay (positioned over each pentagon) */}
            <div className="absolute inset-0">
              {petals.map((p) => (
                <Label key={p.id} id={p.id} x={p.labelX} y={p.cy} r={PETAL_R} />
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
                    <DialogDescription className="mt-0.5 font-medium text-foreground/82">
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
