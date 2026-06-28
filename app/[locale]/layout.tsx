import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { ClientOnlyHeader } from "@/components/client-only-header";
import { SiteFooter } from "@/components/site-footer";
import { LocalizedCallToAction } from "@/components/localized-call-to-action";
import { NewsletterPrompt } from "@/components/newsletter-prompt";
import { routing } from "@/i18n/routing";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";

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
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OptiPeople | Digital operations platform for manufacturers",
  description:
    "OptiPeople helps manufacturers connect machines, track production in real time, improve OEE, and turn operational data into action.",
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/favicon.ico"),
    email: "hej@optipeople.dk",
    telephone: "+45 23 74 47 05",
    sameAs: ["https://www.linkedin.com/company/optipeople-aps/"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };

  return (
    <html
      lang={locale}
      className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <ClientOnlyHeader />
          <main className="flex-1">{children}</main>
          <LocalizedCallToAction />
          <SiteFooter />
          <NewsletterPrompt />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
