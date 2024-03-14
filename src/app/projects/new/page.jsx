import React from 'react'
import styles from '@/styles/projects.module.scss'
import { FaFileCirclePlus } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";

import Link from 'next/link'

const page = () => {
  return (
        <>
        {/*  add a back and a x nav hapa juu also add hover  create space  betwen etxt */}
          <section className={` ${styles.newCont} bg-dark-primary `}>
            <div className="container p-12">
                <div className="new-project flex items-center justify-center">
                    <div className="new-title">
                        <h1 className='text-color-primary text-center p-3 font-bold text-3xl'>
                            Create a New Project
                        </h1>
                        <p className='text-color-primary text-center p-5 '>
                            How Would you like to start your project?
                        </p>
                    </div>
                    
                </div>
                <div className={` ${styles.template} template-select `}>
                        <div className="btn-holder">
                            <Link href="/projects/blank">
                                <button  className=" border border-dashed p-7 mx-2 rounded">
                                    <span className="new icon-new  text-white">
                                        <FaFileCirclePlus />
                                    </span>

                                </button>
                                <p className='text-white text-center py-2'>
                                    Create New
                                </p>
                            </Link>
                        </div>
                        <div className="btn-holder">
                            <button className=" border p-7 mx-2 rounded">
                                <span className="new icon-new text-purple-500">
                                    <FaCopy />
                                </span>
                            </button>
                            <p className='text-white text-center py-2 '>
                                Use template
                            </p>
                        </div>
                        
                    </div>
            </div>
          
          </section>
          {/* <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div>
    <span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
  </div>
</div> */}
        </>
  )
}

export default page