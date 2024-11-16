import { ProjectPosting } from '@/types/category';
// Example job data
const exampleJob: ProjectPosting = {
  id: "1",
  title: "Senior Product Designer",
  company: "DesignCo",
  companyLogo: "/api/placeholder/48/48", // Using placeholder image
  location: "Remote",
  salary: "$120k - $150k",
  type: "Full-time",
  description: "We're looking for a Senior Product Designer to join our team and help shape the future of our digital products. You'll work closely with product managers, engineers, and other designers to create intuitive and beautiful user experiences.",
  postedDate: "2024-03-10",
  skills: ["Figma", "UI Design", "User Research", "Prototyping"],
  experienceLevel: "Senior Level",
  category: "design"
}


// export default function Page() {
//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <JobCard job={exampleJob} />
//     </div>
//   )
// }
