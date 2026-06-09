import type { Metadata } from "next";
import { addLocalePrefix, removeLocalePrefix, type Locale } from "@/lib/i18n";

export const siteName = "OptiPeople";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://optipeople-website.vercel.app";

const defaultOgImage = "/images/dashboard2.png";

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  locale?: Locale;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  keywords = [],
  type = "website",
  locale = "en",
}: MetadataOptions): Metadata {
  const unprefixedPath = removeLocalePrefix(path);
  const localizedPath = addLocalePrefix(unprefixedPath, locale);
  const canonical = absoluteUrl(localizedPath);
  const socialImage = absoluteUrl(image);
  const englishUrl = absoluteUrl(addLocalePrefix(unprefixedPath, "en"));
  const danishUrl = absoluteUrl(addLocalePrefix(unprefixedPath, "da"));

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: englishUrl,
        da: danishUrl,
        "x-default": englishUrl,
      },
    },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName,
      locale: locale === "da" ? "da_DK" : "en_US",
      alternateLocale: [locale === "da" ? "en_US" : "da_DK"],
      images: [
        {
          url: socialImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
