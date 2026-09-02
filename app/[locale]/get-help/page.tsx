import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { ArrowRight, Mail, Phone, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { getSurface } from "@/lib/page-theme"
import { SUPPORT_EMAIL } from "@/lib/contact"
import { buildMetadata } from "@/lib/seo"

const PATH = "/get-help"
type Props = { params: Promise<{ locale: string }> }

type Channel = {
  icon: LucideIcon
  title: string
  description: string
  actionLabel: string
  href: string
}

type FaqItem = {
  question: string
  answer: string
  linkLabel?: string
  linkHref?: string
}

type HelpCopy = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  headline: string
  body: string
  jumpLabel: string
  channelsTitle: string
  channels: Channel[]
  faqTitle: string
  faqBody: string
  faq: FaqItem[]
  closingTitle: string
  closingBody: string
  closingLabel: string
}

const copy: Record<Locale, HelpCopy> = {
  en: {
    metaTitle: "Get Help",
    metaDescription:
      "Support for the OptiPeople Data Platform: how to reach us, response times, and answers to common questions about machine connections, OEE, data, and the API.",
    eyebrow: "Get Help",
    headline: "How can we help?",
    body: "Whether you are running the OptiPeople Data Platform today or still working out whether it fits your production, you can reach a person here. We answer support requests on business days, and for anything urgent on a running installation, the phone is faster than email.",
    jumpLabel: "Common questions",
    channelsTitle: "Reach us",
    channels: [
      {
        icon: Mail,
        title: "Email support",
        description:
          "Technical issues, questions about your setup, or a machine that stopped reporting. Include the site and machine name if you can. It saves a round trip.",
        actionLabel: SUPPORT_EMAIL,
        href: `mailto:${SUPPORT_EMAIL}`,
      },
      {
        icon: Phone,
        title: "Call us",
        description:
          "For urgent problems on a live installation. Danish and English both work, and you get someone who knows the platform rather than a switchboard.",
        actionLabel: "+45 23 74 47 05",
        href: "tel:+4523744705",
      },
      {
        icon: Users,
        title: "Meet the team",
        description:
          "See who works with sales, projects, and technology at OptiPeople, and contact the right person directly.",
        actionLabel: "See the people",
        href: "/resources/people",
      },
    ],
    faqTitle: "Common questions",
    faqBody:
      "The questions we get most often, with pointers to where each one is covered in more depth.",
    faq: [
      {
        question: "Can you connect our older machines?",
        answer:
          "Usually yes. The platform reads from modern controls over standard industrial protocols, and for older equipment without a usable interface we add sensors that measure the signals directly: cycle counts, run state, current draw. A machine does not need to be new to be measurable.",
        linkLabel: "See the IoT module",
        linkHref: "/modules/iot",
      },
      {
        question: "How long does it take to get started?",
        answer:
          "A first line is typically connected and reporting within weeks rather than months. Most of the work is agreeing on what to measure and how stop causes should be structured. The connection itself is the smaller part of the job.",
        linkLabel: "See the platform",
        linkHref: "/platform",
      },
      {
        question: "How is OEE calculated in the platform?",
        answer:
          "Availability, performance, and quality are calculated from actual machine signals and registered stops, not from manual estimates. If you want to understand the arithmetic and the choices behind it, the calculation is written up in full with worked examples.",
        linkLabel: "How to calculate OEE",
        linkHref: "/blog/how-to-calculate-oee-for-manufacturing-and-maintenance",
      },
      {
        question: "Can we get our data out?",
        answer:
          "Yes. The platform has a REST API, and machines and integrations can publish over MQTT with a documented JSON schema. Your production data stays yours, and you can pull it into Power BI, a data warehouse, or your own systems.",
        linkLabel: "API step by step",
        linkHref: "/blog/opticloud-api-how-to-use-it-step-by-step",
      },
      {
        question: "Does it work with our ERP?",
        answer:
          "The platform syncs both ways with ERP planning, so orders and production feedback move between the floor and the planning system instead of being typed in twice.",
        linkLabel: "See ERP Shopfloor",
        linkHref: "/modules/erp-shopfloor",
      },
      {
        question: "Who owns the data, and where is it stored?",
        answer:
          "You own your production data. It is stored on European cloud infrastructure, and how we handle personal data on this site and in our services is described in the privacy policy.",
        linkLabel: "Privacy policy",
        linkHref: "/privacy",
      },
    ],
    closingTitle: "Still not sure where to start?",
    closingBody:
      "Tell us what your production looks like and what you are trying to improve. We will tell you honestly whether we are the right fit, and what a first step would involve.",
    closingLabel: "Contact the team",
  },
  da: {
    metaTitle: "Få hjælp | OptiPeople",
    metaDescription:
      "Support til OptiPeople Data Platform: hvordan du får fat i os, svartider og svar på de spørgsmål vi oftest får om maskinopkobling, OEE, data og API.",
    eyebrow: "Få hjælp",
    headline: "Vi hjælper jer videre",
    body: "Uanset om I kører OptiPeople Data Platform i dag eller stadig er ved at finde ud af, om det passer til jeres produktion, kan I få fat i et rigtigt menneske her. Vi besvarer supporthenvendelser på hverdage, og haster det på en kørende installation, går det hurtigere på telefonen end på mail.",
    jumpLabel: "Spørgsmål vi ofte får",
    channelsTitle: "Sådan får I fat i os",
    channels: [
      {
        icon: Mail,
        title: "Skriv til support",
        description:
          "Tekniske problemer, spørgsmål til jeres opsætning eller en maskine, der er holdt op med at rapportere. Skriv gerne fabrik og maskinnavn med, så sparer vi en tur frem og tilbage.",
        actionLabel: SUPPORT_EMAIL,
        href: `mailto:${SUPPORT_EMAIL}`,
      },
      {
        icon: Phone,
        title: "Ring til os",
        description:
          "Til akutte problemer på en kørende installation. I får fat i en, der kender platformen, ikke en omstilling.",
        actionLabel: "+45 23 74 47 05",
        href: "tel:+4523744705",
      },
      {
        icon: Users,
        title: "Mød teamet",
        description:
          "Se hvem der arbejder med salg, projekter og teknologi hos OptiPeople, og kontakt den rigtige person direkte.",
        actionLabel: "Se menneskene",
        href: "/resources/people",
      },
    ],
    faqTitle: "Spørgsmål vi ofte får",
    faqBody:
      "De spørgsmål vi oftest møder, med henvisning til hvor de er beskrevet mere udførligt.",
    faq: [
      {
        question: "Kan I forbinde vores ældre maskiner?",
        answer:
          "Som regel ja. Platformen læser fra de nyere styringer over de protokoller, maskiner taler, og på gammelt udstyr, hvor der ikke er noget at læse fra, sætter vi sensorer op, der måler signalet direkte: emnetæller, kørestatus og strømforbrug. En maskine skal ikke være ny for at kunne måles.",
        linkLabel: "Se IoT-modulet",
        linkHref: "/modules/iot",
      },
      {
        question: "Hvor lang tid tager det at komme i gang?",
        answer:
          "Den første linje er typisk koblet på og sender data inden for uger, ikke måneder. Det meste af arbejdet ligger i at blive enige om, hvad der skal måles, og hvordan stopårsagerne skal deles op. Selve opkoblingen er den mindste del.",
        linkLabel: "Se platformen",
        linkHref: "/platform",
      },
      {
        question: "Hvordan beregnes OEE i platformen?",
        answer:
          "Tilgængelighed, ydelse og kvalitet bliver regnet ud af maskinernes egne signaler og de stop, der er registreret. Ikke af skøn. Vil I se hele regnestykket og valgene bag, er det gennemgået med eksempler.",
        linkLabel: "Sådan beregnes OEE",
        linkHref: "/blog/how-to-calculate-oee-for-manufacturing-and-maintenance",
      },
      {
        question: "Kan vi få vores data ud?",
        answer:
          "Ja. Platformen har et REST API, og maskiner og koblinger kan sende over MQTT i et dokumenteret JSON-format. Jeres produktionsdata er jeres, og I kan hente dem ind i Power BI, et datawarehouse eller jeres egne systemer.",
        linkLabel: "API trin for trin",
        linkHref: "/blog/opticloud-api-how-to-use-it-step-by-step",
      },
      {
        question: "Virker det sammen med vores ERP?",
        answer:
          "Platformen synkroniserer begge veje med ERP-planlægningen, så ordrer og produktionstilbagemeldinger bevæger sig mellem gulvet og planlægningssystemet i stedet for at blive tastet ind to gange.",
        linkLabel: "Se ERP Shopfloor",
        linkHref: "/modules/erp-shopfloor",
      },
      {
        question: "Hvem ejer data, og hvor ligger de?",
        answer:
          "I ejer jeres produktionsdata. De ligger på europæisk cloudinfrastruktur, og hvordan vi behandler persondata på sitet og i vores services står beskrevet i privatlivspolitikken.",
        linkLabel: "Privatlivspolitik",
        linkHref: "/privacy",
      },
    ],
    closingTitle: "Er I i tvivl om, hvor I skal starte?",
    closingBody:
      "Fortæl os, hvordan jeres produktion ser ud, og hvad I gerne vil forbedre. Så siger vi ærligt, om vi er det rigtige match, og hvad et første skridt vil indebære.",
    closingLabel: "Kontakt teamet",
  },
}

const isExternal = (href: string) => /^(mailto:|tel:|https?:)/.test(href)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: PATH,
    locale: locale as Locale,
  })
}

/**
 * Get help.
 *
 * Same design language as the deep-dive templates: the `--edge` column,
 * `font-normal` display type, tinted panels for the contact routes, and one
 * full-bleed deep band to close.
 *
 * The FAQ runs on the asymmetric two-column used for value propositions
 * elsewhere: question on the left line, answer beside it. A support page is
 * read by scanning for one question, so the questions need to hold a column of
 * their own rather than being headings inside a wall of prose.
 */
export default async function GetHelpPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  const theme = getSurface("blue")

  return (
    <div className="min-h-screen">
      {/* Hero on the tint. */}
      <section className="relative isolate overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 55%, transparent 100%)`,
          }}
        />

        <div className="px-[var(--edge)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild size="lg" className="rounded-full px-7">
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </Button>
            <Link
              href="#faq"
              className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/82 transition-colors hover:text-foreground"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              {t.jumpLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact routes, as tinted panels carrying the page colour. */}
      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {t.channelsTitle}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {t.channels.map((channel) => {
            const Icon = channel.icon
            const className =
              "reveal group flex flex-col justify-between rounded-[1.25rem] p-7 transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.28)] lg:rounded-[1.5rem] lg:p-8"
            const inner = (
              <>
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70">
                    <Icon className="h-5 w-5 text-foreground/82" />
                  </span>
                  <h3 className="mt-6 text-lg font-medium tracking-tight text-foreground">
                    {channel.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/72">
                    {channel.description}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-foreground/82 transition-colors group-hover:text-foreground">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="truncate">{channel.actionLabel}</span>
                </span>
              </>
            )

            return isExternal(channel.href) ? (
              <a
                key={channel.href}
                href={channel.href}
                className={className}
                style={{ backgroundColor: theme.tint }}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={channel.href}
                href={channel.href}
                className={className}
                style={{ backgroundColor: theme.tint }}
              >
                {inner}
              </Link>
            )
          })}
        </div>
      </section>

      {/* FAQ: question on the left line, answer beside it. */}
      <section id="faq" className="scroll-mt-24 px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
            {t.faqTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/72">
            {t.faqBody}
          </p>
        </div>

        <dl className="mt-12 border-t border-black/[0.08] lg:mt-16">
          {t.faq.map((item) => (
            <div
              key={item.question}
              className="grid gap-4 border-b border-black/[0.08] py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-10"
            >
              <dt className="text-xl font-normal leading-snug tracking-tight text-foreground lg:text-2xl">
                {item.question}
              </dt>
              <dd className="text-base leading-relaxed text-foreground/78">
                <p>{item.answer}</p>
                {item.linkHref && item.linkLabel && (
                  <Link
                    href={item.linkHref}
                    className="group mt-5 flex w-fit items-center gap-3 text-sm font-medium text-foreground/82 transition-colors hover:text-foreground"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 transition-colors group-hover:border-black/25">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    {item.linkLabel}
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Closing deep band. */}
      <section
        className="py-20 text-white lg:py-28"
        style={{ backgroundColor: theme.deep }}
      >
        <div className="px-[var(--edge)]">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight lg:text-4xl">
              {t.closingTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78 lg:text-lg">
              {t.closingBody}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-10 rounded-full bg-white px-7 text-foreground hover:bg-white/90"
            >
              <Link href="/contact">{t.closingLabel}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
