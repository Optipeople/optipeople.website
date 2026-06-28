import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How OptiPeople ApS collects, uses, and protects personal data on this website.",
  path: "/privacy",
})

const lastUpdated = "28 June 2026"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-16 sm:pt-24 pb-10 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-6 text-base text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl prose prose-slate prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-p:leading-relaxed prose-a:text-foreground">
          <p>
            OptiPeople ApS (&quot;OptiPeople&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy
            and is committed to protecting your personal data. This policy
            explains what data we collect through this website, why we collect
            it, and the rights you have under the EU General Data Protection
            Regulation (GDPR) and Danish data-protection law.
          </p>

          <h2>Data controller</h2>
          <p>
            OptiPeople ApS, Sønderskovvej 17, 8362 Hørning, Denmark
            (CVR 32883532) is the data controller for personal data collected
            via this website. You can reach us at{" "}
            <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a> or
            +45 23 74 47 05.
          </p>

          <h2>What we collect and why</h2>
          <p>
            We only collect personal data that you actively provide to us:
          </p>
          <ul>
            <li>
              <strong>Contact requests.</strong> When you submit the contact
              form we process your name, email, phone number (optional), and
              message so we can respond to your enquiry. The legal basis is our
              legitimate interest in answering you and taking steps prior to a
              possible agreement (GDPR Art. 6(1)(b) and (f)).
            </li>
            <li>
              <strong>Newsletter.</strong> If you sign up for our newsletter we
              process your name, company, and email to send you updates you have
              consented to receive. The legal basis is your consent
              (GDPR Art. 6(1)(a)), which you can withdraw at any time.
            </li>
          </ul>

          <h2>How your data is processed</h2>
          <p>
            Form submissions are handled through our CRM provider (monday.com)
            and our website is hosted by Vercel. These providers act as data
            processors on our behalf under data-processing agreements and may
            process data within the EU/EEA or under appropriate safeguards for
            international transfers.
          </p>

          <h2>Retention</h2>
          <p>
            We keep personal data only as long as necessary for the purpose it
            was collected — typically for the duration of our dialogue with you
            and any resulting business relationship, after which it is deleted
            or anonymised in line with applicable bookkeeping requirements.
          </p>

          <h2>Cookies</h2>
          <p>
            This website uses only the strictly necessary technical storage
            required for it to function. We do not use advertising or tracking
            cookies. If this changes, we will update this policy and request
            consent where required.
          </p>

          <h2>Your rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion
            of your personal data, to object to or restrict processing, and to
            data portability. Where processing is based on consent, you may
            withdraw it at any time. To exercise any of these rights, contact{" "}
            <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a>.
          </p>
          <p>
            You also have the right to lodge a complaint with the Danish Data
            Protection Agency (Datatilsynet,{" "}
            <a
              href="https://www.datatilsynet.dk"
              target="_blank"
              rel="noopener noreferrer"
            >
              datatilsynet.dk
            </a>
            ) if you believe your data is processed unlawfully.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this privacy policy from time to time. The current
            version is always available on this page with the date of the latest
            revision shown above.
          </p>
        </div>
      </section>
    </main>
  )
}
