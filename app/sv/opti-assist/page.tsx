import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  Clock,
  FileSearch,
  FolderUp,
  MessageSquareText,
  Phone,
  Printer,
  QrCode,
  ShieldQuestion,
  Smartphone,
} from "lucide-react"

import logo from "@/app/Optipeople-Logo-Vector.svg"
import { OptiAssistDemo } from "@/components/opti-assist-demo"
import { CampaignTracking } from "@/components/opti-assist-sv/campaign-tracking"
import { DemoRequestForm } from "@/components/opti-assist-sv/demo-request-form"
import { MobileCta } from "@/components/opti-assist-sv/mobile-cta"
import { svCopy as c } from "@/content/opti-assist-sv"
import { getAiCapability } from "@/lib/ai-stack"
import { getPageTheme } from "@/lib/page-theme"

// Swedish cold email landing page for Opti Assist. Unlinked on purpose: no
// nav, footer, sitemap or language switcher points here, and it is noindex
// (app/sv/layout.tsx metadata plus an X-Robots-Tag in next.config.ts). One
// goal, booking a demo, so every CTA goes to the #boka form on this page.

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

// Nothing on the page depends on the request; the campaign params are read in
// the browser. Static keeps it fast for every mail recipient.
export const dynamic = "force-static"

const PROBLEM_ICONS = [Phone, BookOpen, Clock]
const STEP_ICONS = [QrCode, MessageSquareText, FileSearch]
const TRUST_ICONS = [FileSearch, ShieldQuestion, Smartphone, Camera]
const SETUP_ICONS = [FolderUp, Printer, MessageSquareText]

/** Danish wood and metal customers from the shared logo set. */
const LOGOS = [
  { name: "Carl Hansen & Søn", src: "/images/logos/Carl Hansen og Søn.png" },
  { name: "Montana", src: "/images/logos/Montana.png" },
  { name: "Kvik", src: "/images/logos/Kvik.png" },
  { name: "TCM Group", src: "/images/logos/TCM-Group.png" },
  { name: "VOLA", src: "/images/logos/Vola.png" },
  { name: "Hydro Extrusion", src: "/images/logos/Hydro.png" },
  { name: "Steel Products", src: "/images/logos/Steel-Products.png" },
]

const H2 = "text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl"

export default function OptiAssistSwedenPage() {
  const theme = getPageTheme("ai", "chat")
  const phoneBg = getAiCapability("chat")?.theme.bg ?? theme.deep

  return (
    <>
      <CampaignTracking />

      <header className="w-full bg-background">
        <div className="flex h-16 items-center justify-between gap-4 px-6 lg:px-10">
          <Image src={logo} alt="OptiPeople" width={140} height={28} className="h-7 w-auto" priority />
          <a
            href="#boka"
            data-cta="header"
            className="inline-flex h-10 items-center justify-center rounded-sm bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            {c.headerCta}
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden pb-14 pt-6 lg:pb-24 lg:pt-12">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 -z-10 h-[85%]"
            style={{
              background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 45%, transparent 100%)`,
            }}
          />
          <div className="grid grid-cols-1 items-center gap-10 px-[var(--edge)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
                {c.hero.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {c.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/78 lg:text-xl">
                {c.hero.body}
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
                <a
                  id="hero-cta"
                  href="#boka"
                  data-cta="hero"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-primary px-7 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:w-auto"
                >
                  {c.hero.cta}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </a>
                <p className="flex items-center gap-2 text-sm font-medium text-foreground/82">
                  <Check className="h-4 w-4 shrink-0 text-[var(--green-dark3)]" aria-hidden />
                  {c.hero.offer}
                </p>
              </div>
              <ul className="mt-10 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3 text-sm text-foreground/78 sm:grid-cols-2">
                {c.hero.facts.map((fact) => (
                  <li key={fact} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-[var(--green-dark3)]" aria-hidden />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="relative flex items-center justify-center overflow-hidden rounded-[1.75rem] px-6 py-10 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.06] sm:py-14 lg:rounded-[2rem]"
              style={{
                background: `radial-gradient(120% 80% at 50% 0%, #34503f 0%, ${phoneBg} 60%)`,
              }}
            >
              <OptiAssistDemo copy={c.demo} />
            </div>
          </div>
        </section>

        {/* Logo strip */}
        <section aria-label={c.proof.logosLabel} className="px-[var(--edge)] pb-14 lg:pb-20">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {c.proof.logosLabel}
          </p>
          <ul className="mt-6 grid grid-cols-3 items-center justify-items-center gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-7">
            {LOGOS.map((l) => (
              <li key={l.name} className="relative h-9 w-full max-w-28 opacity-60 lg:h-11">
                <Image src={l.src} alt={l.name} fill sizes="112px" className="object-contain grayscale" />
              </li>
            ))}
          </ul>
        </section>

        {/* Problem */}
        <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <h2 className={`max-w-2xl ${H2}`}>{c.problem.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/78">
            {c.problem.body}
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-12 lg:gap-5">
            {c.problem.items.map((item, i) => {
              const Icon = PROBLEM_ICONS[i]
              return (
                <li key={item.title} className="rounded-[1.25rem] border border-black/[0.07] bg-background p-7 lg:rounded-[1.5rem]">
                  <Icon className="h-5 w-5 text-foreground/65" aria-hidden />
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/78">{item.body}</p>
                </li>
              )
            })}
          </ul>
          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-foreground lg:text-2xl">
            {c.problem.answer}
          </p>
        </section>

        {/* How it works */}
        <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <h2 className={`max-w-2xl ${H2}`}>{c.how.title}</h2>
          <ol
            className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] sm:grid-cols-3 lg:mt-12 lg:rounded-[1.75rem]"
            style={{ backgroundColor: theme.tint }}
          >
            {c.how.steps.map((step, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <li key={step.title} className="bg-background p-7 lg:p-9 max-sm:px-0 max-sm:first:pt-0 max-sm:last:pb-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--green-dark3)]"
                      style={{ backgroundColor: theme.tint }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm font-medium tabular-nums text-foreground/65">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-medium tracking-tight text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/78">{step.body}</p>
                </li>
              )
            })}
          </ol>
        </section>

        {/* Trust */}
        <section className="py-16 sm:py-20 lg:py-28" style={{ backgroundColor: theme.tint }}>
          <div className="px-[var(--edge)]">
            <h2 className={`max-w-2xl ${H2}`}>{c.trust.title}</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
              {c.trust.items.map((item, i) => {
                const Icon = TRUST_ICONS[i]
                return (
                  <li key={item.title} className="rounded-[1.25rem] bg-background p-7 lg:rounded-[1.5rem]">
                    <Icon className="h-5 w-5 text-[var(--green-dark3)]" aria-hidden />
                    <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/78">{item.body}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* Setup. Follows a coloured band, so it carries its own top padding. */}
        <section className="px-[var(--edge)] py-16 sm:py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div>
              <h2 className={H2}>{c.setup.title}</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground/78">{c.setup.body}</p>
            </div>
            <div>
              <ol className="space-y-4">
                {c.setup.steps.map((step, i) => {
                  const Icon = SETUP_ICONS[i]
                  return (
                    <li key={step.title} className="flex gap-5 rounded-[1.25rem] border border-black/[0.07] bg-background p-6 lg:rounded-[1.5rem] lg:p-7">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--green-dark3)]" aria-hidden />
                      <div>
                        <h3 className="text-lg font-medium tracking-tight text-foreground">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/78">{step.body}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
              <p className="mt-6 text-sm leading-relaxed text-foreground/72">{c.setup.platformNote}</p>
            </div>
          </div>
        </section>

        {/* Offer, deep brand surface */}
        <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <div
            className="grid gap-10 rounded-[1.75rem] px-7 py-12 text-white sm:px-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:rounded-[2rem] lg:px-16 lg:py-20"
            style={{ backgroundColor: theme.deep }}
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/72">{c.offer.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-normal leading-[1.15] tracking-tight lg:text-4xl">{c.offer.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">{c.offer.body}</p>
              <a
                href="#boka"
                data-cta="offer"
                className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-white px-7 text-base font-semibold text-foreground transition-all hover:bg-white/90 sm:w-auto"
              >
                {c.offer.cta}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
            </div>
            <ul className="grid gap-3">
              {c.offer.points.map((point) => (
                <li key={point} className="flex items-center gap-3 rounded-xl bg-white/[0.07] px-5 py-4 text-base text-white/90">
                  <Check className="h-5 w-5 shrink-0 text-[#7fd49a]" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Proof */}
        <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <h2 className={`max-w-3xl ${H2}`}>{c.proof.title}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:gap-5">
            {c.proof.cases.map((item) => (
              <figure key={item.company} className="rounded-[1.25rem] p-7 lg:rounded-[1.5rem] lg:p-9" style={{ backgroundColor: theme.tint }}>
                <p className="text-4xl font-light tabular-nums tracking-tight text-foreground lg:text-5xl">{item.value}</p>
                <p className="mt-4 text-base leading-relaxed text-foreground/78">{item.body}</p>
                <figcaption className="mt-6 text-sm font-medium text-foreground">{item.company}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Booking */}
        <section id="boka" className="scroll-mt-4 py-16 sm:py-20 lg:py-28" style={{ backgroundColor: theme.tint }}>
          <div className="grid gap-10 px-[var(--edge)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <h2 className={H2}>{c.booking.title}</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground/78">{c.booking.body}</p>
              <ul className="mt-8 hidden space-y-3 text-base text-foreground/82 sm:block">
                {c.booking.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <Check className="h-5 w-5 shrink-0 text-[var(--green-dark3)]" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-[1.5rem] bg-background p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.06] sm:p-9 lg:rounded-[1.75rem]">
              <DemoRequestForm />
            </div>
          </div>
        </section>

        {/* FAQ. Follows a coloured band, so it carries its own top padding. */}
        <section className="px-[var(--edge)] py-16 sm:py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <h2 className={H2}>{c.faq.title}</h2>
            <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {c.faq.items.map((item) => (
                <details key={item.title} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium tracking-tight text-foreground [&::-webkit-details-marker]:hidden">
                    {item.title}
                    <span aria-hidden className="text-2xl font-light leading-none text-foreground/65 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/78">{item.body}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section id="final-cta" className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <div
            className="flex flex-col gap-8 rounded-[1.75rem] px-7 py-12 text-white sm:px-12 lg:flex-row lg:items-end lg:justify-between lg:rounded-[2rem] lg:px-16 lg:py-20"
            style={{ backgroundColor: theme.deep }}
          >
            <div className="max-w-xl">
              <h2 className="text-3xl font-normal leading-[1.15] tracking-tight lg:text-4xl">{c.finalCta.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 lg:text-lg">{c.finalCta.body}</p>
            </div>
            <a
              href="#boka"
              data-cta="final"
              className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-sm bg-white px-7 text-base font-semibold text-foreground transition-all hover:bg-white/90 sm:w-auto"
            >
              {c.finalCta.cta}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[0.07] px-[var(--edge)] py-8 pb-28 sm:pb-8">
        <div className="flex flex-col gap-3 text-sm text-foreground/72 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {c.footer.company}
          </p>
          <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            {c.footer.privacy}
          </Link>
        </div>
      </footer>

      <MobileCta label={c.headerCta} />
    </>
  )
}
