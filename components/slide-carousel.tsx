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
import { ChevronRight } from "lucide-react"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

export type SlideLayout = "grid" | "overlay" | "vertical"

export type SlideData = {
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  primaryLabel: string
  primaryHref: string
  bgColor: string
  tab?: string // For tab navigation
  layout?: SlideLayout // Layout type for this slide
}

export type NavigationType = "tabs" | "dots" | "arrows" | ("tabs" | "dots" | "arrows")[]

type SlideCarouselProps = {
  slides: SlideData[]
  navigationType: NavigationType
  ariaLabel: string
  className?: string
  defaultLayout?: SlideLayout // Default layout if not specified per slide
}

export function SlideCarousel({
  slides,
  navigationType,
  ariaLabel,
  className = "",
  defaultLayout = "grid",
}: SlideCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const tabNavRef = useRef<HTMLDivElement | null>(null)
  const tabButtonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 })

  // Normalize navigationType to array
  const navigationTypes = Array.isArray(navigationType) 
    ? navigationType 
    : [navigationType]
  const hasTabs = navigationTypes.includes("tabs")
  const hasDots = navigationTypes.includes("dots")
  const hasArrows = navigationTypes.includes("arrows")
  
  // Check if any slide uses vertical layout
  const hasVerticalLayout = useMemo(
    () => slides.some((slide) => (slide.layout ?? defaultLayout) === "vertical"),
    [slides, defaultLayout]
  )

  const tabIds = useMemo(
    () => slides.map((s, i) => `carousel-tab-${i}-${s.tab?.toLowerCase().replace(/\s+/g, "-") ?? i}`),
    [slides]
  )

  useEffect(() => {
    if (!api) return

    const updateCurrent = () => {
      const snapIndex = api.selectedScrollSnap()
      const actualIndex = Math.max(
        0,
        Math.min(snapIndex - 1, slides.length - 1)
      )
      setCurrent(actualIndex)
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateCurrent()
    api.on("select", updateCurrent)
    api.on("reInit", updateCurrent)
  }, [api, slides.length])

  // Ensure first slide is centered on initial load
  useEffect(() => {
    if (!api) return

    let hasScrolled = false

    const scrollToFirst = () => {
      if (hasScrolled) return
      // Scroll to first actual slide (index 1, after spacer) to center it
      const currentIndex = api.selectedScrollSnap()
      if (currentIndex === 0) {
        api.scrollTo(1, true)
        hasScrolled = true
      }
    }

    // Wait for carousel to be ready and dimensions calculated
    const handleReInit = () => {
      requestAnimationFrame(() => {
        scrollToFirst()
      })
    }

    // Try immediately
    requestAnimationFrame(scrollToFirst)

    // Also try after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(scrollToFirst, 50)

    // Listen for reInit events
    api.on("reInit", handleReInit)

    return () => {
      clearTimeout(timeoutId)
      api.off("reInit", handleReInit)
    }
  }, [api])

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
    if (hasTabs) {
      updateTabIndicator()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, hasTabs])

  useEffect(() => {
    if (!hasTabs) return

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
  }, [hasTabs])

  const renderTabNavigation = () => {
    if (!hasTabs) return null

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
    if (!hasDots) return null

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

  const verticalItemClass =
    "basis-[70%] sm:basis-[60%] lg:basis-[25%] max-w-[320px]"
  const verticalSpacerClass =
    "basis-[15%] sm:basis-[20%] lg:basis-[12.5%]"
  const defaultItemClass = "basis-[85%] sm:basis-[80%] lg:basis-[75%]"

  return (
    <section className={className}>
      {hasTabs && renderTabNavigation()}

      <div className={hasTabs ? "mt-10" : ""}>
        <Carousel
          setApi={setApi}
          opts={{
            loop: false,
            align: "center",
            startIndex: 1,
            slidesToScroll: 1,
            duration: 40,
          }}
          aria-label={ariaLabel}
        >
          <CarouselContent className="-ml-12">
            {/* Spacer slide at start for centering */}
            <CarouselItem
              className={`pl-12 ${hasVerticalLayout ? verticalSpacerClass : defaultItemClass} flex-shrink-0`}
              aria-hidden="true"
            >
              <div className="w-full" />
            </CarouselItem>

            {slides.map((slide, index) => {
              const layout = slide.layout ?? defaultLayout
              const isVertical = layout === "vertical"
              
              const itemBasisClass = isVertical ? verticalItemClass : defaultItemClass

              return (
                <CarouselItem
                  key={slide.title}
                  className={`pl-12 ${itemBasisClass} flex-shrink-0`}
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
                      className={`relative ${isVertical ? "aspect-[9/16] w-full max-h-[600px]" : "aspect-[3/2] max-h-[600px]"} w-full rounded-4xl ${slide.bgColor} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                    >
                      <Card className="p-0 bg-white/0 border-none text-foreground shadow-none w-full h-full">
                        <CardContent className="h-full p-0">
                          {layout === "grid" ? (
                            <div className="grid h-full grid-cols-2 grid-rows-[2fr_1fr] gap-2">
                              {/* Title block */}
                              <div className="min-w-0 h-full bg-slate-100 rounded-4xl p-6 flex flex-col justify-center">
                                <h3 className="text-5xl lg:text-5xl tracking-tight leading-[1.2] font-extralight">
                                  {slide.title}
                                </h3>
                              </div>

                              {/* Image block (spans both rows) */}
                              <div className="relative row-span-2 overflow-hidden rounded-4xl bg-slate-100 p-6">
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
                              <div className="min-w-0 h-full bg-slate-100 rounded-4xl p-6 flex flex-col justify-center">
                                <p className="text-base text-foreground/80">
                                  {slide.description}
                                </p>
                              </div>
                            </div>
                          ) : layout === "overlay" ? (
                            /* Overlay layout */
                            <div className="relative h-full w-full overflow-hidden rounded-4xl">
                              {/* Background image */}
                              <Image
                                src={slide.imageSrc ?? "/globe.svg"}
                                alt={slide.imageAlt ?? `${slide.title} illustration`}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority={index === 0}
                              />
                              
                              {/* Overlay gradient for text readability */}
                              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                              
                              {/* Content overlay */}
                              <div className="relative z-10 h-full flex flex-col justify-center p-12 lg:p-20">
                                <h3 className="text-4xl lg:text-5xl tracking-tight leading-[1.2] font-extralight text-white mb-4">
                                  {slide.title}
                                </h3>
                                <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl">
                                  {slide.description}
                                </p>
                                <div>
                                  <Button asChild variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
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
                            </div>
                          ) : (
                            /* Vertical layout */
                            <div className="relative h-full w-full overflow-hidden rounded-4xl bg-black text-white flex flex-col">
                              {/* Title */}
                              <div className="px-6 pt-6 pb-2">
                                <h3 className="text-sm font-medium text-white/90 uppercase tracking-wide">
                                  {slide.title}
                                </h3>
                              </div>
                              
                              {/* Description */}
                              <div className="px-6 pb-4 flex-1">
                                <p className="text-xl lg:text-2xl font-light leading-tight">
                                  {slide.description}
                                </p>
                              </div>
                              
                              {/* Image */}
                              <div className="relative flex-1 min-h-[200px] px-6 pb-6">
                                <Image
                                  src={slide.imageSrc ?? "/globe.svg"}
                                  alt={slide.imageAlt ?? `${slide.title} illustration`}
                                  fill
                                  sizes="(min-width: 1024px) 25vw, 40vw"
                                  className="object-contain"
                                  priority={index === 0}
                                />
                              </div>
                              
                              {/* Angle-right icon button */}
                              <div className="absolute bottom-6 right-6">
                                <Button
                                  asChild
                                  size="icon"
                                  variant="outline"
                                  className="cursor-pointer rounded-full bg-black border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Link
                                    href={slide.primaryHref}
                                    className="cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    aria-label={slide.primaryLabel}
                                  >
                                    <ChevronRight className="size-5" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}

            {/* Spacer slide at end for centering */}
            <CarouselItem
              className={`pl-12 ${hasVerticalLayout ? verticalSpacerClass : defaultItemClass} flex-shrink-0`}
              aria-hidden="true"
            >
              <div className="w-full" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {/* Navigation arrows */}
      {hasArrows && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className="cursor-pointer size-8 rounded-full hover:bg-foreground/10"
            aria-label="Previous slide"
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
            aria-label="Next slide"
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
      )}

      {hasDots && renderDotsNavigation()}
    </section>
  )
}

