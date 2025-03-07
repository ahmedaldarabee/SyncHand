"use client"

import { RotateCcw, ListCheck ,UserCog, Trash2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import { useContextApp } from '../../contextApp';
import { Task } from '@/app/Data/AllProjects';
import getIconComponent from '@/app/Functions/IconsActions';

const TasksList = () => {
    const {
        chosenProjectObject: {chosenProject, setChosenProject},
        allProjectsObject: {allProjects, setAllProjects},
        tabsOptionsObject: { tabsOptions, setTabsOptions },
        allTasksObject: {allTasks, setAllTasks},
    } = useContextApp();


    const filteredTasks = useMemo(() => {
        let tasks = allTasks
    
        if (chosenProject) {
            tasks = tasks.filter((task) => task.projectName === chosenProject.title);
        }
    
        if (tabsOptions[1].isSelected) {
            return tasks.filter((task) => task.status === "Completed");
        } else {
            return tasks.filter((task) => task.status === "In Progress");
        }

    }, [allTasks, chosenProject, tabsOptions]);

    return (
        <div className='m-10 flex flex-col gap-4 max-sm:m-0 max-sm:mt-7  max-sm:gap-1 h-[80%]'>
            <Tabs />
            <div className='projects-bar flex flex-col gap-4 w-full overflow-auto'>
                {
                    filteredTasks.map((singleTask,index) => (
                        <SingleTask key={index} singleTask={singleTask}/>
                    ))
                }
            </div>
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
        if(chosenProject){
            return chosenProject.tasks.length - countOnGoingTasks()
        }

        const totalTasksInAllProjects = allProjects.reduce((acc,project) => {
            return acc + project.tasks.length;
        },0);
        return totalTasksInAllProjects - countOnGoingTasks();
    }

    function switchTabs(index: number){
        setTabsOptions((prevState) => 
            prevState.map((tab,idx) => ({
                ...tab,
                isSelected: index === idx
            }))
        )
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
        openConfirmationWindowObject:{setOpenConfirmationWindow}
    } = useContextApp();

    return (
        <div className=' flex items-center max-sm:flex-col cursor-pointer'>
            {/* <Checkbox /> */}
            <div className='w-full bg-white hover:bg-slate-200 transition-all drop-shadow-lg rounded-lg border border-slate-300 max-sm:flex-col md:flex-col lg:flex-row flex gap-3 items-center justify-between p-3 max-sm:p-2 max-sm:py-2 max-sm:gap-1 flex-wrap'>
                
                {/* intro info */}
                <div className='flex gap-3 items-center'>
                    {/* intro icon */}
                    <div>
                        <div className='max-sm:hidden bg-sky-600 rounded-lg p-2 flex items-center justify-center'>
                            {/* <ListCheck className='w-4 h-4 text-white'/> */}
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

                {/* status info */}
                <div className='flex lg:gap-36 font-bold items-center max-sm:gap-1 md:gap-5 max-sm:flex-col md:flex-col lg:flex-row'>

                    <div className='flex gap-2 items-center'>
                        <RotateCcw className='w-4 h-4 text-[24px] text-sky-700' />
                        <span className='text-[16px] text-slate-400 capitalize'>
                            {singleTask.status}
                        </span>
                    </div>

                    {/* priority */}
                    <div className='flex gap-2 items-center'>
                        <RotateCcw className='w-4 h-4 text-[10px] text-sky-700' />
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