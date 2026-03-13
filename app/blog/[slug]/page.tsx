import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAllSlugs, getPostBySlug } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

type Heading = {
  text: string
  slug: string
  level: number
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = []
  // Normalize line endings and split
  const lines = content.replace(/\r\n/g, "\n").split("\n")

  for (const line of lines) {
    const trimmedLine = line.trim()
    // Only match H2 headings (##)
    const match = trimmedLine.match(/^(##)\s+(.+)$/)
    if (match) {
      const text = match[2].trim()
      const slug = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      headings.push({ text, slug, level: 2 })
    }
  }

  return headings
}

function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const headings = extractHeadings(post.content)
  const backHref = post.category === "Cases" ? "/cases" : "/blog"
  const backLabel = post.category === "Cases" ? "Back to cases" : "Back to blog"

  return (
    <main>
      <article className="py-12 lg:py-16">
        <div className="px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href={backHref}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backLabel}
              </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
              {/* Table of Contents - Left sidebar */}
              <aside className="hidden lg:block">
                <TableOfContents headings={headings} />
              </aside>

              {/* Main content - Right side */}
              <div>
                <header className="mb-8">
                  <p className="text-sm text-muted-foreground">
                    {post.category} &middot; {post.date} &middot; {post.author}
                  </p>
                  <h1 className="mt-2 text-4xl font-light text-foreground">
                    {post.title}
                  </h1>
                </header>

                {post.image && (
                  <div className="mb-8 overflow-hidden rounded-lg border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="w-full h-auto max-h-[600px] object-cover"
                      priority
                    />
                  </div>
                )}

                <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-primary prose-blockquote:text-foreground/70 prose-li:text-foreground/80 prose-th:text-foreground prose-td:text-foreground/80">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => {
                        const text = String(children)
                        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                        return <h1 id={slug} className="scroll-mt-24">{children}</h1>
                      },
                      h2: ({ children }) => {
                        const text = String(children)
                        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                        return <h2 id={slug} className="scroll-mt-24">{children}</h2>
                      },
                      h3: ({ children }) => {
                        const text = String(children)
                        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                        return <h3 id={slug} className="scroll-mt-24">{children}</h3>
                      },
                      a: ({ href, children }) => (
                        <a href={href} className="text-primary hover:underline">{children}</a>
                      ),
                      img: ({ src, alt }) => (
                        <Image
                          src={typeof src === "string" ? src : ""}
                          alt={alt || ""}
                          width={800}
                          height={450}
                          className="rounded-lg my-6"
                        />
                      ),
                      pre: ({ children }) => (
                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">{children}</pre>
                      ),
                      code: ({ className, children }) => {
                        const isInline = !className
                        if (isInline) {
                          return <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{children}</code>
                        }
                        return <code className={className}>{children}</code>
                      },
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                          <table className="min-w-full border-collapse">{children}</table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="border border-border px-4 py-2 bg-muted text-left font-semibold">{children}</th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-border px-4 py-2">{children}</td>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
