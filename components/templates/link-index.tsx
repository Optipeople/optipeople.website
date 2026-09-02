import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { FramedImage } from "@/components/framed-image"
import type { SimplePage } from "@/content/shared/types"
import { getFeature } from "@/content/pages/features"
import { getModule } from "@/content/pages/modules"
import { getService } from "@/content/pages/services"
import { getSolution } from "@/content/pages/solutions"
import { getPageTheme, type PageFamily } from "@/lib/page-theme"
import type { Locale } from "@/i18n/routing"

/**
 * Hub page for a family of deep-dives, /features, /modules, /services,
 * /solutions.
 *
 * Reads the same `SimplePage` content as the generic template, so there is no
 * content migration; it just renders it in the deep-dive design language.
 * Each card borrows the colour and lead image of the page it points to, so a
 * hub previews its destinations instead of listing identical boxes.
 *
 * Replaces the former SimpleLandingPage, which backed exactly these four
 * routes and nothing else. Pages like /get-help and /videos were never on it, 
 * they carry their own bespoke layouts and are untouched.
 */
export function LinkIndexPage({
  page,
  family,
  locale,
}: {
  page: SimplePage
  family: PageFamily
  locale: Locale
}) {
  const prefix = `/${family}/`

  return (
    <main className="min-h-screen">
      {/* Hero, neutral, because the cards below carry the colour. */}
      <section className="bg-[var(--gray-1)] pb-16 pt-12 sm:pb-20 lg:pb-28 lg:pt-16">
        <div className="px-[var(--edge)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {page.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {page.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {page.body}
          </p>
        </div>
      </section>

      {/* Destination cards */}
      <section className="px-[var(--edge)] py-16 sm:py-20 lg:py-28">
        {page.linksTitle && (
          <h2 className="text-2xl font-normal tracking-tight text-foreground lg:text-3xl">
            {page.linksTitle}
          </h2>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {page.links.map((link) => {
            // Links that leave the family (or point elsewhere entirely) keep
            // the layout but get no colour or preview.
            const slug = link.href.startsWith(prefix)
              ? link.href.slice(prefix.length)
              : null
            const theme = slug ? getPageTheme(family, slug) : null
            const preview = slug ? previewImage(family, slug, locale) : null

            return (
              <Link
                key={link.href}
                href={link.href}
                className="reveal group flex flex-col justify-between overflow-hidden rounded-[1.5rem] transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.28)] lg:rounded-[1.75rem]"
                style={{
                  backgroundColor: theme?.tint ?? "var(--gray-1)",
                }}
              >
                <div className="flex items-start justify-between gap-6 p-7 lg:p-9">
                  <div>
                    <h3 className="text-xl font-normal tracking-tight text-foreground lg:text-2xl">
                      {link.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/78">
                      {link.description}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 text-foreground transition-colors group-hover:border-black/25 group-hover:bg-white">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                {/* Screenshot sits on the card as a whole picture. It used to
                    run off the bottom edge under `object-cover`, which read to
                    visitors as an image cut in half rather than as a crop, so
                    the mount now hugs the screenshot and keeps its own margin.
                    Hover lifts the mount rather than zooming inside it, since a
                    zoom is a crop by another name. */}
                {preview && (
                  <div className="mt-2 px-7 pb-7 lg:px-9 lg:pb-9">
                    <FramedImage
                      src={preview}
                      alt=""
                      decorative
                      boxSizes="(min-width: 640px) 520px, 100vw"
                      cap="[--frame-cap:14rem] lg:[--frame-cap:18rem]"
                      className="mx-auto overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_-16px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06] transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Editorial sections, hairline grid rather than loose paragraphs. */}
      {page.sections && page.sections.length > 0 && (
        <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] bg-black/[0.08] sm:grid-cols-2">
            {page.sections.map((section) => (
              <div key={section.title} className="bg-background p-8 lg:p-10">
                <h2 className="text-lg font-medium tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/72">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {page.note && (
            <p className="mt-10 text-sm leading-relaxed text-foreground/70">
              {page.note}
            </p>
          )}
        </section>
      )}
    </main>
  )
}

/**
 * The lead image of a destination page. Feature pages open on a screenshot;
 * the overview families carry theirs on the mid-page visual, which may be
 * absent.
 */
function previewImage(
  family: PageFamily,
  slug: string,
  locale: Locale
): string | null {
  switch (family) {
    case "features":
      return getFeature(slug)?.content[locale].heroImage ?? null
    case "modules":
      return getModule(slug)?.content[locale].visualImage ?? null
    case "services":
      return getService(slug)?.content[locale].visualImage ?? null
    case "solutions":
      return getSolution(slug)?.content[locale].visualImage ?? null
    default:
      return null
  }
}
