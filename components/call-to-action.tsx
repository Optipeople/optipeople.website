import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CallToActionProps {
  title: string
  description?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
  variant?: "default" | "dark"
  className?: string
}

export function CallToAction({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = "default",
  className,
}: CallToActionProps) {
  return (
    <section
      className={cn(
        // No top margin: this is a full-bleed band with its own padding, so a
        // margin would only open a stray white stripe under pages that end on
        // a coloured section.
        "py-16 lg:py-24",
        variant === "default" && "bg-foreground/[0.02]",
        variant === "dark" && "bg-foreground text-background",
        className
      )}
    >
      <div className="mx-auto w-full max-w-3xl px-8 text-center">
        <h2
          className={cn(
            "text-3xl lg:text-4xl font-normal tracking-tight",
            variant === "default" && "text-foreground",
            variant === "dark" && "text-background"
          )}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              "mt-4 text-lg",
              variant === "default" && "text-foreground/82",
              variant === "dark" && "text-background/70"
            )}
          >
            {description}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            variant={variant === "dark" ? "secondary" : "default"}
            size="lg"
          >
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          {secondaryLabel && secondaryHref && (
            <Button
              asChild
              variant={variant === "dark" ? "ghost" : "outline"}
              size="lg"
              className={variant === "dark" ? "text-background hover:text-background hover:bg-background/10" : ""}
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
