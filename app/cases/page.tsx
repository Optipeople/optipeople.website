import { PostArchive } from "@/components/post-archive"
import { getPostsByCategory } from "@/lib/blog-data"

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
