"use client"

import { SlideCarousel, type SlideData } from "@/components/slide-carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const tabSlides: SlideData[] = [
  {
    tab: "Manufacturing companies",
    title: "Real-Time Production Intelligence for Manufacturers",
    description:
      "See what’s happening on your factory floor in real time. Opticloud turns machine and process data into actionable insights so you can cut downtime, boost throughput, and increase overall equipment efficiency — without guesswork.",
    imageSrc: "/window.svg",
    imageAlt: "Manufacturing operations illustration",
    primaryLabel: "Explore manufacturing solutions",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-blue-50/0",
    layout: "overlay",
  },
  {
    tab: "OEMs and machine builders",
    title: "Empower Your Machines With Data-Driven Value",
    description:
      "Give your customers more than hardware. With OptiPeople, OEMs unlock performance data, predictive insights, and advanced analytics that improve uptime, enable service innovation, and open new business models around your products.",
    imageSrc: "/globe.svg",
    imageAlt: "Connected machines illustration",
    primaryLabel: "Learn About OEM Benefits",
    primaryHref: "/modules/ai-solutions",
    bgColor: "bg-blue-50/0",
    layout: "overlay",
  },
  {
    tab: "Service and aftermarket teams",
    title: "Smarter Service Through Intelligent Insights",
    description:
      "Turn service and aftermarket into growth engines. Equip your team with real-time health, usage, and efficiency metrics so you can deliver proactive support, optimize maintenance, and drive long-term customer value.",
    imageSrc: "/file.svg",
    imageAlt: "Service documentation illustration",
    primaryLabel: "Optimize Your Service Ops",
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
  {
    title: "Data integration",
    description: "Connect all your systems and data sources into one unified platform.",
    imageSrc: "/globe.svg",
    imageAlt: "Data integration illustration",
    primaryLabel: "Learn about integrations",
    primaryHref: "/services",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Analytics & reporting",
    description: "Turn raw data into actionable insights with customizable dashboards and reports.",
    imageSrc: "/window.svg",
    imageAlt: "Analytics illustration",
    primaryLabel: "Explore analytics",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Predictive maintenance",
    description: "Prevent equipment failures before they happen with machine learning models.",
    imageSrc: "/file.svg",
    imageAlt: "Predictive maintenance illustration",
    primaryLabel: "Learn more",
    primaryHref: "/modules/ai-solutions",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Energy optimization",
    description: "Connect energy data with production to identify waste and reduce consumption.",
    imageSrc: "/globe.svg",
    imageAlt: "Energy optimization illustration",
    primaryLabel: "Optimize energy",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Quality management",
    description: "Track quality metrics, detect deviations early, and trace root causes across production.",
    imageSrc: "/window.svg",
    imageAlt: "Quality management illustration",
    primaryLabel: "Improve quality",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Remote monitoring",
    description: "Monitor assets and operations from anywhere with secure cloud connectivity.",
    imageSrc: "/file.svg",
    imageAlt: "Remote monitoring illustration",
    primaryLabel: "Go remote",
    primaryHref: "/services",
    bgColor: "bg-black",
    layout: "vertical",
  },
]

export default function Home() {
  return (
    <main>
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-5xl px-8 py-22">
          <h1 className="text-6xl font-light text-foreground text-center">
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

      <section className="py-12 lg:py-28">
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
