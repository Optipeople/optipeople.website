import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

import type { BlogPost } from "@/lib/blog-data"

type PostArchiveProps = {
  posts: BlogPost[]
  basePath: string
  eyebrow: string
  title: string
  emptyTitle: string
  emptyBody: string
  ctaLabel: string
  currentPage: number
  postsPerPage?: number
}

export function PostArchive({
  posts,
  basePath,
  eyebrow,
  title,
  emptyTitle,
  emptyBody,
  ctaLabel,
  currentPage,
  postsPerPage = 10,
}: PostArchiveProps) {
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage))
  const validPage = Math.min(currentPage, totalPages)
  const startIndex = (validPage - 1) * postsPerPage
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage)
  const featuredPost = paginatedPosts[0]
  const secondaryPosts = paginatedPosts.slice(1)

  const pageHref = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`)

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            {eyebrow}
          </p>
          <h1 className="text-4xl lg:text-5xl font-light text-foreground tracking-tight">
            {title}
          </h1>
        </div>

        {paginatedPosts.length === 0 ? (
          <div className="rounded-3xl border border-border/60 bg-muted/30 p-10 lg:p-14">
            <h2 className="text-2xl font-medium text-foreground">{emptyTitle}</h2>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">{emptyBody}</p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 lg:gap-12">
              {featuredPost && (
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
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
                      <p className="text-sm text-muted-foreground">
                        {featuredPost.date}
                      </p>
                      <h2 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight group-hover:text-foreground/80 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground/70 pt-2">
                        {ctaLabel}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {secondaryPosts.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pt-8 border-t border-border/50">
                  {secondaryPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
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
                          <p className="text-sm text-muted-foreground">{post.date}</p>
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

            {totalPages > 1 && (
              <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
                {validPage > 1 ? (
                  <Link
                    href={pageHref(validPage - 1)}
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

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={pageHref(page)}
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

                {validPage < totalPages ? (
                  <Link
                    href={pageHref(validPage + 1)}
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
          </>
        )}
      </div>
    </section>
  )
}
