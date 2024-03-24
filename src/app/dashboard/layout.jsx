
"use client";
import React, { useState, useEffect } from 'react';
import { DashboardNav, ProjectList, Sidebar } from '@/components';
import { UserAuth } from '@/context/AuthContext';
import styles from "@/styles/dashboard.module.scss";
import { useRouter } from 'next/navigation';

const Page = ({ children }) => {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user || !user.email) {
        router.push('/login');
      }
    }, 60000); // Redirect to login after 1 minute

    return () => clearTimeout(timer);
  }, [user, router]);

  useEffect(() => {
    if (user && user.email) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <svg
            fill="none"
            className="w-12 h-12 animate-spin text-green"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <br />
          <div>Loading ...</div>
        </div>
      </div>
      </div>;
  }

  return (
    <>
      {/* component */}
      <DashboardNav user={user} />
      <Sidebar logOut={logOut} user={user} />
      <div className={`${styles.dashBoardCont} bg-white`}>
        {children}
      </div>
    </>
  );
};

export default Page;
