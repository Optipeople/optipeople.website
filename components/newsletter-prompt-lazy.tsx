"use client"

import dynamic from "next/dynamic"

// The prompt only appears after scrolling or on exit intent, so its code
// loads after the page is up instead of with the first scripts.
export const LazyNewsletterPrompt = dynamic(
  () => import("./newsletter-prompt").then((m) => m.NewsletterPrompt),
  { ssr: false }
)
