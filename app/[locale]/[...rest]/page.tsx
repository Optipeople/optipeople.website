import { notFound } from "next/navigation"

// Any path no route claims lands here, so the 404 renders inside the locale
// layout (header, footer, translated copy) instead of the bare global page.
export default function CatchAll() {
  notFound()
}
