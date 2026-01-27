import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Optipeople | Reliable industrial staffing",
  description:
    "Optipeople builds ready-to-work crews for industrial operations across the Nordics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </head>
      <body
        className="antialiased bg-background text-foreground min-h-screen flex flex-col"
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
