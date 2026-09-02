"use client"

import React from "react"
import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"

export type Testimonial = {
  quote: string
  author: string
  title: string
  company: string
  avatarSrc?: string
  /**
   * Path to this customer's case study. Only set when a published story exists,
   * so a quote without one stays a plain card instead of a dead link.
   */
  href?: string
}

type TestimonialCarouselProps = {
  testimonials: Testimonial[]
  title?: string
  /** Label on the case link inside each card, e.g. "Read the case". */
  caseLabel?: string
  className?: string
}

function highlightNumbers(text: string): React.ReactNode[] {
  // Match numbers with optional ~ prefix and common suffixes
  const pattern = /~?\d+%?(?:\s+(?:extra\s+)?(?:production\s+)?(?:hours|months|years))?/gi
  const result: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index))
    }
    // Add the highlighted match
    result.push(
      <span key={match.index} className="text-primary font-medium">
        {match[0]}
      </span>
    )
    lastIndex = pattern.lastIndex
  }

  // Add remaining text after last match
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex))
  }

  return result.length > 0 ? result : [text]
}

/**
 * Shared between the linked and unlinked card so both read identically.
 *
 * The card is 380px wide from `sm` up. Below that it is the viewport minus the
 * page gutter, because a fixed 380px card was wider than a 375px phone and its
 * first words sat under the edge fade. Height is a minimum, not a fixed value:
 * the track is a flex row, so every card stretches to the tallest one and a
 * long quote on a narrow card simply makes the row taller.
 */
const CARD_CLASS =
  "group flex min-h-[300px] w-[calc(100vw-3rem)] max-w-[380px] flex-shrink-0 flex-col rounded-[20px] bg-card p-6 ring-1 ring-black/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,0,0,0.05),0_16px_40px_-16px_rgba(0,0,0,0.18)] sm:min-h-[320px] sm:w-[380px] sm:p-8"

function TestimonialCard({
  testimonial,
  caseLabel,
  duplicate = false,
}: {
  testimonial: Testimonial
  caseLabel: string
  /** Cards in the cloned set repeat the first, so keep them out of the a11y tree. */
  duplicate?: boolean
}) {
  const body = (
    <>
      {/* Quote mark left, case affordance right, so linking costs no height */}
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className="select-none font-serif text-5xl leading-none text-primary/15"
        >
          &ldquo;
        </span>
        {testimonial.href && (
          <span className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-foreground/72 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              {caseLabel}
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-foreground/82 transition-colors group-hover:border-black/20 group-hover:text-foreground">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        )}
      </div>
      <p className="-mt-3 flex-1 text-base font-normal leading-[1.6] tracking-[-0.01em] text-foreground/90 sm:text-[17px]">
        {highlightNumbers(testimonial.quote)}
      </p>
      <div className="mt-auto border-t border-black/[0.06] pt-5">
        <p className="text-[15px] font-medium tracking-[-0.01em] text-foreground">
          {testimonial.author}
        </p>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          {testimonial.title}, {testimonial.company}
        </p>
      </div>
    </>
  )

  if (!testimonial.href) {
    return (
      <div className={CARD_CLASS} aria-hidden={duplicate || undefined}>
        {body}
      </div>
    )
  }

  return (
    <Link
      href={testimonial.href}
      className={`${CARD_CLASS} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
    >
      {body}
    </Link>
  )
}

// The widest a card and its gap get (the `sm` values in CARD_CLASS and the
// track). The real step is measured from the DOM once mounted, because both
// shrink on a phone; this constant only sizes the clone count and seeds the
// measurement.
const MAX_STEP = 380 + 32
// Widest viewport the track is built to fill. The set is repeated until it
// covers this plus one full set, so the wrap point always sits off-screen.
const MAX_TRACK_WIDTH = 2560
// Matches the previous CSS animation pace: one full set every 30s
const AUTO_SPEED_FACTOR = 1 / 30 // fraction of set width per second
// How long auto-scroll stays paused after using the arrows
const RESUME_DELAY_MS = 4000

function ArrowButton({
  direction,
  onClick,
  label,
}: {
  direction: "left" | "right"
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-card ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] text-foreground/82 transition-all duration-300 hover:text-foreground hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.05),0_16px_40px_-16px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  )
}

export function TestimonialCarousel({
  testimonials,
  title,
  caseLabel = "Read the case",
  className = "",
}: TestimonialCarouselProps) {
  // Clone count is sized for the widest cards; narrower ones only mean more
  // coverage than needed, never a gap.
  const maxSetWidth = testimonials.length * MAX_STEP
  const setCount =
    maxSetWidth > 0 ? Math.max(2, 1 + Math.ceil(MAX_TRACK_WIDTH / maxSetWidth)) : 1

  const trackRef = React.useRef<HTMLDivElement>(null)
  // Distance from one card's left edge to the next, measured from the DOM so
  // the loop period follows the responsive card width and gap.
  const stepRef = React.useRef(MAX_STEP)
  // Unbounded scroll position in px; only wrapped when applied as a transform
  const offsetRef = React.useRef(0)
  // When set, the rAF loop eases toward this position instead of auto-scrolling
  const targetRef = React.useRef<number | null>(null)
  const hoveredRef = React.useRef(false)
  // Cards are links, so keyboard focus has to hold the track still too
  const focusedRef = React.useRef(false)
  const resumeAtRef = React.useRef(0)
  const reducedMotionRef = React.useRef(false)

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      reducedMotionRef.current = query.matches
    }
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  React.useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined
      const second = track.children[1] as HTMLElement | undefined
      if (first && second) {
        const step = second.offsetLeft - first.offsetLeft
        if (step > 0) stepRef.current = step
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  const count = testimonials.length

  React.useEffect(() => {
    let rafId: number
    let lastTime: number | null = null

    const tick = (time: number) => {
      const dt = lastTime === null ? 0 : (time - lastTime) / 1000
      lastTime = time

      // Exact width of one set of testimonials (the loop period)
      const setWidth = count * stepRef.current
      const autoSpeed = setWidth * AUTO_SPEED_FACTOR // px per second

      const target = targetRef.current
      if (target !== null) {
        const diff = target - offsetRef.current
        if (reducedMotionRef.current || Math.abs(diff) < 0.5) {
          offsetRef.current = target
          targetRef.current = null
        } else {
          // Exponential ease-out, frame-rate independent
          offsetRef.current += diff * Math.min(1, dt * 8)
        }
      } else if (
        !reducedMotionRef.current &&
        !hoveredRef.current &&
        !focusedRef.current &&
        time >= resumeAtRef.current
      ) {
        offsetRef.current += autoSpeed * dt
      }

      if (trackRef.current && setWidth > 0) {
        const wrapped =
          ((offsetRef.current % setWidth) + setWidth) % setWidth
        trackRef.current.style.transform = `translateX(${-wrapped}px)`
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [count])

  const step = (direction: 1 | -1) => {
    const size = stepRef.current
    const from = targetRef.current ?? offsetRef.current
    // Snap to the next/previous card boundary
    const nextIndex =
      direction === 1
        ? Math.floor(from / size + 1e-4) + 1
        : Math.ceil(from / size - 1e-4) - 1
    targetRef.current = nextIndex * size
    resumeAtRef.current = performance.now() + RESUME_DELAY_MS
  }

  return (
    <section className={className}>
      {title && (
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-foreground text-center">
            {title}
          </h2>
        </div>
      )}

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => (hoveredRef.current = true)}
        onMouseLeave={() => (hoveredRef.current = false)}
        // Touch has no hover, so freeze on first contact. Without this the card
        // slides between finger down and up and the tap misses its link.
        onPointerDown={() => {
          resumeAtRef.current = performance.now() + RESUME_DELAY_MS
        }}
        onFocus={() => (focusedRef.current = true)}
        onBlur={() => (focusedRef.current = false)}
      >
        {/* Fade edges - aggressive fade so only 2-3 cards visible from center.
            On a phone the fade is only as wide as the card's own padding, so
            it never washes over the quote itself. */}
        <div
          className="absolute left-0 top-0 bottom-0 w-6 sm:w-[35%] z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--background) 0%, var(--background) 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-6 sm:w-[35%] z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--background) 0%, var(--background) 40%, transparent 100%)",
          }}
        />

        {/* Navigation arrows over the track. Hidden on a phone, where they
            would sit on top of the quote; the row below takes over there. */}
        <div className="absolute inset-y-0 left-4 sm:left-8 z-20 hidden items-center pointer-events-none sm:flex">
          <ArrowButton
            direction="left"
            onClick={() => step(-1)}
            label="Previous testimonial"
          />
        </div>
        <div className="absolute inset-y-0 right-4 sm:right-8 z-20 hidden items-center pointer-events-none sm:flex">
          <ArrowButton
            direction="right"
            onClick={() => step(1)}
            label="Next testimonial"
          />
        </div>

        {/* Scrolling track - transform driven by rAF loop for seamless infinite loop */}
        <div ref={trackRef} className="flex gap-4 py-6 will-change-transform sm:gap-8 sm:py-10">
          {/* First set is the real one, the rest are clones for the loop */}
          {Array.from({ length: setCount }, (_, set) =>
            testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${set}-${testimonial.author}-${index}`}
                testimonial={testimonial}
                caseLabel={caseLabel}
                duplicate={set > 0}
              />
            )),
          )}
        </div>
      </div>

      {/* Phone arrows, right-aligned below the track like the other sliders. */}
      <div className="mt-2 flex justify-end gap-3 px-[var(--edge)] sm:hidden">
        <ArrowButton
          direction="left"
          onClick={() => step(-1)}
          label="Previous testimonial"
        />
        <ArrowButton
          direction="right"
          onClick={() => step(1)}
          label="Next testimonial"
        />
      </div>
    </section>
  )
}
