# Feature Page Design Guide

This document defines the design patterns for OptiPeople feature pages — dedicated pages for individual features like Production Efficiency, Stop Cause Registration, Quality Management, etc.

Inherits the [design philosophy](homepage.md#design-philosophy) from the homepage guide.

---

## Page Archetype: Feature Deep Dive

**Purpose:** Take a visitor who saw a feature in the homepage vertical slider and give them the full picture — what it does, how it looks, why it matters, and how it fits into their workflow. Convert curiosity into conviction.

**Difference from module landing pages:** Module pages answer "What does Smart Operations do?" with a broad overview of many capabilities. Feature pages answer "How exactly does Production Efficiency work?" with depth on a single capability — more screenshots, more detail, more specificity.

**Tone:** Confident and specific. This is the "zoom-in" page. The visitor already knows OptiPeople exists — they clicked to learn more about one thing. Reward that intent with substance, not fluff.

---

## URL Structure

Feature pages live under `/features/`:

```
/features/production-efficiency
/features/stop-cause-registration
/features/maintenance-and-tasks
/features/quality-management
/features/analysis-and-reporting
/features/energy-and-telemetry
/features/ai-and-copilots
/features/machine-control
```

Each corresponds to a slide in the homepage vertical feature slider.

---

## Section Flow

The page follows a "show, then tell" narrative. Screenshots lead; text supports.

| # | Section | Purpose | Visitor Thinking |
|---|---------|---------|-----------------|
| 1 | Hero | Name the feature + show it | "I can already see what this is" |
| 2 | Value Proposition | Frame the benefit | "This solves my specific problem" |
| 3 | Capabilities Deep Dive | Walk through key aspects | "I understand exactly how it works" |
| 4 | Product Showcase | Full-width hero screenshot | "I can picture this in my factory" |
| 5 | Results / Proof | Hard numbers or testimonial | "It delivers real results" |
| 6 | Related Features | Link to sibling features | "There's more I should explore" |

**5–6 sections is the target.** The hero and capabilities deep dive are mandatory. The rest flex based on available content. If no metrics exist yet, skip Results. If the feature is standalone, skip Related Features.

**No in-page CTA section.** The root layout (`layout.tsx`) already renders a global `CallToAction` component between every page and the footer.

---

## Layout Foundation

### Container

- Primary content: `max-w-4xl` (focused reading, text-heavy sections)
- Wide sections (visuals, grids): `max-w-5xl` or `max-w-6xl`
- Horizontal padding: `px-6 lg:px-8`
- Centering: `mx-auto`

### Section Spacing

| Tier | Classes | Used For |
|------|---------|----------|
| Hero | `pt-16 sm:pt-24 pb-16 lg:pb-24` | Top section only |
| Standard | `py-16 lg:py-24` | Most content sections |
| Large | `py-20 lg:py-32` | Product showcase, key visual |
| Divider | `py-12 lg:py-16` | Related features, lighter sections |

### Section Backgrounds

- Default: `bg-background` (white)
- Muted: `bg-muted/30` — subtle gray for capability sections, related features
- Dark: `bg-foreground text-background` — use at most once, only if high-impact

**Rule:** Never place two tinted sections back to back. Always separate with white.

---

## Typography

Follows the homepage type system, with these feature-page patterns:

### Hero

The feature page hero uses a product-forward layout — the screenshot is the visual anchor, not a background image.

```
Eyebrow:  text-sm font-medium tracking-wide text-muted-foreground uppercase
Title:    text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight
Subtitle: text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl
```

The hero title should name the feature clearly while leading with the benefit:
- "See Where Production Time Is Lost" (benefit-first, feature implied)
- NOT "Production Efficiency Module" (label, not a headline)

### Section Headings

```
Primary:   text-3xl lg:text-4xl font-light tracking-tight
Secondary: text-2xl font-light
```

Always `font-light`. Never bold. Centered by default unless layout is asymmetric.

### Body Text

```
Primary:   text-lg text-muted-foreground leading-relaxed
Secondary: text-base text-foreground/70
Small:     text-sm text-muted-foreground
```

**Copywriting rules:**
- Short paragraphs — 2–3 sentences max
- Lead with the outcome, follow with the mechanism
- Be specific to this feature — no generic platform language
- Active voice, present tense

---

## Section Patterns

### 1. Hero

Product-forward layout. The feature name and benefit headline sit on the left; a product screenshot anchors the right. This is different from module pages (which use a full-bleed background image) — here the product UI is the hero visual.

**Two-column variant (primary):**

```tsx
<section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
  <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    <div>
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
        {featureName}
      </p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
        {benefitDrivenHeadline}
      </h1>
      <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
        {oneToTwoSentenceDescription}
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/contact">Request a Demo</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="#capabilities">See How It Works</Link>
        </Button>
      </div>
    </div>
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
      <Image src={heroScreenshot} alt={heroAlt} fill className="object-cover" priority />
    </div>
  </div>
</section>
```

**Guidelines:**
- Left-aligned text, not centered — this is a detail page, not a billboard
- Screenshot on the right is the first product visual the visitor sees. Use the best, most representative screenshot available
- `aspect-[4/3]` for the hero image — taller than a dashboard ratio, works well at this size
- `rounded-2xl` with the standard card shadow — matches product visuals throughout the site
- `priority` on the hero image for above-the-fold loading
- Two CTAs: primary (demo/contact) + secondary (scroll to capabilities)
- On mobile, text stacks above the image naturally

**Full-bleed variant (alternative):**

If the feature has a particularly striking full-width screenshot, use the module-page hero pattern instead (background image + dark overlay + centered white text). See [module-landing-page.md](module-landing-page.md) for that pattern. Choose one or the other — never both.

### 2. Value Proposition

A focused text section that frames the problem and positions the feature as the solution. Centered, brief, punchy.

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
      {problemOrBenefitHeadline}
    </h2>
    <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
      {twoToThreeSentenceDescription}
    </p>
  </div>
</section>
```

**Guidelines:**
- `max-w-3xl` — narrower than other sections for focused reading
- One headline + one paragraph. That's it. If you need more, you're overexplaining.
- This section is optional. If the hero already conveys the value clearly, skip it and go straight to capabilities.

### 3. Capabilities Deep Dive

The core of the feature page. This uses the **alternating rows pattern** — image-left/text-right, then text-left/image-right — to walk through 3–4 key aspects of the feature with product screenshots.

```tsx
<section id="capabilities" className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
  <div className="mx-auto max-w-5xl">
    <div className="text-center mb-16 lg:mb-20">
      <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
        {sectionHeading}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        {optionalSectionSubtitle}
      </p>
    </div>
    <div className="space-y-16 lg:space-y-24">
      {capabilities.map((capability, i) => (
        <div
          key={capability.title}
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
            i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div>
            <h3 className="text-2xl lg:text-3xl font-light tracking-tight">
              {capability.title}
            </h3>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {capability.description}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            <Image src={capability.image} alt={capability.imageAlt} fill className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Guidelines:**
- **3–4 capabilities is the sweet spot.** More than 4 gets repetitive — combine or cut.
- `space-y-16 lg:space-y-24` between rows — generous but not as extreme as module pages since there's a section background grouping them
- Alternate layout direction with `order-2` on odd items
- Every capability **must** have a product screenshot. No icons-only, no text-only. This is the "show me" page.
- Images are `rounded-2xl`, `aspect-[4/3]` with the standard card shadow
- On mobile, images stack below text (natural DOM order)
- The section heading + subtitle are centered; individual capability content is left-aligned

**When to use card grid instead:**

If the feature has 5–6 shorter capabilities that don't each warrant a screenshot, fall back to the card grid pattern from [module-landing-page.md](module-landing-page.md). But prefer alternating rows — feature pages should be visual.

### 4. Product Showcase

A full-width screenshot that shows the feature in context — the dashboard view, the complete workflow, or the main interface. This is the "money shot."

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
      <Image src={fullScreenshot} alt={screenshotAlt} fill className="object-cover" />
    </div>
  </div>
</section>
```

**Guidelines:**
- `max-w-6xl` — the widest section on the page. It should feel expansive.
- `rounded-4xl` matches homepage carousel cards
- `aspect-[16/9]` for dashboard/full-screen views
- This section is optional but strongly recommended. If you have a good full-width screenshot, use it.
- If no screenshot exists yet, use a `bg-muted/30` placeholder — never a stock photo

### 5. Results / Proof

Hard numbers or a focused customer testimonial. Choose one pattern, not both (unless there's strong content for both).

**Metrics row:**

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
  <div className="mx-auto max-w-4xl">
    <h2 className="text-3xl lg:text-4xl font-light text-center mb-16">
      {sectionHeading}
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

**Testimonial (single quote):**

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8">
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

**Guidelines:**
- Metrics: 3 is ideal, `text-5xl lg:text-6xl font-extralight` in `text-primary`
- Metrics should be specific to this feature, not generic platform numbers
- Testimonial: one focused quote, not a wall of text
- This section is optional. Only include it if you have real data or a real quote. Placeholder metrics undermine credibility.

### 6. Related Features

Help the visitor explore further. Show 2–3 sibling features from the same domain.

```tsx
<section className="py-12 lg:py-16 px-6 lg:px-8 bg-muted/30">
  <div className="mx-auto max-w-5xl">
    <h2 className="text-2xl lg:text-3xl font-light text-center mb-12">
      Related Features
    </h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedFeatures.map(feature => (
        <Link
          key={feature.title}
          href={feature.href}
          className="group block p-6 rounded-xl bg-background border border-border/50 hover:border-border transition-colors"
        >
          <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </Link>
      ))}
    </div>
  </div>
</section>
```

**Guidelines:**
- 2–3 related features. Don't list all 8 — pick the most relevant siblings.
- Cards are minimal: title + short description, clickable as a whole
- `rounded-xl` cards with subtle border, no shadow — lighter weight than the main content
- Hover: border becomes more visible + title shifts to primary color
- `bg-muted/30` background groups the cards visually

**Important:** This must NOT be the last section on the page if it uses `bg-muted/30`. The global `CallToAction` from layout.tsx uses a tinted background — two gray sections back-to-back looks wrong. If Related Features is the last section, use a white background instead.

---

## Visual Rhythm

The alternation of section backgrounds creates a scroll rhythm:

```
Hero                → white (product screenshot is the visual interest)
Value Proposition   → white
Capabilities        → bg-muted/30 (groups the alternating rows)
Product Showcase    → white
Results / Proof     → white
Related Features    → bg-muted/30 (or white if last section)
─── layout.tsx CallToAction ───
─── footer ───
```

**Adjusted patterns based on which sections are included:**

If skipping Value Proposition:
```
Hero                → white
Capabilities        → bg-muted/30
Product Showcase    → white
Results / Proof     → white
─── layout.tsx CallToAction ───
```

If skipping Product Showcase:
```
Hero                → white
Value Proposition   → white
Capabilities        → bg-muted/30
Results / Proof     → white
─── layout.tsx CallToAction ───
```

**Rules:**
- **The last section before CallToAction must always have a white background.**
- Maximum one `bg-muted/30` section per page (Capabilities is the default choice)
- White sections are for focused content; muted sections group multiple items

---

## Images & Visuals

### Product Screenshots

Feature pages are the most screenshot-heavy pages on the site. Every feature page should have at minimum:

1. **Hero screenshot** — the most recognizable view of the feature
2. **3–4 capability screenshots** — one per alternating row
3. **Full-width showcase** (optional) — the complete dashboard or workflow

### Image Containers

| Context | Radius | Aspect Ratio | Shadow |
|---------|--------|-------------|--------|
| Hero screenshot | `rounded-2xl` | `aspect-[4/3]` | Standard card shadow |
| Capability row | `rounded-2xl` | `aspect-[4/3]` | Standard card shadow |
| Full-width showcase | `rounded-4xl` | `aspect-[16/9]` | Standard card shadow |

Standard card shadow: `shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]`

All image containers include: `overflow-hidden border border-[var(--gray-2)]`

### Screenshot Guidance

- Use **real product UI** — actual OptiPeople screens, not mockups or wireframes
- Crop to show the relevant part of the interface — don't show the full browser chrome
- If a screenshot doesn't exist yet, use a `bg-muted/30` placeholder with centered text: "Screenshot coming soon"
- Never use stock photos, abstract illustrations, or decorative images

---

## Buttons

| Position | Variant | Size | Pattern |
|----------|---------|------|---------|
| Hero primary | `default` | `lg` | "Request a Demo" |
| Hero secondary | `outline` | `lg` | "See How It Works" |
| Related feature card | n/a (whole card is link) | n/a | No button — card hover state |

**Rules:**
- Maximum 2 buttons, only in the hero
- No scattered CTAs throughout the page — the global CallToAction handles conversion
- Related feature cards use the whole-card-as-link pattern, not internal buttons

---

## Breadcrumb / Navigation Context

Feature pages should provide navigation context back to the parent module:

```tsx
<div className="mx-auto max-w-6xl mb-8">
  <nav className="flex items-center gap-2 text-sm text-muted-foreground">
    <Link href="/modules/smart-operations" className="hover:text-foreground transition-colors">
      Smart Operations
    </Link>
    <span>/</span>
    <span className="text-foreground">{featureName}</span>
  </nav>
</div>
```

**Guidelines:**
- Simple text breadcrumb, not a full component — `text-sm text-muted-foreground`
- Placed inside the hero section, above the main grid, within the same `max-w-6xl` container
- Parent link is clickable, current page is plain text
- Only one level deep: `Module Name / Feature Name`

---

## Feature Mapping

Each homepage vertical slider card maps to a feature page:

| Feature | URL | Parent Module |
|---------|-----|---------------|
| Production Efficiency | `/features/production-efficiency` | Smart Operations |
| Stop Cause Registration | `/features/stop-cause-registration` | Smart Operations |
| Maintenance and Tasks | `/features/maintenance-and-tasks` | Smart Operations |
| Quality Management | `/features/quality-management` | Smart Operations |
| Analysis and Reporting | `/features/analysis-and-reporting` | Smart Operations |
| Energy and Telemetry | `/features/energy-and-telemetry` | Smart Operations |
| AI and Copilots | `/features/ai-and-copilots` | AI Solutions |
| Machine Control | `/features/machine-control` | Services |

When building feature pages, update the `primaryHref` in the homepage vertical slider data (`app/page.tsx`) to point to the new feature page URL.

---

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Hero layout | Stacked (text above, image below) | `lg:grid-cols-2` side-by-side |
| Hero title | `text-4xl` | `sm:text-5xl lg:text-6xl` |
| Section heading | `text-3xl` | `lg:text-4xl` |
| Capability rows | Stacked (text above, image below) | `lg:grid-cols-2` alternating |
| Full-width showcase | Full width, smaller radius | Full width in `max-w-6xl` |
| Related features | 1 column | `sm:grid-cols-2 lg:grid-cols-3` |
| Breadcrumb | Same layout, may wrap | Single line |
| Buttons | `flex-col` (stacked) | `sm:flex-row` (side-by-side) |

**Mobile-first approach:** Base styles are mobile. Layer desktop overrides with `sm:`, `md:`, `lg:` prefixes.

---

## Page Skeleton

Complete template for a new feature page:

```tsx
// app/features/[feature-name]/page.tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const capabilities = [
  { title: "...", description: "...", image: "/images/...", imageAlt: "..." },
  { title: "...", description: "...", image: "/images/...", imageAlt: "..." },
  { title: "...", description: "...", image: "/images/...", imageAlt: "..." },
  // 3-4 capabilities, each with a screenshot
]

const metrics = [
  { metric: "XX%", label: "..." },
  { metric: "XX%", label: "..." },
  { metric: "XX%", label: "..." },
]

const relatedFeatures = [
  { title: "...", description: "...", href: "/features/..." },
  { title: "...", description: "...", href: "/features/..." },
  { title: "...", description: "...", href: "/features/..." },
]

export default function FeatureNamePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/modules/smart-operations" className="hover:text-foreground transition-colors">
              Smart Operations
            </Link>
            <span>/</span>
            <span className="text-foreground">Feature Name</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                Feature Name
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight">
                Benefit-Driven Headline
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                One to two sentences expanding on the headline.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Request a Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#capabilities">See How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
              <Image
                src="/images/feature-hero.png"
                alt="Feature hero screenshot"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition (optional) */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Problem or Benefit Headline
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Two to three sentences framing the problem and positioning this feature
            as the solution.
          </p>
        </div>
      </section>

      {/* Capabilities Deep Dive */}
      <section id="capabilities" className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              How It Works
            </h2>
          </div>
          <div className="space-y-16 lg:space-y-24">
            {capabilities.map((capability, i) => (
              <div
                key={capability.title}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <h3 className="text-2xl lg:text-3xl font-light tracking-tight">
                    {capability.title}
                  </h3>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                  <Image src={capability.image} alt={capability.imageAlt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase (optional) */}
      <section className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              Visual Section Headline
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Supporting subtitle.
            </p>
          </div>
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
            <Image
              src="/images/feature-showcase.png"
              alt="Full feature screenshot"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Results (optional) */}
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

      {/* Related Features (optional — use white bg if this is the last section) */}
      <section className="py-12 lg:py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl lg:text-3xl font-light text-center mb-12">
            Related Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedFeatures.map(feature => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group block p-6 rounded-xl bg-background border border-border/50 hover:border-border transition-colors"
              >
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
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

- [ ] Hero headline is benefit-driven, not a feature label
- [ ] Hero includes a product screenshot (not a background image or stock photo)
- [ ] Breadcrumb links back to the correct parent module
- [ ] Capabilities section has 3–4 items, each with a real screenshot
- [ ] Alternating rows alternate correctly (image-left, image-right, image-left...)
- [ ] All headings use `font-light` — nothing is bold
- [ ] `max-w-4xl` for text, `max-w-5xl` for capability rows, `max-w-6xl` for hero + showcase
- [ ] Images have `alt` text and use `rounded-2xl` + `overflow-hidden`
- [ ] Section backgrounds alternate correctly (no two tinted sections adjacent)
- [ ] Last section before CallToAction has a white background
- [ ] Responsive: stacks to single column on mobile
- [ ] Homepage vertical slider `primaryHref` updated to point to this feature page
- [ ] No in-page CTA section — layout.tsx already provides the global CallToAction
- [ ] Layout.tsx already provides SiteHeader, CallToAction, and SiteFooter — don't duplicate any of them
- [ ] Page feels spacious — when in doubt, add more padding, not more content

---

## File Reference

| File | Purpose |
|------|---------|
| `app/features/[feature-name]/page.tsx` | Feature pages (to be created) |
| [app/page.tsx](app/page.tsx) | Homepage — vertical slider links to feature pages |
| [app/layout.tsx](app/layout.tsx) | Root layout — header, global CTA, footer |
| [app/globals.css](app/globals.css) | Color system, shadows, animations |
| [components/ui/button.tsx](components/ui/button.tsx) | Button variants |
| [components/call-to-action.tsx](components/call-to-action.tsx) | Global CTA component |
| [design-guides/homepage.md](design-guides/homepage.md) | Homepage design guide (parent reference) |
| [design-guides/module-landing-page.md](design-guides/module-landing-page.md) | Module landing page guide (sibling reference) |
