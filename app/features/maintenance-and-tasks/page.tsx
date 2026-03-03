import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Maintenance and Tasks | OptiPeople",
  description:
    "Plan and execute preventive maintenance based on usage and condition. Assign tasks, track completion, and reduce unplanned downtime.",
}

const capabilities = [
  {
    title: "One List for Every Task on the Floor",
    description:
      "Search, filter, and prioritize across all open tasks — by machine, urgency, or type. Operators see exactly what needs doing and how much time is left. No more whiteboards, no more forgotten follow-ups.",
    image: "/images/taskapp2.png",
    imageAlt:
      "Task list showing open maintenance tasks with search, filters, and remaining time for each task",
  },
  {
    title: "Maintenance Driven by Data, Not Calendars",
    description:
      "Schedule maintenance based on actual machine usage, run hours, and condition signals — not fixed intervals. When a threshold is reached, the task appears automatically. You maintain what needs it, when it needs it.",
    image: "/images/report1.png",
    imageAlt:
      "OEE report showing availability, performance, and timeline chart used to plan maintenance windows",
  },
  {
    title: "Close the Loop at the Machine",
    description:
      "When maintenance is complete and the machine checks out, operators see it immediately. Green status means ready to run. The feedback loop from task creation to verified completion happens in one system, with a full audit trail.",
    image: "/images/Everything-is-okay.png",
    imageAlt:
      "Operator panel showing green checkmark with everything is okay status after maintenance completion",
  },
]

const metrics = [
  { metric: "40%", label: "Reduction in unplanned downtime" },
  { metric: "3x", label: "More preventive vs. reactive maintenance" },
  { metric: "100%", label: "Task traceability and audit trail" },
]

const relatedFeatures = [
  {
    title: "Production Efficiency",
    description:
      "Track OEE live and see how maintenance impacts availability and performance.",
    href: "/features/production-efficiency",
  },
  {
    title: "Stop Cause Registration",
    description:
      "Capture downtime reasons at the source. Turn stop data into maintenance priorities.",
    href: "/features/stop-cause-registration",
  },
  {
    title: "Energy and Telemetry",
    description:
      "Monitor vibration, temperature, and energy to trigger condition-based maintenance.",
    href: "/features/energy-and-telemetry",
  },
]

export default function MaintenanceAndTasksPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link
              href="/modules/production"
              className="hover:text-foreground transition-colors"
            >
              Production
            </Link>
            <span>/</span>
            <span className="text-foreground">Maintenance and Tasks</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                Maintenance and Tasks
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
                Fix Things Before They Break
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Plan and execute preventive maintenance based on real usage and
                condition. Assign tasks, track completion, and turn reactive
                firefighting into structured prevention.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Request a Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#capabilities">See How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
              <Image
                src="/images/taskapp2.png"
                alt="OptiPeople task management interface showing filterable task list with progress tracking"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Unplanned stops are the most expensive kind
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Every unplanned stop costs more than a planned one — in lost
            production, emergency parts, and scrambled schedules. Most factories
            know this but still run maintenance off spreadsheets and memory.
            OptiPeople puts every task in one place, triggered by real machine
            data, tracked to completion.
          </p>
        </div>
      </section>

      {/* Capabilities Deep Dive */}
      <section
        id="capabilities"
        className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              From condition signal to completed task
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A maintenance workflow that starts with the machine and ends with
              a verified fix — no paper, no guesswork.
            </p>
          </div>
          <div className="space-y-16 lg:space-y-24">
            {capabilities.map((capability, i) => (
              <div
                key={capability.title}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <h3 className="text-2xl lg:text-3xl font-light tracking-tight">
                    {capability.title}
                  </h3>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                  <Image
                    src={capability.image}
                    alt={capability.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
            Typical Results
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 text-center">
            {metrics.map((item) => (
              <div key={item.label}>
                <p className="text-5xl lg:text-6xl font-extralight text-primary tracking-tight">
                  {item.metric}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Features */}
      <section className="py-12 lg:py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl lg:text-3xl font-light text-center mb-12">
            Related Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedFeatures.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group block p-6 rounded-xl bg-background border border-border/50 hover:border-border transition-colors"
              >
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
