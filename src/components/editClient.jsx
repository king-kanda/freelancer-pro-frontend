'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function Example({ isEdit, onClose, clientId , user }) {
  const [open, setOpen] = useState(isEdit)
  const cancelButtonRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zipcode: '',
    companyName: '',
    companyContact: '',
    companyWebsite: '',
    status: 'lead',
    freelancerId: user.uid,
    projectIds: []
  });

  useEffect(() => {
    setOpen(isEdit);
  }, [isEdit]);

  useEffect(() => {
    if (clientId) {
      // Fetch data for the client with the given clientId
      fetchData(clientId);
    }
  }, [clientId]);

  const fetchData = async (clientId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/clients/${clientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch client data');
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching client data:', error.message);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProjectIdChange = (e, index) => {
    const { value } = e.target;
    setFormData(prevState => {
      const projectIds = [...prevState.projectIds];
      projectIds[index] = value;
      return {
        ...prevState,
        projectIds
      };
    });
  };

  const handleAddProjectId = () => {
    setFormData(prevState => ({
      ...prevState,
      projectIds: [...prevState.projectIds, '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/v1/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to update client');
      }
      const data = await response.json();
      console.log('Client updated successfully:', data);
      setOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        zipcode: '',
        companyName: '',
        companyContact: '',
        companyWebsite: '',
        status: 'lead',
        freelancerId: user.uid,
        projectIds: []
      });
    } catch (error) {
      console.error('Error updating client:', error.message);
      // Handle error
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-grean-100 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-screen max-w-screen-md ">
              <form className="bg-grean-50 rounded-lg p-8 space-y-4 flex flex-wrap justify-between gap-6">
                  {/* First Column */}
                  <div className="flex flex-col w-full ">
                    <label htmlFor="name" className="text-grean-900">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1" />

                    <label htmlFor="email" className="text-grean-900 mt-4">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1" />

                    <label htmlFor="phone" className="text-grean-900 mt-4">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1" />

                    <label htmlFor="city" className="text-grean-900 mt-4">City:</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1" />

                    <label htmlFor="state" className="text-grean-900 mt-4">State:</label>
                    <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1" />

                    <label htmlFor="zipcode" className="text-grean-900 mt-4">Zipcode:</label>
                    <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1" />
                  </div>

                  {/* Second Column */}
                  <div className="flex flex-col w-full  ">
                    <label htmlFor="companyName" className="text-grean-900">Company Name:</label>
                    <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1" />

                    <label htmlFor="companyContact" className="text-grean-900 mt-4">Company Contact:</label>
                    <input type="text" id="companyContact" name="companyContact" value={formData.companyContact} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1" />

                    <label htmlFor="companyWebsite" className="text-grean-900 mt-4">Company Website:</label>
                    <input type="text" id="companyWebsite" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1" />

                    <label htmlFor="status" className="text-grean-900 mt-4">Status:</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} className="border border-gray-400 rounded-md py-2 px-3 mt-1">
                      <option value="lead">Lead</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="lost">Lost</option>
                      <option value="contract">Contract</option>
                      <option value="closed">Closed</option>
                    </select>

                   
                  </div>

                  {/* Input field for multiple project IDs */}
                  <div className="w-full ">
                    <label htmlFor="projectIds" className="text-grean-900">Project IDs:</label>
                    {formData.projectIds.map((projectId, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          value={projectId}
                          onChange={(e) => handleProjectIdChange(e, index)}
                          placeholder="Enter Project ID"
                          className="border border-gray-400 rounded-md py-2 px-3 mt-1 mr-2"
                        />
                      </div>
                    ))}
                    <button type="button" onClick={handleAddProjectId} className="bg-grean-500 text-white rounded-md py-2 px-4 mt-2">Add Project ID</button>
                  </div>

                  {/* Submit button */}
                 
                  <div className="bg-gray-50 px-4 py-3 sm:fSlex sm:flex-row-reverse sm:px-6">
                    <button type="submit" className="bg-grean-500 text-white rounded-md py-3 px-2 mt-4 ml-auto"
                    onClick={handleSubmit}
                    >Submit</button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleClose}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
