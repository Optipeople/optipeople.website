// Global fallback for paths outside the [locale] segment. The root layout is a
// passthrough, so this renders its own <html>/<body>. Locale-scoped 404s use
// app/[locale]/not-found.tsx (with full chrome + translations).
import Link from "next/link"
import { IBM_Plex_Sans } from "next/font/google"
import "./globals.css"

// The locale layout is not rendered here, so the brand face has to be loaded
// again or the page falls back to the system font. Same options as the
// locale layout, so next/font serves the one set of files.
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
})

export default function GlobalNotFound() {
  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body className="bg-background text-foreground">
        <section className="flex min-h-screen items-center justify-center py-16 sm:py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="select-none text-8xl font-normal text-foreground/10 lg:text-9xl">
              404
            </p>
            <h1 className="mt-4 text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
              Page not found
            </h1>
            <p className="mx-auto mt-4 max-w-md text-lg text-foreground/82">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Go to homepage
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}
