"use client"

import React, { useState , useEffect } from 'react';
import styles from '@/styles/projects.module.scss'
import { ProjectBoard } from '@/components';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext';



const Page = ( {params:{projectId}} ) => {
 
    const { user , logOut } = UserAuth() 
 
    return (
        <>
            <div className={`${styles.dashBoardCont}`}>
                <ProjectBoard projectData={projectId} />
            </div>
        </>
    )
}



export default Page