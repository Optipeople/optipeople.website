"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, Check } from "lucide-react"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

type FormStatus = "idle" | "loading" | "success" | "error"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Low-friction lead capture: a single email field + CTA, styled as a pill.
 * Posts to /api/lead, which drops the address straight into the Monday
 * "Talk to us" group. A lighter alternative to the full contact form.
 */
export function LeadEmailForm({
  className,
  showFineprint = true,
}: {
  className?: string
  /** Hide the "or send a full message" line where it would be redundant. */
  showFineprint?: boolean
}) {
  const t = useTranslations("leadForm")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const email = String(data.get("email") ?? "").trim()
    const website = String(data.get("website") ?? "")

    // Honeypot — pretend success without hitting the API.
    if (website.trim()) {
      setStatus("success")
      form.reset()
      return
    }

    if (!email || !emailPattern.test(email)) {
      setError(t("errorEmailInvalid"))
      return
    }

    setError(null)
    setStatus("loading")

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Failed to submit")
      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
      setError(t("errorSubmit"))
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3 rounded-full border border-border/60 bg-white px-6 py-3.5 text-left shadow-sm",
          className
        )}
        role="status"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--green-light1)] text-[var(--green-dark3)]">
          <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-medium text-foreground">
            {t("successTitle")}
          </span>
          <span className="block text-sm text-muted-foreground">
            {t("successBody")}
          </span>
        </span>
      </div>
    )
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden from real users, catches naive bots. */}
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <label htmlFor="lead-website">Website</label>
          <input
            id="lead-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-white p-1.5 pl-5 shadow-sm transition-all duration-200 focus-within:border-[var(--green-system)] focus-within:ring-4 focus-within:ring-[var(--green-system)]/15">
          <input
            name="email"
            type="email"
            required
            placeholder={t("placeholder")}
            autoComplete="email"
            aria-label={t("placeholder")}
            aria-invalid={Boolean(error)}
            className="h-10 min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-base font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
          >
            {status === "loading" ? t("loading") : t("submit")}
            {status !== "loading" && (
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-2 px-5 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {showFineprint && (
        <p className="mt-3 px-1 text-center text-sm text-muted-foreground/80">
          {t.rich("fineprint", {
            link: (chunks) => (
              <Link
                href="/contact"
                className="font-medium text-foreground underline-offset-2 hover:underline"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      )}
    </div>
  )
}
