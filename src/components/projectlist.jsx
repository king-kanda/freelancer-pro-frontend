"use client"
import React , {useState , useEffect}from 'react'
import Link from 'next/link'


const Projectlist = () => {

const [projects , setProjects] = useState([]);

useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:8080/api/v1/projects');
              const result = await response.json();
              setProjects(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
      },[]);
    
console.log(projects)

const getRandomColor = () => {
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#33a1ff', '#ffa133']; // Add more colors as needed
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <>
    <li className="px-5 mt-5">
        <div className="flex flex-row  items-center justify-between h-8">
            <div className="text-sm font-light underline tracking-wide text-gray-500">
                Projects
            </div>
            <div className="add-project">
                <Link href='/projects/blank'>
                    <button>
                        <span className={` text-xl tracking-wide text-gray-500 `}>
                            +
                        </span>
                    </button>
                </Link>
                
            </div>
        </div>
    </li>
        {projects.map(project => (
            <li
            key={project._id}
            >
                <Link
                href={`/projects/${project._id}`}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 txte-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-green pr-6"
                >
                <span className={`h-4 w-4 ml-4 rounded-lg`} style={{ backgroundColor: getRandomColor() }}>
                    {/* project market */}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                    {project.projectName}
                </span>
                
                </Link>
            </li>
            ))
        }
    </>
  )
}

export default Projectlist