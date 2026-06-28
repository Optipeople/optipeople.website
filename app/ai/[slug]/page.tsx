import { notFound } from "next/navigation"
import { AiStackPage } from "@/components/ai-stack-page"
import { aiCapabilitySlugs, getAiCapability } from "@/lib/ai-stack"
import { buildMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return aiCapabilitySlugs.map((slug) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const cap = getAiCapability(slug)
  if (!cap) {
    return buildMetadata({
      title: "Not found | OptiPeople",
      description: "The requested page could not be found.",
      path: `/ai/${slug}`,
    })
  }
  const c = cap.content.en
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: cap.href,
  })
}

export default async function AiCapabilityPage({ params }: Props) {
  const { slug } = await params
  if (!getAiCapability(slug)) notFound()
  return <AiStackPage slug={slug} locale="en" />
}
