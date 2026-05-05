import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description: "Internal OptiPeople design system component showcase.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComponentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
