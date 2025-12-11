import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

type Cta = {
  label: string
  href: string
}

type NavLink = {
  label: string
  href: string
}

export type HomeContent = {
  nav: {
    brand: string
    links: NavLink[]
    cta?: Cta
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    primaryCta?: Cta
    secondaryCta?: Cta
  }
  highlights: {
    heading: string
    items: {
      title: string
      description: string
    }[]
  }
  about: {
    heading: string
    body: string
  }
  footer: {
    company: string
    blurb: string
    email?: string
    phone?: string
    location?: string
    links: NavLink[]
  }
}

const contentDirectory = path.join(process.cwd(), "content")

function normalizeLinks(links: unknown): NavLink[] {
  if (!Array.isArray(links)) return []

  return links
    .map((link) => ({
      label: typeof link?.["label"] === "string" ? link["label"] : "",
      href: typeof link?.["href"] === "string" ? link["href"] : "#",
    }))
    .filter((link) => link.label && link.href)
}

function normalizeCta(cta: unknown): Cta | undefined {
  if (!cta || typeof cta !== "object") return undefined

  const typed = cta as Record<string, unknown>
  const label = typeof typed.label === "string" ? typed.label : ""
  const href = typeof typed.href === "string" ? typed.href : ""

  if (!label || !href) return undefined

  return { label, href }
}

export async function getHomeContent(): Promise<HomeContent> {
  const filePath = path.join(contentDirectory, "home.md")
  const rawContent = await fs.readFile(filePath, "utf8")
  const { data, content } = matter(rawContent)

  const nav = data.nav ?? {}
  const hero = data.hero ?? {}
  const highlights = data.highlights ?? {}
  const about = data.about ?? {}
  const footer = data.footer ?? {}

  return {
    nav: {
      brand: typeof nav.brand === "string" ? nav.brand : "Optipeople",
      links: normalizeLinks(nav.links),
      cta: normalizeCta(nav.cta),
    },
    hero: {
      eyebrow: typeof hero.eyebrow === "string" ? hero.eyebrow : "",
      title: typeof hero.title === "string" ? hero.title : "",
      subtitle: typeof hero.subtitle === "string" ? hero.subtitle : "",
      primaryCta: normalizeCta(hero.primaryCta),
      secondaryCta: normalizeCta(hero.secondaryCta),
    },
    highlights: {
      heading:
        typeof highlights.heading === "string" ? highlights.heading : "",
      items: Array.isArray(highlights.items)
        ? highlights.items.map((item: Record<string, unknown>) => ({
            title: typeof item?.["title"] === "string" ? item["title"] : "",
            description:
              typeof item?.["description"] === "string"
                ? item["description"]
                : "",
          }))
        : [],
    },
    about: {
      heading: typeof about.heading === "string" ? about.heading : "",
      body:
        typeof about.body === "string"
          ? about.body
          : content.trim(),
    },
    footer: {
      company: typeof footer.company === "string" ? footer.company : "",
      blurb: typeof footer.blurb === "string" ? footer.blurb : "",
      email: typeof footer.email === "string" ? footer.email : undefined,
      phone: typeof footer.phone === "string" ? footer.phone : undefined,
      location:
        typeof footer.location === "string" ? footer.location : undefined,
      links: normalizeLinks(footer.links),
    },
  }
}

