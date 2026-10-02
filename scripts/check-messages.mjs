// Checks the next-intl message files without rendering anything:
//  1. messages/en.json and messages/da.json have exactly the same keys.
//  2. Every t("key") in app/, components/ and lib/ exists, read against the
//     namespace of the nearest useTranslations()/getTranslations() above it.
// next-intl only logs a missing key at runtime, so without this a page ships
// with a raw key path in place of copy. Exits 1 on any problem.
import { readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const locales = ["en", "da"]
const sourceDirs = ["app", "components", "lib"]

const problems = []

function flatten(value, prefix, out) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    out.add(prefix)
    for (const [key, child] of Object.entries(value)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, out)
    }
  } else {
    out.add(prefix)
  }
  return out
}

const keys = Object.fromEntries(
  locales.map((locale) => {
    const file = join(root, "messages", `${locale}.json`)
    return [locale, flatten(JSON.parse(readFileSync(file, "utf8")), "", new Set())]
  }),
)

for (const locale of locales) {
  for (const other of locales) {
    if (other === locale) continue
    for (const key of keys[locale]) {
      if (key && !keys[other].has(key)) {
        problems.push(`messages/${other}.json is missing "${key}" (present in ${locale}.json)`)
      }
    }
  }
}

function* sourceFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* sourceFiles(path)
    else if (/\.(ts|tsx)$/.test(entry.name)) yield path
  }
}

const namespaceCall = /\b(?:useTranslations|getTranslations)\(\s*(?:["']([^"']*)["'])?\s*\)/g
const translateCall = /(?<![\w.$])t(?:\.(?:rich|markup|raw))?\(\s*(["'`])([^"'`$]*)(\$\{)?/g

for (const dir of sourceDirs) {
  for (const file of sourceFiles(join(root, dir))) {
    const lines = readFileSync(file, "utf8").split(/\r?\n/)
    let namespace = null
    lines.forEach((line, index) => {
      for (const match of line.matchAll(namespaceCall)) namespace = match[1] ?? ""
      if (namespace === null) return
      for (const match of line.matchAll(translateCall)) {
        const [, , literal, dynamic] = match
        // A template like `languages.${language}` can only be checked up to
        // the last whole segment before the interpolation.
        const key = dynamic ? literal.replace(/\.?[^.]*$/, "") : literal
        const full = [namespace, key].filter(Boolean).join(".")
        if (!keys.en.has(full)) {
          const where = `${relative(root, file).replace(/\\/g, "/")}:${index + 1}`
          problems.push(`${where} uses "${full}", which is not in messages/en.json`)
        }
      }
    })
  }
}

if (problems.length) {
  console.error(`Message check failed (${problems.length}):`)
  for (const problem of problems) console.error(`  ${problem}`)
  process.exit(1)
}
console.log("Message check passed: en and da match, and every t() key exists.")
