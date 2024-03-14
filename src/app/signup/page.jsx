'use client'

import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import styles from '@/styles/signup.module.scss'
import Link from 'next/link'
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Page = () => {

    const { user , googleSignIn } = UserAuth()
    
    const router = useRouter();
    const handleSignIn = async () =>{
        try{
            await googleSignIn();
            if(user){
                router.push('/accounts/profile-setup');
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <section className={` ${styles.pageCont}`}>
                <div className="grid grid-cols-3 gap-0 items-center">
                    <div className={`col-span-2 p-6 bg-green ${styles.imgSec}`}>
                        {/* img  section */}
                    </div>

                    <div className="form-section p-6 ">

                        <div className={` ${styles.formHeading} mb-6`}>
                            <h1>
                                Work With Ease
                            </h1>
                            <h3>Join us today</h3>
                        </div>
                        <div className="button-sections">
                            <button
                                type="submit"
                                className="w-full border border-black  font-medium rounded-full text-sm mt-2 px-5 py-2.5 focus:outline-none"
                            >
                               <p className="inline-flex items-center justify-between">
                                  <span className="loginIcons mx-2"> <BsFacebook /> </span> Continue With Facebook
                               </p> 
                            </button>
                            <button
                                type="submit"
                                className="w-full border border-black  font-medium rounded-full text-sm mt-2 px-5 py-2.5 focus:outline-none"
                                onClick={handleSignIn}
                            >
                               <p className="inline-flex items-center justify-between">
                                  <span className="loginIcons mx-2"> <FcGoogle /> </span> Continue With Google
                               </p> 
                            </button>
                        </div>
                        <div className="flex items-center justify-center space-x-4 my-4">
                            <div className="border-t border-gray-600 flex-grow"></div>
                            <span className="text-gray-700">OR</span>
                            <div className="border-t border-gray-600 flex-grow"></div>
                        </div>
                           <Link href="/signup/email-signup">
                            <button
                                    type="submit"
                                    className="w-full bg-green hover:bg-gray-400 text-white hover:text-green  font-medium rounded-full text-sm mt-2 px-5 py-2.5 focus:outline-none"
                                >
                                    Sign up with Phone or Email
                                
                                </button>
                           </Link>
                            <div className="term-of-service mt-4">
                                <p className="text-sm text-gray-600">
                                    By signing up, you agree to the Terms of Service and 
                                    Privacy Policy, including cookie use.
                                </p>
                            </div>
                            <div className="mt-6">
                                <p className="font-semibold mb-2">
                                    Already Have an account?
                                </p>
                                 <Link href="/login">
                                    <button
                                            type="submit"
                                            className="w-full border border-black  font-medium rounded-full text-sm mt-2 px-5 py-2.5 focus:outline-none"
                                            >
                                        <p className="inline-flex items-center justify-between">
                                            Login
                                        </p> 
                                    </button>    
                                </Link>       
                            </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
}

export default Page;