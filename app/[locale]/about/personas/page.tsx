import type { Metadata } from "next"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { personaHref, personas } from "@/content/personas"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/structured-data"

type Props = { params: Promise<{ locale: string }> }

const copy: Record<
  Locale,
  {
    metaTitle: string
    metaDescription: string
    cases: string
    eyebrow: string
    headline: string
    body: string
    readMore: string
  }
> = {
  en: {
    metaTitle: "Personas | OptiPeople",
    metaDescription:
      "The roles we work with in manufacturing, from the CEO to the planner: a short video for each, and the problems OptiPeople Data Platform helps solve in that job.",
    cases: "Cases",
    eyebrow: "Personas",
    headline: "Find your role",
    body: "A short video for each role we work with, and the everyday problems we help solve in that job. The videos are in Danish.",
    readMore: "See how we help",
  },
  da: {
    metaTitle: "Personaer | OptiPeople",
    metaDescription:
      "De roller, vi arbejder med i produktionen, fra direktøren til planlæggeren: en kort video til hver og de problemer, OptiPeople Data Platform hjælper med i jobbet.",
    cases: "Cases",
    eyebrow: "Personaer",
    headline: "Find jeres rolle",
    body: "En kort video til hver af de roller, vi arbejder med, og de problemer i hverdagen, vi hjælper med at løse i netop det job.",
    readMore: "Se, hvordan vi hjælper",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/about/personas",
    locale: locale as Locale,
  })
}

/**
 * Personas index. One card per role, each linking to its own page with the
 * role's video and pains. The cards reuse the Short's 9:16 thumbnail, the
 * same image the role grid on /videos shows.
 */
export default async function PersonasPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const l = locale as Locale
  const t = copy[l] ?? copy.en
  const theme = getSurface("teal")

  return (
    <div className="min-h-screen">
      <JsonLd
        data={breadcrumbSchema(l, [
          { name: t.cases, path: "/cases" },
          { name: t.eyebrow, path: "/about/personas" },
        ])}
      />
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
            <Link href="/cases" className="hover:text-foreground">
              {t.cases}
            </Link>
            {" / "}
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.body}
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-28">
        <div className="px-[var(--edge)]">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12">
            {personas.map((p) => {
              const c = p.content[l]
              return (
                <li key={p.slug}>
                  <Link href={personaHref(p.slug)} className="group block">
                    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] ring-1 ring-black/[0.08]">
                      <Image
                        src={`https://i.ytimg.com/vi/${p.videoId}/oardefault.jpg`}
                        alt=""
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <h2 className="mt-4 text-base font-medium leading-snug tracking-tight text-foreground sm:text-lg">
                      {c.name}
                    </h2>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors group-hover:text-foreground">
                      {t.readMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}
