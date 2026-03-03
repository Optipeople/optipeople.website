import Link from "next/link"
import { Button } from "@/components/ui/button"

const helpOptions = [
  {
    title: "Documentation",
    description:
      "Guides and references for getting the most out of Opticloud.",
  },
  {
    title: "Contact support",
    description:
      "Reach our team directly for technical issues or questions about your setup.",
    href: "/contact",
    cta: "Get in touch",
  },
  {
    title: "FAQs",
    description:
      "Answers to the most common questions about Opticloud, integrations, and deployment.",
  },
]

export default function GetHelpPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            Get Help
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
            How can we help?
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Find answers, explore documentation, or get in touch with our team.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {helpOptions.map((option) => (
              <div key={option.title} className="space-y-3">
                <h3 className="text-lg font-medium">{option.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {option.description}
                </p>
                {option.href && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={option.href}>{option.cta}</Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
