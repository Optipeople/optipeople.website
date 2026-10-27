import type { DemoCopy } from "@/content/opti-assist"

/**
 * Swedish copy for the unlinked cold email landing page /sv/opti-assist
 * (app/sv/opti-assist/page.tsx). Swedish is not a site locale: this one page
 * is all there is, so the copy lives here rather than in messages/.
 *
 * Claims stay inside what the rest of the site already says about Opti Assist
 * (content/opti-assist.ts, lib/ai-stack.ts) and about the customers (the Carl
 * Hansen & Søn and Dansk Træemballage cases). No prices, ever: the offer is a
 * demo and a free pilot.
 */

type Item = { title: string; body: string }

export const svCopy = {
  metaTitle: "Opti Assist | AI-assistent för verkstadsgolvet",
  metaDescription:
    "Operatörer och tekniker skannar QR-koden på maskinen och frågar på svenska. Svaren kommer från era egna manualer och elscheman, med källan på varje svar.",

  headerCta: "Boka demo",

  hero: {
    eyebrow: "Opti Assist för svensk industri",
    title: "Skanna maskinen. Få svaret direkt.",
    body: "Opti Assist är en AI-assistent för verkstadsgolvet. Operatörer och tekniker skannar QR-koden på maskinen och frågar på svenska. Svaret kommer från era egna manualer, elscheman och instruktioner, och du ser vilken sida det står på.",
    cta: "Boka en demo",
    offer: "Gratis pilot på upp till 5 maskiner",
    facts: [
      "Ingen inloggning, ingen app",
      "Fråga med text, röst eller bild",
      "Källan på varje svar",
      "Igång på en eftermiddag",
    ],
  },

  problem: {
    title: "Vem ringer du när maskinen står?",
    body: "Oftast samma två personer, de som kan maskinen. Eller så letar någon i pärmar och elscheman medan linjen står still.",
    items: [
      {
        title: "Ringa en kollega",
        body: "Den som kan maskinen jobbar ett annat skift, är på semester eller mitt i något annat. Frågan får vänta.",
      },
      {
        title: "Leta i pärmar",
        body: "Manualen finns någonstans. Att hitta rätt sida i rätt elschema tar tid, särskilt på natten.",
      },
      {
        title: "Vänta på teknikern",
        body: "Småsaker som operatören kunde ha löst själv blir ett servicejobb.",
      },
    ] satisfies Item[],
    answer:
      "Med Opti Assist har alla svaret i fickan. Den som står vid maskinen kan lösa mer själv, och teknikerna slipper svara på samma frågor om och om igen.",
  },

  how: {
    title: "Så fungerar det",
    steps: [
      {
        title: "Skanna QR-koden",
        body: "Varje maskin har sin egen QR-kod. Operatören skannar den med mobilen eller surfplattan och hamnar direkt i chatten för just den maskinen.",
      },
      {
        title: "Fråga på svenska",
        body: "Skriv frågan, säg den högt eller ta en bild på displayen. Med egna ord, som när du frågar en kollega.",
      },
      {
        title: "Få svaret med källa",
        body: "Svaret kommer från er egen dokumentation, och du ser vilken sida det står på. Finns det inte där säger Opti Assist det i stället för att gissa.",
      },
    ] satisfies Item[],
  },

  trust: {
    title: "Svar du kan lita på",
    items: [
      {
        title: "Källan på varje svar",
        body: "Varje svar visar vilket dokument och vilken sida det kommer från. Tryck på källan så öppnas PDF:en och du kan kolla själv.",
      },
      {
        title: "Den gissar inte",
        body: "Står det inte i dokumentationen säger Opti Assist det rakt ut. Ingen påhittad instruktion.",
      },
      {
        title: "Ingen inloggning, ingen app",
        body: "Operatören skannar och frågar. Inget konto, inget lösenord, inget att installera.",
      },
      {
        title: "Text, röst eller bild",
        body: "Skriv, prata eller skicka en bild på displayen. Du får svaret på svenska.",
      },
    ] satisfies Item[],
  },

  setup: {
    title: "Igång på en eftermiddag",
    body: "Inget integrationsprojekt. Ni laddar upp dokumentationen, och sedan fungerar det.",
    steps: [
      {
        title: "Ladda upp dokumentationen",
        body: "Manualer, elscheman, arbetsinstruktioner och SOP:er. Dra in PDF:er och bilder på maskinen. Mapparna får vara som de är.",
      },
      {
        title: "Skriv ut QR-koden",
        body: "En kod per maskin. Sätt dekalen där operatören står.",
      },
      {
        title: "Börja fråga",
        body: "Klart. Operatörerna kan fråga redan från första skiftet.",
      },
    ] satisfies Item[],
    platformNote:
      "Opti Assist fungerar helt fristående. Har ni OptiPeople Data Platform kan den dessutom svara på maskinens live data, som stopp, order och OEE. Men det behövs inte för att komma igång.",
  },

  offer: {
    eyebrow: "Erbjudande",
    title: "Testa gratis på upp till 5 maskiner",
    body: "Vi börjar med en kort demo. Vill ni gå vidare sätter vi upp Opti Assist på upp till fem av era maskiner, med er egen dokumentation, under en period som vi kommer överens om. Piloten är gratis.",
    points: [
      "Er egen dokumentation",
      "Upp till 5 maskiner",
      "En period som vi bestämmer tillsammans",
      "Ni ser själva om det sparar tid",
    ],
    cta: "Boka en demo",
  },

  proof: {
    title: "Danska trä- och metallföretag kör redan med OptiPeople",
    cases: [
      {
        company: "Carl Hansen & Søn",
        value: "Pilot",
        body: "Möbeltillverkaren kör ett pilotprojekt med Opti Assist.",
      },
      {
        company: "Dansk Træemballage",
        value: "+5 % OEE",
        body: "på tre månader med OptiPeople Data Platform, på den första uppkopplade linjen.",
      },
    ],
    logosLabel: "Några av våra kunder",
  },

  faq: {
    title: "Vanliga frågor",
    items: [
      {
        title: "Behöver vi OptiPeople Data Platform?",
        body: "Nej. Opti Assist fungerar helt fristående. Det enda den behöver är er dokumentation.",
      },
      {
        title: "Måste operatörerna logga in eller ladda ner en app?",
        body: "Nej. De skannar QR-koden på maskinen med mobilen eller surfplattan och kan fråga direkt.",
      },
      {
        title: "Vad händer om svaret inte finns i dokumentationen?",
        body: "Då säger Opti Assist det. Den hittar inte på ett svar.",
      },
      {
        title: "Vilken dokumentation kan vi ladda upp?",
        body: "Manualer, elscheman, arbetsinstruktioner, SOP:er och bilder, till exempel som PDF.",
      },
      {
        title: "Hur lång tid tar det att komma igång?",
        body: "En eftermiddag. Det är inget integrationsprojekt.",
      },
      {
        title: "Vad kostar piloten?",
        body: "Ingenting. Piloten på upp till 5 maskiner är gratis under den period vi kommer överens om.",
      },
    ] satisfies Item[],
  },

  booking: {
    title: "Boka en demo",
    body: "Fyll i formuläret så kontaktar vi dig och bokar en tid som passar. I demon ser du Opti Assist svara på riktiga frågor, och vi pratar om en gratis pilot hos er.",
    points: ["Gratis pilot på upp till 5 maskiner", "Igång på en eftermiddag", "Ingen inloggning för operatörerna"],
    fields: {
      name: "Namn",
      company: "Företag",
      email: "E-post",
      phone: "Telefon",
      machines: "Antal maskiner",
      machinesPlaceholder: "Välj",
      machineOptions: ["1 till 5", "6 till 20", "Fler än 20", "Vet inte"],
      message: "Meddelande",
      optional: "(valfritt)",
      messagePlaceholder: "Till exempel vilka maskiner det gäller",
    },
    errors: {
      name: "Skriv ditt namn.",
      company: "Skriv vilket företag du jobbar på.",
      email: "Skriv en giltig e-postadress.",
      phone: "Skriv ditt telefonnummer.",
      machines: "Välj ungefär hur många maskiner det gäller.",
      submit: "Något gick fel. Försök igen, eller mejla oss på",
    },
    submit: "Boka demo",
    sending: "Skickar…",
    privacy: "Vi använder bara dina uppgifter för att kontakta dig om demon.",
    privacyLink: "Integritetspolicy (på engelska)",
    successTitle: "Tack! Vi hör av oss.",
    successBody: "Vi kontaktar dig snart för att boka en tid som passar dig.",
  },

  finalCta: {
    title: "Se Opti Assist svara på era frågor",
    body: "Boka en demo, så visar vi hur det fungerar med dokumentation som liknar er.",
    cta: "Boka en demo",
  },

  footer: {
    company: "OptiPeople ApS, Danmark",
    privacy: "Integritetspolicy",
  },

  consent: {
    title: "Cookies för statistik",
    body: "Vi vill använda Google Analytics för att se hur sidan används, så att vi kan göra den bättre. Det sätts bara cookies om du säger ja, och du kan ändra dig när du vill. <link>Läs om cookies (på engelska)</link>",
    accept: "Godkänn",
    decline: "Avböj",
  },

  demo: {
    label:
      "Animation av Opti Assist i en mobil: en operatör skannar QR-koden på en CNC-borr, frågar vad ett larm betyder och får svaret ur elschemat, frågar hur verktygslängden kalibreras och får stegen ur operatörsmanualen med källor, och tillkallar till sist en tekniker.",
    scan: "Skanna och fråga",
    machine: "CNC-borr",
    welcome:
      "Fråga om ställ, underhåll, verktygsbyte, larm eller något annat i maskinens manual.",
    suggestions: ["Vad kan du hjälpa till med?", "Var hittar jag manualen?"],
    placeholder: "Skriv din fråga här…",
    q1: "Vad betyder larm 2041?",
    tools1: ["Söker i 18 dokument", "Hittat i elschemat"],
    a1: [
      "Larm 2041 betyder att skyddsdörren inte är stängd.",
      "Kontrollera dörrbrytaren S12. Elschema, sida 14.",
    ],
    q2: "Hur kalibrerar jag verktygslängden?",
    tools2: ["Söker i 18 dokument", "Hittat i operatörsmanualen"],
    a2Intro: "Ur operatörsmanualen, avsnitt 6.2:",
    a2Steps: [
      "Sätt verktyget i S1.",
      "Gå till Tools → Calibrate → Length.",
      "Bekräfta och spara den nya längden.",
    ],
    sourcesLabel: "Källor",
    sources: ["04-operatorsmanual", "07-elschema"],
    callService: "Ring service",
    callTitle: "Tekniker tillkallad",
    callSent: "Er servicekontakt har fått ett sms med en länk till chatten.",
  } satisfies DemoCopy,
}

export type SvCopy = typeof svCopy
