import type { ReactNode } from "react"
import { useLocale } from "next-intl"

/**
 * Shared chrome for the product replays. Colours are lifted from the real app
 * (the captures in public/images/Mockups): deep teal tabs and buttons, white
 * report cards on a white page, the operator panel on near-black teal.
 *
 * Everything sizes in `em` off one container-relative font size, the same
 * trick as the *Visual components in components/module-mockups.tsx, so a
 * replay reads the same in a 20rem phone column and a 40rem desktop one.
 */
export const APP = {
  teal: "#0f4a43",
  tealDark: "#0b302c",
  ink: "#1d2a27",
  line: "rgba(29,42,39,0.14)",
  running: "#1a6b63",
  panel: "#0e2f2b",
  panelTile: "#3d5652",
  stop: "#e5484d",
  amber: "#f2b84b",
  blue: "#5b8de0",
  purple: "#4b2a7a",
  brown: "#8a6528",
} as const

/** The outer wrapper every replay starts with: sets the em scale. */
export function ReplayScale({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`@container w-full ${className}`}>
      <div style={{ fontSize: "clamp(6px, 2.6cqw, 15px)" }}>{children}</div>
    </div>
  )
}

/**
 * The web app in a window: logo row, then the dark tab strip the report and
 * planning screens open on. `tabs[active]` is drawn selected.
 */
export function DesktopFrame({
  tabs,
  active,
  children,
}: {
  tabs: string[]
  active: number
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-[0.9em] bg-white shadow-[0_2.5em_5em_-2em_rgba(0,0,0,0.55)] ring-1 ring-black/10">
      <div className="flex items-center gap-[0.35em] border-b px-[0.9em] py-[0.55em]" style={{ borderColor: APP.line }}>
        <span className="h-[0.6em] w-[0.6em] rounded-full bg-black/10" />
        <span className="h-[0.6em] w-[0.6em] rounded-full bg-black/10" />
        <span className="h-[0.6em] w-[0.6em] rounded-full bg-black/10" />
        <span className="ml-[0.8em] text-[0.95em] font-semibold tracking-tight" style={{ color: APP.ink }}>
          OptiPeople
        </span>
      </div>
      <div className="flex flex-wrap gap-[0.2em] px-[0.9em] pt-[0.6em]">
        {tabs.map((tab, i) => (
          <span
            key={tab}
            className="rounded-t-[0.3em] px-[0.6em] py-[0.3em] text-[0.68em] font-medium transition-colors duration-300"
            style={
              i === active
                ? { backgroundColor: "white", color: APP.ink, boxShadow: `inset 0 0 0 1px ${APP.line}` }
                : { backgroundColor: APP.teal, color: "white" }
            }
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="relative border-t px-[0.9em] pb-[0.9em] pt-[0.7em]" style={{ borderColor: APP.line, color: APP.ink }}>
        {children}
      </div>
    </div>
  )
}

/**
 * The operator panel on its tablet. `alert` draws the red edge the real panel
 * shows while the machine is stopped.
 */
export function TabletFrame({ alert = false, children }: { alert?: boolean; children: ReactNode }) {
  return (
    <div className="rounded-[1.4em] bg-[#141a19] p-[0.55em] shadow-[0_2.5em_5em_-2em_rgba(0,0,0,0.6)] ring-1 ring-white/10">
      <div
        className="relative overflow-hidden rounded-[0.9em] text-white transition-shadow duration-500"
        style={{
          backgroundColor: APP.panel,
          boxShadow: alert ? `inset 0 0 0 0.22em ${APP.stop}` : "inset 0 0 0 0.22em transparent",
        }}
      >
        {children}
      </div>
    </div>
  )
}

/** A white report card with a small title, as on the report screens. */
export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[0.4em] border bg-white p-[0.7em] ${className}`} style={{ borderColor: APP.line }}>
      {title && <p className="text-[0.7em] font-medium" style={{ color: APP.ink }}>{title}</p>}
      {children}
    </div>
  )
}

/** A gauge like the Availability / Performance / OEE dials in the report. */
export function Gauge({ value, color, label }: { value: number; color: string; label?: string }) {
  // Danish writes the decimal comma and a space before the sign: 72,4 %.
  const da = useLocale() === "da"
  const r = 40
  const len = Math.PI * r
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 58" className="w-full max-w-[7em]" aria-hidden>
        <path d="M10 52 A40 40 0 0 1 90 52" fill="none" stroke="#ececea" strokeWidth="9" strokeLinecap="round" />
        <path
          d="M10 52 A40 40 0 0 1 90 52"
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - value / 100)}
          className="motion-reduce:!transition-none"
          style={{ transition: "stroke-dashoffset 900ms ease-out, stroke 400ms" }}
        />
        <text x="50" y="50" textAnchor="middle" fontSize="17" fill={color} className="motion-reduce:!transition-none" style={{ transition: "fill 400ms" }}>
          {da ? `${value.toFixed(1).replace(".", ",")} %` : `${value.toFixed(1)}%`}
        </text>
      </svg>
      {label && <span className="mt-[0.2em] text-[0.66em] text-black/60">{label}</span>}
    </div>
  )
}

/** A finger tap, drawn where a click lands in the replay. Position it with `className`. */
export function Tap({ show, className = "" }: { show: boolean; className?: string }) {
  if (!show) return null
  return (
    <span
      className={`replay-tap pointer-events-none absolute z-20 h-[1.6em] w-[1.6em] rounded-full border-2 border-white/90 bg-white/30 shadow-[0_0_0_0.3em_rgba(60,207,90,0.35)] ${className}`}
      aria-hidden
    />
  )
}
