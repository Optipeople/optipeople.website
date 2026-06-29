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
  }
> = {
  en: {
    meta: {
      title: "People | OptiPeople",
      description:
        "Meet the team behind OptiPeople. Browse employees by role, team, and expertise.",
    },
    eyebrow: "People",
    title: "Meet OptiPeople",
    intro:
      "A small, hands-on team with experience in software, projects, BI, IoT, sales, and industrial operations.",
  },
  da: {
    meta: {
      title: "Mennesker | OptiPeople",
      description: "Mød OptiPeople-teamet.",
    },
    eyebrow: "Mennesker",
    title: "Mød OptiPeople",
    intro:
      "Et lille, praktisk team med erfaring i software, projekter, BI, IoT, salg og industriel drift.",
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
              <a
                href={`mailto:${person.email}`}
                className="mt-2 inline-flex text-sm text-primary hover:underline"
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
