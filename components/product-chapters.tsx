import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { MesVisual } from "@/components/module-mockups"
import { AssistVisual, IotVisual } from "@/components/product-visuals"

export type ProductChapter = {
  id: "mes" | "iot" | "assist"
  eyebrow: string
  title: string
  body: string
  /** Three short proof points, one line each on desktop. */
  points: string[]
  ctaLabel: string
  ctaHref: string
}

/**
 * Panel colour per chapter, from the same family as the module carousel cards.
 * MES leads on the deep teal; IoT and Opti Assist sit on light tones, because
 * the Assist visual is the one dark panel and needs a light surface around it.
 */
const CHAPTER_THEME: Record<ProductChapter["id"], { bg: string; tone: "light" | "dark" }> = {
  mes: { bg: "#163b40", tone: "light" },
  iot: { bg: "#c7d9cd", tone: "dark" },
  assist: { bg: "#d8d4c6", tone: "dark" },
}

function ChapterVisual({ id }: { id: ProductChapter["id"] }) {
  if (id === "mes") {
    // Content height at every size; MesVisual switches to its stacked layout
    // on its own once the column is narrower than a full page frame.
    return <MesVisual fill={false} />
  }
  return id === "iot" ? <IotVisual /> : <AssistVisual />
}

/**
 * The three products the homepage leads with, stacked vertically, one panel
 * each. Text and visual sit side by side from `lg`, alternating sides so the
 * eye zigzags down the page, and stack below it. The panels reveal on scroll
 * through the shared `.reveal` view timeline; nothing here needs JS.
 */
export function ProductChapters({
  chapters,
  className = "",
}: {
  chapters: ProductChapter[]
  className?: string
}) {
  return (
    <div className={`space-y-4 px-[var(--edge)] sm:space-y-6 ${className}`}>
      {chapters.map((chapter, index) => {
        const theme = CHAPTER_THEME[chapter.id]
        const light = theme.tone === "light"
        const flip = index % 2 === 1

        return (
          <article
            key={chapter.id}
            id={`product-${chapter.id}`}
            className="reveal overflow-hidden rounded-[1.75rem] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
            style={{ backgroundColor: theme.bg }}
          >
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className={`lg:col-span-5 ${flip ? "lg:order-last" : ""}`}>
                <p
                  className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] ${
                    light ? "text-white/72" : "text-slate-900/65"
                  }`}
                >
                  <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span className={`h-px w-6 ${light ? "bg-white/30" : "bg-slate-900/20"}`} />
                  {chapter.eyebrow}
                </p>
                <h2
                  className={`mt-5 text-balance text-3xl font-normal leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.6rem] ${
                    light ? "text-white" : "text-slate-900"
                  }`}
                >
                  {chapter.title}
                </h2>
                <p
                  className={`mt-5 text-lg leading-relaxed ${
                    light ? "text-white/82" : "text-slate-900/78"
                  }`}
                >
                  {chapter.body}
                </p>

                <ul className="mt-8">
                  {chapter.points.map((point) => (
                    <li
                      key={point}
                      className={`border-t py-3 text-[15px] leading-snug ${
                        light ? "border-white/15 text-white/90" : "border-slate-900/12 text-slate-900/85"
                      }`}
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  href={chapter.ctaHref}
                  className={`group mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    light
                      ? "bg-white text-slate-900 hover:bg-white/90"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {chapter.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="lg:col-span-7">
                <ChapterVisual id={chapter.id} />
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
