import { SlideCarousel, type SlideData } from "@/components/slide-carousel"
import { LogoWall, type LogoItem } from "@/components/logo-wall"
import { VideoCarousel, type VideoData } from "@/components/video-carousel"
import { TestimonialCarousel, type Testimonial } from "@/components/testimonial-carousel"
import { PlatformFlower } from "@/components/platform-flower"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getLatestPostsByCategory } from "@/lib/blog-data"
import { ArrowRight } from "lucide-react"

const tabSlides: SlideData[] = [
  {
    tab: "Manufacturing companies",
    title: "Know Your Factory. In Real Time.",
    description:
      "OptiPeople connects machines, processes, and people into one live operational view. See bottlenecks as they happen, act faster, and run production with facts instead of gut feeling.",
    imageSrc: "/images/dashboard2.png",
    imageAlt: "Opticloud manufacturing dashboard",
    primaryLabel: "Explore manufacturing solutions",
    primaryHref: "/solutions/manufacturing",
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
    primaryHref: "/solutions/oems",
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
    primaryHref: "/solutions/service",
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
    primaryHref: "/features/production-efficiency",
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
    primaryHref: "/features/stop-cause-registration",
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
    primaryHref: "/features/maintenance-and-tasks",
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
    primaryHref: "/features/quality-management",
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
    primaryHref: "/features/analysis-and-reporting",
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
    primaryHref: "/features/energy-and-telemetry",
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
    primaryHref: "/features/ai-and-copilots",
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
    primaryHref: "/features/machine-control",
    bgColor: "bg-black",
    layout: "vertical",
  },
];


// Customer logos for the logo wall
// YouTube videos for the video carousel
const customerVideos: VideoData[] = [
  { videoId: "O55qA3g6bWQ" },
  { videoId: "AgHZcfeu8mQ" },
  { videoId: "H4HvdRpmHjo" },
]

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

const testimonials: Testimonial[] = [
  {
    quote: "Comparing our OEE to previous data before Opticloud, we've seen an average increase of 5% within just three months.",
    author: "Kasper Kielgast Poulsen",
    title: "Fabrikschef",
    company: "Dansk Træemballage",
  },
  {
    quote: "Over the past two years, Opticloud has helped us increase productivity by approximately 5%. Data collection combined with continuous improvements is key.",
    author: "Tommy Andersen",
    title: "Production Manager",
    company: "DFI Geisler",
  },
  {
    quote: "We now perform maintenance based on operating hours instead of fixed time intervals. This gives us ~40 extra production hours annually and 50% fewer service hours.",
    author: "Stefan Lindell",
    title: "Lean Project Manager",
    company: "Kvik",
  },
  {
    quote: "Opticloud provides us with valuable management information that was previously unavailable. Our operators monitor uptime on tablets, which has encouraged quicker recovery times.",
    author: "Kasper Kielgast Poulsen",
    title: "Fabrikschef",
    company: "Dansk Træemballage",
  },
  {
    quote: "For some of our operators, recording accurate data has become a kind of competition to maximize productivity. We've achieved 5% higher productivity.",
    author: "Tommy Andersen",
    title: "Production Manager",
    company: "DFI Geisler",
  },
  {
    quote: "We achieved a 5% increase in uptime with automatic downtime cause logging. The data is now valid and reliable with full microstop tracking.",
    author: "Stefan Lindell",
    title: "Lean Project Manager",
    company: "Kvik",
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
              <Link href="/modules/production" className="cursor-pointer">
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

      {/* Customer Video Testimonials */}
      <section className="py-12 lg:py-28">
        <VideoCarousel
          videos={customerVideos}
          title="Video stories"
        />
      </section>

      {/* Testimonial Carousel */}
      <TestimonialCarousel
        testimonials={testimonials}
        title="What our customers say"
        className="py-12 lg:py-28"
      />

      {/* Platform Overview - Interactive Flower */}
      <PlatformFlower />

      {/* Latest Blog Posts - Nordic/Apple inspired */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-0">
          {/* Header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
                Cases
              </p>
              <h2 className="text-4xl lg:text-5xl font-light text-foreground tracking-tight">
                Stories from the field
              </h2>
            </div>
            <Link
              href="/cases"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group"
            >
              View all
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Blog Grid */}
          <div className="grid gap-8 lg:gap-12">
            {/* Featured Post */}
            {getLatestPostsByCategory("Cases", 4).slice(0, 1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl bg-muted border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight group-hover:text-foreground/80 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground/70 pt-2">
                      Read case study
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {/* Secondary Posts */}
            <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 pt-8 border-t border-border/50">
              {getLatestPostsByCategory("Cases", 4).slice(1, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="space-y-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted border border-[var(--gray-2)] shadow-[0_0.5px_2.5px_0_rgba(0,0,0,0.30),0_0_0_0.5px_rgba(0,0,0,0.05)]">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-foreground tracking-tight group-hover:text-foreground/80 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile View All Link */}
          <div className="mt-12 sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/cases">
                View all cases
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
