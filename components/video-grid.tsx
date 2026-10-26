"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { useState } from "react"

import type { VideoData } from "@/components/video-carousel"

type VideoGridProps = {
  videos: VideoData[]
  playLabel: string
}

/**
 * Grid of landscape YouTube videos, the 16:9 sibling of RoleVideoGrid.
 *
 * Same idea as the Shorts grid: every video is visible at once, each card
 * shows the video's thumbnail with one play button, and the YouTube player
 * only loads when it is clicked.
 */
export function VideoGrid({ videos, playLabel }: VideoGridProps) {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
      {videos.map((video, index) => {
        const title = video.title ?? `Video ${index + 1}`
        return (
          <li key={video.videoId}>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_14px_36px_-20px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.08]">
              {playing === video.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0&autoplay=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(video.videoId)}
                  aria-label={`${playLabel}: ${title}`}
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
            {video.title && (
              <div className="mt-4">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-sm font-medium leading-snug tracking-tight text-foreground sm:text-base">
                    {video.title}
                  </h3>
                  {video.languageLabel && (
                    <span className="shrink-0 rounded-full border border-black/10 px-2.5 py-0.5 text-xs text-foreground/70">
                      {video.languageLabel}
                    </span>
                  )}
                </div>
                {video.description && (
                  <p className="mt-2 text-sm leading-relaxed text-foreground/72">
                    {video.description}
                  </p>
                )}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
