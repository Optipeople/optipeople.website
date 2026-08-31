import {
  ArrowUp,
  Bot,
  Braces,
  CheckCircle2,
  FileText,
  GitBranch,
  Globe,
  Loader2,
  Play,
  Plus,
  Repeat,
  Search,
  ShieldCheck,
  Sparkles,
  Table2,
} from "lucide-react"
import type { AiCapabilitySlug } from "@/lib/ai-stack"

/**
 * Lightweight, code-built UI mockups for each AI capability.
 * Purely decorative, they illustrate the product without needing screenshots.
 * Used both inside the homepage slider cards and as the hero visual on the
 * `/ai/[slug]` landing pages.
 */
export function CapabilityMockup({ slug }: { slug: AiCapabilitySlug }) {
  switch (slug) {
    case "chat":
      return <ChatMockup />
    case "workflows":
      return <WorkflowsMockup />
    case "agents":
      return <AgentsMockup />
    case "integrations":
      return <IntegrationsMockup />
    case "api":
      return <ApiMockup />
    default:
      return null
  }
}

const panel =
  "rounded-2xl bg-white text-left shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5"

function ChatMockup() {
  return (
    <div className={`${panel} w-full p-3`}>
      <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
        <FileText className="size-3.5 text-blue-600" />
        OEE Report Q1.pdf
        <span className="text-slate-400">×</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <p className="min-w-0 flex-1 truncate text-sm text-slate-400">
          Ask Opti Assist…
        </p>
        <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <ArrowUp className="size-3.5" />
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-600">
          <Plus className="size-3" />
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-600">
          <Sparkles className="size-3" />
          Company knowledge
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-600">
          <Search className="size-3" />
          Deep research
        </span>
      </div>
    </div>
  )
}

function WorkflowsMockup() {
  const nodes = [
    { icon: Bot, title: "Agent", desc: "Create a new agent" },
    { icon: GitBranch, title: "Condition", desc: "Branch on a condition" },
    { icon: Repeat, title: "Loop", desc: "Repeat for each item" },
    { icon: Globe, title: "Web search", desc: "Search the web" },
    { icon: ShieldCheck, title: "Guardrail", desc: "Moderation & checks" },
    { icon: Braces, title: "Code", desc: "Run custom code" },
  ]
  return (
    <div className="w-full">
      <div
        className={`${panel} mb-3 ml-2 flex w-[70%] items-center justify-between px-3 py-2`}
      >
        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-slate-700">
          <span className="inline-flex size-5 items-center justify-center rounded bg-blue-100 text-blue-600">
            <Play className="size-3" />
          </span>
          Create work order
        </span>
        <span className="text-slate-300">···</span>
      </div>
      <div className={`${panel} w-full p-2`}>
        <div className="flex items-center justify-between px-1 pb-1.5">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-700">
            <Plus className="size-3.5" /> Add node
          </span>
          <span className="text-slate-300">×</span>
        </div>
        <div className="space-y-0.5">
          {nodes.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-50"
            >
              <span className="inline-flex size-6 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                <Icon className="size-3.5" />
              </span>
              <span className="flex flex-col">
                <span className="text-[11px] font-medium leading-tight text-slate-700">
                  {title}
                </span>
                <span className="text-[10px] leading-tight text-slate-400">
                  {desc}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AgentsMockup() {
  return (
    <div className={`${panel} w-full p-4`}>
      <ol className="relative space-y-4 text-slate-700">
        <li className="flex gap-2.5">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
          <div>
            <p className="text-[12px] font-medium leading-tight">
              Searched folder
            </p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
              <Search className="size-3 text-amber-500" /> Production reports
            </span>
          </div>
        </li>
        <li className="flex gap-2.5">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
          <div>
            <p className="text-[12px] font-medium leading-tight">
              Read 2 documents
            </p>
            <div className="mt-1 flex flex-col gap-1">
              <span className="inline-flex w-fit items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                <Table2 className="size-3 text-emerald-600" /> OEE-Report.xlsx
              </span>
              <span className="inline-flex w-fit items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                <FileText className="size-3 text-red-500" /> Shift-Log.pdf
              </span>
            </div>
          </div>
        </li>
        <li className="flex gap-2.5">
          <Loader2 className="mt-0.5 size-4 shrink-0 animate-spin text-slate-400" />
          <p className="text-[12px] font-medium leading-tight text-slate-400">
            Generating response
          </p>
        </li>
      </ol>
    </div>
  )
}

function IntegrationsMockup() {
  const tiles = [
    { label: "SAP", color: "bg-blue-600" },
    { label: "D365", color: "bg-sky-500" },
    { label: "BC", color: "bg-indigo-500" },
    { label: "NAV", color: "bg-cyan-600" },
    { label: "ORA", color: "bg-red-500" },
    { label: "NS", color: "bg-slate-700" },
    { label: "M", color: "bg-emerald-600" },
    { label: "T", color: "bg-violet-600" },
  ]
  return (
    <div className={`${panel} w-full p-4`}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[12px] font-semibold text-slate-700">
          ERP & tools
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
          50+ integrations
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {tiles.map((t) => (
          <div
            key={t.label}
            className={`flex aspect-square items-center justify-center rounded-xl ${t.color} text-[11px] font-bold text-white`}
          >
            {t.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function ApiMockup() {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[#0d1117] font-mono text-[11px] leading-relaxed shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="size-2 rounded-full bg-red-400/80" />
        <span className="size-2 rounded-full bg-yellow-400/80" />
        <span className="size-2 rounded-full bg-green-400/80" />
        <span className="ml-2 text-[10px] text-white/60">api.optipeople.dk</span>
      </div>
      <div className="space-y-1 p-3">
        <p>
          <span className="text-emerald-400">GET</span>{" "}
          <span className="text-sky-300">/v1/machines/42/oee</span>
        </p>
        <p className="text-white/60">Authorization: Bearer •••••</p>
        <p className="pt-1 text-white/82">{"{"}</p>
        <p className="pl-3 text-white/82">
          <span className="text-violet-300">&quot;oee&quot;</span>:{" "}
          <span className="text-amber-300">0.87</span>,
        </p>
        <p className="pl-3 text-white/82">
          <span className="text-violet-300">&quot;availability&quot;</span>:{" "}
          <span className="text-amber-300">0.94</span>,
        </p>
        <p className="pl-3 text-white/82">
          <span className="text-violet-300">&quot;performance&quot;</span>:{" "}
          <span className="text-amber-300">0.96</span>
        </p>
        <p className="text-white/82">{"}"}</p>
      </div>
    </div>
  )
}
