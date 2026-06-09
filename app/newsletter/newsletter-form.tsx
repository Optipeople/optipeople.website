"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"

type FormStatus = "idle" | "loading" | "success" | "error"

type FormErrors = Partial<{
  email: string
  consent: string
}>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const formCopy = {
  en: {
    errors: {
      emailRequired: "Please enter your email address",
      emailInvalid: "Please enter a valid email address",
      consentRequired: "Please confirm that we can send you the newsletter",
      submit: "Something went wrong. Please try again or email us directly.",
    },
    successTitle: "You're on the list",
    successBody:
      "Thanks for signing up. The next OptiPeople update will land in your inbox when it is ready.",
    title: "Sign up for the newsletter",
    body:
      "Get practical ideas about production data, OEE, maintenance, and digital operations.",
    website: "Website",
    name: "Name",
    optional: "(optional)",
    namePlaceholder: "Your name",
    company: "Company",
    companyPlaceholder: "Company name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    consent:
      "I agree to receive emails from OptiPeople and understand that I can unsubscribe at any time.",
    loading: "Signing up...",
    submit: "Subscribe",
  },
  da: {
    errors: {
      emailRequired: "Indtast din emailadresse",
      emailInvalid: "Indtast en gyldig emailadresse",
      consentRequired: "Bekræft, at vi må sende dig nyhedsbrevet",
      submit: "Noget gik galt. Prøv igen, eller skriv direkte til os.",
    },
    successTitle: "Du er på listen",
    successBody:
      "Tak for din tilmelding. Næste OptiPeople-opdatering lander i din indbakke, når den er klar.",
    title: "Tilmeld dig nyhedsbrevet",
    body:
      "Få praktiske ideer om produktionsdata, OEE, vedligehold og digital drift.",
    website: "Website",
    name: "Navn",
    optional: "(valgfrit)",
    namePlaceholder: "Dit navn",
    company: "Virksomhed",
    companyPlaceholder: "Virksomhedsnavn",
    email: "Email",
    emailPlaceholder: "dig@virksomhed.dk",
    consent:
      "Jeg accepterer at modtage emails fra OptiPeople og forstår, at jeg kan afmelde mig når som helst.",
    loading: "Tilmelder...",
    submit: "Tilmeld",
  },
} as const

export function NewsletterForm({ locale = "en" }: { locale?: Locale }) {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<FormErrors>({})
  const copy = formCopy[locale]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "")
    const company = String(formData.get("company") ?? "")
    const email = String(formData.get("email") ?? "")
    const website = String(formData.get("website") ?? "")
    const consent = formData.get("consent") === "on"

    if (website.trim()) {
      setStatus("success")
      form.reset()
      return
    }

    const nextErrors: FormErrors = {}

    if (!email.trim()) {
      nextErrors.email = copy.errors.emailRequired
    } else if (!emailPattern.test(email)) {
      nextErrors.email = copy.errors.emailInvalid
    }

    if (!consent) {
      nextErrors.consent = copy.errors.consentRequired
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          consent,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe")
      }

      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-border/70 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--green-light1)] text-[var(--green-dark3)]">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-light tracking-tight text-foreground">
          {copy.successTitle}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {copy.successBody}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-border/70 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--orange-light1)] text-[var(--orange-dark3)]">
        <Mail className="h-6 w-6" aria-hidden="true" />
      </div>

      <h2 className="mt-6 text-2xl font-light tracking-tight text-foreground">
        {copy.title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {copy.body}
      </p>

      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <label htmlFor="newsletter-website">{copy.website}</label>
        <input
          id="newsletter-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="newsletter-name" className="text-sm font-medium">
            {copy.name} <span className="font-normal text-muted-foreground">{copy.optional}</span>
          </label>
          <input
            id="newsletter-name"
            name="name"
            type="text"
            className="h-11 w-full rounded-sm border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            placeholder={copy.namePlaceholder}
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="newsletter-company" className="text-sm font-medium">
            {copy.company} <span className="font-normal text-muted-foreground">{copy.optional}</span>
          </label>
          <input
            id="newsletter-company"
            name="company"
            type="text"
            className="h-11 w-full rounded-sm border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            placeholder={copy.companyPlaceholder}
            autoComplete="organization"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="newsletter-email" className="text-sm font-medium">
            {copy.email}
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            className="h-11 w-full rounded-sm border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            placeholder={copy.emailPlaceholder}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
          />
          {errors.email && (
            <p id="newsletter-email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <input
              name="consent"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-input accent-[var(--green-dark3)]"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={
                errors.consent ? "newsletter-consent-error" : undefined
              }
            />
            <span>
              {copy.consent}
            </span>
          </label>
          {errors.consent && (
            <p id="newsletter-consent-error" className="text-sm text-destructive">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <p className="mt-5 text-sm text-destructive">
          {copy.errors.submit}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="mt-8 w-full sm:w-auto"
      >
        {status === "loading" ? copy.loading : copy.submit}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  )
}
