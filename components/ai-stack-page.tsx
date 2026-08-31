import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CapabilityMockup } from "@/components/ai-stack-mockups"
import { aiCapabilities, getAiCapability } from "@/lib/ai-stack"
import { getPageTheme } from "@/lib/page-theme"
import { addLocalePrefix, type Locale } from "@/lib/i18n"

/**
 * Bilingual landing-page template for a single AI capability.
 * Rendered by the English `/ai/[slug]` route and the Danish catch-all.
 *
 * Shares the design language of the feature and overview templates (see
 * components/templates/feature-page.tsx): the `--edge` column, `font-normal`
 * display type, tinted surfaces, arrow-in-circle affordances. The hero mockup
 * keeps `cap.theme.bg`, the exact colour its card carries on the homepage
 * slider, so arriving here feels like the card opened up.
 */
export function AiStackPage({
  slug,
  locale,
}: {
  slug: string
  locale: Locale
}) {
  const cap = getAiCapability(slug)
  if (!cap) return null

  const c = cap.content[locale]
  const homeHref = addLocalePrefix("/", locale)
  const contactHref = addLocalePrefix("/contact", locale)
  const aiLabel = "AI"
  const theme = getPageTheme("ai", cap.slug)

  const related = aiCapabilities.filter((other) => other.slug !== cap.slug)
  const relatedLabel =
    locale === "da" ? "Mere fra OptiPeople AI" : "More from OptiPeople AI"

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-16 pt-8 lg:pb-24 lg:pt-12">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[85%]"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 45%, transparent 100%)`,
          }}
        />

        <div className="px-[var(--edge)]">
          <nav className="flex items-center gap-2 text-sm text-foreground/65">
            <Link
              href={homeHref}
              className="transition-colors hover:text-foreground"
            >
              {aiLabel}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/88">{c.eyebrow}</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
                {c.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {c.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
                {c.heroBody}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link href={contactHref}>{c.primaryCtaLabel}</Link>
                </Button>
                {c.secondaryCtaLabel && c.secondaryCtaHref && (
                  <Link
                    href={c.secondaryCtaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/82 transition-colors hover:text-foreground"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    {c.secondaryCtaLabel}
                  </Link>
                )}
              </div>
            </div>

            {/* Mockup on the capability's own card colour. */}
            <div
              className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.75rem] p-10 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.06] lg:rounded-[2rem]"
              style={{ backgroundColor: cap.theme.bg }}
            >
              <div className="w-full max-w-sm">
                <CapabilityMockup slug={cap.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition, asymmetric two-column. */}
      <section className="px-[var(--edge)] py-20 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:sticky lg:top-28 lg:self-start lg:text-4xl">
            {c.valueTitle}
          </h2>
          <p className="text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {c.valueBody}
          </p>
        </div>
      </section>

      {/* Capabilities, numbered cells inside one tinted panel. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {c.capabilitiesTitle}
        </h2>
        <div
          className="reveal mt-10 grid gap-px overflow-hidden rounded-[1.5rem] sm:grid-cols-3 lg:mt-14 lg:rounded-[1.75rem]"
          style={{ backgroundColor: theme.tint }}
        >
          {c.capabilities.map((item, i) => (
            <div key={item.title} className="bg-background p-7 lg:p-9">
              <span className="text-sm font-medium tabular-nums text-foreground/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/78">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases, tinted cards. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {c.useCasesTitle}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-5">
          {c.useCases.map((item) => (
            <div
              key={item.title}
              className="reveal rounded-[1.25rem] p-7 lg:rounded-[1.5rem] lg:p-8"
              style={{ backgroundColor: theme.tint }}
            >
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/78">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Capability CTA, deep brand surface. Bespoke per-capability copy,
          and the only place the secondary action (API reference) is offered,
          so it stays despite the global CTA further down. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        <div
          className="flex flex-col gap-8 rounded-[1.75rem] px-8 py-14 text-white sm:px-12 lg:flex-row lg:items-end lg:justify-between lg:rounded-[2rem] lg:px-16 lg:py-20"
          style={{ backgroundColor: theme.deep }}
        >
          <div className="max-w-xl">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight lg:text-4xl">
              {c.ctaTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78 lg:text-lg">
              {c.ctaBody}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white px-7 text-foreground hover:bg-white/90"
            >
              <Link href={contactHref}>{c.primaryCtaLabel}</Link>
            </Button>
            {c.secondaryCtaLabel && c.secondaryCtaHref && (
              <Link
                href={c.secondaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 transition-colors group-hover:border-white/50 group-hover:bg-white/20">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                {c.secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Related capabilities, each row keeps its own colour. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        <h2 className="text-2xl font-normal tracking-tight text-foreground lg:text-3xl">
          {relatedLabel}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((other) => {
            const oc = other.content[locale]
            const otherTheme = getPageTheme("ai", other.slug)
            return (
              <Link
                key={other.slug}
                href={addLocalePrefix(other.href, locale)}
                className="group flex items-center justify-between gap-4 rounded-[1.25rem] p-6 transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.28)]"
                style={{ backgroundColor: otherTheme.tint }}
              >
                <p className="text-base font-medium tracking-tight text-foreground">
                  {oc.cardTitle}
                </p>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 text-foreground transition-colors group-hover:border-black/25 group-hover:bg-white">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
