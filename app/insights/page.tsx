import Image from "next/image"
import Link from "next/link"
import { ArrowRight, FileText, Factory } from "lucide-react"

import { getLatestPostsByCategory, getPostsByCategory } from "@/lib/blog-data"

const sectionCards = [
  {
    title: "Blog posts",
    href: "/blog",
    description:
      "Editorial articles, explainers, and thought pieces about manufacturing, data, and digital operations.",
    icon: FileText,
    cta: "Browse blog posts",
    category: "Insights",
    accentClass: "bg-[linear-gradient(135deg,#f4efe6,#f8f6f1)]",
    badgeClass: "bg-[#efe1cf] text-[#8c5a2b]",
    buttonClass: "border-[#c96f4a]/20 bg-[#c96f4a] text-[#2f160a] hover:bg-[#b85f3a]",
    previewClass: "bg-white/80 hover:bg-white",
  },
  {
    title: "Cases",
    href: "/cases",
    description:
      "Customer stories and concrete examples of how factories use Opticloud to improve output, uptime, and decision-making.",
    icon: Factory,
    cta: "Browse case studies",
    category: "Cases",
    accentClass: "bg-[linear-gradient(135deg,#e7efe8,#f5f7f3)]",
    badgeClass: "bg-[#d7e7d8] text-[#234131]",
    buttonClass: "border-[#234131]/20 bg-[#234131] text-[#eef5ef] hover:bg-[#1b3327]",
    previewClass: "bg-[#f7faf7] hover:bg-[#eef5ef]",
  },
] as const

export default function InsightsLandingPage() {
  return (
    <main>
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
              Insights
            </p>
            <h1 className="text-4xl lg:text-5xl font-light text-foreground tracking-tight">
              One place for ideas and proof
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Use the blog for broader thinking and practical guidance. Use cases for concrete customer outcomes and implementation examples.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {sectionCards.map((card) => {
              const posts = getPostsByCategory(card.category)
              const latest = getLatestPostsByCategory(card.category, 2)
              const Icon = card.icon

              return (
                <article
                  key={card.href}
                  className={`overflow-hidden rounded-[2rem] border border-border/60 ${card.accentClass}`}
                >
                  <div className="border-b border-black/5 px-8 py-6 lg:px-10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-full ${card.badgeClass}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium tracking-wide text-foreground/80">
                            {card.title}
                          </p>
                          <p className="text-sm text-foreground/55">
                            {posts.length} {posts.length === 1 ? "post" : "posts"}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={card.href}
                        className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${card.buttonClass}`}
                      >
                        {card.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="px-8 py-8 lg:px-10 lg:py-10">
                    <h2 className="text-3xl font-light tracking-tight text-foreground">
                      {card.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
                      {card.description}
                    </p>

                    {latest.length > 0 && (
                      <div className="mt-8">
                        <p className="text-sm font-medium uppercase tracking-[0.14em] text-foreground/45">
                          Examples
                        </p>

                        <div className="mt-5 space-y-4">
                          {latest.map((post) => (
                            <Link
                              key={post.slug}
                              href={`/blog/${post.slug}`}
                              className={`group grid grid-cols-[104px_1fr] gap-4 rounded-[1.5rem] border border-black/5 p-3 transition-colors ${card.previewClass}`}
                            >
                              <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-black/5">
                                {post.image ? (
                                  <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center bg-black/5 text-foreground/45">
                                    <Icon className="h-5 w-5" />
                                  </div>
                                )}
                              </div>

                              <div className="flex min-w-0 flex-col justify-center">
                                <p className="text-xs uppercase tracking-[0.12em] text-foreground/45">
                                  {post.date}
                                </p>
                                <p className="mt-2 line-clamp-2 text-base font-medium leading-snug text-foreground/85 transition-colors group-hover:text-foreground">
                                  {post.title}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
