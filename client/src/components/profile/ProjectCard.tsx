import { Users, MapPin, Briefcase, Mail, Tag } from 'lucide-react';

const ProjectCard = ({ project }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800">{project.title}</h2>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
            {project.duration}
          </span>
        </div>
  
        <p className="text-gray-600 mb-4">{project.description}</p>
  
        <div className="space-y-2">
          {project.organizationName && (
            <div className="flex items-center text-gray-500">
              <Briefcase className="mr-2 w-4 h-4" />
              <span>{project.organizationName}</span>
            </div>
          )}
  
          {project.location && (
            <div className="flex items-center text-gray-500">
              <MapPin className="mr-2 w-4 h-4" />
              <span>{project.location}</span>
            </div>
          )}
  
          {project.volunteerCount > 0 && (
            <div className="flex items-center text-gray-500">
              <Users className="mr-2 w-4 h-4" />
              <span>{project.volunteerCount} Volunteers Needed</span>
            </div>
          )}
  
          {project.contactEmail && (
            <div className="flex items-center text-gray-500">
              <Mail className="mr-2 w-4 h-4" />
              <span>{project.contactEmail}</span>
            </div>
          )}
  
          {project.requiredSkills && project.requiredSkills.length > 0 && (
            <div className="flex items-center text-gray-500">
              <Tag className="mr-2 w-4 h-4" />
              <span>{project.requiredSkills.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
    );
  };