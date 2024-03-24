'use client'

import { AddClient, EditClient } from '@/components';
import React, { Clientef, useState, useEffect } from 'react';
import { UserAuth } from '@/context/AuthContext';


const Page = () => {

  const { user } = UserAuth();
  const [isOpen , setIsOpen] = useState(false)
  const [isEdit , setIsEdit] = useState(false)
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [clientId , setClientId] = useState()
  

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    filterClients();
  }, [searchTerm, selectedStatus, clients]);

  const fetchClients = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/clients?userId=${user.uid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const filterClients = () => {
    let filtered = clients.filter(client => {
      const name = client.name.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return name.includes(searchTermLower);
    });

    if (selectedStatus) {
      filtered = filtered.filter(client => client.status === selectedStatus);
    }

    setFilteredClients(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };


  const generateInitials = (name) => {
    const initials = name.split(' ').map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };


  const handleClick = () =>{
    setIsOpen(true)
  }

  const handleEdit = (id) =>{
    setClientId(id)
    setIsEdit(true)
    console.log(`Editing client with ID: ${id}`);
  }

  const handleClose = () =>{
    setIsOpen(false)
  }

  const handleExit = () =>{
    setIsOpen(false)
  }


  return (
    <>
     <div className="mx-12">
     <div className="py-4 grid gap-3 md:flex md:justify-between md:items-center  ">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 ">
            Clients
          </h2>
          <p className="text-sm text-gray-600 ">
            Add Clients, edit and more.
          </p>
        </div>

        <div className="md:flex md:items-center">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="py-2 px-24 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 "
            />

            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 mx-2 "
            >
              <option value="">All Status</option>
              <option value="lead">Lead</option>
              <option value="negotiation">Negotiation</option>
              <option value="lost">Lost</option>
              <option value="contract">Contract</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="mt-2 md:mt-0">
            <div className="inline-flex gap-x-2">
              <a
                href="#"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 "
              >
                View all
              </a>
              <a
                href="#"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-grean-600 text-white hover:bg-grean-700  "
                onClick={handleClick}
              >
                <svg
                  className="flex-shrink-0 size-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Add Client
              </a>
            </div>
          </div>
        </div>
      </div>

     </div>
      {/* Table Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Table Header */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" className="ps-6 py-3 text-start">
                        {/* Checkbox */}
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3 text-end"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Render filtered client data */}
                    {filteredClients.map((client) => (
                      <tr key={client._id}>
                        <td className="size-px whitespace-nowrap">
                          {/* Checkbox */}
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 flex items-center gap-x-3">
                            <div
                              className="inline-block size-[38px] rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: getRandomColor() }}
                            >
                              {generateInitials(client.name)}
                            </div>
                            <div className="grow">
                              <span className="block text-sm font-semibold text-gray-900 ">
                                {client.name}
                              </span>
                              <span className="block text-sm text-gray-700">
                                {client.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="h-px w-64 whitespace-nowrap text-sm">
                          {client.companyName}
                        </td>
                        <td className="size-px w-48 whitespace-nowrap">
                            <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-sm  ${
                                client.status === 'lead'
                                    ? 'bg-red-200 text-red-600'
                                    : client.status === 'negotiation'
                                    ? 'bg-orange-200 text-orange-700'
                                    : client.status === 'lost'
                                    ? 'bg-gray-500 text-gray-700' 
                                    : client.status === 'contract'
                                    ? 'bg-blue-200 text-blue-700'
                                    : 'bg-grean-200 text-grean-700'
                                }`}
                            >
                                {client.status}
                            </span>
                            </td>
                        <td className="size-px w-48 whitespace-nowrap text-sm">
                          {client.phone}
                        </td>
                        <td className="size-px whitespace-nowrap text-sm">
                          {new Date(client.createdAt).toLocaleDateString()}
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <button 
                           onClick={() => handleEdit(client._id)}
                          className="text-blue-600">Edit</button>
                        </td>
                       
                      </tr>
                      
                    ))}
                  </tbody>
                </table>
                {/* End Table */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Table Section */}

      <AddClient isOpen={isOpen}  onClose={handleClose} user={user} />
      <EditClient  isEdit={isEdit}  onClose={handleExit} user={user}  clientId={clientId}/>
      

     
    </>
  );
};

export default Page;