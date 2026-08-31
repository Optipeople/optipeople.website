"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { LeadEmailForm } from "@/components/lead-email-form"
import { cn } from "@/lib/utils"

export type HeroModule = {
  /** Stable, locale-independent key. Matches an id in the module catalog. */
  id: string
  label: string
}

/**
 * The hero's module chips sitting directly above the lead form.
 *
 * Picking chips is the cheapest signal a visitor can give us, so the selection
 * rides along with the email into the Monday lead, sales knows what someone
 * came for before the first call. Everything stays optional: an empty selection
 * submits exactly like the plain form always did.
 *
 * Every chip carries a circle, empty until it's picked and then filled with a
 * check, so the row reads as a set of choices before anyone clicks. Keeping the
 * circle at a fixed size means a selection only changes colour, the chips never
 * shift or re-wrap under the cursor.
 */
export function HeroModulePicker({
  moduleRows,
  prompt,
  defaultSelectedIds,
  className,
}: {
  /**
   * Chips grouped into the rows they should render on. Rows are explicit
   * rather than left to natural wrapping: Danish labels run longer than
   * English, so one wrapping list breaks in a different place per locale and
   * the block stops reading as composed. Each row still wraps on narrow
   * screens, where the intended shape can't hold anyway.
   */
  moduleRows: HeroModule[][]
  /** Short line above the chips explaining what picking one does. */
  prompt: string
  /**
   * Module ids picked on load. Keep this short: anything pre-picked rides
   * along with every lead whose visitor never touched the chips, so it says
   * more about our default than about them.
   */
  defaultSelectedIds?: string[]
  className?: string
}) {
  const modules = moduleRows.flat()

  // Guard against an id that no longer appears in the rows.
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    modules
      .filter((module) => defaultSelectedIds?.includes(module.id))
      .map((module) => module.id)
  )

  const toggle = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]
    )

  // Sent in display order rather than click order, reads better in the note.
  const selectedLabels = modules
    .filter((module) => selectedIds.includes(module.id))
    .map((module) => module.label)

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="text-sm text-muted-foreground">{prompt}</p>

      <div
        role="group"
        aria-label={prompt}
        className="mt-4 flex flex-col items-center gap-2"
      >
        {moduleRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap justify-center gap-2">
            {row.map((module) => {
              const isSelected = selectedIds.includes(module.id)

              return (
                <button
                  key={module.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggle(module.id)}
                  className={cn(
                    "group inline-flex cursor-pointer items-center rounded-full border py-2 pl-3 pr-4 text-sm transition-colors duration-200 motion-reduce:transition-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-system)] focus-visible:ring-offset-2",
                    isSelected
                      ? "border-[var(--green-dark3)]/25 bg-[var(--green-light1)] font-medium text-[var(--green-dark3)]"
                      : "border-border/70 bg-white text-foreground/70 hover:border-border hover:bg-[var(--gray-1)] hover:text-foreground"
                  )}
                >
                  {/* Always present, so every chip reads as pickable and the row
                      keeps its widths when a selection changes. Idle it's an
                      empty ring; picked it fills and the check fades in. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mr-2 flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 motion-reduce:transition-none",
                      isSelected
                        ? "border-[var(--green-dark3)] bg-[var(--green-dark3)] text-white"
                        : "border-border/80 bg-white text-transparent group-hover:border-foreground/30"
                    )}
                  >
                    <Check className="h-2.5 w-2.5 shrink-0" strokeWidth={3.5} />
                  </span>
                  {module.label}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <LeadEmailForm className="mt-8 w-full max-w-md" modules={selectedLabels} />
    </div>
  )
}
