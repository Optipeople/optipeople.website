"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
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

    // Inline validation
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = "Please enter your name"
    if (!email.trim()) {
      newErrors.email = "Please enter your email address"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
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

  return (
    <>
      {/* Hero + Form */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Context */}
          <div>
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
              Contact
            </p>
            <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
              Let&apos;s talk about your operations
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Tell us about your situation and we&apos;ll get back to you within
              one business day.
            </p>
          </div>

          {/* Right — Form */}
          <div>
            {status === "success" ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-light mb-4">
                  Thanks for reaching out
                </h2>
                <p className="text-base text-muted-foreground">
                  We&apos;ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot field */}
                <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground
                               text-base placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring
                               transition-colors"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground
                               text-base placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring
                               transition-colors"
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground"
                  >
                    Phone <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground
                               text-base placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring
                               transition-colors"
                    placeholder="+45 12 34 56 78"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground
                               text-base placeholder:text-muted-foreground resize-y
                               focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring
                               transition-colors"
                    placeholder="Tell us about your situation"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto"
                >
                  {status === "loading" ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 border-t border-border/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Email
              </h3>
              <a
                href="mailto:hej@optipeople.dk"
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                hej@optipeople.dk
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Phone
              </h3>
              <a
                href="tel:+4523744705"
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                +45 23 74 47 05
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Office
              </h3>
              <p className="text-base text-muted-foreground">
                Sønderskovvej 17
                <br />
                8362 Hørning, Denmark
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
