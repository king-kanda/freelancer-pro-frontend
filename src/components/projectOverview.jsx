"use client"

import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TeamProject } from '.';
import { UserAuth } from '@/context/AuthContext';

const ProjectOverview = ({ projectId }) => {
    const { user } = UserAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [projectDets, setProjectDets] = useState({});
    const [newDescription, setNewDescription] = useState('');

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (value) => {
        setNewDescription(value);
    };

    const handleSend = async () => {
        try {
            const updatedProject = { ...projectDets, projectDesc: newDescription };
            const response = await fetch(`http://localhost:8080/api/v1/projects/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProject)
            });
            if (response.ok) {
                // Update the project description locally
                setProjectDets(updatedProject);
                // Exit editing mode
                setIsEditing(false);
            } else {
                throw new Error('Failed to update project description');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/projects/${projectId}`);
                if (response.ok) {
                    const project = await response.json();
                    setProjectDets(project);
                } else {
                    throw new Error('Failed to fetch project details');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchProjectDetails();
    }, [projectId]);


    return (
        <>
            <section className="section py-6 mx-12">
                <div className="grid grid-cols-3 gap-4">
                    <div className="overview section col-span-2">
                        <div className="project-decription">
                            <h3 className='py-4 font-semibold' onDoubleClick={handleDoubleClick}>
                                Project Description
                            </h3>
                            <div className="relative">
                                {isEditing ? (
                                    <ReactQuill
                                        className="p-4 pb-12 block w-full border border-gray-100 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                                        style={{ height: '300px' }}
                                        value={newDescription}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <div
                                        id="project-description"
                                        className="p-4 pb-12 block w-full border border-gray-100 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: projectDets.projectDesc }}
                                    />
                                )}
                                {isEditing &&
                                    <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white dark:bg-slate-900">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-x-1">
                                                <button
                                                    type="button"
                                                    className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-grean-600 hover:bg-grean-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                                    onClick={handleSend}
                                                >
                                                    <svg
                                                        className="flex-shrink-0 size-3.5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="mt-6">
                            <TeamProject projectId={projectId} user={user} />
                        </div>

                        <div className="mt-6">
                            {/* Key resource section content */}
                        </div>
                    </div>

                    <div className="status section col-span-1">
                        {/* Status section content */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectOverview;
