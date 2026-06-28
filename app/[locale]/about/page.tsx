import Image from "next/image"
import { setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { employees } from "@/lib/employees"
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
    stats: { metric: string; label: string }[]
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
      "OptiPeople is a digital operations company. We build software, connect systems, and help industrial teams turn data into better decisions — from the shopfloor to the boardroom.",
    missionHeading: "Built for the space between shopfloor and ERP",
    missionBody:
      "Most factories have machines that produce data and ERP systems that need it — but nothing useful in between. OptiPeople fills that gap. Our platform, Opticloud, captures real-time production data, makes it visible to operators and managers, and turns it into actions that improve performance, reduce waste, and keep operations running.",
    valuesHeading: "How we work",
    teamHeading: "The team",
    values: [
      {
        title: "Start with the problem",
        description:
          "We don't lead with technology. We start by understanding how your operations actually work — the workarounds, the blind spots, the things that fall between systems. The solution follows from there.",
      },
      {
        title: "Make it usable",
        description:
          "Software that operators won't use is software that doesn't work. Everything we build is designed for the people on the floor — fast, clear, no training manual required.",
      },
      {
        title: "Own the outcome",
        description:
          "We don't hand over a system and walk away. We stay involved through rollout, adoption, and iteration. If it's not delivering results, that's our problem too.",
      },
      {
        title: "Earn trust with data",
        description:
          "We avoid buzzwords and vague promises. When we say a system will improve OEE, we show how, by how much, and what it takes. Decisions should be based on facts — including the decision to work with us.",
      },
    ],
    stats: [
      { metric: `${employees.length}`, label: "Team members" },
      {
        metric: `${new Set(employees.map((employee) => employee.team)).size}`,
        label: "Departments",
      },
      {
        metric: `${new Set(employees.map((employee) => employee.location)).size}`,
        label: "Locations",
      },
      { metric: "2024", label: "On the OptiPeople journey together" },
    ],
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
      { metric: `${employees.length}`, label: "Teammedlemmer" },
      {
        metric: `${new Set(employees.map((employee) => employee.team)).size}`,
        label: "Fagområder",
      },
      {
        metric: `${new Set(employees.map((employee) => employee.location)).size}`,
        label: "Lokationer",
      },
      { metric: "2024", label: "Fælles OptiPeople-rejse" },
    ],
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

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            {t.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Mission / What We Do */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
            {t.missionHeading}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.missionBody}
          </p>
        </div>
      </section>

      {/* Values / How We Work */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-16">
            {t.valuesHeading}
          </h2>
          <div className="space-y-12">
            {t.values.map((value) => (
              <div
                key={value.title}
                className="grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8"
              >
                <h3 className="text-lg font-medium">{value.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-16">
            {t.teamHeading}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {team.map((person) => (
              <div key={person.slug}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-4">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  />
                </div>
                <h3 className="text-base font-medium">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            {t.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl lg:text-6xl font-extralight text-primary tracking-tight">
                  {stat.metric}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
