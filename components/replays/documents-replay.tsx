"use client"

import type { ReactNode } from "react"
import { AlertOctagon, BadgeCheck, Check, ChevronRight, FileText, PencilRuler, Recycle, RefreshCw } from "lucide-react"

import type { DocumentsDemo } from "@/content/replays/documents"

import { APP, ReplayScale, TabletFrame, Tap } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * The Documents module replay: the right document at the machine.
 *
 * On the operator panel at CNC Drilling the operator taps Documents and gets
 * only the set for the order being run, B01-S60. The work instruction opens,
 * the operator pages to the setup step, and while it is open revision 5 is
 * approved: it replaces revision 4 on the panel at once, with the changed
 * drill depth marked. The operator confirms it as read, and that is logged on
 * the order.
 *
 * It is code, not a video, because the moment that matters (a revision landing
 * on the floor while someone is reading the old one) cannot be staged reliably
 * in a recording. Machine and order are the demo account's; the document names
 * match DocumentsVisual in components/module-mockups.tsx.
 */

const BEATS = [
  { id: "home", ms: 1800 },
  { id: "tapDocs", ms: 700 },
  { id: "list", ms: 1300 },
  { id: "pick", ms: 1400 },
  { id: "step2", ms: 1400 },
  { id: "setup", ms: 1900 },
  { id: "revised", ms: 2700 },
  { id: "confirm", ms: 1100 },
  { id: "confirmed", ms: 3800 },
] as const

type BeatId = (typeof BEATS)[number]["id"]

const DEPTH_OLD = "24 mm"
const DEPTH_NEW = "22 mm"

export function DocumentsReplay({ copy, label }: { copy: DocumentsDemo; label: string }) {
  const { root, on, is, b } = useReplay<BeatId>(BEATS, "confirmed")

  const step = on("setup") ? 2 : on("step2") ? 1 : 0
  const revised = on("revised")
  const rev = revised ? "Rev 5" : "Rev 4"
  const stepLabel = copy.stepOf.replace("{n}", String(step + 1)).replace("{total}", String(copy.steps.length))

  const docs = [
    { name: copy.docs.instruction, rev, icon: FileText, tone: "#8fb6ff", fresh: revised },
    { name: copy.docs.drawing, rev: "Rev 12", icon: PencilRuler, tone: "#c3a6ff" },
    { name: copy.docs.setup, rev: "Rev 4", icon: FileText, tone: "#8fb6ff" },
    { name: copy.docs.certificate, rev: "7741", icon: BadgeCheck, tone: "#7fd1b9" },
  ]

  return (
    <div ref={root} role="img" aria-label={label} className="w-full max-w-[34rem] mx-auto">
      <div aria-hidden>
        <ReplayScale>
          <TabletFrame>
            <div className="relative h-[25em] px-[1.1em] py-[0.9em]">
              {/* Machine, order and state, always on top of the panel */}
              <div className="flex items-center justify-between gap-[0.6em]">
                <div className="min-w-0">
                  <p className="truncate text-[1em] font-semibold leading-tight">{copy.machine}</p>
                  <p className="text-[0.68em] text-white/60">
                    {copy.order} · {copy.shift}
                  </p>
                </div>
                <span className="shrink-0 rounded-full px-[0.8em] py-[0.25em] text-[0.66em] font-medium text-white" style={{ backgroundColor: APP.running }}>
                  {copy.running}
                </span>
              </div>

              {!on("list") ? (
                <div key="home" className="assist-rise mt-[2.2em] text-center">
                  <p className="text-[0.7em] text-white/60">{copy.produced}</p>
                  <p className="text-[3.4em] font-semibold tabular-nums leading-none">58</p>
                  <div className="mx-auto mt-[2em] grid max-w-[26em] grid-cols-3 gap-[0.6em]">
                    <PanelButton icon={<AlertOctagon className="h-[1.3em] w-[1.3em]" />}>{copy.buttons.stops}</PanelButton>
                    <PanelButton icon={<Recycle className="h-[1.3em] w-[1.3em]" />}>{copy.buttons.scrap}</PanelButton>
                    <PanelButton icon={<FileText className="h-[1.3em] w-[1.3em]" />} pressed={is("tapDocs")}>
                      {copy.buttons.documents}
                      <Tap show={is("tapDocs")} className="left-[calc(50%-0.8em)] top-[calc(50%-0.8em)]" />
                    </PanelButton>
                  </div>
                </div>
              ) : (
                <div key="docs" className="assist-rise mt-[0.9em] grid h-[21em] grid-cols-[11.5em_1fr] gap-[0.7em]">
                  {/* Only the documents for the order on the machine */}
                  <div>
                    <p className="text-[0.68em] uppercase tracking-[0.1em] text-white/55">{copy.listTitle}</p>
                    <ul className="mt-[0.45em] space-y-[0.35em]">
                      {docs.map((doc, i) => {
                        const Icon = doc.icon
                        const picked = i === 0 && on("pick")
                        return (
                          <li
                            key={doc.name}
                            className={`relative flex items-center gap-[0.5em] rounded-[0.4em] px-[0.5em] py-[0.45em] transition-colors duration-300 motion-reduce:transition-none ${
                              is("pick") && i === 0 ? "assist-press" : ""
                            }`}
                            style={{
                              backgroundColor: picked ? "rgba(255,255,255,0.16)" : APP.panelTile,
                              boxShadow: picked ? "inset 0 0 0 1px rgba(255,255,255,0.45)" : "none",
                            }}
                          >
                            <Icon className="h-[1.1em] w-[1.1em] shrink-0" style={{ color: doc.tone }} />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[0.66em] font-medium">{doc.name}</span>
                              <span className="block text-[0.66em] text-white/60">{doc.rev}</span>
                            </span>
                            {doc.fresh && (
                              <span className="assist-rise shrink-0 rounded-full px-[0.5em] py-[0.05em] text-[0.66em] font-semibold" style={{ backgroundColor: APP.amber, color: APP.ink }}>
                                {copy.newBadge}
                              </span>
                            )}
                            {i === 0 && <Tap show={is("pick")} className="left-[calc(50%-0.8em)] top-[calc(50%-0.8em)]" />}
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* The document viewer */}
                  <div className="relative flex flex-col overflow-hidden rounded-[0.5em] bg-white p-[0.8em]" style={{ color: APP.ink }}>
                    {!on("pick") ? (
                      <p className="m-auto text-[0.7em] text-black/45">{copy.choose}</p>
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-[0.5em]">
                          <p className="truncate text-[0.74em] font-semibold">{copy.docs.instruction}</p>
                          <span
                            className="shrink-0 rounded-full px-[0.6em] py-[0.15em] text-[0.66em] font-medium transition-colors duration-500"
                            style={{ backgroundColor: "rgba(26,107,99,0.12)", color: APP.running }}
                          >
                            {rev} · {copy.current}
                          </span>
                        </div>

                        {revised && (
                          <div className="assist-rise mt-[0.5em] flex items-start gap-[0.5em] rounded-[0.35em] px-[0.6em] py-[0.45em]" style={{ backgroundColor: "#fdf3dc", color: APP.brown }}>
                            <RefreshCw className="mt-[0.1em] h-[1em] w-[1em] shrink-0" />
                            <p className="text-[0.68em] leading-snug">
                              <span className="font-semibold">{copy.revisedTitle}.</span> {copy.revisedBody}
                            </p>
                          </div>
                        )}

                        <p className="mt-[0.6em] text-[0.66em] uppercase tracking-[0.1em] text-black/50">{stepLabel}</p>
                        <div key={step} className="assist-rise">
                          <p className="text-[0.95em] font-semibold leading-tight">{copy.steps[step].title}</p>
                          <p className="mt-[0.3em] text-[0.66em] leading-snug text-black/70">{copy.steps[step].body}</p>
                          {step === 2 && (
                            <div className="mt-[0.6em] flex items-center gap-[0.8em]">
                              <PlateDrawing />
                              <div>
                                <p className="text-[0.66em] text-black/55">{copy.depthLabel}</p>
                                {revised && <p className="text-[0.66em] tabular-nums text-black/40 line-through">{DEPTH_OLD}</p>}
                                <p
                                  key={String(revised)}
                                  className={`text-[1.3em] font-semibold tabular-nums leading-tight ${revised ? "assist-rise" : ""}`}
                                  style={{ color: revised ? APP.brown : APP.ink }}
                                >
                                  {revised ? DEPTH_NEW : DEPTH_OLD}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto flex items-center justify-between gap-[0.5em] pt-[0.6em]">
                          {on("confirmed") ? (
                            <span className="assist-rise inline-flex items-center gap-[0.4em] text-[0.68em] font-medium" style={{ color: APP.running }}>
                              <Check className="h-[1.1em] w-[1.1em]" />
                              {copy.confirmed}
                            </span>
                          ) : (
                            <span
                              className={`relative rounded-[0.3em] px-[0.8em] py-[0.4em] text-[0.68em] font-medium transition-colors duration-300 ${
                                is("confirm") ? "assist-press" : ""
                              }`}
                              style={{
                                backgroundColor: revised ? APP.teal : "#ececea",
                                color: revised ? "white" : "rgba(29,42,39,0.4)",
                              }}
                            >
                              {copy.confirm}
                              <Tap show={is("confirm")} className="left-[calc(50%-0.8em)] top-[calc(50%-0.8em)]" />
                            </span>
                          )}
                          <span
                            key={step}
                            className={`relative flex h-[1.9em] w-[1.9em] shrink-0 items-center justify-center rounded-full ${
                              is("step2") || is("setup") ? "assist-press" : ""
                            }`}
                            style={{ backgroundColor: step < 2 ? APP.teal : "#ececea", color: step < 2 ? "white" : "rgba(29,42,39,0.35)" }}
                          >
                            <ChevronRight className="h-[1.1em] w-[1.1em]" />
                            <Tap key={b} show={is("step2") || is("setup")} className="left-[calc(50%-0.8em)] top-[calc(50%-0.8em)]" />
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabletFrame>
        </ReplayScale>
      </div>
    </div>
  )
}

function PanelButton({ icon, pressed = false, children }: { icon: ReactNode; pressed?: boolean; children: ReactNode }) {
  return (
    <span
      className={`relative flex flex-col items-center gap-[0.4em] rounded-[0.5em] py-[0.8em] text-[0.72em] font-medium ${pressed ? "assist-press" : ""}`}
      style={{ backgroundColor: pressed ? "rgba(255,255,255,0.18)" : APP.panelTile }}
    >
      {icon}
      {children}
    </span>
  )
}

/** The plate from drawing 88-204: top view with four holes, and a section with the hole depth. */
function PlateDrawing() {
  const line = "rgba(29,42,39,0.6)"
  return (
    <svg viewBox="0 0 150 60" className="w-[11em] shrink-0" aria-hidden>
      <rect x="2" y="6" width="80" height="48" rx="2" fill="#f3f5f4" stroke={line} />
      {[
        [18, 18],
        [66, 18],
        [18, 42],
        [66, 42],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" fill="white" stroke={line} />
      ))}
      <rect x="98" y="14" width="40" height="32" fill="#f3f5f4" stroke={line} />
      <rect x="113" y="14" width="10" height="22" fill="white" stroke={line} strokeDasharray="2 1.5" />
      <path d="M143 14 V36 M140 14 H146 M140 36 H146" stroke={APP.amber} strokeWidth="1.4" fill="none" />
    </svg>
  )
}
