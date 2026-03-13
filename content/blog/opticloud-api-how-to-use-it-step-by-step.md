---
title: "OptiCloud API - How to Use It Step by Step"
date: "2022-05-11"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog/opticloud-api-code.png"
---

OptiCloud exposes APIs for data exchange, whether the data is simple uptime and downtime or more advanced information such as orders, vibration, temperature, ERP data, or SCADA-related context.

All APIs are REST-based and use JSON.

## How to Get Data and Test Connection

To get data from OptiCloud, the original guide lists four prerequisites:

1. Have an account set up in `portal.optipeople.dk`
2. Add a machine and a device
3. Send data to the device
4. Create an API access key through the portal

Once that is done, a connection can be tested directly in a browser by opening a REST endpoint over HTTPS on port `443`.

## Testing the Connection

The original article uses a demo account and a sample URL to verify access.

In practice, the pattern is:

```text
https://dataexport.optipeople.dk/api/DataExport/<Endpoint>?access_code=<ACCESS_KEY>
```

If the endpoint returns JSON, the connection is working.

## Adding Parameters

The API supports extra parameters such as:

- `machineId`
- `from`
- `to`

These can be added to limit the response to a machine or time period.

## Common APIs Mentioned in the Guide

### `GetEventExport`

Returns raw machine events such as runtime and downtime messages.

Useful when you want a lightweight event-level export.

### `GetDataExport`

This is described as the main export API for efficiency-related data.

It includes information related to:

- availability
- performance
- quality
- units
- shifts
- stop causes

The article notes that this API is often used with BI tools such as Power BI.

### Main Data Areas Mentioned

The article describes several important arrays or data tables:

- `shiftData`
- `counterData`
- `unitData`
- `wasteData`

These support reporting on shifts, counters, orders, and waste or stop events.

### `GetTPMAlertsExport`

The article also mentions TPM alert export as a separate API for predictive-maintenance or task-related alert data.

## Practical Takeaway

The overall API model is straightforward:

- use REST
- authenticate with an access code
- select the right endpoint
- add query parameters when needed
- consume JSON in your own reporting or integration layer

For most reporting and BI work, `GetDataExport` appears to be the main starting point.
