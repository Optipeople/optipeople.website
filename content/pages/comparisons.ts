import {
  buildLookup,
  type ComparisonPage,
  type LocalizedPage,
} from "@/content/shared/types"

// Competitor facts come only from the competitor's own public pages (plus,
// where marked, review sites and press), with the date they were read. When
// a page is re-checked, update the date in `checked` and every row it
// touched. OptiPeople facts repeat only what the rest of this site already
// says: no unsourced result percentages here.

const factbirdSources = [
  { label: "Factbird: Pricing", href: "https://www.factbird.com/pricing" },
  { label: "Factbird: About us", href: "https://www.factbird.com/about-us" },
  { label: "Factbird: Home page", href: "https://www.factbird.com/" },
  { label: "Factbird: Production Insights", href: "https://www.factbird.com/product/production-insights" },
  { label: "Factbird: Factbird DUO", href: "https://www.factbird.com/product/factbird-duo" },
  { label: "Factbird: Integrated data", href: "https://www.factbird.com/product/integrated-data" },
  { label: "Factbird: Connected Operations", href: "https://www.factbird.com/product/connected-operations" },
  { label: "Factbird: Energy monitoring devices", href: "https://www.factbird.com/product/industrial-energy-monitoring-devices" },
  { label: "Factbird: Utility monitoring", href: "https://www.factbird.com/solutions/utility-monitoring" },
  { label: "Factbird: Built-in manufacturing AI", href: "https://www.factbird.com/product/built-in-manufacturing-ai" },
  { label: "Factbird: Contact", href: "https://www.factbird.com/contact" },
  { label: "Factbird: Royal Unibrew case", href: "https://www.factbird.com/case-studies/royal-unibrew-dk" },
  { label: "Factbird: Free trial", href: "https://www.factbird.com/free-trial" },
]

const evoconSources = [
  { label: "Evocon: Home page", href: "https://evocon.com/" },
  { label: "Evocon: Pricing", href: "https://evocon.com/pricing/" },
  { label: "Evocon: Partners", href: "https://evocon.com/partner/" },
  { label: "Evocon: OEE software", href: "https://evocon.com/oee-software/" },
  { label: "Evocon: How Evocon works", href: "https://evocon.com/how-evocon-works/" },
  { label: "Evocon: What hardware you need", href: "https://evocon.com/kb/what-hardware-you-need-evocon/" },
  { label: "Evocon: The 6 types of production monitoring", href: "https://evocon.com/articles/faq/what-are-the-6-types-of-production-monitoring-which-ones-does-evocon-support/" },
  { label: "Evocon: SAP ERP integration", href: "https://evocon.com/kb/evocon-sap-erp-integration/" },
  { label: "Evocon: Customer support", href: "https://evocon.com/kb/customer-support" },
  { label: "Flexkom: OEE", href: "https://www.flexkom.dk/oee" },
  { label: "Evocon: About us", href: "https://evocon.com/about-us/" },
]

const comparisons: LocalizedPage<ComparisonPage>[] = [
  {
    slug: "evocon",
    href: "/compare/evocon",
    content: {
      en: {
        metaTitle: "OptiPeople vs Evocon: an honest comparison | OptiPeople",
        metaDescription:
          "OptiPeople Data Platform and Evocon compared on who they suit, data collection, MES and energy scope, AI, Danish support and pricing, with sources.",
        eyebrow: "Comparison",
        heroTitle: "OptiPeople vs Evocon",
        heroBody:
          "Both measure OEE and stop causes live and price per machine. Pick Evocon for simple, proven OEE tracking with public prices, a 30-day free trial and a box that counts from a relay signal. Pick OptiPeople when OEE should grow into orders, planning, energy per unit and maintenance on one platform, with a Danish team on site.",
        competitor: "Evocon",
        checked:
          "Evocon facts were checked on 26 October 2026 on the public pages of Evocon and its Danish partner Flexkom, linked at the bottom. Tell us if something has changed and we will correct it.",
        tableTitle: "Side by side, on what buyers ask",
        topicLabel: "Question",
        rows: [
          {
            topic: "Who it is for",
            us: "Manufacturers, machine builders and service teams, mostly in Denmark. Customers include Carl Hansen & Søn, VOLA, Montana and Hydro Extrusion.",
            them: "Manufacturers in more than 15 industries, with food and beverage, building materials, pharma, packaging and paper named first. Used in more than 60 countries, based in Estonia.",
            sources: [1, 11, 3],
          },
          {
            topic: "What it measures",
            us: "OEE as availability, performance and quality by shift, line and machine. Stop causes, quantities and scrap per order, and energy per unit produced.",
            them: "OEE in real time, downtime with stop reasons, output counts and scrap, plus checklists and alerts on the higher plans.",
            sources: [4, 7],
          },
          {
            topic: "Data collection",
            us: "Reads what the machine already has: PLCs (Siemens, Fanuc, Mitsubishi), OPC-UA, MQTT, Modbus, REST. Retrofit sensors and an edge gateway on older machines. Operator panels at the machine.",
            them: "Its own box with three inputs takes a signal from a sensor, a relay on the PLC or stack light, or a push-button. You supply the screens. Data already in a database can be sent over an HTTPS API. Setup takes a few days.",
            sources: [5, 6],
          },
          {
            topic: "MES scope",
            us: "A modular MES: OEE, orders with work instructions and traceability, planning against measured capacity, quality, maintenance and documents, on one data foundation. Runs with or without an ERP.",
            them: "An OEE system. Jobs can be read from the ERP and picked by the operator. Materials and labour are covered through ERP or MES integrations. Scheduling, work orders and traceability are not described.",
            sources: [7, 8],
          },
          {
            topic: "Energy",
            us: "An EMS module in the same platform: kWh per machine, line and site, and energy per unit, order and shift, next to OEE.",
            them: "Energy consumption monitoring is listed as supported, depending on plan.",
            sources: [7],
          },
          {
            topic: "AI assistant",
            us: "Opti Assist: a QR sticker on each machine opens a chat in Danish or English. It answers from your manuals and live machine data and shows its sources.",
            them: "AI Analyst, in beta, is part of the Professional plan.",
            sources: [2],
          },
          {
            topic: "Danish support",
            us: "A Danish company with the whole team in Hørning near Aarhus. We walk the site as part of onboarding.",
            them: "Evocon supports customers from Estonia, Monday to Friday 09:00 to 17:00 Estonian time, by email and in the app. In Denmark, Flexkom in Vejle is the authorised partner and offers support and training.",
            sources: [9, 3, 10],
          },
          {
            topic: "Pricing model",
            us: "A subscription per connected machine per month, not per user. Hardware and installation are priced separately. No public price list: you get a quote after we have looked at your machines.",
            them: "Public prices per machine per month, billed yearly: €189, €249 or €319 on a one-year agreement, less on three years, plus €19 a month for the box. Unlimited users. Sensors, screens, integrations and site visits cost extra. 30-day free trial.",
            sources: [2, 1],
          },
        ],
        strongerTitle: "Where Evocon is stronger",
        stronger: [
          {
            title: "Public prices and a free trial",
            description:
              "Evocon shows its prices per machine and lets you try it free for 30 days on your own line. We do not publish a price list or offer a trial you can start yourself.",
          },
          {
            title: "Simple to start",
            description:
              "A box with three inputs, a relay or a sensor, and a screen you already own. It counts and records stops without anyone working in the PLC, and Evocon says setup takes a few days.",
          },
          {
            title: "Proven in many countries",
            description:
              "Used in more than 60 countries and more than 15 industries, with partners in many countries and a 4.8 rating on Capterra shown on its home page.",
          },
          {
            title: "ISO 27001",
            description:
              "Evocon shows an ISO 27001 certification on its home page. We do not hold that certification.",
          },
        ],
        oursTitle: "Where OptiPeople is stronger",
        ours: [
          {
            title: "Orders and planning, not only OEE",
            description:
              "Orders, work instructions and planning run in the same platform as OEE, so every stop and every scrapped part lands on an order. You can start with OEE and switch on the next module when you are ready.",
          },
          {
            title: "Energy per unit next to OEE",
            description:
              "The EMS module ties kWh to the machine, the order and the shift, so energy shows up as cost per unit in the same place as your OEE.",
          },
          {
            title: "Reads the machine, not only a signal",
            description:
              "We connect to PLCs and controls over OPC-UA, MQTT and Modbus, so you get the machine's own states and counts, not only a pulse from a relay. Sensors go on only where nothing can be read.",
          },
          {
            title: "An assistant at the machine",
            description:
              "Opti Assist answers operators at the machine, in Danish, from your own manuals and live data. It does more than report on OEE losses.",
          },
          {
            title: "Danish, close by",
            description:
              "We are the supplier ourselves, not a partner in front of one, and we come out to the factory as part of the setup.",
          },
        ],
        chooseTitle: "Which one should you choose?",
        chooseThem:
          "Choose Evocon if you want OEE and stop tracking on a few machines quickly, at a known price, want to try it free first, and do not need orders, planning or energy in the same system.",
        chooseUs:
          "Choose OptiPeople if OEE is the first step and you want orders, planning, quality, maintenance and energy per unit on the same data later, with the machine's own signals read directly, and a Danish team on site.",
        sourcesTitle: "Sources",
        sourcesNote:
          "The public pages of Evocon and Flexkom, read on 26 October 2026. Prices and features change, so check their sites before you decide.",
        sources: evoconSources,
        faq: {
          title: "Questions about OptiPeople and Evocon",
          items: [
            {
              question: "Is Evocon or OptiPeople better for OEE?",
              answer:
                "Both measure OEE and stop causes live. Evocon is simple to start with its own signal box and a free trial. OptiPeople reads the machine's PLC and ties OEE to orders, planning and energy in the same platform. The better fit depends on whether you want OEE alone or a step towards an MES.",
            },
            {
              question: "Who sells Evocon in Denmark?",
              answer:
                "Evocon is an Estonian company. Its authorised partner in Denmark is Flexkom in Vejle, which offers support and training. OptiPeople is a Danish company in Hørning near Aarhus and sells and supports its platform itself.",
            },
            {
              question: "How is OptiPeople priced compared with Evocon?",
              answer:
                "Both charge per machine per month. Evocon publishes its prices: from €189 per machine per month on a one-year agreement, plus a fee for the box. OptiPeople is a subscription per connected machine per month, not per user, with hardware and installation priced separately. We give a quote after looking at your machines.",
            },
            {
              question: "Can Evocon measure energy?",
              answer:
                "Evocon lists energy consumption monitoring as supported, depending on plan. OptiPeople has an energy module in the same platform as OEE, which shows kWh per machine and energy per unit, order and shift.",
            },
          ],
        },
      },
      da: {
        metaTitle: "OptiPeople eller Evocon: en ærlig sammenligning | OptiPeople",
        metaDescription:
          "OptiPeople Data Platform og Evocon sammenlignet på målgruppe, dataopsamling, MES og energi, AI, dansk support og prismodel. Med kilder.",
        eyebrow: "Sammenligning",
        heroTitle: "OptiPeople eller Evocon",
        heroBody:
          "Begge måler OEE og stopårsager live, og begge tager pris pr. maskine. Vælg Evocon, hvis I vil have enkel OEE med kendte priser, 30 dages gratis prøve og en boks, der tæller ud fra et relæ. Vælg OptiPeople, når OEE skal vokse til ordrer, planlægning, energi pr. enhed og vedligehold på én platform, med et dansk hold, der kommer ud til jer.",
        competitor: "Evocon",
        checked:
          "Fakta om Evocon er tjekket 26. oktober 2026 på Evocons og deres danske partner Flexkoms sider. Linkene står nederst. Sig til, hvis noget har ændret sig, så retter vi det.",
        tableTitle: "Side om side, på det, købere spørger om",
        topicLabel: "Spørgsmål",
        rows: [
          {
            topic: "Hvem er det til",
            us: "Produktionsvirksomheder, maskinbyggere og serviceafdelinger, mest i Danmark. Blandt kunderne er Carl Hansen & Søn, VOLA, Montana og Hydro Extrusion.",
            them: "Produktion i mere end 15 brancher, hvor fødevarer og drikkevarer, byggematerialer, pharma, emballage og papir står først. Brugt i mere end 60 lande, hjemme i Estland.",
            sources: [1, 11, 3],
          },
          {
            topic: "Hvad det måler",
            us: "OEE som tilgængelighed, ydelse og kvalitet pr. skift, linje og maskine. Stopårsager, antal og kassation pr. ordre og energi pr. produceret enhed.",
            them: "OEE live, nedetid med stopårsager, antal og kassation, plus tjeklister og alarmer på de dyrere planer.",
            sources: [4, 7],
          },
          {
            topic: "Dataopsamling",
            us: "Vi læser det, maskinen allerede har: PLC'er (Siemens, Fanuc, Mitsubishi), OPC-UA, MQTT, Modbus, REST. Sensorer og en gateway på de ældre maskiner. Operatørpaneler ved maskinen.",
            them: "Deres egen boks med tre indgange tager et signal fra en sensor, et relæ på PLC'en eller signaltårnet eller en trykknap. Skærmene skaffer I selv. Data, der allerede ligger i en database, kan sendes over et HTTPS-API. Det tager et par dage at sætte op.",
            sources: [5, 6],
          },
          {
            topic: "MES",
            us: "Et modulært MES: OEE, ordrer med arbejdsinstruktioner og sporbarhed, planlægning ud fra den målte kapacitet, kvalitet, vedligehold og dokumenter på samme data. Kører med eller uden ERP.",
            them: "Et OEE-system. Ordrer kan hentes fra ERP, og operatøren vælger, hvad der kører. Materialer og arbejdstid dækkes gennem integration til ERP eller MES. Planlægning, arbejdsordrer og sporbarhed er ikke beskrevet.",
            sources: [7, 8],
          },
          {
            topic: "Energi",
            us: "Et EMS-modul på samme platform: kWh pr. maskine, linje og fabrik og energi pr. enhed, ordre og skift, lige ved siden af OEE.",
            them: "Overvågning af energiforbrug står som understøttet, afhængigt af plan.",
            sources: [7],
          },
          {
            topic: "AI-assistent",
            us: "Opti Assist: et QR-mærke på hver maskine åbner en chat på dansk eller engelsk. Den svarer ud fra jeres manualer og maskinens live data og viser, hvor svaret kommer fra.",
            them: "AI Analyst, i beta, er med i Professional-planen.",
            sources: [2],
          },
          {
            topic: "Dansk support",
            us: "En dansk virksomhed med hele holdet i Hørning ved Aarhus. Vi går en runde på fabrikken, når vi sætter det op.",
            them: "Evocon har support fra Estland mandag til fredag 9 til 17 estisk tid, på mail og i appen. I Danmark er Flexkom i Vejle autoriseret partner og tilbyder support og træning.",
            sources: [9, 3, 10],
          },
          {
            topic: "Prismodel",
            us: "Et abonnement pr. tilkoblet maskine pr. måned, ikke pr. bruger. Hardware og installation prissættes for sig. Ingen offentlig prisliste: I får et tilbud, når vi har set jeres maskiner.",
            them: "Offentlige priser pr. maskine pr. måned, faktureret årligt: 189, 249 eller 319 euro på en etårig aftale, lidt mindre på tre år, plus 19 euro om måneden for boksen. Ubegrænset antal brugere. Sensorer, skærme, integrationer og besøg koster ekstra. 30 dages gratis prøve.",
            sources: [2, 1],
          },
        ],
        strongerTitle: "Hvor Evocon er stærkere",
        stronger: [
          {
            title: "Priserne står på hjemmesiden, og I kan prøve gratis",
            description:
              "Evocon viser sine priser pr. maskine og lader jer prøve det gratis i 30 dage på jeres egen linje. Vi har ingen offentlig prisliste og ingen prøveperiode, I selv kan starte.",
          },
          {
            title: "Enkelt at komme i gang",
            description:
              "En boks med tre indgange, et relæ eller en sensor og en skærm, I allerede har. Den tæller og registrerer stop, uden at nogen skal ind i PLC'en, og Evocon siger, det tager et par dage.",
          },
          {
            title: "Afprøvet i mange lande",
            description:
              "Brugt i mere end 60 lande og over 15 brancher, med partnere i mange lande og 4,8 på Capterra, som de viser på forsiden.",
          },
          {
            title: "ISO 27001",
            description:
              "Evocon viser en ISO 27001-certificering på forsiden. Den certificering har vi ikke.",
          },
        ],
        oursTitle: "Hvor OptiPeople er stærkere",
        ours: [
          {
            title: "Ordrer og planlægning, ikke kun OEE",
            description:
              "Ordrer, arbejdsinstruktioner og planlægning kører på samme platform som OEE, så hvert stop og hver kasseret del lander på en ordre. I kan starte med OEE og slå næste modul til, når I er klar.",
          },
          {
            title: "Energi pr. enhed ved siden af OEE",
            description:
              "EMS-modulet kobler kWh til maskinen, ordren og skiftet. Energien bliver en pris pr. enhed, samme sted som jeres OEE.",
          },
          {
            title: "Vi læser maskinen, ikke kun et signal",
            description:
              "Vi kobler på PLC'er og styringer over OPC-UA, MQTT og Modbus, så I får maskinens egne tilstande og tællere og ikke kun en puls fra et relæ. Sensorer kommer kun på, hvor der ikke er noget at læse.",
          },
          {
            title: "En assistent ved maskinen",
            description:
              "Opti Assist svarer operatøren ved maskinen, på dansk, ud fra jeres egne manualer og live data. Den gør mere end at lave en rapport om OEE-tab.",
          },
          {
            title: "Dansk og tæt på",
            description:
              "Vi er selv leverandøren, ikke en partner foran en, og vi kommer ud på fabrikken, når det skal sættes op.",
          },
        ],
        chooseTitle: "Hvilken skal I vælge?",
        chooseThem:
          "Vælg Evocon, hvis I hurtigt vil have OEE og stopregistrering på nogle få maskiner til en kendt pris, vil prøve det gratis først og ikke har brug for ordrer, planlægning eller energi i samme system.",
        chooseUs:
          "Vælg OptiPeople, hvis OEE er første skridt, og I senere vil have ordrer, planlægning, kvalitet, vedligehold og energi pr. enhed på de samme data, med maskinens egne signaler læst direkte og et dansk hold, der kommer ud til jer.",
        sourcesTitle: "Kilder",
        sourcesNote:
          "Evocons og Flexkoms offentlige sider, læst 26. oktober 2026. Priser og funktioner ændrer sig, så tjek deres sider, før I beslutter jer.",
        sources: evoconSources,
        faq: {
          title: "Spørgsmål om OptiPeople og Evocon",
          items: [
            {
              question: "Er Evocon eller OptiPeople bedst til OEE?",
              answer:
                "Begge måler OEE og stopårsager live. Evocon er enkelt at starte med deres egen signalboks og en gratis prøveperiode. OptiPeople læser maskinens PLC og kobler OEE til ordrer, planlægning og energi på samme platform. Hvad der passer bedst, afhænger af, om I kun vil have OEE, eller om det er et skridt mod et MES.",
            },
            {
              question: "Hvem sælger Evocon i Danmark?",
              answer:
                "Evocon er en estisk virksomhed. Deres autoriserede partner i Danmark er Flexkom i Vejle, som tilbyder support og træning. OptiPeople er en dansk virksomhed i Hørning ved Aarhus og sælger og supporterer selv sin platform.",
            },
            {
              question: "Hvordan er OptiPeoples pris i forhold til Evocons?",
              answer:
                "Begge tager betaling pr. maskine pr. måned. Evocon viser sine priser: fra 189 euro pr. maskine pr. måned på en etårig aftale plus et gebyr for boksen. OptiPeople er et abonnement pr. tilkoblet maskine pr. måned, ikke pr. bruger, og hardware og installation prissættes for sig. I får et tilbud, når vi har set jeres maskiner.",
            },
            {
              question: "Kan Evocon måle energi?",
              answer:
                "Evocon skriver, at overvågning af energiforbrug er understøttet, afhængigt af plan. OptiPeople har et energimodul på samme platform som OEE, som viser kWh pr. maskine og energi pr. enhed, ordre og skift.",
            },
          ],
        },
      },
    },
  },
  {
    slug: "factbird",
    href: "/compare/factbird",
    content: {
      en: {
        metaTitle: "OptiPeople vs Factbird: an honest comparison | OptiPeople",
        metaDescription:
          "OptiPeople Data Platform and Factbird compared on who they suit, data collection, MES and energy scope, AI, Danish support and pricing, with sources.",
        eyebrow: "Comparison",
        heroTitle: "OptiPeople vs Factbird",
        heroBody:
          "Both are Danish and both measure OEE and stops live. Pick Factbird for fast, self-contained line monitoring with its own sensor box, public prices and a large international customer base. Pick OptiPeople when OEE is the first step towards orders, planning, energy per unit and maintenance on one platform, set up with a team that walks your floor.",
        competitor: "Factbird",
        checked:
          "Factbird facts were checked on 26 October 2026 on Factbird's own public pages, linked at the bottom. Tell us if something has changed and we will correct it.",
        tableTitle: "Side by side, on what buyers ask",
        topicLabel: "Question",
        rows: [
          {
            topic: "Who it is for",
            us: "Manufacturers, machine builders and service teams, mostly in Denmark. Customers include Carl Hansen & Søn, VOLA, Montana and Hydro Extrusion.",
            them: "Food and beverage, consumer goods, packaging, pharma, automotive and more. Over 300 companies in 28 countries, with offices in Denmark and the US.",
            sources: [2, 3],
          },
          {
            topic: "What it measures",
            us: "OEE as availability, performance and quality by shift, line and machine. Stop causes, quantities and scrap per order, and energy per unit produced.",
            them: "OEE, downtime with stop causes and Pareto, rejects and defects, down to batch or product level.",
            sources: [4, 7],
          },
          {
            topic: "Data collection",
            us: "Reads what the machine already has: PLCs (Siemens, Fanuc, Mitsubishi), OPC-UA, MQTT, Modbus, REST. Retrofit sensors and an edge gateway on older machines. Operator panels at the machine.",
            them: "Its own Factbird DUO box with two sensors over 4G or WiFi, which installs in under an hour. PLC data over MQTT or OPC UA via Kepware, plus barcode scanners and an operator tablet.",
            sources: [5, 6, 13],
          },
          {
            topic: "MES scope",
            us: "A modular MES: OEE, orders with work instructions and traceability, planning against measured capacity, quality, maintenance and documents, on one data foundation. Runs with or without an ERP.",
            them: "No product called MES. Connected Operations covers digital SOPs, quality checks, maintenance, e-signatures and audit trails. Production orders are not described; ERP and MES are integration targets.",
            sources: [7, 1],
          },
          {
            topic: "Energy",
            us: "An EMS module in the same platform: kWh per machine, line and site, and energy per unit, order and shift, next to OEE.",
            them: "Clip-on current sensors and Siemens meters. Utility monitoring covers electricity, water, gas and compressed air, with product-level carbon footprint. Sold as an add-on.",
            sources: [8, 9, 1],
          },
          {
            topic: "AI assistant",
            us: "Opti Assist: a QR sticker on each machine opens a chat in Danish or English. It answers from your manuals and live machine data and shows its sources.",
            them: "An AI assistant for production questions, an AI visual counter, AI that turns paper forms into digital checklists, and a read-only MCP link for Claude, ChatGPT and Copilot.",
            sources: [10],
          },
          {
            topic: "Danish support",
            us: "A Danish company with the whole team in Hørning near Aarhus. We walk the site as part of onboarding.",
            them: "A Danish company (Factbird ApS) with a Danish phone number. The website is in English, German and Polish, and the Danish cases are written in English.",
            sources: [11, 12],
          },
          {
            topic: "Pricing model",
            us: "A subscription per connected machine per month, not per user. Hardware and installation are priced separately. No public price list: you get a quote after we have looked at your machines.",
            them: "Public prices per line per month for each app, plus a platform fee per site. On the day we checked, the page showed two tables: from $250 or $399 per line, and a $1,000 platform fee per site. Extra inputs, energy and hardware cost extra.",
            sources: [1],
          },
        ],
        strongerTitle: "Where Factbird is stronger",
        stronger: [
          {
            title: "Public prices",
            description:
              "Factbird puts its prices on its website. You can work out a rough budget before talking to anyone. We do not publish a price list.",
          },
          {
            title: "Fast start with its own box",
            description:
              "The Factbird DUO is a self-contained sensor box with its own mobile connection, so a line can show data the same day without touching the PLC or the factory network.",
          },
          {
            title: "Scale and reviews",
            description:
              "Over 300 companies in 28 countries, customers since 2016, and a public rating of 4.5 out of 5 from more than 60 reviews. Large Danish names such as Royal Unibrew, Danish Crown and Danfoss are on its customer list.",
          },
          {
            title: "Training and skills",
            description:
              "Factbird has a separate app for training, skills matrices and improvement plans. We do not have a module for that.",
          },
          {
            title: "Vision and utilities",
            description:
              "Camera-based counting and monitoring of water, gas and compressed air are part of Factbird's catalogue. Our energy module is built around electricity and machine sensors.",
          },
        ],
        oursTitle: "Where OptiPeople is stronger",
        ours: [
          {
            title: "Orders and planning, not only monitoring",
            description:
              "Orders, work instructions and planning run in the same platform as OEE, so every stop and every scrapped part lands on an order. You can start with OEE and switch on the next module when you are ready.",
          },
          {
            title: "Energy per unit next to OEE",
            description:
              "The EMS module ties kWh to the machine, the order and the shift, so energy shows up as cost per unit, not as a separate meter report.",
          },
          {
            title: "Works with the machines you have",
            description:
              "We read existing PLCs and controls first and only add sensors where nothing can be read, which gives you the machine's own signals rather than a count from the outside.",
          },
          {
            title: "Priced per machine, not per line and site",
            description:
              "There is no site fee on top. Everyone in the factory can log in without the price going up.",
          },
          {
            title: "Danish, close by",
            description:
              "The site, Opti Assist and our team are Danish, and we come out to the factory as part of the setup.",
          },
        ],
        chooseTitle: "Which one should you choose?",
        chooseThem:
          "Choose Factbird if you want to monitor packaging or process lines fast with a box that needs no PLC work, want a public price before the first meeting, and value a large international reference list.",
        chooseUs:
          "Choose OptiPeople if OEE is the first step and you want orders, planning, quality, maintenance and energy per unit on the same data later, with older and mixed machines read directly, and a Danish team on site.",
        sourcesTitle: "Sources",
        sourcesNote:
          "Factbird's public pages, read on 26 October 2026. Prices and features change, so check their site before you decide.",
        sources: factbirdSources,
        faq: {
          title: "Questions about OptiPeople and Factbird",
          items: [
            {
              question: "Is Factbird or OptiPeople better for OEE?",
              answer:
                "Both measure OEE and stop causes live. Factbird is quick to put on a line with its own sensor box. OptiPeople reads the machine's PLC and ties OEE to orders, planning and energy in the same platform. The better fit depends on whether you want monitoring alone or a step towards an MES.",
            },
            {
              question: "Is Factbird a Danish company?",
              answer:
                "Yes. Factbird ApS is registered in Denmark and grew out of a project for Royal Unibrew. It has offices in Denmark and the US. OptiPeople is also Danish, based in Hørning near Aarhus.",
            },
            {
              question: "How is OptiPeople priced compared with Factbird?",
              answer:
                "Factbird publishes prices per line per month plus a platform fee per site. OptiPeople is a subscription per connected machine per month, not per user, with hardware and installation priced separately. We give a quote after looking at your machines.",
            },
            {
              question: "Does Factbird have an MES?",
              answer:
                "Factbird does not sell a product called MES. Its Connected Operations app covers digital SOPs, quality checks and maintenance, and it integrates with ERP and MES systems. OptiPeople's modular MES covers orders, planning, quality, maintenance and documents.",
            },
          ],
        },
      },
      da: {
        metaTitle: "OptiPeople eller Factbird: en ærlig sammenligning | OptiPeople",
        metaDescription:
          "OptiPeople Data Platform og Factbird sammenlignet på målgruppe, dataopsamling, MES og energi, AI, dansk support og prismodel. Med kilder.",
        eyebrow: "Sammenligning",
        heroTitle: "OptiPeople eller Factbird",
        heroBody:
          "Begge er danske, og begge måler OEE og stop live. Vælg Factbird, hvis I vil hurtigt i gang med at overvåge linjer med deres egen sensorboks, kende prisen på forhånd og have mange internationale referencer. Vælg OptiPeople, når OEE er første skridt mod ordrer, planlægning, energi pr. enhed og vedligehold på én platform, sat op af folk, der kommer ud på gulvet.",
        competitor: "Factbird",
        checked:
          "Fakta om Factbird er tjekket 26. oktober 2026 på Factbirds egne sider. Linkene står nederst. Sig til, hvis noget har ændret sig, så retter vi det.",
        tableTitle: "Side om side, på det, købere spørger om",
        topicLabel: "Spørgsmål",
        rows: [
          {
            topic: "Hvem er det til",
            us: "Produktionsvirksomheder, maskinbyggere og serviceafdelinger, mest i Danmark. Blandt kunderne er Carl Hansen & Søn, VOLA, Montana og Hydro Extrusion.",
            them: "Fødevarer og drikkevarer, forbrugsvarer, emballage, pharma, bilindustri og mere. Over 300 virksomheder i 28 lande, med kontorer i Danmark og USA.",
            sources: [2, 3],
          },
          {
            topic: "Hvad det måler",
            us: "OEE som tilgængelighed, ydelse og kvalitet pr. skift, linje og maskine. Stopårsager, antal og kassation pr. ordre og energi pr. produceret enhed.",
            them: "OEE, nedetid med stopårsager og Pareto, kassation og fejl, helt ned på batch eller produkt.",
            sources: [4, 7],
          },
          {
            topic: "Dataopsamling",
            us: "Vi læser det, maskinen allerede har: PLC'er (Siemens, Fanuc, Mitsubishi), OPC-UA, MQTT, Modbus, REST. Sensorer og en gateway på de ældre maskiner. Operatørpaneler ved maskinen.",
            them: "Deres egen Factbird DUO-boks med to sensorer over 4G eller WiFi, som sættes op på under en time. PLC-data over MQTT eller OPC UA via Kepware, plus stregkodescannere og en operatørtablet.",
            sources: [5, 6, 13],
          },
          {
            topic: "MES",
            us: "Et modulært MES: OEE, ordrer med arbejdsinstruktioner og sporbarhed, planlægning ud fra den målte kapacitet, kvalitet, vedligehold og dokumenter på samme data. Kører med eller uden ERP.",
            them: "Intet produkt, der hedder MES. Connected Operations dækker digitale SOP'er, kvalitetstjek, vedligehold, e-signatur og audit trail. Produktionsordrer er ikke beskrevet. ERP og MES er noget, de integrerer med.",
            sources: [7, 1],
          },
          {
            topic: "Energi",
            us: "Et EMS-modul på samme platform: kWh pr. maskine, linje og fabrik og energi pr. enhed, ordre og skift, lige ved siden af OEE.",
            them: "Strømtænger og Siemens-målere. Forsyningsovervågning dækker el, vand, gas og trykluft, med CO2-aftryk pr. produkt. Sælges som tilkøb.",
            sources: [8, 9, 1],
          },
          {
            topic: "AI-assistent",
            us: "Opti Assist: et QR-mærke på hver maskine åbner en chat på dansk eller engelsk. Den svarer ud fra jeres manualer og maskinens live data og viser, hvor svaret kommer fra.",
            them: "En AI-assistent til spørgsmål om produktionen, AI-tælling med kamera, AI der laver papirskemaer om til digitale tjeklister, og en MCP-forbindelse med læseadgang for Claude, ChatGPT og Copilot.",
            sources: [10],
          },
          {
            topic: "Dansk support",
            us: "En dansk virksomhed med hele holdet i Hørning ved Aarhus. Vi går en runde på fabrikken, når vi sætter det op.",
            them: "En dansk virksomhed (Factbird ApS) med et dansk telefonnummer. Hjemmesiden er på engelsk, tysk og polsk, og de danske cases er skrevet på engelsk.",
            sources: [11, 12],
          },
          {
            topic: "Prismodel",
            us: "Et abonnement pr. tilkoblet maskine pr. måned, ikke pr. bruger. Hardware og installation prissættes for sig. Ingen offentlig prisliste: I får et tilbud, når vi har set jeres maskiner.",
            them: "Offentlige priser pr. linje pr. måned for hver app plus et platformsgebyr pr. fabrik. Den dag vi tjekkede, viste siden to tabeller: fra 250 eller 399 dollar pr. linje og 1.000 dollar pr. fabrik i platformsgebyr. Ekstra input, energi og hardware koster ekstra.",
            sources: [1],
          },
        ],
        strongerTitle: "Hvor Factbird er stærkere",
        stronger: [
          {
            title: "Priserne står på hjemmesiden",
            description:
              "Factbird viser sine priser offentligt, så I kan lægge et groft budget uden at tale med nogen. Vi har ingen offentlig prisliste.",
          },
          {
            title: "Hurtig start med egen boks",
            description:
              "Factbird DUO er en sensorboks med sin egen mobilforbindelse. En linje kan vise data samme dag, uden at nogen rører PLC'en eller fabrikkens netværk.",
          },
          {
            title: "Størrelse og anmeldelser",
            description:
              "Over 300 virksomheder i 28 lande, kunder siden 2016 og 4,5 ud af 5 fra mere end 60 anmeldelser. Store danske navne som Royal Unibrew, Danish Crown og Danfoss er på kundelisten.",
          },
          {
            title: "Oplæring og kompetencer",
            description:
              "Factbird har en app til oplæring, kompetencematricer og forbedringsplaner. Det har vi ikke et modul til.",
          },
          {
            title: "Kamera og forsyning",
            description:
              "Tælling med kamera og overvågning af vand, gas og trykluft er en del af Factbirds udvalg. Vores energimodul er bygget omkring el og maskinens sensorer.",
          },
        ],
        oursTitle: "Hvor OptiPeople er stærkere",
        ours: [
          {
            title: "Ordrer og planlægning, ikke kun overvågning",
            description:
              "Ordrer, arbejdsinstruktioner og planlægning kører på samme platform som OEE, så hvert stop og hver kasseret del lander på en ordre. I kan starte med OEE og slå næste modul til, når I er klar.",
          },
          {
            title: "Energi pr. enhed ved siden af OEE",
            description:
              "EMS-modulet kobler kWh til maskinen, ordren og skiftet. Energien bliver en pris pr. enhed, ikke en måler-rapport for sig.",
          },
          {
            title: "Virker med de maskiner, I har",
            description:
              "Vi læser først de PLC'er og styringer, der er, og sætter kun sensorer på, hvor der ikke er noget at læse. Så får I maskinens egne signaler og ikke en tælling udefra.",
          },
          {
            title: "Pris pr. maskine, ikke pr. linje og fabrik",
            description:
              "Der kommer ikke et fabriksgebyr oveni. Alle på fabrikken kan logge ind, uden at prisen stiger.",
          },
          {
            title: "Dansk og tæt på",
            description:
              "Hjemmesiden, Opti Assist og holdet er danske, og vi kommer ud på fabrikken, når det skal sættes op.",
          },
        ],
        chooseTitle: "Hvilken skal I vælge?",
        chooseThem:
          "Vælg Factbird, hvis I vil overvåge pakke- eller proceslinjer hurtigt med en boks, der ikke kræver arbejde i PLC'en, vil kende prisen før første møde og lægger vægt på en stor international referenceliste.",
        chooseUs:
          "Vælg OptiPeople, hvis OEE er første skridt, og I senere vil have ordrer, planlægning, kvalitet, vedligehold og energi pr. enhed på de samme data, med gamle og blandede maskiner læst direkte og et dansk hold, der kommer ud til jer.",
        sourcesTitle: "Kilder",
        sourcesNote:
          "Factbirds offentlige sider, læst 26. oktober 2026. Priser og funktioner ændrer sig, så tjek deres side, før I beslutter jer.",
        sources: factbirdSources,
        faq: {
          title: "Spørgsmål om OptiPeople og Factbird",
          items: [
            {
              question: "Er Factbird eller OptiPeople bedst til OEE?",
              answer:
                "Begge måler OEE og stopårsager live. Factbird er hurtigt sat op på en linje med deres egen sensorboks. OptiPeople læser maskinens PLC og kobler OEE til ordrer, planlægning og energi på samme platform. Hvad der passer bedst, afhænger af, om I kun vil overvåge, eller om det er et skridt mod et MES.",
            },
            {
              question: "Er Factbird en dansk virksomhed?",
              answer:
                "Ja. Factbird ApS er registreret i Danmark og startede som et projekt for Royal Unibrew. De har kontorer i Danmark og USA. OptiPeople er også dansk og ligger i Hørning ved Aarhus.",
            },
            {
              question: "Hvordan er OptiPeoples pris i forhold til Factbirds?",
              answer:
                "Factbird viser priser pr. linje pr. måned plus et platformsgebyr pr. fabrik. OptiPeople er et abonnement pr. tilkoblet maskine pr. måned, ikke pr. bruger, og hardware og installation prissættes for sig. I får et tilbud, når vi har set jeres maskiner.",
            },
            {
              question: "Har Factbird et MES?",
              answer:
                "Factbird sælger ikke et produkt, der hedder MES. Deres Connected Operations-app dækker digitale SOP'er, kvalitetstjek og vedligehold, og de integrerer med ERP- og MES-systemer. OptiPeoples modulære MES dækker ordrer, planlægning, kvalitet, vedligehold og dokumenter.",
            },
          ],
        },
      },
    },
  },
]

const lookup = buildLookup(comparisons)
export const comparisonSlugs = lookup.slugs
export const getComparison = lookup.get
