import React from 'react'
import styles from '@/styles/dashboard.module.scss'
import { useRouter } from 'next/navigation';
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import Projectlist from './projectlist';
import Link from 'next/link'

const page = ({user , logOut}) => {

    const router = useRouter();
    const handleSignOut = async () =>{
        try{
            await logOut()
            router.push('/');
        }catch(error){
            console.log(error)
        }
    }


  return (
    <>
    {/* component */}
    <div className={`  flex flex-col flex-au56to flex-shrink-0 antisaliased bg-white text-black `}>
        <div className="fixed flex flex-col top-0 left-0 w-64  h-full border-r bg-white">
        <div className="flex items-center justify-center p-8 ">
            <div>
                <img className={` ${styles.Logo} `} src="/logo.png" alt="dashbaordlogo" />
            </div>
        </div>
        <div className={`${styles.scroll} overflow-y-auto overflow-x-hidden flex-grow bg-white  overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300`}>
            <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
                <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                    Menu
                </div>
                </div>
            </li>
            <li>
                <Link
                  prefetch={true}
                href={'/dashboard'}
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
                </Link>
            </li>
            <li>
                <Link
                  prefetch={true}
                 href={'#'}
                className="hidden relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 txte-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-green pr-6"
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
                <span className="ml-2 text-sm tracking-wide truncate">Inbox</span>
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                    New
                </span>
                </Link>
            </li>
         
          
            <li className="px-5 mt-5">
                <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light underline tracking-wide text-gray-500">
                    Tools
                </div>
                </div>
            </li>
            <li>
                <Link
                  prefetch={true}
               href="/dashboard/clients"
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                    </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                    Client Manager
                </span>
                </Link>
            </li>
            <li>
                <Link
                  prefetch={true}
               href='/dashboard/invoices'
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 txte-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-green pr-6"
                >
                <span className="inline-flex justify-center items-center ml-4">
                    <LiaFileInvoiceDollarSolid />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                    Invoice Manager
                </span>
                </Link>
            </li>
         

            {/* List a few projects here */}
            <Projectlist user={user}/>

            <li className="px-5">
                <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                    Settings
                </div>
                </div>
            </li>
            <li>
                <Link
                  prefetch={true}
               href={'#'}
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                    </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                    Profile
                </span>
                </Link>
            </li>
            
            <li className='bg-green bottom-0 '  onClick={handleSignOut}>
                <Link
                 href={'#'}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-800 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-green pr-6"
                >
                <span className="inline-flex text-white justify-center items-center ml-4">
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                    </svg>
                </span>
                <span className="ml-2 text-sm  text-white font-semibold tracking-wide truncate">
                    Logout
                </span>
                </Link>
            </li>
            </ul>
        </div>
        </div>
    </div>
    </>
  )
}

export default page