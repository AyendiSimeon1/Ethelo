"use client";
import React, { useState } from 'react';
import Footer from '../../components/ui/footer';
import { 
  User, Mail, Briefcase, MapPin, Calendar, Edit2, 
  Bell, Check, X, ExternalLink, Github, Linkedin,
  BookOpen, Clock, Heart, Star
} from 'lucide-react';
import { NotificationType, ProjectType, UserInfoType } from '@/types/Profile';
import { div } from 'framer-motion/client';
import { useAppSelector } from '../../redux/store';


const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'applications' | 'accepted'>('projects');
  const [isEditing, setIsEdititng] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { isLoading, isAuthenticated, error, user } = useAppSelector((state) => state.auth);
  console.log('user is ', user);

  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Tech Community Platform",
      description: "A platform for connecting developers and sharing resources",
      status: "active",
      type: "created",
      volunteers: 5,
    },
    {
      id: 2,
      title: "Environmental Data Visualization",
      description: "Visualizing climate change data for public awareness",
      status: "applied",
      type: "applied",
    },
    {
      id: 3,
      title: "Education Portal",
      description: "Online learning platform for underprivileged students",
      status: "accepted",
      type: "accepted",
    },
  ];
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

  const handleEditToggle = () => setIsEdititng(!isEditing);

  const filteredProjects =  projects.filter((project) => {
    if(activeTab === "projects") return project.type === "created";
    if(activeTab === "applications") return project.type === "applied";
    return project.type === "accepted";
  });

  return (
    
    <div className="min-h-screnn bg-gray-50 min-h-screen">
      <div className="bg-white shadow-sm-sticky top-0 z-50">
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
      {showNotification ? (
            <div>
      <div className="fixed right-0 mt-2 bg-white rounded-lg shadow-xl z-50 mr-10">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Notificatioins</h3>
            <button 
              onClick={() => setShowNotification(false)}>

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
      </div> ) : ('' )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* User Info */}
        <div className="flex flex-col space-y-4 mb-6">
          {/* <div className="flex items-center space-x-4">
            <User className="h-6 w-6 text-gray-600" />
            <p className="text-lg font-semibold">{userInfo.name}</p>
          </div> */}
          <div className="flex items-center space-x-4">
            <Mail className="h-6 w-6 text-gray-600" />
            <p>{user?.user?.email}</p>
          </div>
          {/* <div className="flex items-center space-x-4">
            <MapPin className="h-6 w-6 text-gray-600" />
            <p>{userInfo.location}</p>
          </div> */}
        </div>

        {/* Tabs */}
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

        {/* Projects */}
        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <div key={project.id}>
              <div>
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p>{project.description}</p>
                {project.volunteers && (
                  <div className="text-sm text-gray-500">
                    Volunteers: {project.volunteers}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* <Footer /> */}
      </div>
     
    </div>
    
     
     

  
  )
}

export default UserProfile;