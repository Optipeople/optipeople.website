# Homepage Design Guide

This document defines the design patterns, layout structure, and component usage for the OptiPeople homepage. Reference this when building new pages that follow the same "marketing landing page" archetype.

---

## Design Philosophy

### Apple-Inspired, Nordic Simplicity

The entire OptiPeople site draws from Apple product pages and Scandinavian design principles. Every design decision should pass through these filters:

- **Remove before you add.** If an element doesn't directly help the visitor understand or convert, it doesn't belong. No decorative filler, no "nice to have" sections.
- **One idea per viewport.** Each scroll-stop should communicate exactly one thing. Don't stack competing messages in the same visual space.
- **Let whitespace do the work.** Generous padding isn't empty — it's directing attention. Sections breathe. Content doesn't crowd.
- **Typography is the design.** Light font weights, large sizes, tight tracking. The type itself creates hierarchy and visual interest — not borders, backgrounds, or decoration.
- **Restrained color.** Pages are predominantly white/neutral. Color appears only with purpose: brand accents for CTAs and key data, module colors for identity, and nothing more.
- **Show, don't decorate.** Visuals are product screenshots, real UI, or meaningful diagrams — never stock photos or abstract illustrations.
- **Functional beauty.** Every element serves a purpose. Three thin accent stripes are branding. Subtle shadows create depth. Hover states signal interactivity. Nothing is ornamental.

These principles apply across all page types. Individual design guides may add page-specific guidance, but the philosophy is universal.

---

## Page Archetype: Marketing Landing Page

**Purpose:** Convert visitors by communicating what OptiPeople does, who it's for, and why it matters — through a sequence of progressively deeper sections.

**Tone:** Premium industrial. Light typography, generous whitespace, subtle shadows, restrained color.

---

## Section Flow

The homepage follows a deliberate narrative arc. Each section answers a visitor question:

| # | Section | Visitor Question | Component |
|---|---------|-----------------|-----------|
| 1 | Hero | "What is this?" | Inline (text + SlideCarousel tabs) |
| 2 | Who It's For | "Is this for me?" | SlideCarousel (overlay layout) |
| 3 | What You Can Do | "What does it solve?" | SlideCarousel (vertical layout) |
| 4 | Social Proof – Logos | "Who else uses it?" | LogoWall |
| 5 | Social Proof – Videos | "Show me proof" | VideoCarousel |
| 6 | Social Proof – Quotes | "What do people say?" | TestimonialCarousel |
| 7 | Platform Overview | "How does it work?" | PlatformFlower |
| 8 | Blog / Cases | "Tell me more" | Inline blog grid |
| 9 | CTA | "I'm interested" | CallToAction |

**Key principle:** Move from broad positioning → specific proof → deeper exploration → conversion.

---

## Layout Foundation

### Container

- Max width: `max-w-5xl` (default sections) or `max-w-6xl` (wider sections)
- Horizontal padding: `px-8` (mobile), `px-6 lg:px-8` (desktop)
- Centering: `mx-auto w-full`

### Section Spacing

Three tiers of vertical padding, chosen by section weight:

| Tier | Classes | Used For |
|------|---------|----------|
| Standard | `py-12 lg:py-16` | Hero, lighter sections |
| Large | `py-12 lg:py-28` | Logo wall, video, testimonials, features |
| XL | `py-20 lg:py-32` | Platform flower, blog/cases |

### Responsive Strategy

Mobile-first. Three breakpoints matter:

- **Base** (< 768px): Single column, tighter spacing, simplified components
- **md** (768px): 2–4 column grids, tablet adjustments
- **lg** (1024px): Full desktop layouts, larger typography, SVG-based components

---

## Typography

### Font Families

- **Primary:** IBM Plex Sans (weights: 200, 300, 400, 500, 600)
- **Serif:** IBM Plex Serif (weights: 400, 500, 600) — used sparingly for emphasis
- Loaded via Google Fonts with preconnect + non-blocking CSS pattern

### Type Scale

| Role | Classes | Example |
|------|---------|---------|
| Hero heading | `text-6xl font-light` | "Digital Operations Platform" |
| Section heading | `text-4xl lg:text-5xl font-light tracking-tight` | "One platform. Built for industrial reality." |
| Card title | `text-5xl tracking-tight leading-[1.2] font-extralight` | Slide carousel titles |
| Overlay heading | `text-4xl lg:text-5xl tracking-tight font-extralight` | "Know Your Factory..." |
| Body (primary) | `text-lg` or `text-xl` | Section descriptions |
| Body (secondary) | `text-base text-foreground/70` | Supporting text |
| Section label | `text-sm font-medium tracking-wide uppercase` | "Cases", "Platform" |
| Meta / small | `text-xs` or `text-sm` | Timestamps, attribution |

**Design rule:** Main headings use `font-light` or `font-extralight` — never bold. This creates the premium industrial feel. Only labels and small UI text use `font-medium`.

---

## Color System

### Semantic Tokens (Light Mode)

| Token | Value | Usage |
|-------|-------|-------|
| `background` | white | Page background |
| `foreground` | near-black | Primary text |
| `primary` | `--green-dark3` | Buttons, accents, links |
| `secondary` | light gray | Secondary backgrounds |
| `muted` | light gray | Subdued backgrounds |
| `muted-foreground` | mid gray | Secondary text |
| `border` | light gray | Default borders |
| `ring` | `--green-system` | Focus states |

### Brand Colors (OKLch)

| Variable | Hex Approx | Usage |
|----------|-----------|-------|
| `--green-dark3` | Deep teal | **Primary brand color** — buttons, accents |
| `--green-dark1` | Medium teal | Sidebar, secondary UI |
| `--green-light1` | Pale mint | Light backgrounds |
| `--green-light2` | Light green | Analysis module, dark-mode primary |
| `--green-system` | Vivid green | Focus rings, accent stripe |
| `--orange-system` | Warm orange | Accent stripe |

### Module Colors

Each platform module has a dedicated color used consistently across all components:

| Module | Color Variable | Tone |
|--------|---------------|------|
| Production | `--purple-dark2` | Deep purple |
| Quality | `--yellow-dark2` | Warm yellow |
| Maintenance | `--orange-dark2` | Orange |
| Energy | `--orange-dark3` | Deep orange |
| Analysis | `--green-light2` | Light green |
| AI / Extra | `--green-dark1` | Teal green |
| OptiCloud (center) | `--green-dark3` | Primary brand |

### Text Opacity Convention

- Full text: `text-foreground` (no opacity)
- Secondary text: `text-foreground/70` or `text-foreground/80`
- Tertiary text: `text-foreground/60`

---

## Shadow System

### Custom Card Shadow (Primary)

Used on carousel cards, blog images, and video containers:

```
shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]
```

### Testimonial / Lighter Shadow

Used on testimonial cards and lighter contexts:

```
shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(0,0,0,0.05)]
```

**Design rule:** Shadows are always subtle — low offset, low spread, low opacity. No heavy drop shadows anywhere.

---

## Border & Radius

### Border Radius Scale

| Token | Usage |
|-------|-------|
| `rounded-4xl` | Carousel cards, slide containers (largest) |
| `rounded-2xl` | Blog images, featured content |
| `rounded-xl` | Secondary blog images |
| `rounded-lg` | Standard cards, dropdowns |
| `rounded-full` | Circular elements (avatars, dots, pill buttons) |

### Border Colors

- Default: `border-[var(--gray-2)]` — subtle light gray
- On dark: `border-white/20`, hover `border-white/30`

**Design rule:** Borders are minimal. Prefer shadow + radius over visible borders where possible.

---

## Component Patterns

### SlideCarousel

The most reused component on the homepage. Three layout variants:

#### 1. Grid Layout (default)

- 2-column, 2-row grid: title (top-left), image (right spanning 2 rows), description (bottom-left)
- Background: `bg-slate-100` blocks
- Width: 55% on desktop

#### 2. Overlay Layout

- Full background image with blur + gradient mask (fades from left)
- Content overlaid on left side (`max-w-[60%]`)
- Supports `dark` / `light` / `none` overlay modes
- Width: 55% on desktop, image height ~600px

#### 3. Vertical Layout

- Tall narrow cards (380px wide on desktop, 95% on mobile)
- Black background with white text
- Image at top with gradient overlay fading down
- Title uppercase `text-sm`, description `text-xl lg:text-2xl font-light`
- Arrow navigation button bottom-right

#### Navigation Types

- **Tabs:** Horizontal tab buttons with animated underline indicator — used for the hero "Who It's For" section
- **Dots:** Animated dot indicators below carousel
- **Arrows:** Prev/Next chevron buttons — used for vertical and video carousels

### LogoWall

- Grid: `grid-cols-2 md:grid-cols-4`
- Logos: `opacity-50 hover:opacity-80 transition-opacity`
- Logo size: `h-16 w-52` mobile → `h-20 w-64` desktop
- Grayscale appearance at rest, subtle on hover

### VideoCarousel

- YouTube embeds in 16:9 aspect ratio
- Container: `rounded-4xl` with card shadow
- Width: 90% mobile → 55% desktop
- Arrow navigation

### TestimonialCarousel

- Auto-scrolling infinite loop (30s, linear, pauses on hover)
- Card size: 350px × 280px
- Cards: `rounded-2xl`, lighter shadow, `p-6`
- Fade edges: 35% width gradient masks on both sides
- Content: quote icon → quote text → author + title
- Numbers within quotes highlighted in primary color

### PlatformFlower

- Desktop: Interactive SVG node graph — center hub with 6 connected modules
- Mobile: 2-column grid of module buttons
- Auto-rotates through modules every 5s
- Hover/click pauses rotation and highlights connections
- Animated data-flow dots along connection lines

### CallToAction

- Two variants: `default` (subtle light bg) and `dark` (inverted colors)
- Title: `text-3xl lg:text-4xl font-light tracking-tight`
- Buttons: `flex flex-col sm:flex-row gap-4`
- Padding: `py-16 lg:py-24`

---

## Branding Elements

### Accent Stripes

Three thin horizontal lines (h-1 each) appear in the header and footer:

1. `--orange-system` (warm orange)
2. `--green-system` (vivid green)
3. `--green-dark3` (primary brand teal)

These stripes are a signature branding element. They appear at the bottom of the header and top of the footer (inverted order).

### Logo Treatment

- Header: Standard logo, `h-7 w-auto`
- Footer: Logo with `brightness-0 invert` filter for dark background
- Logo wall logos: Object-contain, reduced opacity

---

## Interactive States

### Hover Effects

- Buttons: `hover:opacity-90` (primary), `hover:bg-accent` (outline/ghost)
- Images: `hover:scale-105` with `duration-500` — always inside an `overflow-hidden` container
- Links: `hover:text-white` (footer), color transitions
- Logos: `hover:opacity-80` from `opacity-50`
- Cards: Border color shifts on dark backgrounds

### Focus States

- Focus ring: `focus-visible:ring-ring/50 focus-visible:ring-[3px]`
- Focus border: `focus-visible:border-ring`
- Only visible on keyboard navigation (`:focus-visible`)

### Animations

- Tab indicator: `duration-300 ease-out` transform
- Testimonial scroll: `30s linear infinite`, pauses on hover
- Platform flower: 5s auto-rotation, smooth transitions
- Carousel transitions: `duration-300`
- Image hover: `duration-500` scale

---

## Accessibility Checklist

Patterns established on the homepage that should carry to all pages:

- [ ] Semantic HTML: `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`
- [ ] All images have `alt` text; decorative images use `aria-hidden="true"`
- [ ] Interactive carousels use `role="tablist"`, `role="tab"`, `aria-selected`
- [ ] Buttons have `aria-label` when icon-only
- [ ] Focus-visible rings on all interactive elements
- [ ] Color contrast meets WCAG AA for all text

---

## Page Skeleton

When building a new marketing landing page, follow this structural template:

```tsx
// app/[page]/page.tsx
export default function NewPage() {
  return (
    <main>
      {/* 1. Hero — py-12 lg:py-16, max-w-5xl */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-5xl px-8 lg:px-6">
          {/* text-6xl font-light heading */}
          {/* text-xl text-foreground/70 subheading */}
          {/* Optional: SlideCarousel or hero visual */}
        </div>
      </section>

      {/* 2–N. Content Sections — ascending py tiers */}
      <section className="py-12 lg:py-28">
        <div className="mx-auto w-full max-w-5xl px-8 lg:px-6">
          {/* text-4xl lg:text-5xl font-light section heading */}
          {/* Section content using established components */}
        </div>
      </section>

      {/* Social proof section(s) */}
      {/* Platform / product detail section */}
      {/* Blog / cases section — py-24 lg:py-32 */}

      {/* CTA is added by layout.tsx automatically */}
    </main>
  )
}
```

**Note:** The `SiteHeader`, `CallToAction`, and `SiteFooter` are rendered by `layout.tsx` — do not include them in individual pages.

---

## Button Usage Guide

| Context | Variant | Size |
|---------|---------|------|
| Primary CTA (hero, section) | `default` or `green` | `lg` (h-12 px-6) |
| Secondary CTA | `outline` | `lg` or `default` |
| In-carousel action | `green` (on dark) or `outline` | `default` (h-11 px-5) |
| Navigation arrow | `outline` | `icon` (size-11) |
| Subtle / ghost action | `ghost` | `sm` or `default` |

---

## File Reference

| File | Purpose |
|------|---------|
| [app/page.tsx](app/page.tsx) | Homepage — section composition and data |
| [app/layout.tsx](app/layout.tsx) | Root layout — header, footer, CTA wrapper |
| [app/globals.css](app/globals.css) | Color system, fonts, animations, shadows |
| [components/slide-carousel.tsx](components/slide-carousel.tsx) | Multi-layout carousel component |
| [components/logo-wall.tsx](components/logo-wall.tsx) | Customer logo grid |
| [components/video-carousel.tsx](components/video-carousel.tsx) | YouTube video carousel |
| [components/testimonial-carousel.tsx](components/testimonial-carousel.tsx) | Auto-scrolling testimonials |
| [components/platform-flower.tsx](components/platform-flower.tsx) | Interactive module visualization |
| [components/call-to-action.tsx](components/call-to-action.tsx) | CTA section |
| [components/site-header.tsx](components/site-header.tsx) | Navigation header |
| [components/site-footer.tsx](components/site-footer.tsx) | Footer |
| [components/ui/button.tsx](components/ui/button.tsx) | Button variants (CVA) |
