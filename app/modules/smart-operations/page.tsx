import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Activity, Gauge, Wrench, BarChart3, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Live visibility into machine status, production counts, and operational performance across your entire facility.",
  },
  {
    icon: Gauge,
    title: "OEE Tracking",
    description: "Automatic calculation of availability, performance, and quality metrics with drill-down by shift, line, or machine.",
  },
  {
    icon: Wrench,
    title: "Stop Cause Analysis",
    description: "Capture downtime reasons at the source. Understand where time is lost and prioritize improvements.",
  },
  {
    icon: BarChart3,
    title: "Performance Reports",
    description: "Automated daily, weekly, and monthly reports delivered to stakeholders with actionable insights.",
  },
]

const benefits = [
  { metric: "15-25%", label: "OEE improvement in first year" },
  { metric: "40%", label: "Reduction in unplanned downtime" },
  { metric: "2 hrs", label: "Saved daily on manual reporting" },
]

export default function SmartOperationsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-primary mb-4">Smart Operations Module</p>
          <h1 className="text-4xl sm:text-5xl tracking-tight text-foreground leading-tight font-light">
            See Your Factory in Real Time
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Connect machines, capture production data automatically, and give your team
            the visibility they need to make better decisions faster.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Request a Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/case-studies">See Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 lg:px-8 py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-light text-center mb-12">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-background">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="mt-2">{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-light text-center mb-12">Typical Results</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {benefits.map((benefit) => (
              <div key={benefit.label}>
                <p className="text-4xl font-light text-primary">{benefit.metric}</p>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8 py-16 bg-primary/5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-light mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Book a 30-minute call to see how Smart Operations fits your production environment.
          </p>
          <Button asChild>
            <Link href="/contact" className="gap-2">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
