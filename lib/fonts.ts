import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

// The site fonts, declared once. Both root layouts (app/[locale]/layout.tsx
// and the Swedish app/sv/layout.tsx) import them from here: two identical
// next/font calls in different files break the Vercel build.

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

export const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  // Only quotes and blog pull quotes use it, never the first screen, so it
  // must not compete with the CSS and the sans for early bandwidth.
  preload: false,
  variable: "--font-ibm-plex-serif",
});

// Live readings and other small data, e.g. the module index on the homepage.
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  variable: "--font-ibm-plex-mono",
});
