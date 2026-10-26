import Image from "next/image"
import { setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { WhoWeAreStats } from "@/components/who-we-are-stats"
import { breadcrumbSchema, pageName } from "@/lib/structured-data"
import { aboutCopy as copy, aboutTeam as team } from "@/content/pages/about"

type PageProps = { params: Promise<{ locale: string }> }

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
      <JsonLd
        data={breadcrumbSchema(locale as Locale, [
          { name: pageName(t.meta.title), path: "/about" },
        ])}
      />
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
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.intro}
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="px-7">
              <Link href="/contact">{t.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Proof strip. These numbers used to sit alone at the very bottom of
          the page, after the last section, with nothing following them. */}
      <WhoWeAreStats locale={locale as Locale} className="pt-16 lg:pt-20" />

      {/* Mission: asymmetric, replacing the centred max-w-3xl block. */}
      <section className="px-[var(--edge)] py-16 sm:py-20 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:sticky lg:top-28 lg:self-start lg:text-4xl">
            {t.missionHeading}
          </h2>
          <p className="text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.missionBody}
          </p>
        </div>
      </section>

      {/* Values: numbered rail on hairlines. */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
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
              <span className="text-sm font-medium tabular-nums text-foreground/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-normal tracking-tight text-foreground lg:text-2xl">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/72">
                {value.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team: tinted cards rather than bare photos on a grey band. */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {t.teamHeading}
        </h2>
        {/* Two across even on a phone: eight full-width portraits made the
            page a very long scroll, and a name and a title fit a half column. */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
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
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-sm font-medium leading-snug tracking-tight text-foreground sm:text-base">
                  {person.name}
                </h3>
                <p className="mt-1 text-xs text-foreground/72 sm:text-sm">
                  {person.role}
                </p>
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
        </div>
      </section>
    </main>
  )
}
