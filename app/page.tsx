"use client"

import { SlideCarousel, type SlideData } from "@/components/slide-carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const tabSlides: SlideData[] = [
  {
    tab: "Manufacturing companies",
    title: "Manufacturing companies",
    description:
      "Connect production, quality, maintenance, and energy into one operational view. Get real time insight from the shopfloor and turn it into better planning, higher efficiency, and stable operations.",
    imageSrc: "/window.svg",
    imageAlt: "Manufacturing operations illustration",
    primaryLabel: "Explore manufacturing solutions",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-blue-50/0",
  },
  {
    tab: "OEMs and machine builders",
    title: "OEMs and machine builders",
    description:
      "Connect machines in the field, enable data driven aftersales, and support customers proactively. From machine monitoring to service workflows and long term performance insight.",
    imageSrc: "/globe.svg",
    imageAlt: "Connected machines illustration",
    primaryLabel: "Explore OEM and aftersales solutions",
    primaryHref: "/modules/ai-solutions",
    bgColor: "bg-blue-50/0",
  },
  {
    tab: "Service and aftermarket teams",
    title: "Service and aftermarket teams",
    description:
      "Monitor assets, prevent downtime, and deliver proactive service across customers and sites. One platform for visibility, tasks, and documentation.",
    imageSrc: "/file.svg",
    imageAlt: "Service documentation illustration",
    primaryLabel: "Explore service solutions",
    primaryHref: "/services",
    bgColor: "bg-blue-50/0",
  },
]

const slides: SlideData[] = [
  {
    title: "Digital Platform for Smart Operations",
    description:
      "A full-stack layer for planning, execution, and real-time insight—built for industrial teams that can't afford downtime.",
    imageSrc: "/window.svg",
    imageAlt: "Smart operations illustration",
    primaryLabel: "Talk to us",
    primaryHref: "/#contact",
    bgColor: "bg-blue-50/0",
  },
  {
    title: "From signals to actions—fast",
    description:
      "Turn operational data into practical recommendations with guardrails, traceability, and performance you can trust.",
    imageSrc: "/globe.svg",
    imageAlt: "Signals to actions illustration",
    primaryLabel: "See AI solutions",
    primaryHref: "/modules/ai-solutions",
    bgColor: "bg-blue-50/0",
  },
  {
    title: "Design, deploy, and scale workflows",
    description:
      "Automate repetitive tasks without sacrificing quality—so teams ship improvements continuously, not quarterly.",
    imageSrc: "/file.svg",
    imageAlt: "Workflow automation illustration",
    primaryLabel: "Explore automation",
    primaryHref: "/modules/automation",
    bgColor: "bg-blue-50/0",
  },
]

export default function Home() {
  return (
    <main>
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-5xl px-4 lg:px-6 xl:px-8">
          <h1 className="text-3xl lg:text-6xl font-light text-foreground text-center">
            Digital Operations Platform
          </h1>
          <p className="mt-6 text-xl text-foreground/70 text-center">
            One platform for production, performance, and connected operations.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <Button asChild variant="outline">
              <Link href="/modules/smart-operations" className="cursor-pointer">
                See how it works
              </Link>
            </Button>
          </div>
        </div>

        <SlideCarousel
          slides={tabSlides}
          navigationType="tabs"
          ariaLabel="Team solutions"
          className="mt-8"
        />
      </section>

      <SlideCarousel
        slides={slides}
        navigationType="dots"
        ariaLabel="Homepage highlights"
        className="py-20"
      />
    </main>
  )
}
