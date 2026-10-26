"use client"

import { useEffect, useState } from "react"

export type Beat<Id extends string = string> = { id: Id; ms: number }

/**
 * The timeline behind every product replay (components/replays/*), taken from
 * the Opti Assist phone in components/opti-assist-demo.tsx.
 *
 * Beats advance one by one and loop. The clock only runs while the replay is
 * at least a quarter on screen. Visitors who ask for reduced motion sit on
 * `stillAt`, the frame that tells the story on its own, and nothing moves.
 *
 * Destructure `root` out of the result (`const { root, ...r } = useReplay(...)`):
 * the React compiler lint treats an object holding the ref as a ref itself.
 *
 * `typing` maps a beat to the text typed during it; `typed` counts how many
 * characters of it are showing.
 */
export function useReplay<Id extends string>(
  beats: readonly Beat<Id>[],
  stillAt: Id,
  typing: Partial<Record<Id, string>> = {}
) {
  // A callback ref held in state, so the observer starts once the element
  // mounts and the returned `root` is a plain function, not a ref object.
  const [el, root] = useState<HTMLDivElement | null>(null)
  // Beats played since mount. The beat is this modulo the loop length; the
  // running count tags typed text, so each pass types from zero again
  // without resetting state inside an effect.
  const [tick, setTick] = useState(0)
  const beat = tick % beats.length
  const [typedAt, setTypedAt] = useState({ tick: 0, n: 0 })
  const [visible, setVisible] = useState(false)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setStill(reduce.matches)
    apply()
    reduce.addEventListener("change", apply)
    return () => reduce.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.25,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [el])

  useEffect(() => {
    if (still || !visible) return
    const t = setTimeout(() => setTick((n) => n + 1), beats[beat].ms)
    return () => clearTimeout(t)
  }, [tick, beat, visible, still, beats])

  const id = beats[beat].id
  const text = typing[id] ?? ""
  useEffect(() => {
    if (!text || still || !visible) return
    const step = Math.max(18, (beats[beat].ms - 350) / text.length)
    const t = setInterval(
      () =>
        setTypedAt((p) => {
          const n = p.tick === tick ? p.n : 0
          return n >= text.length ? p : { tick, n: n + 1 }
        }),
      step
    )
    return () => clearInterval(t)
  }, [text, tick, beat, still, visible, beats])

  const order = beats.map((b) => b.id)
  const at = (b: Id) => order.indexOf(b)
  const b = still ? at(stillAt) : beat

  return {
    root,
    still,
    /** The current beat, as an index; use `is`, `on` and `past` to test it. */
    b,
    is: (x: Id) => b === at(x),
    on: (x: Id) => b >= at(x),
    past: (x: Id) => b > at(x),
    /** Text being typed in this beat, and how much of it shows. */
    typing: still ? "" : text,
    typed: typedAt.tick === tick ? typedAt.n : 0,
  }
}
