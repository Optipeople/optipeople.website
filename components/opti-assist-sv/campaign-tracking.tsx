"use client"

import { useEffect } from "react"

import { trackEvent } from "@/lib/analytics"
import { captureCampaign, readCampaign } from "@/lib/campaign"

export const LANDING_ID = "opti_assist_sv"

/**
 * The nvoke cold email links are short, /sv/opti-assist?r=<nvoke lead UUID>.
 * Those get these utm values; a link with its own utm_* keeps its own.
 */
const SHORT_LINK_UTM = {
  utm_source: "nvoke",
  utm_medium: "email",
  utm_campaign: "opti-assist-se",
}

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
 * Every visitor is counted: without consent the events go out as cookieless
 * pings (Consent Mode advanced, lib/analytics.ts), which matters here since
 * most cold email clicks come from phones, where no banner is shown. The
 * campaign fields also travel with the form itself, since that is a message
 * the visitor sends us on purpose.
 */
export function CampaignTracking() {
  useEffect(() => {
    captureCampaign(SHORT_LINK_UTM)

    trackEvent("landing_view", campaignParams())

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
      document.removeEventListener("click", onClick, { capture: true })
    }
  }, [])

  return null
}
