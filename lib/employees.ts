export type Employee = {
  slug: string
  name: string
  role: string
  email: string
  team: string
  location: string
  expertise: string[]
  photo: string
  startYear: number
}

export const employees: Employee[] = [
  {
    slug: "stefan-lageri-schmidt-jensen",
    name: "Stefan Lageri-Schmidt Jensen",
    role: "Chief Executive Officer",
    email: "sj@optipeople.dk",
    team: "Leadership",
    location: "Denmark",
    expertise: ["Leadership", "Strategy", "Business Development"],
    photo: "/images/peoplephoto/Stefan_peoplephoto-2.png",
    startYear: 2024,
  },
  {
    slug: "morten-pradsgaard",
    name: "Morten Pradsgaard",
    role: "Chief Technology Officer",
    email: "mpg@optipeople.dk",
    team: "Engineering",
    location: "Denmark",
    expertise: ["Software Architecture", "Technology Strategy", "Platform Engineering"],
    photo: "/images/peoplephoto/Morten_peoplephoto.png",
    startYear: 2024,
  },
  {
    slug: "alexander-jonsby",
    name: "Alexander Jønsby",
    role: "Technical Consultant",
    email: "aj@optipeople.dk",
    team: "Consulting",
    location: "Denmark",
    expertise: ["Technical Consulting", "Solution Design", "Customer Delivery"],
    photo: "/images/peoplephoto/Alexander_peoplephoto.png",
    startYear: 2024,
  },
  {
    slug: "rasmus-hangaard-hansen",
    name: "Rasmus Hangaard Hansen",
    role: "Head of Projects",
    email: "rhh@optipeople.dk",
    team: "Projects",
    location: "Denmark",
    expertise: ["Project Management", "Delivery", "Operations Coordination"],
    photo: "/images/peoplephoto/Rasmus_peoplephoto.png",
    startYear: 2024,
  },
  {
    slug: "mads-wested",
    name: "Mads Wested",
    role: "IoT Engineer",
    email: "mw@optipeople.dk",
    team: "Engineering",
    location: "Denmark",
    expertise: ["IoT", "Industrial Connectivity", "Edge Devices"],
    photo: "/images/peoplephoto/Mads W_peoplephoto.png",
    startYear: 2024,
  },
  {
    slug: "mads-hauerslev",
    name: "Mads Hauerslev",
    role: "BI Consultant",
    email: "mh@optipeople.dk",
    team: "Business Intelligence",
    location: "Denmark",
    expertise: ["Business Intelligence", "Reporting", "Data Analysis"],
    photo: "/images/peoplephoto/Mads H_peoplephoto.png",
    startYear: 2024,
  },
  {
    slug: "marcus-eduard",
    name: "Marcus Eduard",
    role: "Sales Engineer",
    email: "me@optipeople.dk",
    team: "Sales",
    location: "Denmark",
    expertise: ["Technical Sales", "Solution Advisory", "Customer Engagement"],
    photo: "/images/peoplephoto/Marcus_peoplephoto.png",
    startYear: 2024,
  },
  {
    slug: "sofie-riis-freudendahl",
    name: "Sofie Riis Freudendahl",
    role: "Marketing Project Manager",
    email: "sf@optipeople.dk",
    team: "Marketing",
    location: "Denmark",
    expertise: ["Marketing", "Campaign Management", "Content Strategy"],
    photo: "/images/peoplephoto/Sofie_peoplephoto.png",
    startYear: 2024,
  },
]
