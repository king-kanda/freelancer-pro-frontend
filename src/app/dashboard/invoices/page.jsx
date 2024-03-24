"use client"
import React, { useEffect, useRef, useState } from 'react';
import { CiCirclePlus, CiExport, CiPen } from 'react-icons/ci';
import Link from 'next/link'
import { UserAuth } from '@/context/AuthContext'; 
import { StatusDonught } from '@/components';
import { FaRegEye } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import ProjectStatusChart from '@/components/analysis';

const PrintHeader = () => (
  <div className="print-header my-4 mx-12 p-4 text-center hidden ">
    <div className="logo-section text-center">
      <img src="./logo.png" alt="Logo" className="logo" />
    </div>
    <h1 className='text-2xl font-bold'>Financials </h1>
    <p>This report contains information about invoices.</p>
  </div>
);

// Footer Component for Printing
const PrintFooter = () => (
  <div className="print-footer mx-12 my-4 p-4 text-center text-sm hidden" >
    <p>Generated at: {new Date().toLocaleString()}</p>
    <p>All rights reserved. Random Location, Inc.</p>
  </div>
);

const InvoiceList = () => {

  const { user } = UserAuth() 
  const [loading, setLoading] = useState(true);
  const [invoiceData, setInvoiceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    

  useEffect(() => {
    // Check if user data is loaded
    if (user) {
        setLoading(false); // Once user data is loaded, set loading to false
        console.log(user.uid);
    }
}, [user]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/invoices?userId=${user.uid}`);
        const data = await response.json();
        setInvoiceData(data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleDateFilter = (date) => {
    setDateFilter(date);
  };

  const generateInitials = (name) => {
    const initials = name.split(' ').map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
  };

  const filteredInvoices = invoiceData.filter((invoice) => {
    const matchesSearch = invoice.clientID.name.toLowerCase().includes(searchQuery.toLowerCase()) || invoice.clientID.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    const matchesDate = !dateFilter || new Date(invoice.dateInvoiced).toDateString() === new Date(dateFilter).toDateString();
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Function to generate random background color
  const getRandomColor = () => {
    const colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
    {/* info */}
    <div className="flex justify-between items-center mb-4 mt-24 mx-12">
        <h2 className="text-lg font-semibold">Invoices</h2>
        <div className="flex items-center">
            <button 
            onClick={handlePrint}
            className="bg-gray-100 border border-green  text-green py-2 px-4 rounded-md mr-2 inline-flex items-center justify-center gap-3 font font-bold">
            <CiExport />
                Export</button>
           <Link href="/dashboard/invoices/add">
           <button className="bg-grean-500 text-white py-2 px-4 rounded-md inline-flex items-center justify-between gap-4 font-bold">
            <CiCirclePlus />
                 Add Invoice</button>
           </Link>
        </div>
    </div>

    {/* tally stats */}

    

    {/* filter */}
    <div className="bg-white border border-gray-100  p-6 rounded-md mt-6 mx-8">
     
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by client name or email"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <button className="bg-grean-500 text-white py-2 px-4 rounded-md" onClick={() => handleSearch('')}>Clear</button>
        </div>
        <div className="flex items-center">
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-2"
          >
            <option value="">Select status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => handleDateFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
        </div>
      </div>
      
    </div>

    <div  ref={componentRef}>


      <PrintHeader className="hidden" />
    <div className="grid grid-cols-3 gap-5 mx-12">
        <div className="col-span-1 graph-area mx-6">
            <StatusDonught user={user}/>
        </div>
        <div className="col-span-2 recents-area mx-6">
            <ProjectStatusChart user={user} />
        </div>
    </div>
    {/* Recents logs fro invoice payemnnts  */}
    {/* tables */}
    <div className="bg-white border border-gray-100 p-6 mt-3 mx-8">
    
      <div className="overflow-x-auto ">
        <table className="w-full min-w-[460px]">
          <thead>
            <tr>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Client Name
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Client Email
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Invoice Number
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Status
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Amount
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Due Date
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Date Invoiced
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className="py-2 px-4 border-b border-b-gray-50">
                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 flex items-center gap-x-3">
                  <div
                              className="inline-block size-[38px] rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: getRandomColor() }}
                            >
            
                        {generateInitials(invoice.clientID.name)}
                     
                    </div>
                    <span className="text-black text-sm font-medium">{invoice.clientID.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-black text-sm">{invoice.clientID.email}</span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <p className="text-black text-sm">{invoice._id.slice(-5)}</p>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className={`inline-block p-1 rounded ${invoice.status === 'paid' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-500'} font-medium text-[12px] leading-none`}>
                    {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className={`text-[13px] font-medium ${invoice.status === 'paid' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {invoice.status === 'paid' ? `+$${invoice.invoiceTotal}` : `-$${invoice.invoiceTotal}`}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <p className="text-black text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <p className="text-black text-sm">{new Date(invoice.dateInvoiced).toLocaleDateString()}</p>
                </td>
                <td>
                    <div className="inline-flex items-center justify-between gap-6">
                      <Link href={`/dashboard/invoices/view/${invoice._id}`}>
                        <span className="icon text">
                        <FaRegEye />
                        </span>
                      </Link>
                      <Link href={`/dashboard/invoices/edit/${invoice._id}`}>
                        <span className="icon text">
                          <CiPen />
                        </span>
                      </Link>
                      
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    <PrintFooter className="hidden" />  
    </div>
    </div>
    <style jsx global>{`
        @media print {
          /* Hide pen and eye icons */
          .icon {
            display: none !important;
          }

         
          .print-header,
          .print-footer {
            display: block !important;
          }
        
      `}</style>
   
    </>
  );
};

export default InvoiceList;
