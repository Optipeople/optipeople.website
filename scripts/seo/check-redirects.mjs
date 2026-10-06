// Checks that every old URL Search Console or GA4 still sees lands somewhere
// on the new site: a 200 directly, or one permanent redirect (301 or 308) to
// a page that answers 200. Anything else, a 404, a temporary redirect or a
// chain of two, is a failure.
//
//   npm run build && npm start               in one terminal
//   node scripts/seo/check-redirects.mjs     in another, from the repo root
//
//   node scripts/seo/check-redirects.mjs <dir>              read another data folder
//   BASE_URL=http://localhost:3001 node scripts/seo/check-redirects.mjs
//   VERCEL_BYPASS=<secret> BASE_URL=<preview url> node scripts/seo/check-redirects.mjs
//                                                         check a protected Vercel preview
//   node scripts/seo/check-redirects.mjs --verbose          list every path, not only failures
//
// A path is checked when it has a Search Console click, 5 or more Search
// Console impressions, or any GA4 session (a session is a visit, so it counts
// like a click). Junk that no redirect should catch is skipped; see `junk`.
// Exits 1 when anything fails.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const dataDir = process.argv.slice(2).find((a) => !a.startsWith("--")) || "seo-data";
const base = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const minImpressions = 5;
const concurrency = 8;
const headers = process.env.VERCEL_BYPASS ? { "x-vercel-protection-bypass": process.env.VERCEL_BYPASS } : {};

// Paths that are not old pages: phone links resolved against the page URL,
// theme assets, a mangled absolute URL, scraped HTML, typos of the login
// portals and app-store deep links.
const junk = [
  /(^|\/)(tel|phone):/i,
  /^\/\//,
  /^\/wp-content\//,
  /^\/https?:/,
  /[<>]|&gt;|&lt;/,
  /^\/dGVybXMtYW$/,
  /^\/ogin$/,
  /^\/operatorpanel\/login\.dk$/,
  /^\/idgsrl-(android|ios)$/,
];

const load = (name) => {
  const file = path.join(dataDir, `${name}.json`);
  if (!existsSync(file)) throw new Error(`Missing ${file}. Run scripts/seo/pull.mjs --pull first.`);
  return JSON.parse(readFileSync(file, "utf8"));
};

const paths = new Map();
const add = (p, field, value) => {
  const row = paths.get(p) ?? { path: p, clicks: 0, impressions: 0, sessions: 0 };
  row[field] += value;
  paths.set(p, row);
};
for (const r of load("gsc-pages")) {
  // Keep the path exactly as Google has it, trailing slash included, since
  // that is the URL it will recrawl.
  const url = new URL(r.page);
  if (!/(^|\.)optipeople\.com$/.test(url.hostname)) continue;
  const p = decodeURIComponent(url.pathname);
  add(p, "clicks", r.clicks);
  add(p, "impressions", r.impressions);
}
for (const r of load("ga-landing-pages")) {
  if (!r.landingPage?.startsWith("/")) continue; // "(not set)"
  add(r.landingPage, "sessions", r.sessions);
}

const wanted = [...paths.values()].filter(
  (r) => (r.clicks > 0 || r.impressions >= minImpressions || r.sessions > 0) && !junk.some((re) => re.test(r.path)),
);
const skipped = [...paths.values()].filter((r) => junk.some((re) => re.test(r.path))).length;

try {
  await fetch(base, { redirect: "manual", headers });
} catch {
  console.error(`Nothing answers at ${base}. Start the site first: npm run build && npm start`);
  process.exit(2);
}

const results = [];
let next = 0;
await Promise.all(
  Array.from({ length: concurrency }, async () => {
    while (next < wanted.length) {
      const row = wanted[next++];
      results.push({ ...row, ...(await check(row.path)) });
    }
  }),
);

async function check(p) {
  const first = await request(p);
  if (first.status === 200) return { ok: true, outcome: "200" };
  // next-intl drops the default /en prefix with a temporary redirect, and it
  // has to stay temporary: the language switcher links to /en/... so the
  // middleware can set the locale cookie, which a cached 308 would skip.
  if (first.status === 307 && /^\/en(\/|$)/.test(p)) {
    const target = new URL(first.location, base).pathname;
    if (target === (p.replace(/^\/en/, "") || "/")) {
      const second = await request(target);
      return { ok: second.status === 200, outcome: `307 -> ${target} (${second.status}, next-intl locale prefix)` };
    }
  }
  if (first.status !== 301 && first.status !== 308) {
    const to = first.location ? ` -> ${first.location}` : "";
    return { ok: false, outcome: `${first.status}${to}` };
  }
  const target = new URL(first.location, base);
  if (target.origin !== new URL(base).origin) {
    return { ok: true, outcome: `${first.status} -> ${first.location} (off-site, not followed)` };
  }
  const second = await request(target.pathname + target.search);
  const outcome = `${first.status} -> ${target.pathname} (${second.status}${second.location ? ` -> ${second.location}` : ""})`;
  return { ok: second.status === 200, outcome };
}

async function request(p) {
  const res = await fetch(base + encodeURI(p), { redirect: "manual", headers });
  await res.arrayBuffer();
  return { status: res.status, location: res.headers.get("location") };
}

const failed = results.filter((r) => !r.ok).sort((a, b) => b.clicks + b.sessions - (a.clicks + a.sessions));
const direct = results.filter((r) => r.ok && r.outcome === "200").length;
console.log(`Checked ${results.length} paths against ${base} (${skipped} junk paths skipped).`);
console.log(`${direct} answer 200, ${results.length - direct - failed.length} take one permanent redirect, ${failed.length} fail.`);
if (process.argv.includes("--verbose")) {
  for (const r of results.sort((a, b) => a.path.localeCompare(b.path))) console.log(`  ${r.ok ? "ok  " : "FAIL"} ${r.path}  ${r.outcome}`);
}
if (failed.length) {
  console.log("\nFailures (clicks / impressions / sessions):");
  for (const r of failed) console.log(`  ${r.path}  ${r.outcome}  [${r.clicks} / ${r.impressions} / ${r.sessions}]`);
  process.exit(1);
}
