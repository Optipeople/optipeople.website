/**
 * Post dates in the archives.
 *
 * Frontmatter stores ISO dates ("2025-01-20"). Printed raw they read as data
 * rather than as a published date, so the archives and hubs render them in the
 * reader's own locale instead.
 */
export function formatPostDate(date: string, locale: string = "en"): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    // Anything the Date constructor cannot read is shown as authored, so a
    // malformed frontmatter date never blanks out a card.
    return date
  }

  return new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed)
}

/** Year only, for the dense case-study rows where a full date is noise. */
export function formatPostYear(date: string): string {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime())
    ? date
    : String(parsed.getUTCFullYear())
}
