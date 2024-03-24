"use client"

import { Invoice } from '@/components'
import React, { useEffect, useState } from 'react'

const Page = ({ params: { invoiceId } }) => {

    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [reminder, setReminder] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/invoices/${invoiceId}`);
                if (response.ok) {
                    const invoiceData = await response.json();
                    setFormData(invoiceData);
                } else {
                    throw new Error('Failed to fetch invoice data');
                }
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            } finally {
                setLoading(false); // Mark loading as false after fetching data
            }
        };

        fetchInvoiceData();
     
    }, [invoiceId]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleReminderChange = (event) => {
        setReminder(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can implement sending the reminder to the specified email address
        console.log(`Sending reminder to ${email} for: ${reminder}`);
        // You can reset the form fields here if needed
        setEmail('');
        setReminder('');
    };


    const sendInvoiceByEmail = async (invoiceHTML, recipientEmail) => {
        try {
          const response = await fetch('/api/send-invoice', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ invoiceHTML, recipientEmail }),
          });
          const data = await response.text();
          alert(data); // Show success or error message
        } catch (error) {
          console.error('Error sending invoice:', error);
          alert('Error sending invoice');
        }
      };

    if (loading) {
        return <div>Loading...</div>; // Render loading page if data is still loading
    }

    return (
        <div className="mx-12 mt-8">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <Invoice formData={formData} />
                </div>
                {/* <div className="col-span-1">
                    
                    <form onSubmit={handleSubmit} className="mt-12 bg-green-100 p-8 rounded-lg">
                    <h1>
                        Send Invoice
                    </h1>
                        <div className='mt-4'>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address:</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={handleEmailChange} 
                                className="mt-1 p-2 block w-full border border-gray-700 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 "
                                required 
                            />
                        </div>
                        <div className='mt-3'> 
                            <label htmlFor="reminder" className="block text-sm font-medium text-gray-700">Message:</label>
                            <input 
                                type="text" 
                                id="reminder" 
                                value={message} 
                                onChange={handleMessageChange} 
                                className="mt-1 p-2 block w-full border border-gray-700 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 "
                                required 
                            />
                        </div>
                        <div className='mt-3'> 
                            <label htmlFor="reminder" className="block text-sm font-medium text-gray-700">Reminder:days</label>
                            <input 
                                type="number" 
                                id="reminder" 
                                value={reminder} 
                                onChange={handleReminderChange} 
                                className="mt-1 p-2 block w-full border border-gray-700 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 "
                                required 
                            />
                        </div>
                        <button type="submit" className="bg-grean-500 hover:bg-grean-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50 mt-6"
                        onClick={() => sendInvoiceByEmail('<div>Your invoice content goes here</div>', 'stevenokanda@gmail.com ')}>
                        
                            Send Invoice
                        </button>
                    </form>
                </div> */}
            </div>
        </div>
    );
}

export default Page;
