import { CaseArchive } from "@/components/case-archive"
import { getCaseStudies } from "@/lib/blog-data"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Cases",
  description:
    "See how manufacturers use OptiPeople and Opticloud to improve OEE, reduce downtime, and make better production decisions.",
  path: "/cases",
})

export default function CasesPage() {
  const cases = getCaseStudies()

  return (
    <main>
      <CaseArchive
        cases={cases}
        postBasePath="/blog"
        backHref="/"
        backLabel="Back to home"
        eyebrow="Customer stories"
        title="Results from the factory floor"
        subtitle="How manufacturers use Opticloud to lift OEE, cut downtime, and turn production data into better decisions."
        emptyTitle="No case studies yet"
        emptyBody="Customer stories will appear here as they are published."
        ctaLabel="Read story"
      />
    </main>
  )
}
