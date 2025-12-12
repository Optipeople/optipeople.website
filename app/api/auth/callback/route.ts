import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const STATE_COOKIE = "decap_oauth_state"

type TokenResponse =
  | { access_token: string; token_type: string; scope: string }
  | { error: string; error_description?: string }

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const cookieStore = await cookies()
  const storedState = cookieStore.get(STATE_COOKIE)?.value

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
    })
  }

  cookieStore.delete(STATE_COOKIE)

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
    })
  }

  return renderResult({
    success: true,
    token: json.access_token,
    provider: "github",
  })
}

function renderResult(data: {
  success: boolean
  token?: string
  provider?: string
  message?: string
  error?: string
}) {
  const payload = {
    token: data.token,
    provider: data.provider,
    success: data.success,
    message: data.message,
    error: data.error,
  }

  const html = `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        const payload = ${JSON.stringify(payload)};
        if (window.opener && payload.success && payload.token) {
          window.opener.postMessage({ token: payload.token, provider: payload.provider }, "*");
        } else if (window.opener) {
          window.opener.postMessage({ error: payload.error || payload.message || "OAuth failed" }, "*");
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
