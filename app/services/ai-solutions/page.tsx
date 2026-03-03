import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Bot,
  BrainCircuit,
  FileBarChart,
  CalendarClock,
  Workflow,
  ShieldCheck,
} from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "Process Automation Agents",
    description:
      "AI agents that handle repetitive operational tasks end-to-end — from data entry and order processing to inventory updates — without human intervention.",
  },
  {
    icon: FileBarChart,
    title: "Automated Reporting",
    description:
      "Agents that collect data from multiple sources, generate production reports, shift summaries, and KPI dashboards — delivered on schedule, every time.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent BI Agents",
    description:
      "Go beyond static dashboards. AI agents that proactively surface anomalies, explain trends, and recommend actions based on your production data.",
  },
  {
    icon: CalendarClock,
    title: "Planning & Scheduling Agents",
    description:
      "Agents that optimize production schedules, balance workloads, and adjust plans in real time as conditions change on the shop floor.",
  },
  {
    icon: Workflow,
    title: "Workflow Orchestration",
    description:
      "Connect agents across systems — ERP, MES, SCADA, and more. Build multi-step workflows where agents hand off tasks to each other autonomously.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Compliance Agents",
    description:
      "Automate quality checks, flag deviations before they escalate, and keep audit trails complete — reducing risk and rework.",
  },
]

const metrics = [
  { metric: "70%", label: "Reduction in manual reporting effort" },
  { metric: "24/7", label: "Agents working around the clock" },
  { metric: "10x", label: "Faster response to production issues" },
]

const steps = [
  {
    title: "Identify",
    description:
      "We map your operational workflows and pinpoint where AI agents can eliminate manual work, reduce errors, and speed up decisions.",
  },
  {
    title: "Deploy",
    description:
      "We build and deploy custom AI agents integrated with your existing systems. Each agent is designed for a specific task and tested against real data.",
  },
  {
    title: "Scale",
    description:
      "Start with one agent, then expand. As agents prove their value, we help you orchestrate multi-agent workflows across your entire operation.",
  },
]

export default function AiSolutionsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">
            AI Agentic Solutions
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
            AI Agents That Run Your Operations
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We build autonomous AI agents that automate processes, generate
            reports, optimize planning, and deliver business intelligence —
            so your team can focus on what matters.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Talk to Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#capabilities">See What Agents Can Do</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem / Context */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Your team shouldn&apos;t be the bottleneck
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Production operations generate a constant stream of tasks that
            demand attention — pulling reports, updating schedules, chasing
            data across systems, flagging quality issues. These tasks are
            critical, but they don&apos;t need a human in the loop. AI agents
            handle them autonomously, accurately, and around the clock — freeing
            your people to focus on decisions that actually require judgment.
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
            Agents built for production operations
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
              Agents that work across your entire stack
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From ERP and MES to email and spreadsheets — AI agents connect to
              your systems and act on data in real time.
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
