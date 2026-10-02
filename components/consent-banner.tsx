"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import {
  applyConsent,
  onConsentSettingsOpen,
  openConsentSettings,
  readConsent,
  saveConsent,
  trackEvent,
  type ConsentChoice,
} from "@/lib/analytics"

/**
 * Asks once for statistics cookies, then remembers the answer. Also owns the
 * site-wide tel: and mailto: click tracking, since it is mounted on every page.
 */
export function ConsentBanner() {
  const t = useTranslations("consent")
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choice = readConsent()
    if (choice) applyConsent(choice)
    const show = () => {
      setOpen(true)
      requestAnimationFrame(() => setVisible(true))
    }
    if (!choice) show()
    return onConsentSettingsOpen(show)
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.(
        'a[href^="tel:"], a[href^="mailto:"]'
      ) as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute("href") ?? ""
      const isPhone = href.startsWith("tel:")
      trackEvent(isPhone ? "click_phone" : "click_email", {
        link_url: href.split("?")[0],
      })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  function choose(choice: ConsentChoice) {
    saveConsent(choice)
    setVisible(false)
    window.setTimeout(() => setOpen(false), 300)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      className={`fixed bottom-4 left-4 z-[60] w-[calc(100vw-2rem)] max-w-sm transition-all duration-500 ease-out sm:bottom-6 sm:left-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="rounded-[1.5rem] border border-border/50 bg-white/95 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_24px_60px_-24px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-6">
        <h2
          id="consent-title"
          className="text-lg font-normal tracking-tight text-foreground"
        >
          {t("title")}
        </h2>
        <p
          id="consent-body"
          className="mt-2 text-sm leading-relaxed text-muted-foreground"
        >
          {t.rich("body", {
            link: (chunks) => (
              <Link
                href="/privacy#cookies"
                className="font-medium text-foreground underline underline-offset-2"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
        {/* Saying no is exactly as easy as saying yes: same size, same row. */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-white text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary text-base font-semibold text-white transition-all hover:opacity-90"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  )
}

/** Reopens the banner. Used on the privacy page. */
export function ConsentSettingsButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="font-medium text-foreground underline underline-offset-2"
    >
      {children}
    </button>
  )
}
