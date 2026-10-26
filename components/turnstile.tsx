"use client"

import { useCallback, useEffect, useRef } from "react"

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
/** Give up waiting for a token after this long; the server then rejects. */
const TOKEN_TIMEOUT = 30000

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: Record<string, unknown>
  ) => string | undefined
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let scriptPromise: Promise<void> | null = null

function loadScript() {
  if (window.turnstile) return Promise.resolve()
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script")
      script.src = SCRIPT_SRC
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        scriptPromise = null
        reject(new Error("Turnstile failed to load"))
      }
      document.head.appendChild(script)
    })
  }
  return scriptPromise
}

/**
 * Cloudflare Turnstile bot check for the lead forms. Render `containerRef` on
 * a div inside the form, await `getToken()` on submit and send the token as
 * `turnstileToken`. The widget stays invisible unless Cloudflare wants the
 * visitor to click. Without a site key (local dev) it does nothing.
 */
export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const token = useRef<string | null>(null)
  const waiters = useRef<((value: string) => void)[]>([])

  useEffect(() => {
    if (!SITE_KEY) return
    let cancelled = false

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetId.current =
          window.turnstile.render(containerRef.current, {
            sitekey: SITE_KEY,
            action: "turnstile-spin-v1",
            appearance: "interaction-only",
            "refresh-expired": "auto",
            callback: (value: string) => {
              token.current = value
              waiters.current.splice(0).forEach((resolve) => resolve(value))
            },
            "expired-callback": () => {
              token.current = null
            },
            "error-callback": () => {
              token.current = null
            },
          }) ?? null
      })
      .catch(() => {
        // Blocked script: getToken times out and the server says no.
      })

    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
      }
      widgetId.current = null
    }
  }, [])

  const getToken = useCallback((): Promise<string> => {
    if (!SITE_KEY) return Promise.resolve("")
    if (token.current) return Promise.resolve(token.current)
    return new Promise((resolve) => {
      const timer = window.setTimeout(() => resolve(""), TOKEN_TIMEOUT)
      waiters.current.push((value) => {
        window.clearTimeout(timer)
        resolve(value)
      })
    })
  }, [])

  /** Tokens are single use, so fetch a fresh one after every submit. */
  const reset = useCallback(() => {
    token.current = null
    if (widgetId.current && window.turnstile) {
      window.turnstile.reset(widgetId.current)
    }
  }, [])

  return { containerRef, getToken, reset }
}
