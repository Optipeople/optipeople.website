/**
 * How wide an image we ask the browser to fetch.
 *
 * By default next/image picks the variant that matches the layout box, which is
 * right for photographs: on a 1x display a 1140px box can only ever show 1140
 * pixels, so anything larger is wasted bytes.
 *
 * Product screenshots are the exception. They carry 8px type, 1px table rules,
 * and thin chart strokes, and we want those to survive browser zoom, high-DPI
 * screens, and anyone who saves the file to drop into a deck. So we ask for the
 * full source instead. `sizes` only ever steers which candidate the browser
 * picks, so overstating it here costs nothing but bandwidth, and AVIF keeps that
 * cheap: the 2941px OEE report lands at 66 KB against 890 KB for the source PNG.
 *
 * The optimizer never upscales, so this resolves to "the source at its native
 * width" whatever that happens to be.
 */
export const NATIVE_RESOLUTION = "3840px"

/**
 * Paths that hold product screenshots rather than photography. Everything under
 * /images/Mockups plus the loose report, dashboard, and app captures that
 * predate that folder.
 */
const SCREENSHOT_PATH =
  /\/images\/(Mockups\/|report|dashboard|backoffice|operatorpanel|taskapp|Telemetry|Stop-Screen|Start-Machine|Login-Machine|Everything-is-okay)/i

/**
 * Returns the `sizes` to hand next/image: native resolution for screenshots,
 * otherwise the box-matched value the layout actually needs.
 */
export function imageSizes(src: string, boxSizes: string): string {
  return SCREENSHOT_PATH.test(src) ? NATIVE_RESOLUTION : boxSizes
}
