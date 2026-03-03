import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Cpu,
  Cog,
  Cable,
  MonitorCog,
  ScanLine,
  ShieldCheck,
} from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "PLC Programming",
    description:
      "Custom PLC development for Siemens, Allen-Bradley, Beckhoff, and more. From new builds to retrofits — we write the logic that keeps your machines running.",
  },
  {
    icon: Cog,
    title: "Machine Control Systems",
    description:
      "End-to-end machine control design including motion control, servo drives, and coordinated multi-axis systems tailored to your process.",
  },
  {
    icon: MonitorCog,
    title: "HMI & SCADA Development",
    description:
      "Intuitive operator interfaces and supervisory systems that give your team real-time visibility and control over every machine and line.",
  },
  {
    icon: Cable,
    title: "Electrical Design & Panel Build",
    description:
      "Complete electrical schematics, control panel design, and build — fully documented and compliant with relevant standards.",
  },
  {
    icon: ScanLine,
    title: "System Integration",
    description:
      "Connect PLCs, robots, vision systems, and instrumentation into a unified control architecture. We bridge the gap between isolated machines and coordinated production.",
  },
  {
    icon: ShieldCheck,
    title: "Safety Systems",
    description:
      "Functional safety design and implementation including safety PLCs, risk assessments, and CE marking support to keep your people and processes protected.",
  },
]

const metrics = [
  { metric: "30%", label: "Faster cycle times after automation upgrades" },
  { metric: "99.5%", label: "Uptime on systems we commission" },
  { metric: "0", label: "Production stopped for retrofit projects" },
]

const steps = [
  {
    title: "Scope",
    description:
      "We assess your current setup, define requirements, and design an automation solution that fits your process — not the other way around.",
  },
  {
    title: "Build",
    description:
      "PLC programming, electrical design, panel build, and HMI development — all handled in-house with full documentation and factory acceptance testing.",
  },
  {
    title: "Commission",
    description:
      "On-site installation, commissioning, and operator training. We stay until the system runs reliably and your team is confident.",
  },
]

export default function AutomationPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">
            Automation
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
            Automation and Control, Built for Production
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We design, program, and commission automation systems — from PLC
            logic and machine control to full production line integration.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Discuss Your Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#capabilities">See Our Capabilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem / Context */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Machines should work for you — not against you
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re building a new machine, upgrading an aging
            control system, or integrating equipment into a production line —
            getting automation right is critical. Poor control logic, unreliable
            wiring, or disconnected systems cost you uptime, quality, and
            throughput. We bring the engineering discipline to get it right the
            first time.
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
            Full-scope automation engineering
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
              From concept to commissioned system
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We handle the full lifecycle — electrical design, PLC programming,
              panel builds, HMI screens, and on-site commissioning.
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
