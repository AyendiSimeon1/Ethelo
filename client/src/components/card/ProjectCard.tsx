"use client";
import Link from 'next/link';


import {
    Building2,
    MapPin,
    Clock,
   
    Briefcase,
    ChevronRight
} from 'lucide-react';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from 'react';

export function JobCard({ job }: { job: any }) {
    // Function to format the posted date to "X days ago"
    const getTimeAgo = (dateString: string) => {
      const now = new Date()
      const postedDate = new Date(dateString)
      const diffTime = Math.abs(now.getTime() - postedDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return '1 day ago'
      if (diffDays < 7) return `${diffDays} days ago`
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
      return `${Math.floor(diffDays / 30)} months ago`
    }
  
    return (
      <Link 
        href={`/jobs/${job.id}`}
        className="block"
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 relative">
          {/* Top section with company logo and job type */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              {job.companyLogo ? (
                <img 
                  src={job.companyLogo} 
                  alt={`${job.company} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.company}</p>
              </div>
            </div>
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${job.type === 'Full-time' ? 'bg-green-100 text-green-800' : ''}
              ${job.type === 'Part-time' ? 'bg-blue-100 text-blue-800' : ''}
              ${job.type === 'Contract' ? 'bg-orange-100 text-orange-800' : ''}
            `}>
              {job.type}
            </span>
          </div>
  
          {/* Job details section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span>{job.experienceLevel}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
             
              <span>{getTimeAgo(job.postedDate)}</span>
            </div>
          </div>
  
          {/* Job description */}
          <p className="text-gray-600 line-clamp-2 mb-4">
            {job.description}
          </p>
  
          {/* Skills section */}
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
  
          {/* Apply button */}
          <div className="mt-4 flex items-center justify-between">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Apply Now
            </button>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </Link>
    )
  }
  

  // Example job data
  const exampleJob: any = {
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


  export default function Page() {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <JobCard job={exampleJob} />
      </div>
    )
  }
