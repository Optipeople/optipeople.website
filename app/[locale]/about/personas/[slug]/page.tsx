import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { moduleCatalog } from "@/content/modules-catalog"
import {
  getPersona,
  personaHref,
  personaSlugs,
  personas,
} from "@/content/personas"
import { ShortVideo } from "@/components/short-video"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/structured-data"

type Props = { params: Promise<{ locale: string; slug: string }> }

const copy: Record<
  Locale,
  {
    about: string
    personas: string
    playLabel: string
    videoNote: string
    painsTitle: string
    modulesTitle: string
    othersTitle: string
  }
> = {
  en: {
    about: "About",
    personas: "Personas",
    playLabel: "Play",
    videoNote: "The video is in Danish.",
    painsTitle: "What we help with",
    modulesTitle: "Where to start",
    othersTitle: "Other roles",
  },
  da: {
    about: "Om",
    personas: "Personaer",
    playLabel: "Afspil",
    videoNote: "",
    painsTitle: "Det hjælper vi med",
    modulesTitle: "Her kan I starte",
    othersTitle: "Andre roller",
  },
}

export function generateStaticParams() {
  return personaSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const persona = getPersona(slug)
  if (!persona) return {}
  const c = persona.content[locale as Locale]
  return buildMetadata({
    title: `${c.name} | ${copy[locale as Locale].personas} | OptiPeople`,
    description: c.metaDescription,
    path: personaHref(slug),
    locale: locale as Locale,
  })
}

/**
 * One persona: the role's Short beside the intro, the three pains we help
 * with, the modules that answer them, and links on to the other roles.
 */
export default async function PersonaPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const l = locale as Locale
  const persona = getPersona(slug)
  if (!persona) notFound()
  const c = persona.content[l]
  const t = copy[l] ?? copy.en
  const theme = getSurface("teal")
  const modules = persona.modules
    .map((id) => moduleCatalog.find((m) => m.id === id))
    .filter((m) => m !== undefined)
  const others = personas.filter((p) => p.slug !== slug)

  return (
    <div className="min-h-screen">
      <JsonLd
        data={breadcrumbSchema(l, [
          { name: t.personas, path: "/about/personas" },
          { name: c.name, path: personaHref(slug) },
        ])}
      />

      {/* Hero: intro on the left, the role's Short on the right. */}
      <section className="relative isolate overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 55%, transparent 100%)`,
          }}
        />
        <div className="grid grid-cols-1 items-start gap-12 px-[var(--edge)] lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
              <Link href="/about" className="hover:text-foreground">
                {t.about}
              </Link>
              {" / "}
              <Link href="/about/personas" className="hover:text-foreground">
                {t.personas}
              </Link>
            </p>
            <h1 className="mt-5 max-w-3xl hyphens-auto text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
              {c.question}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
              {c.intro}
            </p>
          </div>

          <div className="mx-auto w-full max-w-xs lg:max-w-none">
            <ShortVideo
              videoId={persona.videoId}
              title={c.question}
              playLabel={t.playLabel}
              sizes="(min-width: 1024px) 22rem, 20rem"
            />
            {t.videoNote && (
              <p className="mt-3 text-sm text-foreground/65">{t.videoNote}</p>
            )}
          </div>
        </div>
      </section>

      {/* The pains, as numbered rows. */}
      <section className="pb-16 sm:pb-20 lg:pb-28">
        <div className="px-[var(--edge)]">
          <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
            {t.painsTitle}
          </h2>
          <ol className="mt-10 grid grid-cols-1 border-t border-black/10 md:grid-cols-3 lg:mt-14">
            {c.pains.map((pain, i) => (
              <li
                key={pain.title}
                className={`border-b border-black/10 py-8 lg:py-10 ${
                  i > 0 ? "md:border-l md:pl-8 lg:pl-10" : ""
                } ${i < c.pains.length - 1 ? "md:pr-8 lg:pr-10" : ""}`}
              >
                <p className="text-sm tabular-nums text-foreground/55">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-normal tracking-tight text-foreground lg:text-2xl">
                  {pain.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/72">
                  {pain.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The modules that answer these pains. */}
      <section className="pb-16 sm:pb-20 lg:pb-28">
        <div className="px-[var(--edge)]">
          <h2 className="text-2xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-3xl">
            {t.modulesTitle}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {modules.map((m) => (
              <li key={m.id}>
                <Link
                  href={m.href}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-black/10 bg-white/60 p-6 transition-colors hover:border-black/25 hover:bg-white"
                >
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      {m.label[l]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {m.blurb[l]}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-colors group-hover:border-black/25">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing deep band: the other roles. The site-wide contact band
          follows straight after, so there is no CTA of our own here. */}
      <section
        className="py-16 text-white lg:py-20"
        style={{ backgroundColor: theme.deep }}
      >
        <div className="px-[var(--edge)]">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/65">
              {t.othersTitle}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={personaHref(p.slug)}
                    className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white"
                  >
                    {p.content[l].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
