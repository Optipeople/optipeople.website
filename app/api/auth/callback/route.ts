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
      openerOrigin: storedOrigin,
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
      openerOrigin: storedOrigin,
    })
  }

  return renderResult({
    success: true,
    token: json.access_token,
    provider: "github",
    openerOrigin: storedOrigin,
  })
}

function renderResult(data: {
  success: boolean
  token?: string
  provider?: string
  message?: string
  error?: string
  openerOrigin?: string
}) {
  const payload = {
    token: data.token,
    provider: data.provider,
    success: data.success,
    message: data.message,
    error: data.error,
    openerOrigin: data.openerOrigin,
  }

  const html = `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        const payload = ${JSON.stringify(payload)};
        const provider = payload.provider || "github";
        const openerOrigin = payload.openerOrigin;

        // Decap/Netlify CMS OAuth popup handshake:
        // 1) Popup -> opener: "authorizing:<provider>" (targetOrigin "*")
        // 2) Opener -> popup: (any message, used to learn opener origin)
        // 3) Popup -> opener: "authorization:<provider>:<status>:<json>"
        //    where status is "success" or "error".
        function sendResult(targetOrigin) {
          if (!window.opener) return;
          if (openerOrigin && targetOrigin !== openerOrigin) return;

          if (payload.success && payload.token) {
            const content = { token: payload.token, provider };
            window.opener.postMessage(
              "authorization:" + provider + ":success:" + JSON.stringify(content),
              targetOrigin
            );
          } else {
            const msg = payload.error || payload.message || "OAuth failed";
            const content = { error: msg, provider };
            window.opener.postMessage(
              "authorization:" + provider + ":error:" + JSON.stringify(content),
              targetOrigin
            );
          }
          window.close();
        }

        function receiveMessage(e) {
          try {
            // If we have an expected opener origin, only accept that.
            if (openerOrigin && e.origin !== openerOrigin) return;
            sendResult(e.origin);
          } finally {
            window.removeEventListener("message", receiveMessage, false);
          }
        }

        window.addEventListener("message", receiveMessage, false);

        // Start handshake with parent. If the opener doesn't respond (rare),
        // fall back to a direct postMessage.
        if (window.opener) {
          window.opener.postMessage("authorizing:" + provider, "*");
          setTimeout(function() {
            // Prefer the stored opener origin; otherwise allow any origin.
            sendResult(openerOrigin || "*");
          }, 1500);
        }

      })();
    </script>
  </body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  })
}