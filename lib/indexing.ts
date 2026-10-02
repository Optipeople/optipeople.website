// Which deploys search engines may index. Kept free of imports so
// next.config.ts can use it too.

// Vercel sets VERCEL_ENV on every deploy ("production", "preview",
// "development"). Local builds have none and count as production, so a local
// `next build` shows exactly what the live site will send.
export const isIndexableDeploy =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

// The production deploy is also reachable on its *.vercel.app alias, and
// every preview lives there. Only the real domain should be indexed.
export const vercelAppHostPattern = "(.+\.)?vercel\.app";

export function isIndexableHost(host: string | null | undefined) {
  if (!host) return true;
  const hostname = host.split(":")[0].toLowerCase();
  return !new RegExp(`^${vercelAppHostPattern}$`).test(hostname);
}

export const noindexHeader = { key: "X-Robots-Tag", value: "noindex, nofollow" };
