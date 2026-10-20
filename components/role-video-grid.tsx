"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { useState } from "react"

export type RoleVideo = { videoId: string; title: string }

type RoleVideoGridProps = {
  videos: RoleVideo[]
  playLabel: string
}

/**
 * Grid of vertical YouTube Shorts.
 *
 * Each card shows the Short's own 9:16 thumbnail with one play button, and
 * only swaps in the YouTube player on click. Loading twelve players up front
 * made the cards look different from each other (some showed the title bar,
 * some the Shorts logo, some the channel badge, depending on how far each
 * player had loaded), and cost a dozen iframes on page load.
 */
export function RoleVideoGrid({ videos, playLabel }: RoleVideoGridProps) {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12">
      {videos.map((video) => (
        <li key={video.videoId}>
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] ring-1 ring-black/[0.08]">
            {playing === video.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}?rel=0&autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(video.videoId)}
                aria-label={`${playLabel}: ${video.title}`}
                className="group absolute inset-0 h-full w-full cursor-pointer"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${video.videoId}/oardefault.jpg`}
                  alt=""
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
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
          <h3 className="mt-4 text-sm font-medium leading-snug tracking-tight text-foreground sm:text-base">
            {video.title}
          </h3>
        </li>
      ))}
    </ul>
  )
}
