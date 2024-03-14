"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/accounts.module.scss';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const secondSectionRef = useRef(null);
    const router = useState()

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    
        // Scroll to the second section when the client option is selected
        if (value === 'client' && secondSectionRef.current) {
          secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        if (value === 'freelancer') {
            router.push('/accounts/profile-setup');
          }

      };


  return (
    <>
      <section className={` ${styles.onboardingContainer}  flex items-center justify-center `}>
        <div className="container ">
          <div className="pageTT text-center">
            <h1 className="font-bold text-black text-3xl">
              What Do you Do ?
            </h1>
            <p className='text-sm mt-3'>
              We'd like to know who you are, for better system customization.
            </p>
          </div>
          <div className="onboardingCont flex items-center justify-center">
            <div className={` ${styles.card} grid grid-cols-2 gap-4 items-center justify-center p-6`} >
              <div className={` ${styles.Radio} p-4 border border-gray-400 hover:border-2 hover:border-green rounded p-4`}>
                <input
                  type="radio"
                  id="freelancer"
                  name="status"
                  value="freelancer"
                  className="hidden"
                  required
                  onChange={() => handleOptionChange('freelancer')}
                />
                <label htmlFor="freelancer" className="cursor-pointer peer-checked:border-green">
                  <Image height={150} width={150} src="/Freelancer.svg" alt="" />
                  <h2 className='text-green'>
                    I'm a freelancer
                  </h2>
                  <p className='text-sm'>
                    I'm looking to make my workflow easier when providing my services.
                  </p>
                </label>
              </div>
              <div className={` ${styles.Radio} p-4  border border-gray-400 hover:border-2 hover:border-green rounded p-4`}>
                <input
                  type="radio"
                  id="client"
                  name="status"
                  value="client"
                  className="hidden"
                  required
                  onChange={() => handleOptionChange('client')}
                />
                <label htmlFor="client" className="cursor-pointer peer-checked:border-green">
                  <Image className='text-center' height={200} width={200} src="/Customer.svg" alt="" />
                  <h2 className='text-green'>
                    I'm a client
                  </h2>
                  <p className='text-sm'>
                    I'm looking forward to having a smooth client experience with my service provider.
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* conditionally render the second section only when the client section is clicked */}
      {selectedOption === 'client' && (
        <section  ref={secondSectionRef} className={` ${styles.onboardingContainer}  flex items-center justify-center `}>
          <div className="container ">
            <div className="pageTT text-center">
              <h1 className="font-bold text-green text-3xl">
                Unlock Your Account !
              </h1>
            </div>
            <div className="onboardingCont flex items-center justify-center">
                    <form className="max-w-sm mx-auto">
                        <label
                            htmlFor="zip-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            ZIP code:
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none ">
                            <svg
                                className="w-4 h-4 text-gray-700 dark:text-gray-700"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 20"
                            >
                                {/* Your key icon path goes here */}
                                <path d="M8 0C5.78 0 4 1.78 4 4v8h8V4c0-2.22-1.78-4-4-4zm-1 16v2h2v-2H7z" />
                            </svg>

                            </div>
                            <input
                            type="text"
                            id="code-input"
                            aria-describedby="helper-text-explanation"
                            className="bg-white border border-green text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full ps-10 p-2.5 "
                            placeholder="12345 or 12345-6789"
                            pattern="^\d{5}(-\d{4})?$"
                            required=""
                            />
                        </div>
                        <p
                            id="helper-text-explanation"
                            className="mt-2 text-sm text-gray-600 "
                        >
                            To complete your account setup and ensure a secure experience, please enter the verification code provided by your respective freelancer. 

                        </p>
                    </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Page;
