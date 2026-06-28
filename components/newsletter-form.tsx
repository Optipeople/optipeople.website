"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, Check } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

type FormStatus = "idle" | "loading" | "success" | "error"

type FormErrors = Partial<{
  email: string
  consent: string
}>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldClass =
  "h-12 w-full rounded-xl border border-border/60 bg-[var(--gray-1)] px-4 text-base text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:border-[var(--green-system)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--green-system)]/15"

const labelClass =
  "flex items-baseline justify-between text-sm font-medium text-foreground"

export function NewsletterForm() {
  const t = useTranslations("newsletterForm")
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
      nextErrors.email = t("errorEmailRequired")
    } else if (!emailPattern.test(email)) {
      nextErrors.email = t("errorEmailInvalid")
    }

    if (!consent) {
      nextErrors.consent = t("errorConsentRequired")
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
      <div className="rounded-[1.75rem] border border-border/50 bg-white/80 p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04),0_18px_50px_-20px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--green-light1)] text-[var(--green-dark3)]">
          <Check className="h-7 w-7" aria-hidden="true" strokeWidth={2.5} />
        </div>
        <h2 className="mt-6 text-2xl font-light tracking-tight text-foreground">
          {t("successTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">
          {t("successBody")}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-border/50 bg-white/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_18px_50px_-20px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8"
      noValidate
    >
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <label htmlFor="newsletter-website">{t("website")}</label>
        <input
          id="newsletter-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="newsletter-name" className={labelClass}>
            <span>{t("name")}</span>
            <span className="text-xs font-normal text-muted-foreground/70">
              {t("optional")}
            </span>
          </label>
          <input
            id="newsletter-name"
            name="name"
            type="text"
            className={fieldClass}
            placeholder={t("namePlaceholder")}
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="newsletter-company" className={labelClass}>
            <span>{t("company")}</span>
            <span className="text-xs font-normal text-muted-foreground/70">
              {t("optional")}
            </span>
          </label>
          <input
            id="newsletter-company"
            name="company"
            type="text"
            className={fieldClass}
            placeholder={t("companyPlaceholder")}
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <label htmlFor="newsletter-email" className={labelClass}>
          <span>{t("email")}</span>
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          className={fieldClass}
          placeholder={t("emailPlaceholder")}
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

      <div className="mt-6 space-y-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input
            name="consent"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-input accent-[var(--green-dark3)]"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? "newsletter-consent-error" : undefined
            }
          />
          <span>{t("consent")}</span>
        </label>
        {errors.consent && (
          <p id="newsletter-consent-error" className="text-sm text-destructive">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="mt-5 text-sm text-destructive">{t("errorSubmit")}</p>
      )}

      <Button
        type="submit"
        size="lg"
        variant="green"
        disabled={status === "loading"}
        className="group mt-7 h-12 w-full rounded-xl text-base"
      >
        {status === "loading" ? `${t("loading")}…` : t("submit")}
        {status !== "loading" && (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        )}
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground/80">
        {t("privacy")}
      </p>
    </form>
  )
}
