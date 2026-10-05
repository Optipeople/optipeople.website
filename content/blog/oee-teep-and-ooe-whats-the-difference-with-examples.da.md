---
title: "OOE, OEE og TEEP: Betydning, formler og eksempler"
description: "OOE står for Overall Operations Effectiveness. Sådan adskiller OOE sig fra OEE og TEEP, formlen for hver, og ét eksempel, der regner alle tre ud."
---

OOE står for Overall Operations Effectiveness. Formlen er den samme som for OEE (tilgængelighed x ydelse x kvalitet), men OOE måler mod driftstiden: al den tid, fabrikken har åbent, også pauser og planlagte stop. OEE bruger kun den planlagte produktionstid, og TEEP bruger al tid i kalenderen. På samme maskine er OEE derfor altid højest og TEEP lavest.

## Hvad står OOE for?

OOE står for **Overall Operations Effectiveness**. Tallet viser, hvor godt driften udnytter den tid, fabrikken har åbent og er bemandet. Den tid kaldes driftstiden.

Forskellen fra OEE er, hvad der tæller som tab. OEE lader de planlagte stop ude af regnestykket: pauser, møder, planlagt vedligehold og tavlemøder. OOE tæller dem med som tabt tid. Derfor er OOE det rigtige tal, når I vil vide, hvor godt hele driften kører i åbningstiden, og ikke kun hvordan maskinen kører, når der er planlagt produktion.

## Hvad står TEEP for?

TEEP står for **Total Effective Equipment Performance**. Tallet holder produktionen op mod al tid i kalenderen: 24 timer i døgnet, 7 dage om ugen, 365 dage om året.

TEEP tæller hver time uden produktion som tab, også nætter, weekender og helligdage, hvor fabrikken er lukket. Det gør TEEP til et mål for kapacitet. Det svarer på, hvor meget mere maskinerne kunne lave, hvis de kørte døgnet rundt. Det er værd at vide, før I køber en ny maskine eller bygger en ny hal.

## Hvad står OEE for?

OEE står for **Overall Equipment Effectiveness**. Tallet viser, hvor meget af den planlagte produktionstid der reelt er produktiv: gode emner, i fuld fart, uden stop. Det er det mest udbredte af de tre og det rigtige tal til det daglige forbedringsarbejde. Den fulde forklaring finder I under [hvad er OEE](/da/blog/what-is-oee).

## Hvad er forskellen på OOE, OEE og TEEP?

Alle tre ganger tilgængelighed, ydelse og kvalitet sammen. Det eneste, der skifter, er den tid, I regner ud fra, og dermed hvad der tæller som tabt tid:

| Tal | Står for | Regnes ud fra | Tæller som tabt tid | Svarer på |
|---|---|---|---|---|
| OEE | Overall Equipment Effectiveness | Planlagt produktionstid | Uplanlagte stop, langsom kørsel, kassation | Hvor godt kører maskinen, når der er planlagt produktion? |
| OOE | Overall Operations Effectiveness | Driftstid (fabrikken har åbent) | Tabene i OEE plus pauser og planlagte stop | Hvor godt udnytter driften åbningstiden? |
| TEEP | Total Effective Equipment Performance | Al tid (døgnet rundt, hele året) | Tabene i OOE plus alle timer, fabrikken er lukket | Hvor meget kapacitet er der tilbage i maskinerne? |

Hver tidsramme er større end den før. Derfor er OEE altid mindst lige så højt som OOE, og OOE altid mindst lige så højt som TEEP.

## Hvad er formlerne for OEE, OOE og TEEP?

Ydelse og kvalitet er de samme i alle tre. Det er kun tilgængeligheden, der skifter:

```text
OEE  = Tilgængelighed x Ydelse x Kvalitet

Tilgængelighed (OEE)  = Køretid / Planlagt produktionstid
Tilgængelighed (OOE)  = Køretid / Driftstid
Tilgængelighed (TEEP) = Køretid / Al tid

Ydelse   = (Ideel cyklustid x Antal emner) / Køretid
Kvalitet = Gode emner / Antal emner

TEEP = OEE x Udnyttelse
Udnyttelse = Planlagt produktionstid / Al tid
```

## Hvordan ser OEE, OOE og TEEP ud på samme maskine?

Tag én maskine over én uge:

- Al tid: `168 timer` (7 dage x 24 timer)
- Driftstid: `80 timer` (to skift på 8 timer, 5 dage)
- Planlagte stop (pauser, møder, planlagt vedligehold): `10 timer`
- Planlagt produktionstid: `70 timer`
- Uplanlagte stop og omstillinger: `14 timer`
- Køretid: `56 timer`
- Ydelse: `90%`
- Kvalitet: `95%`

Ydelse x kvalitet er 90% x 95% = 85,5% i alle tre. Det er tilgængeligheden, der flytter sig:

| Tal | Regnes ud fra | Timer | Tilgængelighed | Resultat |
|---|---|---:|---:|---:|
| OEE | Planlagt produktionstid | 70 | 80,0% | 68,4% |
| OOE | Driftstid | 80 | 70,0% | 59,9% |
| TEEP | Al tid | 168 | 33,3% | 28,5% |

De samme 56 timers kørsel giver tre forskellige svar. OEE siger, at maskinen kører nogenlunde, når der er planlagt produktion. OOE viser, at pauser og planlagte stop koster yderligere 10 timer af åbningstiden. TEEP viser, at maskinen kun kører en tredjedel af ugen. Der er altså plads til mere produktion, før nogen behøver at købe en ny maskine.

## Hvornår skal I bruge OEE, OOE eller TEEP?

- **OEE** til forbedringer fra dag til dag og uge til uge på en maskine eller en linje. Tallet viser de tab, operatørerne og vedligeholdet kan gøre noget ved nu.
- **OOE**, når I vil se, hvad de planlagte stop koster: dækning i pauserne, hvor lange møderne er, hvornår det planlagte vedligehold ligger.
- **TEEP** til kapacitetsplanlægning, før I sætter skift på, køber maskiner eller siger ja til en stor ordre.

De fleste starter med OEE og tager TEEP med, når spørgsmålet bliver kapacitet. I Skandinavien møder I også OEE1 og OEE2, hvor OEE1 regner ud fra al tid ligesom TEEP. Se [OEE1 og OEE2](/da/blog/oee1-vs-oee2-whats-the-difference).

## Hvordan følger I OEE i praksis?

Alle tre tal kræver, at I kender den rigtige køretid og årsagen til hvert eneste stop. [OptiPeoples OEE-modul](/da/modules/production) henter de data direkte fra maskinerne og viser tilgængelighed, ydelse, kvalitet og OEE live pr. maskine, linje og skift. Operatørerne registrerer stopårsagen ved maskinen.

## Ofte stillede spørgsmål

### Hvad er OOE i produktionen?

OOE er Overall Operations Effectiveness: tilgængelighed x ydelse x kvalitet, regnet ud fra den tid, fabrikken har åbent. I modsætning til OEE tæller pauser og planlagte stop som tabt tid.

### Hvad er forskellen på OOE og OEE?

Den tid, I regner ud fra. OEE måler mod den planlagte produktionstid og lader de planlagte stop ude. OOE måler mod driftstiden, så de planlagte stop tæller som tab, og OOE bliver lavere end OEE.

### Hvad betyder TEEP?

TEEP betyder Total Effective Equipment Performance. Tallet måler produktionen mod al tid i kalenderen, døgnet rundt hele ugen, og viser, hvor meget kapacitet der er tilbage i maskinerne.

### Hvordan regner man TEEP ud?

TEEP = OEE x udnyttelse. Udnyttelsen er den planlagte produktionstid delt med al tid i kalenderen. En OEE på 68,4% på en maskine, der er planlagt i 70 af ugens 168 timer, giver en TEEP på 28,5%.

### Hvad er bedst, OEE eller TEEP?

Ingen af dem. De svarer på hvert sit spørgsmål. Brug OEE til at få maskinen til at køre bedre, når den er planlagt, og TEEP til at se, hvor meget mere den kunne lave, hvis den kørte flere timer.
