"use client"

import Image from "next/image"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  ArrowRight,
  ChevronDown,
  LogIn,
  Menu,
  MessageCircle,
  X,
} from "lucide-react"
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
import { navigationLinks, navigationMenus } from "@/i18n/navigation-data"
import type { NavItem, NavMenu } from "@/i18n/navigation-data"
import type { Locale } from "@/i18n/routing"

import logo from "@/app/Optipeople-Logo-Vector.svg"

// Delay before a hovered menu closes, so crossing the trigger→panel gap or
// sliding between menus never flickers the dropdown shut.
const HOVER_CLOSE_DELAY = 120

// The three portal targets shown under "Log in", shared by the desktop utility
// bar and the mobile drawer so the two can never drift apart.
const LOGIN_TARGETS = [
  { key: "portal", href: "https://portal.optipeople.dk/" },
  { key: "platform", href: "https://cloud.optipeople.dk/" },
  { key: "aiAssist", href: "https://ai.optipeople.dk/" },
] as const

// Shared focus treatment. `focus-visible` rather than `focus`, so a mouse click
// never leaves a ring behind, and the colour comes from the `ring` theme token
// instead of being hardcoded to a brand hex on every interactive element.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
const FOCUS_RING_INSET =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"

// Hover wash for nav surfaces. Tied to the foreground token rather than a fixed
// gray so it stays correct if the header is ever rendered on a dark surface.
const HOVER_WASH = "hover:bg-foreground/[0.055] hover:text-foreground"
const PANEL_SHELL =
  "rounded-lg border border-border/70 bg-popover text-popover-foreground shadow-lg"

/**
 * Header gutter. Deliberately NOT `--edge`.
 *
 * Page content sits in a centred 1140px column, which on a wide screen would
 * push the logo and the CTA far inboard of the screen edges. The header is
 * chrome, not content: it spans the viewport, with the logo hard left and the
 * CTA hard right.
 *
 * The values track `--edge`'s floor so the two systems still agree wherever
 * they can: below 1024px `--edge` is 1.5rem (= px-6), and at 1024px it becomes
 * `max(2.5rem, …)` whose floor is 2.5rem (= px-10). So on any viewport narrower
 * than ~1220px the header gutter and the content line are identical, and they
 * only diverge once the content column starts centring itself.
 */
const HEADER_GUTTER = "px-6 lg:px-10"

export function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const locale = useLocale() as Locale
  const t = useTranslations("chrome")
  const dropdownMenus = navigationMenus[locale]
  const navigationItems = navigationLinks[locale]

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
      {/* Utility bar shares the header gutter, so the language switcher's right
          edge lines up with the CTA directly below it. */}
      <div className="border-b border-border/60 bg-muted/40">
        <div
          className={`flex h-7 items-center justify-end gap-4 ${HEADER_GUTTER}`}
        >
          <LoginMenu />
          <span className="h-4 w-px bg-border" aria-hidden="true" />
          <LanguageSwitcher />
        </div>
      </div>

      <header className="sticky top-0 z-20 w-full bg-background/95 backdrop-blur-md">
        <div
          className={`flex h-16 items-center justify-between gap-4 ${HEADER_GUTTER}`}
        >
          <Link href="/" className="flex cursor-pointer items-center gap-3">
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
            className="hidden items-center gap-0.5 text-sm font-medium text-foreground/85 lg:flex xl:gap-2"
            role="navigation"
            aria-label={t("navigationLabel")}
          >
            {dropdownMenus.map((menu) => (
              <DropdownMenu
                key={menu.title}
                open={openDropdown === menu.title}
                onOpenChange={(open) =>
                  setOpenDropdown(open ? menu.title : null)
                }
                modal={false}
              >
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 transition-colors duration-200 ease-out data-[state=open]:bg-foreground/[0.055] data-[state=open]:text-foreground xl:gap-2 xl:px-3 ${HOVER_WASH} ${FOCUS_RING}`}
                    aria-label={t("menuLabel", { title: menu.title })}
                    {...hoverProps(menu.title)}
                  >
                    <span>{menu.title}</span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 ${
                        openDropdown === menu.title ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  sideOffset={8}
                  collisionPadding={16}
                  onCloseAutoFocus={(event) => {
                    // When a hover-opened menu closes we don't want focus yanked
                    // back to the trigger (it never left on hover).
                    if (hoverEnabled) event.preventDefault()
                  }}
                  className={
                    menu.layout === "mega"
                      ? `w-[44rem] p-3 ${PANEL_SHELL}`
                      : `w-64 p-2 ${PANEL_SHELL}`
                  }
                  aria-label={t("submenuLabel", { title: menu.title })}
                  {...hoverProps(menu.title)}
                >
                  {menu.layout === "mega" ? (
                    <MegaMenuPanel menu={menu} />
                  ) : (
                    menu.items.map((item) => (
                      <DropdownMenuItem
                        key={item.href}
                        asChild
                        className="p-0 focus:bg-transparent"
                      >
                        <Link
                          href={item.href}
                          className={`block w-full cursor-pointer rounded-md px-4 py-3 text-sm text-foreground/85 transition-colors duration-150 hover:bg-foreground/[0.045] hover:text-foreground ${FOCUS_RING_INSET}`}
                          aria-label={t("linkLabel", { title: item.title })}
                        >
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`cursor-pointer rounded-lg px-2 py-2 transition-colors duration-200 ease-out xl:px-3 ${HOVER_WASH} ${FOCUS_RING}`}
                aria-label={t("linkLabel", { title: item.title })}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <Button asChild size="sm" className="px-3 md:px-4">
              <Link
                href="/contact"
                className="cursor-pointer"
                aria-label={t("talkToUs")}
              >
                <MessageCircle
                  className="h-4 w-4 md:hidden"
                  aria-hidden="true"
                />
                <span className="hidden md:inline">{t("talkToUs")}</span>
                <span className="sr-only md:hidden">{t("talkToUs")}</span>
              </Link>
            </Button>

            <MobileNav menus={dropdownMenus} links={navigationItems} />
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

const MEGA_COLUMNS = 2

function MegaMenuPanel({ menu }: { menu: NavMenu }) {
  const t = useTranslations("chrome")

  // A single grid that flows column-major: DOM order runs down column one, then
  // down column two, so Radix's arrow-key roving focus walks a column the way
  // the eye does, while the shared grid rows keep the two columns aligned.
  const rows = Math.ceil(menu.items.length / MEGA_COLUMNS)

  return (
    <>
      <div
        className="grid grid-flow-col gap-x-6"
        style={{
          gridTemplateColumns: `repeat(${MEGA_COLUMNS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, auto)`,
        }}
      >
        {menu.items.map((item) => (
          <DropdownMenuItem
            key={item.href}
            asChild
            className="p-0 focus:bg-transparent"
          >
            <Link
              href={item.href}
              className={`cursor-pointer rounded-md px-3 py-2 transition-colors duration-150 hover:bg-foreground/[0.045] ${FOCUS_RING_INSET}`}
              aria-label={t("linkLabel", { title: item.title })}
            >
              {/* One child element: the base item class carries `flex
                  items-center gap-2`, which Radix's Slot concatenates rather
                  than merges, so stacking happens in here instead. */}
              <span className="block">
                <span className="block text-sm font-medium text-foreground">
                  {item.title}
                </span>
                {item.description && (
                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                    {item.description}
                  </span>
                )}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </div>

      {menu.secondary && (
        <div className="mt-3 border-t border-border/60 pt-3">
          <div className="flex items-baseline justify-between gap-4 px-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {menu.secondary.title}
            </p>
            {menu.secondary.overview && (
              <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                <Link
                  href={menu.secondary.overview.href}
                  className={`cursor-pointer rounded-md px-1.5 py-0.5 text-xs font-medium text-primary transition-colors duration-150 hover:bg-foreground/[0.045] ${FOCUS_RING_INSET}`}
                  aria-label={t("linkLabel", {
                    title: menu.secondary.overview.title,
                  })}
                >
                  <span>{menu.secondary.overview.title}</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </DropdownMenuItem>
            )}
          </div>

          {/* Titles only, three across: Danish capability names are long single
              compounds that cannot wrap, so narrower columns would overflow. */}
          <div className="mt-1 grid grid-cols-3 gap-x-2">
            {menu.secondary.items.map((item) => (
              <DropdownMenuItem
                key={item.href}
                asChild
                className="p-0 focus:bg-transparent"
              >
                <Link
                  href={item.href}
                  className={`cursor-pointer rounded-md px-3 py-1.5 text-xs leading-snug text-foreground/82 transition-colors duration-150 hover:bg-foreground/[0.045] hover:text-foreground ${FOCUS_RING_INSET}`}
                  aria-label={t("linkLabel", { title: item.title })}
                >
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      )}

      {menu.overview && (
        <DropdownMenuItem
          asChild
          className="mt-2 border-t border-border/60 p-0 pt-2 focus:bg-transparent"
        >
          <Link
            href={menu.overview.href}
            className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors duration-150 hover:bg-foreground/[0.045] ${FOCUS_RING_INSET}`}
            aria-label={t("linkLabel", { title: menu.overview.title })}
          >
            <span>{menu.overview.title}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </DropdownMenuItem>
      )}
    </>
  )
}

/**
 * Mobile navigation drawer.
 *
 * The desktop `<nav>` is `hidden lg:flex`: six top-level items, one of them
 * three words long, stop fitting in the header below that. Without this the
 * site would have no navigation at all under 1024px, only the logo and the
 * "Talk to us" button.
 * This carries the full tree: every dropdown menu as a collapsible section
 * (including the platform panel's Features sub-list and overview link), the flat
 * links, the login targets, and the language switcher.
 */
function MobileNav({ menus, links }: { menus: NavMenu[]; links: NavItem[] }) {
  const t = useTranslations("chrome")
  const [open, setOpen] = useState(false)

  // Radix keeps the dialog mounted when a link inside it navigates, so the
  // drawer would stay open over the new page. One delegated handler on the
  // panel closes it for any anchor — the ~40 nav links, the CTA, the login
  // targets and the language switcher — instead of 40 individual onClicks.
  const closeOnLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className={`-mr-1 flex size-10 cursor-pointer items-center justify-center rounded-lg text-foreground/85 transition-colors lg:hidden ${HOVER_WASH} ${FOCUS_RING}`}
          aria-label={t("openMenu")}
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          onClick={closeOnLinkClick}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-background shadow-[0_0_60px_-15px_rgba(0,0,0,0.35)] duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
        >
          <DialogPrimitive.Title className="sr-only">
            {t("navigationLabel")}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {t("mobileMenuDescription")}
          </DialogPrimitive.Description>

          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/60 px-6">
            <Image
              src={logo}
              alt="Optipeople"
              width={140}
              height={28}
              className="h-7 w-auto"
            />
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                className={`-mr-1 flex size-10 cursor-pointer items-center justify-center rounded-lg text-foreground/85 transition-colors ${HOVER_WASH} ${FOCUS_RING}`}
                aria-label={t("closeMenu")}
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </DialogPrimitive.Close>
          </div>

          <nav
            className="flex-1 overflow-y-auto overscroll-contain px-6 py-2"
            aria-label={t("navigationLabel")}
          >
            {menus.map((menu) => (
              <MobileNavSection key={menu.title} menu={menu} />
            ))}

            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block border-b border-border/50 py-3.5 text-base font-medium text-foreground ${FOCUS_RING_INSET}`}
              >
                {item.title}
              </Link>
            ))}

            <div className="py-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("login")}
              </p>
              <ul className="mt-2">
                {LOGIN_TARGETS.map((target) => (
                  <li key={target.href}>
                    <a
                      href={target.href}
                      className={`flex items-center gap-2 rounded-md py-2 text-sm text-foreground/85 transition-colors hover:text-foreground ${FOCUS_RING_INSET}`}
                    >
                      <LogIn
                        className="size-3.5 text-muted-foreground"
                        aria-hidden="true"
                      />
                      {t(`loginMenu.${target.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="shrink-0 space-y-4 border-t border-border/60 px-6 py-5">
            <Button asChild className="w-full">
              <Link href="/contact">{t("talkToUs")}</Link>
            </Button>
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/**
 * One collapsible menu inside the drawer. Uses `<details>` so open/closed state
 * is the browser's job — no per-section React state, and the sections still
 * expand if hydration is slow or fails.
 */
function MobileNavSection({ menu }: { menu: NavMenu }) {
  const linkClass = `block rounded-md py-2 text-sm text-foreground/85 transition-colors hover:text-foreground ${FOCUS_RING_INSET}`

  return (
    <details className="group border-b border-border/50">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
        {menu.title}
        <ChevronDown
          className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="pb-4 pl-3">
        <ul>
          {menu.items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {menu.secondary && (
          <div className="mt-3 border-t border-border/40 pt-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {menu.secondary.title}
              </p>
              {menu.secondary.overview && (
                <Link
                  href={menu.secondary.overview.href}
                  className={`text-xs font-medium text-primary ${FOCUS_RING_INSET}`}
                >
                  {menu.secondary.overview.title}
                </Link>
              )}
            </div>
            <ul className="mt-1">
              {menu.secondary.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {menu.overview && (
          <Link
            href={menu.overview.href}
            className={`mt-3 flex items-center gap-2 text-sm font-medium text-primary ${FOCUS_RING_INSET}`}
          >
            {menu.overview.title}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </details>
  )
}

function LoginMenu() {
  const t = useTranslations("chrome")

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`flex cursor-pointer items-center gap-1.5 rounded text-xs font-medium text-foreground/78 transition-colors hover:text-foreground data-[state=open]:text-foreground ${FOCUS_RING}`}
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
        className={`w-48 p-2 ${PANEL_SHELL}`}
      >
        {LOGIN_TARGETS.map((target) => (
          <DropdownMenuItem
            key={target.href}
            asChild
            className="p-0 focus:bg-transparent"
          >
            <a
              href={target.href}
              className={`block w-full cursor-pointer rounded-md px-4 py-2.5 text-sm text-foreground/85 transition-colors duration-150 hover:bg-foreground/[0.045] hover:text-foreground ${FOCUS_RING_INSET}`}
            >
              {t(`loginMenu.${target.key}`)}
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
              className={`cursor-pointer rounded px-0.5 transition-colors ${FOCUS_RING} ${
                isActive
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
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
