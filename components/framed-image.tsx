import Image from "next/image"

import { imageSizes } from "@/lib/image-delivery"
import { imageSize } from "@/lib/image-size"

/**
 * A picture in a mount that hugs it.
 *
 * Every screenshot on this site used to sit in a fixed-ratio box under
 * `object-cover`: the layout picked 4/3 or 16/9 and the picture was cropped to
 * fit. Visitors read that as an image cut in half rather than as a crop, and on
 * the portrait captures it very nearly was, the 393x1364 task app in a 4/3 box
 * showed about a fifth of the screen.
 *
 * So the mount takes its shape from the picture. `aspect-ratio` comes from the
 * file itself (see lib/image-size.ts), the box fills its column, and `--frame-cap`
 * stops there: past that height the mount narrows instead of growing, so a
 * portrait capture cannot push the rest of the section down the page. Nothing is
 * ever cropped, and because the mount is exactly the shape of the picture there
 * are no letterbox bars either.
 *
 * The known ratio also reserves the right box before the bytes arrive, so
 * nothing shifts as the page loads.
 */
export function FramedImage({
  src,
  alt,
  boxSizes,
  cap,
  className = "",
  priority = false,
  decorative = false,
}: {
  src: string
  alt: string
  /**
   * The width the layout gives this picture, for picking a variant. Screenshots
   * override it with the native resolution; see lib/image-delivery.ts.
   */
  boxSizes: string
  /**
   * Classes setting `--frame-cap`, the tallest the mount may get, e.g.
   * `[--frame-cap:20rem] lg:[--frame-cap:26rem]`. Responsive because a phone
   * column and a 1140px column want very different ceilings.
   */
  cap: string
  /** Mount styling: radius, ground, shadow, ring, and how it sits in its column. */
  className?: string
  priority?: boolean
  /** Decoration beside copy that already says the same thing, so no alt text. */
  decorative?: boolean
}) {
  const size = imageSize(src)

  // Spread on the Image below, minus `alt`, which stays written out so the
  // a11y lint rule can see it.
  const image = {
    src,
    "aria-hidden": decorative || undefined,
    fill: true as const,
    sizes: imageSizes(src, boxSizes),
    priority,
  }
  const altText = decorative ? "" : alt

  // No readable header: a format we do not parse, or a path that has moved.
  // Fall back to a fixed ratio and contain, so the worst case is bars rather
  // than the crop this component exists to avoid.
  if (!size) {
    return (
      <div className={`relative aspect-[16/9] w-full ${className}`}>
        <Image {...image} alt={altText} className="object-contain" />
      </div>
    )
  }

  return (
    <div
      className={`relative w-full ${cap} ${className}`}
      style={{
        aspectRatio: `${size.width} / ${size.height}`,
        // Fill the column until the mount would pass the cap, then stop.
        maxWidth: `calc(var(--frame-cap, 32rem) * ${size.width / size.height})`,
      }}
    >
      {/* The box is the picture's own ratio, so cover crops nothing; it just
          absorbs the sub-pixel rounding that contain would show as a hairline
          of the mount's ground. */}
      <Image {...image} alt={altText} className="object-cover" />
    </div>
  )
}
