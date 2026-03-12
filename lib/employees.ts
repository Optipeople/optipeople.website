export type Employee = {
  slug: string
  name: string
  role: string
  team: string
  location: string
  expertise: string[]
  photo: string
  startYear: number
}

export const employees: Employee[] = [
  {
    slug: "morten-mathiasen",
    name: "Morten Mathiasen",
    role: "CEO & Founder",
    team: "Leadership",
    location: "Denmark",
    expertise: ["Strategy", "Industrial Operations", "Customer Partnerships"],
    photo: "/images/default-hero-bg.png",
    startYear: 2013,
  },
  {
    slug: "kasper-jensen",
    name: "Kasper Jensen",
    role: "CTO",
    team: "Engineering",
    location: "Denmark",
    expertise: ["Software Architecture", "MES Integration", "Platform Engineering"],
    photo: "/images/report-mockup4.png",
    startYear: 2016,
  },
  {
    slug: "line-sorensen",
    name: "Line Sorensen",
    role: "Head of Customer Success",
    team: "Customer Success",
    location: "Denmark",
    expertise: ["Onboarding", "Adoption", "Operational Rollout"],
    photo: "/images/dashboard1.png",
    startYear: 2018,
  },
  {
    slug: "anders-holm",
    name: "Anders Holm",
    role: "Lead Developer",
    team: "Engineering",
    location: "Denmark",
    expertise: ["Frontend", "Data Visualization", "Performance"],
    photo: "/images/report-mockup1.png",
    startYear: 2019,
  },
  {
    slug: "sara-nielsen",
    name: "Sara Nielsen",
    role: "Product Manager",
    team: "Product",
    location: "Denmark",
    expertise: ["Product Discovery", "Roadmapping", "Factory Workflows"],
    photo: "/images/operatorpanel1.png",
    startYear: 2020,
  },
  {
    slug: "thomas-berg",
    name: "Thomas Berg",
    role: "Solutions Architect",
    team: "Solutions",
    location: "Denmark",
    expertise: ["System Integration", "PLC Data", "Solution Design"],
    photo: "/images/report-mockup5.png",
    startYear: 2017,
  },
]
