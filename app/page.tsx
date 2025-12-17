"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

const tabSlides = [
  {
    tab: "Projects",
    eyebrow: "Smart operations, made simple",
    title: "Digital Platform for Smart Operations",
    description:
      "A full-stack layer for planning, execution, and real-time insight—built for industrial teams that can't afford downtime.",
    primaryLabel: "Talk to us",
    primaryHref: "/#contact",
    secondaryLabel: "Explore modules",
    secondaryHref: "/modules/smart-operations",
    bgColor: "bg-slate-100",
  },
  {
    tab: "Sales",
    eyebrow: "AI-powered decisions",
    title: "From signals to actions—fast",
    description:
      "Turn operational data into practical recommendations with guardrails, traceability, and performance you can trust.",
    primaryLabel: "See AI solutions",
    primaryHref: "/modules/ai-solutions",
    secondaryLabel: "Our services",
    secondaryHref: "/services",
    bgColor: "bg-blue-50",
  },
  {
    tab: "Marketing",
    eyebrow: "Automation that sticks",
    title: "Design, deploy, and scale workflows",
    description:
      "Automate repetitive tasks without sacrificing quality—so teams ship improvements continuously, not quarterly.",
    primaryLabel: "Explore automation",
    primaryHref: "/modules/automation",
    secondaryLabel: "About Optipeople",
    secondaryHref: "/about",
    bgColor: "bg-emerald-50",
  },
  {
    tab: "IT & Ops",
    eyebrow: "Enterprise-grade infrastructure",
    title: "Scale with confidence",
    description:
      "Robust infrastructure and operations management that grows with your business needs.",
    primaryLabel: "Learn more",
    primaryHref: "/services",
    secondaryLabel: "Contact us",
    secondaryHref: "/#contact",
    bgColor: "bg-purple-50",
  },
] as const

const slides = [
  {
    eyebrow: "Smart operations, made simple",
    title: "Digital Platform for Smart Operations",
    description:
      "A full-stack layer for planning, execution, and real-time insight—built for industrial teams that can't afford downtime.",
    primaryLabel: "Talk to us",
    primaryHref: "/#contact",
    secondaryLabel: "Explore modules",
    secondaryHref: "/modules/smart-operations",
    bgColor: "bg-slate-100",
  },
  {
    eyebrow: "AI-powered decisions",
    title: "From signals to actions—fast",
    description:
      "Turn operational data into practical recommendations with guardrails, traceability, and performance you can trust.",
    primaryLabel: "See AI solutions",
    primaryHref: "/modules/ai-solutions",
    secondaryLabel: "Our services",
    secondaryHref: "/services",
    bgColor: "bg-blue-50",
  },
  {
    eyebrow: "Automation that sticks",
    title: "Design, deploy, and scale workflows",
    description:
      "Automate repetitive tasks without sacrificing quality—so teams ship improvements continuously, not quarterly.",
    primaryLabel: "Explore automation",
    primaryHref: "/modules/automation",
    secondaryLabel: "About Optipeople",
    secondaryHref: "/about",
    bgColor: "bg-emerald-50",
  },
] as const

export default function Home() {
  const [tabApi, setTabApi] = useState<CarouselApi>()
  const [tabCurrent, setTabCurrent] = useState(0)
  const tabNavRef = useRef<HTMLDivElement | null>(null)
  const tabButtonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 })

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const tabIds = useMemo(
    () => tabSlides.map((s) => `home-team-tab-${s.tab.toLowerCase().replace(/\s+/g, "-")}`),
    []
  )

  useEffect(() => {
    if (!tabApi) return

    const updateCurrent = () => {
      const snapIndex = tabApi.selectedScrollSnap()
      const actualIndex = Math.max(0, Math.min(snapIndex - 1, tabSlides.length - 1))
      setTabCurrent(actualIndex)
    }

    updateCurrent()
    tabApi.on("select", updateCurrent)
  }, [tabApi])

  const scrollTabTo = (index: number) => {
    tabApi?.scrollTo(index + 1)
  }

  const updateTabIndicator = () => {
    const navEl = tabNavRef.current
    const btnEl = tabButtonRefs.current[tabCurrent]
    if (!navEl || !btnEl) return

    const navRect = navEl.getBoundingClientRect()
    const btnRect = btnEl.getBoundingClientRect()

    setTabIndicator({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
    })
  }

  useLayoutEffect(() => {
    updateTabIndicator()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabCurrent])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (!api) return

    const updateCurrent = () => {
      const snapIndex = api.selectedScrollSnap()
      const actualIndex = Math.max(0, Math.min(snapIndex - 1, slides.length - 1))
      setCurrent(actualIndex)
    }

    updateCurrent()
    api.on("select", updateCurrent)
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index + 1)
  }

  return (
    <main>
      {/* Tab-navigated slider above the fold */}
      <section className="h-screen pt-[4.75rem]">
        <Carousel
          className="h-full"
          setApi={setTabApi}
          opts={{
            loop: false,
            align: "center",
            slidesToScroll: 1,
            duration: 40,
            startIndex: 1,
          }}
          aria-label="Team solutions"
        >
          <CarouselContent className="h-full -ml-2">
            {/* Spacer slide at start for centering */}
            <CarouselItem
              className="h-screen pl-2 basis-[85%] sm:basis-[80%] lg:basis-[75%] flex-shrink-0"
              aria-hidden="true"
            >
              <div className="h-full w-full" />
            </CarouselItem>

            {tabSlides.map((slide, index) => (
              <CarouselItem
                key={slide.tab}
                className="h-screen pl-2 basis-[85%] sm:basis-[80%] lg:basis-[75%] flex-shrink-0"
              >
                <div className="flex h-full w-full items-end justify-center pb-32 lg:pb-40 xl:pb-64 px-4 lg:px-6 xl:px-8">
                  <div
                    onClick={() => scrollTabTo(index)}
                    className={`relative h-[50vh] w-full rounded-2xl ${slide.bgColor} cursor-pointer transition-opacity hover:opacity-90`}
                  >
                    <Card className="bg-white/0 border-none text-foreground shadow-none w-full h-full">
                      <CardContent className="h-full flex flex-col px-6 lg:px-8 pt-6">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1">
                            <h1 className="text-5xl tracking-tight leading-[0.92] font-extralight">
                              {slide.title}
                            </h1>
                            <p className="mt-4 text-md max-w-2xl">
                              {slide.description}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <Button variant="outline">
                              <a href={slide.primaryHref} className="cursor-pointer">
                                {slide.primaryLabel}
                              </a>
                            </Button>
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
              className="h-screen pl-2 basis-[85%] sm:basis-[80%] lg:basis-[75%] flex-shrink-0"
              aria-hidden="true"
            >
              <div className="h-full w-full" />
            </CarouselItem>
          </CarouselContent>

          {/* Tab navigation (only navigation difference from the original slider) */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 lg:px-6 xl:px-8 z-10">
            <h2 className="text-3xl lg:text-6xl font-light text-foreground text-center">
              Digital Operations Platform
            </h2>
            <p className="mt-10 text-xl text-foreground/70 text-center">
              One platform for planning, execution, and real-time operational insight.
            </p>
          </div>

          {/* Tab nav attached to the slider (positioned above the card) */}
          <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 lg:px-6 xl:px-8 z-10 bottom-[calc(8rem+50vh+1.25rem)] lg:bottom-[calc(10rem+50vh+1.25rem)] xl:bottom-[calc(16rem+50vh+1.25rem)]">
            <div
              ref={tabNavRef}
              className="relative flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Team solutions navigation"
            >
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 rounded-full bg-purple-600 transition-[transform,width] duration-300 ease-out pointer-events-none"
                style={{
                  width: tabIndicator.width,
                  transform: `translateX(${tabIndicator.left}px)`,
                }}
              />
              {tabSlides.map((slide, index) => (
                <button
                  key={slide.tab}
                  onClick={() => scrollTabTo(index)}
                  ref={(el) => {
                    tabButtonRefs.current[index] = el
                  }}
                  id={tabIds[index]}
                  role="tab"
                  aria-selected={tabCurrent === index}
                  tabIndex={tabCurrent === index ? 0 : -1}
                  className={`cursor-pointer relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    tabCurrent === index
                      ? "text-white"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  }`}
                  aria-label={`Switch to ${slide.tab}`}
                >
                  {slide.tab}
                </button>
              ))}
            </div>
          </div>
        </Carousel>
      </section>

      {/* Original slider moved further down */}
      <section className="h-screen pt-[4.75rem]">
        <Carousel
          className="h-full"
          setApi={setApi}
          opts={{ 
            loop: false,
            align: "center",
            slidesToScroll: 1,
            duration: 40,
            startIndex: 1,
          }}
          aria-label="Homepage highlights"
        >
          <CarouselContent className="h-full -ml-2">
            {/* Spacer slide at start for centering */}
            <CarouselItem className="h-screen pl-2 basis-[85%] sm:basis-[80%] lg:basis-[75%] flex-shrink-0" aria-hidden="true">
              <div className="h-full w-full" />
            </CarouselItem>
            
            {slides.map((slide, index) => (
              <CarouselItem key={slide.title} className="h-screen pl-2 basis-[85%] sm:basis-[80%] lg:basis-[75%] flex-shrink-0">
                <div className="flex h-full w-full items-end justify-center pb-32 lg:pb-40 xl:pb-64 px-4 lg:px-6 xl:px-8">
                  <div 
                    onClick={() => scrollTo(index)}
                    className={`relative h-[50vh] w-full rounded-2xl ${slide.bgColor} cursor-pointer transition-opacity hover:opacity-90`}
                  >
                    <Card className="bg-white/0 border-none text-foreground shadow-none w-full h-full">
                      <CardContent className="h-full flex flex-col px-6 lg:px-8 pt-6">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1">
                            <h1 className="text-5xl tracking-tight leading-[0.92] font-extralight">
                              {slide.title}
                            </h1>
                            <p className="mt-4 text-md max-w-2xl">
                              {slide.description}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <Button variant="outline">
                              <a
                                href={slide.primaryHref}
                                className="cursor-pointer"
                              >
                                {slide.primaryLabel}
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CarouselItem>
            ))}
            
            {/* Spacer slide at end for centering */}
            <CarouselItem className="h-screen pl-2 basis-[85%] sm:basis-[80%] lg:basis-[75%] flex-shrink-0" aria-hidden="true">
              <div className="h-full w-full" />
            </CarouselItem>
          </CarouselContent>
          
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
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
        </Carousel>
      </section>
    </main>
  )
}
