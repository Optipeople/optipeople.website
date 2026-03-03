import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Zap,
  Thermometer,
  AlertTriangle,
  BarChart3,
  Activity,
  Leaf,
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Real-Time kWh Tracking",
    description:
      "Monitor energy consumption per machine, line, or facility in real time. Understand exactly where energy is used — and wasted.",
  },
  {
    icon: Thermometer,
    title: "Sensor Telemetry",
    description:
      "Connect temperature, vibration, flow, and pressure sensors directly to production. See the full picture beyond just energy.",
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description:
      "Automatically detect unusual consumption patterns. Get alerted to leaks, inefficiencies, or equipment degradation early.",
  },
  {
    icon: Activity,
    title: "Energy per Unit Produced",
    description:
      "Link energy consumption to production output. Understand your true cost per unit and identify optimization opportunities.",
  },
  {
    icon: Leaf,
    title: "Sustainability Reporting",
    description:
      "Generate energy and carbon reports for ESG compliance. Track progress against sustainability targets with real data.",
  },
  {
    icon: BarChart3,
    title: "Benchmarking",
    description:
      "Compare energy performance across machines, shifts, and time periods. Identify best performers and replicate their patterns.",
  },
]

const metrics = [
  { metric: "10–20%", label: "Reduction in energy consumption" },
  { metric: "Real-time", label: "Visibility into energy waste" },
  { metric: "100%", label: "ESG reporting data coverage" },
]

const steps = [
  {
    title: "Measure",
    description:
      "Connect energy meters and sensors to your machines. Start collecting granular consumption data automatically.",
  },
  {
    title: "Analyze",
    description:
      "See energy consumption per machine, per shift, and per unit produced. Identify waste patterns and anomalies.",
  },
  {
    title: "Optimize",
    description:
      "Act on insights to reduce consumption, lower costs, and meet sustainability targets with measurable results.",
  },
]

export default function EnergyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">
            Energy Module
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
            Cut Waste, Not Corners
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Connect energy consumption directly to production output. Find
            anomalies and optimization opportunities automatically.
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
            You can&apos;t reduce what you can&apos;t see
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Energy is often the second-largest cost in manufacturing — yet most
            factories have no visibility into where it goes. Monthly utility
            bills tell you nothing about which machines waste energy or when
            consumption spikes. The Energy module connects real-time
            consumption data directly to your production.
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
            Everything you need for energy transparency
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
              Energy data meets production data
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              See energy consumption alongside production output, machine status,
              and environmental conditions in one unified view.
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
