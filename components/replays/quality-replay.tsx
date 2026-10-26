"use client"

import type { ReactNode } from "react"
import { Check, ClipboardList, Minus, Plus, UserRound } from "lucide-react"

import type { QualityDemo } from "@/content/replays/quality"

import { APP, Card, DesktopFrame, Gauge, ReplayScale, TabletFrame, Tap } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * The Quality module replay: a quality problem caught while it is still cheap.
 *
 * On the operator panel at CNC Drilling the machine stops, the operator picks
 * the QA check stop reason, registers 4 scrapped parts with a cause and a short
 * note, and the panel runs again. On the report below, the QA check lands in
 * the stop events, the quality gauge for the Day shift drops from 84.5% to
 * 77.6%, and a deviation task is raised for the quality role, so the Evening
 * shift sees it when they start.
 *
 * It is code, not a video, because the real panel and report live on two
 * screens and in two logins; a recording could show one or the other, never
 * the scrap on the panel and its effect on the report at the same moment.
 * Machine, order, shifts and stop reasons are the demo account's.
 */

const BEATS = [
  { id: "running", ms: 2200 },
  { id: "stopped", ms: 1300 },
  { id: "reason", ms: 1300 },
  { id: "count", ms: 1700 },
  { id: "cause", ms: 1300 },
  { id: "note", ms: 2100 },
  { id: "saved", ms: 1500 },
  { id: "report", ms: 2600 },
  { id: "task", ms: 4400 },
] as const

type BeatId = (typeof BEATS)[number]["id"]

// Day shift so far on order B01-S60, before and after the 4 scrapped parts.
const PRODUCED = 58
const REJECTED = 9
const SCRAP = 4
const quality = (rejected: number) => ((PRODUCED - rejected) / PRODUCED) * 100

export function QualityReplay({ copy, label }: { copy: QualityDemo; label: string }) {
  const { root, on, is, past, still, typing, typed } = useReplay<BeatId>(BEATS, "task", { count: "····", note: copy.note })

  const alert = on("stopped") && !on("saved")
  const screen = on("saved") ? "run" : on("count") ? "scrap" : on("stopped") ? "stops" : "run"
  const rejected = on("saved") ? REJECTED + SCRAP : REJECTED
  // The stepper counts up through the count beat, one press per step.
  const count = is("count") && !still ? Math.max(1, typed) : SCRAP
  const note = is("note") ? typing.slice(0, typed) : past("note") || still ? copy.note : ""
  const noteDone = past("note") || (is("note") && typed >= copy.note.length)

  return (
    <div ref={root} role="img" aria-label={label} className="w-full max-w-[34rem] mx-auto">
      <div aria-hidden>
        <ReplayScale>
          {/* Operator panel at the machine */}
          <TabletFrame alert={alert}>
            <div className="relative h-[16em] px-[1.1em] py-[0.9em]">
              <PanelHeader copy={copy} stopped={alert} />

              {screen === "run" && (
                <div key="run" className="assist-rise mt-[1em]">
                  <div className="grid grid-cols-3 gap-[0.6em]">
                    <Stat label={copy.produced} value={String(PRODUCED)} />
                    <Stat label={copy.rejected} value={String(rejected)} warn={on("saved")} />
                    <Stat label={copy.quality} value={`${quality(rejected).toFixed(1)}%`} warn={on("saved")} />
                  </div>
                  {on("saved") && (
                    <p className="assist-rise mt-[0.9em] flex items-center gap-[0.5em] rounded-[0.4em] bg-white/10 px-[0.8em] py-[0.55em] text-[0.72em]">
                      <Check className="h-[1.1em] w-[1.1em] shrink-0" style={{ color: "#7fd1b9" }} />
                      {copy.saved}
                    </p>
                  )}
                </div>
              )}

              {screen === "stops" && (
                <div key="stops" className="assist-rise mt-[0.8em]">
                  <p className="text-center text-[1.15em] font-semibold">{copy.stopsTitle}</p>
                  <div className="mt-[0.6em] grid grid-cols-2 gap-[0.45em]">
                    {copy.reasons.map((reason, i) => {
                      const picked = i === 1 && on("reason")
                      return (
                        <span
                          key={reason}
                          className={`relative rounded-[0.35em] py-[0.55em] text-center text-[0.72em] font-medium transition-colors duration-300 motion-reduce:transition-none ${
                            picked ? "assist-press" : ""
                          }`}
                          style={{
                            backgroundColor: picked ? "white" : APP.panelTile,
                            color: picked ? APP.ink : "rgba(255,255,255,0.88)",
                          }}
                        >
                          {reason}
                          {i === 1 && <Tap show={is("reason")} className="left-[calc(50%-0.8em)] top-[calc(50%-0.8em)]" />}
                        </span>
                      )
                    })}
                  </div>
                  <span
                    className="mx-auto mt-[0.7em] block w-[45%] rounded-[0.35em] py-[0.45em] text-center text-[0.68em] font-medium transition-colors duration-300"
                    style={{
                      backgroundColor: on("reason") ? APP.running : APP.panelTile,
                      color: on("reason") ? "white" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {copy.select}
                  </span>
                </div>
              )}

              {screen === "scrap" && (
                <div key="scrap" className="assist-rise mt-[0.7em]">
                  <p className="text-[0.95em] font-semibold">{copy.scrapTitle}</p>
                  <div className="mt-[0.55em] flex items-center justify-between">
                    <span className="text-[0.68em] text-white/70">{copy.scrapUnits}</span>
                    <span className="flex items-center gap-[0.5em]">
                      <StepButton>
                        <Minus className="h-[0.9em] w-[0.9em]" />
                      </StepButton>
                      <span className="w-[1.6em] text-center text-[1.3em] font-semibold tabular-nums">{count}</span>
                      <span className="relative">
                        <StepButton key={count} pressed={is("count") && !still}>
                          <Plus className="h-[0.9em] w-[0.9em]" />
                        </StepButton>
                        <Tap show={is("count")} className="left-[calc(50%-0.8em)] top-[calc(50%-0.8em)]" />
                      </span>
                    </span>
                  </div>
                  <p className="mt-[0.5em] text-[0.68em] uppercase tracking-[0.1em] text-white/55">{copy.causeLabel}</p>
                  <div className="mt-[0.3em] flex flex-wrap gap-[0.35em]">
                    {copy.causes.map((cause, i) => {
                      const picked = i === 0 && on("cause")
                      return (
                        <span
                          key={cause}
                          className="relative rounded-full px-[0.8em] py-[0.3em] text-[0.66em] transition-colors duration-300 motion-reduce:transition-none"
                          style={{
                            backgroundColor: picked ? "white" : APP.panelTile,
                            color: picked ? APP.ink : "rgba(255,255,255,0.85)",
                          }}
                        >
                          {cause}
                          {i === 0 && <Tap show={is("cause")} className="left-[calc(50%-0.8em)] top-[calc(50%-0.8em)]" />}
                        </span>
                      )
                    })}
                  </div>
                  <div className="mt-[0.55em] flex items-center gap-[0.5em]">
                    <span
                      className="min-h-[2.2em] flex-1 rounded-[0.35em] border px-[0.6em] py-[0.4em] text-[0.66em] leading-snug transition-colors"
                      style={{ borderColor: is("note") ? "#7fd1b9" : "rgba(255,255,255,0.15)", backgroundColor: "rgba(0,0,0,0.18)" }}
                    >
                      {note ? note : <span className="text-white/40">{copy.notePlaceholder}</span>}
                      {is("note") && !noteDone && (
                        <span className="assist-caret ml-px inline-block h-[1em] w-px translate-y-[0.15em] bg-white" />
                      )}
                    </span>
                    <span
                      className={`rounded-[0.35em] px-[0.9em] py-[0.55em] text-[0.68em] font-medium transition-colors duration-300 ${
                        noteDone ? "assist-press" : ""
                      }`}
                      style={{
                        backgroundColor: noteDone ? APP.running : APP.panelTile,
                        color: noteDone ? "white" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {copy.register}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </TabletFrame>

          {/* The report in the web app, overlapping the panel */}
          <div className="relative z-10 -mt-[2.2em] ml-[9%]">
            <DesktopFrame tabs={copy.reportTabs} active={0}>
              <div className="grid grid-cols-[10em_1fr] gap-[0.6em]">
                <Card title={copy.qualityGauge}>
                  <div className="mt-[0.4em]">
                    <Gauge
                      value={on("report") ? quality(REJECTED + SCRAP) : quality(REJECTED)}
                      color={on("report") ? APP.amber : APP.running}
                      label={`${copy.machine} · ${copy.order}`}
                    />
                  </div>
                </Card>
                <Card title={copy.stopEvents}>
                  <ul className="mt-[0.45em] space-y-[0.35em] text-[0.68em]">
                    <StopRow stop={copy.earlierStop} color={APP.purple} />
                    <li className={on("report") ? "assist-rise" : "invisible"}>
                      <StopRowInner stop={copy.qaStop} color={APP.stop} fresh={is("report")} />
                    </li>
                  </ul>
                </Card>
              </div>

              {/* Deviation task, raised from the scrap and waiting for the next shift */}
              <div
                className={`mt-[0.6em] flex items-start gap-[0.6em] rounded-[0.4em] border bg-white p-[0.6em] ${
                  on("task") ? "assist-rise" : "invisible"
                }`}
                style={{ borderColor: APP.line, boxShadow: `inset 0.22em 0 0 ${APP.amber}` }}
              >
                <span
                  className="ml-[0.2em] flex h-[1.9em] w-[1.9em] shrink-0 items-center justify-center rounded-[0.35em]"
                  style={{ backgroundColor: "#fdf3dc", color: APP.brown }}
                >
                  <ClipboardList className="h-[1.1em] w-[1.1em]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.66em] font-semibold uppercase tracking-[0.1em]" style={{ color: APP.brown }}>
                    {copy.taskType}
                  </p>
                  <p className="truncate text-[0.72em] font-medium">{copy.taskTitle}</p>
                  <p className="mt-[0.2em] flex flex-wrap items-center gap-x-[0.8em] gap-y-[0.1em] text-[0.66em] text-black/60">
                    <span className="inline-flex items-center gap-[0.3em]">
                      <UserRound className="h-[1em] w-[1em]" />
                      {copy.assignedTo}
                    </span>
                    <span>{copy.nextShift}</span>
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full px-[0.7em] py-[0.2em] text-[0.66em] font-medium"
                  style={{ backgroundColor: "#fdf3dc", color: APP.brown }}
                >
                  {copy.open}
                </span>
              </div>
            </DesktopFrame>
          </div>
        </ReplayScale>
      </div>
    </div>
  )
}

function PanelHeader({ copy, stopped }: { copy: QualityDemo; stopped: boolean }) {
  return (
    <div className="flex items-center justify-between gap-[0.6em]">
      <div className="min-w-0">
        <p className="truncate text-[1em] font-semibold leading-tight">{copy.machine}</p>
        <p className="text-[0.68em] text-white/60">
          {copy.order} · {copy.shift}
        </p>
      </div>
      <span
        className="shrink-0 rounded-full px-[0.8em] py-[0.25em] text-[0.66em] font-medium text-white transition-colors duration-500 motion-reduce:transition-none"
        style={{ backgroundColor: stopped ? APP.stop : APP.running }}
      >
        {stopped ? copy.stopped : copy.running}
      </span>
    </div>
  )
}

function Stat({ label, value, warn = false }: { label: string; value: string; warn?: boolean }) {
  return (
    <div
      className="rounded-[0.45em] px-[0.7em] py-[0.6em] transition-colors duration-500 motion-reduce:transition-none"
      style={{ backgroundColor: warn ? "rgba(242,184,75,0.18)" : APP.panelTile }}
    >
      <p className="text-[0.66em] text-white/65">{label}</p>
      <p className="text-[1.5em] font-semibold tabular-nums leading-tight" style={{ color: warn ? APP.amber : "white" }}>
        {value}
      </p>
    </div>
  )
}

function StepButton({ children, pressed = false }: { children: ReactNode; pressed?: boolean }) {
  return (
    <span
      className={`flex h-[1.9em] w-[1.9em] items-center justify-center rounded-[0.35em] ${pressed ? "assist-press" : ""}`}
      style={{ backgroundColor: APP.panelTile }}
    >
      {children}
    </span>
  )
}

type Stop = { time: string; reason: string; category: string }

function StopRow({ stop, color }: { stop: Stop; color: string }) {
  return (
    <li>
      <StopRowInner stop={stop} color={color} />
    </li>
  )
}

function StopRowInner({ stop, color, fresh = false }: { stop: Stop; color: string; fresh?: boolean }) {
  return (
    <span
      className="flex items-center gap-[0.5em] rounded-[0.3em] px-[0.3em] py-[0.15em] transition-colors duration-700"
      style={{ backgroundColor: fresh ? "#fdf3dc" : "transparent" }}
    >
      <span className="h-[0.8em] w-[0.8em] shrink-0 rounded-[0.15em]" style={{ backgroundColor: color }} />
      <span className="tabular-nums text-black/55">{stop.time}</span>
      <span className="truncate font-medium">{stop.reason}</span>
      <span className="ml-auto shrink-0 text-black/50">{stop.category}</span>
    </span>
  )
}
