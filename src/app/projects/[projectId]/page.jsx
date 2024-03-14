"use client"

import React, { useState , useEffect } from 'react';
import styles from '@/styles/projects.module.scss'
import { ProjectBoard } from '@/components';
import { useRouter } from 'next/navigation';



const Page = ( {params:{projectId}} ) => {
 
    const router = useRouter();
    const [projectData , setProjectData] = useState(null);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                // Fetching project data from your API using the project name
                const response = await fetch(` http://localhost:8080/api/v1/projects/${projectId}`);
             
                if (!response.ok) {
                    throw new Error('Failed to fetch project data');
                }
                const data = await response.json();
                setProjectData(data);
            }catch(error){
                console.log("erorr fetching data:", error)
            }
        };


        fetchData();
    },[projectId]);

    console.log("project Data:",projectData)
 
    return (
        <>
            <div className={`${styles.dashBoardCont}`}>
                <ProjectBoard projectData={projectData}/>
            </div>
        </>
    )
}



export default Page