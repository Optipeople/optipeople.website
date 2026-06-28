import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact OptiPeople",
  description:
    "Talk to OptiPeople about production monitoring, OEE, industrial integrations, and digital operations improvements for your factory.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
