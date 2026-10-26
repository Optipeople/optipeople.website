/** A showcase row on a Data Platform page: a real screenshot beside its claim. */
export type ReplayShowcase = { title: string; body: string; image: string; alt: string }

/**
 * Everything a page needs from one product replay, per locale: the replay's
 * own copy (`demo`, shaped by its component), the sentence screen readers get
 * instead of the animation, and the showcase rows that follow it.
 */
export type ReplayContent<Demo> = {
  /** One sentence describing what the replay shows, for screen readers. */
  label: string
  demo: Demo
  showcaseTitle: string
  showcases: ReplayShowcase[]
}

export type ReplaySlug =
  | "platform"
  | "mes"
  | "production"
  | "erp-shopfloor"
  | "planning"
  | "quality"
  | "maintenance"
  | "energy"
  | "iot"
  | "documents"
