"use client"

import { Project } from '@/app/Data/AllProjects';
import getIconComponent from '@/app/Functions/IconsActions';
import { useContextApp } from '@/app/pages/contextApp';
import { sortingDropDownPosition } from '@/app/pages/types/AppTypes';
import { ChevronDown, Circle, CircleX, List } from 'lucide-react';
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import {useForm , SubmitHandler, UseFormRegister , FieldErrors} from 'react-hook-form'
import { zodResolver }  from '@hookform/resolvers/zod';
import * as z from 'zod'
import TasksDropDown from '../DropDowns/TasksDropDown';

export type SelectionOption = "priority" | "project"

export type Priority = {
    id: number;
    name: string;
    icon: React.ReactNode;
    isSelected: boolean;
}

export type ProjectWithSelection = Project & {isSelected: boolean}

// Define the structure of our context
type TaskFormType = {
    clickedSelection: SelectionOption | null;
    setClickedSelection: Dispatch<SetStateAction<SelectionOption | null>>;

    openTasksDropDown: boolean;
    setOpenTasksDropDown: Dispatch<SetStateAction<boolean>>;

    tasksDropDownPositions: { left: number; top: number, width: number };
    setTasksDropDownPositions: Dispatch<SetStateAction<{ left: number; top: number, width: number }>>;

    priority: Priority | null;
    setPriority: Dispatch<SetStateAction<Priority | null>>;

    project: ProjectWithSelection | null;
    setProject: Dispatch<SetStateAction<ProjectWithSelection | null>>;

    priorityListObject: {
        priorityList: Priority[];
        setPriorityList: Dispatch<SetStateAction<Priority[]>>;
    };

    updatedAllProjectsObject: {
        updatedAllProjects: ProjectWithSelection[];
        setUpdatedAllProjects: Dispatch<SetStateAction<ProjectWithSelection[]>>;
    };
};

const TaskFormState = {
    clickedSelection: null,
    setClickedSelection: () => {},

    openTasksDropDown: false,
    setOpenTasksDropDown: () => {},

    tasksDropDownPositions: {left: 0 , top: 0, width: 0},
    setTasksDropDownPositions: () => {},

    priority: null,
    setPriority: () => {},

    project: null,
    setProject: ()=> {},

    priorityListObject: {
        priorityList: [],
        setPriorityList: () => {}
    },

    updatedAllProjectsObject: {
        updatedAllProjects: [],
        setUpdatedAllProjects: () => {}
    },
}

// create context
const TaskFormContext = createContext<TaskFormType>(TaskFormState);

export function useTaskFormContext(){
    return useContext(TaskFormContext);
}

// starting from here!
// provider must using here!

const TasksWindow = () => {
    const [clickedSelection,setClickedSelection] = useState<SelectionOption | null>(null);
    const [openTasksDropDown, setOpenTasksDropDown] = useState(false);
    const [tasksDropDownPositions, setTasksDropDownPositions] = useState<sortingDropDownPosition>({
        left: 0,
        top:0,
        width:0
    });

    const [priority, setPriority] = useState<Priority | null>(null)

    const [project, setProject] = useState<ProjectWithSelection | null>(null)

    const[priorityList, setPriorityList] = useState<Priority[]>([
        {
            id: 1,
            name: "Low",
            icon: <Circle className='w-4 h-4 text-green-500' />,
            isSelected: false
        },{
            id: 2,
            name: "Medium",
            icon: <Circle className='w-4 h-4 text-yellow-500' />,
            isSelected: false
        },{
            id: 3,
            name: "High",
            icon: <Circle className='w-4 h-4 text-red-500' />,
            isSelected: false
        }
    ]);

    const {
        allProjectsObject: {allProjects, setAllProjects},
        openTasksWindowObject:{openTasksWindow,setOpenTasksWindow}
    } = useContextApp();

    
    const [updateAllProjects, setUpdateAllProjects] = useState<ProjectWithSelection[]>([]);

    useEffect(() => {
        const templateAllProjects: ProjectWithSelection[] = allProjects.map((project) => ({
            ...project,
            isSelected: false,
        }))
        setUpdateAllProjects(templateAllProjects);
    },[allProjects]);

    // main Context Provider
    return (
        <TaskFormContext.Provider
            value={{
                clickedSelection,
                setClickedSelection,

                openTasksDropDown,
                setOpenTasksDropDown,

                tasksDropDownPositions,
                setTasksDropDownPositions,
                
                priority,
                setPriority,

                project,
                setProject,

                priorityListObject: {
                    priorityList,
                    setPriorityList,
                },
                updatedAllProjectsObject: {
                    updatedAllProjects: updateAllProjects,
                    setUpdatedAllProjects: setUpdateAllProjects
                }
            }}>

        <div 
        className={`
            w-[48%] max-sm:w-[82%] max-[600px]:w-[93%]
            z-[80] p-3 absolute left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2
            bg-white rounded-lg shadow-md ${openTasksWindow ? "":"hidden"}
        `}>
            {/* main data */}
            <TasksDropDown />
            <Header />
            <form className='flex flex-col gap-2 pt-8 px-7 mt-3'>
                {/* <TaskInput /> */}
                <div className='flex justify-between gap-3 mt-5'>
                    <PrioritySelection />
                    <ProjectSelection />
                </div>
                <Footer />
            </form>
        </div>

        </TaskFormContext.Provider>
    )
}

function Header(){
    const {
        openTasksWindowObject: {setOpenTasksWindow}
    } = useContextApp();

    return (
        <div className='flex justify-between items-center p-7'>
            <div className='flex items-center gap-2'>
                <div className='p-[7px] bg-sky-200 rounded-lg flex items-center justify-center'>

                    <List className='w-4 h-4 text-sky-600' onClick={() => setOpenTasksWindow(false)} />

                </div>
                <span className='capitalize font-semibold text-lg'>new task</span>
            </div>
            <CircleX className='w-4 h-4 text-slate-300 cursor-pointer'/>
        </div>
    )
}

function TaskInput({
    register,
    errors
}:{
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>
}) {
    const {
        selectedIconObject:{ selectedIcon , setSelectedIcon },
        openIconWindowObject:{ openIconWindow , setOpenIconWindow },
    } = useContextApp();

    return (
        <div className='flex flex-col gap-2'>
            <span className='text-[14px] font-medium text-slate-600 capitalize'>task name</span>
            <div className='flex gap-3 justify-between'>
                <div className='w-full'>
                    <input 
                    // {...register("taskName")}
                    type="text" placeholder='Enter task name' />

                    {/* {errors.taskName && (
                        <p className='text-[11px] mt-2 text-red-500'>{errors.taskName.message}</p>
                    )} */}
                </div>
                <div
                    onClick={() => setOpenIconWindow(true)}
                    className='w-12 h-12 text-white flex items-center justify-center bg-sky-600 rounded-lg cursor-pointer'

                    // {
                    //     selectedIcon ? (
                    //         getIconComponent(selectedIcon?.name)
                    //     ):(
                    //         <List />
                    //     )
                    // }
                >
                </div>
            </div>
        </div>
    )
}

const Footer = () => {
    const {
        selectedIconObject:{ setSelectedIcon },
        selectedProjectObject: {selectedProject, setSelectedProject},
        loadingObject: {isLoading},
    } = useContextApp();

    return (
        <div className='w-[100%] p-3 mt-2 flex gap-3 justify-end items-center'>

            {/* cancel button */}
            <button type='button' className='border border-slate-200 text-slate-400 text-[13px] p-2 rounded-md capitalize hover:border-slate-300 transition-all'>
                close
            </button>

            <button className='text-white text-[13px] p-2 px-4 rounded-md bg-sky-600 hover:bg-sky-700 transition-all capitalize'>
                add task
            </button>
        </div>
    )
}

function PrioritySelection(){
    const {
        setClickedSelection,
        setOpenTasksDropDown,
        setTasksDropDownPositions,
        priority,
    } = useTaskFormContext();

    const prioritySelectionRef = useRef<HTMLDivElement>(null);
    
    function handleClickedSelection(){
        if(prioritySelectionRef.current){
            const rect = prioritySelectionRef.current.getBoundingClientRect()
            const { left , top, width } = rect;
            setTasksDropDownPositions({left:left , top:top, width:width});
        }

        setOpenTasksDropDown(true);
        setClickedSelection("priority");
    }

    return (
        <div
        
        ref={prioritySelectionRef}
        onClick={handleClickedSelection}
        className='flex flex-col gap-2 w-full relative cursor-pointer'
        >

            <span className='capitalize text-[14px] font-medium text-slate-600'>
                task priority
            </span>

            <div className='flex justify-between items-center border h-[42px] px-2 rounded-md'>
                <span className=' w-full text-[13px] text-slate-400'>
                    {
                        priority ? (
                            <div className='flex gap-1 items-center'>
                                <div> {priority.icon} </div>
                                <span className='mt-[3px]'> {priority.name} </span>
                            </div>
                        ) : (
                            <span> select priority </span>
                        )
                    }
                </span>
                <ChevronDown className='absolute top-[40px] right-3 w-4 h-4 text-slate-400'/>
            </div>

        </div>
    )
}

function ProjectSelection(){
    return (
        <div>

        </div>
    )
}

export default TasksWindow