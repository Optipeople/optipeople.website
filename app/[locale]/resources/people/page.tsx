import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { generalEmail } from "@/lib/contact"
import { employees } from "@/lib/employees"
import { getSurface, rotateSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

type PeopleCopy = {
  meta: { title: string; description: string }
  eyebrow: string
  title: string
  intro: string
  stats: { metric: string; label: string }[]
  secondaryTitle: string
  secondary: string
  teamTitle: string
  contactNote: string
  softwareTeam: {
    team: string
    title: string
    description: string
    tileEyebrow: string
    builds: string[]
    expertise: string[]
  }
  closingTitle: string
  closingLinks: { title: string; description: string; href: string }[]
}

const copy: Record<Locale, PeopleCopy> = {
  en: {
    meta: {
      title: "People | OptiPeople",
      description:
        "Meet the team behind OptiPeople: the people who work with sales, projects, IoT, business intelligence, and platform engineering.",
    },
    eyebrow: "People",
    title: "Meet OptiPeople",
    intro:
      "A hands-on team with experience in software, projects, BI, IoT, sales, and industrial operations. Between us we cover the whole path from a machine on the floor to a report someone actually uses.",
    stats: [
      { metric: "100+", label: "Factories" },
      { metric: "10+", label: "Years of experience" },
      { metric: "1", label: "Digital partner for your company" },
    ],
    secondaryTitle: "You keep talking to the same people",
    secondary:
      "We work closely with the factories we serve. You have a dedicated contact throughout, and the person who scopes your project is the one who does most of the work on it. So the people you meet at the start are the people you keep talking to.",
    teamTitle: "The team",
    contactNote:
      "Write to whoever is closest to your question, or send it to hi@optipeople.dk and we will route it.",
    softwareTeam: {
      team: "Software team",
      title: "The development team",
      description:
        "The developers and engineers who build and run the OptiPeople Data Platform, from the device on the machine to the report in your inbox.",
      tileEyebrow: "What they build",
      builds: [
        "OptiPeople Data Platform",
        "IoT edge and connectivity",
        "ERP and MES integrations",
        "AI, copilots and reporting",
      ],
      expertise: ["Platform Engineering", "IoT", "Integrations", "AI"],
    },
    closingTitle: "Not sure who to ask?",
    closingLinks: [
      {
        title: "Get help",
        description:
          "Support routes, response times, and the questions we answer most often.",
        href: "/get-help",
      },
      {
        title: "Talk to us",
        description:
          "Tell us what your production looks like and we will point you at the right person.",
        href: "/contact",
      },
    ],
  },
  da: {
    meta: {
      title: "Mennesker | OptiPeople",
      description:
        "Mød teamet bag OptiPeople: dem der arbejder med salg, projekter, IoT, business intelligence og platformsudvikling.",
    },
    eyebrow: "Mennesker",
    title: "Mød OptiPeople",
    intro:
      "Et praktisk team med erfaring i software, projekter, BI, IoT, salg og industriel drift. Tilsammen dækker vi hele vejen fra en maskine på gulvet til en rapport, nogen rent faktisk bruger.",
    stats: [
      { metric: "100+", label: "Fabrikker" },
      { metric: "10+", label: "Års erfaring" },
      { metric: "1", label: "Digital partner til jeres virksomhed" },
    ],
    secondaryTitle: "I taler med de samme mennesker hele vejen",
    secondary:
      "Vi arbejder tæt sammen med de fabrikker, vi løser opgaver for. I har én fast kontaktperson hele vejen, og den, der skruer jeres projekt sammen, er også den, der laver det meste af arbejdet. Så dem, I møder i starten, er dem, I bliver ved med at tale med.",
    teamTitle: "Teamet",
    contactNote:
      "Skriv til den, der er tættest på jeres spørgsmål, eller send det til hej@optipeople.dk, så sender vi det videre.",
    softwareTeam: {
      team: "Softwareteam",
      title: "Udviklingsteamet",
      description:
        "Udviklerne og ingeniørerne, der bygger og driver OptiPeople Data Platform, fra boksen på maskinen til rapporten i jeres indbakke.",
      tileEyebrow: "Det, de bygger",
      builds: [
        "OptiPeople Data Platform",
        "IoT-enheder og opkobling",
        "ERP- og MES-integrationer",
        "AI, copiloter og rapporter",
      ],
      expertise: ["Platformsudvikling", "IoT", "Integrationer", "AI"],
    },
    closingTitle: "I tvivl om hvem I skal spørge?",
    closingLinks: [
      {
        title: "Få hjælp",
        description:
          "Supportveje, svartider og de spørgsmål vi oftest svarer på.",
        href: "/get-help",
      },
      {
        title: "Tal med os",
        description:
          "Fortæl os, hvordan jeres produktion ser ud, så peger vi på den rigtige person.",
        href: "/contact",
      },
    ],
  },
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const { meta } = copy[locale as Locale] ?? copy.en
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/resources/people",
    locale: locale as Locale,
  })
}

/**
 * People.
 *
 * Same design language as the deep-dive templates: the `--edge` column,
 * `font-normal` display type, oversized tabular figures on a hairline strip,
 * and tinted surfaces rather than bare photos on white.
 *
 * Each person sits on their own surface from the brand rotation, so the grid
 * reads as individuals rather than one card template repeated, which is the
 * whole point of the page. The software team closes the grid as
 * one card: its developers have no public profiles, so the photo slot carries
 * what they build instead of a face.
 *
 * The figures in the strip are the same company-level claims as on /about
 * (factories, years, one partner), not a headcount. The page sells the track
 * record, never the size of the team, and the copy must not call it small.
 */
export default async function PeoplePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  const theme = getSurface("purple")
  // The software team has no public individual addresses, so its card points at
  // the shared inbox the contact note already routes through.
  const softwareTeamEmail = generalEmail(locale as Locale)

  return (
    <div className="min-h-screen">
      {/* Hero on the tint, which fades out before the first photograph. */}
      <section className="relative isolate overflow-hidden pb-16 pt-12 lg:pb-20 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 60%, transparent 100%)`,
          }}
        />

        <div className="px-[var(--edge)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.intro}
          </p>

          <dl className="mt-12 grid max-w-3xl grid-cols-1 divide-y divide-black/[0.08] border-y border-black/[0.08] sm:grid-cols-3 sm:divide-y-0 lg:mt-14">
            {t.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-7 ${
                  i > 0 ? "sm:border-l sm:border-black/[0.08] sm:pl-8" : ""
                } ${i < t.stats.length - 1 ? "sm:pr-8" : ""}`}
              >
                <dt className="text-4xl font-light leading-none tracking-tight tabular-nums text-foreground lg:text-5xl">
                  {stat.metric}
                </dt>
                <dd className="mt-3 max-w-[22ch] text-sm leading-relaxed text-foreground/70">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The claim about how we work, on the asymmetric two-column. */}
      <section className="px-[var(--edge)] py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
            {t.secondaryTitle}
          </h2>
          <p className="text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.secondary}
          </p>
        </div>
      </section>

      {/* The team itself. */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-2xl font-normal tracking-tight text-foreground lg:text-3xl">
            {t.teamTitle}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-foreground/70">
            {t.contactNote}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {employees.map((person, i) => (
            <article
              key={person.slug}
              className="reveal flex flex-col rounded-[1.25rem] p-5 lg:rounded-[1.5rem] lg:p-6"
              style={{ backgroundColor: rotateSurface(i).tint }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.08]">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
                />
              </div>

              <div className="mt-6 flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                  {person.team}
                </p>
                <h3 className="mt-3 text-xl font-normal tracking-tight text-foreground">
                  {person.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/72">
                  {person.role}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {person.expertise.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-black/10 px-2.5 py-0.5 text-xs text-foreground/70"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:${person.email}`}
                className="group mt-6 inline-flex items-center gap-3 text-sm text-foreground/78 transition-colors hover:text-foreground"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="truncate">{person.email}</span>
              </a>
            </article>
          ))}

          {/*
            The software team as one card. Same frame as a person, but the
            photo slot is the page's deep surface listing what the team builds,
            since the developers behind the platform have no public profiles.
          */}
          <article
            className="reveal flex flex-col rounded-[1.25rem] p-5 lg:rounded-[1.5rem] lg:p-6"
            style={{ backgroundColor: rotateSurface(employees.length).tint }}
          >
            <div
              className="flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-xl p-5 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.08] lg:p-6"
              style={{ backgroundColor: theme.deep }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                {t.softwareTeam.tileEyebrow}
              </p>
              <ol className="border-t border-white/[0.14]">
                {t.softwareTeam.builds.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 border-b border-white/[0.14] py-3.5"
                  >
                    <span className="text-xs tabular-nums text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-snug text-white/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                {t.softwareTeam.team}
              </p>
              <h3 className="mt-3 text-xl font-normal tracking-tight text-foreground">
                {t.softwareTeam.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/72">
                {t.softwareTeam.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {t.softwareTeam.expertise.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-black/10 px-2.5 py-0.5 text-xs text-foreground/70"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`mailto:${softwareTeamEmail}`}
              className="group mt-6 inline-flex items-center gap-3 text-sm text-foreground/78 transition-colors hover:text-foreground"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="truncate">{softwareTeamEmail}</span>
            </a>
          </article>
        </div>
      </section>

      {/* Where to go next, on the hairline grid. */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <h2 className="text-2xl font-normal tracking-tight text-foreground lg:text-3xl">
          {t.closingTitle}
        </h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] bg-black/[0.08] sm:grid-cols-2">
          {t.closingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-start justify-between gap-6 bg-background p-8 transition-colors hover:bg-[var(--gray-1)] lg:p-10"
            >
              <div>
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {link.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/72">
                  {link.description}
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors group-hover:border-black/25">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
