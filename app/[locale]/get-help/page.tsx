import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { ArrowRight, Mail, Phone, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
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
      "Support for OptiPeople and Opticloud — how to reach us, response times, and answers to common questions about machine connections, OEE, data, and the API.",
    eyebrow: "Get Help",
    headline: "How can we help?",
    body: "Whether you are running Opticloud today or still working out whether it fits your production, you can reach a person here. We answer support requests on business days, and for anything urgent on a running installation, the phone is faster than email.",
    channelsTitle: "Reach us",
    channels: [
      {
        icon: Mail,
        title: "Email support",
        description:
          "Technical issues, questions about your setup, or a machine that stopped reporting. Include the site and machine name if you can — it saves a round trip.",
        actionLabel: "hej@optipeople.dk",
        href: "mailto:hej@optipeople.dk",
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
          "Usually yes. Opticloud reads from modern controls over standard industrial protocols, and for older equipment without a usable interface we add sensors that measure the signals directly — cycle counts, run state, current draw. A machine does not need to be new to be measurable.",
        linkLabel: "See the IoT module",
        linkHref: "/modules/iot",
      },
      {
        question: "How long does it take to get started?",
        answer:
          "A first line is typically connected and reporting within weeks rather than months. Most of the work is agreeing on what to measure and how stop causes should be structured — the connection itself is the smaller part of the job.",
        linkLabel: "See the platform",
        linkHref: "/platform",
      },
      {
        question: "How is OEE calculated in Opticloud?",
        answer:
          "Availability, performance, and quality are calculated from actual machine signals and registered stops, not from manual estimates. If you want to understand the arithmetic and the choices behind it, the calculation is written up in full with worked examples.",
        linkLabel: "How to calculate OEE",
        linkHref: "/blog/how-to-calculate-oee-for-manufacturing-and-maintenance",
      },
      {
        question: "Can we get our data out?",
        answer:
          "Yes. Opticloud has a REST API, and machines and integrations can publish over MQTT with a documented JSON schema. Your production data stays yours, and you can pull it into Power BI, a data warehouse, or your own systems.",
        linkLabel: "API step by step",
        linkHref: "/blog/opticloud-api-how-to-use-it-step-by-step",
      },
      {
        question: "Does it work with our ERP?",
        answer:
          "Opticloud syncs both ways with ERP planning, so orders and production feedback move between the floor and the planning system instead of being typed in twice.",
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
      "Support til OptiPeople og Opticloud — hvordan du får fat i os, svartider og svar på de spørgsmål vi oftest får om maskinopkobling, OEE, data og API.",
    eyebrow: "Få hjælp",
    headline: "Vi hjælper jer videre",
    body: "Uanset om I kører Opticloud i dag eller stadig er ved at finde ud af, om det passer til jeres produktion, kan I få fat i et rigtigt menneske her. Vi besvarer supporthenvendelser på hverdage, og haster det på en kørende installation, går det hurtigere på telefonen end på mail.",
    channelsTitle: "Sådan får I fat i os",
    channels: [
      {
        icon: Mail,
        title: "Skriv til support",
        description:
          "Tekniske problemer, spørgsmål til jeres opsætning eller en maskine, der er holdt op med at rapportere. Skriv gerne fabrik og maskinnavn med — så sparer vi en tur frem og tilbage.",
        actionLabel: "hej@optipeople.dk",
        href: "mailto:hej@optipeople.dk",
      },
      {
        icon: Phone,
        title: "Ring til os",
        description:
          "Til akutte problemer på en kørende installation. I får fat i en, der kender platformen — ikke en omstilling.",
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
      "De spørgsmål vi oftest møder — med henvisning til, hvor de er beskrevet mere udførligt.",
    faq: [
      {
        question: "Kan I forbinde vores ældre maskiner?",
        answer:
          "Som regel ja. Opticloud læser fra moderne styringer over gængse industrielle protokoller, og på ældre udstyr uden brugbar grænseflade sætter vi sensorer op, der måler signalerne direkte — emnetæller, kørestatus, strømforbrug. En maskine behøver ikke være ny for at kunne måles.",
        linkLabel: "Se IoT-modulet",
        linkHref: "/modules/iot",
      },
      {
        question: "Hvor lang tid tager det at komme i gang?",
        answer:
          "Den første linje er typisk forbundet og rapporterer inden for uger — ikke måneder. Det meste af arbejdet ligger i at blive enige om, hvad der skal måles, og hvordan stopårsager skal struktureres. Selve opkoblingen er den mindste del.",
        linkLabel: "Se platformen",
        linkHref: "/platform",
      },
      {
        question: "Hvordan beregnes OEE i Opticloud?",
        answer:
          "Tilgængelighed, ydeevne og kvalitet beregnes ud fra faktiske maskinsignaler og registrerede stop — ikke ud fra manuelle skøn. Vil I forstå regnestykket og valgene bag det, er beregningen gennemgået i fuld længde med eksempler.",
        linkLabel: "Sådan beregnes OEE",
        linkHref: "/blog/how-to-calculate-oee-for-manufacturing-and-maintenance",
      },
      {
        question: "Kan vi få vores data ud?",
        answer:
          "Ja. Opticloud har et REST API, og maskiner og integrationer kan publicere over MQTT med et dokumenteret JSON-skema. Jeres produktionsdata er jeres, og I kan trække dem ind i Power BI, et datawarehouse eller jeres egne systemer.",
        linkLabel: "API trin for trin",
        linkHref: "/blog/opticloud-api-how-to-use-it-step-by-step",
      },
      {
        question: "Virker det sammen med vores ERP?",
        answer:
          "Opticloud synkroniserer begge veje med ERP-planlægningen, så ordrer og produktionstilbagemeldinger bevæger sig mellem gulvet og planlægningssystemet i stedet for at blive tastet ind to gange.",
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

export default async function GetHelpPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en

  return (
    <main className="min-h-screen px-6 pb-24 pt-16 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {t.eyebrow}
        </p>
        <h1 className="text-4xl font-extralight leading-tight tracking-tight text-[var(--gray-10)]">
          {t.headline}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {t.body}
        </p>

        {/* Contact channels */}
        <h2 className="mt-16 text-2xl font-light tracking-tight text-foreground">
          {t.channelsTitle}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {t.channels.map((channel) => {
            const Icon = channel.icon
            const className =
              "group rounded-lg border border-border/60 p-6 transition-colors hover:border-foreground/25"
            const inner = (
              <>
                <Icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium text-foreground">
                  {channel.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {channel.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {channel.actionLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </>
            )
            return isExternal(channel.href) ? (
              <a key={channel.href} href={channel.href} className={className}>
                {inner}
              </a>
            ) : (
              <Link key={channel.href} href={channel.href} className={className}>
                {inner}
              </Link>
            )
          })}
        </div>

        {/* FAQ */}
        <h2 className="mt-20 text-2xl font-light tracking-tight text-foreground">
          {t.faqTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {t.faqBody}
        </p>
        <dl className="mt-10 divide-y divide-border/60 border-t border-border/60">
          {t.faq.map((item) => (
            <div key={item.question} className="py-7">
              <dt className="text-lg font-medium text-foreground">
                {item.question}
              </dt>
              <dd className="mt-3 text-base leading-relaxed text-muted-foreground">
                {item.answer}
                {item.linkHref && item.linkLabel && (
                  <Link
                    href={item.linkHref}
                    className="group mt-3 flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    {item.linkLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* Closing CTA */}
        <div className="mt-16 rounded-lg bg-muted/40 p-8">
          <h2 className="text-2xl font-light tracking-tight text-foreground">
            {t.closingTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.closingBody}
          </p>
          <Link
            href="/contact"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            {t.closingLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  )
}
