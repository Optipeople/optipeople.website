import type { LucideIcon } from "lucide-react"
import {
  Activity,
  Bot,
  ChartColumn,
  ChevronRight,
  CircleCheck,
  CodeXml,
  Cpu,
  Database,
  HardDrive,
  Layers,
  Monitor,
  Network,
  ShieldCheck,
  Sparkles,
  Tablet,
  Users,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/routing"

/**
 * Opticloud platform architecture, drawn as markup rather than shipped as the
 * PDF it was designed as.
 *
 * Three zones read left to right from `xl` up and top to bottom below it (the
 * three-column diagram needs 1280px before its columns stop squeezing body copy
 * into four-line wraps, so the laptop widths get the stacked reading instead):
 * the production site, the platform itself (four stages, ingest to access), and
 * the people and systems that read from it. Every node is real text, so the
 * diagram translates, scales, and is readable by a screen reader instead of
 * being an image with a caption under it.
 *
 * Copy lives per locale below; icons are keyed by node id, so a translated node
 * can never lose its icon. `highlight` marks the customer data container, the
 * one claim the diagram exists to make: nothing is shared between customers.
 */

type NodeSpec = {
  id: string
  title: string
  body: string
  /** Small pill under the body, for the two nodes that carry a claim. */
  badge?: string
  /** Inverted card. Exactly one node uses this. */
  highlight?: boolean
}

type StageSpec = {
  id: string
  label: string
  nodes: NodeSpec[]
}

type ArchitectureCopy = {
  eyebrow: string
  title: string
  lede: string
  site: { label: string; nodes: NodeSpec[] }
  platform: { label: string; host: string; stages: StageSpec[] }
  consumers: { label: string; nodes: NodeSpec[] }
  assurances: { title: string; body: string }[]
}

const NODE_ICONS: Record<string, LucideIcon> = {
  machines: Cpu,
  loggers: Activity,
  operators: Tablet,
  sources: Layers,
  ingestion: ShieldCheck,
  context: Network,
  processing: Zap,
  container: Database,
  adx: HardDrive,
  portal: Monitor,
  api: CodeXml,
  mcp: Sparkles,
  team: Users,
  systems: ChartColumn,
  assistants: Bot,
}

const copy: Record<Locale, ArchitectureCopy> = {
  en: {
    eyebrow: "Data platform",
    title: "Opticloud platform architecture",
    lede: "Data leaves your production site over encrypted connections, gets tied to orders, shifts, machines and operators on the way in, and lands in a data container dedicated to your company. Your team, your systems, and your AI assistants all read from that same record.",
    site: {
      label: "Production site",
      nodes: [
        {
          id: "machines",
          title: "Machines & PLCs",
          body: "Production equipment and control systems",
        },
        {
          id: "loggers",
          title: "Data loggers",
          body: "Sensor and process data capture",
        },
        {
          id: "operators",
          title: "Operator devices",
          body: "Tablets and shopfloor registrations",
        },
        {
          id: "sources",
          title: "Other sources",
          body: "ERP, historians, files and third-party systems",
        },
      ],
    },
    platform: {
      label: "Opticloud platform",
      host: "Microsoft Azure",
      stages: [
        {
          id: "ingest",
          label: "Ingest",
          nodes: [
            {
              id: "ingestion",
              title: "Secure ingestion",
              body: "Azure IoT Hub and secure endpoints, encrypted (TLS)",
            },
          ],
        },
        {
          id: "process",
          label: "Process",
          nodes: [
            {
              id: "context",
              title: "Contextualization engine",
              body: "Links data to orders, shifts, machines and operators",
              badge: "Data in context",
            },
            {
              id: "processing",
              title: "Processing engines",
              body: "Real-time processing of events, telemetry and process data",
            },
          ],
        },
        {
          id: "store",
          label: "Store",
          nodes: [
            {
              id: "container",
              title: "Customer data container",
              body: "Configuration, transactions and telemetry, dedicated per customer",
              badge: "No shared data",
              highlight: true,
            },
            {
              id: "adx",
              title: "Process data store",
              body: "Azure Data Explorer (ADX) for time-series process data",
            },
          ],
        },
        {
          id: "access",
          label: "Access",
          nodes: [
            {
              id: "portal",
              title: "Web portal",
              body: "Browser-based access on portal.optipeople.dk",
            },
            {
              id: "api",
              title: "External API",
              body: "REST API for data export and integration",
            },
            {
              id: "mcp",
              title: "MCP server",
              body: "Secure access for AI assistants (MCP)",
            },
          ],
        },
      ],
    },
    consumers: {
      label: "Users & systems",
      nodes: [
        {
          id: "team",
          title: "Your team",
          body: "Operators, planners and management",
        },
        {
          id: "systems",
          title: "Your systems & BI",
          body: "ERP and MES integration, Power BI reporting",
        },
        {
          id: "assistants",
          title: "AI assistants",
          body: "Claude, Copilot and other MCP-enabled tools",
        },
      ],
    },
    assurances: [
      { title: "Microsoft Azure", body: "Enterprise-grade cloud hosting" },
      {
        title: "Encrypted end to end",
        body: "TLS in transit, encrypted at rest",
      },
      {
        title: "Full data isolation",
        body: "A dedicated data container per customer",
      },
      {
        title: "Controlled access",
        body: "Authenticated and authorised endpoints only",
      },
    ],
  },
  da: {
    eyebrow: "Dataplatform",
    title: "Opticloud-platformens arkitektur",
    lede: "Data forlader produktionen over krypterede forbindelser, bliver koblet til ordrer, skift, maskiner og operatører på vejen ind, og lander i en datacontainer, der er dedikeret til jeres virksomhed. Jeres team, jeres systemer og jeres AI-assistenter læser alle fra den samme registrering.",
    site: {
      label: "Produktionssted",
      nodes: [
        {
          id: "machines",
          title: "Maskiner og PLC'er",
          body: "Produktionsudstyr og styresystemer",
        },
        {
          id: "loggers",
          title: "Dataloggere",
          body: "Opsamling af sensor- og procesdata",
        },
        {
          id: "operators",
          title: "Operatørenheder",
          body: "Tablets og registreringer på gulvet",
        },
        {
          id: "sources",
          title: "Øvrige kilder",
          body: "ERP, historians, filer og tredjepartssystemer",
        },
      ],
    },
    platform: {
      label: "Opticloud-platformen",
      host: "Microsoft Azure",
      stages: [
        {
          id: "ingest",
          label: "Opsamling",
          nodes: [
            {
              id: "ingestion",
              title: "Sikker opsamling",
              body: "Azure IoT Hub og sikre endpoints, krypteret (TLS)",
            },
          ],
        },
        {
          id: "process",
          label: "Behandling",
          nodes: [
            {
              id: "context",
              title: "Kontekstmotor",
              body: "Kobler data til ordrer, skift, maskiner og operatører",
              badge: "Data i kontekst",
            },
            {
              id: "processing",
              title: "Behandlingsmotorer",
              body: "Realtidsbehandling af hændelser, telemetri og procesdata",
            },
          ],
        },
        {
          id: "store",
          label: "Lagring",
          nodes: [
            {
              id: "container",
              title: "Kundens datacontainer",
              body: "Konfiguration, transaktioner og telemetri, dedikeret pr. kunde",
              badge: "Ingen delte data",
              highlight: true,
            },
            {
              id: "adx",
              title: "Procesdatalager",
              body: "Azure Data Explorer (ADX) til tidsseriedata",
            },
          ],
        },
        {
          id: "access",
          label: "Adgang",
          nodes: [
            {
              id: "portal",
              title: "Webportal",
              body: "Browserbaseret adgang på portal.optipeople.dk",
            },
            {
              id: "api",
              title: "Eksternt API",
              body: "REST API til dataeksport og integration",
            },
            {
              id: "mcp",
              title: "MCP-server",
              body: "Sikker adgang for AI-assistenter (MCP)",
            },
          ],
        },
      ],
    },
    consumers: {
      label: "Brugere og systemer",
      nodes: [
        {
          id: "team",
          title: "Jeres team",
          body: "Operatører, planlæggere og ledelse",
        },
        {
          id: "systems",
          title: "Jeres systemer og BI",
          body: "ERP- og MES-integration, Power BI-rapportering",
        },
        {
          id: "assistants",
          title: "AI-assistenter",
          body: "Claude, Copilot og andre MCP-værktøjer",
        },
      ],
    },
    assurances: [
      { title: "Microsoft Azure", body: "Cloud-hosting i enterprise-klasse" },
      {
        title: "Krypteret hele vejen",
        body: "TLS undervejs, krypteret når det ligger lagret",
      },
      {
        title: "Fuld dataisolation",
        body: "Dedikeret datacontainer pr. kunde",
      },
      {
        title: "Kontrolleret adgang",
        body: "Kun autentificerede og autoriserede endpoints",
      },
    ],
  },
}

/** The teal deep surface the platform page already wears (see lib/page-theme). */
const HIGHLIGHT_FILL = "#163b40"

const ZONE_LABEL =
  "text-[0.68rem] font-medium uppercase tracking-[0.16em] text-foreground/45"

const STAGE_LABEL =
  "text-[0.62rem] font-medium uppercase tracking-[0.16em] text-foreground/40"

function NodeCard({ node, className }: { node: NodeSpec; className?: string }) {
  const Icon = NODE_ICONS[node.id]
  const inverted = node.highlight === true

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl px-4 py-5 text-center",
        inverted
          ? "text-white shadow-[0_12px_34px_-20px_rgba(0,0,0,0.75)]"
          : "border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        className
      )}
      style={inverted ? { backgroundColor: HIGHLIGHT_FILL } : undefined}
    >
      <Icon
        className={cn("h-5 w-5", inverted ? undefined : "text-foreground/40")}
        style={inverted ? { color: "var(--green-system)" } : undefined}
        aria-hidden
      />
      <h3
        className={cn(
          "mt-3 text-sm font-medium leading-snug tracking-tight",
          inverted ? "text-white" : "text-foreground"
        )}
      >
        {node.title}
      </h3>
      <p
        className={cn(
          "mt-1.5 text-xs leading-relaxed",
          inverted ? "text-white/70" : "text-foreground/55"
        )}
      >
        {node.body}
      </p>
      {node.badge ? (
        <span
          className="mt-3 rounded-full px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.12em]"
          style={{
            backgroundColor: "var(--green-light2)",
            color: "var(--green-dark3)",
          }}
        >
          {node.badge}
        </span>
      ) : null}
    </div>
  )
}

/** The gap between two zones. A chevron, pointing down on a phone. */
function Flow() {
  return (
    <div className="flex items-center justify-center py-1 xl:py-0" aria-hidden>
      <ChevronRight className="h-5 w-5 rotate-90 text-foreground/25 xl:rotate-0" />
    </div>
  )
}

function Zone({ label, nodes }: { label: string; nodes: NodeSpec[] }) {
  return (
    <div className="flex flex-col rounded-[1.25rem] border border-black/[0.06] bg-white/70 p-4 xl:rounded-[1.5rem] xl:p-5">
      <p className={cn(ZONE_LABEL, "px-1")}>{label}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:flex xl:flex-1 xl:flex-col">
        {nodes.map((node) => (
          <NodeCard key={node.id} node={node} className="xl:flex-1" />
        ))}
      </div>
    </div>
  )
}

export function PlatformArchitecture({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale] ?? copy.en
  const { stages } = t.platform

  return (
    <section
      id="architecture"
      className="scroll-mt-24 bg-[var(--gray-1)] py-20 lg:py-28"
    >
      {/* Wider than the 1140px content column, like the flower above it: the
          diagram needs the room, while the heading still reads as page copy. */}
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:text-4xl">
            {t.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/60 lg:text-lg">
            {t.lede}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 lg:mt-16 xl:grid-cols-[minmax(0,0.92fr)_2.5rem_minmax(0,3.5fr)_2.5rem_minmax(0,0.92fr)] xl:items-stretch xl:gap-0">
          <Zone label={t.site.label} nodes={t.site.nodes} />
          <Flow />

          <div className="flex flex-col rounded-[1.25rem] border border-black/[0.06] bg-white/70 p-4 xl:rounded-[1.5rem] xl:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
              <p className={cn(ZONE_LABEL, "text-foreground/60")}>
                {t.platform.label}
              </p>
              <p className="text-[0.68rem] text-foreground/40">
                {t.platform.host}
              </p>
            </div>

            {/* Stage rail: one statement of direction for the whole panel,
                instead of an arrow between every pair of boxes. */}
            <div className="mt-5 hidden gap-3 xl:grid xl:grid-cols-4">
              {stages.map((stage, i) => (
                <div key={stage.id} className="flex items-center gap-2">
                  <span className={STAGE_LABEL}>{stage.label}</span>
                  <span className="h-px flex-1 bg-black/[0.09]" />
                  {i < stages.length - 1 ? (
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-foreground/25"
                      aria-hidden
                    />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:flex-1 xl:grid-cols-4 xl:items-stretch">
              {stages.map((stage) => (
                <div key={stage.id} className="flex flex-col gap-3 xl:justify-center">
                  <p className={cn(STAGE_LABEL, "xl:hidden")}>{stage.label}</p>
                  {stage.nodes.map((node) => (
                    <NodeCard key={node.id} node={node} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Flow />
          <Zone label={t.consumers.label} nodes={t.consumers.nodes} />
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-black/[0.08] pt-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {t.assurances.map((item) => (
            <li key={item.title} className="flex gap-3">
              <CircleCheck
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: "var(--green-system)" }}
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium tracking-tight text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
