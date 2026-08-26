"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react"
import { ArrowRight, Check, X } from "lucide-react"
import { useTranslations } from "next-intl"

import { usePathname } from "@/i18n/navigation"

type PromptMode = "slide" | "modal"
type FormStatus = "idle" | "loading" | "success" | "error"

const STORAGE_KEY = "op_newsletter_prompt"
// How long to wait before re-prompting someone who dismissed (days).
const DISMISS_COOLDOWN_DAYS = 30
// Fraction of the page a reader must reach before the slide-in appears.
const SCROLL_THRESHOLD = 0.55
// Don't arm exit-intent until the visitor has been around for a moment.
const EXIT_INTENT_ARM_DELAY = 4000

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Paths where a newsletter nudge would be redundant or annoying.
const SUPPRESSED_PATHS = ["/newsletter", "/contact"]

function isSuppressed(): boolean {
  if (typeof window === "undefined") return true
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw) as { status?: string; at?: number }
    if (data.status === "subscribed") return true
    if (data.status === "dismissed" && typeof data.at === "number") {
      const elapsed = Date.now() - data.at
      return elapsed < DISMISS_COOLDOWN_DAYS * 24 * 60 * 60 * 1000
    }
    return false
  } catch {
    return false
  }
}

function remember(status: "dismissed" | "subscribed") {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status, at: Date.now() })
    )
  } catch {
    // Ignore storage failures (private mode, quota), worst case the prompt
    // simply reappears on a future visit.
  }
}

export function NewsletterPrompt() {
  // next-intl's usePathname returns the path without the locale prefix.
  const pathname = usePathname()
  const t = useTranslations("newsletterPrompt")
  const copy: Copy = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    body: t("body"),
    exitTitle: t("exitTitle"),
    exitBody: t("exitBody"),
    emailPlaceholder: t("emailPlaceholder"),
    consent: t("consent"),
    submit: t("submit"),
    loading: t("loading"),
    successTitle: t("successTitle"),
    successBody: t("successBody"),
    close: t("close"),
    noThanks: t("noThanks"),
    emailInvalid: t("emailInvalid"),
    consentRequired: t("consentRequired"),
    errorSubmit: t("errorSubmit"),
  }

  const [mode, setMode] = useState<PromptMode | null>(null)
  const [visible, setVisible] = useState(false)
  const triggered = useRef(false)

  const normalizedPath = pathname || "/"
  const pathSuppressed = SUPPRESSED_PATHS.some(
    (p) => normalizedPath === p || normalizedPath.startsWith(`${p}/`)
  )

  const open = useCallback((nextMode: PromptMode) => {
    if (triggered.current) return
    triggered.current = true
    setMode(nextMode)
    // Next frame so the entrance transition has an initial state to animate from.
    requestAnimationFrame(() => setVisible(true))
  }, [])

  useEffect(() => {
    if (pathSuppressed) return
    if (isSuppressed()) return

    let armed = true
    let exitArmed = false

    const onScroll = () => {
      if (!armed) return
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      // Only on genuinely long pages (articles/case studies), never short ones.
      if (scrollable < window.innerHeight) return
      const progress = (window.scrollY + window.innerHeight) / doc.scrollHeight
      if (progress >= SCROLL_THRESHOLD) {
        armed = false
        cleanup()
        open("slide")
      }
    }

    const onMouseOut = (event: MouseEvent) => {
      if (!armed || !exitArmed) return
      if (event.clientY <= 0 && !event.relatedTarget) {
        armed = false
        cleanup()
        open("modal")
      }
    }

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mouseout", onMouseOut)
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    // Exit-intent only makes sense with a real cursor; touch devices skip it.
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
    let armTimer: ReturnType<typeof setTimeout> | undefined
    if (hasFinePointer) {
      armTimer = setTimeout(() => {
        exitArmed = true
        document.addEventListener("mouseout", onMouseOut)
      }, EXIT_INTENT_ARM_DELAY)
    }

    // Evaluate scroll position once in case the page loads already scrolled.
    onScroll()

    return () => {
      if (armTimer) clearTimeout(armTimer)
      cleanup()
    }
  }, [pathSuppressed, open])

  const close = useCallback(
    (reason: "dismissed" | "subscribed") => {
      remember(reason)
      setVisible(false)
      // Let the exit transition finish before unmounting.
      window.setTimeout(() => setMode(null), 300)
    },
    []
  )

  if (!mode) return null

  if (mode === "modal") {
    return (
      <ModalShell visible={visible} onDismiss={() => close("dismissed")} copy={copy}>
        <PromptCard
          variant="modal"
          copy={copy}
          onDismiss={() => close("dismissed")}
          onSubscribed={() => close("subscribed")}
        />
      </ModalShell>
    )
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm transition-all duration-500 ease-out sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      role="region"
      aria-label={copy.eyebrow}
    >
      <PromptCard
        variant="slide"
        copy={copy}
        onDismiss={() => close("dismissed")}
        onSubscribed={() => close("subscribed")}
      />
    </div>
  )
}

type Copy = {
  eyebrow: string
  title: string
  body: string
  exitTitle: string
  exitBody: string
  emailPlaceholder: string
  consent: string
  submit: string
  loading: string
  successTitle: string
  successBody: string
  close: string
  noThanks: string
  emailInvalid: string
  consentRequired: string
  errorSubmit: string
}

function ModalShell({
  visible,
  onDismiss,
  copy,
  children,
}: {
  visible: boolean
  onDismiss: () => void
  copy: Copy
  children: React.ReactNode
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onDismiss])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={copy.exitTitle}
    >
      <button
        type="button"
        aria-label={copy.close}
        onClick={onDismiss}
        className={`absolute inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative w-full max-w-md transition-all duration-300 ease-out ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function PromptCard({
  variant,
  copy,
  onDismiss,
  onSubscribed,
}: {
  variant: PromptMode
  copy: Copy
  onDismiss: () => void
  onSubscribed: () => void
}) {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (variant === "modal") emailRef.current?.focus()
  }, [variant])

  const title = variant === "modal" ? copy.exitTitle : copy.title
  const body = variant === "modal" ? copy.exitBody : copy.body

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const email = String(data.get("email") ?? "").trim()
    const website = String(data.get("website") ?? "")

    if (website.trim()) {
      onSubscribed()
      return
    }

    if (!email || !emailPattern.test(email)) {
      setError(copy.emailInvalid)
      return
    }

    setError(null)
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Consent is given by submitting, per the notice shown below the button.
        body: JSON.stringify({ email, consent: true }),
      })
      if (!res.ok) throw new Error("failed")
      setStatus("success")
      window.setTimeout(onSubscribed, 2200)
    } catch {
      setStatus("error")
      setError(copy.errorSubmit)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-border/50 bg-white/90 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_24px_60px_-24px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-7">
      <button
        type="button"
        onClick={onDismiss}
        aria-label={copy.close}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      {status === "success" ? (
        <div className="py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--green-light1)] text-[var(--green-dark3)]">
            <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-medium tracking-tight text-foreground">
            {copy.successTitle}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {copy.successBody}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div
            className="absolute opacity-0 pointer-events-none"
            aria-hidden="true"
          >
            <label htmlFor="np-website">Website</label>
            <input
              id="np-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <h3 className="max-w-[18rem] text-xl font-light tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {body}
          </p>

          <div className="mt-4 space-y-3">
            <input
              ref={emailRef}
              name="email"
              type="email"
              required
              placeholder={copy.emailPlaceholder}
              autoComplete="email"
              aria-label={copy.emailPlaceholder}
              aria-invalid={Boolean(error)}
              className="h-11 w-full rounded-xl border border-border/60 bg-[var(--gray-1)] px-4 text-base text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:border-[var(--green-system)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--green-system)]/15"
            />

            {error && <p className="text-xs text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? copy.loading : copy.submit}
              {status !== "loading" && (
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              )}
            </button>

            <p className="text-center text-[0.7rem] leading-relaxed text-muted-foreground/70">
              {copy.consent}
            </p>

            <button
              type="button"
              onClick={onDismiss}
              className="mx-auto block text-xs text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {copy.noThanks}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
