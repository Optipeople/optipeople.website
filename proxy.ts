import createMiddleware from "next-intl/middleware"
import { NextResponse, type NextRequest } from "next/server"

import { routing } from "./i18n/routing"
import { resolveLegacyPath } from "./lib/legacy-redirects"

const intl = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  // Old WordPress URLs that next.config.ts cannot match on their own: the
  // /en and /de Polylang prefixes, dated permalinks and emoji slugs. Real
  // routes never resolve here, so next-intl still sees the /en/... links its
  // language switcher uses to set the locale cookie.
  const { pathname, search } = request.nextUrl
  const legacy = resolveLegacyPath(pathname)
  if (legacy) return NextResponse.redirect(new URL(legacy + search, request.url), 308)

  // next.config.ts sets skipTrailingSlashRedirect and leaves the slash to
  // this function, so a legacy match above takes a single hop.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const stripped = pathname.replace(/\/+$/, "") || "/"
    return NextResponse.redirect(new URL(stripped + search, request.url), 308)
  }

  return intl(request)
}

export const config = {
  // Skip API routes, Next internals and any file with an extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
