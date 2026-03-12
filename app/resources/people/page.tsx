import type { Metadata } from "next"
import { PeopleDirectory } from "./people-directory"

export const metadata: Metadata = {
  title: "People | OptiPeople",
  description:
    "Meet the team behind OptiPeople. Browse employees by role, team, and expertise.",
}

export default function PeoplePage() {
  return <PeopleDirectory />
}
