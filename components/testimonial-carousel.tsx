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

export function TestimonialCarousel({
  testimonials,
  title,
  className = "",
}: TestimonialCarouselProps) {
  // Calculate the exact width of one set of testimonials
  const setWidth = testimonials.length * (CARD_WIDTH + GAP)

  return (
    <section className={className}>
      {title && (
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-light tracking-[-0.02em] text-foreground text-center">
            {title}
          </h2>
        </div>
      )}

      <div className="relative overflow-hidden">
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

        {/* Scrolling container - uses exact pixel animation for seamless loop */}
        <div
          className="flex gap-8 animate-scroll-left py-10"
          style={{
            // @ts-expect-error CSS custom property
            "--scroll-width": `${setWidth}px`,
          }}
        >
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
