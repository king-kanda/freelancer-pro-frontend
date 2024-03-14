"use client"

import React ,{ useRef }  from 'react'
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiCoinflip, GiWallet } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";
import { Recents, StatusDonught } from '@/components';
import { MdLocalPrintshop } from "react-icons/md";
import { useReactToPrint } from 'react-to-print';


const page = () => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
  return (

    <>
     {/* 
    filter section and print btn
    */}
    <div className="div mx-12 mt-8">
        <div className="mx-6">
            <div className="flex items-center justify-between">
                <div className="filter-section">
                    Filter
                </div>
                <div className="print-section">
                    <button 
                    onClick={handlePrint}
                    className="bg-orange-500 text-white px-4 py-1.5 inline-flex items-center justify-center rounded">
                        <span>
                        <MdLocalPrintshop />
                        </span>
                        Print
                    </button>
                </div>
            </div>
        </div>
    </div>

        {/* wrapp all this with react to print */}

        <div 
        ref={componentRef}
        className="printableComponent">
            <div className="py-6 mx-6">
                <div className="grid grid-cols-4 gap-6 mx-12">

                    <div className="card-chat bg-dark-secondary p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="icon bg-blue-100 p-2 rounded ">
                                <span  className="text-4xl text-blue-500 ">
                                    <MdAccountBalanceWallet />
                                </span>
                            </div>
                            <div className="stats text-white">
                                <span className={` text-sm  `}>
                                    Balance
                                </span>
                                <h3 className={` font-bold  `}>
                                    200,000 Ksh
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="card-chat bg-dark-secondary p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="icon bg-grean-100 p-2 rounded ">
                                <span  className="text-4xl text-grean-500 ">
                                    <GiWallet />
                                </span>
                            </div>
                            <div className="stats text-white">
                                <span className={` text-sm  `}>
                                    Income
                                </span>
                                <h3 className={` font-bold  `}>
                                    70,000 Ksh
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="card-chat bg-dark-secondary p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="icon bg-purple-100 p-2 rounded ">
                                <span  className="text-4xl text-purple-500 ">
                                    <GiCoinflip />
                                </span>
                            </div>
                            <div className="stats text-white">
                                <span className={` text-sm  `}>
                                    Expenses
                                </span>
                                <h3 className={` font-bold  `}>
                                    8,000 Ksh
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="card-chat bg-dark-secondary p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="icon bg-orange-100 p-2 rounded ">
                                <span  className="text-4xl text-orange-500 ">
                                    <GoTrophy />
                                </span>
                            </div>
                            <div className="stats text-white">
                                <span className={` text-sm  `}>
                                    Goal 
                                </span>
                                <h3 className={` font-bold  `}>
                                    40,000 Ksh
                                </h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        
            {/* graphs and stats */}
            <div className="grid grid-cols-2 gap-5 mx-12">
                <div className="col-span-1 graph-area mx-6">
                    <StatusDonught/>
                </div>
                <div className="col-span-1 recents-area mx-6">
                
                </div>
                {/* Recents logs fro invoice payemnnts  */}
            
            </div>
            <div className="mx-12">
                    <div className="card-holder mx-6">
                        <Recents/>
                    </div>
            </div>  

        </div>
           
     
    </>
  )
}

export default page