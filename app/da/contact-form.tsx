"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"

export function DanishContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
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
    if (!name.trim()) newErrors.name = "Indtast dit navn"
    if (!email.trim()) {
      newErrors.email = "Indtast din emailadresse"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Indtast en gyldig emailadresse"
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
        <h2 className="mb-4 text-2xl font-light">Tak for din besked</h2>
        <p className="text-base text-muted-foreground">
          Vi vender tilbage inden for én arbejdsdag.
        </p>
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
          Navn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"
          placeholder="Dit navn"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"
          placeholder="dig@virksomhed.dk"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          Telefon <span className="font-normal text-muted-foreground">(valgfrit)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"
          placeholder="+45 12 34 56 78"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Besked
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-base placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"
          placeholder="Fortæl os om jeres situation"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Noget gik galt. Prøv igen, eller skriv direkte til os.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? "Sender..." : "Send besked"}
      </Button>
    </form>
  )
}
