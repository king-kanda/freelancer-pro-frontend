"use client"

import React , {useState , useEffect} from 'react'
import { TaskColumn } from '.'
import { BsFilterRight ,BsSortUp } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import {v4 as uuidv4} from 'uuid'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SidePanel from './tastSidePane';

const TaskBoard = ({projectId}) => {

 
  const [tasks , setTasks] = useState([])
  const [task , setTask] = useState({
    id : '',
    name : '',
    status : "todo" ,

  })

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newTask = { ...task, projectID: projectId, id: uuidv4() };
    
    // Get tasks for the current project from localStorage
    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${projectId}`)) || [];
  
    // Update tasks for the current project and store them back in localStorage
    const updatedTasks = [...storedTasks, newTask];
    localStorage.setItem(`tasks_${projectId}`, JSON.stringify(updatedTasks));
  
    // Update state
    setTasks(updatedTasks);
  
    // Reset task input
    setTask({
      id: '',
      name: '',
      status: 'todo',
    });
  };

  useEffect(() => {
    // Fetch tasks for the current project from localStorage
    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${projectId}`)) || [];
    setTasks(storedTasks);
  }, [projectId]);

  console.log(task)
  return (
    <>
        <DndProvider backend={HTML5Backend}>
           
            <section className='mb-2 mt-4 mr-4 '>
              {/* this section is for tabs and mocing between overview noard calendar and board AND TEAM LIST */}
              <div className="flex items-center justify-start">
                <div className="tabBtnHolder">
                <form action=""
                onSubmit={handleSubmit}
                className='flex  items-center '
                >

                <input 
                  type="text"
                  placeholder='create task'
                  className='text-black bg-gray-200  px-2 py-2.5 rounded text-sm focus:outline-grean-100 placeholder-gray-700' 
                  value={task.name}
                  onChange={(e)=>setTask({...task,projectID:projectId,id:uuidv4(),name : e.target.value})}    
                  required         
                  />
                    <button className='px-2 py-2.5 rounded bg-green'>
                        <span className='text-white text-2xl'>
                          <CiCirclePlus />
                        </span>
                    </button>
                </form>
                </div>
                <div className="tabBtnHolder mx-3">
                  <button className='inline-flex items-center  text-sm text-gray-900' >
                    <span className="mx-1">
                      <BsFilterRight />
                    </span>
                    Filter
                  </button>
                </div>
                <div className="tabBtnHolder mx-3 ">
                  <button className='inline-flex items-center  text-sm text-gray-900' >
                    <span className="mx-1">
                      <BsSortUp />
                    </span>
                    Sort
                  </button>
                </div>
                
              
              </div>
            </section>
            <TaskColumn projectId={projectId} tasks={tasks} setTasks={setTasks}  ></TaskColumn>
          
        </DndProvider>
    </>
  )
}

export default TaskBoard