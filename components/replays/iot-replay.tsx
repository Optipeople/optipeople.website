"use client"

import type { IotDemo } from "@/content/replays/iot"

import { APP, ReplayScale, TabletFrame } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * A scripted replay of a machine coming online, for the IoT module page.
 *
 * The page says data comes from what you already run, so the replay shows
 * the moment that pays off: CNC Drilling connects, its real telemetry
 * (Vibration, Beholder, Silo) ticks in once a second, the vibration curve
 * draws as the readings land, the part counter counts, and when vibration
 * crosses its limit the value turns amber and an alert goes out.
 *
 * It is code, not a video, because the live panel needs a login we cannot
 * show and the demo machine does not cross a limit on cue. The values stay
 * inside the ranges the demo machine really reports (content/replays/iot.ts).
 *
 * Reduced motion sits on the alert: curve drawn up to the crossing, value
 * amber, alert showing.
 */

const BEATS = [
  { id: "connect", ms: 1600 },
  { id: "online", ms: 1100 },
  { id: "t1", ms: 1000 },
  { id: "t2", ms: 1000 },
  { id: "t3", ms: 1000 },
  { id: "t4", ms: 1000 },
  { id: "t5", ms: 1000 },
  { id: "t6", ms: 1000 },
  { id: "alert", ms: 4000 },
  { id: "t7", ms: 1000 },
  { id: "t8", ms: 1800 },
] as const

/** Vibration in mm/s, one reading every third of a second. */
const VIB = [
  2.9, 3.1, 2.8, 3.0, 3.3, 3.1, 2.9, 3.2, 3.4, 3.1, 3.3, 3.5, 3.2, 3.4, 3.6, 3.5,
  3.7, 3.6, 3.9, 3.8, 4.0, 4.1, 4.3, 4.4, 4.8, 4.7, 4.9, 4.6, 4.8, 4.7, 4.9, 4.8,
]
const LIMIT = 4.5
/** Readings on screen per tick, from `online` on. Index 7 is `alert`. */
const SHOWN = [4, 7, 10, 13, 16, 19, 22, 25, 28, 31]
/** Beholder (bar), Silo (PSI) and the part counter per tick. */
const TANK = [7.4, 7.5, 7.3, 7.6, 7.4, 7.5, 7.7, 7.6, 7.5, 7.4]
const SILO = [40.2, 40.6, 41.1, 40.8, 41.5, 42.0, 41.7, 42.3, 42.1, 42.6]
const COUNT = [52, 52, 53, 54, 54, 55, 56, 56, 57, 58]

const W = 100
const H = 40
const VMAX = 6
const x = (i: number) => (i / (VIB.length - 1)) * W
const y = (v: number) => H - 2 - (v / VMAX) * (H - 6)

/** A lighter take on APP.running, so the line reads on the dark panel. */
const LINE = "#7cc4b8"

export function IotReplay({ copy, label }: { copy: IotDemo; label: string }) {
  const { root, ...r } = useReplay(BEATS, "alert")
  const tick = r.b - BEATS.findIndex((b) => b.id === "online")
  const live = tick >= 0
  const n = live ? SHOWN[tick] : 0
  const vib = live ? VIB[n - 1] : 0
  const over = vib > LIMIT
  const fmt = (v: number) => v.toFixed(1).replace(".", copy.decimal)

  const points = VIB.slice(0, n).map((v, i) => `${x(i).toFixed(2)},${y(v).toFixed(2)}`)
  const last = n ? { cx: x(n - 1), cy: y(VIB[n - 1]) } : null

  return (
    <div ref={root} role="img" aria-label={label} className="mx-auto w-full max-w-[34rem]">
      {/* A picture of the app: screen readers get the label instead. */}
      <div aria-hidden>
        <ReplayScale>
          <TabletFrame>
            <div className="bg-gradient-to-b from-black/30 to-transparent px-[1.1em] pb-[1em] pt-[0.9em]">
              {/* Machine and connection */}
              <div className="flex items-start justify-between gap-[0.8em]">
                <div>
                  <p className="text-[1em] font-semibold tracking-tight">{copy.machine}</p>
                  <p className="mt-[0.15em] text-[0.66em] text-white/60">
                    {live ? copy.lastMessage : copy.order}
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-[0.4em] rounded-full border px-[0.6em] py-[0.25em] text-[0.66em] font-medium uppercase tracking-[0.12em] transition-colors duration-300 motion-reduce:transition-none"
                  style={
                    live
                      ? { borderColor: "rgba(124,196,184,0.5)", color: LINE }
                      : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.65)" }
                  }
                >
                  {live ? (
                    <span className="mockup-live-dot h-[0.6em] w-[0.6em] rounded-full" style={{ backgroundColor: LINE }} />
                  ) : (
                    <span className="assist-spin h-[0.7em] w-[0.7em] rounded-full border border-white/50 border-t-transparent" />
                  )}
                  {live ? copy.online : copy.connecting}
                </span>
              </div>

              {/* Live values */}
              <div className="mt-[0.8em] grid grid-cols-4 gap-[0.4em]">
                <Value label={copy.vibration} unit="mm/s" value={live ? fmt(vib) : null} warn={over} />
                <Value label={copy.tank} unit="bar" value={live ? fmt(TANK[tick]) : null} />
                <Value label={copy.silo} unit="PSI" value={live ? fmt(SILO[tick]) : null} />
                <Value label={copy.counter} unit={copy.counterUnit} value={live ? String(COUNT[tick]) : null} bump={live ? COUNT[tick] : undefined} />
              </div>

              {/* Vibration, drawn as the readings land */}
              <div className="mt-[0.5em] rounded-[0.5em] bg-white/[0.05] px-[0.7em] pb-[0.5em] pt-[0.55em]">
                <div className="flex items-center justify-between text-[0.66em]">
                  <span className="font-medium text-white/85">{copy.chartTitle}</span>
                  <span className="text-white/55">mm/s</span>
                </div>
                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-[0.3em] h-[7em] w-full overflow-visible">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <line key={v} x1="0" x2={W} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
                  ))}
                  <line
                    x1="0"
                    x2={W}
                    y1={y(LIMIT)}
                    y2={y(LIMIT)}
                    stroke={APP.amber}
                    strokeWidth="0.4"
                    strokeDasharray="1.6 1.2"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.8"
                  />
                  {points.length > 1 && (
                    <>
                      <polygon
                        points={`0,${H} ${points.join(" ")} ${x(n - 1).toFixed(2)},${H}`}
                        fill={APP.running}
                        opacity="0.35"
                      />
                      <polyline
                        points={points.join(" ")}
                        fill="none"
                        stroke={LINE}
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </>
                  )}
                </svg>
                {/* The newest reading and the limit label sit outside the
                    stretched SVG so they stay round and readable. */}
                <div className="relative -mt-[7em] h-[7em]">
                  <span
                    className="absolute left-0 -translate-y-full pb-[0.15em] text-[0.66em]"
                    style={{ top: `${(y(LIMIT) / H) * 100}%`, color: APP.amber }}
                  >
                    {copy.limit}
                  </span>
                  {last && (
                    <span
                      className="absolute h-[0.55em] w-[0.55em] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 motion-reduce:transition-none"
                      style={{
                        left: `${last.cx}%`,
                        top: `${(last.cy / H) * 100}%`,
                        backgroundColor: over ? APP.amber : LINE,
                        boxShadow: `0 0 0 0.3em ${over ? "rgba(242,184,75,0.25)" : "rgba(124,196,184,0.2)"}`,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* The alert, once the limit is crossed. Space is kept so nothing jumps. */}
              <div
                className={`mt-[0.5em] flex items-start gap-[0.6em] rounded-[0.5em] border px-[0.7em] py-[0.5em] ${
                  r.on("alert") ? "assist-rise" : "invisible"
                }`}
                style={{ borderColor: "rgba(242,184,75,0.55)", backgroundColor: "rgba(242,184,75,0.12)" }}
              >
                <span
                  className="mt-[0.1em] flex h-[1.3em] w-[1.3em] shrink-0 items-center justify-center rounded-full text-[0.75em] font-bold"
                  style={{ backgroundColor: APP.amber, color: APP.panel }}
                >
                  !
                </span>
                <div>
                  <p className="text-[0.68em] font-semibold" style={{ color: APP.amber }}>
                    {copy.alertTitle}
                  </p>
                  <p className="mt-[0.1em] text-[0.66em] text-white/75">{copy.alertBody}</p>
                </div>
              </div>
            </div>
          </TabletFrame>
        </ReplayScale>
      </div>
    </div>
  )
}

function Value({
  label,
  unit,
  value,
  warn = false,
  bump,
}: {
  label: string
  unit: string
  value: string | null
  warn?: boolean
  /** Changes when the value should pop, e.g. the counter on each tick. */
  bump?: number
}) {
  return (
    <div
      className="rounded-[0.5em] px-[0.6em] py-[0.5em] transition-colors duration-300 motion-reduce:transition-none"
      style={{
        backgroundColor: warn ? "rgba(242,184,75,0.16)" : "rgba(255,255,255,0.05)",
        boxShadow: warn ? `inset 0 0 0 0.12em ${APP.amber}` : "none",
      }}
    >
      <p className="truncate text-[0.66em] font-medium uppercase tracking-[0.1em] text-white/60">{label}</p>
      <div className="mt-[0.2em] h-[1.6em]">
        {value === null ? (
          <span className="mt-[0.4em] block h-[0.8em] w-[70%] rounded-[0.2em] bg-white/10" />
        ) : (
          <p
            key={bump}
            className={`text-[1.35em] leading-none tabular-nums transition-colors duration-300 motion-reduce:transition-none ${
              bump !== undefined ? "assist-rise" : ""
            }`}
            style={{ color: warn ? APP.amber : "white" }}
          >
            {value}
          </p>
        )}
      </div>
      <p className="truncate text-[0.66em] text-white/50">{unit}</p>
    </div>
  )
}
