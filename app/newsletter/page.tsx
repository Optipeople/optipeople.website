import Image from "next/image"
import { BarChart3, Factory, Wrench } from "lucide-react"

import { NewsletterForm } from "./newsletter-form"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "OptiPeople Newsletter",
  description:
    "Sign up for practical OptiPeople updates about production data, OEE, maintenance, and digital operations for manufacturers.",
  path: "/newsletter",
  keywords: [
    "manufacturing newsletter",
    "OEE newsletter",
    "production data",
    "digital operations",
  ],
})

const newsletterTopics = [
  {
    title: "Production performance",
    description:
      "Spotting losses, improving OEE, and keeping improvement work grounded in real production data.",
    icon: BarChart3,
  },
  {
    title: "Connected factories",
    description:
      "Machine data, integrations, and dashboards — the systems that make operations easier to run.",
    icon: Factory,
  },
  {
    title: "Maintenance & uptime",
    description:
      "Planned maintenance, conditions, and the small habits that quietly protect uptime.",
    icon: Wrench,
  },
] as const

export default function NewsletterPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Ambient background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(80%_60%_at_50%_-10%,var(--green-light1)_0%,transparent_60%)] opacity-60"
      />

      <section className="px-6 pt-20 pb-16 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-border/60 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
            Newsletter
          </span>
          <h1 className="mt-6 text-balance text-4xl font-light leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Practical notes for better factory operations
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Short updates for people working with production, maintenance,
            reporting, and industrial data. No noise — just useful ideas from
            the field.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-lg">
          <NewsletterForm />
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            What to expect
          </p>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {newsletterTopics.map((topic) => {
              const Icon = topic.icon

              return (
                <div key={topic.title} className="text-center sm:text-left">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--green-light1)] text-[var(--green-dark3)] sm:mx-0">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-[linear-gradient(135deg,#f4efe6,#f8f6f1)] p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_24px_60px_-28px_rgba(0,0,0,0.22)] sm:p-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-border/60">
              <Image
                src="/images/dashboard2.png"
                alt="OptiPeople production dashboard"
                width={1600}
                height={1000}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 64rem, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
