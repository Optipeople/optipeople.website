import "server-only"

import { readFileSync } from "node:fs"
import path from "node:path"

export type ImageSize = { width: number; height: number }

/**
 * The intrinsic pixel size of an image in /public.
 *
 * Picture frames on this site take their shape from the picture rather than the
 * other way round, so they have to know that shape before they render. See
 * components/framed-image.tsx for why they work that way.
 *
 * Content references images by path, not by static import, so next/image never
 * learns the size on its own and we read it out of the file header: a fixed
 * offset for a PNG, a short walk over the segment table for a JPEG. Every page
 * that draws a frame is prerendered, so this runs at build time, and the cache
 * holds it to one read per file per build.
 *
 * Returns null for anything it cannot parse, and the frame falls back to a
 * fixed ratio rather than breaking the page.
 */
export function imageSize(src: string): ImageSize | null {
  const cached = cache.get(src)
  if (cached !== undefined) return cached
  const size = read(src)
  cache.set(src, size)
  return size
}

const cache = new Map<string, ImageSize | null>()

function read(src: string): ImageSize | null {
  // Public paths only, and nothing that climbs out of the folder.
  if (!src.startsWith("/") || src.includes("..")) return null

  let file: Buffer
  try {
    // The whole file, because a JPEG can carry an arbitrarily large EXIF
    // thumbnail ahead of the frame header. These are all under a megabyte and
    // this runs once per file at build time.
    file = readFileSync(
      path.join(process.cwd(), "public", decodeURIComponent(src))
    )
  } catch {
    return null
  }

  return png(file) ?? jpeg(file)
}

const PNG_SIGNATURE = "89504e470d0a1a0a"

/** IHDR is always the first chunk, so width and height sit at a fixed offset. */
function png(file: Buffer): ImageSize | null {
  if (file.length < 24) return null
  if (file.subarray(0, 8).toString("hex") !== PNG_SIGNATURE) return null
  return { width: file.readUInt32BE(16), height: file.readUInt32BE(20) }
}

/** Start-of-frame markers, the segments that carry the size. */
const SOF = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
])

/** Markers that stand alone rather than introducing a length-prefixed segment. */
const STANDALONE = new Set([0x01, 0xd0, 0xd1, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7])

function jpeg(file: Buffer): ImageSize | null {
  if (file.length < 4 || file.readUInt16BE(0) !== 0xffd8) return null

  let i = 2
  while (i + 9 < file.length) {
    if (file[i] !== 0xff) {
      i++
      continue
    }
    // A marker may be padded with any number of extra 0xff bytes.
    while (file[i + 1] === 0xff) i++

    const marker = file[i + 1]
    if (SOF.has(marker)) {
      return { height: file.readUInt16BE(i + 5), width: file.readUInt16BE(i + 7) }
    }
    // Scan data starts here, so the size was never declared.
    if (marker === 0xda || marker === 0xd9) return null
    i += STANDALONE.has(marker) ? 2 : 2 + file.readUInt16BE(i + 2)
  }

  return null
}
