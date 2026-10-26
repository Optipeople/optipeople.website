"use client"

import type { ReactNode } from "react"
import { Check, Clock3, UserRound, Wrench, X } from "lucide-react"

import type { MaintenanceDemo } from "@/content/replays/maintenance"

import { APP, ReplayScale, TabletFrame, Tap } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * The Maintenance module replay: a stop that turns into a maintenance task.
 *
 * CNC Robot stops and the panel turns red. The operator picks Critical
 * malfunction, and a critical task with the Maintenance tag appears in Tasks
 * Management, assigned to the maintenance technician role and linked to the
 * stop. The checklist is ticked off one line at a time, the task is marked
 * done, and the panel is green again with the downtime on it.
 *
 * It is code, not a video, because the stop, the task and the checklist happen
 * on a tablet and a desktop minutes apart, and the real task list carries
 * people's names. Machine, order and stop reasons are the demo account's; the
 * task window copies the columns of the real Tasks Management screen.
 */

const BEATS = [
  { id: "running", ms: 2000 },
  { id: "stopped", ms: 1300 },
  { id: "reason", ms: 1400 },
  { id: "task", ms: 2400 },
  { id: "check1", ms: 1000 },
  { id: "check2", ms: 1000 },
  { id: "check3", ms: 1000 },
  { id: "done", ms: 1400 },
  { id: "back", ms: 4200 },
] as const

type BeatId = (typeof BEATS)[number]["id"]
const CHECKS = ["check1", "check2", "check3"] as const

export function MaintenanceReplay({ copy, label }: { copy: MaintenanceDemo; label: string }) {
  const { root, on, is } = useReplay<BeatId>(BEATS, "back")

  const alert = on("stopped") && !on("back")
  const screen = on("back") ? "back" : on("task") ? "waiting" : on("stopped") ? "stops" : "running"
  const status = on("done") ? "done" : on("check1") ? "inProgress" : "open"
  const statusStyle =
    status === "done"
      ? { backgroundColor: "rgba(26,107,99,0.12)", color: APP.running }
      : status === "inProgress"
        ? { backgroundColor: "rgba(91,141,224,0.14)", color: "#2f5fae" }
        : { backgroundColor: "#fdf3dc", color: APP.brown }

  return (
    <div ref={root} role="img" aria-label={label} className="w-full max-w-[34rem] mx-auto">
      <div aria-hidden>
        <ReplayScale>
          {/* Operator panel on CNC Robot */}
          <TabletFrame alert={alert}>
            <div className="relative h-[13.5em] px-[1.1em] py-[0.9em]">
              <div className="flex items-center justify-between gap-[0.6em]">
                <div className="min-w-0">
                  <p className="truncate text-[1em] font-semibold leading-tight">{copy.machine}</p>
                  <p className="text-[0.68em] text-white/60">
                    {copy.order} · {copy.shift}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full px-[0.8em] py-[0.25em] text-[0.66em] font-medium text-white transition-colors duration-500 motion-reduce:transition-none"
                  style={{ backgroundColor: alert ? APP.stop : APP.running }}
                >
                  {alert ? copy.stopped : copy.running}
                </span>
              </div>

              {screen === "running" && (
                <StateMessage key="running" color={APP.running} icon={<Check className="h-[1.3em] w-[1.3em]" />}>
                  {copy.running}
                </StateMessage>
              )}

              {screen === "stops" && (
                <div key="stops" className="assist-rise mt-[0.6em]">
                  <p className="text-center text-[1.1em] font-semibold">{copy.stopsTitle}</p>
                  <div className="mt-[0.5em] grid grid-cols-2 gap-[0.4em]">
                    {copy.reasons.map((reason, i) => {
                      const picked = i === 2 && on("reason")
                      return (
                        <span
                          key={reason}
                          className={`relative rounded-[0.35em] py-[0.5em] text-center text-[0.68em] font-medium transition-colors duration-300 motion-reduce:transition-none ${
                            picked ? "assist-press" : ""
                          }`}
                          style={{
                            backgroundColor: picked ? "white" : APP.panelTile,
                            color: picked ? APP.ink : "rgba(255,255,255,0.88)",
                          }}
                        >
                          {reason}
                          {i === 2 && <Tap show={is("reason")} className="left-[calc(50%-0.8em)] top-[calc(50%-0.8em)]" />}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {screen === "waiting" && (
                <StateMessage key="waiting" color={APP.stop} icon={<Wrench className="h-[1.2em] w-[1.2em]" />}>
                  {copy.waiting}
                  <span className="mt-[0.3em] block text-[0.7em] font-normal text-white/70">{copy.taskSent}</span>
                </StateMessage>
              )}

              {screen === "back" && (
                <StateMessage key="back" color={APP.running} icon={<Check className="h-[1.3em] w-[1.3em]" />}>
                  {copy.backRunning}
                  <span className="mt-[0.3em] flex items-center gap-[0.35em] text-[0.7em] font-normal text-white/70">
                    <Clock3 className="h-[1em] w-[1em]" />
                    {copy.downtime}
                  </span>
                </StateMessage>
              )}
            </div>
          </TabletFrame>

          {/* Tasks Management in the web app, overlapping the panel */}
          <div className="relative z-10 -mt-[2.2em] ml-[9%] overflow-hidden rounded-[0.9em] bg-white shadow-[0_2.5em_5em_-2em_rgba(0,0,0,0.55)] ring-1 ring-black/10" style={{ color: APP.ink }}>
            <div className="flex items-center justify-between border-b bg-[#f4f4f3] px-[0.9em] py-[0.5em]" style={{ borderColor: APP.line }}>
              <span className="text-[0.72em] font-semibold">{copy.windowTitle}</span>
              <X className="h-[0.9em] w-[0.9em] text-black/45" />
            </div>
            <div className="flex gap-[0.25em] bg-[#eceeed] px-[0.9em] pt-[0.45em]">
              {copy.tabs.map((tab, i) => (
                <span
                  key={tab}
                  className="rounded-t-[0.25em] border border-b-0 px-[0.6em] py-[0.25em] text-[0.66em]"
                  style={{
                    borderColor: APP.line,
                    backgroundColor: i === 0 ? "white" : "transparent",
                    fontWeight: i === 0 ? 600 : 400,
                    boxShadow: i === 0 ? `inset 0 0.15em 0 ${APP.running}` : "none",
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="space-y-[0.45em] px-[0.9em] pb-[0.9em] pt-[0.6em]">
              {/* A task already on the list */}
              <div className="flex items-center gap-[0.8em] border-b pb-[0.4em] text-[0.66em] text-black/55" style={{ borderColor: APP.line }}>
                <span className="min-w-0 flex-1 truncate">{copy.existing.name}</span>
                <span className="shrink-0">{copy.existing.type}</span>
                <span className="shrink-0">{copy.machine}</span>
                <span className="shrink-0">{copy.existing.priority}</span>
              </div>

              {/* The new task, raised from the stop */}
              <div
                className={`rounded-[0.45em] border p-[0.65em] ${on("task") ? "assist-rise" : "invisible"}`}
                style={{ borderColor: APP.line, boxShadow: `inset 0.22em 0 0 ${APP.stop}` }}
              >
                <div className="flex items-start justify-between gap-[0.6em] pl-[0.2em]">
                  <div className="min-w-0">
                    <p className="truncate text-[0.76em] font-semibold">{copy.taskName}</p>
                    <p className="mt-[0.15em] flex flex-wrap items-center gap-x-[0.7em] gap-y-[0.1em] text-[0.66em] text-black/60">
                      <span>{copy.taskType}</span>
                      <span>{copy.target}</span>
                      <span className="font-semibold" style={{ color: APP.stop }}>
                        {copy.priority}
                      </span>
                      <span className="rounded-[0.2em] px-[0.45em] py-[0.05em] text-white" style={{ backgroundColor: APP.running }}>
                        {copy.tag}
                      </span>
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-[0.7em] py-[0.2em] text-[0.66em] font-medium transition-colors duration-300 motion-reduce:transition-none"
                    style={statusStyle}
                  >
                    {copy.status[status]}
                  </span>
                </div>

                <p className="mt-[0.4em] flex flex-wrap items-center gap-x-[0.9em] pl-[0.2em] text-[0.66em] text-black/60">
                  <span className="inline-flex items-center gap-[0.3em] rounded-full border px-[0.55em] py-[0.1em]" style={{ borderColor: APP.line }}>
                    <UserRound className="h-[1em] w-[1em]" />
                    {copy.assignedTo}
                  </span>
                  <span className="inline-flex items-center gap-[0.3em]">
                    <span className="h-[0.7em] w-[0.7em] rounded-[0.15em]" style={{ backgroundColor: APP.stop }} />
                    {copy.fromStop}
                  </span>
                </p>

                <ul className="mt-[0.5em] space-y-[0.3em] pl-[0.2em]">
                  {copy.checklist.map((item, i) => {
                    const ticked = on(CHECKS[i])
                    return (
                      <li key={item} className="flex items-center gap-[0.5em] text-[0.66em]">
                        <span
                          className={`flex h-[1.3em] w-[1.3em] shrink-0 items-center justify-center rounded-[0.25em] border transition-colors duration-300 motion-reduce:transition-none ${
                            is(CHECKS[i]) ? "assist-press" : ""
                          }`}
                          style={{
                            borderColor: ticked ? APP.running : "rgba(29,42,39,0.3)",
                            backgroundColor: ticked ? APP.running : "white",
                          }}
                        >
                          {ticked && <Check className="h-[0.9em] w-[0.9em] text-white" />}
                        </span>
                        <span className={ticked ? "text-black/50 line-through" : ""}>{item}</span>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-[0.55em] flex justify-end">
                  <span
                    className={`relative rounded-[0.3em] px-[0.9em] py-[0.35em] text-[0.68em] font-medium transition-colors duration-300 ${
                      is("done") ? "assist-press" : ""
                    }`}
                    style={{
                      backgroundColor: on("check3") && !on("back") ? APP.teal : "#ececea",
                      color: on("check3") && !on("back") ? "white" : "rgba(29,42,39,0.4)",
                    }}
                  >
                    {copy.markDone}
                    <Tap show={is("done")} className="left-[calc(50%-0.8em)] top-[calc(50%-0.8em)]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ReplayScale>
      </div>
    </div>
  )
}

function StateMessage({
  color,
  icon,
  children,
}: {
  color: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div className="assist-rise mt-[1.3em] flex items-center justify-center gap-[0.8em]">
      <span className="flex h-[2.6em] w-[2.6em] shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
        {icon}
      </span>
      <p className="text-[1.15em] font-semibold leading-tight">{children}</p>
    </div>
  )
}
