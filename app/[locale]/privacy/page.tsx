import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { LegalShell } from "@/components/legal-shell"

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
    description: "Privatliv og databeskyttelse hos OptiPeople.",
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

  return (
    <LegalShell eyebrow={eyebrow[l]} title={heading[l]} locale={l}>
      {l === "da" ? (
        <>
          <p>
            OptiPeople ApS (&quot;OptiPeople&quot;, &quot;vi&quot;, &quot;os&quot;) respekterer dit
            privatliv og beskytter dine personoplysninger. Denne politik forklarer,
            hvilke data vi indsamler via dette website, hvorfor vi indsamler dem, og
            hvilke rettigheder du har efter databeskyttelsesforordningen (GDPR) og
            dansk databeskyttelseslovgivning.
          </p>
          <h2>Dataansvarlig</h2>
          <p>
            OptiPeople ApS, Sønderskovvej 17, 8362 Hørning (CVR 32883532) er
            dataansvarlig for personoplysninger indsamlet via dette website. Du kan
            kontakte os på <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a>{" "}
            eller +45 23 74 47 05.
          </p>
          <h2>Hvad vi indsamler og hvorfor</h2>
          <p>Vi indsamler kun de personoplysninger, du selv giver os:</p>
          <ul>
            <li>
              <strong>Kontakthenvendelser.</strong> Når du udfylder
              kontaktformularen, behandler vi dit navn, din e-mail, dit telefonnummer
              (valgfrit) og din besked, så vi kan svare dig. Behandlingsgrundlaget er
              vores legitime interesse i at besvare dig og tage skridt forud for en
              eventuel aftale (GDPR art. 6, stk. 1, litra b og f).
            </li>
            <li>
              <strong>Nyhedsbrev.</strong> Hvis du tilmelder dig vores nyhedsbrev,
              behandler vi dit navn, din virksomhed og din e-mail for at sende dig de
              opdateringer, du har samtykket til. Behandlingsgrundlaget er dit
              samtykke (GDPR art. 6, stk. 1, litra a), som du til enhver tid kan
              trække tilbage.
            </li>
          </ul>
          <h2>Hvordan dine data behandles</h2>
          <p>
            Formularer håndteres gennem vores CRM-leverandør (monday.com), og vores
            website hostes af Vercel. Disse leverandører fungerer som databehandlere
            for os under databehandleraftaler og behandler data inden for EU/EØS
            eller under passende garantier ved tredjelandsoverførsler.
          </p>
          <h2>Opbevaring</h2>
          <p>
            Vi opbevarer kun personoplysninger, så længe det er nødvendigt til
            formålet, typisk under vores dialog med dig og et eventuelt efterfølgende
            kundeforhold, hvorefter de slettes eller anonymiseres i
            overensstemmelse med gældende bogføringskrav.
          </p>
          <h2>Cookies</h2>
          <p>
            Dette website bruger kun den strengt nødvendige tekniske lagring, der
            kræves for, at sitet kan fungere. Vi bruger ikke reklame- eller
            sporingscookies. Ændres dette, opdaterer vi politikken og indhenter
            samtykke, hvor det kræves.
          </p>
          <h2>Dine rettigheder</h2>
          <p>
            Du har ret til at anmode om indsigt i, berigtigelse eller sletning af
            dine personoplysninger, til at gøre indsigelse mod eller begrænse
            behandlingen samt til dataportabilitet. Hvor behandlingen er baseret på
            samtykke, kan du til enhver tid trække det tilbage. Kontakt{" "}
            <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a> for at gøre brug
            af dine rettigheder.
          </p>
          <p>
            Du har også ret til at klage til Datatilsynet (
            <a
              href="https://www.datatilsynet.dk"
              target="_blank"
              rel="noopener noreferrer"
            >
              datatilsynet.dk
            </a>
            ), hvis du mener, at dine data behandles ulovligt.
          </p>
          <h2>Ændringer</h2>
          <p>
            Vi kan opdatere denne privatlivspolitik fra tid til anden. Den gældende
            version findes altid på denne side med datoen for seneste revision angivet
            ovenfor.
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
