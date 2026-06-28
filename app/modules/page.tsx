import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Modules",
  description:
    "Explore the OptiPeople modules — production, quality, maintenance, energy, analysis, IoT, ERP shopfloor, and MES — on one connected platform.",
  path: "/modules",
})

const modules = [
  {
    title: "Production",
    href: "/modules/production",
    description: "Live OEE, downtime, orders, and shift performance.",
  },
  {
    title: "Quality",
    href: "/modules/quality",
    description: "Digital checks, deviations, and full traceability.",
  },
  {
    title: "Maintenance",
    href: "/modules/maintenance",
    description: "Preventive planning and mobile task management.",
  },
  {
    title: "Energy",
    href: "/modules/energy",
    description: "Energy consumption connected to production output.",
  },
  {
    title: "Analysis",
    href: "/modules/analysis",
    description: "Automated reports on performance, loss, and cost.",
  },
  {
    title: "IoT",
    href: "/modules/iot",
    description: "Connect new and legacy machines, sensors, and protocols.",
  },
  {
    title: "ERP Shopfloor",
    href: "/modules/erp-shopfloor",
    description: "Two-way sync between ERP planning and the floor.",
  },
  {
    title: "MES",
    href: "/modules/mes",
    description: "A cloud-based Manufacturing Execution System.",
  },
]

export default function ModulesPage() {
  return (
    <main className="min-h-screen px-6 lg:px-8 pt-16 sm:pt-24 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
          Modules
        </p>
        <h1 className="text-4xl sm:text-5xl tracking-tight text-[var(--gray-10)] leading-tight font-extralight">
          One platform, every part of production
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl">
          Each module solves a specific operational need, and together they give
          you a single, connected view of the shopfloor.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {modules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="group rounded-lg border border-border/60 p-6 transition-colors hover:border-primary/50"
            >
              <h2 className="flex items-center gap-2 text-lg font-medium">
                {module.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {module.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
