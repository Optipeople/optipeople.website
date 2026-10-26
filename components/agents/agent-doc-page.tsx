import { ArrowRight, FileText } from "lucide-react"

import {
  MarkdownContent,
  TableOfContents,
  extractHeadings,
} from "@/components/blog-post-content"
import { JsonLd } from "@/components/json-ld"
import type { Locale } from "@/i18n/routing"
import { agentDocBody, type AgentDoc } from "@/lib/agent-docs"
import { addLocalePrefix } from "@/lib/i18n"
import { getSurface } from "@/lib/page-theme"
import { breadcrumbSchema, pageName } from "@/lib/structured-data"

export type AgentDocLink = { label: string; href: string }

const chrome: Record<Locale, { markdown: string; contents: string }> = {
  en: { markdown: "Markdown for agents", contents: "On this page" },
  da: { markdown: "Markdown til agenter", contents: "På siden" },
}

/**
 * One agent doc as a page: the tint hero with the key facts, then the same
 * Markdown the .md twin serves, on the blog's contents rail and prose measure.
 * The body is rendered from lib/agent-docs.ts, so the page and its twin can
 * not drift apart.
 */
export function AgentDocPage({
  doc,
  locale,
  links = [],
}: {
  doc: AgentDoc
  locale: Locale
  /** Extra links beside the Markdown one, e.g. /llms.txt. */
  links?: AgentDocLink[]
}) {
  const theme = getSurface("slate")
  const body = agentDocBody(doc)
  const headings = extractHeadings(body)
  const t = chrome[locale]
  const twin = `${addLocalePrefix(doc.path, locale)}.md`
  const allLinks: AgentDocLink[] = [{ label: t.markdown, href: twin }, ...links]

  return (
    <article className="min-h-screen">
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: pageName(doc.metaTitle), path: doc.path },
        ])}
      />

      <header className="relative isolate overflow-hidden pb-12 pt-12 lg:pb-16 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 60%, transparent 100%)`,
          }}
        />

        <div className="px-[var(--edge)]">
          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
              {doc.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {doc.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
              {doc.intro}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {allLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/82 transition-colors hover:text-foreground"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
                    {i === 0 ? (
                      <FileText className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <dl className="mt-12 grid max-w-5xl gap-x-10 border-t border-black/[0.08] sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {doc.facts.map((fact) => {
              const value = fact.code ? (
                <code className="break-all font-mono text-[0.9em]">{fact.value}</code>
              ) : (
                fact.value
              )
              return (
                <div
                  key={`${fact.label}-${fact.value}`}
                  className="min-w-0 border-b border-black/[0.08] py-5"
                >
                  <dt className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-foreground">
                    {fact.href ? (
                      <a href={fact.href} className="text-primary hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </header>

      <div className="px-[var(--edge)] pb-16 pt-4 lg:pb-24 lg:pt-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} label={t.contents} />
          </aside>

          <div className="min-w-0 max-w-[70ch]">
            <div className="prose prose-lg max-w-none prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[var(--gray-1)] prose-li:text-foreground/85 prose-th:text-foreground prose-td:text-foreground/85">
              <MarkdownContent content={body} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
