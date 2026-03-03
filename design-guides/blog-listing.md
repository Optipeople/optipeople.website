# Blog Listing Page Design Guide

This document defines the design patterns for the OptiPeople blog listing page — the index page where visitors browse all published posts.

Inherits the [design philosophy](homepage.md#design-philosophy) from the homepage guide.

---

## Page Archetype: Content Index

**Purpose:** Let visitors scan and find relevant case studies, articles, and stories quickly. The page is a browsing surface — minimal friction, maximum scannability.

**Tone:** Clean editorial. The content (images and titles) does the talking. The page frame stays invisible.

---

## Layout

### Container

- Width: `max-w-6xl` — wider than content pages to accommodate the grid
- Padding: `px-6 lg:px-8`
- Centering: `mx-auto`

### Section Spacing

The blog listing is a single section with generous top padding:

```
py-24 lg:py-32
```

This creates breathing room below the header and positions the content as the primary focus.

---

## Structure

The page has three distinct zones:

| Zone | Purpose |
|------|---------|
| Header | Eyebrow label + page title |
| Featured Post | First post, displayed prominently |
| Post Grid | Remaining posts in a multi-column grid |
| Pagination | Page navigation (only when > 10 posts) |

### Header

```tsx
<div className="mb-16">
  <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
    Cases
  </p>
  <h1 className="text-4xl lg:text-5xl font-light text-foreground tracking-tight">
    Stories from the field
  </h1>
</div>
```

**Guidelines:**
- Eyebrow: `text-sm font-medium tracking-wide uppercase text-muted-foreground` — categorizes the page
- Title: `text-4xl lg:text-5xl font-light tracking-tight` — consistent with homepage section headings
- `mb-16` separates header from content grid
- No description paragraph — the title is self-explanatory, keep it minimal

### Featured Post

The first post on each page gets a prominent 2-column layout:

```tsx
<Link href={`/blog/${post.slug}`} className="group block">
  <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
    <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl bg-muted border border-[var(--gray-2)] shadow-[...]">
      <Image ... className="object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="space-y-4">
      <h2 className="text-2xl lg:text-3xl font-medium tracking-tight group-hover:text-foreground/80 transition-colors">
        {post.title}
      </h2>
      <div className="flex items-center gap-2 text-sm font-medium text-foreground/70 pt-2">
        Read case study
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </article>
</Link>
```

**Guidelines:**
- Image on left, text on right (`lg:grid-cols-2`)
- Image aspect: `aspect-[4/3]` mobile, `lg:aspect-[16/10]` desktop
- Image: `rounded-2xl` with standard card shadow and border
- Title uses `font-medium` (exception to the font-light heading rule — post titles need weight for scannability)
- "Read case study" link with arrow that translates on hover — subtle call to action
- Entire card is a link (`group block`) — the hover state is on the group

### Secondary Posts Grid

All posts after the featured one, separated by a subtle divider:

```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pt-8 border-t border-border/50">
  {posts.map(post => (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="space-y-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted border border-[var(--gray-2)] shadow-[...]">
          <Image ... className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium tracking-tight group-hover:text-foreground/80 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
      </article>
    </Link>
  ))}
</div>
```

**Guidelines:**
- Grid: `sm:grid-cols-2 lg:grid-cols-3`
- Separated from featured post by `border-t border-border/50 pt-8`
- Image: `aspect-[4/3]`, `rounded-xl` (slightly smaller radius than featured)
- Title: `text-lg font-medium`, `line-clamp-2` to prevent long titles from breaking layout
- No description text, no date — just image + title. Nordic simplicity.
- Same hover pattern: image scales, title fades

### Image Treatment

All blog post images follow the same pattern:

```
overflow-hidden rounded-{size} bg-muted border border-[var(--gray-2)]
shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]
```

| Context | Radius |
|---------|--------|
| Featured image | `rounded-2xl` |
| Grid image | `rounded-xl` |

Images always have:
- `object-cover` fill
- `transition-transform duration-500 group-hover:scale-105` hover effect
- `bg-muted` fallback background

---

## Pagination

Appears only when total posts exceed the page limit (10 posts per page).

```tsx
<nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
  {/* Previous / Page Numbers / Next */}
</nav>
```

**Guidelines:**
- Centered, `mt-16` from last content
- Previous/Next: `text-sm font-medium text-foreground/70 hover:text-foreground`
- Page numbers: `w-10 h-10 rounded-lg`, active page `bg-foreground text-background`
- Disabled state: `text-foreground/30 cursor-not-allowed`
- Uses `aria-label="Pagination"` for accessibility
- Page 1 links to `/blog` (no query param), subsequent pages to `/blog?page=N`

---

## Data Model

Blog posts are stored as markdown files in `content/blog/` with frontmatter:

```yaml
---
title: "Post Title"
date: "2025-01-15"
author: "Author Name"
category: "Category"
image: "/images/blog/filename.jpg"
---

Post content in markdown...
```

**Fields:**
| Field | Required | Usage |
|-------|----------|-------|
| `title` | Yes | Card title, page title |
| `date` | Yes | Sorting, post meta |
| `author` | Yes | Post meta on detail page |
| `category` | Yes | Filtering (future), eyebrow labels |
| `image` | No | Card image, hero image on post page |

Posts are sorted by date descending (newest first).

---

## Checklist

- [ ] First post renders as featured (2-column) layout
- [ ] Grid uses `sm:grid-cols-2 lg:grid-cols-3`
- [ ] All images have `alt` text, shadow, border, and rounded corners
- [ ] Hover effects work on both image (scale) and title (opacity)
- [ ] Pagination only appears when needed
- [ ] `aria-label` on pagination nav
- [ ] No unnecessary metadata on cards — image + title only

---

## File Reference

| File | Purpose |
|------|---------|
| [app/blog/page.tsx](app/blog/page.tsx) | Blog listing page |
| [lib/blog-data.ts](lib/blog-data.ts) | Post fetching and sorting logic |
| [design-guides/blog-post.md](design-guides/blog-post.md) | Individual blog post design guide |
| [design-guides/homepage.md](design-guides/homepage.md) | Homepage guide (parent design system) |
