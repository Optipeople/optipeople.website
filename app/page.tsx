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
    layout: "overlay",
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
    layout: "overlay",
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
    layout: "overlay",
  },
]

const verticalSlides: SlideData[] = [
  {
    title: "Real-time monitoring",
    description: "Track operations and performance metrics in real-time across all your systems.",
    imageSrc: "/window.svg",
    imageAlt: "Real-time monitoring illustration",
    primaryLabel: "Learn more about monitoring",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "AI-powered insights",
    description: "Leverage artificial intelligence to predict issues and optimize operations.",
    imageSrc: "/globe.svg",
    imageAlt: "AI insights illustration",
    primaryLabel: "Explore AI solutions",
    primaryHref: "/modules/ai-solutions",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Automated workflows",
    description: "Streamline processes with intelligent automation and workflow management.",
    imageSrc: "/file.svg",
    imageAlt: "Automation illustration",
    primaryLabel: "Discover automation",
    primaryHref: "/modules/automation",
    bgColor: "bg-black",
    layout: "vertical",
  },
]

export default function Home() {
  return (
    <main>
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-5xl px-4 lg:px-6 xl:px-8 xl:py-22">
          <h1 className="text-3xl lg:text-6xl font-light text-foreground text-center">
            Digital Operations Platform
          </h1>
          <p className="mt-6 text-xl text-foreground/70 text-center">
            One platform for production, performance, and connected operations.
          </p>
          {/*
          <div className="mt-6 flex items-center justify-center">
            <Button asChild variant="outline">
              <Link href="/modules/smart-operations" className="cursor-pointer">
                See how it works
              </Link>
            </Button>
          </div>
          */}
        </div>

        <SlideCarousel
          slides={tabSlides}
          navigationType={["tabs", "dots"]}
          ariaLabel="Team solutions"
          className="mt-8"
        />
      </section>

      <section className="py-12 lg:py-16">
        <SlideCarousel
          slides={verticalSlides}
          navigationType={["arrows"]}
          ariaLabel="Platform features"
          className="mt-8"
        />
      </section>

    </main>
  )
}
