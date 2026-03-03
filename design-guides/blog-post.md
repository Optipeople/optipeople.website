# Blog Post Design Guide

This document defines the design patterns for individual OptiPeople blog post pages — the detail view for case studies, articles, and stories.

Inherits the [design philosophy](homepage.md#design-philosophy) from the homepage guide.

---

## Page Archetype: Long-Form Content

**Purpose:** Let the reader focus on the content. The page frame disappears — typography, spacing, and a quiet sidebar carry the experience.

**Tone:** Editorial, readable, unhurried. Like a well-set book page with a clean margin.

---

## Layout

### Two-Column Grid

The post uses a sidebar + main content layout on desktop:

```
lg:grid-cols-[200px_1fr]  gap-12
```

| Column | Content | Behavior |
|--------|---------|----------|
| Left (200px) | Table of Contents | `sticky top-24`, hidden on mobile |
| Right (1fr) | Post content | Full article flow |

On mobile, the layout collapses to single column — the table of contents is hidden entirely (`hidden lg:block`).

### Container

- Width: `max-w-6xl` — accommodates the sidebar + wide content area
- Padding: `px-6 lg:px-8`
- Section padding: `py-12 lg:py-16` — lighter than landing pages, appropriate for reading

---

## Structure

| Zone | Purpose |
|------|---------|
| Back link | Navigation back to blog listing |
| Table of Contents | Sticky sidebar with H2 anchor links |
| Post header | Date, author, title |
| Hero image | Full-width post image |
| Content body | Markdown-rendered article content |

### Back Link

```tsx
<Button asChild variant="ghost" size="sm" className="mb-8">
  <Link href="/blog">
    <ArrowLeft className="mr-2 h-4 w-4" />
    Back to blog
  </Link>
</Button>
```

**Guidelines:**
- `variant="ghost"` — minimal, doesn't compete with content
- Positioned above the grid, before the two-column layout begins
- `mb-8` separates it from the article

### Table of Contents

```tsx
<nav className="sticky top-24">
  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
    Table of Contents
  </h2>
  <ul className="space-y-2">
    {headings.map(heading => (
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
```

**Guidelines:**
- Only H2 headings are extracted — keeps the TOC concise
- `sticky top-24` — sticks below the header (header is ~h-16 + accent stripes + buffer)
- Hidden on mobile (`hidden lg:block` on the `<aside>`)
- Heading slugs are auto-generated: lowercase, non-alphanumeric replaced with hyphens
- Links use `text-muted-foreground hover:text-foreground` — quiet until hovered

### Post Header

```tsx
<header className="mb-8">
  <p className="text-sm text-muted-foreground">
    {post.date} &middot; {post.author}
  </p>
  <h1 className="mt-2 text-4xl font-light text-foreground">
    {post.title}
  </h1>
</header>
```

**Guidelines:**
- Meta line first: date + author, separated by middot, `text-sm text-muted-foreground`
- Title: `text-4xl font-light` — consistent with the site's heading style
- No eyebrow label (unlike landing pages) — the back link provides context
- `mb-8` before the hero image

### Hero Image

```tsx
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
```

**Guidelines:**
- `rounded-lg` — slightly smaller radius than landing page visuals, fits the editorial context
- Standard card shadow and border
- `max-h-[600px]` prevents overly tall images from dominating
- `priority` loading — this is above the fold
- Image is optional — not all posts need a hero image

---

## Content Body (Prose)

The article content is rendered from Markdown using `react-markdown` with `remark-gfm`. The prose styling uses Tailwind's typography plugin with custom overrides:

```tsx
<div className="prose prose-lg max-w-none
  prose-headings:text-foreground
  prose-p:text-foreground/80
  prose-strong:text-foreground
  prose-a:text-primary
  prose-code:text-foreground
  prose-pre:bg-muted
  prose-blockquote:border-primary
  prose-blockquote:text-foreground/70
  prose-li:text-foreground/80
  prose-th:text-foreground
  prose-td:text-foreground/80">
```

### Typography Within Prose

| Element | Style | Notes |
|---------|-------|-------|
| Body text | `prose-lg`, `text-foreground/80` | Slightly muted for comfortable reading |
| Headings | `text-foreground` | Full contrast, auto-generated IDs for TOC linking |
| Links | `text-primary hover:underline` | Brand color, underline on hover |
| Strong | `text-foreground` | Full contrast to stand out from /80 body |
| Blockquotes | `border-l-4 border-primary`, `text-foreground/70` | Primary-colored left border, italic |
| Code (inline) | `bg-muted px-1.5 py-0.5 rounded text-sm` | Subtle background pill |
| Code (block) | `bg-muted rounded-lg p-4 text-sm overflow-x-auto` | Contained code block |
| Tables | Full-width, `border-collapse`, `border border-border` | Header row gets `bg-muted` |
| Lists | `text-foreground/80` | Same opacity as body text |
| Images | `rounded-lg my-6`, 800×450 | Inline images within the content |

### Heading Anchors

All headings (H1–H3) get auto-generated `id` attributes and `scroll-mt-24` to account for the sticky header when navigating via anchor links:

```tsx
h2: ({ children }) => {
  const text = String(children)
  const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  return <h2 id={slug} className="scroll-mt-24">{children}</h2>
}
```

---

## Content Authoring Rules

When writing blog posts in Markdown:

- **H1** — Never use in post content. The post title is already an H1.
- **H2** — Main sections. These appear in the table of contents.
- **H3** — Subsections within an H2 block.
- **Images** — Use absolute paths from `/public`: `/images/blog/filename.jpg`
- **Tables** — Use standard GFM table syntax. They scroll horizontally on mobile.
- **Code blocks** — Use fenced code blocks with language identifiers for syntax highlighting.

---

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Layout | Single column | 200px sidebar + content |
| Table of Contents | Hidden | Sticky sidebar |
| Title | `text-4xl` | `text-4xl` (same — reading context) |
| Hero image | Full width | Full width within content column |
| Prose | `prose-lg` | `prose-lg` (same) |

---

## Page Skeleton

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)

  return (
    <main>
      <article className="py-12 lg:py-16">
        <div className="px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Back link */}
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to blog
              </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
              {/* Table of Contents */}
              <aside className="hidden lg:block">
                <TableOfContents headings={headings} />
              </aside>

              {/* Article content */}
              <div>
                <header className="mb-8">
                  <p className="text-sm text-muted-foreground">
                    {post.date} &middot; {post.author}
                  </p>
                  <h1 className="mt-2 text-4xl font-light text-foreground">
                    {post.title}
                  </h1>
                </header>

                {/* Hero image (optional) */}
                {post.image && (
                  <div className="mb-8 overflow-hidden rounded-lg border border-[var(--gray-2)] shadow-[...]">
                    <Image ... />
                  </div>
                )}

                {/* Markdown content */}
                <div className="prose prose-lg max-w-none ...">
                  <ReactMarkdown ...>{post.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
```

---

## Checklist

- [ ] Back link present and navigates to `/blog`
- [ ] Table of contents extracts H2 headings only
- [ ] TOC is sticky on desktop, hidden on mobile
- [ ] All headings have `id` attributes and `scroll-mt-24`
- [ ] Hero image has `priority` loading
- [ ] Prose overrides use semantic color tokens (not hardcoded colors)
- [ ] Inline code, block code, tables, blockquotes all styled
- [ ] Images within content use `rounded-lg` and proper dimensions
- [ ] No H1 used within the markdown content itself

---

## File Reference

| File | Purpose |
|------|---------|
| [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx) | Blog post page |
| [lib/blog-data.ts](lib/blog-data.ts) | Post fetching, slug generation |
| [design-guides/blog-listing.md](design-guides/blog-listing.md) | Blog listing page design guide |
| [design-guides/homepage.md](design-guides/homepage.md) | Homepage guide (parent design system) |
