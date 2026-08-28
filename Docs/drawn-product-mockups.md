# Drawing product mockups in code

A method for turning product screenshots into small, designed graphics for slides,
carousels and marketing pages. Instead of shipping the screenshot, you redraw the
screen as a component: a white (or dark) panel of real markup, sized for the card
it lives in.

This document is written to be dropped into another repo and handed to an agent.
The examples are React + Tailwind, but nothing here depends on that; the rules are
about what survives at a quarter of the original size.

---

## Why not just use the screenshot

A screenshot of a real app, shrunk into a 300px card, fails in five ways at once:

- **Illegible.** A ten-column table at 25% is grey noise. The viewer sees texture
  where you meant to show information.
- **Wrong crop.** The interesting part is never where the card wants it.
- **Ages badly.** Every redesign of the product silently dates the website.
- **Leaks.** Customer names, order numbers, employee names, real volumes.
- **Inert and heavy.** Cannot be themed, animated, translated, or made to respond
  to a light card; and it is a 400KB PNG.

A drawn panel fixes all five, and one more thing that matters more than any of
them: **it forces you to decide what the screen is actually saying.** You cannot
redraw a screen without choosing what to leave out, and that choice is the design.

---

## The eight rules

### 1. Redraw, don't trace

The screenshot is the reference, not the target. You are making the argument the
screen makes, in a space a fraction of the size. Anything you copy faithfully that
does not survive the scale is worse than useless: it is noise wearing the costume
of detail.

Trace-first attempts fail in a recognisable way. They look busy, grey, and slightly
broken, and every element is 20% too small to read.

### 2. Cut everything that does not survive the scale

Hard rules, learned by getting them wrong first:

- **Nothing below 6px.** If a label cannot be 6px or larger, it does not go in.
  Axis tick values are the usual casualty. Gridlines carry that job perfectly well.
- **Five tabs become three.** Long nav strips collapse to the active one plus
  enough neighbours to read as tabs.
- **Ten columns become four.** Keep the columns a row is actually judged on. Push
  one more attribute into a coloured edge or a dot if you need it.
- **Two chart legends become zero.** Share one colour scale between charts instead
  and the relationship explains itself.
- **Drop duplicate chrome.** A window title bar plus a page heading saying the same
  word is one element too many.

### 3. Invert the hierarchy toward the claim

Real apps bury the important thing in a column, because real apps are used by people
who know where to look. A marketing panel has three seconds.

Find the sentence the module is selling and put that first, even where the real
screen does not.

> A maintenance app showed tasks in a ten-column table with the trigger in column
> two. But the whole claim of the module was *"maintenance driven by usage and
> condition, not the calendar"*. So the redraw made each task a card with the
> trigger on its own line under the name, and an icon for the kind of thing that
> fires it. Same data, hierarchy inverted toward the claim.

> A measurement was shown as a number in a field. In spec or out of spec is the only
> reason anyone reads a measurement, so the redraw put the number on a tolerance
> track: red outside the limits, green inside, a marker where the reading landed.

### 4. One hero per panel

Each panel gets exactly one element that is bigger and louder than the rest: the
headline figure, the main chart, the three touch targets. Everything else is
support. Two heroes read as none.

### 5. Vary the silhouette across the set

This is the rule that is easiest to miss and most damaging when you do, especially
in a carousel where three or four cards are visible at once.

If every panel is "white card, header, list of rows", the set reads as one thing
repeated, and the viewer stops looking after the second card. Give each module a
different *form*, and check the set as a list of forms:

| Module | Form |
|---|---|
| Platform | wiring diagram |
| Connectivity | list with sparklines |
| Efficiency | gauges + timeline + bars |
| Assistant | chat transcript |
| Maintenance | cards on a grey surface |
| Energy | combo chart + heatmap |
| Quality | tiles + a scanner field |
| Orders | dense table |
| Planning | gantt |
| Documents | file list |
| Reporting | stat tiles + area chart |

Then order the set so no two neighbours share a form.

When two modules genuinely have the same shape of screen, differentiate on
treatment instead: one gets dense ruled rows, the other gets spaced cards on a
tinted surface.

### 6. Run past the bottom edge

A panel that ends neatly inside the card looks like a small picture. A panel whose
content continues past the bottom edge, dissolving into the card colour, looks like
a window onto a real system.

Build each panel **taller than the visible area** and finish it with something that
repeats naturally: more rows, more bars, more messages, more cells. The viewer's eye
completes it.

Concretely: if the card gives you 384px of height, build to 360 to 460px, and make the
last section a list, a bar row, or a feed. Never end on a summary, a total, or a
primary button, those read as amputated.

### 7. Make the chrome tone-aware

The moment a set includes light *and* dark cards (and it should, an unbroken run of
dark cards is heavy), everything hardcoded to white breaks.

Thread a single `tone: "light" | "dark"` through and switch:

- title and body colour
- the arrow / CTA button (a white disc vanishes on pale blue)
- any top-edge sheen (a white lift does nothing on a light card, use 5% black)
- **the panel's drop shadow.** The shadow that lifts a panel off a dark green card
  is a bruise under it on pale sand

For the shadow, rather than plumbing a prop through every panel component, have the
card set a custom property and the panels read it:

```tsx
// the card decides, once
<div style={{ "--mockup-shadow": tone === "dark" ? "rgba(0,0,0,0.14)" : "rgba(0,0,0,0.38)" }}>
  <Mockup />
</div>

// every panel reads it, with the dark-card value as the fallback
className="shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))]"
```

### 8. Animate only what means something

Motion is worth it on the panels where a still frame cannot say the thing:

- **A flow diagram.** A pulse travelling the wires shows the mechanism moving.
  Delay the outbound pulses until the inbound one lands, so it reads as cause and
  effect rather than decoration.
- **Live data.** A breathing status dot, and traces that actually scroll.
- **Instrumentation.** Gauge arcs sweeping up to their value on a slow loop.
- **A conversation.** End the transcript on an unanswered question with a typing
  indicator, and blink a caret in the composer. The chat then reads as in progress
  rather than as a log.

Leave everything else completely still. Three moving panels in a set of eleven read
as deliberate; eleven read as a slot machine.

Non-negotiable: transform and opacity only (dash-offset is acceptable on tiny SVGs),
and define the animation classes **inside** `@media (prefers-reduced-motion: no-preference)`
rather than disabling them afterwards, so the static state is the real one:

```css
@media (prefers-reduced-motion: no-preference) {
  .mockup-live-dot { animation: mockup-live-dot 2.4s ease-in-out infinite; }
}
```

Make sure the un-animated state is correct on its own: a gauge carries its finished
dash offset inline, a travelling pulse is `opacity: 0` by default.

---

## The workflow

Per screen, this takes one pass plus one correction. Expect the correction.

1. **Get the screenshot.** Ask for the real screen. If there is no screen (some
   modules are a capability, not a page), work from the marketing copy instead and
   say so, that panel becomes a diagram rather than a redraw.
2. **Name the claim in one sentence.** Usually already written in the slide copy.
   This decides the hierarchy, per rule 3.
3. **List what is on the screen, then cross out two thirds.** Keep the chrome that
   identifies the product (the logo, the tab strip, one signature control), the
   hero, and one repeating tail.
4. **Check the set.** What form is this panel, and does a neighbour already have it?
   If yes, change the treatment now, not later.
5. **Build to the height budget.** Hero and identity in the crisp zone, the
   repeating tail through the fade.
6. **Sanity-check the type scale.** Nothing under 6px. Read it at 100% zoom on a
   real card, not zoomed in.
7. **Show it and expect one round of correction.** The most common notes are
   "too literal", "too short", and "make it more modern", which almost always means
   the structure repeats itself, not that the colours are wrong.

---

## The sizing contract

Write this down for your own card before drawing anything, then build every panel
against it.

```
card height              600px
panel starts at          36% from the top   (216px)
visible height           384px
crisp zone               first ~225px       (above where the fade begins)
bottom fade              last 160px of the card, card colour, 0 → 100%
panel width              card width − 56px  (~250 to 290px)
```

What that means in practice:

- **Identity and hero live in the first 225px.** Header, the figure, the main chart.
- **225 to 300px is half-veiled.** Good for secondary rows, section labels.
- **Past 300px is texture.** Bars, cells, feed rows. Never put a word here you need
  read.

Baseline type scale that works at this width:

| Element | Size |
|---|---|
| Panel heading | 9.5 to 11px |
| Hero figure | 15 to 19px |
| Section label | 7px |
| Body / row text | 6.5 to 7.5px |
| Meta, axis, chips | 6px |
| **Floor** | **6px** |

---

## Code patterns

These are the pieces that came up repeatedly. All are dependency-free; a chart
library at this scale costs more than it gives and cannot be told to shut up about
axis labels.

**Panel skeleton**

```tsx
<div className="w-full overflow-hidden rounded-xl bg-white px-3 pb-3 pt-2.5
                shadow-[0_18px_44px_var(--mockup-shadow,rgba(0,0,0,0.38))]
                ring-1 ring-black/10">
  {/* heading + context pill */}
  {/* hero */}
  {/* repeating tail that runs off the bottom */}
</div>
```

**Half-circle gauge.** A semicircle of radius 16 has length `π × 16`; set
`strokeDasharray` to that and animate `strokeDashoffset` from full to
`arc − (value/100) × arc`.

```tsx
<path d="M4 20 A16 16 0 0 1 36 20" fill="none" stroke="#e9edf0" strokeWidth="3.5" strokeLinecap="round" />
<path d="M4 20 A16 16 0 0 1 36 20" fill="none" stroke={tone} strokeWidth="3.5" strokeLinecap="round"
      strokeDasharray={arc} style={{ strokeDashoffset: arc - (value / 100) * arc }} />
```

**Sparkline.** Plain polyline, `preserveAspectRatio="none"`,
`vectorEffect="non-scaling-stroke"` so the stroke stays 1px under non-uniform
scaling. To scroll it seamlessly, draw the series twice end to end plus the joining
point, and translate by exactly one width.

**Gantt grid.** Column rules as a repeating gradient on the row, bars positioned
absolutely in percentages of the same box. Keep the labels and the rules in the same
padding box or they drift out of step.

```tsx
const COL = 100 / days.length
style={{ backgroundImage:
  `repeating-linear-gradient(to right, rgb(241 245 249) 0 1px, transparent 1px ${COL.toFixed(3)}%)` }}
```

**Heatmap.** `Array.from` over rows and columns with a deterministic value.
Combine a real pattern with a fixed hash so it looks like data and never changes
between renders:

```tsx
const shift = col >= 3 && col <= 12 ? 0.72 : 0.2
const noise = Math.abs(Math.sin(row * 12.9898 + col * 4.1414) * 43758.5453) % 1
const v = Math.min(1, Math.max(0.06, shift + noise * 0.3 - 0.12))
```

**Combo chart.** Light bars in a flex row behind an absolutely positioned SVG line.
Two series that move opposite each other tell a story a single series cannot.

**Tolerance track.** A rose track, a green band inset from both ends, a marker dot
positioned by percentage. Reads instantly at any size.

---

## Colour

- **Use the design system's tokens** for anything structural (`var(--brand-dark)`
  rather than a hex you sampled), so the panels track a rebrand.
- **Semantic colours are defined once and shared.** If a stop reason is red in the
  timeline it must be red in the distribution chart. That shared scale is what lets
  you delete the legend.
- **Lift dark UI colours for small type.** A product's near-black label on a dark
  purple button is fine at full size and mush at 10px. Brighten the fill a few steps
  rather than fighting it. Say so in a comment, it is a deliberate divergence.
- **Card colours: one per panel, not a cycle.** Cycling five colours over eleven
  cards repeats each one two or three times and looks careless. Extend the palette
  with variations in the same family until every card is distinct.
- **Key card colours by module id, not by position.** Otherwise reordering the set
  silently reshuffles every colour.
- **If a second carousel on the same page shares the family, change the sequence.**
  Two runs of identical colour in identical order read as a copy-paste.

---

## Checklist

Before calling a panel done:

- [ ] Nothing smaller than 6px
- [ ] One hero, not two
- [ ] The claim is visible in the first 225px
- [ ] The form differs from both neighbours in the set
- [ ] Content runs past the bottom edge and the last element repeats naturally
- [ ] No real customer names, order numbers or employee data
- [ ] Colours come from tokens; semantic colours shared across charts
- [ ] Title, CTA and shadow all respond to the card's tone
- [ ] Motion, if any, is transform/opacity and gated on `prefers-reduced-motion`
- [ ] The static state is correct with animations off
- [ ] Typecheck and lint clean

---

## Mistakes to avoid

Each of these was made and corrected in the original implementation.

**Tracing the screenshot.** First attempts reproduce five tab strips and a full
axis, and look like a bad photocopy. Cut two thirds.

**Drawing an empty state.** The chat panel was first drawn as the app's real empty
screen: a greeting, a disclaimer, some suggestion chips. It had nothing to show and
left the card half-height. Draw the product *in use*.

**Repeating the same control.** Three stacked blocks each with its own "Start" button
read as three things to do, when the panel only ever does one. Make the type a
choice and give the action one button.

**Building too short.** Panels that end 100px above the card's bottom edge look like
small pictures floating in colour. Build past the edge.

**Cycling colours.** See above. Repetition across a set is read as a lack of care
even when nobody can say why.

**Leaning on a framework's internals.** `--tw-ring-color` set inline to fake a
coloured ring works until it doesn't. Use an explicit `boxShadow`, which also avoids
the layout shift a border would cause.

**Letting the set converge.** The single most valuable review question is not "does
this panel look good" but "does this panel look like the one next to it".
