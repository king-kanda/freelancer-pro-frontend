"use client"

import { ClientAutoSuggest, Invoice } from '@/components'
import React, { useState, useEffect } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


const Page = ( {params:{invoiceId}} ) => {

    console.log(invoiceId)
    const { user } = UserAuth();
    const [selectedClientId, setSelectedClientId] = useState('');
    const [formData, setFormData] = useState({
        clientID: selectedClientId,
        freelancerID: user.uid,
        invoiceNote: '',
        items: [{ itemName: '', cost: '', quantity: '', total: '', discounts: '' }],
        invoiceTotal: '',
        status: '',
        paymentDate: '',
        dueDate: '',
    });

    useEffect(() => {

        const fetchInvoiceData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/invoices/${invoiceId}`);
                if (response.ok) {
                    const invoiceData = await response.json();
                    console.log(invoiceData);
                    console.log('wozza')
                    setFormData(invoiceData);
                } else {
                    throw new Error('Failed to fetch invoice data');
                }
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };

        fetchInvoiceData();
     
    }, [invoiceId]);

    


    const handleSelectClient = (clientId) => {
      setSelectedClientId(clientId);
    };
  

    const handleDueDateChange = (e) => {
        setFormData({ ...formData, dueDate: e.target.value });
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'itemName' || name === 'cost' || name === 'quantity' || name === 'discounts') {
            const items = [...formData.items];
            items[index][name] = value;
    
            // Calculate total cost for the item
            const total = calculateTotal(items[index]);
            items[index]['total'] = total;
    
            // Calculate total invoice cost
            const invoiceTotal = calculateInvoiceTotal(items);
    
            setFormData({ ...formData, items, invoiceTotal });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    // Function to calculate total cost for an item
    const calculateTotal = (item) => {
        const cost = parseFloat(item.cost);
        const quantity = parseFloat(item.quantity);
        const discounts = parseFloat(item.discounts) || 0;
    
        const total = (cost * quantity) - discounts;
        return total.toFixed(2); // Assuming you want to round the total to 2 decimal places
    };
    
    // Function to calculate total invoice cost
    const calculateInvoiceTotal = (items) => {
        let totalCost = 0;
        items.forEach(item => {
            totalCost += parseFloat(item.total);
        });
        return totalCost.toFixed(2); // Assuming you want to round the total to 2 decimal places
    };

    const handleAddItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { itemName: '', cost: '', quantity: '', total: '', discounts: '' }],
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Assuming formData is defined somewhere in your code with default values for clientID and freelancerId
        // Replace 'your-api-endpoint' with your actual API endpoint
        try {
            const response = await fetch(`http://localhost:8080/api/v1/invoices/${invoiceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            // Handle response
            if (response.ok) {
                console.log('Form data submitted successfully:', response);
                // Optionally, you can reset the form after successful submission
                setFormData({
                    clientID: '', // Set default value for clientID
                    freelancerId: '', // Set default value for freelancerId
                    invoiceNote: '',
                    items: [{ itemName: '', cost: '', quantity: '', total: '', discounts: '' }],
                    invoiceTotal: '',
                    status: '',
                    paymentDate: '',
                    dueDate: '',
                });
            } else {
                throw new Error('Failed to submit form data');
            }
        } catch (error) {
            // Handle error
            console.error('Error submitting form data:', error);
        }
    };
    
    

    return (
        <>
            <div className="mx-12 mt-12 grid grid-cols-3 gap-6">
                <div className="col-span-1 col-form-details">
                    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-md p-6 rounded-md mt-6 w-96 placeholder-gray-700">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Create Invoice</h2>
                        </div>
                        <div>
                            <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="overdue">Overdue</option>
                            <option value="sent">Sent</option>
                            </select>
                        </div>
                       
                        </div>

                        <div className="mb-4 grid grid-cols-1 gap-4 MT-4">
                        <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                    placeholder="Select due date"
                                    value={formData.clientID.name}
                            
                                />
                        <ClientAutoSuggest className="hidden bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onSelectClient={handleSelectClient} />
                           
                            <div className="relative max-w-sm">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg
                                    className="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    >
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                    placeholder="Select due date"
                                    value={formData.dueDate}
                                    onChange={handleDueDateChange}
                                />
                            </div>


                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium text-gray-700">Items</label>
                                    <button type="button" onClick={handleAddItem} className="mt-2 text-xl">
                                        <CiCirclePlus />
                                    </button>
                                </div>
                               
                                {formData.items.map((item, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-4 mt-2 border-b border-gray-200">
                                        <div className='col-span-2'>
                                            <input
                                                type="text"
                                                name="itemName"
                                                value={item.itemName}
                                                onChange={(e) => handleChange(e, index)}
                                                placeholder="Item Name"
                                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-grean-500 focus:border-grean-500 block w-full p-2.5 "
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                name="cost"
                                                value={item.cost}
                                                onChange={(e) => handleChange(e, index)}
                                                placeholder="Price"
                                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-grean-500 focus:border-grean-500 block w-full p-2.5"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleChange(e, index)}
                                                placeholder="Quantity"
                                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-grean-500 focus:border-grean-500 block w-full p-2.5"
                                            />
                                        </div>
                                    </div>
                                ))}
                                
                            </div>

                            <textarea
                                id="invoiceNote"
                                name="invoiceNote"
                                value={formData.invoiceNote}
                                onChange={handleChange}
                                placeholder="Invoice Note"
                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-grean-500 focus:border-grean-500 block w-full p-2.5 "
                            />
                            {/* Add similar input fields for other details */}
                        </div>

                        <button type="submit" className="bg-grean-500 text-white py-2 px-4 rounded-md mr-2">Submit</button>
                    </form>
                </div>
                <div className="col-span-2 col-invoice-display">
                    {/* <Invoice /> */}
                </div>
            </div>
        </>
    )
}

export default Page
