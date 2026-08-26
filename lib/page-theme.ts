/**
 * Per-page colour identity for the templated landing pages.
 *
 * Every deep-dive page (feature, module, service, solution, AI capability)
 * gets its own surface pair so pages built from the same template read as a
 * family without looking like one page with the words swapped:
 *
 *   `tint`, a near-white wash used for hero backdrops and content panels.
 *            Dark ink stays readable on it.
 *   `deep`, the saturated brand surface used for full-bleed showcase and
 *            closing bands. Light ink only.
 *
 * The hues are the same brand family used by the homepage bento and the AI
 * slider (see CASE_IMAGE_ACCENTS in app/[locale]/page.tsx and the `theme`
 * field in lib/ai-stack.ts), pulled up to panel-scale lightness.
 *
 * Slugs are namespaced by family because they collide across families,
 * "production" is a module, "production-efficiency" is a feature.
 */
export type PageTheme = {
  tint: string
  deep: string
}

export type PageFamily = "features" | "modules" | "services" | "solutions" | "ai"

/** The eight brand surfaces every page draws from. */
const SURFACES = {
  green: { tint: "oklch(0.958 0.014 168)", deep: "#243b2f" },
  sage: { tint: "oklch(0.960 0.010 150)", deep: "#1f3329" },
  teal: { tint: "oklch(0.958 0.014 195)", deep: "#163b40" },
  blue: { tint: "oklch(0.958 0.014 240)", deep: "#1e2b3a" },
  purple: { tint: "oklch(0.958 0.013 285)", deep: "#272444" },
  sand: { tint: "oklch(0.960 0.016 85)", deep: "#332b1c" },
  clay: { tint: "oklch(0.960 0.014 40)", deep: "#3b2620" },
  slate: { tint: "oklch(0.957 0.008 265)", deep: "#1c1f26" },
} as const satisfies Record<string, PageTheme>

export type SurfaceName = keyof typeof SURFACES

/**
 * Surface per page. Related pages across families share a hue on purpose,
 * the Production module, the Production Efficiency feature, and the
 * Manufacturing solution all read green, so moving between them feels like
 * moving around one subject rather than between unrelated pages.
 */
const ASSIGNMENTS: Record<PageFamily, Record<string, SurfaceName>> = {
  features: {
    "production-efficiency": "green",
    "stop-cause-registration": "clay",
    "maintenance-and-tasks": "blue",
    "quality-management": "purple",
    "analysis-and-reporting": "sand",
    "energy-and-telemetry": "teal",
    "ai-and-copilots": "slate",
    "machine-control": "sage",
  },
  modules: {
    production: "green",
    quality: "purple",
    maintenance: "blue",
    energy: "teal",
    analysis: "sand",
    iot: "slate",
    "erp-shopfloor": "clay",
    mes: "sage",
  },
  services: {
    "smart-operations": "green",
    automation: "blue",
    "business-intelligence": "sand",
    "ai-solutions": "slate",
  },
  solutions: {
    manufacturing: "green",
    oems: "blue",
    service: "teal",
  },
  // Anchored to the card colours already shown on the homepage AI slider
  // (lib/ai-stack.ts `theme.bg`) so a card and its page share a hue.
  ai: {
    chat: "green",
    workflows: "blue",
    agents: "sand",
    integrations: "teal",
    api: "slate",
  },
}

export function getPageTheme(family: PageFamily, slug: string): PageTheme {
  const surface = ASSIGNMENTS[family]?.[slug]
  return SURFACES[surface ?? "green"]
}

/**
 * Surface lookup for the bespoke pages: /insights, /blog, /cases, /videos and
 * /contact. They are not built from a template, so they have no family/slug to
 * be assigned from, but they must draw from the same eight brand surfaces as
 * everything else or the site stops reading as one design.
 */
export function getSurface(name: SurfaceName): PageTheme {
  return SURFACES[name]
}

/**
 * Deterministic surface for the nth item in a list, used by the cases archive.
 * Each story gets its own colour so a grid of them reads as a set of distinct
 * stories rather than one card repeated.
 */
const ROTATION: SurfaceName[] = [
  "green",
  "blue",
  "sand",
  "purple",
  "teal",
  "clay",
  "sage",
  "slate",
]

export function rotateSurface(index: number): PageTheme {
  return SURFACES[ROTATION[index % ROTATION.length]]
}
