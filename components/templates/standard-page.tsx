import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import {
  DocumentsVisual,
  MesVisual,
  OeeVisual,
  RoutesVisual,
} from "@/components/module-mockups"
import { PlatformArchitecture } from "@/components/platform-architecture"
import { FramedImage } from "@/components/framed-image"
import { PageFaqSection } from "@/components/page-faq"
import { AnswerSection, CaseSection } from "@/components/buyer-answer"
import type { StandardPage } from "@/content/shared/types"
import type { Locale } from "@/i18n/routing"
import { getPageTheme, type PageFamily } from "@/lib/page-theme"

/**
 * Overview template for modules, services, and solutions.
 *
 * Same design language as the feature deep-dive (components/templates/
 * feature-page.tsx): the `--edge` column, `font-normal` display type, oversized
 * tabular metrics, and tinted surfaces instead of bordered cards on white.
 * Where the feature page leads with a screenshot, this one leads with an
 * editorial statement, these pages sell a scope, not a screen.
 *
 * Section flow: hero, answer, proof strip, intro, capabilities, deep dives,
 * steps, case, visual. The answer and case render only when the page has
 * them (see components/buyer-answer.tsx). The deep dives only render when
 * `deepDives` is passed: the module
 * pages use it to link down to their feature pages, which the header no
 * longer lists one by one.
 * The conversion CTA is appended globally by app/[locale]/layout.tsx, so the
 * template deliberately does not repeat it.
 *
 * `page.darkHero` opens on the deep brand surface rather than the tint, used
 * by the solution pages, which need more weight up top.
 *
 * The closing visual has three sources, in precedence order:
 * `page.visualSection` swaps the whole band for a section of its own,
 * `page.visualDrawn` renders a code-built graphic inside the 16/9 frame, and
 * `page.visualImage` falls back to a screenshot.
 */
export function StandardPageTemplate({
  page,
  family,
  slug,
  deepDives,
}: {
  page: StandardPage
  family: PageFamily
  slug: string
  deepDives?: {
    title: string
    description: string
    href: string
    image?: string
    imageAlt?: string
  }[]
}) {
  const t = useTranslations("pageTemplate")
  const locale = useLocale() as Locale
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
              dark ? "text-white/65" : "text-foreground/65"
            }`}
          >
            {page.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {page.heroTitle}
          </h1>
          <p
            className={`mt-6 max-w-2xl text-lg font-normal leading-relaxed lg:text-xl ${
              dark ? "text-white/82" : "text-foreground/78"
            }`}
          >
            {page.heroBody}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              asChild
              size="lg"
              className={`px-7 ${
                dark ? "bg-white text-foreground hover:bg-white/90" : ""
              }`}
            >
              <Link href="/contact">{page.primaryLabel ?? t("bookDemo")}</Link>
            </Button>
            <Link
              href="#capabilities"
              className={`group inline-flex items-center gap-3 text-sm font-medium transition-colors ${
                dark
                  ? "text-white/82 hover:text-white"
                  : "text-foreground/82 hover:text-foreground"
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

      {page.answer && (
        <AnswerSection answer={page.answer} theme={theme} className="pt-16 lg:pt-20" />
      )}

      {/* Proof strip, the numbers used to sit two thirds down the page. */}
      <section className="px-[var(--edge)] pt-16 lg:pt-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
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

      {/* Intro, asymmetric: the statement holds the left line, the argument
          runs beside it. */}
      <section className="px-[var(--edge)] py-16 sm:py-20 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:sticky lg:top-28 lg:self-start lg:text-4xl">
            {page.introTitle}
          </h2>
          <p className="text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {page.introBody}
          </p>
        </div>
      </section>

      {page.answers && page.answers.length > 0 && (
        <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <div className="grid gap-px overflow-hidden rounded-2xl bg-black/[0.08] lg:grid-cols-2">
            {page.answers.map((item) => (
              <div key={item.title} className="bg-background p-7 lg:p-10">
                <h2 className="text-2xl font-normal leading-[1.2] tracking-tight text-foreground lg:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/78">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Capabilities, tinted cards carrying the page's colour. */}
      <section
        id="capabilities"
        className="scroll-mt-24 px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28"
      >
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
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
                <feature.icon className="h-5 w-5 text-foreground/82" />
              </span>
              <h3 className="mt-6 text-lg font-medium tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/78">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {deepDives && deepDives.length > 0 && (
        <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <h2 className="text-2xl font-normal tracking-tight text-foreground lg:text-3xl">
            {t("goDeeper")}
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-black/[0.08] sm:grid-cols-2 lg:mt-10">
            {deepDives.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-8 bg-background p-7 transition-colors hover:bg-[var(--gray-1)]"
              >
                <div>
                  <h3 className="text-lg font-medium leading-snug tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/72">
                    {item.description}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors group-hover:border-black/25">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
            {/* An odd count leaves the grid's last cell empty, so it shows
                the last deep dive's screenshot instead of a blank grey box. */}
            {deepDives.length % 2 === 1 && deepDives[deepDives.length - 1].image && (
              <div
                className="relative hidden min-h-[14rem] overflow-hidden sm:block"
                style={{ backgroundColor: theme.tint }}
              >
                <Image
                  src={deepDives[deepDives.length - 1].image!}
                  alt={deepDives[deepDives.length - 1].imageAlt ?? ""}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover object-left-top"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Steps, a numbered rail on hairlines instead of centred columns. */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
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

      {page.caseLink && <CaseSection caseLink={page.caseLink} theme={theme} />}
      {page.rollout && page.rollout.length > 0 && (
        <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
                {page.rolloutTitle}
              </h2>
              {page.rolloutIntro && (
                <p className="mt-4 text-base leading-relaxed text-foreground/78 lg:text-lg">
                  {page.rolloutIntro}
                </p>
              )}
              {page.explainer && (
                <p className="mt-6 text-sm leading-relaxed text-foreground/72">
                  {page.explainer.lead}{" "}
                  <Link
                    href={page.explainer.href}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    {page.explainer.anchor}
                  </Link>
                  {page.explainer.tail}
                </p>
              )}
            </div>
            <ol className="border-t border-black/[0.08]">
              {page.rollout.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-black/[0.08] py-6 lg:py-8"
                >
                  <span className="text-sm font-medium tabular-nums text-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/72">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      {page.faq && <PageFaqSection faq={page.faq} />}

      {/* Visual. Either a section in its own right, or the full-bleed deep
          surface that is otherwise the page's one hard rhythm break. */}
      {page.visualSection === "architecture" ? (
        <PlatformArchitecture locale={locale} />
      ) : (
        <section
          className="py-20 text-white lg:py-32"
          style={{ backgroundColor: theme.deep }}
        >
          <div className="px-[var(--edge)]">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/65">
                {t("productView")}
              </p>
              <h2 className="mt-4 text-3xl font-normal leading-[1.15] tracking-tight lg:text-4xl">
                {page.visualTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/78 lg:text-lg">
                {page.visualBody}
              </p>
            </div>
            {/* A screenshot brings its own shape (see FramedImage). The drawn
                panels are built to fill a 16/9 frame, so they keep one, except
                the MES panel, which stacks below `lg` and is taller than that
                ratio there and gets a content-height frame instead. */}
            {page.visualImage && !page.visualDrawn ? (
              <FramedImage
                src={page.visualImage}
                alt={page.visualAlt ?? page.visualTitle}
                boxSizes="(min-width: 1024px) 1140px, 100vw"
                cap="[--frame-cap:30rem] lg:[--frame-cap:42rem]"
                className="reveal mx-auto mt-12 overflow-hidden rounded-2xl bg-white/5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.12] lg:mt-16"
              />
            ) : (
              <div
                className={`reveal relative mt-12 flex items-center justify-center overflow-hidden rounded-2xl bg-white/5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.12] lg:mt-16 ${
                  page.visualDrawn === "mes"
                    ? "py-[3.5%] lg:aspect-[16/9] lg:py-0"
                    : "aspect-[16/9]"
                }`}
              >
                {page.visualDrawn === "documents" ? (
                  <DocumentsVisual />
                ) : page.visualDrawn === "mes" ? (
                  <MesVisual />
                ) : page.visualDrawn === "oee" ? (
                  <OeeVisual />
                ) : page.visualDrawn === "routes" ? (
                  <RoutesVisual />
                ) : (
                  <p className="text-sm text-white/65">{t("productView")}</p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
