import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact OptiPeople",
  description:
    "Talk to OptiPeople about production monitoring, OEE, industrial integrations, and digital operations improvements for your factory.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact OptiPeople",
    description:
      "Talk to OptiPeople about production monitoring, OEE, industrial integrations, and digital operations improvements for your factory.",
    url: "/contact",
  },
  twitter: {
    title: "Contact OptiPeople",
    description:
      "Talk to OptiPeople about production monitoring, OEE, industrial integrations, and digital operations improvements for your factory.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
