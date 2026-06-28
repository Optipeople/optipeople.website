import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "OptiPeople solutions for manufacturers, OEMs and machine builders, and service and aftermarket teams.",
  path: "/solutions",
})

const solutions = [
  {
    title: "For manufacturers",
    href: "/solutions/manufacturing",
    description:
      "Know your factory in real time with connected machines, OEE, quality, energy, and maintenance.",
  },
  {
    title: "For OEMs & machine builders",
    href: "/solutions/oems",
    description:
      "Turn machines into connected platforms with remote diagnostics and digital service revenue.",
  },
  {
    title: "For service & aftermarket",
    href: "/solutions/service",
    description:
      "Give service teams visibility into machine health and solve issues before customers notice.",
  },
]

export default function SolutionsPage() {
  return (
    <main className="min-h-screen px-6 lg:px-8 pt-16 sm:pt-24 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
          Solutions
        </p>
        <h1 className="text-4xl sm:text-5xl tracking-tight text-[var(--gray-10)] leading-tight font-extralight">
          Built for how you make and service products
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl">
          Whether you run a factory, build machines, or service an installed
          base, OptiPeople gives you the operational data to act faster.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {solutions.map((solution) => (
            <Link
              key={solution.href}
              href={solution.href}
              className="group rounded-lg border border-border/60 p-6 transition-colors hover:border-primary/50"
            >
              <h2 className="flex items-center gap-2 text-lg font-medium">
                {solution.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {solution.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
