import { BarChart3, Check, Factory, Wrench } from "lucide-react"

import { type Locale } from "@/i18n/routing"
import { setRequestLocale } from "next-intl/server"
import { NewsletterForm } from "@/components/newsletter-form"
import { LogoWall } from "@/components/logo-wall"
import { customerLogos } from "@/lib/customers"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"
import { FramedImage } from "@/components/framed-image"

const copy: Record<
  Locale,
  {
    badge: string
    title: string
    intro: string
    perks: string[]
    logosTitle: string
    expectEyebrow: string
    expectTitle: string
    showcaseEyebrow: string
    showcaseTitle: string
    dashboardAlt: string
    topics: { title: string; description: string }[]
  }
> = {
  en: {
    badge: "Newsletter",
    title: "Practical notes for better factory operations",
    intro:
      "Short updates for people working with production, maintenance, reporting, and industrial data. No noise, just useful ideas from the field.",
    perks: [
      "Monthly, never spammy",
      "Written from the factory floor",
      "Unsubscribe in one click",
    ],
    logosTitle: "Trusted by industry leaders",
    expectEyebrow: "What to expect",
    expectTitle: "Field notes worth the inbox space.",
    showcaseEyebrow: "From the platform",
    showcaseTitle: "The same data our customers act on every day.",
    dashboardAlt: "OptiPeople production dashboard",
    topics: [
      {
        title: "Production performance",
        description:
          "Spotting losses, improving OEE, and keeping improvement work grounded in real production data.",
      },
      {
        title: "Connected factories",
        description:
          "Machine data, integrations, and dashboards: the systems that make operations easier to run.",
      },
      {
        title: "Maintenance & uptime",
        description:
          "Planned maintenance, conditions, and the small habits that quietly protect uptime.",
      },
    ],
  },
  da: {
    badge: "Nyhedsbrev",
    title: "Få praktiske ideer til bedre produktion",
    intro:
      "Korte opdateringer om produktionsdata, OEE, vedligehold, AI og digital drift. Ingen støj, kun noget, I kan bruge.",
    perks: [
      "Månedligt, aldrig spam",
      "Skrevet fra fabriksgulvet",
      "Afmeld med ét klik",
    ],
    logosTitle: "Virksomheder, der kører på OptiPeople",
    expectEyebrow: "Hvad du kan forvente",
    expectTitle: "Noter fra gulvet, der er pladsen i indbakken værd.",
    showcaseEyebrow: "Fra platformen",
    showcaseTitle: "De samme data, vores kunder handler på hver dag.",
    dashboardAlt: "OptiPeople produktionsdashboard",
    topics: [
      {
        title: "Produktion og OEE",
        description:
          "Find tabene, forbedr OEE, og hold forbedringerne fast på rigtige tal fra produktionen.",
      },
      {
        title: "Forbundne fabrikker",
        description:
          "Maskindata, integrationer og dashboards: systemerne, der gør driften lettere at styre.",
      },
      {
        title: "Vedligehold & oppetid",
        description:
          "Planlagt vedligehold, maskinens tilstand og de små vaner, der holder oppetiden oppe.",
      },
    ],
  },
}

const topicIcons = [BarChart3, Factory, Wrench] as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  if (locale === "da") {
    return buildMetadata({
      title: "OptiPeople nyhedsbrev",
      description:
        "Tilmeld dig praktiske opdateringer om produktionsdata, OEE, vedligehold og digital drift.",
      path: "/newsletter",
      locale: "da",
    })
  }

  return buildMetadata({
    title: "OptiPeople Newsletter",
    description:
      "Sign up for practical OptiPeople updates about production data, OEE, maintenance, and digital operations for manufacturers.",
    path: "/newsletter",
    locale: "en",
    keywords: [
      "manufacturing newsletter",
      "OEE newsletter",
      "production data",
      "digital operations",
    ],
  })
}

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const t = copy[locale as Locale] ?? copy.en
  // Green: the same tint the topic cards on the other pages draw from.
  const theme = getSurface("green")

  return (
    <main className="relative overflow-hidden">
      {/* Ambient background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(75%_55%_at_50%_-8%,var(--green-light1)_0%,transparent_62%)] opacity-60"
      />

      {/* Hero, copy alongside the signup form */}
      <section className="px-[var(--edge)] pt-20 pb-16 sm:pt-28 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
              {t.badge}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-normal leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t.intro}
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {t.perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3 text-sm text-foreground/88"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--green-light1)] text-[var(--green-dark3)]">
                    <Check
                      className="h-3.5 w-3.5"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:max-w-md lg:justify-self-end">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Social proof, same logo wall as the homepage */}
      <section className="px-[var(--edge)] pt-8 lg:pt-12">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
          {t.logosTitle}
        </p>
      </section>
      <LogoWall logos={customerLogos} className="pt-10 pb-16 lg:pt-12 lg:pb-24" />

      {/* What to expect, bento-style topic cards */}
      <section className="px-[var(--edge)] py-12 lg:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
          {t.expectEyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
          {t.expectTitle}
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:mt-16">
          {t.topics.map((topic, index) => {
            const Icon = topicIcons[index] ?? BarChart3

            return (
              <div
                key={topic.title}
                className="rounded-[1.25rem] p-7 lg:rounded-[1.5rem] lg:p-8"
                style={{ backgroundColor: theme.tint }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-foreground/82">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-medium tracking-tight text-foreground">
                  {topic.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/78">
                  {topic.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Product showcase */}
      <section className="px-[var(--edge)] pb-16 sm:pb-24 lg:pb-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
          {t.showcaseEyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
          {t.showcaseTitle}
        </h2>
        <div className="mt-10 lg:mt-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-[linear-gradient(135deg,#f4efe6,#f8f6f1)] p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_24px_60px_-28px_rgba(0,0,0,0.22)] sm:p-4">
            {/* The declared 1600x1000 was not the file's 2941x1706, so
                object-cover was quietly shaving the sides off. */}
            <FramedImage
              src="/images/Mockups/Report-OEE-Efficiency-With-Filter.png"
              alt={t.dashboardAlt}
              boxSizes="(min-width: 1024px) 64rem, 100vw"
              cap="[--frame-cap:30rem] lg:[--frame-cap:40rem]"
              className="mx-auto overflow-hidden rounded-[1.5rem] border border-border/60"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
