"use client"

import React from "react"

export type Testimonial = {
  quote: string
  author: string
  title: string
  company: string
  avatarSrc?: string
}

type TestimonialCarouselProps = {
  testimonials: Testimonial[]
  title?: string
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[380px] h-[320px] p-8 bg-card rounded-[20px] ring-1 ring-black/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] flex flex-col transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,0,0,0.05),0_16px_40px_-16px_rgba(0,0,0,0.18)]">
      <span
        aria-hidden
        className="font-serif text-5xl leading-none text-primary/15 select-none"
      >
        &ldquo;
      </span>
      <p className="-mt-3 text-[17px] font-light leading-[1.6] tracking-[-0.01em] text-foreground/85 flex-1">
        {highlightNumbers(testimonial.quote)}
      </p>
      <div className="mt-auto pt-5 border-t border-black/[0.06]">
        <p className="font-medium text-foreground text-[15px] tracking-[-0.01em]">
          {testimonial.author}
        </p>
        <p className="mt-0.5 text-muted-foreground text-[13px]">
          {testimonial.title}, {testimonial.company}
        </p>
      </div>
    </div>
  )
}

const CARD_WIDTH = 380
const GAP = 32
const STEP = CARD_WIDTH + GAP
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
      className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-card ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] text-foreground/70 transition-all duration-300 hover:text-foreground hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.05),0_16px_40px_-16px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
  className = "",
}: TestimonialCarouselProps) {
  // Exact width of one set of testimonials (the loop period)
  const setWidth = testimonials.length * STEP

  const trackRef = React.useRef<HTMLDivElement>(null)
  // Unbounded scroll position in px; only wrapped when applied as a transform
  const offsetRef = React.useRef(0)
  // When set, the rAF loop eases toward this position instead of auto-scrolling
  const targetRef = React.useRef<number | null>(null)
  const hoveredRef = React.useRef(false)
  const resumeAtRef = React.useRef(0)

  React.useEffect(() => {
    const autoSpeed = setWidth * AUTO_SPEED_FACTOR // px per second
    let rafId: number
    let lastTime: number | null = null

    const tick = (time: number) => {
      const dt = lastTime === null ? 0 : (time - lastTime) / 1000
      lastTime = time

      const target = targetRef.current
      if (target !== null) {
        const diff = target - offsetRef.current
        if (Math.abs(diff) < 0.5) {
          offsetRef.current = target
          targetRef.current = null
        } else {
          // Exponential ease-out, frame-rate independent
          offsetRef.current += diff * Math.min(1, dt * 8)
        }
      } else if (!hoveredRef.current && time >= resumeAtRef.current) {
        offsetRef.current += autoSpeed * dt
      }

      if (trackRef.current) {
        const wrapped =
          ((offsetRef.current % setWidth) + setWidth) % setWidth
        trackRef.current.style.transform = `translateX(${-wrapped}px)`
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [setWidth])

  const step = (direction: 1 | -1) => {
    const from = targetRef.current ?? offsetRef.current
    // Snap to the next/previous card boundary
    const nextIndex =
      direction === 1
        ? Math.floor(from / STEP + 1e-4) + 1
        : Math.ceil(from / STEP - 1e-4) - 1
    targetRef.current = nextIndex * STEP
    resumeAtRef.current = performance.now() + RESUME_DELAY_MS
  }

  return (
    <section className={className}>
      {title && (
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-light tracking-[-0.02em] text-foreground text-center">
            {title}
          </h2>
        </div>
      )}

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => (hoveredRef.current = true)}
        onMouseLeave={() => (hoveredRef.current = false)}
      >
        {/* Fade edges - aggressive fade so only 2-3 cards visible from center */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[35%] z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--background) 0%, var(--background) 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-[35%] z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--background) 0%, var(--background) 40%, transparent 100%)",
          }}
        />

        {/* Navigation arrows */}
        <div className="absolute inset-y-0 left-4 sm:left-8 z-20 flex items-center pointer-events-none">
          <ArrowButton
            direction="left"
            onClick={() => step(-1)}
            label="Previous testimonial"
          />
        </div>
        <div className="absolute inset-y-0 right-4 sm:right-8 z-20 flex items-center pointer-events-none">
          <ArrowButton
            direction="right"
            onClick={() => step(1)}
            label="Next testimonial"
          />
        </div>

        {/* Scrolling track - transform driven by rAF loop for seamless infinite loop */}
        <div ref={trackRef} className="flex gap-8 py-10 will-change-transform">
          {/* First set */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`first-${testimonial.author}-${index}`}
              testimonial={testimonial}
            />
          ))}
          {/* Second set (duplicate for seamless loop) */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`second-${testimonial.author}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
