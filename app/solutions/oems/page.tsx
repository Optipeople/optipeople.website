import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  Globe,
  Shield,
  TrendingUp,
  RefreshCw,
  Lock,
  Plug,
} from "lucide-react"

export const metadata = {
  title: "OEM Solutions | OptiPeople",
  description:
    "Ship connected machines with built-in intelligence. Monitor performance in the field, support customers proactively, and build recurring digital revenue with OptiPeople.",
}

const features = [
  {
    icon: Globe,
    title: "Remote Fleet Monitoring",
    description:
      "See the status and performance of every machine you have shipped, across every customer site, from a single dashboard.",
  },
  {
    icon: Shield,
    title: "Proactive Customer Support",
    description:
      "Detect anomalies and performance degradation before your customer notices. Reach out with a solution before they file a ticket.",
  },
  {
    icon: TrendingUp,
    title: "Usage and Performance Analytics",
    description:
      "Give customers deep insight into how their machines perform. Drive engagement and make your machines indispensable.",
  },
  {
    icon: RefreshCw,
    title: "Digital Service Packages",
    description:
      "Bundle monitoring, alerts, and analytics into subscription offerings. Turn aftermarket into a revenue stream, not a cost center.",
  },
  {
    icon: Lock,
    title: "Multi-Tenant Data Isolation",
    description:
      "Each customer's data stays separate and secure. Role-based access ensures the right people see the right information.",
  },
  {
    icon: Plug,
    title: "Open Integration Layer",
    description:
      "Connect through OPC-UA, MQTT, REST APIs, or direct PLC integration. Works with your existing machine architecture.",
  },
]

const metrics = [
  { metric: "3x", label: "Growth in aftermarket revenue" },
  { metric: "60%", label: "Faster issue resolution with remote diagnostics" },
  { metric: "35%", label: "Higher customer retention with digital services" },
]

const steps = [
  {
    title: "Integrate",
    description:
      "We connect to your machine's control system. Your existing architecture stays intact.",
  },
  {
    title: "Deploy",
    description:
      "Ship machines with Opticloud built in. Customers access a branded portal from day one.",
  },
  {
    title: "Monetize",
    description:
      "Package data, insights, and proactive support into digital service tiers your customers pay for.",
  },
]

export default function OemsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8 bg-primary">
        <Image
          src="/images/default-hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-white/90 mb-4">
            For OEMs and Machine Builders
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight text-white">
            Turn Machines Into Platforms
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Ship connected machines with built-in intelligence. Monitor
            performance in the field, support customers before they call, and
            build recurring digital revenue on top of your equipment.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Request a Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white shadow-none hover:bg-white/20 hover:text-white">
              <Link href="#capabilities">See Capabilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem / Context */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Selling machines is not enough anymore
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Your competitors are offering connected solutions. Your customers
            expect remote support, predictive insights, and digital services.
            Without a platform, you are leaving revenue on the table and letting
            others own the relationship after the sale. OptiPeople gives you the
            infrastructure to turn every machine you ship into a connected
            product.
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
            Everything you need to deliver connected machines
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
              Your machines, your brand, one platform
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A white-label portal your customers access to see live machine
              data, service history, and performance trends.
            </p>
          </div>
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            <Image
              src="/images/OpticloudOPSingle.jpg"
              alt="OptiPeople white-label portal showing machine data tables and OEE dashboard for connected equipment"
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
            What Connected Machine Builders Achieve
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
