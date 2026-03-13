---
title: "OptiCloud MQTT JSON Schema"
date: "2022-06-15"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog/opticloud-api-code.png"
---

This is a guide to the JSON schema used when sending data to OptiCloud over MQTT.

## Basic Message Structure

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

## Field Definitions

### `time`

The top-level `time` field is when the message was sent. The nested `time` field inside `functions` is when the event itself occurred.

All timestamps should be in **UTC**.

### `inputType`

`inputType` identifies the type of data being sent. Common values are:

- `MachineState`
- `PartCounter`
- `AddPartInformation`
- `Telemetry`

### `functions`

The `functions` array holds the actual payload. One message can contain one or several payload blocks.

### `deviceId`

`deviceId` is the unique ID connecting the physical device to the machine in OptiCloud.

Typical values look like:

- `OL01010`
- `OM01010`
- `MA01010`
- `SC01010`

### `name`

`name` identifies the exact type of data being sent within the input type.

Examples:

- machine state uses `state`
- part counters can use values such as `Parts`, `m2`, or `Kilos`

### `value`

The meaning of `value` depends on the input type.

For machine states, it can be:

- `Runtime`
- `Downtime`
- any stop reason text

## Message Example: Machine State

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

## Message Example: Part Counters

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

## Message Example: Add Part Information

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

Use the `name` field to send order or item details. `expectedSpeed` indicates how many units the machine is expected to produce per hour.

## Message Example: Telemetry

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

Telemetry can be used for many types of values, including:

- temperature
- humidity
- vibration
- QR/barcode data

The `type` field can be:

- `1` for integers
- `2` for decimals
- `3` for text

## Message Example: Part Rejection

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

`PartRejection` works like a counter but subtracts from counted output in OptiCloud.
