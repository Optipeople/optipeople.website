import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import type { FeaturePage } from "@/content/shared/types"
import { getPageTheme } from "@/lib/page-theme"

/**
 * Feature deep-dive template.
 *
 * Design language follows the homepage: the `--edge` column so every section
 * shares one left line, oversized `font-light` headings, oversized tabular
 * metrics, arrow-in-circle affordances, and large tinted surfaces instead of
 * bordered cards floating on white. Each slug carries its own colour pair
 * (see lib/page-theme.ts) so the eight feature pages stay distinguishable.
 *
 * Section flow: hero, proof strip, value, capabilities, showcase, related.
 * Screenshots lead; copy supports. The conversion CTA is appended globally by
 * app/[locale]/layout.tsx, so the template deliberately ends on related links.
 */
export function FeaturePageTemplate({
  page,
  slug,
}: {
  page: FeaturePage
  slug: string
}) {
  const t = useTranslations("pageTemplate")
  const theme = getPageTheme("features", slug)

  return (
    <main className="min-h-screen">
      {/* Hero — the tint washes down from behind the header and fades out
          before the proof strip, so the page opens on colour, not on white. */}
      <section className="relative isolate overflow-hidden pb-16 pt-8 lg:pb-24 lg:pt-12">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[85%]"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 45%, transparent 100%)`,
          }}
        />

        <div className="px-[var(--edge)]">
          <nav className="flex items-center gap-2 text-sm text-foreground/50">
            <Link
              href={page.parentHref}
              className="transition-colors hover:text-foreground"
            >
              {page.parentLabel}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{page.eyebrow}</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
                {page.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-foreground/65 lg:text-xl">
                {page.heroBody}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link href="/contact">{t("bookDemo")}</Link>
                </Button>
                <Link
                  href="#capabilities"
                  className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  {t("seeHow")}
                </Link>
              </div>
            </div>

            {/* Screenshot floats on the tint rather than sitting in a border. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.08]">
              <Image
                src={page.heroImage}
                alt={page.heroImageAlt}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip — numbers move up out of the page tail so the visitor
          meets the evidence while the claim is still on screen. */}
      <section className="px-[var(--edge)]">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
          {t("typicalResults")}
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

      {/* Value proposition — asymmetric two-column: the statement holds the
          left line while the argument runs beside it. */}
      <section className="px-[var(--edge)] py-20 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <h2 className="text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:sticky lg:top-28 lg:self-start lg:text-4xl">
            {page.valueTitle}
          </h2>
          <p className="text-lg font-light leading-relaxed text-foreground/65 lg:text-xl">
            {page.valueBody}
          </p>
        </div>
      </section>

      {/* Capabilities — numbered tinted panels. Each is a single surface
          holding both the copy and the screenshot, alternating sides. */}
      <section
        id="capabilities"
        className="scroll-mt-24 px-[var(--edge)] pb-20 lg:pb-32"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
            {t("seeCapabilities")}
          </p>
          <h2 className="mt-4 text-3xl font-light leading-[1.15] tracking-tight text-foreground lg:text-4xl">
            {page.capabilitiesTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/60">
            {page.capabilitiesBody}
          </p>
        </div>

        <div className="mt-12 space-y-5 lg:mt-16 lg:space-y-6">
          {page.capabilities.map((capability, i) => (
            <article
              key={capability.title}
              className="reveal grid overflow-hidden rounded-[1.75rem] lg:grid-cols-2 lg:rounded-[2rem]"
              style={{ backgroundColor: theme.tint }}
            >
              <div
                className={`flex flex-col justify-center p-8 sm:p-10 lg:p-14 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <span className="text-sm font-medium tabular-nums text-foreground/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl font-light leading-tight tracking-tight text-foreground lg:text-3xl">
                  {capability.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/65">
                  {capability.description}
                </p>
              </div>

              <div className="p-6 pt-0 sm:p-10 sm:pt-0 lg:p-10">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.08]">
                  <Image
                    src={capability.image}
                    alt={capability.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Showcase — full-bleed deep surface, the one hard rhythm break. */}
      {page.showcaseTitle && page.showcaseBody && page.showcaseImage && (
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
                {page.showcaseTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/65 lg:text-lg">
                {page.showcaseBody}
              </p>
            </div>
            <div className="reveal relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl bg-white/5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.12] lg:mt-16">
              <Image
                src={page.showcaseImage}
                alt={page.showcaseAlt ?? page.showcaseTitle}
                fill
                sizes="(min-width: 1024px) 1140px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Related — hairline grid instead of detached bordered cards.
          The page closes here: the conversion CTA is rendered globally by
          app/[locale]/layout.tsx, so the template must not repeat it. */}
      <section className="px-[var(--edge)] py-20 lg:py-28">
        <h2 className="text-2xl font-light tracking-tight text-foreground lg:text-3xl">
          {t("relatedFeatures")}
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-black/[0.08] sm:grid-cols-3">
          {page.related.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group flex flex-col justify-between gap-8 bg-background p-7 transition-colors hover:bg-[var(--gray-1)]"
            >
              <div>
                <h3 className="text-lg font-medium leading-snug tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {feature.description}
                </p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors group-hover:border-black/25">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
