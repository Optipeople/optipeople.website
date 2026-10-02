import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"

export type CustomerVoice = {
  quote: string
  company: string
  /** Left off when the case quotes the company rather than a named person. */
  author?: string
  role?: string
  /** Case study path, set only when a published story exists. */
  href?: string
}

/**
 * Customer quotes as an editorial spread rather than a carousel: the first
 * quote set large on its own, the rest beneath it in columns on a hairline.
 * No cards and no slider, the type carries it. One quote per person, so
 * nobody is quoted twice in the section.
 */
export function CustomerVoices({
  title,
  caseLabel,
  voices,
}: {
  title: string
  caseLabel: string
  voices: CustomerVoice[]
}) {
  const [featured, ...rest] = voices
  if (!featured) return null

  return (
    <section className="py-24 sm:py-28 lg:py-36">
      <div className="px-[var(--edge)]">
        <h2 className="text-3xl font-normal tracking-tight text-foreground lg:text-4xl">{title}</h2>

        <figure className="mt-12 max-w-4xl lg:mt-16">
          <blockquote className="relative text-balance text-3xl font-normal leading-[1.18] tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem]">
            {/* The opening mark hangs in the margin from lg, so the text
                keeps its left edge on the page's line. */}
            <span
              aria-hidden="true"
              className="lg:absolute lg:right-full lg:pr-[0.12em]"
              style={{ color: "var(--green-dark1)" }}
            >
              &ldquo;
            </span>
            {featured.quote}&rdquo;
          </blockquote>
          <Attribution voice={featured} caseLabel={caseLabel} stacked className="mt-8" />
        </figure>

        {rest.length > 0 ? (
          <div
            className={`mt-16 grid border-t border-slate-900/10 lg:mt-20 ${
              rest.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
            }`}
          >
            {/* Stacked on hairlines below lg; from lg one row of columns, a
                hairline between each, sized to how many voices there are. */}
            {rest.map((voice, i) => (
              <figure
                key={voice.company}
                className={`flex flex-col pt-10 lg:pt-12 ${
                  i > 0
                    ? "mt-10 border-t border-slate-900/10 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10"
                    : ""
                } ${i < rest.length - 1 ? "lg:pr-10" : ""}`}
              >
                <blockquote className="text-xl leading-snug tracking-tight text-slate-900 xl:text-2xl">
                  &ldquo;{voice.quote}&rdquo;
                </blockquote>
                <Attribution voice={voice} caseLabel={caseLabel} stacked className="mt-auto pt-8" />
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function Attribution({
  voice,
  caseLabel,
  stacked = false,
  className = "",
}: {
  voice: CustomerVoice
  caseLabel: string
  /** Link under the name instead of across from it. */
  stacked?: boolean
  className?: string
}) {
  return (
    <figcaption
      className={`flex gap-x-8 gap-y-3 ${
        stacked ? "flex-col items-start" : "flex-wrap items-end justify-between"
      } ${className}`}
    >
      <span>
        <span className="block text-base font-medium text-slate-900">
          {voice.author ?? voice.company}
        </span>
        {/* A company-only quote keeps an empty second line, so names and
            links stay level across the columns. */}
        <span className="block text-sm text-slate-900/65">
          {voice.author ? `${voice.role ? `${voice.role}, ` : ""}${voice.company}` : " "}
        </span>
      </span>
      {voice.href ? (
        <Link
          href={voice.href}
          className="group inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: "var(--green-dark1)" }}
        >
          {caseLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </figcaption>
  )
}
