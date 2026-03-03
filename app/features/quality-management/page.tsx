import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Quality Management | OptiPeople",
  description:
    "Register quality data where it happens. Trace deviations back to machines, batches, and shifts — and build accountability into production.",
}

const capabilities = [
  {
    title: "Register Quality Events at the Machine",
    description:
      "Operators log deviations, scrap, and rework directly at the point of production. Every entry is timestamped and linked to the machine, order, and shift — so nothing gets lost between the floor and the office.",
    image: "/images/operatorpanel2.png",
    imageAlt:
      "Operator panel showing detailed event log with quality notes, telemetry data, and shift information",
  },
  {
    title: "Trace Every Deviation to Its Source",
    description:
      "When quality drops, you need to know why — fast. Filter by machine, time range, and event type to see exactly where deviations cluster. Connect quality issues to specific batches, operators, and conditions.",
    image: "/images/report1.png",
    imageAlt:
      "OptiPeople report showing OEE breakdown with availability, performance, and quality metrics alongside a timeline chart",
  },
  {
    title: "Full Audit Trail, Always Available",
    description:
      "Every quality event, every change, every action is logged with who did what and when. Search and filter the complete activity history across machines and sites. Ready for audits, ready for continuous improvement.",
    image: "/images/backoffice1.png",
    imageAlt:
      "Admin panel showing activity log with date range filters and a device list with machine IDs and locations",
  },
]

const metrics = [
  { metric: "30%", label: "Reduction in quality-related scrap" },
  { metric: "100%", label: "Traceability across machines and shifts" },
  { metric: "< 5 min", label: "From deviation to documented root cause" },
]

const relatedFeatures = [
  {
    title: "Production Efficiency",
    description:
      "Track OEE live — quality is one of the three pillars of overall equipment effectiveness.",
    href: "/features/production-efficiency",
  },
  {
    title: "Stop Cause Registration",
    description:
      "Capture downtime reasons alongside quality events for a complete production picture.",
    href: "/features/stop-cause-registration",
  },
  {
    title: "Analysis and Reporting",
    description:
      "Turn quality data into trend reports that drive continuous improvement.",
    href: "/features/analysis-and-reporting",
  },
]

export default function QualityManagementPage() {
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
            <span className="text-foreground">Quality Management</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                Quality Management
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
                Catch Quality Issues Where They Start
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Register quality data at the machine, trace deviations back to
                their source, and build accountability into every shift.
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
                src="/images/backoffice1.png"
                alt="OptiPeople quality tracking interface showing audit trail and device management"
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
            Quality problems found late cost ten times more
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            When quality data lives in paper forms and disconnected systems,
            deviations surface too late to prevent waste. By the time the report
            reaches quality management, the batch is finished and the damage is
            done. OptiPeople captures quality events in real time — linked to
            the machine, the shift, and the conditions that caused them.
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
              From floor event to traceable record
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality data captured at the source, structured for analysis, and
              always audit-ready.
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
