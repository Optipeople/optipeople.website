"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

type FormStatus = "idle" | "loading" | "success" | "error"

type FormErrors = Partial<{
  email: string
  consent: string
}>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<FormErrors>({})

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
      nextErrors.email = "Please enter your email address"
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Please enter a valid email address"
    }

    if (!consent) {
      nextErrors.consent = "Please confirm that we can send you the newsletter"
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
          You&apos;re on the list
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Thanks for signing up. The next OptiPeople update will land in your
          inbox when it is ready.
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
        Sign up for the newsletter
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Get practical ideas about production data, OEE, maintenance, and digital
        operations.
      </p>

      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
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
            Name <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id="newsletter-name"
            name="name"
            type="text"
            className="h-11 w-full rounded-sm border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            placeholder="Your name"
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="newsletter-company" className="text-sm font-medium">
            Company <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id="newsletter-company"
            name="company"
            type="text"
            className="h-11 w-full rounded-sm border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            placeholder="Company name"
            autoComplete="organization"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="newsletter-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            className="h-11 w-full rounded-sm border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            placeholder="you@company.com"
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
              I agree to receive emails from OptiPeople and understand that I can
              unsubscribe at any time.
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
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="mt-8 w-full sm:w-auto"
      >
        {status === "loading" ? "Signing up..." : "Subscribe"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  )
}
