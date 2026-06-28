import Image from "next/image"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import type { FeaturePage } from "@/content/shared/types"
import { MetricsSection } from "./metrics-section"

export function FeaturePageTemplate({ page }: { page: FeaturePage }) {
  const t = useTranslations("pageTemplate")

  return (
    <main className="min-h-screen">
      <section className="px-6 pb-16 pt-16 sm:pt-24 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href={page.parentHref}
              className="transition-colors hover:text-foreground"
            >
              {page.parentLabel}
            </Link>
            <span>/</span>
            <span className="text-foreground">{page.eyebrow}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {page.eyebrow}
              </p>
              <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">
                {page.heroBody}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">{t("bookDemo")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#capabilities">{t("seeHow")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
              <Image
                src={page.heroImage}
                alt={page.heroImageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
            {page.valueTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {page.valueBody}
          </p>
        </div>
      </section>

      <section id="capabilities" className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center lg:mb-20">
            <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
              {page.capabilitiesTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {page.capabilitiesBody}
            </p>
          </div>
          <div className="space-y-16 lg:space-y-24">
            {page.capabilities.map((capability, i) => (
              <div
                key={capability.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <h3 className="text-2xl font-light tracking-tight lg:text-3xl">
                    {capability.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    {capability.description}
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                  <Image
                    src={capability.image}
                    alt={capability.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.showcaseTitle && page.showcaseBody && page.showcaseImage && (
        <section className="px-6 py-20 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center lg:mb-16">
              <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
                {page.showcaseTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {page.showcaseBody}
              </p>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-4xl border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
              <Image
                src={page.showcaseImage}
                alt={page.showcaseAlt ?? page.showcaseTitle}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <MetricsSection title={t("typicalResults")} metrics={page.metrics} />

      <section className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-light lg:text-3xl">
            {t("relatedFeatures")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.related.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group block rounded-xl border border-border/50 bg-background p-6 transition-colors hover:border-border"
              >
                <h3 className="text-lg font-medium transition-colors group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
