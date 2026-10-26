const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

/**
 * Checks a Turnstile token from the browser with Cloudflare. Returns true when
 * no secret is configured, so local dev and previews without the key still
 * work; production has TURNSTILE_SECRET_KEY set on Vercel.
 */
export async function verifyTurnstile(token: unknown, request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (typeof token !== "string" || !token || token.length > 2048) return false

  const body = new URLSearchParams({ secret, response: token })
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  if (ip) body.set("remoteip", ip)

  try {
    const response = await fetch(SITEVERIFY_URL, { method: "POST", body })
    const data = (await response.json()) as { success?: boolean }
    return data.success === true
  } catch (error) {
    console.error("Turnstile siteverify failed:", error)
    return false
  }
}
