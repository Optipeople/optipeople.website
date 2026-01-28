"use client"

import { SlideCarousel, type SlideData } from "@/components/slide-carousel"
import { LogoWall, type LogoItem } from "@/components/logo-wall"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const tabSlides: SlideData[] = [
  {
    tab: "Manufacturing companies",
    title: "Know Your Factory. In Real Time.",
    description:
      "OptiPeople connects machines, processes, and people into one live operational view. See bottlenecks as they happen, act faster, and run production with facts instead of gut feeling.",
    imageSrc: "/images/dashboard2.png",
    imageAlt: "Opticloud manufacturing dashboard",
    primaryLabel: "Explore manufacturing solutions",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-blue-50/0",
    layout: "overlay",
    overlay: "dark",
  },
  {
    tab: "OEMs and machine builders",
    title: "Turn Machines Into Platforms",
    description:
      "Opticloud lets you ship connected machines with built-in insight. Monitor performance in the field, support customers proactively, and build recurring digital services on top of your equipment.",
    imageSrc: "/images/report1.png",
    imageAlt: "Connected machines illustration",
    primaryLabel: "Learn About OEM Benefits",
    primaryHref: "/modules/ai-solutions",
    bgColor: "bg-blue-50/0",
    layout: "overlay",
    overlay: "light",
  },
  {
    tab: "Service and aftermarket teams",
    title: "Fix Problems Before Customers Feel Them",
    description:
      "Give service teams real visibility into machine health and usage. Plan maintenance, reduce firefighting, and turn service into a competitive advantage.",
    imageSrc: "/images/backoffice1.png",
    imageAlt: "Service documentation illustration",
    primaryLabel: "Optimize Your Service Ops",
    primaryHref: "/services",
    bgColor: "bg-blue-50/0",
    layout: "overlay",
    overlay: "light",
  },
]

const verticalSlides: SlideData[] = [
  {
    title: "Production Efficiency",
    description:
      "See where production time is lost and why. Track OEE live and understand performance across shifts, lines, and machines based on real production data.",
    imageSrc: "/images/report-mockup4.png",
    imageAlt: "Production efficiency and OEE dashboard",
    primaryLabel: "See production efficiency",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Stop Cause Registration",
    description:
      "Make downtime visible at the source. Operators register stops directly at the machine, giving you clean data you can actually act on.",
    imageSrc: "/images/Stop-Screen-Select.png",
    imageAlt: "Stop cause registration screen",
    primaryLabel: "View stop registration",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Maintenance and Tasks",
    description:
      "Plan and execute preventive maintenance based on usage and condition. Assign tasks, track completion, and reduce unplanned downtime.",
    imageSrc: "/images/taskapp2.png",
    imageAlt: "Maintenance task overview",
    primaryLabel: "Explore maintenance",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Quality Management",
    description:
      "Register quality data where it happens. Trace deviations back to machines, batches, and shifts and build accountability into production.",
    imageSrc: "/images/backoffice1.png",
    imageAlt: "Quality tracking and traceability",
    primaryLabel: "Improve quality",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Analysis and Reporting",
    description:
      "Turn production data into clear reports on performance, losses, and cost drivers without spreadsheets or manual work.",
    imageSrc: "/images/report-mockup1.png",
    imageAlt: "Production reporting and analysis",
    primaryLabel: "See reporting",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Energy and Telemetry",
    description:
      "Connect energy, vibration, flow, and temperature directly to production. Identify waste, anomalies, and optimization opportunities.",
    imageSrc: "/images/report-mockrup-3.png",
    imageAlt: "Energy and telemetry monitoring",
    primaryLabel: "Explore energy data",
    primaryHref: "/modules/smart-operations",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "AI and Copilots",
    description:
      "Ask questions, detect patterns, and support decisions using AI trained on your own production data.",
    imageSrc: "/images/report-mockup4.png",
    imageAlt: "AI assistant for production data",
    primaryLabel: "Explore AI features",
    primaryHref: "/modules/ai-solutions",
    bgColor: "bg-black",
    layout: "vertical",
  },
  {
    title: "Machine Control",
    description:
      "Integrate with machine control systems to enable feedback, automation, and tighter production loops across the factory.",
    imageSrc: "/images/Start-Machine.png",
    imageAlt: "Machine control integration",
    primaryLabel: "See machine control",
    primaryHref: "/services",
    bgColor: "bg-black",
    layout: "vertical",
  },
];


// Customer logos for the logo wall
const customerLogos: LogoItem[] = [
  { name: "Broen", logoSrc: "/images/logos/Broen.png" },
  { name: "Carl Hansen og Søn", logoSrc: "/images/logos/Carl Hansen og Søn.png" },
  { name: "CS Wind Offshore", logoSrc: "/images/logos/CS Wind Offshore.png" },
  { name: "Ege Carpets", logoSrc: "/images/logos/Ege.png" },
  { name: "Elektro-Isola", logoSrc: "/images/logos/Elektro-Isola.png" },
  { name: "Gurit", logoSrc: "/images/logos/Gurit.png" },
  { name: "Hydro Extrusion", logoSrc: "/images/logos/Hydro.png" },
  { name: "Kvik", logoSrc: "/images/logos/Kvik.png" },
  { name: "Montana", logoSrc: "/images/logos/Montana.png" },
  { name: "TCM-Group", logoSrc: "/images/logos/TCM-Group.png" },
  { name: "Xellia", logoSrc: "/images/logos/Xellia.png" },
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

      {/* Customer Logo Wall */}
      <LogoWall
        logos={customerLogos}
        title="Trusted by industry leaders"
      />
    </main>
  )
}
