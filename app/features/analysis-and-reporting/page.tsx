import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Analysis and Reporting | OptiPeople",
  description:
    "Turn production data into clear reports on performance, losses, and cost drivers — without spreadsheets or manual work.",
}

const capabilities = [
  {
    title: "OEE Reports That Build Themselves",
    description:
      "Availability, performance, and quality — broken down by machine, line, shift, or time period. Reports generate automatically from live production data. Pick a week, pick a machine, and the numbers are there.",
    image: "/images/report1.png",
    imageAlt:
      "OptiPeople report showing OEE gauges for availability, performance, and quality with a color-coded timeline chart",
  },
  {
    title: "Compare Anything Against Anything",
    description:
      "Side-by-side bar charts across shifts, lines, weeks, or machines. See where performance diverges and where it converges. The comparisons that used to take a full afternoon in Excel now take one click.",
    image: "/images/report-mockup2.png",
    imageAlt:
      "Bar chart report comparing production metrics across different time periods and categories",
  },
  {
    title: "From Raw Data to Shared Insight",
    description:
      "Save report templates, schedule automatic delivery, and share with stakeholders who need the numbers but not the system. Management gets a weekly summary. Team leads get daily shift reports. Same data, right format.",
    image: "/images/report-mockup5.png",
    imageAlt:
      "Two OptiPeople report views showing production blocks overview and OEE dashboard gauges side by side",
  },
]

const metrics = [
  { metric: "2 hrs", label: "Saved daily on manual reporting" },
  { metric: "0", label: "Spreadsheets needed for production reports" },
  { metric: "< 1 min", label: "From question to answer" },
]

const relatedFeatures = [
  {
    title: "Production Efficiency",
    description:
      "The live OEE data that feeds into your reports — track it in real time.",
    href: "/features/production-efficiency",
  },
  {
    title: "Stop Cause Registration",
    description:
      "Clean stop data makes loss analysis reports accurate and actionable.",
    href: "/features/stop-cause-registration",
  },
  {
    title: "Energy and Telemetry",
    description:
      "Add energy consumption and sensor data to your production reports.",
    href: "/features/energy-and-telemetry",
  },
]

export default function AnalysisAndReportingPage() {
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
            <span className="text-foreground">Analysis and Reporting</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                Analysis and Reporting
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
                Reports That Write Themselves
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Turn production data into clear reports on performance, losses,
                and cost drivers — without spreadsheets or manual work.
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
                src="/images/report-mockup1.png"
                alt="OptiPeople reporting dashboard showing OEE gauge, unit counter, and parts per hour trend"
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
            The data exists — it just needs a better format
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Your machines generate thousands of data points every day. But if
            turning that into a useful report takes a person, a spreadsheet, and
            half a morning, the data stays locked up. OptiPeople generates
            production reports automatically — accurate, consistent, and ready
            when you are.
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
              From machine signal to management report
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every report is built from live production data. No manual entry,
              no copy-paste, no version confusion.
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

      {/* Product Showcase */}
      <section className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              Every angle of your production, one system
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              OEE dashboards, stop analysis, shift comparisons, and energy
              reports — all generated from the same live data source.
            </p>
          </div>
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            <Image
              src="/images/report-mockup4.png"
              alt="Four OptiPeople dashboard views showing OEE tracking, performance comparisons, and production reports"
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
