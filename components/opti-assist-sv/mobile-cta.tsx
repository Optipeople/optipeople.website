"use client"

import { useEffect, useState } from "react"

/**
 * A "Boka demo" bar pinned to the bottom of a phone screen. It shows once the
 * hero CTA has scrolled away and hides again while the booking form or the
 * closing CTA is on screen, so it never sits on top of the thing it points to.
 */
export function MobileCta({ label }: { label: string }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero-cta")
    const targets = ["boka", "final-cta"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!hero) return

    const state = { heroVisible: true, targetVisible: new Set<Element>() }
    const update = () =>
      setShow(!state.heroVisible && state.targetVisible.size === 0)

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          // Only "scrolled past" counts, not "not reached yet".
          state.heroVisible =
            entry.isIntersecting || entry.boundingClientRect.top > 0
        } else if (entry.isIntersecting) {
          state.targetVisible.add(entry.target)
        } else {
          state.targetVisible.delete(entry.target)
        }
      }
      update()
    })
    io.observe(hero)
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.07] bg-background/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 motion-reduce:transition-none sm:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href="#boka"
        data-cta="mobile_bar"
        tabIndex={show ? 0 : -1}
        className="flex h-12 w-full items-center justify-center rounded-sm bg-primary text-base font-semibold text-primary-foreground"
      >
        {label}
      </a>
    </div>
  )
}
