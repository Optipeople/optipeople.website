import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Machine Control | OptiPeople",
  description:
    "Integrate with machine control systems to enable feedback, automation, and tighter production loops across the factory.",
}

const capabilities = [
  {
    title: "Secure Machine Authentication",
    description:
      "Every operator authenticates at the machine with a unique key before starting production. You know who is running what, when, and on which machine — creating accountability and traceability from the first moment of a shift.",
    image: "/images/Login-Machine-Key.png",
    imageAlt:
      "Machine key authentication screen where operators enter their unique key to access the machine",
  },
  {
    title: "Start, Stop, and Status in One Place",
    description:
      "Operators control machine start and stop directly from the panel. The system confirms the machine is ready, the operator is authenticated, and all prerequisites are met. One tap to start production — with a full digital trail.",
    image: "/images/Start-Machine.png",
    imageAlt:
      "Operator panel showing the start machine button with green indicator for a Homag machine",
  },
  {
    title: "Real-Time Feedback to the Floor",
    description:
      "Machine status flows back to the operator in real time. Green means everything checks out. When conditions change — a sensor threshold, a quality alert, a maintenance trigger — the operator sees it immediately. No surprises, no lag between event and awareness.",
    image: "/images/Everything-is-okay.png",
    imageAlt:
      "Operator panel showing green checkmark with everything is okay confirmation for a Homag machine",
  },
]

const metrics = [
  { metric: "100%", label: "Digital traceability of operator-machine sessions" },
  { metric: "< 1s", label: "Machine event to operator notification" },
  { metric: "0", label: "Paper-based machine logs needed" },
]

const relatedFeatures = [
  {
    title: "Stop Cause Registration",
    description:
      "When a machine stops, the control integration triggers stop registration automatically.",
    href: "/features/stop-cause-registration",
  },
  {
    title: "Maintenance and Tasks",
    description:
      "Machine signals trigger maintenance tasks when thresholds are reached.",
    href: "/features/maintenance-and-tasks",
  },
  {
    title: "Energy and Telemetry",
    description:
      "Sensor data from the machine control layer feeds directly into telemetry dashboards.",
    href: "/features/energy-and-telemetry",
  },
]

export default function MachineControlPage() {
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
            <span className="text-foreground">Machine Control</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                Machine Control
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
                Close the Loop Between System and Floor
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Integrate with machine control systems to enable operator
                authentication, real-time feedback, and tighter production
                loops across the factory.
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
                src="/images/Start-Machine.png"
                alt="OptiPeople machine control panel showing the start machine interface for a Homag machine"
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
            Data collection starts at the machine — control should too
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            When your production system and your machine control live in
            separate worlds, gaps appear. Operators work without feedback.
            Events go unrecorded. Start and stop times drift from reality.
            OptiPeople connects directly to the machine control layer — so the
            digital system and the physical factory move together.
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
              From machine signal to operator action and back
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A two-way connection between your production system and every
              machine on the floor.
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
