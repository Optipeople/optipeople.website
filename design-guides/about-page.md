# About Page Design Guide

This document defines the design patterns for the OptiPeople about page — the page that tells visitors who the company is, what it stands for, and why it exists.

Inherits the [design philosophy](homepage.md#design-philosophy) from the homepage guide.

---

## Page Archetype: Company Story

**Purpose:** Build trust and credibility. Answer "Who are these people?" for visitors who are evaluating whether to work with OptiPeople.

**Tone:** Honest, grounded, human. Less salesy than the homepage — more substance, less pitch. The Scandinavian approach: let quality speak, don't oversell.

---

## Design Principles (About-Specific)

- **People over product.** This is the one page where humans come first. Team photos, founder perspective, company values.
- **Earned confidence.** Show expertise through track record, not adjectives. Numbers, years, industries — not "world-class" or "cutting-edge."
- **Readable, not scannable.** Unlike landing pages, visitors here are willing to read. Longer text blocks are fine when the content earns it.
- **No hard sell.** The CTA at the bottom is soft — "Let's talk" not "Request a demo." The global `CallToAction` from `layout.tsx` handles conversion.

---

## Section Flow

| # | Section | Purpose | Visitor Thinking |
|---|---------|---------|-----------------|
| 1 | Hero | Introduce the company | "Who is OptiPeople?" |
| 2 | Mission / What We Do | Position the expertise | "What do they actually do?" |
| 3 | Values or Approach | Show how they think | "How do they work?" |
| 4 | Team | Put faces to the name | "Who will I work with?" |
| 5 | Track Record | Prove credibility | "Can they deliver?" |

5 sections is the target. Can drop to 4 (skip values) or extend to 6 (add a timeline/history) depending on content availability.

---

## Layout

### Container

- Primary content: `max-w-4xl` — reading-focused, same as blog posts
- Wider sections (team grid, metrics): `max-w-5xl`
- Padding: `px-6 lg:px-8`

### Section Spacing

```
Hero:     pt-16 sm:pt-24 pb-16 lg:pb-24
Sections: py-16 lg:py-24
```

Consistent with the module landing page rhythm. Not as dramatic as the homepage — this is a content page, not a conversion page.

---

## Section Patterns

### 1. Hero

Left-aligned. Text-only. No image, no visual — confidence through restraint.

```tsx
<section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
  <div className="mx-auto max-w-4xl">
    <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
      About
    </p>
    <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
      We make industrial operations work
    </h1>
    <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
      OptiPeople is a digital operations company. We build software, connect systems,
      and help industrial teams turn data into better decisions.
    </p>
  </div>
</section>
```

**Guidelines:**
- Left-aligned (not centered) — editorial feel, different from landing pages
- Eyebrow: `uppercase tracking-wide text-muted-foreground` — simple page identifier
- Title: `text-4xl sm:text-5xl font-light tracking-tight` — standard heading scale
- Description: 1–2 sentences, `text-lg text-muted-foreground`, `max-w-3xl` for comfortable line length
- No buttons in the hero — this isn't a conversion section

### 2. Mission / What We Do

Explain the company's area of expertise. Can use centered text or a two-column layout.

**Centered text block:**

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
      Built for the space between shopfloor and ERP
    </h2>
    <p className="text-lg text-muted-foreground leading-relaxed">
      {longerDescription}
    </p>
  </div>
</section>
```

**Two-column with image:**

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    <div>
      <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
        {headline}
      </h2>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
      <Image src={...} alt={...} fill className="object-cover" />
    </div>
  </div>
</section>
```

### 3. Values / Approach

Show the principles behind the work. Use a simple list or a minimal grid — no heavy card components.

**Value list (preferred — Scandinavian minimal):**

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-4xl">
    <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-16">
      How we work
    </h2>
    <div className="space-y-12">
      {values.map(value => (
        <div key={value.title} className="grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
          <h3 className="text-lg font-medium">{value.title}</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {value.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Guidelines:**
- Title-description pairs in a simple definition-list style layout
- `sm:grid-cols-[200px_1fr]` — title on left, description on right (stacked on mobile)
- `space-y-12` between items — generous, lets each value breathe
- No icons, no cards, no colored backgrounds — the content is the design
- 3–5 values. More than 5 means they're not actually core values.

### 4. Team

People with faces. Grid of team members.

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
  <div className="mx-auto max-w-5xl">
    <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-16">
      The team
    </h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {team.map(person => (
        <div key={person.name}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-4">
            <Image src={person.photo} alt={person.name} fill className="object-cover" />
          </div>
          <h3 className="text-base font-medium">{person.name}</h3>
          <p className="text-sm text-muted-foreground">{person.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Guidelines:**
- Portrait photos: `aspect-[3/4]`, `rounded-2xl`
- Grid: `sm:grid-cols-2 lg:grid-cols-3` — adapts gracefully
- Name: `text-base font-medium` — no larger than that
- Role: `text-sm text-muted-foreground`
- No hover effects on team photos — these are people, not products
- No social links or bios in the grid — keep it clean. Add a detail page later if needed.
- `bg-muted/30` background groups the team visually

### 5. Track Record

Hard numbers that prove credibility. Same pattern as the metrics row in the [module landing page guide](module-landing-page.md).

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-4xl">
    <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 text-center">
      {stats.map(stat => (
        <div key={stat.label}>
          <p className="text-5xl lg:text-6xl font-extralight text-primary tracking-tight">
            {stat.metric}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Guidelines:**
- 3 metrics: years in business, customers served, installations running — whatever is real and impressive
- Large numbers in `text-primary` with `font-extralight`
- No heading for this section — the numbers speak for themselves
- Can be positioned before or after the team section depending on content flow

---

## Visual Rhythm

```
Hero             → white (left-aligned)
Mission          → bg-muted/30  or  white
Values           → white
Team             → bg-muted/30
Track Record     → white
─── layout.tsx CTA ───
─── footer ───
```

---

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Hero | Left-aligned, `text-4xl` | Left-aligned, `sm:text-5xl` |
| Values grid | Stacked | `sm:grid-cols-[200px_1fr]` |
| Team grid | 1 column | `sm:grid-cols-2 lg:grid-cols-3` |
| Metrics | 1 column | `sm:grid-cols-3` |

---

## Checklist

- [ ] Hero is left-aligned, not centered
- [ ] No CTA buttons in the hero
- [ ] All headings use `font-light`
- [ ] Team photos use portrait aspect ratio (`3/4`), `rounded-2xl`
- [ ] Metrics use `text-primary font-extralight`
- [ ] No heavy decoration — no cards, no icons, no gradients
- [ ] Section backgrounds alternate correctly
- [ ] Content reads well at `max-w-4xl` line length
- [ ] The global `CallToAction` from layout.tsx handles the conversion — no duplicate CTA

---

## File Reference

| File | Purpose |
|------|---------|
| [app/about/page.tsx](app/about/page.tsx) | About page (currently a stub) |
| [design-guides/homepage.md](design-guides/homepage.md) | Homepage guide (parent design system) |
| [design-guides/module-landing-page.md](design-guides/module-landing-page.md) | Module landing page guide (shared patterns) |
