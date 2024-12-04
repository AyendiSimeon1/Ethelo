"use client";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from 'react';
import { getProject, Project } from '@/redux/productReducer';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Link from 'next/link';
export default function RecommendedJobs() {
    const { projects, isLoading, error } = useAppSelector((state) => {
        return state.project;
    });
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                console.log('Dipatching fetch projects');
                const result = await dispatch(getProject());
                console.log('Dispatch Result:', {
                    type: result.type,
                    payload: result.payload
                })
            } catch (dispatchError) {
                console.error('Dispatch error:', dispatchError)
            }
        };
        fetchProjects();
        
    }, [dispatch]);
    console.log('The projects:', projects);

    const allProjects = projects.data;

    

    return (
        <section className="p-6  bg-bl mb-8 mx-8 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold font-mono mb-6">Recommended Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allProjects.map((project: Project) => (
                    <div
                     
                        className={`bg-blue-300 p-6 rounded-lg shadow-md transform transition duration-200 hover:scale-105`}
                    >
                        {/* <div className="text-sm text-gray-500 font-mono mb-2">{job.date}</div> */}
                        <h3 className="text-lg font-bold text-gray-800 font-mono">{project.title}</h3>
                        <p className="text-sm text-white font-mono">{project.organizationName}</p>
                        <div className="my-4 space-y-2">
                            {/* {project.requiredSkills.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-gray-200 text-gray-700 text-xs font-mono px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))} */}
                        </div>
                        {/* <div className="font-semibold text-gray-900 font-mono">{proj.pay}</div> */}
                        <div className="text-sm text-blue-200 font-mono">{project.location}</div>
                        <Link href={`/projects/${project._id}`}>
                        <button className="mt-4 bg-black text-white py-1 px-4 rounded-lg text-sm font-mono transition duration-200 hover:bg-gray-800">
                        
                            Apply 
                       
                        </button>
                         </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}