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
  overlay?: "dark" | "light" | "none" // Overlay style (default: "dark")
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
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 })
  const isTabClickRef = useRef(false) // Track if navigation came from tab click

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
    
    // Reset tab click flag when carousel settles
    const onSettle = () => {
      isTabClickRef.current = false
    }
    api.on("settle", onSettle)

    return () => {
      api.off("select", updateCurrent)
      api.off("settle", onSettle)
    }
  }, [api, slides.length])

  // Ensure first slide is centered on initial load (only for non-vertical layouts)
  useEffect(() => {
    if (!api || hasVerticalLayout) return

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
  }, [api, hasVerticalLayout])

  // For vertical layouts on mobile, scroll to first real slide (skip spacer)
  useEffect(() => {
    if (!api || !hasVerticalLayout) return

    const isMobile = window.matchMedia("(max-width: 1023px)").matches
    if (!isMobile) return

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
  }, [api, hasVerticalLayout])

  const scrollTo = (index: number, fromTabClick = false) => {
    isTabClickRef.current = fromTabClick
    api?.scrollTo(index + 1)
  }

  const updateTabIndicator = () => {
    const btnEl = tabButtonRefs.current[current]
    if (!btnEl) return

    // Use offsetLeft/offsetWidth which are relative to the offset parent (inner wrapper)
    // This works correctly regardless of scroll position
    setTabIndicator({
      left: btnEl.offsetLeft,
      width: btnEl.offsetWidth,
    })
  }

  useLayoutEffect(() => {
    if (hasTabs) {
      const btnEl = tabButtonRefs.current[current]
      const navEl = tabNavRef.current
      const indicatorEl = indicatorRef.current
      const wasTabClick = isTabClickRef.current
      
      if (btnEl && navEl && indicatorEl) {
        updateTabIndicator()
        
        // Scroll active tab into view (center it)
        const navRect = navEl.getBoundingClientRect()
        const btnRect = btnEl.getBoundingClientRect()
        const scrollLeft = navEl.scrollLeft
        const btnLeftRelative = btnRect.left - navRect.left + scrollLeft
        const btnCenter = btnLeftRelative + btnRect.width / 2
        const navCenter = navEl.clientWidth / 2
        navEl.scrollTo({
          left: btnCenter - navCenter,
          behavior: wasTabClick ? "smooth" : "instant",
        })
      } else {
        updateTabIndicator()
      }
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
      <div className="mt-8 flex justify-center px-4">
        <div
          ref={tabNavRef}
          className="inline-flex
          bg-slate-100 rounded-full border-[5px] border-slate-100
          overflow-x-auto max-w-full
          scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={`${ariaLabel} navigation`}
        >
          {/* Inner wrapper positions indicator relative to content, not scroll viewport */}
          <div className="relative inline-flex gap-2">
            <div
              ref={indicatorRef}
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
                onClick={() => scrollTo(index, true)}
                ref={(el) => {
                  tabButtonRefs.current[index] = el
                }}
                id={tabIds[index]}
                role="tab"
                aria-selected={current === index}
                tabIndex={current === index ? 0 : -1}
                className={`cursor-pointer relative z-10 px-4 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
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
    "basis-[95%] lg:basis-[380px] shrink-0"
  const verticalSpacerClass =
    "basis-[95%] lg:basis-[22.5%] shrink-0"
  const defaultItemClass = "basis-[95%] lg:basis-[55%]"

  return (
    <section className={className}>
      {hasTabs && renderTabNavigation()}

      <div className={hasTabs ? "mt-10" : ""}>
        <Carousel
          setApi={setApi}
          opts={{
            loop: false,
            align: "center",
            startIndex: hasVerticalLayout ? 0 : 1,
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
                      className={`relative h-[600px] w-full rounded-4xl mb-5 overflow-hidden ${isVertical ? "" : slide.bgColor} cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]`}
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
                              {/* Background image - sharp (visible on right) */}
                              <Image
                                src={slide.imageSrc ?? "/globe.svg"}
                                alt={slide.imageAlt ?? `${slide.title} illustration`}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority={index === 0}
                              />
                              
                              {/* Blurred layer with gradient mask (fades left to right) */}
                              <div 
                                className="absolute inset-0 overflow-hidden"
                                style={{
                                  maskImage: 'linear-gradient(to right, black 0%, black 15%, transparent 60%)',
                                  WebkitMaskImage: 'linear-gradient(to right, black 0%, black 15%, transparent 70%)',
                                }}
                              >
                                <div className="absolute -inset-4">
                                  <Image
                                    src={slide.imageSrc ?? "/globe.svg"}
                                    alt=""
                                    fill
                                    sizes="100vw"
                                    className="object-cover blur-md"
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                              
                              {/* Color overlay (conditionally rendered) */}
                              {slide.overlay !== "none" && (
                                <div 
                                  className="absolute inset-0"
                                  style={{
                                    maskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 95%)',
                                    WebkitMaskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 95%)',
                                  }}
                                >
                                  <div className={`absolute inset-0 ${slide.overlay === "light" ? "bg-white/90" : "bg-black/80"}`} />
                                </div>
                              )}
                              
                              {/* Content overlay */}
                              <div className="relative z-10 h-full flex flex-col justify-center p-12 lg:p-20 max-w-[60%]">
                                <h3 className={`text-4xl lg:text-5xl tracking-tight leading-[1.2] font-extralight mb-4 ${slide.overlay === "light" ? "text-black" : "text-white"}`}>
                                  {slide.title}
                                </h3>
                                <p className={`text-lg lg:text-xl mb-8 ${slide.overlay === "light" ? "text-black/80" : "text-white/90"}`}>
                                  {slide.description}
                                </p>
                                <div>
                                  <Button asChild variant="green" className={slide.overlay === "light" ? "" : ""}>
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
                            <div className="absolute inset-0 text-white">
                              {/* Background image - fills container, positioned below bottom to push image down */}
                              <div className="absolute inset-0 top-[30%]">
                                <Image
                                  src={slide.imageSrc ?? "/globe.svg"}
                                  alt={slide.imageAlt ?? `${slide.title} illustration`}
                                  fill
                                  sizes="(min-width: 1024px) 25vw, 40vw"
                                  className="object-cover object-top"
                                  priority={index === 0}
                                />
                              </div>
                              
                              {/* Gradient overlay - fades image towards top */}
                              <div 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 25%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0) 100%)',
                                }}
                              />
                              
                              {/* Content overlay */}
                              <div className="relative z-10 h-full flex flex-col">
                                {/* Title */}
                                <div className="px-6 pt-6 pb-2">
                                  <h3 className="text-sm font-medium text-white/90 uppercase tracking-wide">
                                    {slide.title}
                                  </h3>
                                </div>
                                
                                {/* Description */}
                                <div className="px-6 pb-4">
                                  <p className="text-xl lg:text-2xl font-light leading-tight">
                                    {slide.description}
                                  </p>
                                </div>
                                
                                {/* Spacer to push button to bottom */}
                                <div className="flex-1" />
                              </div>
                              
                              {/* Angle-right icon button */}
                              <div className="absolute bottom-6 right-6 z-10">
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

