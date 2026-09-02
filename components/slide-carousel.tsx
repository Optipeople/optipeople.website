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
import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { CapabilityMockup } from "@/components/ai-stack-mockups"
import { ModuleMockup, type ModuleMockupSlug } from "@/components/module-mockups"
import type { AiCapabilitySlug } from "@/lib/ai-stack"

export type SlideLayout = "grid" | "overlay" | "vertical" | "ai"

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
  // "ai" layout only: colored card background + code-built product mockup
  cardColor?: string // Inline background color (hex) for the card
  textTone?: "light" | "dark" // Text/arrow tone over the card color
  mockup?: AiCapabilitySlug // Which capability mockup to render
  // "vertical" layout only: tints the photo gradient with an AI-palette color
  // instead of pure black (hex). See productSlideAccents in lib/ai-stack.
  accentColor?: string
  // "vertical" layout only: image sizing. Default keeps the photo in the lower
  // portion of the card; "fill" covers the whole card so the image bleeds edge
  // to edge (cropping as needed) regardless of aspect ratio.
  imageFit?: "cover" | "fill"
  // "vertical" layout only: which part of the image survives the crop. The card
  // is much taller than it is wide, so a wide screenshot loses a lot of its
  // sides; anchor it where the content that matters sits. Default "center".
  imagePosition?: "center" | "left" | "right" | "top"
  // "vertical" layout only: draw a code-built graphic instead of a screenshot.
  // Used for modules we have no presentable screen capture for. The card then
  // fills with `accentColor` and the graphic floats on it, the way the "ai"
  // layout cards do. Takes precedence over imageSrc.
  moduleMockup?: ModuleMockupSlug
}

// Tailwind needs whole class names, so the crop anchors are mapped rather than
// interpolated.
const OBJECT_POSITION: Record<
  NonNullable<SlideData["imagePosition"]>,
  string
> = {
  center: "object-center",
  left: "object-left",
  right: "object-right",
  top: "object-top",
}

// Build an rgba() string from a #rrggbb hex and an alpha, used to tint the
// vertical slide gradient with an AI-palette color.
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "")
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export type NavigationType = "tabs" | "dots" | "arrows" | ("tabs" | "dots" | "arrows")[]

type SlideCarouselProps = {
  slides: SlideData[]
  navigationType: NavigationType
  ariaLabel: string
  className?: string
  defaultLayout?: SlideLayout // Default layout if not specified per slide
  // Opt in to remembering the scroll position across navigations. Must be
  // unique per slider, it keys the sessionStorage entry.
  storageKey?: string
}

// ── Shared layout system (Langdock-style) ────────────────────────────────────
// Every homepage slider lines its first card up with the page's max-w-6xl
// content column, then bleeds off the right edge of the viewport. These tokens
// keep that geometry, and the gap, card height, and nav placement, identical
// across all sliders.
//
// The slider inset (`--edge`) is a global token (see globals.css). It is applied
// as padding on the carousel VIEWPORT, so the first card rests on the inset while
// cards still bleed off both screen edges as you navigate.
const VIEWPORT_INSET = "px-[var(--edge)]"
// Navigation/heading column, left-anchored to the same inset as the first card.
const COLUMN = "pl-[var(--edge)] pr-6 lg:pr-8"
// Arrow navigation column, right-anchored to the same inset as the cards' right edge.
const ARROW_COLUMN = "pr-[var(--edge)] pl-6 lg:pl-8"
// Narrow cards (feature + AI layouts) share a fixed width and peek the next.
const NARROW_ITEM = "basis-[88%] sm:basis-[420px] lg:basis-[380px]"
// Wide cards (overlay + grid): width is `100vw - 2*--edge`, which the `--edge`
// token caps at the centered 1200px column (see globals.css). With the viewport
// padded by `--edge` on both sides, the card sits centered on that same column.
const WIDE_ITEM = "basis-[90%] lg:basis-[calc(100vw-var(--edge)*2)]"

// ── Slider position memory ─────────────────────────────────────────────────
// Opening a card leaves the page, and coming back remounts the slider, which
// would otherwise start over on the first card. A slider given a `storageKey`
// remembers its snap index for the tab session and opens on it again, so
// "scroll to EMS, open EMS, press back" lands on EMS rather than on Dashboard.
const POSITION_KEY_PREFIX = "optipeople:slider:"

function readSliderPosition(
  storageKey: string | undefined,
  lastIndex: number
): number {
  // This runs during render, but the value only ever feeds embla's startIndex,
  // never the markup, so the server (no sessionStorage) and the hydrating
  // client are free to disagree on it.
  if (!storageKey || typeof window === "undefined") return 0
  try {
    const stored = Number(
      window.sessionStorage.getItem(POSITION_KEY_PREFIX + storageKey)
    )
    if (!Number.isInteger(stored)) return 0
    // The slide count can change between visits, and a narrower window trims
    // snaps off the end, so never trust a stored index blindly.
    return Math.min(Math.max(stored, 0), Math.max(lastIndex, 0))
  } catch {
    return 0 // Storage blocked (private mode, cookie settings).
  }
}

function writeSliderPosition(storageKey: string, index: number): void {
  try {
    window.sessionStorage.setItem(
      POSITION_KEY_PREFIX + storageKey,
      String(index)
    )
  } catch {
    // Position memory is a nicety, a blocked write is not worth surfacing.
  }
}

export function SlideCarousel({
  slides,
  navigationType,
  ariaLabel,
  className = "",
  defaultLayout = "grid",
  storageKey,
}: SlideCarouselProps) {
  // Read once per mount: a later render must not yank the slider backwards.
  const [startIndex] = useState(() =>
    readSliderPosition(storageKey, slides.length - 1)
  )
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

  const tabIds = useMemo(
    () => slides.map((s, i) => `carousel-tab-${i}-${s.tab?.toLowerCase().replace(/\s+/g, "-") ?? i}`),
    [slides]
  )

  useEffect(() => {
    if (!api) return

    const updateCurrent = () => {
      const snapIndex = api.selectedScrollSnap()
      setCurrent(Math.max(0, Math.min(snapIndex, slides.length - 1)))
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      if (storageKey) writeSliderPosition(storageKey, snapIndex)
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
  }, [api, slides.length, storageKey])

  const scrollTo = (index: number, fromTabClick = false) => {
    isTabClickRef.current = fromTabClick
    api?.scrollTo(index)
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
          rounded-full border-[5px] border-muted bg-muted
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
              className="absolute left-0 top-0 bottom-0 rounded-full bg-primary transition-[transform,width] duration-200 ease-out pointer-events-none"
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
                    : "text-foreground/82 hover:text-foreground hover:bg-foreground/5"
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
      <div className={`${COLUMN} mt-8 flex gap-2.5`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`cursor-pointer h-3 rounded-full transition-all ${
              current === index
                ? "bg-foreground w-10"
                : "w-3 bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    )
  }

  const renderArrows = () => {
    if (!hasArrows) return null

    return (
      <div className={`${ARROW_COLUMN} mt-8 flex items-center justify-end gap-3`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="cursor-pointer size-9 rounded-full border border-[var(--gray-2)] hover:bg-foreground/5"
          aria-label="Previous slide"
        >
          <ChevronRight className="size-4 rotate-180" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="cursor-pointer size-9 rounded-full border border-[var(--gray-2)] hover:bg-foreground/5"
          aria-label="Next slide"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    )
  }

  return (
    <section className={className}>
      {hasTabs && renderTabNavigation()}

      <div className={hasTabs ? "mt-10" : ""}>
        <Carousel
          setApi={setApi}
          opts={{
            loop: false,
            align: "start",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            skipSnaps: true,
            duration: 18,
            startIndex,
          }}
          aria-label={ariaLabel}
        >
          <CarouselContent className="-ml-6 select-none" viewportClassName={VIEWPORT_INSET}>
            {slides.map((slide, index) => {
              const layout = slide.layout ?? defaultLayout
              const isVertical = layout === "vertical"
              const isAi = layout === "ai"
              const isNarrow = isVertical || isAi
              // Vertical slide that draws its visual in code instead of using a
              // screenshot. The accent colour becomes the card fill.
              const isDrawnVertical = isVertical && Boolean(slide.moduleMockup)

              const itemBasisClass = isNarrow ? NARROW_ITEM : WIDE_ITEM

              return (
                <CarouselItem
                  key={slide.title}
                  className={`pl-6 ${itemBasisClass}`}
                >
                  <div
                    onClick={() => scrollTo(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") scrollTo(index)
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                    style={
                      isAi
                        ? { backgroundColor: slide.cardColor }
                        : isDrawnVertical
                          ? { backgroundColor: slide.accentColor }
                          : undefined
                    }
                    className={`relative h-[600px] w-full rounded-2xl overflow-hidden ${isVertical || isAi ? "" : slide.bgColor} cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]`}
                  >
                    <Card className="p-0 bg-white/0 border-none text-foreground shadow-none w-full h-full">
                      <CardContent className="h-full p-0">
                        {layout === "grid" ? (
                          <div className="grid h-full grid-cols-2 grid-rows-[2fr_1fr] gap-2">
                            {/* Title block */}
                            <div className="min-w-0 h-full bg-slate-100 rounded-2xl p-6 flex flex-col justify-center">
                              <h3 className="text-5xl lg:text-5xl tracking-tight leading-[1.2] font-normal">
                                {slide.title}
                              </h3>
                            </div>

                            {/* Image block (spans both rows) */}
                            <div className="relative row-span-2 overflow-hidden rounded-2xl bg-slate-100 p-6">
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
                            <div className="min-w-0 h-full bg-slate-100 rounded-2xl p-6 flex flex-col justify-center">
                              <p className="text-base text-foreground/88">
                                {slide.description}
                              </p>
                            </div>
                          </div>
                        ) : layout === "overlay" ? (
                          /* Overlay layout */
                          <div className="relative h-full w-full overflow-hidden rounded-2xl">
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

                            {/* Colour overlay. The left-to-right mask is a
                                wide-card device: it only clears the image on
                                the right, where there is no copy. On a phone
                                the copy column is 85% of a 330px card, so the
                                headline ran into the cleared area and sat on
                                the bright screenshot. Below `sm` the wash
                                covers the whole card instead. */}
                            {slide.overlay !== "none" && (
                              <>
                                <div
                                  className={`absolute inset-0 sm:hidden ${
                                    slide.overlay === "light"
                                      ? "bg-white/92"
                                      : "bg-black/82"
                                  }`}
                                />
                                <div
                                  className="absolute inset-0 hidden sm:block"
                                  style={{
                                    maskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 95%)',
                                    WebkitMaskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 95%)',
                                  }}
                                >
                                  <div className={`absolute inset-0 ${slide.overlay === "light" ? "bg-white/90" : "bg-black/80"}`} />
                                </div>
                              </>
                            )}

                            {/* Content overlay */}
                            <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-12 lg:p-20 max-w-[85%] sm:max-w-[60%]">
                              <h3 className={`text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.2] font-normal mb-3 sm:mb-4 ${slide.overlay === "light" ? "text-black" : "text-white"}`}>
                                {slide.title}
                              </h3>
                              <p className={`text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 ${slide.overlay === "light" ? "text-black/88" : "text-white/95"}`}>
                                {slide.description}
                              </p>
                              <div>
                                {/* Allowed to wrap: on a phone the label is
                                    longer than the 85% column and a nowrap
                                    button ran under the card's clipped edge. */}
                                <Button
                                  asChild
                                  variant="green"
                                  className="h-auto min-h-11 max-w-full whitespace-normal py-2.5 text-left"
                                >
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
                        ) : layout === "vertical" ? (
                          /* Vertical layout */
                          <div className="absolute inset-0 text-white">
                            {slide.moduleMockup ? (
                              /* Code-built graphic instead of a screenshot. It
                                 floats on the accent fill and runs off the
                                 bottom edge, the same crop the "ai" cards use,
                                 then dissolves back into the card colour so the
                                 arrow button stays readable over it. The mockups
                                 are sized against the `top-[36%]` start, see the
                                 note in components/module-mockups.tsx. */
                              (() => {
                                const tint = slide.accentColor ?? "#000000"
                                return (
                                  <>
                                    {/* Slight lift at the top so the flat fill
                                        does not read as dead space */}
                                    <div
                                      className="absolute inset-0 pointer-events-none"
                                      style={{
                                        background:
                                          slide.textTone === "dark"
                                            ? "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 45%)"
                                            : "linear-gradient(to bottom, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 45%)",
                                      }}
                                    />
                                    <div
                                      className="pointer-events-none absolute inset-x-7 top-[36%]"
                                      style={
                                        {
                                          "--mockup-shadow":
                                            slide.textTone === "dark"
                                              ? "rgba(0,0,0,0.14)"
                                              : "rgba(0,0,0,0.38)",
                                        } as CSSProperties & Record<string, string>
                                      }
                                    >
                                      <ModuleMockup slug={slide.moduleMockup} />
                                    </div>
                                    <div
                                      className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
                                      style={{
                                        background: `linear-gradient(to bottom, ${hexToRgba(tint, 0)} 0%, ${hexToRgba(tint, 0.45)} 50%, ${hexToRgba(tint, 0.92)} 80%, ${hexToRgba(tint, 1)} 100%)`,
                                      }}
                                    />
                                  </>
                                )
                              })()
                            ) : (
                              <>
                                {/* Background image. Default photos sit in the lower
                                    portion of the card; "fill" slides cover the whole
                                    card so the image bleeds edge to edge regardless of
                                    aspect ratio (cropping as needed). */}
                                <div className={slide.imageFit === "fill" ? "absolute inset-0" : "absolute inset-0 top-[30%]"}>
                                  <Image
                                    src={slide.imageSrc ?? "/globe.svg"}
                                    alt={slide.imageAlt ?? `${slide.title} illustration`}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, 40vw"
                                    className={`object-cover ${OBJECT_POSITION[slide.imagePosition ?? "center"]}`}
                                    priority={index === 0}
                                  />
                                </div>

                                {/* Gradient overlay - fades image towards top, tinted
                                    with the slide's AI-palette accent (falls back to black) */}
                                {(() => {
                                  const tint = slide.accentColor ?? "#000000"
                                  return (
                                    <div
                                      className="absolute inset-0 pointer-events-none"
                                      style={{
                                        background: `linear-gradient(to bottom, ${hexToRgba(tint, 1)} 0%, ${hexToRgba(tint, 0.98)} 25%, ${hexToRgba(tint, 0.7)} 50%, ${hexToRgba(tint, 0.3)} 75%, ${hexToRgba(tint, 0)} 100%)`,
                                      }}
                                    />
                                  )
                                })()}
                              </>
                            )}

                            {/* Content overlay, AI-slide typographic hierarchy:
                                prominent feature title + quieter supporting line */}
                            <div className="relative z-10 h-full flex flex-col">
                              <div className="px-7 pt-7">
                                <h3
                                  className={`text-2xl font-medium tracking-tight ${
                                    slide.textTone === "dark"
                                      ? "text-slate-900"
                                      : "text-white"
                                  }`}
                                >
                                  {slide.title}
                                </h3>
                                <p
                                  className={`mt-2 max-w-[18rem] text-sm leading-relaxed ${
                                    slide.textTone === "dark"
                                      ? "text-slate-900/70"
                                      : "text-white/82"
                                  }`}
                                >
                                  {slide.description}
                                </p>
                              </div>

                              {/* Spacer to push button to bottom */}
                              <div className="flex-1" />
                            </div>

                            {/* Angle-right icon button, AI-slide soft ring style */}
                            <Link
                              href={slide.primaryHref}
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => e.stopPropagation()}
                              aria-label={slide.primaryLabel}
                              className={`absolute bottom-6 right-6 z-10 inline-flex size-10 items-center justify-center rounded-full shadow-lg ring-1 transition-transform hover:scale-105 ${
                                slide.textTone === "dark"
                                  ? "bg-slate-900 text-white ring-white/10"
                                  : "bg-white text-slate-900 ring-black/5"
                              }`}
                            >
                              <ChevronRight className="size-5" />
                            </Link>
                          </div>
                        ) : (
                          /* AI capability layout */
                          <div className="absolute inset-0">
                            <div className="relative z-10 p-7">
                              <h3
                                className={`text-2xl font-medium tracking-tight ${
                                  slide.textTone === "light"
                                    ? "text-white"
                                    : "text-slate-900"
                                }`}
                              >
                                {slide.title}
                              </h3>
                              <p
                                className={`mt-2 max-w-[15rem] text-sm leading-relaxed ${
                                  slide.textTone === "light"
                                    ? "text-white/82"
                                    : "text-slate-600"
                                }`}
                              >
                                {slide.description}
                              </p>
                              <Link
                                href={slide.primaryHref}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                aria-label={slide.primaryLabel}
                                className={`mt-5 inline-flex size-9 items-center justify-center rounded-full ring-1 transition-colors ${
                                  slide.textTone === "light"
                                    ? "bg-white/10 text-white ring-white/20 hover:bg-white/20"
                                    : "bg-black/5 text-slate-900 ring-black/10 hover:bg-black/10"
                                }`}
                              >
                                <ChevronRight className="size-4" />
                              </Link>
                            </div>

                            {/* Floating product mockup, cropped at the card's bottom edge */}
                            {slide.mockup && (
                              <div className="pointer-events-none absolute inset-x-7 top-[46%]">
                                <CapabilityMockup slug={slide.mockup} />
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {renderArrows()}
      {renderDotsNavigation()}
    </section>
  )
}
