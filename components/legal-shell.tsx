import type { Locale } from "@/i18n/routing"

const lastUpdated: Record<Locale, string> = {
  en: "Last updated: 28 June 2026",
  da: "Senest opdateret: 28. juni 2026",
}

const updatedPrefix: Record<Locale, string> = {
  en: "Last updated: ",
  da: "Senest opdateret: ",
}

export function LegalShell({
  eyebrow,
  title,
  locale,
  /** Per-page date, already localized (e.g. "24 August 2026"). Falls back to the shared date. */
  updated,
  children,
}: {
  eyebrow: string
  title: string
  locale: Locale
  updated?: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen">
      <section className="pt-16 sm:pt-24 pb-10 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-normal text-foreground tracking-tight leading-tight">
            {title}
          </h1>
          <p className="mt-6 text-base text-muted-foreground">
            {updated ? `${updatedPrefix[locale]}${updated}` : lastUpdated[locale]}
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl prose prose-slate prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-p:leading-relaxed prose-a:text-foreground">
          {children}
        </div>
      </section>
    </main>
  )
}
