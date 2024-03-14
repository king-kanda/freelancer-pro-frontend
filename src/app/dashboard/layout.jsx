"use client"
import React , {useState , useEffect}from 'react'
import { DashboardNav, ProjectList, Sidebar } from '@/components';
import { UserAuth } from '@/context/AuthContext';
import styles from "@/styles/dashboard.module.scss"

const page = ({children}) => {

  const { user , logOut } = UserAuth() 

  return (
    <>
    {/* component */}
        <DashboardNav user={user} />
        <Sidebar logout={logOut} />
        <div className={`${styles.dashBoardCont} bg-dark-tertiary`}>
            {children}
        </div>
    </>
  )
}

export default page