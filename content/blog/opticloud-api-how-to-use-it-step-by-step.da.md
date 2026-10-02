---
title: "Sådan henter I data med API'et i OptiPeople Data Platform, trin for trin"
---

OptiPeople Data Platform har API'er til at udveksle data. Det kan være simple tal for oppetid og nedetid, men også mere avancerede data som ordrer, vibration, temperatur, ERP-data eller data fra SCADA.

Alle API'er er REST-baserede og bruger JSON.

## Sådan henter I data og tester forbindelsen

Før I kan hente data fra OptiPeople Data Platform, skal fire ting være på plads:

1. Der skal være oprettet en konto på `portal.optipeople.dk`
2. I skal have tilføjet en maskine og en enhed
3. Der skal sendes data til enheden
4. I skal oprette en API-adgangsnøgle i portalen

Når det er gjort, kan I teste forbindelsen direkte i en browser. I åbner bare et REST-endpoint over HTTPS på port `443`.

## Test forbindelsen

I kan tjekke adgangen med en demokonto og en eksempel-URL.

I praksis ser det sådan ud:

```text
https://dataexport.optipeople.dk/api/DataExport/<Endpoint>?access_code=<ACCESS_KEY>
```

Får I JSON tilbage, virker forbindelsen.

## Tilføj parametre

API'et har ekstra parametre som:

- `machineId`
- `from`
- `to`

Med dem kan I nøjes med at hente data for én maskine eller én periode.

## De mest brugte API'er

### `GetEventExport`

Giver de rå hændelser fra maskinen, for eksempel beskeder om drift og nedetid.

God, når I bare skal bruge et let udtræk af de enkelte hændelser.

### `GetDataExport`

Det er det vigtigste API til data om effektivitet.

Det har data om:

- tilgængelighed
- ydelse
- kvalitet
- enheder
- skift
- stopårsager

Det bliver tit brugt sammen med BI-værktøjer som Power BI.

### De vigtigste dataområder

Der er flere vigtige arrays eller datatabeller:

- `shiftData`
- `counterData`
- `unitData`
- `wasteData`

Med dem kan I lave rapporter om skift, tællere, ordrer og kassation eller stop.

### `GetTPMAlertsExport`

Der er også et særskilt API til TPM-alarmer. Det giver data om alarmer til forebyggende vedligehold eller opgaver.

## Det vigtigste at tage med

API'et er enkelt at gå til:

- det bruger REST
- I logger på med adgangsnøglen
- I vælger det rigtige endpoint
- I tilføjer parametre, når I har brug for det
- I bruger JSON-svaret i jeres egne rapporter eller integrationer

Til de fleste rapporter og det meste BI-arbejde er `GetDataExport` det naturlige sted at starte.
