import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { LegalShell } from "@/components/legal-shell"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, pageName } from "@/lib/structured-data"
import { ConsentSettingsButton } from "@/components/consent-banner"

const PATH = "/privacy"
type Props = { params: Promise<{ locale: string }> }

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Privacy policy",
    description:
      "How OptiPeople ApS collects, uses, and protects personal data on this website.",
  },
  da: {
    title: "Privatlivspolitik | OptiPeople",
    description:
      "Sådan indsamler, bruger og beskytter OptiPeople ApS personoplysninger på dette website.",
  },
}

const updated: Record<Locale, string> = {
  en: "28 October 2026",
  da: "28. oktober 2026",
}

const eyebrow: Record<Locale, string> = { en: "Legal", da: "Juridisk" }
const heading: Record<Locale, string> = {
  en: "Privacy policy",
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
    <LegalShell
      eyebrow={eyebrow[l]}
      title={heading[l]}
      locale={l}
      updated={updated[l]}
    >
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
            <span className="whitespace-nowrap">+45 23 74 47 05</span>.
          </p>
          <h2>Hvad vi indsamler, og hvorfor</h2>
          <p>
            Vi indsamler de personoplysninger, du selv giver os, og statistik om,
            hvordan sitet bliver brugt:
          </p>
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
            <li>
              <strong>Statistik.</strong> Vi bruger Google Analytics til at se,
              hvilke sider der bliver besøgt, hvor de besøgende kommer fra, og om de
              sender en formular eller klikker på et telefonnummer eller en
              e-mailadresse. Hvordan det foregår, kan du læse under{" "}
              <a href="#statistik">Statistik med Google Analytics</a>. Cookies
              sætter vi kun på grundlag af dit samtykke (GDPR art. 6, stk. 1,
              litra a).
            </li>
          </ul>
          <h2>Sådan behandles dine data</h2>
          <p>
            Formularerne går gennem vores CRM-leverandør (monday.com), websitet
            hostes af Vercel, og statistikken ligger hos Google (Google Analytics).
            De behandler data på vores vegne som databehandlere
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
          <h2 id="statistik">Statistik med Google Analytics</h2>
          <p>
            Vi bruger Google Analytics 4 til at tælle besøg og til at se, hvilke
            kampagner der virker, fx hvilken mail der fik dig ind på sitet. Den kører
            i Googles Consent Mode. Det betyder, at det, der bliver målt, afhænger
            af, om du har sagt ja til cookies.
          </p>
          <h3>Uden dit samtykke</h3>
          <p>
            Det gælder alle, der ikke har sagt ja. Også alle på mobil, for der
            spørger vi slet ikke om cookies. Google Analytics måler så uden cookies.
            Der bliver ikke gemt noget på din enhed, og der bliver ikke sat et
            klient-id. Hver sidevisning og hvert klik bliver sendt til Google for
            sig, med:
          </p>
          <ul>
            <li>
              din IP-adresse. Google bruger den til at regne ud, hvilket land og
              hvilken by besøget kommer fra, og smider den så væk. GA4 logger og
              gemmer ikke IP-adresser.
            </li>
            <li>
              din browser og enhed, som browseren selv oplyser dem (user agent), og
              dit sprog og din skærmstørrelse
            </li>
            <li>adressen på siden og den side, du kom fra</li>
            <li>
              hvad du gør på siden: hvilke sider du ser, om du klikker på knapper,
              telefonnumre og e-mailadresser, og om du sender en formular
            </li>
            <li>
              kampagneoplysninger i det link, du kom ind fra. Det er fx
              utm-værdier og den reference (ref), der står i links i vores mails.
              Den viser, hvilken mail du klikkede på.
            </li>
          </ul>
          <h3>Med dit samtykke</h3>
          <p>
            Siger du ja på en computer, sætter Google Analytics også cookies (se{" "}
            <a href="#cookies">Cookies</a>). Så kan den kende din browser igen,
            næste gang du kommer, og vi kan se, hvor mange der kommer tilbage.
          </p>
          <h3>Formål og modtager</h3>
          <p>
            Vi bruger tallene til statistik om websitet og til at måle vores
            kampagner. Vi bruger dem ikke til reklame. Google får data som vores
            databehandler. Google kan overføre data til USA. Google LLC er
            certificeret under EU-US Data Privacy Framework.
          </p>
          <h3>Sådan siger du nej</h3>
          <p>
            Du kan altid{" "}
            <ConsentSettingsButton>ændre dit valg om cookies</ConsentSettingsButton>
            . Trækker du dit samtykke tilbage, sletter vi Google Analytics-cookies
            igen. Så bliver du kun målt uden cookies, som beskrevet ovenfor.
          </p>
          <p>
            Vil du slet ikke måles, kan du installere{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Googles tilføjelse til browseren, der slår Google Analytics fra
            </a>
            , eller blokere Google Analytics i din browser. Har du spørgsmål, så
            skriv til <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a>.
          </p>
          <h2 id="cookies">Cookies</h2>
          <p>
            På en computer spørger vi første gang, om vi må bruge cookies til
            statistik. På mobil spørger vi ikke, og der bliver ikke sat cookies.
            Indtil du siger ja, sætter Google Analytics ingen cookies, men måler
            stadig uden cookies, som beskrevet under{" "}
            <a href="#statistik">Statistik med Google Analytics</a>.
          </p>
          <p>
            Siger du ja, sætter Google Analytics cookien <code>_ga</code> og en{" "}
            <code>_ga_</code>-cookie for vores måling. De holder i op til to år og
            bruges kun til statistik. Vi bruger ikke cookies til reklame.
          </p>
          <p>
            Dit valg gemmer vi i din browser, så vi ikke spørger igen hver gang.
            Siger du nej, sletter vi Google Analytics-cookies igen.
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
            <span className="whitespace-nowrap">+45 23 74 47 05</span>.
          </p>
          <h2>What we collect and why</h2>
          <p>
            We collect the personal data you actively provide to us, and
            statistics about how the site is used:
          </p>
          <ul>
            <li>
              <strong>Contact requests.</strong> When you submit the contact
              form, we process your name, email, phone number (optional), and
              message so we can respond to your inquiry. The legal basis is our
              legitimate interest in answering you and taking steps prior to a
              possible agreement (GDPR Art. 6(1)(b) and (f)).
            </li>
            <li>
              <strong>Newsletter.</strong> If you sign up for our newsletter, we
              process your name, company, and email to send you updates you have
              consented to receive. The legal basis is your consent
              (GDPR Art. 6(1)(a)), which you can withdraw at any time.
            </li>
            <li>
              <strong>Statistics.</strong> We use Google Analytics to see which
              pages are visited, where visitors come from, and whether they send
              a form or click a phone number or email address. How this works is
              described under{" "}
              <a href="#analytics">Statistics with Google Analytics</a>. We set
              cookies only with your consent (GDPR Art. 6(1)(a)).
            </li>
          </ul>
          <h2>How your data is processed</h2>
          <p>
            Form submissions are handled through our CRM provider (monday.com),
            our website is hosted by Vercel, and statistics are processed by
            Google (Google Analytics). These providers act as data
            processors on our behalf under data-processing agreements and may
            process data within the EU/EEA or under appropriate safeguards for
            international transfers.
          </p>
          <h2>Retention</h2>
          <p>
            We keep personal data only as long as necessary for the purpose it
            was collected, typically for the duration of our dialogue with you
            and any resulting business relationship, after which it is deleted
            or anonymized in line with applicable bookkeeping requirements.
          </p>
          <h2 id="analytics">Statistics with Google Analytics</h2>
          <p>
            We use Google Analytics 4 to count visits and to see which campaigns
            work, for example which email brought you to the site. It runs in
            Google&apos;s Consent Mode, so what is measured depends on whether
            you have said yes to cookies.
          </p>
          <h3>Without your consent</h3>
          <p>
            This applies to everyone who has not said yes, including every
            visitor on a phone, where we do not ask about cookies at all. Google
            Analytics then measures without cookies. Nothing is stored on your
            device and no client ID is set. Each page view and click is sent to
            Google as a separate measurement, with:
          </p>
          <ul>
            <li>
              your IP address. Google uses it to work out the country and city
              of the visit and then discards it. GA4 does not log or store IP
              addresses.
            </li>
            <li>
              your browser and device as your browser reports them (the user
              agent), plus your language and screen size
            </li>
            <li>the address of the page and the page you came from (referrer)</li>
            <li>
              what you do on the page: the pages you view, clicks on buttons,
              phone numbers and email addresses, and form submissions
            </li>
            <li>
              campaign details in the link you followed, such as utm values and
              the reference (ref) in links in our emails, which tells us which
              email you clicked
            </li>
          </ul>
          <h3>With your consent</h3>
          <p>
            If you say yes on a computer, Google Analytics also sets cookies
            (see <a href="#cookies">Cookies</a>). These let it recognise your
            browser on later visits, so we can see how many people come back.
          </p>
          <h3>Purpose and recipient</h3>
          <p>
            We use the data for statistics about the website and to measure our
            campaigns. We do not use it for advertising. Google receives the
            data as our processor. Google may transfer it to the US. Google LLC
            is certified under the EU-US Data Privacy Framework.
          </p>
          <h3>How to say no</h3>
          <p>
            You can{" "}
            <ConsentSettingsButton>change your cookie choice</ConsentSettingsButton>{" "}
            at any time. If you withdraw your consent, we delete the Google
            Analytics cookies, and you are then only measured without cookies,
            as described above.
          </p>
          <p>
            To opt out of the measurement altogether, install{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s Analytics opt-out browser add-on
            </a>
            , or block Google Analytics in your browser. If you have questions,
            write to <a href="mailto:hi@optipeople.dk">hi@optipeople.dk</a>.
          </p>
          <h2 id="cookies">Cookies</h2>
          <p>
            On a computer, we ask on your first visit whether we may use cookies
            for statistics. On a phone we do not ask, and no cookies are set.
            Until you say yes, Google Analytics sets no cookies but still
            measures without them, as described under{" "}
            <a href="#analytics">Statistics with Google Analytics</a>.
          </p>
          <p>
            If you accept, Google Analytics sets the <code>_ga</code> cookie and
            a <code>_ga_</code> cookie for our property. They last up to two
            years and are used for statistics only. We do not use advertising
            cookies.
          </p>
          <p>
            Your choice is stored in your browser so we do not ask on every
            visit. If you decline, we delete the Google Analytics cookies again.
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
