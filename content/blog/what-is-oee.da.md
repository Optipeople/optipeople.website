---
title: "Hvad er OEE? Betydning, formel og eksempler"
description: "OEE (Overall Equipment Effectiveness) er den del af den planlagte produktionstid, der reelt er produktiv. Formlen, regneeksempler og hvad et godt tal er."
---

OEE (Overall Equipment Effectiveness) er den del af den planlagte produktionstid, der reelt er produktiv: gode emner, i fuld fart, uden stop. Det regnes ud som tilgængelighed x ydelse x kvalitet. 100% er perfekt produktion, 85% regnes for verdensklasse, og en typisk fabrik ligger nærmere 60%.

## Hvad står OEE for?

OEE står for **Overall Equipment Effectiveness**. Det er det nøgletal, alle bruger, når de vil vide, hvor godt en maskine, en linje eller en fabrik udnytter den tid, der er planlagt produktion i. Ét tal viser, hvor langt I er fra perfekt. De tre dele viser, hvor tiden forsvinder.

OEE kommer fra Total Productive Maintenance (TPM), som Seiichi Nakajima udviklede i Japan. I dag bruges det i produktion i alle brancher.

## Hvordan regner man OEE ud?

OEE ganger tre tal sammen. Hvert tal er en procent af det ideelle:

```text
OEE = Tilgængelighed x Ydelse x Kvalitet

Tilgængelighed = Køretid / Planlagt produktionstid
Ydelse         = (Ideel cyklustid x Antal emner) / Køretid
Kvalitet       = Gode emner / Antal emner
```

Ganger I de tre ud, går det meste ud med hinanden, og I står tilbage med en genvej, der giver det samme:

```text
OEE = (Gode emner x Ideel cyklustid) / Planlagt produktionstid
```

Hver del fanger sin slags tab. Tilsammen dækker de de seks store tab fra TPM:

| Del | Hvad den måler | Tab den fanger |
|---|---|---|
| Tilgængelighed | Køretid som andel af den planlagte produktionstid | Nedbrud, opstart og omstillinger |
| Ydelse | Den faktiske hastighed mod den ideelle | Småstop, tomgang og nedsat hastighed |
| Kvalitet | Gode emner som andel af alt, der er lavet | Kassation, omarbejde og opstartsspild |

Flere regneeksempler finder I i [guiden til at regne OEE ud trin for trin](/da/blog/how-to-calculate-oee-for-manufacturing-and-maintenance).

## Hvordan ser et regneeksempel ud?

Tag et skift på 8 timer på en maskine, der i bedste fald laver ét emne i minuttet:

- Planlagt produktionstid: `480 minutter`
- Nedetid (et nedbrud og en omstilling): `80 minutter`
- Køretid: `400 minutter`
- Antal emner: `360`
- Gode emner: `342`

Så er:

```text
Tilgængelighed = 400 / 480       = 83,3%
Ydelse         = (1 x 360) / 400 = 90,0%
Kvalitet       = 342 / 360       = 95,0%

OEE = 83,3% x 90,0% x 95,0%      = 71,3%
```

Genvejen giver det samme: 342 gode emner x 1 minut / 480 minutter = 71,3%. Af de 480 minutter blev kun omkring 342 brugt på at lave gode emner. Det største tab ligger i tilgængeligheden, så det er nedetiden, I skal tage fat i først.

## Hvad er et godt OEE-tal?

| OEE | Hvad det betyder |
|---|---|
| 100% | Perfekt produktion: kun gode emner, i fuld fart, uden stop |
| 85% | Verdensklasse i stykproduktion og et langsigtet mål for de fleste |
| 60% | Typisk i stykproduktion, med god plads til at blive bedre |
| 40% | Almindeligt, når en fabrik lige er begyndt at måle, og let at hæve |

De 85% kommer fra 90% tilgængelighed, 95% ydelse og 99,9% kvalitet. Læs mere om, [hvad verdensklasse-OEE er](/da/blog/unlocking-world-class-performance-with-oee-how-to-maximize-efficiency-and-results), og hvordan I kommer derhen.

## Hvordan ser OEE-tal uge for uge ud?

Her er én maskine over fire uger:

| Uge | Tilgængelighed (%) | Ydelse (%) | Kvalitet (%) | OEE (%) |
| --- | ---: | ---: | ---: | ---: |
| 1 | 92 | 85 | 98 | 76,6 |
| 2 | 88 | 80 | 95 | 66,9 |
| 3 | 93 | 87 | 99 | 80,1 |
| 4 | 90 | 82 | 97 | 71,6 |

OEE er højest i uge 3 og lavest i uge 2. I uge 2 faldt alle tre tal på én gang. Så er spørgsmålet, hvad der var anderledes den uge: et nyt produkt, en ny operatør, en maskine, der trængte til at blive set efter.

## Er OEE en KPI?

Ja. OEE er en af de mest brugte KPI'er i produktionen, fordi den holder den faktiske produktion op mod den ideelle på én skala. Den viser, hvor godt maskiner, processer og folkene omkring dem spiller sammen.

Produktionen bruger tallet til at finde den maskine, det skift eller det produkt, der taber mest tid. Vedligeholdet bruger det til at se, hvordan maskinernes tilstand slår igennem på mængde og kvalitet: nedbrud viser sig i tilgængeligheden, og slidte maskiner viser sig tit som lavere hastighed og mere kassation. [OEE i vedligeholdet](/da/blog/oee-for-maintenance) går mere i dybden med den side.

## Hvorfor er OEE vigtigt?

Når OEE stiger, får I kapacitet, I allerede ejer. Før I sætter flere skift på, beder om overarbejde eller køber nye maskiner, viser OEE, hvor meget mere de maskiner, I har, kan lave. Samtidig får operatører, produktion og vedligehold ét fælles tal at arbejde efter, i stedet for at hver afdeling har sine egne tal.

## Hvordan hæver man OEE?

1. Mål det automatisk, så folk stoler på tallene, og de er friske.
2. Find den del, der taber mest: tilgængelighed, ydelse eller kvalitet.
3. Registrer stopårsager, og tag de største først.
4. Gør omstillingerne kortere, og få bugt med småstoppene.
5. Følg udviklingen pr. skift og pr. uge, ikke kun gennemsnittet for måneden.

[Guiden til at hæve jeres OEE](/da/blog/how-do-i-improve-my-oee-with-examples) går trinene igennem med eksempler.

## Hvordan måler man OEE automatisk?

OEE regnet ud fra skiftesedler er langsomt og som regel for pænt, fordi korte stop og langsom kørsel ikke bliver skrevet ned. [OptiPeoples OEE-modul](/da/modules/production) henter data direkte fra maskinerne og viser tilgængelighed, ydelse, kvalitet og OEE live pr. maskine, linje og skift. Operatørerne registrerer stopårsagen ved maskinen, så I ikke bare ser tallet, men også hvad der tog tiden.

## Ofte stillede spørgsmål

### Hvad står OEE for?

OEE står for Overall Equipment Effectiveness. Tallet viser, hvor meget af den planlagte produktionstid der reelt er produktiv.

### Hvad er formlen for OEE?

OEE = tilgængelighed x ydelse x kvalitet. Tilgængelighed er køretid delt med planlagt produktionstid. Ydelse er ideel cyklustid gange antal emner delt med køretid. Kvalitet er gode emner delt med antal emner.

### Hvad er en god OEE?

85% regnes for verdensklasse i stykproduktion. Mange fabrikker ligger omkring 60%, og 40% er almindeligt, når man lige er begyndt at måle.

### Hvad er forskellen på OEE og TEEP?

OEE måler mod den planlagte produktionstid. TEEP måler mod al tid i kalenderen, døgnet rundt hele ugen, og viser derfor også den kapacitet, der ikke bliver brugt. Se [OEE, OOE og TEEP side om side](/da/blog/oee-teep-and-ooe-whats-the-difference-with-examples).

### Kan OEE blive over 100%?

Nej. Kommer OEE over 100%, er den ideelle cyklustid sat for langsomt. Brug den hurtigste cyklustid, maskinen stabilt kan køre, ikke gennemsnittet.
