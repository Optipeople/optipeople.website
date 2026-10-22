"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { useState } from "react"

type CaseVideoProps = {
  videoId: string
  title: string
  /** Poster shown until the video is played; falls back to the YouTube thumbnail. */
  poster?: string
  playLabel: string
}

/**
 * Lead video on a case told on film. Sits in the same floating 16:9 frame as
 * the lead image, and like VideoGrid only loads the YouTube player on click.
 */
export function CaseVideo({ videoId, title, poster, playLabel }: CaseVideoProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-black shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.08]">
      {playing ? (
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
          onClick={() => setPlaying(true)}
          aria-label={`${playLabel}: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            fill
            unoptimized={!poster}
            sizes="(min-width: 1024px) 1140px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-colors group-hover:bg-white lg:h-20 lg:w-20">
              <Play className="ml-1 h-7 w-7 fill-current lg:h-8 lg:w-8" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
