import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  Activity,
  Gauge,
  Wrench,
  BarChart3,
  Radio,
  Bell,
} from "lucide-react"

export const metadata = {
  title: "Manufacturing Solutions | OptiPeople",
  description:
    "Connect machines, track OEE in real time, and run your production floor with data. See how OptiPeople helps manufacturing companies improve visibility and reduce downtime.",
}

const features = [
  {
    icon: Activity,
    title: "Live Production Monitoring",
    description:
      "See machine status, production counts, and line performance in real time. Know what is running, what is stopped, and why.",
  },
  {
    icon: Gauge,
    title: "Automatic OEE Tracking",
    description:
      "Availability, performance, and quality calculated automatically. Drill down by shift, line, or machine without touching a spreadsheet.",
  },
  {
    icon: Wrench,
    title: "Stop Cause Registration",
    description:
      "Operators register downtime reasons at the machine. You get clean data on where time is lost and can prioritize the improvements that matter.",
  },
  {
    icon: BarChart3,
    title: "Shift and Production Reports",
    description:
      "Automated daily, weekly, and monthly reports delivered to the right people. No manual compilation, no conflicting numbers.",
  },
  {
    icon: Radio,
    title: "Machine Connectivity",
    description:
      "Connect any machine — new or legacy — through OPC-UA, Modbus, IO-Link, or simple sensor kits. No rip-and-replace required.",
  },
  {
    icon: Bell,
    title: "Smart Alerts and Escalation",
    description:
      "Get notified the moment a line goes down or performance drops below target. Route alerts to the right person automatically.",
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
      "We integrate with your existing machines and PLCs. No production disruption, no hardware overhaul.",
  },
  {
    title: "Visualize",
    description:
      "Your team gets a live dashboard from day one. Real-time OEE, stop causes, and shift performance in one place.",
  },
  {
    title: "Improve",
    description:
      "Use the data to run targeted improvement cycles. Track the impact of every change you make.",
  },
]

export default function ManufacturingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8 bg-primary">
        <Image
          src="/images/default-hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-white/90 mb-4">
            For Manufacturing Companies
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight text-white">
            Know Your Factory. In Real Time.
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Connect every machine, capture production data automatically, and
            give your team the visibility to act on problems while they still
            matter.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Request a Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white shadow-none hover:bg-white/20 hover:text-white">
              <Link href="#capabilities">See Capabilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem / Context */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Most factories still run on yesterday&apos;s numbers
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Shift reports arrive late. Downtime reasons live in notebooks. OEE
            is calculated in spreadsheets that nobody trusts. By the time you see
            the data, the moment to act has already passed. OptiPeople replaces
            guesswork with live signals from every machine, every shift, every
            line.
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
            Everything you need for a data-driven factory floor
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
              One dashboard for your entire operation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From individual machines to plant-wide KPIs — drill into the data
              that matters, at any level.
            </p>
          </div>
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            <Image
              src="/images/dashboard2.png"
              alt="OptiPeople manufacturing dashboard showing production monitoring, OEE gauges, and machine status across multiple views"
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
