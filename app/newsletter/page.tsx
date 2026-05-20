import Image from "next/image"
import { BarChart3, CheckCircle2, Factory, Wrench } from "lucide-react"

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
      "Ideas for spotting losses, improving OEE, and keeping improvement work grounded in real production data.",
    icon: BarChart3,
  },
  {
    title: "Connected factories",
    description:
      "Notes on machine data, integrations, dashboards, and the systems that make operations easier to run.",
    icon: Factory,
  },
  {
    title: "Maintenance and uptime",
    description:
      "Practical thinking on planned maintenance, tasks, conditions, and the small habits that protect uptime.",
    icon: Wrench,
  },
] as const

export default function NewsletterPage() {
  return (
    <main>
      <section className="pt-16 pb-16 sm:pt-24 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Newsletter
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl">
              Practical notes for better factory operations
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Short updates for people working with production, maintenance,
              reporting, and industrial data. No noise, just useful ideas from
              the field.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "Operational examples",
                "OEE and loss tracking",
                "Maintenance ideas",
                "Digital manufacturing trends",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4 text-[var(--green-dark3)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-md border border-border/70 bg-muted shadow-sm">
              <Image
                src="/images/dashboard2.png"
                alt="OptiPeople production dashboard"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 52vw, 100vw"
                priority
              />
            </div>
          </div>

          <div className="lg:pt-10">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-muted/30 py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              What to expect
            </p>
            <h2 className="mt-3 text-3xl font-light tracking-tight text-foreground lg:text-4xl">
              Useful reading for teams improving operations
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {newsletterTopics.map((topic) => {
              const Icon = topic.icon

              return (
                <div
                  key={topic.title}
                  className="rounded-md border border-border/70 bg-background p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-[var(--green-light1)] text-[var(--green-dark3)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-foreground">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
