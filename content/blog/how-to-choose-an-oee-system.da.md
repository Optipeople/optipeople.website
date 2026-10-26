---
title: "OEE-system: Sådan vælger I det rigtige til produktionen"
description: "Hvad skal et OEE-system kunne, hvad bestemmer prisen, og hvad skal I spørge leverandøren om? En guide til jer, der skal vælge OEE-software."
---

Et OEE-system måler, hvor meget af den planlagte produktionstid der reelt giver gode emner, og viser, hvor resten forsvinder. Om det virker ude på gulvet, afhænger af tre ting. Data skal komme direkte fra maskinerne, også de gamle. Operatøren skal kunne give stoppet en årsag ved maskinen. Og I skal kunne starte på én linje uden et stort IT-projekt.

## Hvad er et OEE-system?

Et OEE-system, eller OEE-software, samler data fra produktionen og regner OEE ud: tilgængelighed x ydelse x kvalitet. Tallet viser, hvor langt I er fra perfekt produktion. De tre dele viser, om tiden går tabt på stop, på langsom kørsel eller på kassation. Er I i tvivl om selve tallet, så start med [hvad OEE er, og hvordan I regner det ud](/da/blog/what-is-oee).

Forskellen på et regneark og et OEE-system er, hvor tallene kommer fra, og hvornår I ser dem. I regnearket bliver de skrevet ind bagefter. I et OEE-system kommer de fra maskinen, mens skiftet kører, så der stadig er tid til at gøre noget.

## Hvad skal et OEE-system kunne?

De fleste leverandører har en lang liste over funktioner. Det er de her punkter, der afgør, om systemet stadig bliver brugt om et halvt år.

**Hente data direkte fra maskinerne.** Køretid, stop og antal emner skal komme fra maskinen, ikke fra en seddel. Det gælder også de ældre maskiner. Spørg, om systemet kan læse fra de PLC'er, I har, og hvad der sker med en maskine, der ikke har noget at læse fra. Tit er en lille sensor eller en emnetæller nok.

**Lade operatøren registrere stopårsagen ved maskinen.** En maskine kan fortælle, at den står stille. Den kan ikke fortælle hvorfor. Det kan operatøren, hvis det tager få sekunder, og listen over årsager passer til lige den maskine. Uden stopårsager har I et tal, men ingen forklaring. Hvordan I laver listen, kan I læse i [guiden til stopregistrering og stopårsager](/da/blog/stop-registration-and-stop-causes).

**Vise tallene live pr. skift og pr. linje.** Tallene skal stå på en skærm ved linjen og på kontoret, mens skiftet kører. Kan I først se dem dagen efter, er chancen for at rette op væk.

**Lave rapporterne selv.** Dags-, uge- og månedsrapporter skal komme af sig selv. Den tid, nogen bruger på at samle tal i et regneark, er tid, der ikke går til at forbedre noget.

**Tale med jeres andre systemer.** Ligger ordrerne i et ERP-system, er det en fordel, at ordrer og varenumre kan hænge sammen med OEE-tallene. Men det skal ikke være et krav for at komme i gang.

**Komme i gang uden et stort IT-projekt.** Kræver det en ny server, et projekt på et halvt år og en konsulent på fuld tid, før I ser det første tal, så er det for meget at starte med.

**Starte på én linje.** Det bedste første skridt er en enkelt linje eller maskine, hvor tabet er størst. Så ved I hurtigt, om tallene passer, og om operatørerne bruger det.

## Manuel registrering eller automatisk dataopsamling?

Mange starter med en tavle, en skiftseddel eller et regneark. Det er bedre end ingenting, og det får folk til at snakke om tab. Men tallene bliver som regel for pæne. Korte stop og langsom kørsel bliver sjældent skrevet ned, og stoppene havner bagefter i en uklar kategori som "andet".

Automatisk dataopsamling betyder, at maskinen selv melder, når den kører, når den står stille, og når den laver et emne. Operatøren skal kun give stoppet en årsag. Så får I både det præcise tal og forklaringen. Det bedste er en blanding: maskinen leverer tiden og antallet, operatøren leverer årsagen.

| | Tavle eller regneark | Selvstændigt OEE-værktøj | Modulær platform (MES) |
|---|---|---|---|
| Hvor kommer data fra | Skrevet ind i hånden | Fra maskinerne | Fra maskinerne og jeres andre systemer |
| Stopårsager | Skrevet ned bagefter, hvis nogen husker det | Ved maskinen | Ved maskinen |
| Hvornår ser I tallene | Efter skiftet eller ugen | Live | Live |
| Korte stop og langsom kørsel | Kommer sjældent med | Kommer med | Kommer med |
| Ordrer, kvalitet og vedligehold | Hver for sig | Som regel ikke med | Kan komme med, når I er klar |
| Hvad det kræver at starte | Ingenting | En linje og en opkobling | En linje og en opkobling |
| Når I vil mere end OEE | Nyt værktøj | Tit et nyt system ved siden af | Et modul mere på de samme data |

Den sidste linje i tabellen er værd at tænke over fra starten. De fleste, der begynder med OEE, vil senere også have styr på ordrer, kvalitet, vedligehold eller energi. Ligger det på de samme data, slipper I for at koble endnu et system på.

## Hvad koster et OEE-system?

Prisen afhænger mindre af selve programmet og mere af, hvad der skal til for at få data ud af jeres maskiner. Det er de ting, der trækker prisen op eller ned:

- **Antal maskiner og linjer.** Prisen følger som regel, hvor meget I kobler på.
- **Hvordan maskinerne kobles på.** Kan systemet læse fra de PLC'er og systemer, I har, er det billigere end at sætte nyt udstyr op på hver maskine.
- **Hardware.** Skærme eller tablets ved maskinerne, og sensorer dér, hvor der ikke er noget at læse fra.
- **Opsætning og oplæring.** Stopårsagerne skal sættes op pr. maskine, og operatørerne skal vide, hvorfor de registrerer dem.
- **Integration.** En kobling til ERP eller andre systemer tager tid, så tag den, når den kan betale sig.
- **Drift.** Et cloudsystem betaler I typisk løbende for. Et system på jeres egen server kræver, at nogen passer serveren.

Regn det også den anden vej. Hvad er én procent mere tilgængelighed værd på jeres flaskehals? Vores [regnestykke med tal fra 191 maskiner](/da/blog/fun-facts-hvad-koster-det) viser, hvor hurtigt nedetid løber op. Bed leverandøren om en pris, der starter på én linje, så I kan se værdien, før I går videre.

## Hvor lang tid tager det at komme i gang?

Det afhænger af maskinerne, men det skal ikke tage måneder. Først kortlægger vi, hvad der allerede melder noget: PLC'er, sensorer og systemer. Så kobler vi det på, der er, over fx OPC-UA, Modbus eller MQTT, og sætter kun nyt udstyr op, hvor der ikke er noget at læse fra. Det er det, [IoT-modulet](/da/modules/iot) står for. Når en maskine først er koblet på, er der under et minut fra signal til skærm.

Det meste af arbejdet er ikke teknikken. Det er at blive enige om stopårsagerne og få tallene ind i hverdagen: på tavlemødet, ved vagtskiftet og i forbedringsarbejdet. Dansk Træemballage startede på én linje, lod operatørerne følge oppetiden på en tablet og fik [5% højere OEE på tre måneder](/da/blog/dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud). Hos Glaseksperten fik én maskine [op til 30% mere oppetid](/da/blog/glaseksperten-up-to-30-percent-more-uptime-on-one-machine), da operatørerne kunne se oppetiden.

## Spørgsmål I bør stille leverandøren

Tag listen med til demoen. Svarene siger mere end en liste over funktioner.

1. Kan systemet hente data fra vores maskiner, også de ældste? Hvordan, og hvad kræver det af udstyr?
2. Kan det læse fra de PLC'er og systemer, vi allerede har, eller skal der nyt udstyr op på hver maskine?
3. Hvordan registrerer operatøren et stop, og hvor lang tid tager det?
4. Kan vi selv lave listen over stopårsager pr. maskine og rette i den bagefter?
5. Kan vi se OEE live pr. maskine, linje og skift, og sammenligne skiftene?
6. Hvordan bliver tilgængelighed, ydelse og kvalitet regnet ud, og hvor kommer den ideelle cyklustid fra?
7. Kommer rapporterne af sig selv, og kan vi selv vælge, hvem der får dem?
8. Kan systemet tale med vores ERP, og skal det, før vi kan starte?
9. Kan vi starte på én linje og udvide bagefter uden at starte forfra?
10. Hvem ejer dataene, og kan vi få dem ud igen?
11. Hvad kan systemet ellers, når vi vil videre end OEE: ordrer, kvalitet, vedligehold, energi?
12. Hvem hjælper os, når vi er i gang, og taler de dansk?

## Sådan kommer I videre

Vælg den linje, hvor I tror, tabet er størst. Kobl den på, lad operatørerne registrere stopårsager i et par uger, og se, hvad tallene siger. Så har I noget at beslutte ud fra, før I udvider.

OptiPeople Data Platform henter data direkte fra maskinerne og viser tilgængelighed, ydelse, kvalitet og OEE live pr. maskine, linje og skift. Operatørerne registrerer [stopårsagen ved maskinen](/da/features/stop-cause-registration), og rapporterne laver sig selv. Se, hvordan det ser ud i [OEE-modulet](/da/modules/production), eller [tag fat i os](/da/contact), hvis I vil se det på jeres egen produktion.

## Ofte stillede spørgsmål

### Hvad er et OEE-system?

Et OEE-system er software, der henter data fra produktionen og regner OEE ud: tilgængelighed x ydelse x kvalitet. Det viser, hvor meget af den planlagte tid der giver gode emner, og hvor resten går tabt.

### Hvad er forskellen på OEE i et regneark og et OEE-system?

I et regneark bliver tallene skrevet ind i hånden bagefter, og korte stop og langsom kørsel kommer sjældent med. Et OEE-system henter tallene direkte fra maskinerne, mens skiftet kører, og operatøren giver stoppene en årsag ved maskinen.

### Kan et OEE-system bruges på gamle maskiner?

Ja, i de fleste tilfælde. Har maskinen en PLC, kan systemet tit læse fra den. Har den ikke noget at læse fra, kan en sensor eller en emnetæller måle, hvornår den kører, og hvor mange emner den laver.

### Hvad koster et OEE-system?

Det afhænger af, hvor mange maskiner I kobler på, hvordan de kobles på, hvor meget hardware der skal til, og om I vil have en kobling til ERP. Start på én linje, så I kan se værdien, før I udvider.

### Skal vi have et ERP-system for at bruge et OEE-system?

Nej. Et OEE-system kan sagtens køre alene. En kobling til ERP er en fordel, når ordrer og varenumre skal hænge sammen med tallene, men den kan komme senere.

### Hvor hurtigt kan vi se de første tal?

Når maskinen er koblet på, ser I tallene live med det samme. Hvor lang tid opkoblingen tager, afhænger af, hvad maskinen allerede kan melde. Det, der tager længst tid, er at få stopårsagerne på plads og tallene ind i den daglige styring.
