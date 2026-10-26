import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import type { AnswerBlock, CaseLink } from "@/content/shared/types"
import type { PageTheme } from "@/lib/page-theme"

/**
 * The parts of a page written for buyer searches (Docs/seo/targets.md): a
 * short "what is X" answer right under the hero, and a customer case further
 * down. Shared by the module and feature templates, which place them and pass
 * the spacing their own section rhythm needs. The buyer FAQ is
 * components/page-faq.tsx.
 */
export function AnswerSection({
  answer,
  theme,
  className,
}: {
  answer: AnswerBlock
  theme: PageTheme
  className: string
}) {
  return (
    <section className={`px-[var(--edge)] ${className}`}>
      <div className="max-w-3xl border-l-2 pl-6 lg:pl-8" style={{ borderColor: theme.deep }}>
        <h2 className="text-xl font-normal leading-snug tracking-tight text-foreground lg:text-2xl">
          {answer.question}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground/78 lg:text-lg">
          {answer.body}
        </p>
      </div>
    </section>
  )
}

export function CaseSection({ caseLink, theme }: { caseLink: CaseLink; theme: PageTheme }) {
  const t = useTranslations("pageTemplate")

  return (
    <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
      <Link
        href={caseLink.href}
        className="group reveal flex flex-col justify-between gap-8 rounded-[1.25rem] p-7 sm:flex-row sm:items-end lg:rounded-[1.5rem] lg:p-10"
        style={{ backgroundColor: theme.tint }}
      >
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/65">
            {t("customerCase")} · {caseLink.customer}
          </p>
          <h2 className="mt-4 text-2xl font-normal leading-tight tracking-tight text-foreground lg:text-3xl">
            {caseLink.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/78">{caseLink.body}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-3 text-sm font-medium text-foreground/82 transition-colors group-hover:text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors group-hover:border-black/25 group-hover:bg-white">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
          {t("readCase")}
        </span>
      </Link>
    </section>
  )
}
