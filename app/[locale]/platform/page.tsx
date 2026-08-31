import Image from "next/image"
import { setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { type Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { PlatformArchitecture } from "@/components/platform-architecture"
import { PlatformFlower } from "@/components/platform-flower"
import { LogoWall } from "@/components/logo-wall"
import { customerLogos } from "@/lib/customers"
import { moduleIndexLinks } from "@/content/modules-catalog"
import { getSurface, getThemeForHref } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Platform | OptiPeople",
    description:
      "Explore the OptiPeople Data Platform: a modular MES with OEE, QMS, EMS, maintenance, planning, orders, IoT, documents, analysis, and AI agents, sharing data in one unified view of your operations.",
  },
  da: {
    title: "Platform | OptiPeople",
    description:
      "Se OptiPeople Data Platform: MES, OEE, kvalitet, energi, vedligehold, planlægning, ordrer, IoT, dokumenter, analyse og AI-agenter i ét samlet billede af driften.",
  },
}

type PlatformCopy = {
  hero: { eyebrow: string; title: string; lede: string; cta: string; jump: string }
  proof: { title: string; items: { metric: string; label: string }[] }
  intro: { title: string; body: string }
  steps: { title: string; items: { title: string; description: string }[] }
  modules: { title: string; subtitle: string; cards: { title: string; href: string; description: string }[] }
  visual: { eyebrow: string; title: string; body: string }
  logos: string
}

const copy: Record<Locale, PlatformCopy> = {
  en: {
    hero: {
      eyebrow: "Platform",
      title: "One modular platform for all your manufacturing operations",
      lede: "The OptiPeople Data Platform connects production, planning, quality, maintenance, energy, and analysis on a single data foundation. Take one module or ten: every module works from the same live data, so what one team registers, every team can use.",
      cta: "Book a demo",
      jump: "See the modules",
    },
    proof: {
      title: "What it runs on",
      items: [
        { metric: "11", label: "Modules sharing one data foundation, switched on as you need them" },
        { metric: "1", label: "Structured record per machine, order, batch, and shift" },
        { metric: "Any", label: "Protocol or machine age, new PLCs and legacy equipment alike" },
      ],
    },
    intro: {
      title: "Most factories don't have a data problem. They have a data-in-pieces problem.",
      body: "The OEE numbers live in one system, the maintenance log in another, quality in a binder, and energy on a bill that arrives a month late. Nobody is wrong, but nobody can see the whole picture either. OptiPeople Data Platform puts every one of those records on the same foundation, tied to the same machines, orders, and shifts. So the argument moves from whose number is right to what to do about it.",
    },
    steps: {
      title: "How it fits together",
      items: [
        {
          title: "Connect",
          description:
            "Connect machines, sensors, and systems through the IoT module: PLCs, gateways, and legacy equipment, regardless of protocol or age.",
        },
        {
          title: "Collect",
          description:
            "Data lands in one structured foundation, tied to machines, orders, batches, and shifts, instead of scattered across systems and spreadsheets.",
        },
        {
          title: "Analyze",
          description:
            "Follow the numbers that matter to you as they happen, and get automated reports on output, losses, quality, and cost. The same numbers for everyone.",
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
    visual: {
      eyebrow: "Product view",
      title: "The same live data, wherever the decision gets made",
      body: "On the floor it's an operator panel. In the office it's a report. In a meeting it's the number nobody disputes, because it all comes from the same record.",
    },
    logos: "Trusted by manufacturers across the Nordics and internationally",
  },
  da: {
    hero: {
      eyebrow: "Platform",
      title: "Én modulopbygget platform til hele produktionen",
      lede: "OptiPeople Data Platform kobler produktion, planlægning, kvalitet, vedligehold, energi og analyse sammen på ét fælles datagrundlag. Tag ét modul eller ti: alle moduler arbejder på de samme data, så det, ét team registrerer, kan de andre bruge.",
      cta: "Book en demo",
      jump: "Se modulerne",
    },
    proof: {
      title: "Det, platformen kører på",
      items: [
        { metric: "11", label: "Moduler på ét fælles datagrundlag, slået til efterhånden som I får brug for dem" },
        { metric: "1", label: "Struktureret registrering pr. maskine, ordre, batch og skift" },
        { metric: "Alle", label: "Protokoller og maskinaldre, både nye PLC'er og gammelt udstyr" },
      ],
    },
    intro: {
      title: "De fleste fabrikker har ikke et dataproblem. De har et data-i-stumper-problem.",
      body: "OEE-tallene ligger i ét system, vedligeholdsloggen i et andet, kvaliteten i et ringbind, og energien på en regning, der kommer en måned for sent. Ingen tager fejl, men ingen kan se hele billedet. OptiPeople Data Platform lægger det hele på det samme fundament, koblet til de samme maskiner, ordrer og skift. Så flytter diskussionen sig fra, hvis tal der er rigtigt, til hvad I gør ved det.",
    },
    steps: {
      title: "Sådan hænger det sammen",
      items: [
        {
          title: "Forbind",
          description:
            "Kobl maskiner, sensorer og systemer på gennem IoT-modulet: PLC'er, gateways og gammelt udstyr, uanset protokol og alder.",
        },
        {
          title: "Opsaml",
          description:
            "Data lander ét sted, koblet til maskiner, ordrer, batches og skift, i stedet for spredt ud over systemer og regneark.",
        },
        {
          title: "Analysér",
          description:
            "Følg de tal, der betyder noget hos jer, mens det sker, og få rapporter om produktion, tab, kvalitet og omkostninger, der laver sig selv. De samme tal for alle.",
        },
        {
          title: "Handl",
          description:
            "Gør tallene til handling: opret opgaver, planlæg vedligehold, ret planen til, og lad AI svare på spørgsmål i jeres egne data.",
        },
      ],
    },
    modules: {
      title: "Modulerne",
      subtitle:
        "Hvert modul løser en konkret opgave i driften, og sammen giver de ét samlet overblik over gulvet.",
      cards: moduleIndexLinks("da"),
    },
    visual: {
      eyebrow: "Produktvisning",
      title: "De samme tal, dér hvor beslutningen bliver truffet",
      body: "På gulvet er det et operatørpanel. På kontoret er det en rapport. På mødet er det tallet, ingen sætter spørgsmålstegn ved, fordi det hele kommer fra den samme registrering.",
    },
    logos: "Brugt af produktionsvirksomheder i Norden og resten af verden",
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
  // Teal: the platform hub is the union of every module rather than any one
  // of them, and teal is the surface no single module family owns outright.
  const theme = getSurface("teal")

  return (
    <main className="min-h-screen">
      {/* Hero: the wide editorial statement the deep-dive pages open on,
          rather than the centred column this page used to lead with. */}
      <section className="relative isolate overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 55%, transparent 100%)`,
          }}
        />
        <div className="px-[var(--edge)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.hero.lede}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href="/contact">{t.hero.cta}</Link>
            </Button>
            <Link
              href="#modules"
              className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/82 transition-colors hover:text-foreground"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              {t.hero.jump}
            </Link>
          </div>
        </div>
      </section>

      {/* Proof strip, on hairlines like the deep-dive template. */}
      <section className="px-[var(--edge)] pt-16 lg:pt-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
          {t.proof.title}
        </p>
        <dl className="mt-6 grid grid-cols-1 border-y border-black/[0.08] sm:grid-cols-3">
          {t.proof.items.map((item, i) => (
            <div
              key={item.label}
              className={`py-8 sm:py-10 ${
                i > 0
                  ? "border-t border-black/[0.08] sm:border-l sm:border-t-0 sm:pl-8 lg:pl-12"
                  : ""
              } ${i < t.proof.items.length - 1 ? "sm:pr-8 lg:pr-12" : ""}`}
            >
              <dt className="text-4xl font-light leading-none tracking-tight tabular-nums text-foreground lg:text-5xl">
                {item.metric}
              </dt>
              <dd className="mt-3 max-w-[22ch] text-sm leading-relaxed text-foreground/70">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Intro: the argument the page was previously missing entirely. */}
      <section className="px-[var(--edge)] py-20 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:sticky lg:top-28 lg:self-start lg:text-4xl">
            {t.intro.title}
          </h2>
          <p className="text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.intro.body}
          </p>
        </div>
      </section>

      {/* Interactive platform diagram */}
      <PlatformFlower locale={loc} />

      {/* Steps: numbered rail on hairlines, replacing the centred 01 to 04 row. */}
      <section className="px-[var(--edge)] py-20 lg:py-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {t.steps.title}
        </h2>
        <ol className="mt-10 grid grid-cols-1 border-t border-black/[0.08] sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {t.steps.items.map((step, i) => (
            <li
              key={step.title}
              className={`border-b border-black/[0.08] py-8 lg:py-10 ${
                i > 0 ? "sm:pl-8 lg:pl-10" : ""
              } ${
                i < t.steps.items.length - 1 ? "sm:pr-8 lg:pr-10" : ""
              } ${i % 2 === 1 ? "sm:border-l" : ""} lg:border-l-0 ${
                i > 0 ? "lg:border-l" : ""
              }`}
            >
              <span className="text-sm font-medium tabular-nums text-foreground/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-normal tracking-tight text-foreground lg:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/72">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Architecture: the same flow the steps above describe in words, at
          the depth an IT reviewer asks for. Where data goes, who hosts it,
          and what is isolated per customer. */}
      <PlatformArchitecture locale={loc} />

      {/* Modules: each card wears the colour of the page it opens, so this
          grid previews its destinations instead of repeating one grey box. */}
      <section
        id="modules"
        /* Deliberately more top padding than the standard rhythm: this section
           follows the architecture band, and a band's bottom padding sits
           inside the band, so the standard py-20 left this heading reading as
           flush with the coloured edge above it. */
        className="scroll-mt-24 px-[var(--edge)] pb-20 pt-28 lg:pb-28 lg:pt-40"
      >
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {t.modules.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/72 lg:text-lg">
          {t.modules.subtitle}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {t.modules.cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="reveal group flex flex-col rounded-[1.25rem] p-7 transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.28)] lg:rounded-[1.5rem] lg:p-8"
              style={{ backgroundColor: getThemeForHref(card.href).tint }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-normal tracking-tight text-foreground lg:text-2xl">
                  {card.title}
                </h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/78">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Visual: full-bleed deep surface, the one hard rhythm break. */}
      <section
        className="py-20 text-white lg:py-32"
        style={{ backgroundColor: theme.deep }}
      >
        <div className="px-[var(--edge)]">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/65">
              {t.visual.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-normal leading-[1.15] tracking-tight lg:text-4xl">
              {t.visual.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78 lg:text-lg">
              {t.visual.body}
            </p>
          </div>
          <div className="reveal relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl bg-white/5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.12] lg:mt-16">
            <Image
              src="/images/Mockups/Report-OEE-Efficiency-With-Filter.png"
              alt={t.visual.title}
              fill
              sizes="(min-width: 1024px) 1140px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Social proof, the same wall the homepage and newsletter use. */}
      <section className="px-[var(--edge)] pt-20 lg:pt-28">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
          {t.logos}
        </p>
      </section>
      <LogoWall logos={customerLogos} className="pb-20 pt-10 lg:pb-28 lg:pt-12" />
    </main>
  )
}
