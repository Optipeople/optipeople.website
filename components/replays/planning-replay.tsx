"use client"

import type { CSSProperties, ReactNode } from "react"

import type { PlanningDemo } from "@/content/replays/planning"

import { APP, DesktopFrame, ReplayScale, Tap } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * A scripted replay of the Planning module, for the planning hero.
 *
 * The page claims the plan covers a whole route and stays tied to the floor.
 * A screen recording would show a drag, but not why it matters, and the real
 * board is far too wide for a hero. So this redraws the production timeline
 * (from Work-Order-Management-Planning-Desktop) for one route through the four
 * demo machines: a rush order drops into the backlog, gets dragged onto CNC
 * Robot, the orders after it move along the route, the planned end moves, and
 * the running order fills as its parts are counted.
 *
 * The timeline only runs while the replay is on screen. With reduced motion
 * it sits on the replanned board.
 */

const BEATS = [
  { id: "board", ms: 1800 },
  { id: "arrive", ms: 1700 },
  { id: "lift", ms: 900 },
  { id: "drag", ms: 1300 },
  { id: "drop", ms: 1900 },
  { id: "progress", ms: 5200 },
  { id: "hold", ms: 2600 },
] as const

// Parts counted on the running order: the progress beat "types" one
// character per part, from the 54 the demo account had on it.
const QTY = 120
const START = 54
const END = 84
const COUNT = "x".repeat(END - START)

// Board geometry, in em at the replay's base size.
const LABEL = 7.6
const ROW = 2.3
const BAND = 1.4
const NOW = 34

type Status = "planned" | "inProgress" | "completed"
type Bar = { order: string; from: number; to: number; status: Status; shift?: number }

/** Bars per machine, in percent of the five-day track. `shift` is how far a
 *  bar moves right when the rush order goes in ahead of it. */
const ROUTE: Bar[][] = [
  [
    { order: "B01-S65", from: 3, to: 17, status: "completed" },
    { order: "B01-S63", from: 22, to: 42, status: "planned" },
    { order: "B01-S64", from: 46, to: 60, status: "planned" },
  ],
  [
    { order: "B01-S65", from: 18, to: 42, status: "inProgress" },
    { order: "B01-S63", from: 52, to: 70, status: "planned", shift: 14 },
    { order: "B01-S64", from: 72, to: 86, status: "planned", shift: 14 },
  ],
  [
    { order: "B01-S65", from: 43, to: 56, status: "planned" },
    { order: "B01-S63", from: 72, to: 84, status: "planned", shift: 14 },
  ],
  [
    { order: "B01-S58", from: 0, to: 15, status: "completed" },
    { order: "B01-S65", from: 56, to: 70, status: "planned" },
  ],
]

// The rush order: where it lands in the backlog, and where it goes on CNC Robot.
const RUSH = { order: "B01-S62", width: 22, backlogAt: 3, robotAt: 43 }

const BAR: Record<Status, CSSProperties> = {
  planned: { backgroundColor: "#e9f3fb", borderColor: "#2a7fc0", color: "#1f6aa3" },
  inProgress: { backgroundColor: "#f8e5cf", borderColor: "#e48a2c", color: "#93470f" },
  completed: { backgroundColor: APP.tealDark, borderColor: APP.tealDark, color: "white" },
}

/** Left offset of a point on the track, past the label column. */
const x = (pct: number) => `calc(${LABEL}em + (100% - ${LABEL}em) * ${pct / 100})`
const w = (pct: number) => `calc((100% - ${LABEL}em) * ${pct / 100})`

export function PlanningReplay({ copy, label }: { copy: PlanningDemo; label: string }) {
  const { root, ...r } = useReplay(BEATS, "hold", { progress: COUNT })
  const { is, on } = r

  const placed = on("drag")
  const shifted = on("drop")
  const produced = on("hold") ? END : is("progress") ? START + r.typed : START

  // Rows top to bottom: backlog, route band, then one row per machine.
  const machineTop = (i: number) => ROW + BAND + i * ROW
  const rushTop = (placed ? machineTop(1) : 0) + 0.3

  return (
    <div ref={root} role="img" aria-label={label} className="mx-auto w-full max-w-[34rem]">
      <div aria-hidden>
        <ReplayScale>
          <DesktopFrame tabs={copy.tabs} active={1}>
            <div className="flex items-center justify-between gap-[1em] pb-[0.6em]">
              <span className="text-[0.9em] font-semibold uppercase tracking-tight" style={{ color: APP.teal }}>
                {copy.title}
              </span>
              <span
                className={`inline-flex items-baseline gap-[0.5em] rounded-[0.3em] border px-[0.6em] py-[0.25em] transition-colors duration-500 motion-reduce:transition-none ${
                  is("drop") ? "assist-press" : ""
                }`}
                style={
                  shifted
                    ? { borderColor: "#eac58a", backgroundColor: "#fcefd9" }
                    : { borderColor: APP.line, backgroundColor: "white" }
                }
              >
                <span className="text-[0.66em] uppercase tracking-[0.1em] opacity-70">{copy.planEnd}</span>
                <span key={shifted ? "after" : "before"} className="assist-rise text-[0.7em] font-semibold tabular-nums">
                  {shifted ? copy.endAfter : copy.endBefore}
                </span>
              </span>
            </div>

            <div className="overflow-hidden rounded-[0.3em] border" style={{ borderColor: APP.line }}>
              {/* Day header */}
              <div className="flex border-b" style={{ borderColor: APP.line, backgroundColor: "#f3f6f5" }}>
                <span
                  className="flex shrink-0 items-center px-[0.6em] text-[0.66em] font-semibold uppercase tracking-[0.06em]"
                  style={{ width: `${LABEL / 0.66}em` }}
                >
                  {copy.routeCol}
                </span>
                <div className="grid flex-1 grid-cols-5 border-l" style={{ borderColor: APP.line }}>
                  {copy.days.map((d) => (
                    <span key={d.date} className="flex flex-col items-center py-[0.35em] leading-tight">
                      <span className="text-[0.66em] font-semibold">{d.day}</span>
                      <span className="text-[0.66em] opacity-60">{d.date}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                {/* Day grid and the now line behind everything */}
                <div className="pointer-events-none absolute inset-y-0 right-0 grid grid-cols-5" style={{ left: `${LABEL}em` }}>
                  {copy.days.map((d) => (
                    <span key={d.date} className="border-l" style={{ borderColor: "rgba(29,42,39,0.08)" }} />
                  ))}
                </div>

                {/* Backlog */}
                <Lane name={copy.backlog} muted>
                  {(is("lift") || is("drag")) && (
                    <span
                      className="absolute inset-y-[0.3em] rounded-[0.2em] border border-dashed"
                      style={{ left: `${RUSH.backlogAt}%`, width: `${RUSH.width}%`, borderColor: "rgba(29,42,39,0.25)" }}
                    />
                  )}
                </Lane>

                {/* Route band */}
                <div
                  className="flex items-center px-[0.6em] text-[0.66em] font-semibold uppercase tracking-[0.08em] text-white"
                  style={{ height: `${BAND / 0.66}em`, backgroundColor: "#22312e" }}
                >
                  {copy.route}
                </div>

                {copy.machines.map((m, i) => (
                  <Lane key={m} name={m}>
                    {i === 1 && (is("lift") || is("drag")) && (
                      <span
                        className="absolute inset-y-[0.3em] rounded-[0.2em] border-2 border-dashed"
                        style={{ left: `${RUSH.robotAt}%`, width: `${RUSH.width}%`, borderColor: "#e48a2c" }}
                      />
                    )}
                    {ROUTE[i].map((bar) => {
                      const move = shifted ? (bar.shift ?? 0) : 0
                      const running = bar.status === "inProgress"
                      return (
                        <BarBox
                          key={bar.order}
                          order={bar.order}
                          product={copy.products[bar.order]}
                          status={bar.status}
                          style={{
                            left: `${bar.from + move}%`,
                            width: `${bar.to - bar.from}%`,
                            transition: "left 900ms cubic-bezier(.3,.7,.2,1)",
                          }}
                          fill={running ? produced / QTY : undefined}
                          count={running ? `${produced}/${QTY}` : undefined}
                        />
                      )
                    })}
                  </Lane>
                ))}

                {/* Now */}
                <span
                  className="pointer-events-none absolute bottom-0 z-10 w-[0.12em]"
                  style={{ left: x(NOW), top: `${ROW + BAND}em`, backgroundColor: "#2a7fc0" }}
                />

                {/* The rush order: lands in the backlog, then dragged to CNC Robot */}
                {on("arrive") && (
                  <div
                    className="absolute z-20 motion-reduce:transition-none"
                    style={{
                      top: `${rushTop}em`,
                      height: `${ROW - 0.6}em`,
                      left: x(placed ? RUSH.robotAt : RUSH.backlogAt),
                      width: w(RUSH.width),
                      transition: "top 1000ms cubic-bezier(.3,.7,.2,1), left 1000ms cubic-bezier(.3,.7,.2,1)",
                    }}
                  >
                    <div
                      className={`assist-rise relative h-full transition-transform duration-300 motion-reduce:transition-none ${
                        is("lift") || is("drag") ? "scale-[1.06] shadow-[0_0.6em_1.2em_-0.4em_rgba(0,0,0,0.45)]" : ""
                      }`}
                    >
                      <BarBox
                        order={RUSH.order}
                        product={copy.products[RUSH.order]}
                        status="planned"
                        style={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        flash={is("arrive")}
                      />
                      <Tap show={is("lift")} className="left-[45%] top-[0.1em]" />
                      {is("drag") && (
                        <span className="absolute left-[45%] top-[0.1em] h-[1.6em] w-[1.6em] rounded-full border-2 border-white/90 bg-white/30 shadow-[0_0_0_0.3em_rgba(60,207,90,0.35)]" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-[0.6em] flex flex-wrap items-center gap-x-[0.9em] gap-y-[0.2em]">
              {(["planned", "inProgress", "completed"] as const).map((s) => (
                <span key={s} className="inline-flex items-center gap-[0.35em] text-[0.66em]">
                  <span className="h-[0.9em] w-[1.3em] rounded-[0.15em] border-l-[0.25em]" style={BAR[s]} />
                  {copy.legend[s]}
                </span>
              ))}
              <span className="ml-auto text-[0.66em] italic opacity-60">{copy.hint}</span>
            </div>
          </DesktopFrame>
        </ReplayScale>
      </div>
    </div>
  )
}

function Lane({ name, muted = false, children }: { name: string; muted?: boolean; children?: ReactNode }) {
  return (
    <div className="flex border-b" style={{ height: `${ROW}em`, borderColor: APP.line }}>
      <span
        className={`flex shrink-0 items-center border-r px-[0.6em] text-[0.68em] font-semibold ${muted ? "italic opacity-60" : ""}`}
        style={{ width: `${LABEL / 0.68}em`, borderColor: APP.line }}
      >
        {name}
      </span>
      <div className="relative flex-1">{children}</div>
    </div>
  )
}

function BarBox({
  order,
  product,
  status,
  style,
  fill,
  count,
  flash = false,
}: {
  order: string
  product: string
  status: Status
  style: CSSProperties
  fill?: number
  count?: string
  flash?: boolean
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[0.2em] border-l-[0.25em] motion-reduce:!transition-none ${
        flash ? "ring-2 ring-[#2a7fc0]/60" : ""
      }`}
      style={{ top: "0.3em", bottom: "0.3em", ...BAR[status], ...style }}
    >
      {fill !== undefined && (
        <span
          className="absolute inset-y-0 left-0 transition-[width] duration-200 ease-linear motion-reduce:transition-none"
          style={{ width: `${fill * 100}%`, backgroundColor: "rgba(228,138,44,0.28)" }}
        />
      )}
      <span className="relative flex h-full flex-col justify-center px-[0.4em] leading-tight">
        <span className="flex items-baseline justify-between gap-[0.3em]">
          <span className="truncate text-[0.66em] font-bold tabular-nums">{order}</span>
          {count && <span className="shrink-0 text-[0.66em] font-semibold tabular-nums">{count}</span>}
        </span>
        <span className="truncate text-[0.66em] opacity-80">{product}</span>
      </span>
    </div>
  )
}
