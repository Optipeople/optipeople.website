# Module Landing Page Design Guide

This document defines the design patterns for OptiPeople module landing pages — dedicated pages for individual platform modules like Smart Operations, AI Solutions, Maintenance, etc.

---

## Design Philosophy

### Apple-Inspired, Nordic Simplicity

Every module landing page should feel like an Apple product page crossed with Scandinavian furniture design:

- **Remove before you add.** If an element doesn't directly help the visitor understand or convert, it doesn't belong. No decorative filler, no "nice to have" sections.
- **One idea per viewport.** Each scroll-stop should communicate exactly one thing. Don't stack competing messages in the same visual space.
- **Let whitespace do the work.** Generous padding isn't empty — it's directing attention. Sections breathe. Content doesn't crowd.
- **Typography is the design.** Light font weights, large sizes, tight tracking. The type itself creates hierarchy and visual interest — not borders, backgrounds, or decoration.
- **Restrained color.** The page is predominantly white/neutral. Color appears only with purpose: the module's accent color, primary brand for CTAs, and nothing more.
- **Show, don't decorate.** Visuals are product screenshots, real UI, or meaningful diagrams — never stock photos or abstract illustrations.

---

## Page Archetype: Module Landing Page

**Purpose:** Convince a visitor who already knows OptiPeople (or arrived via search) that this specific module solves their problem — and get them to request a demo or explore further.

**Difference from homepage:** The homepage is a broad overview answering "What is OptiPeople?" Module pages go deep on one capability, answering "How does this specific thing work and why should I care?"

---

## Section Flow

The page follows a conversion-focused narrative. Each section builds on the last:

| # | Section | Purpose | Visitor Thinking |
|---|---------|---------|-----------------|
| 1 | Hero | Position the module | "What does this do?" |
| 2 | Problem / Context | Create recognition | "That's exactly my problem" |
| 3 | Capabilities | Show what it does | "This could actually work" |
| 4 | Visual / Product | Make it tangible | "I can see how it works" |
| 5 | Results / Proof | Build confidence | "It works for others like me" |
| 6 | How It Works | Reduce uncertainty | "I understand the process" |

**Not every section is mandatory.** A module page should have 4–6 sections total. Pick what's relevant. The hero is always present; the middle sections flex based on what the module needs to communicate.

**No in-page CTA section.** The root layout (`layout.tsx`) already renders a global `CallToAction` component between every page and the footer. Module pages should **not** duplicate this with their own CTA section.

---

## Layout Foundation

### Container

- Primary content: `max-w-4xl` (narrower than homepage — focused reading)
- Wide sections (grids, visuals): `max-w-5xl` or `max-w-6xl`
- Horizontal padding: `px-6 lg:px-8`
- Centering: `mx-auto`

### Section Spacing

More generous than the homepage to achieve the Apple-style "one idea per viewport" rhythm:

| Tier | Classes | Used For |
|------|---------|----------|
| Hero | `pt-16 sm:pt-24 pb-16 lg:pb-24` | Top section only |
| Standard | `py-16 lg:py-24` | Most content sections |
| Large | `py-20 lg:py-32` | Hero visual, key proof section |
| Divider | `py-12 lg:py-16` | Lighter transitional sections |

### Section Backgrounds

Alternate between white and subtle tinted backgrounds to create visual rhythm without hard borders:

- Default: `bg-background` (white)
- Muted: `bg-muted/30` — subtle gray for feature grids, details
- Accent: `bg-primary/5` — very faint brand tint for CTA or highlight sections
- Dark: `bg-foreground text-background` — inverted, use sparingly (max once per page)

**Rule:** Never place two tinted sections back to back. Always separate with a white section.

---

## Typography

Follows the homepage type system, with these module-specific patterns:

### Hero

The hero always has a background image. Text is white on a dark overlay.

```
Eyebrow:  text-sm font-medium text-white/90
Title:    text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white
Subtitle: text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto
```

The hero title should be **short and benefit-driven** — not a feature description. Think Apple:
- "See Your Factory in Real Time" (benefit)
- NOT "Real-Time Production Monitoring Module" (feature label)

### Section Headings

```
Primary:   text-3xl lg:text-4xl font-light tracking-tight
Secondary: text-2xl font-light
```

Section headings are always `font-light`. Never bold. Centered by default unless the layout is asymmetric (e.g., text-left with image-right).

### Body Text

```
Primary:   text-lg text-muted-foreground leading-relaxed
Secondary: text-base text-foreground/70
Small:     text-sm text-muted-foreground
```

**Copywriting rules:**
- Short paragraphs — 2–3 sentences max
- No jargon unless the audience expects it (they're industrial, some is fine)
- Lead with the outcome, follow with the mechanism
- Active voice, present tense

---

## Section Patterns

### 1. Hero

Centered layout with a full-bleed background image. The default background is `/images/default-hero-bg.png` — use this unless a page-specific image is available.

```tsx
<section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8 bg-primary">
  <Image
    src="/images/default-hero-bg.png"
    alt=""
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-black/70" />
  <div className="relative mx-auto max-w-4xl text-center">
    <p className="text-sm font-medium text-white/90 mb-4">
      {eyebrowLabel}
    </p>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight text-white">
      {benefitDrivenHeadline}
    </h1>
    <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
      {oneToTwoSentenceDescription}
    </p>
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <Button asChild size="lg">
        <Link href="/contact">Request a Demo</Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white shadow-none hover:bg-white/20 hover:text-white">
        <Link href="#capabilities">See How It Works</Link>
      </Button>
    </div>
  </div>
</section>
```

**Guidelines:**
- **Background image is required.** Default: `/images/default-hero-bg.png`. Add `priority` for above-the-fold loading. Use `alt=""` since the image is decorative.
- **Fallback color:** `bg-primary` on the section serves as the background while the image loads and behind any transparent areas. This matches the brand's deep green.
- **Overlay:** `bg-black/70` ensures text readability over busy background images. Use 70% minimum — the image should be felt, not read.
- **Text is white:** `text-white` for the title, `text-white/90` for eyebrow, `text-white/80` for subtitle
- **Outline button on dark:** Override with `bg-white/10 border-white/30 text-white shadow-none hover:bg-white/20 hover:text-white`. The frosted glass effect (`bg-white/10` + `border-white/30`) makes the button clearly visible on dark backgrounds. `shadow-none` removes the default outline shadow.
- Title is the largest text on the page — one line on desktop if possible
- Description fills in context without repeating the title
- Two CTAs: primary (demo/contact) + secondary (scroll or navigate)
- `mt-10` on the button group gives breathing room from the text

### 2. Problem / Context

Optional but powerful. Frame the pain before showing the solution. Can be a simple centered text block or a two-column layout.

**Centered variant:**

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
      {problemFramingHeadline}
    </h2>
    <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
      {descriptionOfTheProblemThisModuleSolves}
    </p>
  </div>
</section>
```

**Two-column variant (text + visual):**

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
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
      <Image src={...} alt={...} fill className="object-cover" />
    </div>
  </div>
</section>
```

### 3. Capabilities / Features

The core of the page. Show what the module does.

**Card grid (primary pattern):**

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
  <div className="mx-auto max-w-5xl">
    <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
      {sectionHeading}
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map(feature => (
        <div key={feature.title} className="space-y-3">
          <div className="p-2.5 rounded-xl bg-primary/10 w-fit">
            <feature.icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-medium">{feature.title}</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Guidelines:**
- 2 columns for 4 features, 3 columns for 5–6 features
- Icons from lucide-react, wrapped in `bg-primary/10 rounded-xl`
- No card borders or shadows on feature items — the background section provides containment
- If features need more depth, use the alternating rows pattern instead (see below)

**Alternating rows (deep-dive pattern):**

For modules where each capability needs a visual or longer explanation, alternate image-left/text-right and text-left/image-right:

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-5xl space-y-20 lg:space-y-32">
    {features.map((feature, i) => (
      <div
        key={feature.title}
        className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
          i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <h3 className="text-2xl lg:text-3xl font-light tracking-tight">
            {feature.title}
          </h3>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted/30">
          <Image src={...} alt={...} fill className="object-cover" />
        </div>
      </div>
    ))}
  </div>
</section>
```

**Guidelines:**
- `space-y-20 lg:space-y-32` between rows — Apple-level breathing room
- Alternate layout direction with `order-2` on odd items
- Images are always `rounded-2xl`, `aspect-[4/3]` or `aspect-[3/2]`
- This pattern works best for 3–4 features. More than that gets repetitive.

### 4. Visual / Product Section

A full-width (or near-full-width) product screenshot or interactive demo. This is the "show me" moment.

```tsx
<section className="py-20 lg:py-32 px-6 lg:px-8">
  <div className="mx-auto max-w-6xl">
    <div className="text-center mb-12 lg:mb-16">
      <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
        {headline}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
    <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
      <Image src={...} alt={...} fill className="object-cover" />
    </div>
  </div>
</section>
```

**Guidelines:**
- Use `max-w-6xl` — this should feel expansive compared to the text sections
- `rounded-4xl` with the standard card shadow matches homepage carousel cards
- `aspect-[16/9]` for dashboard screenshots, `aspect-[4/3]` for other UI
- If no real screenshot exists yet, use a `bg-muted/30` placeholder — never stock photos

### 5. Results / Proof

Hard numbers or customer validation. Two patterns:

**Metrics row:**

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-4xl">
    <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
      Typical Results
    </h2>
    <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 text-center">
      {metrics.map(item => (
        <div key={item.label}>
          <p className="text-5xl lg:text-6xl font-extralight text-primary tracking-tight">
            {item.metric}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Guidelines:**
- Metrics are large — `text-5xl lg:text-6xl font-extralight` in `text-primary`
- 3 metrics is ideal. 4 max (switch to `sm:grid-cols-2 lg:grid-cols-4`)
- Labels are short — one line, `text-sm`
- Apple-style: let the numbers be the visual. No icons, no cards, no decoration.

**Testimonial (single quote):**

For a focused customer quote instead of or alongside metrics:

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
  <div className="mx-auto max-w-3xl text-center">
    <blockquote className="text-xl lg:text-2xl font-light leading-relaxed text-foreground/80">
      "{quoteText}"
    </blockquote>
    <div className="mt-8">
      <p className="text-sm font-medium">{authorName}</p>
      <p className="text-sm text-muted-foreground">{authorTitle}, {company}</p>
    </div>
  </div>
</section>
```

### 6. How It Works

Reduce friction by showing the process is simple. Three steps is ideal.

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-4xl">
    <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
      How It Works
    </h2>
    <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
      {steps.map((step, i) => (
        <div key={step.title} className="text-center">
          <div className="text-4xl font-extralight text-primary mb-4">
            {String(i + 1).padStart(2, '0')}
          </div>
          <h3 className="text-lg font-medium mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Guidelines:**
- Step numbers displayed as `01`, `02`, `03` — large, light, in primary color
- Keep descriptions to 1–2 sentences
- 3 steps is the sweet spot. If you need more, the process is too complex for a landing page.

### CTA — Handled by Layout

The root layout (`layout.tsx`) renders a global `CallToAction` component on every page, directly above the footer. **Do not add an in-page CTA section to module landing pages.** This avoids duplication and keeps conversion messaging consistent site-wide.

If module-specific CTA copy is needed, customize it via props on the layout's `CallToAction` component rather than adding a separate section.

---

## Visual Rhythm

The alternation of section backgrounds creates a scroll rhythm. Here's the recommended pattern:

```
Hero            → background image + dark overlay (white text)
Problem         → white
Capabilities    → bg-muted/30 (gray)
Product Visual  → white
Results         → white  (or bg-muted/30 if no product visual above)
How It Works    → white
─── layout.tsx CallToAction ───
─── footer ───
```

**Rules:**
- **The last section on the page must always have a white background.** The global `CallToAction` from layout.tsx uses a tinted background — placing `bg-muted/30` directly above it creates two grey sections back-to-back, which looks off.
- Maximum one dark (`bg-foreground`) section per page, and only if it adds real value
- `bg-muted/30` sections contain multiple items (grids, cards) — they group content visually
- White sections are for focused content (hero, big visuals, single quotes)
- The global `CallToAction` from layout.tsx handles conversion — no in-page CTA section needed

---

## Images & Visuals

### Product Screenshots

- Always inside `rounded-2xl` or `rounded-4xl` containers with `overflow-hidden`
- Apply the standard shadow: `shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]`
- Border: `border border-[var(--gray-2)]`
- Use real product UI whenever possible. Placeholder if not available: `bg-muted/30`

### Aspect Ratios

| Content | Ratio | Usage |
|---------|-------|-------|
| Dashboard / full UI | `aspect-[16/9]` | Hero visual, product section |
| Feature detail | `aspect-[4/3]` | Alternating row images |
| Wide banner | `aspect-[2/1]` | Optional hero background |

### Hover Effects

- Images inside links: `group-hover:scale-105 transition-transform duration-500`
- Always wrap in `overflow-hidden` to contain the scale
- Static images (not clickable): no hover effect

---

## Icons

- Source: `lucide-react` — consistent with the existing codebase
- Size: `h-5 w-5` inside feature cards
- Container: `p-2.5 rounded-xl bg-primary/10 w-fit`
- Color: `text-primary`
- Only used in feature grids and process steps. Do not scatter icons decoratively.

---

## Buttons

| Position | Variant | Size | Pattern |
|----------|---------|------|---------|
| Hero primary | `default` | `lg` | "Request a Demo" |
| Hero secondary | `outline` | `lg` | "See How It Works" |
| In-page CTA | `default` | `lg` | Label + `<ArrowRight />` |
| Section link | `ghost` or `link` | `default` | "Learn more" + `<ArrowRight />` |

**Rules:**
- Maximum 2 buttons side-by-side, ever
- Primary CTA label is always action-oriented: "Request a Demo", "Talk to Us", "Get Started"
- Secondary is navigational: "See How It Works", "View Case Studies"
- `ArrowRight` icon only on the final CTA and inline text links

---

## Module-Specific Color

Each module has a designated color (defined in `globals.css`). Use it sparingly:

- **Where to use:** Hero eyebrow icon background, metric numbers, optional accent on the product visual section
- **Where NOT to use:** Do not recolor buttons, headings, or body text. The primary brand color (`--green-dark3`) handles all of that.

The module color adds a subtle identity without creating visual inconsistency across pages.

---

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Hero title | `text-4xl` | `sm:text-5xl lg:text-6xl` |
| Section heading | `text-3xl` | `lg:text-4xl` |
| Feature grid | 1 column | `md:grid-cols-2` or `lg:grid-cols-3` |
| Alternating rows | Stacked (image below text) | `lg:grid-cols-2` side-by-side |
| Metrics | 1 column | `sm:grid-cols-3` |
| Buttons | `flex-col` (stacked) | `sm:flex-row` (side-by-side) |
| Product visual | Full width, smaller radius | Full width in `max-w-6xl` |

**Mobile-first approach:** Base styles are mobile. Layer desktop overrides with `sm:`, `md:`, `lg:` prefixes.

---

## Page Skeleton

Complete template for a new module landing page:

```tsx
// app/modules/[module-name]/page.tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
// import relevant lucide icons for features

const features = [
  { icon: IconName, title: "...", description: "..." },
  // 4-6 features
]

const metrics = [
  { metric: "XX%", label: "..." },
  // 3 metrics
]

const steps = [
  { title: "...", description: "..." },
  // 3 steps
]

export default function ModuleNamePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8 bg-primary">
        <Image
          src="/images/default-hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-white/90 mb-4">Module Name</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight text-white">
            Benefit-Driven Headline
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            One to two sentences expanding on the headline.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Request a Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white shadow-none hover:bg-white/20 hover:text-white">
              <Link href="#capabilities">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
            Section Heading
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature items */}
          </div>
        </div>
      </section>

      {/* Product Visual */}
      <section className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              Visual Section Headline
            </h2>
          </div>
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            {/* Screenshot or placeholder */}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
            Typical Results
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 text-center">
            {/* Metric items */}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Step items */}
          </div>
        </div>
      </section>

      {/* No in-page CTA — the global CallToAction from layout.tsx renders below */}
    </main>
  )
}
```

---

## Checklist Before Shipping

- [ ] Hero headline is benefit-driven, not feature-descriptive
- [ ] No more than 7 sections total
- [ ] Section backgrounds alternate correctly (no two tinted sections adjacent)
- [ ] All headings use `font-light` — nothing is bold
- [ ] `max-w-4xl` for text, `max-w-5xl`/`6xl` for grids and visuals
- [ ] Buttons follow the variant/size table above
- [ ] Images have `alt` text and use `rounded-2xl`+ with overflow-hidden
- [ ] Responsive: stacks to single column on mobile
- [ ] Page feels spacious — when in doubt, add more padding, not more content
- [ ] No in-page CTA section — layout.tsx already provides the global CallToAction
- [ ] Layout.tsx already provides SiteHeader, CallToAction, and SiteFooter — don't duplicate any of them

---

## File Reference

| File | Purpose |
|------|---------|
| [app/modules/smart-operations/page.tsx](app/modules/smart-operations/page.tsx) | Existing module page (reference implementation) |
| [app/layout.tsx](app/layout.tsx) | Root layout — header, global CTA, footer |
| [app/globals.css](app/globals.css) | Color system, shadows, animations |
| [components/ui/button.tsx](components/ui/button.tsx) | Button variants |
| [components/call-to-action.tsx](components/call-to-action.tsx) | Global CTA component |
| [design-guides/homepage.md](design-guides/homepage.md) | Homepage design guide (parent reference) |
