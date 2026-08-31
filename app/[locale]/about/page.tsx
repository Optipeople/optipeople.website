import Image from "next/image"
import { setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { employees } from "@/lib/employees"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

const copy: Record<
  Locale,
  {
    meta: { title: string; description: string }
    eyebrow: string
    title: string
    intro: string
    missionHeading: string
    missionBody: string
    valuesHeading: string
    teamHeading: string
    values: { title: string; description: string }[]
    stats: { metric: string; label: string; detail?: string }[]
    statsTitle: string
    cta: string
    visual: { eyebrow: string; title: string; body: string }
  }
> = {
  en: {
    meta: {
      title: "About OptiPeople",
      description:
        "Meet the team behind OptiPeople and learn how we help manufacturers connect systems, improve shopfloor visibility, and turn operational data into action.",
    },
    eyebrow: "About",
    title: "We make industrial operations work",
    intro:
      "OptiPeople is a digital operations company. We build software, connect systems, and help industrial teams turn data into better decisions, from the shopfloor to the boardroom.",
    missionHeading: "Built for the space between shopfloor and ERP",
    missionBody:
      "Most factories have machines that produce data and ERP systems that need it, but nothing useful in between. OptiPeople fills that gap. Our platform, Opticloud, captures real-time production data, makes it visible to operators and managers, and turns it into actions that improve performance, reduce waste, and keep operations running.",
    valuesHeading: "How we work",
    teamHeading: "The team",
    values: [
      {
        title: "Start with the problem",
        description:
          "We don't lead with technology. We start by understanding how your operations actually work, the workarounds, the blind spots, the things that fall between systems. The solution follows from there.",
      },
      {
        title: "Make it usable",
        description:
          "Software that operators won't use is software that doesn't work. Everything we build is designed for the people on the floor, fast, clear, no training manual required.",
      },
      {
        title: "Own the outcome",
        description:
          "We don't hand over a system and walk away. We stay involved through rollout, adoption, and iteration. If it's not delivering results, that's our problem too.",
      },
      {
        title: "Earn trust with data",
        description:
          "We avoid buzzwords and vague promises. When we say a system will improve OEE, we show how, by how much, and what it takes. Decisions should be based on facts, including the decision to work with us.",
      },
    ],
    stats: [
      { metric: "100+", label: "Factories" },
      { metric: "10+", label: "Years of experience" },
      {
        metric: "5",
        label: "Disciplines",
        detail:
          "Automation, IoT, software, operations implementation, operations consulting",
      },
    ],
    statsTitle: "Who we are",
    cta: "Talk to us",
    visual: {
      eyebrow: "What we build",
      title: "Software that earns its place on the floor",
      body: "Every screen we ship gets used by someone mid-shift, with gloves on, under time pressure. That constraint shapes everything. If it needs a manual, we got it wrong.",
    },
  },
  da: {
    meta: {
      title: "Om OptiPeople",
      description:
        "Mød teamet bag OptiPeople og se hvordan vi hjælper produktionsvirksomheder med at forbinde systemer og bruge driftsdata.",
    },
    eyebrow: "Om os",
    title: "Vi får industriel drift til at fungere",
    intro:
      "OptiPeople bygger software, forbinder systemer og hjælper industrielle teams med at gøre data til bedre beslutninger fra fabriksgulv til ledelse.",
    missionHeading: "Bygget til rummet mellem shopfloor og ERP",
    missionBody:
      "De fleste fabrikker har maskiner, der producerer data, og ERP-systemer der har brug for den. OptiPeople udfylder mellemrummet med realtidsdata, synlighed og handlinger, der forbedrer performance.",
    valuesHeading: "Sådan arbejder vi",
    teamHeading: "Teamet",
    values: [
      {
        title: "Start med problemet",
        description:
          "Vi starter ikke med teknologi. Vi starter med at forstå hvordan driften faktisk fungerer.",
      },
      {
        title: "Gør det brugbart",
        description:
          "Software der ikke bruges på gulvet, virker ikke. Derfor designer vi til mennesker i produktionen.",
      },
      {
        title: "Tag ansvar for resultatet",
        description:
          "Vi afleverer ikke bare et system. Vi bliver involveret i rollout, adoption og forbedring.",
      },
      {
        title: "Skab tillid med data",
        description:
          "Beslutninger skal bygge på fakta, også beslutningen om at arbejde med os.",
      },
    ],
    stats: [
      { metric: "100+", label: "Fabrikker" },
      { metric: "10+", label: "Års erfaring" },
      {
        metric: "5",
        label: "Fagområder",
        detail:
          "Automation, IoT, software, operations implementering, operations consulting",
      },
    ],
    statsTitle: "Hvem vi er",
    cta: "Tal med os",
    visual: {
      eyebrow: "Det, vi bygger",
      title: "Software, der gør sig fortjent til pladsen på gulvet",
      body: "Hver eneste skærm, vi sender ud, bliver brugt midt i et skift, med handsker på og under tidspres. Det vilkår former alt. Skal der en manual til, har vi gjort det forkert.",
    },
  },
}

const priorityByRole: Record<string, number> = {
  "Chief Executive Officer": 1,
  "Chief Technology Officer": 2,
  "Head of Projects": 3,
  "Sales Engineer": 4,
  "Technical Consultant": 5,
  "BI Consultant": 6,
  "IoT Engineer": 7,
  "Marketing Project Manager": 8,
}

const team = [...employees].sort((a, b) => {
  const aPriority = priorityByRole[a.role] ?? 999
  const bPriority = priorityByRole[b.role] ?? 999
  return aPriority === bPriority
    ? a.name.localeCompare(b.name)
    : aPriority - bPriority
})

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const { meta } = copy[locale as Locale]
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/about",
    locale: locale as Locale,
  })
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale]
  // Slate: the neutral surface, so the company page reads as "about us"
  // rather than as another product page.
  const theme = getSurface("slate")

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 55%, transparent 100%)`,
          }}
        />
        <div className="px-[var(--edge)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-foreground/65 lg:text-xl">
            {t.intro}
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href="/contact">{t.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Proof strip. These numbers used to sit alone at the very bottom of
          the page, after the last section, with nothing following them. */}
      <section className="px-[var(--edge)] pt-16 lg:pt-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
          {t.statsTitle}
        </p>
        <dl className="mt-6 grid grid-cols-1 divide-y divide-black/[0.08] border-y border-black/[0.08] sm:grid-cols-3 sm:divide-y-0">
          {t.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 sm:py-10 ${
                i > 0 ? "sm:border-l sm:border-black/[0.08] sm:pl-8" : ""
              } ${i < t.stats.length - 1 ? "sm:pr-8" : ""}`}
            >
              <dt className="text-4xl font-extralight leading-none tracking-tight tabular-nums text-foreground lg:text-5xl">
                {stat.metric}
              </dt>
              <dd className="mt-3 max-w-[26ch] text-sm leading-relaxed text-foreground/55">
                {stat.label}
                {stat.detail ? (
                  <span className="mt-1 block text-foreground/40">
                    {stat.detail}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Mission: asymmetric, replacing the centred max-w-3xl block. */}
      <section className="px-[var(--edge)] py-20 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <h2 className="text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:sticky lg:top-28 lg:self-start lg:text-4xl">
            {t.missionHeading}
          </h2>
          <p className="text-lg font-light leading-relaxed text-foreground/65 lg:text-xl">
            {t.missionBody}
          </p>
        </div>
      </section>

      {/* Values: numbered rail on hairlines. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {t.valuesHeading}
        </h2>
        <ol className="mt-10 grid grid-cols-1 border-t border-black/[0.08] sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {t.values.map((value, i) => (
            <li
              key={value.title}
              className={`border-b border-black/[0.08] py-8 lg:py-10 ${
                i > 0 ? "sm:pl-8 lg:pl-10" : ""
              } ${i < t.values.length - 1 ? "sm:pr-8 lg:pr-10" : ""} ${
                i % 2 === 1 ? "sm:border-l sm:border-black/[0.08]" : ""
              } ${i > 0 ? "lg:border-l lg:border-black/[0.08]" : "lg:border-l-0"}`}
            >
              <span className="text-sm font-medium tabular-nums text-foreground/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-light tracking-tight text-foreground lg:text-2xl">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                {value.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team: tinted cards rather than bare photos on a grey band. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {t.teamHeading}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {team.map((person) => (
            <article
              key={person.slug}
              className="reveal overflow-hidden rounded-[1.25rem] lg:rounded-[1.5rem]"
              style={{ backgroundColor: theme.tint }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-base font-medium tracking-tight text-foreground">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm text-foreground/60">{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing statement: full-bleed deep surface. */}
      <section
        className="py-20 text-white lg:py-32"
        style={{ backgroundColor: theme.deep }}
      >
        <div className="px-[var(--edge)]">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {t.visual.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-light leading-[1.15] tracking-tight lg:text-4xl">
              {t.visual.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65 lg:text-lg">
              {t.visual.body}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
