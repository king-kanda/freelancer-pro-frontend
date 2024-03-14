'use client'
// create project file and info 
import React , {useState , useEffect} from 'react'
import styles from '@/styles/projects.module.scss'
import { IoIosArrowRoundBack, IoMdClose } from "react-icons/io";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS


const Page = () => {
    const router = useRouter();
    const [projectName , setProjectName] = useState();
    const [projectDesc , setProjectDesc] = useState();
    const [clientID , setClientID] = useState();
    const [start_date, setStart_date] = useState(new Date());
    const [end_date, setEnd_date] = useState(new Date());
    const [budget , setBudget] = useState()

    const [error, setError] = useState('');
    const [descErr, setDescErr] = useState('');
    const [idError, setIdErr] = useState('');
   
 
    const handleNameBlur = () => {
        setError(
            !projectName
              ? 'Project Name is Required !!'
              : projectName.length < 3
              ? 'Project Name is too short. Minimum length is 3 characters.'
              : projectName.length > 30
              ? 'Project Name is too long. Maximum length is 30 characters.'
              : ''
          );
       
      };

      const handleDescBlur = (e) => {
        setDescErr(
            !projectDesc
              ? 'Project Description is Required !!'
              : projectDesc.length < 3
              ? 'Project Name is too short. Minimum length is 3 characters.'
              : ''
          );
    
      };

      const handleClientIdBlur = (e) => {
        setIdErr(
            !clientID
              ? 'Project Name is Required !!'
              : ''
          );
       
      };
    
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("submit triggered")
            // Combine individual state variables into formData
            const formData = {
                projectName,
                projectDesc,
                // clientID,
                start_date,
                end_date,
                budget,
            };
            console.log(formData)
            try {
                const response = await fetch('http://localhost:8080/api/v1/projects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log('User data submitted successfully');
                    // Handle success, e.g., show a success message to the user
                    router.push('/projects/project_id');
                    console.log(response)
                } else {
                    console.error('Failed to submit user data');
                    // Handle failure, e.g., show an error message to the user
                }
            } catch (error) {
                console.error('Error submitting user data:', error);
            }
        }

    return (
        <>
            <section className={` ${styles.newBlank} bg-dark-primary px-5`}>
                <div className="section-nav p-4 flex items-center justify-between" >
                    <div className="back">
                       <Link href="/projects/new">
                            <span className='text-white text-2xl'>
                                <IoIosArrowRoundBack />
                            </span>
                       </Link>
                    </div>
                    <div className="cancel  text-xl">
                        <span className='text-white'>
                            <IoMdClose />
                        </span>
                    </div>
                </div>
                <div className="container p-4">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="section col-span-1  px-5 p-3">
                            <div className="section-tt">
                                <h2 className='text-white font-bold text-2xl'>
                                    New Project
                                </h2>
                            </div>
                            <div className="project-form pt-5">
                                <form action="" className={` ${styles.projectForm} `}>

                                    <div className="project-name">
                                        <div class={`mb-5 ${styles.projectForm}`}>
                                            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                                            <input 
                                            type="text" 
                                            id="project-name" 
                                            value={projectName}
                                            onChange={(e)=>setProjectName(e.target.value)}
                                            onBlur={handleNameBlur}
                                            class="bg-dark-secondary border border-green-300 text-white text-sm rounded focus:ring-grean-500 focus:border-green block w-full p-2.5" 
                                            
                                            />
                                            {error && <span className='py-2 text-red-500'>{error}</span>}
                                        </div>
                                    </div>
                                    <div className="project-name">
                                        <div class={`mb-3 ${styles.projectForm}`}>
                                            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Description </label>
                                            <input 
                                            type="text" 
                                            id="project-name" 
                                            value={projectDesc}
                                            onChange={(e)=>setProjectDesc(e.target.value)}
                                            onBlur={handleDescBlur}
                                            class="bg-dark-secondary border border-green-300 text-white text-sm rounded focus:ring-grean-500 focus:border-green block w-full p-2.5"
                                            
                                            />
                                            {descErr && <span className='py-2 text-red-500'>{descErr}</span>}
                                        </div>
                                    </div>
                                    <div className="project-name">
                                        <div class={`mb-5 ${styles.projectForm}`}>
                                            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Client ID </label>
                                            <input 
                                            type="text" 
                                            id="project-name" 
                                            value={clientID}
                                            onChange={(e)=>setClientID(e.target.value)}
                                            onBlur={handleClientIdBlur}
                                            class="bg-dark-secondary border border-green-300 text-white text-sm rounded focus:ring-grean-500 focus:border-green block w-full p-2.5" />
                                             {idError && <span className='py-2 text-red-500'>{idError}</span>}
                                        </div>
                                    </div>
                                    <div className="project-name">
                                        <div class={`mb-5 ${styles.projectForm}`}>
                                            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Budget </label>
                                            <input 
                                            type="text" 
                                            id="project-name" 
                                            value={budget}
                                            onChange={(e)=>setBudget(e.target.value)}
                                            onBlur={handleClientIdBlur}
                                            class="bg-dark-secondary border border-green-300 text-white text-sm rounded focus:ring-grean-500 focus:border-green block w-full p-2.5" />
                                             {idError && <span className='py-2 text-red-500'>{idError}</span>}
                                        </div>
                                    </div>
                                    <div className="project-date-picker">
                                    <div className={`mb-4 ${styles.projectForm}`}>
                                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Timeline</label>
                                            <div className="flex items-center">
                                            <div className="relative max-w-sm">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                </svg>
                                                </div>
                                                <DatePicker
                                                selected={start_date}
                                                onChange={date => setStart_date(date)}
                                                selectsStart
                                                startDate={start_date}
                                                endDate={end_date}
                                                className="bg-dark-secondary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                                placeholderText="Select Start"
                                                />
                                            </div>
                                            <span className="mx-4 text-gray-500">to</span>
                                            <div className="relative max-w-sm">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                </svg>
                                                </div>
                                                <DatePicker
                                                selected={end_date}
                                                onChange={date => setEnd_date(date)}
                                                selectsEnd
                                                startDate={start_date}
                                                endDate={end_date}
                                                minDate={start_date}
                                                className="bg-dark-secondary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                                placeholderText="Select Deadline"
                                                />
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                   <div className="form-btn mt-5">
                                    <button 
                                    onClick={handleSubmit}
                                    type="submit" className="w-full text-white text-sm border border-gray-600 rounded py-2 hover:bg-green hover:font-bold">
                                        Create Project.
                                    </button>
                                   </div>

                                </form>
                            </div>
                        </div>
                        <div className="section col-span-2">
                            <Image
                                src="/darklist.png"
                                width={820}
                                height={540}
                                alt="Picture of the author"
                                className={` rounded-lg `}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page