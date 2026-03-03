import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Energy and Telemetry | OptiPeople",
  description:
    "Connect energy, vibration, flow, and temperature directly to production. Identify waste, anomalies, and optimization opportunities.",
}

const capabilities = [
  {
    title: "Live Sensor Readings, Right at the Machine",
    description:
      "Temperature, humidity, pressure, vibration — displayed in real time on the operator panel. No separate monitoring system, no switching between screens. The operator sees what the machine feels.",
    image: "/images/Telemetry-Numbers.png",
    imageAlt:
      "Operator panel showing live temperature at 182 degrees and humidity at 41 percent for a Homag machine",
  },
  {
    title: "Energy Consumption by Machine, by Hour",
    description:
      "Track kWh for every connected machine over time. See exactly when energy spikes happen and correlate them with production events. Identify machines that consume more than they should — idle, in setup, or under load.",
    image: "/images/Telemetry-Chart.png",
    imageAlt:
      "Energy chart showing kWh consumption over 48 hours for a Felder sliding table saw",
  },
  {
    title: "Sensor Data Meets Production Data",
    description:
      "Energy and telemetry don't live in isolation. OptiPeople connects sensor readings directly to OEE, stop events, and shift data — so you can answer questions like: how much energy did that unplanned stop cost? Which shift runs most efficiently?",
    image: "/images/report-mockrup-3.png",
    imageAlt:
      "Dashboard combining telemetry readings with OEE gauges and production performance metrics",
  },
]

const metrics = [
  { metric: "15%", label: "Average energy savings identified" },
  { metric: "24/7", label: "Continuous condition monitoring" },
  { metric: "< 1s", label: "Sensor-to-dashboard latency" },
]

const relatedFeatures = [
  {
    title: "Production Efficiency",
    description:
      "Combine energy data with OEE to understand the true cost of production losses.",
    href: "/features/production-efficiency",
  },
  {
    title: "Maintenance and Tasks",
    description:
      "Trigger condition-based maintenance from vibration, temperature, or energy anomalies.",
    href: "/features/maintenance-and-tasks",
  },
  {
    title: "AI and Copilots",
    description:
      "Let AI detect patterns in telemetry data that humans would miss.",
    href: "/features/ai-and-copilots",
  },
]

export default function EnergyAndTelemetryPage() {
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
            <span className="text-foreground">Energy and Telemetry</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                Energy and Telemetry
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
                Know What Your Machines Are Feeling
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Connect energy, vibration, flow, and temperature directly to
                production. Spot waste, catch anomalies early, and find
                optimization opportunities hiding in the data.
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
                src="/images/report-mockrup-3.png"
                alt="OptiPeople energy dashboard showing temperature, kWh readings, and OEE performance gauges"
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
            Energy and condition data without a separate system
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Most factories monitor energy in one system, production in another,
            and machine health in a third — if at all. That separation makes it
            impossible to connect cause and effect. OptiPeople brings sensor
            data into the same platform as your production data, so every
            reading has context.
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
              Every sensor signal, connected to production
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Temperature, energy, vibration, flow — captured at the machine
              and linked to the production events that explain them.
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
