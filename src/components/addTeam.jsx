'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ClientAutoSuggest } from '.'

export default function Example({ isOpen, onClose, user ,projectId }) {
    const [open, setOpen] = useState(isOpen)
    const [selectedClientId, setSelectedClientId] = useState('');
    const [projectDets, setProjectDets] = useState({});
    const cancelButtonRef = useRef(null);

    const handleSelectClient = (clientId) => {
        setSelectedClientId(clientId);
    };

    const handleSubmit = async () => {
        try {
            const updatedProject = { ...projectDets, clientID: selectedClientId };
            const response = await fetch(`http://localhost:8080/api/v1/projects/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProject)
            });
            if (response.ok) {
                setOpen(false);
                onClose(false);
                console.log("uhiwhjo")
            } else {
                throw new Error('Failed to update project with the selected client');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/projects/${projectId}`);
                if (response.ok) {
                    const project = await response.json();
                    setProjectDets(project);
                } else {
                    throw new Error('Failed to fetch project details');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchProjectDetails();
    }, [projectId]);
    

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white 
              text-left shadow-xl transition-all my-8 w-screen max-w-screen-md ">
                                <div className="px-4 py-6">
                                    <ClientAutoSuggest onSelectClient={handleSelectClient} user={user} />
                                    <div className="submit-btn">
                                        <button type="submit" className="bg-grean-500 text-white rounded-md py-3 px-2 mt-4 ml-auto"
                                            onClick={handleSubmit}
                                        >Add Client</button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
