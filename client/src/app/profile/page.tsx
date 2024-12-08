"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, Mail, Check, X, Clock 
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchApplications, updateApplicationStatus } from '@/redux/applicationReducer';
import { getProject } from '@/redux/productReducer';
import Navbar from '@/components/ui/profileHeader';

type ActiveTabType = 
  | 'myProjects' 
  | 'pendingApplications' 
  | 'managedApplications' 
  | 'appliedProjects';

type ProjectCardProps = {
  project: ProjectType;
  applicationStatus?: ApplicationType['status'];
  application?: ApplicationType;
  onAccept?: () => void;
  onReject?: () => void;
};

type ProjectType = {
  _id: string;
  title: string;
  description?: string;
  duration?: string;
  organizationName?: string;
  location?: string;
  volunteerCount?: number;
  contactEmail?: string;
  requiredSkills?: string[];
  userId: string;
};

type ApplicationType = {
  userName: React.ReactNode;
  userEmail: React.ReactNode;
  appliedOn: string | number | Date;
  id: string;
  projectId: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
};

type UserType = {
  id?: string;
  [key: string]: any;
};

type ProjectState = {
  data: ProjectType[];
  loading: boolean;
  error: string | null;
};

type ApplicationState = {
  applications: ApplicationType[];
  loading: boolean;
  error: string | null;
};

type ProjectApplicationPair = {
  project: ProjectType | undefined;
  application: ApplicationType;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ 
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
    <div 
      className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
      role="article"
    >
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
              aria-label="Accept Application"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center"
            >
              <Check className="mr-2 w-4 h-4" /> Accept
            </button>
          )}
          {onReject && (
            <button 
              onClick={onReject}
              aria-label="Reject Application"
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
  const [activeTab, setActiveTab] = useState<ActiveTabType>('myProjects');
  const dispatch = useAppDispatch();

  const { projects, loading: projectsLoading, error: projectsError } = 
    useAppSelector((state) => state.project);
  const { 
    applications, 
    loading: applicationsLoading, 
    error: applicationsError 
  } = useAppSelector((state) => state.application);
  const { user } = useAppSelector((state) => state.auth) as { user?: UserType };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchApplications(user.id));
      dispatch(getProject());
    }
  }, [dispatch, user?.id]);

  const userProjects = useMemo(() => 
    projects.data?.filter((project: ProjectType) => project.userId === user?.id) || [], 
    [projects.data, user]
  );

  const appliedProjectsWithStatus = useMemo((): ProjectApplicationPair[] => 
    applications.map((application: ApplicationType): ProjectApplicationPair => {
      const project = projects.data?.find((p: ProjectType) => p._id === application.projectId);
      return { project, application };
    }).filter((item: ProjectApplicationPair) => 
      item.project && item.project.userId !== user?.id
    ),
    [applications, projects.data, user]
  );

  const handleApplicationStatusUpdate = (applicationId: string, status: 'Accepted' | 'Rejected') => {
    dispatch(updateApplicationStatus({ applicationId, status }));
  };

  const renderContent = () => {
    if (projectsLoading || applicationsLoading) {
      return <div className="text-center text-gray-500 py-8">Loading...</div>;
    }

    if (projectsError || applicationsError) {
      return <div className="text-center text-red-500 py-8">Error loading data</div>;
    }

    switch (activeTab) {
      case 'myProjects':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Projects</h2>
            {projects.data.length === 0 ? (
              <p className="text-gray-500">You haven't created any projects yet.</p>
            ) : (
              projects.data.map((project: ProjectType) => (
                <ProjectCard key={project._id} project={project} />
              ))
            )}
          </div>
        );

      case 'pendingApplications':
        const pendingApplications = applications.filter((app: ApplicationType) => app.status === 'Pending');
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Pending Applications</h2>
            {pendingApplications.length === 0 ? (
              <p className="text-gray-500">No pending applications.</p>
            ) : (
              pendingApplications.map((application: ApplicationType) => {
                const project = projects.data?.find((p: ProjectType) => p._id === application.projectId);
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

      case 'appliedProjects':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Projects I've Applied To</h2>
            {appliedProjectsWithStatus.length === 0 ? (
              <p className="text-gray-500">You haven't applied to any projects yet.</p>
            ) : (
              appliedProjectsWithStatus.map(({ project, application }: ProjectApplicationPair) => 
                project ? (
                  <ProjectCard
                    key={application.id}
                    project={project}
                    application={application}
                    applicationStatus={application.status}
                  />
                ) : null
              )
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div 
        className="min-h-screen bg-gray-50 p-8"
        aria-live="polite"
      >
        <div className="mb-4 flex space-x-4">
          {(['myProjects', 'pendingApplications', 'appliedProjects'] as ActiveTabType[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md transition ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab === 'myProjects' ? 'My Projects' : 
               tab === 'pendingApplications' ? 'Pending Applications' : 
               'Applied Projects'}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserProfile;