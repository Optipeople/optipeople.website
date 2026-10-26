"use client"

import { MousePointer2 } from "lucide-react"

import type { OeeDemo } from "@/content/replays/oee"

import { APP, Card, DesktopFrame, Gauge, ReplayScale } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * The OEE module hero: the report for one shift building itself.
 *
 * The gauges sweep to availability, performance and OEE, the shift's figures
 * rise in under them, the timeline fills from 06:00 to 14:35 with running time
 * and stops, the stop distribution bars grow, and the pointer settles on the
 * biggest bar to show its reason and minutes. The matching stops light up on
 * the timeline, so the eye goes from a number to the minutes behind it.
 *
 * It is code, not a video, because the live report sits behind a login and a
 * screen recording would freeze one week of demo data. Every number is the
 * real CNC Drilling day shift on the demo account, Thursday 22 October 2026.
 */

const BEATS = [
  { id: "empty", ms: 1000 },
  { id: "gauges", ms: 2200 },
  { id: "timeline", ms: 3000 },
  { id: "bars", ms: 2200 },
  { id: "hover", ms: 4600 },
  { id: "hold", ms: 2400 },
] as const

type Reason = keyof OeeDemo["reasons"]

const COLOR: Record<Reason, string> = {
  e2000: APP.purple,
  e1001: APP.brown,
  noReg: APP.blue,
  breaktime: "#8c9a97",
  maintenance: APP.amber,
  qa: APP.stop,
  missing: "#d9822b",
}

// The day shift, 06:00 to 14:35, in minutes from 06:00. Stops as registered.
const SPAN = 515
const STOPS: { from: number; to: number; reason: Reason }[] = [
  { from: 4.5, to: 27.1, reason: "e2000" },
  { from: 142.1, to: 153.9, reason: "noReg" },
  { from: 164.9, to: 189.1, reason: "e2000" },
  { from: 213.9, to: 242.8, reason: "e1001" },
  { from: 297, to: 314, reason: "breaktime" },
  { from: 316.1, to: 320.2, reason: "maintenance" },
  { from: 320.3, to: 329.4, reason: "qa" },
  { from: 402.4, to: 418.2, reason: "maintenance" },
  { from: 488.4, to: 512, reason: "missing" },
]
// Long running stretches get the "Running" label, as in the app.
const RUNS = [
  { from: 27.1, to: 142.1 },
  { from: 242.8, to: 297 },
  { from: 418.2, to: 488.4 },
]
const TICKS = ["06:00", "08:00", "10:00", "12:00", "14:00"]

// Top five stop reasons of the shift by minutes, with how many stops.
const TOP: { reason: Reason; minutes: number; count: number }[] = [
  { reason: "e2000", minutes: 47, count: 2 },
  { reason: "e1001", minutes: 29, count: 1 },
  { reason: "missing", minutes: 24, count: 1 },
  { reason: "maintenance", minutes: 20, count: 4 },
  { reason: "breaktime", minutes: 17, count: 1 },
]
const MAX = 50

const SHIFT = { availability: 77.9, performance: 50.6, oee: 32.2, stops: 12, produced: 181, rejected: 33 }

export function OeeReplay({ copy, label }: { copy: OeeDemo; label: string }) {
  const { root, ...r } = useReplay(BEATS, "hover")
  const { on } = r

  const hover = on("hover")
  const big = TOP[0]

  return (
    <div ref={root} role="img" aria-label={label} className="mx-auto w-full max-w-[34rem]">
      <div aria-hidden>
        <ReplayScale>
          <DesktopFrame tabs={copy.tabs} active={0}>
            <div className="flex items-center justify-between gap-[0.6em]">
              <p className="text-[0.7em]">
                {copy.machineLabel} <span className="font-semibold">{copy.machine}</span>
              </p>
              <span className="rounded-[0.3em] px-[0.6em] py-[0.2em] text-[0.66em] font-medium text-white" style={{ backgroundColor: APP.teal }}>
                {copy.shift}
              </span>
            </div>

            <div className="mt-[0.6em] grid grid-cols-3 gap-[0.5em]">
              <Card title={copy.availability}>
                <Gauge value={on("gauges") ? SHIFT.availability : 0} color={APP.amber} label="" />
              </Card>
              <Card title={copy.performance}>
                <Gauge value={on("gauges") ? SHIFT.performance : 0} color={APP.stop} label="" />
              </Card>
              <Card title={copy.oee}>
                <Gauge value={on("gauges") ? SHIFT.oee : 0} color={APP.stop} label="" />
              </Card>
            </div>

            {/* The shift's own figures, under the gauges. */}
            <div className="mt-[0.4em] flex h-[1.3em] flex-wrap gap-x-[1.2em] text-[0.68em] text-black/60">
              {on("gauges") &&
                [
                  [copy.runTime, copy.runHours],
                  [copy.stops, SHIFT.stops],
                  [copy.produced, SHIFT.produced],
                  [copy.rejected, SHIFT.rejected],
                ].map(([k, v], i) => (
                  <span key={String(k)} className="assist-rise" style={{ animationDelay: `${300 + i * 150}ms` }}>
                    {k} <span className="font-semibold tabular-nums" style={{ color: APP.ink }}>{v}</span>
                  </span>
                ))}
            </div>

            <Card title={copy.timeline} className="mt-[0.3em]">
              <div className="mt-[0.5em] h-[2.2em] rounded-[0.15em] bg-black/[0.05]">
                <div
                  className="relative h-full rounded-[0.15em] transition-[clip-path] ease-linear motion-reduce:transition-none"
                  style={{
                    // Wipe in over the beat, but clear at once when the loop restarts.
                    transitionDuration: on("timeline") ? "2600ms" : "0ms",
                    backgroundColor: APP.running,
                    clipPath: on("timeline") ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                  }}
                >
                  {RUNS.map((run) => (
                    <span
                      key={run.from}
                      className="absolute inset-y-0 flex items-center justify-center text-[0.66em] text-white/80"
                      style={{ left: `${(run.from / SPAN) * 100}%`, width: `${((run.to - run.from) / SPAN) * 100}%` }}
                    >
                      {copy.runningSegment}
                    </span>
                  ))}
                  {STOPS.map((s) => (
                    <span
                      key={s.from}
                      className="absolute inset-y-0 transition-opacity duration-500 motion-reduce:transition-none"
                      style={{
                        left: `${(s.from / SPAN) * 100}%`,
                        width: `${((s.to - s.from) / SPAN) * 100}%`,
                        backgroundColor: COLOR[s.reason],
                        opacity: hover && s.reason !== big.reason ? 0.35 : 1,
                        boxShadow: hover && s.reason === big.reason ? "inset 0 0 0 0.15em white" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Two-hour ticks where they fall on the 06:00 to 14:35 span. */}
              <div className="relative mt-[0.3em] h-[1.4em] text-[0.66em] text-black/50">
                {TICKS.map((t, i) => (
                  <span
                    key={t}
                    className={`absolute top-0 ${i ? "-translate-x-1/2" : ""}`}
                    style={{ left: `${((i * 120) / SPAN) * 100}%` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>

            <Card title={copy.distribution} className="relative mt-[0.5em]">
              <div className="mt-[0.4em] flex gap-[0.4em]">
                {/* Height in the card's em, so the axis spans the bars. */}
                <div className="flex h-[5em] w-[1.1em] shrink-0 flex-col justify-between text-right text-black/45 [&>span]:text-[0.66em] [&>span]:leading-none">
                  <span>{MAX}</span>
                  <span>{MAX / 2}</span>
                  <span>0</span>
                </div>
                <div className="grid flex-1 grid-cols-5 gap-[0.7em] border-b border-l" style={{ borderColor: APP.line }}>
                  {TOP.map((t, i) => (
                    <div key={t.reason} className="flex h-[5em] items-end">
                      <div
                        className="flex w-full justify-center transition-[height,opacity] duration-700 ease-out motion-reduce:transition-none"
                        style={{
                          height: on("bars") ? `${(t.minutes / MAX) * 100}%` : "0%",
                          transitionDelay: on("bars") && !on("hover") ? `${i * 120}ms` : "0ms",
                          backgroundColor: COLOR[t.reason],
                          opacity: hover && t.reason !== big.reason ? 0.45 : 1,
                          boxShadow: hover && t.reason === big.reason ? `0 0 0 0.2em ${APP.purple}40` : "none",
                        }}
                      >
                        <span className="pt-[0.15em] text-[0.66em] font-semibold text-white tabular-nums">{t.minutes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ml-[1.5em] mt-[0.3em] grid grid-cols-5 gap-[0.7em] text-center [&>span]:text-[0.66em] text-black/55">
                {TOP.map((t) => (
                  <span key={t.reason} className="truncate">
                    {copy.reasons[t.reason]}
                  </span>
                ))}
              </div>
              <span className="absolute right-[0.7em] top-[0.7em] text-[0.66em] text-black/45">{copy.minutesAxis}</span>

              {/* The hover tooltip on the biggest bar. */}
              {hover && (
                <div
                  className="assist-rise absolute left-[24%] top-[1.6em] z-10 whitespace-nowrap rounded-[0.35em] px-[0.7em] py-[0.45em] text-white shadow-lg"
                  style={{ backgroundColor: APP.ink, animationDelay: "650ms" }}
                >
                  <p className="flex items-center gap-[0.4em] text-[0.66em] font-semibold">
                    <span className="h-[0.7em] w-[0.7em] rounded-[0.15em]" style={{ backgroundColor: COLOR[big.reason] }} />
                    {copy.reasons[big.reason]}
                  </p>
                  <p className="text-[0.68em] text-white/75">
                    {big.count} {copy.stopsUnit} · {big.minutes} min
                  </p>
                </div>
              )}

              {/* The pointer: parked bottom right, then onto the biggest bar. */}
              <MousePointer2
                className="absolute z-20 h-[1.3em] w-[1.3em] drop-shadow transition-[left,top,opacity] duration-700 ease-out motion-reduce:transition-none"
                style={{
                  left: hover ? "17%" : "88%",
                  top: hover ? "3.4em" : "6.5em",
                  opacity: on("bars") ? 1 : 0,
                  color: APP.ink,
                  fill: "white",
                }}
                aria-hidden
              />
            </Card>
          </DesktopFrame>
        </ReplayScale>
      </div>
    </div>
  )
}
