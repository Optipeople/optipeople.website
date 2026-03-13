"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SiteHeader } from "@/components/site-header"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SlideCarousel } from "@/components/slide-carousel"
import { ChevronDown } from "lucide-react"

export default function ComponentsPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="mx-auto w-full max-w-6xl px-4 lg:px-6 xl:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-2">Components</h1>
          <p className="text-lg text-foreground/70">
            A showcase of all available components in the design system.
          </p>
        </div>

        <div className="space-y-16">
          {/* Button Component */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Button</h2>
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>Different button styles</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </CardContent>
              <CardHeader>
                <CardTitle>Sizes</CardTitle>
                <CardDescription>Different button sizes</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <ChevronDown />
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Badge Component */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Badge</h2>
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>Different badge styles</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </CardContent>
            </Card>
          </section>

          {/* Card Component */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Card</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description text</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content goes here. This is where you put the main information.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Action</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card with Action</CardTitle>
                  <CardDescription>Example with action button</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card demonstrates the full card structure.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Confirm</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Dropdown Menu Component */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Dropdown Menu</h2>
            <Card>
              <CardHeader>
                <CardTitle>Examples</CardTitle>
                <CardDescription>Interactive dropdown menus</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Open Menu <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </section>

          {/* Carousel Component */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Carousel</h2>
            <Card>
              <CardHeader>
                <CardTitle>Basic Carousel</CardTitle>
                <CardDescription>Carousel with navigation arrows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full max-w-2xl mx-auto">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">
                                  {index + 1}
                                </span>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Slide Carousel Component */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Slide Carousel</h2>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Tab Navigation</CardTitle>
                <CardDescription>Slide carousel with tab navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <SlideCarousel
                  slides={[
                    {
                      tab: "First Tab",
                      title: "First Slide",
                      description: "This is the first slide with tab navigation.",
                      imageSrc: "/window.svg",
                      imageAlt: "First slide",
                      primaryLabel: "Learn More",
                      primaryHref: "#",
                      bgColor: "bg-blue-50",
                    },
                    {
                      tab: "Second Tab",
                      title: "Second Slide",
                      description: "This is the second slide with tab navigation.",
                      imageSrc: "/globe.svg",
                      imageAlt: "Second slide",
                      primaryLabel: "Explore",
                      primaryHref: "#",
                      bgColor: "bg-green-50",
                    },
                    {
                      tab: "Third Tab",
                      title: "Third Slide",
                      description: "This is the third slide with tab navigation.",
                      imageSrc: "/file.svg",
                      imageAlt: "Third slide",
                      primaryLabel: "Get Started",
                      primaryHref: "#",
                      bgColor: "bg-purple-50",
                    },
                  ]}
                  navigationType="tabs"
                  ariaLabel="Tab carousel example"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dots Navigation</CardTitle>
                <CardDescription>Slide carousel with dots navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <SlideCarousel
                  slides={[
                    {
                      title: "First Slide",
                      description: "This is the first slide with dots navigation.",
                      imageSrc: "/window.svg",
                      imageAlt: "First slide",
                      primaryLabel: "Learn More",
                      primaryHref: "#",
                      bgColor: "bg-blue-50",
                      layout: "overlay",
                    },
                    {
                      title: "Second Slide",
                      description: "This is the second slide with dots navigation.",
                      imageSrc: "/globe.svg",
                      imageAlt: "Second slide",
                      primaryLabel: "Explore",
                      primaryHref: "#",
                      bgColor: "bg-green-50",
                      layout: "overlay",
                    },
                    {
                      title: "Third Slide",
                      description: "This is the third slide with dots navigation.",
                      imageSrc: "/file.svg",
                      imageAlt: "Third slide",
                      primaryLabel: "Get Started",
                      primaryHref: "#",
                      bgColor: "bg-purple-50",
                      layout: "overlay",
                    },
                  ]}
                  navigationType="dots"
                  ariaLabel="Dots carousel example"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vertical Layout</CardTitle>
                <CardDescription>Portrait cards with black background and navigation arrows</CardDescription>
              </CardHeader>
              <CardContent>
                <SlideCarousel
                  slides={[
                    {
                      title: "Innovation",
                      description: "Beautiful and durable, by design.",
                      imageSrc: "/window.svg",
                      imageAlt: "Innovation illustration",
                      primaryLabel: "Learn more about innovation",
                      primaryHref: "#",
                      bgColor: "bg-black",
                      layout: "vertical",
                    },
                    {
                      title: "Cutting-Edge Cameras",
                      description: "Picture your best photos and videos.",
                      imageSrc: "/globe.svg",
                      imageAlt: "Camera illustration",
                      primaryLabel: "Explore cameras",
                      primaryHref: "#",
                      bgColor: "bg-black",
                      layout: "vertical",
                    },
                    {
                      title: "Chip and Battery Life",
                      description: "Fast that lasts.",
                      imageSrc: "/file.svg",
                      imageAlt: "Chip illustration",
                      primaryLabel: "Learn about performance",
                      primaryHref: "#",
                      bgColor: "bg-black",
                      layout: "vertical",
                    },
                    {
                      title: "iOS and Apple Intelligence",
                      description: "New look. Even more magic.",
                      imageSrc: "/next.svg",
                      imageAlt: "iOS illustration",
                      primaryLabel: "Discover iOS",
                      primaryHref: "#",
                      bgColor: "bg-black",
                      layout: "vertical",
                    },
                    {
                      title: "Environment",
                      description: "Designed with the earth in mind.",
                      imageSrc: "/vercel.svg",
                      imageAlt: "Environment illustration",
                      primaryLabel: "Learn about sustainability",
                      primaryHref: "#",
                      bgColor: "bg-black",
                      layout: "vertical",
                    },
                  ]}
                  navigationType={["arrows"]}
                  ariaLabel="Vertical carousel example"
                  defaultLayout="vertical"
                />
              </CardContent>
            </Card>
          </section>

          {/* Site Header Component */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Site Header</h2>
            <Card>
              <CardHeader>
                <CardTitle>Navigation Header</CardTitle>
                <CardDescription>The main site header component</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <SiteHeader />
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  )
}
