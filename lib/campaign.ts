// Campaign attribution for the unlinked outreach landing pages (today only
// /sv/opti-assist). A cold email links to the page with utm_* parameters and a
// per-recipient ref `r`, so a lead in Monday can be traced to the company and
// the mail that brought it. The values go to sessionStorage on arrival, so
// they survive a reload or a click around the page before the form is sent.

export const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "r",
] as const

export type CampaignKey = (typeof CAMPAIGN_KEYS)[number]
export type Campaign = Partial<Record<CampaignKey, string>>

const STORAGE_KEY = "op_campaign"
/** Long enough for any real tag, short enough that nobody stuffs an essay in. */
const MAX_VALUE_LENGTH = 120

export function cleanCampaign(input: unknown): Campaign {
  const out: Campaign = {}
  if (!input || typeof input !== "object") return out
  const source = input as Record<string, unknown>
  for (const key of CAMPAIGN_KEYS) {
    const value = source[key]
    if (typeof value !== "string") continue
    const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH)
    if (trimmed) out[key] = trimmed
  }
  return out
}

/** Fallback for this page view when sessionStorage is blocked. */
let inMemory: Campaign = {}

export function readCampaign(): Campaign {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    return stored ? cleanCampaign(JSON.parse(stored)) : inMemory
  } catch {
    return inMemory
  }
}

/**
 * Reads the campaign parameters from the current URL and stores them. A new
 * value replaces the stored one key by key, so a second link from another
 * mail wins, while a plain reload without parameters keeps what was there.
 */
export function captureCampaign(): Campaign {
  const params = new URLSearchParams(window.location.search)
  const fromUrl: Record<string, string> = {}
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key)
    if (value) fromUrl[key] = value
  }
  const merged = { ...readCampaign(), ...cleanCampaign(fromUrl) }
  inMemory = merged
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch {
    // Storage blocked: the values still ride along for this page view.
  }
  return merged
}
