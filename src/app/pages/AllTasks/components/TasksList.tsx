"use client"

import { RotateCcw, ListCheck ,UserCog, Trash2, Circle } from 'lucide-react';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useContextApp } from '../../contextApp';
import { Project, Task } from '@/app/Data/AllProjects';
import getIconComponent from '@/app/Functions/IconsActions';
import {updateStatus2} from '@/app/Functions/tasksFunction';
import { Checkbox } from '@mui/material';
import ProjectsEmptyScreen from '@/app/EmptyScreen/ProjectsEmptyScreen';

const TasksList = () => {
    const {
        chosenProjectObject: {chosenProject},
        allProjectsObject: {allProjects},
        tabsOptionsObject: { tabsOptions },
        allTasksObject: {allTasks, setAllTasks},
        taskSearch
    } = useContextApp();
    
    const filteredTasks = useMemo(() => {
        let tasks = allTasks;

        // Filter by project
        if (chosenProject) {
        tasks = tasks.filter((task) => task.projectName === chosenProject.title);
        }

        // Filter by status if "Completed" tab is selected
        if (tabsOptions[1].isSelected) {
        tasks = tasks.filter((task) => task.status === "Completed");
        } else {
        tasks = tasks.filter((task) => task.status === "In Progress");
        }

        return tasks;
    }, [chosenProject, tabsOptions, allProjects, allTasks]);

    const filterTasksBySearch = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(taskSearch.toLowerCase())
    );

    return (
        <div className='m-10 flex flex-col gap-4 max-sm:m-0 max-sm:mt-7  max-sm:gap-1 h-[80%]'>            
            {
                allProjects.length === 0 ? <ProjectsEmptyScreen /> :
                <>
                    <Tabs />
                    <div className='projects-bar flex flex-col gap-4 w-full overflow-auto'>
                        {
                            filterTasksBySearch.map((singleTask,index) => (
                                <SingleTask key={index} singleTask={singleTask}/>
                            ))
                        }
                    </div>
                </>
            }
            
        </div>
    )
}

const Tabs = () => {
    const {
        chosenProjectObject: {chosenProject, setChosenProject},
        allProjectsObject: {allProjects, setAllProjects},
        tabsOptionsObject: { tabsOptions, setTabsOptions },
    } = useContextApp();

    function countOnGoingTasks() {

        if(chosenProject){
            return chosenProject.tasks.reduce((accTask,task) => {
                return accTask + (task.status === "In Progress" ? 1 : 0 );
            },0);
        }

        return allProjects.reduce((accProjects, project) => {
            return (
                accProjects + project.tasks.reduce((accTasks,task) => {
                    return accTasks + (task.status === "In Progress" ? 1 : 0);
                },0)
            )
        },0)
    }
    
    function completedTasks() {
        //If chosen project is selected, calculate the difference between the on going tasks
        // and the total of all tasks in this project
        if (chosenProject) {
        return chosenProject.tasks.length - countOnGoingTasks();
        }

        //The same for all projects, but first we need to count all the tasks
        //in all projects, that's why I'm using reduce function
        const totalTasksInAllProjects = allProjects.reduce((acc, project) => {
        return acc + project.tasks.length;
        }, 0);

        //if the chosen project is still null, return the completed tasks of all projects
        return totalTasksInAllProjects - countOnGoingTasks();
    }

    function switchTabs(index: number) {
        setTabsOptions((prevState) =>
        prevState.map((tab, i) => ({
            ...tab,
            isSelected: index === i,
        }))
        );
    }
    return (
        <div className='flex max-sm:flex-col max-sm:items-start items-center max-sm:gap-2 gap-6 ml-3 mt-8 mb-5 max-sm:m-1'>

            {tabsOptions.map((singleTabOption,index) => (

                <div
                key={index}
                onClick={() => switchTabs(index)}

                className={`flex gap-2 cursor-pointer ${singleTabOption.isSelected ? " text-sky-600 font-semibold" : "text-slate-300"}`}>
                
                    <span className='capitalize'>{singleTabOption.name}</span>

                    <span 
                    className={`
                        ${singleTabOption.isSelected ? "text-sky-600" : "text-slate-300"}
                    text-white px-2 rounded-md max-[420px]:hidden bg-sky-700
                    `}>
                        {singleTabOption.id === 1 ? countOnGoingTasks() : completedTasks()}
                    </span>
                
                </div>
            ))}
        </div>
    )
}

const SingleTask = ({singleTask}:{singleTask: Task}) => {
    const {
        selectedTaskObject: { setSelectedTask },
        openTasksWindowObject:{ setOpenTasksWindow },
        openConfirmationWindowObject:{setOpenConfirmationWindow},
        allProjectsObject: {allProjects,setAllProjects},
        allTasksObject: {allTasks,setAllTasks},
        chosenProjectObject: {chosenProject,setChosenProject}
    } = useContextApp();

    const [checked , setChecked] = useState(false);

    const priorityColors = {
        Low: "text-green-500",
        Medium: "text-yellow-500",
        High: "text-red-500",
    };

    useLayoutEffect(() => {
        setChecked(singleTask.status === "Completed");
    },[singleTask]);

    function updateStatus(){
        const newStatus = checked ? "In Progress" : "Completed";
        const updatedProjects: Project[] = allProjects.map((project) => ({
            ...project,
            tasks: project.tasks.map((t) => 
                t.id === singleTask.id ? {...t, status: newStatus} : t
            )
        }));
        
            const updatedTasks: Task[] = allTasks.map((t) => 
                t.id === singleTask.id ? {...t, status: newStatus} : t
            )

            if(chosenProject){
                const updateChosenProject: Project = {
                    ...chosenProject,
                    tasks: chosenProject.tasks.map((t) => {
                        if(singleTask.id === t.id){
                            return {...t,status: newStatus};
                        }
                        return t;
                    }),
                };
                setChosenProject(updateChosenProject);
            }
    
            setAllProjects(updatedProjects);
            setAllTasks(updatedTasks);
            setChecked(!checked);
    }

    function updateStatusFunction() {
        try {
            updateStatus2({
                task: singleTask,
                allProjects,
                allTasks,
                checked,
                chosenProject,
                setAllProjects,
                setAllTasks,
                setChecked,
                setChosenProject,
            });
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    }
    

    return (
        <div className='flex items-center ml-3 gap-4 max-sm:flex-col cursor-pointer'>
            <Checkbox
                className='w-5 h-5'
                sx={{
                    color: "#0284C7", "&.Mui-checked":{
                        color:"#0b9ae1"
                    }
                }}
                onClick={updateStatusFunction}
                checked= {checked}
            />
            <div className='w-[90%] max-sm:w-[250px] bg-slate-50 hover:bg-slate-200 transition-all drop-shadow-lg rounded-lg border border-slate-300 max-sm:flex-col md:flex-col lg:flex-row flex gap-3 items-center justify-between p-2 max-sm:gap-1 flex-wrap'>
                
                {/* intro info */}
                <div className='flex gap-3 items-center'>
                    {/* intro icon */}
                    <div>
                        <div className='max-sm:hidden bg-sky-600 rounded-lg p-2 flex items-center justify-center'>
                            {getIconComponent(singleTask.icon)}
                        </div>
                    </div>

                    <div 
                        onClick={() => {
                                setSelectedTask(singleTask)
                                setOpenTasksWindow(true);
                            }
                        }
                    className='flex flex-col max-sm:text-[14px] md:text-[20px]'>

                        <span className='capitalize font-bold hover:text-sky-400 cursor-pointer transition-all'> 
                            {singleTask.title}
                        </span>

                        <div className='flex'>
                            <span className='text-slate-400 text-[13px] p-[2px] capitalize'>
                            {singleTask.projectName}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex lg:gap-36 font-bold items-center max-sm:gap-1 md:gap-5 max-sm:flex-col md:flex-col lg:flex-row'>

                    <div className='flex gap-2 items-center'>
                         {/* status info */}
                        <RotateCcw className='w-4 h-4 text-[24px] text-sky-700' />
                        <span className='text-[16px] text-slate-400 capitalize'>
                            {singleTask.status}
                        </span>
                    </div>

                    {/* priority */}
                    <div className='flex gap-2 items-center'>
                        <Circle className={`w-4 h-4 text-[10px] ${priorityColors[singleTask.priority]}`} />
                        <span className='text[14px] text-slate-400'>
                            {singleTask.priority}
                        </span>
                    </div>

                    {/* actions */}
                    <div className='flex gap-2 items-center'>

                        {/* edit btn */}
                        <div 
                        onClick={() => {
                            setSelectedTask(singleTask);
                            setOpenTasksWindow(true);
                        }}
                        className='rounded-lg p-2 bg-sky-600 hover:bg-sky-400 transition-all cursor-pointer flex items-center justify-center'>
                            <UserCog className='w-4 h-4 text-white' />
                        </div>
                        
                        {/* trash btn */}
                        <div 
                        onClick={() => {
                            setSelectedTask(singleTask);
                            setOpenConfirmationWindow(true)
                        }}
                        className='rounded-lg p-2 bg-sky-600 hover:bg-sky-400 transition-all cursor-pointer flex items-center justify-center'>
                            <Trash2 className='w-4 h-4 text-white' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TasksList