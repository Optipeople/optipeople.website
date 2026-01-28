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
      <div className="mx-auto w-full max-w-5xl px-8">
        {/* Header - matching hero typography */}
        {title && (
          <h2 className="text-4xl lg:text-5xl font-light text-foreground text-center">
            {title}
          </h2>
        )}

        {/* Logo grid */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 items-center justify-items-center">
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
    <div className="relative h-16 w-52 lg:h-20 lg:w-64 opacity-50 hover:opacity-80 transition-opacity duration-300">
      <Image
        src={logo.logoSrc}
        alt={logo.name}
        fill
        className="object-contain"
        sizes="(max-width: 1024px) 208px, 256px"
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
