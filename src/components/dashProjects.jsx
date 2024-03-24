"use client"
import React , {useState , useEffect}from 'react'
import Link from 'next/link'
import { LuTimer } from "react-icons/lu";


const Projectlist = ({user}) => {

const [projects , setProjects] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure user is available and has an ID
        if (user && user.uid) {
          const response = await fetch(`http://localhost:8080/api/v1/projects?userId=${user.uid}`);
          const result = await response.json();
          setProjects(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);
    
console.log(projects)

const getRandomColor = () => {
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#33a1ff', '#ffa133']; // Add more colors as needed
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const calculateDaysRemaining = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
};

  return (
    <>
        <div className="px-5 my-6">
            <div className="flex flex-row  items-center justify-between h-8">
                <div className="heading">
                <h3 className={` text-xl font-semibold text-black `}>
                    Projects
                </h3>
                </div>
                <div className="filter-projects">
                    <div className="hs-dropdown relative inline-flex">
                        <button
                            id="hs-dropdown-default"
                            type="button"
                            className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium text-black shadow-sm "
                        >
                            Recents
                            <svg
                            className="hs-dropdown-open:rotate-180 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
                            <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                        <div
                            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                            aria-labelledby="hs-dropdown-default"
                        >
                            <a
                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-black dark:focus:bg-gray-700"
                            href="#"
                            >
                            Starred
                            </a>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul>
       
        {projects.map(project => (
            <li
            key={project._id}
            >
                <Link
                href={`/projects/${project._id}`}
                className="relati+ve flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 text-black hover:text-gray-800  border-gray-800 rounded-lg  pr-6 mb-3"
                >
               
                <span className={`h-8 w-8 ml-4 rounded-lg`} style={{ backgroundColor: getRandomColor() }}>
                    {/* project market */}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                    {project.projectName}
                </span>
              
               
                
                </Link>
            </li>
            ))
        }
        </ul>
    
    </>
  )
}

export default Projectlist