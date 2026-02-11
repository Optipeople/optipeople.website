import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/blog-data"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const POSTS_PER_PAGE = 10

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const allPosts = getAllPosts()
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  // Ensure current page is within bounds
  const validPage = Math.min(currentPage, totalPages)

  const startIndex = (validPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedPosts = allPosts.slice(startIndex, endIndex)

  const featuredPost = paginatedPosts[0]
  const secondaryPosts = paginatedPosts.slice(1)

  return (
    <main>
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
              Cases
            </p>
            <h1 className="text-4xl lg:text-5xl font-light text-foreground tracking-tight">
              Stories from the field
            </h1>
          </div>

          {/* Blog Grid */}
          <div className="grid gap-8 lg:gap-12">
            {/* Featured Post */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block"
              >
                <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl bg-muted border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                    {featuredPost.image && (
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight group-hover:text-foreground/80 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground/70 pt-2">
                      Read case study
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* All Other Posts */}
            {secondaryPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pt-8 border-t border-border/50">
                {secondaryPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="space-y-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-foreground tracking-tight group-hover:text-foreground/80 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
              {/* Previous Button */}
              {validPage > 1 ? (
                <Link
                  href={validPage === 2 ? "/blog" : `/blog?page=${validPage - 1}`}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/30 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </span>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={page === 1 ? "/blog" : `/blog?page=${page}`}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                      page === validPage
                        ? "bg-foreground text-background"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>

              {/* Next Button */}
              {validPage < totalPages ? (
                <Link
                  href={`/blog?page=${validPage + 1}`}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/30 cursor-not-allowed">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </nav>
          )}
        </div>
      </section>
    </main>
  )
}
