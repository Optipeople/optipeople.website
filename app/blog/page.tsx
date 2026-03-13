import { PostArchive } from "@/components/post-archive"
import { getPostsByCategory } from "@/lib/blog-data"

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))
  const posts = getPostsByCategory("Insights")

  return (
    <main>
      <PostArchive
        posts={posts}
        basePath="/blog"
        eyebrow="Blog"
        title="Articles and insight pieces"
        emptyTitle="No blog posts yet"
        emptyBody="This archive is reserved for editorial blog posts and insight articles. Case studies live in the separate cases archive."
        ctaLabel="Read article"
        currentPage={currentPage}
      />
    </main>
  )
}
