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
      <div className="mx-auto w-full max-w-7xl px-8">
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
            "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-10 items-center justify-items-center",
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
  const imageElement = (
    <div className="relative h-12 w-32 lg:h-14 lg:w-40 opacity-50 hover:opacity-80 transition-opacity duration-300">
      <Image
        src={logo.logoSrc}
        alt={logo.name}
        fill
        className="object-contain"
        sizes="(max-width: 1024px) 128px, 160px"
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
      >
        {imageElement}
      </a>
    )
  }

  return imageElement
}
