"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';

const Invoice = ({formData}) => {


    const [totalDue, setTotalDue] = useState(0);

    const handleGeneratePdf = () => {
		const doc = new jsPDF();
		// Adding the fonts.
		doc.setFont('Inter-Regular', 'normal');
     
        // doc.save('Invoice.pdf');

		doc.html(componentRef.current, {
			async callback(doc) {
				await doc.save('document');
			},
		});
	};



    useEffect(() => {
        if (formData && formData.items) {
            const total = formData.items.reduce((acc, item) => {
                const itemAmount = item.cost * item.quantity;
                return acc + itemAmount;
            }, 0);
            setTotalDue(total);
        }
    }, [formData]);


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    

  return (
    <>
        {/* Invoice */}
      
            <div 
            ref={componentRef}
            className=" px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10 w-full">
                <div className=" mx-auto">
                {/* Card */}
                <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl ">
                    {/* Grid */}
                    <div className="flex justify-between">
                    <div>
                    <Image
                            src="/logo.png"
                            width={100}
                            height={100}
                            alt="Picture of the author"
                            />
                    </div>
                    {/* Col */}
                    <div className="text-end">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 ">
                        Invoice #
                        </h2>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-700">{formData._id}</span>
                            <br />
                            <span className={`inline-block px-2 py-1 text-xs font-semibold leading-none`}>
                                {formData.status}
                            </span>
                        </div>
                        
                      
                    </div>
                    {/* Col */}
                    </div>
                    {/* End Grid */}
                    {/* Grid */}
                    <div className="mt-8 grid sm:grid-cols-2 gap-3">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 ">
                        Bill to:
                        </h3>
                        <h3 className="text-lg font-semibold text-gray-800 ">
                        {formData.clientID.name}
                        </h3>
                        <address className="mt-2 not-italic text-gray-700">
                        {formData.clientID.address.city}
                        <br />
                        {formData.clientID.address.state}
                        <br />
                        {formData.clientID.address.zipcode}
                        <br />
                        </address>
                    </div>
                    {/* Col */}
                    <div className="sm:text-end space-y-2">
                        {/* Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800 ">
                             Due date:
                            </dt>
                            <dd className="col-span-2 text-gray-700">
                                {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : 'N/A'}
                            </dd>
                        </dl>
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800 ">
                            Invoice date:
                            </dt>
                            <dd className="col-span-2 text-gray-700">
                            {formData.dateInvoiced ? new Date(formData.dateInvoiced).toLocaleDateString() : 'N/A'}

                            </dd>
                        </dl>
                        </div>
                        {/* End Grid */}
                    </div>
                    {/* Col */}
                    </div>
                    {/* End Grid */}
                    {/* Table */}
                    <div className="mt-6">
                    <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                        <div className="hidden sm:grid sm:grid-cols-5">
                        <div className="sm:col-span-2 text-xs font-medium text-gray-700 uppercase">
                            Item
                        </div>
                        <div className="text-start text-xs font-medium text-gray-700 uppercase">
                            Qty
                        </div>
                        <div className="text-start text-xs font-medium text-gray-700 uppercase">
                            Rate
                        </div>
                        <div className="text-end text-xs font-medium text-gray-700 uppercase">
                            Amount
                        </div>
                        </div>
                        <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700" />
                        
                        <div className="sm:hidden border-b border-gray-200 dark:border-gray-700" />
                        {formData.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                <div className="col-span-full sm:col-span-2">
                                    <p className="font-medium text-gray-800">
                                        {item.itemName}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="sm:hidden text-xs font-medium text-gray-700 uppercase">
                                        Qty
                                    </h5>
                                    <p className="text-gray-800">{item.quantity}</p>
                                </div>
                                <div>
                                    <h5 className="sm:hidden text-xs font-medium text-gray-700 uppercase">
                                        Rate
                                    </h5>
                                    <p className="text-gray-800">{item.cost}</p>
                                </div>
                                <div>
                                    <h5 className="sm:hidden text-xs font-medium text-gray-700 uppercase">
                                        Amount
                                    </h5>
                                    <p className="sm:text-end text-gray-800">
                                        ${item.cost * item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                      
                       
                    </div>
                    </div>
                    {/* End Table */}
                    {/* Flex */}
                    <div className="mt-8 flex sm:justify-end">
                    <div className="w-full max-w-2xl sm:text-end space-y-2">
                        {/* Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                        
                                <dl className="grid sm:grid-cols-5 gap-x-3">
                                    <dt className="col-span-3 font-semibold text-gray-800 ">
                                    Total:
                                    </dt>
                                    <dd className="col-span-2 text-gray-700">
                                    ${totalDue}
                                    </dd>
                                </dl>
                                <dl className="grid sm:grid-cols-5 gap-x-3">
                                    <dt className="col-span-3 font-semibold text-gray-800 ">
                                    Due balance:
                                    </dt>
                                    <dd className="col-span-2 text-gray-700">
                                    ${totalDue}
                                    </dd>
                                </dl>
                        </div>
                        {/* End Grid */}
                    </div>
                    </div>
                    {/* End Flex */}
                    <div className="mt-8 sm:mt-12">
                    <h4 className="text-lg font-semibold text-gray-800 ">
                        Thank you!
                    </h4>
                    <p className="text-gray-700">
                        {formData.invoiceNote}
                    </p>
                    
                    </div>
                   
                </div>
                {/* End Card */}
                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-x-3">
                    <button
                    onClick={handlePrint}
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-900 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-grean-600 transition-all text-sm  0"
                    href="#"
                    >
                    <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1={12} x2={12} y1={15} y2={3} />
                    </svg>
                    Invoice Print
                    </button>
                    
                </div>
                
                {/* End Buttons */}
                </div>
            </div>
        {/* End Invoice */}
    </>

  )
}

export default Invoice