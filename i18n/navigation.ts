import { createNavigation } from "next-intl/navigation"
import { routing } from "./routing"

// Locale-aware navigation helpers. <Link href="/modules/production"> renders
// /modules/production under en and /da/modules/production under da automatically.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
