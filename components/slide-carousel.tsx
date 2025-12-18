"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

export type SlideData = {
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  primaryLabel: string
  primaryHref: string
  bgColor: string
  tab?: string // For tab navigation
}

export type NavigationType = "tabs" | "dots"

type SlideCarouselProps = {
  slides: SlideData[]
  navigationType: NavigationType
  ariaLabel: string
  className?: string
}

export function SlideCarousel({
  slides,
  navigationType,
  ariaLabel,
  className = "",
}: SlideCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const tabNavRef = useRef<HTMLDivElement | null>(null)
  const tabButtonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 })

  const tabIds = useMemo(
    () => slides.map((s, i) => `carousel-tab-${i}-${s.tab?.toLowerCase().replace(/\s+/g, "-") ?? i}`),
    [slides]
  )

  useEffect(() => {
    if (!api) return

    const updateCurrent = () => {
      const snapIndex = api.selectedScrollSnap()
      const actualIndex = Math.max(0, Math.min(snapIndex - 1, slides.length - 1))
      setCurrent(actualIndex)
    }

    updateCurrent()
    api.on("select", updateCurrent)
  }, [api, slides.length])

  const scrollTo = (index: number) => {
    api?.scrollTo(index + 1)
  }

  const updateTabIndicator = () => {
    const navEl = tabNavRef.current
    const btnEl = tabButtonRefs.current[current]
    if (!navEl || !btnEl) return

    const navRect = navEl.getBoundingClientRect()
    const btnRect = btnEl.getBoundingClientRect()

    setTabIndicator({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
    })
  }

  useLayoutEffect(() => {
    if (navigationType === "tabs") {
      updateTabIndicator()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, navigationType])

  useEffect(() => {
    if (navigationType !== "tabs") return

    updateTabIndicator()

    const navEl = tabNavRef.current
    if (!navEl) return

    const ro = new ResizeObserver(() => updateTabIndicator())
    ro.observe(navEl)
    window.addEventListener("resize", updateTabIndicator)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", updateTabIndicator)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigationType])

  const renderTabNavigation = () => {
    if (navigationType !== "tabs") return null

    return (
      <div className="mt-8 flex justify-center">
        <div
          ref={tabNavRef}
          className="relative inline-flex flex-wrap justify-center gap-2 
          bg-slate-100 rounded-full border-[5px] border-slate-100"
          role="tablist"
          aria-label={`${ariaLabel} navigation`}
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 rounded-full bg-primary transition-[transform,width] duration-300 ease-out pointer-events-none"
            style={{
              width: tabIndicator.width,
              transform: `translateX(${tabIndicator.left}px)`,
            }}
          />
          {slides.map((slide, index) => (
            <button
              key={slide.tab ?? index}
              onClick={() => scrollTo(index)}
              ref={(el) => {
                tabButtonRefs.current[index] = el
              }}
              id={tabIds[index]}
              role="tab"
              aria-selected={current === index}
              tabIndex={current === index ? 0 : -1}
              className={`cursor-pointer relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                current === index
                  ? "text-white"
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
              }`}
              aria-label={`Switch to ${slide.tab ?? slide.title}`}
            >
              {slide.tab ?? slide.title}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderDotsNavigation = () => {
    if (navigationType !== "dots") return null

    return (
      <div className="flex justify-center gap-2.5 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`cursor-pointer w-3 h-3 rounded-full transition-all ${
              current === index
                ? "bg-foreground w-10"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className={className}>
      {navigationType === "tabs" && renderTabNavigation()}

      <div className={navigationType === "tabs" ? "mt-10" : ""}>
        <Carousel
          setApi={setApi}
          opts={{
            loop: false,
            align: "center",
            slidesToScroll: 1,
            duration: 40,
            startIndex: 1,
          }}
          aria-label={ariaLabel}
        >
          <CarouselContent className="-ml-12">
            {/* Spacer slide at start for centering */}
            <CarouselItem
              className="pl-12 basis-[85%] sm:basis-[80%] lg:basis-[75%] flex-shrink-0"
              aria-hidden="true"
            >
              <div className="w-full" />
            </CarouselItem>

            {slides.map((slide, index) => (
              <CarouselItem
                key={slide.title}
                className="pl-12 basis-[85%] sm:basis-[80%] lg:basis-[75%] flex-shrink-0"
              >
                <div className="flex w-full justify-center">
                  <div
                    onClick={() => scrollTo(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") scrollTo(index)
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                    className={`relative h-[420px] sm:h-[460px] lg:h-[480px] w-full rounded-2xl ${slide.bgColor} cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                  >
                    <Card className="p-0 bg-white/0 border-none text-foreground shadow-none w-full h-full">
                      <CardContent className="h-full p-0">
                        <div className="grid h-full grid-cols-2 grid-rows-[2fr_1fr] gap-2">
                          {/* Title block */}
                           <div className="min-w-0 h-full bg-slate-100 rounded-xl p-6 flex flex-col justify-center">
                            <h3 className="text-5xl lg:text-5xl tracking-tight leading-[1.2] font-extralight">
                              {slide.title}
                            </h3>
                          </div>

                          {/* Image block (spans both rows) */}
                          <div className="relative row-span-2 overflow-hidden rounded-xl bg-slate-100 p-6">
                            <Image
                              src={slide.imageSrc ?? "/globe.svg"}
                              alt={slide.imageAlt ?? `${slide.title} illustration`}
                              fill
                              sizes="(min-width: 1024px) 40vw, 60vw"
                              className="object-contain p-10"
                              priority={index === 0}
                            />

                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                              <Button asChild variant="outline">
                                <Link
                                  href={slide.primaryHref}
                                  className="cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                  onKeyDown={(e) => e.stopPropagation()}
                                >
                                  {slide.primaryLabel}
                                </Link>
                              </Button>
                            </div>
                          </div>

                          {/* Subtitle block */}
                          <div className="min-w-0 h-full bg-slate-100 rounded-xl p-6 flex flex-col justify-center">
                            <p className="text-base text-foreground/80">
                              {slide.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CarouselItem>
            ))}

            {/* Spacer slide at end for centering */}
            <CarouselItem
              className="pl-12 basis-[85%] sm:basis-[80%] lg:basis-[75%] flex-shrink-0"
              aria-hidden="true"
            >
              <div className="w-full" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {navigationType === "dots" && renderDotsNavigation()}
    </section>
  )
}

