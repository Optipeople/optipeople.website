import Image from "next/image"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import type { StandardPage } from "@/content/shared/types"
import { MetricsSection } from "./metrics-section"

export function StandardPageTemplate({ page }: { page: StandardPage }) {
  const t = useTranslations("pageTemplate")

  return (
    <main className="min-h-screen">
      <section
        className={`relative overflow-hidden px-6 pb-16 pt-16 sm:pt-24 lg:px-8 lg:pb-24 ${
          page.darkHero ? "bg-primary" : ""
        }`}
      >
        {page.darkHero && (
          <>
            <Image
              src="/images/default-hero-bg.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </>
        )}
        <div
          className={`relative mx-auto max-w-4xl text-center ${
            page.darkHero ? "text-white" : ""
          }`}
        >
          <p
            className={`mb-4 text-sm font-medium ${
              page.darkHero ? "text-white/90" : "text-primary"
            }`}
          >
            {page.eyebrow}
          </p>
          <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {page.heroTitle}
          </h1>
          <p
            className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl ${
              page.darkHero ? "text-white/80" : "text-muted-foreground"
            }`}
          >
            {page.heroBody}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">{page.primaryLabel ?? t("bookDemo")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={
                page.darkHero
                  ? "border-white/30 bg-white/10 text-white shadow-none hover:bg-white/20 hover:text-white"
                  : ""
              }
            >
              <Link href="#capabilities">{t("seeCapabilities")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
            {page.introTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {page.introBody}
          </p>
        </div>
      </section>

      <section id="capabilities" className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-light lg:text-4xl">
            {page.capabilitiesTitle}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {page.features.map((feature) => (
              <div key={feature.title} className="space-y-3">
                <div className="w-fit rounded-xl bg-primary/10 p-2.5">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="text-3xl font-light tracking-tight lg:text-4xl">
              {page.visualTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {page.visualBody}
            </p>
          </div>
          <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-4xl border border-[var(--gray-2)] bg-muted/30 shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            {page.visualImage ? (
              <Image
                src={page.visualImage}
                alt={page.visualAlt ?? page.visualTitle}
                fill
                className="object-cover"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{t("productView")}</p>
            )}
          </div>
        </div>
      </section>

      <MetricsSection title={page.metricsTitle} metrics={page.metrics} />

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-3xl font-light lg:text-4xl">
            {page.stepsTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3 lg:gap-12">
            {page.steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mb-4 text-4xl font-extralight text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-medium">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
