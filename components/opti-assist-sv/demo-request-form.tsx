"use client"

import { useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { useTurnstile } from "@/components/turnstile"
import { Button } from "@/components/ui/button"
import { svCopy } from "@/content/opti-assist-sv"
import { trackEvent } from "@/lib/analytics"
import { readCampaign } from "@/lib/campaign"
import { campaignParams, LANDING_ID } from "./campaign-tracking"

const fieldClass =
  "w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors aria-[invalid=true]:border-destructive"

const EMAIL = "hej@optipeople.dk"
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Field = "name" | "company" | "email" | "phone" | "machines"

/**
 * The "Boka demo" form on /sv/opti-assist. Posts to /api/demo-request, which
 * files the lead in Monday as Type "Opti Assist Sverige" with the campaign
 * ref and utm_* values from the visitor's arrival link.
 */
export function DemoRequestForm() {
  const t = svCopy.booking
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const started = useRef(false)
  const turnstile = useTurnstile()

  function markStarted() {
    if (started.current) return
    started.current = true
    trackEvent("booking_start", campaignParams())
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const value = (key: string) => String(data.get(key) ?? "").trim()

    const fields = {
      name: value("name"),
      company: value("company"),
      email: value("email"),
      phone: value("phone"),
      machines: value("machines"),
      message: value("message"),
      website: value("website"),
    }

    if (fields.website) {
      setStatus("success")
      return
    }

    const next: Partial<Record<Field, string>> = {}
    if (!fields.name) next.name = t.errors.name
    if (!fields.company) next.company = t.errors.company
    if (!emailPattern.test(fields.email)) next.email = t.errors.email
    if (!fields.phone) next.phone = t.errors.phone
    if (!fields.machines) next.machines = t.errors.machines
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus("loading")
    try {
      const turnstileToken = await turnstile.getToken()
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, turnstileToken, campaign: readCampaign() }),
      })
      if (!res.ok) throw new Error("Failed to submit")
      // generate_lead is already a GA4 key event; form_name tells it apart.
      trackEvent("generate_lead", {
        ...campaignParams(),
        form_name: LANDING_ID,
        machines: fields.machines,
      })
      setStatus("success")
    } catch {
      setStatus("error")
      turnstile.reset()
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <CheckCircle2 className="h-10 w-10 text-[var(--green-dark3)]" aria-hidden />
        <h3 className="text-2xl font-normal tracking-tight text-foreground">
          {t.successTitle}
        </h3>
        <p className="text-base leading-relaxed text-foreground/78">{t.successBody}</p>
      </div>
    )
  }

  const err = (field: Field) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[field]}
      </p>
    ) : null

  const a11y = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  })

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={markStarted}
      noValidate
      className="space-y-5"
      aria-label={t.title}
    >
      {/* Honeypot: hidden from people and screen readers, bots fill it. */}
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="sv-website">Website</label>
        <input id="sv-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sv-name" className="text-sm font-medium text-foreground">
            {t.fields.name}
          </label>
          <input id="sv-name" name="name" type="text" autoComplete="name" required maxLength={100} className={`mt-2 ${fieldClass}`} {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="sv-company" className="text-sm font-medium text-foreground">
            {t.fields.company}
          </label>
          <input id="sv-company" name="company" type="text" autoComplete="organization" required maxLength={120} className={`mt-2 ${fieldClass}`} {...a11y("company")} />
          {err("company")}
        </div>
        <div>
          <label htmlFor="sv-email" className="text-sm font-medium text-foreground">
            {t.fields.email}
          </label>
          <input id="sv-email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} className={`mt-2 ${fieldClass}`} {...a11y("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="sv-phone" className="text-sm font-medium text-foreground">
            {t.fields.phone}
          </label>
          <input id="sv-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={40} className={`mt-2 ${fieldClass}`} {...a11y("phone")} />
          {err("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="sv-machines" className="text-sm font-medium text-foreground">
          {t.fields.machines}
        </label>
        <select id="sv-machines" name="machines" required defaultValue="" className={`mt-2 ${fieldClass}`} {...a11y("machines")}>
          <option value="" disabled>
            {t.fields.machinesPlaceholder}
          </option>
          {t.fields.machineOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {err("machines")}
      </div>

      <div>
        <label htmlFor="sv-message" className="text-sm font-medium text-foreground">
          {t.fields.message}{" "}
          <span className="font-normal text-muted-foreground">{t.fields.optional}</span>
        </label>
        <textarea
          id="sv-message"
          name="message"
          rows={3}
          maxLength={2000}
          placeholder={t.fields.messagePlaceholder}
          className="mt-2 w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
      </div>

      <div ref={turnstile.containerRef} className="empty:hidden" />

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {t.errors.submit}{" "}
          <a href={`mailto:${EMAIL}`} className="font-medium underline underline-offset-2">
            {EMAIL}
          </a>
          .
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full px-8 sm:w-auto"
      >
        {status === "loading" ? t.sending : t.submit}
      </Button>

      <p className="text-sm leading-relaxed text-foreground/72">
        {t.privacy}{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          {t.privacyLink}
        </Link>
      </p>
    </form>
  )
}
