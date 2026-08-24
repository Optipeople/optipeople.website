"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface RotatingWordProps {
  words: string[]
  /** How long each word stays on screen. */
  intervalMs?: number
  /** Extra delay before the first swap — lets multiple instances rotate out of sync. */
  startDelayMs?: number
  className?: string
}

/**
 * Cycles through a list of terms in place, slot-machine style: the outgoing
 * term rolls out through the top of a masked slot while the incoming one rolls
 * in from the bottom. The slot's width animates to the incoming word's measured
 * width, so surrounding (centered) text reflows smoothly instead of jumping.
 * Screen readers get the full static list once; the animated slot is hidden
 * from them to avoid announcement churn.
 */
export function RotatingWord({
  words,
  intervalMs = 2600,
  startDelayMs = 0,
  className,
}: RotatingWordProps) {
  // `prev` is the outgoing word's index; equal to `index` before the first swap.
  const [{ index, prev }, setSlot] = useState({ index: 0, prev: 0 })
  const [width, setWidth] = useState<number | null>(null)
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (words.length < 2) return
    const advance = () =>
      setSlot(({ index: i }) => ({
        index: (i + 1) % words.length,
        prev: i,
      }))
    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = setTimeout(() => {
      advance()
      interval = setInterval(advance, intervalMs)
    }, intervalMs + startDelayMs)
    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [words.length, intervalMs, startDelayMs])

  useEffect(() => {
    const measure = () => {
      const el = measureRefs.current[index]
      if (el) setWidth(el.offsetWidth)
    }
    measure()
    // Widths shift once the webfont loads and on viewport changes.
    document.fonts?.ready.then(measure)
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [index])

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {/* Invisible copies of every word, used only to measure target widths. */}
      <span aria-hidden className="invisible absolute left-0 top-0">
        {words.map((word, i) => (
          <span
            key={word}
            ref={(el) => {
              measureRefs.current[i] = el
            }}
            className="absolute left-0 top-0 whitespace-nowrap"
          >
            {word}
          </span>
        ))}
      </span>

      {/* overflow: clip (not hidden) keeps the inline-block baseline intact while
          masking the words rolling through the slot. */}
      <span
        aria-hidden
        className="relative inline-block whitespace-nowrap [overflow:clip] transition-[width] duration-500 ease-in-out motion-reduce:transition-none"
        style={{ width: width === null ? undefined : `${width}px` }}
      >
        <span
          key={`in-${index}`}
          className="inline-block whitespace-nowrap animate-[word-roll-in_500ms_cubic-bezier(0.65,0,0.35,1)_both] motion-reduce:animate-none"
        >
          {words[index]}
        </span>
        {prev !== index && (
          <span
            key={`out-${index}`}
            className="absolute left-0 top-0 inline-block whitespace-nowrap animate-[word-roll-out_500ms_cubic-bezier(0.65,0,0.35,1)_both] motion-reduce:hidden"
          >
            {words[prev]}
          </span>
        )}
      </span>

      <span className="sr-only">{words.join(", ")}</span>
    </span>
  )
}
