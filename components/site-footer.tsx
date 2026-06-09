"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { usePathname } from "next/navigation"

import logo from "@/app/Optipeople-Logo-Vector.svg"
import {
  footerLinks,
  getLocaleFromPathname,
  localizeHref,
  shellCopy,
} from "@/lib/i18n"

const contactInfo = {
  email: "hej@optipeople.dk",
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

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const links = footerLinks[locale]
  const copy = shellCopy[locale].footer

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

      <div className="px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href={localizeHref("/", locale)} className="inline-block mb-6">
                <Image
                  src={logo}
                  alt="Optipeople"
                  width={140}
                  height={28}
                  className="h-7 w-auto brightness-0 invert"
                />
                <span className="sr-only">Optipeople</span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {copy.brand}
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{contactInfo.email}</span>
                </a>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{contactInfo.phone}</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-gray-400">
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
            </div>

            {/* Company links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">
                {copy.company}
              </h3>
              <ul className="space-y-3">
                {links.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizeHref(link.href, locale)}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modules links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">
                {copy.modules}
              </h3>
              <ul className="space-y-3">
                {links.modules.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizeHref(link.href, locale)}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">
                {copy.services}
              </h3>
              <ul className="space-y-3">
                {links.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizeHref(link.href, locale)}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">
                {copy.legal}
              </h3>
              <ul className="space-y-3">
                {links.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizeHref(link.href, locale)}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social links */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">
                  {copy.connect}
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.title}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                      aria-label={copy.followLabel(social.title)}
                    >
                      <social.icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                {currentYear} {contactInfo.companyName}. {copy.rights}
              </p>
              <p className="text-sm text-gray-500">
                {copy.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
