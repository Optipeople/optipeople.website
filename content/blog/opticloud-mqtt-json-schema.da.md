---
title: "Sådan sender I data til OptiPeople Data Platform over MQTT: JSON-skemaet"
---

Her er en vejledning til det JSON-skema, I skal bruge, når I sender data til OptiPeople Data Platform over MQTT.

## Sådan er en besked bygget op

```json
{
  "time": "timestamp ISO8601 yy-mm-ddThh-mm-ssz",
  "inputType": "string[30]",
  "functions": [
    {
      "deviceId": "string[30]",
      "name": "string[30]",
      "value": "string[128]",
      "time": "timestamp ISO8601 yy-mm-ddThh-mm-ssz"
    }
  ]
}
```

## Felterne

### `time`

`time` øverst i beskeden er tidspunktet, hvor beskeden blev sendt. `time` inde i `functions` er tidspunktet, hvor selve hændelsen skete.

Alle tidsstempler skal være i **UTC**.

### `inputType`

`inputType` fortæller, hvilken slags data I sender. De mest almindelige værdier er:

- `MachineState`
- `PartCounter`
- `AddPartInformation`
- `Telemetry`

### `functions`

Arrayet `functions` indeholder selve dataene. Én besked kan have en eller flere blokke med data.

### `deviceId`

`deviceId` er det unikke id, der kobler den fysiske enhed til maskinen i OptiPeople Data Platform.

Typiske værdier ser sådan ud:

- `OL01010`
- `OM01010`
- `MA01010`
- `SC01010`

### `name`

`name` fortæller præcis, hvilken slags data I sender inden for den valgte input-type.

Eksempler:

- maskinstatus bruger `state`
- emnetællere kan bruge værdier som `Parts`, `m2` eller `Kilos`

### `value`

Hvad `value` betyder, afhænger af input-typen.

For maskinstatus kan det være:

- `Runtime`
- `Downtime`
- en hvilken som helst stopårsag skrevet som tekst

## Eksempel: maskinstatus

```json
{
  "time": "2022-04-25T07:50:18.039Z",
  "inputType": "MachineState",
  "functions": [
    {
      "deviceId": "OL01010",
      "name": "state",
      "value": "Runtime",
      "time": "2022-04-25T07:50:18.039Z"
    }
  ]
}
```

## Eksempel: emnetællere

```json
{
  "time": "2022-04-25T07:50:18.039Z",
  "inputType": "PartCounter",
  "functions": [
    {
      "deviceId": "OL01010",
      "name": "Parts",
      "value": "420",
      "time": "2022-04-25T07:50:18.039Z"
    },
    {
      "deviceId": "OL01010",
      "name": "m2",
      "value": "420",
      "time": "2022-04-25T07:50:18.039Z"
    }
  ]
}
```

## Eksempel: oplysninger om emnet

```json
{
  "time": "2022-04-25T07:50:18.039Z",
  "inputType": "AddPartInformation",
  "functions": [
    {
      "deviceId": "OL01010",
      "name": "OrderX;ItemY;PartZ",
      "value": "null",
      "expectedSpeed": "100",
      "time": "2022-04-25T07:50:18.039Z"
    }
  ]
}
```

Brug feltet `name` til at sende oplysninger om ordre eller vare. `expectedSpeed` er det antal enheder, maskinen forventes at lave i timen.

## Eksempel: telemetri

```json
{
  "time": "2022-04-25T07:50:18.039Z",
  "inputType": "Telemetry",
  "functions": [
    {
      "deviceId": "OL01010",
      "name": "Temperature",
      "value": "41",
      "type": "1",
      "time": "2022-04-25T07:50:18.039Z"
    }
  ]
}
```

Telemetri kan bruges til mange slags værdier, for eksempel:

- temperatur
- luftfugtighed
- vibration
- QR- og stregkodedata

Feltet `type` kan være:

- `1` for heltal
- `2` for decimaltal
- `3` for tekst

## Eksempel: kasserede emner

```json
{
  "time": "2022-04-25T07:50:18.039Z",
  "inputType": "PartRejection",
  "functions": [
    {
      "deviceId": "OL01010",
      "name": "Parts",
      "value": "-1",
      "time": "2022-04-25T07:50:18.039Z"
    }
  ]
}
```

`PartRejection` virker som en tæller, men trækker fra i det antal emner, OptiPeople Data Platform har talt.
