"use client"

import { useEffect } from "react"

import {
  applyConsent,
  CONSENT_CHANGE_EVENT,
  readConsent,
  trackEvent,
} from "@/lib/analytics"
import { captureCampaign, readCampaign } from "@/lib/campaign"

export const LANDING_ID = "opti_assist_sv"

/** The campaign fields as GA4 event params. `ref` is the per-recipient `r`. */
export function campaignParams() {
  const c = readCampaign()
  return {
    landing: LANDING_ID,
    ref: c.r ?? "",
    campaign_source: c.utm_source ?? "",
    campaign_medium: c.utm_medium ?? "",
    campaign_name: c.utm_campaign ?? "",
    campaign_content: c.utm_content ?? "",
  }
}

/**
 * Stores utm_* and `r` from the URL on arrival, sends one `landing_view`
 * event with them, and a `cta_click` for every element marked `data-cta`.
 *
 * GA4 is consent-gated like the rest of the site (lib/analytics.ts), so the
 * view goes out as soon as consent is known: right away for a returning
 * visitor who said yes, or the moment a new visitor accepts. The campaign
 * fields always travel with the form itself, consent or not, since that is a
 * message the visitor sends us on purpose.
 */
export function CampaignTracking() {
  useEffect(() => {
    captureCampaign()

    let sent = false
    const sendView = () => {
      if (sent || readConsent() !== "granted") return
      // This runs before the consent banner's own effect, so load GA here.
      applyConsent("granted")
      sent = true
      trackEvent("landing_view", campaignParams())
    }
    sendView()
    window.addEventListener(CONSENT_CHANGE_EVENT, sendView)

    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest?.("[data-cta]")
      if (!el) return
      trackEvent("cta_click", {
        ...campaignParams(),
        cta_location: el.getAttribute("data-cta") ?? "",
      })
    }
    document.addEventListener("click", onClick, { capture: true })

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, sendView)
      document.removeEventListener("click", onClick, { capture: true })
    }
  }, [])

  return null
}
