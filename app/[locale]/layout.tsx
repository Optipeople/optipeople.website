import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LocalizedCallToAction } from "@/components/localized-call-to-action";
import { LazyNewsletterPrompt } from "@/components/newsletter-prompt-lazy";
import { ConsentBanner } from "@/components/consent-banner";
import { JsonLd } from "@/components/json-ld";
import { routing } from "@/i18n/routing";
import { consentDefaultScript } from "@/lib/analytics";
import { isIndexableDeploy } from "@/lib/indexing";
import { siteUrl } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  // Only quotes and blog pull quotes use it, never the first screen, so it
  // must not compete with the CSS and the sans for early bandwidth.
  preload: false,
  variable: "--font-ibm-plex-serif",
});

// Live readings and other small data, e.g. the module index on the homepage.
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OptiPeople | Run manufacturing and operations on live data",
  description:
    "One data foundation for the whole factory. Connect your machines, follow OEE live, and put every team on the same numbers, from the floor to management.",
  // Preview deploys stay out of search. Production leaves robots unset.
  ...(!isIndexableDeploy && { robots: { index: false, follow: false } }),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      // The head script may add data-consent before React hydrates.
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/* Consent Mode v2 defaults, before any tag could run. */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
        <JsonLd data={organizationSchema(locale)} />
        <JsonLd data={websiteSchema(locale)} />
      </head>
      {/* No `antialiased` here on purpose. Forcing
          -webkit-font-smoothing: antialiased thins every glyph on macOS, which
          made the light display type look frail. Leaving it off lets the OS use
          its normal smoothing so the same weights render with their real mass. */}
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <LocalizedCallToAction />
          <SiteFooter />
          <LazyNewsletterPrompt />
          <ConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
