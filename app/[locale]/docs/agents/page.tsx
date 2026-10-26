import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { AgentDocPage } from "@/components/agents/agent-doc-page"
import type { Locale } from "@/i18n/routing"
import { AGENT_DOC_PATHS, getAgentDoc } from "@/lib/agent-docs"
import { addLocalePrefix } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

type Props = { params: Promise<{ locale: string }> }

const mcpLabel: Record<Locale, string> = { en: "MCP server", da: "MCP-server" }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const doc = getAgentDoc("connect", locale as Locale)
  return buildMetadata({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: doc.path,
    locale: locale as Locale,
  })
}

/** How an agent connects: MCP, the REST API and Opti Assist. Twin: /docs/agents.md. */
export default async function AgentDocsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const doc = getAgentDoc("connect", locale as Locale)
  const links = [
    {
      label: mcpLabel[locale as Locale] ?? mcpLabel.en,
      href: addLocalePrefix(AGENT_DOC_PATHS.mcp, locale as Locale),
    },
  ]

  return <AgentDocPage doc={doc} locale={locale as Locale} links={links} />
}
