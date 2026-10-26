---
title: "OptiPeople Data Platform MQTT JSON schema"
description: "How a PLC or gateway sends data to the OptiPeople Data Platform over MQTT: connection settings, the JSON message format, and an example for machine state, part counters, telemetry and orders."
date: "2022-06-15"
updated: "2026-10-26"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog and case/blog/opticloud-api-code.jpg"
---

This is a guide for PLC programmers and integrators who want to send machine data straight to the OptiPeople Data Platform over MQTT. It covers how to connect, how a message is built, and what to send for each type of data.

The platform receives device data through Azure IoT Hub. Your PLC or gateway acts as one device on that hub and publishes JSON messages to it.

## What you need from us

- **IoT Hub hostname**, in the form `<hub>.azure-devices.net`
- **Device ID**, for example `OM01001`
- **Device primary key**, used to generate the password

The device must also be linked to a machine in the portal before its data shows up.

## Connection settings

| Setting | Value |
|---|---|
| Broker host | `<hub>.azure-devices.net` |
| Port | `8883` (MQTT 3.1.1 over TLS) |
| Client ID | `<deviceId>` |
| Username | `<hub>.azure-devices.net/<deviceId>/?api-version=2021-04-12` |
| Password | A SAS token generated from the device key |
| Publish topic | `devices/<deviceId>/messages/events/$.ct=application%2Fjson&$.ce=utf-8` |
| QoS | 1 |

The server certificate chains to the Azure IoT Hub root certificates, so the PLC must trust those.

The password is a shared access signature (SAS) token, not the device key itself. It looks like this:

```text
SharedAccessSignature sr=<hub>.azure-devices.net%2Fdevices%2F<deviceId>&sig=<signature>&se=<expiry>
```

The signature is an HMAC-SHA256 of the URL-encoded resource URI and the expiry time, signed with the base64-decoded device key. The token stops working at the expiry time, so pick a validity that matches how often anyone will touch the PLC. For a PLC that is set up once and left alone, a long validity (years) is common.

We have a small Windows tool, the **Opti MQTT Tester**, that generates every value in the table above, including the SAS token, and sends a test message so you can check the result in `portal.optipeople.dk` before the PLC is wired up. Ask us for it.

## Message structure

Every message has the same envelope:

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

- `time`: when the message was sent. The `time` inside each entry in `functions` is when that event happened. Both are UTC in ISO 8601 with milliseconds, ending in `Z`.
- `inputType`: the kind of data. The four you use are `MachineState`, `PartCounter`, `Telemetry` and `BatchSetting`.
- `functions`: one or more entries with the actual data. Several counters or telemetry values can go in one message as separate entries.
- `deviceId`: the device ID you got from us.
- `name`: what the value is, for example `state`, a counter name or a telemetry parameter.
- `value`: the value itself. It is **always a JSON string**, even when it is a number.

## Machine state

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

`name` is always `state`. `value` is one of `Runtime`, `Downtime`, `Stopped` or `Offline`. Most integrations only send `Runtime` and `Downtime`, and only when the state changes.

Instead of `Downtime`, you can also send a stop reason as text in `value`, so the stop arrives with its reason already set.

## Part counters

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

- `name` must match a counter set up for the device in the portal. Use the exact name you configured there.
- `value` is the number of units counted since the previous message, not a running total.
- A **negative value registers as rejects**. Send `"-1"` to report one rejected unit on that counter.

## Telemetry

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

Telemetry is for process values such as temperature, humidity or vibration, and for text values such as a product code.

- `name` must match a telemetry parameter set up for the device in the portal.
- `type` tells the platform how to read the value: `"1"` for integers, `"2"` for decimals, `"3"` for text.

## Starting an order or batch

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

`BatchSetting` tells the platform that a new order, batch or unit has started on the machine. The keys are kept short to save space in the PLC.

- `name`: the order or batch name. It must not be empty.
- `value`: always `startBatch`.
- `e`: optional. The expected speed in units per hour. Leave it out to keep the expected speed already set for that unit in the portal.
- `customFields`: optional. A list of `{"n": name, "v": value}` pairs with extra information about the order.

If your ERP or MES knows the order rather than the PLC, you can start orders through the REST API instead. See [how to use the OptiPeople Data Platform API](/blog/opticloud-api-how-to-use-it-step-by-step).

## Rules to keep in mind

- **Names must exist in the portal.** A counter or telemetry name that is not set up for the device is accepted by the hub but silently dropped. You get no error.
- **No more than one message every 5 seconds per device.** Devices that send faster are throttled or disabled. Put several values in one message rather than sending them one by one.
- **Values are strings.** `"10"`, not `10`.
- **Timestamps are UTC.** Not local PLC time.

## The short version

- Connect to `<hub>.azure-devices.net` on port 8883 with the device ID as client ID and a SAS token as password
- Publish JSON to `devices/<deviceId>/messages/events/$.ct=application%2Fjson&$.ce=utf-8`
- Use `MachineState` for runtime and downtime, `PartCounter` for produced and rejected units, `Telemetry` for process values and `BatchSetting` to start an order
- Match every name to what is set up in the portal, send values as strings, and keep to one message every 5 seconds
