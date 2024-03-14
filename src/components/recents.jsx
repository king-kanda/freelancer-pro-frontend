"use client"

import React, { useEffect, useState  } from 'react';

const InvoiceList = () => {
    const [invoiceData, setInvoiceData] = useState([]);
  
    useEffect(() => {
      // Fetch invoice data from your API
      const fetchInvoiceData = async () => {
        try {
        
          const response = await fetch('http://localhost:8080/api/v1/invoices'); // Replace 'your_api_endpoint' with the actual API endpoint
          const data = await response.json();
          setInvoiceData(data);
        } catch (error) {
          console.error('Error fetching invoice data:', error);
        }
      };
  
      fetchInvoiceData();
    }, []); // Empty dependency array ensures that the effect runs once when the component mounts
  
    
    
    return (
        <div className="bg-white border border-gray-100 shadow-md p-6 rounded-md mt-6">
        <div className="font-medium mb-4">Invoice List</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px]">
            <thead>
              <tr>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                  Client Name
                </th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                  Amount
                </th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                  Due Date
                </th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((invoice) => (
                <tr key={invoice._id}>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                        {invoice.clientName}
                      </a>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className={`text-[13px] font-medium ${invoice.status === 'paid' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {invoice.status === 'paid' ? `+$${invoice.amount}` : `-$${invoice.amount}`}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[12px] text-gray-600">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className={`inline-block p-1 rounded ${invoice.status === 'paid' ? 'bg-grean-200 text-grean-700' : 'bg-red-200 text-red-500'} font-medium text-[12px] leading-none`}>
                      {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default InvoiceList;