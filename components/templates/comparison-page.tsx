import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { PageFaqSection } from "@/components/page-faq"
import type { ComparisonPage } from "@/content/shared/types"
import { getSurface } from "@/lib/page-theme"

/**
 * OptiPeople against one competitor. Same design language as the standard
 * page (the `--edge` column, `font-normal` display type, hairlines instead of
 * cards), built around one table a buyer can read row by row.
 *
 * Section flow: hero, table, where they are stronger, where we are, which to
 * choose, FAQ, sources. The sources close the page on purpose: every
 * competitor cell links down to the public page it came from, with the date
 * those pages were read, so the page stays checkable.
 * The conversion CTA is appended globally by app/[locale]/layout.tsx.
 */
export function ComparisonPageTemplate({ page }: { page: ComparisonPage }) {
  const t = useTranslations("pageTemplate")
  const theme = getSurface("slate")

  return (
    <main className="min-h-screen">
      <section className="relative isolate overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 55%, transparent 100%)`,
          }}
        />
        <div className="px-[var(--edge)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {page.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {page.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {page.heroBody}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground/65">
            {page.checked}
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="px-7">
              <Link href="/contact">{t("bookDemo")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The table. Below `md` each row stacks, so the two answers sit under
          their topic instead of in three columns too narrow to read. */}
      <section className="px-[var(--edge)] pt-16 lg:pt-20">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {page.tableTitle}
        </h2>
        <table className="mt-10 w-full border-t border-black/[0.08] text-left lg:mt-14">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-black/[0.08]">
              <th scope="col" className="w-[22%] py-4 pr-8 text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
                {page.topicLabel}
              </th>
              <th scope="col" className="w-[39%] py-4 pr-8 text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
                OptiPeople
              </th>
              <th scope="col" className="w-[39%] py-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
                {page.competitor}
              </th>
            </tr>
          </thead>
          <tbody>
            {page.rows.map((row) => (
              <tr
                key={row.topic}
                className="grid gap-3 border-b border-black/[0.08] py-8 md:table-row md:py-0"
              >
                <th
                  scope="row"
                  className="align-top text-xl font-normal leading-snug tracking-tight text-foreground md:py-8 md:pr-8"
                >
                  {row.topic}
                </th>
                <td className="align-top text-base leading-relaxed text-foreground/78 md:py-8 md:pr-8">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-foreground/65 md:hidden">
                    OptiPeople
                  </span>
                  {row.us}
                </td>
                <td className="align-top text-base leading-relaxed text-foreground/78 md:py-8">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-foreground/65 md:hidden">
                    {page.competitor}
                  </span>
                  {row.them}
                  {row.sources?.map((n) => (
                    <sup key={n} className="ml-0.5">
                      <a
                        href={`#source-${n}`}
                        className="text-foreground/65 underline-offset-2 hover:text-foreground hover:underline"
                      >
                        [{n}]
                      </a>
                    </sup>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ComparisonList title={page.strongerTitle} items={page.stronger} />
      <ComparisonList title={page.oursTitle} items={page.ours} />

      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
          {page.chooseTitle}
        </h2>
        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2">
          <p
            className="rounded-2xl p-8 text-lg leading-relaxed text-foreground/78 lg:p-10"
            style={{ backgroundColor: theme.tint }}
          >
            {page.chooseThem}
          </p>
          <p
            className="rounded-2xl p-8 text-lg leading-relaxed text-white/82 lg:p-10"
            style={{ backgroundColor: theme.deep }}
          >
            {page.chooseUs}
          </p>
        </div>
      </section>

      <PageFaqSection faq={page.faq} />

      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <h2 className="max-w-2xl text-2xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-3xl">
          {page.sourcesTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          {page.sourcesNote}
        </p>
        <ol className="mt-8 border-t border-black/[0.08]">
          {page.sources.map((source, i) => (
            <li
              key={source.href}
              id={`source-${i + 1}`}
              className="scroll-mt-24 border-b border-black/[0.08] py-4 text-sm"
            >
              <a
                href={source.href}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-baseline gap-3 text-foreground/78 hover:text-foreground"
              >
                <span className="tabular-nums text-foreground/65">[{i + 1}]</span>
                <span className="underline-offset-2 group-hover:underline">{source.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 self-center opacity-60" aria-hidden />
              </a>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}

function ComparisonList({
  title,
  items,
}: {
  title: string
  items: { title: string; description: string }[]
}) {
  return (
    <section className="px-[var(--edge)] py-16 sm:py-20 lg:py-28">
      <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
        {title}
      </h2>
      <dl className="mt-10 border-t border-black/[0.08] lg:mt-14">
        {items.map((item) => (
          <div
            key={item.title}
            className="grid gap-4 border-b border-black/[0.08] py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-10"
          >
            <dt className="text-xl font-normal leading-snug tracking-tight text-foreground lg:text-2xl">
              {item.title}
            </dt>
            <dd className="text-base leading-relaxed text-foreground/78">{item.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
