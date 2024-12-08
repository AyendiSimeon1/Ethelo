import React from 'react';
import { Users, MapPin, Briefcase, Mail, Tag } from 'lucide-react';

interface Project {
  title: string;
  duration: string;
  description: string;
  organizationName?: string;
  location?: string;
  volunteerCount?: number;
  contactEmail?: string;
  requiredSkills?: string[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="text-xl font-bold">{project.title}</h2>
      <p className="text-sm text-gray-600">{project.duration}</p>
      
      <p className="text-base">{project.description}</p>
      
      <div className="space-y-1 text-sm text-gray-700">
        {project.organizationName && (
          <div className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4" />
            {project.organizationName}
          </div>
        )}
        
        {project.location && (
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            {project.location}
          </div>
        )}
        
        {project.volunteerCount && project.volunteerCount > 0 && (
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            {project.volunteerCount} Volunteers Needed
          </div>
        )}
        
        {project.contactEmail && (
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            {project.contactEmail}
          </div>
        )}
        
        {project.requiredSkills && project.requiredSkills.length > 0 && (
          <div className="flex items-center">
            <Tag className="mr-2 h-4 w-4" />
            {project.requiredSkills.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;