import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Wifi,
  Cpu,
  Cable,
  Layers,
  RefreshCw,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: Cable,
    title: "Plug-and-Play Connectors",
    description:
      "Pre-built connectors for Siemens, Fanuc, Mitsubishi, OPC-UA, MQTT, and more. Get machines online in hours, not weeks.",
  },
  {
    icon: Cpu,
    title: "Protocol-Agnostic Ingestion",
    description:
      "Speak every machine language. Whether it's Modbus, Profinet, EtherNet/IP, or a proprietary protocol — we handle translation.",
  },
  {
    icon: Wifi,
    title: "Edge Data Collection",
    description:
      "Deploy lightweight edge gateways that collect, buffer, and forward data — even when connectivity is intermittent.",
  },
  {
    icon: Layers,
    title: "Legacy Equipment Support",
    description:
      "Don't leave older machines behind. Use sensors and I/O modules to bring any equipment into the digital world.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Data Streaming",
    description:
      "Stream machine signals at sub-second intervals. Get the resolution you need for accurate OEE, cycle times, and alarms.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "All data is encrypted in transit and at rest. On-premise edge processing means sensitive data stays within your network.",
  },
]

const metrics = [
  { metric: "200+", label: "Machine types connected" },
  { metric: "<1 day", label: "Typical time to first data" },
  { metric: "99.9%", label: "Data capture uptime" },
]

const steps = [
  {
    title: "Connect",
    description:
      "Install an edge gateway on-site and configure machine connections using our library of pre-built connectors.",
  },
  {
    title: "Ingest",
    description:
      "Machine signals, sensor readings, and system data flow into OptiCloud automatically — structured and ready to use.",
  },
  {
    title: "Activate",
    description:
      "With data flowing, activate any OptiCloud module — Production, Quality, Maintenance, Energy, or Analysis — instantly.",
  },
]

export default function IoTPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8 bg-primary">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-white/90 mb-4">
            IoT Module
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight text-white">
            Get Data from Anything
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Connect any machine, sensor, or system to your platform. Ingest data
            from PLCs, IoT gateways, and legacy equipment — no matter the
            protocol or age.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Request a Demo</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/30 text-white shadow-none hover:bg-white/20 hover:text-white"
            >
              <Link href="#capabilities">See Capabilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem / Context */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Data collection shouldn&apos;t be the hard part
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Most factories run dozens of machines from different manufacturers,
            generations, and protocols. Getting reliable data from all of them
            into one place is the biggest barrier to digitalization. The IoT
            module removes that barrier — so you can focus on insights, not
            infrastructure.
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
            Everything you need to get machines online
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
              One gateway, every machine
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              See all connected equipment, data streams, and signal health in a
              single overview — from CNC machines to packaging lines.
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
