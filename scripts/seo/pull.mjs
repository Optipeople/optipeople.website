// Pulls Search Console and GA4 data into seo-data/ as JSON, so SEO and AEO
// work can be prioritised from real queries instead of guesses.
//
//   node scripts/seo/pull.mjs            list the sites and properties the key can see
//   node scripts/seo/pull.mjs --pull     pull everything (needs GSC_SITE and GA4_PROPERTY)
//
// Env:
//   SEO_GOOGLE_KEY  path to the service account JSON (default .secrets/seo-service-account.json)
//   GSC_SITE        e.g. sc-domain:optipeople.dk or https://www.optipeople.dk/
//   GA4_PROPERTY    numeric property id, e.g. 312345678
//   SEO_MONTHS      how far back to go (default 16, the Search Console maximum)
//
// No dependencies: the service account JWT is signed with node:crypto.

import { createSign } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const keyPath = process.env.SEO_GOOGLE_KEY || ".secrets/seo-service-account.json";
const outDir = "seo-data";
const months = Number(process.env.SEO_MONTHS || 16);
const scopes = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
];

const key = JSON.parse(await readFile(keyPath, "utf8"));
const token = await getAccessToken(key);

if (!process.argv.includes("--pull")) {
  await discover();
} else {
  await pull();
}

async function discover() {
  const sites = await api("GET", "https://www.googleapis.com/webmasters/v3/sites");
  console.log(`Service account: ${key.client_email}\n`);
  console.log("Search Console sites (use one as GSC_SITE):");
  for (const s of sites.siteEntry ?? []) console.log(`  ${s.siteUrl}  (${s.permissionLevel})`);
  if (!sites.siteEntry?.length) console.log("  none yet: add the service account as a user in Search Console");

  console.log("\nGA4 properties (use the number as GA4_PROPERTY):");
  try {
    const summaries = await api("GET", "https://analyticsadmin.googleapis.com/v1beta/accountSummaries");
    const props = (summaries.accountSummaries ?? []).flatMap((a) =>
      (a.propertySummaries ?? []).map((p) => `  ${p.property.split("/")[1]}  ${p.displayName}  (${a.displayName})`),
    );
    console.log(props.length ? props.join("\n") : "  none yet: add the service account as a Viewer in GA4");
  } catch (err) {
    console.log(`  could not list (${err.message.split("\n")[0]})`);
  }
}

async function pull() {
  const site = required("GSC_SITE");
  const property = required("GA4_PROPERTY");
  const end = daysAgo(2); // Search Console data lags about two days
  const start = new Date(end);
  start.setMonth(start.getMonth() - months);
  const range = { startDate: iso(start), endDate: iso(end) };
  const recent = { startDate: iso(daysAgo(92)), endDate: iso(end) };

  await mkdir(outDir, { recursive: true });

  const gsc = {
    "gsc-queries": { ...range, dimensions: ["query"] },
    "gsc-pages": { ...range, dimensions: ["page"] },
    "gsc-query-page": { ...range, dimensions: ["query", "page"] },
    "gsc-query-country": { ...recent, dimensions: ["query", "country"] },
    "gsc-page-device": { ...recent, dimensions: ["page", "device"] },
    "gsc-monthly": { ...range, dimensions: ["date"] },
  };
  for (const [name, body] of Object.entries(gsc)) {
    const rows = await gscQuery(site, body);
    await save(name, rows);
  }

  const dateRanges = [range];
  const ga = {
    "ga-landing-pages": {
      dateRanges,
      dimensions: [{ name: "landingPage" }, { name: "sessionDefaultChannelGroup" }],
      metrics: ["sessions", "engagedSessions", "keyEvents", "averageSessionDuration"].map((name) => ({ name })),
    },
    // Referrals from ChatGPT, Perplexity, Copilot, Gemini and friends: the AEO baseline.
    "ga-sources": {
      dateRanges,
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }, { name: "landingPage" }],
      metrics: ["sessions", "engagedSessions", "keyEvents"].map((name) => ({ name })),
    },
    "ga-key-events": {
      dateRanges,
      dimensions: [{ name: "eventName" }, { name: "pagePath" }],
      metrics: [{ name: "keyEvents" }],
    },
    "ga-countries": {
      dateRanges,
      dimensions: [{ name: "country" }, { name: "language" }],
      metrics: ["sessions", "keyEvents"].map((name) => ({ name })),
    },
  };
  for (const [name, body] of Object.entries(ga)) {
    const rows = await gaReport(property, body);
    await save(name, rows);
  }

  console.log(`\nDone: ${range.startDate} to ${range.endDate}, files in ${outDir}/`);
}

async function gscQuery(site, body) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const res = await api("POST", url, { ...body, rowLimit: 25000, startRow, dataState: "final" });
    const page = res.rows ?? [];
    for (const r of page) {
      const row = Object.fromEntries(body.dimensions.map((d, i) => [d, r.keys[i]]));
      rows.push({ ...row, clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position });
    }
    if (page.length < 25000) return rows;
  }
}

async function gaReport(property, body) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`;
  const rows = [];
  for (let offset = 0; ; offset += 100000) {
    const res = await api("POST", url, { ...body, limit: 100000, offset });
    for (const r of res.rows ?? []) {
      const row = {};
      body.dimensions.forEach((d, i) => (row[d.name] = r.dimensionValues[i].value));
      body.metrics.forEach((m, i) => (row[m.name] = Number(r.metricValues[i].value)));
      rows.push(row);
    }
    if (rows.length >= (res.rowCount ?? 0)) return rows;
  }
}

async function save(name, rows) {
  await writeFile(path.join(outDir, `${name}.json`), JSON.stringify(rows, null, 1));
  console.log(`${name}: ${rows.length} rows`);
}

async function getAccessToken({ client_email, private_key }) {
  const now = Math.floor(Date.now() / 1000);
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: client_email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function api(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: { authorization: `Bearer ${token}`, ...(body && { "content-type": "application/json" }) },
    body: body && JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${method} ${url} failed: ${res.status}\n${await res.text()}`);
  return res.json();
}

function required(name) {
  if (!process.env[name]) throw new Error(`Set ${name}; run without --pull to list the options`);
  return process.env[name];
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function iso(d) {
  return d.toISOString().slice(0, 10);
}
