---
title: "Sådan henter I data med API'et i OptiPeople Data Platform, trin for trin"
---

OptiPeople Data Platform har et REST-API, som I kan hente data ud med og sende data ind med. Det kan være simpel oppetid og nedetid, OEE pr. skift, ordrer, stopårsager, telemetri som temperatur og vibration, og de stamdata, I har liggende i platformen.

Alle endpoints kører over HTTPS og svarer i JSON. Der er 54 af dem, og den fulde reference med alle svarformater ligger i [External API Reference (PDF)](https://storageprodoptipeople.blob.core.windows.net/application-resources/v1/Optipeople_External_API.pdf). Her viser vi, hvordan I kommer i gang, og hvilket endpoint I skal bruge til hvad.

Vil I hellere stille spørgsmål til jeres data på almindeligt dansk end skrive kode? Så læs, [hvordan I kobler Claude og andre AI-assistenter på med vores MCP-server](/da/blog/optipeople-mcp-server-connect-ai-assistants).

## Det skal være på plads

1. En konto på `portal.optipeople.dk`
2. Mindst én maskine med en enhed koblet på
3. Data, der kommer ind fra enheden
4. Jeres API-adgangskode

Adgangskoden finder I i portalen under **Accounts > External API**. Den hører til jeres konto, så pas på den som på et password.

## Log på

Alle kald går til samme adresse:

```text
https://dataexport.optipeople.dk/api
```

I kan sende adgangskoden på to måder. Den foretrukne er en `Authorization`-header med `Opti` foran:

```text
Authorization: Opti <ADGANGSKODE>
```

Den anden er parameteren `access_code` i URL'en. Den er nem, når I bare vil teste i en browser:

```text
https://dataexport.optipeople.dk/api/Machine/GetAll?access_code=<ADGANGSKODE>
```

Får I en JSON-liste med jeres maskiner tilbage, virker forbindelsen.

## Trin for trin: jeres første udtræk

**1. Find jeres maskiner.** Kald `GET /Machine/GetAll` og skriv `id` ned for hver maskine. Næsten alle andre endpoints skal have et `machineId`.

```bash
curl -H "Authorization: Opti <ADGANGSKODE>" \
  https://dataexport.optipeople.dk/api/Machine/GetAll
```

**2. Hent produktionsdata for en periode.** Kald `GET /DataExport/GetDataExport` med en maskine og en periode:

```bash
curl -H "Authorization: Opti <ADGANGSKODE>" \
  "https://dataexport.optipeople.dk/api/DataExport/GetDataExport?machineId=<MASKINE_ID>&from=2026-10-01&to=2026-10-25"
```

**3. Brug JSON-svaret** i Power BI, Excel, jeres ERP eller jeres egen kode.

## Parametre, der går igen

- `machineId`: maskinen, I vil se data for. På `GetDataExport`, `GetEventExport` og `GetOEE` kan I gentage den og få flere maskiner i ét kald: `&machineId=<id1>&machineId=<id2>`.
- `factoryId`: kun én fabrik.
- `from` og `to`: perioden som `yyyy-MM-dd`. De fleste udtræk tager dagen i dag, hvis I udelader dem, og ét kald kan højst dække et år.

Alle svar er bygget ens op: `data` er resultatet, `errors` er det, der gik galt, og `meta` er ekstra oplysninger.

## De vigtigste udtræk

### `GetDataExport`: til rapporter og BI

Det er her, de fleste Power BI-rapporter starter. Ét kald giver en periodes produktionsdata, delt op i arrays:

- `shiftData`: én række pr. skift med længde, start og stop, planlagt og uplanlagt stoptid
- `counterData`: producerede og kasserede emner pr. tæller
- `unitData`: de ordrer, der kørte i hvert skift, og hvor hurtigt
- `wasteData`: hvert stop med årsag, kategori og om det var planlagt
- hvor mange operatører der var på hvert skift, og maskinens indstillinger som forventet hastighed og mål

### `GetOEE`: tallene er regnet ud

Giver OEE, tilgængelighed, ydelse og kvalitet pr. maskine for en periode, så I ikke selv skal regne. Sæt `includePerShiftData=true` på, hvis I vil have tallene pr. skift.

### `GetEventExport`: de rå hændelser

Hver eneste gang maskinen starter eller stopper. Brug den, når I skal have hele loggen og ikke bare summen.

### `GetOrderReportExport`: produktion pr. ordre

Produktionsdata pr. ordre, hvor stoptiden er fordelt ud på ordrerne.

### `GetLatestStop` og `GetHeartbeats`: hvad sker der lige nu

`GetLatestStop` giver maskinens seneste stop. `GetHeartbeats` viser, om maskinerne melder sig.

### Telemetri

- `GetTelemetryData` giver målinger for én parameter på én maskine, for eksempel temperatur, mellem to tidspunkter.
- `GetTelemetry` lader jer hente rå telemetri med OData: `$filter`, `$orderby`, `$top` (op til 10.000 rækker), `$skip` og `$count`. Følg `@odata.nextLink` for at hente næste side.
- `GetHoursSpentBetweenTelemetryThresholds` siger, hvor mange timer en parameter lå mellem to værdier. For eksempel hvor længe ovnen kørte mellem 180 og 200 grader.

### `GetTPMAlertsExport`: vedligeholdsalarmer

Henter TPM-alarmer for en eller flere maskiner, så I kan planlægge vedligehold ud fra dem.

## Send data ind

API'et kan mere end at læse. I kan også sende data ind i platformen:

- **Ordrer:** `POST /Machine/SetMachinePartInformation` starter en ordre på en maskine, og `POST /PartOrderNumber/ExternalSetPartOrder` sætter ordren på fabriksniveau. Typisk er det jeres ERP eller MES, der fortæller platformen, hvilken ordre der kører.
- **Operatører:** opret, ret og slet operatører med `/User`-endpoints. `CreateOrUpdateOperators` finder operatøren ud fra medarbejdernummer, så I kan synkronisere direkte fra løn- eller HR-systemet.
- **Stop:** `POST /Waste/RegisterAllPendingWaste` giver alle ventende stop samme årsag i ét hug.
- **Stamdata:** læs, opret, ret, søg i og slet rækker i jeres stamdatatabeller med `/MasterData`-endpoints. Godt til kvalitetsresultater, scanninger eller opslagstabeller, som andre systemer skal bruge.

## Alle grupper af endpoints

| Gruppe | Hvad den dækker |
|---|---|
| Account | Kontoens indstillinger |
| API Usage | Hvor mange kald og hvor meget data I har brugt, pr. konto eller pr. integration |
| Factory | Jeres fabrikker |
| Device | Enheder og deres status |
| Machine | Maskiner, manuelle operatørlog, stopkonfiguration, start af ordrer |
| Machine Shift og Shift Identifier | Skiftplaner og skiftnavne |
| Data Export | Produktion, OEE, hændelser, ordrer, stop, heartbeats, TPM-alarmer og telemetri |
| Report | Ordren, der kører nu, tællerrapporter pr. dag og pr. time, ordreoplysninger med egne felter |
| Part Order Number | Ordrer pr. fabrik og præcist antal emner mellem to tidspunkter |
| Master Data | Jeres egne datatabeller |
| Task Configuration og Task Instance | Opgaver, aktive og afsluttede opgaver med historik |
| User | Operatører |
| Waste | Registrering af ventende stop |
| Incomac App | Indstillinger for energioptimering, spotpriser og maskinbeskeder |

I [PDF-referencen](https://storageprodoptipeople.blob.core.windows.net/application-resources/v1/Optipeople_External_API.pdf) står parametre og det fulde svarformat for hvert endpoint.

## Hold øje med forbruget

`GET /APIUsage/GetUsageForAccount?startDate=2026-10-01` viser, hvor mange kald I har lavet, og hvor meget data de har givet, fordelt pr. endpoint. `GetUsageForExternalApplication` gør det samme for én integration.

## Kort fortalt

- Find adgangskoden under **Accounts > External API**
- Send den som `Authorization: Opti <kode>`
- Start med `Machine/GetAll` og derefter `DataExport/GetDataExport` eller `DataExport/GetOEE`
- Brug `machineId`, `from` og `to` til at snævre ind
- Slå op i PDF'en, når I skal bruge et bestemt felt

Vil I hellere spørge "hvad stoppede pakkelinjen mest i sidste uge?" end selv bygge forespørgslen, så [kobl en AI-assistent på via vores MCP-server](/da/blog/optipeople-mcp-server-connect-ai-assistants).
