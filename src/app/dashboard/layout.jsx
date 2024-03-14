"use client"
import React , {useState , useEffect}from 'react'
import { DashboardNav, ProjectList, Sidebar } from '@/components';
import { UserAuth } from '@/context/AuthContext';
import styles from "@/styles/dashboard.module.scss"
import {useRouter} from 'next/navigation'

const page = ({children}) => {

  const { user , logOut } = UserAuth() 

  const router = useRouter()

  if (!user || !user.email) {
    router.push('/login');
  }
  return (
    <>
    {/* component */}
        <DashboardNav user={user} />
        <Sidebar logOut={logOut} user={user} />
        <div className={`${styles.dashBoardCont} bg-dark-tertiary`}>
            {children}
        </div>
    </>
  )
}

export default page