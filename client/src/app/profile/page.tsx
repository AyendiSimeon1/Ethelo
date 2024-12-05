"use client";
import React, { useEffect, useState } from 'react';
import { 
  User, Mail, Briefcase, MapPin, Bell, Check, X, Users, Tag
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchApplications, updateApplicationStatus } from '@/redux/applicationReducer';

export type ProjectType = {
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
  type?: 'applied' | 'accepted';
};

export type NotificationType = {
  id: number;
  type: 'application' | 'message';
  message: string;
  time: string;
  isNew: boolean;
};

const ProjectCard: React.FC<{ project: ProjectType }> = ({ project }) => {

  
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

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'applications' | 'accepted'>('projects');
  const [isEditing, setIsEditing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated, error, user } = useAppSelector((state) => state.auth);
  const { projects } = useAppSelector((state) => state.project);
  const {  applications  } = useAppSelector((state) => state.application);
  console.log('this is the applicaitons : ', applications);
   
  useEffect(() => {
    dispatch(fetchApplications(projects));
  }, [dispatch, projects]);

  const handleStatusUpdate = (applicationId: string, status: 'Accepted' | 'Rejected') => {
    dispatch(updateApplicationStatus({ applicationId, status }));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const allProjects = projects.data || [];
  console.log('all the projects:', allProjects);
  const userId = user?.user?.id;
  
  const notifications: NotificationType[] = [
    {
      id: 1,
      type: "application",
      message: "Your application for 'Education Portal' was accepted!",
      time: "2h ago",
      isNew: true,
    },
    {
      id: 2,
      type: "message",
      message: "New message from Project Lead of Tech Community Platform",
      time: "1d ago",
      isNew: false,
    },
  ];

  const handleEditToggle = () => setIsEditing(!isEditing);

  const filteredProjects = allProjects.filter((project) => {
    switch(activeTab) {
      case 'projects':
        return project.userId === userId;
      case 'applications':
        return project.type === "applied";
      case 'accepted':
        return project.type === "accepted";
      default:
        return false;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-1">
              <h1 className="text-xl font-bold">My Dashboard</h1>
            </div>
            <button
              onClick={() => setShowNotification(!showNotification)}
              className='relative p-2 rounded-full hover:bg-gray-100 transition'
            >
              <Bell className="h-6 w-6 text-gray-600" />
              {notifications.some((n) => n.isNew) && (
                <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="fixed right-0 mt-2 bg-white rounded-lg shadow-xl z-50 mr-10">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button onClick={() => setShowNotification(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg ${
                  notification.isNew ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div>
                    {notification.type === "application" ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Mail className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Mail className="h-6 w-6 text-gray-600" />
          <p>{user?.user?.email}</p>
        </div>

        <div className="flex space-x-4 justify-between border-b pb-2 mb-4">
          <button
            className={`${
              activeTab === "projects" ? "font-bold text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            My Projects
          </button>
          <button
            className={`${
              activeTab === "applications" ? "font-bold text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("applications")}
          >
            Applications
          </button>
          <button
            className={`${
              activeTab === "accepted" ? "font-bold text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("accepted")}
          >
            Accepted
          </button>
        </div>

        <div className="max-w-4xl mx-auto p-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
            
          ))}

{applications.map((application) => (
        <div key={application.id}>
          <p>{application.userName}</p>
          <p>Status: {application.status}</p>
          <button onClick={() => handleStatusUpdate(application.id, 'Accepted')}>Accept</button>
          <button onClick={() => handleStatusUpdate(application.id, 'Rejected')}>Reject</button>
        </div>
      ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
