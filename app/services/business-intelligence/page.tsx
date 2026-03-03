import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BarChart3,
  PieChart,
  Workflow,
  Database,
  Users,
  RefreshCw,
} from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Power BI Dashboards",
    description:
      "Custom-built Power BI reports tailored to your business. From executive overviews to operational deep-dives — designed to answer the questions that matter.",
  },
  {
    icon: Database,
    title: "Data Integration",
    description:
      "Connect ERP, MES, CRM, and other data sources into a single reporting layer. No more switching between systems to get the full picture.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive reporting tasks, data pipelines, and business processes using Power Automate and custom integrations.",
  },
  {
    icon: PieChart,
    title: "KPI Design",
    description:
      "We help you define and visualize the right KPIs for your organization. Clear metrics that drive decisions, not just decorate dashboards.",
  },
  {
    icon: RefreshCw,
    title: "Automated Data Pipelines",
    description:
      "Set up reliable data flows that keep your reports fresh. Scheduled refreshes, incremental loads, and error handling built in.",
  },
  {
    icon: Users,
    title: "Training and Enablement",
    description:
      "We train your team to use, maintain, and extend the reports we build. Self-sufficiency is the goal — not dependency.",
  },
]

const metrics = [
  { metric: "80%", label: "Less time spent on manual reporting" },
  { metric: "1 view", label: "All your data sources in one place" },
  { metric: "Real-time", label: "Always up-to-date insights" },
]

const steps = [
  {
    title: "Understand",
    description:
      "We map your data landscape and reporting needs. What decisions do you need to make, and what data do you need to make them?",
  },
  {
    title: "Build",
    description:
      "We design and develop Power BI reports, data models, and automations tailored to your workflows and KPIs.",
  },
  {
    title: "Enable",
    description:
      "We hand over reports, documentation, and training so your team can run independently. Ongoing support available when you need it.",
  },
]

export default function BusinessIntelligencePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">
            Business Intelligence
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
            Reports That Actually Drive Decisions
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Hire us to build Power BI dashboards, automate your reporting, and
            turn scattered data into clear, actionable insights.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#capabilities">See What We Do</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem / Context */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Data is everywhere — insight is not
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Your organization generates more data than ever, but it sits locked
            in ERP systems, spreadsheets, and disconnected tools. Getting a
            clear answer still means hours of manual work. Our BI consultancy
            brings it all together — so your team spends time acting on data,
            not hunting for it.
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
            What we deliver
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
              From raw data to boardroom-ready reports
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive Power BI dashboards that connect to your existing
              systems and update automatically.
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
