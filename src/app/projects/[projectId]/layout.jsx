"use client"
import React , {useState , useEffect}from 'react'
import styles from '@/styles/dashboard.module.scss'
import { CiBellOn } from "react-icons/ci";
import { ProjectList } from '@/components';

const page = ({children}) => {

  const [projects , setProjects] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/v1/projects');
          const result = await response.json();
          setProjects(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
  },[]);

  console.log(projects)

  return (
    <>
    {/* component */}
        <div className='bg-dark-secondary'>
            <nav className=" top-0 fixed w-full bg-dark-tertiary text-white border-gray-200 ">
                    <div className=" flex items-center justify-end px-12 py-2.5">
                        
                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                            className="w-7 h-7 rounded-full"
                            src="https://images.pexels.com/photos/17136147/pexels-photo-17136147/free-photo-of-indian-traditional-beard-man.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="user photo"
                            />
                            
                        </button>
                        <div className={` px-2 ${styles.profile} `}>
                           <span className={` w-7 h-7 rounded-full bg-white `}>
                            <CiBellOn />
                           </span>
                            
                        </div>
                        {/* Dropdown menu */}
                        <div
                            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">
                                Bonnie Green
                            </span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                name@flowbite.com
                            </span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                Dashboard
                                </a>
                            </li>
                            <li>
                                <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                Settings
                                </a>
                            </li>
                            <li>
                                <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                Earnings
                                </a>
                            </li>
                            <li>
                                <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                Sign out
                                </a>
                            </li>
                            </ul>
                        </div>
                        {/* not important foir now */}
                        </div>
                    
                    </div>
            </nav>
            <div className={`  flex flex-col flex-auto flex-shrink-0 antisaliased  text-white `}>
                <div className="fixed flex flex-col top-0 left-0 w-64  h-full">
                {/* <div className="flex items-center justify-center p-6 ">
                    <div>
                        <img className={` ${styles.Logo} `} src="/logo.png" alt="dashbaordlogo" />
                    </div>
                </div> */}
                <div className={`${styles.scroll} overflow-y-auto overflow-x-hidden flex-grow bg-dark-tertiary`}>
                    <ul className="flex flex-col py-4 ">
                        <li className="px-5">
                            <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500">
                                Menu
                            </div>
                            </div>
                        </li>
                        <li>
                            <a
                            href="#"
                            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 txte-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-green pr-6"
                            >
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                                </svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">
                                Dashboard
                            </span>
                            </a>
                        </li>
                        <li>
                            <a
                            href="#"
                            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 txte-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-green pr-6"
                            >
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                                </svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">My Tasks</span>
                            <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                                New
                            </span>
                            </a>
                        </li>
                        <li>
                            <a
                            href="#"
                            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 txte-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-green pr-6"
                            >
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                />
                                </svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">
                                My Inbox
                            </span>
                            </a>
                        </li>
                        
                        <ProjectList/>
                    </ul>
                </div>
                </div>
            </div>
            {children}
        </div>
    </>
  )
}

export default page