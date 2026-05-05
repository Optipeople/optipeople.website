import type { Metadata } from "next";
import "./globals.css";
import { ClientOnlyHeader } from "@/components/client-only-header";
import { SiteFooter } from "@/components/site-footer";
import { CallToAction } from "@/components/call-to-action";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OptiPeople | Digital operations platform for manufacturers",
  description:
    "OptiPeople helps manufacturers connect machines, track production in real time, improve OEE, and turn operational data into action.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: "OptiPeople | Digital operations platform for manufacturers",
    description:
      "OptiPeople helps manufacturers connect machines, track production in real time, improve OEE, and turn operational data into action.",
    siteName,
    images: [
      {
        url: absoluteUrl("/images/dashboard2.png"),
        alt: "OptiPeople production dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OptiPeople | Digital operations platform for manufacturers",
    description:
      "OptiPeople helps manufacturers connect machines, track production in real time, improve OEE, and turn operational data into action.",
    images: [absoluteUrl("/images/dashboard2.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/favicon.ico"),
    email: "hej@optipeople.dk",
    telephone: "+45 23 74 47 05",
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };

  const ibmPlexCssHref =
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;300;400;500;600&family=IBM+Plex+Serif:wght@400;500;600&display=swap";

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link rel="preload" as="style" href={ibmPlexCssHref} />
        <link
          id="ibm-plex-fonts"
          rel="stylesheet"
          href={ibmPlexCssHref}
          media="print"
          suppressHydrationWarning
        />
        <script
          // Non-blocking CSS load pattern: upgrade media once stylesheet is loaded.
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{var l=document.getElementById('ibm-plex-fonts');if(!l)return;function s(){l.media='all'};if(l.sheet){s();return;}l.addEventListener('load',s);})();",
          }}
        />
        <noscript>
          <link rel="stylesheet" href={ibmPlexCssHref} />
        </noscript>
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
      <body
        className="antialiased bg-background text-foreground min-h-screen flex flex-col"
      >
        <ClientOnlyHeader />
        <main className="flex-1">{children}</main>
        <CallToAction
          title="Turn insight into action"
          description="Stop guessing. Start running on facts."
          primaryLabel="Book a talk"
          primaryHref="/contact"
        />
        <SiteFooter />
      </body>
    </html>
  );
}
