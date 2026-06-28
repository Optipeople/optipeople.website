import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern your use of the OptiPeople website and its content.",
  path: "/terms",
})

const lastUpdated = "28 June 2026"

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-16 sm:pt-24 pb-10 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
            Terms of Service
          </h1>
          <p className="mt-6 text-base text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl prose prose-slate prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-p:leading-relaxed prose-a:text-foreground">
          <p>
            These terms govern your use of the OptiPeople ApS website at this
            domain. By accessing or using the site you agree to these terms. If
            you do not agree, please do not use the site.
          </p>

          <h2>About us</h2>
          <p>
            This website is operated by OptiPeople ApS, Sønderskovvej 17,
            8362 Hørning, Denmark (CVR 32883532). You can contact us at{" "}
            <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a>.
          </p>

          <h2>Use of the website</h2>
          <p>
            The content on this site is provided for general information about
            OptiPeople and the Opticloud platform. You may view and share it for
            lawful, non-commercial purposes. You agree not to misuse the site,
            attempt to gain unauthorised access, or disrupt its operation.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All trademarks, logos, text, graphics, and other material on this
            site are owned by OptiPeople ApS or its licensors and are protected
            by applicable intellectual-property laws. You may not reproduce or
            reuse them without our prior written permission.
          </p>

          <h2>No warranty</h2>
          <p>
            The website and its content are provided &quot;as is&quot; without
            warranties of any kind. While we work to keep information accurate
            and up to date, we do not guarantee that it is complete, current, or
            error-free.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, OptiPeople is not liable for any
            indirect or consequential loss arising from your use of, or
            inability to use, this website. Nothing in these terms limits
            liability that cannot be excluded under Danish law.
          </p>

          <h2>Products and services</h2>
          <p>
            Any commercial relationship regarding OptiPeople products or
            services is governed by the separate agreement entered into between
            you and OptiPeople. These website terms do not form part of that
            agreement.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by Danish law, and any disputes are subject
            to the jurisdiction of the Danish courts.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. The current version is
            always available on this page with the date of the latest revision
            shown above.
          </p>
        </div>
      </section>
    </main>
  )
}
