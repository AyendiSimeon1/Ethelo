// src/app/projects/[projectId]/page.tsx
'use client'; // Important for client-side components in App Router

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { getProject } from '@/redux/productReducer'; // Adjust import path as needed

const ProjectDetails = () => {
    // const router = useRouter();
    // const dispatch = useAppDispatch();
    // const [projectId, setProjectId] = useState<string | null>(null);

    // // Get projects from Redux
    // const { projects, isLoading, error } = useAppSelector((state) => state.project);

    // // Extract projectId from URL
    // useEffect(() => {
    //     const pathSegments = window.location.pathname.split('/');
    //     const id = pathSegments[pathSegments.length - 1];
    //     setProjectId(id);
    // }, []);

    // // Fetch projects if not already loaded
    // useEffect(() => {
    //     if (!projects || projects.length === 0) {
    //         dispatch(getProject());
    //     }
    // }, [dispatch, projects]);

    // // Find project once projects are loaded
    // const project = projects?.find((proj: { _id: string | null; }) => proj._id === projectId);

    // // Loading state
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // // Error state
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // // No project found
    // if (!project) {
    //     return <div>Project Not Found</div>;
    // }

    // Render project details
    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
};

export default ProjectDetails;