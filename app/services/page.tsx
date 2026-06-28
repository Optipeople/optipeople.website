import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Explore OptiPeople services for smart operations, industrial automation, business intelligence, and AI solutions in manufacturing.",
  path: "/services",
})

const services = [
  {
    title: "Smart Operations",
    href: "/services/smart-operations",
    description:
      "Real-time data, OEE, dashboards, and shopfloor visibility that turn machine signals into better decisions.",
  },
  {
    title: "Automation",
    href: "/services/automation",
    description:
      "PLC, HMI, SCADA, and machine control engineering built to run reliably in production.",
  },
  {
    title: "Business Intelligence",
    href: "/services/business-intelligence",
    description:
      "Power BI dashboards, data models, and automated reporting that bring scattered data into one view.",
  },
  {
    title: "AI Agentic Solutions",
    href: "/services/ai-solutions",
    description:
      "AI agents and copilots that work close to your operations and your production data.",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-6 lg:px-8 pt-16 sm:pt-24 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
          Services
        </p>
        <h1 className="text-4xl sm:text-5xl tracking-tight text-[var(--gray-10)] leading-tight font-extralight">
          Services that move operations from idea to result
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl">
          From strategy to implementation, we help manufacturers connect
          machines, build the data foundation, automate processes, and make
          insight usable in everyday work.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group rounded-lg border border-border/60 p-6 transition-colors hover:border-primary/50"
            >
              <h2 className="flex items-center gap-2 text-lg font-medium">
                {service.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
