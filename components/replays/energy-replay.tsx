"use client"

import type { EnergyDemo } from "@/content/replays/energy"

import { APP, Card, DesktopFrame, ReplayScale, Tap } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * A scripted replay of the energy report, for the EMS module page.
 *
 * The page promises energy tied to production, so the replay builds exactly
 * that: CNC Robot's day shift on the demo account, kWh per hour drawn on the
 * same time axis as the running and stopped timeline. Then it divides the
 * shift's energy by the good parts, and last it finds the stretch where the
 * robot stood still for 39 minutes and kept drawing power.
 *
 * It is code, not a video, because the live report needs a login we cannot
 * show, and a recording could not pick out the one stretch that matters. The
 * stops and the part count are the real ones from 26 October 2026; the kWh
 * follow from the demo meter (see content/replays/energy.ts).
 *
 * Reduced motion sits on the idle highlight, which tells the whole story.
 */

const BEATS = [
  { id: "open", ms: 1200 },
  { id: "draw", ms: 3600 },
  { id: "total", ms: 1800 },
  { id: "perPart", ms: 2800 },
  { id: "press", ms: 1400 },
  { id: "idle", ms: 5000 },
  { id: "hold", ms: 2200 },
] as const

/** The shift runs 06:00 to 17:00: 660 minutes. */
const SHIFT = 660

/** kWh per hour, 06 to 16: about 22 kW running, 11 kW while stopped. */
const HOURS = [20.9, 20.7, 21.6, 19.6, 21.1, 21.5, 21.1, 17.6, 18.0, 20.7, 19.6]
const MAX = 24

/** CNC Robot's real stops that shift, as [start, length] in minutes from 06:00. */
const STOPS = [
  [39.4, 6.2],
  [75.3, 6.6],
  [178.4, 13.7],
  [239.2, 6.4],
  [357.6, 7.8],
  [456.4, 24.6],
  [481.0, 14.1],
  [533.1, 14.8],
  [619.8, 13.0],
] as const

/** Missing Material running straight into Critical Malfunction: 13:36 to 14:15. */
const IDLE = { start: 456.4, end: 495.1 }

const pct = (min: number) => `${(min / SHIFT) * 100}%`

export function EnergyReplay({ copy, label }: { copy: EnergyDemo; label: string }) {
  const { root, ...r } = useReplay(BEATS, "idle")
  const drawn = r.on("draw")

  return (
    <div ref={root} role="img" aria-label={label} className="mx-auto w-full max-w-[34rem]">
      {/* A picture of the app: screen readers get the label instead. */}
      <div aria-hidden>
        <ReplayScale>
          <DesktopFrame tabs={copy.tabs} active={0}>
            <div className="flex items-baseline justify-between gap-[0.6em]">
              <p className="text-[0.72em]">
                {copy.machineLabel} <span className="font-semibold">{copy.machine}</span>
                <span className="ml-[0.6em] text-[0.94em] text-black/55">{copy.shift}</span>
              </p>
              <span
                className="shrink-0 rounded-[0.3em] px-[0.55em] py-[0.25em] text-[0.66em] font-medium text-white"
                style={{ backgroundColor: APP.teal }}
              >
                {copy.template}
              </span>
            </div>

            {/* Shift totals */}
            <div className="mt-[0.6em] grid grid-cols-3 gap-[0.5em]">
              <Kpi label={copy.kwhLabel} show={r.on("total")} value={copy.kwh} unit="kWh" />
              <Kpi label={copy.partsLabel} show={r.on("total")} value={copy.parts} />
              <Kpi
                label={copy.perPartLabel}
                show={r.on("perPart")}
                value={copy.perPart}
                note={copy.perPartSum}
                lit={r.is("perPart")}
              />
            </div>

            {/* kWh per hour over the production timeline, on one time axis */}
            <Card className="relative mt-[0.5em]">
              <div className="flex items-center justify-between gap-[0.6em]">
                <p className="text-[0.68em] font-medium">{copy.chartTitle}</p>
                <span
                  className={`relative rounded-[0.3em] border px-[0.55em] py-[0.25em] text-[0.66em] font-medium transition-colors duration-300 motion-reduce:transition-none ${
                    r.is("press") ? "assist-press" : ""
                  }`}
                  style={
                    r.on("press")
                      ? { backgroundColor: APP.amber, borderColor: APP.amber, color: APP.ink }
                      : { borderColor: APP.line, color: APP.ink }
                  }
                >
                  {copy.idleButton}
                  <Tap show={r.is("press") && !r.still} className="-right-[0.4em] -top-[0.5em]" />
                </span>
              </div>

              <div className="relative mt-[0.6em]">
                {/* Sweeps in left to right, the way the shift filled up. */}
                <div
                  style={{
                    clipPath: drawn ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                    transition: drawn && !r.still ? "clip-path 3200ms linear" : "none",
                  }}
                >
                  <div className="flex h-[6.5em] items-end gap-[0.25em] border-b" style={{ borderColor: APP.line }}>
                    {HOURS.map((v, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-t-[0.15em]"
                        style={{ height: `${(v / MAX) * 100}%`, backgroundColor: APP.teal, opacity: 0.85 }}
                      />
                    ))}
                  </div>
                  <p className="mt-[0.5em] text-[0.66em] text-black/60">{copy.timelineTitle}</p>
                  <div className="relative mt-[0.25em] h-[1.3em] overflow-hidden rounded-[0.2em]" style={{ backgroundColor: APP.running }}>
                    {STOPS.map(([start, len]) => (
                      <span
                        key={start}
                        className="absolute inset-y-0"
                        style={{ left: pct(start), width: pct(len), backgroundColor: APP.stop }}
                      />
                    ))}
                  </div>
                </div>

                {/* The idle stretch, marked on bars and timeline at once */}
                <span
                  className={`pointer-events-none absolute -inset-y-[0.2em] rounded-[0.25em] border-2 transition-opacity duration-500 motion-reduce:transition-none ${
                    r.on("idle") ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    left: pct(IDLE.start),
                    width: pct(IDLE.end - IDLE.start),
                    borderColor: APP.amber,
                    backgroundColor: "rgba(242,184,75,0.22)",
                  }}
                />

                <div className="relative mt-[0.3em] h-[1em] text-[0.66em] tabular-nums text-black/55">
                  {[6, 8, 10, 12, 14, 16].map((h, i) => (
                    <span
                      key={h}
                      className={`absolute top-0 ${i ? "-translate-x-1/2" : ""}`}
                      style={{ left: pct((h - 6) * 60) }}
                    >
                      {String(h).padStart(2, "0")}:00
                    </span>
                  ))}
                </div>
                <div className="mt-[0.2em] flex gap-[0.9em] text-[0.66em] text-black/60">
                  <Legend color={APP.running} text={copy.running} />
                  <Legend color={APP.stop} text={copy.stopped} />
                </div>
              </div>
            </Card>

            {/* What the highlight means. Space is kept so nothing jumps. */}
            <div
              className={`mt-[0.5em] rounded-[0.4em] border-l-[0.25em] bg-[#fdf6e6] px-[0.7em] py-[0.55em] ${
                r.on("idle") ? "assist-rise" : "invisible"
              }`}
              style={{ borderColor: APP.amber }}
            >
              <p className="text-[0.68em] font-semibold">{copy.idleTitle}</p>
              <p className="mt-[0.15em] text-[0.66em] text-black/60">{copy.idleWhen}</p>
              <div className="mt-[0.4em] flex flex-wrap gap-[0.35em]">
                {copy.idleFacts.map((f, i) => (
                  <span
                    key={f}
                    className={`rounded-full bg-white px-[0.6em] py-[0.2em] text-[0.66em] font-medium tabular-nums ring-1 ring-black/10 ${
                      r.on("idle") ? "assist-rise" : ""
                    }`}
                    style={{ animationDelay: `${300 + i * 250}ms` }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p
                className={`mt-[0.4em] text-[0.66em] text-black/70 ${r.on("idle") ? "assist-rise" : ""}`}
                style={{ animationDelay: "1200ms" }}
              >
                {copy.shiftIdle}
              </p>
            </div>
          </DesktopFrame>
        </ReplayScale>
      </div>
    </div>
  )
}

function Kpi({
  label,
  value,
  unit,
  note,
  show,
  lit = false,
}: {
  label: string
  value: string
  unit?: string
  note?: string
  show: boolean
  lit?: boolean
}) {
  return (
    <div
      className="rounded-[0.4em] border bg-white px-[0.6em] py-[0.5em] transition-shadow duration-300 motion-reduce:transition-none"
      style={{ borderColor: APP.line, boxShadow: lit ? `0 0 0 0.15em ${APP.amber}` : "none" }}
    >
      <p className="truncate text-[0.66em] text-black/60">{label}</p>
      <div className="mt-[0.15em] h-[1.5em]">
        {show ? (
          <p className="assist-rise text-[1.25em] leading-none tabular-nums">
            {value}
            {unit && <span className="ml-[0.25em] text-[0.56em] text-black/55">{unit}</span>}
          </p>
        ) : (
          <span className="mt-[0.3em] block h-[0.8em] w-[60%] rounded-[0.2em] bg-black/[0.06]" />
        )}
      </div>
      <p className={`truncate text-[0.66em] text-black/55 ${note && show ? "" : "invisible"}`}>{note ?? "."}</p>
    </div>
  )
}

function Legend({ color, text }: { color: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-[0.35em]">
      <span className="h-[0.7em] w-[0.7em] rounded-[0.15em]" style={{ backgroundColor: color }} />
      {text}
    </span>
  )
}
