import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Mail, MapPin, Phone } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { LeadEmailForm } from "@/components/lead-email-form"
import { getSurface } from "@/lib/page-theme"
import { generalEmail } from "@/lib/contact"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/structured-data"
import { contactCopy as copy, contactDetails, contactMetadata } from "@/content/pages/contact"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const m = contactMetadata[locale as Locale] ?? contactMetadata.en
  return buildMetadata({
    title: m.title,
    description: m.description,
    path: "/contact",
    locale: locale === "da" ? "da" : "en",
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
      value: generalEmail(locale as Locale),
      href: `mailto:${generalEmail(locale as Locale)}`,
    },
    {
      icon: Phone,
      label: t.phoneLabel,
      value: contactDetails.phone,
      href: contactDetails.phoneHref,
    },
    {
      icon: MapPin,
      label: t.officeLabel,
      value: `${contactDetails.street}, ${t.officeLine2}`,
      href: undefined,
    },
  ]

  return (
    <div className="min-h-screen">
      <JsonLd
        data={breadcrumbSchema(locale as Locale, [
          {
            name: locale === "da" ? "Kontakt OptiPeople" : "Contact OptiPeople",
            path: "/contact",
          },
        ])}
      />
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
          {/* `grid-cols-1` matters: without a sized track the single column
              grows to the form's intrinsic width, and the email pill's input
              made the whole hero wider than a phone screen. */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
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
            <div className="min-w-0 rounded-[1.5rem] bg-white p-6 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.08] sm:p-9 lg:rounded-[1.75rem] lg:p-10">
              <div className="space-y-3">
                <LeadEmailForm showFineprint={false} formName="contact_lead" />
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
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
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
