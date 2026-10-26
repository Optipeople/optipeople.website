"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { useState } from "react"

type ShortVideoProps = {
  videoId: string
  title: string
  playLabel: string
  sizes: string
  /** Controlled mode, for grids that should only play one Short at a time. */
  playing?: boolean
  onPlay?: () => void
}

/**
 * One vertical YouTube Short.
 *
 * Shows the Short's own 9:16 thumbnail with a play button, and only swaps in
 * the YouTube player on click. Loading the players up front made the cards
 * look different from each other (title bar, Shorts logo or channel badge,
 * depending on how far each player had loaded) and cost an iframe per video.
 */
export function ShortVideo({
  videoId,
  title,
  playLabel,
  sizes,
  playing,
  onPlay,
}: ShortVideoProps) {
  const [ownPlaying, setOwnPlaying] = useState(false)
  const isPlaying = playing ?? ownPlaying

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-[0_14px_36px_-20px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.08]">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => (onPlay ? onPlay() : setOwnPlaying(true))}
          aria-label={`${playLabel}: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/oardefault.jpg`}
            alt=""
            fill
            unoptimized
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-colors group-hover:bg-white">
              <Play className="ml-0.5 h-6 w-6 fill-current" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
