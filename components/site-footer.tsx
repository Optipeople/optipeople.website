"use client"

import Image from "next/image"
import { Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import logo from "@/app/Optipeople-Logo-Vector.svg"
import { Link } from "@/i18n/navigation"
import { footerColumns, type NavItem } from "@/i18n/navigation-data"
import type { Locale } from "@/i18n/routing"
import { generalEmail } from "@/lib/contact"

const contactInfo = {
  phone: "+45 23 74 47 05",
  address: "Sønderskovvej 17",
  postalCode: "8362",
  city: "Hørning",
  companyName: "OptiPeople ApS",
  cvr: "32883532",
} as const

const socialLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/optipeople-aps/",
    icon: Linkedin,
  },
] as const

// `py-1` lifts each link to a 28px tap target; the list gap is trimmed to
// match so the columns keep their rhythm.
const LINK_CLASS =
  "inline-block py-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
const HEADING_CLASS =
  "text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4"

// Site pages go through the localized Link; the login portals are off-site and
// render as plain anchors, the same way the header treats them.
function FooterLink({ item }: { item: NavItem }) {
  if (item.external) {
    return (
      <a href={item.href} className={LINK_CLASS}>
        {item.title}
      </a>
    )
  }
  return (
    <Link href={item.href} className={LINK_CLASS}>
      {item.title}
    </Link>
  )
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const locale = useLocale() as Locale
  const columns = footerColumns[locale]
  const t = useTranslations("chrome.footer")
  const email = generalEmail(locale)

  return (
    <footer className="w-full bg-[var(--gray-10)] text-white">
      {/* Accent stripes - inverted from header */}
      <div className="flex flex-col">
        <div
          className="h-1 w-full bg-[var(--green-dark3)]"
          aria-hidden="true"
        />
        <div
          className="h-1 w-full bg-[var(--green-system)]"
          aria-hidden="true"
        />
        <div
          className="h-1 w-full bg-[var(--orange-system)]"
          aria-hidden="true"
        />
      </div>

      {/* Padded to --edge, the same token every redesigned page uses, so the
          footer's brand column starts on the page's left line rather than
          ~26px inboard of it. */}
      <div className="px-[var(--edge)] py-12 lg:py-16">
        {/* Brand column on the left, link grid on the right. The link grid is
            three across from the sm breakpoint so the six columns (mirroring
            the header's menus) fall into two even rows instead of a cramped
            six-across strip. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src={logo}
                alt="Optipeople"
                width={140}
                height={28}
                className="h-7 w-auto brightness-0 invert"
              />
              <span className="sr-only">Optipeople</span>
            </Link>
            <p className="max-w-sm text-sm text-gray-400 leading-relaxed mb-6">
              {t("brand")}
            </p>

            {/* Contact info */}
            <div className="space-y-1">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 py-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>{email}</span>
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 py-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>{contactInfo.phone}</span>
              </a>
              <div className="flex items-start gap-3 py-1 text-sm text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {contactInfo.address}
                  <br />
                  {contactInfo.postalCode} {contactInfo.city}
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-4">
                <p>{contactInfo.companyName}</p>
                <p>CVR {contactInfo.cvr}</p>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8">
              <h3 className={HEADING_CLASS}>{t("connect")}</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                    aria-label={t("followLabel", { title: social.title })}
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns, one per header menu plus Company */}
          <nav
            aria-label={t("navigationLabel")}
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className={HEADING_CLASS}>{column.title}</h3>
                <ul className="space-y-1">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {currentYear} {contactInfo.companyName}. {t("rights")}
            </p>
            <p className="text-sm text-gray-400">{t("tagline")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
