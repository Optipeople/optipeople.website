import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import type { SimplePage } from "@/content/shared/types"

const isExternal = (href: string) =>
  /^(mailto:|tel:|https?:|#)/.test(href)

export function SimpleLandingPage({ page }: { page: SimplePage }) {
  return (
    <main className="min-h-screen px-6 pb-16 pt-16 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {page.eyebrow}
        </p>
        <h1 className="text-4xl font-extralight leading-tight tracking-tight text-[var(--gray-10)]">
          {page.headline}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {page.body}
        </p>

        {page.links.length > 0 && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {page.links.map((link) => {
              const className =
                "group rounded-lg border border-border/60 p-6 transition-colors hover:border-primary/50"
              const inner = (
                <>
                  <h2 className="flex items-center gap-2 text-lg font-medium">
                    {link.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {link.description}
                  </p>
                </>
              )
              return isExternal(link.href) ? (
                <a key={link.href} href={link.href} className={className}>
                  {inner}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={className}>
                  {inner}
                </Link>
              )
            })}
          </div>
        )}

        {page.note && (
          <div className="mt-12 rounded-lg bg-muted/40 p-8 text-center text-muted-foreground">
            {page.note}
          </div>
        )}
      </div>
    </main>
  )
}
