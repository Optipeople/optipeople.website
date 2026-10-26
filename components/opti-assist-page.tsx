import Link from "next/link"
import {
  ArrowRight,
  Check,
  FolderUp,
  MessageSquareText,
  QrCode,
  Smartphone,
  Sprout,
  Wrench,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { FramedImage } from "@/components/framed-image"
import { OptiAssistDemo } from "@/components/opti-assist-demo"
import { optiAssistCopy } from "@/content/opti-assist"
import { aiCapabilities, getAiCapability } from "@/lib/ai-stack"
import { getPageTheme } from "@/lib/page-theme"
import { addLocalePrefix, type Locale } from "@/lib/i18n"

const STEP_ICONS = [QrCode, MessageSquareText, Wrench]
const SETUP_ICONS = [FolderUp, Smartphone, Wrench, Sprout]

/**
 * The Opti Assist landing page, /ai/chat.
 *
 * Built on the same parts as the other AI capability pages (components/
 * ai-stack-page.tsx): the `--edge` column, font-normal display type, the green
 * page surface, and the closing CTA and related rows. What differs is the
 * middle: the hero plays the app on a phone, and the showcase uses real
 * screenshots from ai.optipeople.dk, because this is a product people can try
 * and the page should show it working.
 */
export function OptiAssistPage({ locale }: { locale: Locale }) {
  const cap = getAiCapability("chat")
  if (!cap) return null

  const c = optiAssistCopy[locale]
  const card = cap.content[locale]
  const theme = getPageTheme("ai", "chat")
  const homeHref = addLocalePrefix("/", locale)
  const contactHref = addLocalePrefix("/contact", locale)
  const related = aiCapabilities.filter((other) => other.slug !== "chat")
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
            <Link href={homeHref} className="transition-colors hover:text-foreground">
              AI
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/88">{c.eyebrow}</span>
          </nav>

          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
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
                <Button asChild size="lg" className="px-7">
                  <Link href={contactHref}>{card.primaryCtaLabel}</Link>
                </Button>
                <a
                  href="#how"
                  className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/82 transition-colors hover:text-foreground"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                    <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
                  </span>
                  {c.howLabel}
                </a>
              </div>
              <ul className="mt-12 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3 text-sm text-foreground/78 sm:grid-cols-2">
                {c.facts.map((fact) => (
                  <li key={fact} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-[var(--green-dark3)]" aria-hidden />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* The phone plays on the card colour the homepage AI slider uses
                for this capability, so arriving here feels like the card
                opened up. */}
            <div
              className="relative flex items-center justify-center overflow-hidden rounded-[1.75rem] px-6 py-12 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.06] sm:py-14 lg:rounded-[2rem]"
              style={{
                background: `radial-gradient(120% 80% at 50% 0%, #34503f 0%, ${cap.theme.bg} 60%)`,
              }}
            >
              <OptiAssistDemo copy={c.demo} />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-24 px-[var(--edge)] py-16 sm:py-20 lg:py-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {c.howTitle}
        </h2>
        <ol
          className="reveal mt-10 grid gap-px overflow-hidden rounded-[1.5rem] sm:grid-cols-3 lg:mt-14 lg:rounded-[1.75rem]"
          style={{ backgroundColor: theme.tint }}
        >
          {c.steps.map((step, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <li key={step.title} className="bg-background p-7 lg:p-9">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--green-dark3)]"
                    style={{ backgroundColor: theme.tint }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-medium tabular-nums text-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-medium tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/78">
                  {step.body}
                </p>
              </li>
            )
          })}
        </ol>
      </section>

      {/* Showcase, real screenshots, text and picture swap sides per row. */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {c.showcaseTitle}
        </h2>
        <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
          {c.showcases.map((item, i) => (
            <div
              key={item.image}
              className={`reveal grid items-center gap-8 overflow-hidden rounded-[1.5rem] p-7 sm:p-10 lg:gap-12 lg:rounded-[1.75rem] lg:p-12 ${i % 2 ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]" : "lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]"}`}
              style={{ backgroundColor: theme.tint }}
            >
              <div className={i % 2 ? "lg:order-2" : ""}>
                <span className="text-sm font-medium tabular-nums text-foreground/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl font-normal leading-[1.2] tracking-tight text-foreground lg:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/78 lg:text-lg">
                  {item.body}
                </p>
              </div>
              <AppWindow>
                <FramedImage
                  src={item.image}
                  alt={item.alt}
                  boxSizes="(min-width: 1024px) 680px, 100vw"
                  cap="[--frame-cap:30rem] lg:[--frame-cap:36rem]"
                  className="mx-auto"
                />
              </AppWindow>
            </div>
          ))}
        </div>
      </section>

      {/* Setup */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
              {c.setupTitle}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground/78">
              {c.setupBody}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {c.setup.map((item, i) => {
              const Icon = SETUP_ICONS[i]
              return (
                <div
                  key={item.title}
                  className="reveal rounded-[1.25rem] border border-black/[0.07] bg-background p-7 lg:rounded-[1.5rem] lg:p-8"
                >
                  <Icon className="h-5 w-5 text-[var(--green-dark3)]" aria-hidden />
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/78">
                    {item.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA, deep brand surface. */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <div
          className="flex flex-col gap-8 rounded-[1.75rem] px-8 py-14 text-white sm:px-12 lg:flex-row lg:items-end lg:justify-between lg:rounded-[2rem] lg:px-16 lg:py-20"
          style={{ backgroundColor: theme.deep }}
        >
          <div className="max-w-xl">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight lg:text-4xl">
              {card.ctaTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78 lg:text-lg">
              {card.ctaBody}
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 self-start bg-white px-7 text-foreground hover:bg-white/90 lg:self-auto"
          >
            <Link href={contactHref}>{card.primaryCtaLabel}</Link>
          </Button>
        </div>
      </section>

      {/* Related capabilities, each row keeps its own colour. */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
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

/** A light browser-style window around a screenshot of the app. */
function AppWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#f7f7f6] shadow-[0_18px_44px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.08]">
      <div className="flex items-center gap-1.5 bg-[#233431] px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-3 text-[0.68rem] font-medium text-white/70">ai.optipeople.dk</span>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  )
}
