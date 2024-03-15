'use client'

import React, { useEffect, useState } from 'react';
import { CiCircleCheck } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import styles from '@/styles/projects.module.scss'
import { useDrag, useDrop } from 'react-dnd';
import SidePanel from './tastSidePane';
import { CiCircleMore } from "react-icons/ci";

const TaskColumn = ({ projectId, tasks ,setTasks }) => {

 const [todos , setTodos] = useState([])
 const [inProgress , setInProgress] = useState([])
 const [closed , setClosed] = useState([])



    useEffect(()=>{

      if(tasks){
        const fTodos = tasks.filter((task) => task.status === 'todo' || task.status === '');
        const fInProgress = tasks.filter( (task) => task.status === 'inprogress')
        const fClosed = tasks.filter( (task) => task.status === 'closed')
    
        setTodos(fTodos)
        setInProgress(fInProgress)
        setClosed(fClosed)
      }
    
     },[tasks]);
     
      
      console.log("tasks:", tasks);

     
  

  const statuses = ["todo" , "inprogress" , "closed"]

  return (
    <>
        <div className='flex  items-cendter mt-6  mr-4 gap-8'>
            {statuses.map((status, index) => (
              <Columns 
            
                key={index} 
                status={status} 
                tasks ={tasks}
                setTasks = {setTasks}
                todos = {todos}
                inProgress = {inProgress}
                closed = {closed}
                projectId = {projectId}
              
              />
            ))}
          
        </div>
     
    </>
  );
};

export default TaskColumn;


// clums

const Columns = ({status, tasks ,setTasks, todos ,inProgress, closed , projectId}) =>{

  let text ;
  let tasksToMap = todos;

  if(status === "inprogress"){
    text = " In Progress"
    tasksToMap = inProgress;
  } 

  if(status === "todo"){
    text = "To Do"
    tasksToMap = todos;
  } 

  if(status === "closed"){
    text = "Done"
    tasksToMap = closed;
  } 

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop :(item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addItemToSection = (id) => {
    console.log("dropped" ,id ,status)
    setTasks(prev => {

      const mTask = prev.map(t => {
        if(t.id == id){
          return{...t , status : status}
        }

        return t ;
      })

      localStorage.setItem("tasks",JSON.stringify(mTask))

      return mTask;
    })

  }

  return(
    <>
      <div
      ref={drop}
      className="w-64 p-2">
        <h2 className='text-white font-semibold mb-6 inline-flex items-center gap-6'>
          {text}
          <span className='text-sm font-light'>
            {tasksToMap.length}
          </span>
        </h2>
        {
        tasksToMap.length > 0 && tasksToMap.map(task => (
          <Card 
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            projectId={projectId}
           
          />
        ))
      }
       
      </div>
    </>
  );
};

// card component goes in here


const Card = ({tasks ,setTasks,task , projectId}) =>{

  const [sidePanelOpen , setSidePanelOpen] = useState(false)

  const handleClick = () =>{
    setSidePanelOpen(true)
  }

  const handleSideClose = () =>{
    setSidePanelOpen(false);
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item : {id:task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  console.log(isDragging)


  const handleRemove = (id) => {
    // Filter out the task to be removed
    const updatedTasks = tasks.filter((t) => t.id !== id);
    
    // Update localStorage only with tasks for the current project
    localStorage.setItem(`tasks_${projectId}`, JSON.stringify(updatedTasks));
    
    // Update state with the filtered tasks
    setTasks(updatedTasks);
  
    alert("Task removed");
  };

  return(
    <>
      <div 
      ref={drag} 
      className="bg-dark-tertiary w-64 py-5 px-4 rounded border border-gray-700 mb-2 cursor-grab"
      
      >
        <div className="expand btn flex items-center justify-end">
          <button 
          onClick={handleClick}
          >
            <span className='text-xl text-white'>
               <CiCircleMore />
            </span>
          </button>
        </div>
        <p className='text-white text-sm inline-flex gap-2 items-center' >
          <button>
            <CiCircleCheck />
          </button>
          {task.name}
        </p>
        <div className="status gap-3 mt-2">
         
            <span className={` ${styles.StatusText} text-sm priority bg-blue-200 rounded-full py-1 px-2 mr-2`}>
              Low Priority
            </span>
        
            <span className={` ${styles.StatusText} text-sm status bg-red-200 rounded-full py-1 px-2  w-4 `}>
              On Track
            </span>
      
        </div>
        <div className="teams-deadline flex items-center justify-between mt-3">
          <div className={`${styles.deadline}`}>
            <span className="text-md text-red-500">
              Feb 14-31
            </span>
          </div>
            <div className="delete-btn text-sm h-6 w-6 bg-dark-primary p-1 flex items-center justify-center rounded-full">
              <button 
              onClick={()=>handleRemove(task.id)}>
                <span className='text-white  '>
                  <IoTrashOutline />
                </span>
              </button>
            </div>
        </div>
      </div>
      <SidePanel projectId={projectId} task={task.name} isOpen={sidePanelOpen} setClosed={handleSideClose} />
    </>
  );
};