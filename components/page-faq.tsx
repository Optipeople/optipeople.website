import type { PageFaq } from "@/content/shared/types"

/** The buyer questions on a module or feature page, on hairlines like the get-help FAQ. */
export function PageFaqSection({
  faq,
  afterBand = false,
}: {
  faq: PageFaq
  /** Set when a full-bleed coloured band sits directly above: it has no
   * bottom spacing to lend the heading. */
  afterBand?: boolean
}) {
  return (
    <section
      id="faq"
      className={`scroll-mt-24 px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28 ${afterBand ? "pt-16 sm:pt-20 lg:pt-28" : ""}`}
    >
      <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
        {faq.title}
      </h2>
      <dl className="mt-10 border-t border-black/[0.08] lg:mt-14">
        {faq.items.map((item) => (
          <div
            key={item.question}
            className="grid gap-4 border-b border-black/[0.08] py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-10"
          >
            <dt className="text-xl font-normal leading-snug tracking-tight text-foreground lg:text-2xl">
              {item.question}
            </dt>
            <dd className="text-base leading-relaxed text-foreground/78">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
