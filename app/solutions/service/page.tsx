import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  HeartPulse,
  Calendar,
  MapPin,
  ClipboardCheck,
  BellRing,
  FileText,
} from "lucide-react"

export const metadata = {
  title: "Service Solutions | OptiPeople",
  description:
    "Give your service team real visibility into machine health and usage. Plan maintenance on facts, reduce emergency callouts, and turn service into a competitive advantage with OptiPeople.",
}

const features = [
  {
    icon: HeartPulse,
    title: "Machine Health Monitoring",
    description:
      "Track vibration, temperature, energy consumption, and operating parameters in real time. See degradation trends before they become breakdowns.",
  },
  {
    icon: Calendar,
    title: "Usage-Based Maintenance",
    description:
      "Schedule maintenance based on actual operating hours and conditions, not arbitrary calendar intervals. Do the right work at the right time.",
  },
  {
    icon: MapPin,
    title: "Remote Diagnostics",
    description:
      "Diagnose issues remotely before dispatching a technician. Arrive prepared with the right parts and the right knowledge.",
  },
  {
    icon: ClipboardCheck,
    title: "Service Task Management",
    description:
      "Assign, track, and document service tasks digitally. Build a complete service history for every machine.",
  },
  {
    icon: BellRing,
    title: "Automated Service Alerts",
    description:
      "Get notified when a machine crosses a threshold or shows early signs of failure. Respond before the customer even notices.",
  },
  {
    icon: FileText,
    title: "Service Contracts and Reporting",
    description:
      "Deliver data-backed service reports to customers. Use machine data to design and price service agreements with confidence.",
  },
]

const metrics = [
  { metric: "50%", label: "Fewer emergency service callouts" },
  { metric: "40 hrs", label: "Saved annually per machine on preventive maintenance" },
  { metric: "30%", label: "Increase in service contract revenue" },
]

const steps = [
  {
    title: "Connect",
    description:
      "Instrument machines with sensors and connect to your existing monitoring infrastructure. We handle the data pipeline.",
  },
  {
    title: "Monitor",
    description:
      "Your service team gets a live health dashboard for every machine. Alerts fire automatically when thresholds are crossed.",
  },
  {
    title: "Prevent",
    description:
      "Schedule maintenance based on real data. Resolve issues remotely when possible. Arrive prepared when a visit is needed.",
  },
]

export default function ServicePage() {
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
            For Service and Aftermarket Teams
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight text-white">
            Fix Problems Before Customers Feel Them
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Give your service team real visibility into machine health and usage.
            Plan maintenance on facts, reduce emergency callouts, and turn
            service from a cost center into a competitive advantage.
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
            Reactive service is expensive and exhausting
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Your technicians spend more time firefighting than preventing.
            Maintenance schedules are based on calendar intervals, not actual
            usage. When a machine goes down at a customer site, you scramble.
            OptiPeople gives your service team the data to act before failures
            happen and the tools to plan maintenance that actually prevents
            problems.
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
            Everything you need for predictable, proactive service
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
              One view of every machine you service
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Machine health, service history, and upcoming maintenance across
              your entire installed base.
            </p>
          </div>
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            <Image
              src="/images/report-mockrup-3.png"
              alt="OptiPeople machine health dashboard showing temperature, energy consumption, and performance trend data"
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
