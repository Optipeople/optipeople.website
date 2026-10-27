import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import "../globals.css"

import { ConsentBanner } from "@/components/consent-banner"
import { svCopy } from "@/content/opti-assist-sv"
import { consentDefaultScript } from "@/lib/analytics"
import { ibmPlexSans } from "@/lib/fonts"
import { siteUrl } from "@/lib/seo"

// Root layout for the Swedish outreach pages under /sv. Swedish is not a site
// locale: these pages are reached only from cold email links, never from the
// site, and stay out of search. proxy.ts lets /sv/... past next-intl, and
// this layout stands in for app/[locale]/layout.tsx without the site header,
// footer, newsletter prompt or language switcher, none of which has a Swedish
// version. Same font, CSS and consent-gated GA4 as the rest of the site.

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function SwedishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" suppressHydrationWarning className={ibmPlexSans.variable}>
      <head>
        {/* Consent Mode v2 defaults, before any tag could run. */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        {/* The site's own consent banner, fed Swedish strings. Its privacy
            link resolves under the English locale. */}
        <NextIntlClientProvider
          locale="en"
          timeZone="Europe/Stockholm"
          messages={{ consent: svCopy.consent }}
        >
          {children}
          <ConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
