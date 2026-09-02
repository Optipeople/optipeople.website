import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { buildMetadata } from "@/lib/seo"
import { LegalShell } from "@/components/legal-shell"

const PATH = "/terms"
type Props = { params: Promise<{ locale: string }> }

// DRAFT, needs legal review before publishing.
// Intended "Last updated" date for this draft: 24 August 2026. The date shown
// on the page is rendered by components/legal-shell.tsx (shared with /privacy)
// and must be updated there when this draft is approved.
const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Terms of Service",
    description:
      "The terms that govern your use of the OptiPeople website and its content.",
  },
  da: {
    title: "Vilkår | OptiPeople",
    description: "Vilkår for brug af OptiPeople website og services.",
  },
}

const eyebrow: Record<Locale, string> = { en: "Legal", da: "Juridisk" }
const updated: Record<Locale, string> = {
  en: "24 August 2026",
  da: "24. august 2026",
}
const heading: Record<Locale, string> = {
  en: "Terms of Service",
  da: "Vilkår",
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

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const l = locale as Locale

  return (
    <LegalShell
      eyebrow={eyebrow[l]}
      title={heading[l]}
      locale={l}
      updated={updated[l]}
    >
      {l === "da" ? (
        <>
          <p>
            Disse vilkår (&quot;vilkårene&quot;) regulerer din adgang til og brug af
            OptiPeople ApS&apos; website på dette domæne, herunder alt indhold, der
            stilles til rådighed via sitet. Ved at tilgå eller bruge websitet
            accepterer du vilkårene. Er du ikke enig i dem, bedes du undlade at
            bruge sitet. Vilkårene gælder alene for websitet, ikke for
            OptiPeople Data Platform eller andre ydelser, jf. afsnittet om
            abonnementer og services nedenfor.
          </p>
          <h2>Hvem vi er</h2>
          <p>
            Websitet drives af OptiPeople ApS, Sønderskovvej 17, 8362 Hørning
            (CVR 32883532), et dansk anpartsselskab, der udvikler software til
            industrien, herunder OptiPeople Data Platform. Du kan kontakte os på{" "}
            <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a> eller
            +45 23 74 47 05.
          </p>
          <h2>Brug af websitet og licens til indholdet</h2>
          <p>
            Indholdet på sitet stilles til rådighed som generel information om
            OptiPeople, OptiPeople Data Platform og vores øvrige aktiviteter. Vi giver dig en
            begrænset, genkaldelig og ikke-eksklusiv ret til at se, downloade og
            udskrive indhold fra sitet til personlig brug og intern brug i din
            virksomhed. Indholdet må ikke videresælges, offentliggøres eller på
            anden måde udnyttes kommercielt uden vores forudgående skriftlige
            tilladelse.
          </p>
          <p>
            Beskrivelser af produkter, funktioner og priser på sitet er alene
            vejledende information og udgør ikke et bindende tilbud eller
            rådgivning. Vi kan til enhver tid ændre, flytte eller fjerne indhold
            uden varsel.
          </p>
          <h2>Immaterielle rettigheder</h2>
          <p>
            Alle varemærker, logoer, tekster, grafik, skærmbilleder, design,
            software og øvrigt materiale på sitet tilhører OptiPeople ApS eller
            vores licensgivere og er beskyttet af gældende immaterialret. Intet i
            disse vilkår overdrager rettigheder til dig ud over den begrænsede
            brugsret, der er beskrevet ovenfor. Navnene og logoerne
            &quot;OptiPeople&quot; og &quot;OptiPeople Data Platform&quot; må ikke anvendes uden vores
            skriftlige samtykke.
          </p>
          <h2>Acceptabel brug</h2>
          <p>Når du bruger websitet, må du ikke:</p>
          <ul>
            <li>
              forsøge at skaffe dig uautoriseret adgang til sitet, de servere,
              det kører på, eller tilknyttede systemer,
            </li>
            <li>
              forstyrre eller belaste driften, fx gennem angreb, automatiseret
              masseindsamling (scraping) eller lignende,
            </li>
            <li>indføre virus eller anden skadelig kode,</li>
            <li>
              udgive dig for at være en anden eller afgive urigtige oplysninger i
              vores formularer, eller
            </li>
            <li>bruge sitet i strid med gældende lovgivning.</li>
          </ul>
          <p>
            Vi kan uden varsel begrænse eller afbryde adgangen til sitet for
            brugere, der overtræder disse vilkår.
          </p>
          <h2>Formularer og oplysninger, du sender til os</h2>
          <p>
            Websitet har ingen brugerkonti, men du kan kontakte os via
            kontaktformularen og tilmelde dig vores nyhedsbrev. Du indestår for,
            at de oplysninger, du afgiver, er korrekte, og at du kun deler
            oplysninger, du har ret til at dele. En henvendelse via sitet skaber
            ikke i sig selv et kunde- eller rådgivningsforhold. Tilmelder du dig
            nyhedsbrevet, kan du til enhver tid afmelde dig igen. Vores
            behandling af personoplysninger er beskrevet i vores{" "}
            <Link href="/privacy">privatlivspolitik</Link>.
          </p>
          <h2>Abonnementer og services på OptiPeople Data Platform</h2>
          <p>
            Brug af OptiPeople Data Platform samt prøveforløb, abonnementer, support
            og andre kommercielle ydelser reguleres udelukkende af de separate
            skriftlige aftaler, der indgås mellem din virksomhed og OptiPeople.
            Disse websitevilkår gælder ikke for platformen, og intet på websitet
            ændrer eller supplerer sådanne aftaler. I tilfælde af uoverensstemmelse
            har den skriftlige aftale forrang.
          </p>
          <h2>Links til tredjeparter</h2>
          <p>
            Sitet kan indeholde links til eksterne websites, som vi ikke
            kontrollerer. Links er alene en service til dig og udtrykker ikke, at
            vi godkender eller står inde for indholdet. Din brug af eksterne
            sites sker på deres vilkår og for egen risiko.
          </p>
          <h2>Ansvarsfraskrivelse</h2>
          <p>
            Websitet og dets indhold stilles til rådighed, som det er og
            forefindes, uden garantier af nogen art. Vi bestræber os på at holde
            informationen korrekt og opdateret, men indestår ikke for, at den er
            fuldstændig, aktuel eller fejlfri, eller at sitet er tilgængeligt
            uden afbrydelser eller fejl.
          </p>
          <h2>Ansvarsbegrænsning</h2>
          <p>
            I det omfang gældende dansk ret tillader det, er OptiPeople ikke
            ansvarlig for tab, herunder indirekte tab, følgeskader, driftstab,
            tabt fortjeneste eller tab af data, der opstår som følge af din brug
            af, eller manglende mulighed for at bruge, websitet eller din tillid
            til indholdet på det. Intet i disse vilkår begrænser ansvar, der ikke
            kan fraskrives efter ufravigelig dansk ret, herunder ansvar for grov
            uagtsomhed eller forsæt, og vilkårene indskrænker ikke dine
            ufravigelige rettigheder som forbruger.
          </p>
          <h2>Ændringer af vilkårene</h2>
          <p>
            Vi kan opdatere disse vilkår fra tid til anden, fx når websitet eller
            lovgivningen ændrer sig. Den gældende version findes altid på denne
            side med datoen for seneste revision angivet ovenfor. Fortsat brug af
            sitet efter en opdatering udgør accept af de ændrede vilkår.
          </p>
          <h2>Lovvalg og værneting</h2>
          <p>
            Vilkårene er underlagt dansk ret uden hensyn til internationale
            lovvalgsregler. Enhver tvist, der udspringer af vilkårene eller din
            brug af websitet, afgøres af de danske domstole. Er du forbruger, kan
            du have ufravigelige rettigheder med hensyn til lovvalg og værneting,
            som disse vilkår ikke tilsidesætter.
          </p>
          <h2>Kontakt</h2>
          <p>
            Har du spørgsmål til disse vilkår, er du velkommen til at kontakte
            OptiPeople ApS, Sønderskovvej 17, 8362 Hørning, på{" "}
            <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a> eller
            +45 23 74 47 05.
          </p>
        </>
      ) : (
        <>
          <p>
            These terms of service (&quot;terms&quot;) govern your access to and use of
            the OptiPeople ApS website at this domain, including all content made
            available through it. By accessing or using the website you agree to
            these terms. If you do not agree, please do not use the site. These
            terms apply to the website only, not to the OptiPeople Data Platform or
            other services, as explained in the section on subscriptions and
            services below.
          </p>
          <h2>Who we are</h2>
          <p>
            This website is operated by OptiPeople ApS, Sønderskovvej 17,
            8362 Hørning, Denmark (CVR 32883532), a Danish limited company that
            develops software for industry, including the OptiPeople Data Platform.
            You can contact us at{" "}
            <a href="mailto:hi@optipeople.dk">hi@optipeople.dk</a> or
            +45 23 74 47 05.
          </p>
          <h2>Use of the website and content licence</h2>
          <p>
            The content on this site is provided as general information about
            OptiPeople, the OptiPeople Data Platform, and our other activities. We grant you a
            limited, revocable, non-exclusive right to view, download, and print
            content from the site for your personal use and for internal use
            within your organisation. You may not resell, republish, or otherwise
            commercially exploit the content without our prior written
            permission.
          </p>
          <p>
            Descriptions of products, features, and pricing on the site are
            provided for information only and do not constitute a binding offer
            or advice. We may change, move, or remove content at any time without
            notice.
          </p>
          <h2>Intellectual property</h2>
          <p>
            All trademarks, logos, text, graphics, screenshots, designs,
            software, and other material on this site are owned by OptiPeople
            ApS or our licensors and are protected by applicable
            intellectual-property laws. Nothing in these terms transfers any
            rights to you beyond the limited licence described above. The
            &quot;OptiPeople&quot; and &quot;OptiPeople Data Platform&quot; names and logos may not be used
            without our written consent.
          </p>
          <h2>Acceptable use</h2>
          <p>When using the website, you must not:</p>
          <ul>
            <li>
              attempt to gain unauthorised access to the site, the servers it
              runs on, or any connected systems,
            </li>
            <li>
              disrupt or overload its operation, for example through attacks,
              automated bulk collection (scraping), or similar activity,
            </li>
            <li>introduce viruses or other harmful code,</li>
            <li>
              impersonate someone else or submit false information through our
              forms, or
            </li>
            <li>use the site in violation of applicable law.</li>
          </ul>
          <p>
            We may restrict or terminate access to the site without notice for
            users who breach these terms.
          </p>
          <h2>Forms and information you submit</h2>
          <p>
            The website has no user accounts, but you can reach us through the
            contact form and sign up for our newsletter. You are responsible for
            ensuring that the information you provide is accurate and that you
            only share information you are entitled to share. Submitting an
            enquiry through the site does not by itself create a customer or
            advisory relationship. If you subscribe to the newsletter, you can
            unsubscribe at any time. How we handle personal data is described in
            our <Link href="/privacy">privacy policy</Link>.
          </p>
          <h2>OptiPeople Data Platform subscriptions and services</h2>
          <p>
            Use of the OptiPeople Data Platform, as well as trials, subscriptions,
            support, and other commercial services, is governed exclusively by
            the separate written agreements entered into between your
            organisation and OptiPeople. These website terms do not apply to the
            platform, and nothing on the website amends or supplements those
            agreements. In the event of any conflict, the written agreement
            prevails.
          </p>
          <h2>Third-party links</h2>
          <p>
            The site may contain links to external websites that we do not
            control. Links are provided for your convenience only and do not
            imply that we endorse or vouch for their content. Your use of
            external sites is subject to their terms and at your own risk.
          </p>
          <h2>Disclaimer of warranties</h2>
          <p>
            The website and its content are provided &quot;as is&quot; and &quot;as
            available&quot;, without warranties of any kind. While we work to keep
            information accurate and up to date, we do not warrant that it is
            complete, current, or error-free, or that the site will be available
            without interruption or errors.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by applicable Danish law, OptiPeople is not
            liable for any loss, including indirect or consequential loss, loss
            of business, loss of profits, or loss of data, arising from your use
            of, or inability to use, the website, or from your reliance on its
            content. Nothing in these terms limits liability that cannot be
            excluded under mandatory Danish law, including liability for gross
            negligence or intent, and these terms do not restrict any mandatory
            rights you may have as a consumer.
          </p>
          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time, for example when the
            website or the law changes. The current version is always available
            on this page with the date of the latest revision shown above.
            Continued use of the site after an update constitutes acceptance of
            the revised terms.
          </p>
          <h2>Governing law and venue</h2>
          <p>
            These terms are governed by Danish law, without regard to its
            conflict-of-law rules. Any dispute arising out of these terms or your
            use of the website is subject to the exclusive jurisdiction of the
            Danish courts. If you are a consumer, you may have mandatory rights
            regarding governing law and venue that these terms do not override.
          </p>
          <h2>Contact</h2>
          <p>
            If you have questions about these terms, you are welcome to contact
            OptiPeople ApS, Sønderskovvej 17, 8362 Hørning, Denmark, at{" "}
            <a href="mailto:hi@optipeople.dk">hi@optipeople.dk</a> or
            +45 23 74 47 05.
          </p>
        </>
      )}
    </LegalShell>
  )
}
