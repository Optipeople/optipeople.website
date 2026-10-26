"use client"

import { Check, X } from "lucide-react"

import type { PlatformDemo } from "@/content/replays/platform"

import { APP, Card, DesktopFrame, Gauge, ReplayScale, TabletFrame, Tap } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * The /platform hero: one stop, one record, two screens.
 *
 * On the operator panel CNC Drilling runs, then stops and the edge turns red.
 * The operator opens the stop screen, taps a reason and Select. Then the view
 * crossfades to the OEE report on the desktop, where the same stop lands as a
 * new segment on the timeline, its bar in the stop distribution grows by one,
 * and availability and OEE tick down. That is the platform's claim: what is
 * registered at the machine is the report, nobody types it in again.
 *
 * It is code, not a video, because the real flow spans a tablet and a browser
 * and the live app sits behind a login. The report numbers follow the CNC
 * Drilling day shift on the demo account (22 October 2026, performance 50.6 %,
 * quality 81.8 %); the coolant stops are added to show the change.
 */

const BEATS = [
  { id: "running", ms: 2200 },
  { id: "stopped", ms: 1500 },
  { id: "open", ms: 700 },
  { id: "reasons", ms: 1300 },
  { id: "pick", ms: 1100 },
  { id: "select", ms: 900 },
  { id: "saved", ms: 1300 },
  { id: "report", ms: 1500 },
  { id: "segment", ms: 1600 },
  { id: "bar", ms: 1500 },
  { id: "gauges", ms: 3600 },
] as const

// The shift so far, in minutes from 06:00, as the report's timeline draws it.
const SPAN = 270
const TICKS = ["06:00", "07:00", "08:00", "09:00", "10:00"]
type Seg = { from: number; to: number; reason: "e2000" | "coolant" | "e1001" | "noReg" }
const STOPS: Seg[] = [
  { from: 4, to: 27, reason: "e2000" },
  { from: 65, to: 74, reason: "coolant" },
  { from: 142, to: 154, reason: "noReg" },
  { from: 165, to: 189, reason: "e2000" },
  { from: 214, to: 243, reason: "e1001" },
]
// The stop the operator registers: 10:12 to 10:21.
const NEW_STOP: Seg = { from: 252, to: 261, reason: "coolant" }

const COLOR: Record<Seg["reason"], string> = {
  e2000: APP.purple,
  coolant: APP.amber,
  e1001: APP.brown,
  noReg: APP.blue,
}

// E2000 is a planned stop, so it leaves availability alone. Before and after
// the new 9 minutes: 205 → 214 planned minutes, 50 → 59 of them stopped.
const BEFORE = { availability: 75.6, oee: 31.3 }
const AFTER = { availability: 72.4, oee: 30.0 }
const PERFORMANCE = 50.6

export function PlatformReplay({ copy, label }: { copy: PlatformDemo; label: string }) {
  const { root, ...r } = useReplay(BEATS, "gauges")
  const { is, on, past } = r

  const desk = on("report")
  const stopped = on("stopped") && !desk
  const stopScreen = on("reasons") && !on("saved")

  const counts = { e2000: 2, coolant: on("bar") ? 2 : 1, e1001: 1, noReg: 1 }
  const bars: Seg["reason"][] = ["e2000", "coolant", "e1001", "noReg"]

  return (
    <div ref={root} role="img" aria-label={label} className="mx-auto w-full max-w-[34rem]">
      <div aria-hidden>
        <ReplayScale>
          <div className="grid">
            {/* The operator panel */}
            <div
              className={`self-center px-[1.6em] transition-[opacity,transform] duration-700 motion-reduce:transition-none [grid-area:1/1] ${
                desk ? "pointer-events-none scale-95 opacity-0" : "opacity-100"
              }`}
            >
              <TabletFrame alert={stopped}>
                <div className="relative h-[22em]">
                  {/* Machine state */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center px-[1.4em] pt-[1.4em] transition-opacity duration-300 motion-reduce:transition-none ${
                      stopScreen ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <p className="text-[1.05em] font-semibold">{copy.machine}</p>
                    <span className="mt-[0.35em] rounded-[0.3em] border border-white/15 px-[0.6em] py-[0.15em] text-[0.66em] font-semibold uppercase tracking-[0.12em] text-white/60">
                      {copy.online}
                    </span>
                    <span
                      className="mt-[1.4em] h-[5.2em] w-[5.2em] rounded-full border-[0.3em] border-white transition-colors duration-500 motion-reduce:transition-none"
                      style={{ backgroundColor: stopped ? APP.stop : APP.running }}
                    />
                    <p className="mt-[0.6em] text-[1.7em] font-bold leading-none">
                      {stopped ? copy.stopped : copy.running}
                    </p>
                    <div className="relative mt-[1em] h-[2em]">
                      {stopped && !on("saved") && (
                        <span className="assist-rise inline-flex rounded-[0.4em] bg-[#f2b84b] px-[0.9em] py-[0.4em] text-[0.72em] font-semibold text-[#3a2a06]">
                          {copy.reasonMissing}
                        </span>
                      )}
                      {on("saved") && (
                        <span className="assist-rise inline-flex items-center gap-[0.4em] rounded-[0.4em] bg-white/12 px-[0.9em] py-[0.4em] text-[0.72em] font-semibold">
                          <Check className="h-[1.1em] w-[1.1em]" style={{ color: "#7fd1a0" }} aria-hidden />
                          {copy.reasons[copy.picked]} · {copy.registered}
                        </span>
                      )}
                      <Tap show={is("open")} className="left-1/2 top-[0.1em] -translate-x-1/2" />
                    </div>
                    <p className="absolute bottom-[1em] text-[0.68em] text-white/55">
                      {copy.produced} <span className="tabular-nums text-white/85">112</span>
                    </p>
                  </div>

                  {/* Stop screen */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center px-[1.4em] pt-[1em] transition-opacity duration-300 motion-reduce:transition-none ${
                      stopScreen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <span className="absolute left-[1em] top-[1em] flex h-[1.5em] w-[1.5em] items-center justify-center rounded-full bg-white text-[#141a19]">
                      <X className="h-[0.9em] w-[0.9em]" strokeWidth={3} aria-hidden />
                    </span>
                    <p className="text-[0.66em] font-semibold text-white/70">
                      ‹&nbsp; {copy.stopTime} &nbsp;›
                    </p>
                    <p className="text-[1.8em] font-bold leading-tight">{copy.stopsTitle}</p>
                    <div className="mt-[0.7em] grid w-full grid-cols-2 gap-[0.45em]">
                      {copy.reasons.map((reason, i) => {
                        const picked = i === copy.picked && on("pick")
                        return (
                          <span
                            key={reason}
                            className={`relative truncate rounded-[0.4em] px-[0.6em] py-[0.55em] text-center text-[0.7em] font-semibold transition-colors duration-200 ${
                              picked && is("pick") ? "assist-press" : ""
                            }`}
                            style={
                              picked
                                ? { backgroundColor: "white", color: APP.panel }
                                : { backgroundColor: APP.panelTile, color: "rgba(255,255,255,0.88)" }
                            }
                          >
                            {reason}
                          </span>
                        )
                      })}
                    </div>
                    <div className="relative mt-[0.9em]">
                      <span
                        className={`inline-flex min-w-[9em] justify-center rounded-[0.4em] px-[1em] py-[0.5em] text-[0.75em] font-semibold transition-colors duration-200 ${
                          is("select") ? "assist-press" : ""
                        }`}
                        style={
                          on("pick")
                            ? { backgroundColor: APP.running, color: "white" }
                            : { backgroundColor: APP.panelTile, color: "rgba(255,255,255,0.3)" }
                        }
                      >
                        {copy.select}
                      </span>
                      <Tap show={is("select")} className="left-1/2 top-[0.1em] -translate-x-1/2" />
                    </div>
                    {/* Tap on the picked reason, placed over its grid cell:
                        the grid starts about 5em down, rows are 2.2em apart. */}
                    <div
                      className="absolute"
                      style={{
                        top: `${5.1 + Math.floor(copy.picked / 2) * 2.2}em`,
                        left: copy.picked % 2 ? "68%" : "26%",
                      }}
                    >
                      <Tap show={is("pick")} className="left-0 top-0" />
                    </div>
                  </div>
                </div>
              </TabletFrame>
            </div>

            {/* The OEE report */}
            <div
              className={`self-center transition-[opacity,transform] duration-700 motion-reduce:transition-none [grid-area:1/1] ${
                desk ? "opacity-100" : "pointer-events-none translate-y-[1em] opacity-0"
              }`}
            >
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
                    <Gauge value={on("gauges") ? AFTER.availability : BEFORE.availability} color={APP.amber} label="" />
                  </Card>
                  <Card title={copy.performance}>
                    <Gauge value={PERFORMANCE} color={APP.stop} label="" />
                  </Card>
                  <Card title={copy.oee}>
                    <Gauge value={on("gauges") ? AFTER.oee : BEFORE.oee} color={APP.stop} label="" />
                  </Card>
                </div>

                <Card title={copy.timeline} className="mt-[0.5em]">
                  <div className="relative mt-[0.5em] h-[2.2em] overflow-visible rounded-[0.15em]" style={{ backgroundColor: APP.running }}>
                    {[{ from: 27, to: 142 }, { from: 189, to: 214 }].map((run) => (
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
                        className="absolute inset-y-0"
                        style={{ left: `${(s.from / SPAN) * 100}%`, width: `${((s.to - s.from) / SPAN) * 100}%`, backgroundColor: COLOR[s.reason] }}
                      />
                    ))}
                    {on("segment") && (
                      <span
                        className="assist-rise absolute inset-y-[-0.2em] rounded-[0.1em] ring-2 ring-white"
                        style={{
                          left: `${(NEW_STOP.from / SPAN) * 100}%`,
                          width: `${((NEW_STOP.to - NEW_STOP.from) / SPAN) * 100}%`,
                          backgroundColor: COLOR.coolant,
                          boxShadow: `0 0 0 0.3em ${APP.amber}55`,
                        }}
                      />
                    )}
                    {on("segment") && (
                      <div
                        className="assist-rise absolute bottom-[calc(100%+0.5em)] right-0 z-10 whitespace-nowrap rounded-[0.35em] px-[0.7em] py-[0.4em] text-white shadow-lg"
                        style={{ backgroundColor: APP.ink, animationDelay: "250ms" }}
                      >
                        <p className="text-[0.66em] font-semibold">{copy.callout}</p>
                        <p className="text-[0.66em] text-white/70">{copy.calloutFrom}</p>
                      </div>
                    )}
                  </div>
                  {/* Hour ticks where the hours fall on the span, not spread evenly. */}
                  <div className="relative mt-[0.3em] h-[1.4em] text-[0.66em] text-black/50">
                    {TICKS.map((t, i) => (
                      <span
                        key={t}
                        className={`absolute top-0 ${i ? "-translate-x-1/2" : ""}`}
                        style={{ left: `${((i * 60) / SPAN) * 100}%` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card title={copy.distribution} className="mt-[0.5em]">
                  <div className="mt-[0.4em] flex gap-[0.4em]">
                    {/* Height in the card's em, so the axis spans the bars. */}
                    <div className="flex h-[4.6em] w-[0.8em] shrink-0 flex-col justify-between text-right text-black/45 [&>span]:text-[0.66em] [&>span]:leading-none">
                      <span>2</span>
                      <span>1</span>
                      <span>0</span>
                    </div>
                    <div className="grid flex-1 grid-cols-4 gap-[0.8em] border-b border-l" style={{ borderColor: APP.line }}>
                      {bars.map((reason) => (
                        <div key={reason} className="flex h-[4.6em] items-end">
                          <div
                            className="relative flex w-full justify-center transition-[height] duration-700 ease-out motion-reduce:transition-none"
                            style={{
                              height: `${(counts[reason] / 2) * 100}%`,
                              backgroundColor: COLOR[reason],
                              boxShadow: reason === "coolant" && on("bar") ? `0 0 0 0.2em ${APP.amber}55` : "none",
                            }}
                          >
                            <span className="pt-[0.2em] text-[0.66em] font-semibold text-white tabular-nums">{counts[reason]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="ml-[1.2em] mt-[0.3em] grid grid-cols-4 gap-[0.8em] text-center [&>span]:text-[0.66em] text-black/55">
                    {bars.map((reason) => (
                      <span key={reason} className={`truncate ${reason === "coolant" && past("segment") ? "font-semibold text-black/80" : ""}`}>
                        {copy.report[reason]}
                      </span>
                    ))}
                  </div>
                </Card>
              </DesktopFrame>
            </div>
          </div>
        </ReplayScale>
      </div>
    </div>
  )
}
