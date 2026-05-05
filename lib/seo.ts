import type { Metadata } from "next";

export const siteName = "OptiPeople";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://optipeople-website.vercel.app";

const defaultOgImage = "/images/dashboard2.png";
const defaultLocale = "en_US";

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
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
}: MetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName,
      locale: defaultLocale,
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
