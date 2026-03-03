import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Stop Cause Registration | OptiPeople",
  description:
    "Make downtime visible at the source. Operators register stops directly at the machine, giving you clean data you can actually act on.",
}

const capabilities = [
  {
    title: "The Machine Tells You First",
    description:
      "When a machine stops, the operator panel turns red immediately. No ambiguity, no delay. The operator taps the screen to acknowledge the stop and begin registration — right there, right then, while the context is fresh.",
    image: "/images/Stop-Screen-Red.png",
    imageAlt:
      "Operator panel showing red alert screen with the message the machine is stopped",
  },
  {
    title: "Every Stop Gets a Reason",
    description:
      "Operators pick from a predefined list of stop causes — tailored to each machine. Setup, tool change, material wait, malfunction. Each entry captures the reason, duration, and optional notes. The result is structured data, not free-text guesswork.",
    image: "/images/operatorpanel2.png",
    imageAlt:
      "Detailed stop log showing stop reasons, telemetry data, and operator notes across shifts",
  },
  {
    title: "A Complete Picture of Every Shift",
    description:
      "All stops appear on a color-coded timeline — filterable by shift, machine, and severity. Hover over any block to see exactly what happened, when, and for how long. Patterns that were invisible in shift handover notes become obvious at a glance.",
    image: "/images/Stop-Screen-Timeline.png",
    imageAlt:
      "Color-coded stop timeline showing all stops across a shift with details on hover",
  },
]

const metrics = [
  { metric: "40%", label: "Reduction in unplanned downtime" },
  { metric: "95%+", label: "Stop cause capture rate" },
  { metric: "< 10s", label: "Average time to register a stop" },
]

const relatedFeatures = [
  {
    title: "Production Efficiency",
    description:
      "Track OEE live and understand performance across shifts, lines, and machines.",
    href: "/features/production-efficiency",
  },
  {
    title: "Maintenance and Tasks",
    description:
      "Plan and execute preventive maintenance based on usage and condition.",
    href: "/features/maintenance-and-tasks",
  },
  {
    title: "Analysis and Reporting",
    description:
      "Turn production data into clear reports on performance, losses, and cost drivers.",
    href: "/features/analysis-and-reporting",
  },
]

export default function StopCauseRegistrationPage() {
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
            <span className="text-foreground">Stop Cause Registration</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                Stop Cause Registration
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
                Make Downtime Visible at the Source
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Operators register stops directly at the machine — while the
                context is fresh. You get clean, structured data you can
                actually act on.
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
                src="/images/Stop-Screen-Select.png"
                alt="Operator panel showing stop cause selection screen with predefined reason categories"
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
            You can&apos;t fix what you can&apos;t see
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Most downtime goes unrecorded or gets lumped into vague categories
            after the fact. Without clean stop data, improvement projects are
            based on gut feeling instead of evidence. Stop Cause Registration
            captures every stop, every reason, every time — so you know exactly
            where to focus.
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
              From machine stop to structured data in seconds
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A three-step flow that turns every downtime event into data your
              team can learn from.
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

      {/* Product Showcase */}
      <section className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              Stop data feeds the bigger picture
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every registered stop flows into your production dashboard.
              Machine status, timelines, and performance metrics update in real
              time — giving the full story behind the numbers.
            </p>
          </div>
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            <Image
              src="/images/dashboard1.png"
              alt="Live production status dashboard showing machine states, timeline, and unit per hour chart"
              fill
              className="object-cover"
            />
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
