"use client";
import { useState , useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/accounts.module.scss';
import { FaPen } from "react-icons/fa";
import Link from 'next/link';
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const { user } = UserAuth();

    console.log(user)

    useEffect(()=>{

        if(!user){
            router.push('/login');
            console.log('wozzza')
        }
       
    },[user , router])

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userType, setUserType] = useState('freelancer');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
   


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit triggered")
        // Combine individual state variables into formData
        const formData = {
            fullName,
            email,
            phoneNumber,
            userType,

            street,
            city,
            state,
            zipCode,
        };

        console.log(formData)
        try {
            const response = await fetch('http://localhost:8080/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('User data submitted successfully');
                // Handle success, e.g., show a success message to the user
                router.push('/projects/blank');
            } else {
                console.error('Failed to submit user data');
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error submitting user data:', error);
        }
    };


    console.log(user);

    if (!user) {
        return (
            <div className='flex items-center justify-center h-screen bg-dark-primary'>
                <div role="status ">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="text-white">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="p-12 bg-dark-secondary">
                <div className="flex flex-wrap -mx-5 ">
                    {/* Left Column */}
                    <div className="w-full md:w-1/4 px-4">
                        <div className="card bg-dark-tertiary rounded-sm p-6">
                            <div className="card-body">
                                <div className={` ${styles.accountSettings}`}>
                                    <div className="user-profile m-5 text-center">
                                        <div className={` ${styles.penTooltip}   flex items-center justify-center`}>
                                            <FaPen />
                                        </div>
                                        <div className={` ${styles.avatar} flex items-center justify-center`}>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                alt="Maxwell Admin"
                                                className="w-full"
                                            />
                                        </div>
                                        <h5 className="user-name mt-3 font-bold text-white text-xl text-center">
                                           {user.displayName}
                                        </h5>
                                        <h6 className="user-email text-gray-500 text-sm text-center">
                                            {user.email ?? 'example@gmail.com'}
                                        </h6>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="w-full md:w-3/4 px-4 bg-dark-tertiary rounded-sm p-6">
                        <form 
                        action=""
                        onSubmit={handleSubmit}
                        >

                        <div className="card h-100">
                            <div className="card-body">
                                {/* Personal Details Form */}
                                <div className="mb-4 md:col-span-2">
                                    <h6 className="mb-2 text-green font-bold text-xl">Personal Details</h6>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                                    {/* Personal Details Section */}
                                    <div className="mb-3">
                                        <label htmlFor="fullName" className='block mb-2 text-sm font-medium text-white'>Full Name</label>
                                        <input
                                            type="text"
                                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:ring-green focus:ring-1 focus:border-green block w-4/5 p-2.5"
                                            id="fullName"
                                            value={ fullName || user.displayName }
                                            onChange={(e) => setFullName(e.target.value)}
                                           
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="eMail" className='block mb-2 text-sm font-medium text-white'>Email</label>
                                        <input
                                            type="email"
                                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:ring-green focus:ring-1 focus:border-green block w-4/5 p-2.5"
                                            id="eMail"
                                            value={email || user.email }
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter email ID"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className='block mb-2 text-sm font-medium text-white'>Phone</label>
                                        <input
                                            type="text"
                                            className=" border border-gray-900 text-gray-900 text-sm rounded-lg   focus:outline-none focus:ring-green focus:ring-1 focus:border-green block w-4/5 p-2.5"
                                            id="phone"
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-white ">What's your current role</label>
                                        <select id="countries" className="border border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:ring-green focus:ring-1 focus:border-green block w-4/5 p-2.5"
                                        // value={currentRole}
                                        // onChange={(e) => setCurrentRole(e.target.value)}
                                        >
                                            <option value="">Choose your current role</option>
                                            <option value="manager">Manager </option>
                                            <option value="director">Director</option>
                                            <option value="freelancer">Freelancer</option>
                                            <option value="business owner">Business Owner</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Address Section */}
                                <div className="mb-4 md:col-span-2 mt-5">
                                    <h6 className="mb-2 text-green font-bold text-xl">Address</h6>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                                    <div className="mb-2">
                                        <label className='block mb-2 text-sm font-medium text-white' htmlFor="Street">Street</label>
                                        <input
                                            type="text"
                                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:ring-green focus:ring-1 focus:border-green block w-4/5 p-2.5"
                                            id="Street"
                                            placeholder="Enter Street"
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className='block mb-2 text-sm font-medium text-white' htmlFor="Street">City</label>
                                        <input
                                            type="text"
                                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:ring-green focus:ring-1 focus:border-green block w-4/5 p-2.5"
                                            id="City"
                                            placeholder="Enter City Name"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className='block mb-2 text-sm font-medium text-white' htmlFor="Street">State</label>
                                        <input
                                            type="text"
                                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:ring-green focus:ring-1 focus:border-green block w-4/5 p-2.5"
                                            id="State"
                                            placeholder="Enter State"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className='block mb-2 text-sm font-medium text-white' htmlFor="Street">Zip Code</label>
                                        <input
                                            type="text"
                                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg   focus:outline-none focus:ring-green focus:ring-1 focus:border-green block w-4/5 p-2.5"
                                            id="Zip Code"
                                            placeholder="Enter Zip Code"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* submit and update buttons */}
                                <div className='mt-5 '>
                                    <button type='submit' className="px-6 py-3 bg-green text-white rounded">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
