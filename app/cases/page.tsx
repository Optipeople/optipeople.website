import { PostArchive } from "@/components/post-archive"
import { getPostsByCategory } from "@/lib/blog-data"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Cases",
  description:
    "See how manufacturers use OptiPeople and Opticloud to improve OEE, reduce downtime, and make better production decisions.",
  path: "/cases",
})

interface CasesPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function CasesPage({ searchParams }: CasesPageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))
  const posts = getPostsByCategory("Cases")

  return (
    <main>
      <PostArchive
        posts={posts}
        basePath="/cases"
        backHref="/insights"
        backLabel="Back to insights"
        eyebrow="Cases"
        title="Real results from real factories"
        emptyTitle="No case studies yet"
        emptyBody="Case studies will appear here as customer stories are published."
        ctaLabel="Read case study"
        currentPage={currentPage}
      />
    </main>
  )
}
