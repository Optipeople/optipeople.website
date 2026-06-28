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
            duration: 40,
          }}
          aria-label="Video testimonials"
        >
          <CarouselContent className="-ml-6" viewportClassName={VIEWPORT_INSET}>
            {videos.map((video, index) => {
              const videoId = extractYouTubeId(video.videoId)

              return (
                <CarouselItem
                  key={videoId}
                  className={`pl-6 ${VIDEO_ITEM}`}
                >
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      title={video.title ?? `Video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Navigation arrows — anchored to the content column's left edge */}
      <div className={`${COLUMN} mt-8 flex items-center gap-3`}>
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
