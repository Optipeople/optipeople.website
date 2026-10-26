import type { Locale } from "@/lib/i18n"

/**
 * Copy for the Opti Assist landing page (/ai/chat). It replaces the generic AI
 * capability template for this one slug, because Opti Assist is a product
 * people can try, and the page has to show it working rather than list
 * features. Meta tags, card copy and the closing CTA still come from
 * lib/ai-stack.ts.
 *
 * Everything here describes what the app at ai.optipeople.dk actually does, as
 * tried on the demo account in October 2026. The screenshots in
 * public/images/opti-assist are from that session.
 */

type Step = { title: string; body: string }
type Showcase = { title: string; body: string; image: string; alt: string }

export type OptiAssistCopy = {
  eyebrow: string
  heroTitle: string
  heroBody: string
  howLabel: string
  facts: string[]
  howTitle: string
  steps: Step[]
  showcaseTitle: string
  showcases: Showcase[]
  setupTitle: string
  setupBody: string
  setup: Step[]
  demo: DemoCopy
}

/** Text inside the animated phone in the hero. */
export type DemoCopy = {
  /** What the animation shows, read out instead of the drawn app. */
  label: string
  scan: string
  machine: string
  welcome: string
  suggestions: string[]
  placeholder: string
  q1: string
  tools1: string[]
  a1: string[]
  q2: string
  tools2: string[]
  a2Intro: string
  a2Steps: string[]
  sourcesLabel: string
  sources: string[]
  callService: string
  callTitle: string
  callSent: string
}

export const optiAssistCopy: Record<Locale, OptiAssistCopy> = {
  en: {
    eyebrow: "Opti Assist",
    heroTitle: "The answer is at the machine, one scan away",
    heroBody:
      "Put a QR sticker on the machine. The operator scans it, asks in their own words, and gets the answer from your manuals and the machine's live data, with the source to check. When it needs a person, one tap calls the technician.",
    howLabel: "See how it works",
    facts: [
      "No login at the machine",
      "Danish and English",
      "Type, talk or send a photo",
      "Sources on every answer",
    ],
    howTitle: "Three steps from question to answer",
    steps: [
      {
        title: "Scan the sticker",
        body: "Every machine gets its own QR code. The operator scans it with a phone or tablet and lands in the chat for exactly that machine. No app, no password.",
      },
      {
        title: "Ask in your own words",
        body: "Type the question, say it out loud, or send a photo of the screen. Ask in Danish or English, and the answer comes back in the same language.",
      },
      {
        title: "Get the answer, or a technician",
        body: "The answer comes from your own documents and live machine data, with the sources listed. If it is a job for a technician, Opti Assist says so and calls one.",
      },
    ],
    showcaseTitle: "What it does on the floor",
    showcases: [
      {
        title: "Answers from your own manuals, with the page to prove it",
        body: "Opti Assist reads the manuals, drawings and procedures you upload for each machine. It answers step by step, shows the pictures from the documents, and lists every source. Tap one and the PDF opens. When the manual does not cover something, it says so instead of guessing.",
        image: "/images/opti-assist/manual-answer.webp",
        alt: "Opti Assist answering a tool change question with steps, a picture from the manual and five source documents",
      },
      {
        title: "Live machine data in the same chat",
        body: "It is connected to the OptiPeople Data Platform, so it knows how the machine is doing right now: the state, the stop cause, the running order, parts produced and OEE. Ask why the machine is standing still, and get the real answer.",
        image: "/images/opti-assist/live-data-da.webp",
        alt: "Opti Assist explaining in Danish that the machine has been stopped for maintenance since 06:00, with the order and OEE",
      },
      {
        title: "It knows when to call a technician",
        body: "Technical and safety questions go to a person, not to a guess. One tap sends your service contact a text with a link to the conversation, so they know what is going on before they get to the machine.",
        image: "/images/opti-assist/call-service.webp",
        alt: "The Call a technician panel in Opti Assist, with a field for a short description",
      },
      {
        title: "One view across every machine",
        body: "Production managers can ask across the whole account at once: which machines had stops today, how uptime compares this week, and where the manuals are missing.",
        image: "/images/opti-assist/all-machines.webp",
        alt: "Opti Assist comparing stops, stop time and current state for two machines in a table",
      },
    ],
    setupTitle: "Up and running in an afternoon",
    setupBody:
      "You set it up per machine in a simple admin. No integration project, no training course for the operators.",
    setup: [
      {
        title: "Drop in the manuals",
        body: "Drag a folder of PDFs and pictures onto the machine. The folders stay as they are, and pictures get a description so they can be found.",
      },
      {
        title: "Print the QR code",
        body: "One code per machine. Put the sticker where the operator stands. You can replace or switch off a code at any time.",
      },
      {
        title: "Choose who gets called",
        body: "Pick the service contact. When an operator calls for help, the contact gets a text with a link to the conversation.",
      },
      {
        title: "It learns from the floor",
        body: "When an operator tells how a problem was solved, it becomes part of what Opti Assist knows about that machine, for the next shift.",
      },
    ],
    demo: {
      label: "Animation of Opti Assist on a phone: an operator scans the QR code on CNC Drilling, asks why the machine is stopped and gets the live stop data, asks how to recalibrate the tool length and gets the steps from the operator manual with sources, then calls a technician.",
      scan: "Scan to ask",
      machine: "CNC Drilling",
      welcome: "Ask about setup, maintenance, tool changes, alarms, or anything in the machine's manual.",
      suggestions: ["What can you help with?", "Where do I find the manual?"],
      placeholder: "Write your question here…",
      q1: "Why is the machine stopped?",
      tools1: ["Reading live machine data", "Checking today's stops"],
      a1: [
        "CNC Drilling has been stopped for Maintenance since 06:00, about 7 hours.",
        "Order “Nyt” started at 09:45 with 0 parts produced, so OEE for the shift is 0%.",
      ],
      q2: "How do I recalibrate the tool length?",
      tools2: ["Searching 18 documents", "Found in the operator manual"],
      a2Intro: "From the operator manual, §6.2:",
      a2Steps: [
        "Load the tool in S1.",
        "Go to Tools → Calibrate → Length.",
        "Confirm and save the new length.",
      ],
      sourcesLabel: "Sources",
      sources: ["04-operator-manual", "07-process-descriptions"],
      callService: "Call service",
      callTitle: "Technician called",
      callSent: "Your service contact got a text with a link to this chat.",
    },
  },
  da: {
    eyebrow: "Opti Assist",
    heroTitle: "Scan maskinen, og få svaret",
    heroBody:
      "Sæt et QR-mærke på maskinen. Operatøren scanner det, spørger med sine egne ord og får svaret fra jeres manualer og maskinens live data, med kilden, så man kan tjekke efter. Skal der en tekniker til, er det ét tryk.",
    howLabel: "Se, hvordan det virker",
    facts: [
      "Intet login ved maskinen",
      "Dansk og engelsk",
      "Skriv, tal eller send et billede",
      "Kilder på hvert svar",
    ],
    howTitle: "Fra spørgsmål til svar på tre trin",
    steps: [
      {
        title: "Scan mærket",
        body: "Hver maskine får sin egen QR-kode. Operatøren scanner den med telefon eller tablet og lander i chatten til netop den maskine. Ingen app og ingen adgangskode.",
      },
      {
        title: "Spørg med egne ord",
        body: "Skriv spørgsmålet, sig det højt, eller send et billede af skærmen. Spørg på dansk eller engelsk, så kommer svaret på samme sprog.",
      },
      {
        title: "Få svaret, eller en tekniker",
        body: "Svaret kommer fra jeres egne dokumenter og maskinens live data, og kilderne står under. Er det en opgave for en tekniker, siger Opti Assist det og tilkalder en.",
      },
    ],
    showcaseTitle: "Det kan den ude i produktionen",
    showcases: [
      {
        title: "Svar fra jeres egne manualer, med siden som bevis",
        body: "Opti Assist læser de manualer, tegninger og procedurer, I lægger ind til hver maskine. Den svarer trin for trin, viser billederne fra dokumenterne og skriver alle kilder på. Tryk på en, så åbner PDF'en. Står det ikke i manualen, siger den det i stedet for at gætte.",
        image: "/images/opti-assist/manual-answer.webp",
        alt: "Opti Assist svarer på et spørgsmål om værktøjsskift med trin, et billede fra manualen og fem kildedokumenter",
      },
      {
        title: "Maskinens live data i samme chat",
        body: "Den er koblet på OptiPeople Data Platform, så den ved, hvordan maskinen har det lige nu: tilstand, stopårsag, ordren, der kører, antal emner og OEE. Spørg, hvorfor maskinen står stille, og få det rigtige svar.",
        image: "/images/opti-assist/live-data-da.webp",
        alt: "Opti Assist forklarer, at maskinen har stået i vedligehold siden kl. 06:00, med ordre og OEE",
      },
      {
        title: "Den ved, hvornår der skal en tekniker til",
        body: "Tekniske spørgsmål og sikkerhed går til et menneske, ikke til et gæt. Ét tryk, så får jeres servicekontakt en SMS med et link til samtalen. Så ved teknikeren, hvad det drejer sig om, før han eller hun er ude ved maskinen.",
        image: "/images/opti-assist/call-service.webp",
        alt: "Panelet til at tilkalde en tekniker i Opti Assist, med plads til en kort beskrivelse",
      },
      {
        title: "Alle maskiner i ét overblik",
        body: "Produktionschefen kan spørge på tværs af alle maskiner på én gang: hvilke maskiner havde stop i dag, hvordan oppetiden ser ud i denne uge, og hvor der mangler manualer.",
        image: "/images/opti-assist/all-machines.webp",
        alt: "Opti Assist sammenligner stop, stoptid og tilstand for to maskiner i en tabel",
      },
    ],
    setupTitle: "I gang på en eftermiddag",
    setupBody:
      "I sætter det op maskine for maskine i en enkel administration. Intet integrationsprojekt og intet kursus for operatørerne.",
    setup: [
      {
        title: "Læg manualerne ind",
        body: "Træk en mappe med PDF'er og billeder ind på maskinen. Mapperne bliver, som de er, og billederne får en beskrivelse, så de kan findes.",
      },
      {
        title: "Print QR-koden",
        body: "Én kode pr. maskine. Sæt mærket, hvor operatøren står. I kan skifte en kode ud eller slå den fra, når I vil.",
      },
      {
        title: "Vælg, hvem der bliver kaldt",
        body: "Vælg servicekontakten. Når en operatør tilkalder hjælp, får kontakten en SMS med et link til samtalen.",
      },
      {
        title: "Den lærer af operatørerne",
        body: "Når en operatør fortæller, hvordan et problem blev løst, bliver det en del af det, Opti Assist ved om maskinen. Til næste skift.",
      },
    ],
    demo: {
      label: "Animation af Opti Assist på en telefon: en operatør scanner QR-koden på CNC Drilling, spørger, hvorfor maskinen står stille, og får dagens stopdata. Så spørger operatøren, hvordan værktøjslængden kalibreres, får trinene fra operatørmanualen med kilder og tilkalder til sidst en tekniker.",
      scan: "Scan og spørg",
      machine: "CNC Drilling",
      welcome: "Spørg om opstilling, vedligehold, værktøjsskift, alarmer eller alt andet i maskinens manual.",
      suggestions: ["Hvad kan du hjælpe med?", "Hvor finder jeg manualen?"],
      placeholder: "Skriv dit spørgsmål her…",
      q1: "Hvorfor står maskinen stille?",
      tools1: ["Læser maskinens live data", "Tjekker dagens stop"],
      a1: [
        "CNC Drilling har stået i vedligehold siden kl. 06:00, cirka 7 timer.",
        "Ordren “Nyt” startede kl. 09:45, men der er ikke lavet nogen emner endnu. OEE for skiftet er 0 %.",
      ],
      q2: "Hvordan kalibrerer jeg værktøjslængden?",
      tools2: ["Søger i 18 dokumenter", "Fundet i operatørmanualen"],
      a2Intro: "Fra operatørmanualen, afsnit 6.2:",
      a2Steps: [
        "Sæt værktøjet i S1.",
        "Gå til Tools → Calibrate → Length.",
        "Bekræft og gem den nye længde.",
      ],
      sourcesLabel: "Kilder",
      sources: ["04-operator-manual", "07-process-descriptions"],
      callService: "Tilkald tekniker",
      callTitle: "Tekniker tilkaldt",
      callSent: "Jeres servicekontakt har fået en SMS med et link til samtalen.",
    },
  },
}
