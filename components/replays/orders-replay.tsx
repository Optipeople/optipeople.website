"use client"

import { ArrowDownToLine, ArrowUpFromLine, Check, Play } from "lucide-react"

import type { OrderRow, OrdersDemo } from "@/content/replays/orders"

import { APP, ReplayScale, TabletFrame, Tap } from "./replay-frame"
import { useReplay } from "./use-replay"

/**
 * A scripted replay of the Orders module, for the erp-shopfloor hero.
 *
 * The page claims one loop: orders come down from the ERP, the floor runs
 * them, and the actuals go back up. A recording would need a real ERP push and
 * a real run of a few hours, so this redraws the work order list (from
 * Work-Order-Management-Orders) with the operator panel in front of it and
 * plays order B01-S65 from the demo account through that loop in seconds.
 *
 * The timeline only runs while the replay is on screen. With reduced motion
 * it sits on the finished order, reported back to the ERP.
 */

const BEATS = [
  { id: "list", ms: 1800 },
  { id: "erp", ms: 2000 },
  { id: "pick", ms: 1300 },
  { id: "open", ms: 1500 },
  { id: "start", ms: 1000 },
  { id: "running", ms: 4600 },
  { id: "done", ms: 1500 },
  { id: "reported", ms: 3800 },
] as const

// The running beat "types" one character per good part, which gives the
// counters a clock without a timer of their own.
const COUNT = "x".repeat(60)

const COLS = "grid-cols-[4.4em_4.6em_minmax(0,1fr)_2.6em_5.6em_5.4em]"

export function OrdersReplay({ copy, label }: { copy: OrdersDemo; label: string }) {
  const { root, ...r } = useReplay(BEATS, "reported", { running: COUNT })
  const { is, on } = r

  const arrived = on("erp")
  const status = on("done") ? "completed" : on("running") ? "inProgress" : "ready"
  const good = on("done") ? copy.good : is("running") ? Math.round((r.typed / COUNT.length) * copy.good) : 0
  const rejected = on("done") ? copy.rejected : Math.floor((good * copy.rejected) / copy.good)

  const running = copy.rows.filter((row) => row.status === "inProgress").length + (status === "inProgress" ? 1 : 0)
  const ready = copy.rows.filter((row) => row.status === "ready").length + (arrived && status === "ready" ? 1 : 0)
  const total = copy.rows.length + (arrived ? 1 : 0)

  const erpLine = on("reported") ? copy.erpReported : arrived ? copy.erpIncoming : copy.erpSynced
  const panelRows = copy.rows.filter((row) => row.station === copy.machine)

  return (
    <div ref={root} role="img" aria-label={label} className="mx-auto w-full max-w-[34rem]">
      <div aria-hidden>
        <ReplayScale>
          {/* The work order list, as the planner sees it */}
          <div
            className="overflow-hidden rounded-[0.9em] bg-white shadow-[0_2.5em_5em_-2em_rgba(0,0,0,0.55)] ring-1 ring-black/10"
            style={{ color: APP.ink }}
          >
            <div className="flex items-center justify-between gap-[1em] px-[1.1em] pb-[0.5em] pt-[0.9em]">
              <span className="text-[1em] font-semibold uppercase tracking-tight" style={{ color: APP.teal }}>
                {copy.title}
              </span>
              <span
                key={erpLine}
                className={`assist-rise inline-flex items-center gap-[0.4em] rounded-[0.3em] px-[0.6em] py-[0.3em] text-[0.66em] font-medium ${
                  arrived && !on("pick") ? "ring-2 ring-[#5b8de0]/50" : ""
                }`}
                style={on("reported") ? { backgroundColor: "#e3efec", color: APP.teal } : { backgroundColor: "#eef3fb", color: "#2c4f86" }}
              >
                {on("reported") ? (
                  <ArrowUpFromLine className="h-[1.1em] w-[1.1em]" aria-hidden />
                ) : (
                  <ArrowDownToLine className="h-[1.1em] w-[1.1em]" aria-hidden />
                )}
                {erpLine}
              </span>
            </div>

            <div className="flex flex-wrap gap-[0.3em] px-[1.1em] pb-[0.7em]">
              <Chip active text={copy.filters.all} n={total} />
              <Chip text={copy.filters.ready} n={ready} />
              <Chip text={copy.filters.inProgress} n={running} />
            </div>

            <div className={`px-[1.1em] ${on("reported") ? "pb-[3em]" : "pb-[4.3em]"}`}>
              <div
                className={`grid ${COLS} items-center gap-[0.5em] border-b px-[0.5em] py-[0.45em] text-[0.66em] font-semibold`}
                style={{ borderColor: APP.line, backgroundColor: "#f3f6f5" }}
              >
                <span>{copy.cols.priority}</span>
                <span>{copy.cols.order}</span>
                <span>{copy.cols.product}</span>
                <span className="text-right">{copy.cols.qty}</span>
                <span>{copy.cols.station}</span>
                <span>{copy.cols.status}</span>
              </div>

              {/* The ERP order keeps its room from the start, and the report
                  line takes its room from the padding below, so the list
                  never grows and the panel never moves. */}
              <div
                key={arrived ? "in" : "wait"}
                className={`transition-colors duration-700 motion-reduce:transition-none ${arrived ? "assist-rise" : "invisible"}`}
                style={{
                  backgroundColor: on("reported") ? "#f1f7f5" : on("running") ? "transparent" : "#eef3fb",
                }}
              >
                <Row copy={copy} row={{ ...copy.incoming, status: "ready" }} status={status} strong />
                {on("reported") && (
                  <p className="assist-rise flex items-center gap-[0.5em] px-[0.9em] pb-[0.5em] text-[0.66em]" style={{ color: APP.teal }}>
                    <Check className="h-[1.1em] w-[1.1em]" aria-hidden />
                    <span className="font-semibold">{copy.reportedLine}</span>
                    <span className="tabular-nums">
                      {copy.goodLabel} {copy.good} · {copy.rejectedLabel} {copy.rejected}
                    </span>
                  </p>
                )}
              </div>
              {copy.rows.map((row) => (
                <Row key={row.order} copy={copy} row={row} status={row.status} />
              ))}
            </div>
          </div>

          {/* The operator panel at CNC Robot, in front of the list */}
          <div className="relative z-10 -mt-[2.2em] ml-auto w-[60%] min-w-[17em]">
            <TabletFrame>
              <div className="relative min-h-[13.5em] px-[1em] py-[0.9em]">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.9em] font-semibold">{copy.machine}</span>
                  <span className="text-[0.66em] text-white/60">{copy.shift}</span>
                </div>

                {/* Orders waiting at this machine */}
                {!on("open") && (
                  <div className="mt-[0.7em]">
                    <p className="text-[0.66em] uppercase tracking-[0.12em] text-white/60">{copy.panelOrders}</p>
                    <div className="relative mt-[0.4em] space-y-[0.35em]">
                      {arrived && (
                        <PanelRow
                          row={copy.incoming}
                          tag={copy.priorities.urgent}
                          className={`assist-rise ${is("pick") ? "assist-press ring-2 ring-white/70" : ""}`}
                        />
                      )}
                      {panelRows.map((row) => (
                        <PanelRow key={row.order} row={row} tag={copy.priorities[row.priority]} />
                      ))}
                      <Tap show={is("pick")} className="left-[60%] top-[0.2em]" />
                    </div>
                  </div>
                )}

                {/* The picked order: start it, then watch it count */}
                {on("open") && (
                  <div className="assist-rise mt-[0.6em]">
                    <div className="flex items-baseline justify-between gap-[0.6em]">
                      <span className="text-[0.75em] font-semibold tabular-nums">{copy.incoming.order}</span>
                      <span className="truncate text-[0.68em] text-white/70">{copy.incoming.product}</span>
                    </div>

                    {!on("running") ? (
                      <div className="relative mt-[1em] flex flex-col items-center">
                        <span
                          className={`flex h-[3.6em] w-[3.6em] items-center justify-center rounded-full ring-[0.2em] ring-white/90 ${
                            is("start") ? "assist-press" : ""
                          }`}
                          style={{ backgroundColor: APP.running }}
                        >
                          <Play className="ml-[0.15em] h-[1.5em] w-[1.5em] fill-white text-white" aria-hidden />
                        </span>
                        <span className="mt-[0.5em] text-[0.7em] font-semibold">{copy.start}</span>
                        <Tap show={is("start")} className="left-1/2 top-[1em] -translate-x-1/2" />
                      </div>
                    ) : (
                      <div className="mt-[0.7em]">
                        <span
                          key={on("done") ? "done" : "run"}
                          className="assist-rise inline-flex items-center gap-[0.4em] rounded-[0.3em] px-[0.55em] py-[0.25em] text-[0.68em] font-semibold"
                          style={{
                            backgroundColor: on("done") ? "white" : APP.running,
                            color: on("done") ? APP.teal : "white",
                          }}
                        >
                          {on("done") ? (
                            <Check className="h-[1.1em] w-[1.1em]" aria-hidden />
                          ) : (
                            <span className="h-[0.6em] w-[0.6em] rounded-full bg-white" />
                          )}
                          {on("done") ? copy.completed : copy.running}
                        </span>
                        <div className="mt-[0.6em] grid grid-cols-2 gap-[0.4em]">
                          <Count label={copy.goodLabel} value={good} sub={`${copy.ofLabel} ${copy.incoming.qty}`} />
                          <Count label={copy.rejectedLabel} value={rejected} warn />
                        </div>
                        <div className="mt-[0.6em] h-[0.4em] overflow-hidden rounded-full" style={{ backgroundColor: APP.panelTile }}>
                          <div
                            className="h-full rounded-full transition-[width] duration-300 ease-linear motion-reduce:transition-none"
                            style={{
                              width: `${(good / copy.incoming.qty) * 100}%`,
                              backgroundColor: on("done") ? "white" : "#7fc4b8",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabletFrame>
          </div>
        </ReplayScale>
      </div>
    </div>
  )
}

function Chip({ text, n, active = false }: { text: string; n: number; active?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-[0.5em] rounded-[0.25em] border px-[0.6em] py-[0.3em] text-[0.66em] font-medium tabular-nums"
      style={active ? { backgroundColor: APP.teal, borderColor: APP.teal, color: "white" } : { borderColor: APP.line, color: APP.ink }}
    >
      {text}
      <span key={n} className="assist-rise opacity-70">
        {n}
      </span>
    </span>
  )
}

const PRIORITY = {
  urgent: {
    backgroundColor: "#fbe2dd",
    borderColor: "#e9a597",
    color: "#a3392a",
  },
  high: {
    backgroundColor: "#fcefd9",
    borderColor: "#eac58a",
    color: "#8a5a12",
  },
  normal: {
    backgroundColor: "white",
    borderColor: "rgba(29,42,39,0.2)",
    color: "rgba(29,42,39,0.75)",
  },
} as const

const STATUS = {
  planned: {
    backgroundColor: "white",
    borderColor: "#9fb8d8",
    color: "#2c4f86",
  },
  ready: {
    backgroundColor: "#e3f1ea",
    borderColor: "#a7cfbb",
    color: "#245c45",
  },
  inProgress: {
    backgroundColor: "#fcefd9",
    borderColor: "#eac58a",
    color: "#8a5a12",
  },
  completed: {
    backgroundColor: "#d9ebe7",
    borderColor: APP.running,
    color: APP.teal,
  },
} as const

function Row({ copy, row, status, strong = false }: { copy: OrdersDemo; row: OrderRow; status: keyof typeof STATUS; strong?: boolean }) {
  return (
    <div className={`grid ${COLS} items-center gap-[0.5em] border-b px-[0.5em] py-[0.5em]`} style={{ borderColor: APP.line }}>
      <span>
        <span className="inline-block rounded-[0.25em] border px-[0.5em] py-[0.15em] text-[0.66em] font-semibold" style={PRIORITY[row.priority]}>
          {copy.priorities[row.priority]}
        </span>
      </span>
      <span className={`text-[0.68em] tabular-nums ${strong ? "font-bold" : "font-semibold"}`}>{row.order}</span>
      <span className="truncate text-[0.68em]">{row.product}</span>
      <span className="text-right text-[0.68em] tabular-nums">{row.qty}</span>
      <span className="truncate text-[0.68em]">{row.station}</span>
      <span>
        <span
          key={status}
          className="assist-rise inline-block whitespace-nowrap rounded-[0.25em] border px-[0.5em] py-[0.15em] text-[0.66em] font-semibold"
          style={STATUS[status]}
        >
          {copy.statuses[status]}
        </span>
      </span>
    </div>
  )
}

function PanelRow({ row, tag, className = "" }: { row: Omit<OrderRow, "status">; tag: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-between gap-[0.5em] rounded-[0.4em] px-[0.6em] py-[0.45em] ${className}`}
      style={{ backgroundColor: APP.panelTile }}
    >
      <span className="min-w-0">
        <span className="block text-[0.66em] font-semibold tabular-nums">{row.order}</span>
        <span className="block truncate text-[0.66em] text-white/70">
          {row.product} · {row.qty}
        </span>
      </span>
      <span className="shrink-0 text-[0.66em] text-white/70">{tag}</span>
    </div>
  )
}

function Count({ label, value, sub, warn = false }: { label: string; value: number; sub?: string; warn?: boolean }) {
  return (
    <div className="rounded-[0.4em] px-[0.6em] py-[0.45em]" style={{ backgroundColor: APP.panelTile }}>
      <span className="block text-[0.66em] uppercase tracking-[0.1em] text-white/65">{label}</span>
      <span className="block text-[1.4em] font-semibold leading-tight tabular-nums" style={warn && value > 0 ? { color: "#f5b3a6" } : undefined}>
        {value}
      </span>
      {sub && <span className="block text-[0.66em] text-white/60">{sub}</span>}
    </div>
  )
}
