"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Briefcase, MapPin, Bell, Check, X, Users, Tag, FileText, Clock, ExternalLink 
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchApplications, updateApplicationStatus } from '@/redux/applicationReducer';
import { getProject } from '@/redux/productReducer';

type ProjectType = {
  _id: string;
  title: string;
  description: string;
  duration: string;
  organizationName?: string;
  location?: string;
  volunteerCount: number;
  contactEmail?: string;
  requiredSkills?: string[];
  userId?: string;
};

type ApplicationType = {
  id: string;
  userName: string;
  userEmail: string;
  projectTitle: string;
  projectId: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedOn: string;
};

const ProjectCard: React.FC<{ 
  project: ProjectType, 
  applicationStatus?: 'Pending' | 'Accepted' | 'Rejected',
  application?: ApplicationType,
  onAccept?: () => void,
  onReject?: () => void
}> = ({ 
  project, 
  applicationStatus, 
  application,
  onAccept,
  onReject
}) => {
  const getStatusColor = () => {
    switch (applicationStatus) {
      case 'Pending': return 'bg-yellow-50 text-yellow-600';
      case 'Accepted': return 'bg-green-50 text-green-600';
      case 'Rejected': return 'bg-red-50 text-red-600';
      default: return '';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800">{project.title}</h2>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
            {project.duration}
          </span>
          {applicationStatus && (
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor()}`}>
              {applicationStatus}
            </span>
          )}
        </div>
      </div>
      <p className="text-gray-600 mb-4">{project.description}</p>
      
      {application && (
        <div className="mt-4 space-y-2 border-t pt-4">
          <div className="flex items-center text-gray-500">
            <User className="mr-2 w-4 h-4" />
            <span>{application.userName}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Mail className="mr-2 w-4 h-4" />
            <span>{application.userEmail}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="mr-2 w-4 h-4" />
            <span>Applied on: {new Date(application.appliedOn).toLocaleDateString()}</span>
          </div>
        </div>
      )}

      {applicationStatus === 'Pending' && (onAccept || onReject) && (
        <div className="mt-4 flex space-x-2">
          {onAccept && (
            <button 
              onClick={onAccept}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center"
            >
              <Check className="mr-2 w-4 h-4" /> Accept
            </button>
          )}
          {onReject && (
            <button 
              onClick={onReject}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center"
            >
              <X className="mr-2 w-4 h-4" /> Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'myProjects' | 
    'pendingApplications' | 
    'managedApplications' | 
    'appliedProjects'
  >('myProjects');
  
  const dispatch = useAppDispatch();
  
  const { user } = useAppSelector((state) => state.auth);
  const { projects } = useAppSelector((state) => state.project);
  const { applications } = useAppSelector((state) => state.application);

  const theProject = projects.data;
  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  const userProjects = theProject?.filter(project => project.userId === user?.user?.id) || [];

  // Projects the user has applied to
  const appliedProjectsWithStatus = applications.map(application => {
    const project = theProject?.find(p => p._id === application.projectId);
    return {
      project,
      application
    };
  }).filter(item => item.project && item.project.userId !== user?.user?.id);

  const handleApplicationStatusUpdate = (applicationId: string, status: 'Accepted' | 'Rejected') => {
    dispatch(updateApplicationStatus({ applicationId, status }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'myProjects':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Projects</h2>
            {userProjects.length === 0 ? (
              <p className="text-gray-500">You haven't created any projects yet.</p>
            ) : (
              userProjects.map(project => (
                <ProjectCard key={project._id} project={project} />
              ))
            )}
          </div>
        );
      
      case 'pendingApplications':
        const pendingApplications = applications.filter(app => app.status === 'Pending');
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Pending Applications</h2>
            {pendingApplications.length === 0 ? (
              <p className="text-gray-500">No pending applications.</p>
            ) : (
              pendingApplications.map(application => {
                const project = theProject.find(p => p._id === application.projectId);
                return project ? (
                  <ProjectCard 
                    key={application.id}
                    project={project}
                    application={application}
                    applicationStatus={application.status}
                    onAccept={() => handleApplicationStatusUpdate(application.id, 'Accepted')}
                    onReject={() => handleApplicationStatusUpdate(application.id, 'Rejected')}
                  />
                ) : null;
              })
            )}
          </div>
        );
      
      case 'managedApplications':
        const managedApplications = applications.filter(app => 
          app.status !== 'Pending'
        );
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Managed Applications</h2>
            {managedApplications.length === 0 ? (
              <p className="text-gray-500">No managed applications.</p>
            ) : (
              managedApplications.map(application => {
                const project = projects.find(p => p._id === application.projectId);
                return project ? (
                  <ProjectCard 
                    key={application.id}
                    project={project}
                    application={application}
                    applicationStatus={application.status}
                  />
                ) : null;
              })
            )}
          </div>
        );
      
      case 'appliedProjects':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Projects I've Applied To</h2>
            {appliedProjectsWithStatus.length === 0 ? (
              <p className="text-gray-500">You haven't applied to any projects yet.</p>
            ) : (
              appliedProjectsWithStatus.map(({ project, application }) => (
                project && (
                  <ProjectCard 
                    key={project._id} 
                    project={project} 
                    application={application}
                    applicationStatus={application.status}
                  />
                )
              ))
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-8">
          <User className="h-12 w-12 text-gray-600 mr-4" />
          <div>
            <h1 className="text-3xl font-bold">{user?.user?.name}</h1>
            <p className="text-gray-500 flex items-center">
              <Mail className="h-4 w-4 mr-2" /> {user?.user?.email}
            </p>
          </div>
        </div>

        <div className="border-b mb-6 flex space-x-4">
          {[
            { key: 'myProjects', label: 'My Projects' },
            { key: 'pendingApplications', label: 'Pending Applications' },
            { key: 'managedApplications', label: 'Managed Applications' },
            { key: 'appliedProjects', label: 'Applied Projects' }
          ].map(tab => (
            <button
              key={tab.key}
              className={`pb-2 ${
                activeTab === tab.key 
                  ? 'border-b-2 border-blue-500 text-blue-600 font-semibold' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default UserProfile;