"use client"

import { useState } from "react"

import { ShortVideo } from "@/components/short-video"

export type RoleVideo = { videoId: string; title: string }

type RoleVideoGridProps = {
  videos: RoleVideo[]
  playLabel: string
}

/** Grid of vertical YouTube Shorts, one playing at a time. */
export function RoleVideoGrid({ videos, playLabel }: RoleVideoGridProps) {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12">
      {videos.map((video) => (
        <li key={video.videoId}>
          <ShortVideo
            videoId={video.videoId}
            title={video.title}
            playLabel={playLabel}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            playing={playing === video.videoId}
            onPlay={() => setPlaying(video.videoId)}
          />
          <h3 className="mt-4 text-sm font-medium leading-snug tracking-tight text-foreground sm:text-base">
            {video.title}
          </h3>
        </li>
      ))}
    </ul>
  )
}
