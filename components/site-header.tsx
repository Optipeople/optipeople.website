"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Languages, Mail, MessageCircle } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  getLocaleFromPathname,
  localizeHref,
  navigationMenus,
  shellCopy,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n"

import logo from "@/app/Optipeople-Logo-Vector.svg"

const navigationItems: readonly { title: string; href: string }[] = []

export function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const dropdownMenus = navigationMenus[locale]
  const copy = shellCopy[locale]

  return (
    <header className="w-full bg-background/95 backdrop-blur-md sticky top-0 z-20">
      <div className="h-16 flex items-center justify-between px-6 lg:px-8">
        <Link
          href={localizeHref("/", locale)}
          className="cursor-pointer flex items-center gap-3"
        >
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
          aria-label={copy.navigationLabel}
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={localizeHref(item.href, locale)}
              className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-offset-2"
              aria-label={copy.linkLabel(item.title)}
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
                  aria-label={copy.menuLabel(menu.title)}
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
                aria-label={copy.submenuLabel(menu.title)}
              >
                {menu.items.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className="p-0 focus:bg-transparent"
                  >
                    <Link
                      href={localizeHref(item.href, locale)}
                      className="cursor-pointer block w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-inset rounded-md"
                      aria-label={copy.linkLabel(item.title)}
                    >
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} pathname={pathname} />
          <Button asChild size="sm" variant="outline" className="px-3 md:px-4">
            <Link
              href={localizeHref("/newsletter", locale)}
              className="cursor-pointer"
              aria-label={copy.newsletterSignUp}
            >
              <Mail className="h-4 w-4 md:hidden" aria-hidden="true" />
              <span className="hidden md:inline">{copy.newsletterSignUp}</span>
              <span className="sr-only md:hidden">{copy.newsletterSignUp}</span>
            </Link>
          </Button>
          <Button asChild size="sm" className="px-3 md:px-4">
            <Link
              href={localizeHref("/contact", locale)}
              className="cursor-pointer"
              aria-label={copy.talkToUs}
            >
              <MessageCircle className="h-4 w-4 md:hidden" aria-hidden="true" />
              <span className="hidden md:inline">{copy.talkToUs}</span>
              <span className="sr-only md:hidden">{copy.talkToUs}</span>
            </Link>
          </Button>
        </div>
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

function LanguageSwitcher({
  locale,
  pathname,
}: {
  locale: Locale
  pathname: string
}) {
  const copy = shellCopy[locale]

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-border bg-white p-1"
      aria-label={copy.languageLabel}
    >
      <Languages className="hidden h-4 w-4 text-muted-foreground sm:block" />
      {(["en", "da"] as const).map((language) => {
        const isActive = locale === language

        return (
          <a
            key={language}
            href={switchLocalePath(pathname, language)}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "text-foreground/65 hover:bg-muted hover:text-foreground"
            }`}
          >
            {copy.languages[language]}
          </a>
        )
      })}
    </div>
  )
}
