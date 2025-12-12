import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const STATE_COOKIE = "decap_oauth_state"
const ORIGIN_COOKIE = "decap_oauth_origin"

function generateState() {
  return crypto.randomUUID()
}

function getOriginFromReferer(referer: string | null): string | undefined {
  if (!referer) return undefined
  try {
    return new URL(referer).origin
  } catch {
    return undefined
  }
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
  const openerOrigin = getOriginFromReferer(request.headers.get("referer"))

  const authUrl = new URL("https://github.com/login/oauth/authorize")
  authUrl.searchParams.set("client_id", clientId)
  authUrl.searchParams.set("redirect_uri", redirectUri)
  authUrl.searchParams.set("scope", "repo")
  authUrl.searchParams.set("state", state)
  authUrl.searchParams.set("allow_signup", "false")

  const cookieStore = await cookies()
  cookieStore.set({
    name: STATE_COOKIE,
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 10 * 60, // 10 minutes
  })
  if (openerOrigin) {
    cookieStore.set({
      name: ORIGIN_COOKIE,
      value: openerOrigin,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 10 * 60, // 10 minutes
    })
  }

  return NextResponse.redirect(authUrl.toString())
}
