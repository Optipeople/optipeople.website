import { features } from "@/content/pages/features"
import { services } from "@/content/pages/services"
import { solutions } from "@/content/pages/solutions"
import { moduleCatalog } from "@/content/modules-catalog"
import { aiCapabilities } from "@/lib/ai-stack"
import { getAllPosts, getCaseStudies, type BlogPost } from "@/lib/blog-data"
import { generalEmail, SUPPORT_EMAIL } from "@/lib/contact"
import { absoluteUrl } from "@/lib/seo"

// /llms.txt in the llmstxt.org format: a map of the site for AI assistants.
// Every list below is read from the same catalogs the sitemap uses, so a new
// module, page, guide or case shows up here the day it ships. Only the intro
// is hand-written. English only: the Danish pages mirror these under /da.

export const dynamic = "force-static"

type Entry = { title: string; href: string; description?: string }

const BRAND_SUFFIX = / \| OptiPeople$/

function link({ title, href, description }: Entry) {
  const line = `- [${title}](${absoluteUrl(href)})`
  return description ? `${line}: ${description}` : line
}

function section(heading: string, entries: Entry[]) {
  if (entries.length === 0) return ""
  return `## ${heading}\n\n${entries.map(link).join("\n")}\n`
}

// Cases carry a hand-written outcome line. Other posts fall back to the
// generated summary, minus the "At a Glance" heading many of them open with.
function postEntry(post: BlogPost): Entry {
  const description = post.outcome ?? post.summary.replace(/^At a Glance\s+/i, "")
  return { title: post.title, href: `/blog/${post.slug}`, description }
}

function build() {
  const posts = getAllPosts().filter((post) => post.category !== "Test")
  const guides = posts.filter((post) => post.category === "Insights")
  const cases = getCaseStudies()

  const intro = `# OptiPeople

> OptiPeople is a Danish digital operations company that helps manufacturers run production on live data. Its product, the OptiPeople Data Platform, is a modular MES: it connects the machines a factory already has, shows OEE and downtime as they happen, and adds modules for maintenance, quality, energy, orders, planning, documents, analysis and AI agents on the same data.

The platform fills the gap between the shopfloor and the ERP system. Besides the software, OptiPeople offers advisory on smart operations, automation, business intelligence and AI. Every page exists in English and Danish; the Danish version sits under the /da prefix of the same path.
`

  const parts = [
    intro,
    section("Platform", [
      {
        title: "OptiPeople Data Platform",
        href: "/platform",
        description: "Overview of the platform and how the modules share one data foundation.",
      },
      ...moduleCatalog.map((entry) => ({
        title: entry.label.en,
        href: entry.href,
        description: entry.blurb.en,
      })),
    ]),
    section(
      "AI",
      aiCapabilities.map((capability) => ({
        title: capability.content.en.cardTitle,
        href: capability.href,
        description: capability.content.en.cardSubtitle,
      })),
    ),
    section(
      "Features",
      features.map((page) => ({
        title: page.content.en.metaTitle.replace(BRAND_SUFFIX, ""),
        href: page.href,
        description: page.content.en.metaDescription,
      })),
    ),
    section(
      "Solutions",
      solutions.map((page) => ({
        title: page.content.en.metaTitle.replace(BRAND_SUFFIX, ""),
        href: page.href,
        description: page.content.en.metaDescription,
      })),
    ),
    section(
      "Services",
      services.map((page) => ({
        title: page.content.en.metaTitle.replace(BRAND_SUFFIX, ""),
        href: page.href,
        description: page.content.en.metaDescription,
      })),
    ),
    section("Customer cases", cases.map(postEntry)),
    section("Guides", guides.map(postEntry)),
    section("Company and contact", [
      { title: "About OptiPeople", href: "/about" },
      {
        title: "Contact",
        href: "/contact",
        description: `Book a demo or ask a question. Email ${generalEmail("en")} (Danish: ${generalEmail("da")}), support ${SUPPORT_EMAIL}.`,
      },
      { title: "Sitemap", href: "/sitemap.xml", description: "Every page in both languages." },
    ]),
  ]

  return parts.filter(Boolean).join("\n")
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
