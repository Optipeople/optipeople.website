import type { Metadata } from "next"
import { PeopleDirectory } from "./people-directory"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "People | OptiPeople",
  description:
    "Meet the team behind OptiPeople. Browse employees by role, team, and expertise.",
  path: "/resources/people",
})

export default function PeoplePage() {
  return <PeopleDirectory />
}
