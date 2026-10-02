import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { LegalShell } from "@/components/legal-shell"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, pageName } from "@/lib/structured-data"

const PATH = "/privacy"
type Props = { params: Promise<{ locale: string }> }

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Privacy Policy",
    description:
      "How OptiPeople ApS collects, uses, and protects personal data on this website.",
  },
  da: {
    title: "Privatlivspolitik | OptiPeople",
    description:
      "Sådan indsamler, bruger og beskytter OptiPeople ApS personoplysninger på dette website.",
  },
}

const eyebrow: Record<Locale, string> = { en: "Legal", da: "Juridisk" }
const heading: Record<Locale, string> = {
  en: "Privacy Policy",
  da: "Privatlivspolitik",
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const m = meta[locale as Locale]
  return buildMetadata({
    title: m.title,
    description: m.description,
    path: PATH,
    locale: locale as Locale,
  })
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const l = locale as Locale

  const m = meta[l]
  return (
    <LegalShell eyebrow={eyebrow[l]} title={heading[l]} locale={l}>
      <JsonLd
        data={breadcrumbSchema(locale as Locale, [
          { name: pageName(m.title), path: PATH },
        ])}
      />
      {l === "da" ? (
        <>
          <p>
            OptiPeople ApS (&quot;OptiPeople&quot;, &quot;vi&quot;, &quot;os&quot;) respekterer dit
            privatliv og passer på dine personoplysninger. Her kan du læse, hvilke
            oplysninger vi indsamler via dette website, hvorfor vi gør det, og hvilke
            rettigheder du har efter databeskyttelsesforordningen (GDPR) og den
            danske databeskyttelseslov.
          </p>
          <h2>Dataansvarlig</h2>
          <p>
            OptiPeople ApS, Sønderskovvej 17, 8362 Hørning (CVR 32883532) er
            dataansvarlig for de personoplysninger, vi indsamler via dette website.
            Du kan skrive til os på{" "}
            <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a> eller ringe på
            +45 23 74 47 05.
          </p>
          <h2>Hvad vi indsamler, og hvorfor</h2>
          <p>Vi indsamler kun de personoplysninger, du selv giver os:</p>
          <ul>
            <li>
              <strong>Henvendelser.</strong> Når du udfylder kontaktformularen,
              behandler vi dit navn, din e-mail, dit telefonnummer (hvis du oplyser
              det) og din besked, så vi kan svare dig. Det gør vi, fordi vi har en
              legitim interesse i at svare dig, og fordi det kan være nødvendigt,
              før vi eventuelt indgår en aftale med dig (GDPR art. 6, stk. 1, litra
              b og f).
            </li>
            <li>
              <strong>Nyhedsbrev.</strong> Når du tilmelder dig vores nyhedsbrev,
              behandler vi dit navn, din virksomhed og din e-mail, så vi kan sende dig
              de nyheder, du har sagt ja til. Det sker på grundlag af dit samtykke
              (GDPR art. 6, stk. 1, litra a). Du kan til enhver tid trække det
              tilbage.
            </li>
          </ul>
          <h2>Sådan behandles dine data</h2>
          <p>
            Formularerne går gennem vores CRM-leverandør (monday.com), og websitet
            hostes af Vercel. Begge behandler data på vores vegne som databehandlere
            under en databehandleraftale. De kan behandle data inden for EU/EØS eller
            uden for EU/EØS, hvis de nødvendige garantier for overførslen er på plads.
          </p>
          <h2>Opbevaring</h2>
          <p>
            Vi gemmer kun personoplysninger, så længe vi har brug for dem til det
            formål, de blev indsamlet til. Typisk er det, mens vi er i dialog med dig,
            og i et eventuelt kundeforhold bagefter. Derefter sletter eller
            anonymiserer vi dem under hensyn til de gældende regler om bogføring.
          </p>
          <h2>Cookies</h2>
          <p>
            Websitet bruger kun den tekniske lagring, der er strengt nødvendig, for at
            sitet kan fungere. Vi bruger ikke cookies til reklame eller sporing. Hvis
            det ændrer sig, opdaterer vi politikken og beder om dit samtykke, hvor
            loven kræver det.
          </p>
          <h2>Dine rettigheder</h2>
          <p>
            Du har ret til at bede om indsigt i de personoplysninger, vi har om dig,
            og om at få dem rettet eller slettet. Du kan også gøre indsigelse mod
            behandlingen eller bede om at få den begrænset, og du har ret til
            dataportabilitet, altså til at få dine data udleveret, så du kan tage dem
            med videre. Bygger behandlingen på dit samtykke, kan du til enhver tid
            trække det tilbage. Skriv til{" "}
            <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a>, hvis du vil
            bruge dine rettigheder.
          </p>
          <p>
            Du kan også klage til Datatilsynet (
            <a
              href="https://www.datatilsynet.dk"
              target="_blank"
              rel="noopener noreferrer"
            >
              datatilsynet.dk
            </a>
            ), hvis du mener, at dine data bliver behandlet ulovligt.
          </p>
          <h2>Ændringer</h2>
          <p>
            Vi kan opdatere privatlivspolitikken fra tid til anden. Den gældende
            version står altid på denne side, og datoen for den seneste ændring står
            øverst.
          </p>
        </>
      ) : (
        <>
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
            <a href="mailto:hi@optipeople.dk">hi@optipeople.dk</a> or
            +45 23 74 47 05.
          </p>
          <h2>What we collect and why</h2>
          <p>We only collect personal data that you actively provide to us:</p>
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
            was collected, typically for the duration of our dialogue with you
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
            <a href="mailto:hi@optipeople.dk">hi@optipeople.dk</a>.
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
        </>
      )}
    </LegalShell>
  )
}
