// Reads the JSON that pull.mjs left in seo-data/ and writes seo-data/report.md:
// the standing questions for SEO and AEO work, answered the same way each time.
//
//   node scripts/seo/report.mjs              read seo-data/, write seo-data/report.md
//   node scripts/seo/report.mjs <dir>        read and write another folder instead
//
// The 404 check reads the redirects in next.config.ts and the routes under
// app/[locale], so run it from the repo root of the checkout you want checked.

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const dataDir = process.argv[2] || "seo-data";
const outFile = path.join(dataDir, "report.md");

const brand = /opti[\s-]?people|opti[\s-]?cloud/i;
const striking = { minPosition: 4, maxPosition: 15, minImpressions: 200 };
const zeroClickMinImpressions = 100;
const aiSources = /chatgpt|openai|perplexity|copilot|gemini|bard\.google|claude|anthropic|you\.com|phind|deepseek|mistral|grok|meta\.ai/i;
const topN = 30;

const load = (name) => {
  const file = path.join(dataDir, `${name}.json`);
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
};

const queries = load("gsc-queries") ?? [];
const queryPage = load("gsc-query-page") ?? [];
const pages = load("gsc-pages") ?? [];
const daily = load("gsc-monthly") ?? []; // one row per day despite the name
const pageDaily = load("gsc-page-date");
const sources = load("ga-sources") ?? [];
const landing = load("ga-landing-pages") ?? [];

const out = [];
const lastDay = daily.map((r) => r.date).sort().at(-1);
out.push("# SEO report", "");
out.push(`Generated ${new Date().toISOString().slice(0, 10)} from \`${dataDir}/\`. Search Console data runs to ${lastDay ?? "?"}.`, "");

monthly();
brandSplit();
strikingDistance();
zeroClick();
losingPages();
aiReferrals();
deadUrls();

writeFileSync(outFile, out.join("\n"));
console.log(`Wrote ${outFile}`);

function monthly() {
  out.push("## Monthly clicks and impressions", "");
  const byMonth = group(daily, (r) => r.date.slice(0, 7));
  const rows = [...byMonth].sort(([a], [b]) => a.localeCompare(b)).map(([month, days]) => {
    const t = totals(days);
    const partial = days.length < daysInMonth(month) ? " (partial)" : "";
    return [month + partial, fmt(t.clicks), fmt(t.impressions), pct(t.clicks / t.impressions), pos(t.position)];
  });
  table(["Month", "Clicks", "Impressions", "CTR", "Avg position"], rows);
}

function brandSplit() {
  out.push("## Brand vs non-brand", "");
  const [b, nb] = [queries.filter((r) => brand.test(r.query)), queries.filter((r) => !brand.test(r.query))];
  const site = totals(daily);
  const rows = [
    ["Brand", b.length, ...split(totals(b))],
    ["Non-brand", nb.length, ...split(totals(nb))],
    ["Anonymised (not in query data)", "", fmt(site.clicks - sum(queries, "clicks")), fmt(site.impressions - sum(queries, "impressions")), "", ""],
  ];
  table(["Segment", "Queries", "Clicks", "Impressions", "CTR", "Avg position"], rows);
  out.push(`Brand means the query matches \`${brand.source}\`. Whole date range.`, "");

  function split(t) {
    return [fmt(t.clicks), fmt(t.impressions), pct(t.clicks / t.impressions), pos(t.position)];
  }
}

function strikingDistance() {
  const { minPosition, maxPosition, minImpressions } = striking;
  out.push("## Striking distance", "");
  out.push(`Non-brand queries at average position ${minPosition} to ${maxPosition} with ${minImpressions}+ impressions. A small ranking gain here moves real clicks.`, "");
  const rows = queries
    .filter((r) => !brand.test(r.query) && r.position >= minPosition && r.position <= maxPosition && r.impressions >= minImpressions)
    .sort((a, b) => b.impressions - a.impressions)
    .map((r) => [r.query, fmt(r.impressions), fmt(r.clicks), pct(r.ctr), pos(r.position), topPage(r.query)]);
  table(["Query", "Impressions", "Clicks", "CTR", "Position", "Main page"], rows);
}

function zeroClick() {
  out.push("## High impressions, zero clicks", "");
  out.push(`Queries with ${zeroClickMinImpressions}+ impressions and no clicks: the snippet, the intent match or the ranking is off.`, "");
  const rows = queries
    .filter((r) => r.clicks === 0 && r.impressions >= zeroClickMinImpressions)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, topN)
    .map((r) => [r.query, fmt(r.impressions), pos(r.position), topPage(r.query)]);
  table(["Query", "Impressions", "Position", "Main page"], rows);
}

function losingPages() {
  out.push("## Pages losing impressions month over month", "");
  if (!pageDaily) {
    out.push("Needs `gsc-page-date.json`. Run `node scripts/seo/pull.mjs --pull` again to get it.", "");
    return;
  }
  // Compare the last two complete months, so a partial month never reads as a drop.
  const months = [...new Set(pageDaily.map((r) => r.date.slice(0, 7)))].sort();
  const lastPageDay = pageDaily.map((r) => r.date).sort().at(-1);
  const complete = months.filter((m) => lastPageDay >= `${m}-${String(daysInMonth(m)).padStart(2, "0")}`);
  if (complete.length < 2) {
    out.push("Fewer than two complete months of page data.", "");
    return;
  }
  const [prev, cur] = complete.slice(-2);
  const byPage = group(pageDaily.filter((r) => r.date.startsWith(prev) || r.date.startsWith(cur)), (r) => r.page);
  const rows = [...byPage]
    .map(([page, rs]) => {
      const a = sum(rs.filter((r) => r.date.startsWith(prev)), "impressions");
      const b = sum(rs.filter((r) => r.date.startsWith(cur)), "impressions");
      return { page, a, b, delta: b - a };
    })
    .filter((r) => r.delta < 0 && r.a >= 100)
    .sort((x, y) => x.delta - y.delta)
    .slice(0, topN)
    .map((r) => [urlPath(r.page), fmt(r.a), fmt(r.b), fmt(r.delta), pct(r.delta / r.a)]);
  out.push(`${prev} vs ${cur}, pages with 100+ impressions in ${prev}.`, "");
  table(["Page", prev, cur, "Change", "Change %"], rows);
}

function aiReferrals() {
  out.push("## AI assistant referrals", "");
  const ai = sources.filter((r) => aiSources.test(r.sessionSource));
  const bySource = [...group(ai, (r) => r.sessionSource)]
    .map(([source, rs]) => [source, sum(rs, "sessions"), sum(rs, "engagedSessions"), sum(rs, "keyEvents")])
    .sort((a, b) => b[1] - a[1]);
  table(["Source", "Sessions", "Engaged", "Key events"], bySource);
  const byLanding = [...group(ai, (r) => `${r.landingPage}\u0000${r.sessionSource}`)]
    .map(([key, rs]) => [...key.split("\u0000"), sum(rs, "sessions"), sum(rs, "engagedSessions")])
    .sort((a, b) => b[2] - a[2]);
  out.push("By landing page:", "");
  table(["Landing page", "Source", "Sessions", "Engaged"], byLanding);
}

function deadUrls() {
  out.push("## Old URLs with traffic that would 404", "");
  out.push("Paths from Search Console pages and GA4 landing pages, checked against the redirects in `next.config.ts` and `lib/legacy-redirects.ts`, the routes under `app/[locale]` and the files in `public/`.", "");
  const site = siteRoutes();
  const seen = new Map();
  const add = (raw, field, value) => {
    const p = normalise(raw);
    if (!p) return;
    const row = seen.get(p) ?? { path: p, clicks: 0, impressions: 0, sessions: 0 };
    row[field] += value;
    seen.set(p, row);
  };
  for (const r of pages) {
    add(urlPath(r.page), "clicks", r.clicks);
    add(urlPath(r.page), "impressions", r.impressions);
  }
  for (const r of landing) add(r.landingPage, "sessions", r.sessions);

  const dead = [...seen.values()]
    .filter((r) => !site.resolves(r.path))
    .sort((a, b) => b.clicks - a.clicks || b.sessions - a.sessions || b.impressions - a.impressions);
  out.push(`${dead.length} of ${seen.size} paths would 404. Suggested targets are blog posts whose slug matches the last segment.`, "");
  table(
    ["Path", "Clicks", "Impressions", "Sessions", "Suggested target"],
    dead.map((r) => [r.path, fmt(r.clicks), fmt(r.impressions), fmt(r.sessions), site.suggest(r.path) ?? ""]),
  );
}

// Route map of the new site. Static segments come from the folder names under
// app/[locale]; each [slug] folder lists its slugs from the source named here.
function siteRoutes() {
  const slugSources = {
    ai: () => slugsIn("lib/ai-stack.ts"),
    blog: blogSlugs,
    features: () => slugsIn("content/pages/features.ts"),
    modules: () => slugsIn("content/pages/modules.ts"),
    services: () => slugsIn("content/pages/services.ts"),
    solutions: () => slugsIn("content/pages/solutions.ts"),
  };
  const routes = [];
  walk("app/[locale]", []);
  const blog = new Set(blogSlugs());
  // Paths are compared without a trailing slash, so the slash-stripping
  // catch-all in next.config.ts (a source ending in "/") never applies.
  const redirects = redirectSources().filter((s) => !s.endsWith("/")).map(sourcePattern);

  return {
    resolves(p) {
      if (p.startsWith("/api/") || p === "/admin" || p.startsWith("/admin/")) return true;
      if (redirects.some((re) => re.test(p))) return true;
      if (existsSync(path.join("public", decodeURIComponent(p))) && statSync(path.join("public", decodeURIComponent(p))).isFile()) return true;
      const parts = p.split("/").filter(Boolean);
      if (parts[0] === "da" || parts[0] === "en") parts.shift();
      return routes.some((r) => r.length === parts.length && r.every((seg, i) => (seg instanceof Set ? seg.has(parts[i]) : seg === parts[i])));
    },
    suggest(p) {
      const last = p.split("/").filter(Boolean).at(-1);
      return last && blog.has(last) ? `/blog/${last}` : undefined;
    },
  };

  function walk(dir, segments) {
    if (existsSync(path.join(dir, "page.tsx"))) routes.push(segments);
    for (const name of readdirSync(dir)) {
      if (!statSync(path.join(dir, name)).isDirectory()) continue;
      if (name.startsWith("[")) {
        const source = slugSources[segments.at(-1)];
        if (!source) throw new Error(`No slug source for ${dir}/${name}; add one to slugSources in report.mjs`);
        walk(path.join(dir, name), [...segments, new Set(source())]);
      } else if (!name.startsWith("(") && !name.startsWith("_")) {
        walk(path.join(dir, name), [...segments, name]);
      }
    }
  }
}

// Sources from next.config.ts ({ source: "..." }) and, when it exists, the
// WordPress redirect map in lib/legacy-redirects.ts (["/old", "/new"] pairs).
function redirectSources() {
  // Only the redirects() block: headers() also has sources ("/:path*"),
  // which would make every path look covered.
  const config = readFileSync("next.config.ts", "utf8");
  const redirectsBlock = config.slice(Math.max(0, config.indexOf("async redirects()")));
  const sources = [...redirectsBlock.matchAll(/source:\s*"([^"]+)"/g)].map((m) => m[1]);
  const legacy = "lib/legacy-redirects.ts";
  if (existsSync(legacy)) {
    const text = readFileSync(legacy, "utf8");
    sources.push(...[...text.matchAll(/\[\s*"(\/[^"]*)",\s*"/g)].map((m) => m[1]));
    sources.push(...[...text.matchAll(/source:\s*"([^"]+)"/g)].map((m) => m[1]));
  }
  return sources;
}

// Enough of Next's path-to-regexp syntax for redirect sources:
// :name, :name(regex), :name* and :name+.
function sourcePattern(source) {
  let re = "";
  for (const m of source.matchAll(/:(\w+)(\([^)]*\))?([*+?])?|[^:]+/g)) {
    if (!m[1]) re += m[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    else if (m[3] === "*") re = re.replace(/\\?\/$/, "") + "(?:/.*)?";
    else if (m[3] === "+") re += ".+";
    else re += m[2]?.replace(/\\\\/g, "\\") ?? "[^/]+"; // "\\d" in TS source is \d
  }
  return new RegExp(`^${re}/?$`);
}

function slugsIn(file) {
  return [...readFileSync(file, "utf8").matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
}

function blogSlugs() {
  return readdirSync("content/blog")
    .filter((f) => f.endsWith(".md") && !/\.[a-z]{2}\.md$/.test(f))
    .filter((f) => !/^draft:\s*true\s*$/m.test(readFileSync(path.join("content/blog", f), "utf8").split(/^---\s*$/m)[1] ?? ""))
    .map((f) => f.replace(/\.md$/, ""));
}

function normalise(raw) {
  if (!raw || raw === "(not set)") return null;
  let p = raw.split(/[?#]/)[0];
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p;
}

function topPage(query) {
  const best = queryPage.filter((r) => r.query === query).sort((a, b) => b.impressions - a.impressions)[0];
  return best ? urlPath(best.page) : "";
}

function urlPath(url) {
  try {
    return decodeURI(new URL(url).pathname);
  } catch {
    return url;
  }
}

// Position is impression-weighted, the way Search Console averages it.
function totals(rows) {
  const clicks = sum(rows, "clicks");
  const impressions = sum(rows, "impressions");
  const weighted = rows.reduce((s, r) => s + r.position * r.impressions, 0);
  return { clicks, impressions, position: impressions ? weighted / impressions : 0 };
}

function group(rows, key) {
  const m = new Map();
  for (const r of rows) {
    const k = key(r);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(r);
  }
  return m;
}

function sum(rows, field) {
  return rows.reduce((s, r) => s + (r[field] ?? 0), 0);
}

function daysInMonth(month) {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

function table(head, rows) {
  if (!rows.length) {
    out.push("None.", "");
    return;
  }
  const cell = (v) => String(v).replace(/\|/g, "\\|");
  out.push(`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`);
  for (const r of rows) out.push(`| ${r.map(cell).join(" | ")} |`);
  out.push("");
}

function fmt(n) {
  return Math.round(n).toLocaleString("en-US");
}

function pct(x) {
  return Number.isFinite(x) ? `${(x * 100).toFixed(1)}%` : "";
}

function pos(x) {
  return x ? x.toFixed(1) : "";
}
