import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CiCalendar, CiStickyNote, CiUser, CiWarning } from 'react-icons/ci'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

export default function Example({isOpen, setClosed , task , projectId}) {
  const [open, setOpen] = useState(true)

  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  const handleClose = () => {
    setOpen(false);
    setClosed(false);
  };


  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);



  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-screen-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-dark-tertiary shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                        <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-grean-700 rounded-lg ">
                          <span className='mr-2'>
                          <CiStickyNote />
                          </span>
                          Update task 
                        </button>
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-white hover:text-gray-500"
                            onClick={() => handleClose(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                            <div className="protect-title mt-4">
                              <h1 className='py-2 font-bold text-white text-4xl'>
                               {task}
                              </h1>
                            </div>

                            <div className="task-details mt-3">
                              <div className="flex items-center justify-start">
                                <div className="label">
                                  <p className='text-gray-300'>
                                    Assignee
                                  </p>
                                </div>
                                <div className="detail-container ml-6 text-white">
                                    <div className="inline-flex items-center justify-start">
                                      <span className="border h-8 w-8 border-dashed border-white p-2 rounded-full flex items-center justify-center text-xl">
                                      <CiUser />
                                      </span>
                                      <span className='ml-3'>
                                       No assignee
                                      </span>
                                    </div>
                                </div>
                              </div>
                            </div>

                            <div className="task-details my-4">
                              <div className="flex items-center justify-start">
                                <div className="label">
                                  <p className='text-gray-300'>
                                    Due Date
                                  </p>
                                </div>
                                <div className="detail-container ml-6 text-white ">
                                    <div className="inline-flex items-center justify-start">
                                    <span className="border h-8 w-8 border-dashed border-white p-2 rounded-full flex items-center justify-center text-xl">
                                    <CiCalendar />
                                      </span>
                                   <span className='ml-3'>
                                       No Due Date
                                      </span>
                                    </div>
                                </div>
                              </div>
                            </div>

                            <div className="task-details my-4">
                              <div className="flex items-center justify-start">
                                <div className="label">
                                  <p className='text-gray-300'>
                                    Priority . .
                                  </p>
                                </div>
                                <div className="detail-container ml-6 text-white ">
                                    <div className="inline-flex items-center justify-start">
                                    <span className="border h-8 w-8 border-dashed border-white p-2 rounded-full flex items-center justify-center text-xl">
                                    <CiWarning />
                                      </span>
                                   <span className='ml-3'>
                                       No Due Date
                                      </span>
                                    </div>
                                </div>
                              </div>
                            </div>


                            {/* project descrption section */}
                            <form>
                              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-500 dark:bg-gray-700 dark:border-gray-600">
                              
                                <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                  <label htmlFor="editor" className="sr-only">
                                    Publish post
                                  </label>
                                  <textarea
                                    id="editor"
                                    rows={8}
                                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                    placeholder="Write task description..."
                                    required=""
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                             
                            </form>

                        </div>
                      </div>
                    </div>

                   
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
