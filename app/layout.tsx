// Root layout is a passthrough. The real <html>/<body>, fonts, providers, and
// chrome live in app/[locale]/layout.tsx so every page is locale-scoped.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
