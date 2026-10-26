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
import { getSurface, getThemeForHref } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"
import { FramedImage } from "@/components/framed-image"
import { ReplayShowcases, ReplayStage } from "@/components/replays"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, pageName, platformSchema } from "@/lib/structured-data"
import { platformCopy as copy, platformMetadata as metadataCopy } from "@/content/pages/platform"

type PageProps = { params: Promise<{ locale: string }> }

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

  const m = metadataCopy[loc]
  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbSchema(locale as Locale, [
          { name: pageName(m.title), path: "/platform" },
        ])}
      />
      <JsonLd data={platformSchema({ description: m.description, locale: loc })} />
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
        <div className="grid grid-cols-1 items-center gap-12 px-[var(--edge)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.hero.lede}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild size="lg" className="px-7">
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
          {/* A stop registered on the operator panel, then the same stop in
              the OEE report: the one-record claim, played in the real app. */}
          <ReplayStage slug="platform" locale={loc} deep={theme.deep} />
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
      <section className="px-[var(--edge)] py-16 sm:py-20 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:sticky lg:top-28 lg:self-start lg:text-4xl">
            {t.intro.title}
          </h2>
          <p className="text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.intro.body}
          </p>
        </div>
      </section>

      <ReplayShowcases slug="platform" locale={loc} tint={theme.tint} />

      {/* The modules, once: the flower diagram from lg, the linked cards
          below it. Each card wears the colour of the page it opens, so the
          list previews its destinations. With nine cards in two columns the
          last one spans both, so it reads as the end of the list. */}
      <PlatformFlower
        locale={loc}
        id="modules"
        heading={{ eyebrow: t.modules.eyebrow, title: t.modules.title, description: t.modules.subtitle }}
        moreLabel={t.modules.more}
        mobile={
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {t.modules.cards.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                className={`group flex flex-col rounded-[1.25rem] px-5 py-4 transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.28)] sm:p-6 ${
                  i === t.modules.cards.length - 1 && t.modules.cards.length % 2 === 1 ? "sm:col-span-2" : ""
                }`}
                style={{ backgroundColor: getThemeForHref(card.href).tint }}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-normal tracking-tight text-foreground sm:text-xl">
                    {card.title}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/78">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        }
      />

      {/* Steps: numbered rail on hairlines, replacing the centred 01 to 04 row. */}
      <section className="px-[var(--edge)] py-16 sm:py-20 lg:py-28">
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
          <FramedImage
            src="/images/Mockups/Report-OEE-Efficiency-With-Filter.webp"
            alt={t.visual.title}
            boxSizes="(min-width: 1024px) 1140px, 100vw"
            cap="[--frame-cap:30rem] lg:[--frame-cap:42rem]"
            className="reveal mx-auto mt-12 overflow-hidden rounded-2xl bg-white/5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.12] lg:mt-16"
          />
        </div>
      </section>

      {/* Social proof, the same wall the homepage and newsletter use. */}
      <section className="px-[var(--edge)] pt-20 lg:pt-28">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
          {t.logos}
        </p>
      </section>
      <LogoWall logos={customerLogos} className="pb-16 pt-10 sm:pb-20 lg:pb-28 lg:pt-12" />
    </main>
  )
}
