# Translating blog posts and cases

Blog posts and case studies live in `content/blog/` as markdown. English is the
canonical set, and each translation sits beside its source:

```
content/blog/
  dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud.md      # en (canonical)
  dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud.da.md   # da
```

Both files are the same story under one slug, so the URL is
`/blog/<slug>` in English and `/da/blog/<slug>` in Danish. Links, sitemap
entries, and `hreflang` alternates stay in sync automatically, and the two
language versions of a case are always one click apart in the language switcher.

## Adding a translation

Create `<slug>.<locale>.md` and put only the fields you are actually
translating in the frontmatter. Everything else is inherited from the English
file, so an image or logo swapped later only has to change in one place.

```yaml
---
title: "DANSK TRÆEMBALLAGE løfter OEE med 5% på 3 måneder med Opticloud"
metricLabel: "OEE på tre måneder"
outcome: "Én produktionslinje, live oppetid på gulvet, og et OEE-løft på 5%."
---
```

Translatable frontmatter: `title`, `author`, `image`, `customer`, `metric`,
`metricLabel`, `quote`, `outcome`.

`date` and `category` are deliberately **not** translatable. `lib/blog-data.ts`
always reads them from the English source, so ordering and the `Cases` vs
`Insights` split can never drift because a translated file spelled a category
differently. Setting them in a translation has no effect.

## Fallback behaviour

A locale with no file of its own falls back to English rather than 404'ing, and
the article body is then marked `lang="en"` so browsers, screen readers, and
translation tools see the real language of the text. All 15 cases are
translated to Danish; most `Insights` articles are not yet.

## Adding a new post

Add the English file first. Only `.md` files without a locale suffix define
which slugs exist (`getAllSlugs()`), so a translation on its own is invisible
to the router.
