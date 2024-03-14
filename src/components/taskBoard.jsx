"use client"

import React , {useState , useEffect} from 'react'
import { TaskColumn } from '.'
import { BsFilterRight ,BsSortUp } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import {v4 as uuidv4} from 'uuid'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SidePanel from './tastSidePane';

const TaskBoard = () => {

  const [tasks , setTasks] = useState([])
  const [task , setTask] = useState({
    id : '',
    name : '',
    status : "todo" ,

  })

  const handleSubmit =(e) =>{
        e.preventDefault();

        setTasks((prev) =>{
             const newList = [...prev , task]
             localStorage.setItem("tasks", JSON.stringify(newList))
             return newList
        });


        setTask({
          id: "",
          name : "",
          status : "todo"
        })
  }

  useEffect(() => {
   
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      setTasks([]); // Initialize with an empty array if no tasks are found in local storage
    }
  }, []);

  // console.log(tasks)
  return (
    <>
        <DndProvider backend={HTML5Backend}>
           
            <section className='mb-2 mt-4 mr-4'>
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
                  className='text-white bg-dark-primary px-2 py-2 rounded text-sm' 
                  value={task.name}
                  onChange={(e)=>setTask({...task,id:uuidv4(),name : e.target.value})}    
                  required         
                  />
                    <button className='px-2 py-2.5 rounded bg-dark-tertiary'>
                        <span className='text-white text-2xl'>
                          <CiCirclePlus />
                        </span>
                    </button>
                </form>
                </div>
                <div className="tabBtnHolder mx-3">
                  <button className='inline-flex items-center  text-sm text-gray-400' >
                    <span className="mx-1">
                      <BsFilterRight />
                    </span>
                    Filter
                  </button>
                </div>
                <div className="tabBtnHolder mx-3 ">
                  <button className='inline-flex items-center  text-sm text-gray-400' >
                    <span className="mx-1">
                      <BsSortUp />
                    </span>
                    Sort
                  </button>
                </div>
                
              
              </div>
            </section>
            <TaskColumn tasks={tasks} setTasks={setTasks}  ></TaskColumn>
          
        </DndProvider>
    </>
  )
}

export default TaskBoard