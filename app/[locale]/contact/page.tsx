import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Mail, MapPin, Phone } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { LeadEmailForm } from "@/components/lead-email-form"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

type ContactCopy = {
  eyebrow: string
  headline: string
  body: string
  formTitle: string
  quickIntro: string
  orDivider: string
  stepsTitle: string
  steps: { title: string; description: string }[]
  emailLabel: string
  phoneLabel: string
  officeLabel: string
  officeLine2: string
}

const copy: Record<Locale, ContactCopy> = {
  en: {
    eyebrow: "Talk to us",
    headline: "Let's talk about your operations",
    body: "Tell us about your situation and we'll get back to you within one business day. No sales sequence, no gatekeeping: you talk to the people who run the platform.",
    formTitle: "Send a message",
    quickIntro: "Leave your email and we'll reach out, no form required.",
    orDivider: "or",
    stepsTitle: "What happens next",
    steps: [
      {
        title: "We read it the same day",
        description:
          "Your message goes to the team behind Opticloud, not into a queue.",
      },
      {
        title: "A short call",
        description:
          "Twenty minutes on your lines, your machines, and what you already measure today.",
      },
      {
        title: "A walkthrough on your data",
        description:
          "We show the platform against your own production rather than a demo dataset.",
      },
    ],
    emailLabel: "Email",
    phoneLabel: "Phone",
    officeLabel: "Office",
    officeLine2: "8362 Hørning, Denmark",
  },
  da: {
    eyebrow: "Tal med os",
    headline: "Lad os tale om jeres drift",
    body: "Fortæl os om jeres situation, så vender vi tilbage inden for én arbejdsdag. Ingen salgsforløb og ingen omveje: I taler med dem, der driver platformen.",
    formTitle: "Send en besked",
    quickIntro: "Læg din email, så kontakter vi dig. Ingen formular nødvendig.",
    orDivider: "eller",
    stepsTitle: "Hvad sker der så",
    steps: [
      {
        title: "Vi læser den samme dag",
        description:
          "Din besked går til teamet bag Opticloud, ikke ind i en kø.",
      },
      {
        title: "En kort snak",
        description:
          "Tyve minutter om jeres linjer, jeres maskiner og hvad I måler i dag.",
      },
      {
        title: "En gennemgang på jeres data",
        description:
          "Vi viser platformen på jeres egen produktion i stedet for et demodatasæt.",
      },
    ],
    emailLabel: "Email",
    phoneLabel: "Telefon",
    officeLabel: "Kontor",
    officeLine2: "8362 Hørning, Danmark",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  if (locale === "da") {
    return buildMetadata({
      title: "Kontakt OptiPeople",
      description:
        "Kontakt OptiPeople for en snak om produktion, OEE, automation, data og digital drift.",
      path: "/contact",
      locale: "da",
    })
  }

  return buildMetadata({
    title: "Contact OptiPeople",
    description:
      "Talk to OptiPeople about production monitoring, OEE, industrial integrations, and digital operations improvements for your factory.",
    path: "/contact",
    locale: "en",
  })
}

/**
 * Talk to us.
 *
 * Same design language as the deep-dive templates: the `--edge` column,
 * `font-normal` display type, hairline rails, and a tint that washes down from
 * behind the header.
 *
 * The form is treated the way screenshots are treated elsewhere on the site,
 * as a white surface floating on the tint with a ring and a soft shadow, so the
 * thing the visitor came to do is the brightest object on the page. Email,
 * phone and address sit beside it rather than in a second block further down,
 * so a visitor who would rather not fill in a form never has to scroll for the
 * alternative. The conversion CTA is appended globally by
 * app/[locale]/layout.tsx.
 */
export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  const theme = getSurface("green")

  const details = [
    {
      icon: Mail,
      label: t.emailLabel,
      value: "hej@optipeople.dk",
      href: "mailto:hej@optipeople.dk",
    },
    {
      icon: Phone,
      label: t.phoneLabel,
      value: "+45 23 74 47 05",
      href: "tel:+4523744705",
    },
    {
      icon: MapPin,
      label: t.officeLabel,
      value: `Sønderskovvej 17, ${t.officeLine2}`,
      href: undefined,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero and form share one tint wash. */}
      <section className="relative isolate overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 65%, transparent 100%)`,
          }}
        />

        <div className="px-[var(--edge)]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            <div className="lg:pt-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
                {t.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
                {t.body}
              </p>

              {/* Direct routes, for visitors who would rather not use a form. */}
              <dl className="mt-10 space-y-4">
                {details.map((detail) => (
                  <div key={detail.label} className="flex items-center gap-4">
                    <dt className="sr-only">{detail.label}</dt>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70">
                      <detail.icon className="h-4 w-4 text-foreground/72" />
                    </span>
                    <dd className="text-base text-foreground/82">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="transition-colors hover:text-foreground"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* The form is the brightest surface on the page. */}
            <div className="rounded-[1.5rem] bg-white p-7 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.08] sm:p-9 lg:rounded-[1.75rem] lg:p-10">
              <div className="space-y-3">
                <LeadEmailForm showFineprint={false} />
                <p className="px-1 text-sm text-foreground/70">{t.quickIntro}</p>
              </div>

              <div className="my-8 flex items-center gap-4" aria-hidden="true">
                <span className="h-px flex-1 bg-black/[0.08]" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                  {t.orDivider}
                </span>
                <span className="h-px flex-1 bg-black/[0.08]" />
              </div>

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
                {t.formTitle}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What happens next: a numbered hairline rail. */}
      <section className="px-[var(--edge)] pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {t.stepsTitle}
        </h2>
        <ol className="mt-10 grid grid-cols-1 border-t border-black/[0.08] sm:grid-cols-3 lg:mt-14">
          {t.steps.map((step, i) => (
            <li
              key={step.title}
              className={`border-b border-black/[0.08] py-8 lg:py-10 ${
                i > 0 ? "sm:border-l sm:pl-8 lg:pl-12" : ""
              } ${i < t.steps.length - 1 ? "sm:pr-8 lg:pr-12" : ""}`}
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

    </div>
  )
}
