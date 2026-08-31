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
  subtitle: string
  countLabel: (count: number) => string
  listLabel: string
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
    backLabel: "Insights",
    eyebrow: "Blog",
    title: "Articles and insight pieces",
    subtitle:
      "Practical guidance on OEE, maintenance, and industrial data, plus what actually changes on the floor once production is measured.",
    countLabel: (count) => `${count} articles`,
    listLabel: "All articles",
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
    backLabel: "Indsigter",
    eyebrow: "Blog",
    title: "Artikler og indsigter",
    subtitle:
      "Praktisk viden om OEE, vedligehold og data fra produktionen, og om hvad der faktisk ændrer sig på gulvet, når man begynder at måle.",
    countLabel: (count) => `${count} artikler`,
    listLabel: "Alle artikler",
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
  const posts = getPostsByCategory("Insights", locale as Locale)
  const prefix = locale === "da" ? "/da" : ""

  return (
    <PostArchive
      posts={posts}
      basePath={`${prefix}/blog`}
      postBasePath={`${prefix}/blog`}
      backHref={`${prefix}/insights`}
      backLabel={t.backLabel}
      eyebrow={t.eyebrow}
      title={t.title}
      subtitle={t.subtitle}
      countLabel={t.countLabel(posts.length)}
      listLabel={t.listLabel}
      locale={locale}
      emptyTitle={t.emptyTitle}
      emptyBody={t.emptyBody}
      ctaLabel={t.ctaLabel}
      currentPage={currentPage}
      paginationLabel={t.paginationLabel}
      previousLabel={t.previousLabel}
      nextLabel={t.nextLabel}
    />
  )
}
