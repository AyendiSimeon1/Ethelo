'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store';


const ProjectDetails = () => {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');
    const [filteredApplications, setFilteredApplications] = useState(applications);

    const handleApplicationAction = (applicationId, action) => {
        const updatedApplications = filteredApplications.map(app => 
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
        <div>
            <h1>{project.title}</h1>
        </div>
    );
};

export default ProjectDetails;