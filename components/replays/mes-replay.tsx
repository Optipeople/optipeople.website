"use client"

import { Check, X } from "lucide-react"

import type { MesDemo } from "@/content/replays/mes"

import { APP, ReplayScale, TabletFrame, Tap } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * The Modular MES hero: one order, start to finish, on the operator panel.
 *
 * The operator picks order B01-S60 from the list and starts it. The part
 * counter climbs against the target of 60 with the cycle time and the rejects
 * beside it, the progress bar fills, the order completes, and the next order
 * is queued and ready to start.
 *
 * It is code, not a video, because a real order takes a couple of hours to
 * run. The pace is the real one, compressed: B01-S60 on CNC Drilling in the
 * demo account makes a part about every 2 minutes 15 seconds, and close to one
 * in five is rejected.
 */

const BEATS = [
  { id: "list", ms: 1800 },
  { id: "pick", ms: 1000 },
  { id: "start", ms: 1100 },
  { id: "run", ms: 7000 },
  { id: "done", ms: 1700 },
  { id: "next", ms: 3400 },
] as const

const TARGET = 60
// The counter rides the typing clock: one "character" per part during `run`.
const TYPING = { run: "|".repeat(TARGET) }
const REJECT_RATE = 0.18
const CYCLES = ["2:15", "2:11", "2:19", "2:14"]

export function MesReplay({ copy, label }: { copy: MesDemo; label: string }) {
  const { root, ...r } = useReplay(BEATS, "next", TYPING)
  const { is, on, past } = r

  const running = on("run")
  const count = past("run") ? TARGET : is("run") ? r.typed : 0
  const rejected = Math.round(count * REJECT_RATE)
  const order = copy.orders[0]
  const nextOrder = copy.orders[1]
  const complete = on("done")

  return (
    <div ref={root} role="img" aria-label={label} className="mx-auto w-full max-w-[34rem]">
      <div aria-hidden>
        <ReplayScale>
          <div className="px-[1.6em]">
            <TabletFrame>
              <div className="relative h-[22em]">
                {/* Order list */}
                <div
                  className={`absolute inset-0 flex flex-col items-center px-[1.6em] pt-[1em] transition-opacity duration-300 motion-reduce:transition-none ${
                    running ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="absolute left-[1em] top-[1em] flex h-[1.5em] w-[1.5em] items-center justify-center rounded-full bg-white text-[#141a19]">
                    <X className="h-[0.9em] w-[0.9em]" strokeWidth={3} aria-hidden />
                  </span>
                  <p className="text-[0.66em] font-semibold text-white/70">
                    {copy.machine} · {copy.stamp}
                  </p>
                  <p className="text-[1.8em] font-bold leading-tight">{copy.ordersTitle}</p>
                  <div className="mt-[0.7em] w-full space-y-[0.45em]">
                    {copy.orders.map((o, i) => {
                      const picked = i === 0 && on("pick")
                      return (
                        <div
                          key={o.id}
                          className={`flex items-center justify-between rounded-[0.45em] px-[0.9em] py-[0.5em] transition-colors duration-200 ${
                            picked && is("pick") ? "assist-press" : ""
                          }`}
                          style={picked ? { backgroundColor: "white", color: APP.panel } : { backgroundColor: APP.panelTile }}
                        >
                          <span>
                            <span className="block text-[0.8em] font-bold">{o.id}</span>
                            <span className="block text-[0.66em] opacity-70">{o.item}</span>
                          </span>
                          <span className="text-[0.72em] font-semibold tabular-nums">
                            {o.qty} {copy.pcs}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="relative mt-[0.9em]">
                    <span
                      className={`inline-flex min-w-[9em] justify-center rounded-[0.4em] px-[1em] py-[0.5em] text-[0.75em] font-semibold transition-colors duration-200 ${
                        is("start") ? "assist-press" : ""
                      }`}
                      style={
                        on("pick")
                          ? { backgroundColor: APP.running, color: "white" }
                          : { backgroundColor: APP.panelTile, color: "rgba(255,255,255,0.3)" }
                      }
                    >
                      {copy.start}
                    </span>
                    <Tap show={is("start")} className="left-1/2 top-[0.1em] -translate-x-1/2" />
                  </div>
                  <Tap show={is("pick")} className="left-[45%] top-[5.4em]" />
                </div>

                {/* The running order */}
                <div
                  className={`absolute inset-0 flex flex-col px-[1.6em] pt-[1.1em] transition-opacity duration-300 motion-reduce:transition-none ${
                    running ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[0.95em] font-semibold">{copy.machine}</p>
                    <span
                      className="inline-flex items-center gap-[0.35em] rounded-[0.3em] px-[0.6em] py-[0.2em] text-[0.68em] font-semibold transition-colors duration-300"
                      style={complete ? { backgroundColor: "white", color: APP.panel } : { backgroundColor: APP.running, color: "white" }}
                    >
                      {complete && <Check className="h-[1em] w-[1em]" strokeWidth={3} aria-hidden />}
                      {complete ? copy.complete : copy.running}
                    </span>
                  </div>
                  <p className="mt-[0.7em] text-[0.68em] uppercase tracking-[0.12em] text-white/55">{copy.orderLabel}</p>
                  <p className="text-[1.05em] font-bold leading-tight">
                    {order.id} <span className="text-[0.7em] font-semibold text-white/60">{order.item}</span>
                  </p>

                  <div className="mt-[0.6em] flex items-end justify-between">
                    <div>
                      <p className="text-[0.68em] text-white/60">{copy.produced}</p>
                      <p className="text-[2.6em] font-bold leading-none tabular-nums">
                        {count}
                        <span className="text-[0.45em] font-semibold text-white/55"> / {TARGET}</span>
                      </p>
                    </div>
                    <div className="flex gap-[1.2em] text-right">
                      <div>
                        <p className="text-[0.68em] text-white/60">{copy.cycle}</p>
                        <p className="text-[1.05em] font-semibold tabular-nums">{CYCLES[count % CYCLES.length]}</p>
                      </div>
                      <div>
                        <p className="text-[0.68em] text-white/60">{copy.rejected}</p>
                        <p className="text-[1.05em] font-semibold tabular-nums" style={{ color: rejected ? "#f3a3a5" : undefined }}>
                          {rejected}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[0.7em] h-[0.7em] overflow-hidden rounded-full" style={{ backgroundColor: APP.panelTile }}>
                    <div
                      className="h-full rounded-full transition-[width] duration-200 ease-linear motion-reduce:transition-none"
                      style={{ width: `${(count / TARGET) * 100}%`, backgroundColor: complete ? "#7fd1a0" : APP.running }}
                    />
                  </div>
                  <div className="mt-[0.25em] flex justify-between text-[0.66em] text-white/50">
                    <span>0</span>
                    <span>
                      {copy.target} {TARGET} {copy.pcs}
                    </span>
                  </div>

                  {/* The next order, queued once this one is done. */}
                  <div className="mt-auto pb-[1em]">
                    {on("next") && (
                      <div
                        className="assist-rise flex items-center justify-between rounded-[0.45em] px-[0.9em] py-[0.5em]"
                        style={{ backgroundColor: APP.panelTile }}
                      >
                        <span>
                          <span className="block text-[0.66em] uppercase tracking-[0.12em] text-white/55">{copy.next}</span>
                          <span className="block text-[0.8em] font-bold">
                            {nextOrder.id} <span className="text-[0.85em] font-semibold text-white/60">{nextOrder.item}</span>
                          </span>
                        </span>
                        <span className="flex items-center gap-[0.6em]">
                          <span className="text-[0.72em] font-semibold tabular-nums">
                            {nextOrder.qty} {copy.pcs}
                          </span>
                          <span className="rounded-[0.3em] border border-white/25 px-[0.5em] py-[0.15em] text-[0.66em] font-semibold uppercase tracking-[0.1em] text-white/80">
                            {copy.queued}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabletFrame>
          </div>
        </ReplayScale>
      </div>
    </div>
  )
}
