"use client"

import Image from "next/image"
import { ChevronDown, LogIn, MessageCircle } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, usePathname } from "@/i18n/navigation"
import { navigationMenus } from "@/i18n/navigation-data"
import type { Locale } from "@/i18n/routing"

import logo from "@/app/Optipeople-Logo-Vector.svg"

const navigationItems: readonly { title: string; href: string }[] = []

// Delay before a hovered menu closes, so crossing the trigger→panel gap or
// sliding between menus never flickers the dropdown shut.
const HOVER_CLOSE_DELAY = 120

export function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const locale = useLocale() as Locale
  const t = useTranslations("chrome")
  const dropdownMenus = navigationMenus[locale]

  // Only drive menus by hover on devices that actually have a hovering pointer
  // (mouse/trackpad). On touch, hover events are unreliable, so we fall back to
  // Radix's native click/keyboard behaviour.
  const [hoverEnabled, setHoverEnabled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setHoverEnabled(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const openMenu = useCallback(
    (title: string) => {
      clearCloseTimer()
      setOpenDropdown(title)
    },
    [clearCloseTimer]
  )

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    closeTimer.current = setTimeout(
      () => setOpenDropdown(null),
      HOVER_CLOSE_DELAY
    )
  }, [clearCloseTimer])

  useEffect(() => clearCloseTimer, [clearCloseTimer])

  const hoverProps = (title: string) =>
    hoverEnabled
      ? {
          onMouseEnter: () => openMenu(title),
          onMouseLeave: scheduleClose,
        }
      : {}

  return (
    <>
      <div className="border-b border-border/60 bg-muted/40">
        <div className="flex h-7 items-center justify-end gap-4 px-6 lg:px-8">
          <LoginMenu />
          <span className="h-4 w-px bg-border" aria-hidden="true" />
          <LanguageSwitcher />
        </div>
      </div>

      <header className="w-full sticky top-0 z-20 bg-background/95 backdrop-blur-md">
      <div className="h-16 flex items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
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
          aria-label={t("navigationLabel")}
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-offset-2"
              aria-label={t("linkLabel", { title: item.title })}
            >
              {item.title}
            </Link>
          ))}

          {dropdownMenus.map((menu) => (
            <DropdownMenu
              key={menu.title}
              open={openDropdown === menu.title}
              onOpenChange={(open) => setOpenDropdown(open ? menu.title : null)}
              modal={false}
            >
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-offset-2"
                  aria-label={t("menuLabel", { title: menu.title })}
                  {...hoverProps(menu.title)}
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
                onCloseAutoFocus={(event) => {
                  // When a hover-opened menu closes we don't want focus yanked
                  // back to the trigger (it never left on hover).
                  if (hoverEnabled) event.preventDefault()
                }}
                className="w-64 bg-white rounded-lg shadow-lg border border-gray-100 p-2"
                aria-label={t("submenuLabel", { title: menu.title })}
                {...hoverProps(menu.title)}
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
                      aria-label={t("linkLabel", { title: item.title })}
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
          <Button asChild size="sm" className="px-3 md:px-4">
            <Link
              href="/contact"
              className="cursor-pointer"
              aria-label={t("talkToUs")}
            >
              <MessageCircle className="h-4 w-4 md:hidden" aria-hidden="true" />
              <span className="hidden md:inline">{t("talkToUs")}</span>
              <span className="sr-only md:hidden">{t("talkToUs")}</span>
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
    </>
  )
}

function LoginMenu() {
  const t = useTranslations("chrome")
  const logins = [
    { label: t("loginMenu.portal"), href: "https://portal.optipeople.dk/" },
    { label: t("loginMenu.platform"), href: "https://cloud.optipeople.dk/" },
    { label: t("loginMenu.aiAssist"), href: "https://ai.optipeople.dk/" },
  ]

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="cursor-pointer flex items-center gap-1.5 text-xs font-medium text-foreground/65 hover:text-foreground data-[state=open]:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-offset-2 rounded"
          aria-label={t("login")}
        >
          <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("login")}</span>
          <ChevronDown className="h-3 w-3" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-48 bg-white rounded-lg shadow-lg border border-gray-100 p-2"
      >
        {logins.map((item) => (
          <DropdownMenuItem
            key={item.href}
            asChild
            className="p-0 focus:bg-transparent"
          >
            <a
              href={item.href}
              className="cursor-pointer block w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-inset rounded-md"
            >
              {item.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function LanguageSwitcher() {
  const t = useTranslations("chrome")
  const locale = useLocale() as Locale
  const pathname = usePathname()

  return (
    <div
      className="flex items-center gap-1.5 text-xs font-medium"
      aria-label={t("languageLabel")}
    >
      {(["en", "da"] as const).map((language, index) => {
        const isActive = locale === language

        return (
          <span key={language} className="flex items-center gap-1.5">
            {index > 0 && (
              <span className="text-border" aria-hidden="true">
                /
              </span>
            )}
            <Link
              href={pathname}
              locale={language}
              aria-current={isActive ? "page" : undefined}
              className={`cursor-pointer rounded px-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--green-dark3)] focus:ring-offset-2 ${
                isActive
                  ? "text-foreground"
                  : "text-foreground/55 hover:text-foreground"
              }`}
            >
              {t(`languages.${language}`)}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
