'use client';

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import {
    MapPin,
    Clock,
    Users,
    Mail,
    CheckCircle,
    XCircle,
    Ship
} from 'lucide-react';
import CreateApplication from '@/app/profile/createApplication';

const applications = [
    {
      _id: '1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      status: 'Pending'
    },
    {
      _id: '2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      status: 'Pending'
    }
  ];

const ProjectDetails = () => {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');
    const [filteredApplications, setFilteredApplications] = useState(applications);
    const [toogleApplication, setToogleApplication] = useState(false);

  
    const handleApplicationAction = (applicationId: any, action: string) => {
        const updatedApplications = filteredApplications.map((app: { _id: any; }) => 
            app._id === applicationId
             ? { ...app, status: action === 'accept' ? 'Accepted': 'Rejected'}
             : app
        );

        setFilteredApplications(updatedApplications);
    }

    // Get projects from Redux
    const { projects, isLoading, error } = useAppSelector((state) => state.project);
  
    

    const allProjects =  projects.data;

    const project = allProjects.find((proj: any) => allProjects.id == projectId)
    console.log('this is the project:', project);
    // Loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // No project found
    if (!project) {
        return <div>Project Not Found</div>;
    }

    return (
        <div className='container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='md:col-span-2 bg-white shadow-lg rounded-lg p-6'>
                <h4 className='font-bold text-2xl text-gray-900'>{project.title}</h4>
                <button className='text-white bg-green-500' onClick={() => setToogleApplication(true)}>
                    Apply
                </button>
                <p className='text-gray-600 mb-4'>{project.organizationName}</p>
                
                <p className='text-gray-800 mb-6'>{project.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <Clock className="text-blue-500" size={20} />
                        <span className="text-gray-700">{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MapPin className="text-green-500" size={20} />
                        <span className="text-gray-700">Location: {project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Users className="text-purple-500" size={20} />
                        <span className="text-gray-700">Volunteers: {project.volunteerCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Mail className="text-red-500" size={20} />
                        <span className="text-gray-700">Contact: {project.contactEmail}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <h5 className="font-semibold mb-2 text-gray-900">Required Skills</h5>
                    <div className="flex flex-wrap gap-2">
                        {project.requiredSkills?.map((skill: string) => (
                            <span 
                                key={skill} 
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg border">
                <div className="p-6 border-b">
                    <h5 className="text-xl font-semibold">Applications</h5>
                </div>
                <div className="p-6">
                    {filteredApplications.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No applications yet
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {filteredApplications.map((application) => (
                                <div key={application._id} className="border p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {application.userName}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {application.userEmail}
                                            </p>
                                        </div>
                                        {!application.status || application.status === 'Pending' ? (
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleApplicationAction(application._id, 'accept')}
                                                    className="flex items-center px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-50 transition"
                                                >
                                                    <CheckCircle size={16} className="mr-2" />
                                                    Accept
                                                </button>
                                                <button 
                                                    onClick={() => handleApplicationAction(application._id, 'reject')}
                                                    className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition"
                                                >
                                                    <XCircle size={16} className="mr-2" />
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span 
                                                className={`px-3 py-1 rounded-full text-sm ${
                                                    application.status === 'Accepted' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {application.status}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {toogleApplication ? <CreateApplication projectId={projectId} /> : 

            (
                <h1>Hellow</h1>
            )
             
            }
           
        </div>
    );
};

export default ProjectDetails;