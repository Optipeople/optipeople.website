import { setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { type Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { SlideCarousel, type SlideData } from "@/components/slide-carousel"
import { LogoWall } from "@/components/logo-wall"
import { HeroModulePicker } from "@/components/hero-module-picker"
import { ProductChapters } from "@/components/product-chapters"
import { WhoWeAreStats } from "@/components/who-we-are-stats"
import { hasModuleMockup } from "@/components/module-mockups"
import { Button } from "@/components/ui/button"
import { moduleCatalog, moduleChipRows } from "@/content/modules-catalog"
import { getPostBySlug } from "@/lib/blog-data"
import { aiStackSlides, aiStackSliderCopy } from "@/lib/ai-stack"
import { customerLogos } from "@/lib/customers"
import { buildMetadata } from "@/lib/seo"
import { ArrowRight } from "lucide-react"
import { heroVariant, homeCopy as copy, homeMetadata as metadataCopy, type ModuleSlideCopy } from "@/content/pages/home"

/** Minimal before/after bar chart, hand-built for the results cards. */
function ComparisonBars({
  before,
  after,
  beforeLabel,
  afterLabel,
  tone,
}: {
  before: number
  after: number
  beforeLabel: string
  afterLabel: string
  tone: "sage" | "dark"
}) {
  const max = Math.max(before, after)
  const height = (v: number) => `${Math.max(10, Math.round((v / max) * 100))}%`
  const baseBar = tone === "dark" ? "bg-white/15" : "bg-black/[0.08]"
  const labelColor = tone === "dark" ? "text-white/65" : "text-black/65"
  const accent = tone === "dark" ? "var(--green-light2)" : "var(--green-system)"

  return (
    <div className="flex h-24 items-end gap-3">
      {[
        { v: before, label: beforeLabel, accent: false },
        { v: after, label: afterLabel, accent: true },
      ].map((bar) => (
        <div key={bar.label} className="flex h-full w-14 flex-col items-center">
          <div className="flex w-full flex-1 items-end">
            <div
              className={`w-full rounded-t-md ${bar.accent ? "" : baseBar}`}
              style={{ height: height(bar.v), background: bar.accent ? accent : undefined }}
            />
          </div>
          <span className={`mt-2 text-xs font-medium tabular-nums ${labelColor}`}>{bar.label}</span>
        </div>
      ))}
    </div>
  )
}

// Per-card color wash for the image case cards, reuses the AI slider's
// palette (see aiCapabilities theme in lib/ai-stack.ts): a mix of deep and
// light brand tones, each paired with the text tone that reads on it. The
// color is applied near-opaque so the photo recedes to a subtle texture.
const CASE_IMAGE_ACCENTS: { bg: string; tone: "light" | "dark" }[] = [
  { bg: "#243b2f", tone: "light" }, // deep green
  { bg: "#c5d8e8", tone: "dark" }, // light blue
  { bg: "#d8d4c6", tone: "dark" }, // warm sand
  { bg: "#163b40", tone: "light" }, // deep teal
]

const caseDateMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function formatCaseDate(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return `${caseDateMonths[parsed.getMonth()]} ${parsed.getFullYear()}`
}

/**
 * One card colour per module. The family is the AI section's, deep greens and
 * teals against a charcoal, a pale blue and a warm sand, because that section
 * is the better looking of the two. It is extended rather than cycled: nine
 * slides over five colours meant the same card turned up three times, and the
 * sequence is deliberately not the AI section's own, since both carousels sit
 * on the same page and should not read as the same run of colour twice.
 *
 * Keyed by module id, not by position, so a module keeps its colour when the
 * catalog is reordered. The alternation of light and dark is tuned for the
 * current order in content/modules-catalog.ts, pale on the odd slides and
 * dark on the even ones, so a reorder is worth a look here. `tone` decides
 * the title, the supporting line and the arrow button.
 */
type ModuleAccent = { bg: string; tone: "light" | "dark" }

const MODULE_SLIDE_ACCENTS: Record<string, ModuleAccent> = {
  orders: { bg: "#d8d4c6", tone: "dark" },
  planning: { bg: "#243b2f", tone: "light" },
  qms: { bg: "#c7d9cd", tone: "dark" },
  iot: { bg: "#1c1f26", tone: "light" },
  oee: { bg: "#c5d8e8", tone: "dark" },
  ems: { bg: "#0f2f33", tone: "light" },
  maintenance: { bg: "#e4ded4", tone: "dark" },
  documents: { bg: "#163b40", tone: "light" },
  "ai-agents": { bg: "#d8d4c6", tone: "dark" },
}

/** A module added to the catalog before it is given a colour still gets a card. */
const MODULE_SLIDE_FALLBACK: ModuleAccent = { bg: "#243b2f", tone: "light" }

/**
 * Builds the module carousel by walking the catalog, so the slides are always
 * the nine modules the hero chips and the nav offer, in the same order. A
 * module with no copy yet still gets a slide, falling back to its catalog
 * blurb.
 */
function buildModuleSlides(
  locale: Locale,
  copyById: Record<string, ModuleSlideCopy>,
  ctaTemplate: string
): SlideData[] {
  return moduleCatalog
    .map((entry) => {
      const label = entry.label[locale]
      const slide = copyById[entry.id]
      // Modules we have no presentable screenshot for draw their visual in code.
      const mockup = hasModuleMockup(entry.id) ? entry.id : undefined
      const accent = MODULE_SLIDE_ACCENTS[entry.id] ?? MODULE_SLIDE_FALLBACK
      return {
        title: label,
        description: slide?.description ?? entry.blurb[locale],
        moduleMockup: mockup,
        imageSrc: mockup ? undefined : slide?.imageSrc ?? "/images/Mockups/Dashboard-Operator-Panel-Desktop.webp",
        imageAlt: mockup ? undefined : slide?.imageAlt ?? label,
        imageFit: slide?.imageFit,
        imagePosition: slide?.imagePosition,
        primaryLabel: ctaTemplate.replace("{module}", label),
        primaryHref: entry.href,
        bgColor: "bg-black",
        layout: "vertical",
        accentColor: accent.bg,
        textTone: accent.tone,
      }
    })
}

/** Chips picked before the visitor touches anything. Locale-independent. */
const heroDefaultModules = ["mes"]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const m = metadataCopy[locale as Locale] ?? metadataCopy.en
  return buildMetadata({
    title: m.title,
    description: m.description,
    path: "/",
    locale: locale as Locale,
  })
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const loc = (locale as Locale) in copy ? (locale as Locale) : "en"
  const t = copy[loc]
  const hero = t.hero.variants[heroVariant]
  const moduleSlides = buildModuleSlides(loc, t.moduleSlides, t.moduleCta)
  const ai = aiStackSliderCopy[loc]

  return (
    <main>
      <section className="py-12 lg:py-16">
        {/* The inner padding stacks on the section's own, so on a phone the
            two together used to push the headline below the first fold. */}
        <div className="w-full px-[var(--edge)] py-10 sm:py-16 lg:py-22">
          <h1 className="mx-auto max-w-3xl text-balance text-center text-4xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {hero.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-center text-lg font-normal leading-snug text-foreground/82 sm:text-xl">
            {hero.subheading}
          </p>
          <HeroModulePicker
            moduleRows={moduleChipRows(loc, t.hero.moduleRows)}
            prompt={t.hero.modulePrompt}
            defaultSelectedIds={heroDefaultModules}
            className="mt-10"
          />
        </div>
      </section>

      {/* The three products the page is built around, each in a section of
          its own shape, stacked to scroll rather than slide. The audience slider that sat
          here is gone from the page; SlideCarousel itself stays for the module
          and AI sections below. */}
      <ProductChapters locale={loc} />

      {/* Follows a coloured band, so it carries its own top padding. */}
      <section className="py-20 lg:py-28">
        <div className="px-[var(--edge)]">
          <p className="mx-auto max-w-2xl text-balance text-center text-lg leading-relaxed text-foreground/78">
            {t.advisory.text}{" "}
            <Link
              href={t.advisory.href}
              className="group inline-flex items-center gap-1 whitespace-nowrap font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {t.advisory.linkLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </p>
        </div>
      </section>

      {/* Who we are: the same three columns as the About page. */}
      <WhoWeAreStats locale={loc} className="pb-8 lg:pb-12" />

      {/* Customer Logo Wall */}
      <LogoWall logos={customerLogos} className="pb-0 lg:pb-0" />

      {/* Trust band, pairs the logo wall with social proof. The page quotes
          customers here and nowhere else: their results live in the case
          cards below, so the quote is one that states no number. */}
      <section className="pt-16 pb-12 sm:pt-20 lg:pt-32 lg:pb-28">
        <div className="grid w-full grid-cols-1 gap-12 px-[var(--edge)] lg:grid-cols-2 lg:gap-16">
          {/* Left, headline + customer stories link */}
          <div>
            <h2 className="text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
              {t.trust.heading}
              <span className="block text-foreground/65">{t.trust.headingSub}</span>
            </h2>
            <Link
              href="/cases"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-foreground/88 transition-colors hover:text-foreground"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-colors group-hover:border-black/20">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              {t.trust.storiesLabel}
            </Link>
          </div>

          {/* Right, featured testimonial */}
          <figure className="flex flex-col">
            <blockquote className="text-xl font-normal leading-relaxed text-foreground/95 lg:text-2xl">
              &ldquo;{t.trust.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              {t.trust.cite}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-12 lg:py-28">
        <div className="pl-[var(--edge)] pr-6 lg:pr-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {t.platform.eyebrow}
          </p>
          <h2 className="text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
            {t.platform.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {t.platform.subtitle}
          </p>
        </div>

        <SlideCarousel
          slides={moduleSlides}
          navigationType={["side-arrows"]}
          ariaLabel={t.platform.ariaLabel}
          className="mt-8"
          storageKey="home-modules"
        />
      </section>

      {/* AI capabilities slider */}
      <section className="py-12 lg:py-28">
        <div className="pl-[var(--edge)] pr-6 lg:pr-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {ai.eyebrow}
          </p>
          <h2 className="text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
            {ai.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {ai.subtitle}
          </p>
        </div>

        <SlideCarousel
          slides={aiStackSlides(loc)}
          navigationType={["side-arrows"]}
          ariaLabel={t.ai.ariaLabel}
          className="mt-8"
          storageKey="home-ai"
        />
      </section>

      {/* Customer Results, Scandinavian bento of measured outcomes */}
      {/* The CTA below carries no top margin, so the two backgrounds already
          meet flush and this band needs no negative margin to pull it up. */}
      <section className="bg-[var(--gray-1)] py-16 sm:py-24 lg:py-32">
        <div className="px-[var(--edge)]">
          {/* Header */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t.bento.eyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-normal tracking-tight text-foreground lg:text-5xl">
                {t.bento.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t.bento.subtitle}
              </p>
            </div>
            <Link
              href="/cases"
              className="group hidden shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-foreground/88 transition-colors hover:border-black/20 hover:text-foreground sm:inline-flex"
            >
              {t.bento.allCases}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Bento grid */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {(() => {
              // Assign each image card a color from the palette, cycling in the
              // order they appear so adjacent cards stay visually distinct.
              const imageAccents: Record<string, (typeof CASE_IMAGE_ACCENTS)[number]> = {}
              let imageIndex = 0
              for (const c of t.bento.caseCards) {
                if (c.kind === "image") {
                  imageAccents[c.slug] =
                    CASE_IMAGE_ACCENTS[imageIndex % CASE_IMAGE_ACCENTS.length]
                  imageIndex++
                }
              }
              return t.bento.caseCards.map((card) => {
              const wide = card.span === "wide"
              const spanClass = wide ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-2"

              const metric = (cls: string) => {
                if (!card.value.includes("→")) return card.value
                const [from, to] = card.value.split("→")
                return (
                  <>
                    {from}
                    <span className={`mx-1 font-light ${cls}`}>→</span>
                    {to}
                  </>
                )
              }

              // ── Chart card (light sage or dark) ──
              if (card.kind === "chart") {
                const dark = card.tone === "dark"
                return (
                  <Link
                    key={card.slug}
                    href={`/blog/${card.slug}`}
                    className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl p-7 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:p-8 ${spanClass} ${
                      dark ? "text-white" : "text-foreground"
                    }`}
                    style={{
                      backgroundColor: dark ? "var(--gray-9)" : "oklch(0.955 0.013 168)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={`text-xs font-medium uppercase tracking-[0.2em] ${
                            dark ? "text-white/70" : "text-foreground/65"
                          }`}
                        >
                          {card.company}
                        </p>
                        <h3 className="mt-4 text-5xl font-normal leading-none tracking-tight tabular-nums lg:text-6xl">
                          {metric(dark ? "text-white/60" : "text-foreground/40")}
                        </h3>
                        <p className={`mt-3 text-sm ${dark ? "text-white/82" : "text-foreground/72"}`}>
                          {card.unit}
                        </p>
                      </div>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                          dark
                            ? "bg-white/10 text-white group-hover:bg-white/20"
                            : "border border-black/10 bg-white/70 text-foreground group-hover:bg-white"
                        }`}
                      >
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>

                    <div className="mt-8 flex items-end justify-between gap-6">
                      {card.chart && (
                        <ComparisonBars {...card.chart} tone={card.tone ?? "sage"} />
                      )}
                      <p
                        className={`max-w-[16rem] text-sm leading-snug ${
                          dark ? "text-white/65" : "text-foreground/65"
                        }`}
                      >
                        {card.note}
                      </p>
                    </div>
                  </Link>
                )
              }

              // ── Image card (full-bleed photo + overlay) ──
              const image = card.plain ? undefined : getPostBySlug(card.slug)?.image
              const accent = imageAccents[card.slug]
              const light = accent.tone === "light"
              return (
                <Link
                  key={card.slug}
                  href={`/blog/${card.slug}`}
                  className={`group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl ${spanClass} ${
                    light ? "text-white" : "text-slate-900"
                  }`}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={`${card.company} production`}
                      fill
                      sizes={wide ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 40vw"}
                      className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-105"
                    />
                  )}
                  {/* color wash, AI-slider palette, near-opaque so the photo
                      recedes to a subtle texture under the brand color. Solid on a
                      plain card, which has no photo under it. */}
                  <div
                    aria-hidden
                    className={`absolute inset-0 ${image ? "opacity-90" : ""}`}
                    style={{ backgroundColor: accent.bg }}
                  />
                  {/* legibility gradient toward the content at the bottom */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t to-transparent ${
                      light ? "from-black/60 via-black/15" : "from-white/65 via-white/20"
                    }`}
                  />

                  <span
                    className={`absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
                      light
                        ? "bg-white/15 text-white group-hover:bg-white/30"
                        : "bg-black/10 text-slate-900 group-hover:bg-black/20"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>

                  <div className="relative p-7 lg:p-8">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                        light ? "text-white/95" : "text-slate-900/90"
                      }`}
                    >
                      {card.company}
                    </p>
                    <h3 className="mt-3 text-5xl font-normal leading-none tracking-tight tabular-nums lg:text-6xl">
                      {card.value}
                    </h3>
                    <p className={`mt-2 text-sm font-medium ${light ? "text-white" : "text-slate-900"}`}>
                      {card.unit}
                    </p>
                    <p className={`mt-3 max-w-sm text-sm leading-snug ${light ? "text-white/90" : "text-slate-900/85"}`}>
                      {card.note}
                    </p>
                  </div>
                </Link>
              )
              })
            })()}
          </div>

          {/* Mobile all-cases */}
          <div className="mt-10 sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/cases">
                {t.bento.allCases}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
