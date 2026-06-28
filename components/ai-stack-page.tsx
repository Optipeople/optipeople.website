import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CapabilityMockup } from "@/components/ai-stack-mockups"
import { aiCapabilities, getAiCapability } from "@/lib/ai-stack"
import { addLocalePrefix, type Locale } from "@/lib/i18n"

/**
 * Bilingual landing-page template for a single AI capability.
 * Rendered by the English `/ai/[slug]` route and the Danish catch-all.
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

  const related = aiCapabilities.filter((other) => other.slug !== cap.slug)
  const relatedLabel = locale === "da" ? "Mere fra OptiPeople AI" : "More from OptiPeople AI"

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="px-6 pb-16 pt-16 sm:pt-24 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href={homeHref}
              className="transition-colors hover:text-foreground"
            >
              {aiLabel}
            </Link>
            <span>/</span>
            <span className="text-foreground">{c.eyebrow}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {c.eyebrow}
              </p>
              <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {c.heroTitle}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">
                {c.heroBody}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={contactHref}>{c.primaryCtaLabel}</Link>
                </Button>
                {c.secondaryCtaLabel && c.secondaryCtaHref && (
                  <Button asChild variant="outline" size="lg">
                    <Link href={c.secondaryCtaHref} target="_blank" rel="noopener noreferrer">
                      {c.secondaryCtaLabel}
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Mockup on the capability's theme color */}
            <div
              className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl p-10 ring-1 ring-black/5"
              style={{ backgroundColor: cap.theme.bg }}
            >
              <div className="w-full max-w-sm">
                <CapabilityMockup slug={cap.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
            {c.valueTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {c.valueBody}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-light tracking-tight lg:mb-16 lg:text-4xl">
            {c.capabilitiesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {c.capabilities.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[var(--gray-2)] bg-background p-6 shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]"
              >
                <h3 className="text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
            {c.ctaTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.ctaBody}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={contactHref}>{c.primaryCtaLabel}</Link>
            </Button>
            {c.secondaryCtaLabel && c.secondaryCtaHref && (
              <Button asChild variant="outline" size="lg">
                <Link href={c.secondaryCtaHref} target="_blank" rel="noopener noreferrer">
                  {c.secondaryCtaLabel}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Related capabilities */}
      <section className="px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-light tracking-tight lg:text-3xl">
            {relatedLabel}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((other) => {
              const oc = other.content[locale]
              return (
                <Link
                  key={other.slug}
                  href={addLocalePrefix(other.href, locale)}
                  className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background p-5 transition-colors hover:border-border"
                >
                  <div>
                    <p className="font-medium">{oc.cardTitle}</p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
