import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { AgentDocPage } from "@/components/agents/agent-doc-page"
import type { Locale } from "@/i18n/routing"
import { AGENT_DOC_PATHS, getAgentDoc } from "@/lib/agent-docs"
import { addLocalePrefix } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

type Props = { params: Promise<{ locale: string }> }

const connectLabel: Record<Locale, string> = { en: "Connect an agent", da: "Kobl en agent på" }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const doc = getAgentDoc("mcp", locale as Locale)
  return buildMetadata({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: doc.path,
    locale: locale as Locale,
  })
}

/** The MCP server: set-up, login, tools, sources and limits. Twin: /docs/mcp.md. */
export default async function McpDocsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const doc = getAgentDoc("mcp", locale as Locale)
  const links = [
    {
      label: connectLabel[locale as Locale] ?? connectLabel.en,
      href: addLocalePrefix(AGENT_DOC_PATHS.connect, locale as Locale),
    },
  ]

  return <AgentDocPage doc={doc} locale={locale as Locale} links={links} />
}
