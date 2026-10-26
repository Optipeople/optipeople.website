---
title: "Sådan sender I data til OptiPeople Data Platform over MQTT: JSON-skemaet"
description: "Sådan sender en PLC eller gateway data til OptiPeople Data Platform over MQTT: forbindelsen, JSON-formatet og eksempler på maskinstatus, emnetællere, telemetri og ordrer."
---

Den her vejledning er til jer, der programmerer PLC'en eller laver integrationen og vil sende maskindata direkte til OptiPeople Data Platform over MQTT. Den viser, hvordan I kobler på, hvordan en besked er bygget op, og hvad I sender for hver slags data.

Platformen tager imod data fra enheder gennem Azure IoT Hub. Jeres PLC eller gateway er én enhed på hubben og sender JSON-beskeder til den.

## Det får I fra os

- **IoT Hub-værtsnavn** på formen `<hub>.azure-devices.net`
- **Enheds-id**, for eksempel `OM01001`
- **Enhedens primære nøgle**, som I laver adgangskoden ud fra

Enheden skal også være koblet til en maskine i portalen, før dataene dukker op.

## Forbindelsen

| Indstilling | Værdi |
|---|---|
| Broker host | `<hub>.azure-devices.net` |
| Port | `8883` (MQTT 3.1.1 over TLS) |
| Client ID | `<deviceId>` |
| Username | `<hub>.azure-devices.net/<deviceId>/?api-version=2021-04-12` |
| Password | Et SAS-token lavet ud fra enhedens nøgle |
| Publish topic | `devices/<deviceId>/messages/events/$.ct=application%2Fjson&$.ce=utf-8` |
| QoS | 1 |

Serverens certifikat er udstedt under Azure IoT Hubs rodcertifikater, så PLC'en skal stole på dem.

Adgangskoden er et SAS-token (shared access signature), ikke selve nøglen. Det ser sådan ud:

```text
SharedAccessSignature sr=<hub>.azure-devices.net%2Fdevices%2F<deviceId>&sig=<signatur>&se=<udløb>
```

Signaturen er en HMAC-SHA256 af den URL-kodede ressource-URI og udløbstidspunktet, signeret med enhedens nøgle efter base64-afkodning. Tokenet holder op med at virke, når det udløber. Vælg derfor en levetid, der passer til, hvor tit nogen rører PLC'en. Til en PLC, der bliver sat op én gang og så får lov at passe sig selv, er en lang levetid (flere år) almindelig.

Vi har et lille Windows-værktøj, **Opti MQTT Tester**, der laver alle værdierne i tabellen, også SAS-tokenet. Det sender også en testbesked, så I kan se resultatet i `portal.optipeople.dk`, før PLC'en er koblet op. Spørg os, så får I det.

## Sådan er en besked bygget op

Alle beskeder har samme ramme:

```json
{
  "time": "2026-09-28T10:00:00.000Z",
  "inputType": "MachineState",
  "functions": [
    {
      "deviceId": "OM01001",
      "name": "state",
      "value": "Runtime",
      "time": "2026-09-28T10:00:00.000Z"
    }
  ]
}
```

- `time`: hvornår beskeden blev sendt. `time` inde i hver linje i `functions` er, hvornår hændelsen skete. Begge er UTC i ISO 8601 med millisekunder og slutter på `Z`.
- `inputType`: hvilken slags data det er. De fire, I bruger, er `MachineState`, `PartCounter`, `Telemetry` og `BatchSetting`.
- `functions`: en eller flere linjer med selve dataene. Flere tællere eller telemetriværdier kan stå i samme besked som hver sin linje.
- `deviceId`: det enheds-id, I har fået fra os.
- `name`: hvad værdien er, for eksempel `state`, navnet på en tæller eller en telemetriparameter.
- `value`: selve værdien. Den er **altid en JSON-streng**, også når det er et tal.

## Maskinstatus

```json
{
  "time": "2026-09-28T10:00:00.000Z",
  "inputType": "MachineState",
  "functions": [
    {
      "deviceId": "OM01001",
      "name": "state",
      "value": "Runtime",
      "time": "2026-09-28T10:00:00.000Z"
    }
  ]
}
```

`name` er altid `state`. `value` er `Runtime`, `Downtime`, `Stopped` eller `Offline`. De fleste integrationer sender kun `Runtime` og `Downtime`, og kun når status skifter.

I stedet for `Downtime` kan I også sende en stopårsag som tekst i `value`. Så kommer stoppet ind med årsagen sat på i forvejen.

## Emnetællere

```json
{
  "time": "2026-09-28T10:00:00.000Z",
  "inputType": "PartCounter",
  "functions": [
    {
      "deviceId": "OM01001",
      "name": "counter",
      "value": "10",
      "time": "2026-09-28T10:00:00.000Z"
    }
  ]
}
```

- `name` skal passe med en tæller, der er sat op på enheden i portalen. Brug præcis det navn, I har givet den der.
- `value` er det antal emner, der er talt siden sidste besked. Ikke en løbende total.
- **En negativ værdi tæller som kassation.** Send `"-1"` for at melde ét kasseret emne på den tæller.

## Telemetri

```json
{
  "time": "2026-09-28T10:00:00.000Z",
  "inputType": "Telemetry",
  "functions": [
    {
      "deviceId": "OM01001",
      "name": "vibration",
      "value": "1.23",
      "type": "2",
      "time": "2026-09-28T10:00:00.000Z"
    }
  ]
}
```

Telemetri er til procesværdier som temperatur, luftfugtighed og vibration, og til tekst som for eksempel en varekode.

- `name` skal passe med en telemetriparameter, der er sat op på enheden i portalen.
- `type` fortæller platformen, hvordan værdien skal læses: `"1"` for heltal, `"2"` for decimaltal, `"3"` for tekst.

## Start en ordre eller et batch

```json
{
  "time": "2026-09-28T10:00:00.000Z",
  "inputType": "BatchSetting",
  "functions": [
    {
      "deviceId": "OM01001",
      "name": "9025410002",
      "value": "startBatch",
      "e": "100",
      "time": "2026-09-28T10:00:00.000Z",
      "customFields": [
        { "n": "OrderNo", "v": "9649952" }
      ]
    }
  ]
}
```

Med `BatchSetting` fortæller I platformen, at en ny ordre eller et nyt batch er gået i gang på maskinen. Nøglerne er korte, så de fylder mindre i PLC'en.

- `name`: navnet på ordren eller batchet. Det må ikke være tomt.
- `value`: altid `startBatch`.
- `e`: valgfri. Den forventede hastighed i stk. i timen. Udelad den, så beholder I den hastighed, der allerede står i portalen.
- `customFields`: valgfri. En liste af `{"n": navn, "v": værdi}` med ekstra oplysninger om ordren.

Er det jeres ERP eller MES, der kender ordren, og ikke PLC'en, kan I starte ordrer gennem REST-API'et i stedet. Se [hvordan I bruger API'et i OptiPeople Data Platform](/da/blog/opticloud-api-how-to-use-it-step-by-step).

## Det skal I huske

- **Navnene skal findes i portalen.** Et tæller- eller telemetrinavn, der ikke er sat op på enheden, bliver taget imod af hubben, men så smidt væk. I får ingen fejl.
- **Højst én besked hvert 5. sekund pr. enhed.** Enheder, der sender hurtigere, bliver bremset eller slået fra. Saml hellere flere værdier i én besked end at sende dem hver for sig.
- **Værdier er tekst.** `"10"`, ikke `10`.
- **Tidsstempler er UTC.** Ikke PLC'ens lokale tid.

## Kort fortalt

- Kobl på `<hub>.azure-devices.net` på port 8883 med enheds-id'et som client ID og et SAS-token som password
- Send JSON til `devices/<deviceId>/messages/events/$.ct=application%2Fjson&$.ce=utf-8`
- Brug `MachineState` til kørsel og stop, `PartCounter` til producerede og kasserede emner, `Telemetry` til procesværdier og `BatchSetting` til at starte en ordre
- Lad alle navne passe med opsætningen i portalen, send værdier som tekst, og hold jer til én besked hvert 5. sekund
