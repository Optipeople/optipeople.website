import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ClipboardCheck,
  Search,
  AlertCircle,
  ShieldCheck,
  FileText,
  GitBranch,
} from "lucide-react"

const features = [
  {
    icon: ClipboardCheck,
    title: "Digital Inspections",
    description:
      "Replace paper checklists with digital quality forms. Capture data at the source with guided workflows and mandatory checkpoints.",
  },
  {
    icon: GitBranch,
    title: "Full Traceability",
    description:
      "Trace every product back to its machine, batch, operator, and shift. Build a complete quality genealogy without manual effort.",
  },
  {
    icon: AlertCircle,
    title: "Deviation Tracking",
    description:
      "Log deviations as they happen and link them to root causes. Track corrective actions and ensure nothing slips through the cracks.",
  },
  {
    icon: Search,
    title: "SPC and Trend Analysis",
    description:
      "Monitor quality trends in real time with statistical process control. Catch drift before it becomes a defect.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Ready",
    description:
      "Built-in audit trails and documentation support ISO, FDA, and industry-specific compliance requirements out of the box.",
  },
  {
    icon: FileText,
    title: "Quality Reports",
    description:
      "Generate quality reports automatically — by product, line, or time period. Share insights with customers and auditors instantly.",
  },
]

const metrics = [
  { metric: "60%", label: "Reduction in quality-related rework" },
  { metric: "90%", label: "Faster deviation response time" },
  { metric: "100%", label: "Digital traceability coverage" },
]

const steps = [
  {
    title: "Digitize",
    description:
      "Replace paper-based quality processes with digital forms and inspections connected to your production data.",
  },
  {
    title: "Trace",
    description:
      "Link every quality event to machines, batches, and operators. Build full traceability without additional manual effort.",
  },
  {
    title: "Improve",
    description:
      "Use quality data to identify patterns, reduce scrap, and drive continuous improvement across the organization.",
  },
]

export default function QualityPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">
            Quality Module
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
            Build Accountability Into Production
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Register quality data at the source and trace every deviation back to
            machines, batches, and shifts. Make quality everyone&apos;s responsibility.
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
            Quality issues shouldn&apos;t surface after the fact
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            When quality data lives in spreadsheets and paper forms, problems
            hide until they become expensive. Deviations get lost, traceability
            gaps appear during audits, and root causes stay unknown. The Quality
            module captures data where it happens and connects it to the full
            production context.
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
            Everything you need for digital quality management
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
              Quality data connected to production
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every inspection, deviation, and corrective action linked to the
              machine, batch, and operator that produced it.
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
