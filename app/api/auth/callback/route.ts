import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const STATE_COOKIE = "decap_oauth_state"
const ORIGIN_COOKIE = "decap_oauth_origin"

type TokenResponse =
  | { access_token: string; token_type: string; scope: string }
  | { error: string; error_description?: string }

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const cookieStore = await cookies()
  const storedState = cookieStore.get(STATE_COOKIE)?.value
  const storedOrigin = cookieStore.get(ORIGIN_COOKIE)?.value

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing GitHub OAuth env vars" },
      { status: 500 }
    )
  }

  if (!code || !state || !storedState || state !== storedState) {
    return renderResult({
      success: false,
      message: "Invalid OAuth state",
      targetOrigin: storedOrigin,
    })
  }

  cookieStore.delete(STATE_COOKIE)
  cookieStore.delete(ORIGIN_COOKIE)

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${url.origin}/api/auth/callback`,
        state,
      }),
    }
  )

  const json = (await tokenResponse.json()) as TokenResponse

  if (!tokenResponse.ok || "error" in json || !("access_token" in json)) {
    return renderResult({
      success: false,
      message: "Failed to get access token",
      error: "error" in json ? json.error : undefined,
      targetOrigin: storedOrigin,
    })
  }

  return renderResult({
    success: true,
    token: json.access_token,
    provider: "github",
    targetOrigin: storedOrigin,
  })
}

function renderResult(data: {
  success: boolean
  token?: string
  provider?: string
  message?: string
  error?: string
  targetOrigin?: string
}) {
  const payload = {
    token: data.token,
    provider: data.provider,
    success: data.success,
    message: data.message,
    error: data.error,
    targetOrigin: data.targetOrigin,
  }

  const html = `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        const payload = ${JSON.stringify(payload)};
        // IMPORTANT: postMessage targetOrigin must match the opener window's origin.
        // If /admin is on a different domain than this callback, using window.location.origin
        // would prevent delivery. We persist the opener origin from the initial /api/auth request.
        const targetOrigin = payload.targetOrigin || "*";
        const provider = payload.provider || "github";

        // Decap/Netlify CMS GitHub backend expects this legacy string format:
        // "authorization:<provider>:<token>"
        // (and often ignores other payload shapes).
        if (window.opener && payload.success && payload.token) {
          window.opener.postMessage("authorization:" + provider + ":" + payload.token, targetOrigin);
          // Fallback for newer/alternate listeners.
          window.opener.postMessage({ token: payload.token, provider }, targetOrigin);
        } else if (window.opener) {
          const msg = payload.error || payload.message || "OAuth failed";
          window.opener.postMessage("authorization:" + provider + ":error:" + msg, targetOrigin);
          window.opener.postMessage({ error: msg, provider }, targetOrigin);
        }
        window.close();
      })();
    </script>
  </body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  })
}
