---
title: "Sådan regner I OEE ud: Formel og regneeksempel"
description: "OEE = tilgængelighed x ydelse x kvalitet. Sådan regner I hver del ud trin for trin, med et eksempel fra ét skift og den genvej, der tjekker resultatet."
---

OEE regner I ud ved at gange tre tal: tilgængelighed x ydelse x kvalitet. Tilgængeligheden er køretiden delt med den planlagte produktionstid. Ydelsen er den ideelle cyklustid gange antal emner, delt med køretiden. Kvaliteten er de gode emner delt med alle emner. En maskine på 90% tilgængelighed, 90% ydelse og 98% kvalitet har en OEE på 79,4%.

## Hvad er formlen for OEE?

OEE (Overall Equipment Effectiveness) ganger tre tal sammen. Hvert tal er en procentdel af det ideelle:

```text
OEE = Tilgængelighed x Ydelse x Kvalitet

Tilgængelighed = Køretid / Planlagt produktionstid
Ydelse         = (Ideel cyklustid x Antal emner) / Køretid
Kvalitet       = Gode emner / Antal emner
```

De tre led går ud med hinanden, så der er en genvej, der giver det samme:

```text
OEE = (Gode emner x Ideel cyklustid) / Planlagt produktionstid
```

Genvejen er den hurtigste måde at tjekke jeres tal på. De tre dele er det, der viser jer, hvor tiden blev af. Hvad OEE måler, og hvorfor det betyder noget, kan I læse under [hvad er OEE](/da/blog/what-is-oee).

## Hvilke tal skal I bruge?

Fem tal pr. maskine og periode:

| Tal | Hvad det er | Hvor det typisk kommer fra |
|---|---|---|
| Planlagt produktionstid | Den tid, maskinen skal producere, når pauser og planlagte stop er trukket fra | Skiftplanen |
| Køretid | Planlagt produktionstid minus alle uplanlagte stop og omstillinger | Signal fra maskinen eller stoploggen |
| Ideel cyklustid | Den hurtigste tid pr. emne, maskinen kan køre stabilt | Maskinens data eller den bedste hastighed, I har set |
| Antal emner | Alle emner, der er lavet, gode som dårlige | Tælleren på maskinen |
| Gode emner | Emner, der er gode første gang | Kvalitetsregistreringen |

Planlagte stop (pauser, møder, planlagt vedligehold) er trukket ud af den planlagte produktionstid, så de trækker ikke OEE ned. Vil I have dem med som tab, skal I bruge OOE. Se [OEE, OOE og TEEP](/da/blog/oee-teep-and-ooe-whats-the-difference-with-examples).

## Hvordan regner I tilgængeligheden ud?

Tilgængeligheden er den del af den planlagte produktionstid, hvor maskinen rent faktisk kører.

```text
Tilgængelighed = Køretid / Planlagt produktionstid
```

Hvert uplanlagt stop trækker den ned: nedbrud, ventetid på materiale, omstillinger og indkøring. De fleste tæller omstillinger med her, fordi maskinen ikke producerer, mens den bliver stillet om.

## Hvordan regner I ydelsen ud?

Ydelsen sammenligner det, maskinen lavede, med det, den kunne have lavet i fuld fart i køretiden.

```text
Ydelse = (Ideel cyklustid x Antal emner) / Køretid
```

Kender I den ideelle hastighed i emner pr. minut i stedet for cyklustiden, deler I: Ydelse = Antal emner / (Køretid x Ideel hastighed). Det er her, langsom kørsel og de korte stop, ingen skriver ned, dukker op.

## Hvordan regner I kvaliteten ud?

Kvaliteten er den del af emnerne, der er gode første gang.

```text
Kvalitet = Gode emner / Antal emner
```

Emner, der skal omarbejdes, tæller som dårlige, også selvom de bliver solgt til sidst. Den tid, det tog at lave dem, var ikke god produktion.

## Hvordan ser et regneeksempel ud trin for trin?

Tag ét skift på 8 timer:

- Skiftets længde: `480 minutter`
- Pauser: `30 minutter`
- Uplanlagte stop og en omstilling: `45 minutter`
- Ideel cyklustid: `1,5 sekund` pr. emne (40 emner i minuttet)
- Antal emner: `14.580`
- Kasserede emner: `292`

**1. Planlagt produktionstid:** 480 minus 30 minutters pauser giver `450 minutter`.

**2. Køretid:** 450 minus 45 minutters stop giver `405 minutter`.

**3. Tilgængelighed:** 405 / 450 = `90,0%`.

**4. Ydelse:** ved 40 emner i minuttet kunne 405 minutter give 16.200 emner. 14.580 / 16.200 = `90,0%`.

**5. Kvalitet:** 14.580 minus 292 kasserede giver 14.288 gode emner. 14.288 / 14.580 = `98,0%`.

**6. OEE:** 90,0% x 90,0% x 98,0% = `79,4%`.

Genvejen giver det samme: 14.288 gode emner x 1,5 sekund er 21.432 sekunder, eller 357,2 minutter. 357,2 / 450 = 79,4%. Af de 450 planlagte minutter gav kun omkring 357 gode emner. Tilgængelighed og ydelse taber lige meget her. Næste skridt er derfor at holde stopårsagerne og de korte stop op mod hinanden.

## Hvilke fejl laver man tit, når man regner OEE ud?

- **En ideel cyklustid, der er for langsom.** Bruger I gennemsnittet eller den planlagte hastighed, ser ydelsen bedre ud, end den er, og OEE kan ende over 100%. Brug den hurtigste hastighed, maskinen kan køre stabilt.
- **De korte stop bliver ikke talt med.** Et stop på et minut eller to bliver sjældent skrevet på skiftsedlen. Så gemmer det sig i ydelsen, og ingen ved, hvad der skete.
- **Omarbejde tæller som godt.** Kvalitet er det, der er godt første gang. Et emne, der har været to gange igennem, har kostet tiden for to.
- **Gennemsnit af OEE på tværs af maskiner.** To maskiner på 60% og 80% giver ikke 70% tilsammen, hvis de har kørt forskellige timer. Læg tiderne og antallene sammen først, og regn så.

## Kan OEE komme over 100%?

Nej. 100% er den perfekte produktion: kun gode emner, i fuld fart, uden stop. Får I mere end 100%, er den ideelle cyklustid sat for langsomt, eller også tæller I emner med, der er lavet uden for den planlagte tid.

## Hvordan regner I OEE ud automatisk?

At regne OEE ud i hånden fra skiftsedler tager tid og giver som regel et for pænt tal, fordi de korte stop og den langsomme kørsel ikke bliver skrevet ned. [OptiPeoples OEE-modul](/da/modules/production) henter køretid og antal direkte fra maskinerne og regner tilgængelighed, ydelse, kvalitet og OEE ud live pr. maskine, linje og skift. Med [stopregistrering ved maskinen](/da/features/stop-cause-registration) sætter operatørerne årsagen på hvert stop, så I kan se, hvad der tog tiden, og ikke kun tallet.

Når I har tallet, viser [guiden til at hæve OEE](/da/blog/how-do-i-improve-my-oee-with-examples), hvor I skal starte.

## Ofte stillede spørgsmål

### Hvad er formlen for OEE?

OEE = tilgængelighed x ydelse x kvalitet. Tilgængeligheden er køretid / planlagt produktionstid, ydelsen er (ideel cyklustid x antal emner) / køretid, og kvaliteten er gode emner / antal emner.

### Hvordan regner man OEE ud i Excel?

Skriv planlagt produktionstid, køretid, ideel cyklustid, antal emner og gode emner i fem celler. Regn hver af de tre dele ud i sin egen celle med formlerne ovenfor, og gang dem sammen. Brug den samme tidsenhed hele vejen, for eksempel minutter.

### Tæller pauser med i OEE?

Nej. Pauser og andre planlagte stop bliver trukket ud af den planlagte produktionstid, før I regner, så de trækker ikke OEE ned. OOE og TEEP tæller dem som tabt tid.

### Hvad er en god OEE?

85% regnes for verdensklasse i diskret produktion. Mange fabrikker ligger omkring 60%, og 40% er almindeligt, når man lige er begyndt at måle. Se [hvad world class OEE er](/da/blog/unlocking-world-class-performance-with-oee-how-to-maximize-efficiency-and-results).

### Regner man OEE pr. maskine eller pr. linje?

Begge dele kan bruges. For en linje regner I OEE på flaskehalsen eller på det, der kommer ud for enden af linjen, fordi det er det, der bestemmer, hvor meget linjen kan lave.
