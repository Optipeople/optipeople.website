import { setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { type Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { PlatformFlower } from "@/components/platform-flower"
import { moduleIndexLinks } from "@/content/modules-catalog"
import { buildMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Platform | OptiPeople",
    description:
      "Explore the OptiCloud platform, modular MES, OEE, QMS, EMS, maintenance, planning, orders, IoT, documents, analysis, and AI agents, sharing data in one unified view of your operations.",
  },
  da: {
    title: "Platform | OptiPeople",
    description:
      "Udforsk OptiCloud-platformen, modulært MES, OEE, QMS, EMS, vedligehold, planlægning, ordrer, IoT, dokumenter, analyse og AI-agenter i ét samlet billede af driften.",
  },
}

type PlatformCopy = {
  hero: {
    eyebrow: string
    title: string
    lede: string
  }
  steps: {
    title: string
    subtitle: string
    items: { title: string; description: string }[]
  }
  modules: {
    title: string
    subtitle: string
    cards: { title: string; href: string; description: string }[]
  }
  cta: {
    title: string
    body: string
    button: string
  }
}

const copy: Record<Locale, PlatformCopy> = {
  en: {
    hero: {
      eyebrow: "Platform",
      title: "One platform for the whole operation",
      lede: "OptiCloud connects production, quality, maintenance, energy, and analysis on a single data foundation. Every module works from the same live data, so what one team registers, every team can use.",
    },
    steps: {
      title: "How it fits together",
      subtitle:
        "From machine signal to decision, the platform follows one simple flow.",
      items: [
        {
          title: "Connect",
          description:
            "Connect machines, sensors, and systems through the IoT module: PLCs, gateways, and legacy equipment, regardless of protocol or age.",
        },
        {
          title: "Collect",
          description:
            "Data lands in one structured foundation, tied to machines, orders, batches, and shifts, not scattered across systems and spreadsheets.",
        },
        {
          title: "Analyze",
          description:
            "Follow OEE in real time and get automated reports on performance, losses, quality, and energy: the same numbers for everyone.",
        },
        {
          title: "Act",
          description:
            "Turn insight into action: create tasks, plan maintenance, adjust the schedule, and let AI copilots answer questions in your own data.",
        },
      ],
    },
    modules: {
      title: "The modules",
      subtitle:
        "Each module solves a specific operational need, and together they give you a single, connected view of the shopfloor.",
      cards: moduleIndexLinks("en"),
    },
    cta: {
      title: "Ready to see it in practice?",
      body: "Tell us how your production runs today, and we'll show you what OptiCloud can do with it.",
      button: "Talk to sales",
    },
  },
  da: {
    hero: {
      eyebrow: "Platform",
      title: "Én platform til hele driften",
      lede: "OptiCloud forbinder produktion, kvalitet, vedligehold, energi og analyse på ét fælles datagrundlag. Alle moduler arbejder på de samme live data, så det, ét team registrerer, kan alle teams bruge.",
    },
    steps: {
      title: "Sådan hænger det sammen",
      subtitle:
        "Fra maskinsignal til beslutning følger platformen ét enkelt flow.",
      items: [
        {
          title: "Forbind",
          description:
            "Forbind maskiner, sensorer og systemer via IoT-modulet: PLC'er, gateways og ældre udstyr, uanset protokol og alder.",
        },
        {
          title: "Opsaml",
          description:
            "Data lander i ét struktureret grundlag, koblet til maskiner, ordrer, batches og skift, ikke spredt ud over systemer og regneark.",
        },
        {
          title: "Analysér",
          description:
            "Følg OEE i realtid, og få automatiske rapporter om performance, tab, kvalitet og energi: de samme tal for alle.",
        },
        {
          title: "Handl",
          description:
            "Gør indsigt til handling: opret opgaver, planlæg vedligehold, justér planen, og lad AI-copilots svare på spørgsmål i jeres egne data.",
        },
      ],
    },
    modules: {
      title: "Modulerne",
      subtitle:
        "Hvert modul løser et konkret driftsbehov, og sammen giver de ét forbundet overblik over fabriksgulvet.",
      cards: moduleIndexLinks("da"),
    },
    cta: {
      title: "Klar til at se det i praksis?",
      body: "Fortæl os, hvordan jeres produktion kører i dag, så viser vi, hvad OptiCloud kan gøre med den.",
      button: "Tal med salg",
    },
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const m = metadataCopy[locale as Locale] ?? metadataCopy.en
  return buildMetadata({
    title: m.title,
    description: m.description,
    path: "/platform",
    locale: locale as Locale,
  })
}

export default async function PlatformPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const loc = (locale as Locale) === "da" ? "da" : "en"
  const t = copy[loc]

  return (
    <main>
      {/* Hero */}
      <section className="px-[var(--edge)] pb-8 pt-16 sm:pt-24 lg:pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {t.hero.eyebrow}
          </p>
          <h1 className="text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-foreground/70 lg:text-xl">
            {t.hero.lede}
          </p>
        </div>
      </section>

      {/* Interactive platform diagram */}
      <PlatformFlower locale={loc} />

      {/* How it fits together */}
      <section className="px-[var(--edge)] py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
              {t.steps.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.steps.subtitle}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {t.steps.items.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mb-4 text-4xl font-extralight text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-medium">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module grid */}
      <section id="modules" className="bg-muted/30 px-[var(--edge)] py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
              {t.modules.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.modules.subtitle}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.modules.cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-lg border border-border/60 bg-background p-6 transition-colors hover:border-primary/50"
              >
                <h3 className="flex items-center gap-2 text-lg font-medium">
                  {card.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-[var(--edge)] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light tracking-tight text-foreground lg:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {t.cta.body}
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/contact">{t.cta.button}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
