"use client"

import React from 'react'
import styles from "@/styles/dashboard.module.scss"
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { AiFillFileAdd } from "react-icons/ai";
import { VscProject } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa";
import Link from 'next/link'
import { FaArrowRightLong } from "react-icons/fa6";
import { DashProjects } from '@/components';


const Page = () => {

    const currentDate = new Date();

  // Format the date as a string (adjust the format as needed)
    const formattedDate = currentDate.toDateString();
    
    const currentHour = new Date().getHours();

    // Determine the greeting based on the current hour
    let greeting;
    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }

    return (
        <>
                <div className={` ${styles.heroSec}  `}>
                    <div className="flex items-center justify-center">
                           <div className="py-6">
                                <p className="time-greeting text-white text-center">{formattedDate}</p>
                                <br />
                                <h1 className={` text-3xl font-bold text-white text-center`}>
                                    {greeting} ,Okanda.
                                </h1>
                           </div>
                    </div>
             
                    <div className="grid-panel items-center  justify-start mx-12 mt-6">
                        <div className="grid grid-cols-3 gap-4">

                            <div className={` ${styles.gridPanel} bg-yellow-200 p-6 rounded-lg`}>
                            <div className="my -3">
                                <div className={`${styles.iconHolder} bg-yellow-400 text-white my-2 flex items-center justify-center`}>  
                                    <span>
                                        <FaFileInvoiceDollar />
                                    </span>
                                </div>
                                <div>
                                    <h2>
                                        INVOICES
                                    </h2>
                                    <p className='text-sm text-yellow-800 ' >
                                        A friendly reminder! You have 13 invoices waiting to be reviewed and sent.
                                        Take action to ensure timely payments.
                                    </p>
                                    <p className={` text-xs inline-flex items-center`}>
                                        Go to Invoices
                                        <Link href="#">
                                        <span>
                                        <FaArrowRightLong />
                                        </span>
                                        </Link>
                                    </p>
                                </div>
                                </div>
                            </div>
                            
                            <div className={` ${styles.gridPanel} bg-grean-200 p-6 rounded-lg`}>
                            <div className="my -3">
                                <div className={`${styles.iconHolder} bg-grean-400 text-white my-2 flex items-center justify-center`}>  
                                    <span>
                                        <VscProject />
                                    </span>
                                </div>
                                <div>
                                    <h2>
                                        PROJECTS
                                    </h2>
                                    <p className='text-sm text-green ' >
                                            4 projects require your attention for updates.
                                            Keep your projects on track by providing necessary updates.
                                    </p>
                                    <p className={` text-xs inline-flex items-center`}>
                                        Go to Projects
                                        <Link href="#">
                                        <span>
                                        <FaArrowRightLong  />
                                        </span>
                                        </Link>
                                    </p>
                                </div>
                                </div>
                            </div>

                            <div className={` ${styles.gridPanel} bg-purple-200 p-6 rounded-lg`}>
                                <div className="mx -3">
                                <div className={`${styles.iconHolder} bg-purple-400 text-white my-2 flex items-center justify-center`}>  
                                    <span>
                                        <FaUsers />
                                    </span>
                                </div>
                                <div>
                                    <h2>
                                        CLIENTS
                                    </h2>
                                    <p className='text-sm text-purple-800 ' >
                                            6 clients are waiting for your response.
                                            Address their inquiries promptly to maintain good client relationships.
                                    </p>
                                    <p className={` text-xs inline-flex items-center justify-between `}>
                                        Go to Clients
                                        <Link href="#">
                                        <span>
                                        <FaArrowRightLong />
                                        </span>
                                        </Link>
                                    </p>
                                </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* bring in the othe rcomponents  */}
                {/* grid fro all project and invoices pendingf */}
                <div className="grid grid-cols-2 gap-6 mx-12 mt-8 ">
                    <div className="projects  list border border-gray-100 rounded-lg p-4 max-h-[500px]">
                        <DashProjects/>
                    </div>
                    <div className="invoices-list border border-gray-100 rounded-lg p-4 max-h-[500px] ">

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mx-12 mt-8 ">
                    <div className="projects  list border border-gray-700 rounded-lg p-4 max-h-[500px]">
                        <DashProjects/>
                    </div>
                    <div className="invoices-list border border-gray-100 rounded-lg p-4 max-h-[500px] ">

                    </div>
                </div>
        </>
    )
}

export default Page