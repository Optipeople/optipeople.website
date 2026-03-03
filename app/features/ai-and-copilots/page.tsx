import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "AI and Copilots | OptiPeople",
  description:
    "Ask questions, detect patterns, and support decisions using AI trained on your own production data.",
}

const capabilities = [
  {
    title: "Ask Your Data a Question",
    description:
      "Type a question in plain language and get an answer drawn from your production data. \"What caused the most downtime last week?\" \"Which line had the best OEE this month?\" No query language, no analyst needed — just the answer.",
    image: "/images/report1.png",
    imageAlt:
      "OptiPeople report showing OEE breakdown and timeline that AI can analyze and summarize",
  },
  {
    title: "Patterns Humans Miss",
    description:
      "AI scans across machines, shifts, and time periods to surface correlations that are invisible in manual review. A slow drift in cycle time that predicts a breakdown. An energy pattern that signals a worn tool. The system flags it before it becomes a problem.",
    image: "/images/report-mockup5.png",
    imageAlt:
      "Two report views showing production data patterns that AI uses to detect anomalies and trends",
  },
  {
    title: "Decisions Backed by Evidence",
    description:
      "Every AI insight links back to the underlying data. No black boxes. When the copilot suggests focusing on a specific machine or shift, you can drill into the exact numbers and timeline that support the recommendation.",
    image: "/images/dashboard2.png",
    imageAlt:
      "Production status dashboard showing real-time machine states and performance data backing AI recommendations",
  },
]

const metrics = [
  { metric: "10x", label: "Faster time from question to insight" },
  { metric: "24/7", label: "Continuous pattern detection" },
  { metric: "100%", label: "Traceable — every insight links to source data" },
]

const relatedFeatures = [
  {
    title: "Analysis and Reporting",
    description:
      "AI enhances the reports you already generate — adding summaries, anomalies, and recommendations.",
    href: "/features/analysis-and-reporting",
  },
  {
    title: "Energy and Telemetry",
    description:
      "AI detects patterns in sensor data that signal wear, waste, or emerging failures.",
    href: "/features/energy-and-telemetry",
  },
  {
    title: "Production Efficiency",
    description:
      "Ask the copilot to explain OEE drops and suggest where to focus improvement efforts.",
    href: "/features/production-efficiency",
  },
]

export default function AiAndCopilotsPage() {
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
            <span className="text-foreground">AI and Copilots</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                AI and Copilots
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
                AI Trained on Your Factory
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Ask questions, detect patterns, and support decisions using AI
                that knows your machines, your shifts, and your production
                history.
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
                src="/images/report-mockup4.png"
                alt="Four OptiPeople dashboard views representing the breadth of production data available to AI analysis"
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
            Your best analyst can&apos;t look at everything at once
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Production generates more data than any person can review. The
            patterns that matter — a gradual cycle time drift, a correlation
            between humidity and scrap rate, a shift that quietly outperforms
            — get buried in volume. AI doesn&apos;t get overwhelmed. It watches
            everything, all the time, and tells you what matters.
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
              Intelligence that earns trust through transparency
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every recommendation is traceable. Every insight links to real
              data. No black boxes — just evidence.
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
