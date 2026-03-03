import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Monitor,
  Gauge,
  Video,
  Leaf,
  BarChart3,
  Wrench,
} from "lucide-react"

const features = [
  {
    icon: Gauge,
    title: "OEE & Efficiency Monitoring",
    description:
      "Track availability, performance, and quality across every machine, line, and shift. Understand exactly where production time is gained and lost.",
  },
  {
    icon: Monitor,
    title: "Customizable Dashboards",
    description:
      "Give operators, managers, and directors the view they need. From shopfloor screens to boardroom reports — one platform, every perspective.",
  },
  {
    icon: Video,
    title: "Video-Linked Stop Analysis",
    description:
      "Combine stop-cause data with video feeds to see exactly what happened during a downtime event. Resolve disputes and train faster.",
  },
  {
    icon: Wrench,
    title: "Predictive Maintenance (TPM)",
    description:
      "Move from calendar-based to condition-based maintenance. Use telemetry data to predict failures before they disrupt production.",
  },
  {
    icon: Leaf,
    title: "Energy & Sustainability",
    description:
      "Track kWh per unit produced. Get data-driven insights to reduce energy consumption and CO2 emissions aligned with UN Sustainability Goals.",
  },
  {
    icon: BarChart3,
    title: "Automated Reporting",
    description:
      "Eliminate manual spreadsheets. Identify patterns, trends, and outliers automatically and deliver reports to stakeholders on schedule.",
  },
]

const metrics = [
  { metric: "Real-time", label: "Visibility across all operations" },
  { metric: "100%", label: "Paperless shopfloor data capture" },
  { metric: "Industry 5.0", label: "Human-centric manufacturing" },
]

const steps = [
  {
    title: "Connect",
    description:
      "Integrate your machines, sensors, and existing systems into a single cloud-based MES. No rip-and-replace — we build on what you have.",
  },
  {
    title: "Visualize",
    description:
      "Operators, managers, and directors each get accessible, actionable data — from live shopfloor dashboards to strategic KPI overviews.",
  },
  {
    title: "Optimize",
    description:
      "Use real-time data to eliminate guesswork, drive continuous improvement, and build a culture of informed decision-making across the organization.",
  },
]

export default function MesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">
            MES Module
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
            Your Cloud MES Platform
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A complete Manufacturing Execution System in the cloud. Collect
            efficiency, telemetry, and energy data — and turn it into actionable
            insight for every level of your organization.
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
            Manufacturing needs more than machines
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Industry 5.0 puts people back at the center. Your operators,
            managers, and directors need accessible, actionable data — not more
            complexity. OptiCloud bridges the gap between technology and human
            decision-making, giving every level of your organization the
            visibility to act with confidence.
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
            A complete MES — built for the cloud
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
              One platform, every perspective
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From the operator at the machine to the director in the boardroom
              — everyone sees the data they need, in the format that works for
              them.
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
