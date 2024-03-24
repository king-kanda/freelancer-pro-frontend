import React, { useEffect } from 'react'
import styles from '@/styles/dashboard.module.scss'

const Dashboardnav = ({user}) => {

  return (
    <>
        <nav className=" top-0 fixed w-full bg-white text-black border-gray-200 text-white ">
            <div className=" flex items-center justify-end px-14 py-4">
                
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
                        <h2 className='text-sm text-black font-bold'>
                            {user.displayName  || "jambo Jambo" }
                        </h2>
                        <p className='text-sm  text-black'>
                        {user.email || "Jambo@email.com"}
                        </p>
                </div>
                {/* Dropdown menu */}
               
               
                </div>
               
            </div>
        </nav>
    </>
  )
}

export default Dashboardnav