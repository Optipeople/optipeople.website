"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

export interface LogoItem {
  name: string
  logoSrc: string
  href?: string
}

interface LogoWallProps {
  logos: LogoItem[]
  title?: string
  className?: string
}

export function LogoWall({
  logos,
  title,
  className,
}: LogoWallProps) {
  return (
    <section className={cn("py-12 lg:py-28", className)}>
      {/* On the shared `--edge` column, so the first and last logo in a row
          sit on the same left and right lines as the copy above and below.
          The wall used to run on its own max-w-7xl container, which put it
          38px outboard of everything else on a desktop screen. */}
      <div className="w-full px-[var(--edge)]">
        {/* Header - matching hero typography */}
        {title && (
          <h2 className="text-4xl lg:text-5xl font-normal text-foreground text-center">
            {title}
          </h2>
        )}

        {/* Logo grid, two rows of 7 on desktop. First/last in each row align to
            the container edges so the wall lines up with content above and below. */}
        <div
          className={cn(
            "grid grid-cols-3 items-center justify-items-center gap-6 sm:grid-cols-4 sm:gap-8 lg:grid-cols-7 lg:gap-10",
            "lg:[&>*:nth-child(7n+1)]:justify-self-start lg:[&>*:nth-child(7n)]:justify-self-end",
            title && "mt-16 lg:mt-20",
          )}
        >
          {logos.map((logo) => (
            <LogoImage key={logo.name} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoImage({ logo }: { logo: LogoItem }) {
  // Fluid up to the cap: a fixed 128px cell overflowed a three-across grid
  // on a 375px phone, where each column is only about 90px wide.
  const imageElement = (
    <div className="relative h-10 w-full max-w-32 opacity-50 transition-opacity duration-300 hover:opacity-80 sm:h-12 lg:h-14 lg:max-w-40">
      <Image
        src={logo.logoSrc}
        alt={logo.name}
        fill
        className="object-contain"
        sizes="(min-width: 1024px) 160px, (min-width: 640px) 128px, 30vw"
      />
    </div>
  )

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={logo.name}
        className="flex w-full justify-center"
      >
        {imageElement}
      </a>
    )
  }

  return imageElement
}
