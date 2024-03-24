"use client"
import React , {useState , useEffect}from 'react'
import Link from 'next/link'


const Projectlist = ({user}) => {

const [clients , setClients] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure user is available and has an ID
        if (user && user.uid) {
          const response = await fetch(`http://localhost:8080/api/v1/clients?userId=${user.uid}`);
          const result = await response.json();
          setClients(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);
    
console.log(clients)

const getRandomColor = () => {
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#33a1ff', '#ffa133']; // Add more colors as needed
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const generateInitials = (name) => {
    const initials = name.split(' ').map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
  };

  return (
    <>
        <div className="px-5 my-6">
            <div className="flex flex-row  items-center justify-between h-8">
                <div className="heading">
                <h3 className={` text-xl font-semibold text-black `}>
                    Recent Clients
                </h3>
                </div>
              
            </div>
        </div>
        <ul className="px-5 my-6">
       
        {clients.map(client => (
            <li
            key={client._id}
            >
                <Link
                href={`/clients/${client._id}`}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 text-black hover:text-gray-800  border-gray-800 rounded-lg hover:text-white pr-6 mb-3"
                >
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
                
                </Link>
            </li>
            ))
        }
        </ul>
    
    </>
  )
}

export default Projectlist