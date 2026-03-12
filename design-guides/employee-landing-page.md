# Employee Landing Page Design Guide

This document defines the design patterns for OptiPeople employee landing pages — dedicated pages that present the full team in a structured, searchable, trust-building format.

Inherits the [design philosophy](homepage.md#design-philosophy) from the homepage guide.

---

## Page Archetype: People Directory

**Purpose:** Help visitors understand who is behind OptiPeople, what each person does, and how expertise is distributed across the company.

**Tone:** Human, competent, and calm. This page should feel more editorial than sales-driven. Real people, real roles, clear structure.

**Difference from the About page:**
- About page = company story and positioning
- Employee landing page = complete team overview with filterable/findable people

---

## URL Structure

Recommended canonical route:

```
/resources/people
```

Optional alias route (redirect to canonical):

```
/people
```

Use one canonical URL for SEO consistency.

---

## Section Flow

| # | Section | Purpose | Visitor Thinking |
|---|---------|---------|-----------------|
| 1 | Hero | Frame the team and company culture | "Who are the people behind this?" |
| 2 | Team Snapshot | Show scale and composition quickly | "How large and cross-functional is the team?" |
| 3 | Filter + Search Bar | Enable fast discovery by role/team/location | "Can I find the right person quickly?" |
| 4 | Employee Directory Grid | Display all employees clearly | "I can browse everyone without friction" |
| 5 | Hiring / Culture Note (optional) | Add human context and momentum | "This is a place with a clear culture" |

4–5 sections is the target. Hero, filter/search, and directory grid are mandatory.

**No in-page CTA section.** The root layout (`layout.tsx`) already renders a global `CallToAction` component between every page and the footer.

---

## Layout Foundation

### Container

- Primary content: `max-w-6xl`
- Text-focused blocks: `max-w-4xl`
- Horizontal padding: `px-6 lg:px-8`
- Centering: `mx-auto`

### Section Spacing

| Tier | Classes | Used For |
|------|---------|----------|
| Hero | `pt-16 sm:pt-24 pb-16 lg:pb-24` | Top section only |
| Standard | `py-16 lg:py-24` | Most sections |
| Dense | `py-12 lg:py-16` | Filter/search controls |

### Section Backgrounds

- Default: `bg-background`
- Muted grouping: `bg-muted/30` for snapshot or culture section

**Rule:** Avoid multiple tinted sections in a row. Keep the final section white before the global CTA.

---

## Typography

### Hero

```
Eyebrow:  text-sm font-medium tracking-wide text-muted-foreground uppercase
Title:    text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight
Subtitle: text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl
```

### Section Headings

```
Primary:   text-3xl lg:text-4xl font-light tracking-tight
Secondary: text-2xl font-light
```

### Body Text

```
Primary:   text-lg text-muted-foreground leading-relaxed
Secondary: text-base text-foreground/70
Small:     text-sm text-muted-foreground
```

---

## Section Patterns

### 1. Hero

Simple, left-aligned introduction.

```tsx
<section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
  <div className="mx-auto max-w-4xl">
    <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
      People
    </p>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
      Meet the team behind OptiPeople
    </h1>
    <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
      Engineers, consultants, and operations specialists working with industrial teams to improve performance every day.
    </p>
  </div>
</section>
```

**Guidelines:**
- No hero buttons needed
- Keep copy tight: 1 headline + 1 short paragraph
- This page is discovery-focused, not conversion-focused

### 2. Team Snapshot

A compact metrics row to give immediate context.

```tsx
<section className="py-12 lg:py-16 px-6 lg:px-8 bg-muted/30">
  <div className="mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
    {stats.map(stat => (
      <div key={stat.label}>
        <p className="text-4xl lg:text-5xl font-extralight text-primary tracking-tight">
          {stat.value}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
      </div>
    ))}
  </div>
</section>
```

**Suggested stats:**
- Total employees
- Departments represented
- Countries/locations
- Average tenure (if available)

Use real data only. If data is uncertain, remove the stat.

### 3. Filter + Search Bar

Sticky, lightweight controls for fast navigation on larger teams.

```tsx
<section className="py-12 lg:py-16 px-6 lg:px-8 border-y border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-16 z-20">
  <div className="mx-auto max-w-6xl grid gap-4 lg:grid-cols-[1fr_auto_auto]">
    <input
      type="search"
      placeholder="Search by name, role, or expertise"
      className="h-11 rounded-xl border border-border bg-background px-4 text-sm"
    />
    <select className="h-11 rounded-xl border border-border bg-background px-3 text-sm">
      <option>All teams</option>
    </select>
    <select className="h-11 rounded-xl border border-border bg-background px-3 text-sm">
      <option>All locations</option>
    </select>
  </div>
</section>
```

**Guidelines:**
- Sticky behavior is optional for small directories, recommended for 20+ profiles
- Keep controls minimal and obvious
- Ensure keyboard accessibility and visible focus states

### 4. Employee Directory Grid

Primary content block. Cards should be clean, consistent, and easy to scan.

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-6xl">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
      {employees.map(person => (
        <article key={person.slug} className="group">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-4">
            <Image
              src={person.photo}
              alt={person.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h2 className="text-base font-medium">{person.name}</h2>
          <p className="text-sm text-muted-foreground">{person.role}</p>
          <p className="mt-1 text-sm text-muted-foreground">{person.team}</p>
        </article>
      ))}
    </div>
  </div>
</section>
```

**Guidelines:**
- Portrait ratio: `aspect-[3/4]`
- Radius: `rounded-2xl`
- Names are the primary metadata; role/team are supporting
- Avoid heavy card borders/shadows; the photos and whitespace should carry the layout
- Support empty states for filters (`No matches found` + clear filters action)

### 5. Culture / Hiring Note (Optional)

Use if you want to combine directory utility with brand personality.

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
  <div className="mx-auto max-w-4xl text-center">
    <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
      Built by people who care about the real factory floor
    </h2>
    <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
      We combine industrial experience with product engineering to help manufacturers improve daily operations.
    </p>
  </div>
</section>
```

---

## Data Model Recommendations

Use a typed data source (local JSON/TS or CMS) with a stable schema:

```ts
type Employee = {
  slug: string
  name: string
  role: string
  team: string
  location?: string
  expertise?: string[]
  photo: string
  email?: string
  linkedin?: string
  startYear?: number
}
```

**Rules:**
- `slug`, `name`, `role`, `team`, and `photo` are required
- Keep optional fields truly optional to avoid placeholder noise
- Prefer a single source of truth consumed by both page and filters

---

## Interaction Guidelines

- Card click can lead to optional detail pages (`/people/[slug]`) if bios are needed
- Card click can lead to optional detail pages (`/resources/people/[slug]`) if bios are needed
- If there is no detail page yet, cards remain static (no fake links)
- Search should match `name`, `role`, `team`, and `expertise`
- Filters should be additive and reversible
- Provide a visible reset action when any filter is active

---

## Accessibility

- Every employee photo needs descriptive `alt` text (`"Name, Role at OptiPeople"`)
- Search/filter controls must be keyboard operable
- Maintain WCAG-compliant contrast for muted text
- Keep heading order semantic (`h1` once, then `h2`/`h3`)

---

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Hero | Left-aligned, `text-4xl` | Left-aligned, up to `lg:text-6xl` |
| Filter controls | Stacked | Inline 3-column row |
| Directory grid | 1 column (or 2 on larger phones) | `sm:2`, `lg:3`, `xl:4` columns |
| Card metadata | Tight spacing | Same rhythm, more columns |

---

## Visual Rhythm

```
Hero               → white
Team Snapshot      → bg-muted/30
Filter + Search    → white
Directory Grid     → white
Culture (optional) → bg-muted/30
─── layout.tsx CTA ───
─── footer ───
```

If the optional culture section is included, ensure the section above or below it is white.

---

## Checklist

- [ ] Hero is left-aligned with no hero buttons
- [ ] Filter/search controls are accessible and keyboard friendly
- [ ] Employee photos use `aspect-[3/4]` and `rounded-2xl`
- [ ] Names, roles, and teams are consistently formatted
- [ ] Empty-filter state exists and is clear
- [ ] Section backgrounds follow the white/muted rhythm
- [ ] No duplicate CTA section (global layout CTA is sufficient)

---

## File Reference

| File | Purpose |
|------|---------|
| [app/resources/people/page.tsx](app/resources/people/page.tsx) | Employee landing page implementation |
| [design-guides/about-page.md](design-guides/about-page.md) | Shared people/team visual patterns |
| [design-guides/homepage.md](design-guides/homepage.md) | Parent design system and principles |
