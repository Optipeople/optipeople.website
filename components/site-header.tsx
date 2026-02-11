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

const navigationItems = [
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
] as const

const dropdownTitle = "Modules"
const dropdownItems = [
  { title: "Smart Operations", href: "/modules/smart-operations" },
  { title: "AI Solutions", href: "/modules/ai-solutions" },
  { title: "Automation", href: "/modules/automation" },
] as const

export function SiteHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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

          {dropdownItems.length > 0 && (
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-offset-2"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-label={`${dropdownTitle} menu`}
                >
                  <span>{dropdownTitle}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="w-64 bg-white rounded-lg shadow-lg border border-gray-100 p-2"
                aria-label={`${dropdownTitle} submenu`}
              >
                {dropdownItems.map((item) => (
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
          )}
        </nav>

        <Button asChild size="sm">
          <Link href="/talk-to-us" className="cursor-pointer">
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


