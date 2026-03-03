# Contact Page Design Guide

This document defines the design patterns for the OptiPeople contact page — the page where visitors reach out, request a demo, or start a conversation.

Inherits the [design philosophy](homepage.md#design-philosophy) from the homepage guide.

---

## Page Archetype: Conversion Endpoint

**Purpose:** Make it effortless to get in touch. Remove every possible barrier between intent and action. The visitor has already decided they're interested — don't make them work for it.

**Tone:** Welcoming, low-pressure, direct. Not a form wall. Scandinavian warmth — functional, approachable, no friction.

---

## Design Principles (Contact-Specific)

- **Fewer fields, more responses.** Every form field is friction. Ask only what's needed to start a conversation. Name, email, message. Everything else can happen in the follow-up.
- **Show alternatives.** Not everyone wants to fill out a form. Provide email, phone, and location as visible alternatives.
- **No pressure language.** "Let's talk" not "Request a quote." "Tell us about your situation" not "Submit your inquiry."
- **Instant clarity.** The visitor should understand within 2 seconds what to do and what happens next.

---

## Section Flow

| # | Section | Purpose |
|---|---------|---------|
| 1 | Hero + Form | Headline + contact form side-by-side |
| 2 | Alternative Contact | Email, phone, office location |

That's it. Two sections. The contact page is the shortest page on the site. Everything else is noise.

---

## Layout

### Container

- Width: `max-w-5xl` — accommodates the two-column form layout
- Padding: `px-6 lg:px-8`

### Section Spacing

```
Hero + Form:         pt-16 sm:pt-24 pb-16 lg:pb-24
Alternative Contact: py-16 lg:py-24
```

---

## Section Patterns

### 1. Hero + Form

Two columns: context on the left, form on the right.

```tsx
<section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
  <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16">
    {/* Left — Context */}
    <div>
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
        Contact
      </p>
      <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
        Let's talk about your operations
      </h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        Tell us about your situation and we'll get back to you within one business day.
      </p>
    </div>

    {/* Right — Form */}
    <div>
      <form className="space-y-6">
        {/* Form fields */}
      </form>
    </div>
  </div>
</section>
```

**Guidelines:**
- Two-column on desktop (`lg:grid-cols-2`), stacked on mobile (text above, form below)
- Left column: eyebrow + title + description — same typography as other page heroes
- Right column: the form, vertically aligned with the title
- No background color on the form — it sits directly on white. The grid gap provides separation.
- `gap-12 lg:gap-16` between columns

### Form Fields

```tsx
<form className="space-y-6">
  <div className="space-y-2">
    <label htmlFor="name" className="text-sm font-medium text-foreground">
      Name
    </label>
    <input
      id="name"
      type="text"
      required
      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground
                 text-base placeholder:text-muted-foreground
                 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring
                 transition-colors"
      placeholder="Your name"
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="email" className="text-sm font-medium text-foreground">
      Email
    </label>
    <input
      id="email"
      type="email"
      required
      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground
                 text-base placeholder:text-muted-foreground
                 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring
                 transition-colors"
      placeholder="you@company.com"
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="message" className="text-sm font-medium text-foreground">
      Message
    </label>
    <textarea
      id="message"
      rows={5}
      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground
                 text-base placeholder:text-muted-foreground resize-y
                 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring
                 transition-colors"
      placeholder="Tell us about your situation"
    />
  </div>

  <Button type="submit" size="lg" className="w-full sm:w-auto">
    Send message
  </Button>
</form>
```

**Field styling rules:**
- Height: `h-11` for inputs (matches button `size="default"`)
- Border: `border border-input` — uses the semantic border token
- Radius: `rounded-lg` — consistent with the card/UI component scale
- Focus: `focus:ring-2 focus:ring-ring/50 focus:border-ring` — green focus ring matching the design system
- Placeholder: `placeholder:text-muted-foreground`
- Labels: `text-sm font-medium` — always above the field, never floating or inline
- Spacing: `space-y-6` between fields, `space-y-2` between label and input

**Required fields only:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Name | `text` | Yes | |
| Email | `email` | Yes | |
| Message | `textarea` | No | 5 rows default, resizable |

**Do not add:**
- Company name field (they'll mention it in the message)
- Phone number field (they'll share it if relevant)
- Dropdown selects ("What are you interested in?")
- Checkboxes ("I agree to the privacy policy" — handle via submission text)
- CAPTCHA (use honeypot or server-side protection instead)

**Submit button:**
- `size="lg"` to be prominent
- `w-full sm:w-auto` — full width on mobile, natural width on desktop
- Label: "Send message" — clear, direct, lowercase
- No arrow icon — the action is final, not navigational

### 2. Alternative Contact

Below the form, provide direct contact methods.

```tsx
<section className="py-16 lg:py-24 px-6 lg:px-8 border-t border-border/50">
  <div className="mx-auto max-w-5xl">
    <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Email</h3>
        <a href="mailto:hello@optipeople.dk"
           className="text-base text-muted-foreground hover:text-foreground transition-colors">
          hello@optipeople.dk
        </a>
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Phone</h3>
        <a href="tel:+4512345678"
           className="text-base text-muted-foreground hover:text-foreground transition-colors">
          +45 12 34 56 78
        </a>
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Office</h3>
        <p className="text-base text-muted-foreground">
          Address line 1<br />
          City, Country
        </p>
      </div>
    </div>
  </div>
</section>
```

**Guidelines:**
- Separated from the form by `border-t border-border/50` — not a background change, just a quiet line
- 3-column grid: email, phone, office
- Labels: `text-sm font-medium` — same as form labels
- Contact info: `text-base text-muted-foreground` — clickable where appropriate (`mailto:`, `tel:`)
- Hover: `hover:text-foreground transition-colors`
- No icons — the labels are clear enough

---

## Form States

### Success

After successful submission, replace the form with a confirmation message:

```tsx
<div className="text-center py-12">
  <h2 className="text-2xl font-light mb-4">Thanks for reaching out</h2>
  <p className="text-base text-muted-foreground">
    We'll get back to you within one business day.
  </p>
</div>
```

- No green checkmarks, no confetti, no animations. Just a clear confirmation.
- Match the expected response time to reality.

### Error

Display errors inline below the relevant field:

```tsx
<p className="text-sm text-destructive mt-1">Please enter a valid email address</p>
```

- Use `text-destructive` — maps to the design system's red
- Position directly below the field (`mt-1`)
- Be specific: "Please enter a valid email address" not "Invalid input"

### Loading

Disable the submit button and show a loading state:

```tsx
<Button type="submit" size="lg" disabled className="w-full sm:w-auto">
  Sending...
</Button>
```

- Disabled button with text change — no spinners needed for a simple form

---

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Layout | Stacked (text, then form) | `lg:grid-cols-2` side-by-side |
| Submit button | `w-full` | `sm:w-auto` |
| Contact grid | 1 column | `sm:grid-cols-3` |
| Title | `text-4xl` | `sm:text-5xl` |

---

## Page Skeleton

```tsx
// app/contact/page.tsx
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero + Form */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
              Contact
            </p>
            <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
              Let's talk about your operations
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Tell us about your situation and we'll get back to you within one business day.
            </p>
          </div>
          <form className="space-y-6">
            {/* Name, Email, Message fields */}
            {/* Submit button */}
          </form>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 border-t border-border/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Email, Phone, Office */}
          </div>
        </div>
      </section>
    </main>
  )
}
```

---

## Checklist

- [ ] Maximum 3 form fields (name, email, message)
- [ ] Labels are above fields, never floating
- [ ] Focus states use `ring-ring/50` (brand green)
- [ ] Submit button is `size="lg"`
- [ ] Success state replaces form with confirmation message
- [ ] Error messages are inline and specific
- [ ] Alternative contact info visible below the form
- [ ] Email and phone are clickable (`mailto:`, `tel:`)
- [ ] No CAPTCHA visible (use honeypot if needed)
- [ ] No dropdown selects, checkboxes, or unnecessary fields
- [ ] The global `CallToAction` from layout.tsx still appears — that's fine, it reinforces

---

## File Reference

| File | Purpose |
|------|---------|
| app/contact/page.tsx | Contact page (to be created) |
| [components/ui/button.tsx](components/ui/button.tsx) | Button component |
| [design-guides/homepage.md](design-guides/homepage.md) | Homepage guide (parent design system) |
| [design-guides/module-landing-page.md](design-guides/module-landing-page.md) | Module landing page (shared CTA patterns) |
