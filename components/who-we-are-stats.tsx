import type { Locale } from "@/i18n/routing"

/**
 * The "Who we are" proof strip: three columns of numbers on hairlines. Shared
 * by the About page and the homepage, so the numbers can only be changed in
 * one place and the two pages never disagree.
 */
const copy: Record<
  Locale,
  { title: string; stats: { metric: string; label: string; detail?: string }[] }
> = {
  en: {
    title: "Who we are",
    stats: [
      { metric: "100+", label: "Factories" },
      { metric: "10+", label: "Years of experience" },
      {
        metric: "7",
        label: "Disciplines",
        detail:
          "Automation, IoT, software, Modular MES, operations analysis, operations implementation, operations consulting",
      },
    ],
  },
  da: {
    title: "Hvem vi er",
    stats: [
      { metric: "100+", label: "Fabrikker" },
      { metric: "10+", label: "Års erfaring" },
      {
        metric: "7",
        label: "Fagområder",
        detail:
          "Automation, IoT, software, modulært MES, driftsanalyse, implementering i driften og driftsrådgivning",
      },
    ],
  },
}

export function WhoWeAreStats({
  locale,
  className = "",
}: {
  locale: Locale
  className?: string
}) {
  const t = copy[locale] ?? copy.en

  return (
    <section className={`px-[var(--edge)] ${className}`}>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
        {t.title}
      </p>
      <dl className="mt-6 grid grid-cols-1 divide-y divide-black/[0.08] border-y border-black/[0.08] sm:grid-cols-3 sm:divide-y-0">
        {t.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-8 sm:py-10 ${
              i > 0 ? "sm:border-l sm:border-black/[0.08] sm:pl-8" : ""
            } ${i < t.stats.length - 1 ? "sm:pr-8" : ""}`}
          >
            <dt className="text-4xl font-light leading-none tracking-tight tabular-nums text-foreground lg:text-5xl">
              {stat.metric}
            </dt>
            <dd className="mt-3 max-w-[26ch] text-sm leading-relaxed text-foreground/70">
              {stat.label}
              {stat.detail ? (
                <span className="mt-1 block text-foreground/60">
                  {stat.detail}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
