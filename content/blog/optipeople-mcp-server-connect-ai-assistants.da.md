---
title: "OptiPeople MCP-server: spørg Claude om jeres produktionsdata"
---

OptiPeople Data Platform har en MCP-server. Den lader en AI-assistent som Claude læse jeres maskindata direkte og svare på spørgsmål som "hvad var OEE på pakkelinjen i sidste uge?" eller "hvilke stopårsager kostede mest tid i september?".

Ingen kode, intet udtræk, ingen Power BI-model. I kobler på én gang, logger ind med jeres portalbruger og spørger løs.

Her forklarer vi, hvad MCP er, hvordan I kobler på, og alt det, serveren kan. Vil I hellere bygge jeres egen integration, så læs [guiden til API'et i OptiPeople Data Platform, trin for trin](/da/blog/opticloud-api-how-to-use-it-step-by-step).

## Hvad er MCP?

MCP (Model Context Protocol) er en åben standard, der lader AI-assistenter bruge værktøjer i andre systemer. I stedet for at I kopierer tal ind i en chat, spørger assistenten selv platformen, henter data og arbejder videre med dem.

OptiPeople MCP-serveren giver assistenten en række værktøjer bygget til produktionsdata: maskiner, skift, live status, OEE-rapporter, stop, ordrer, tællere og telemetri. Assistenten vælger selv det rigtige værktøj til jeres spørgsmål.

## API eller MCP?

| | REST-API | MCP-server |
|---|---|---|
| Hvem bruger det | Udviklere og BI-værktøjer | Alle, der kan stille et spørgsmål |
| Hvordan | REST-kald med en adgangskode | En AI-assistent kalder værktøjerne for jer |
| Login | Kontoens adgangskode | OAuth med jeres egen portalbruger |
| Bedst til | Power BI, ERP-integrationer, faste rapporter | Spørgsmål der dukker op, analyser, hurtige svar |

De bygger på de samme data. Mange bruger begge: API'et fodrer de faste rapporter, og MCP svarer på det, der dukker op ind imellem.

## Sådan kobler I på

Serverens adresse er:

```text
https://mcp.optipeople.dk/
```

### Claude (claude.ai og desktop-appen)

1. Gå til **Settings > Connectors**.
2. Vælg **Add custom connector**.
3. Giv den et navn, for eksempel **OptiPeople**, og indsæt `https://mcp.optipeople.dk/` som URL.
4. Klik **Connect**. I bliver sendt videre til OptiPeoples login.
5. Log ind med jeres portalbruger og giv adgang.

Det var det. Start en ny chat og spørg til jeres maskiner. På Team- og Enterprise-abonnementer skal en ejer måske tilføje connectoren for hele organisationen først.

### Claude Code

```bash
claude mcp add --transport http optipeople https://mcp.optipeople.dk/
```

Kør derefter `/mcp` i Claude Code og log ind.

### Andre AI-assistenter

Alle klienter, der understøtter MCP-servere over HTTP med OAuth, kan koble på med samme URL. Serveren understøtter dynamisk klientregistrering, så klienten registrerer sig selv. I skal ikke oprette klient-id eller hemmelighed i hånden.

### Sådan fungerer login

- I logger ind med OAuth og PKCE. Jeres password går aldrig gennem AI-assistenten.
- Assistenten får en token med adgangen `mcp:tools` og ser de samme data på kontoen, som jeres portalbruger kan se.
- Hver klient, der er koblet på, står i portalen under **Account > MCP > Client Secrets**. Fjern den der, så er adgangen lukket.
- Ændringer, der kommer ind via MCP, bliver gemt med kilden `McpTool`. Så kan I altid se forskel på dem og det, maskinerne selv har sendt.

## Det kan serveren

Serveren har 13 værktøjer. I kalder dem aldrig selv, det gør assistenten. Men det hjælper at vide, hvad der er, når I skal stille gode spørgsmål.

### Find rundt

- **get_system_context:** beskriver platformen, de vigtigste begreber (skift, OEE, tællere, telemetri, dynamiske skift) og jeres konto: navn, hvilke funktioner der er slået til, antal fabrikker og maskiner. Assistenten kalder den typisk først.
- **get_factories:** jeres fabrikker med land, tidszone og lokal tid, og de skiftnavne, der er sat op.
- **get_machines:** alle maskiner med id, fabrik, tællere, og om de sender telemetri. Kan filtreres på fabrik eller en del af navnet.
- **get_machine:** én maskines opsætning: tællere og enheder, telemetriparametre, mål for OEE, oppetid, ydelse og kvalitet, og forventet hastighed.
- **get_shift_schedule:** ugens skiftplan for op til 20 maskiner, også hvilke skift der starter eller stopper med maskinen.

### Hvad sker der lige nu

- **get_machine_status:** live status for op til 10 maskiner, som realtidsdashboardet viser den. Kører, står, omstilling eller uden for skift. Stopårsag og siden hvornår. Om der er stop, der venter på en årsag. Det aktuelle skift og dets OEE indtil nu, ordren der kører med producerede og kasserede emner, og seneste heartbeat.

### OEE over en periode

- **get_oee_report:** portalens OEE-rapport for op til 5 maskiner, for en uge eller en række dage. Pr. maskine: OEE, tilgængelighed, ydelse og kvalitet; timer i skift, i drift, i planlagte og uplanlagte stop; antal stop; producerede og kasserede emner pr. tæller; og de 5 største stopårsager. Kan begrænses til bestemte skift.

### Spørg om alt i produktionsdata

- **describe_sources:** fortæller assistenten, hvilke datakilder der er, hvilke felter de har, og hvor grænserne går.
- **query_data:** ét fleksibelt værktøj til forespørgsler. Filtrér, gruppér på maskine, fabrik, tæller, årsag eller ordre, del op i time, skift, dag, uge eller måned, og regn summer, gennemsnit, mindste, største og percentiler ud.

`query_data` læser seks kilder:

| Kilde | Hvad den har |
|---|---|
| `partCounters` | Producerede, kasserede og gode emner og kassationsprocent. Gennemsnit, bedste og dårligste pr. time, skift, dag, uge eller måned. |
| `stops` | Hvert stop med årsag, kategori, planlagt eller ej, omstilling eller stop, varighed, og om det stadig står på. |
| `orders` | Hver gang en ordre har kørt: hvornår, hvor længe, tid i drift, planlagte og uplanlagte stop, producerede og kasserede emner. |
| `telemetry` | Målinger som temperatur, hastighed eller strøm. Gennemsnit, min, maks, p50 og p95, også kun mens maskinen kørte. |
| `heartbeats` | Hvornår maskinens enhed meldte sig, og hullerne, hvor den ikke gjorde. |
| `lists` | Jeres stamdatalister, for eksempel kvalitetskontrol eller operatørscanninger. |

### Send data ind

Tre værktøjer ændrer data. Assistenten bruger dem kun, når I beder om det.

- **send_machine_state:** registrerer, at en maskine startede, stoppede, eller stoppede med en bestemt årsag.
- **send_order:** starter en ordre på en maskine, eventuelt med antal, forventet hastighed og egne felter. Ordren bliver oprettet, hvis den ikke findes.
- **send_part_counter:** registrerer producerede emner (positivt tal) eller kasserede emner (negativt tal) på en tæller.

Alle tre kan få et tidspunkt med, så I kan registrere noget, der skete tidligere i dag. De tæller med i OEE, præcis som data fra maskinen.

### For partnere og administratorer

- **list_accounts:** partnere ser de kundekonti, de er koblet til, og superadministratorer ser dem alle. Alle værktøjer tager et konto-id, så en partner kan arbejde på tværs af kunder i samme chat. Almindelige brugere ser kun deres egen konto.

## Spørgsmål, I kan prøve

- "Hvilke maskiner står lige nu, og hvorfor?"
- "Giv mig OEE-rapporten for uge 42 for alle maskiner."
- "Hvad var de 10 største stopårsager på CNC Robot i september, i minutter?"
- "Hvor mange emner lavede pakkelinjen pr. skift i sidste uge, og hvor meget blev kasseret?"
- "Hvilke ordrer tog længst tid i forhold til, hvor mange emner de gav?"
- "Hvad var ovnens gennemsnitstemperatur, mens den kørte, time for time i går?"
- "Har nogen maskine mistet forbindelsen i denne måned?"
- "Start ordre 4711 på pakkelinjen med 2.000 stk."

## Godt at vide

- **Tid:** assistenten svarer i hver fabriks lokale tid.
- **Grænser:** en forespørgsel kan dække op til 92 dage ad gangen (et år for stop og totaler pr. skift), rå rækker et kortere stykke. Bed om uger eller måneder, hvis I skal se en lang periode.
- **Friske tal:** en periode, der stadig kører, bliver markeret som ikke endelig. En rettelse i en afsluttet periode kan tage op til 24 timer om at slå igennem.
- **OEE kommer ét sted fra:** OEE bliver altid hentet fra OEE-rapporten, så tallene passer med det, I ser i portalen.

## Kom i gang

Kobl `https://mcp.optipeople.dk/` på i jeres AI-assistent, log ind, og stil jeres første spørgsmål. Skal I i stedet bygge en integration? [API-guiden](/da/blog/opticloud-api-how-to-use-it-step-by-step) gennemgår alle 54 REST-endpoints.
