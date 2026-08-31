import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { employees } from "@/lib/employees"
import { getSurface, rotateSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

type PeopleCopy = {
  meta: { title: string; description: string }
  eyebrow: string
  title: string
  intro: string
  secondaryTitle: string
  secondary: string
  peopleLabel: string
  teamsLabel: string
  teamTitle: string
  contactNote: string
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
      "A small, hands-on team with experience in software, projects, BI, IoT, sales, and industrial operations. Between us we cover the whole path from a machine on the floor to a report someone actually uses.",
    secondaryTitle: "You keep talking to the same people",
    secondary:
      "We work directly with the factories we serve, which means the person who scopes your project is usually the person you keep talking to. There is no account-management layer between you and the people doing the work.",
    peopleLabel: "people on the team",
    teamsLabel: "disciplines, from sales to platform engineering",
    teamTitle: "The team",
    contactNote:
      "Write to whoever is closest to your question, or send it to hej@optipeople.dk and we will route it.",
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
      "Et lille, praktisk team med erfaring i software, projekter, BI, IoT, salg og industriel drift. Tilsammen dækker vi hele vejen fra en maskine på gulvet til en rapport, nogen rent faktisk bruger.",
    secondaryTitle: "I taler med de samme mennesker hele vejen",
    secondary:
      "Vi arbejder direkte med de fabrikker, vi løser opgaver for. Den, der skruer jeres projekt sammen, er derfor typisk også den, I bliver ved med at tale med. Der ligger ikke et lag af kundeansvarlige mellem jer og dem, der laver arbejdet.",
    peopleLabel: "mennesker i teamet",
    teamsLabel: "fagområder, fra salg til platformsudvikling",
    teamTitle: "Teamet",
    contactNote:
      "Skriv til den, der er tættest på jeres spørgsmål, eller send det til hej@optipeople.dk, så sender vi det videre.",
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
 * Each person sits on their own surface from the brand rotation. On a team of
 * nine that reads as nine individuals rather than one card template repeated,
 * which is the whole point of the page. The figures in the strip are counted
 * from lib/employees.ts, so they cannot fall out of date.
 */
export default async function PeoplePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  const theme = getSurface("purple")
  const teams = new Set(employees.map((person) => person.team)).size

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

          <dl className="mt-12 grid max-w-2xl grid-cols-1 border-y border-black/[0.08] sm:grid-cols-2 lg:mt-14">
            <div className="py-7 sm:pr-8 lg:pr-12">
              <dt className="text-4xl font-light leading-none tracking-tight tabular-nums text-foreground lg:text-5xl">
                {employees.length}
              </dt>
              <dd className="mt-3 max-w-[24ch] text-sm leading-relaxed text-foreground/70">
                {t.peopleLabel}
              </dd>
            </div>
            <div className="border-t border-black/[0.08] py-7 sm:border-l sm:border-t-0 sm:pl-8 lg:pl-12">
              <dt className="text-4xl font-light leading-none tracking-tight tabular-nums text-foreground lg:text-5xl">
                {teams}
              </dt>
              <dd className="mt-3 max-w-[24ch] text-sm leading-relaxed text-foreground/70">
                {t.teamsLabel}
              </dd>
            </div>
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
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
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
        </div>
      </section>

      {/* Where to go next, on the hairline grid. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
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
