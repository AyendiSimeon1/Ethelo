export interface Category {
    id: string
    name: string
    slug: string
    description: string
    icon: string
    count: number
}

export interface Project {
    id: string
    title: string
    company: string
    location: string
    type: string
    description: string
    postedDate: string
    category: string
}


export type ProjectPosting = {
    id: string
    title: string
    company: string
    companyLogo?: string
    location: string
    salary: string
    type: string // "Full-time", "Part-time", "Contract", etc.
    description: string
    postedDate: string
    skills: string[]
    experienceLevel: string
    category: string
  }