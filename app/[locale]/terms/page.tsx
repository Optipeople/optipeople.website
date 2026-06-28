import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { LegalShell } from "@/components/legal-shell"

const PATH = "/terms"
type Props = { params: Promise<{ locale: string }> }

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
    <LegalShell eyebrow={eyebrow[l]} title={heading[l]} locale={l}>
      {l === "da" ? (
        <>
          <p>
            Disse vilkår gælder for din brug af OptiPeople ApS&apos; website på dette
            domæne. Ved at tilgå eller bruge sitet accepterer du vilkårene. Er du
            ikke enig, bedes du ikke bruge sitet.
          </p>
          <h2>Om os</h2>
          <p>
            Dette website drives af OptiPeople ApS, Sønderskovvej 17, 8362 Hørning
            (CVR 32883532). Du kan kontakte os på{" "}
            <a href="mailto:hej@optipeople.dk">hej@optipeople.dk</a>.
          </p>
          <h2>Brug af websitet</h2>
          <p>
            Indholdet på sitet stilles til rådighed som generel information om
            OptiPeople og Opticloud-platformen. Du må se og dele det til lovlige,
            ikke-kommercielle formål. Du må ikke misbruge sitet, forsøge at opnå
            uautoriseret adgang eller forstyrre driften.
          </p>
          <h2>Immaterielle rettigheder</h2>
          <p>
            Alle varemærker, logoer, tekster, grafik og øvrigt materiale på sitet
            tilhører OptiPeople ApS eller selskabets licensgivere og er beskyttet af
            gældende immaterialret. Materialet må ikke gengives eller genbruges uden
            vores forudgående skriftlige tilladelse.
          </p>
          <h2>Ingen garanti</h2>
          <p>
            Websitet og dets indhold stilles til rådighed, som det er og forefindes,
            uden nogen form for garanti. Vi bestræber os på at holde informationen
            korrekt og opdateret, men garanterer ikke, at den er fuldstændig, aktuel
            eller fejlfri.
          </p>
          <h2>Ansvarsbegrænsning</h2>
          <p>
            I det omfang loven tillader det, er OptiPeople ikke ansvarlig for
            indirekte tab eller følgeskader, der opstår som følge af din brug af —
            eller manglende mulighed for at bruge — dette website. Intet i disse
            vilkår begrænser ansvar, der ikke kan fraskrives efter dansk ret.
          </p>
          <h2>Produkter og services</h2>
          <p>
            Ethvert kommercielt forhold vedrørende OptiPeoples produkter eller
            services reguleres af den separate aftale, der indgås mellem dig og
            OptiPeople. Disse vilkår for websitet udgør ikke en del af den aftale.
          </p>
          <h2>Lovvalg</h2>
          <p>
            Disse vilkår er underlagt dansk ret, og eventuelle tvister afgøres af de
            danske domstole.
          </p>
          <h2>Ændringer</h2>
          <p>
            Vi kan opdatere disse vilkår fra tid til anden. Den gældende version
            findes altid på denne side med datoen for seneste revision angivet
            ovenfor.
          </p>
        </>
      ) : (
        <>
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
        </>
      )}
    </LegalShell>
  )
}
