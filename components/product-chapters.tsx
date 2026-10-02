import { ChevronRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { MesVisual } from "@/components/module-mockups"
import { AssistVisual, IotVisual } from "@/components/product-visuals"

export type ProductChapter = {
  id: "mes" | "iot" | "assist"
  /** The product's name, set as the display line. */
  name: string
  /** The one sentence that sells it, under the name. */
  tagline: string
  body: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel: string
  secondaryHref: string
}

/**
 * Full-bleed band per product, dark, light, dark, so the three read as the
 * spine of the page rather than three cards in a row of cards. The Assist
 * visual is the one dark window, which is why it gets the brand teal rather
 * than the near-black: it needs a surface lighter than its own shell.
 */
const BAND: Record<ProductChapter["id"], { bg: string; tone: "light" | "dark" }> = {
  mes: { bg: "var(--gray-8)", tone: "light" },
  iot: { bg: "var(--gray-1)", tone: "dark" },
  assist: { bg: "#163b40", tone: "light" },
}

/**
 * How wide each visual runs. MES needs the width for its left-to-right flow;
 * the Assist window is an app and reads truer at app width.
 */
const VISUAL_WIDTH: Record<ProductChapter["id"], string> = {
  mes: "max-w-5xl",
  iot: "max-w-4xl",
  assist: "max-w-3xl",
}

function ChapterVisual({ id }: { id: ProductChapter["id"] }) {
  if (id === "mes") return <MesVisual fill={false} />
  return id === "iot" ? <IotVisual /> : <AssistVisual />
}

/**
 * The three products the homepage is built around, one band each, stacked to
 * scroll rather than slide. Centred name, tagline and two links, then the
 * product itself, large, running off the bottom edge of the band the way a
 * device sits on the floor of a product page, so the band ends on the window
 * rather than on padding.
 *
 * The visual rises in through the shared `.reveal` view timeline; no JS.
 */
export function ProductChapters({ chapters }: { chapters: ProductChapter[] }) {
  return (
    <>
      {chapters.map((chapter) => {
        const band = BAND[chapter.id]
        const light = band.tone === "light"

        return (
          <section
            key={chapter.id}
            id={`product-${chapter.id}`}
            className="overflow-hidden pt-20 sm:pt-28 lg:pt-36"
            style={{ backgroundColor: band.bg }}
          >
            <div className="px-[var(--edge)] text-center">
              <h2
                className={`text-5xl font-normal leading-none tracking-[-0.035em] sm:text-7xl lg:text-8xl ${
                  light ? "text-white" : "text-slate-950"
                }`}
              >
                {chapter.name}
              </h2>
              <p
                className={`mx-auto mt-5 max-w-3xl text-balance text-2xl font-normal leading-tight tracking-tight sm:mt-6 sm:text-3xl lg:text-4xl ${
                  light ? "text-white/88" : "text-slate-900/85"
                }`}
              >
                {chapter.tagline}
              </p>
              <p
                className={`mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed ${
                  light ? "text-white/72" : "text-slate-900/72"
                }`}
              >
                {chapter.body}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg">
                {[
                  { label: chapter.ctaLabel, href: chapter.ctaHref },
                  { label: chapter.secondaryLabel, href: chapter.secondaryHref },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center gap-0.5 font-normal transition-opacity hover:opacity-80"
                    style={{ color: light ? "var(--green-light2)" : "var(--green-dark1)" }}
                  >
                    {link.label}
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* The negative bottom margin pushes the window's lower edge past
                the band, and the section's overflow cuts it there. */}
            <div className="mt-14 -mb-[clamp(3rem,9vw,7rem)] px-[var(--edge)] sm:mt-20">
              <div className={`reveal mx-auto ${VISUAL_WIDTH[chapter.id]}`}>
                <ChapterVisual id={chapter.id} />
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
