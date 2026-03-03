import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  FileText,
  Calculator,
  Target,
} from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Automated Reporting",
    description:
      "Generate daily, weekly, and monthly reports automatically. No more manual data collection or spreadsheet formatting.",
  },
  {
    icon: Calculator,
    title: "Cost Analysis",
    description:
      "Understand the true cost of downtime, scrap, and inefficiency. Translate production data into financial impact.",
  },
  {
    icon: Target,
    title: "Investment Planning",
    description:
      "Use data to build the business case for improvements. Show exactly where investment will have the greatest return.",
  },
  {
    icon: PieChart,
    title: "Loss Categorization",
    description:
      "Break down losses by type — availability, performance, quality. Prioritize improvements based on actual impact.",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description:
      "Track performance over time and identify patterns. See whether improvements stick and where new opportunities emerge.",
  },
  {
    icon: BarChart3,
    title: "Custom Dashboards",
    description:
      "Build dashboards for different roles — from operators to management. Everyone sees the data relevant to their decisions.",
  },
]

const metrics = [
  { metric: "2 hrs", label: "Saved daily on manual reporting" },
  { metric: "100%", label: "Data-driven decision coverage" },
  { metric: "3x", label: "Faster root cause identification" },
]

const steps = [
  {
    title: "Collect",
    description:
      "Production data flows automatically from machines and operators into a single, structured data platform.",
  },
  {
    title: "Analyze",
    description:
      "Turn raw data into clear insights with automated reports, loss analysis, and trend tracking — no spreadsheets needed.",
  },
  {
    title: "Decide",
    description:
      "Make investment and improvement decisions based on facts. Track the impact of every change you implement.",
  },
]

export default function AnalysisPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">
            Analysis Module
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
            From Data to Decisions
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Turn raw production data into clear reports on performance, losses,
            and cost drivers — without spreadsheets or manual work.
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
            Data is only valuable if it drives action
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Collecting production data is one thing — turning it into decisions
            is another. When reporting takes hours of manual work and insights
            arrive too late, the data loses its value. The Analysis module
            transforms live production data into actionable reports that reach
            the right people at the right time.
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
            Everything you need for production intelligence
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
              Reports that write themselves
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From shift summaries to monthly management reports — automated,
              accurate, and always up to date.
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
