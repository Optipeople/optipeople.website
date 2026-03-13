"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import logo from "@/app/Optipeople-Logo-Vector.svg"

const navigationItems: readonly { title: string; href: string }[] = []

const dropdownMenus = [
  {
    title: "Modules",
    items: [
      { title: "Production", href: "/modules/production" },
      { title: "Quality", href: "/modules/quality" },
      { title: "Maintenance", href: "/modules/maintenance" },
      { title: "Energy", href: "/modules/energy" },
      { title: "Analysis", href: "/modules/analysis" },
      { title: "IoT", href: "/modules/iot" },
      { title: "ERP Shopfloor", href: "/modules/erp-shopfloor" },
      { title: "MES", href: "/modules/mes" },
    ],
  },
  {
    title: "Services",
    items: [
      { title: "Smart Operations", href: "/services/smart-operations" },
      { title: "AI Agentic Solutions", href: "/services/ai-solutions" },
      { title: "Automation", href: "/services/automation" },
      { title: "Business Intelligence", href: "/services/business-intelligence" },
    ],
  },
  {
    title: "Customers",
    items: [
      { title: "Carl Hansen & Søn", href: "/blog/carl-hansen-son-enhances-productivity-and-reduces-setup-times-with-opticloud-and-optiai" },
      { title: "DFI Geisler", href: "/blog/dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights" },
      { title: "Kvik", href: "/blog/kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud" },
      { title: "Steel Products", href: "/blog/optimizing-machine-performance-and-power-consumption-with-opticloud-at-steel-products" },
      { title: "Dansk Træemballage", href: "/blog/dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud" },
      { title: "XL-BYG Brejnholt", href: "/blog/xl-byg-brejnholt-achieves-energy-savings-and-sustainability-with-optimized-forklift-charging" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Insights", href: "/insights" },
      { title: "Videos", href: "/videos" },
      { title: "People", href: "/resources/people" },
      { title: "Get Help", href: "/get-help" },
      { title: "Contact", href: "/contact" },
      { title: "About", href: "/about" },
    ],
  },
] as const

export function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="w-full bg-background/95 backdrop-blur-md sticky top-0 z-20">
      <div className="h-16 flex items-center justify-between px-6 lg:px-8">
        <Link href="/" className="cursor-pointer flex items-center gap-3">
          <Image
            src={logo}
            alt="Optipeople"
            width={140}
            height={28}
            className="h-7 w-auto"
            priority
          />
          <span className="sr-only">Optipeople</span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-2 text-gray-700 font-medium text-sm"
          role="navigation"
          aria-label="Main navigation"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-offset-2"
              aria-label={`Navigate to ${item.title} page`}
            >
              {item.title}
            </Link>
          ))}

          {dropdownMenus.map((menu) => (
            <DropdownMenu
              key={menu.title}
              open={openDropdown === menu.title}
              onOpenChange={(open) => setOpenDropdown(open ? menu.title : null)}
            >
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-offset-2"
                  aria-expanded={openDropdown === menu.title}
                  aria-haspopup="true"
                  aria-label={`${menu.title} menu`}
                >
                  <span>{menu.title}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      openDropdown === menu.title ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="w-64 bg-white rounded-lg shadow-lg border border-gray-100 p-2"
                aria-label={`${menu.title} submenu`}
              >
                {menu.items.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className="p-0 focus:bg-transparent"
                  >
                    <Link
                      href={item.href}
                      className="cursor-pointer block w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-inset rounded-md"
                      aria-label={`Navigate to ${item.title} page`}
                    >
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        <Button asChild size="sm">
          <Link href="/contact" className="cursor-pointer">
            Talk to us
          </Link>
        </Button>
      </div>

      <div className="flex flex-col">
        <div
          className="h-1 w-full bg-[var(--orange-system)]"
          aria-hidden="true"
        />
        <div
          className="h-1 w-full bg-[var(--green-system)]"
          aria-hidden="true"
        />
        <div
          className="h-1 w-full bg-[var(--green-dark3)]"
          aria-hidden="true"
        />
      </div>
    </header>
  )
}
