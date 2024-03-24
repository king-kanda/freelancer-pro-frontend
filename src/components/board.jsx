"use client"

import React, { useState , useEffect} from 'react'
import { TaskBoard, FileDrop, Calendar, ProjectOverview } from '.'
import { FaChartPie, FaChevronDown, FaRegStar } from "react-icons/fa";
import { GoCircle } from "react-icons/go";
import { FiUserPlus } from "react-icons/fi";
import { BsStars, BsCalendar2, BsPaperclip } from "react-icons/bs";
import { PiClipboardTextThin } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { LiaStickyNoteSolid } from "react-icons/lia";
import styles from '@/styles/projects.module.scss'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { UserAuth } from '@/context/AuthContext';


const Board = ({projectData}) => {

  const [activeTab, setActiveTab] = useState(5)
  const [project, setProject] = useState();
  const { user  } = UserAuth() 

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

 
  useEffect(()=>{
    const fetchData = async () =>{
        try{
            // Fetching project data from your API using the project name
            const response = await fetch(` http://localhost:8080/api/v1/projects/${projectData}`);
         
            if (!response.ok) {
                throw new Error('Failed to fetch project data');
            }
            const data = await response.json();
            setProject(data);
        }catch(error){
            console.log("erorr fetching data:", error)
        }
    };


    fetchData();
},[projectData]);


if (!project) {
  return <div>
    <div
      role="status"
      className="max-w-screen-lg p-4 h-screen space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 mx-16"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  </div>;
}
  return (
    <>
      <section className='mb-2  mr-4'>
        {/* THIS SECTION WILL BE DYNAMIC IT WILL RECIEVE DATA FROM THE SINGL PROJECT ID AND DATA WILL BE PASSED DOWN AS A PROP OR A STATE CONTAING DETAILS OF THE PROJECT IN QUESTION */}
        <div className="Detcontainer">
          <div className="projectDetailsContainer  flex items-center justify-between">
            {/* sd */}
            <div className="projectDetails text-black flex items-center justify-between">
              <div className="projectName flex items-center justify-between text-black">
                <span className='p-2 text-2xl bg-blue-200 text-purple-600 rounded mr-4'>
                  <FaChartPie />
                </span>
                <h2 className='text-xl text-black'>
                   {project.projectName}
                </h2>
                <button className='mx-1 text-sm p-1 hover:bg-dark-tertiary hover:rounded-lg'>
                  <FaChevronDown />
                </button>
              </div>
              {/* add project to favorites component */}
              <div className="startProject text-black px-4 ">
                <span className='text-xl hover:text-blue-500 hover:bg-dark-tertiary '>
                  <FaRegStar />
                </span>
              </div>
              {/* set status component */}
              <div className="setStatus text-black px-2">

                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-sm inline-flex items-center justify-between hover:bg-dark-tertiary px-2 py-1 rounded-md hover:text-black"
                  type="button"
                >
                  <span className='mr-2 text-black'>
                    <GoCircle />
                  </span>
                  Set Status

                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdown"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 text-black"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* teams and ask AI btn */}
            <div className="teams-section">
              <div className="flex items-center justify-between">
                <div className="profile-image flex items-center justify-between mx-1">
                  {/* replace with auth profile Image */}
                  <span className={` ${styles.teamsDP} flex items-center justify-center rounded-full text-orange-900 bg-orange-500 mx-1`}>
                    s
                  </span>
                  <button className='mx-1'>
                    <span className={` ${styles.teamsDP} flex items-center justify-center rounded-full border-dashed border-black text-black`}>
                      <FiUserPlus />
                    </span>
                  </button>
                  <button className='mx-1'>
                    <span className={` ${styles.teamsDP} flex items-center justify-center rounded-full border-dashed border-black text-black`}>
                      <FiUserPlus />
                    </span>
                  </button>

                </div>

                {/* ask AI btn */}
                <button type="button"
                  className="text-white inline-flex items-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-5 py-2 text-center ">
                  <span className='mr-2'>
                    <BsStars />
                  </span>
                  <p>
                    Ask AI
                  </p>
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>



      <section className='mb-2 mt-4 mr-4'>
        {/* this section is for tabs and mocing between overview noard calendar and board AND TEAM LIST */}
        <div className="flex items-center justify-start">
          <div className="tabBtnHolder mr-3 hover:border-b-2 border-black">
            <button 
            onClick={() => handleTabClick(1)}
            className='inline-flex items-center  text-sm text-gray-900' >
              <span className="mx-1">
                <PiClipboardTextThin />
              </span>
              Overview
            </button>
          </div>
          <div className="tabBtnHolder mx-3 hover:border-b-2 border-white">
            <button 
            onClick={() => handleTabClick(2)}
            className='inline-flex items-center  text-sm text-gray-900' >
              <span className="mx-1">
                <MdOutlineDashboard />
              </span>
              Board
            </button>
          </div>
          <div className="tabBtnHolder mx-3 hover:border-b-2 border-white">
            <button 
            onClick={() => handleTabClick(3)}
            className='inline-flex items-center  text-sm text-gray-900' >
              <span className="mx-1">
                <BsCalendar2 />
              </span>
              Calendar
            </button>
          </div>
          {/* <div className="tabBtnHolder mx-3 hover:border-b-2 border-white">
            <button 
            onClick={() => handleTabClick(4)}
            className='inline-flex items-center  text-sm text-gray-900' >
              <span className="mx-1">
                <LiaStickyNoteSolid />
              </span>
              Notes
            </button>
          </div> */}
          <div className="tabBtnHolder mx-3 hover:border-b-2 border-white">
            <button 
            onClick={() => handleTabClick(5)}
            className='inline-flex items-center  text-sm text-gray-900' >
              <span className="mx-1">
                < BsPaperclip />
              </span>
              Files
            </button>
          </div>

        </div>
      </section>
      <div className="border-b p-0 m-0 border-gray-300 mr-4">
        {/* Content of the second section */}
      </div>

      {/* the above buttons shoudld change and teigger the state of the view below basicllly these are going to be tabs , therese tabs are going to be created as separate compoents  which will be furthr be fed into this page , the default view will be the board tab */}

      {activeTab === 1 && <ProjectOverview projectId={project._id} ></ProjectOverview>}
      {activeTab === 2 &&  <TaskBoard projectId={project._id} ></TaskBoard>}
      {activeTab === 3 &&   <Calendar></Calendar>}
      {/* {activeTab === 4 && <p>Hello 5 </p>} */}
      {activeTab === 5 && (
          <DndProvider backend={HTML5Backend}>
            <FileDrop projectId={project._id} user={user} />
          </DndProvider>
      )}

    </>
  )
}

export default Board