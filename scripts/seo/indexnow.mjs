// Tells Bing and the other IndexNow engines which URLs changed, so they
// recrawl now instead of in a few days. Bing feeds Copilot and ChatGPT search.
//
//   node scripts/seo/indexnow.mjs <url-or-path> [...]   ping these pages
//   node scripts/seo/indexnow.mjs --all                  ping every URL in the live sitemap
//   node scripts/seo/indexnow.mjs --dry-run ...          print what would be sent
//
// Paths like /blog/some-post are resolved against https://optipeople.com.
// Run it after the push has deployed (the key file must answer 200 on the
// live site, and the pages must show the new content).

const host = "optipeople.com";
const key = "945f35d790ef69050e3f359f068cf9f9";
const origin = `https://${host}`;

const args = process.argv.slice(2);
const all = args.includes("--all");
const dryRun = args.includes("--dry-run");
const given = args.filter((a) => !a.startsWith("--"));

let urls = given.map((a) => (a.startsWith("http") ? a : origin + (a.startsWith("/") ? a : "/" + a)));

if (all) {
  const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
  urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}

urls = [...new Set(urls)];
if (!urls.length) {
  console.error("No URLs. Pass urls or paths, or --all.");
  process.exit(1);
}
const foreign = urls.filter((u) => new URL(u).host !== host);
if (foreign.length) {
  console.error("Not on " + host + ": " + foreign.join(", "));
  process.exit(1);
}

if (dryRun) {
  console.log(`Would send ${urls.length} URL(s):\n${urls.join("\n")}`);
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${origin}/${key}.txt`, urlList: urls }),
});
// 200 and 202 both mean accepted. 403 means the key file is not live yet.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s)`);
if (!res.ok && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
