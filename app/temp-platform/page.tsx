import { PlatformVariants } from "@/components/platform-variants"

// Temporary exploration page — four alternatives to the homepage "Opti flower".
// Visit /temp-platform to compare. Safe to delete (this folder + components/platform-variants.tsx).
export const metadata = {
  title: "Platform visual — variants",
  robots: { index: false, follow: false },
}

export default function TempPlatformPage() {
  return (
    <main>
      <section className="border-b border-border/60 py-16 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Internal · scratch
        </p>
        <h1 className="mt-3 text-4xl font-light tracking-tight text-foreground lg:text-5xl">
          Four ways to replace the Opti flower
        </h1>
        <p className="mx-auto mt-4 max-w-2xl px-6 text-lg text-muted-foreground">
          Same content as the flower — one platform, many connected modules — said with a clearer
          visual grammar. Every tile is clickable and opens the module detail, just like today.
        </p>
      </section>

      <PlatformVariants />
    </main>
  )
}
