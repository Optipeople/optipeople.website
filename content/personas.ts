import type { Locale } from "@/i18n/routing";

/**
 * The personas behind /about/personas.
 *
 * One entry per role short on YouTube, in the order they appear on both the
 * personas index and the role grid on /videos. The videos are all in Danish;
 * `question` is the YouTube title (translated for English) and doubles as the
 * card title on /videos.
 *
 * The pains follow what is said in each video (its Danish subtitles), so the
 * page and the video tell the same story.
 *
 * `modules` are ids from content/modules-catalog.ts, the modules that answer
 * this persona's pains most directly.
 */
export type PersonaPain = { title: string; body: string };

export type PersonaContent = {
  /** The role, as a short name: "Plant manager". */
  name: string;
  /** The video's title, phrased as a question to the viewer. */
  question: string;
  /** One or two sentences on what the job is up against. */
  intro: string;
  pains: PersonaPain[];
  metaDescription: string;
};

export type Persona = {
  slug: string;
  videoId: string;
  modules: string[];
  content: Record<Locale, PersonaContent>;
};

export const personas: Persona[] = [
  {
    slug: "ceo",
    videoId: "siSXdSd0G3o",
    modules: ["oee", "orders", "ai-agents"],
    content: {
      en: {
        name: "CEO",
        question: "Are you a CEO?",
        intro:
          "As CEO you need to know where to invest, which orders you actually make money on, and how the organization is performing.",
        pains: [
          {
            title: "Investing without the full picture",
            body: "Machine, order, and stop data are gathered in one place, so you can see where capacity is lost before deciding where the next krone goes.",
          },
          {
            title: "You do not know which orders make money",
            body: "Actual time, stops, and scrap are recorded per order, so you can see which orders and products earn money and which ones cost it.",
          },
          {
            title: "Digitalization and AI without a direction",
            body: "We show where digitalization and AI make a difference in your production, and start where the effect is greatest.",
          },
        ],
        metaDescription:
          "How OptiPeople helps CEOs: where to invest, which orders make money, transparency in performance, and where digitalization and AI pay off.",
      },
      da: {
        name: "CEO",
        question: "Er du CEO?",
        intro:
          "I direktionen skal I vide, hvor I skal investere, hvilke ordrer I tjener jeres penge på, og hvordan organisationen performer.",
        pains: [
          {
            title: "Investeringer uden det fulde billede",
            body: "Data fra maskiner, ordrer og stop ligger samme sted. I kan se, hvor kapaciteten forsvinder, før I beslutter, hvor næste krone skal hen.",
          },
          {
            title: "I ved ikke, hvilke ordrer I tjener penge på",
            body: "Den faktiske tid, stop og kassation bliver registreret på hver ordre. I kan se, hvilke ordrer og varer der tjener penge, og hvilke der koster.",
          },
          {
            title: "Digitalisering og AI uden en retning",
            body: "Vi viser, hvor digitalisering og AI gør en forskel i netop jeres produktion, og starter dér, hvor effekten er størst.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople CEO'er: hvor I skal investere, hvilke ordrer I tjener penge på, overblik over performance, og hvor digitalisering og AI betaler sig.",
      },
    },
  },
  {
    slug: "coo",
    videoId: "IXDN_Ai6Ank",
    modules: ["oee", "maintenance", "quality"],
    content: {
      en: {
        name: "COO",
        question: "Are you a COO?",
        intro:
          "As COO you need to know which data and information to base your decisions on, and talk about the same facts as your colleagues.",
        pains: [
          {
            title: "Unclear what to base decisions on",
            body: "Production, maintenance, quality, and planning data are gathered on one platform, so the decision starts from data, not from whoever argues best.",
          },
          {
            title: "Different numbers in every department",
            body: "Production, maintenance, quality, and planning work from the same data set, so the meeting is about what to do, not whose numbers are right.",
          },
          {
            title: "How do digitalization and AI help day to day?",
            body: "We show concretely where digitalization and AI save time in your daily operations, and build it on your own production data.",
          },
        ],
        metaDescription:
          "How OptiPeople helps COOs: the right data to decide from, one data set shared with production, maintenance, quality, and planning, and digitalization that helps day to day.",
      },
      da: {
        name: "COO",
        question: "Er du COO?",
        intro:
          "I driftsledelsen skal I vide, hvilke data og informationer I skal tage beslutninger ud fra, og tale ud fra de samme fakta som jeres kolleger.",
        pains: [
          {
            title: "Uklart, hvad I skal beslutte ud fra",
            body: "Data fra produktion, vedligehold, kvalitet og planlægning ligger på én platform. Beslutningen starter fra data, ikke fra den, der argumenterer bedst.",
          },
          {
            title: "Forskellige tal i hver afdeling",
            body: "Produktion, vedligehold, kvalitet og planlægning arbejder ud fra det samme datasæt. Mødet handler om, hvad I skal gøre, ikke om hvis tal der er rigtige.",
          },
          {
            title: "Hvordan hjælper digitalisering og AI i hverdagen?",
            body: "Vi viser konkret, hvor digitalisering og AI sparer tid i jeres daglige drift, og bygger det på jeres egne produktionsdata.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople COO'er: de rigtige data at beslutte ud fra, ét datasæt sammen med produktion, vedligehold, kvalitet og planlægning, og digitalisering, der hjælper i hverdagen.",
      },
    },
  },
  {
    slug: "plant-manager",
    videoId: "kqMOxAQ02e0",
    modules: ["oee", "iot", "orders"],
    content: {
      en: {
        name: "Plant manager",
        question: "Are you a plant manager?",
        intro:
          "As plant manager you need to see where production is performing and where it is not.",
        pains: [
          {
            title: "Hard to see where production is falling behind",
            body: "Production data is gathered in one place and shown live per line and machine, so you can see where things are running and where they are not.",
          },
          {
            title: "Everyone works from their own numbers",
            body: "Operators, team leaders, and management work from the same facts, so there is one shared picture of how production looks.",
          },
          {
            title: "Decisions take too long",
            body: "When the facts are already on the table, decisions get better and actions come faster.",
          },
        ],
        metaDescription:
          "How OptiPeople helps plant managers: see where production performs and where it does not, one set of facts for operators and management, and faster action.",
      },
      da: {
        name: "Fabrikschef",
        question: "Er du fabrikschef?",
        intro:
          "I fabriksledelsen skal I kunne se, hvor produktionen performer, og hvor den ikke gør.",
        pains: [
          {
            title: "Svært at se, hvor produktionen halter",
            body: "Produktionsdata er samlet ét sted og vist live for hver linje og maskine. I kan se, hvor det kører, og hvor det ikke gør.",
          },
          {
            title: "Alle arbejder ud fra deres egne tal",
            body: "Operatører, teamledere og ledelsen arbejder ud fra de samme fakta. Så er der ét fælles billede af, hvordan produktionen ser ud.",
          },
          {
            title: "Beslutningerne tager for lang tid",
            body: "Når fakta allerede ligger på bordet, bliver beslutningerne bedre, og handlingerne kommer hurtigere.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople fabrikschefer: se, hvor produktionen performer, og hvor den ikke gør, de samme fakta for operatører og ledelse, og hurtigere handling.",
      },
    },
  },
  {
    slug: "production-manager",
    videoId: "tnoy3-B0s8I",
    modules: ["oee", "orders", "documents"],
    content: {
      en: {
        name: "Production manager",
        question: "Are you a production manager?",
        intro:
          "How much of your time goes on finding out what actually happened in production, instead of doing something about it?",
        pains: [
          {
            title: "The time goes on finding out what happened",
            body: "Stops, output, and registrations are recorded at the machine as they happen, so you can see what happened without asking around.",
          },
          {
            title: "Data and registrations in many places",
            body: "Everything is gathered in one place, so operators, team leaders, and managers work from the same facts.",
          },
          {
            title: "Discussing the numbers instead of improving",
            body: "When nobody doubts the numbers, the time goes on optimizing production, not on arguing about the figures.",
          },
        ],
        metaDescription:
          "How OptiPeople helps production managers: see what actually happened, one place for data and registrations, and more time to optimize.",
      },
      da: {
        name: "Produktionschef",
        question: "Er du produktionschef?",
        intro:
          "Hvor meget tid bruger I på at finde ud af, hvad der rent faktisk er sket i produktionen, frem for at gøre noget ved det?",
        pains: [
          {
            title: "Tiden går med at finde ud af, hvad der skete",
            body: "Stop, output og registreringer bliver lagt ind ved maskinen, mens det sker. I kan se, hvad der skete, uden at spørge jer frem.",
          },
          {
            title: "Data og registreringer mange steder",
            body: "Alt er samlet ét sted. Operatører, teamledere og ledere arbejder ud fra de samme fakta.",
          },
          {
            title: "I diskuterer tallene i stedet for at forbedre",
            body: "Når ingen tvivler på tallene, går tiden med at optimere produktionen, ikke med at diskutere dem.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople produktionschefer: se, hvad der faktisk er sket, ét sted til data og registreringer, og mere tid til at optimere.",
      },
    },
  },
  {
    slug: "operational-excellence",
    videoId: "aD9I-Rdedjo",
    modules: ["oee", "iot", "quality"],
    content: {
      en: {
        name: "Operational Excellence and Continuous Improvement",
        question:
          "Do you work with Operational Excellence or Continuous Improvement?",
        intro:
          "Working with Operational Excellence or Continuous Improvement, you often lack the data to see where to start and whether it worked.",
        pains: [
          {
            title: "Missing data from the shop floor",
            body: "Machines and operators deliver data automatically, so you have the facts from the floor without collecting them by hand.",
          },
          {
            title: "No place to gather the data",
            body: "Stops, cycle times, and scrap end up on one platform, broken down by machine, product, and shift.",
          },
          {
            title: "Cannot see the effect of your initiatives",
            body: "Before and after are measured the same way, so you can see what an improvement actually delivered.",
          },
        ],
        metaDescription:
          "How OptiPeople helps Operational Excellence and CI: data from the shop floor, one place to gather it, and the effect of every initiative made visible.",
      },
      da: {
        name: "Operational Excellence og Continuous Improvement",
        question:
          "Er du ansvarlig for Operational Excellence eller Continuous Improvement?",
        intro:
          "Arbejder I med Operational Excellence eller Continuous Improvement, mangler I ofte data til at se, hvor I skal starte, og om det virkede.",
        pains: [
          {
            title: "I mangler data fra produktionsgulvet",
            body: "Maskiner og operatører leverer data automatisk. I har fakta fra gulvet uden at samle dem ind i hånden.",
          },
          {
            title: "Intet sted at samle data",
            body: "Stop, cyklustider og kassation ender på én platform, delt op på maskine, produkt og skift.",
          },
          {
            title: "I kan ikke se effekten af jeres tiltag",
            body: "Før og efter bliver målt på samme måde. I kan se, hvad en forbedring faktisk gav.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople Operational Excellence og CI: data fra produktionsgulvet, ét sted at samle dem, og effekten af hvert tiltag gjort synlig.",
      },
    },
  },
  {
    slug: "it-manager",
    videoId: "I_GInMVfuN8",
    modules: ["iot", "ai-agents", "orders"],
    content: {
      en: {
        name: "IT manager",
        question: "Are you an IT manager?",
        intro:
          "As IT manager, you and your team probably spend a lot of time patching systems together.",
        pains: [
          {
            title: "Time spent patching systems together",
            body: "We build the infrastructure that gathers your data in one place, instead of one integration after another between separate systems.",
          },
          {
            title: "Reporting that is still done by hand",
            body: "AI agents work on the gathered data and automate the reporting, so nobody has to pull the numbers together every week.",
          },
          {
            title: "Workarounds instead of architecture",
            body: "The result is an IT architecture built for the future, not a patchwork.",
          },
        ],
        metaDescription:
          "How OptiPeople helps IT managers: less time patching systems together, reporting automated by AI agents, and an IT architecture built for the future.",
      },
      da: {
        name: "It-chef",
        question: "Er du it-chef?",
        intro:
          "I it-afdelingen bruger I nok meget tid på at lappe systemer sammen.",
        pains: [
          {
            title: "Tiden går med at lappe systemer sammen",
            body: "Vi bygger infrastrukturen, der samler jeres data ét sted, i stedet for den ene integration efter den anden mellem systemer, der står hver for sig.",
          },
          {
            title: "Rapporter, der stadig laves i hånden",
            body: "AI-agenter arbejder på de samlede data og automatiserer rapporteringen. Ingen skal samle tallene sammen hver uge.",
          },
          {
            title: "Lappeløsninger i stedet for arkitektur",
            body: "Resultatet er en it-arkitektur, der er bygget til fremtiden, og ikke en lappeløsning.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople it-chefer: mindre tid på at lappe systemer sammen, rapportering automatiseret med AI-agenter og en it-arkitektur bygget til fremtiden.",
      },
    },
  },
  {
    slug: "it-ot",
    videoId: "zwa7gHegd0s",
    modules: ["iot", "orders", "ai-agents"],
    content: {
      en: {
        name: "IT and OT",
        question: "Do you work with IT or OT?",
        intro:
          "Responsible for IT or OT, you probably know the feeling of talking past each other because you do not share the same data.",
        pains: [
          {
            title: "IT and OT talk past each other",
            body: "We build the bridge between IT and OT, so both sides look at the same data.",
          },
          {
            title: "Machine data and business data live apart",
            body: "Machine data and business data are gathered in one stream, giving a shared picture of the business.",
          },
          {
            title: "Collaboration built on assumptions",
            body: "Decisions come faster, and collaboration is built on facts instead of assumptions.",
          },
        ],
        metaDescription:
          "How OptiPeople helps IT and OT: a bridge between the two, machine and business data in one stream, and collaboration built on facts.",
      },
      da: {
        name: "IT og OT",
        question: "Arbejder du med IT eller OT?",
        intro:
          "Er I IT- eller OT-ansvarlige, kender I sikkert følelsen af at tale forbi hinanden, fordi I ikke deler de samme data.",
        pains: [
          {
            title: "IT og OT taler forbi hinanden",
            body: "Vi bygger broen mellem IT og OT, så begge sider kigger på de samme data.",
          },
          {
            title: "Maskindata og forretningsdata lever hver for sig",
            body: "Maskindata og forretningsdata bliver samlet i én strøm. Det giver et fælles billede af virksomheden.",
          },
          {
            title: "Samarbejde bygget på antagelser",
            body: "Beslutningerne kommer hurtigere, og samarbejdet bygger på fakta i stedet for antagelser.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople IT og OT: en bro mellem de to, maskindata og forretningsdata i én strøm, og et samarbejde bygget på fakta.",
      },
    },
  },
  {
    slug: "maintenance-manager",
    videoId: "6IUQ7bcRjjo",
    modules: ["maintenance", "iot", "documents"],
    content: {
      en: {
        name: "Maintenance manager",
        question: "Are you a maintenance manager?",
        intro:
          "Responsible for maintenance, you need to know that the operator tasks get done, and be able to prioritize the tasks that matter most.",
        pains: [
          {
            title: "You do not know if operator tasks get done",
            body: "Operator tasks are ticked off at the machine, so you can see what has been done and what is missing.",
          },
          {
            title: "Hard to prioritize the tasks",
            body: "With tasks, history, and machine data in one place, you can see which tasks matter most right now.",
          },
          {
            title: "Maintenance data spread across systems",
            body: "Maintenance data is gathered in one place, so you can work in a more structured way with preventive maintenance and secure stable operations.",
          },
        ],
        metaDescription:
          "How OptiPeople helps maintenance managers: see that operator tasks get done, prioritize the right tasks, and gather maintenance data for preventive maintenance.",
      },
      da: {
        name: "Vedligeholdelseschef",
        question: "Er du vedligeholdelseschef?",
        intro:
          "Som vedligeholdelsesansvarlige skal I vide, at operatøropgaverne bliver udført, og kunne prioritere de opgaver, der er vigtigst.",
        pains: [
          {
            title: "I ved ikke, om operatøropgaverne bliver udført",
            body: "Operatøropgaverne bliver kvitteret ved maskinen. I kan se, hvad der er gjort, og hvad der mangler.",
          },
          {
            title: "Svært at prioritere opgaverne",
            body: "Opgaver, historik og maskindata ligger samme sted. I kan se, hvilke opgaver der er vigtigst lige nu.",
          },
          {
            title: "Vedligeholdsdata spredt over flere systemer",
            body: "Vedligeholdsdata er samlet ét sted. I kan arbejde mere struktureret med forebyggende vedligehold og sikre en mere stabil drift.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople vedligeholdelseschefer: se, at operatøropgaverne bliver udført, prioritér de rigtige opgaver, og saml vedligeholdsdata til forebyggende vedligehold.",
      },
    },
  },
  {
    slug: "machine-builder",
    videoId: "nx6AtYqqcoE",
    modules: ["iot", "maintenance", "ai-agents"],
    content: {
      en: {
        name: "Machine builders",
        question: "Are you a CEO, COO or salesperson at a machine builder?",
        intro:
          "Responsible for business development at a machine builder, you may find that you mostly compete on price.",
        pains: [
          {
            title: "You compete on price alone",
            body: "Machines delivered with data built in give you something to compete on besides the price.",
          },
          {
            title: "Customers cannot tell you apart",
            body: "With data from the machines, you can show the customer in numbers why your equipment is the better choice.",
          },
          {
            title: "Hard to build a recurring business",
            body: "Data from installed machines is the basis for service agreements and a continuous business after delivery.",
          },
        ],
        metaDescription:
          "How OptiPeople helps machine builders: compete on more than price, show customers the difference in data, and build a recurring service business.",
      },
      da: {
        name: "Maskinbyggere",
        question: "Er du CEO, COO eller sælger hos en maskinbygger?",
        intro:
          "Er I ansvarlige for forretningsudvikling hos en maskinbygger, oplever I måske, at I mest konkurrerer på pris.",
        pains: [
          {
            title: "I konkurrerer kun på pris",
            body: "Maskiner, der bliver leveret med data indbygget, giver jer noget andet at konkurrere på end prisen.",
          },
          {
            title: "Kunderne kan ikke se forskel",
            body: "Med data fra maskinerne kan I vise kunden i tal, hvorfor jeres anlæg er det bedre valg frem for konkurrentens.",
          },
          {
            title: "Svært at få en fast forretning op at stå",
            body: "Data fra de maskiner, der står ude hos kunderne, er grundlaget for serviceaftaler og en løbende forretning efter leveringen.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople maskinbyggere: konkurrér på mere end pris, vis kunderne forskellen i data, og byg en løbende forretning på service.",
      },
    },
  },
  {
    slug: "aftersales",
    videoId: "hJc5P5No_u0",
    modules: ["iot", "maintenance", "documents"],
    content: {
      en: {
        name: "Aftersales",
        question: "Do you work in aftersales?",
        intro:
          "As head of service or aftersales, you may be missing data from your equipment out at your customers.",
        pains: [
          {
            title: "No data from equipment at the customer",
            body: "Machines at your customers send data back to you, so you know how they are running.",
          },
          {
            title: "Hard to talk about new equipment",
            body: "The data shows when and why the customer should invest in new equipment, so the conversation starts from facts.",
          },
          {
            title: "No reason to talk about service and spare parts",
            body: "Wear and running hours give you a concrete reason to offer service and spare parts at the right time.",
          },
        ],
        metaDescription:
          "How OptiPeople helps aftersales: data from equipment at your customers, and fact-based conversations about new equipment, service, and spare parts.",
      },
      da: {
        name: "Aftersales",
        question: "Arbejder du med aftersales?",
        intro:
          "Står I for service eller aftersales, mangler I måske data fra jeres anlæg ude hos kunderne.",
        pains: [
          {
            title: "Ingen data fra anlæggene hos kunden",
            body: "Maskinerne hos kunderne sender data tilbage til jer. I ved, hvordan de kører.",
          },
          {
            title: "Svært at tale om nye anlæg",
            body: "Data viser, hvornår og hvorfor kunden bør købe nyt anlæg. Samtalen starter fra fakta.",
          },
          {
            title: "Ingen grund til at tale om service og reservedele",
            body: "Slitage og driftstimer giver jer en konkret grund til at tilbyde service og reservedele på det rigtige tidspunkt.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople aftersales: data fra anlæggene hos kunderne og samtaler om nye anlæg, service og reservedele på baggrund af data.",
      },
    },
  },
  {
    slug: "planner",
    videoId: "2gLBRps2SX0",
    modules: ["planning", "orders", "oee"],
    content: {
      en: {
        name: "Planner",
        question: "Are you a planner?",
        intro:
          "As a planner, you need to plan production based on what actually happens on the floor.",
        pains: [
          {
            title: "The plan is not based on the floor",
            body: "Data from the floor is gathered in one place, so the plan is built on what actually happens.",
          },
          {
            title: "You do not know the real changeover and production times",
            body: "Changeover and production times are recorded as they happen, so you plan with real times, not estimates.",
          },
          {
            title: "No live order status",
            body: "Operators report at the machine, so you can follow every order's status in real time.",
          },
        ],
        metaDescription:
          "How OptiPeople helps planners: plans based on what happens on the floor, real changeover and production times, and live order status.",
      },
      da: {
        name: "Planlægger",
        question: "Er du planlægger?",
        intro:
          "Som planlæggere skal I kunne planlægge produktionen ud fra det, der faktisk sker på gulvet.",
        pains: [
          {
            title: "Planen bygger ikke på gulvet",
            body: "Data fra gulvet er samlet ét sted. Planen bygger på det, der faktisk sker.",
          },
          {
            title: "I kender ikke de reelle omstillings- og produktionstider",
            body: "Omstillingstider og produktionstider bliver registreret, mens det sker. I planlægger med de rigtige tider, ikke med skøn.",
          },
          {
            title: "Ingen live ordrestatus",
            body: "Operatørerne melder tilbage ved maskinen. I kan følge status på hver ordre i realtid.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople planlæggere: planer ud fra det, der sker på gulvet, de reelle omstillings- og produktionstider og live ordrestatus.",
      },
    },
  },
  {
    slug: "supply-chain",
    videoId: "u0KXgYzEfVQ",
    modules: ["orders", "oee", "planning"],
    content: {
      en: {
        name: "Supply chain",
        question: "Do you work in supply chain?",
        intro:
          "The ERP system says you make money on the product. But production never got the message.",
        pains: [
          {
            title: "The ERP price is not the real price",
            body: "Efficiency, stops, and scrap change what the product costs. They are recorded per order, so you can see the real cost.",
          },
          {
            title: "The plan and the stock keep changing",
            body: "When the plan and the stock change, production data follows along live, so nobody has to collect it by hand.",
          },
          {
            title: "Discussing the price instead of knowing it",
            body: "Instead of debating what the product ought to cost, you know what it actually costs.",
          },
        ],
        metaDescription:
          "How OptiPeople helps supply chain: the real cost of every product, live data when plan and stock change, and no more manual collection.",
      },
      da: {
        name: "Supply chain",
        question: "Arbejder du med supply chain?",
        intro:
          "ERP-systemet fortæller, at I tjener penge på varen. Men produktionen har bare ikke fået beskeden.",
        pains: [
          {
            title: "Prisen i ERP er ikke den rigtige pris",
            body: "Effektivitet, stop og spild ændrer, hvad varen koster. Det bliver registreret på hver ordre, så I kan se den reelle kostpris.",
          },
          {
            title: "Planen og lageret ændrer sig hele tiden",
            body: "Når planen og lageret ændrer sig, følger data fra produktionen med live. Ingen skal samle det op i hånden.",
          },
          {
            title: "I diskuterer prisen i stedet for at kende den",
            body: "I stedet for at diskutere, hvad varen burde koste, ved I, hvad den faktisk koster.",
          },
        ],
        metaDescription:
          "Sådan hjælper OptiPeople supply chain: den reelle kostpris på hver vare, live data, når plan og lager ændrer sig, og slut med at samle op i hånden.",
      },
    },
  },
];

export const personaSlugs = personas.map((p) => p.slug);

export function getPersona(slug: string) {
  return personas.find((p) => p.slug === slug);
}

export const personaHref = (slug: string) => `/about/personas/${slug}`;
