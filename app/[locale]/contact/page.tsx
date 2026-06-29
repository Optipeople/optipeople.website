import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { ContactForm } from "@/components/contact-form"
import { LeadEmailForm } from "@/components/lead-email-form"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

const copy: Record<
  Locale,
  {
    eyebrow: string
    headline: string
    body: string
    emailLabel: string
    phoneLabel: string
    officeLabel: string
    officeLine2: string
    quickIntro: string
    orDivider: string
  }
> = {
  en: {
    eyebrow: "Contact",
    headline: "Let's talk about your operations",
    body: "Tell us about your situation and we'll get back to you within one business day.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    officeLabel: "Office",
    officeLine2: "8362 Hørning, Denmark",
    quickIntro: "Leave your email and we'll reach out — no form required.",
    orDivider: "or",
  },
  da: {
    eyebrow: "Kontakt",
    headline: "Lad os tale om jeres drift",
    body: "Fortæl os om jeres situation, så vender vi tilbage inden for én arbejdsdag.",
    emailLabel: "Email",
    phoneLabel: "Telefon",
    officeLabel: "Kontor",
    officeLine2: "8362 Hørning, Danmark",
    quickIntro: "Læg din email, så kontakter vi dig — ingen formular nødvendig.",
    orDivider: "eller",
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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale]

  return (
    <>
      {/* Hero + Form */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Context */}
          <div>
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
              {t.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
              {t.headline}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t.body}
            </p>
          </div>

          {/* Right — Form */}
          <div className="space-y-6">
            <div className="space-y-3">
              <LeadEmailForm showFineprint={false} />
              <p className="px-1 text-sm text-muted-foreground/80">
                {t.quickIntro}
              </p>
            </div>

            <div className="flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1 bg-border/60" />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                {t.orDivider}
              </span>
              <span className="h-px flex-1 bg-border/60" />
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 border-t border-border/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                {t.emailLabel}
              </h3>
              <a
                href="mailto:hej@optipeople.dk"
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                hej@optipeople.dk
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                {t.phoneLabel}
              </h3>
              <a
                href="tel:+4523744705"
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                +45 23 74 47 05
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                {t.officeLabel}
              </h3>
              <p className="text-base text-muted-foreground">
                Sønderskovvej 17
                <br />
                {t.officeLine2}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
