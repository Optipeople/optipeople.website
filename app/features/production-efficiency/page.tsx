import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Production Efficiency | OptiPeople",
  description:
    "Track OEE in real time, see where production time is lost, and understand performance across shifts, lines, and machines — based on real production data.",
}

const capabilities = [
  {
    title: "Live OEE in One View",
    description:
      "Availability, performance, and quality — calculated automatically from machine signals. Your OEE score updates as production runs, with drill-down by machine, line, or area. No spreadsheets. No waiting for the shift report.",
    image: "/images/report-mockup1.png",
    imageAlt:
      "OptiPeople OEE dashboard showing availability gauge, unit counter, and parts per hour chart",
  },
  {
    title: "See What Happened, Hour by Hour",
    description:
      "Color-coded timelines show running, stopped, setup, and idle states for every machine. Spot patterns that shift reports miss — like the 20 minutes lost to changeover every morning that nobody talks about.",
    image: "/images/dashboard1.png",
    imageAlt:
      "Production timeline showing machine status and unit per hour chart across a shift",
  },
  {
    title: "Compare Shifts, Lines, and Machines",
    description:
      "Side-by-side performance data across any dimension you care about. See which shifts consistently outperform, which lines underdeliver, and where the gap between best and worst is widest.",
    image: "/images/report-mockup2.png",
    imageAlt:
      "Bar chart report comparing production performance across shifts and lines",
  },
]

const metrics = [
  { metric: "15–25%", label: "OEE improvement in the first year" },
  { metric: "2 hrs", label: "Saved daily on manual reporting" },
  { metric: "< 1 min", label: "From machine event to dashboard" },
]

const relatedFeatures = [
  {
    title: "Stop Cause Registration",
    description:
      "Capture downtime reasons at the source. Clean data you can actually act on.",
    href: "/features/stop-cause-registration",
  },
  {
    title: "Analysis and Reporting",
    description:
      "Turn production data into clear reports on performance, losses, and cost drivers.",
    href: "/features/analysis-and-reporting",
  },
  {
    title: "Quality Management",
    description:
      "Register quality data where it happens. Trace deviations back to machines, batches, and shifts.",
    href: "/features/quality-management",
  },
]

export default function ProductionEfficiencyPage() {
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
            <span className="text-foreground">Production Efficiency</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                Production Efficiency
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
                See Where Production Time Is Lost
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Track OEE live and understand performance across shifts, lines,
                and machines — based on real production data, not guesswork.
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
                alt="Four OptiPeople dashboard views showing OEE tracking, production reports, and real-time monitoring"
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
            Your production data should work as hard as your team
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Most factories still piece together performance from shift handover
            notes, spreadsheets, and end-of-day reports. By the time someone
            sees the numbers, the moment to act has passed. Production
            Efficiency gives you a live, accurate picture — so decisions happen
            while they still matter.
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
              From raw signals to real understanding
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every machine tells a story. Production Efficiency translates it
              into numbers, timelines, and comparisons your team can act on.
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
              The full picture, from floor to management
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Operators see their machine. Team leads see their line. Managers
              see the plant. Same data, right level of detail.
            </p>
          </div>
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            <Image
              src="/images/report-mockup5.png"
              alt="Two OptiPeople report views showing production blocks and OEE gauges side by side"
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
