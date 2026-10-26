"use client"

import { useEffect, useRef, useState } from "react"
import { Check, FileText, Mic, Plus, ArrowUp, Wrench, Workflow } from "lucide-react"

import type { DemoCopy } from "@/content/opti-assist"

/**
 * A scripted replay of Opti Assist on a phone, for the /ai/chat hero.
 *
 * It is not a video on purpose. The live app answers differently from run to
 * run, and QR sessions refuse most technical questions, so a screen recording
 * could not show the product reliably. This redraws the real app (dark header,
 * grey chat, machine chip, tool lines, sources, Call service) and plays the
 * answers it gave on the demo account: live stop data, then a procedure from
 * the operator manual, then a technician call.
 *
 * The timeline only runs while the phone is on screen. Visitors who ask for
 * reduced motion get the finished conversation, with nothing moving.
 */

// How long each beat holds, in ms. Typing beats also drive the caret.
const BEATS = [
  { id: "scan", ms: 2200 },
  { id: "open", ms: 900 },
  { id: "type1", ms: 1500 },
  { id: "tools1", ms: 1500 },
  { id: "answer1", ms: 3000 },
  { id: "type2", ms: 1600 },
  { id: "tools2", ms: 1400 },
  { id: "answer2", ms: 3600 },
  { id: "call", ms: 1300 },
  { id: "called", ms: 3200 },
] as const

type BeatId = (typeof BEATS)[number]["id"]
const order = BEATS.map((b) => b.id) as BeatId[]
const at = (beat: BeatId) => order.indexOf(beat)

export function OptiAssistDemo({ copy }: { copy: DemoCopy }) {
  const root = useRef<HTMLDivElement>(null)
  const [beat, setBeat] = useState(0)
  const [typed, setTyped] = useState(0)
  const [visible, setVisible] = useState(false)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setStill(reduce.matches)
    apply()
    reduce.addEventListener("change", apply)
    return () => reduce.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.25,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Advance the timeline.
  useEffect(() => {
    if (still || !visible) return
    const t = setTimeout(
      () => setBeat((b) => (b + 1) % BEATS.length),
      BEATS[beat].ms
    )
    return () => clearTimeout(t)
  }, [beat, visible, still])

  // Type the question for the current typing beat.
  const id = BEATS[beat].id
  const question = id === "type1" ? copy.q1 : id === "type2" ? copy.q2 : ""
  useEffect(() => {
    setTyped(0)
    if (!question || still || !visible) return
    const step = Math.max(18, (BEATS[beat].ms - 350) / question.length)
    const t = setInterval(
      () => setTyped((n) => (n >= question.length ? n : n + 1)),
      step
    )
    return () => clearInterval(t)
  }, [question, beat, still, visible])

  // With reduced motion, sit on the finished answer to the manual question.
  const b = still ? at("answer2") : beat
  const past = (beat: BeatId) => b > at(beat)
  const on = (beat: BeatId) => b >= at(beat)

  return (
    <div ref={root} role="img" aria-label={copy.label} className="relative mx-auto w-full max-w-[19rem]">
      {/* Everything inside is a picture of the app, so screen readers get the
          label above instead of fake buttons and changing text. */}
      <div aria-hidden>
      {/* Phone body */}
      <div className="relative rounded-[2.6rem] bg-[#0d1512] p-[0.55rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2.1rem] bg-[#f6f6f5]">
          {/* Camera notch */}
          <div className="absolute left-1/2 top-2 z-30 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0d1512]" />

          {/* Scan scene */}
          <div
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#1b2622] transition-opacity duration-500 motion-reduce:transition-none ${
              b === at("scan") ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden
          >
            <div className="relative h-36 w-36 rounded-2xl bg-white p-3 shadow-lg">
              <QrGlyph />
              {!still && (
                <div className="assist-scan-line absolute inset-x-2 top-2 h-0.5 rounded-full bg-[#3ccf5a] shadow-[0_0_12px_2px_rgba(60,207,90,0.7)]" />
              )}
              {/* Viewfinder corners */}
              {["left-[-10px] top-[-10px] border-l-2 border-t-2", "right-[-10px] top-[-10px] border-r-2 border-t-2", "bottom-[-10px] left-[-10px] border-b-2 border-l-2", "bottom-[-10px] right-[-10px] border-b-2 border-r-2"].map((c) => (
                <span key={c} className={`absolute h-6 w-6 rounded-[4px] border-white/80 ${c}`} />
              ))}
            </div>
            <p className="mt-8 text-[0.8rem] font-medium text-white/90">{copy.scan}</p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/55">
              {copy.machine}
            </p>
          </div>

          {/* App */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex h-12 shrink-0 items-end bg-[#233431] px-4 pb-2">
              <span className="text-[0.72rem] font-semibold tracking-tight text-white">
                OptiPeople
              </span>
            </div>

            {/* Messages stack from the bottom, so new lines push old ones up
                the way the real chat scrolls. */}
            <div className="relative flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-3 pb-2 text-[0.68rem] leading-[1.45] text-[#1d2a27]">
              {/* Empty chat: the greeting at the top and suggestions above the
                  composer, as in the app. Both give way to the first question. */}
              <p
                className={`absolute inset-x-3 top-3 text-[0.78rem] leading-snug text-[#1d2a27]/85 transition-opacity duration-300 ${
                  on("tools1") ? "opacity-0" : "opacity-100"
                }`}
              >
                {copy.welcome}
              </p>
              {!on("tools1") && (
                <div className="flex flex-col items-start gap-1">
                  {copy.suggestions.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-black/10 bg-white px-2 py-0.5 text-[0.6rem]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {on("tools1") && !still && <UserBubble text={copy.q1} />}
              {on("tools1") && !still && (
                <ToolLines lines={copy.tools1} done={past("tools1")} />
              )}
              {on("answer1") && !still && (
                <div className="assist-rise space-y-1.5">
                  {copy.a1.map((line, i) => (
                    <p key={line} className="assist-rise" style={{ animationDelay: `${i * 350}ms` }}>
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {on("tools2") && <UserBubble text={copy.q2} />}
              {on("tools2") && (
                <ToolLines lines={copy.tools2} done={past("tools2")} />
              )}
              {on("answer2") && (
                <div className="assist-rise space-y-1.5">
                  <p className="font-medium">{copy.a2Intro}</p>
                  <ol className="space-y-1">
                    {copy.a2Steps.map((s, i) => (
                      <li
                        key={s}
                        className="assist-rise flex gap-1.5"
                        style={{ animationDelay: `${150 + i * 300}ms` }}
                      >
                        <span className="tabular-nums text-[#1d2a27]/60">{i + 1}.</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                  <div
                    className="assist-rise flex flex-wrap items-center gap-1 pt-1"
                    style={{ animationDelay: "1150ms" }}
                  >
                    <span className="text-[0.55rem] uppercase tracking-[0.12em] text-[#1d2a27]/55">
                      {copy.sourcesLabel}
                    </span>
                    {copy.sources.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-1.5 py-0.5 text-[0.55rem]"
                      >
                        <FileText className="h-2.5 w-2.5" aria-hidden />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {on("called") && (
                <div className="assist-rise rounded-lg border border-[#e7d89a] bg-[#fdf8e4] p-2.5">
                  <p className="flex items-center gap-1.5 font-semibold text-[#7a5a12]">
                    <Check className="h-3 w-3" aria-hidden />
                    {copy.callTitle}
                  </p>
                  <p className="mt-0.5 text-[#7a5a12]/85">{copy.callSent}</p>
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="shrink-0 space-y-1.5 px-3 pb-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded border border-[#9cc3d5] bg-[#eef6fa] px-1.5 py-0.5 text-[0.52rem] font-semibold uppercase tracking-wide text-[#23424f]">
                  <Workflow className="h-2.5 w-2.5" aria-hidden />
                  {copy.machine}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded border border-black/10 px-1.5 py-0.5 text-[0.55rem] transition-all duration-300 motion-reduce:transition-none ${
                    b === at("call") ? "assist-press bg-[#e9f2ec] ring-2 ring-[#3ccf5a]/60" : "bg-white"
                  }`}
                >
                  <Wrench className="h-2.5 w-2.5" aria-hidden />
                  {copy.callService}
                </span>
              </div>
              <div className="flex items-end gap-1.5">
                <div
                  className={`flex min-h-9 flex-1 items-center gap-1.5 rounded-md border bg-white px-2 py-1.5 transition-colors ${
                    question ? "border-[#3ccf5a]" : "border-black/10"
                  }`}
                >
                  <Plus className="h-3 w-3 shrink-0 text-[#1d2a27]/50" aria-hidden />
                  <span className="min-w-0 flex-1 text-[0.66rem] leading-snug">
                    {question ? (
                      <>
                        {question.slice(0, typed)}
                        <span className="assist-caret ml-px inline-block h-3 w-px translate-y-0.5 bg-[#1d2a27]" />
                      </>
                    ) : (
                      <span className="text-[#1d2a27]/40">{copy.placeholder}</span>
                    )}
                  </span>
                  <Mic className="h-3 w-3 shrink-0 text-[#1d2a27]/50" aria-hidden />
                </div>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    question && typed >= question.length
                      ? "border-[#4b8db0] bg-[#cfe6f3] text-[#1d2a27]"
                      : "border-black/10 bg-[#ececea] text-[#1d2a27]/35"
                  }`}
                >
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="assist-rise ml-auto max-w-[85%] rounded-md bg-[#233431] px-2.5 py-1.5 text-[0.68rem] text-white">
      {text}
    </div>
  )
}

function ToolLines({ lines, done }: { lines: string[]; done: boolean }) {
  return (
    <ul className="space-y-0.5 text-[0.6rem] text-[#1d2a27]/55">
      {lines.map((line, i) => (
        <li
          key={line}
          className="assist-rise flex items-center gap-1.5"
          style={{ animationDelay: `${i * 450}ms` }}
        >
          {done ? (
            <Check className="h-2.5 w-2.5 text-[#2f9e4a]" aria-hidden />
          ) : (
            <span className="assist-spin h-2.5 w-2.5 rounded-full border border-[#1d2a27]/30 border-t-transparent" />
          )}
          {line}
        </li>
      ))}
    </ul>
  )
}

/** A fixed, decorative QR pattern. It does not encode anything. */
function QrGlyph() {
  const cells = [
    "1111111011101111111", "1000001001001000001", "1011101011101011101",
    "1011101010001011101", "1011101001101011101", "1000001011001000001",
    "1111111010101111111", "0000000011100000000", "1101011100110101101",
    "0110100011011001010", "1011011101001110111", "0100100110110001000",
    "1111111001011010110", "1000001011101101010", "1011101010010111101",
    "1011101011101000110", "1011101000111011011", "1000001010010100110",
    "1111111011011011101",
  ]
  return (
    <svg viewBox="0 0 19 19" className="h-full w-full" shapeRendering="crispEdges" aria-hidden>
      {cells.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1b2622" /> : null
        )
      )}
    </svg>
  )
}
