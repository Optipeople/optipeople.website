import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const STATE_COOKIE = "decap_oauth_state"

function generateState() {
  return crypto.randomUUID()
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const origin = url.origin

  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    return NextResponse.json(
      { error: "Missing GITHUB_CLIENT_ID" },
      { status: 500 }
    )
  }

  const state = generateState()
  const redirectUri = `${origin}/api/auth/callback`

  const authUrl = new URL("https://github.com/login/oauth/authorize")
  authUrl.searchParams.set("client_id", clientId)
  authUrl.searchParams.set("redirect_uri", redirectUri)
  authUrl.searchParams.set("scope", "repo")
  authUrl.searchParams.set("state", state)
  authUrl.searchParams.set("allow_signup", "false")

  cookies().set({
    name: STATE_COOKIE,
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 10 * 60, // 10 minutes
  })

  return NextResponse.redirect(authUrl.toString())
}

