import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Wrench,
  Calendar,
  Bell,
  Smartphone,
  History,
  Settings,
} from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Preventive Scheduling",
    description:
      "Plan maintenance based on operating hours, production cycles, or calendar intervals. Never miss a scheduled service again.",
  },
  {
    icon: Bell,
    title: "Predictive Alerts",
    description:
      "Get notified before breakdowns happen. Combine sensor data with usage patterns to predict when maintenance is needed.",
  },
  {
    icon: Smartphone,
    title: "Mobile Task Management",
    description:
      "Technicians receive and complete tasks on mobile devices. Capture notes, photos, and completion data directly in the field.",
  },
  {
    icon: Wrench,
    title: "Spare Parts Tracking",
    description:
      "Link maintenance tasks to spare parts inventory. Know what you need before you need it and avoid costly production stops.",
  },
  {
    icon: History,
    title: "Maintenance History",
    description:
      "Full history of every maintenance event per machine. Understand patterns, predict failures, and optimize service intervals.",
  },
  {
    icon: Settings,
    title: "Equipment Management",
    description:
      "Centralized equipment register with documentation, manuals, and service records. Everything your team needs in one place.",
  },
]

const metrics = [
  { metric: "50%", label: "Reduction in unplanned downtime" },
  { metric: "40 hrs", label: "Extra production hours per year" },
  { metric: "30%", label: "Fewer emergency service calls" },
]

const steps = [
  {
    title: "Register",
    description:
      "Add your equipment and define maintenance plans based on usage, condition, or fixed intervals.",
  },
  {
    title: "Monitor",
    description:
      "Track machine health through sensor data and operating hours. Get alerts when maintenance is due or anomalies are detected.",
  },
  {
    title: "Prevent",
    description:
      "Shift from reactive to preventive maintenance. Reduce breakdowns, extend equipment life, and lower total cost of ownership.",
  },
]

export default function MaintenancePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">
            Maintenance Module
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
            Fix It Before It Breaks
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Move from reactive firefighting to planned maintenance. Reduce
            unplanned downtime and extend equipment life.
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
            Maintenance shouldn&apos;t be a fire drill
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            When maintenance is reactive, every breakdown is an emergency.
            Technicians scramble, production stops, and costs spiral. The
            Maintenance module gives your team the tools to plan ahead, track
            tasks, and prevent problems before they impact the line.
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
            Everything you need for proactive maintenance
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
              Maintenance planning made visible
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              See upcoming tasks, overdue items, and machine health status at a
              glance — across your entire facility.
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
