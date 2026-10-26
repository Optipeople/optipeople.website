import type { Locale } from "@/i18n/routing"

// Copy for /contact (app/[locale]/contact/page.tsx). Kept here, not in the
// page, so the Markdown twin (lib/page-markdown.ts) can read the same text.

export type ContactCopy = {
  eyebrow: string
  headline: string
  body: string
  formTitle: string
  quickIntro: string
  orDivider: string
  stepsTitle: string
  steps: { title: string; description: string }[]
  emailLabel: string
  phoneLabel: string
  officeLabel: string
  officeLine2: string
}

export const contactCopy: Record<Locale, ContactCopy> = {
  en: {
    eyebrow: "Contact",
    headline: "Let's talk about your operations",
    body: "Tell us about your situation and we'll get back to you within one business day. No sales sequence, no gatekeeping: you talk to the people who run the platform.",
    formTitle: "Send a message",
    quickIntro: "Leave your email and we'll reach out, no form required.",
    orDivider: "or",
    stepsTitle: "What happens next",
    steps: [
      {
        title: "We read it the same day",
        description:
          "Your message goes to the team behind OptiPeople Data Platform, not into a queue.",
      },
      {
        title: "A short call",
        description:
          "Twenty minutes on your lines, your machines, and what you already measure today.",
      },
      {
        title: "A walkthrough on your data",
        description:
          "We show the platform against your own production rather than a demo dataset.",
      },
    ],
    emailLabel: "Email",
    phoneLabel: "Phone",
    officeLabel: "Office",
    officeLine2: "8362 Hørning, Denmark",
  },
  da: {
    eyebrow: "Kontakt",
    headline: "Lad os tage en snak om jeres drift",
    body: "Fortæl, hvor I står, så vender vi tilbage inden for én arbejdsdag. Ingen sælgerforløb og ingen mellemled: I taler direkte med dem, der står for platformen.",
    formTitle: "Skriv til os",
    quickIntro: "Skriv jeres e-mail, så kontakter vi jer. I behøver ikke udfylde en formular.",
    orDivider: "eller",
    stepsTitle: "Sådan foregår det",
    steps: [
      {
        title: "Vi læser den samme dag",
        description:
          "Beskeden går direkte til folkene bag OptiPeople Data Platform. Den havner ikke i en kø.",
      },
      {
        title: "En kort snak",
        description:
          "Tyve minutter om jeres linjer og maskiner, og om det, I allerede måler i dag.",
      },
      {
        title: "Vi viser det på jeres data",
        description:
          "Vi viser platformen på jeres egen produktion, ikke på demodata.",
      },
    ],
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    officeLabel: "Kontor",
    officeLine2: "8362 Hørning, Danmark",
  },
}

export const contactMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Contact OptiPeople",
    description:
      "Talk to OptiPeople about production monitoring, OEE, industrial integrations, and digital operations improvements for your factory.",
  },
  da: {
    title: "Kontakt OptiPeople",
    description:
      "Tag en snak med OptiPeople om overvågning af produktionen, OEE, integrationer og digital drift på jeres fabrik.",
  },
}

/** Phone and street, the same in both languages. The postcode line is in the copy. */
export const contactDetails = {
  phone: "+45 23 74 47 05",
  phoneHref: "tel:+4523744705",
  street: "Sønderskovvej 17",
}
