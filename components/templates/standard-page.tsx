import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { DocumentsVisual, MesVisual } from "@/components/module-mockups"
import type { StandardPage } from "@/content/shared/types"
import { getPageTheme, type PageFamily } from "@/lib/page-theme"

/**
 * Overview template for modules, services, and solutions.
 *
 * Same design language as the feature deep-dive (components/templates/
 * feature-page.tsx): the `--edge` column, `font-light` display type, oversized
 * tabular metrics, and tinted surfaces instead of bordered cards on white.
 * Where the feature page leads with a screenshot, this one leads with an
 * editorial statement, these pages sell a scope, not a screen.
 *
 * Section flow: hero, proof strip, intro, capabilities, steps, visual.
 * The conversion CTA is appended globally by app/[locale]/layout.tsx, so the
 * template deliberately does not repeat it.
 *
 * `page.darkHero` opens on the deep brand surface rather than the tint, used
 * by the solution pages, which need more weight up top.
 */
export function StandardPageTemplate({
  page,
  family,
  slug,
}: {
  page: StandardPage
  family: PageFamily
  slug: string
}) {
  const t = useTranslations("pageTemplate")
  const theme = getPageTheme(family, slug)
  const dark = page.darkHero === true

  return (
    <main className="min-h-screen">
      {/* Hero, a wide editorial statement rather than a centred column. */}
      <section
        className={`relative isolate overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20 ${
          dark ? "text-white" : ""
        }`}
        style={dark ? { backgroundColor: theme.deep } : undefined}
      >
        {!dark && (
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 -z-10 h-full"
            style={{
              background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 55%, transparent 100%)`,
            }}
          />
        )}

        <div className="px-[var(--edge)]">
          <p
            className={`text-xs font-medium uppercase tracking-[0.2em] ${
              dark ? "text-white/50" : "text-foreground/45"
            }`}
          >
            {page.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {page.heroTitle}
          </h1>
          <p
            className={`mt-6 max-w-2xl text-lg font-light leading-relaxed lg:text-xl ${
              dark ? "text-white/70" : "text-foreground/65"
            }`}
          >
            {page.heroBody}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              asChild
              size="lg"
              className={`rounded-full px-7 ${
                dark ? "bg-white text-foreground hover:bg-white/90" : ""
              }`}
            >
              <Link href="/contact">{page.primaryLabel ?? t("bookDemo")}</Link>
            </Button>
            <Link
              href="#capabilities"
              className={`group inline-flex items-center gap-3 text-sm font-medium transition-colors ${
                dark
                  ? "text-white/70 hover:text-white"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  dark
                    ? "border-white/25 bg-white/10 group-hover:border-white/50 group-hover:bg-white/20"
                    : "border-black/10 bg-white/60 group-hover:border-black/25 group-hover:bg-white"
                }`}
              >
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              {t("seeCapabilities")}
            </Link>
          </div>
        </div>
      </section>

      {/* Proof strip, the numbers used to sit two thirds down the page. */}
      <section className="px-[var(--edge)] pt-16 lg:pt-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
          {page.metricsTitle}
        </p>
        <dl className="mt-6 grid grid-cols-1 border-y border-black/[0.08] sm:grid-cols-3">
          {page.metrics.map((item, i) => (
            <div
              key={item.label}
              className={`py-8 sm:py-10 ${
                i > 0
                  ? "border-t border-black/[0.08] sm:border-l sm:border-t-0 sm:pl-8 lg:pl-12"
                  : ""
              } ${i < page.metrics.length - 1 ? "sm:pr-8 lg:pr-12" : ""}`}
            >
              <dt className="text-4xl font-extralight leading-none tracking-tight tabular-nums text-foreground lg:text-5xl">
                {item.metric}
              </dt>
              <dd className="mt-3 max-w-[22ch] text-sm leading-relaxed text-foreground/55">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Intro, asymmetric: the statement holds the left line, the argument
          runs beside it. */}
      <section className="px-[var(--edge)] py-20 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <h2 className="text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:sticky lg:top-28 lg:self-start lg:text-4xl">
            {page.introTitle}
          </h2>
          <p className="text-lg font-light leading-relaxed text-foreground/65 lg:text-xl">
            {page.introBody}
          </p>
        </div>
      </section>

      {/* Capabilities, tinted cards carrying the page's colour. */}
      <section
        id="capabilities"
        className="scroll-mt-24 px-[var(--edge)] pb-20 lg:pb-28"
      >
        <h2 className="max-w-2xl text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {page.capabilitiesTitle}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {page.features.map((feature) => (
            <div
              key={feature.title}
              className="reveal rounded-[1.25rem] p-7 lg:rounded-[1.5rem] lg:p-8"
              style={{ backgroundColor: theme.tint }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70">
                <feature.icon className="h-5 w-5 text-foreground/70" />
              </span>
              <h3 className="mt-6 text-lg font-medium tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps, a numbered rail on hairlines instead of centred columns. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {page.stepsTitle}
        </h2>
        <ol className="mt-10 grid grid-cols-1 border-t border-black/[0.08] sm:grid-cols-3 lg:mt-14">
          {page.steps.map((step, i) => (
            <li
              key={step.title}
              className={`border-b border-black/[0.08] py-8 lg:py-10 ${
                i > 0 ? "sm:border-l sm:pl-8 lg:pl-12" : ""
              } ${i < page.steps.length - 1 ? "sm:pr-8 lg:pr-12" : ""}`}
            >
              <span className="text-sm font-medium tabular-nums text-foreground/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-light tracking-tight text-foreground lg:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Visual, full-bleed deep surface, the one hard rhythm break. */}
      <section
        className="py-20 text-white lg:py-32"
        style={{ backgroundColor: theme.deep }}
      >
        <div className="px-[var(--edge)]">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {t("productView")}
            </p>
            <h2 className="mt-4 text-3xl font-light leading-[1.15] tracking-tight lg:text-4xl">
              {page.visualTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65 lg:text-lg">
              {page.visualBody}
            </p>
          </div>
          <div className="reveal relative mt-12 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl bg-white/5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.12] lg:mt-16">
            {page.visualDrawn === "documents" ? (
              <DocumentsVisual />
            ) : page.visualDrawn === "mes" ? (
              <MesVisual />
            ) : page.visualImage ? (
              <Image
                src={page.visualImage}
                alt={page.visualAlt ?? page.visualTitle}
                fill
                sizes="(min-width: 1024px) 1140px, 100vw"
                className={`object-cover ${
                  page.visualImagePosition === "top"
                    ? "object-top"
                    : page.visualImagePosition === "bottom"
                      ? "object-bottom"
                      : "object-center"
                }`}
              />
            ) : (
              <p className="text-sm text-white/50">{t("productView")}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
