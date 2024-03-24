"use client"

import React, { useState, useEffect } from 'react';
import { LuSmilePlus } from 'react-icons/lu';
import { AddTeam } from '.';
import { UserAuth } from '@/context/AuthContext';

const TeamProject = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState(null);
  const { user } = UserAuth();

  useEffect(() => {
    // Fetch project data
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/projects/${projectId}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExit = () => {
    setIsOpen(false);
  };

  const renderClientButton = () => {
    if (project && project.clientID && project.clientID.name) {
      const initials = project.clientID.name
        .split(' ')
        .map((namePart) => namePart.charAt(0))
        .join('')
        .toUpperCase();

      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

      return (
        <div className="member-add">
          <button className="inline-flex items-center justify-around gap-3 hover:bg-gray-300 px-6 py-3 rounded-sm">
            <div
              style={{
                background: randomColor,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white' }}>{initials}</span>
            </div>
            <div>
              <p>{project.clientID.name}</p>
              <span className="text-xs text-gray-500">{project.clientID.email}</span>
            </div>
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <section className="p-4">
        <h3 className="py-3 font-semibold">Your Team</h3>
        <div className="p-3 teams-list flex items-center justify-start gap-4">
          <div className="member-add">
            <button onClick={handleClick} className="inline-flex items-center justify-around gap-3 hover:bg-gray-300 px-6 py-3 rounded-sm">
              <span className="border border-dashed border-gray-400 h-8  w-8 p-2 flex items-center justify-center rounded-full text-3xl">
                <LuSmilePlus />
              </span>
              <p>Add Member</p>
            </button>
          </div>
          <div className="member-add">
            <button className="inline-flex items-center justify-around gap-3 hover:bg-gray-300 px-6 py-3 rounded-sm">
              <img src={user.photoURL} className="border h-8 w-8 flex items-center justify-center rounded-full" />
              <div>
                <p>{user.displayName}</p>
                <span className="text-xs text-gray-500">Project Owner</span>
              </div>
            </button>
          </div>
          {renderClientButton()}
        </div>
      </section>
      <AddTeam projectId={projectId} isOpen={isOpen} onClose={handleClose} user={user} />
    </>
  );
};

export default TeamProject;
