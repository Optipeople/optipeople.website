---
title: "OptiPeople Data Platform API: How to use it step by step"
date: "2026-10-26"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog and case/blog/opticloud-api-code.jpg"
---

The OptiPeople Data Platform has an external REST API for getting data out and putting data in. It covers simple uptime and downtime, OEE per shift, orders, stop causes, telemetry such as temperature and vibration, and the master data you keep in the platform.

All endpoints use HTTPS and JSON. There are 54 of them, and the full reference with every response schema is in the [External API Reference (PDF)](https://storageprodoptipeople.blob.core.windows.net/application-resources/v1/Optipeople_External_API.pdf). This guide walks you through getting started and shows which endpoint to reach for.

Want to ask your data questions in plain language instead of writing code? Read [how to connect Claude and other AI assistants with the OptiPeople MCP server](/blog/optipeople-mcp-server-connect-ai-assistants).

## Before you start

You need four things in place:

1. An account on `portal.optipeople.dk`
2. At least one machine with a device attached
3. Data flowing from the device
4. Your API access code

You find the access code in the portal under **Accounts > External API**. It is generated per account, so treat it like a password.

## Authenticate

Every call goes to the same base URL:

```text
https://dataexport.optipeople.dk/api
```

There are two ways to send the access code. The preferred one is an `Authorization` header with the `Opti` scheme:

```text
Authorization: Opti <ACCESS_CODE>
```

The other is the `access_code` query parameter, which is handy for a quick test in the browser:

```text
https://dataexport.optipeople.dk/api/Machine/GetAll?access_code=<ACCESS_CODE>
```

If that URL returns a JSON list of your machines, the connection works.

## Step by step: your first export

**1. Find your machines.** Call `GET /Machine/GetAll`. Note the `id` of each machine. Almost every other endpoint takes a `machineId`.

```bash
curl -H "Authorization: Opti <ACCESS_CODE>" \
  https://dataexport.optipeople.dk/api/Machine/GetAll
```

**2. Pull production data for a period.** Call `GET /DataExport/GetDataExport` with a machine and a date range:

```bash
curl -H "Authorization: Opti <ACCESS_CODE>" \
  "https://dataexport.optipeople.dk/api/DataExport/GetDataExport?machineId=<MACHINE_ID>&from=2026-10-01&to=2026-10-25"
```

**3. Use the JSON** in Power BI, Excel, your ERP or your own code.

## Parameters that work across endpoints

- `machineId`: the machine to report on. On `GetDataExport`, `GetEventExport` and `GetOEE` you can repeat it to get several machines in one call: `&machineId=<id1>&machineId=<id2>`.
- `factoryId`: limits an export to one factory.
- `from` and `to`: the period, as `yyyy-MM-dd`. Most exports default to today when you leave them out, and a single call can span at most one year.

Responses have the same envelope: `data` holds the result, `errors` lists anything that went wrong, and `meta` carries extra information.

## The main data exports

### `GetDataExport`: the one for reporting and BI

This is the endpoint most Power BI reports start from. One call returns a period's production data grouped into arrays:

- `shiftData`: one row per shift with duration, start and stop, planned and unplanned stop time
- `counterData`: produced and rejected units per counter
- `unitData`: orders (part order numbers) run in each shift, with speed
- `wasteData`: every stop with its reason, category and whether it was planned
- operator presence per shift and the machine settings, such as expected speed and targets

### `GetOEE`: ready-made KPIs

Returns OEE, availability, performance and quality per machine for a period, so you don't have to calculate them yourself. Add `includePerShiftData=true` to get the split per shift.

### `GetEventExport`: raw machine events

Every individual runtime and downtime event. Use it when you need the event log rather than the summary.

### `GetOrderReportExport`: production per order

Order-based production data with stop time allocated to each order.

### `GetLatestStop` and `GetHeartbeats`: what is happening now

`GetLatestStop` gives a machine's most recent stop. `GetHeartbeats` shows whether the machines are reporting in.

### Telemetry

- `GetTelemetryData` returns samples for one machine parameter (for example temperature) between two timestamps.
- `GetTelemetry` lets you query raw telemetry rows with OData: `$filter`, `$orderby`, `$top` (up to 10,000 rows), `$skip` and `$count`. Follow `@odata.nextLink` to page through large results.
- `GetHoursSpentBetweenTelemetryThresholds` tells you how many hours a parameter spent between two values, for example how long an oven ran between 180 and 200 degrees.

### `GetTPMAlertsExport`: maintenance alerts

Exports TPM alerts for one or more machines, for use in maintenance planning.

## Writing data back

The API is not read-only. You can also send data into the platform:

- **Orders:** `POST /Machine/SetMachinePartInformation` starts an order on a machine, and `POST /PartOrderNumber/ExternalSetPartOrder` sets the order on factory level. Typical use: your ERP or MES tells the platform which order is running.
- **Operators:** create, update and delete operators with the `/User` endpoints. `CreateOrUpdateOperators` matches on worker id, so you can sync straight from your HR or payroll system.
- **Waste:** `POST /Waste/RegisterAllPendingWaste` registers pending stops with one reason in one go.
- **Master data:** read, create, update, search and delete rows in your master data tables with the `/MasterData` endpoints. Useful for quality results, scans or lookup tables that other systems need.

## All endpoint groups

| Group | What it covers |
|---|---|
| Account | Account settings |
| API Usage | How many calls and how much data you have used, per account or per external application |
| Factory | Your factories |
| Device | Devices and their status |
| Machine | Machines, manual operator logs, waste configurations, starting orders |
| Machine Shift and Shift Identifier | Shift schedules and shift names |
| Data Export | Production, OEE, events, orders, stops, heartbeats, TPM alerts and telemetry |
| Report | Current order on a machine, part counter reports per day and per hour, order information with custom fields |
| Part Order Number | Orders per factory and exact units produced between two timestamps |
| Master Data | Your own data tables |
| Task Configuration and Task Instance | Tasks, active and completed task instances with their history |
| User | Operators |
| Waste | Registering pending stops |
| Incomac App | Energy optimisation settings, spot prices and machine notifications |

The [PDF reference](https://storageprodoptipeople.blob.core.windows.net/application-resources/v1/Optipeople_External_API.pdf) has the parameters and the full response schema for each one.

## Keep an eye on usage

`GET /APIUsage/GetUsageForAccount?startDate=2026-10-01` shows how many requests you have made and how much data they returned, split per endpoint. `GetUsageForExternalApplication` does the same for a single integration.

## The short version

- Get your access code under **Accounts > External API**
- Send it as `Authorization: Opti <code>`
- Start with `Machine/GetAll`, then `DataExport/GetDataExport` or `DataExport/GetOEE`
- Add `machineId`, `from` and `to` to narrow it down
- Use the PDF reference when you need a specific field

And if you would rather ask "what stopped the packing line most last week?" than build the query yourself, [connect an AI assistant through our MCP server](/blog/optipeople-mcp-server-connect-ai-assistants).
