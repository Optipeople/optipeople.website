import { setRequestLocale } from "next-intl/server"

import { PostArchive } from "@/components/post-archive"
import { getPostsByCategory } from "@/lib/blog-data"
import { buildMetadata } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

type ArchiveCopy = {
  metaTitle: string
  metaDescription: string
  backLabel: string
  eyebrow: string
  title: string
  emptyTitle: string
  emptyBody: string
  ctaLabel: string
  paginationLabel: string
  previousLabel: string
  nextLabel: string
}

const copy: Record<Locale, ArchiveCopy> = {
  en: {
    metaTitle: "Blog",
    metaDescription:
      "Read OptiPeople articles on manufacturing efficiency, OEE, predictive maintenance, industrial data, and digital operations.",
    backLabel: "Back to insights",
    eyebrow: "Blog",
    title: "Articles and insight pieces",
    emptyTitle: "No blog posts yet",
    emptyBody:
      "This archive is reserved for editorial blog posts and insight articles. Case studies live in the separate cases archive.",
    ctaLabel: "Read article",
    paginationLabel: "Pagination",
    previousLabel: "Previous",
    nextLabel: "Next",
  },
  da: {
    metaTitle: "Blog | OptiPeople",
    metaDescription:
      "Læs artikler om produktionseffektivitet, OEE, vedligehold og digital drift.",
    backLabel: "Tilbage til indsigter",
    eyebrow: "Blog",
    title: "Artikler og indsigter",
    emptyTitle: "Ingen blogindlæg endnu",
    emptyBody:
      "Artikler og indsigter vises her, når de bliver publiceret.",
    ctaLabel: "Læs artikel",
    paginationLabel: "Sidenavigation",
    previousLabel: "Forrige",
    nextLabel: "Næste",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale] ?? copy.en
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/blog",
    locale: locale as Locale,
  })
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const { page } = await searchParams
  const t = copy[locale as Locale] ?? copy.en
  const currentPage = Math.max(1, parseInt(page || "1", 10))
  const posts = getPostsByCategory("Insights")
  const prefix = locale === "da" ? "/da" : ""

  return (
    <main>
      <PostArchive
        posts={posts}
        basePath={`${prefix}/blog`}
        postBasePath={`${prefix}/blog`}
        backHref={`${prefix}/insights`}
        backLabel={t.backLabel}
        eyebrow={t.eyebrow}
        title={t.title}
        emptyTitle={t.emptyTitle}
        emptyBody={t.emptyBody}
        ctaLabel={t.ctaLabel}
        currentPage={currentPage}
        paginationLabel={t.paginationLabel}
        previousLabel={t.previousLabel}
        nextLabel={t.nextLabel}
      />
    </main>
  )
}
