import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Features",
  description:
    "Explore OptiPeople features — from production efficiency and stop-cause registration to AI copilots and machine control.",
  path: "/features",
})

const features = [
  {
    title: "Production efficiency",
    href: "/features/production-efficiency",
    description: "Track OEE live across shifts, lines, and machines.",
  },
  {
    title: "Stop-cause registration",
    href: "/features/stop-cause-registration",
    description: "Capture downtime causes at the source, on the machine.",
  },
  {
    title: "Maintenance & tasks",
    href: "/features/maintenance-and-tasks",
    description: "Plan preventive maintenance by usage and condition.",
  },
  {
    title: "Quality management",
    href: "/features/quality-management",
    description: "Register quality data where the work happens.",
  },
  {
    title: "Analysis & reporting",
    href: "/features/analysis-and-reporting",
    description: "Turn production data into clear reports.",
  },
  {
    title: "Energy & telemetry",
    href: "/features/energy-and-telemetry",
    description: "Connect energy, vibration, flow, and temperature data.",
  },
  {
    title: "AI & copilots",
    href: "/features/ai-and-copilots",
    description: "Ask questions and find patterns in your own data.",
  },
  {
    title: "Machine control",
    href: "/features/machine-control",
    description: "Integrate with machine controls for tighter loops.",
  },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen px-6 lg:px-8 pt-16 sm:pt-24 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
          Features
        </p>
        <h1 className="text-4xl sm:text-5xl tracking-tight text-[var(--gray-10)] leading-tight font-extralight">
          From raw machine signals to real understanding
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl">
          Explore the capabilities that make production visible, measurable, and
          improvable — every day.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group rounded-lg border border-border/60 p-6 transition-colors hover:border-primary/50"
            >
              <h2 className="flex items-center gap-2 text-lg font-medium">
                {feature.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
