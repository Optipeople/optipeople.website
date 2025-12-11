import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getHomeContent } from "@/lib/content"

export default async function Home() {
  const content = await getHomeContent()

  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,theme(colors.primary)/10%,transparent_45%)]" />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-8 sm:px-8 lg:px-10">
        <SiteHeader {...content.nav} />
        <main className="flex flex-col gap-16 sm:gap-20 md:gap-24">
          <Hero {...content.hero} />
          <Highlights {...content.highlights} />
          <About {...content.about} />
          <Contact {...content.footer} />
        </main>
      </div>
      <SiteFooter {...content.footer} />
    </div>
  )
}

function SiteHeader({
  brand,
  links,
  cta,
}: {
  brand: string
  links: { label: string; href: string }[]
  cta?: { label: string; href: string }
}) {
  return (
    <header className="flex items-center justify-between gap-6 border-b pb-6">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/15" />
        <div className="flex flex-col">
          <span className="text-md font-semibold text-muted-foreground">
            Optipeople
          </span>
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-foreground cursor-pointer"
          >
            {brand}
          </Link>
        </div>
      </div>
      <nav className="hidden items-center gap-6 text-md font-medium md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="cursor-pointer text-foreground/80 transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {cta ? (
        <Button asChild size="lg" className="hidden md:inline-flex">
          <Link href={cta.href} className="cursor-pointer">
            {cta.label}
          </Link>
        </Button>
      ) : null}
    </header>
  )
}

function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string
  title: string
  subtitle: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}) {
  return (
    <section
      id="home"
      className="grid gap-10 border-b pb-12 pt-6 md:grid-cols-[1.3fr_1fr] md:items-center"
    >
      <div className="flex flex-col gap-6">
        <Badge variant="secondary" className="w-fit">
          {eyebrow}
        </Badge>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {primaryCta ? (
            <Button asChild size="lg">
              <Link href={primaryCta.href} className="cursor-pointer">
                {primaryCta.label}
              </Link>
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryCta.href} className="cursor-pointer">
                {secondaryCta.label}
              </Link>
            </Button>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-4 text-md text-muted-foreground">
          <div className="rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
            Workforce planning
          </div>
          <div className="rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
            Recruitment & onboarding
          </div>
          <div className="rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
            Safety-first delivery
          </div>
        </div>
      </div>
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-md font-semibold text-muted-foreground">
              On-site ready teams
            </p>
            <p className="text-lg font-semibold">
              We prepare every crew before they step on site.
            </p>
          </div>
          <div className="rounded-xl bg-primary text-primary-foreground px-4 py-3 text-md font-semibold">
            24/7
            <span className="block text-md text-primary-foreground/80">
              coverage
            </span>
          </div>
        </div>
        <div className="mt-6 grid gap-3 text-md text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-green-500" />
            Compliance checks completed
          </div>
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-amber-500" />
            PPE and onboarding sorted before day one
          </div>
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-blue-500" />
            Rosters that flex with operational changes
          </div>
        </div>
      </div>
    </section>
  )
}

function Highlights({
  heading,
  items,
}: {
  heading: string
  items: { title: string; description: string }[]
}) {
  return (
    <section id="services" className="space-y-8 border-b pb-12">
      <div className="flex flex-col gap-2">
        <p className="text-md text-primary font-semibold">Services</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">{heading}</h2>
        <p className="text-lg text-muted-foreground">
          We combine recruiting, training, and workforce management so your
          team can focus on critical operations.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-md text-muted-foreground">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary" />
                  Reliable staffing for peak periods
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary" />
                  Clear points of contact and updates
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function About({ heading, body }: { heading: string; body: string }) {
  return (
    <section id="approach" className="grid gap-6 pb-12 lg:grid-cols-[1.1fr_1fr]">
      <div className="flex flex-col gap-3">
        <p className="text-md font-semibold text-primary">Over the fold</p>
        <h3 className="text-3xl font-semibold sm:text-4xl">{heading}</h3>
        <p className="text-lg text-muted-foreground">{body}</p>
      </div>
      <Card className="bg-secondary/40">
        <CardHeader>
          <CardTitle className="text-2xl">How we deliver</CardTitle>
          <CardDescription>
            A simple rhythm that keeps every shift covered.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-md text-foreground">
          <Step title="Plan together" detail="Define roles, safety needs, and timelines with your leads." />
          <Step title="Prepare teams" detail="Recruit, vet, and onboard crews with site-ready training." />
          <Step title="Support daily" detail="Adjust rosters fast and keep communication tight." />
        </CardContent>
      </Card>
    </section>
  )
}

function Step({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-xl border bg-background/80 px-4 py-3 shadow-sm">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-md text-muted-foreground">{detail}</p>
    </div>
  )
}

function Contact({
  company,
  blurb,
  email,
  phone,
  location,
}: {
  company: string
  blurb: string
  email?: string
  phone?: string
  location?: string
}) {
  return (
    <section
      id="contact"
      className="grid gap-8 rounded-2xl border bg-card px-8 py-10 shadow-sm md:grid-cols-[1.2fr_1fr]"
    >
      <div className="space-y-3">
        <p className="text-md font-semibold text-primary">Contact</p>
        <h3 className="text-3xl font-semibold sm:text-4xl">
          Partner with {company}
        </h3>
        <p className="text-lg text-muted-foreground">{blurb}</p>
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-secondary/50 p-6">
        {email ? (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-background px-4 py-3 shadow-sm">
            <div className="flex flex-col">
              <span className="text-md font-semibold text-muted-foreground">
                Email
              </span>
              <Link
                href={`mailto:${email}`}
                className="text-lg font-semibold cursor-pointer"
              >
                {email}
              </Link>
            </div>
          </div>
        ) : null}
        {phone ? (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-background px-4 py-3 shadow-sm">
            <div className="flex flex-col">
              <span className="text-md font-semibold text-muted-foreground">
                Phone
              </span>
              <Link
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="text-lg font-semibold cursor-pointer"
              >
                {phone}
              </Link>
            </div>
          </div>
        ) : null}
        {location ? (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-background px-4 py-3 shadow-sm">
            <div className="flex flex-col">
              <span className="text-md font-semibold text-muted-foreground">
                Location
              </span>
              <p className="text-lg font-semibold">{location}</p>
            </div>
          </div>
        ) : null}
        <Button size="lg" className="w-full">
          <Link href={email ? `mailto:${email}` : "#contact"} className="cursor-pointer">
            Book a call
          </Link>
        </Button>
      </div>
    </section>
  )
}

function SiteFooter({
  company,
  blurb,
  links,
}: {
  company: string
  blurb: string
  links: { label: string; href: string }[]
}) {
  return (
    <footer className="border-t bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-2">
          <p className="text-md font-semibold">{company}</p>
          <p className="text-lg text-muted-foreground">{blurb}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-md font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer text-foreground/80 transition-colors hover:text-foreground"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="cursor-pointer text-foreground/80 transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
