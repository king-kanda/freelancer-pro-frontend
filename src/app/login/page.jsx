'use client'

import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import Link from 'next/link'
import styles from './style.module.scss'
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Login = () => {

    const { user , googleSignIn , signInWithEmail} = UserAuth()
    const [email,setEmail] = useState()
    const [password ,setPassword] = useState()
    const [error , setError] = useState()

    const router = useRouter();

    const handleSignIn = async () =>{
        try{
            await googleSignIn();
            if(user){
                router.push('/dashboard');
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleEmailSignIn = async (e) =>{
        e.preventDefault();

        try {

            await signInWithEmail(email,password);
            console.log('sing in ')
            if(user){

                router.push('/dashboard');
            }

        } catch (error) {
            // Handle errors here
            console.error(error);
            if (error.code === 'auth/wrong-password' ) {
                setEmailError('Wrong PassWord');
              } else {
                console.log('Error creating account. Please try again.');
              }
              if (error.code === 'auth/invalid-email' ) {
                setEmailError('Invalid Email');
              } else {
                console.log('Error creating account. Please try again.');
              }
            
        }
    }


    return (
        <>
            <section className={` ${styles.loginContainer} `}>
                <div className={` ${styles.cardContainer} `}>
                    <div className={` ${styles.loginCard} px-12 py-6 mt-10`}>
                        <div className={` ${styles.logo} `}>
                            
                        </div>
                        <div className={` ${styles.title} my-2`}>
                           <h1>
                                Welcome Back!
                           </h1>
                        
                        </div>
                        <form className="space-y-6" action="">
                            <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 focus:outline-grean-200 sm:text-sm sm:leading-6"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            </div>

                            <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                                </label>
                                <div className="text-xs">
                                <a href="#" className="text-grean-500">
                                    Forgot password?
                                </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-grean-600 focus:outline-grean-200 sm:text-sm sm:leading-6"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            </div>

                            <div>
                            <button
                                type="submit"
                                onSubmit={handleEmailSignIn}
                                className="flex w-full justify-center rounded-md bg-grean-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grean-600"
                            >
                                Sign in
                            </button>
                            </div>
                        </form>


                        {/* or text */}
                        <div className="flex items-center justify-center space-x-4 my-2">
                            <div className="border-t border-gray-600 flex-grow"></div>
                            <span className="text-gray-700">OR</span>
                            <div className="border-t border-gray-600 flex-grow"></div>
                        </div>
                        {/* auth btns */}
                         <div className={` ${styles.signupbtn} `}>
                            
                            <button
                                type="submit"
                                onClick={handleSignIn}
                                className="text-black w-full border border-black font-medium rounded-full  text-sm mt-2 px-5 py-2.5 focus:outline-none"
                            >
                                <p className="inline-flex items-center justify-between">
                                  <span className="loginIcons mx-2"><FcGoogle /> </span> Continue With Google
                               </p> 
                            </button>
                           
                         </div>
                         {/* dont have an account */}
                         <div className="signUp m-4">
                            <p className="text-sm text-gray-600">Don't Have an account ? <span className="font-bold underline text-black"> <Link href="/signup">Sign Up</Link></span> </p>
                         </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;