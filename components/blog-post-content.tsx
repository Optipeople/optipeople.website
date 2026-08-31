import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { resolveImagePath } from "@/lib/blog-data"

export type Heading = {
  text: string
  slug: string
  level: number
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = []
  const lines = content.replace(/\r\n/g, "\n").split("\n")

  for (const line of lines) {
    const trimmedLine = line.trim()
    // Only match H2 headings (##)
    const match = trimmedLine.match(/^(##)\s+(.+)$/)
    if (match) {
      const text = match[2].trim()
      headings.push({ text, slug: slugify(text), level: 2 })
    }
  }

  return headings
}

export function TableOfContents({
  headings,
  label,
}: {
  headings: Heading[]
  label: string
}) {
  if (headings.length === 0) return null

  return (
    <nav className="sticky top-28">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
        {label}
      </h2>
      <ul className="mt-5 space-y-3 border-l border-black/[0.08] pl-5">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className="block text-sm leading-snug text-foreground/70 transition-colors duration-200 hover:text-foreground"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => {
          const slug = slugify(String(children))
          return (
            <h1 id={slug} className="scroll-mt-24">
              {children}
            </h1>
          )
        },
        h2: ({ children }) => {
          const slug = slugify(String(children))
          return (
            <h2 id={slug} className="scroll-mt-24">
              {children}
            </h2>
          )
        },
        h3: ({ children }) => {
          const slug = slugify(String(children))
          return (
            <h3 id={slug} className="scroll-mt-24">
              {children}
            </h3>
          )
        },
        a: ({ href, children }) => (
          <a href={href} className="text-primary hover:underline">
            {children}
          </a>
        ),
        img: ({ src, alt }) => {
          const resolvedSrc = resolveImagePath(src)

          if (!resolvedSrc) {
            return null
          }

          return (
            <Image
              src={resolvedSrc}
              alt={alt || ""}
              width={800}
              height={450}
              className="my-8 rounded-xl ring-1 ring-black/[0.08]"
            />
          )
        },
        pre: ({ children }) => (
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
            {children}
          </pre>
        ),
        code: ({ className, children }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                {children}
              </code>
            )
          }
          return <code className={className}>{children}</code>
        },
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border px-4 py-2 bg-muted text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-4 py-2">{children}</td>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-6">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
