"use client"

import { useState, type FormEvent } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

const fieldClass =
  "w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"

export function ContactForm() {
  const t = useTranslations("contactForm")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = t("errorName")
    if (!email.trim()) {
      newErrors.email = t("errorEmailRequired")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("errorEmailInvalid")
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      })
      if (!res.ok) throw new Error("Failed to submit")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-normal">{t("successTitle")}</h2>
        <p className="text-base text-muted-foreground">{t("successBody")}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={fieldClass}
          placeholder={t("namePlaceholder")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={fieldClass}
          placeholder={t("emailPlaceholder")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          {t("phone")}{" "}
          <span className="font-normal text-muted-foreground">
            {t("phoneOptional")}
          </span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={fieldClass}
          placeholder={t("phonePlaceholder")}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-base placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">{t("errorSubmit")}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? t("sending") : t("send")}
      </Button>
    </form>
  )
}
