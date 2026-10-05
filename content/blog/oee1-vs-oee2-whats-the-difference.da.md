---
title: "OEE1 og OEE2: Hvad står OEE for, og hvad er forskellen?"
description: "OEE står for Overall Equipment Effectiveness. OEE1 regner ud fra al tid, OEE2 kun ud fra planlagt produktionstid. Formlen, et eksempel og hvornår I bruger hvad."
---

OEE står for Overall Equipment Effectiveness: tilgængelighed x ydelse x kvalitet. OEE1 og OEE2 bruger samme formel, men regner ud fra forskellig tid. OEE1 måler mod al tid i kalenderen, døgnet rundt hele året. OEE2 måler mod den planlagte produktionstid, de timer, I faktisk har sat produktion på. OEE1 viser kapaciteten. OEE2 er tallet til det daglige forbedringsarbejde.

## Hvad står OEE for?

OEE står for **Overall Equipment Effectiveness**. Det er det nøgletal, produktionen bruger til at måle, hvor meget af tiden en maskine bruger på at lave gode emner i fuld fart. 100% betyder kun gode emner, så hurtigt som muligt, uden stop. Den fulde forklaring finder I under [hvad er OEE](/da/blog/what-is-oee).

## Hvordan regner man OEE ud?

OEE ganger tre tal sammen. Ydelse og kvalitet er de samme i OEE1 og OEE2. Det er kun tilgængeligheden, der skifter, fordi den bliver målt mod forskellig tid:

```text
OEE = Tilgængelighed x Ydelse x Kvalitet

Tilgængelighed (OEE1) = Køretid / Al tid i kalenderen
Tilgængelighed (OEE2) = Køretid / Planlagt produktionstid

Ydelse   = (Ideel cyklustid x Antal emner) / Køretid
Kvalitet = Gode emner / Antal emner
```

## Hvad er forskellen på OEE1 og OEE2?

| | OEE1 | OEE2 |
|---|---|---|
| Regnes ud fra | Al tid i kalenderen | Planlagt produktionstid |
| Timer om året | 8.760 (24 x 365) | Kun de planlagte skift, minus planlagte stop |
| Tæller som tabt tid | Alt, også nætter, weekender og helligdage | Kun uplanlagte stop, langsom kørsel og kassation |
| Svarer på | Hvor meget kapacitet er der tilbage i maskinen? | Hvor godt kører maskinen, når der er planlagt produktion? |
| Kendes også som | Tæt på TEEP | Almindelig OEE |
| Bedst til | Kapacitetsplanlægning og investeringer | Daglige forbedringer på maskiner og skift |

Fordi OEE1 deler med flere timer, er det altid lavere end OEE2 på samme maskine.

## Hvordan ser OEE1 og OEE2 ud i et eksempel?

Tag én maskine over én uge:

- Al tid i kalenderen: `168 timer`
- Planlagt produktionstid: `70 timer` (to skift, 5 dage, minus pauser og planlagte stop)
- Køretid: `56 timer`
- Ydelse: `90%`
- Kvalitet: `95%`

```text
OEE2 = (56 / 70)  x 90% x 95% = 80,0% x 85,5% = 68,4%
OEE1 = (56 / 168) x 90% x 95% = 33,3% x 85,5% = 28,5%
```

Samme maskine, samme uge, samme emner. OEE2 siger, at maskinen kører nogenlunde, når der er planlagt produktion, og at nedetiden er det største tab. OEE1 siger, at den producerer under en tredjedel af ugen. Der er altså plads til meget mere, før nogen behøver en ny maskine.

## Hvornår skal I bruge OEE1?

Brug OEE1, når spørgsmålet handler om kapacitet:

- Hvor meget kapacitet har vi i alt?
- Kan vi tage en stor ordre ved at sætte et skift på i stedet for at købe en maskine?
- Hvor meget ligger ubrugt på fabrikken?

### Hvornår I ikke skal bruge OEE1

OEE1 er det forkerte tal, når I vil forbedre en bestemt maskine eller et bestemt skift. Ferie, lukkede weekender og et manglende nathold trækker tallet ned, også når maskinen kører perfekt i hver eneste planlagte time. Det er tab, operatørerne ikke kan gøre noget ved.

## Hvornår skal I bruge OEE2?

Brug OEE2 til det daglige forbedringsarbejde. Det lader de timer ude, hvor der aldrig var planlagt produktion. Så er hvert tab, tallet viser, et tab, folk kan gøre noget ved:

- at forbedre det enkelte skift
- at analysere den enkelte maskine
- målrettet arbejde med stop, hastighed og kassation

For at regne OEE2 rigtigt ud skal I vide:

- hvor mange skift I kører
- hvor mange timer skiftene arbejder
- hvor mange planlagte stop I har
- hvor meget planlagt produktionstid der er tilbage efter de stop

## Hvordan måler man OEE2 automatisk?

OEE2 er aldrig bedre end de køretider og stop, det bygger på. [OptiPeoples OEE-modul](/da/modules/production) henter de data direkte fra maskinerne og viser tilgængelighed, ydelse, kvalitet og OEE live pr. maskine, linje og skift. Operatørerne registrerer stopårsagen ved maskinen, så alle kan se, hvad der tog tiden, og ikke kun tallet.

## Ofte stillede spørgsmål

### Hvad står OEE for i produktionen?

OEE står for Overall Equipment Effectiveness. Tallet viser, hvor meget af den planlagte tid en maskine bruger på at lave gode emner i fuld fart, regnet ud som tilgængelighed x ydelse x kvalitet.

### Er OEE1 det samme som TEEP?

I praksis ja. Begge måler mod al tid i kalenderen, døgnet rundt hele året. TEEP er det internationale navn, mens OEE1 mest bruges i Skandinavien. Se [OEE, OOE og TEEP side om side](/da/blog/oee-teep-and-ooe-whats-the-difference-with-examples).

### Er OEE2 det samme som OEE?

Ja. OEE2 er OEE, som det normalt bliver defineret: målt mod den planlagte produktionstid.

### Hvorfor er OEE1 lavere end OEE2?

OEE1 deler den samme køretid med flere timer. Hver time uden planlagt produktion tæller som tab i OEE1, men ikke i OEE2.

### Hvad er et godt OEE2-tal?

85% regnes for verdensklasse i stykproduktion, og mange fabrikker ligger omkring 60%. OEE1 har ikke noget fælles pejlemærke, fordi tallet mest afhænger af, hvor mange skift fabrikken kører.
