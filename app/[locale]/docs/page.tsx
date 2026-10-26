import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { getAgentDoc, type AgentDocKind } from "@/lib/agent-docs"
import { getSurface } from "@/lib/page-theme"
import { buildMetadata } from "@/lib/seo"

type Props = { params: Promise<{ locale: string }> }

const copy: Record<Locale, { metaTitle: string; metaDescription: string; eyebrow: string; title: string; body: string }> = {
  en: {
    metaTitle: "Docs | OptiPeople",
    metaDescription:
      "Docs for connecting AI agents and your own code to the OptiPeople Data Platform: the MCP server and the REST API.",
    eyebrow: "Docs",
    title: "Connect to the OptiPeople Data Platform",
    body: "For AI agents and developers. Each doc below also comes as Markdown: add .md to its path.",
  },
  da: {
    metaTitle: "Dokumentation | OptiPeople",
    metaDescription:
      "Dokumentation til at koble AI-agenter og jeres egen kode på OptiPeople Data Platform: MCP-serveren og REST-API'et.",
    eyebrow: "Dokumentation",
    title: "Kobl på OptiPeople Data Platform",
    body: "Til AI-agenter og udviklere. Hver side herunder findes også som Markdown: sæt .md på stien.",
  },
}

const DOCS: AgentDocKind[] = ["agents", "connect", "mcp"]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/docs",
    locale: locale as Locale,
  })
}

/** A short index of the agent docs. */
export default async function DocsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  const theme = getSurface("slate")
  const docs = DOCS.map((kind) => getAgentDoc(kind, locale as Locale))

  return (
    <div className="min-h-screen">
      <section className="relative isolate overflow-hidden pb-12 pt-12 lg:pb-16 lg:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background: `linear-gradient(180deg, ${theme.tint} 0%, ${theme.tint} 60%, transparent 100%)`,
          }}
        />
        <div className="px-[var(--edge)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-foreground/78 lg:text-xl">
            {t.body}
          </p>
        </div>
      </section>

      <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
        <ul className="border-t border-black/[0.08]">
          {docs.map((doc) => (
            <li key={doc.path} className="border-b border-black/[0.08]">
              <Link
                href={doc.path}
                className="group grid gap-3 py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-10"
              >
                <span className="flex items-center gap-3 text-xl font-normal leading-snug tracking-tight text-foreground lg:text-2xl">
                  {doc.title}
                  <ArrowRight className="h-5 w-5 text-foreground/65 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-base leading-relaxed text-foreground/78">
                  {doc.metaDescription}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
