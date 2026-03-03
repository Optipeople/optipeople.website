import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Activity,
  Gauge,
  Clock,
  BarChart3,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

const features = [
  {
    icon: Gauge,
    title: "Live OEE Dashboards",
    description:
      "See availability, performance, and quality in real time across every machine, line, and shift. No more waiting for end-of-day reports.",
  },
  {
    icon: AlertTriangle,
    title: "Stop Cause Registration",
    description:
      "Operators register downtime reasons directly at the machine. Clean, structured data you can actually use to drive improvements.",
  },
  {
    icon: Clock,
    title: "Work Order Tracking",
    description:
      "Track production orders from start to finish. Know exactly where each order stands and how it compares to plan.",
  },
  {
    icon: Activity,
    title: "Shift Performance",
    description:
      "Compare performance across shifts, teams, and time periods. Identify best practices and replicate success across the organization.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description:
      "Run targeted improvement cycles with data. Track the impact of every change and build a culture of measurable progress.",
  },
  {
    icon: BarChart3,
    title: "Production Reports",
    description:
      "Automated daily, weekly, and monthly reports delivered to stakeholders with the KPIs that matter most.",
  },
]

const metrics = [
  { metric: "15–25%", label: "OEE improvement in first year" },
  { metric: "40%", label: "Reduction in unplanned downtime" },
  { metric: "2 hrs", label: "Saved daily on manual reporting" },
]

const steps = [
  {
    title: "Connect",
    description:
      "We integrate with your existing machines and PLCs — no production disruption, no hardware overhaul.",
  },
  {
    title: "Visualize",
    description:
      "Your team gets a live dashboard from day one. Real-time OEE, stop causes, and shift performance — all in one place.",
  },
  {
    title: "Improve",
    description:
      "Use the data to run targeted improvement cycles. Track the impact of every change you make.",
  },
]

export default function ProductionPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">
            Production Module
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
            See Where Production Time Is Lost
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Track OEE in real time and understand exactly where production time
            disappears. Stop guessing, start improving.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Request a Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#capabilities">See Capabilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem / Context */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Your production data shouldn&apos;t live in spreadsheets
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Most factories still rely on manual logs, whiteboards, and
            end-of-shift reports to understand what happened on the floor. By the
            time the data reaches a decision-maker, the moment to act has
            passed. The Production module replaces guesswork with live signals
            from every machine, every shift.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section
        id="capabilities"
        className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
            Everything you need for production visibility
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="space-y-3">
                <div className="p-2.5 rounded-xl bg-primary/10 w-fit">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Visual */}
      <section className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              One dashboard for your entire production
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From individual machines to plant-wide KPIs — drill into the data
              that matters, at any level.
            </p>
          </div>
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)] bg-muted/30 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Product screenshot
            </p>
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

      {/* How It Works */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="text-4xl font-extralight text-primary mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
