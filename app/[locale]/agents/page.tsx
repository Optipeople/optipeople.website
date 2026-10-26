import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { AgentDocPage, type AgentDocLink } from "@/components/agents/agent-doc-page"
import type { Locale } from "@/i18n/routing"
import { AGENT_DOC_PATHS, getAgentDoc } from "@/lib/agent-docs"
import { addLocalePrefix } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

type Props = { params: Promise<{ locale: string }> }

const linkLabels: Record<Locale, { connect: string; mcp: string }> = {
  en: { connect: "Connect an agent", mcp: "MCP server" },
  da: { connect: "Kobl en agent på", mcp: "MCP-server" },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const doc = getAgentDoc("agents", locale as Locale)
  return buildMetadata({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: doc.path,
    locale: locale as Locale,
  })
}

/** OptiPeople for agents. The same text is served as Markdown at /agents.md. */
export default async function AgentsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const doc = getAgentDoc("agents", locale as Locale)
  const labels = linkLabels[locale as Locale] ?? linkLabels.en
  const links: AgentDocLink[] = [
    { label: "llms.txt", href: "/llms.txt" },
    { label: labels.connect, href: addLocalePrefix(AGENT_DOC_PATHS.connect, locale as Locale) },
    { label: labels.mcp, href: addLocalePrefix(AGENT_DOC_PATHS.mcp, locale as Locale) },
  ]

  return <AgentDocPage doc={doc} locale={locale as Locale} links={links} />
}
