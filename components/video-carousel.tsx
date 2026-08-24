"use client"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export type VideoData = {
  videoId: string
  title?: string
  description?: string
  /** Spoken language of the video, shown as a small tag on the caption. */
  languageLabel?: string
}

type VideoCarouselProps = {
  videos: VideoData[]
  title?: string
  className?: string
}

// Shared layout tokens — keep this slider in lock-step with SlideCarousel:
// first card lines up with the max-w-6xl content column, then the track bleeds
// off the right edge of the viewport.
// Shared global slider inset (`--edge`, see globals.css) keeps this in lock-step
// with SlideCarousel: first card on the inset, cards bleed off both screen edges.
const COLUMN = "pl-[var(--edge)] pr-6 lg:pr-8"
// Arrow navigation column, right-anchored to the cards' right inset.
const ARROW_COLUMN = "pr-[var(--edge)] pl-6 lg:pl-8"
const VIDEO_ITEM = "basis-[88%] sm:basis-[70%] lg:basis-[55%]"
const VIEWPORT_INSET = "px-[var(--edge)]"

function extractYouTubeId(url: string): string {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  // If no pattern matches, assume it's already a video ID
  return url
}

export function VideoCarousel({
  videos,
  title,
  className = "",
}: VideoCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!api) return

    const updateState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateState()
    api.on("select", updateState)
    api.on("reInit", updateState)

    return () => {
      api.off("select", updateState)
    }
  }, [api])

  return (
    <section className={className}>
      {title && (
        <div className={`${COLUMN} mb-10`}>
          <h2 className="text-4xl lg:text-5xl font-light text-foreground">
            {title}
          </h2>
        </div>
      )}

      <div>
        <Carousel
          setApi={setApi}
          opts={{
            loop: false,
            align: "start",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            skipSnaps: true,
            duration: 18,
          }}
          aria-label="Video testimonials"
        >
          <CarouselContent className="-ml-6 select-none" viewportClassName={VIEWPORT_INSET}>
            {videos.map((video, index) => {
              const videoId = extractYouTubeId(video.videoId)

              return (
                <CarouselItem
                  key={videoId}
                  className={`pl-6 ${VIDEO_ITEM}`}
                >
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      title={video.title ?? `Video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>

                  {video.title && (
                    <div className="mt-5">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-lg font-medium text-foreground">
                          {video.title}
                        </h3>
                        {video.languageLabel && (
                          <span className="shrink-0 rounded-full border border-[var(--gray-2)] px-2 py-0.5 text-xs text-muted-foreground">
                            {video.languageLabel}
                          </span>
                        )}
                      </div>
                      {video.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {video.description}
                        </p>
                      )}
                    </div>
                  )}
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Navigation arrows — anchored to the content column's right edge */}
      <div className={`${ARROW_COLUMN} mt-8 flex items-center justify-end gap-3`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="cursor-pointer size-9 rounded-full border border-[var(--gray-2)] hover:bg-foreground/5"
          aria-label="Previous video"
        >
          <ChevronRight className="size-4 rotate-180" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="cursor-pointer size-9 rounded-full border border-[var(--gray-2)] hover:bg-foreground/5"
          aria-label="Next video"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </section>
  )
}
