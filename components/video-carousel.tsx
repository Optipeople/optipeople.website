"use client"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
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
      const snapIndex = api.selectedScrollSnap()
      // Spacer is at index 0, first video at index 1, last video at index videos.length
      // Don't allow scrolling to spacers
      setCanScrollPrev(snapIndex > 1)
      setCanScrollNext(snapIndex < videos.length)
    }

    updateState()
    api.on("select", updateState)
    api.on("reInit", updateState)

    return () => {
      api.off("select", updateState)
    }
  }, [api, videos.length])

  // Scroll to first real slide on load
  useEffect(() => {
    if (!api) return

    let hasScrolled = false

    const scrollToFirst = () => {
      if (hasScrolled) return
      const currentIndex = api.selectedScrollSnap()
      if (currentIndex === 0) {
        api.scrollTo(1, true)
        hasScrolled = true
      }
    }

    requestAnimationFrame(scrollToFirst)
    const timeoutId = setTimeout(scrollToFirst, 50)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index + 1)
  }

  return (
    <section className={className}>
      {title && (
        <div className="mx-auto max-w-5xl px-8 mb-10">
          <h2 className="text-4xl lg:text-5xl font-light text-foreground text-center">
            {title}
          </h2>
        </div>
      )}

      <Carousel
        setApi={setApi}
        opts={{
          loop: false,
          align: "center",
          startIndex: 1,
          slidesToScroll: 1,
          duration: 40,
        }}
        aria-label="Video testimonials"
      >
        <CarouselContent className="-ml-6">
          {/* Spacer slide at start for centering */}
          <CarouselItem
            className="pl-6 basis-[90%] lg:basis-[55%] flex-shrink-0"
            aria-hidden="true"
          >
            <div className="w-full" />
          </CarouselItem>

          {videos.map((video, index) => {
            const videoId = extractYouTubeId(video.videoId)

            return (
              <CarouselItem
                key={videoId}
                className="pl-6 basis-[90%] lg:basis-[55%] flex-shrink-0"
              >
                <div
                  onClick={() => scrollTo(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") scrollTo(index)
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Video ${index + 1}${video.title ? `: ${video.title}` : ""}`}
                  className="cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="relative w-full aspect-video rounded-4xl overflow-hidden bg-black border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      title={video.title ?? `Video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              </CarouselItem>
            )
          })}

          {/* Spacer slide at end for centering */}
          <CarouselItem
            className="pl-6 basis-[90%] lg:basis-[55%] flex-shrink-0"
            aria-hidden="true"
          >
            <div className="w-full" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Navigation arrows */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="cursor-pointer size-8 rounded-full hover:bg-foreground/10"
          aria-label="Previous video"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-foreground"
          >
            <path
              d="M10 12L6 8L10 4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="cursor-pointer size-8 rounded-full hover:bg-foreground/10"
          aria-label="Next video"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-foreground"
          >
            <path
              d="M6 4L10 8L6 12"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

    </section>
  )
}
