"use client"

import React, { useState , useEffect } from 'react';
import styles from '@/styles/projects.module.scss'
import { ProjectBoard } from '@/components';
import { useRouter } from 'next/navigation';



const Page = ( {params:{projectId}} ) => {
 
    const router = useRouter();
    const [projectData , setProjectData] = useState(null);

 
    return (
        <>
            <div className={`${styles.dashBoardCont}`}>
                <ProjectBoard projectData={projectId}/>
            </div>
        </>
    )
}



export default Page