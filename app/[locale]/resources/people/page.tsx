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
    secondary: string
    contactNote: string
  }
> = {
  en: {
    meta: {
      title: "People | OptiPeople",
      description:
        "Meet the team behind OptiPeople — the people who work with sales, projects, IoT, business intelligence, and platform engineering.",
    },
    eyebrow: "People",
    title: "Meet OptiPeople",
    intro:
      "A small, hands-on team with experience in software, projects, BI, IoT, sales, and industrial operations. Between us we cover the whole path from a machine on the floor to a report someone actually uses.",
    secondary:
      "We work directly with the factories we serve, which means the person who scopes your project is usually the person you keep talking to. There is no account-management layer between you and the people doing the work.",
    contactNote:
      "Write to whoever is closest to your question — or send it to hej@optipeople.dk and we will route it.",
  },
  da: {
    meta: {
      title: "Mennesker | OptiPeople",
      description:
        "Mød teamet bag OptiPeople — dem der arbejder med salg, projekter, IoT, business intelligence og platformsudvikling.",
    },
    eyebrow: "Mennesker",
    title: "Mød OptiPeople",
    intro:
      "Et lille, praktisk team med erfaring i software, projekter, BI, IoT, salg og industriel drift. Tilsammen dækker vi hele vejen fra en maskine på gulvet til en rapport, nogen rent faktisk bruger.",
    secondary:
      "Vi arbejder direkte med de fabrikker, vi løser opgaver for. Den, der skruer jeres projekt sammen, er derfor typisk også den, I bliver ved med at tale med. Der ligger ikke et lag af kundeansvarlige mellem jer og dem, der laver arbejdet.",
    contactNote:
      "Skriv til den, der er tættest på jeres spørgsmål — eller send det til hej@optipeople.dk, så sender vi det videre.",
  },
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const { meta } = copy[locale as Locale]
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/resources/people",
    locale: locale as Locale,
  })
}

export default async function PeoplePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale]

  return (
    <main className="min-h-screen px-6 pb-16 pt-16 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {t.eyebrow}
        </p>
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {t.intro}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {t.secondary}
        </p>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t.contactNote}
        </p>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map((person) => (
            <article key={person.slug}>
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
              </div>
              <h2 className="text-base font-medium">{person.name}</h2>
              <p className="text-sm text-muted-foreground">{person.role}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground/70">
                {person.team}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {person.expertise.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${person.email}`}
                className="mt-3 inline-flex text-sm text-primary hover:underline"
              >
                {person.email}
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
