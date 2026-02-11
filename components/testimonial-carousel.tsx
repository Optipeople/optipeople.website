"use client"

import React from "react"
import Image from "next/image"

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
      <span key={match.index} className="text-primary font-semibold">
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

function QuoteIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <path
        d="M12.5 17H7.5C7.5 12 10.5 10.5 12.5 9.5L11 7C6 9 3 13 3 18.5V25H12.5V17ZM27 17H22C22 12 25 10.5 27 9.5L25.5 7C20.5 9 17.5 13 17.5 18.5V25H27V17Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[350px] h-[280px] p-6 bg-white rounded-2xl border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(0,0,0,0.05)] flex flex-col">
      <QuoteIcon />
      <p className="mt-4 text-foreground/80 text-base leading-relaxed flex-1">
        {highlightNumbers(testimonial.quote)}
      </p>
      <div className="mt-auto pt-4 flex items-center gap-3">
        {testimonial.avatarSrc ? (
          <Image
            src={testimonial.avatarSrc}
            alt={testimonial.author}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-medium text-sm">
              {testimonial.author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-medium text-foreground text-sm">
            {testimonial.author}
          </p>
          <p className="text-foreground/60 text-xs">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

const CARD_WIDTH = 350
const GAP = 24

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
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-light text-foreground text-center">
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
          className="flex gap-6 animate-scroll-left"
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
