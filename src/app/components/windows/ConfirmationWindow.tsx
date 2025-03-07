"use client"

import { deleteProject } from '@/app/Functions/projectsActions';
import { deleteTask } from '@/app/Functions/tasksFunction';
import { useContextApp } from '@/app/pages/contextApp'
import React from 'react'
import toast  from 'react-hot-toast';

const ConfirmationWindow = () => {
    const {
        openConfirmationWindowObject: {openConfirmationWindow,setOpenConfirmationWindow},
        selectedProjectObject: { selectedProject , setSelectedProject },
        allProjectsObject: {allProjects, setAllProjects},
        loadingObject: { isLoading, setLoading },
        chosenProjectObject: {chosenProject, setChosenProject},
        selectedTaskObject: {selectedTask, setSelectedTask},
        allTasksObject: {allTasks,setAllTasks}
    } = useContextApp();

    function closeConfirmationWindow(){
        setOpenConfirmationWindow(false);
        setSelectedProject(null);
    }

    async function deleteFunction(){
            try {

                setLoading(true);
                
                await new Promise((resolve) => setTimeout(resolve,100));
        
                if(selectedProject){

                    deleteProject(
                        selectedProject,
                        setSelectedProject,
                        allProjects,
                        setAllProjects,
                        allTasks,
                        setAllTasks,
                        setOpenConfirmationWindow,
                    );
                }else if(selectedTask){
                    deleteTask({
                        taskToDelete: selectedTask,
                        allProjects,
                        setAllTasks,
                        setAllProjects,
                        setChosenProject,
                        chosenProject,
                    })
                }
            } catch (error) {
                console.log(error);
                toast.error("something went wrong");
            }finally{
                setLoading(false);
                setOpenConfirmationWindow(false);
                selectedTask === null && setChosenProject(null);
                setSelectedProject(null);
                setSelectedTask(null);
                toast.success(`${selectedProject ? "project" : "task"} deleted successfully`)
            }
    }

    return (
        <div className={`w-[38%] bg-white max-sm:w-[90%] p-6 max-sm:p-4 fixed shadow-md z-[90] rounded-lg flex items-center top-[30%] max-sm:top-[40%] left-1/2 -translate-x-1/2 ${openConfirmationWindow? "block":"hidden"}`}>

            <div className='rounded-lg p-1 '>

                <h2 className='text-xl font-semibold mb-5 capitalize'>delete project</h2>

                <p className={`text-gray-600 mb-4 text-sm`}>
                    Are you sure to do the delete operation?
                </p>

                <div className='flex justify-end gap-2 mt-10 text-[13px]'>

                    <button onClick={closeConfirmationWindow} type='button' className='px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition-all capitalize'>
                        cancel
                    </button>

                    <button 
                        onClick={deleteFunction}
                    className='capitalize px-4 py-2 bg-sky-600 hover:bg-sky-800 rounded-lg text-white transition-all'>
                        {isLoading? "delete...":"delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationWindow