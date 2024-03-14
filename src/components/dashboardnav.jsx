import React, { useEffect } from 'react'
import styles from '@/styles/dashboard.module.scss'

const Dashboardnav = ({user}) => {

  return (
    <>
        <nav className=" top-0 fixed w-full bg-dark-tertiary border-gray-200 text-white ">
            <div className=" flex items-center justify-end px-14 py-4">
                
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
                    className="w-10 h-10 rounded-full"
                    src="https://images.pexels.com/photos/17136147/pexels-photo-17136147/free-photo-of-indian-traditional-beard-man.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="user photo"
                    />
                    
                </button>
                <div className='px-2'>
                    <h2 className='text-sm font-bold'>
                        {user.displayName  || "jambo Jambo" }
                    </h2>
                    <p className='text-sm '>
                       {user.email || "Jambo@email.com"}
                    </p>
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
               
                </div>
               
            </div>
        </nav>
    </>
  )
}

export default Dashboardnav